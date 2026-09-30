import { has } from '../lib/config'

const GL: Record<string, string> = { en: 'us', fr: 'fr', es: 'es' }

export const enabled = () => has('SERPAPI_KEY')

export interface SerpResult {
  paa: string[]
  related: string[]
  organic: { title: string; url: string; snippet?: string }[]
}

export async function serp(q: string, locale: string): Promise<SerpResult> {
  const params = new URLSearchParams({ engine: 'google', q, hl: locale, gl: GL[locale] || 'us', api_key: process.env.SERPAPI_KEY || '' })
  const res = await fetch(`https://serpapi.com/search.json?${params}`, { signal: AbortSignal.timeout(45000) })
  if (!res.ok) throw new Error(`SerpAPI failed: HTTP ${res.status}`)
  const json: any = await res.json()
  return {
    paa: (json.related_questions || []).map((r: any) => r.question).filter(Boolean),
    related: (json.related_searches || []).map((r: any) => r.query).filter(Boolean),
    organic: (json.organic_results || []).map((r: any) => ({ title: r.title, url: r.link, snippet: r.snippet })),
  }
}
