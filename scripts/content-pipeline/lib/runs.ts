import fs from 'node:fs'
import { appendJsonl } from './io'
import { paths } from './config'

export interface RunRow {
  ts: string
  stage: string
  model?: string
  inputTokens?: number
  outputTokens?: number
  searches?: number
  costUsd?: number
  note?: string
  [key: string]: unknown
}

export function logRun(row: Omit<RunRow, 'ts'>) {
  if (process.argv.includes('--dry-run')) return
  appendJsonl(paths.runs, { ts: new Date().toISOString(), ...row })
}

export interface Price { in: number; out: number; inHigh?: number; outHigh?: number }

/** USD per million tokens, from ai.google.dev/gemini-api/docs/pricing (checked 2026-09-30). */
export const DEFAULT_PRICES: Record<string, Price> = {
  'gemini-3.1-flash-lite': { in: 0.25, out: 1.5 },
  'gemini-3.5-flash-lite': { in: 0.3, out: 2.5 },
  // 3.8 Flash: introductory price (output includes thinking) until 2026-12-31, then the second price
  'gemini-3.8-flash': { in: 0.75, out: 3.75 },
  // Pro: second price applies to prompts above 200k tokens
  'gemini-3.1-pro-preview': { in: 2, out: 12, inHigh: 4, outHigh: 18 },
}
const FLASH_38_FROM_2027: Price = { in: 1.5, out: 7.5 }
export const SEARCH_FREE_PER_MONTH = 5000
export const SEARCH_USD_EACH = 14 / 1000

/** Override or add prices with CONTENT_PRICES_JSON='{"model-name":{"in":1,"out":2}}'. */
export function priceFor(model: string, now = new Date()): Price | undefined {
  let table: Record<string, Price> = DEFAULT_PRICES
  try {
    if (process.env.CONTENT_PRICES_JSON) table = { ...DEFAULT_PRICES, ...JSON.parse(process.env.CONTENT_PRICES_JSON) }
  } catch { /* ignore bad override */ }
  if (model === 'gemini-3.8-flash' && !(process.env.CONTENT_PRICES_JSON || '').includes(model) && now >= new Date('2027-01-01T00:00:00Z')) return FLASH_38_FROM_2027
  return table[model]
}

let monthSearches: number | null = null
/** Grounded searches already logged this calendar month (5,000 are free). */
export function searchesThisMonth(): number {
  if (monthSearches !== null) return monthSearches
  const month = new Date().toISOString().slice(0, 7)
  let n = 0
  try {
    for (const line of fs.readFileSync(paths.runs, 'utf8').split('\n')) {
      if (!line.startsWith('{')) continue
      const r = JSON.parse(line) as RunRow
      if (r.ts?.startsWith(month) && r.searches) n += r.searches
    }
  } catch { /* no log yet */ }
  monthSearches = n
  return n
}

/** Cost from Gemini usage metadata and the price table. Unknown model: 0 and a warning in the run log note. */
export function priceUsd(model: string, inputTokens: number, outputTokens: number, searches = 0): number {
  const p = priceFor(model)
  let usd = 0
  if (p) {
    const high = inputTokens > 200_000
    usd += (inputTokens * (high && p.inHigh ? p.inHigh : p.in) + outputTokens * (high && p.outHigh ? p.outHigh : p.out)) / 1e6
  }
  if (searches) {
    const before = searchesThisMonth()
    const billable = Math.max(0, before + searches - Math.max(before, SEARCH_FREE_PER_MONTH))
    usd += billable * SEARCH_USD_EACH
    monthSearches = before + searches
  }
  return usd
}
