# Milestones

## v4.0 Multi-Language Support (Shipped: 2026-05-25)

**Phases completed:** 6 phases, 16 plans

**Key accomplishments:**

- Astro i18n routing with English unprefixed (SEO equity preserved) and /zh/, /fr/ prefixes; type-safe per-page `use*Translations()` utilities with compile-time shape validation
- Chinese (zh) and French (fr) translations across all 10 pages: home, 5 feature deep-dives, privacy, terms, support, blog listing
- Noto Sans SC CJK font isolated to /zh/ pages via a dedicated bundle — zero CJK CSS on English/French pages
- Path-preserving language switcher (desktop + mobile) with locale-aware navigation across header, footer, and mobile menu
- FeatureGrid click-wheel wired to the translation system with locale-aware segment labels, center overlay, and feature data
- Full SEO i18n: hreflang (en/zh/fr + x-default) on every page, per-locale og:locale, sitemap with 90 hreflang annotations, and three locale-specific 404 pages

**Resolved at close (gsd-progress UAT):**

- Fixed CJK font defect — zh pages had overridden an unused CSS variable, so Chinese silently fell back to system fonts; now Noto Sans SC renders on all zh pages
- Fixed French header overflow (24px) at the 768px tablet breakpoint
- All phase verifications and human UAT (phases 11-20) resolved; CLS measured 0; build green (33 pages)

**Known deferred (v4.1+):** translated OG images (CJK in satori), blog post translations, URL slug translation, additional languages (ja/es/de). Pre-existing 9px wheel overflow at 320px (cross-locale, v2.0 debt).

---

## v2.0 Visual Overhaul & Polish (Shipped: 2026-05-14)

**Phases completed:** 7 phases (incl. 8.1 decimal), 12 plans, 22 tasks
**Git range:** 111 commits, 94 files changed, +18,151 / -378 lines
**Timeline:** 4 days (2026-05-10 → 2026-05-14)

**Key accomplishments:**

- Consolidated animation system with single AnimationController, reduced-motion guards, and JS-disabled fallback
- CSS iPhone 15 Pro device frames on all feature pages + hero perspective tilt with Retina srcset
- Choreographed scroll animations: stagger delays, hero entrance sequence, sticky scroll showcase on recovery-scoring
- Premium visual depth: noise texture, micro-interactions, animated stat counters, consistent spacing system
- iPod-style SVG click wheel replacing bento grid for feature overview section
- Live on Cloudflare Pages (tuwa.app) with official Apple App Store badges — Lighthouse Mobile 98, Desktop 99
- Dead CSS cleanup and wheel arc stagger animation closing all milestone audit gaps

**Known gaps (non-blocking):**

- ANIM-03 stagger: delivered then superseded by click wheel (single-element animation)
- UIPX-05 bento grid: built then intentionally replaced by click wheel
- SHOT-01: screenshots are original high-res assets, not Xcode 3x re-exports (display quality unimpaired)

---

## v1.0 MVP (Shipped: 2026-05-11)

**Phases completed:** 4 phases, 12 plans, 8 tasks

**Key accomplishments:**

- Astro 6 + Tailwind v4 foundation with General Sans font, SEO component, BaseLayout
- Landing page with hero device mockup, feature overview grid, and App Store CTA
- 5 feature deep-dive pages with Chart.js visualizations, ScreenshotBlock, and FeatureCTA
- Blog infrastructure with MDX content collection, reading time, and branded OG images
- Support, Privacy, Terms legal pages with CoachingPageLayout and Cloudflare 301 redirects
- Lighthouse Performance >= 95 verified

---
