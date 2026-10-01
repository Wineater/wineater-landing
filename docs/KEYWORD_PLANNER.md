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
