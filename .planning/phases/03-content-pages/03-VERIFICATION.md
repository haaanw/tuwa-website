---
phase: 03-content-pages
verified: 2026-05-11T15:03:00Z
status: human_needed
score: 5/5
overrides_applied: 0
human_verification:
  - test: "Navigate to each of the 5 feature pages via the Feature Grid cards on the landing page"
    expected: "Each card clicks through to the correct /features/* route. Recovery Scoring and Workload Tracking pages show interactive Chart.js charts (bar and line). Smart Templates shows the active-workout screenshot. Cold-Start shows a placeholder screenshot block. Coaching page shows coach/athlete perspective sections, team workflows, and invite flow card."
    why_human: "Chart rendering, screenshot display, and navigation are runtime behaviors that require a browser to verify — static file checks confirm the code is wired but cannot confirm Chart.js canvas renders or images load correctly"
  - test: "Navigate to /privacy, /terms, /support"
    expected: "Privacy Policy shows full migrated content with proper h2/h3 headings and section structure. Terms shows all 12 numbered sections. Support shows FAQ accordion that opens/closes on click and a Contact Support button."
    why_human: "FAQ accordion open/close behavior requires interaction; visual prose formatting under @tailwindcss/typography requires a browser render"
  - test: "Visit old URLs /privacy.html, /terms.html, /support.html"
    expected: "Each redirects with 301 to the new route (/privacy, /terms, /support) without a 404"
    why_human: "Cloudflare Pages _redirects rules are only processed at the edge — cannot verify locally with npm run dev (dev server does not process _redirects). Requires deployment or Cloudflare wrangler to confirm"
  - test: "Review copy tone on feature pages — specifically Recovery Scoring and Workload Tracking"
    expected: "Copy is accessible-credible: explains science in plain language (e.g., 'rolling average weighted toward recent days' not 'EWMA'), no jargon walls, outcome-first structure"
    why_human: "Tone quality is a subjective editorial judgment that cannot be verified programmatically"
  - test: "Resize browser to mobile width on all 8 content pages"
    expected: "All pages are responsive — no horizontal scroll, readable typography, charts reflow correctly"
    why_human: "Responsive layout requires visual browser check at multiple widths"
---

# Phase 3: Content Pages Verification Report

**Phase Goal:** Athletes and coaches can read science-backed explanations of every Tuwa feature, and all legal/support pages are live and accessible
**Verified:** 2026-05-11T15:03:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | All 5 feature pages are live with accessible-credible copy and a contextual App Store CTA | VERIFIED | `src/pages/features/recovery-scoring.astro`, `workload-tracking.astro`, `smart-templates.astro`, `cold-start.astro`, `coaching.astro` all exist (105, 105, 102, 104, 194 lines respectively). FeatureCTA imported and rendered in FeaturePageLayout and CoachingPageLayout. Build produces 9 pages. |
| 2 | Each feature page has its own unique OG meta tags and app screenshot | VERIFIED | All 5 OG images present in `public/og/` (recovery-scoring.png, workload-tracking.png, smart-templates.png, cold-start.png, coaching.png). Each page passes unique `ogImage="/og/{slug}.png"` prop. Screenshots: recovery.png (462KB), workload.png (448KB), active-workout.png (225KB) — cold-start and coaching use intentional placeholder. |
| 3 | Privacy Policy, Terms of Service, and Support pages are live and match the migrated content from existing source files | VERIFIED | `privacy.astro` (81 lines, includes `<h2>What Data We Collect</h2>`, `lastUpdated="March 27, 2026"`, contact email). `terms.astro` (61 lines, all 12 numbered h2 sections confirmed via grep). `support.astro` (49 lines, FaqAccordion imported and used, `mailto:hanwenma09@gmail.com`). |
| 4 | Old GitHub Pages URLs redirect to correct new routes without 404 errors | VERIFIED (code) | `public/_redirects` exists with 3 Cloudflare Pages 301 rules: `/privacy.html → /privacy`, `/terms.html → /terms`, `/support.html → /support`. Note: edge behavior requires human verification at deployment — see Human Verification section. |
| 5 | All feature pages share the same reusable layout component | VERIFIED | 4 standard pages use `FeaturePageLayout`; `coaching.astro` uses `CoachingPageLayout` which mirrors FeaturePageLayout's structure (hero → screenshot → slot → CTA) and adds 3 named slots for coaching-specific sections. Both layouts wrap `BaseLayout`. |

