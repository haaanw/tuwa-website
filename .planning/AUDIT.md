# Tuwa Website Audit — 2026-05-31

## Executive summary

Tuwa's marketing site is built on genuinely strong fundamentals — fast, well-structured, trilingual, and carrying real scientific content — but it is undermined by a handful of high-severity defects that directly break the core conversion goal (App Store downloads) and the brand's central claim (evidence-based credibility). The English homepage is exemplary on performance and the feature pages are 1,200–1,700 words of accurate, accessible sports-science prose with clean heading hierarchies and correct hreflang wiring. The problem is not the content quality; it's that the site funnels visitors into dead ends, asks them to trust fabricated numbers, and points its primary CTA at a placeholder URL.

The 4 things that matter most:

1. **Sitewide navigation links to 5 nonexistent pages that return live 404s** (`/methodology/`, `/for-coaches/`, `/readiness-score/`, `/training-load/`, `/compare/`) — including the highest-intent keyword URLs the site needs to rank for. Every page in all 3 locales bleeds link equity and presents broken nav.
2. **The primary App Store CTA is a placeholder URL** (`https://apps.apple.com/app/tuwa`) — the entire conversion path is broken.
3. **The homepage closing CTA has no download button at all** — the most important page dead-ends a convinced, scrolled-to-the-bottom visitor into a wall of text.
4. **Fabricated trust metrics** ("1,200+ athletes", "85,000+ sessions", "94% accuracy") directly contradict the site's own "no vanity metrics" line and erode credibility with a skeptical, scientifically literate audience.

Secondary theme: the machine-readable and trust layers are nearly absent — zero JSON-LD anywhere, no citations on scientific claims, an empty blog in nav/sitemap, and a personal Gmail as the only contact.

### Per-dimension scores

| Dimension | Score | Verdict |
|-----------|-------|---------|
| SEO — Technical | ~80 | Solid base; trilingual hreflang/locale-code defects and no JSON-LD |
| SEO — Content / E-E-A-T | 58 | Strong prose, fatal structural/trust defects (404 nav, placeholder CTA, fabricated stats) |
| GEO / AI-Search | 52 | Excellent raw material, almost no structured signals for AI extraction |
| UI/UX + Accessibility + Conversion | 68 | Good fundamentals, three conversion/credibility wounds + contrast failures |
| Animation / Motion | ~75 | Mostly disciplined; chart animations and CLS gaps remain |
| Performance / Core Web Vitals | 78 | English site genuinely fast; feature pages and zh have moderate load cost |

## Top priorities (ranked)

Ranked by (severity × conversion/SEO impact) / effort.

1. **Fix the placeholder App Store CTA.** Where: `src/config.ts` (`APP_STORE_URL`), rendered into every CTA. Why: the site's entire reason to exist is App Store downloads, and the button resolves to `https://apps.apple.com/app/tuwa`, not a valid product URL. Fix: replace with the real URL including the numeric app id (`https://apps.apple.com/app/tuwa/id<NUMERIC_ID>`); if pre-launch, gate to a working "notify me" destination. **Effort: S.**

2. **Add a download button to the homepage closing CTA.** Where: `src/components/LandingCTA.astro:12-46`. Why: the most important page funnels a convinced visitor into a dead end — the feature-page equivalent (`FeatureCTA.astro:44-64`) already has the badge. Fix: mirror `FeatureCTA.astro`'s App Store badge block. **Effort: S.**

3. **Stop linking to 5 nonexistent pages sitewide.** Where: `src/components/Header.astro:154,157`; `Footer.astro:58-62`; `MobileMenu.astro:77,85`; i18n `common.ts` in en/zh/fr. Why: every page in all locales links to live 404s, including the keyword-rich URLs (`/training-load/`, `/readiness-score/`, `/methodology/`, `/compare/`) the site should rank for. Fix: either build the pages (strongly recommended for the keyword hubs and `/methodology/`) or remove the links until they ship; add a build-time link checker to fail CI on dead internal links. **Effort: L** (build) / **S** (remove links).

4. **Remove or substantiate the fabricated trust metrics.** Where: `src/components/StatsCounter.astro:28-55`; `src/i18n/locales/{en,fr,zh}/home.ts`. Why: "94% accuracy" and the athlete/session counts read as invented for a pre-launch app, and directly contradict the next section's "No vanity metrics. No noise." Fix: remove until real figures exist, or replace with defensible trust signals (the published ACWR+HRV basis, real App Store rating once live). **Effort: M.**

