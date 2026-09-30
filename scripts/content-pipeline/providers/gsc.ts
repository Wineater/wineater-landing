import crypto from 'node:crypto'
import fs from 'node:fs'
import { has } from '../lib/config'

export const enabled = () => has('GSC_CREDENTIALS_PATH') && has('GSC_SITE_URL')

const b64 = (b: Buffer | string) => Buffer.from(b).toString('base64url')

async function accessToken(): Promise<string> {
  const creds = JSON.parse(fs.readFileSync(process.env.GSC_CREDENTIALS_PATH as string, 'utf8'))
  const now = Math.floor(Date.now() / 1000)
  const header = b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = b64(
    JSON.stringify({
      iss: creds.client_email,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  )
  const signature = crypto.createSign('RSA-SHA256').update(`${header}.${claim}`).sign(creds.private_key).toString('base64url')
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${header}.${claim}.${signature}` }),
  })
  if (!res.ok) throw new Error(`GSC token request failed: HTTP ${res.status}`)
  return ((await res.json()) as { access_token: string }).access_token
}

export interface GscRow {
  keyword: string
  clicks: number
  impressions: number
  position: number
}

export async function topQueries(days = 90, rowLimit = 1000): Promise<GscRow[]> {
  const token = await accessToken()
  const end = new Date(Date.now() - 3 * 86400000)
  const start = new Date(end.getTime() - days * 86400000)
  const site = encodeURIComponent(process.env.GSC_SITE_URL as string)
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify({ startDate: start.toISOString().slice(0, 10), endDate: end.toISOString().slice(0, 10), dimensions: ['query'], rowLimit }),
  })
  if (!res.ok) throw new Error(`GSC query failed: HTTP ${res.status}`)
  const json = (await res.json()) as { rows?: { keys: string[]; clicks: number; impressions: number; position: number }[] }
  return (json.rows || []).map((r) => ({ keyword: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: r.position }))
}
