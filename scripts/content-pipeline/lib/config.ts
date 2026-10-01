import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config as loadEnv } from 'dotenv'

const here = path.dirname(fileURLToPath(import.meta.url))

export const PIPE_DIR = path.resolve(here, '..')
export const ROOT = path.resolve(PIPE_DIR, '..', '..')

loadEnv({ path: path.join(PIPE_DIR, '.env'), quiet: true })

export const paths = {
  seeds: path.join(PIPE_DIR, 'seeds.json'),
  data: path.join(ROOT, 'data', 'content'),
  keywords: path.join(ROOT, 'data', 'content', 'keywords.json'),
  plan: path.join(ROOT, 'data', 'content', 'content-plan.json'),
  facts: path.join(ROOT, 'data', 'content', 'facts.md'),
  policy: path.join(ROOT, 'data', 'content', 'banned-claims.json'),
  runs: path.join(ROOT, 'data', 'content', 'runs.jsonl'),
  weekly: path.join(ROOT, 'data', 'content', 'weekly-state.json'),
  daily: path.join(ROOT, 'data', 'content', 'daily-state.json'),
  cache: path.join(ROOT, 'data', 'content', '.cache'),
  blog: path.join(ROOT, 'content', 'blog'),
  imports: path.join(ROOT, 'data', 'content', 'imports'),
  plannerSeeds: path.join(ROOT, 'data', 'content', 'keyword-planner-seeds.txt'),
  rejected: path.join(ROOT, 'content', '_rejected'),
}

export const LOCALES = ['en', 'fr', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export const SITE_URL = 'https://wineater.com'

export const STATIC_ROUTES = ['/', '/fr', '/faq', '/fr/faq', '/blog', '/fr/blog']

export const limits = {
  maxRequestsKeywords: 300,
  minUnwrittenPlanItems: 5,
  minWords: 400,
  maxWords: 2500,
  maxUsdPerRun: Number(process.env.CONTENT_MAX_USD_PER_RUN || 3),
  maxTokensPerRun: Number(process.env.CONTENT_MAX_TOKENS_PER_RUN || 600000),
}

export type LlmRole = 'plan' | 'research' | 'draft'

/** Plan, research and claim extraction on a fast model; drafting on the strongest one, with a fallback. All overridable by env. */
export const models = {
  plan: () => process.env.CONTENT_MODEL_PLAN || 'gemini-3.8-flash',
  research: () => process.env.CONTENT_MODEL_RESEARCH || process.env.CONTENT_MODEL_PLAN || 'gemini-3.8-flash',
  draft: () => process.env.CONTENT_MODEL_DRAFT || 'gemini-3.1-pro-preview',
  draftFallback: () => process.env.CONTENT_MODEL_DRAFT_FALLBACK || 'gemini-3.8-flash',
}

export function has(envKey: string): boolean {
  return Boolean(process.env[envKey])
}

export function blogPath(locale: string, slug: string): string {
  return locale === 'en' ? `/blog/${slug}` : `/${locale}/blog/${slug}`
}
