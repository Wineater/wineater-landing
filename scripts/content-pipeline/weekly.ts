import fs from 'node:fs'
import path from 'node:path'
import { has, limits, paths } from './lib/config'
import { parseArgs, readJson, writeJson } from './lib/io'
import { spentUsd } from './lib/llm'
import { logRun } from './lib/runs'
import { buildKeywords } from './keywords'
import { runPlan, type PlanFile } from './plan'
import { runDraft } from './draft'
import { checkAll } from './check'

type Step = 'keywords' | 'plan' | 'draft' | 'check'

interface State {
  week: string
  steps: Partial<Record<Step, string>>
}

export function isoWeek(d = new Date()): string {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  const day = t.getUTCDay() || 7
  t.setUTCDate(t.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

async function main() {
  const { flags } = parseArgs(process.argv.slice(2))
  const dryRun = Boolean(flags['dry-run'])
  const limit = Number(flags.limit || 2)
  const force = Boolean(flags.force)
  const week = isoWeek()
  let state = readJson<State>(paths.weekly, { week, steps: {} })
  if (state.week !== week || force) state = { week, steps: {} }
  const save = (step: Step) => {
    state.steps[step] = new Date().toISOString()
    if (!dryRun) writeJson(paths.weekly, state)
  }

  console.log(`[weekly] week ${week}, limit ${limit}, dry-run ${dryRun}, budget cap ${limits.maxUsdPerRun} USD`)
  if (!dryRun && !has('GEMINI_API_KEY')) throw new Error('GEMINI_API_KEY is not set; run with --dry-run or configure scripts/content-pipeline/.env')

  if (state.steps.keywords) console.log('[weekly] keywords: done this week, skipped')
  else {
    const result = await buildKeywords({ offline: dryRun, maxRequests: limits.maxRequestsKeywords, log: (s) => console.log(`[keywords] ${s}`) })
    if (!dryRun) writeJson(paths.keywords, result)
    console.log(`[weekly] keywords: ${result.keywords.length}`)
    save('keywords')
  }

  const plan = readJson<PlanFile>(paths.plan, { generatedAt: '', items: [], skipped: [] })
  const waiting = plan.items.filter((i) => i.target === 'blog' && i.status === 'planned').length
  if (waiting >= limit) console.log(`[weekly] plan: ${waiting} items already waiting, skipped`)
  else if (state.steps.plan) console.log('[weekly] plan: done this week, skipped')
  else {
    if (!fs.existsSync(paths.keywords)) console.log('[weekly] plan: keywords.json missing (dry-run before first real run); prompt preview skipped')
    else await runPlan({ maxItems: Math.max(limit * 3, 6), dryRun })
    save('plan')
  }

  if (state.steps.draft) console.log('[weekly] draft: done this week, skipped')
  else {
    const results = await runDraft({ limit, dryRun })
    console.log(`[weekly] draft: ${results.map((r) => `${r.slug}=${r.status}`).join(', ') || 'none'}`)
    if (!results.some((r) => r.status === 'error')) save('draft')
  }

  console.log('[weekly] check:')
  const rows = checkAll()
  for (const { article, result } of rows) console.log(`  ${result.ok ? 'PASS' : 'FAIL'} ${article.data.slug}${result.errors.length ? ` (${result.errors.length} errors)` : ''}`)
  save('check')

  logRun({ stage: 'weekly', week, dryRun, costUsd: Number(spentUsd().toFixed(4)) })
  console.log(`[weekly] spent this run: ~${spentUsd().toFixed(2)} USD. Drafts need a human edit, then: npm run content:approve <slug>`)
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) main().catch((e) => { console.error(e.message); process.exit(1) })
