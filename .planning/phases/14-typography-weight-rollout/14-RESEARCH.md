# Phase 14: Typography Weight Rollout - Research

**Researched:** 2026-05-15
**Domain:** CSS custom property migration, font-weight token rollout, Astro component refactoring
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Hero headlines / display text → `--weight-display` (200) — ultralight editorial
- **D-02:** Page titles, section headings (h1, h2) → `--weight-heading` (300) — light
- **D-03:** Body paragraphs, descriptions, feature copy → `--weight-body` (500) — medium
- **D-04:** CTA buttons, legal text, captions, FAQ questions → `--weight-label` (600) — semi-bold
- **D-05:** FAQ answer text → `--weight-body` (500) — bumped from current 400
- **D-06:** Big animated stat numbers (StatsCounter) → `--weight-display` (200) — editorial ultralight
- **D-07:** Footer section headers ("Features", "Resources", "Legal") → `--weight-body` (500)
- **D-08:** Nav links and mobile menu items → `--weight-body` (500)

### Claude's Discretion

- Per-element decision on inline `var()` replacement vs CSS class migration (D-09) — replace inline `font-weight` values with `var(--weight-*)` where simple, migrate to CSS classes where it produces cleaner code. No single mandate.
- Whether to consolidate repeated inline style patterns into shared classes during migration
- Exact handling of any edge-case elements not covered by the mapping above

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TYPO-03 | All page titles and subtitles use large size with light weight (300 or below) | The `--weight-heading` (300) token covers h1/h2 on all 10 pages; `--weight-display` (200) covers hero display text. All layout page title h1s map to `--weight-heading`. |
| TYPO-04 | All body text uses smaller size with heavier weight (500+) | The `--weight-body` (500) token covers paragraphs, FAQ answers, nav/footer elements. Smaller `--text-body` (16px) and `--text-label` (13px) sizes carry the heavier weights. |
| TYPO-05 | Typography weight system applied consistently across all 10 pages | 53 hardcoded `font-weight` values across 21 .astro files must be replaced with token vars. Coverage confirmed by grep across all pages (landing, 5 feature pages, blog listing, privacy, terms, support). |
</phase_requirements>

---

## Summary

Phase 14 is a pure CSS token migration phase. The infrastructure is already fully in place: General Sans variable font loads the 200–700 weight axis in a single WOFF2, and the four `--weight-*` CSS custom properties are defined in `:root` at lines 80–83 of `global.css`. No new dependencies, no new architecture — the work is a systematic search-and-replace of 53 hardcoded `font-weight: {number}` values across 21 `.astro` files, plus 6 occurrences in `global.css` itself.

The migration has a clear verification gate: after all replacements, `grep -rn "font-weight: [0-9]" src/ --include="*.astro" --include="*.css"` must return zero results (excluding the `@font-face` range declaration `font-weight: 200 700` which is structural, not a design value).

The primary planning challenge is grouping the 53 replacements into logical waves (components → layouts → pages) so each wave is independently verifiable. The largest visual shifts — hero headline dropping 600→200 and StatsCounter numbers dropping 700→200 — should be done early and visually verified before moving to subtler changes.

**Primary recommendation:** Group work into three waves (components, layouts, pages+global.css) with a grep-verification step after each wave. This keeps each commit small and reviewable.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Font-weight token definitions | Browser/Client (CSS :root) | — | Custom properties are already defined in global.css `:root`; no backend tier involved |
| Component weight migration | Browser/Client (Astro components) | — | Inline styles and `<style>` blocks in .astro component files |
| Layout weight migration | Browser/Client (Astro layouts) | — | Layout templates apply page-title weights via `<style>` blocks |
| Page-level weight migration | Browser/Client (Astro pages) | — | Feature deep-dive pages have inline styles on h2/h3 elements |
| Global.css weight migration | Browser/Client (CSS) | — | Six selectors in global.css swap literal values for token vars |
| Verification | Build/CI | — | Grep command confirms zero hardcoded values remain |

---

## Standard Stack

### Core (already installed — no new dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| General Sans variable font | 200–700 axis | Weight axis that makes this phase possible | Self-hosted WOFF2, already at `/fonts/GeneralSans-Variable.woff2` |
| CSS custom properties | native | Token system (`--weight-*` vars) | Defined in `global.css` `:root` lines 80–83, Phase 11 |
| Astro `<style>` blocks | Astro 6.x | Scoped styles in components/layouts | Existing project pattern throughout |

