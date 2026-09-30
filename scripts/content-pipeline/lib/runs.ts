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

/**
 * Cost estimate from Gemini usage metadata. Prices come from .env (USD per million tokens) and are
 * deliberately not hard-coded. With no prices set the cost is 0 and only tokens are tracked.
 */
export function priceUsd(role: 'plan' | 'draft', inputTokens: number, outputTokens: number, searches = 0): number {
  const k = role === 'plan' ? 'PLAN' : 'DRAFT'
  const inPrice = Number(process.env[`CONTENT_PRICE_${k}_IN_PER_MTOK`] || 0)
  const outPrice = Number(process.env[`CONTENT_PRICE_${k}_OUT_PER_MTOK`] || 0)
  const searchPrice = Number(process.env.CONTENT_PRICE_PER_SEARCH || 0)
  return (inputTokens * inPrice + outputTokens * outPrice) / 1e6 + searches * searchPrice
}
