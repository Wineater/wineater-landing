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
     v
 data/content/keywords.json
     |
     v
 content:plan ------- Gemini (flash-lite, structured JSON): cluster, dedupe, B2B score, drop consumer intent,
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

## Commands

| Command | What it does |
|---|---|
| `npm run content:keywords` | Expands seeds through Autocomplete (cap 300 requests) and merges the optional providers. Writes `data/content/keywords.json`. |
| `npm run content:plan -- --limit 6` | Asks Gemini for up to 6 new plan items. Appends to `content-plan.json`. |
| `npm run content:draft -- --limit 1` | Drafts the highest B2B-score planned items. `--slug <slug>` forces one. |
| `npm run content:check [-- <slug>]` | QA gate on all articles in `content/blog` or one slug. Exit code 1 on failure. |
| `npm run content:approve -- <slug> --by "Name"` | Human gate. Refuses when the gate fails. |
| `npm run content:weekly -- --limit 2` | keywords, plan, draft, check in order. Default 2 articles. |
| `npm run content:test` | Unit tests for parsers, plan validation and QA checks. No network. |

`--dry-run` works on `keywords`, `plan`, `draft` and `weekly`. It uses the disk cache only, prints the prompts and estimated tokens, calls no API and writes no data files.

## Environment

Copy `scripts/content-pipeline/.env.example` to `scripts/content-pipeline/.env` (git-ignored). Keys are read with dotenv and never logged.

| Variable | Needed for |
|---|---|
| `GEMINI_API_KEY` | plan, draft (same key type the backend uses; copy it into the git-ignored `.env`) |
| `CONTENT_MODEL_PLAN` (default `gemini-3.1-flash-lite`) | plan, research with grounding, claim extraction |
| `CONTENT_MODEL_DRAFT` (default `gemini-3.1-pro-preview`) | article writing and the QA fix pass |
| `CONTENT_MAX_USD_PER_RUN` (default 3), `CONTENT_MAX_TOKENS_PER_RUN` (default 600000) | hard stops inside one run; the token cap works even when no prices are set |
| `CONTENT_PRICE_PLAN_IN/OUT_PER_MTOK`, `CONTENT_PRICE_DRAFT_IN/OUT_PER_MTOK`, `CONTENT_PRICE_PER_SEARCH` | cost estimate only; empty by default (cost shows 0, tokens are still logged). Fill from the current Gemini price list |
| `DATAFORSEO_LOGIN`, `DATAFORSEO_PASSWORD` | search volume, keyword difficulty |
| `SERPAPI_KEY` | People Also Ask, related searches, research fallback |
| `GSC_CREDENTIALS_PATH`, `GSC_SITE_URL` | queries the site already gets (service account with read access to the property) |

The DataForSEO, SerpAPI and Search Console providers follow the vendors' documented endpoints but have not been run against live accounts. Test them with one small run before relying on them.

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

## Models

Models available to the key were listed with `models.list` (Sep 2026): the 2.5, 3.x flash, flash-lite and pro families, among them `gemini-3.1-flash-lite`, `gemini-3.5-flash`, `gemini-3.8-flash` and `gemini-3.1-pro-preview`. Defaults:

- Plan, research, claim extraction: `gemini-3.1-flash-lite` (the model the backend uses; grounded search works on it).
- Drafting: `gemini-3.1-pro-preview`, the strongest text model listed. It is a preview model and may change or be retired; set `CONTENT_MODEL_DRAFT` to a flash model if it disappears or is rate limited.

Plan and claims use structured output (`responseJsonSchema`), so the JSON is valid by construction. Pro and flash models spend "thinking" tokens that count as output; `runs.jsonl` logs them as `thoughtsTokens`.

## Cost per article

Prices are not hard-coded. Put the current per-million-token prices in `.env` and read real numbers from `data/content/runs.jsonl` (model, input/output/thinking tokens, grounded searches, cost per call). Observed in the first real run:

| Step | Model | Tokens (in / out) |
|---|---|---|
| Plan, 6 items from 236 keywords | flash-lite | 1.6k / 1.0k |
| Research, 4 to 5 grounded searches | flash-lite | about 0.2k / 0.4k |
| Claim extraction | flash-lite | 0.9k to 1.0k / 0.4k |
| Writing (800 to 950 words) | pro preview | 1.9k to 2.1k / 8k to 11k (6.6k to 9.4k of it thinking) |
| Fix pass (only when the gate fails, happened once) | pro preview | 3.2k / 5.0k |

One article is about 3.4k to 6.1k input and 9k to 16.5k output tokens, almost all of it on the pro model. Multiply by your prices: output tokens of the draft model dominate the cost. The real cost that matters is editor time.

## Weekly cadence

Two drafts a week at most. The default limit is 2 and `CONTENT_MAX_USD_PER_RUN` stops a run early. A sensible rhythm: run on Monday, edit Tuesday and Wednesday, approve and deploy Thursday. Approve at most as many articles as the editor can improve with real material.

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
- Cadence is capped at 2 a week, and the plan drops topics that overlap existing pages.
- Drafts carry real sources and only approved product facts. The gate blocks invented numbers, customer claims and unlisted links, and sends failures to `content/_rejected`.
- Every draft is written natively in its language from a plan built on real search demand, not translated from English.

What still needs a person, every time:

- Add first-hand expertise: what Wineater learned from real shops, real screens, real questions from merchants. A draft without that is generic and will not earn rankings even if it passes the gate.
- Check every claim against its source. The gate proves a link exists next to a number. It cannot prove the source says it.
- Cut anything that reads like filler.
- Only add customer names, results or quotes with written permission.

Other risks: autocomplete suggestions are not search volume, so rank by impressions from Search Console or by DataForSEO volume once available. Google may rate-limit Autocomplete; the client stops on HTTP 429 or 503 and resumes from the cache. A model can still write a false sentence about wine; editors should check technical wine statements too.
