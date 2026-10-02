// Single source of truth for every price on the landing: the pricing table, the solution
// price cards, the home price line, the ROI calculator, the JSON-LD offers and the FAQ.
// Approved by the owner (landing brief 2026-10-02). All prices are USD per month.
// Never write a price in a template or in an i18n string: pass these values as {params}.
// Volume metered pricing: a BUY click is a click to the product page, never a purchase.
// public/llms.txt repeats these prices as plain text (a static file cannot import): update it together.
import { pilotRates } from './proof'

export const CURRENCY = 'USD'
export const TRIAL_MONTHS = 1

export type Segment = 'shops' | 'restaurants'

export interface Plan {
  id: string
  segment: Segment | 'retail' | 'distributors'
  /** Monthly price in USD. null = no public price (Talk to sales). */
  price: number | null
  /** Upper catalog bound (wines). null = no upper bound. */
  maxWines: number | null
  /** Lower catalog bound exclusive (wines), for "more than N". */
  minWines?: number
  /** USD per BUY click on top of the monthly price (Growth only). */
  perBuyClick?: number
  /** Price is per venue (restaurants). */
  perVenue?: boolean
  /** Talk to sales card, no public price. */
  contact?: boolean
}

export const shopPlans: Plan[] = [
  { id: 'starter', segment: 'shops', price: 49, maxWines: 500 },
  { id: 'growth', segment: 'shops', price: 99, maxWines: 3000, perBuyClick: 0.1 },
  { id: 'enterprise', segment: 'shops', price: null, maxWines: null, minWines: 3000, contact: true },
]

export const restaurantPlans: Plan[] = [
  { id: 'restaurant', segment: 'restaurants', price: 99, maxWines: 500, perVenue: true },
  { id: 'restaurantPlus', segment: 'restaurants', price: 149, maxWines: null, minWines: 500, perVenue: true },
  { id: 'chain', segment: 'restaurants', price: null, maxWines: null, contact: true },
]

export const salesOnly: Plan[] = [
  { id: 'retail', segment: 'retail', price: null, maxWines: null, contact: true },
  { id: 'distributors', segment: 'distributors', price: null, maxWines: null, contact: true },
]

const byId = (id: string): Plan => {
  const plan = [...shopPlans, ...restaurantPlans, ...salesOnly].find(p => p.id === id)
  if (!plan) throw new Error(`Unknown plan: ${id}`)
  return plan
}

export const plan = byId

/** Lowest public monthly price per segment, for "From $X" lines. */
export const fromPrice = {
  shops: shopPlans[0].price as number,
  restaurants: restaurantPlans[0].price as number,
}

/** Worked example shown under Growth: n BUY clicks in a month. */
export const exampleInvoice = (() => {
  const growth = byId('growth')
  const clicks = 500
  const clickCost = Math.round(clicks * (growth.perBuyClick as number) * 100) / 100
  return { clicks, base: growth.price as number, clickCost, total: (growth.price as number) + clickCost }
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

export function growthMonthlyCost(buyClicks: number): number {
  const growth = byId('growth')
  return Math.round(((growth.price as number) + buyClicks * (growth.perBuyClick as number)) * 100) / 100
}

/** "$49", "$0.10", "$149.50" (drops .00). en: $49 · fr/es: 49 $ with a non-breaking space. */
export function formatUsd(value: number, locale: string = 'en'): string {
  const fixed = Number.isInteger(value) ? String(value) : value.toFixed(2)
  if (locale === 'fr' || locale === 'es') return `${fixed.replace('.', ',')} $`
  return `$${fixed}`
}

export function formatInt(value: number, locale: string = 'en'): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : locale).format(value)
}

/** schema.org Offer list for /pricing (priced plans only). */
const offerNames: Record<string, string> = {
  starter: 'Starter',
  growth: 'Growth',
  restaurant: 'Restaurant',
  restaurantPlus: 'Restaurant Plus',
}

export function pricingOffers(url: string) {
  return [...shopPlans, ...restaurantPlans]
    .filter(p => p.price !== null)
    .map(p => ({
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
