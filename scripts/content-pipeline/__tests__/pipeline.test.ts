import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parseAutocomplete } from '../providers/autocomplete'
import { extractTagged, guessLocale, parseJsonLoose, slugify } from '../lib/text'
import { buildRoutes, findNumbers, runChecks, type Policy, type QaContext } from '../lib/qa'
import { assemble, filterClaims, parseWriterOutput } from '../draft'
import { validatePlan, type PlanItem } from '../plan'
import { parseArticle, serializeArticle } from '../lib/article'
import { prelimScore } from '../keywords'
import { isoWeek } from '../weekly'

const policy: Policy = {
  phrases: ['game-changer', 'seamless'],
  patterns: ["\\bit'?s not [^.]{1,50}[,;] it'?s\\b"],
  competitorNames: ['vivino'],
  allowedNumbers: ['30'],
}
const words = (n: number) => Array.from({ length: n }, (_, i) => `mot${i % 50}`).join(' ')
const para = (n: number) => `${words(n)}.`
const ctx = (existing: QaContext['existing'] = []): QaContext => ({ existing, routes: buildRoutes(existing), policy })
const base = {
  title: 'Short title about wine',
  description: 'x'.repeat(130),
  slug: 'a',
  date: '2026-09-30',
  locale: 'en' as const,
  keywords: [],
  primaryKeyword: 'mot1',
  sources: [{ title: 'Src', url: 'https://example.org/report' }],
  draft: true,
  reviewed: false,
  author: 'Wineater',
}
const goodBody = Array.from({ length: 36 }, () => para(12)).join('\n\n')

test('parseAutocomplete reads the firefox client format', () => {
  assert.deepEqual(parseAutocomplete('["ai sommelier",["ai sommelier app","ai sommelier wine"]]'), ['ai sommelier app', 'ai sommelier wine'])
  assert.deepEqual(parseAutocomplete('<html>blocked</html>'), [])
  assert.deepEqual(parseAutocomplete(null), [])
})

test('text helpers', () => {
  assert.equal(slugify("Sommelier virtuel pour caviste : comment ça marche ?"), 'sommelier-virtuel-pour-caviste-comment-ca-marche')
  assert.equal(guessLocale('sommelier virtuel pour la cave'), 'fr')
  assert.equal(guessLocale('carta de vinos para restaurante'), 'es')
  assert.equal(guessLocale('ai sommelier for wine shops'), 'en')
  assert.equal(extractTagged('<title> T </title><body>\nB\n</body>', 'body'), 'B')
  assert.deepEqual(parseJsonLoose('here:\n```json\n{"a":1}\n```'), { a: 1 })
})

test('qa passes a clean article', () => {
  const r = runChecks({ data: base, body: goodBody }, ctx())
  assert.deepEqual(r.errors, [])
})

test('qa rejects long title, short meta, h1 and short body', () => {
  const r = runChecks({ data: { ...base, title: 'x'.repeat(61), description: 'short' }, body: '# H1\n\nshort text.' }, ctx())
  assert.ok(r.errors.some((e) => e.includes('title is 61')))
  assert.ok(r.errors.some((e) => e.includes('meta description')))
  assert.ok(r.errors.some((e) => e.includes('h1')))
  assert.ok(r.errors.some((e) => e.includes('words')))
})

test('numbers need a nearby source link', () => {
  const bad = runChecks({ data: base, body: `${goodBody}\n\nAbout 46% of shoppers hesitate.` }, ctx())
  assert.ok(bad.errors.some((e) => e.includes('46%')))
  const good = runChecks({ data: base, body: `${goodBody}\n\nAbout 46% of shoppers hesitate, says [a report](https://example.org/report).` }, ctx())
  assert.ok(!good.errors.some((e) => e.includes('46%')))
})

test('number detection ignores years, small counts, list numbering and allowed values', () => {
  const allowed = new Set(['30'])
  assert.deepEqual(findNumbers('In 2026 we list 4 wines under 30', allowed), [])
  assert.deepEqual(findNumbers('1. First step', allowed), [])
  assert.deepEqual(findNumbers('Up to 2× faster and 15 % cheaper, 120 bottles', allowed), ['2×', '15%', '120'])
})

test('links: unknown internal and unlisted external links fail', () => {
  const r = runChecks({ data: base, body: `${goodBody}\n\n[x](/nope) [y](https://other.com/p) [ok](/faq) [src](https://example.org/report/)` }, ctx())
  assert.ok(r.errors.some((e) => e.includes('/nope')))
  assert.ok(r.errors.some((e) => e.includes('other.com')))
  assert.ok(!r.errors.some((e) => e.includes('/faq') || e.includes('example.org')))
})