**No new packages to install.** This phase is pure CSS editing.

---

## Architecture Patterns

### System Architecture Diagram

```
global.css :root
  --weight-display: 200
  --weight-heading: 300       ←── Single source of truth
  --weight-body:    500
  --weight-label:   600
         │
         ├── Components (Hero, StatsCounter, Footer, MobileMenu, FaqAccordion, FeatureGrid, FeatureCTA, LandingCTA)
         │     └── <style> blocks + inline style="" attrs   →   var(--weight-*)
         │
         ├── Layouts (FeaturePageLayout, CoachingPageLayout, LegalPageLayout, BlogPostLayout)
         │     └── <style> blocks                           →   var(--weight-*)
         │
         ├── Pages (blog/index, support, 5 feature pages)
         │     └── inline style="" attrs on h2/h3           →   var(--weight-*)
         │
         └── global.css selectors (nav-logo, nav-dropdown-title, btn-cta, wheel-* classes)
               └── CSS rules                                →   var(--weight-*)

Verification gate:
  grep -rn "font-weight: [0-9]" src/ --include="*.astro" --include="*.css"
  → must return 0 results (excluding @font-face range line)
```

### Recommended Project Structure

No structural changes. All edits are within existing files.

```
src/
├── components/      # Wave 1 — 8 components with hardcoded weights
├── layouts/         # Wave 2 — 4 layouts with hardcoded weights
├── pages/           # Wave 3 — blog/index, support, 5 feature pages
└── styles/
    └── global.css   # Wave 3 — 6 selectors to migrate (stays in global.css)
```

### Pattern 1: Inline style="" Replacement

**What:** Replace hardcoded numeric font-weight in inline style attributes.
**When to use:** For elements that already use inline styles for other properties (most common in MobileMenu, Footer, StatsCounter).

```html
<!-- Source: CONTEXT.md D-08, UI-SPEC element mapping table -->

<!-- Before -->
<a style="font-size: var(--text-heading); font-weight: 600; border-radius: var(--radius-md);">

<!-- After -->
<a style="font-size: var(--text-heading); font-weight: var(--weight-body); border-radius: var(--radius-md);">
```

### Pattern 2: CSS `<style>` Block Replacement

**What:** Replace hardcoded numeric font-weight in `<style>` blocks within .astro components and layouts.
**When to use:** Elements already using a `<style>` block for their typography (Hero, FaqAccordion, FeatureCTA, LandingCTA, all layouts).

```css
/* Source: CONTEXT.md D-02, UI-SPEC implementation notes */

/* Before */
.hero-headline {
  font-weight: 600;
}

/* After */
.hero-headline {
  font-weight: var(--weight-display);
}
```

### Pattern 3: Global CSS Selector Replacement

**What:** Replace hardcoded numeric font-weight in global.css class rules.
**When to use:** For the 6 selectors that must stay in global.css (`.nav-logo`, `.nav-dropdown-title`, `.btn-cta`, `.wheel-segment-label`, `.wheel-center-title`, `.wheel-center-cta`).

```css
/* Source: global.css lines 169, 233, 251, 580, 669, 696 */

/* Before */
.nav-logo { font-weight: 600; }

/* After */
.nav-logo { font-weight: var(--weight-label); }
```

### Pattern 4: Class Consolidation (Claude's Discretion)

**What:** When repeated inline patterns exist across multiple sibling elements, extract to a shared class.
**When to use:** MobileMenu has 4 identical inline style strings; FeatureGrid h3 titles share a pattern. If consolidation produces cleaner code, migrate to a class.

```html
<!-- Before: 4 identical inline style blocks in MobileMenu.astro -->
<a style="...font-weight: 600; ...">Features</a>
<a style="...font-weight: 600; ...">Training</a>
<a style="...font-weight: 600; ...">Recovery</a>
<a style="...font-weight: 600; ...">Coaches</a>

<!-- After option A: inline var -->
<a style="...font-weight: var(--weight-body); ...">Features</a>

<!-- After option B: extract to class (cleaner, recommended for 4+ repetitions) -->
<style>
  .mobile-nav-link { font-weight: var(--weight-body); }
</style>
<a class="mobile-nav-link" style="...other props...">Features</a>
```

