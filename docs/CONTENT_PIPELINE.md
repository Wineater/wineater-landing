# Content pipeline

Turns real Google search demand into reviewed article drafts for the Wineater blog. It prepares drafts. A person edits and approves every article. Nothing is published automatically.

## Architecture

```
seeds.json (EN/FR/ES)
     |
     v
 content:keywords --- Google Autocomplete (no key, cached, rate limited)
     |                + Search Console queries   (if GSC_* set)
     |                + DataForSEO volume / KD   (if DATAFORSEO_* set)
     |                + SerpAPI PAA / related    (if SERPAPI_KEY set)
     |                + Google Ads Keyword Planner exports (--import, see docs/KEYWORD_PLANNER.md)
     v
 data/content/keywords.json
     |
     v
 content:plan ------- Gemini (3.8 Flash, structured JSON): cluster, dedupe, B2B score, drop consumer intent,
     |                target blog / landing / skip, avoid cannibalization
     v
 data/content/content-plan.json
     |
     v
 content:draft ------ 1. research: Gemini + Google Search grounding; source URLs
     |                   come from grounding metadata (redirects resolved), a
     |                   structured call builds the claims table; URLs must answer
     |                   HTTP 200 (fallback: SerpAPI pages)
     |                2. write (strongest Gemini text model) in the target language from data/content/facts.md
     |                   + claims only
     |                3. content:check gate (one automatic fix pass)
     |
     +-- pass --> content/blog/<slug>.md          (draft: true, reviewed: false)
     +-- fail --> content/_rejected/<slug>.md + <slug>.report.json
                         |
          human edit: add first-hand expertise, check every line
                         |
                         v
 content:approve <slug> --- re-runs the gate, flips draft:false, reviewed:true,
                            sets date, adds the sitemap entry
                         |
                         v
            commit + deploy (Nuxt Content builds /blog/<slug>)
```

Everything is resumable and idempotent. Keyword responses are cached for 30 days on disk (`data/content/.cache`, git-ignored). `plan` never re-plans a slug or keyword that exists. `draft` skips slugs that already have a file.

## Keyword providers

| Provider | Key | What it adds | How to run |
|---|---|---|---|
| Google Autocomplete | none | suggestions, rank, question flag | `content:keywords` (cached 30 days, 300 requests a run) |
| Google Trends | none | `interest` 0-100, related and rising queries (`rising`: true or `breakout`), `relatedTo`, audience from the seed. Unofficial public endpoints, serial, 1.5-3 s apart, cached 7 days, default cap 40 requests, pauses 6 h after a 429 | `content:keywords -- --trends [--trends-locale fr] [--trends-max 40]`; on by default in `content:daily` unless paused (`--no-trends`, `TRENDS_DISABLED=1`) |
| Keyword Planner CSV | none | `volumeLow/High/Mid`, `volumeRaw` (ranges without ad spend) | `content:keywords -- --import <file>`; `docs/KEYWORD_PLANNER.md` |
| DataForSEO | `DATAFORSEO_LOGIN/PASSWORD` | exact Google Ads volume, CPC, difficulty, keyword ideas; cost per call logged | `content:keywords -- --dataforseo [--dry-run]`; used by `content:daily` when the keys are set (`--no-dataforseo`) |
| SerpAPI | `SERPAPI_KEY` | People Also Ask, related searches | `content:keywords` when the key is set |
| Search Console | `GSC_*` | clicks, impressions, position of queries the site already gets | `content:keywords` when configured |

Ranking when the plan picks and orders topics: B2B relevance first, then demand. Demand is `log10(volume)` (max 3) when a real volume exists. Without volume it falls back to Trends: 0.04 per interest point (max 2) plus 0.5 for rising or 1 for breakout; with neither, Autocomplete rank. The weights are the `TREND_WEIGHT` constants in `plan.ts`. Interest is relative inside a comparison of 5 seeds, so treat it as a tie-breaker, not a measurement.

