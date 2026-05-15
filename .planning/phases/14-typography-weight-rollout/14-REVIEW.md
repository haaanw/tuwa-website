---
phase: 14-typography-weight-rollout
reviewed: 2026-05-15T12:00:00Z
depth: standard
files_reviewed: 20
files_reviewed_list:
  - src/components/FaqAccordion.astro
  - src/components/FeatureCTA.astro
  - src/components/FeatureGrid.astro
  - src/components/Footer.astro
  - src/components/Hero.astro
  - src/components/LandingCTA.astro
  - src/components/MobileMenu.astro
  - src/components/StatsCounter.astro
  - src/layouts/BlogPostLayout.astro
  - src/layouts/CoachingPageLayout.astro
  - src/layouts/FeaturePageLayout.astro
  - src/layouts/LegalPageLayout.astro
  - src/pages/blog/index.astro
  - src/pages/features/coaching.astro
  - src/pages/features/cold-start.astro
  - src/pages/features/recovery-scoring.astro
  - src/pages/features/smart-templates.astro
  - src/pages/features/workload-tracking.astro
  - src/pages/support.astro
  - src/styles/global.css
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 14: Code Review Report

**Reviewed:** 2026-05-15T12:00:00Z
**Depth:** standard
**Files Reviewed:** 20
**Status:** issues_found

## Summary

Reviewed all 20 files in scope for the typography weight token rollout phase. The weight tokens (`--weight-display`, `--weight-heading`, `--weight-body`, `--weight-label`) defined in `global.css` are applied consistently across all components and layouts. No critical issues found. Three warnings relate to a hardcoded URL deviating from the centralized config pattern, an invalid HTML nesting pattern, and a hardcoded letter-spacing value bypassing the token system. Three info-level items note minor inconsistencies.

## Warnings

### WR-01: Hardcoded App Store URL in MobileMenu

**File:** `src/components/MobileMenu.astro:87`
**Issue:** The "Get the App" CTA link hardcodes `href="https://apps.apple.com/app/tuwa"` instead of importing `APP_STORE_URL` from `../config`. Every other component that links to the App Store (`Hero.astro`, `Footer.astro`, `FeatureCTA.astro`) uses the centralized config constant. If the App Store URL changes (e.g., region-specific link, campaign parameter), this component will silently point to the old URL.
**Fix:**
```astro
---
// Add to frontmatter
import { APP_STORE_URL } from '../config';
---

<!-- Change the href on line 87 -->
<a href={APP_STORE_URL} ...>
```

### WR-02: Invalid HTML nesting -- details inside dl

**File:** `src/components/FaqAccordion.astro:71-93`
**Issue:** The FAQ list wraps `<details>` elements inside a `<dl>` (description list) element. Per the HTML spec, valid children of `<dl>` are `<dt>`, `<dd>`, `<div>`, and `<script>`/`<template>`. `<details>` is not a valid child, which may cause unexpected rendering in assistive technologies and could trigger HTML validation warnings. The semantic intent (question-answer pairs) is better served by a plain list or by using `<dl>` with `<dt>`/`<dd>` pairs without the `<details>` wrapper.
**Fix:** Replace `<dl>` with a `<div>` wrapper, which imposes no content model restrictions on its children:
```astro
<div>
  {faqs.map(({ q, a }) => (
    <details style="border-bottom: 1px solid var(--color-divider);">
      <summary ...>{q}</summary>
      <p ...>{a}</p>
    </details>
  ))}
</div>
```

### WR-03: Hardcoded letter-spacing bypasses token system

**File:** `src/pages/features/coaching.astro:177`
**Issue:** The "How connection works" label uses `letter-spacing: 0.08em` instead of the design token `var(--tracking-label)` which is set to `0.06em`. This deviates from the token system used consistently everywhere else in the codebase. If the tracking token value is updated in a future phase, this element will not pick up the change.
**Fix:**
```astro
letter-spacing: var(--tracking-label);
```

## Info

### IN-01: Duplicate layout structure between FeaturePageLayout and CoachingPageLayout

**File:** `src/layouts/CoachingPageLayout.astro:1-87` and `src/layouts/FeaturePageLayout.astro:1-60`
**Issue:** `CoachingPageLayout.astro` duplicates the hero section, screenshot section, and CTA from `FeaturePageLayout.astro` verbatim, adding three named slots (`coach-athlete`, `team-features`, `invite-flow`). If the shared hero/screenshot/CTA markup changes, both files must be updated in lockstep.
**Fix:** Consider extracting the shared hero+screenshot+CTA pattern into `FeaturePageLayout` with optional named slots, making `CoachingPageLayout` extend it rather than duplicate it. Low priority -- only two files to maintain.

### IN-02: FeatureGrid.astro uses is:inline script (357 lines of JS)

**File:** `src/components/FeatureGrid.astro:127-357`
**Issue:** The `<script is:inline>` block contains 230 lines of vanilla JavaScript for the feature wheel interaction. While `is:inline` is necessary here because it manipulates DOM elements rendered in the same component, the script is large enough that extracting it to a separate `.js` file and referencing it with `<script is:inline src="/scripts/feature-wheel.js">` would improve readability and make the component template easier to maintain.
**Fix:** Optional refactor -- move the IIFE to `public/scripts/feature-wheel.js` and reference it inline. No functional change needed.

### IN-03: CSS comment references Astro Font API but font is self-hosted

**File:** `src/styles/global.css:59`
**Issue:** The comment on line 59 reads `/* Typography -- General Sans (variable set by Astro Font API, do not redeclare) */` but the font is actually self-hosted via the `@font-face` block on lines 8-14 with the custom property `--font-general-sans` declared on line 25. The comment is stale and may confuse future contributors.
**Fix:** Update the comment to reflect the current self-hosting approach:
```css
/* Typography -- General Sans (self-hosted variable font, see @font-face above) */
```

---

_Reviewed: 2026-05-15T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