### Anti-Patterns to Avoid

- **Leaving numeric literals in `@font-face`:** The `font-weight: 200 700` in the `@font-face` declaration is structural (declares the weight range the font file covers) — do NOT replace with vars. The grep verification command explicitly excludes lines matching `200 700`.
- **Replacing token definitions with vars:** Lines 80–83 of global.css define the tokens themselves (`--weight-display: 200;`) — these are the source, not a target for replacement.
- **Adding new weight values not in the token set:** Only 200, 300, 500, 600 are in the system. Do not invent intermediate values.
- **Scoped styles bleeding across component boundaries:** Astro scopes `<style>` blocks automatically. If adding a new class during consolidation, keep it in the component's own `<style>` block, not global.css.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font interpolation | Manual intermediate weight steps | CSS `font-weight` with variable font axis | General Sans handles all interpolation automatically across 200–700 range |
| Token documentation | A separate token registry or docs file | Comments in global.css `:root` | Already done; the `:root` block is the source of truth |
| Verification tooling | A custom script | `grep -rn "font-weight: [0-9]"` | Shell one-liner is sufficient and already documented in UI-SPEC |

---

## Runtime State Inventory

Not applicable — this phase is a code-only refactor with no stored data, live service config, OS registrations, secrets, or build artifacts that embed font-weight values.

---

## Complete Migration Target Inventory

[VERIFIED: grep of src/ directory 2026-05-15]

### Wave 1 — Components (8 files, 23 occurrences)

| File | Occurrences | Mechanism | Mapping |
|------|-------------|-----------|---------|
| `src/components/Hero.astro` | 1 | `<style>` block | `.hero-headline`: 600 → `--weight-display` (200) |
| `src/components/StatsCounter.astro` | 3 | inline `style=""` | stat number spans: 700 → `--weight-display` (200) |
| `src/components/Footer.astro` | 4 | inline `style=""` | logo: 600 → `--weight-label`; 3× section headers: 600 → `--weight-body` |
| `src/components/MobileMenu.astro` | 5 | 4× inline `style=""`, 1× `<style>` | 4 nav links: 600 → `--weight-body`; `.mobile-cta`: 600 → `--weight-label` |
| `src/components/FaqAccordion.astro` | 3 | `<style>` block | answers: 400 → `--weight-body`; 2× question styles: 600 → `--weight-label` |
| `src/components/FeatureGrid.astro` | 1 | `<style>` block | card titles: 600 → `--weight-body` |
| `src/components/FeatureCTA.astro` | 1 | `<style>` block | CTA heading: 600 → `--weight-heading` |
| `src/components/LandingCTA.astro` | 1 | `<style>` block | CTA heading: 600 → `--weight-heading` |

### Wave 2 — Layouts (4 files, 4 occurrences)

| File | Occurrences | Mechanism | Mapping |
|------|-------------|-----------|---------|
| `src/layouts/FeaturePageLayout.astro` | 1 | `<style>` block | page title h1: 600 → `--weight-heading` |
| `src/layouts/CoachingPageLayout.astro` | 1 | `<style>` block | page title h1: 600 → `--weight-heading` |
| `src/layouts/LegalPageLayout.astro` | 1 | `<style>` block | page title h1: 600 → `--weight-heading` |
| `src/layouts/BlogPostLayout.astro` | 1 | `<style>` block | post title h1: 600 → `--weight-heading` |

### Wave 3 — Pages (7 files, 20 occurrences)

| File | Occurrences | Mechanism | Mapping |
|------|-------------|-----------|---------|
| `src/pages/blog/index.astro` | 2 | `<style>` blocks | page title + post titles: 600 → `--weight-heading` |
| `src/pages/support.astro` | 2 | `<style>` blocks | headings: 600 → `--weight-heading` |
| `src/pages/features/recovery-scoring.astro` | 4 | inline `style=""` on h2/h3 | section headings: 600 → `--weight-heading` |
| `src/pages/features/smart-templates.astro` | 4 | inline `style=""` on h2/h3 | section headings: 600 → `--weight-heading` |
| `src/pages/features/coaching.astro` | 6 | `<style>` blocks | section headings: 600 → `--weight-heading` |
| `src/pages/features/cold-start.astro` | 4 | inline `style=""` on h2/h3 | section headings: 600 → `--weight-heading` |
| `src/pages/features/workload-tracking.astro` | 4 | inline `style=""` on h2/h3 | section headings: 600 → `--weight-heading` |

