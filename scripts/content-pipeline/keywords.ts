import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { paths, has, limits } from './lib/config'
import { readJson, writeJson, parseArgs } from './lib/io'
import { normalizeKeyword, guessLocale } from './lib/text'
import { logRun } from './lib/runs'
import { fold, localeFor, localeFromFilename, readPlannerFile, type PlannerRow } from './lib/planner'
import { suggest } from './providers/autocomplete'
import * as dfs from './providers/dataforseo'
import * as serpapi from './providers/serpapi'
import * as gsc from './providers/gsc'
import * as trends from './providers/trends'
import type { TrendsRow, TrendsSeed } from './providers/trends'

export type KeywordSource = 'seed' | 'autocomplete' | 'gsc' | 'dataforseo' | 'serpapi-paa' | 'serpapi-related' | 'keyword-planner' | 'trends'
export type Audience = 'restaurant' | 'retail' | 'online'

export interface KeywordRow {
  keyword: string
  locale: 'en' | 'fr' | 'es'
  sources: KeywordSource[]
  seeds: string[]
  hits: number
  bestRank?: number
  question?: boolean
  audience?: Audience
  volume?: number
  volumeLow?: number
  volumeHigh?: number
  volumeMid?: number
  volumeRaw?: string
  interest?: number
  rising?: boolean | 'breakout'
  relatedTo?: string
  competition?: string
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
  locales: Record<string, { hl: string; questionPrefixes: string[]; seeds: { q: string; soup?: boolean; audience?: Audience }[]; trendHeads?: { q: string; audience?: Audience }[] }>
  b2bTerms: string[]
  consumerTerms: string[]
}

