import path from 'node:path'
import { STATIC_ROUTES, blogPath, limits } from './config'
import type { Article, Frontmatter } from './article'
import { jaccard, normalizeKeyword, shingles } from './text'

export interface Policy {
  phrases: string[]
  warnPhrases?: string[]
  patterns: string[]
  unsourcedSuperlatives?: string[]
  competitorNames?: string[]
  allowedNumbers?: string[]
}

export interface QaContext {
  existing: { slug: string; locale: string; body: string }[]
  routes: Set<string>
  policy: Policy
}

export interface QaResult {
  ok: boolean
  errors: string[]
  warnings: string[]
  stats: { words: number; avgSentence: number; maxSimilarity: number }
}

const LINK_RE = /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g

export function buildRoutes(existing: { slug: string; locale: string }[]): Set<string> {
  const routes = new Set(STATIC_ROUTES)
  for (const a of existing) routes.add(blogPath(a.locale, a.slug))
  return routes
}

function stripCode(md: string): string {
  return md.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
}

function proseOf(md: string): string {
  return stripCode(md)
    .replace(LINK_RE, '$1')
    .replace(/^[|:\- ]+$/gm, ' ')
    .replace(/[#>*_|]/g, ' ')
}

const normUrl = (u: string) => u.replace(/#.*$/, '').replace(/\/+$/, '').toLowerCase()

export function wordCount(md: string): number {
  return proseOf(md).split(/\s+/).filter(Boolean).length
}

export function findNumbers(line: string, allowed: Set<string>): string[] {
  const text = line.replace(LINK_RE, '$1').replace(/^\s*\d+[.)]\s/, '')
  const out: string[] = []
  const re = /(?<![\w./-])(\d+(?:[.,]\d+)*)(\s?(?:%|€|\$|£|×|x\b|k\b|M\b))?/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text))) {
    const num = m[1]
    const unit = (m[2] || '').trim()
    const value = Number(num.replace(',', '.'))
    const plainInt = /^\d+$/.test(num)
    if (plainInt && value >= 1900 && value <= 2100 && !unit) continue
    if (plainInt && allowed.has(num) && !unit) continue
    if (plainInt && value <= 10 && !unit) continue
    out.push(`${num}${unit}`)
  }
  return out
}