## Commands

| Command | What it does |
|---|---|
| `npm run content:keywords` | Expands seeds through Autocomplete (cap 300 requests) and merges the optional providers. Writes `data/content/keywords.json`. |
| `npm run content:keywords -- --import <file>` | Merges a Google Ads Keyword Planner export (UTF-16 or UTF-8, EN/FR/ES headers, exact or range volumes). See `docs/KEYWORD_PLANNER.md`. |
| `npm run content:plan -- --limit 6` | Asks Gemini for up to 6 new plan items. Appends to `content-plan.json`. |
| `npm run content:draft -- --limit 1` | Drafts the highest B2B-score planned items. `--slug <slug>` forces one. |
| `npm run content:check [-- <slug>]` | QA gate on all articles in `content/blog` or one slug. Exit code 1 on failure. |
| `npm run content:approve -- <slug> --by "Name"` | Human gate. Refuses when the gate fails. |
| `npm run content:daily -- --limit 2` | Daily run, see below. |
| `npm run content:weekly -- --limit 2` | keywords, plan, draft, check in order. Default 2 articles. |
| `npm run content:test` | Unit tests for parsers, plan validation and QA checks. No network. |

`--dry-run` works on `keywords`, `plan`, `draft`, `daily` and `weekly`. It uses the disk cache only, prints the prompts and estimated tokens, calls no API and writes no data files.

## Environment

Copy `scripts/content-pipeline/.env.example` to `scripts/content-pipeline/.env` (git-ignored). Keys are read with dotenv and never logged.

| Variable | Needed for |
|---|---|
| `GEMINI_API_KEY` | plan, draft (same key type the backend uses; copy it into the git-ignored `.env`) |
| `CONTENT_MODEL_PLAN`, `CONTENT_MODEL_RESEARCH` (default `gemini-3.8-flash`) | plan, grounded research and claim extraction |
| `CONTENT_MODEL_DRAFT` (default `gemini-3.1-pro-preview`), `CONTENT_MODEL_DRAFT_FALLBACK` (default `gemini-3.8-flash`) | article writing and the QA fix pass; the fallback is used automatically when the draft model errors |
| `CONTENT_MAX_USD_PER_RUN` (default 3), `CONTENT_MAX_TOKENS_PER_RUN` (default 600000) | hard stops inside one run |
| `CONTENT_PRICES_JSON` | optional price overrides (USD per million tokens); defaults are built in |
| `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD` | search volume, keyword difficulty |
| `SERPAPI_KEY` | People Also Ask, related searches, research fallback |
| `GSC_CREDENTIALS_PATH`, `GSC_SITE_URL` | queries the site already gets (service account with read access to the property) |

The DataForSEO request shapes are covered by a unit test with a fake transport and `--dataforseo --dry-run`; SerpAPI and Search Console follow the vendors' documented endpoints but have not been run against live accounts. Test them with one small run before relying on them.

## The QA gate (`content:check`)

An article must pass every error rule. Warnings are for the editor.

- Title at most 60 characters, meta description 120 to 160.
- No h1 in the body. The page template renders the single h1 from `title`.
- 400 to 2500 words. Average sentence length under 28 words (32 in French).
- Every number, percentage or amount has a markdown link to one of the frontmatter `sources` in the same or an adjacent line. Years, numbers up to 10 and the values in `allowedNumbers` (`data/content/banned-claims.json`) are exempt.
- Every external link is listed in `sources`. Every internal link resolves to a known route or an existing article.
- No banned phrases, no not-X-but-Y contrast patterns, no competitor names, no emoji (`data/content/banned-claims.json`).
- No near-duplicate of an existing article (5-word shingles, Jaccard above 0.3 fails, above 0.12 warns).
- Warnings: superlatives without a source, bold-label bullets, many em dashes, very short closing line, primary keyword missing from title and opening, unused sources.

French and Spanish spelling is not checked.

