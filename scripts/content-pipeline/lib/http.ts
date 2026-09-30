import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { paths } from './config'
import { ensureDir } from './io'

const lastHit = new Map<string, number>()

export interface FetchOpts {
  ttlDays?: number
  minDelayMs?: number
  offline?: boolean
  init?: RequestInit
  cacheKeyExtra?: string
}

export interface Budget {
  remaining: number
}

function cacheFile(url: string, extra = ''): string {
  const h = crypto.createHash('sha1').update(url + extra).digest('hex')
  return path.join(paths.cache, 'http', `${h}.json`)
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function cachedText(url: string, opts: FetchOpts = {}, budget?: Budget): Promise<string | null> {
  const file = cacheFile(url, opts.cacheKeyExtra)
  const ttl = (opts.ttlDays ?? 30) * 86400000
  if (fs.existsSync(file)) {
    const hit = JSON.parse(fs.readFileSync(file, 'utf8')) as { at: number; body: string }
    if (Date.now() - hit.at < ttl) return hit.body
  }
  if (opts.offline) return null
  if (budget && budget.remaining <= 0) return null

  const host = new URL(url).host
  const wait = (lastHit.get(host) ?? 0) + (opts.minDelayMs ?? 1200) - Date.now()
  if (wait > 0) await sleep(wait + Math.floor(Math.random() * 300))
  lastHit.set(host, Date.now())
  if (budget) budget.remaining--

  const res = await fetch(url, {
    ...opts.init,
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; WineaterContentBot/1.0; +https://wineater.com)', ...(opts.init?.headers || {}) },
    signal: AbortSignal.timeout(20000),
  })
  if (res.status === 429 || res.status === 503) throw new Error(`rate limited by ${host} (${res.status}); stop and retry later`)
  if (!res.ok) return null
  const body = await res.text()
  ensureDir(path.dirname(file))
  fs.writeFileSync(file, JSON.stringify({ at: Date.now(), body }))
  return body
}

export async function urlIsReachable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; WineaterContentBot/1.0)' },
      signal: AbortSignal.timeout(15000),
    })
    return res.ok
  } catch {
    return false
  }
}

export function htmlToText(html: string, max = 6000): string {
  return html
    .replace(/<(script|style|noscript|svg|nav|footer|header)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}