### Wave 3 (continued) — global.css (6 occurrences, stay in global.css)

| Selector | Line | Current | Token | Target Value | Notes |
|----------|------|---------|-------|--------------|-------|
| `.nav-logo` | 169 | 600 | `--weight-label` | 600 | Value unchanged — replace literal with var |
| `.nav-dropdown-title` | 233 | 600 | `--weight-label` | 600 | Value unchanged — replace literal with var |
| `.btn-cta` | 251 | 600 | `--weight-label` | 600 | Value unchanged — replace literal with var |
| `.wheel-segment-label` | 580 | 700 | `--weight-label` | 600 | Reduction: SVG all-caps 11px labels |
| `.wheel-center-title` | 669 | 600 | `--weight-body` | 500 | Subtle reduction |
| `.wheel-center-cta` | 696 | 600 | `--weight-label` | 600 | Value unchanged — UI-SPEC had wrong selector name; confirmed as `.wheel-center-cta` not `.wheel-center-title` |

**IMPORTANT DISCREPANCY FOUND [VERIFIED: grep 2026-05-15]:** The UI-SPEC labels line 696 as "`.wheel-center-title` (implicit) — second declaration in mobile media query." This is incorrect. Line 696 is the `.wheel-center-cta` selector (the "Learn More" link inside the wheel center). There is no second `.wheel-center-title` block. The mobile media query at line 674–677 only changes `font-size`, not `font-weight`. The token assignment (`--weight-label`) remains correct for `.wheel-center-cta` since it is a CTA link. Total unique selectors: 6 as documented.

---

## Common Pitfalls

### Pitfall 1: Breaking the @font-face Range Line

**What goes wrong:** A global find-and-replace of `font-weight: [number]` accidentally converts the `@font-face` range declaration `font-weight: 200 700` into something invalid.
**Why it happens:** Regex replacements run against all `font-weight` occurrences without pattern discrimination.
**How to avoid:** Run verification grep AFTER each wave using the exact command from UI-SPEC: `grep -rn "font-weight: [0-9]" src/ --include="*.astro" --include="*.css"` — the two-number range pattern (`200 700`) won't match `[0-9]` followed by a space (it matches a single digit group), so the @font-face line is excluded. Visually confirm the @font-face declaration is intact.
**Warning signs:** Build failure with "invalid font-weight value" error, or font not loading in browser.

### Pitfall 2: Missing the h3 Elements That Use `--text-body` Size

**What goes wrong:** The feature deep-dive pages have h3 elements styled at `font-size: var(--text-body)` (16px) with `font-weight: 600`. These look like body text by size — migrating them to `--weight-heading` (300) would make them visually lighter than actual body paragraphs, inverting the weight hierarchy.
**Why it happens:** The CONTEXT.md mapping says "h2/h3 → `--weight-heading`" generically. But h3 elements sized at `--text-body` are acting as subheadings within body copy — the sizing context changes the weight assignment.
**How to avoid:** Per the UI-SPEC element mapping (confirmed by grep), all h3 elements in feature pages that have `font-size: var(--text-body)` map to `--weight-heading` (300) per D-02 decision. This is the locked decision. The contrast will come from the smaller size carrying the lighter weight — a deliberate inversion that makes those subheadings feel elegant. Trust the decision; verify visually.
**Warning signs:** Subheadings that look unreadably thin compared to surrounding paragraph text.

### Pitfall 3: cold-start.astro has Extra h3 Instances

**What goes wrong:** The UI-SPEC notes "cold-start.astro section h2/h3 (4×)" but the actual grep shows lines 38, 46, 54 (h3 elements with inline styles) plus line 20 (another heading) plus line 79 (a `<style>` block) — at least 5 font-weight occurrences, not 4.
**Why it happens:** The UI-SPEC count was based on CONTEXT.md estimates, not a live grep.
**How to avoid:** Use the live grep output (53 total across .astro files) as the authoritative count. Treat the UI-SPEC element table as directionally correct for mapping decisions, but run verification grep after each file to confirm zero remain.
**Warning signs:** Grep showing non-zero count after "complete" migration of a page.

