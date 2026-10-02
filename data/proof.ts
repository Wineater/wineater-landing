// Single source of truth for every figure shown on the landing.
// Figures come from a one-month Wineater pilot and are shown ROUNDED, as display-ready strings.
// Counts (x of y), raw totals and the data source are intentionally not published.
// The owner decided: never say which client the figures come from (no client name, no country, no currency hints).
// A BUY click is a click to the product page, not a purchase: never write "sales", "orders" or "revenue".
// Do NOT add projections or extrapolations: they are not results.

const NBSP = ' '

// Where each figure may be shown. The pilot ran on an online shop, so the figures belong to
// the shop/retail pages and the home page, never to the restaurants page.
export type ProofSegment = 'home' | 'online' | 'retail'
export const proofSegments: Record<'buyClick' | 'requestsPerShopper' | 'search' | 'themes', readonly ProofSegment[]> = {
  buyClick: ['home', 'online'],
  requestsPerShopper: ['home', 'online'],
  search: ['home', 'online'],
  themes: ['retail'],
}

export const pilotProof = {
  // order shown in the hero: BUY click, requests, search
  buyClick: { en: '20%+', fr: `20${NBSP}%+` },
  requestsPerShopper: { en: '2+', fr: '2+' },
  search: { en: '~40%', fr: `~40${NBSP}%` },
  caveat: {
    en: 'A BUY click is a click to the product page, not a purchase.',
    fr: 'Un clic BUY est un clic vers la fiche produit, pas un achat.',
  },
  // what shoppers typed, most common first (rank order only, no counts)
  themeOrder: ['grape', 'origin', 'budget', 'producer', 'food'],
  // real shopper prompt from the pilot; only prompts without currency or place hints may be shown
  examplePrompts: [
    'I have a party with a bunch of wine geeks and want to surprise them. But something local please...',
  ],
} as const

export const liveClients = [
  { id: 'brice-burnett', name: 'Brice & Burnett', permission: 'logo allowed by owner 2026-09-30' },
  { id: 'intermarche', name: 'Intermarché', permission: 'logo allowed by owner 2026-09-30' },
] as const

// External statistic (not Wineater data). Shown with its source next to it, always.
// The survey base is "wine-hesitant" consumers, not all shoppers: keep that wording.
export const whyNowStat = {
  value: { en: '11%', fr: `11${NBSP}%` },
  comparison: { en: 'almost half', fr: 'près de la moitié' },
  source: {
    name: 'Wine Market Council / Quini, via The Press Democrat',
    date: '2026-05-29',
    url: 'https://www.pressdemocrat.com/2026/05/29/wines-real-problem-many-consumers-cant-predict-what-it-will-taste-like-researchers-say/',
  },
} as const

// Rounded pilot rates behind the published chips (20%+ is a floor, ~40% is rounded). Used only by the
// BUY-click estimator on Pricing and Online stores, as an illustration and never as a forecast.
export const pilotRates = { searchShare: 0.4, buyClickRate: 0.2 } as const

// Median answer time (seconds) by catalog size, from our own timing runs on live stores (October 2026).
// Bars use a 0-8 s scale. Not tested above `testedUpTo` wines. No client is named next to these figures.
export const answerTime = {
  runs: [
    { n: 29, s: 4.8 },
    { n: 68, s: 4.8 },
    { n: 393, s: 5.1 },
    { n: 762, s: 6.7 },
    { n: 3344, s: 5.3 },
  ],
  scaleMax: 8,
  testedUpTo: 3344,
} as const
