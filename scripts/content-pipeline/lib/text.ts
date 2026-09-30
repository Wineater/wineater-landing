export function normalizeKeyword(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}\s'-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function tokens(s: string): string[] {
  return normalizeKeyword(s).split(' ').filter((w) => w.length > 2)
}

export function jaccard<T>(a: Set<T>, b: Set<T>): number {
  if (!a.size || !b.size) return 0
  let inter = 0
  for (const x of a) if (b.has(x)) inter++
  return inter / (a.size + b.size - inter)
}

export function shingles(text: string, n = 5): Set<string> {
  const words = normalizeKeyword(text).split(' ').filter(Boolean)
  const out = new Set<string>()
  for (let i = 0; i + n <= words.length; i++) out.add(words.slice(i, i + n).join(' '))
  return out
}

export function estimateTokens(s: string): number {
  return Math.ceil(s.length / 4)
}

export function extractTagged(text: string, tag: string): string | undefined {
  const m = text.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))
  return m ? m[1].trim() : undefined
}

export function parseJsonLoose<T = unknown>(text: string): T {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const candidate = fenced ? fenced[1] : text
  const start = candidate.search(/[[{]/)
  if (start < 0) throw new Error('no JSON found in model output')
  const open = candidate[start]
  const close = open === '{' ? '}' : ']'
  const end = candidate.lastIndexOf(close)
  return JSON.parse(candidate.slice(start, end + 1)) as T
}

export function guessLocale(s: string): 'en' | 'fr' | 'es' {
  const words = normalizeKeyword(s).split(' ')
  const fr = ['le', 'la', 'les', 'un', 'une', 'des', 'du', 'pour', 'avec', 'comment', 'vin', 'vins', 'cave', 'caviste', 'quel', 'quelle', 'pourquoi', 'sans', 'est', 'sur', 'carte', 'accord', 'mets']
  const es = ['el', 'los', 'las', 'una', 'para', 'con', 'cómo', 'como', 'vino', 'vinos', 'tienda', 'tiendas', 'qué', 'cuál', 'por', 'sin', 'carta', 'maridaje', 'bodega']
  const score = (list: string[]) => words.filter((w) => list.includes(w)).length
  const f = score(fr)
  const e = score(es)
  if (f > e && f > 0) return 'fr'
  if (e > f && e > 0) return 'es'
  return 'en'
}
