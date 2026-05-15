---
phase: 14-typography-weight-rollout
plan: 02
subsystem: ui
tags: [css, typography, design-tokens, astro, tailwind]

# Dependency graph
requires:
  - phase: 11-css-foundation-token-system
    provides: CSS custom property weight tokens (--weight-display, --weight-heading, --weight-body, --weight-label) defined in global.css :root
provides:
  - All 4 layout h1 page titles tokenized with var(--weight-heading)
  - All 5 feature page h2/h3 section headings tokenized with var(--weight-heading)
  - blog/index.astro h1 and h2 listing titles tokenized
  - support.astro h2 and CTA button tokenized
  - 6 global.css selectors (.nav-logo, .nav-dropdown-title, .btn-cta, .wheel-segment-label, .wheel-center-title, .wheel-center-cta) tokenized
  - Zero hardcoded font-weight design values in layouts, pages, and global.css selectors
affects: [15-matisse-art-direction, 16-interaction-polish]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "CSS custom property token substitution: font-weight: 600 -> font-weight: var(--weight-heading)"
    - "All h2/h3 headings map to --weight-heading (300) regardless of font-size (D-02 locked)"
    - "All-caps label elements and CTA buttons map to --weight-label (600)"
    - "Global UI chrome (nav, buttons) uses --weight-label for distinction from body copy"

key-files:
  created: []
  modified:
    - src/layouts/FeaturePageLayout.astro
    - src/layouts/CoachingPageLayout.astro
    - src/layouts/LegalPageLayout.astro
    - src/layouts/BlogPostLayout.astro
    - src/pages/blog/index.astro
    - src/pages/support.astro
    - src/pages/features/recovery-scoring.astro
    - src/pages/features/workload-tracking.astro
    - src/pages/features/smart-templates.astro
    - src/pages/features/cold-start.astro
    - src/pages/features/coaching.astro
    - src/styles/global.css

key-decisions:
  - "coaching.astro all-caps label paragraph 'How connection works' assigned var(--weight-label) per D-04 (label/caption rule)"
  - ".wheel-segment-label reduced from 700 to 600 via var(--weight-label) token — slight weight reduction on SVG all-caps 11px labels"
  - ".wheel-center-title reduced from 600 to 500 via var(--weight-body) token — subtle drop for wheel center panel title"
  - "Worktree path discipline: edits must target worktree path, not main repo path"

patterns-established:
  - "Pattern B: Feature page inline h2/h3 replacement — all headings regardless of font-size use var(--weight-heading)"
  - "Pattern C: global.css selector replacement — 6 UI chrome selectors now reference weight tokens"

requirements-completed: [TYPO-03, TYPO-04, TYPO-05]

# Metrics
duration: 15min
completed: 2026-05-15
---

# Phase 14 Plan 02: Typography Weight Rollout — Layouts, Pages, Global.css Summary

**Tokenized font-weight across 4 layouts, 7 pages, and 6 global.css selectors — zero hardcoded design weight values remain in layouts, pages, or global.css selectors**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-05-15T10:18:00Z
- **Completed:** 2026-05-15T10:33:50Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments

- Migrated all 4 layout files (FeaturePageLayout, CoachingPageLayout, LegalPageLayout, BlogPostLayout) — every page title h1 now renders at weight 300 via var(--weight-heading)
- Migrated 7 page files (blog/index, support, recovery-scoring, workload-tracking, smart-templates, cold-start, coaching) — all section h2/h3 headings use weight tokens
- Migrated 6 global.css selectors — UI chrome (nav logo, dropdown titles, CTA buttons, wheel labels) now fully tokenized
- .wheel-segment-label reduced from 700 to 600 (via token), .wheel-center-title reduced from 600 to 500 (via token)
- Build verified clean after both task batches; zero numeric font-weight design values remain in scope

## Task Commits

Each task was committed atomically:

1. **Task 1: Migrate layouts, blog, and support pages to weight tokens** - `bcf9103` (feat)
2. **Task 2: Migrate feature pages and global.css selectors, run final verification** - `acc82b7` (feat)

**Plan metadata:** (committed with SUMMARY below)

## Files Created/Modified

