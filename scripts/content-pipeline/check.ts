import path from 'node:path'
import { listArticles, readArticle } from './lib/article'
import { loadContext } from './lib/context'
import { runChecks } from './lib/qa'
import { paths } from './lib/config'
import { parseArgs } from './lib/io'
import { logRun } from './lib/runs'

export function checkAll(only?: string) {
  const ctx = loadContext()
  const articles = only ? [readArticle(path.join(paths.blog, `${only}.md`))] : listArticles()
  return articles.map((a) => ({ article: a, result: runChecks(a, ctx) }))
}

function main() {
  const { positional } = parseArgs(process.argv.slice(2))
  const rows = checkAll(positional[0])
  let failed = 0
  for (const { article, result } of rows) {
    const d = article.data
    const state = d.draft === false && d.reviewed === true ? 'published' : 'draft'
    console.log(`\n${result.ok ? 'PASS' : 'FAIL'}  ${d.slug} [${d.locale}, ${state}]  ${result.stats.words} words, avg sentence ${result.stats.avgSentence}, max similarity ${result.stats.maxSimilarity}`)
    result.errors.forEach((e) => console.log(`  error:   ${e}`))
    result.warnings.forEach((w) => console.log(`  warning: ${w}`))
    if (!result.ok) failed++
  }
  logRun({ stage: 'check', note: `${rows.length} checked, ${failed} failed` })
  if (failed) process.exit(1)
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) main()
