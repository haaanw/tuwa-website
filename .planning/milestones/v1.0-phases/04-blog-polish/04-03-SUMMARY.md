---
phase: 04-blog-polish
plan: "03"
subsystem: seo, performance, static-assets
tags: [robots-txt, og-image, sitemap, semantic-html, lighthouse, seo]
dependency_graph:
  requires:
    - phase: 04-01
      provides: General Sans font, og:type prop on SEO component
    - phase: 04-02
      provides: blog listing page, blog post layout, og-default.png fallback path
  provides: [robots-txt, branded-og-image, sitemap-verified, semantic-html-audit]
  affects: [public assets, crawler indexing, social media sharing, SEO]
tech_stack:
  added: []
  patterns: [temp-script-then-delete, sharp-svg-png, robots-txt-sitemap-reference]
key_files:
  created:
    - public/robots.txt
    - public/og-default.png
  modified: []
key_decisions:
  - "robots.txt references sitemap-index.xml (not sitemap.xml) — @astrojs/sitemap generates sitemap-index.xml as root"
  - "OG image generated via temp sharp+SVG script then deleted — no generator committed to repo (matches Phase 3 pattern)"
  - "Branded OG image uses travertine (#F4F1ED) background with dark text (#1C1915) and secondary subtitle (#696560)"
  - "No semantic HTML fixes required — all pages already had correct heading hierarchy and alt attributes"

requirements-completed: [PERF-01, PERF-02, PERF-03, PERF-04, PERF-05]

# Metrics
duration: ~15min
completed: 2026-05-11
---

# Phase 04 Plan 03: SEO Polish and Performance Audit Summary

**robots.txt with sitemap-index.xml reference and branded 1200x630 OG image replacing 70-byte placeholder, with Lighthouse performance >= 95 verified by human.**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-05-11T08:04:01Z
- **Completed:** 2026-05-11
- **Tasks:** 2 (1 auto + 1 human-verify checkpoint)
- **Files modified:** 2

## Accomplishments

- Created `public/robots.txt` with correct `User-agent: *`, `Allow: /`, and `Sitemap: https://tuwa.app/sitemap-index.xml` directives
- Generated branded 1200x630 PNG OG image (`public/og-default.png`) using sharp + SVG, replacing the 70-byte 1x1 placeholder from Phase 1
- Verified full sitemap generation (`dist/sitemap-index.xml` and `dist/sitemap-0.xml`) at build time
- Human-verified Lighthouse performance >= 95, General Sans font rendering, blog empty state, OG image quality, and robots.txt content

## Task Commits

Each task was committed atomically:

1. **Task 1: Create robots.txt, generate branded OG image, audit semantic HTML** - `46e4df6` (feat)
2. **Task 2: Verify Lighthouse score, font rendering, blog page, and OG image** - N/A (human-verify checkpoint — approved by user)

**Plan metadata:** (committed with docs commit for this summary)

## Files Created/Modified

- `public/robots.txt` — Crawler directives allowing all bots, referencing sitemap-index.xml for Google/Bing discovery
- `public/og-default.png` — Branded 1200x630 PNG with Tuwa wordmark and subtitle, replacing 1x1 placeholder; used as fallback OG image across all pages

## Decisions Made

- **robots.txt references `sitemap-index.xml`** — @astrojs/sitemap generates `sitemap-index.xml` as the entry point (not `sitemap.xml`). Using the wrong filename would prevent crawlers from discovering the sitemap.
- **OG image generated via temp script, then deleted** — Consistent with the Phase 3 pattern for sharp+SVG generation. Keeps the repo clean; the PNG artifact is what matters, not the generator.
- **No semantic HTML fixes required** — All pages audited (index, features, legal, support, layouts) already had proper h1 hierarchy, alt attributes on images, and landmark elements. No changes needed.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None — the `public/og-default.png` stub from Plan 02's Known Stubs section has been resolved. The file is now a proper 1200x630 branded image.

## Threat Flags

None — robots.txt allows all crawlers (intentional for a public marketing site). No sensitive routes exist to block.

## Next Phase Readiness

All PERF requirements (PERF-01 through PERF-05) are now complete. Phase 04 is fully done:

- General Sans font across site (Plan 01)
- Blog infrastructure with draft filter and reading time (Plans 01-02)
- robots.txt, branded OG image, sitemap verified, Lighthouse >= 95 (Plan 03)

**Site is ready for v1.0 launch.** Remaining pre-launch checklist items (per Phase 2 decisions):
- Replace App Store badge placeholder SVG with official Apple badge from developer.apple.com
- Update `APP_STORE_URL` in `src/config.ts` with real App Store listing URL

## Self-Check: PASSED

- [x] `public/robots.txt` exists
- [x] `public/og-default.png` exists and is > 1000 bytes
- [x] Commit `46e4df6` exists in git log
- [x] No temp OG generation script remains in repo

---
*Phase: 04-blog-polish*
*Completed: 2026-05-11*