5. **Add SoftwareApplication + Organization JSON-LD (and FAQPage).** Where: `src/components/SEO.astro` (no `ld+json` anywhere in `dist/`); `src/components/FaqAccordion.astro` for FAQPage. Why: AI engines and rich results have no entity anchor for "Tuwa"; the citation-grade FAQ forfeits the highest-ROI GEO win. Fix: emit static SoftwareApplication (iOS, HealthApplication, App Store URL as downloadUrl) + Organization on the homepage, and a locale-aware FAQPage from the existing `faqs` array. ~1KB, zero runtime cost. **Effort: S.**

6. **Cite the scientific claims.** Where: `dist/features/workload-tracking/index.html`, `recovery-scoring/index.html` ("The science behind it"). Why: a brand whose differentiation is "evidence-based" asserts Gabbett's ACWR validation and the 0.8–1.3 sweet spot with zero citations — the weakest possible E-E-A-T posture and weak AI grounding. Fix: add inline outbound links to 1–2 primary sources (e.g. Gabbett 2016 BJSM) and build `/methodology/` as the canonical cited explainer. **Effort: M.**

7. **Replace the personal Gmail contact.** Where: `src/pages/{support,privacy,terms}.astro` + zh/fr mirrors (`hanwenma09@gmail.com` in 9 places). Why: a personal Gmail signals a hobby project to a paying audience; it's also hardcoded in 9 spots and may be stale. Fix: use a domain email (`support@tuwa.app`), centralize in `src/config.ts`. **Effort: S.**

8. **Set a descriptive, localized homepage title + trim long meta descriptions.** Where: `src/pages/index.astro:9` / `SEO.astro:23`; locale `meta.description` in en/fr. Why: homepage `<title>` is the bare word "Tuwa" (no keywords) and several fr/en descriptions exceed ~160c and truncate the CTA mid-sentence. Fix: pass a full homepage title ("Tuwa — Precision Training Load & Recovery for Serious Athletes") and trim descriptions to ~155c. **Effort: S.**

9. **Fix WCAG AA contrast failures on `text-3`.** Where: `--color-text-3:#AFABA5` in `src/styles/global.css`, used in `Footer.astro:81`, `FaqAccordion.astro:25`, chart axis ticks. Why: ratios of 1.91–2.03:1 fail the 4.5:1 requirement; chart axis labels carrying the scientific argument are partly unreadable. Fix: darken to ~#6F6B65 for text, or use `text-2` (#696560) for ticks/markers. **Effort: S.**

10. **Add a `_headers` file for year-long immutable caching of `/_astro/*` and `/fonts/*`.** Where: new `public/_headers`. Why: content-hashed assets are served with only 4h `max-age` + `must-revalidate`, forcing needless revalidation; live `cf-cache-status: MISS` shows the edge isn't warming. Fix: `Cache-Control: public, max-age=31536000, immutable`. **Effort: S.**

11. **Gate chart.js behind IntersectionObserver on feature pages.** Where: `src/components/charts/AcwrChart.astro`, `RecoveryChart.astro`. Why: 72KB brotli of chart.js eagerly loads on 6 high-intent feature pages despite charts being below the fold. Fix: lazy `await import` on scroll-near, and switch from `chart.js/auto` to a hand-registered build. **Effort: M.**

12. **Add a static feature list fallback behind the homepage click-wheel.** Where: `src/components/FeatureGrid.astro`. Why: 4 of 5 features are invisible until interaction and the whole set collapses to one feature with no JS. Fix: always-visible list/grid with the wheel as progressive enhancement, plus a `<noscript>` fallback. **Effort: M.**

## Findings by dimension

### SEO — Technical

> Solid base; key trilingual SEO defects below.

