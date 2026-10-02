# Image credits

Rule for all imagery on the Wineater landing:

- Stock photography comes only from Unsplash and is used under the [Unsplash License](https://unsplash.com/license) (free for commercial use, attribution not required; we record it anyway).
- No AI-generated imagery of any kind (no image models, no generated "illustrations" posing as photos).
- Unsplash+ (plus.unsplash.com / Getty "premium") photos are NOT used: they fall under a different license.
- Product screenshots are real and are listed in a separate section at the bottom, filled by whoever captures them.
- Responsive files live in `public/photos/<name>-<480|800|1200|1600>.<webp|avif>`; sizes, alt text and dominant colors are in `public/photos/manifest.json`.
- Processing: master resized to 2000px wide (JPEG q92 in memory), then webp q78 and avif q55 at each width. Two photos were cropped (noted below).

## Stock photos (Unsplash)

| Local file(s) | Source URL (photo page) | Author | License | Retrieved | Used on |
|---|---|---|---|---|---|
| `restaurants-hero-*` | https://unsplash.com/photos/tnmEcUS7vI8 | Louis Hansel, https://unsplash.com/@louishansel | Unsplash License | 2026-10-02 | Restaurants page hero; home, Solutions card |
| `restaurants-table-*` (cropped to landscape from a portrait original) | https://unsplash.com/photos/KsVXWwHwhzo | Doğu Tuncer, https://unsplash.com/@tuncerdogu | Unsplash License | 2026-10-02 | Restaurants page, "QR on the table" section |
| `online-stores-*` | https://unsplash.com/photos/O3t84DQ5Wwg | Julio Lopez, https://unsplash.com/@juliolopez | Unsplash License | 2026-10-02 | Online stores page hero; home, Solutions card |
| `retail-hero-*` (cropped to remove shop-brand signage at the edges) | https://unsplash.com/photos/e0d-QR0gUFE | Alexander Schimmeck, https://unsplash.com/@alschim | Unsplash License | 2026-10-02 | Retail page hero; home, Solutions card |
| `retail-shelf-*` | https://unsplash.com/photos/D_aeHDwO1B8 | Austin, https://unsplash.com/@austin_7792 | Unsplash License | 2026-10-02 | Retail page, shelf section |
| `distributors-hero-*` | https://unsplash.com/photos/mpfXEaWfdoQ | Amin Zabardast, https://unsplash.com/@aminzabardast | Unsplash License | 2026-10-02 | Distributors page hero; home, Solutions card |
| `distributors-tasting-*` | https://unsplash.com/photos/z38uTGNpNnA | Caroline Attwood, https://unsplash.com/@_carolineattwood | Unsplash License | 2026-10-02 | Distributors page, tasting section |

## Product screenshots (real, from the Wineater Demo store id 32)

None yet. Candidates were captured from the demo store on 2026-10-02 but held back: the demo catalog's bottle images come from customer websites, the POS and admin panel need a demo login for store 32 that does not exist, and no screenshot may show a customer. Add rows here when the owner has decided.

| Local file(s) | What it shows | Captured by | Date captured | Used on |
|---|---|---|---|---|

## Owner's own artwork (not stock, not new)

| Local file(s) | What it is | Note |
|---|---|---|
| `public/brand/main-banner-{480,720,948}.webp` | The existing hero artwork (bottle, pasta, purple pattern), previously served from the static-media bucket | Same image, re-encoded at three widths so phones download less. No new artwork. |