export function runChecks(article: Pick<Article, 'data' | 'body'> & { file?: string }, ctx: QaContext): QaResult {
  const errors: string[] = []
  const warnings: string[] = []
  const d = article.data as Frontmatter
  const body = article.body
  const policy = ctx.policy

  for (const f of ['title', 'description', 'slug', 'date', 'locale', 'primaryKeyword'] as const) {
    if (!d[f]) errors.push(`frontmatter: missing ${f}`)
  }
  if (d.locale && !['en', 'fr', 'es'].includes(d.locale)) errors.push(`frontmatter: locale must be en, fr or es (got ${d.locale})`)
  if (d.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(d.date))) errors.push('frontmatter: date must be YYYY-MM-DD')
  if (article.file && d.slug && path.basename(article.file, '.md') !== d.slug) errors.push(`frontmatter: slug "${d.slug}" does not match file name`)
  for (const s of d.sources || []) {
    if (!s.title || !/^https:\/\//.test(s.url || '')) errors.push(`frontmatter: invalid source ${JSON.stringify(s)}`)
  }

  if (d.title && d.title.length > 60) errors.push(`title is ${d.title.length} chars (max 60)`)
  if (d.description) {
    const n = d.description.length
    if (n < 120 || n > 160) errors.push(`meta description is ${n} chars (need 120-160)`)
  }

  const noCode = stripCode(body)
  if (/^#\s+\S/m.test(noCode)) errors.push('body contains an h1; the page template renders the only h1 from the title')

  const words = wordCount(body)
  if (words < limits.minWords) errors.push(`body has ${words} words (min ${limits.minWords})`)
  if (words > limits.maxWords) errors.push(`body has ${words} words (max ${limits.maxWords})`)

  const sourceUrls = new Set((d.sources || []).map((s) => normUrl(s.url)))
  const links = [...body.matchAll(LINK_RE)].map((m) => m[2])
  for (const href of links) {
    if (/^(mailto:|tel:|#)/.test(href)) continue
    if (/^https?:\/\//.test(href)) {
      if (!sourceUrls.has(normUrl(href))) errors.push(`external link not listed in frontmatter sources: ${href}`)
    } else if (href.startsWith('/')) {
      const route = href.replace(/[#?].*$/, '').replace(/(.)\/+$/, '$1')
      if (!ctx.routes.has(route)) errors.push(`internal link does not resolve: ${href}`)
    } else {
      errors.push(`relative link not allowed: ${href}`)
    }
  }
  for (const s of d.sources || []) {
    if (!links.some((l) => normUrl(l) === normUrl(s.url))) warnings.push(`source not cited in body: ${s.url}`)
  }

  const allowed = new Set(policy.allowedNumbers || [])
  const lines = noCode.split('\n')
  lines.forEach((line, i) => {
    const nums = findNumbers(line, allowed)
    if (!nums.length) return
    const near = [lines[i - 1], line, lines[i + 1]].filter(Boolean).join('\n')
    const hasSource = [...near.matchAll(LINK_RE)].some((m) => sourceUrls.has(normUrl(m[2])))
    if (!hasSource) errors.push(`number without a nearby source link: ${nums.join(', ')} in "${line.trim().slice(0, 70)}"`)
  })

  const prose = proseOf(body)
  const lower = prose.toLowerCase()
  const hit = (phrase: string) => {
    const p = phrase.toLowerCase()
    return /^[\p{L}' -]+$/u.test(p) ? new RegExp(`(?<![\\p{L}])${p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}])`, 'iu').test(lower) : lower.includes(p)
  }
  for (const p of policy.phrases) if (hit(p)) errors.push(`banned phrase: "${p}"`)
  for (const p of policy.warnPhrases || []) if (hit(p)) warnings.push(`watch phrase: "${p}"`)
  for (const pat of policy.patterns) if (new RegExp(pat, 'iu').test(prose)) errors.push(`not-X-but-Y contrast pattern: /${pat}/`)
  for (const c of policy.competitorNames || []) if (hit(c)) errors.push(`competitor named: "${c}"`)
  const paragraphs = stripCode(body).split(/\n\s*\n/)
  for (const para of paragraphs) {
    for (const s of policy.unsourcedSuperlatives || []) {
      if (hit(s) && ![...para.matchAll(LINK_RE)].some((m) => sourceUrls.has(normUrl(m[2])))) {
        warnings.push(`superlative without source: "${s}"`)
        break
      }
    }
    if (para.split(/\s+/).length > 140 && !/^\s*[|-]/.test(para)) warnings.push('paragraph longer than 140 words')
  }

  const sentences = prose.split(/(?<=[.!?])\s+/).filter((s) => s.split(/\s+/).length > 2)
  const avgSentence = sentences.length ? words / sentences.length : 0
  const maxAvg = d.locale === 'fr' ? 32 : 28
  if (avgSentence > maxAvg) errors.push(`average sentence length ${avgSentence.toFixed(1)} words (max ${maxAvg})`)
  else if (avgSentence > 22) warnings.push(`average sentence length ${avgSentence.toFixed(1)} words`)

  const dashes = (body.match(/—/g) || []).length
  if (dashes > 4) warnings.push(`${dashes} em dashes`)
  if (/^\s*[-*]\s+\*\*[^*]+:\*\*/m.test(body)) warnings.push('bold-label bullets')
  if (/\p{Extended_Pictographic}/u.test(body)) errors.push('emoji in body')
  const last = paragraphs.map((p) => p.trim()).filter(Boolean).pop() || ''
  if (last && !/^[-*|#]/.test(last) && last.split(/\s+/).length <= 8) warnings.push('very short closing line')

  if (d.primaryKeyword) {
    const kw = normalizeKeyword(d.primaryKeyword).split(' ').filter((w) => w.length > 2)
    const head = normalizeKeyword(`${d.title || ''} ${body.split(/\s+/).slice(0, 120).join(' ')}`)
    if (kw.length && !kw.every((w) => head.includes(w))) warnings.push('primary keyword not found in title or first 120 words')
  }

  const mine = shingles(body)
  let maxSimilarity = 0
  for (const other of ctx.existing) {
    if (other.slug === d.slug) continue
    const sim = jaccard(mine, shingles(other.body))
    maxSimilarity = Math.max(maxSimilarity, sim)
    if (sim > 0.3) errors.push(`near-duplicate of "${other.slug}" (similarity ${sim.toFixed(2)})`)
    else if (sim > 0.12) warnings.push(`overlaps with "${other.slug}" (similarity ${sim.toFixed(2)})`)
  }

  return { ok: errors.length === 0, errors: [...new Set(errors)], warnings: [...new Set(warnings)], stats: { words, avgSentence: Number(avgSentence.toFixed(1)), maxSimilarity: Number(maxSimilarity.toFixed(2)) } }
}
