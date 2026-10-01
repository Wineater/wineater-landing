import { has } from '../lib/config'

const LOCATION: Record<string, number> = { en: 2840, fr: 2250, es: 2724 }

export const enabled = () => has('DATAFORSEO_LOGIN') && has('DATAFORSEO_PASSWORD')

export type Transport = (url: string, init: RequestInit) => Promise<{ ok: boolean; status: number; json: () => Promise<any> }>
let transport: Transport = (url, init) => fetch(url, init)
let dry = false
export const calls: { path: string; costUsd: number }[] = []
/** tests inject a fake transport; --dry-run prints each request body and sends nothing */
export function configure(opts: { transport?: Transport; dryRun?: boolean }) {
  if (opts.transport) transport = opts.transport
  if (opts.dryRun !== undefined) dry = opts.dryRun
}
export const totalCostUsd = () => calls.reduce((a, c) => a + c.costUsd, 0)

async function post(pathname: string, body: unknown): Promise<any> {
  if (dry) {
    console.log(`[dataforseo] DRY RUN POST https://api.dataforseo.com${pathname} (Basic auth from env, not shown)\n${JSON.stringify(body, null, 1).slice(0, 600)}`)
    return { cost: 0, tasks: [{ result: [] }] }
  }
  const auth = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString('base64')
  const res = await transport(`https://api.dataforseo.com${pathname}`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  })
  if (!res.ok) throw new Error(`DataForSEO ${pathname} failed: HTTP ${res.status}`)
  const json = await res.json()
  const costUsd = Number(json?.cost) || 0
  calls.push({ path: pathname, costUsd })
  console.log(`[dataforseo] ${pathname} cost ${costUsd} USD (status ${json?.status_code ?? '?'})`)
  return json
}

export interface VolumeRow {
  keyword: string
  volume?: number
  cpc?: number
  competition?: number
}

export async function searchVolume(keywords: string[], locale: string): Promise<VolumeRow[]> {
  const out: VolumeRow[] = []
  for (let i = 0; i < keywords.length; i += 1000) {
    const json = await post('/v3/keywords_data/google_ads/search_volume/live', [
      { keywords: keywords.slice(i, i + 1000), location_code: LOCATION[locale], language_code: locale },
    ])
    for (const r of json?.tasks?.[0]?.result || []) {
      out.push({ keyword: r.keyword, volume: r.search_volume ?? undefined, cpc: r.cpc ?? undefined, competition: r.competition_index ?? undefined })
    }
  }
  return out
}

export async function keywordDifficulty(keywords: string[], locale: string): Promise<Record<string, number>> {
  const out: Record<string, number> = {}
  for (let i = 0; i < keywords.length; i += 1000) {
    const json = await post('/v3/dataforseo_labs/google/bulk_keyword_difficulty/live', [
      { keywords: keywords.slice(i, i + 1000), location_code: LOCATION[locale], language_code: locale },
    ])
    for (const r of json?.tasks?.[0]?.result?.[0]?.items || []) {
      if (typeof r.keyword_difficulty === 'number') out[r.keyword] = r.keyword_difficulty
    }
  }
  return out
}

export async function peopleAlsoAsk(keyword: string, locale: string): Promise<string[]> {
  const json = await post('/v3/serp/google/organic/live/advanced', [
    { keyword, location_code: LOCATION[locale], language_code: locale, depth: 10, people_also_ask_click_depth: 1 },
  ])
  const items: any[] = json?.tasks?.[0]?.result?.[0]?.items || []
  return items
    .filter((i) => i.type === 'people_also_ask')
    .flatMap((i) => (i.items || []).map((q: any) => q.title as string))
    .filter(Boolean)
}

export interface SuggestionRow extends VolumeRow {
  difficulty?: number
}

/** Keyword ideas for a seed phrase, with Google Ads volume (DataForSEO Labs keyword_suggestions). */
export async function keywordSuggestions(seed: string, locale: string, limit = 50): Promise<SuggestionRow[]> {
  const json = await post('/v3/dataforseo_labs/google/keyword_suggestions/live', [
    { keyword: seed, location_code: LOCATION[locale], language_code: locale, limit, include_seed_keyword: true },
  ])
  return (json?.tasks?.[0]?.result?.[0]?.items || [])
    .filter((i: any) => i.keyword)
    .map((i: any) => ({ keyword: i.keyword as string, volume: i.keyword_info?.search_volume ?? undefined, cpc: i.keyword_info?.cpc ?? undefined, competition: i.keyword_info?.competition ?? undefined, difficulty: i.keyword_properties?.keyword_difficulty ?? undefined }))
}