| Severity | Title | Location | Fix | Effort |
|----------|-------|----------|-----|--------|
| MEDIUM | Inconsistent zh code: hreflang `zh` vs sitemap `zh-CN` vs html lang `zh` | `SEO.astro:31,35`; `dist/sitemap-0.xml`; `BaseLayout.astro:20` | Use `zh-CN` everywhere; `format.ts` `LOCALE_TAG` already does | S |
| MEDIUM | Doubled brand suffix in French workload title | `src/i18n/locales/fr/workload-tracking.ts:5` | Remove suffix from line 5 (SEO.astro:23 appends it); audit other fr/zh titles | S |
| MEDIUM | Homepage title bare "Tuwa" all locales; no JSON-LD | `dist/{,zh/,fr/}index.html`; `SEO.astro` | Set descriptive localized title; emit static JSON-LD from SEO.astro | M |
| MEDIUM | Meta descriptions over SERP length | `dist/fr/features` (coaching 222c, smart-templates 225c, recovery 187c, workload 185c); `dist/features/coaching` 175c | Trim `meta.description` in en/fr locales to ~155c | S |
| MEDIUM | Localized 404 files not served by Cloudflare Pages | `package.json` build; `dist/{zh,fr}/404.html`; `public/_redirects` | Verify live; add `_redirects`/Pages Function routing for zh/fr 404s | M |
| LOW | Homepage hreflang hrefs omit trailing slash, mismatch canonical | `SEO.astro:28-46`; `dist/{,zh/,fr/}index.html` | When path is root, emit slash not empty string so hrefs keep the trailing slash | S |
| LOW | 404 pages lack `noindex` | `dist/404.html`, `dist/{zh,fr}/404/index.html` | Add robots `noindex` to 404 pages | S |
| LOW | `favicon.svg` unreferenced; no theme-color/manifest | `public/favicon.svg`; `BaseLayout.astro:26-28` | Add `link rel=icon type=image/svg+xml`, theme-color meta, optional manifest | S |
| LOW | `og:image` lacks width/height/alt | `SEO.astro:49,57` | Add `og:image:width` 1200, `og:image:height` 630, image alt | S |

### SEO — On-Page / Content + E-E-A-T (score 58)

> The body content is genuinely strong for the project's goal: feature pages run 1,200–1,700 words each with clean single-H1 heading hierarchies (H1 outcome → H2 "How it works" / "The science behind it" → logical H3s), accurate keyword targeting (ACWR, EWMA, acute:chronic, RPE/RIR, training load, recovery), and prose that explains the science (Gabbett ACWR work, 0.8–1.3 sweet spot) accessibly without a jargon wall. Trilingual handling is correct: zh/fr H1s are genuinely translated, canonical points to self, and hreflang + x-default are wired properly, so there is no duplicate-content risk. However, serious structural and trust defects undercut all of that: every page sitewide links to five pages that 404, the primary App Store CTA is a placeholder, the headline stats appear fabricated, the blog is empty, scientific claims are unsourced, and there is no author/about page.

| Severity | Title | Location | Fix | Effort |
|----------|-------|----------|-----|--------|
| CRITICAL | Sitewide nav links to 5 nonexistent pages (live 404s), including top keyword URLs | `Header.astro:154,157`; `Footer.astro:58-62`; `MobileMenu.astro:77,85`; i18n `{en,zh,fr}/common.ts` | Build the pages (esp. `/training-load/`, `/readiness-score/`, `/methodology/`, `/compare/`) or remove links; add CI link checker | L |
| CRITICAL | Primary App Store CTA points to a placeholder URL | `src/config.ts` (`APP_STORE_URL`) → `https://apps.apple.com/app/tuwa` in every CTA | Replace with real URL incl. numeric app id; or gate to a working "notify me" pre-launch | S |
| HIGH | Scientific claims entirely unsourced — no citations or references | `dist/features/workload-tracking/index.html`, `recovery-scoring/index.html` | Add references block / inline citations (e.g. Gabbett 2016 BJSM); build cited `/methodology/` | M |
| MEDIUM | Hardcoded, apparently fabricated trust stats | `src/components/StatsCounter.astro:32-55` (1,200+ athletes, 85,000+ sessions, 94% accuracy) | Replace with defensible numbers or remove; define & cite any accuracy claim | S |
| MEDIUM | Blog empty but linked in nav and sitemap — thin-content signal | `src/content/blog/.gitkeep`; `src/pages/blog/index.astro:37`; `dist/sitemap-0.xml` | Publish 2-3 cornerstone posts before exposing; until then drop from nav/sitemap | M |
| MEDIUM | No About/author/team page — missing E-E-A-T authorship | `src/pages/` (no about.astro) | Add `/about/` (or fold into `/methodology/`); attribute science to a named author; add Organization schema | M |
| LOW | Feature pages don't cross-link in body content | `dist/features/*/index.html` body prose | Add 1-2 contextual in-prose links to sibling features where copy naturally references them | S |

