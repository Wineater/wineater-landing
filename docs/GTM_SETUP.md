# Google Tag Manager and GA4 setup

Container: `GTM-NLBPMC7X`. The site loads GTM only after the visitor accepts analytics in the cookie banner, and uses Google Consent Mode v2 (everything denied by default; accepting grants only `analytics_storage`; ad storage, ad user data and ad personalization always stay denied). OpenReplay is no longer used.

> The container file `gtm/wineater-gtm-container.json` was written by hand against the GTM export schema. It could NOT be imported into a live container from the development environment. After importing, always check everything in Preview mode (step 4).

## 1. Get a GA4 Measurement ID
1. Open https://analytics.google.com, create (or pick) a GA4 property for wineater.com.
2. Admin > Data streams > Add stream > Web, URL of the site. Turn off "Enhanced measurement" outbound clicks if you want to avoid double counting with our own `outbound_link_click` event.
3. Copy the Measurement ID (looks like `G-AB12CD34EF`).

## 2. Import the container
1. tagmanager.google.com > open `GTM-NLBPMC7X` > Admin > Import Container.
2. Choose `gtm/wineater-gtm-container.json`, workspace "New" (or an existing one), option **Merge** > **Rename conflicting tags, triggers, and variables**.
3. The import already contains the Measurement ID `G-S8NR6D6FDP` in the variable `GA4 Measurement ID` (Variables). Check that it matches your GA4 data stream, then save.
4. Check there are no old Google Analytics tags in the container that would send the same data twice. Pause or delete them.

## 3. What the container contains
- Folder `Wineater GA4`.
- Tag `Google tag - GA4` (type Google tag): fires on Initialization, requires `analytics_storage`, sets `cookie_expires` = 34128000 s (13 months), `allow_google_signals` = false, `allow_ad_personalization_signals` = false, `send_page_view` = true.
- One `GA4 Event - <name>` tag and one `CE - <name>` custom-event trigger for each event below, with Data Layer variables `DLV - <param>` for the parameters.

## 4. Check Consent Mode (Preview)
1. Click Preview, enter the site URL, connect Tag Assistant.
2. Before choosing anything in the cookie banner: GTM must NOT be loaded (no `gtm.js` request).
3. Click "Accept" in the banner. Tag Assistant connects. In the Summary, `Consent Initialization` shows `analytics_storage` denied by default, then updated to granted. `ad_storage`, `ad_user_data`, `ad_personalization` stay denied.
4. `Google tag - GA4` must show "Succeeded" on Initialization, with consent granted. Click a button: the matching `GA4 Event` tag fires.
5. Reload, choose "Reject": the page must not load GTM and no `_ga` cookie must exist.

## 5. GA4 admin settings
- Admin > Data collection and modification > Data retention > Event data retention: **14 months** (the longest option). 
- Admin > Data collection > Google signals: **off**.
- Admin > Data settings > Data sharing settings: turn **all** options off.
- IP addresses are not stored in GA4 (nothing to configure).
- Admin > Product links > Search Console links: link the Search Console property.
- Admin > Events: after `signup_success` has appeared once, mark it **Mark as key event**. Optionally also `demo_click`.
- Optional: register custom dimensions (event scope) for `cta_label`, `location`, `audience`, `language` so they appear in reports.

## 6. DebugView checklist
Admin > DebugView (use Preview mode or the GA debugger). Accept cookies, then check each:
- [ ] `page_view` on load
- [ ] `cta_click` with `cta_label`, `location` (header, hero, footer, ...)
- [ ] `signup_modal_open`, `signup_submit_attempt`, `signup_success` (and `signup_error` when the API fails)
- [ ] `demo_click` and `outbound_link_click` (with `link_url`)
- [ ] `audience_switch` with `audience`
- [ ] `widget_search_submit` (only `query_length`, `language`; never the search text), `widget_results_shown`, `widget_wine_click`
- [ ] No email, name or business name appears in any parameter.

## 7. Events and parameters sent by the site
| Event | Parameters |
|---|---|
| `cta_click` | `cta_label`, `location`, `audience` (hero only), `slug` (blog only) |
| `signup_modal_open` | none |
| `signup_submit_attempt` | none |
| `signup_success` | none |
| `signup_error` | none |
| `demo_click` | `location` |
| `audience_switch` | `audience` |
| `widget_search_submit` | `query_length`, `language` |
| `widget_results_shown` | `results_count`, `language` |
| `widget_wine_click` | `wine_title` (max 100 chars) |
| `outbound_link_click` | `link_url` |

Note: `widget_wine_click` is a click on a wine's product page link inside the demo widget (BUY-style button). It is NOT a purchase. Do not mark it as a conversion or use it as revenue.

Events fired before the visitor accepts analytics are dropped, not queued.

## 8. How to turn it off
- Fastest: in GTM, pause the tag `Google tag - GA4` and all `GA4 Event - ...` tags (folder `Wineater GA4`) and publish.
- Fully: remove `plugins/gtm.client.js` (and the call to `$setConsentMode` / `$loadGtm` in `composables/useConsent.ts`), then deploy. Existing `_ga` cookies in visitors' browsers expire on their own after at most 13 months.
