import { cachedText, type Budget } from '../lib/http'

export function autocompleteUrl(q: string, hl: string): string {
  return `https://suggestqueries.google.com/complete/search?client=firefox&hl=${hl}&q=${encodeURIComponent(q)}`
}

export function parseAutocomplete(body: string | null): string[] {
  if (!body) return []
  try {
    const json = JSON.parse(body)
    return Array.isArray(json?.[1]) ? json[1].filter((s: unknown): s is string => typeof s === 'string') : []
  } catch {
    return []
  }
}

export async function suggest(q: string, hl: string, budget: Budget, offline: boolean): Promise<string[]> {
  const body = await cachedText(autocompleteUrl(q, hl), { ttlDays: 30, minDelayMs: 1500, offline }, budget)
  return parseAutocomplete(body)
}
