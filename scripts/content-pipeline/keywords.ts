import fs from 'node:fs'
import { paths, has, limits } from './lib/config'
import { readJson, writeJson, parseArgs } from './lib/io'
import { normalizeKeyword, guessLocale } from './lib/text'
import { logRun } from './lib/runs'
import { suggest } from './providers/autocomplete'
import * as dfs from './providers/dataforseo'
import * as serpapi from './providers/serpapi'
import * as gsc from './providers/gsc'

export type KeywordSource = 'seed' | 'autocomplete' | 'gsc' | 'dataforseo' | 'serpapi-paa' | 'serpapi-related'

export interface KeywordRow {
  keyword: string
  locale: 'en' | 'fr' | 'es'
  sources: KeywordSource[]
  seeds: string[]
  hits: number
  bestRank?: number
  question?: boolean
  volume?: number
  difficulty?: number
  cpc?: number
  clicks?: number
  impressions?: number
  position?: number
  prelim: number
}

export interface KeywordsFile {
  generatedAt: string
  requestsUsed: number
  keywords: KeywordRow[]
}

interface Seeds {
  locales: Record<string, { hl: string; questionPrefixes: string[]; seeds: { q: string; soup?: boolean }[] }>
  b2bTerms: string[]
  consumerTerms: string[]
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

export function prelimScore(row: Pick<KeywordRow, 'keyword' | 'hits' | 'bestRank' | 'sources' | 'volume'>, seeds: Pick<Seeds, 'b2bTerms' | 'consumerTerms'>): number {
  const words = new Set(normalizeKeyword(row.keyword).split(' '))
  const b2b = seeds.b2bTerms.filter((t) => words.has(t)).length
  const consumer = seeds.consumerTerms.filter((t) => normalizeKeyword(row.keyword).includes(normalizeKeyword(t))).length
  const rankBonus = row.bestRank === undefined ? 0 : Math.max(0, 1 - row.bestRank / 10)
  const volume = row.volume ? Math.min(3, Math.log10(row.volume + 1)) : 0
  return Number((row.hits * 0.5 + row.sources.length + b2b * 1.5 - consumer * 3 + rankBonus + volume).toFixed(2))
}

export async function buildKeywords(opts: { offline: boolean; maxRequests: number; log?: (s: string) => void }): Promise<KeywordsFile> {
  const log = opts.log || (() => {})
  const seeds = readJson<Seeds>(paths.seeds, { locales: {}, b2bTerms: [], consumerTerms: [] })
  const existing = readJson<KeywordsFile>(paths.keywords, { generatedAt: '', requestsUsed: 0, keywords: [] })
  const map = new Map<string, KeywordRow>()
  const key = (locale: string, kw: string) => `${locale}|${normalizeKeyword(kw)}`
  for (const row of existing.keywords) map.set(key(row.locale, row.keyword), { ...row, hits: 0, bestRank: undefined, seeds: [] })

  const add = (kw: string, locale: KeywordRow['locale'], source: KeywordSource, seed: string, rank?: number, question = false) => {
    const normalized = normalizeKeyword(kw)
    if (normalized.length < 4 || normalized.split(' ').length > 9) return
    const k = key(locale, normalized)
    const row = map.get(k) || { keyword: normalized, locale, sources: [], seeds: [], hits: 0, prelim: 0 }
    if (!row.sources.includes(source)) row.sources.push(source)
    if (!row.seeds.includes(seed)) row.seeds.push(seed)
    row.hits += 1
    if (rank !== undefined) row.bestRank = Math.min(row.bestRank ?? 99, rank)
    if (question) row.question = true
    map.set(k, row)
  }

  const budget = { remaining: opts.maxRequests }
  const jobs: { q: string; hl: string; locale: KeywordRow['locale']; seed: string; question: boolean }[] = []
  const sections: ('base' | 'question' | 'soup')[] = ['base', 'question', 'soup']
  for (const section of sections) {
    for (const [locale, cfg] of Object.entries(seeds.locales)) {
      for (const s of cfg.seeds) {
        if (section === 'base') jobs.push({ q: s.q, hl: cfg.hl, locale: locale as KeywordRow['locale'], seed: s.q, question: false })
        if (section === 'question') for (const p of cfg.questionPrefixes) jobs.push({ q: `${p} ${s.q}`, hl: cfg.hl, locale: locale as KeywordRow['locale'], seed: s.q, question: true })
        if (section === 'soup' && s.soup) for (const c of ALPHABET) jobs.push({ q: `${s.q} ${c}`, hl: cfg.hl, locale: locale as KeywordRow['locale'], seed: s.q, question: false })
      }
    }
  }
  log(`autocomplete jobs: ${jobs.length}, request cap: ${opts.maxRequests}${opts.offline ? ' (offline, cache only)' : ''}`)

  for (const [locale, cfg] of Object.entries(seeds.locales)) for (const s of cfg.seeds) add(s.q, locale as KeywordRow['locale'], 'seed', s.q)

  let done = 0
  for (const job of jobs) {
    const before = budget.remaining
    const results = await suggest(job.q, job.hl, budget, opts.offline)
    results.forEach((r, i) => add(r, job.locale, 'autocomplete', job.seed, i, job.question || /^(how|what|why|can|does|comment|pourquoi|quel|cómo|qué|por qué|cuál)\b/i.test(r)))
    done++
    if (budget.remaining === 0 && before === 0) break
  }
  const used = opts.maxRequests - budget.remaining
  log(`autocomplete requests used: ${used}; jobs processed: ${done}/${jobs.length}`)

  if (!opts.offline && gsc.enabled()) {
    try {
      const rows = await gsc.topQueries()
      for (const r of rows) {
        const locale = guessLocale(r.keyword)
        add(r.keyword, locale, 'gsc', 'gsc')
        const row = map.get(key(locale, r.keyword))
        if (row) Object.assign(row, { clicks: r.clicks, impressions: r.impressions, position: Number(r.position.toFixed(1)) })
      }
      log(`gsc queries: ${rows.length}`)
    } catch (e) {
      log(`gsc skipped: ${(e as Error).message}`)
    }
  }

  if (!opts.offline && serpapi.enabled()) {
    const top = [...map.values()].sort((a, b) => b.hits - a.hits).slice(0, 10)
    for (const row of top) {
      try {
        const res = await serpapi.serp(row.keyword, row.locale)
        res.paa.forEach((q) => add(q, row.locale, 'serpapi-paa', row.keyword, undefined, true))
        res.related.forEach((q) => add(q, row.locale, 'serpapi-related', row.keyword))
      } catch (e) {
        log(`serpapi skipped: ${(e as Error).message}`)
        break
      }
    }
  }

  if (!opts.offline && dfs.enabled()) {
    for (const locale of Object.keys(seeds.locales)) {
      const rows = [...map.values()].filter((r) => r.locale === locale)
      try {
        const vols = await dfs.searchVolume(rows.map((r) => r.keyword), locale)
        const kd = await dfs.keywordDifficulty(rows.map((r) => r.keyword), locale)
        for (const v of vols) {
          const row = map.get(key(locale, v.keyword))
          if (!row) continue
          if (!row.sources.includes('dataforseo')) row.sources.push('dataforseo')
          Object.assign(row, { volume: v.volume, cpc: v.cpc })
          if (kd[v.keyword] !== undefined) row.difficulty = kd[v.keyword]
        }
        log(`dataforseo ${locale}: ${vols.length} volumes`)
      } catch (e) {
        log(`dataforseo skipped: ${(e as Error).message}`)
      }
    }
  }

  const keywords = [...map.values()]
  for (const row of keywords) row.prelim = prelimScore(row, seeds)
  keywords.sort((a, b) => b.prelim - a.prelim || a.keyword.localeCompare(b.keyword))
  return { generatedAt: new Date().toISOString(), requestsUsed: used, keywords }
}

export function topCandidates(file: KeywordsFile, n = 15) {
  return file.keywords.filter((k) => k.prelim > 0).slice(0, n)
}

async function main() {
  const { flags } = parseArgs(process.argv.slice(2))
  const offline = Boolean(flags['dry-run'] || flags.offline)
  const maxRequests = Number(flags['max-requests'] || limits.maxRequestsKeywords)
  fs.mkdirSync(paths.data, { recursive: true })
  const result = await buildKeywords({ offline, maxRequests, log: (s) => console.log(`[keywords] ${s}`) })
  if (!offline) writeJson(paths.keywords, result)
  logRun({ stage: 'keywords', note: `${result.keywords.length} keywords, ${result.requestsUsed} requests${offline ? ' (dry-run, not written)' : ''}`, providers: { gsc: has('GSC_CREDENTIALS_PATH'), dataforseo: has('DATAFORSEO_LOGIN'), serpapi: has('SERPAPI_KEY') } })
  console.log(`[keywords] ${result.keywords.length} keywords${offline ? ' (dry-run: nothing written)' : ` written to ${paths.keywords}`}`)
  for (const k of topCandidates(result)) console.log(`  ${k.prelim.toFixed(1).padStart(5)}  [${k.locale}] ${k.keyword}`)
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop() as string)) main().catch((e) => { console.error(e.message); process.exit(1) })