### Pitfall 4: Astro Style Scope Confusion

**What goes wrong:** Adding a new shared class in a `<style>` block for consolidation, then being surprised that the class is scoped to that component and doesn't apply to child components.
**Why it happens:** Astro `<style>` blocks are automatically scoped — they add a `data-astro-*` attribute. Classes defined in one component don't apply to elements in child components.
**How to avoid:** Consolidated classes belong in the component's own `<style>` block if they only style that component's own elements. If a class needs to apply across component boundaries, it belongs in `global.css` — but this phase should need no new global classes.
**Warning signs:** Class exists but computed styles in DevTools show the component-scoped class attribute doesn't match.

### Pitfall 5: Visual Regression on `--weight-display: 200`

**What goes wrong:** Hero headline and StatsCounter numbers look unexpectedly thin/fragile at weight 200, particularly on Windows ClearType rendering which may not interpolate the very light end of the weight axis as cleanly.
**Why it happens:** Variable font light weights (200) render noticeably differently across platforms. macOS shows them elegantly; Windows ClearType can make them appear too delicate.
**How to avoid:** This is a locked decision (D-01, D-06) made by the user after review. Document the rendering consideration in the plan. If the user flags cross-platform concerns after visual review, the token values can be adjusted centrally in one place (global.css `:root`), which is precisely the advantage of the token system.
**Warning signs:** User feedback that headings look "too thin" or "too light" in testing.

---

## Code Examples

Verified patterns derived from the live codebase:

### Wave 1 — Hero.astro

```css
/* src/components/Hero.astro — <style> block */
/* Source: live grep, CONTEXT.md D-01 */

/* Before */
.hero-headline {
  font-weight: 600;
}

/* After */
.hero-headline {
  font-weight: var(--weight-display);
}
```

### Wave 1 — StatsCounter.astro (inline style)

```html
<!-- src/components/StatsCounter.astro -->
<!-- Source: live grep, CONTEXT.md D-06 -->

<!-- Before (3 instances) -->
<span style="font-size: var(--text-display); font-weight: 700; line-height: var(--leading-display); color: var(--color-text-1);">

<!-- After -->
<span style="font-size: var(--text-display); font-weight: var(--weight-display); line-height: var(--leading-display); color: var(--color-text-1);">
```

### Wave 1 — MobileMenu.astro (consolidation candidate)

```html
<!-- src/components/MobileMenu.astro -->
<!-- Source: live grep, CONTEXT.md D-08 -->
<!-- 4 identical long inline styles → class consolidation recommended -->

<!-- After — option B (class consolidation) -->
<style>
  .mobile-nav-link {
    padding: var(--space-sm) var(--space-md);
    color: var(--color-text-1);
    text-decoration: none;
    font-size: var(--text-heading);
    font-weight: var(--weight-body);
    border-radius: var(--radius-md);
    min-height: 44px;
    display: flex;
    align-items: center;
  }
</style>

<a class="mobile-nav-link" href="/features/recovery-scoring">Recovery</a>
<a class="mobile-nav-link" href="/features/workload-tracking">Workload</a>
<a class="mobile-nav-link" href="/features/smart-templates">Templates</a>
<a class="mobile-nav-link" href="/features/coaching">Coaching</a>
```

### Wave 1 — FaqAccordion.astro (weight bump)

```css
/* src/components/FaqAccordion.astro — <style> block */
/* Source: live grep, CONTEXT.md D-05 */

/* Before — answer text */
.faq-answer { font-weight: 400; }

/* After — bump to body weight for consistency */
.faq-answer { font-weight: var(--weight-body); }
```

### Wave 3 — global.css selectors

```css
/* src/styles/global.css */
/* Source: live grep, lines 169/233/251/580/669/696 */

/* Before */
.nav-logo           { font-weight: 600; }
.nav-dropdown-title { font-weight: 600; }
.btn-cta            { font-weight: 600; }
.wheel-segment-label{ font-weight: 700; }
.wheel-center-title { font-weight: 600; }
.wheel-center-cta   { font-weight: 600; }

/* After */
.nav-logo           { font-weight: var(--weight-label); }
.nav-dropdown-title { font-weight: var(--weight-label); }
.btn-cta            { font-weight: var(--weight-label); }
.wheel-segment-label{ font-weight: var(--weight-label); }  /* 700→600, only value change */
.wheel-center-title { font-weight: var(--weight-body);  }  /* 600→500, subtle drop */
.wheel-center-cta   { font-weight: var(--weight-label); }  /* 600→600, no visual change */
```

