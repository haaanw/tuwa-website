---
phase: 03-content-pages
plan: 04
subsystem: ui
tags: [astro, coaching, legal, faq, redirects, cloudflare]

# Dependency graph
requires:
  - phase: 03-content-pages-02
    provides: CoachingPageLayout, LegalPageLayout, FaqAccordion components

provides:
  - Coaching feature page at /features/coaching with extended coach/athlete sections
  - Privacy Policy page at /privacy with full migrated content
  - Terms of Service page at /terms with all 12 numbered sections
  - Support page at /support with FAQ accordion and Contact Support CTA
  - Cloudflare Pages _redirects file for 301 redirects from old .html URLs

affects: [04-seo-deploy, any phase referencing legal pages or coaching page]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - CoachingPageLayout: 3 named slots (coach-athlete, team-features, invite-flow) for alternating surface/bg sections
    - LegalPageLayout: prose container with lastUpdated header for legal and support pages
    - FaqAccordion: self-contained component, no props required
    - Cloudflare _redirects: plain text file in public/ copied to dist at build time

key-files:
  created:
    - src/pages/features/coaching.astro
    - src/pages/privacy.astro
    - src/pages/terms.astro
    - src/pages/support.astro
    - public/_redirects
  modified: []

key-decisions:
  - "coaching.astro uses CoachingPageLayout (not FeaturePageLayout) — distinct layout for coach audience with 3 named slots"
  - "No screenshot prop passed to CoachingPageLayout — triggers placeholder (no coaching screenshot asset available)"
  - "Support page uses LegalPageLayout for consistent narrow prose container, not a custom layout"
  - "External links in privacy.astro use rel=noopener noreferrer per T-03-07 threat mitigation"
  - "_redirects placed in public/ not src/ — Astro copies public/ to dist/ at build time"

patterns-established:
  - "Legal pages: import LegalPageLayout, pass title + lastUpdated, slot content starts at h2 (h1 owned by layout)"
  - "External links: always include target=_blank rel=noopener noreferrer"
  - "Support page: FaqAccordion + inline contact section with 44px min-height touch target on CTA"

requirements-completed: [FEAT-05, FEAT-06, FEAT-08, LEGAL-01, LEGAL-02, LEGAL-03, LEGAL-04]

# Metrics
duration: 8min
completed: 2026-05-11
---

# Phase 03 Plan 04: Content Pages (Coaching + Legal) Summary

**Coaching feature page with coach/athlete perspective sections plus Privacy, Terms, Support legal pages and Cloudflare 301 redirect rules — completing all 9 site pages**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-05-11T12:17:00Z
- **Completed:** 2026-05-11T12:20:00Z
- **Tasks:** 2 of 3 complete (Task 3 is human-verify checkpoint)
- **Files modified:** 5

## Accomplishments

- Coaching page at /features/coaching with 400-600 word overview, coach/athlete perspective sections, team workflows, and invite flow card — using CoachingPageLayout with all 3 named slots
- Privacy Policy at /privacy: full PRIVACY.md content migrated to HTML (80 lines, March 27 2026), external links with rel="noopener noreferrer" per threat mitigation T-03-07
- Terms of Service at /terms: all 12 numbered sections from TERMS.md migrated to HTML (April 10 2026)
- Support at /support: FaqAccordion (8 hardcoded FAQs) + Contact Support CTA with accent color and 44px touch target
- public/_redirects: 3 Cloudflare Pages 301 redirect rules for old .html URLs
- Build: 9 pages total (was 6), all pages verified in dist/

## Task Commits

1. **Task 1: Create Coaching feature page** - `65831f3` (feat)
2. **Task 2: Create Privacy, Terms, Support pages plus redirect rules** - `e41d228` (feat)
3. **Task 3: Visual verification** - checkpoint:human-verify (pending user review)

## Files Created/Modified

- `src/pages/features/coaching.astro` - Coach + Athlete feature page with CoachingPageLayout and 4 named slots
- `src/pages/privacy.astro` - Privacy Policy with full migrated content from PRIVACY.md
- `src/pages/terms.astro` - Terms of Service with all 12 sections from TERMS.md
- `src/pages/support.astro` - Support page with FaqAccordion and Contact Support CTA
- `public/_redirects` - Cloudflare Pages 301 redirects for /privacy.html, /terms.html, /support.html

## Decisions Made

- coaching.astro uses CoachingPageLayout (not FeaturePageLayout) — plan decision D-03 specifying distinct layout for coach audience with 3 named slots for alternating section backgrounds
- No screenshot prop passed to coaching page — triggers CoachingPageLayout placeholder behavior (no coaching screenshot asset exists yet)
- Support page uses LegalPageLayout for consistent narrow prose container rather than a custom layout
- External links in privacy.astro include rel="noopener noreferrer" per threat model T-03-07 mitigation requirement

## Deviations from Plan

None - plan executed exactly as written.

## Threat Surface Scan

No new surface beyond plan's threat model:
- T-03-07 mitigated: all external links in privacy.astro have rel="noopener noreferrer"
- T-03-06 accepted: mailto:hanwenma09@gmail.com intentionally public (same email in PRIVACY.md and TERMS.md)
- T-03-08 accepted: _redirects only redirects same-domain .html paths, no open redirect risk

## Known Stubs

None - all pages render complete content from source documents.

## Issues Encountered

Pre-existing: `npx astro check` reports 1 type error in astro.config.mjs (Vite version mismatch between bundled Vite and @tailwindcss/vite). Error is unrelated to this plan's changes and pre-dates this execution. Build (`npm run build`) succeeds with 0 errors.

## Next Phase Readiness

- All 9 content pages are live: home, 5 feature pages, privacy, terms, support
- Cloudflare redirect rules in place for old .html URLs
- Awaiting Task 3 human verification: visual review of all pages at localhost:4321
- Phase 4 (SEO/deploy) can proceed after user verification approval

---
*Phase: 03-content-pages*
*Completed: 2026-05-11*

## Self-Check

### Files exist:
- `src/pages/features/coaching.astro`: exists (committed 65831f3)
- `src/pages/privacy.astro`: exists (committed e41d228)
- `src/pages/terms.astro`: exists (committed e41d228)
- `src/pages/support.astro`: exists (committed e41d228)
- `public/_redirects`: exists (committed e41d228)

### Commits exist:
- `65831f3` feat(03-04): create Coaching feature page
- `e41d228` feat(03-04): create Privacy, Terms, Support pages and Cloudflare redirect rules

### Build: 9 pages built, all HTML confirmed in dist/

## Self-Check: PASSED
