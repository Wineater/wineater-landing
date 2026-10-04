// Single source of truth for every price on the landing: the pricing table, the solution
// price cards, the home price line, the ROI calculator, the JSON-LD offers and the FAQ.
// Owner's grid of 2026-10-04 (replaces the 2026-10-02 grid). All prices are USD per month.
// Never write a price in a template or in an i18n string: pass these values as {params}.
// Volume metered pricing: a BUY click is a click to the product page, never a purchase.
// No free trial and no self-serve signup are offered: never mention them next to a price.
// public/llms.txt and data/content/facts.md repeat these prices as plain text (a static file cannot import): update them together.
import { pilotRates } from './proof'

export const CURRENCY = 'USD'

export type Segment = 'shops' | 'restaurants' | 'distributors'

export interface Plan {
  id: string
  segment: Segment | 'retail'
  /** Monthly price in USD. null = no public price (Talk to sales). */
  price: number | null
  /** Upper catalog bound (wines). null = no upper bound. */
  maxWines: number | null
  /** Lower catalog bound exclusive (wines), for "more than N". */
  minWines?: number
  /** USD per BUY click on top of the monthly price (online stores). */
  perBuyClick?: number
  /** Price is per venue (restaurants and bars). */
  perVenue?: boolean
  /** Talk to sales card, no public price. */
  contact?: boolean
}

/** Online stores: one plan up to 500 wines, larger catalogs talk to sales. */
export const shopPlans: Plan[] = [
  { id: 'store', segment: 'shops', price: 99, maxWines: 500, perBuyClick: 0.1 },
  { id: 'storeLarge', segment: 'shops', price: null, maxWines: null, minWines: 500, contact: true },
]

/** Restaurants and bars, per venue. The staff tool (POS) and the guest QR page are included. */
export const restaurantPlans: Plan[] = [
  { id: 'restaurant', segment: 'restaurants', price: 99, maxWines: 500, perVenue: true },
  { id: 'restaurantPlus', segment: 'restaurants', price: 149, maxWines: null, minWines: 500, perVenue: true },
  { id: 'chain', segment: 'restaurants', price: null, maxWines: null, contact: true },
]

/** Distributors: the widget and the wine list builder. */
export const distributorPlans: Plan[] = [
  { id: 'distributors', segment: 'distributors', price: 99, maxWines: null },
]

/** Offline retail (supermarkets, wine shops in store): always Talk to sales. */
export const salesOnly: Plan[] = [
  { id: 'retail', segment: 'retail', price: null, maxWines: null, contact: true },
]

/** Add-ons for any plan. earlyAccess = not released yet, always shown with the Early access label. */
export interface AddOn {
  id: string
  price: number
  earlyAccess: boolean
}

export const addOns: AddOn[] = [
  { id: 'aiCatalog', price: 49, earlyAccess: true },
]

export const plansBySegment: Record<Segment, Plan[]> = {
  shops: shopPlans,
  restaurants: restaurantPlans,
  distributors: distributorPlans,
}

const allPlans = [...shopPlans, ...restaurantPlans, ...distributorPlans, ...salesOnly]

const byId = (id: string): Plan => {
  const found = allPlans.find(p => p.id === id)
  if (!found) throw new Error(`Unknown plan: ${id}`)
  return found
}

export const plan = byId

export const addOn = (id: string): AddOn => {
  const found = addOns.find(a => a.id === id)
  if (!found) throw new Error(`Unknown add-on: ${id}`)
  return found
}

/** Every plan with a public monthly price (not add-ons). */
export const pricedPlans = allPlans.filter(p => p.price !== null)

/** Lowest public monthly price, for the home "From $X" line. */
export const lowestPrice = Math.min(...pricedPlans.map(p => p.price as number))

/** Worked example shown under the online store plan: n BUY clicks in a month. */
export const exampleInvoice = (() => {
  const store = byId('store')
  const clicks = 500
  const clickCost = Math.round(clicks * (store.perBuyClick as number) * 100) / 100
  return { clicks, base: store.price as number, clickCost, total: (store.price as number) + clickCost }
})()

/**
 * Pilot rates used by the BUY-click estimator (published, rounded figures live in data/proof.ts).
 * Only clicks and the plan cost are computed. No purchases, no revenue, no forecast.
 */
export const roiRates = pilotRates

export function estimateBuyClicks(monthlyVisits: number): number {
  const visits = Number.isFinite(monthlyVisits) && monthlyVisits > 0 ? monthlyVisits : 0
  return Math.round(visits * roiRates.searchShare * roiRates.buyClickRate)
}

/** Online store plan at a given volume: base price + BUY clicks. */
export function storeMonthlyCost(buyClicks: number): number {
  const store = byId('store')
  return Math.round(((store.price as number) + buyClicks * (store.perBuyClick as number)) * 100) / 100
}

/** "$99", "$0.10", "$149.50" (drops .00). en: $99 · fr/es: 99 $ with a non-breaking space. */
export function formatUsd(value: number, locale: string = 'en'): string {
  const fixed = Number.isInteger(value) ? String(value) : value.toFixed(2)
  if (locale === 'fr' || locale === 'es') return `${fixed.replace('.', ',')} $`
  return `$${fixed}`
}

export function formatInt(value: number, locale: string = 'en'): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : locale).format(value)
}

/**
 * schema.org Offer list for /pricing: the plans with a public price only.
 * The AI-ready catalog add-on is not released yet, so it is not listed as an Offer.
 */
const offerNames: Record<string, string> = {
  store: 'Online store',
  restaurant: 'Restaurant & bar',
  restaurantPlus: 'Restaurant & bar Plus',
  distributors: 'Distributors',
}

export function pricingOffers(url: string) {
  return pricedPlans.map(p => ({
    '@type': 'Offer',
    name: offerNames[p.id] || p.id,
    url,
    priceCurrency: CURRENCY,
    price: String(p.price),
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: String(p.price),
      priceCurrency: CURRENCY,
      billingDuration: 1,
      unitCode: 'MON',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    },
  }))
}