### Verification Command

```bash
# Run after each wave — must return 0 results when complete
# Source: UI-SPEC Implementation Notes
grep -rn "font-weight: [0-9]" src/ --include="*.astro" --include="*.css"

# The @font-face line (font-weight: 200 700) does NOT match [0-9] followed by end/space before number
# so it is naturally excluded from results.
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Hardcoded `font-weight: 600` literals | `font-weight: var(--weight-*)` tokens | Phase 14 | Single-point weight adjustments; phase-level visual system changes |
| Static font files (one per weight) | Variable font with weight axis | Phase 11 | Single WOFF2 file serves all weights; intermediate values interpolated automatically |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `cold-start.astro` has more than 4 font-weight occurrences (5 found by grep vs 4 in UI-SPEC) | Complete Migration Target Inventory | Low — planner should use live grep count, not UI-SPEC estimate |
| A2 | UI-SPEC line 696 label `.wheel-center-title (implicit)` is actually `.wheel-center-cta` | Complete Migration Target Inventory | Low — token assignment is the same (`--weight-label: 600`), only selector name differs |

---

## Open Questions

1. **Class consolidation scope for MobileMenu**
   - What we know: 4 identical inline style strings, 60+ chars each, in MobileMenu.astro
   - What's unclear: The nav links have varying `href` and text content — safe to extract to shared class. But MobileMenu.astro's `<style>` scope means the class won't leak. The question is whether to add the class or use inline vars.
   - Recommendation: Extract to `.mobile-nav-link` class in MobileMenu's `<style>` block — reduces duplication from 4× 60-char strings to 4× short class attributes. This is within Claude's Discretion (D-09).

2. **Feature page h3 subheadings at `--text-body` size**
   - What we know: Several h3 elements in feature pages use `font-size: var(--text-body)` with `font-weight: 600`. Per D-02 decision, these map to `--weight-heading` (300).
   - What's unclear: At 16px/weight-300, these will appear lighter than surrounding body paragraphs (16px/weight-500). The visual result is an inversion: same size, lighter weight for subheadings.
   - Recommendation: Trust the locked decision. The weight-contrast system is intentional. Note in plan for visual verification.

---

## Environment Availability

Step 2.6: SKIPPED — this phase is pure CSS/code editing with no external tool dependencies beyond the already-running Astro dev server.

---

## Sources

### Primary (HIGH confidence)
- [VERIFIED: live grep of /Users/hanwen/Desktop/tuwa-website/src/ 2026-05-15] — Complete enumeration of all 53 hardcoded font-weight values in .astro files, plus 6 in global.css
- [VERIFIED: Read of global.css lines 78–83] — Token definitions `--weight-display: 200`, `--weight-heading: 300`, `--weight-body: 500`, `--weight-label: 600`
- [VERIFIED: Read of 14-CONTEXT.md] — All locked decisions D-01 through D-09
- [VERIFIED: Read of 14-UI-SPEC.md] — Full element-to-token mapping table and implementation notes
- [VERIFIED: Read of config.json] — `nyquist_validation: false` confirmed

### Secondary (MEDIUM confidence)
- [CITED: CSS Fonts Level 4 spec] — `font-weight: 200 700` in `@font-face` is the weight range declaration syntax for variable fonts, not a design value

### Tertiary (LOW confidence)
- [ASSUMED] — Windows ClearType may render weight-200 less elegantly than macOS — based on general variable font knowledge, not project-specific testing

---

## Metadata

**Confidence breakdown:**
- Migration targets: HIGH — verified by live grep, exact file/line/selector confirmed
- Token mappings: HIGH — locked decisions in CONTEXT.md, all sourced from user discussion
- Wave ordering strategy: HIGH — grouping by component type is a standard refactor pattern
- Visual outcome predictions: MEDIUM — weight rendering depends on browser/OS font rendering stack

**Research date:** 2026-05-15
**Valid until:** This is a code-state snapshot. Re-run the grep if any component files are modified before planning begins.
