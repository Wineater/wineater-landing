import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { paths } from '../lib/config'
import { ensureDir } from '../lib/io'

/** Google Trends via the public explore / widgetdata endpoints that trends.google.com itself uses. No key. */

const BASE = 'https://trends.google.com/trends'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
const HL: Record<string, string> = { en: 'en-US', fr: 'fr', es: 'es' }
/** worldwide first, then the countries the seed language implies; related queries come from the last one */
export const GEOS: Record<string, string[]> = { en: ['', 'GB', 'US'], fr: ['', 'FR'], es: ['', 'ES'] }
const BATCH = 5
const CACHE_DAYS = 7
const BLOCK_PAUSE_HOURS = 6

export class TrendsBlockedError extends Error {}

export interface TrendsRow {
  keyword: string
  locale: 'en' | 'fr' | 'es'
  seed: string
  audience?: 'restaurant' | 'retail' | 'online'
  /** mean weekly search interest over 12 months, 0 to 100, relative to the top seed of the same comparison (up to 5 seeds of one language and audience); comparable inside a batch, a rough guide across batches */
  interest?: number
  rising?: boolean | 'breakout'
  relatedTo?: string
}

export interface Widget { id: string; token: string; request: any }

const stripPrefix = (body: string) => body.replace(/^\)\]\}',?\s*/, '')

export function parseExplore(body: string): Widget[] {
  const json = JSON.parse(stripPrefix(body))
  return (json.widgets || []).filter((w: any) => w.token && w.request).map((w: any) => ({ id: w.id, token: w.token, request: w.request }))
}

/** mean weekly interest per compared term (same order as the request) */
export function parseMultiline(body: string): number[] {
  const data: any[] = JSON.parse(stripPrefix(body))?.default?.timelineData || []
  if (!data.length) return []
  const n = data[0].value?.length || 0
  const sums = new Array(n).fill(0)
  for (const p of data) (p.value || []).forEach((v: number, i: number) => (sums[i] += v))
  return sums.map((s: number) => s / data.length)
}

export interface RelatedQuery { query: string; value: number; kind: 'top' | 'rising' | 'breakout' }

export function parseRelated(body: string): RelatedQuery[] {
  const lists: any[] = JSON.parse(stripPrefix(body))?.default?.rankedList || []
  const out: RelatedQuery[] = []
  const add = (list: any, rising: boolean) => {
    for (const k of list?.rankedKeyword || []) {
      if (!k.query) continue
      const breakout = rising && (/breakout|explos|auge|forte/i.test(String(k.formattedValue)) || k.value >= 5000)
      out.push({ query: String(k.query), value: Number(k.value) || 0, kind: rising ? (breakout ? 'breakout' : 'rising') : 'top' })
    }
  }
  add(lists[0], false)
  add(lists[1], true)
  return out
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const state = { cookie: '', requests: 0, max: 40, last: 0 }
const blockFile = () => path.join(paths.cache, 'trends', 'blocked.json')

export function pausedUntil(): number {
  try {
    return (JSON.parse(fs.readFileSync(blockFile(), 'utf8')) as { until: number }).until || 0
  } catch {
    return 0
  }
}
export const enabled = () => process.env.TRENDS_DISABLED !== '1' && Date.now() > pausedUntil()

async function get(url: string, withCookie = true): Promise<string> {
  if (state.requests >= state.max) throw new Error('trends request cap reached')
  for (let attempt = 0; attempt < 4; attempt++) {
    const wait = state.last + 1500 + Math.floor(Math.random() * 1500) - Date.now()
    if (wait > 0) await sleep(wait)
    state.last = Date.now()
    state.requests++
    const res = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'en-US,en;q=0.9', ...(withCookie && state.cookie ? { cookie: state.cookie } : {}) }, signal: AbortSignal.timeout(20000) })
    if (res.ok) {
      const jar = res.headers.getSetCookie?.() || []
      if (jar.length && !state.cookie) state.cookie = jar.map((c) => c.split(';')[0]).join('; ')
      return res.text()
    }
    if (res.status === 429 || res.status === 403) {
      if (attempt === 3) throw new TrendsBlockedError(`Google Trends answered HTTP ${res.status} after retries`)
      await sleep(5000 * 3 ** attempt)
      continue
    }
    throw new Error(`Google Trends HTTP ${res.status}`)
  }
  throw new TrendsBlockedError('Google Trends blocked')
}

async function session() {
  if (state.cookie) return
  const res = await fetch(`${BASE}/?geo=US`, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20000) })
  state.cookie = (res.headers.getSetCookie?.() || []).map((c) => c.split(';')[0]).join('; ')
  res.body?.cancel().catch(() => {})
}

const q = (o: unknown) => encodeURIComponent(JSON.stringify(o))

async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const file = path.join(paths.cache, 'trends', `${crypto.createHash('sha1').update(key).digest('hex')}.json`)
  try {
    const hit = JSON.parse(fs.readFileSync(file, 'utf8')) as { at: number; data: T }
    if (Date.now() - hit.at < CACHE_DAYS * 86400000) return hit.data
  } catch { /* miss */ }
  const data = await fn()
  ensureDir(path.dirname(file))
  fs.writeFileSync(file, JSON.stringify({ at: Date.now(), data }))
  return data
}

