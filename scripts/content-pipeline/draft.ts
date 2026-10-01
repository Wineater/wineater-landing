import fs from 'node:fs'
import path from 'node:path'
import { z } from 'zod'
import { has, limits, paths, type Locale } from './lib/config'
import { serializeArticle, type Frontmatter } from './lib/article'
import { cachedText, htmlToText, urlIsReachable } from './lib/http'
import { ensureDir, parseArgs, readJson, writeJson } from './lib/io'
import { budgetExhausted, callLlm, resolveRedirect, spentUsd } from './lib/llm'
import { CLAIMS_SCHEMA, EXTRACT_SYSTEM, languageNote, RESEARCH_SYSTEM, WRITER_SYSTEM } from './lib/prompts'
import { loadContext } from './lib/context'
import { runChecks, type QaResult } from './lib/qa'
import { extractTagged, parseJsonLoose } from './lib/text'
import { logRun } from './lib/runs'
import * as serpapi from './providers/serpapi'
import type { PlanFile, PlanItem } from './plan'

const ClaimSchema = z.object({ claim: z.string().min(10), sourceUrl: z.string().url(), sourceTitle: z.string().default('') })
export type Claim = z.infer<typeof ClaimSchema>

const normUrl = (u: string) => u.replace(/#.*$/, '').replace(/\/+$/, '').toLowerCase()

export function filterClaims(raw: unknown, allowedUrls: Set<string>): Claim[] {
  const list = (raw as { claims?: unknown[] })?.claims
  if (!Array.isArray(list)) return []
  const seen = new Set<string>()
  const out: Claim[] = []
  for (const entry of list) {
    const parsed = ClaimSchema.safeParse(entry)
    if (!parsed.success) continue
    const url = normUrl(parsed.data.sourceUrl)
    if (!/^https:\/\//.test(parsed.data.sourceUrl) || !allowedUrls.has(url)) continue
    const key = parsed.data.claim.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(parsed.data)
  }
  return out
}

async function verifyReachable(claims: Claim[]): Promise<Claim[]> {
  const ok = new Map<string, boolean>()
  const kept: Claim[] = []
  for (const c of claims) {
    const k = normUrl(c.sourceUrl)
    if (!ok.has(k)) ok.set(k, await urlIsReachable(c.sourceUrl))
    if (ok.get(k)) kept.push(c)
  }
  return kept
}

function researchUser(item: PlanItem, pages?: { url: string; title: string; text: string }[]): string {
  const base = `Topic: ${item.title}\nPrimary keyword: ${item.primaryKeyword}\nLanguage of the article: ${item.locale}\nOutline:\n${item.outline.map((o) => `- ${o}`).join('\n')}\n\nCollect facts about the topic (how the practice works, general industry context) that could support this article. Do not collect facts about Wineater.`
  if (!pages) return base
  return `${base}\n\nUse ONLY the page excerpts below. Every claim must come from one of them.\n\n${pages.map((p) => `URL: ${p.url}\nTITLE: ${p.title}\nTEXT: ${p.text}`).join('\n\n---\n\n')}`
}

const isRedirect = (u: string) => /vertexaisearch\.cloud\.google\.com|grounding-api-redirect/.test(u)

/** Turn grounded segments + grounding sources into a claims table. Source URLs only come from grounding metadata. */
async function extractClaims(item: PlanItem, res: Awaited<ReturnType<typeof callLlm>>): Promise<Claim[]> {
  const usable = res.sources.map((s, i) => ({ ...s, i })).filter((s) => !isRedirect(s.url))
  if (!usable.length) return []
  const ok = new Set(usable.map((s) => s.i))
  const segments = res.supports.map((g) => ({ text: g.text, idx: g.sourceIndices.filter((n) => ok.has(n)) })).filter((g) => g.idx.length)
  if (!segments.length) return []
  const user = [
    'SOURCES:',
    ...usable.map((s) => `${s.i}: ${s.title} | ${s.url}`),
    '',
    'SEGMENTS (text | supporting source numbers):',
    ...segments.map((g) => `- ${g.text.replace(/\s+/g, ' ')} | ${g.idx.join(',')}`),
  ].join('\n')
  const ex = await callLlm({ stage: 'research', role: 'plan', label: `${item.slug} extract`, system: EXTRACT_SYSTEM, user, maxTokens: 8000, schema: CLAIMS_SCHEMA as any })
  const raw = parseJsonLoose<{ claims?: { claim: string; sourceIndex: number }[] }>(ex.text)
  const allowedIdx = new Set(segments.flatMap((g) => g.idx))
  const mapped = (raw.claims || [])
    .filter((c) => allowedIdx.has(c.sourceIndex))
    .map((c) => ({ claim: c.claim, sourceUrl: res.sources[c.sourceIndex].url, sourceTitle: res.sources[c.sourceIndex].title }))
  return filterClaims({ claims: mapped }, new Set(usable.map((s) => normUrl(s.url))))
}

export async function research(item: PlanItem, dryRun: boolean): Promise<Claim[]> {
  if (dryRun) {
    await callLlm({ stage: 'research', role: 'research', label: item.slug, system: RESEARCH_SYSTEM, user: researchUser(item), maxTokens: 8000, grounding: true, dryRun })
    return []
  }
  try {
    const res = await callLlm({ stage: 'research', role: 'research', label: item.slug, system: RESEARCH_SYSTEM, user: researchUser(item), maxTokens: 8000, grounding: true })
    // resolve any redirect that failed during the call once more before giving up on it
    for (const s of res.sources) if (isRedirect(s.url)) s.url = await resolveRedirect(s.url)
    return await verifyReachable(await extractClaims(item, res))
  } catch (e) {
    console.warn(`[draft] grounded research failed (${(e as Error).message.slice(0, 120)}); trying SerpAPI fallback`)
  }
  if (!serpapi.enabled()) return []
  const results = await serpapi.serp(item.primaryKeyword, item.locale)
  const pages: { url: string; title: string; text: string }[] = []
  for (const r of results.organic.slice(0, 4)) {
    const html = await cachedText(r.url, { ttlDays: 14, minDelayMs: 2000 }).catch(() => null)
    if (html) pages.push({ url: r.url, title: r.title, text: htmlToText(html, 4000) })
  }
  if (!pages.length) return []
  const res = await callLlm({ stage: 'research', role: 'research', label: `${item.slug} serp-fallback`, system: RESEARCH_SYSTEM, user: researchUser(item, pages), maxTokens: 8000 })
  const ex = await callLlm({
    stage: 'research', role: 'plan', label: `${item.slug} serp-extract`, system: EXTRACT_SYSTEM, maxTokens: 8000, schema: CLAIMS_SCHEMA as any,
    user: ['SOURCES:', ...pages.map((p, i) => `${i}: ${p.title} | ${p.url}`), '', 'SEGMENTS (text | supporting source numbers):', ...res.text.split('\n').filter((l) => l.trim().length > 10).map((l) => `- ${l.trim()} | ${pages.map((_, i) => i).join(',')}`)].join('\n'),
  })
  const raw = parseJsonLoose<{ claims?: { claim: string; sourceIndex: number }[] }>(ex.text)
  const mapped = (raw.claims || []).filter((c) => pages[c.sourceIndex]).map((c) => ({ claim: c.claim, sourceUrl: pages[c.sourceIndex].url, sourceTitle: pages[c.sourceIndex].title }))
  return verifyReachable(filterClaims({ claims: mapped }, new Set(pages.map((p) => normUrl(p.url)))))
}

export function writerUser(item: PlanItem, claims: Claim[], facts: string, routes: string[], feedback?: { previous: string; errors: string[] }): string {
  const links = item.internalLinks.length ? item.internalLinks : []
  return [
    `Write the article in this language: ${item.locale}. ${languageNote(item.locale as Locale)}`,
    `Title idea: ${item.title}`,
    `Primary keyword: ${item.primaryKeyword}`,
    `Secondary keywords (use naturally, never stuff): ${item.secondaryKeywords.join(', ') || 'none'}`,
    `Search intent: ${item.intent}`,
    `Length: between 700 and 1400 words.`,
    `Outline (adapt if needed):\n${item.outline.map((o) => `- ${o}`).join('\n')}`,
    '',
    `APPROVED WINEATER FACTS:\n${facts}`,
    '',
    `CLAIMS TABLE (claim | source URL):\n${claims.length ? claims.map((c, i) => `${i + 1}. ${c.claim} | ${c.sourceUrl}`).join('\n') : '(empty: write with no statistics and no external figures at all)'}`,
    '',
    `ALLOWED INTERNAL LINKS (use 1-3 that fit, with natural anchor text):\n${(links.length ? links.map((l) => `${l.path} (anchor idea: ${l.anchor})`) : routes).join('\n')}`,
    '',
    'End the article with one short sentence pointing to the free trial or a demo, using an internal link. Do not add any other closing paragraph.',
    feedback ? `\nYOUR PREVIOUS DRAFT FAILED QA. Fix exactly these problems and keep everything else:\n${feedback.errors.map((e) => `- ${e}`).join('\n')}\n\nPREVIOUS BODY:\n${feedback.previous}` : '',
  ].join('\n')
}

export function parseWriterOutput(text: string): { title: string; description: string; body: string } {
  const title = extractTagged(text, 'title')
  const description = extractTagged(text, 'description')
  const body = extractTagged(text, 'body')
  if (!title || !description || !body) throw new Error('writer output missing <title>, <description> or <body>')
  return { title, description, body }
}

export function assemble(item: PlanItem, out: { title: string; description: string; body: string }, claims: Claim[], today = new Date().toISOString().slice(0, 10)): { data: Frontmatter; body: string } {
  const linked = new Set([...out.body.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)].map((m) => normUrl(m[1])))
  const sources = new Map<string, { title: string; url: string }>()
  for (const c of claims) if (linked.has(normUrl(c.sourceUrl)) && !sources.has(normUrl(c.sourceUrl))) sources.set(normUrl(c.sourceUrl), { title: c.sourceTitle || new URL(c.sourceUrl).host, url: c.sourceUrl })
  const data: Frontmatter = {
    title: out.title.trim(),
    description: out.description.trim(),
    slug: item.slug,
    date: today,
    updated: today,
    locale: item.locale,
    ...(item.translationOf ? { translationOf: item.translationOf } : {}),
    keywords: [item.primaryKeyword, ...item.secondaryKeywords],
    primaryKeyword: item.primaryKeyword,
    sources: [...sources.values()],
    draft: true,
    reviewed: false,
    author: 'Wineater',
  }
  return { data, body: out.body.trim() }
}

export async function draftItem(item: PlanItem, opts: { dryRun: boolean }): Promise<{ status: 'passed' | 'rejected' | 'dry-run'; qa?: QaResult; file?: string }> {
  const facts = fs.readFileSync(paths.facts, 'utf8')
  const ctx = loadContext()
  const routes = [...ctx.routes]

  const claims = await research(item, opts.dryRun)
  if (!opts.dryRun) writeJson(path.join(paths.data, 'claims', `${item.slug}.json`), { slug: item.slug, at: new Date().toISOString(), claims })

  const system = WRITER_SYSTEM
  let user = writerUser(item, claims, facts, routes)
  if (opts.dryRun) {
    await callLlm({ stage: 'write', role: 'draft', label: item.slug, system, user, maxTokens: 24000, dryRun: true })
    return { status: 'dry-run' }
  }

  let written = parseWriterOutput((await callLlm({ stage: 'write', role: 'draft', label: item.slug, system, user, maxTokens: 24000 })).text)
  let article = assemble(item, written, claims)
  let qa = runChecks({ ...article }, ctx)
  if (!qa.ok && !budgetExhausted()) {
    user = writerUser(item, claims, facts, routes, { previous: article.body, errors: qa.errors })
    written = parseWriterOutput((await callLlm({ stage: 'write', role: 'draft', label: `${item.slug} fix`, system, user, maxTokens: 24000 })).text)
    article = assemble(item, written, claims)
    qa = runChecks({ ...article }, ctx)
  }

  const md = serializeArticle(article.data, article.body)
  if (qa.ok) {
    ensureDir(paths.blog)
    const file = path.join(paths.blog, `${item.slug}.md`)
    fs.writeFileSync(file, md)
    return { status: 'passed', qa, file }
  }
  ensureDir(paths.rejected)
  const file = path.join(paths.rejected, `${item.slug}.md`)
  fs.writeFileSync(file, md)
  writeJson(path.join(paths.rejected, `${item.slug}.report.json`), { slug: item.slug, at: new Date().toISOString(), errors: qa.errors, warnings: qa.warnings, stats: qa.stats })
  return { status: 'rejected', qa, file }
}

export async function runDraft(opts: { limit: number; dryRun: boolean; slug?: string }) {
  const plan = readJson<PlanFile>(paths.plan, { generatedAt: '', items: [], skipped: [] })
  let queue = plan.items.filter((i) => i.target === 'blog' && i.status === 'planned')
  if (opts.slug) queue = plan.items.filter((i) => i.slug === opts.slug)
  queue = queue.sort((a, b) => (b.priority ?? b.b2bScore) - (a.priority ?? a.b2bScore)).slice(0, opts.limit)
  if (!queue.length) console.log('[draft] nothing to draft (no planned blog items)')

  const results: { slug: string; status: string }[] = []
  for (const item of queue) {
    if (fs.existsSync(path.join(paths.blog, `${item.slug}.md`))) {
      item.status = 'drafted'
      console.log(`[draft] ${item.slug}: already exists in content/blog, skipped`)
      continue
    }
    if (!opts.dryRun && budgetExhausted()) {
      console.log(`[draft] budget cap reached (${limits.maxUsdPerRun} USD or ${limits.maxTokensPerRun} tokens), stopping`)
      break
    }
    try {
      const r = await draftItem(item, { dryRun: opts.dryRun })
      results.push({ slug: item.slug, status: r.status })
      if (!opts.dryRun) {
        item.status = r.status === 'passed' ? 'drafted' : 'rejected'
        item.draftedAt = new Date().toISOString()
        writeJson(paths.plan, plan)
        console.log(`[draft] ${item.slug}: ${r.status}${r.qa && !r.qa.ok ? `\n  ${r.qa.errors.join('\n  ')}` : ''}  -> ${r.file}`)
      }
    } catch (e) {
      console.error(`[draft] ${item.slug} failed: ${(e as Error).message}`)
      results.push({ slug: item.slug, status: 'error' })
    }
  }
  if (!opts.dryRun) writeJson(paths.plan, plan)
  logRun({ stage: 'draft', note: JSON.stringify(results), costUsd: Number(spentUsd().toFixed(4)) })
  return results
}

async function main() {
  const { flags } = parseArgs(process.argv.slice(2))
  if (!flags['dry-run'] && !has('GEMINI_API_KEY')) throw new Error('GEMINI_API_KEY is not set; use --dry-run or see scripts/content-pipeline/.env.example')
  await runDraft({ limit: Number(flags.limit || 1), dryRun: Boolean(flags['dry-run']), slug: typeof flags.slug === 'string' ? flags.slug : undefined })
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) main().catch((e) => { console.error(e.message); process.exit(1) })
