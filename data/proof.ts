// Single source of truth for every figure shown on the landing.
// Figures come from a one-month Wineater pilot and are shown ROUNDED, as display-ready strings.
// Counts (x of y), raw totals and the data source are intentionally not published.
// The owner decided: never say which client the figures come from (no client name, no country, no currency hints).
// A BUY click is a click to the product page, not a purchase: never write "sales", "orders" or "revenue".
// Do NOT add projections or extrapolations: they are not results.

const NBSP = ' '

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