const AUDIENCE_HINTS: [Audience, RegExp][] = [
  ['restaurant', /restaurant|\bbar\b|\bbars\b|carte des vins|carta de vinos|wine list|wine menu|hostel|restauration|brasserie/],
  ['retail', /caviste|wine shop|wine store|vinoteca|tiendas? de vinos?|\bcave\b|boutique caviste|pos\b/],
  ['online', /online|e-?commerce|shopify|en ligne|widget|\bapi\b|woocommerce|tienda online|webshop/],
]
export function guessAudience(keyword: string): Audience | undefined {
  const k = fold(keyword)
  return AUDIENCE_HINTS.find(([, re]) => re.test(k))?.[0]
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('')

export function prelimScore(row: Pick<KeywordRow, 'keyword' | 'hits' | 'bestRank' | 'sources' | 'volume'> & { volumeMid?: number; interest?: number; rising?: boolean | 'breakout' }, seeds: Pick<Seeds, 'b2bTerms' | 'consumerTerms'>): number {
  const words = new Set(normalizeKeyword(row.keyword).split(' '))
  const b2b = seeds.b2bTerms.filter((t) => words.has(t)).length
  const consumer = seeds.consumerTerms.filter((t) => normalizeKeyword(row.keyword).includes(normalizeKeyword(t))).length
  const rankBonus = row.bestRank === undefined ? 0 : Math.max(0, 1 - row.bestRank / 10)
  const vol = row.volume ?? row.volumeMid
  const volume = vol ? Math.min(3, Math.log10(vol + 1)) : Math.min(1.5, (row.interest ?? 0) / 40) + (row.rising === 'breakout' ? 1 : row.rising ? 0.5 : 0)
  return Number((row.hits * 0.5 + row.sources.length + b2b * 1.5 - consumer * 3 + rankBonus + volume).toFixed(2))
}

export async function buildKeywords(opts: { offline: boolean; maxRequests: number; log?: (s: string) => void }): Promise<KeywordsFile> {
  const log = opts.log || (() => {})
  const seeds = readJson<Seeds>(paths.seeds, { locales: {}, b2bTerms: [], consumerTerms: [] })
  const existing = readJson<KeywordsFile>(paths.keywords, { generatedAt: '', requestsUsed: 0, keywords: [] })
  const map = new Map<string, KeywordRow>()
  const key = (locale: string, kw: string) => `${locale}|${normalizeKeyword(kw)}`
  for (const row of existing.keywords) map.set(key(row.locale, row.keyword), { ...row, hits: 0, bestRank: undefined, seeds: [] })

  const seedAudience = new Map<string, Audience>()
  const add = (kw: string, locale: KeywordRow['locale'], source: KeywordSource, seed: string, rank?: number, question = false) => {
    const normalized = normalizeKeyword(kw)
    if (normalized.length < 4 || normalized.split(' ').length > 9) return
    const k = key(locale, normalized)
    const row = map.get(k) || { keyword: normalized, locale, sources: [], seeds: [], hits: 0, prelim: 0 }
    if (!row.sources.includes(source)) row.sources.push(source)
    if (!row.seeds.includes(seed)) row.seeds.push(seed)
    const sa = seedAud.get(`${locale}|${seed}`)
    if (sa && !seedAudience.has(k)) seedAudience.set(k, sa)
    row.hits += 1
    if (rank !== undefined) row.bestRank = Math.min(row.bestRank ?? 99, rank)
    if (question) row.question = true
    map.set(k, row)
  }

  const seedAud = new Map<string, Audience>()
  for (const [loc, cfg] of Object.entries(seeds.locales)) for (const sd of cfg.seeds) if (sd.audience) seedAud.set(`${loc}|${sd.q}`, sd.audience)
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

  const keywords = [...map.values()]
  for (const row of keywords) {
    row.audience = row.audience || seedAudience.get(key(row.locale, row.keyword)) || guessAudience(row.keyword)
    row.prelim = prelimScore(row, seeds)
  }
  keywords.sort((a, b) => b.prelim - a.prelim || a.keyword.localeCompare(b.keyword))
  return { generatedAt: new Date().toISOString(), requestsUsed: used, keywords }
}

/** Merge Keyword Planner rows into the keyword list: case/accent-insensitive dedupe, best volume wins, nothing is removed. */
export function mergePlannerRows(file: KeywordsFile, rows: PlannerRow[], opts: { locale?: KeywordRow['locale'] } = {}): { added: number; updated: number; file: KeywordsFile } {
  const keywords = file.keywords.map((k) => ({ ...k }))
  const index = new Map<string, KeywordRow>()
  for (const k of keywords) index.set(`${k.locale}|${fold(k.keyword)}`, k)
  let added = 0
  let updated = 0
  for (const r of rows) {
    const normalized = normalizeKeyword(r.keyword)
    if (normalized.length < 4) continue
    const locale = localeFor(normalized, opts.locale)
    const k = `${locale}|${fold(normalized)}`
    let row = index.get(k)
    if (!row) {
      row = { keyword: normalized, locale, sources: [], seeds: [], hits: 1, prelim: 0 }
      keywords.push(row)
      index.set(k, row)
      added++
    } else updated++
    if (!row.sources.includes('keyword-planner')) row.sources.push('keyword-planner')
    if (r.volumeMid !== undefined && (row.volumeMid === undefined || r.volumeMid > row.volumeMid)) {
      Object.assign(row, { volumeLow: r.volumeLow, volumeHigh: r.volumeHigh, volumeMid: r.volumeMid, volumeRaw: r.volumeRaw })
    }
    if (r.competition && !row.competition) row.competition = r.competition
  }
  return { added, updated, file: { ...file, keywords } }
}

export function rescore(file: KeywordsFile): KeywordsFile {
  const seeds = readJson<Seeds>(paths.seeds, { locales: {}, b2bTerms: [], consumerTerms: [] })
  for (const row of file.keywords) {
    row.audience = row.audience || guessAudience(row.keyword)
    row.prelim = prelimScore(row, seeds)
  }
  file.keywords.sort((a, b) => b.prelim - a.prelim || a.keyword.localeCompare(b.keyword))
  return file
}

export function mergeTrendsRows(file: KeywordsFile, rows: TrendsRow[]): { added: number; updated: number; file: KeywordsFile } {
  const keywords = file.keywords.map((k) => ({ ...k }))
  const index = new Map<string, KeywordRow>()
  for (const k of keywords) index.set(`${k.locale}|${fold(k.keyword)}`, k)
  let added = 0
  let updated = 0
  for (const r of rows) {
    const normalized = normalizeKeyword(r.keyword)
    if (normalized.length < 4 || normalized.split(' ').length > 9) continue
    const k = `${r.locale}|${fold(normalized)}`
    let row = index.get(k)
    if (!row) {
      row = { keyword: normalized, locale: r.locale, sources: [], seeds: [r.seed], hits: 1, prelim: 0 }
      keywords.push(row)
      index.set(k, row)
      added++
    } else updated++
    if (!row.sources.includes('trends')) row.sources.push('trends')
    if (r.interest !== undefined) row.interest = Math.max(row.interest ?? 0, r.interest)
    if (r.rising) row.rising = r.rising === 'breakout' || row.rising === 'breakout' ? 'breakout' : true
    if (r.relatedTo && !row.relatedTo) row.relatedTo = r.relatedTo
    if (r.audience && !row.audience) row.audience = r.audience
  }
  return { added, updated, file: { ...file, keywords } }
}

export async function runTrends(opts: { maxRequests: number; locale?: string; log?: (s: string) => void; write: boolean }): Promise<{ rows: number; requests: number; blocked: boolean; added: number }> {
  const log = opts.log || (() => {})
  const seeds = readJson<Seeds>(paths.seeds, { locales: {}, b2bTerms: [], consumerTerms: [] })
  const list: TrendsSeed[] = []
  const seen = new Set<string>()
  for (const [locale, cfg] of Object.entries(seeds.locales)) {
    if (opts.locale && opts.locale !== locale) continue
    for (const h of cfg.trendHeads || []) if (!seen.has(`${locale}|${h.q}`)) { seen.add(`${locale}|${h.q}`); list.push({ q: h.q, locale: locale as KeywordRow['locale'], audience: h.audience, head: true }) }
    for (const sd of cfg.seeds) if (!seen.has(`${locale}|${sd.q}`)) { seen.add(`${locale}|${sd.q}`); list.push({ q: sd.q, locale: locale as KeywordRow['locale'], audience: sd.audience }) }
  }
  const res = await trends.collect(list, { maxRequests: opts.maxRequests, log })
  let added = 0
  if (res.rows.length && opts.write) {
    const data = readJson<KeywordsFile>(paths.keywords, { generatedAt: '', requestsUsed: 0, keywords: [] })
    const m = mergeTrendsRows(data, res.rows)
    added = m.added
    writeJson(paths.keywords, rescore({ ...m.file, generatedAt: new Date().toISOString() }))
    logRun({ stage: 'keywords', note: `trends: ${res.rows.length} rows (${m.added} new), ${res.requests} requests${res.blocked ? ', BLOCKED' : ''}` })
  }
  return { rows: res.rows.length, requests: res.requests, blocked: res.blocked, added }
}

/** Real Google Ads volumes from DataForSEO for the best keywords that have none, plus seed suggestions. Costs money: capped. */
export async function runDataforseo(opts: { maxKeywords: number; maxSuggestSeeds: number; dryRun: boolean; log?: (s: string) => void }): Promise<{ updated: number; added: number; costUsd: number }> {
  const log = opts.log || (() => {})
  dfs.configure({ dryRun: opts.dryRun })
  const data = readJson<KeywordsFile>(paths.keywords, { generatedAt: '', requestsUsed: 0, keywords: [] })
  const seeds = readJson<Seeds>(paths.seeds, { locales: {}, b2bTerms: [], consumerTerms: [] })
  const index = new Map(data.keywords.map((k) => [`${k.locale}|${fold(k.keyword)}`, k]))
  let updated = 0
  let added = 0
  for (const locale of Object.keys(seeds.locales)) {
    const need = data.keywords.filter((k) => k.locale === locale && k.volume === undefined && k.prelim > 0).slice(0, opts.maxKeywords)
    if (need.length) {
      const vols = await dfs.searchVolume(need.map((k) => k.keyword), locale)
      for (const v of vols) {
        const row = index.get(`${locale}|${fold(v.keyword)}`)
        if (!row || v.volume === undefined) continue
        Object.assign(row, { volume: v.volume, volumeMid: v.volume, volumeLow: v.volume, volumeHigh: v.volume, volumeRaw: String(v.volume), cpc: v.cpc })
        if (!row.sources.includes('dataforseo')) row.sources.push('dataforseo')
        updated++
      }
      log(`dataforseo ${locale}: ${need.length} keywords sent, ${vols.length} returned`)
    }
    for (const sd of seeds.locales[locale].seeds.slice(0, opts.maxSuggestSeeds)) {
      for (const s of await dfs.keywordSuggestions(sd.q, locale, 30)) {
        const nk = normalizeKeyword(s.keyword)
        if (nk.length < 4) continue
        let row = index.get(`${locale}|${fold(nk)}`)
        if (!row) {
          row = { keyword: nk, locale: locale as KeywordRow['locale'], sources: [], seeds: [sd.q], hits: 1, prelim: 0, audience: sd.audience }
          data.keywords.push(row)
          index.set(`${locale}|${fold(nk)}`, row)
          added++
        }
        if (!row.sources.includes('dataforseo')) row.sources.push('dataforseo')
        if (s.volume !== undefined) Object.assign(row, { volume: s.volume, volumeMid: s.volume, volumeLow: s.volume, volumeHigh: s.volume, volumeRaw: String(s.volume), cpc: s.cpc, difficulty: s.difficulty ?? row.difficulty })
      }
    }
  }
  const costUsd = dfs.totalCostUsd()
  if (!opts.dryRun) {
    writeJson(paths.keywords, rescore({ ...data, generatedAt: new Date().toISOString() }))
    logRun({ stage: 'dataforseo', note: `${updated} volumes, ${added} new keywords`, costUsd: Number(costUsd.toFixed(4)), calls: dfs.calls.length })
  }
  log(`dataforseo: ${updated} volumes, ${added} new keywords, cost ${costUsd.toFixed(4)} USD in ${dfs.calls.length} calls${opts.dryRun ? ' (dry-run: nothing sent or written)' : ''}`)
  return { updated, added, costUsd }
}

const importedLog = () => path.join(paths.imports, '.imported.json')

/** Import the given files (or every not-yet-imported file of data/content/imports/). Returns what was merged. */
export function runImport(opts: { files?: string[]; locale?: KeywordRow['locale']; write: boolean; log?: (s: string) => void }): { files: number; added: number; updated: number } {
  const log = opts.log || (() => {})
  const done = readJson<Record<string, string>>(importedLog(), {})
  const hash = (f: string) => createHash('sha256').update(fs.readFileSync(f)).digest('hex')
  let files = opts.files
  if (!files) {
    fs.mkdirSync(paths.imports, { recursive: true })
    files = fs.readdirSync(paths.imports).filter((f) => /\.(csv|tsv|txt)$/i.test(f)).map((f) => path.join(paths.imports, f)).filter((f) => done[path.basename(f)] !== hash(f))
  }
  let data = readJson<KeywordsFile>(paths.keywords, { generatedAt: '', requestsUsed: 0, keywords: [] })
  let added = 0
  let updated = 0
  for (const f of files) {
    const rows = readPlannerFile(f)
    const m = mergePlannerRows(data, rows, { locale: opts.locale || localeFromFilename(f) })
    data = m.file
    added += m.added
    updated += m.updated
    done[path.basename(f)] = hash(f)
    log(`${path.basename(f)}: ${rows.length} rows, ${m.added} new, ${m.updated} merged`)
  }
  if (files.length && opts.write) {
    data.generatedAt = new Date().toISOString()
    writeJson(paths.keywords, rescore(data))
    writeJson(importedLog(), done)
    logRun({ stage: 'keywords', note: `planner import: ${files.length} files, ${added} new, ${updated} merged` })
  }
  return { files: files.length, added, updated }
}

export function topCandidates(file: KeywordsFile, n = 15) {
  return file.keywords.filter((k) => k.prelim > 0).slice(0, n)
}

async function main() {
  const { flags } = parseArgs(process.argv.slice(2))
  const offline = Boolean(flags['dry-run'] || flags.offline)
  const maxRequests = Number(flags['max-requests'] || limits.maxRequestsKeywords)
  fs.mkdirSync(paths.data, { recursive: true })
  if (typeof flags.import === 'string') {
    const file = path.resolve(flags.import)
    if (!fs.existsSync(file)) throw new Error(`file not found: ${file}`)
    const loc = flags.locale as KeywordRow['locale'] | undefined
    const r = runImport({ files: [file], locale: loc, write: !flags['dry-run'], log: (x) => console.log(`[keywords] ${x}`) })
    console.log(`[keywords] import: ${r.added} new keywords, ${r.updated} existing keywords got volumes${flags['dry-run'] ? ' (dry-run: nothing written)' : `; saved to ${paths.keywords}`}`)
    return
  }
  const wantTrends = Boolean(flags.trends)
  const wantDfs = Boolean(flags.dataforseo)
  if (wantDfs && !dfs.enabled() && !flags['dry-run']) throw new Error('DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD are not set (see scripts/content-pipeline/.env.example)')
  if ((wantTrends || wantDfs) && !flags.offline) {
    if (wantTrends) {
      if (flags['dry-run']) console.log(`[keywords] trends dry-run: would request Google Trends for the seeds and trend heads (cap ${Number(flags['trends-max'] || 40)} requests, 1.5-3 s apart, cached 7 days); nothing sent`)
      else if (!trends.enabled()) console.log('[keywords] trends paused after a recent block; delete data/content/.cache/trends/blocked.json to retry')
      else {
        const t = await runTrends({ maxRequests: Number(flags['trends-max'] || 40), locale: typeof flags['trends-locale'] === 'string' ? flags['trends-locale'] : undefined, write: !flags['dry-run'], log: (x) => console.log(`[keywords] ${x}`) })
        console.log(`[keywords] trends: ${t.rows} rows (${t.added} new), ${t.requests} requests${t.blocked ? ', BLOCKED by Google' : ''}`)
      }
    }
    if (wantDfs) await runDataforseo({ maxKeywords: Number(flags['dataforseo-max'] || 300), maxSuggestSeeds: Number(flags['dataforseo-seeds'] || 5), dryRun: Boolean(flags['dry-run']), log: (x) => console.log(`[keywords] ${x}`) })
    return
  }
  const result = await buildKeywords({ offline, maxRequests, log: (s) => console.log(`[keywords] ${s}`) })
  if (!offline) writeJson(paths.keywords, result)
  logRun({ stage: 'keywords', note: `${result.keywords.length} keywords, ${result.requestsUsed} requests${offline ? ' (dry-run, not written)' : ''}`, providers: { gsc: has('GSC_CREDENTIALS_PATH'), dataforseo: has('DATAFORSEO_LOGIN'), serpapi: has('SERPAPI_KEY') } })
  console.log(`[keywords] ${result.keywords.length} keywords${offline ? ' (dry-run: nothing written)' : ` written to ${paths.keywords}`}`)
  for (const k of topCandidates(result)) console.log(`  ${k.prelim.toFixed(1).padStart(5)}  [${k.locale}] ${k.keyword}`)
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].split('/').pop() as string)) main().catch((e) => { console.error(e.message); process.exit(1) })
