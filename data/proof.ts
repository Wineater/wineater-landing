// Single source of truth for every number shown on the landing.
// Source: Wineater one-month retail pilot, event export, Aug-Sep 2026 (owner sent the report on 2026-09-30 and allowed using the figures).
// The owner decided: publish the figures, but NEVER say which client they come from (no client name, no country, no currency hints).
// A BUY click is a click to the product page, not a confirmed purchase: never write "sales", "orders" or "revenue".
// Do NOT add the report's projections (e.g. monthly BUY-click estimates): they are extrapolations, not results.

export const pilotProof = {
  source: { en: 'Wineater retail pilot data, Aug-Sep 2026', fr: 'Données du pilote Wineater chez un caviste, août-sept. 2026' },
  caveat: {
    en: 'A BUY click is a click to the product page, not a confirmed purchase.',
    fr: 'Un clic BUY est un clic vers la fiche produit, pas un achat confirmé.',
  },
  // measured 21 Aug - 11 Sep 2026
  resultsToBuy: { value: 22.2, n: 8, of: 36, unit: 'sessions that displayed recommendations' },
  // full one-month pilot
  activation: { value: 39.8, n: 78, of: 196, unit: 'widget sessions that submitted a search' },
  searchToResults: { value: 87.2, n: 68, of: 78 },
  requestsPerUser: { value: 2.4, requests: 180, users: 75 },
  fullSetOfFour: { value: 96.6, of: 149, unit: 'result displays', bottleImpressions: 591 },
  uniqueWinesShown: 318,
  freeTextRequests: {
    total: 175,
    themes: [
      { key: 'grape', value: 48 },
      { key: 'origin', value: 46 },
      { key: 'budget', value: 42 },
      { key: 'producer', value: 20 },
      { key: 'food', value: 15 },
    ],
  },
  // real shopper prompt from the pilot; only prompts without currency or place hints may be shown
  examplePrompts: [
    'I have a party with a bunch of wine geeks and want to surprise them. But something local please...',
  ],
} as const

export const liveClients = [
  { id: 'brice-burnett', name: 'Brice & Burnett', permission: 'logo allowed by owner 2026-09-30' },
  { id: 'intermarche', name: 'Intermarché', permission: 'logo allowed by owner 2026-09-30' },
] as const
