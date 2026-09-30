import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { paths } from './config'

export interface Source {
  title: string
  url: string
}

export interface Frontmatter {
  title: string
  description: string
  slug: string
  date: string
  updated?: string
  locale: 'en' | 'fr' | 'es'
  translationOf?: string
  keywords: string[]
  primaryKeyword: string
  sources: Source[]
  draft: boolean
  reviewed: boolean
  author: string
  [key: string]: unknown
}

export interface Article {
  file: string
  data: Frontmatter
  body: string
}

const KEY_ORDER = [
  'title', 'description', 'slug', 'date', 'updated', 'locale', 'translationOf', 'keywords',
  'primaryKeyword', 'sources', 'draft', 'reviewed', 'reviewedBy', 'sitemap', 'author',
]

function normalizeDates(data: Record<string, unknown>) {
  for (const k of ['date', 'updated']) {
    const v = data[k]
    if (v instanceof Date) data[k] = v.toISOString().slice(0, 10)
  }
  return data
}

export function parseArticle(raw: string, file = ''): Article {
  const parsed = matter(raw)
  const data = normalizeDates(parsed.data) as Frontmatter
  data.keywords = data.keywords || []
  data.sources = data.sources || []
  return { file, data, body: parsed.content.replace(/^\n+/, '') }
}

export function serializeArticle(data: Frontmatter, body: string): string {
  const ordered: Record<string, unknown> = {}
  for (const k of KEY_ORDER) if (data[k] !== undefined) ordered[k] = data[k]
  for (const k of Object.keys(data)) if (!(k in ordered)) ordered[k] = data[k]
  return matter.stringify(`\n${body.trim()}\n`, ordered)
}

export function readArticle(file: string): Article {
  return parseArticle(fs.readFileSync(file, 'utf8'), file)
}

export function listArticles(dir = paths.blog): Article[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readArticle(path.join(dir, f)))
}