### GEO / AI-Search Optimization (score 52)

> Tuwa's content is unusually well-suited for AI citation at the prose level — feature pages contain self-contained, fact-dense, quotable sentences (ACWR sweet spot 0.8–1.3, attribution to Tim Gabbett, EWMA explanation) and the /support FAQ answers are genuinely citable standalone paragraphs. AI crawlers are not blocked: robots.txt is a clean wildcard allow. But the machine-readable layer is almost entirely absent: zero structured data anywhere in dist/ (no Organization, SoftwareApplication, or FAQPage JSON-LD), no /llms.txt (404 live), the FAQ is bare `<details>` with no schema, the blog ships zero posts, and strong scientific claims cite a researcher by name but link to zero primary sources. Excellent raw material that AI engines must reconstruct from HTML prose rather than ingest from structured signals.

| Severity | Title | Location | Fix | Effort |
|----------|-------|----------|-----|--------|
| HIGH | No SoftwareApplication/Organization JSON-LD — no entity anchor for "Tuwa" | `src/components/SEO.astro` (lines 38-57 emit only meta/OG) | Add SoftwareApplication (iOS, HealthApplication, App Store URL as downloadUrl) + Organization JSON-LD on homepage | S |
| MEDIUM | Citation-grade FAQ rendered without FAQPage schema | `src/components/FaqAccordion.astro:46-68`; `src/i18n/locales/en/support.ts:13-46` | Emit locale-aware FAQPage JSON-LD from the existing `faqs` array | S |
| MEDIUM | No /llms.txt or /llms-full.txt (404 live) | `https://tuwa.app/llms.txt`; none in `dist/` or `public/` | Add `public/llms.txt` (description + linked sections); optionally build-time `llms-full.txt` | M |
| MEDIUM | robots.txt names no AI crawlers explicitly | `public/robots.txt` (and `dist/robots.txt`) | Keep wildcard allow; add explicit allow blocks for GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Bingbot; re-add Sitemap line | S |
| MEDIUM | Blog infrastructure exists but ships zero posts | `src/pages/blog/[...slug].astro`, `index.astro`; `dist/blog/` index only | Publish 3-5 cornerstone explainer posts (ACWR, HRV recovery, RPE vs RIR, deload) with BlogPosting JSON-LD | L |
| LOW | Scientific claims attribute a researcher but cite zero primary sources | `dist/features/workload-tracking/index.html` ("The science behind it") | Add inline outbound links to 1-2 primary sources (Gabbett 2016 BJSM) | S |
| LOW | No homepage entity-defining "Tuwa is a…" sentence | `dist/index.html` (H1 benefit + body mechanism, no category/platform assertion) | Add one declarative definitional sentence near the top (and as llms.txt's first line) | S |

### UI/UX + Accessibility + Conversion (score 68)

> The site is well-built on fundamentals: clear hero hierarchy (H1 → subtitle → device → App Store badge), a sticky header with persistent "Get the App" CTA, a keyboard-accessible mobile menu with focus trap, charts with aria-labels, disciplined reduced-motion guards across all animations, and a consistent token system. But three issues actively undermine converting "serious, evidence-based" athletes: (1) the homepage closing CTA has no download button at all; (2) fabricated trust metrics contradict the very next "No vanity metrics" line; (3) a personal Gmail is the only support/legal contact. There are also two genuine WCAG AA contrast failures (`text-3` #AFABA5), no skip-to-content link, and the entire homepage feature set is hidden behind a click-wheel that shows only 1 of 5 features and collapses to one feature with no JS.

| Severity | Title | Location | Fix | Effort |
|----------|-------|----------|-----|--------|
| HIGH | Homepage closing CTA has no download button — dead-end on top conversion page | `src/components/LandingCTA.astro:12-46` | Add App Store badge (mirror `FeatureCTA.astro:44-64`), plus secondary "See the methodology" link | S |
| HIGH | Fabricated trust metrics contradict "evidence-based, no vanity metrics" positioning | `src/components/StatsCounter.astro:28-55`; `src/i18n/locales/{en,fr,zh}/home.ts` | Remove until real figures exist or replace with verifiable signals; never state unsourced accuracy % | M |
| HIGH | WCAG AA contrast failures on `text-3` (#AFABA5) | `src/styles/global.css` `--color-text-3`; `Footer.astro:81`, `FaqAccordion.astro:25`, chart ticks, DeviceFrame label | Darken to ~#6F6B65 for text, or reserve #AFABA5 for non-text decoration; use `text-2` for ticks/marker | S |
| MEDIUM | Personal Gmail is the only support/legal contact across all pages/locales | `src/pages/{support,privacy,terms}.astro` + zh/fr mirrors (`hanwenma09@gmail.com` ×9) | Use domain email (`support@tuwa.app`), centralize in `src/config.ts`; verify it's monitored | S |
| MEDIUM | No skip-to-content link; keyboard users tab through full nav on every page | `src/layouts/BaseLayout.astro:33-37` | Add visually-hidden-until-focused `<a href="#main" class="sr-only focus:not-sr-only">`, add `id="main"` to `<main>` | S |
| MEDIUM | Homepage features hidden behind click-wheel — 4 of 5 invisible, gone without JS | `src/components/FeatureGrid.astro`; `.wheel-container` `global.css:570-758` | Add static always-visible feature list/grid (wheel as enhancement); add `<noscript>` fallback | M |
| MEDIUM | Charts have no non-JS fallback while body promises "the chart below" | `src/components/charts/AcwrChart.astro`, `RecoveryChart.astro` | Add a visually-hidden data table inside each chart container as canvas fallback | M |
| LOW | Homepage `<title>` is just "Tuwa" | `src/pages/index.astro:9` via `SEO.astro:23` | Pass full title "Tuwa — Precision Training Load & Recovery for Serious Athletes" | S |
| LOW | Localized stat numbers use English formatting in pre-JS render | `src/components/StatsCounter.astro:34,44`; `dist/{fr,zh}/index.html` | Render locale-correct formatted string server-side per page (secondary to removing stats) | S |

### Animation / Motion

> Mostly disciplined motion work with reduced-motion guards across lenis, counters, view transitions, and Matisse art — but Chart.js entrance animations and an unreserved canvas height slip through.

| Severity | Title | Location | Fix | Effort |
|----------|-------|----------|-----|--------|
| MEDIUM | Chart.js entrance animations ignore prefers-reduced-motion | `src/components/charts/AcwrChart.astro`, `RecoveryChart.astro` | Set `options.animation = false` when `prefers-reduced-motion: reduce` matches | S |
| MEDIUM | Chart canvas has no reserved height causing CLS | `src/components/charts/AcwrChart.astro`, `RecoveryChart.astro` | Add `aspect-ratio`/`min-height` on wrapper and set `maintainAspectRatio` | S |
| LOW | Minor robustness items across wheel sticky-step and frieze | `src/components/FeatureGrid.astro` | Re-read MediaQueryList matches, use a midpoint trigger, comment the shared `matisse-shape-enter` keyframe | S |

### Performance / Core Web Vitals (score 78)

> The English site is genuinely fast and well-built: the en homepage ships only ~12.5KB HTML (br), one 5.9KB CSS file, one 5.3KB lenis+motion JS module (deferred), and a properly optimized LCP image (eager + fetchpriority=high + width/height + responsive webp srcset). Image hygiene and LCP setup are exemplary. Performance problems are concentrated elsewhere: chart.js eagerly downloaded on feature pages despite below-fold charts; the zh CJK strategy blocks paint behind a 230KB stylesheet; content-hashed immutable assets served with only 4h cache; and a 33KB orphaned CSS artifact ships referenced by nothing. CWV risk is low for LCP/CLS on en, moderate for INP/load on feature pages and zh.

| Severity | Title | Location | Fix | Effort |
|----------|-------|----------|-----|--------|
| MEDIUM | chart.js (206KB / 72KB br) eagerly loaded on feature pages despite below-fold charts | `src/components/charts/AcwrChart.astro`, `RecoveryChart.astro` → `dist/_astro/auto.sRkgK8jz.js` (6 pages) | Gate import behind IntersectionObserver; switch from `chart.js/auto` to hand-registered build | M |
| MEDIUM | Content-hashed immutable `/_astro/*` assets served with only 4h cache + must-revalidate | Cloudflare headers for `https://tuwa.app/_astro/*` and fonts | Add `public/_headers`: `/_astro/*` & `/fonts/*` → `max-age=31536000, immutable` | S |
| MEDIUM | 230KB render-blocking Noto Sans SC stylesheet (59KB br) blocks paint on all /zh pages | `dist/_astro/700.BhiG0NI7.css`, blocking `<link>` in all 12 /zh/* pages | Scope subsets per page or preload the 2-4 woff2 subsets the zh homepage renders; drop redundant woff fallbacks | M |
| LOW | Orphaned 33KB CSS artifact shipped in dist, referenced by nothing | `dist/_astro/BaseLayout.vvyqnmNq.css` | Track down duplicate BaseLayout emission, remove; verify clean build emits one BaseLayout.*.css | S |
| LOW | BaseLayout CSS 46KB raw / 5.9KB br — large unused-utility surface | `dist/_astro/BaseLayout.CQ_9UNQ_.css` (all 35 pages) | No action unless INP suffers; tighten Tailwind v4 content globbing, consider per-route splitting | S |
| LOW | lenis + motion JS (5.3KB br) loaded globally incl. text-only pages | `BaseLayout.astro` → `...index_0_lang.BM3LCaD1.js` (all 35 pages) | Leave as-is unless field INP shows scroll jank; if so, scope lenis to homepage/feature pages and confirm reduced-motion gates lenis | S |
| LOW | LCP image `src` fallback points to largest 51KB variant though displayed at 320px | `dist/index.html` hero `<img>` (`dashboard.QcFCkhMx_2kaszX.webp`) | Point `src` fallback at the 640w variant (~22KB worst case) | S |

## Quick wins (S-effort, shippable today)

- Replace `APP_STORE_URL` placeholder in `src/config.ts` (or gate to "notify me").
- Add the App Store badge to `LandingCTA.astro` (homepage closing CTA).
- Remove the 5 dead nav links from Header/Footer/MobileMenu + locale `common.ts` (if not building the pages yet).
- Add SoftwareApplication + Organization JSON-LD to `SEO.astro`; add FAQPage JSON-LD to `FaqAccordion.astro`.
- Set a descriptive homepage `<title>`; trim long fr/en meta descriptions to ~155c.
- Darken `--color-text-3` (or swap to `text-2` for chart ticks and the FAQ marker).
- Add a skip-to-content link in `BaseLayout.astro`.
- Replace the personal Gmail with a domain email centralized in `src/config.ts`.
- Add `public/_headers` for year-long immutable caching of `/_astro/*` and `/fonts/*`.
- Add explicit AI-crawler allow blocks + Sitemap line to `public/robots.txt`.
- Add `public/llms.txt` with a definitional "Tuwa is an iOS…" first line.
- Standardize on `zh-CN` across hreflang/sitemap/html-lang; fix the doubled brand suffix in `fr/workload-tracking.ts:5`.
- Add `noindex` to 404 pages; link the SVG favicon and add a theme-color meta; add `og:image` width/height/alt.
- Delete the orphaned `BaseLayout.vvyqnmNq.css`; point the hero `<img>` `src` at the 640w variant.
- Set chart `animation:false` under reduced-motion; reserve chart canvas height to kill CLS.

## What's already good

- **Performance fundamentals are exemplary on English.** ~12.5KB HTML, one ~5.9KB CSS file, a single deferred 5.3KB JS module, and a textbook LCP image (eager, fetchpriority=high, width/height set → zero CLS, webp responsive srcset). No chart.js or CJK CSS leaks onto the homepage.
- **The scientific content is genuinely strong.** Feature pages run 1,200–1,700 words with clean single-H1 hierarchies, accurate keyword targeting (ACWR, EWMA, RPE/RIR), and accessible explanations of real sports-science (Gabbett, the 0.8–1.3 sweet spot) without a jargon wall.
- **Trilingual SEO is fundamentally correct.** zh/fr H1s are genuinely translated (not duplicated English), canonicals self-reference, and hreflang + x-default are wired properly — no duplicate-content risk across locales.
- **Accessibility basics are largely in place.** Keyboard-accessible mobile menu with focus trap, chart aria-labels, and disciplined `prefers-reduced-motion` guards across lenis, counters, view transitions, and the Matisse art.
- **AI crawlers are not blocked.** robots.txt is a clean wildcard allow, so GPTBot, ClaudeBot, PerplexityBot, and Google-Extended can all read the site — a common own-goal avoided.
- **The FAQ content is citation-grade.** Self-contained, specific, authoritative answers (ACWR definition, "raw HealthKit data never leaves your device") — excellent raw material that just needs FAQPage schema to be extractable.
- **Image hygiene and the design token system are consistent and clean** across the build.