test('banned phrases, contrast patterns and competitors fail', () => {
  const r = runChecks({ data: base, body: `${goodBody}\n\nA game-changer. It's not a tool, it's a coach. Vivino is worse.` }, ctx())
  assert.ok(r.errors.some((e) => e.includes('game-changer')))
  assert.ok(r.errors.some((e) => e.includes('contrast')))
  assert.ok(r.errors.some((e) => e.includes('vivino')))
})

test('near-duplicate content is rejected', () => {
  const r = runChecks({ data: base, body: goodBody }, ctx([{ slug: 'other', locale: 'en', body: goodBody }]))
  assert.ok(r.errors.some((e) => e.includes('near-duplicate')))
})

test('writer output parsing and assembly keep only cited sources', () => {
  const out = parseWriterOutput('<title>T</title><description>D</description><body>\nText with [fact](https://example.org/a) here.\n</body>')
  assert.throws(() => parseWriterOutput('no tags'))
  const item = { slug: 's', locale: 'en', primaryKeyword: 'k', secondaryKeywords: ['k2'] } as unknown as PlanItem
  const { data } = assemble(item, out, [
    { claim: 'A claim about wine retail.', sourceUrl: 'https://example.org/a', sourceTitle: 'A' },
    { claim: 'Another claim not cited.', sourceUrl: 'https://example.org/b', sourceTitle: 'B' },
  ], '2026-09-30')
  assert.deepEqual(data.sources, [{ title: 'A', url: 'https://example.org/a' }])
  assert.equal(data.draft, true)
  assert.equal(data.reviewed, false)
})

test('claims whose URL was not in search results are dropped', () => {
  const raw = { claims: [
    { claim: 'Verified claim from a result.', sourceUrl: 'https://example.org/a', sourceTitle: 'A' },
    { claim: 'Invented claim with made-up url.', sourceUrl: 'https://made-up.example/x', sourceTitle: 'X' },
  ] }
  const kept = filterClaims(raw, new Set(['https://example.org/a']))
  assert.equal(kept.length, 1)
  assert.equal(kept[0].sourceUrl, 'https://example.org/a')
})

test('plan validation drops skips, low b2b score, duplicate slugs and cannibalization', () => {
  const mk = (over: Record<string, unknown>) => ({ target: 'blog', title: 'A title here', slug: 'new-slug', locale: 'en', primaryKeyword: 'wine qr menu for restaurants', intent: 'informational', b2bScore: 8, outline: ['a'], internalLinks: [{ path: '/faq', anchor: 'faq' }, { path: '/nope', anchor: 'x' }], ...over })
  const ctxPlan = { existingSlugs: new Set(['taken']), existingTitles: [{ primaryKeyword: 'ai sommelier for wine shops', locale: 'en' }], planned: [], routes: buildRoutes([]) }
  const { accepted, skipped } = validatePlan({ items: [
    mk({}),
    mk({ slug: 'taken', primaryKeyword: 'other thing entirely' }),
    mk({ slug: 'low', primaryKeyword: 'cheap wine', b2bScore: 2 }),
    mk({ slug: 'dup', primaryKeyword: 'ai sommelier for wine shops' }),
    mk({ slug: 'sk', target: 'skip', primaryKeyword: 'wine under 10' }),
  ] }, ctxPlan)
  assert.equal(accepted.length, 1)
  assert.deepEqual(accepted[0].internalLinks.map((l) => l.path), ['/faq'])
  assert.equal(skipped.length, 4)
})

test('frontmatter round trip and keyword scoring', () => {
  const a = parseArticle(serializeArticle(base as any, 'Body text here.'))
  assert.equal(a.data.title, base.title)
  assert.equal(a.body.trim(), 'Body text here.')
  const terms = { b2bTerms: ['caviste'], consumerTerms: ['vin pas cher'] }
  const b2b = prelimScore({ keyword: 'sommelier virtuel caviste', hits: 2, sources: ['autocomplete'] }, terms)
  const consumer = prelimScore({ keyword: 'vin pas cher', hits: 2, sources: ['autocomplete'] }, terms)
  assert.ok(b2b > consumer)
  assert.match(isoWeek(new Date('2026-09-30T12:00:00Z')), /^2026-W40$/)
})

// ---- Keyword Planner import ----
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parsePlannerText, parseVolume, readPlannerFile, decodeBuffer } from '../lib/planner'
import { guessAudience, mergePlannerRows, type KeywordsFile } from '../keywords'
import { budgetExhausted } from '../lib/llm'
import { priceFor, priceUsd } from '../lib/runs'

const fx = (n: string) => path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures', n)

