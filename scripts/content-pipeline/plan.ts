import path from 'node:path'
import { z } from 'zod'
import { paths } from './lib/config'
import { listArticles } from './lib/article'
import { parseArgs, readJson, writeJson } from './lib/io'
import { callLlm } from './lib/llm'
import { PLAN_SCHEMA, PLAN_SYSTEM } from './lib/prompts'
import { buildRoutes } from './lib/qa'
import { jaccard, parseJsonLoose, slugify, tokens } from './lib/text'
import { logRun } from './lib/runs'
import { fold } from './lib/planner'
import type { KeywordsFile } from './keywords'

export const PlanItemSchema = z.object({
  target: z.enum(['blog', 'landing', 'skip']),
  title: z.string().min(5),
  slug: z.string().min(3),
  locale: z.enum(['en', 'fr', 'es']),
  primaryKeyword: z.string().min(3),
  secondaryKeywords: z.array(z.string()).default([]),
  audience: z.enum(['restaurant', 'retail', 'online']).optional(),
  intent: z.enum(['informational', 'commercial', 'comparison', 'transactional']),
  cluster: z.string().default(''),
  b2bScore: z.number().min(0).max(10),
  rationale: z.string().default(''),
  outline: z.array(z.string()).default([]),
  internalLinks: z.array(z.object({ path: z.string(), anchor: z.string() })).default([]),
  translationOf: z.string().nullable().optional(),
})
export type ModelPlanItem = z.infer<typeof PlanItemSchema>

export interface PlanItem extends Omit<ModelPlanItem, 'translationOf' | 'target'> {
  /** monthly search volume range of the primary keyword (Keyword Planner), copied from keywords.json */
  volumeRaw?: string
  volumeMid?: number
  /** priority used by content:draft: b2bScore plus a volume bonus */
  priority?: number
  id: string
  target: 'blog' | 'landing'
  translationOf?: string
  status: 'planned' | 'drafted' | 'rejected' | 'approved' | 'suggested'
  plannedAt: string
  draftedAt?: string
}

export interface PlanFile {
  generatedAt: string
  items: PlanItem[]
  skipped: { primaryKeyword: string; locale: string; reason: string }[]
}

const MIN_B2B = 5
const CANNIBALIZATION = 0.6

export function buildPlanPrompt(opts: { keywords: KeywordsFile; existingContent: { slug: string; locale: string; title: string; primaryKeyword: string }[]; planned: PlanItem[]; routes: Set<string>; maxItems: number; topKeywords: number }): string {
  const kws = opts.keywords.keywords
    .filter((k) => k.prelim > -1)
    .slice(0, opts.topKeywords)
    .map((k) => `${k.locale} | ${k.keyword}${k.audience ? ` | audience ${k.audience}` : ''}${k.volumeRaw ? ` | monthly searches ${k.volumeRaw}` : k.volume ? ` | vol ${k.volume}` : ` | autocomplete rank ${k.bestRank === undefined ? 'n/a' : k.bestRank + 1}`}${k.impressions ? ` | gsc impressions ${k.impressions}` : ''}${k.question ? ' | question' : ''}`)
  return [
    `Plan at most ${opts.maxItems} new items. Prefer fewer, stronger items over many weak ones.`,
    '',
    'EXISTING CONTENT (do not overlap):',
    ...opts.existingContent.map((c) => `- [${c.locale}] ${c.title} (${c.primaryKeyword}) /${c.slug}`),
    ...opts.planned.map((p) => `- [${p.locale}] (planned) ${p.title} (${p.primaryKeyword})`),
    '',
    'LANDING PAGES THAT EXIST: / (home, AI sommelier for wine shops and restaurants), /fr (French home), /faq',
    '',
    'ALLOWED INTERNAL LINKS:',
    ...[...opts.routes].map((r) => `- ${r}`),
    '',
    'KEYWORDS (locale | keyword | audience | monthly searches from Google Keyword Planner, or autocomplete rank 1 = most suggested):',
    ...kws,
  ].join('\n')
}