- `src/layouts/FeaturePageLayout.astro` - h1 font-weight: 600 -> var(--weight-heading)
- `src/layouts/CoachingPageLayout.astro` - h1 font-weight: 600 -> var(--weight-heading)
- `src/layouts/LegalPageLayout.astro` - h1 font-weight: 600 -> var(--weight-heading)
- `src/layouts/BlogPostLayout.astro` - h1 font-weight: 600 -> var(--weight-heading)
- `src/pages/blog/index.astro` - h1 and h2 listing titles tokenized
- `src/pages/support.astro` - h2 -> var(--weight-heading), CTA button -> var(--weight-label)
- `src/pages/features/recovery-scoring.astro` - 4 h2/h3 occurrences tokenized (including missed "The science behind it" h2)
- `src/pages/features/workload-tracking.astro` - 4 h2/h3 occurrences tokenized
- `src/pages/features/smart-templates.astro` - 4 h2/h3 occurrences tokenized
- `src/pages/features/cold-start.astro` - 5 h2/h3 occurrences tokenized
- `src/pages/features/coaching.astro` - 6 h2 occurrences + 1 label paragraph tokenized
- `src/styles/global.css` - .nav-logo, .nav-dropdown-title, .btn-cta, .wheel-segment-label, .wheel-center-title, .wheel-center-cta tokenized

## Decisions Made

- coaching.astro contains an all-caps label paragraph ("How connection works") with `font-weight: 600; text-transform: uppercase` — assigned `var(--weight-label)` per D-04 (label/caption rule). This was not in the plan's explicit occurrence count but is correct per the decision table.
- Worktree execution requires using absolute worktree paths (`/Users/hanwen/Desktop/tuwa-website/.claude/worktrees/agent-a8381164/src/...`) not main repo paths — early edits went to main repo and were reverted before correct worktree edits were applied.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed missed h2 occurrences not caught by replace_all pattern**
- **Found during:** Task 2 verification grep
- **Issue:** recovery-scoring.astro "The science behind it" h2 and coaching.astro "How it works" h2 used different indentation levels (4 vs 8 spaces) that were not matched by the initial replace_all pattern
- **Fix:** Applied targeted replacements for each missed h2 block
- **Files modified:** src/pages/features/recovery-scoring.astro, src/pages/features/coaching.astro
- **Verification:** Full grep `font-weight: [0-9]` across pages/ and layouts/ returned zero results
- **Committed in:** acc82b7 (Task 2 commit)

**2. [Rule 2 - Missing Critical] Tokenized unlisted all-caps label paragraph in coaching.astro**
- **Found during:** Task 2 final verification grep
- **Issue:** coaching.astro line 175 contained `font-weight: 600; text-transform: uppercase` on a label paragraph — not in plan's explicit count but meets the zero-hardcoded-values goal
- **Fix:** Applied `var(--weight-label)` per D-04 (all-caps label/caption rule)
- **Files modified:** src/pages/features/coaching.astro
- **Committed in:** acc82b7 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 bug — missed pattern matching, 1 missing critical — unlisted occurrence)
**Impact on plan:** Both fixes necessary to achieve the zero-hardcoded-values acceptance criterion. No scope creep.

## Issues Encountered

- Worktree path confusion: initial edits went to `/Users/hanwen/Desktop/tuwa-website/src/` (main repo) instead of the worktree path. Reverted main repo changes with `git checkout --` before re-applying all edits to the correct worktree path. No data loss.
- Pre-existing TypeScript error in `astro.config.mjs` (Vite plugin type incompatibility, unrelated to this plan's changes) — left as-is per scope boundary rule.

## Known Stubs

None — all file modifications are pure CSS value replacements with no data flow or UI rendering implications.

## Threat Flags

None — pure CSS refactor, no new network endpoints, auth paths, or schema changes.

## Next Phase Readiness

- Plan 14-01 (component wave) and plan 14-02 (layouts/pages/global.css wave) complete the full typography weight rollout
- After merge, `grep -rn "font-weight: [0-9]" src/ --include="*.astro" --include="*.css" | grep -v "200 700" | grep -v "font-weight: 400"` should return zero results
- Phase 15 (Matisse art direction) can proceed — typography weight system is fully tokenized

---
*Phase: 14-typography-weight-rollout*
*Completed: 2026-05-15*

## Self-Check: PASSED

- SUMMARY.md: FOUND
- Commit bcf9103 (Task 1): FOUND
- Commit acc82b7 (Task 2): FOUND
- FeaturePageLayout.astro contains var(--weight-heading): 1 occurrence
- recovery-scoring.astro contains var(--weight-heading): 5 occurrences
- global.css contains var(--weight-label): 5 occurrences
