import fs from 'node:fs'
import path from 'node:path'
import { guessLocale, normalizeKeyword } from './text'

/** Parser for Google Ads Keyword Planner exports (UTF-16LE tab-separated "csv" or UTF-8 CSV, any UI language). */

export interface PlannerRow {
  keyword: string
  volumeRaw: string
  volumeLow?: number
  volumeHigh?: number
  volumeMid?: number
  competition?: string
}

export const fold = (s: string): string => normalizeKeyword(s).normalize('NFD').replace(/[̀-ͯ]/g, '')

export function decodeBuffer(buf: Buffer): string {
  if (buf.length >= 2 && buf[0] === 0xff && buf[1] === 0xfe) return buf.subarray(2).toString('utf16le')
  if (buf.length >= 2 && buf[0] === 0xfe && buf[1] === 0xff) {
    const swapped = Buffer.from(buf.subarray(2))
    swapped.swap16()
    return swapped.toString('utf16le')
  }
  if (buf.length >= 4 && buf.subarray(0, 400).filter((b) => b === 0).length > Math.min(buf.length, 400) / 4) return buf.toString('utf16le')
  let t = buf.toString('utf8')
  if (t.charCodeAt(0) === 0xfeff) t = t.slice(1)
  return t
}

function splitLine(line: string, delim: string): string[] {
  const out: string[] = []
  let cur = ''
  let q = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (q) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++ } else if (c === '"') q = false
      else cur += c
    } else if (c === '"') q = true
    else if (c === delim) { out.push(cur); cur = '' } else cur += c
  }
  out.push(cur)
  return out.map((x) => x.trim())
}

const KEYWORD_HEADER = /^(keyword|keywords|mot cle|mots cles|palabra clave|palabras clave|palavra chave|stichwort|parola chiave|search term)\b/
const VOLUME_HEADER = [/avg.*monthly/, /monthly.*search/, /moyenne.*mensuel/, /recherches.*mensuel/, /promedio.*mensual/, /busquedas.*mensual/, /durchschnittl.*monat/]
const COMPETITION_HEADER = /^(competition|concurrence|competencia)\b(?!.*(indexed|indexe|indexado))/

const headerKey = (s: string) => fold(s).replace(/['’]/g, ' ').replace(/\s+/g, ' ')

function parseCount(token: string): number | undefined {
  const t = token.replace(/[\s  ]/g, '').toLowerCase()
  const m = t.match(/^(\d+(?:[.,]\d+)?)([km])?$/)
  if (!m) return undefined
  let num = m[1]
  if (m[2]) {
    num = num.replace(',', '.')
    return Math.round(parseFloat(num) * (m[2] === 'k' ? 1e3 : 1e6))
  }
  // thousands separators: "1,300" "1.300" "12.500"
  if (/^\d{1,3}([.,]\d{3})+$/.test(num)) return Number(num.replace(/[.,]/g, ''))
  return Number(num.replace(',', '.'))
}

/** "1K – 10K", "100 – 1K", "10 – 100", "1 300", "-" -> low/high/mid. A single number gives low = high = mid. */
export function parseVolume(raw: string): Pick<PlannerRow, 'volumeLow' | 'volumeHigh' | 'volumeMid'> {
  const s = raw.trim()
  if (!s || /^[-–—]+$/.test(s)) return {}
  const parts = s.split(/\s*(?:–|—|-|\bto\b|\bà\b|\ba\b)\s*/i).filter(Boolean)
  const nums = parts.map(parseCount)
  if (!nums.length || nums.some((n) => n === undefined)) return {}
  const low = Math.min(...(nums as number[]))
  const high = Math.max(...(nums as number[]))
  return { volumeLow: low, volumeHigh: high, volumeMid: Math.round((low + high) / 2) }
}

export function parsePlannerText(text: string): PlannerRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length)
  let headerIdx = -1
  let delim = '\t'
  for (let i = 0; i < Math.min(lines.length, 30); i++) {
    for (const d of ['\t', ';', ',']) {
      const cells = splitLine(lines[i], d)
      if (cells.length >= 2 && cells.some((c) => KEYWORD_HEADER.test(headerKey(c))) && cells.some((c) => VOLUME_HEADER.some((r) => r.test(headerKey(c))))) {
        headerIdx = i
        delim = d
        break
      }
    }
    if (headerIdx >= 0) break
  }
  if (headerIdx < 0) throw new Error('not a Keyword Planner export: no header row with a keyword column and an average monthly searches column')
  const head = splitLine(lines[headerIdx], delim).map(headerKey)
  const kwCol = head.findIndex((c) => KEYWORD_HEADER.test(c))
  const volCol = head.findIndex((c) => VOLUME_HEADER.some((r) => r.test(c)))
  const compCol = head.findIndex((c) => COMPETITION_HEADER.test(c))
  const rows: PlannerRow[] = []
  for (const line of lines.slice(headerIdx + 1)) {
    const cells = splitLine(line, delim)
    const keyword = (cells[kwCol] || '').trim()
    if (!keyword) continue
    const volumeRaw = (cells[volCol] || '').trim()
    rows.push({ keyword, volumeRaw, ...parseVolume(volumeRaw), ...(compCol >= 0 && cells[compCol] ? { competition: cells[compCol] } : {}) })
  }
  return rows
}

export function readPlannerFile(file: string): PlannerRow[] {
  return parsePlannerText(decodeBuffer(fs.readFileSync(file)))
}

/** Locale from `--locale`, else from a file name token like "fr" / "keywords-es.csv", else guessed per keyword. */
export function localeFromFilename(file: string): 'en' | 'fr' | 'es' | undefined {
  const m = path.basename(file).toLowerCase().match(/(?:^|[^a-z])(en|fr|es)(?:[^a-z]|$)/)
  return m ? (m[1] as 'en' | 'fr' | 'es') : undefined
}

export function localeFor(keyword: string, forced?: 'en' | 'fr' | 'es'): 'en' | 'fr' | 'es' {
  return forced || guessLocale(keyword)
}
