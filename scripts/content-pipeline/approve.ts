import fs from 'node:fs'
import path from 'node:path'
import { blogPath, paths } from './lib/config'
import { readArticle, serializeArticle, type Frontmatter } from './lib/article'
import { loadContext } from './lib/context'
import { runChecks } from './lib/qa'
import { parseArgs, readJson, writeJson } from './lib/io'
import { logRun } from './lib/runs'
import type { PlanFile } from './plan'

async function main() {
  const { flags, positional } = parseArgs(process.argv.slice(2))
  const slug = positional[0]
  if (!slug) throw new Error('usage: npm run content:approve <slug> [-- --by "Editor Name"]')
  const file = path.join(paths.blog, `${slug}.md`)
  if (!fs.existsSync(file)) throw new Error(`content/blog/${slug}.md not found`)

  const article = readArticle(file)
  if (article.data.draft === false && article.data.reviewed === true) throw new Error(`${slug} is already published`)

  const result = runChecks(article, loadContext())
  result.warnings.forEach((w) => console.log(`warning: ${w}`))
  if (!result.ok) {
    result.errors.forEach((e) => console.error(`error: ${e}`))
    throw new Error(`refusing to approve ${slug}: QA failed`)
  }
  if (typeof flags.by !== 'string') console.warn('note: pass --by "Name" to record who reviewed the article')

  const today = new Date().toISOString().slice(0, 10)
  const data: Frontmatter = { ...article.data, draft: false, reviewed: true, date: today, updated: today, sitemap: { loc: blogPath(article.data.locale, slug), lastmod: today } }
  if (typeof flags.by === 'string') data.reviewedBy = flags.by
  fs.writeFileSync(file, serializeArticle(data, article.body))

  const plan = readJson<PlanFile | null>(paths.plan, null)
  const item = plan?.items.find((i) => i.slug === slug)
  if (plan && item) {
    item.status = 'approved'
    writeJson(paths.plan, plan)
  }
  logRun({ stage: 'approve', note: slug })
  console.log(`approved ${slug}: draft=false, reviewed=true, date=${today}. It goes live on the next deploy.`)
}

main().catch((e) => { console.error(e.message); process.exit(1) })
