# Approved Wineater facts

Source: wineater-backend/docs/OVERVIEW.md (state 2026-09-30) and the approved landing copy. The drafting stage may state only these facts about Wineater. Anything else about the product needs a human to add it here first.

## What it is
- Wineater is a B2B AI sommelier for wine shops, online wine retailers, bars and restaurants.
- A shopper writes in free text what they need (examples: "something for steak, under 30", "like Barolo but cheaper", "birthday gift for a friend who loves wine geekery").
- The shopper gets four wines from that shop's own catalog. Each one has a short explanation of why it fits.

## Catalog-only recommendations
- Recommendations come only from the catalog of the shop that uses the widget. The service does not suggest wines the shop does not sell.
- The shop and the language come from the shop's client token, not from the shopper's request.
- The explanation for each wine is 1-2 sentences in the shop's language.

## Stock
- Stock can be synced from the shop's product feed once a day (for shops with stock sync enabled).
- Wines marked out of stock are hidden from recommendations.
- The sync has safeguards: it refuses to run if the feed is empty, has shrunk by half, or would hide more than half of the catalog.

## How a query is understood
- The request is split into food pairing, taste and style, place of origin, occasion, and how the wine is made (for example natural or organic).
- The same five aspects are stored for every wine, and the request is compared aspect by aspect.
- A budget stated in words ("cheap", "around 30", "splurge") is turned into a price range.
- If the shopper names a wine type, most of the four picks are of that type.
- If the shopper types a wine or producer name that exists in the catalog, those exact matches come first.
- A shop can promote selected products; promoted products get a moderate boost in ranking.

## Channels
- Website widget: a script tag on the shop's site.
- QR code: for tables, shelves and printed menus.
- API: for custom integrations.
- A tablet in the dining room (kiosk) exists for restaurants: dish menu in, wine pairing out. It has no cart or payment.

## Languages
- The widget works in the shop's language; the landing is in English and French.

## Commercial
- Free trial: one month, no credit card required.
- Demo booking: 20-minute call.

## Pricing (approved 2026-10-02; single source in data/pricing.ts)
- All prices are USD per month. Free trial: 1 month, no credit card, for every plan. Pay by card or, in the EU, by invoice.
- Online stores: Starter $49 (up to 500 wines); Growth $99 + $0.10 per BUY click (up to 3,000 wines); Enterprise (more than 3,000 wines) on request.
- Restaurants and bars: Restaurant $99 per venue (up to 500 wines); Restaurant Plus $149 per venue (more than 500 wines); chains of 3+ venues on request.
- Offline retail (supermarkets, wine boutiques) and distributors: no public price, "Talk to sales".
- A BUY click is a click to the product page, never a purchase. Example Growth invoice: 500 BUY clicks in a month = $99 + $50.

## External statistic (approved with its source, always shown next to it)
- Wine Market Council's national survey of "wine-hesitant" consumers (presented 2026-05-27, Quini blind-tasting data): only 11% say they can predict how a wine will taste, against almost half for beer, spirits and cocktails. Source: The Press Democrat, 2026-05-29. Say "wine-hesitant consumers", not "all shoppers".

## Pilot figures
- Published as rounded figures from data/proof.ts only. The pilot client is never named next to them, no country, no currency. Offline retail page shows the "what shoppers asked for" themes only.

## Restaurants (approved)
- The tablet tool for staff ("sommelier assistant") runs in a browser on any tablet or phone. It needs no POS or till integration. It is not a point-of-sale system: no tables, orders, cart or payment.
- Already used in restaurants in France and Russia (no names, no counts).

## Early access (NOT available yet: always label "Early access" or "Coming soon", never say it works)
- "AI-ready catalog": a store MCP server plus an enriched product feed so AI assistants (ChatGPT, Perplexity, Google AI) can read a shop's catalog.
- "Shopify app": one-click install.
- Both have a waitlist form only. No release date, no pricing.

## Distributors (module in development; label "Early access", design-partner stage)
- Wineater for distributors turns a restaurant's food menu (photo or PDF) into a wine proposal made from the distributor's own portfolio; a QR menu for client restaurants where the distributor's wines are marked as priority; a widget for the distributor's site; portfolio gap analysis and menu heatmap (insights, later phase).
- Do not state delivery times, "1 minute" as a promise, or conversion figures for the distributor module. The "20%+" conversion line in the distributor PDF is NOT approved (a BUY click is not a conversion).
- Onboarding: price list or catalog (Excel, PDF or API), no complex IT integration.

## Founder (approved by the owner 2026-10-04)
- Attribution on the home page: Alex Olkhovoi, WSET3, Winemaker and CTO. The quote on the home page was written from the owner's direction (making wine easier and more fun to buy for the younger generation); the owner approves the wording.

## Not approved (never state)
- Any statistic, conversion uplift, revenue figure or customer count beyond the approved ones above.
- Customer names, logos, quotes or case-study results (exception: two logos in the trust ribbon, see data/proof.ts liveClients).
- Revenue projections or extrapolations.
- Claims that Shopify/WooCommerce/PrestaShop plugins or app-store listings exist (only the early-access waitlist wording above).
- Claims that the AI-ready catalog works today.
- Founder or investor biographies beyond the approved attribution above.
