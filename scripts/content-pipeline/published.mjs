import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const BLOG_DIR = join(process.cwd(), 'content', 'blog')
export const MIN_PUBLISHED_FOR_INDEX = 3

function flag(raw, key) {
  const m = raw.match(new RegExp(`^${key}:\\s*(true|false)\\s*$`, 'm'))
  return m ? m[1] === 'true' : undefined
}

export function readBlogFlags() {
  if (!existsSync(BLOG_DIR)) return []
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const head = readFileSync(join(BLOG_DIR, file), 'utf8').split(/^---\s*$/m)[1] || ''
      return { file, draft: flag(head, 'draft') !== false, reviewed: flag(head, 'reviewed') === true }
    })
}

export function publishedCount() {
  return readBlogFlags().filter((p) => !p.draft && p.reviewed).length
}

export function contentConfig() {
  const ignores = ['_rejected']
  if (process.env.NODE_ENV === 'production' || process.env.NUXT_CONTENT_PUBLISHED_ONLY === '1') {
    for (const p of readBlogFlags()) {
      if (p.draft || !p.reviewed) ignores.push(`blog/${p.file.replace(/\./g, '\\.')}$`)
    }
  }
  return { ignores, highlight: false, markdown: { anchorLinks: false } }
}

export function blogSitemapExclude() {
  return publishedCount() < MIN_PUBLISHED_FOR_INDEX ? ['/blog', '/fr/blog', '/es/blog'] : []
}
