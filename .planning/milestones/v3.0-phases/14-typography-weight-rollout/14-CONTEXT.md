# Phase 14: Typography Weight Rollout - Context

**Gathered:** 2026-05-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Apply the weight contrast system across all 10 pages — large light headings (weight 300) and smaller heavier body text (weight 500+). Replace all hardcoded `font-weight` values outside `global.css` with `var(--weight-*)` token references. No hardcoded font-weight values should remain outside global.css after this phase.

</domain>

<decisions>
## Implementation Decisions

### Element-to-Token Mapping
- **D-01:** Hero headlines / display text → `--weight-display` (200) — ultralight editorial
- **D-02:** Page titles, section headings (h1, h2) → `--weight-heading` (300) — light
- **D-03:** Body paragraphs, descriptions, feature copy → `--weight-body` (500) — medium
- **D-04:** CTA buttons, legal text, captions, FAQ questions → `--weight-label` (600) — semi-bold
- **D-05:** FAQ answer text → `--weight-body` (500) — bumped from current 400 to match body token

### StatsCounter Treatment
- **D-06:** Big animated stat numbers → `--weight-display` (200) — editorial ultralight, matching hero headline treatment. Biggest visual shift on the page.

### Nav/Footer Treatment
- **D-07:** Footer section headers ("Features", "Resources", "Legal") → `--weight-body` (500) — not labels, not headings, middle ground
- **D-08:** Nav links and mobile menu items → `--weight-body` (500) — same treatment as footer headers

### Inline Style Strategy
- **D-09:** Claude's discretion per-element — replace inline `font-weight` values with `var(--weight-*)` where simple, migrate to CSS classes where it produces cleaner code. No single mandate.

### Claude's Discretion
- Per-element decision on inline var replacement vs CSS class migration (D-09)
- Whether to consolidate repeated inline style patterns into shared classes during migration
- Exact handling of any edge-case elements not covered by the mapping above

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Typography Tokens (Phase 11 Foundation)
- `src/styles/global.css` lines 79-83 — `--weight-display`, `--weight-heading`, `--weight-body`, `--weight-label` token definitions
- `.planning/phases/11-css-foundation-token-system/11-CONTEXT.md` — Phase 11 decisions D-01 through D-05 (token values) and D-12/D-13 (deferred rollout to Phase 14)

### Files With Hardcoded font-weight (Migration Targets)
- `src/components/Hero.astro` — hero headline weight
- `src/components/Footer.astro` — footer logo, section headers, link groups
- `src/components/MobileMenu.astro` — mobile nav links (4 instances)
- `src/components/StatsCounter.astro` — big animated numbers (3 instances, currently 700)
- `src/components/FaqAccordion.astro` — question labels (600) and answer text (400)
- `src/components/FeatureGrid.astro` — feature card titles
- `src/components/FeatureCTA.astro` — CTA heading
- `src/components/LandingCTA.astro` — CTA heading
- `src/layouts/FeaturePageLayout.astro` — page title
- `src/layouts/CoachingPageLayout.astro` — page title
- `src/layouts/LegalPageLayout.astro` — page title
- `src/layouts/BlogPostLayout.astro` — post title
- `src/pages/index.astro` — landing page (via components)
- `src/pages/blog/index.astro` — blog listing headings
- `src/pages/support.astro` — support page headings
- `src/pages/features/recovery-scoring.astro` — section headings
- `src/pages/features/workload-tracking.astro` — section headings
- `src/pages/features/smart-templates.astro` — section headings
- `src/pages/features/cold-start.astro` — section headings
- `src/pages/features/coaching.astro` — section headings (6 instances)
- `src/styles/global.css` lines 169, 233, 251, 580, 669, 696 — global styles (these stay in global.css but should use tokens for consistency)

### Requirements
- `.planning/REQUIREMENTS.md` — TYPO-03, TYPO-04, TYPO-05

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `--weight-*` CSS custom properties already defined in `:root` (Phase 11) — ready to use
- General Sans variable font already loaded with weight range 200-700 (single WOFF2)

### Established Patterns
- CSS custom properties in `:root` for all design tokens
- Mix of inline `style=""` attributes and `<style>` blocks for font-weight declarations
- Feature deep-dive pages share similar heading patterns (h2/h3 with inline styles)

### Integration Points
- All 10 pages affected: landing, 5 feature pages, blog listing, privacy, terms, support
- Components affected: Hero, Footer, MobileMenu, StatsCounter, FaqAccordion, FeatureGrid, FeatureCTA, LandingCTA
- Layouts affected: FeaturePageLayout, CoachingPageLayout, LegalPageLayout, BlogPostLayout
- `global.css` hardcoded weights should also migrate to tokens (allowed to remain in global.css per success criteria, but should use token vars)

</code_context>

<specifics>
## Specific Ideas

- The biggest visual shifts will be: headings dropping from 600→300 (light) and StatsCounter numbers dropping from 700→200 (ultralight editorial)
- Footer/nav going from 600→500 is subtle but creates better hierarchy separation from true labels (buttons, captions)
- FAQ answers bumping from 400→500 brings them into the body weight system for consistency

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 14-typography-weight-rollout*
*Context gathered: 2026-05-15*
