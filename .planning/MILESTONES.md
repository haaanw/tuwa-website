# Milestones

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