export function validatePlan(raw: unknown, ctx: { keywords?: KeywordsFile; existingSlugs: Set<string>; existingTitles: { primaryKeyword: string; locale: string }[]; planned: PlanItem[]; routes: Set<string> }): { accepted: PlanItem[]; skipped: PlanFile['skipped'] } {
  const list = (raw as { items?: unknown[] })?.items
  if (!Array.isArray(list)) throw new Error('plan output has no items array')
  const accepted: PlanItem[] = []
  const skipped: PlanFile['skipped'] = []
  const taken = new Set([...ctx.existingSlugs, ...ctx.planned.map((p) => p.slug)])
  const pool = [...ctx.existingTitles, ...ctx.planned.map((p) => ({ primaryKeyword: p.primaryKeyword, locale: p.locale }))]

  const kwIndex = new Map((ctx.keywords?.keywords || []).map((k) => [`${k.locale}|${fold(k.keyword)}`, k]))
  for (const entry of list) {
    const parsed = PlanItemSchema.safeParse(entry)
    if (!parsed.success) {
      skipped.push({ primaryKeyword: String((entry as any)?.primaryKeyword ?? '?'), locale: String((entry as any)?.locale ?? '?'), reason: 'schema: ' + parsed.error.issues[0]?.message })
      continue
    }
    const it = parsed.data
    const skip = (reason: string) => skipped.push({ primaryKeyword: it.primaryKeyword, locale: it.locale, reason })
    if (it.target === 'skip') { skip(it.rationale || 'model: skip'); continue }
    if (it.b2bScore < MIN_B2B) { skip(`b2bScore ${it.b2bScore} < ${MIN_B2B}`); continue }
    const slug = slugify(it.slug)
    if (!slug || taken.has(slug)) { skip(`slug "${slug}" already used`); continue }
    const kw = new Set(tokens(it.primaryKeyword))
    const clash = pool.find((p) => p.locale === it.locale && jaccard(kw, new Set(tokens(p.primaryKeyword))) >= CANNIBALIZATION)
    if (clash) { skip(`cannibalizes "${clash.primaryKeyword}"`); continue }
    taken.add(slug)
    const kwRow = kwIndex.get(`${it.locale}|${fold(it.primaryKeyword)}`)
    const audience = kwRow?.audience || it.audience
    const volumeMid = kwRow?.volumeMid ?? kwRow?.volume
    pool.push({ primaryKeyword: it.primaryKeyword, locale: it.locale })
    accepted.push({
      ...it,
      ...(audience ? { audience } : {}),
      ...(kwRow?.volumeRaw ? { volumeRaw: kwRow.volumeRaw } : {}),
      ...(volumeMid !== undefined ? { volumeMid } : {}),
      priority: Number((it.b2bScore + (volumeMid ? Math.min(3, Math.log10(volumeMid + 1)) : 0)).toFixed(2)),
      slug,
      target: it.target,
      translationOf: it.translationOf || undefined,
      internalLinks: it.internalLinks.filter((l) => ctx.routes.has(l.path)),
      id: `${it.locale}:${slug}`,
      status: it.target === 'blog' ? 'planned' : 'suggested',
      plannedAt: new Date().toISOString(),
    })
  }
  return { accepted, skipped }
}

export async function runPlan(opts: { maxItems: number; dryRun: boolean; topKeywords?: number }): Promise<PlanFile> {
  const keywords = readJson<KeywordsFile | null>(paths.keywords, null)
  if (!keywords) throw new Error('data/content/keywords.json not found; run content:keywords first')
  const plan = readJson<PlanFile>(paths.plan, { generatedAt: '', items: [], skipped: [] })
  const articles = listArticles()
  const routes = buildRoutes(articles.map((a) => ({ slug: a.data.slug, locale: a.data.locale })))
  const existingContent = articles.map((a) => ({ slug: a.data.slug, locale: a.data.locale, title: a.data.title, primaryKeyword: a.data.primaryKeyword }))
  const user = buildPlanPrompt({ keywords, existingContent, planned: plan.items, routes, maxItems: opts.maxItems, topKeywords: opts.topKeywords ?? 120 })

  const res = await callLlm({ stage: 'plan', role: 'plan', schema: PLAN_SCHEMA as any, system: PLAN_SYSTEM, user, maxTokens: 32000, dryRun: opts.dryRun })
  if (opts.dryRun) return plan

  let raw: unknown
  try {
    raw = parseJsonLoose(res.text)
  } catch {
    const retry = await callLlm({ stage: 'plan', role: 'plan', schema: PLAN_SCHEMA as any, label: 'retry', system: PLAN_SYSTEM, user: `${user}\n\nYour previous reply was not valid JSON. Reply with the JSON object only.`, maxTokens: 32000 })
    raw = parseJsonLoose(retry.text)
  }
  const { accepted, skipped } = validatePlan(raw, {
    keywords,
    existingSlugs: new Set(articles.map((a) => a.data.slug)),
    existingTitles: articles.map((a) => ({ primaryKeyword: a.data.primaryKeyword, locale: a.data.locale })),
    planned: plan.items,
    routes,
  })
  const next: PlanFile = { generatedAt: new Date().toISOString(), items: [...plan.items, ...accepted], skipped: [...plan.skipped, ...skipped].slice(-200) }
  writeJson(paths.plan, next)
  logRun({ stage: 'plan', note: `${accepted.length} accepted, ${skipped.length} skipped` })
  return next
}

async function main() {
  const { flags } = parseArgs(process.argv.slice(2))
  const maxItems = Number(flags.limit || 6)
  const plan = await runPlan({ maxItems, dryRun: Boolean(flags['dry-run']) })
  if (flags['dry-run']) return console.log('\n[plan] dry-run: no API call made, nothing written')
  console.log(`[plan] ${plan.items.length} items in ${paths.plan}`)
  for (const i of plan.items.filter((x) => x.status === 'planned')) console.log(`  [${i.locale}] ${i.audience || '?'} | ${i.primaryKeyword} | vol ${i.volumeRaw || (i.volumeMid ? `~${i.volumeMid}` : 'n/a')} | b2b ${i.b2bScore} | ${i.title}`)
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) main().catch((e) => { console.error(e.message); process.exit(1) })