## Facts and claims policy

`data/content/facts.md` is the only place the writer learns about Wineater. It comes from `wineater-backend/docs/OVERVIEW.md` and holds no statistics, client names or results. To let articles say something new about the product, add it to that file first.

External claims come only from the research step. Gemini searches with Google Search grounding; the source URLs are read from the grounding metadata (not written by the model), redirect links are resolved to the real page, and a structured call picks claims from the grounded segments. A claim survives when its source is a grounding source and the page answers with HTTP 200. Grounding shows that a page supports a sentence, not that the sentence is exact: check figures at the source. The claims table is saved to `data/content/claims/<slug>.json` for audit.

## Models and prices

Prices are built in (`lib/runs.ts`, USD per million tokens, checked on ai.google.dev on 2026-09-30) so `runs.jsonl` shows real USD cost per call.

| Role | Model | Input / output |
|---|---|---|
| Plan, research (grounding), claim extraction | `gemini-3.8-flash` (stable) | 0.75 / 3.75 incl. thinking until 2026-12-31, then 1.50 / 7.50 (the switch is automatic from 2027-01-01) |
| Drafting and QA fix pass | `gemini-3.1-pro-preview` (preview, most capable) | 2.00 / 12.00 for prompts up to 200k tokens, 4 / 18 above |
| Fallback for drafting | `gemini-3.8-flash` | as above |
| Google Search grounding | | 5,000 free requests a month shared across Gemini 3.x, then 14 USD per 1,000. The month count is read from `runs.jsonl` |

If the Pro model errors (not found, quota, server error after retries), the same call runs on the fallback model. The console prints `[llm] FALLBACK: ...` and the run-log row gets `fallbackUsed: true` and `fallbackFrom`. Tested with a bogus model name (404 gives an immediate fallback). Plan and claims use structured output. Thinking tokens count as output; the log has them as `thoughtsTokens`.

## Cost per article (observed 2026-10-01)

One real article on the Pro model (`shopify-wine-recommendation-app`, first draft passed QA, no fix pass):

| Step | Model | Tokens in / out (thinking) | USD |
|---|---|---|---|
| Research, 5 grounded searches | 3.8 Flash | 1.0k / 2.0k (1.6k) | 0.008 |
| Claim extraction | 3.8 Flash | 0.9k / 0.4k | 0.002 |
| Writing | 3.1 Pro | 2.0k / 6.9k (5.4k) | 0.087 |
| Total | | | about 0.10 |

The same writing step on the fallback (3.8 Flash) would cost about 0.03 USD for similar tokens. A fix pass on Pro adds about 0.05 to 0.06 USD. The plan top-up (8 items) cost 0.015 USD. Search grounding stays free under 5,000 searches a month, which is roughly 1,000 articles. Plan on about 0.10 to 0.20 USD per article on Pro, so a month of daily articles costs a few dollars. The real cost is editor time.

## Daily cadence

`npm run content:daily` (add `--limit N`, default 2; `--dry-run`; `--offline` to use only cached Autocomplete answers; `--force` to ignore the per-day limit):

1. Imports any new or changed Keyword Planner file in `data/content/imports/`, then refreshes keywords from the Autocomplete cache.
2. Tops up the plan only when fewer than 5 unwritten blog items remain.
3. Drafts up to `--limit` new articles into `content/blog` with `draft: true`, `reviewed: false`. Articles that fail QA go to `content/_rejected`.
4. Runs the QA check over all articles and writes the run log (`data/content/runs.jsonl`).

It is safe to run twice: `data/content/daily-state.json` remembers how many drafts today's run already made, and existing slugs are never redrafted. No scheduler is set up.

Guidance: generating daily is cheap, publishing is the bottleneck. Publish about 2 to 3 reviewed articles a week. Drafts pile up in `content/blog` as `draft: true`; production lists only `draft: false` and `reviewed: true`, so a backlog of drafts never reaches the public site. Review the best ones (highest volume, closest to a buyer) and delete or leave the rest.

