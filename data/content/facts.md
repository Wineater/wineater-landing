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

## Not approved (never state)
- Any statistic, conversion uplift, revenue figure or customer count.
- Customer names, logos, quotes or case-study results.
- Pricing amounts.
- Claims about Shopify/WooCommerce/PrestaShop plugins or app-store listings.
- Founder or investor biographies.
