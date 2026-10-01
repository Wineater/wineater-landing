import fs from 'node:fs'
import path from 'node:path'
import { has, limits, paths } from './lib/config'
import { parseArgs, readJson, writeJson } from './lib/io'
import { spentUsd } from './lib/llm'
import { logRun } from './lib/runs'
import { buildKeywords, runDataforseo, runImport, runTrends } from './keywords'
import * as trends from './providers/trends'
import * as dfs from './providers/dataforseo'
import { runPlan, type PlanFile } from './plan'
import { runDraft } from './draft'
import { checkAll } from './check'

interface DailyState {
  date: string
  drafted: string[]
}

const today = () => new Date().toISOString().slice(0, 10)
export const unwrittenItems = (plan: PlanFile) => plan.items.filter((i) => i.target === 'blog' && i.status === 'planned')

async function main() {
  const { flags } = parseArgs(process.argv.slice(2))
  const dryRun = Boolean(flags['dry-run'])
  const limit = Number(flags.limit || 2)
  const offline = dryRun || Boolean(flags.offline)
  let state = readJson<DailyState>(paths.daily, { date: today(), drafted: [] })
  if (state.date !== today() || flags.force) state = { date: today(), drafted: [] }
  const remaining = Math.max(0, limit - state.drafted.length)

  console.log(`[daily] ${state.date}, limit ${limit}, already drafted today ${state.drafted.length}, dry-run ${dryRun}, budget cap ${limits.maxUsdPerRun} USD / ${limits.maxTokensPerRun} tokens`)
  if (!dryRun && !has('GEMINI_API_KEY')) throw new Error('GEMINI_API_KEY is not set; run with --dry-run or configure scripts/content-pipeline/.env')

  // 1. keywords: import new Keyword Planner files, then refresh from cached Autocomplete answers
  const imp = runImport({ write: !dryRun, log: (s) => console.log(`[daily] import ${s}`) })
  console.log(`[daily] planner imports: ${imp.files} new file(s), ${imp.added} new keywords, ${imp.updated} merged`)
  if (fs.existsSync(paths.keywords) || !dryRun) {
    const result = await buildKeywords({ offline, maxRequests: limits.maxRequestsKeywords, log: (s) => console.log(`[daily] keywords ${s}`) })
    if (!dryRun) {
      writeJson(paths.keywords, result)
      logRun({ stage: 'keywords', note: `daily: ${result.keywords.length} keywords, ${result.requestsUsed} requests` })
    }
    console.log(`[daily] keywords: ${result.keywords.length}${dryRun ? ' (dry-run, not written)' : ''}`)
    if (!dryRun && !offline && !flags['no-trends'] && trends.enabled()) {
      try {
        const t = await runTrends({ maxRequests: Number(flags['trends-max'] || 40), write: true, log: (x) => console.log(`[daily] ${x}`) })
        console.log(`[daily] trends: ${t.rows} rows (${t.added} new), ${t.requests} requests${t.blocked ? ', blocked by Google, paused 6 h' : ''}`)
      } catch (e) {
        console.log(`[daily] trends skipped: ${(e as Error).message}`)
      }
    } else if (!dryRun && !trends.enabled()) console.log('[daily] trends: paused after a recent block or TRENDS_DISABLED=1')
    if (!dryRun && !offline && !flags['no-dataforseo'] && dfs.enabled()) {
      try {
        await runDataforseo({ maxKeywords: Number(flags['dataforseo-max'] || 300), maxSuggestSeeds: 3, dryRun: false, log: (x) => console.log(`[daily] ${x}`) })
      } catch (e) {
        console.log(`[daily] dataforseo skipped: ${(e as Error).message}`)
      }
    }
  }

  // 2. plan: top up only when fewer than N unwritten items remain
  let plan = readJson<PlanFile>(paths.plan, { generatedAt: '', items: [], skipped: [] })
  const waiting = unwrittenItems(plan).length
  if (waiting >= limits.minUnwrittenPlanItems) console.log(`[daily] plan: ${waiting} unwritten items waiting (>= ${limits.minUnwrittenPlanItems}), no top-up`)
  else if (!fs.existsSync(paths.keywords)) console.log('[daily] plan: keywords.json missing, preview skipped')
  else {
    console.log(`[daily] plan: only ${waiting} unwritten items, topping up`)
    plan = await runPlan({ maxItems: Math.max(6, limits.minUnwrittenPlanItems * 2 - waiting), dryRun })
  }

  // 3. draft
  let results: { slug: string; status: string }[] = []
  if (remaining === 0) console.log('[daily] draft: daily limit already reached, skipped (use --force to override)')
  else {
    results = await runDraft({ limit: remaining, dryRun })
    console.log(`[daily] draft: ${results.map((r) => `${r.slug}=${r.status}`).join(', ') || 'none'}`)
    if (!dryRun) {
      state.drafted.push(...results.filter((r) => r.status === 'passed' || r.status === 'rejected').map((r) => r.slug))
      writeJson(paths.daily, state)
    }
  }

  // 4. QA over everything in content/blog
  console.log('[daily] check:')
  for (const { article, result } of checkAll()) console.log(`  ${result.ok ? 'PASS' : 'FAIL'} ${article.data.slug}${result.errors.length ? ` (${result.errors.length} errors)` : ''}${result.warnings.length ? ` ${result.warnings.length} warnings` : ''}`)

  logRun({ stage: 'daily', dryRun, drafted: results.length, costUsd: Number(spentUsd().toFixed(4)) })
  console.log(`[daily] spent this run: ~${spentUsd().toFixed(3)} USD. Drafts are draft:true / reviewed:false. A person edits, then: npm run content:approve -- <slug> --by "Name"`)
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) main().catch((e) => { console.error(e.message); process.exit(1) })