## Weekly cadence (alternative)

`content:weekly` is the older, once-a-week flow and is still available. The default limit is 2 and `CONTENT_MAX_USD_PER_RUN` stops a run early. A sensible rhythm: run on Monday, edit Tuesday and Wednesday, approve and deploy Thursday. Approve at most as many articles as the editor can improve with real material.

## How to add a provider

1. Create `scripts/content-pipeline/providers/<name>.ts` with `enabled()` (checks env keys) and a function that returns keywords or metrics.
2. Call it in `buildKeywords` in `keywords.ts` behind `if (!opts.offline && <name>.enabled())`, merging through `add()` with a new `KeywordSource` value.
3. Add its variables to `.env.example` and to the table above.
4. Add a parser test to `__tests__/pipeline.test.ts`.

## Scheduling (not enabled)

Cron on a server:

```
0 6 * * 1  cd /srv/wineater-landing && npm run content:weekly -- --limit 2 >> data/content/weekly.log 2>&1
```

GitHub Actions example. It opens a pull request with drafts, so a person reviews them before anything can ship. Save it as `.github/workflows/content-weekly.yml` to enable it.

```yaml
name: content-weekly
on:
  schedule: [{ cron: '0 6 * * 1' }]
  workflow_dispatch:
jobs:
  draft:
    runs-on: ubuntu-latest
    permissions: { contents: write, pull-requests: write }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci --ignore-scripts
      - run: npm run content:weekly -- --limit 2
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          SERPAPI_KEY: ${{ secrets.SERPAPI_KEY }}
      - uses: peter-evans/create-pull-request@v6
        with:
          branch: content/weekly-drafts
          title: 'Weekly content drafts (review required)'
          body: 'Drafts need a human edit before content:approve.'
          add-paths: |
            content/blog
            data/content
```

## Publishing rules in the site

- Production lists and serves only articles with `draft: false` and `reviewed: true`. Other files are excluded from the Nuxt Content build when `NODE_ENV=production` (see `scripts/content-pipeline/published.mjs`). Set `NUXT_CONTENT_PUBLISHED_ONLY=1` to apply the same filter in dev.
- Dev shows drafts with a DRAFT badge and `noindex`.
- `/blog` is `noindex` and left out of the sitemap while fewer than 3 articles are published.
- `approve` adds a `sitemap` entry to the article frontmatter. Only approved articles have one.
- A French article links to its English counterpart with `translationOf: <english-slug>`; both pages then emit hreflang.

## Risks

**Google spam policy.** Google's spam policies treat scaled content abuse, meaning many pages produced mainly to rank with little added value, as spam, whether people or AI wrote it. A pipeline that publishes automatically would be exactly that pattern.

What this pipeline does about it:

- It produces reviewed drafts, not posts. There is no auto-publish. `approve` is a separate human command.
- Generation is capped at 2 a day and publishing at about 2 to 3 reviewed articles a week, and the plan drops topics that overlap existing pages.
- Drafts carry real sources and only approved product facts. The gate blocks invented numbers, customer claims and unlisted links, and sends failures to `content/_rejected`.
- Every draft is written natively in its language from a plan built on real search demand, not translated from English.

What still needs a person, every time:

- Add first-hand expertise: what Wineater learned from real shops, real screens, real questions from merchants. A draft without that is generic and will not earn rankings even if it passes the gate.
- Check every claim against its source. The gate proves a link exists next to a number. It cannot prove the source says it.
- Cut anything that reads like filler.
- Only add customer names, results or quotes with written permission.

Other risks: autocomplete suggestions are not search volume, so rank by impressions from Search Console or by DataForSEO volume once available. Google may rate-limit Autocomplete; the client stops on HTTP 429 or 503 and resumes from the cache. A model can still write a false sentence about wine; editors should check technical wine statements too.