async function exploreWidgets(terms: string[], geo: string, locale: string): Promise<Widget[]> {
  await session()
  const req = { comparisonItem: terms.map((keyword) => ({ keyword, geo, time: 'today 12-m' })), category: 0, property: '' }
  return parseExplore(await get(`${BASE}/api/explore?hl=${HL[locale]}&tz=0&req=${q(req)}`))
}

/** mean weekly interest (0-100 inside this comparison) of every term */
export async function interestFor(terms: string[], geo: string, locale: string): Promise<Record<string, number>> {
  return cached(`interest|${locale}|${geo}|${terms.join('|')}`, async () => {
    const widgets = await exploreWidgets(terms, geo, locale)
    const ts = widgets.find((w) => w.id === 'TIMESERIES')
    if (!ts) throw new Error('no TIMESERIES widget in explore response')
    const means = parseMultiline(await get(`${BASE}/api/widgetdata/multiline?hl=${HL[locale]}&tz=0&req=${q(ts.request)}&token=${ts.token}`))
    const out: Record<string, number> = {}
    terms.forEach((t, i) => (out[t] = Number((means[i] || 0).toFixed(2))))
    return out
  })
}

export async function relatedFor(term: string, geo: string, locale: string): Promise<RelatedQuery[]> {
  return cached(`related|${locale}|${geo}|${term}`, async () => {
    const widgets = await exploreWidgets([term], geo, locale)
    const rq = widgets.find((w) => w.id === 'RELATED_QUERIES')
    if (!rq) return []
    return parseRelated(await get(`${BASE}/api/widgetdata/relatedsearches?hl=${HL[locale]}&tz=0&req=${q(rq.request)}&token=${rq.token}`))
  })
}

export interface TrendsSeed { q: string; locale: 'en' | 'fr' | 'es'; audience?: TrendsRow['audience']; head?: boolean }

/** Serial, capped, cached. Returns what it got even when Google starts refusing. */
export async function collect(seeds: TrendsSeed[], opts: { maxRequests?: number; log?: (s: string) => void }): Promise<{ rows: TrendsRow[]; requests: number; blocked: boolean }> {
  const log = opts.log || (() => {})
  state.max = opts.maxRequests ?? 40
  state.requests = 0
  const rows: TrendsRow[] = []
  let blocked = false
  try {
    for (const locale of ['en', 'fr', 'es'] as const) {
      const mine = seeds.filter((x) => x.locale === locale)
      if (!mine.length) continue
      const sorted = [...mine].sort((a, b) => (a.audience || '').localeCompare(b.audience || ''))
      const geos = [GEOS[locale][0], GEOS[locale][GEOS[locale].length - 1]]
      const best = new Map<string, number>()
      for (const geo of geos) {
        for (let i = 0; i < sorted.length; i += BATCH) {
          const terms = sorted.slice(i, i + BATCH).map((b) => b.q)
          const means = await interestFor(terms, geo, locale)
          for (const t of terms) best.set(t, Math.max(best.get(t) ?? 0, means[t] ?? 0))
        }
        log(`trends ${locale} ${geo || 'worldwide'}: done`)
      }
      for (const b of sorted) rows.push({ keyword: b.q, locale, seed: b.q, audience: b.audience, interest: Number((best.get(b.q) ?? 0).toFixed(1)) })
    }
    const isHead = new Set(seeds.filter((x) => x.head).map((x) => `${x.locale}|${x.q}`))
    const order = rows.filter((r) => isHead.has(`${r.locale}|${r.seed}`) || (r.interest ?? 0) > 0).sort((a, b) => Number(isHead.has(`${b.locale}|${b.seed}`)) - Number(isHead.has(`${a.locale}|${a.seed}`)) || (b.interest ?? 0) - (a.interest ?? 0))
    for (const r of order) {
      const geos = GEOS[r.locale]
      const rel = await relatedFor(r.seed, geos[geos.length - 1], r.locale)
      for (const k of rel) {
        if (k.kind === 'top') rows.push({ keyword: k.query, locale: r.locale, seed: r.seed, audience: r.audience, relatedTo: r.seed, interest: Number(((r.interest ?? 0) * k.value / 100).toFixed(1)), rising: false })
        else rows.push({ keyword: k.query, locale: r.locale, seed: r.seed, audience: r.audience, relatedTo: r.seed, rising: k.kind === 'breakout' ? 'breakout' : true })
      }
    }
  } catch (e) {
    if (e instanceof TrendsBlockedError) {
      blocked = true
      ensureDir(path.dirname(blockFile()))
      fs.writeFileSync(blockFile(), JSON.stringify({ until: Date.now() + BLOCK_PAUSE_HOURS * 3600000, reason: e.message }))
      log(`trends blocked: ${e.message}; paused for ${BLOCK_PAUSE_HOURS} h, continuing with ${rows.length} rows`)
    } else if ((e as Error).message === 'trends request cap reached') log(`trends request cap reached (${state.max}); rerun to continue from the cache`)
    else log(`trends stopped: ${(e as Error).message}`)
  }
  return { rows, requests: state.requests, blocked }
}
