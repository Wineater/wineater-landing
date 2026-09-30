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
