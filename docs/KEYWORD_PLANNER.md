# Keyword Planner import

Google Keyword Planner gives real monthly search numbers for free. The content pipeline uses them to rank article ideas. You download a file from Google, drop it in a folder and run one command.

Without ad spend Google shows ranges ("100 – 1K", "1K – 10K") instead of exact numbers. That is fine: the pipeline keeps the range and uses its midpoint to rank keywords. If you ever run a paid campaign, the same export shows exact numbers.

## 1. Create a free Google Ads account (no campaign, no payment)

1. Go to ads.google.com and sign in with a Google account.
2. Google asks you to create a campaign. Click **Switch to Expert Mode** (small link at the bottom), then **Create an account without a campaign**. Confirm country, time zone and currency. You can skip billing.
3. In the top menu open **Tools** -> **Planning** -> **Keyword Planner**.

## 2. Get keyword ideas

1. Click **Discover new keywords**.
2. Paste up to 10 phrases from `data/content/keyword-planner-seeds.txt`. Use only the phrases of one language block at a time.
3. Under the box, set the **country** and **language** (see the table below), then click **Get results**.
4. Sort by **Avg. monthly searches** (click the column header, high to low).
5. Click **Download keyword ideas** (top right) and choose **.csv**.

Repeat for each block of 10 seeds and each country below. About 20 downloads cover everything.

| Seeds block | Country and language |
|---|---|
| EN (restaurant, retail, online, AI) | United Kingdom + English, then United States + English |
| FR | France + French |
| ES | Spain + Spanish |

Estonia is not needed. Add Belgium + French or Mexico + Spanish later if you want those markets.

## 3. Drop the files in the project

Save each file in `data/content/imports/`. Put the language in the file name so the pipeline knows it: `fr-restaurant.csv`, `es-retail.csv`, `en-uk-online.csv`. The pipeline also guesses the language from the keyword text when the name has no `en`, `fr` or `es`.

Google's file is odd: UTF-16 encoded with tabs and a few title lines before the table, and column names in the language of your Google Ads account. The importer handles that, and also normal UTF-8 CSV files, with English, French and Spanish headers.

## 4. Import

```
npm run content:keywords -- --import data/content/imports/fr-restaurant.csv
```

Add `--locale fr` to force the language, `--dry-run` to see what would change without saving.

You can skip this command: `npm run content:daily` imports every new file in `data/content/imports/` on its own (it remembers which files it has imported, so a file is read once unless it changes).

What happens:

- Keywords are added to `data/content/keywords.json` with source `keyword-planner`. Fields: `volumeLow`, `volumeHigh`, `volumeMid` and the raw text in `volumeRaw`.
- A keyword that already exists (same words, ignoring capitals and accents) keeps its Autocomplete data and gets the volume. If it appears in two files, the higher volume wins.
- Nothing is ever removed.
- Each keyword gets an audience tag (restaurant, retail or online) from the seed that produced it or from words in the keyword. The plan uses it to cover all three buyers.

## 5. See the effect

```
npm run content:plan -- --limit 8
```

Each planned item prints its audience, primary keyword and volume range. Items are ranked by B2B relevance first, volume second.

## Fastest route to real volumes (DataForSEO)

Keyword Planner itself has no free API: the Google Ads API needs developer-token approval, so there is nothing to plug in without a manual export. DataForSEO sells the same Google Ads volumes through a simple pay-as-you-go API, with exact numbers instead of ranges.

1. Sign up at dataforseo.com. New accounts get a small free credit, enough to test.
2. Put the login and password in `scripts/content-pipeline/.env` (local, git-ignored):
   ```
   DATAFORSEO_LOGIN=your-login
   DATAFORSEO_PASSWORD=your-api-password
   ```
   For the daily GitHub workflow add the same two names as repository secrets (Settings -> Secrets and variables -> Actions) and pass them to the job as `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD`. The pipeline uses them only when they are set.
3. Run:
   ```
   npm run content:keywords -- --dataforseo
   ```
   It sends the best 300 keywords per language that still have no volume (`--dataforseo-max N`) and asks for keyword ideas for 5 seeds per language (`--dataforseo-seeds N`). Exact volumes are stored as `volume` and `volumeMid`. The cost of every call, as reported by DataForSEO, is printed and written to `data/content/runs.jsonl` (stage `dataforseo`). Check the cost per call on your DataForSEO dashboard before raising the limits.

Try it without sending anything: `npm run content:keywords -- --dataforseo --dry-run` prints the exact requests (works even with fake credentials).

## Free signal without any account: Google Trends

`npm run content:keywords -- --trends` asks Google Trends (public endpoints, no key) for relative interest over the last 12 months and the top and rising related searches of every seed and of a few short "head" terms (`trendHeads` in `scripts/content-pipeline/seeds.json`). It is not a search volume: interest is 0 to 100 compared with the top seed of the same small comparison, and long, specific phrases often show 0. The useful part is the related queries and the `rising` / `breakout` flags, which point at what people are starting to search. `--trends-locale fr` runs one language, `--trends-max 40` caps requests per run (about 1.5 to 3 seconds apart, cached 7 days, rerun to continue). If Google answers 429, the run keeps what it has and pauses Trends for 6 hours (delete `data/content/.cache/trends/blocked.json` to retry; set `TRENDS_DISABLED=1` to switch it off). Real volumes from Keyword Planner or DataForSEO are never overwritten.
