---
gsd_state_version: 1.0
milestone: v2.0
milestone_name: Visual Overhaul & Polish
status: executing
stopped_at: Completed 08-02-PLAN.md
last_updated: "2026-05-13T11:14:34.024Z"
last_activity: 2026-05-13
progress:
  total_phases: 5
  completed_phases: 3
  total_plans: 8
  completed_plans: 7
  percent: 88
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-11)

**Core value:** Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing
**Current focus:** Phase 08 — ui-ux-visual-depth

## Current Position

Phase: 08 (ui-ux-visual-depth) — EXECUTING
Plan: 3 of 3
Status: Ready to execute
Last activity: 2026-05-13

Progress: [░░░░░░░░░░] 0%

## Performance Metrics

**Velocity:**

- Total plans completed: 15 (v1.0)
- Average duration: —
- Total execution time: 0 hours (v2.0)

**By Phase (v1.0 history):**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01 | 3 | - | - |
| 02 | 2 | - | - |
| 03 | 4 | - | - |
| 04 | 3 | - | - |
| 05 | 1 | - | - |
| 07 | 2 | - | - |

**By Phase (v2.0):**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 05 | TBD | - | - |
| 06 | TBD | - | - |
| 07 | TBD | - | - |
| 08 | TBD | - | - |
| 09 | TBD | - | - |

**Recent Trend:**

- Last 5 plans: —
- Trend: —

*Updated after each plan completion*
| Phase 06 P01 | 2 minutes | 2 tasks | 2 files |
| Phase 06-screenshot-presentation P02 | 30 | 3 tasks | 8 files |
| Phase 07-animation-polish P01 | 20 | 3 tasks | 4 files |
| Phase 07-animation-polish P02 | 2 | 2 tasks | 2 files |
| Phase 08 P01 | 113 | 2 tasks | 2 files |
| Phase 08-ui-ux-visual-depth P02 | 78 | 2 tasks | 5 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Init]: Alpino over DM Sans for web (user preference, app will follow)
- [Init]: No `@astrojs/cloudflare` adapter — causes deployment failures with static output
- [Init]: Tailwind v4 uses `@tailwindcss/vite` plugin, NOT deprecated `@astrojs/tailwind`
- [Init]: content.config.ts lives at `src/content.config.ts` (Astro v6 location)
- [Init]: Only two Astro islands: ThemeToggle and MobileMenu — all other JS is inline
- [Phase 01-foundation]: Fonts API fontProviders.fontshare() resolved Alpino successfully — no manual @font-face fallback needed
- [Phase 01-foundation]: OG default image is 1x1 PNG placeholder; proper branded 1200x630 deferred to Phase 4
- [Phase 01-foundation]: MobileMenu uses bundled script tag (not is:inline) for deduplication across pages
- [Phase 01-foundation]: Logo rendered as <a> not <h1> — h1 stays in main page content (accessibility contract)
- [Phase 01-foundation]: Pinned vite to ^6.4.2 — vite 8/rolldown auto-install broke @tailwindcss/vite when importing global.css from BaseLayout during production build
- [Phase 01-foundation]: BaseLayout.astro delegates SEO, font, header, and footer — pages provide only their content slot
- [Phase 01-foundation]: Font preload placed before viewport meta in BaseLayout head per Pitfall 6 from RESEARCH.md
- [Phase 02-landing-page]: Used Dashboard_framed.png directly without CSS border frame to avoid doubled frame visual (RESEARCH.md Pitfall 1 option 2)
- [Phase 02-landing-page]: App Store badge placeholder SVG in place — replace with official Apple badge from developer.apple.com before go-live
- [Phase 02-landing-page]: APP_STORE_URL defined as constant in src/config.ts — single source of truth for Hero and future LandingCTA
- [Phase 03-content-pages]: FeatureCTA owns IntersectionObserver — not FeaturePageLayout — matches LandingCTA pattern
- [Phase 03-content-pages]: isFramed defaults true in ScreenshotBlock — all screenshots are _framed.png with baked-in device bezels
- [Phase 03-content-pages]: OG images generated via temp sharp+SVG script then deleted — no generator committed to repo
- [Phase 03-content-pages]: CoachingPageLayout wraps BaseLayout directly with 3 named slots (coach-athlete, team-features, invite-flow) for alternating surface/bg section backgrounds
- [Phase 03-content-pages]: LegalPageLayout uses --text-heading (28px) not --text-display -- legal pages are not marketing hero pages
- [Phase 03-content-pages]: Chart.js components use bundled script (not is:inline) so Vite resolves chart.js/auto npm import
- [Phase 03-content-pages]: RecoveryChart and AcwrChart embedded in science sections of their respective feature pages, not in hero
- [Phase 03-content-pages]: Cold-start page omits screenshot prop to trigger FeaturePageLayout placeholder — no screenshot asset exists yet
- [Phase 03-content-pages]: coaching.astro uses CoachingPageLayout with 3 named slots, not FeaturePageLayout — distinct layout for coach audience
- [Phase 03-content-pages]: _redirects placed in public/ not src/ — Astro copies public/ to dist/ at build time for Cloudflare Pages edge processing
- [Phase 04-blog-polish]: Switch from Alpino to General Sans font via Astro Fonts API fontshare provider, cssVariable --font-general-sans
- [Phase 04-blog-polish]: SEO og:type prop defaults to 'website'; blog post layout passes 'article'
- [Phase 04-blog-polish]: draft filter uses !import.meta.env.PROD || !data.draft — drafts visible in dev, excluded in prod
- [Phase 04-blog-polish]: blog listing uses post.id as route param (Astro v6 content loader provides id from filename)
- [Phase 04-blog-polish]: BlogPostLayout passes type=article to BaseLayout for og:type article meta
- [Phase 04-blog-polish]: robots.txt references sitemap-index.xml (not sitemap.xml) — @astrojs/sitemap generates sitemap-index.xml as root file
- [Phase 04-blog-polish]: Branded OG image generated via temp sharp+SVG script then deleted — PNG artifact committed, generator not tracked
- [v2.0 roadmap]: 5 phases retained despite coarse granularity setting — hard dependency chain (animation fix -> device frame -> stagger -> visual depth -> deployment) makes collapsing below 5 phases incur rework
- [v2.0 roadmap]: ANIM-05 (sticky scroll showcase) assigned to Phase 7 per research recommendation — high complexity, requires stable animation system and device frames before implementation
- [v2.0 roadmap]: tailwind-animations 1.0.1 (CSS View Timeline) preferred over motion library; motion 12.38.0 reserved as conditional for hero choreography only if CSS insufficient
- [Phase 06]: Device frame chrome uses hardcoded #1A1A1A (not a design token) — hardware color per D-02 spec
- [Phase 06]: widths prop drives srcset on Image component in DeviceFrame; no format=webp (Astro 6 auto-generates WebP per D-08)
- [Phase 06-02]: Perspective transform (1600px/-2deg/1deg) applied on wrapper div around DeviceFrame, not inside component — keeps DeviceFrame flat and reusable for feature pages
- [Phase 06-02]: Navigation links fixed in Header/Footer/MobileMenu: /features -> /features/recovery-scoring, /coaching -> /features/coaching
- [Phase 06-02]: iPhone frame proportions refined to 393:852 aspect ratio with 50px border-radius after visual verification pass
- [Phase 07-animation-polish]: Hero perspective tilt moved into keyframe from/to states — avoids conflict with CSS animation and persists tilt after animation completes
- [Phase 07-animation-polish]: fill-mode: both on hero classes — prevents FOUC before 350ms device delay fires by holding from state
- [Phase 07-animation-polish]: Hero uses CSS-only animation without .js-enabled gate — fires on page load for all users, does not wait for scroll
- [Phase 07-animation-polish]: data-animate-delay read via JS getAttribute and set as el.style.animationDelay — CSS attr() with type hints not cross-browser as of May 2026
- [Phase 07-animation-polish]: Sticky showcase CSS in global.css (not scoped) — available for future pages
- [Phase 07-animation-polish]: StickyScrollController threshold 0.5 vs global 0.15 — step activates at visual midpoint
- [Phase 07-animation-polish]: No unobserve() in StickyScrollController — continuous bi-directional scroll observation required
- [Phase 07-animation-polish]: Sticky showcase CSS placed in global.css (not scoped) — available for future pages
- [Phase 07-animation-polish]: StickyScrollController threshold 0.5 vs global 0.15 — step activates at visual midpoint
- [Phase 07-animation-polish]: No unobserve() in StickyScrollController — continuous bi-directional scroll observation required
- [Phase 08]: body::after used for noise texture — body::before unused, ::after confirmed safe
- [Phase 08]: feature-card base styles migrated from FeatureGrid scoped style to global.css — enables bento-hero-card variant class
- [Phase 08]: section-spaced class applied to FeatureGrid — component no longer owns its vertical padding
- [Phase 08-ui-ux-visual-depth]: Header inline onmouseover bg-color handlers preserved alongside btn-cta — backgroundColor/boxShadow and transform are independent CSS properties, no conflict
- [Phase 08-ui-ux-visual-depth]: Footer nav-link replaces hover:underline — color transition to --color-accent on hover is more on-brand than underline