**Score:** 5/5 truths verified (automated) — human verification pending for runtime behaviors

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/layouts/FeaturePageLayout.astro` | Reusable layout for 4 standard feature pages | VERIFIED | Imports BaseLayout, ScreenshotBlock, FeatureCTA. Props: title, description, ogImage, screenshot, screenshotAlt, outcomeStatement, hookLine. Renders hero h1, screenshot section, slot, CTA. |
| `src/components/ScreenshotBlock.astro` | Screenshot display with placeholder fallback | VERIFIED | Imports `Image` from `astro:assets`. Conditional render: `<Image>` when src provided, accessible `<div role="img">` placeholder when not. `isFramed` prop controls border-radius. |
| `src/components/FeatureCTA.astro` | Feature page CTA with IntersectionObserver | VERIFIED | Imports `APP_STORE_URL` from `../config`. Has `rel="noopener noreferrer"` on App Store link. IntersectionObserver IIFE present as `<script is:inline>`. No QR code. |
| `src/styles/global.css` | Typography plugin activation | VERIFIED | Line 4: `@plugin "@tailwindcss/typography";` |
| `src/layouts/CoachingPageLayout.astro` | Extended layout for coaching page | VERIFIED | Imports BaseLayout, ScreenshotBlock, FeatureCTA. Named slots: `coach-athlete`, `team-features`, `invite-flow`. Alternating surface/bg backgrounds. |
| `src/layouts/LegalPageLayout.astro` | Prose layout for legal pages | VERIFIED | Imports BaseLayout. `prose prose-neutral max-w-none` class on slot container. `max-width: 680px`. `lastUpdated` optional prop. No `data-animate`. |
| `src/components/charts/RecoveryChart.astro` | Interactive recovery score bar chart | VERIFIED | `import Chart from 'chart.js/auto'` in bundled `<script>`. Canvas id `recovery-chart`. `type: 'bar'`. aria-label present. |
| `src/components/charts/AcwrChart.astro` | Interactive ACWR trend line chart | VERIFIED | `import Chart from 'chart.js/auto'` in bundled `<script>`. Canvas id `acwr-chart`. `type: 'line'`. Two datasets (acute/chronic). |
| `src/components/FaqAccordion.astro` | FAQ accordion with 8 items | VERIFIED | 8 FAQ items in `faqs` array. Native `<details>/<summary>`. `min-height: 44px` on summary. `list-style: none` in style block. Contact email `hanwenma09@gmail.com` in final FAQ. |
| `src/pages/features/recovery-scoring.astro` | Recovery Scoring feature page | VERIFIED | Imports FeaturePageLayout, RecoveryChart, recoveryScreenshot. `ogImage="/og/recovery-scoring.png"`. `outcomeStatement="Know exactly how hard to push today"`. 2 heading sections. |
| `src/pages/features/workload-tracking.astro` | Workload Tracking feature page | VERIFIED | Imports FeaturePageLayout, AcwrChart, workloadScreenshot. `ogImage="/og/workload-tracking.png"`. `outcomeStatement="Train hard without crossing the line"`. |
| `src/pages/features/smart-templates.astro` | Smart Templates feature page | VERIFIED | Imports FeaturePageLayout, activeWorkoutScreenshot. `ogImage="/og/smart-templates.png"`. No chart components. |
| `src/pages/features/cold-start.astro` | Cold-Start Onboarding feature page | VERIFIED | Imports FeaturePageLayout only (no screenshot import — triggers placeholder). `ogImage="/og/cold-start.png"`. |
| `src/pages/features/coaching.astro` | Coaching feature page | VERIFIED | Imports CoachingPageLayout. Uses all 3 named slots (coach-athlete, team-features, invite-flow). `ogImage="/og/coaching.png"`. 5 heading sections. |
| `src/pages/privacy.astro` | Privacy Policy page | VERIFIED | Imports LegalPageLayout. `lastUpdated="March 27, 2026"`. `<h2>What Data We Collect</h2>` present. External links with `rel="noopener noreferrer"`. Contact email present. |
| `src/pages/terms.astro` | Terms of Service page | VERIFIED | Imports LegalPageLayout. `lastUpdated="April 10, 2026"`. All 12 numbered `<h2>` sections confirmed (grep). |
| `src/pages/support.astro` | Support page with FAQ | VERIFIED | Imports LegalPageLayout and FaqAccordion. `FaqAccordion` used. `mailto:hanwenma09@gmail.com` present. `min-height: 44px` on CTA. |
| `public/_redirects` | Cloudflare Pages 301 redirect rules | VERIFIED | 3 lines: `/privacy.html /privacy 301`, `/terms.html /terms 301`, `/support.html /support 301`. |
| `public/og/recovery-scoring.png` | OG image for Recovery Scoring | VERIFIED | File exists |
| `public/og/workload-tracking.png` | OG image for Workload Tracking | VERIFIED | File exists |
| `public/og/smart-templates.png` | OG image for Smart Templates | VERIFIED | File exists |
| `public/og/cold-start.png` | OG image for Cold-Start | VERIFIED | File exists |
| `public/og/coaching.png` | OG image for Coaching | VERIFIED | File exists |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `FeaturePageLayout.astro` | `BaseLayout.astro` | import wrapping | WIRED | `import BaseLayout from './BaseLayout.astro'` |
| `FeatureCTA.astro` | `src/config.ts` | APP_STORE_URL import | WIRED | `import { APP_STORE_URL } from '../config'` |
| `ScreenshotBlock.astro` | `astro:assets` | Image component import | WIRED | `import { Image } from 'astro:assets'` |
| `CoachingPageLayout.astro` | `BaseLayout.astro` | import wrapping | WIRED | `import BaseLayout from './BaseLayout.astro'` |
| `LegalPageLayout.astro` | `BaseLayout.astro` | import wrapping | WIRED | `import BaseLayout from './BaseLayout.astro'` |
| `RecoveryChart.astro` | `chart.js/auto` | bundled script import | WIRED | `import Chart from 'chart.js/auto'` in `<script>` |
| `recovery-scoring.astro` | `FeaturePageLayout.astro` | layout import | WIRED | `import FeaturePageLayout from '../../layouts/FeaturePageLayout.astro'` |
| `recovery-scoring.astro` | `RecoveryChart.astro` | chart import | WIRED | `import RecoveryChart from '../../components/charts/RecoveryChart.astro'` |
| `workload-tracking.astro` | `AcwrChart.astro` | chart import | WIRED | `import AcwrChart from '../../components/charts/AcwrChart.astro'` |
| `FeatureGrid.astro` | `/features/recovery-scoring` | href link | WIRED | `href="/features/recovery-scoring"` confirmed in FeatureGrid.astro |
| `FeatureGrid.astro` | All 5 feature routes | href links | WIRED | All 5 hrefs confirmed: recovery-scoring, workload-tracking, smart-templates, cold-start, coaching |
| `coaching.astro` | `CoachingPageLayout.astro` | layout import | WIRED | `import CoachingPageLayout from '../../layouts/CoachingPageLayout.astro'` |
| `privacy.astro` | `LegalPageLayout.astro` | layout import | WIRED | `import LegalPageLayout from '../layouts/LegalPageLayout.astro'` |
| `support.astro` | `FaqAccordion.astro` | component import | WIRED | `import FaqAccordion from '../components/FaqAccordion.astro'` |
| `public/_redirects` | `/privacy, /terms, /support` | 301 redirect rules | WIRED (code) | Pattern `/privacy.html.*301` present |

### Data-Flow Trace (Level 4)

Not applicable — all content pages are static marketing pages with no dynamic data sources. Chart components use hardcoded representative data intentionally (illustrative, not real user data). Legal pages contain hardcoded migrated content from source documents.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build produces 9 pages | `npm run build` | "9 page(s) built in 1.25s — Complete!" | PASS |
| chart.js in dependencies | `grep "chart.js" package.json` | `"chart.js": "^4.5.1"` | PASS |
| typography plugin active | `grep "@plugin" global.css` | `@plugin "@tailwindcss/typography";` | PASS |
| All 12 Terms h2 sections | `grep -c "<h2>" terms.astro` | 12 | PASS |
| _redirects has 3 rules | file inspection | `/privacy.html /privacy 301`, `/terms.html /terms 301`, `/support.html /support 301` | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|---------|
| FEAT-01 | 03-03 | Recovery Scoring page | SATISFIED | `src/pages/features/recovery-scoring.astro` with HRV/RHR/sleep/wellness copy and RecoveryChart |
| FEAT-02 | 03-03 | Workload Tracking page | SATISFIED | `src/pages/features/workload-tracking.astro` with ACWR/EWMA/spike detection copy and AcwrChart |
| FEAT-03 | 03-03 | Smart Templates page | SATISFIED | `src/pages/features/smart-templates.astro` with prescribed workout/template copy |
| FEAT-04 | 03-03 | Cold-Start Onboarding page | SATISFIED | `src/pages/features/cold-start.astro` with baseline/population copy |
| FEAT-05 | 03-04 | Coaching page | SATISFIED | `src/pages/features/coaching.astro` with coach-athlete sync, prescriptions, invite via code/email/NFC |
| FEAT-06 | 03-01 | Unique OG meta + screenshot per page | SATISFIED | 5 OG images in public/og/, each page passes unique ogImage prop and screenshot |
| FEAT-07 | 03-01, 03-02 | Consistent feature page layout component | SATISFIED | FeaturePageLayout used by 4 standard pages; CoachingPageLayout mirrors same structure for coaching page |
| FEAT-08 | 03-03, 03-04 | Accessible-credible copy tone | NEEDS HUMAN | Copy is substantive (100+ lines per page) and avoids acronym abuse (uses "rolling average weighted toward recent days"). Full tone review requires human judgment. |
| LEGAL-01 | 03-02, 03-04 | Privacy Policy page | SATISFIED | `privacy.astro` with full PRIVACY.md content, March 27 2026 date, LegalPageLayout prose container |
| LEGAL-02 | 03-02, 03-04 | Terms of Service page | SATISFIED | `terms.astro` with all 12 sections, April 10 2026 date |
| LEGAL-03 | 03-02, 03-04 | Support page with FAQ | SATISFIED | `support.astro` with FaqAccordion (8 items) and Contact Support CTA |
| LEGAL-04 | 03-04 | URL redirects from old GitHub Pages URLs | SATISFIED (code) | `public/_redirects` with 3 rules; edge behavior requires deployment verification |

### Anti-Patterns Found

No blockers or warnings found.

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| coaching.astro | 72 | "target placeholders" | Info | Content copy describing app feature — NOT a code stub. Legitimate copy. |
| cold-start.astro | 31 | "placeholder scores" | Info | Content copy about competitor behavior — NOT a code stub. Legitimate copy. |

No implementation stubs, empty returns, hardcoded empty arrays, or missing implementations found in any created files.

### Human Verification Required

#### 1. Feature Pages Visual + Interactive Check

**Test:** Run `npm run dev`, open http://localhost:4321. Click each of the 5 feature cards on the landing page.
**Expected:** Each card opens the correct /features/* route. Recovery Scoring and Workload Tracking show rendered Chart.js charts (bar chart with 4 bars for HRV/RHR/Sleep/Wellness; line chart with 2 lines for acute/chronic load). Smart Templates shows the active-workout framed screenshot. Cold-Start shows a placeholder block. Coaching page shows alternating sections: overview, coach/athlete perspectives, team workflows, invite flow card.
**Why human:** Chart.js canvas rendering requires a browser runtime. Image loading, layout correctness, and section structure require visual inspection.

#### 2. Legal Pages Prose Formatting

**Test:** Navigate to /privacy, /terms, /support in the dev server.
**Expected:** Privacy Policy has correct heading hierarchy and readable prose. Terms shows all 12 numbered sections with proper formatting. Support FAQ accordion opens/closes each item on click. "Contact Support" button is visible and styled with accent color.
**Why human:** @tailwindcss/typography prose styling requires browser render to assess. FAQ accordion open/close is an interactive runtime behavior.

#### 3. Redirect Rules Confirmation (Deployment)

**Test:** After deployment to Cloudflare Pages, visit https://tuwa.app/privacy.html, https://tuwa.app/terms.html, https://tuwa.app/support.html.
**Expected:** Each URL redirects (301) to the clean route without a 404.
**Why human:** Cloudflare Pages _redirects rules are processed at the edge and cannot be verified in local dev mode (`npm run dev` does not process the _redirects file).

#### 4. Copy Tone Review

**Test:** Read the body copy on Recovery Scoring and Workload Tracking pages.
**Expected:** Science is explained in plain language accessible to a non-scientist serious athlete. Technical terms (ACWR, HRV, EWMA) are explained in context without jargon walls. Outcome-first structure: what the feature does for you before how it works.
**Why human:** Tone quality is a subjective editorial judgment — pattern matching cannot verify "accessible-credible" writing quality.

#### 5. Mobile Responsiveness

**Test:** Open each of the 8 content pages with browser dev tools at 390px width (iPhone 15 Pro).
**Expected:** No horizontal scroll, readable typography at mobile sizes, charts reflow within viewport, screenshot blocks scale correctly, touch targets (44px min) on CTAs.
**Why human:** Responsive layout requires visual browser check at multiple widths.

### Gaps Summary

No gaps found. All 5 roadmap success criteria are verified at the code level. All 12 requirement IDs (FEAT-01 through FEAT-08, LEGAL-01 through LEGAL-04) are satisfied with substantive implementations.

The phase is blocked at `human_needed` (not `passed`) because:
1. Plan 04 explicitly included a `checkpoint:human-verify` task (Task 3) for visual review of all 8 pages — this task is marked pending in the SUMMARY.
2. Chart.js rendering, FAQ accordion interactivity, prose formatting, and redirect behavior require browser/deployment verification that automated static analysis cannot provide.

---

_Verified: 2026-05-11T15:03:00Z_
_Verifier: Claude (gsd-verifier)_