test('parseVolume handles exact numbers and ranges', () => {
  assert.deepEqual(parseVolume('100 – 1K'), { volumeLow: 100, volumeHigh: 1000, volumeMid: 550 })
  assert.deepEqual(parseVolume('1K – 10K'), { volumeLow: 1000, volumeHigh: 10000, volumeMid: 5500 })
  assert.deepEqual(parseVolume('10 – 100'), { volumeLow: 10, volumeHigh: 100, volumeMid: 55 })
  assert.deepEqual(parseVolume('1 300'), { volumeLow: 1300, volumeHigh: 1300, volumeMid: 1300 })
  assert.deepEqual(parseVolume('1,300'), { volumeLow: 1300, volumeHigh: 1300, volumeMid: 1300 })
  assert.deepEqual(parseVolume('1.5K'), { volumeLow: 1500, volumeHigh: 1500, volumeMid: 1500 })
  assert.deepEqual(parseVolume(''), {})
  assert.deepEqual(parseVolume('-'), {})
})

test('UTF-16LE tab-separated export with title lines and BOM', () => {
  const rows = readPlannerFile(fx('planner-en-utf16.csv'))
  assert.equal(rows.length, 4)
  assert.equal(rows[0].keyword, 'wine list software for restaurants')
  assert.equal(rows[0].volumeRaw, '100 – 1K')
  assert.equal(rows[0].volumeMid, 550)
  assert.equal(rows[0].competition, 'Low')
  assert.equal(rows[1].volumeHigh, 10000)
  assert.equal(rows[3].volumeMid, undefined)
})

test('UTF-8 CSV with French headers, BOM and quoted values', () => {
  const rows = readPlannerFile(fx('planner-fr-utf8.csv'))
  assert.equal(rows.length, 3)
  assert.equal(rows[0].keyword, 'carte des vins digitale')
  assert.equal(rows[0].volumeMid, 1300)
  assert.equal(rows[1].volumeLow, 100)
  assert.equal(rows[0].competition, 'Faible')
})

test('Spanish headers and semicolon delimiter are accepted, accents ignored', () => {
  const rows = parsePlannerText('Palabra clave;Promedio de búsquedas mensuales;Competencia\ncarta de vinos digital qr;10 – 100;Baja\n')
  assert.equal(rows[0].keyword, 'carta de vinos digital qr')
  assert.equal(rows[0].volumeMid, 55)
  assert.throws(() => parsePlannerText('foo,bar\n1,2'))
  assert.equal(decodeBuffer(Buffer.from('﻿abc', 'utf8')), 'abc')
})

test('merge keeps existing rows, dedupes case/accent-insensitively and keeps the best volume', () => {
  const file: KeywordsFile = {
    generatedAt: '', requestsUsed: 0,
    keywords: [
      { keyword: 'logiciel caviste', locale: 'fr', sources: ['autocomplete'], seeds: ['x'], hits: 2, prelim: 1 },
      { keyword: 'cómo vender vino', locale: 'es', sources: ['autocomplete'], seeds: ['x'], hits: 1, prelim: 1, volumeMid: 1000 },
    ],
  }
  const rows = parsePlannerText('Keyword\tAvg. monthly searches\nLogiciel Caviste\t100 – 1K\nComo vender vino\t10 – 100\nwine shop software\t10 – 100\n')
  const m = mergePlannerRows(file, rows.map((r) => ({ ...r })), {})
  assert.equal(m.added, 1)
  assert.equal(m.updated, 2)
  assert.equal(m.file.keywords.length, 3)
  const lc = m.file.keywords.find((k) => k.keyword === 'logiciel caviste')!
  assert.deepEqual(lc.sources, ['autocomplete', 'keyword-planner'])
  assert.equal(lc.volumeMid, 550)
  assert.equal(m.file.keywords.find((k) => k.keyword === 'cómo vender vino')!.volumeMid, 1000)
})

test('audience guess and Gemini prices', () => {
  assert.equal(guessAudience('carte des vins digitale'), 'restaurant')
  assert.equal(guessAudience('logiciel caviste'), 'retail')
  assert.equal(guessAudience('shopify wine recommendation app'), 'online')
  assert.equal(priceFor('gemini-3.8-flash', new Date('2026-10-01'))?.out, 3.75)
  assert.equal(priceFor('gemini-3.8-flash', new Date('2027-01-02'))?.out, 7.5)
  assert.equal(Number(priceUsd('gemini-3.1-pro-preview', 100_000, 100_000).toFixed(2)), 1.4)
  assert.equal(Number(priceUsd('gemini-3.1-pro-preview', 1_000_000, 1_000_000).toFixed(2)), 22)
  assert.equal(priceUsd('unknown-model', 1000, 1000), 0)
  assert.equal(typeof budgetExhausted(), 'boolean')
})