### Pending Todos

- Replace placeholder App Store badge SVG with official Apple asset from developer.apple.com (DEPL-02, Phase 9)
- Re-export all app screenshots at 3x from Xcode Simulator before Phase 6 begins (SHOT-01 precondition)
- Evaluate Screenhance output quality for hero mockup before committing to pre-rendered approach (SHOT-05 risk note from research)

### Blockers/Concerns

- [Phase 6 pre-condition]: App screenshots must be re-exported at 3x from Xcode Simulator before DeviceFrame work can be completed — coordinate timing
- [Phase 7 risk]: Hero entrance choreography (ANIM-04) may require motion library if CSS View Timeline proves insufficient — validate during Phase 7 planning
- [Phase 7 risk]: ANIM-05 sticky scroll showcase is flagged HIGH complexity by research — may require content readiness (multiple screenshot states per feature) to implement properly

## Deferred Items

Items acknowledged and carried forward:

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Content | CONT-01: First blog post | Future milestone | v2.0 planning |
| Content | CONT-02: Case study page | Future milestone | v2.0 planning |
| Advanced Visual | ADVZ-01: Video hero background | Future milestone | v2.0 planning |
| Advanced Visual | ADVZ-02: Dark mode support | Out of scope | PROJECT.md |

## Session Continuity

Last session: 2026-05-13T11:14:34.021Z
Stopped at: Completed 08-02-PLAN.md
Resume file: None
