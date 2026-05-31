# Audit Remediation Progress

Source: `.planning/AUDIT.md` (2026-05-31 multi-dimension audit).
Decisions confirmed by Hanwen: real App Store URL `id6761185505`; **build** the 5 dead nav pages; **remove** fabricated stats (codex concurred → replace with 3 principle tiles); keep personal Gmail contact.

## Wave 1 — critical conversion fixes + quick wins (DONE)

| # | Fix | Files | Audit ref |
|---|-----|-------|-----------|
| 1 | Real App Store URL (`id6761185505`) | `src/config.ts` | TP#1 |
| 2 | App Store badge on homepage closing CTA | `src/components/LandingCTA.astro` | TP#2 |
| 3 | Remove fabricated stats → 3 trust tiles (ACWR+HRV / privacy / day-one) | `StatsCounter.astro`, `i18n/{en,fr,zh}/home.ts` | TP#4 |
| 4 | SoftwareApplication + Organization JSON-LD (all 3 homepages) | `src/seo/schema.ts`, `pages/{,,zh/,fr/}index.astro`, `SEO.astro`, `BaseLayout.astro`, `CJKLayout.astro` | TP#5 |
| 5 | FAQPage JSON-LD | `FaqAccordion.astro` | GEO |
| 6 | Descriptive localized homepage titles | `pages/{,zh/,fr/}index.astro` | TP#8 |
| 7 | WCAG AA: darken `--color-text-3` → `#6D6862` (≥4.5:1 on bg & surface); chart ticks updated | `global.css`, charts | TP#9 |
| 8 | `public/_headers` — 1y immutable cache for `/_astro/*` + `/fonts/*` | `public/_headers` | TP#10 |
| 9 | `public/llms.txt` with definitional first line + section links | `public/llms.txt` | GEO |
| 10 | robots.txt explicit AI-crawler allow blocks | `public/robots.txt` | GEO |
| 11 | hreflang standardized on `zh-CN` (matches sitemap); root trailing-slash parity | `SEO.astro` | tech-SEO |
| 12 | Fix doubled `— Tuwa` suffix (fr workload title) | `fr/workload-tracking.ts` | tech-SEO |
| 13 | 404 pages `noindex` (en/zh/fr) | `404.astro` ×3 | tech-SEO |
| 14 | Link SVG favicon + `theme-color` meta | `BaseLayout.astro` | tech-SEO |
| 15 | `og:image` width/height/alt | `SEO.astro` | tech-SEO |
| 16 | Chart.js `animation:false` under reduced-motion + reserved canvas height (CLS) | `AcwrChart.astro`, `RecoveryChart.astro` | animation |
| 17 | Skip-to-content link + `id="main"` | `BaseLayout.astro`, `global.css` | UI/UX |

Note: kept `html lang="zh"` (not `zh-CN`) — the CJK font override keys off `html[lang="zh"]`; standardization applied at hreflang/sitemap layer instead.

Build: `npm run build` ✓ 33 pages. Changes verified in `dist/`.

## Wave 2 — build 5 trilingual keyword pages (DONE)

Resolves the CRITICAL sitewide 404 nav links: `/methodology/`, `/for-coaches/`, `/readiness-score/`, `/training-load/`, `/compare/` — now built in **en + zh + fr** (15 pages).

- Shared `TopicPageContent` type (`src/i18n/topicPage.ts`) + one `TopicPageLayout.astro` render all five.
- Content authored by a 5-agent parallel workflow (one per topic), trilingual, matching existing voice/terminology. Assembled deterministically into 15 locale modules + registered via `useTopicTranslations` in `utils.ts`.
- `/methodology/` carries the HIGH "cite scientific claims" fix: inline references to Gabbett 2016 BJSM + Hulin/Gabbett 2016.
- Each page has localized hreflang (en/zh-CN/fr), related-page internal links, and is in the sitemap.
- Build: `npm run build` ✓ **48 pages** (was 33). All targets verified in `dist/`; Header/Footer/MobileMenu links now resolve.

## Deferred (M-effort, follow-up)

- Lazy-load chart.js behind IntersectionObserver on feature pages (perf MEDIUM).
- Static feature-list + `<noscript>` fallback behind homepage click-wheel (UI MEDIUM).
- `<noscript>` data-table fallback inside charts (UI MEDIUM).
- Trim long fr/en meta descriptions to ~155c (tech-SEO MEDIUM).
- In-prose cross-links between feature pages (content LOW).
- Cite scientific claims inline (HIGH) — folded into the new `/methodology/` page in Wave 2.