// ---- Google Trends parser, merge and DataForSEO request shape ----
import fs from 'node:fs'
import { parseExplore, parseMultiline, parseRelated } from '../providers/trends'
import { mergeTrendsRows } from '../keywords'
import * as dfsApi from '../providers/dataforseo'

const fxText = (n: string) => fs.readFileSync(fx(n), 'utf8')

test('trends: explore response gives widgets with tokens, XSSI prefix stripped', () => {
  const widgets = parseExplore(fxText('trends-explore.txt'))
  assert.ok(widgets.find((w) => w.id === 'TIMESERIES' && w.token))
  assert.ok(widgets.every((w) => w.request))
})

test('trends: multiline gives one mean per compared term', () => {
  const means = parseMultiline(fxText('trends-multiline.txt'))
  assert.equal(means.length, 2)
  assert.ok(means[0] > 0 && means[0] <= 100)
})

test('trends: related queries are split into top and rising, breakout detected', () => {
  const rel = parseRelated(fxText('trends-related.txt'))
  assert.equal(rel[0].query, 'la carte des vins')
  assert.equal(rel[0].kind, 'top')
  const synthetic = ")]}'\n" + JSON.stringify({ default: { rankedList: [{ rankedKeyword: [{ query: 'a b c d', value: 100, formattedValue: '100' }] }, { rankedKeyword: [{ query: 'new thing', value: 250, formattedValue: '+250%' }, { query: 'big thing', value: 5000, formattedValue: 'Breakout' }] }] } })
  const r2 = parseRelated(synthetic)
  assert.deepEqual(r2.map((x) => x.kind), ['top', 'rising', 'breakout'])
  assert.deepEqual(parseRelated(")]}'\n{\"default\":{\"rankedList\":[{},{}]}}"), [])
})

test('trends merge dedupes ignoring accents, never overwrites a real volume', () => {
  const file: KeywordsFile = {
    generatedAt: '', requestsUsed: 0,
    keywords: [{ keyword: 'carte des vins', locale: 'fr', sources: ['keyword-planner'], seeds: [], hits: 1, prelim: 0, volumeMid: 5500, volumeRaw: '1K – 10K' }],
  }
  const m = mergeTrendsRows(file, [
    { keyword: 'Carte des vins', locale: 'fr', seed: 'carte des vins', interest: 80, audience: 'restaurant' },
    { keyword: 'cave à vin connectée', locale: 'fr', seed: 'cave à vin', rising: 'breakout', relatedTo: 'cave à vin', audience: 'retail' },
    { keyword: 'cave a vin connectee', locale: 'fr', seed: 'cave à vin', rising: true },
  ])
  assert.equal(m.added, 1)
  assert.equal(m.file.keywords.length, 2)
  const cv = m.file.keywords.find((k) => k.keyword === 'carte des vins')!
  assert.equal(cv.volumeMid, 5500)
  assert.equal(cv.interest, 80)
  assert.deepEqual(cv.sources, ['keyword-planner', 'trends'])
  assert.equal(m.file.keywords.find((k) => k.relatedTo === 'cave à vin')!.rising, 'breakout')
})

test('dataforseo: request shape and cost logging with a fake transport', async () => {
  const sent: { url: string; body: any; auth: string }[] = []
  process.env.DATAFORSEO_LOGIN = 'fake'
  process.env.DATAFORSEO_PASSWORD = 'fake'
  dfsApi.configure({
    dryRun: false,
    transport: async (url, init) => {
      sent.push({ url, body: JSON.parse(String(init.body)), auth: String((init.headers as any).Authorization) })
      const volume = url.includes('search_volume')
      return { ok: true, status: 200, json: async () => ({ status_code: 20000, cost: volume ? 0.075 : 0.01, tasks: [{ result: volume ? [{ keyword: 'carte des vins', search_volume: 2400, cpc: 0.4, competition_index: 20 }] : [{ items: [{ keyword: 'carte des vins qr', keyword_info: { search_volume: 90, cpc: 0.2 }, keyword_properties: { keyword_difficulty: 12 } }] }] }] }) }
    },
  })
  const vols = await dfsApi.searchVolume(['carte des vins'], 'fr')
  const ideas = await dfsApi.keywordSuggestions('carte des vins', 'fr', 20)
  assert.equal(sent[0].url, 'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live')
  assert.deepEqual(sent[0].body, [{ keywords: ['carte des vins'], location_code: 2250, language_code: 'fr' }])
  assert.equal(sent[1].url, 'https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live')
  assert.equal(sent[1].body[0].limit, 20)
  assert.ok(sent[0].auth.startsWith('Basic '))
  assert.equal(vols[0].volume, 2400)
  assert.equal(ideas[0].difficulty, 12)
  assert.equal(Number(dfsApi.totalCostUsd().toFixed(3)), 0.085)
})
