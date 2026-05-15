# Phase 11: CSS Foundation & Token System — Research

**Researched:** 2026-05-15
**Domain:** CSS design tokens, variable font loading, native CSS view transitions, CSS class scaffolding
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** `--weight-display: 200` — ultralight for hero headlines (48px+)
- **D-02:** `--weight-heading: 300` — light for section titles and page titles
- **D-03:** `--weight-body: 500` — medium for paragraphs, nav links, descriptions
- **D-04:** `--weight-label: 600` — semi-bold for micro text, legal, all-caps captions
- **D-05:** Weight gradient is 200 → 300 → 500 → 600 (display → heading → body → label)
- **D-06:** Use native CSS `@view-transition { navigation: auto }` — NOT `<ClientRouter>` or `<ViewTransitions />` component (would break IO scroll-reveal)
- **D-07:** Crossfade duration: 200ms — quick, snappy, responsive feel
- **D-08:** Global crossfade only — no per-element named transitions in this phase
- **D-09:** Minimal scaffolding: `.matisse-frieze` and `.matisse-shape` CSS classes with basic positioning
- **D-10:** `prefers-reduced-motion` guard on Matisse classes (consistent with existing pattern)
- **D-11:** Color approach: accent green (`--color-accent` #2B5240) first, charcoal as backup
- **D-12:** Define `--weight-*` tokens in `:root` only — do NOT swap existing hardcoded `font-weight: 600/700` values yet
- **D-13:** Phase 14 handles search-and-replace of hardcoded weights → tokens

### Claude's Discretion

- View-transition easing function (ease, ease-out, etc.) — pick what feels best with 200ms duration
- Matisse class property stubs (which CSS properties to pre-declare vs leave for Phase 15)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| TYPO-01 | Site loads General Sans variable font with weight range 200–700 (single file) | Astro Font API `weights: ["200 700"]` range syntax — confirmed in official docs |
| TYPO-02 | CSS `--weight-*` design tokens defined (display, heading, body, label) in global.css | Standard CSS custom property pattern in `:root` — zero new dependencies |
| IXPN-01 | CSS `@view-transition` page crossfades between all pages | `@view-transition { navigation: auto }` + custom `::view-transition-*` pseudo-elements — confirmed Chrome 126+ / Safari 18.2+ |
| IXPN-02 | Existing scroll-reveal animations compatible with View Transitions (IO not broken) | Native CSS approach does NOT use `<ClientRouter>` so IO is never disrupted — confirmed by prior research (Astro issue #9650 / W3C CSSWG #8269 concern only applies to `<ClientRouter>`) |

</phase_requirements>

---

## Summary

Phase 11 is a pure CSS + minimal config phase. Every deliverable is additive — no existing code is changed, no existing visual output changes. The three workstreams are:

1. **Variable font config change** — `astro.config.mjs` `weights` array goes from `["400","600"]` to `["200 700"]`. This switches Fontshare from serving two static WOFF2 files to one variable WOFF2 covering the full 200–700 range. The Astro Font API uses a single string in an array to signal a weight range (not two separate numbers). This is confirmed by official Astro docs — the syntax is `weights: ["200 700"]`, not `weights: ["200", "700"]`.

2. **CSS token and transition additions in `global.css`** — Four `--weight-*` custom properties added to the existing `:root` block. A `@view-transition { navigation: auto }` rule, with `::view-transition-old(root)` and `::view-transition-new(root)` keyframe overrides for a 200ms crossfade. Two CSS class stubs (`.matisse-frieze`, `.matisse-shape`) with reduced-motion guards.

3. **IO compatibility** — The native CSS `@view-transition` approach does not use `<ClientRouter>` (Astro's SPA router). It works as a browser-native MPA mechanism: the browser performs a full page load, then uses the CSS rule to crossfade between the old and new documents. IntersectionObserver on `[data-animate]` is re-initialized naturally on each full page load — no `astro:page-load` migration required. This is the decisive advantage over the Astro `<ViewTransitions />` component, which would require migrating all IO setup to `astro:page-load`.

**Primary recommendation:** Three surgical edits — one to `astro.config.mjs` (font range), one to `global.css` (tokens + view-transition + Matisse stubs). Zero new packages. Zero visual output change.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Variable font loading | Frontend Server (Astro build) | CDN (Fontshare serves WOFF2) | Astro Font API fetches and embeds font at build time; `<Font preload />` hint lives in `BaseLayout.astro` `<head>` |
| CSS design tokens | Browser / CSS cascade | — | Custom properties defined in `:root` cascade to all elements; no server involvement |
| View transition animation | Browser (native CSS) | — | `@view-transition` is a browser-native MPA mechanism; no JS, no Astro runtime involved |
| IntersectionObserver scroll-reveal | Browser / Client | — | Inline `<script is:inline>` in `BaseLayout.astro`; runs fresh on each full-page load |
| Matisse CSS class stubs | Browser / CSS cascade | — | Utility class definitions in `global.css`; consumed by Phase 15 components |

---

## Standard Stack

### Core (this phase uses only existing stack)

| Technology | Version | Purpose | Status |
|------------|---------|---------|--------|
| Astro Font API | bundled with Astro 6.3.1 | Variable font loading + preload hint | Already configured; needs `weights` range update |
| Tailwind v4 | 4.3.0 (installed) | CSS utility layer; `:root` tokens defined in `global.css` | Unchanged |
| General Sans (Fontshare variable font) | N/A (CDN) | Primary typeface, weight axis 200–700 | Config change only |

### No New Dependencies

This phase requires zero new npm packages. [VERIFIED: codebase inspection of `package.json`]

### Configuration Change (not a new dependency)

`astro.config.mjs` font weights syntax:

```js
// BEFORE (current — loads two static WOFF2 files)
weights: ["400", "600"],

// AFTER (variable font range — loads single WOFF2 file)
weights: ["200 700"],
```

[VERIFIED: Astro docs — `/withastro/docs` via Context7, confirmed 2026-05-15]

---

## Architecture Patterns

### System Architecture: Phase 11 Data Flow

```
astro.config.mjs
  └── fonts[].weights: ["200 700"]
        │
        ▼
Astro build (SSG)
  └── Fetches single variable WOFF2 from Fontshare CDN
  └── Emits <link rel="preload"> via <Font cssVariable="--font-general-sans" preload />
        │
        ▼
BaseLayout.astro <head>
  └── <Font preload /> → preload hint for WOFF2 (already present, unchanged)
        │
        ▼
src/styles/global.css
  ├── :root { --weight-display: 200; --weight-heading: 300; ... }   ← NEW tokens
  ├── @view-transition { navigation: auto; }                         ← NEW rule
  ├── ::view-transition-old(root) { animation: 200ms crossfade-out } ← NEW keyframes
  ├── ::view-transition-new(root) { animation: 200ms crossfade-in }  ← NEW keyframes
  ├── .matisse-frieze { ... }                                        ← NEW stub
  └── .matisse-shape { ... }                                         ← NEW stub
        │
        ▼
Browser (Chrome 126+ / Safari 18.2+)
  ├── Loads single WOFF2, accesses weight axis 200–700
  ├── Resolves --weight-* tokens on all elements (not yet consumed by any selector)
  └── On MPA navigation: crossfades old→new document at 200ms
        │
        ▼ (Firefox / older browsers)
  └── Full page load without crossfade (progressive enhancement — no JS fallback needed)
```

### Recommended File Edits

```
astro.config.mjs              ← 1-line weights change
src/styles/global.css         ← Add to :root, add @view-transition block, add Matisse stubs
```

No other files change in this phase. `BaseLayout.astro` is NOT touched (existing `<Font preload />` already correct).

---

### Pattern 1: Variable Font Range Syntax (Astro Font API)

**What:** Single string in array = weight range; multiple strings = discrete weights.
**When to use:** Any variable font with a continuous weight axis.

```js
// Source: /withastro/docs (Context7) — official Astro Font API docs
// Single WOFF2 covering the full range
weights: ["200 700"],

// Compare: these load THREE separate static WOFF2 files
weights: ["400", "600", "700"],
```

[VERIFIED: Context7 /withastro/docs, 2026-05-15]

---

### Pattern 2: CSS Weight Design Tokens

**What:** CSS custom properties for `font-weight` values, defined once in `:root`, consumed by component selectors.
**When to use:** Any design system with a multi-level type hierarchy.

```css
/* Source: CONTEXT.md D-01 through D-05 (locked decisions) */
/* Add to existing :root block in global.css, after letter spacing tokens */
:root {
  /* Font Weight Tokens — General Sans variable axis */
  --weight-display: 200;  /* hero headlines 48px+ */
  --weight-heading: 300;  /* section titles, page titles */
  --weight-body:    500;  /* paragraphs, nav links, descriptions */
  --weight-label:   600;  /* micro text, legal, all-caps captions */
}
```

Note: Values are unitless integers — `font-weight` accepts numeric values 1–1000. [VERIFIED: MDN]

---

### Pattern 3: Native CSS View Transition (MPA Crossfade)

**What:** Browser-native cross-document transition. Zero JS. Works only on same-origin navigation.
**When to use:** Any MPA (multi-page app) where pages are full HTML documents served from same origin.

```css
/* Source: MDN @view-transition + Astro zero-JS blog post */
/* Add to global.css, outside any @media query */

/* Opt in both the outgoing and incoming document */
@view-transition {
  navigation: auto;
}

/* Customize the default 250ms crossfade to 200ms (D-07) */
/* Claude's discretion: ease-out feels snappier than linear at 200ms */
::view-transition-old(root) {
  animation: 200ms ease-out both crossfade-out;
}
::view-transition-new(root) {
  animation: 200ms ease-out both crossfade-in;
}

@keyframes crossfade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes crossfade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

**Critical detail:** Both the outgoing page AND the incoming page must have `@view-transition { navigation: auto }` in their CSS. Since `global.css` is loaded on every page via `BaseLayout.astro`, a single rule in `global.css` satisfies this requirement for all pages. [VERIFIED: MDN @view-transition docs, 2026-05-15]

**Reduced-motion handling:** The browser automatically suppresses view transition animations when `prefers-reduced-motion: reduce` is set — no explicit guard needed in CSS. [VERIFIED: MDN, 2026-05-15]

---

### Pattern 4: Matisse CSS Class Stubs

**What:** Placeholder class definitions establishing positioning and reduced-motion patterns. Content (SVG paths, specific colors) added in Phase 15.
**When to use:** When a CSS class contract must be defined before the component that uses it is authored.

```css
/* Source: CONTEXT.md D-09, D-10, D-11 + existing prefers-reduced-motion pattern in global.css */
/* Add at the bottom of global.css, after existing Phase 10 rules */

/* Phase 11 — Matisse CSS class scaffolding */
/* Concrete shapes, animations, colors added in Phase 15 */
.matisse-frieze {
  position: absolute;
  inset: 0;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
  /* color uses --color-accent (#2B5240); --color-text-1 charcoal as fallback */
  color: var(--color-accent);
}

.matisse-shape {
  fill: currentColor;
  /* transform and opacity properties declared here for GPU layer promotion */
  transform: translateZ(0);
  will-change: transform, opacity;
}

/* Reduced-motion guard — consistent with existing global.css pattern */
@media (prefers-reduced-motion: reduce) {
  .matisse-shape {
    animation: none !important;
    transition: none !important;
  }
}
```

**Rationale for `will-change`:** Phase 15 will add scroll-driven parallax (`animation-timeline: scroll()`) and entrance animations on `.matisse-shape`. Declaring `will-change: transform, opacity` now pre-promotes the layer, preventing a repaint when Phase 15 adds animations. [ASSUMED — `will-change` pre-promotion strategy; low risk to include early]

---

### Anti-Patterns to Avoid

- **Using `<ClientRouter>` or `<ViewTransitions />`:** The Astro SPA router fires synthetic navigation events that cause IntersectionObserver to see newly-inserted DOM nodes as already-intersecting, triggering all scroll-reveal animations immediately. The native CSS `@view-transition` approach performs genuine full page loads — IO is completely unaffected. [VERIFIED: Astro issue #9650, W3C CSSWG #8269]

- **Placing `@view-transition` inside a `@media` query:** The `@view-transition` at-rule must be at the top level of the stylesheet, not nested inside `@media (prefers-reduced-motion: no-preference)`. The browser handles motion-preference suppression internally. [VERIFIED: MDN]

- **Using `weights: ["200", "700"]` (two strings):** This downloads two static WOFF2 files — ExtraLight and Bold — not a continuous range. The single-string form `["200 700"]` is the variable font range syntax. [VERIFIED: Context7 /withastro/docs]

- **Touching existing `font-weight` hardcodes in this phase:** D-12 is explicit: tokens go in `:root` only. No existing selectors change. Phase 14 does the sweep.

- **Adding `@keyframes` inside `<style>` blocks in `.astro` component files:** Astro scopes component `<style>` blocks but `@keyframes` names are global. A scoped keyframe in a component collides with a same-name keyframe in another component. All keyframes must live in `global.css`. [VERIFIED: SUMMARY.md, prior codebase research]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Cross-page transitions | Custom JS navigation interception + CSS class swap | `@view-transition { navigation: auto }` | Zero JS, browser-native, progressive enhancement, no IO conflict |
| Variable font weight management | Multiple `@font-face` declarations + manual file hosting | Astro Font API with `weights: ["200 700"]` | Handles preload hint, WOFF2 format negotiation, fallback generation automatically |
| Reduced-motion for view transitions | `@media (prefers-reduced-motion)` wrapper around `@view-transition` | None needed | Browser suppresses view transition animations automatically when reduced-motion preference is set |

---

## Common Pitfalls

### Pitfall 1: Wrong Weights Syntax Loads Two Files Instead of One

**What goes wrong:** Using `weights: ["200", "700"]` (two separate strings) downloads ExtraLight and Bold WOFF2 files — not a variable font range. Network tab shows two requests, weight 300 is unavailable (browser synthesizes it), and the success criterion "single WOFF2 file for weights 200-700" fails.

**Why it happens:** The Astro Font API uses string format to distinguish discrete weights (number string) from ranges (two numbers separated by space in one string). The distinction is not obvious from the array syntax.

**How to avoid:** Use `weights: ["200 700"]` — a single string with a space separator inside the array.

**Warning signs:** Network tab shows two WOFF2 files after the config change. DevTools shows weight 300 rendering identically to weight 400 (synthesis fallback).

---

### Pitfall 2: `@view-transition` Added to Only One Page's CSS

**What goes wrong:** View transitions require BOTH the outgoing and incoming documents to opt in. If `global.css` is loaded on all pages, this is automatic. But if any page uses a different layout that does not import `global.css`, navigating TO or FROM that page produces no crossfade.

**Why it happens:** The rule must be present in the stylesheet of BOTH documents involved in the navigation.

**How to avoid:** Confirm all pages use `BaseLayout.astro` which imports `global.css`. [VERIFIED: all 10 pages use BaseLayout — confirmed by prior codebase inspection]

**Warning signs:** Transitions work on some page pairs but not others.

---

### Pitfall 3: Hero Entrance Animations Re-Fire on Navigation (If IO Were Ever Replaced)

**What goes wrong:** This pitfall does NOT apply to this phase — it only applies if `<ClientRouter>` were added. Documented here to confirm the native CSS approach avoids it.

**Why it's safe here:** Native `@view-transition` triggers genuine full HTML document loads. The `<script is:inline>` in `BaseLayout.astro` runs fresh on every navigation. IntersectionObserver is re-initialized. Hero entrance CSS animations use `animation: ... both` which fires once on DOM paint — exactly as expected. No migration to `astro:page-load` is needed.

**Warning signs (watch for if scope ever changes):** Scroll-reveal `.is-visible` classes persisting on elements from the previous page. This would indicate SPA-style DOM swap, not a full page load.

---

### Pitfall 4: `::view-transition-old` / `::view-transition-new` Keyframes Outside Reduced-Motion Guard Cause Jank

**What goes wrong:** If the custom crossfade keyframes are placed inside `@media (prefers-reduced-motion: no-preference)`, they apply only for motion-tolerant users. Users with reduced-motion preference still get the browser's default 250ms crossfade (slightly too long). If placed outside any media query (recommended), the browser suppresses them automatically per the `prefers-reduced-motion: reduce` spec.

**How to avoid:** Place `::view-transition-old(root)` and `::view-transition-new(root)` outside any `@media` wrapper. The browser handles reduced-motion suppression. [VERIFIED: MDN]

---

## Code Examples

### Complete global.css Additions (Phase 11)

```css
/* ===== Phase 11: Font Weight Tokens ===== */
/* Add inside existing :root { } block, after --tracking-label */

  /* Font Weight Tokens — General Sans variable axis (200–700) */
  /* Values are unitless integers per CSS font-weight spec */
  --weight-display: 200;  /* hero headlines 48px+ — maximum editorial lightness */
  --weight-heading: 300;  /* section titles, page titles */
  --weight-body:    500;  /* paragraphs, nav links, descriptions */
  --weight-label:   600;  /* micro text, legal, all-caps captions */


/* ===== Phase 11: View Transitions (IXPN-01) ===== */
/* Add after the :root block and body styles, before .nav-logo */
/* Both outgoing and incoming documents must have this rule. */
/* Since global.css loads on every page via BaseLayout.astro, this covers all pages. */

@view-transition {
  navigation: auto;
}

/* Override browser default 250ms crossfade → 200ms snappy crossfade (D-07) */
/* Easing: ease-out — opacity decay front-loaded, feels instant on snap */
/* No @media wrapper needed — browser suppresses transitions for prefers-reduced-motion */
::view-transition-old(root) {
  animation: 200ms ease-out both crossfade-out;
}
::view-transition-new(root) {
  animation: 200ms ease-out both crossfade-in;
}

@keyframes crossfade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes crossfade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}


/* ===== Phase 11: Matisse CSS Class Scaffolding ===== */
/* Stubs only — concrete shapes, SVG paths, and animations added in Phase 15 */
/* Positioning and reduced-motion contract established here */

.matisse-frieze {
  position: absolute;
  inset: 0;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
  /* Accent green first (D-11); Phase 15 may override to --color-text-1 if contrast insufficient */
  color: var(--color-accent);
}

.matisse-shape {
  fill: currentColor;
  /* GPU layer pre-promotion for Phase 15 scroll-driven parallax */
  transform: translateZ(0);
  will-change: transform, opacity;
}

/* Reduced-motion guard — consistent with Phase 8 pattern (D-10) */
@media (prefers-reduced-motion: reduce) {
  .matisse-shape {
    animation: none !important;
    transition: none !important;
  }
}
```

### Complete astro.config.mjs Font Change

```js
// Source: /withastro/docs Context7 — Astro Font API variable font range syntax
// Change in astro.config.mjs fonts[] array:

// BEFORE
weights: ["400", "600"],

// AFTER — single string signals variable font range, downloads one WOFF2
weights: ["200 700"],
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `weights: ["400", "600"]` discrete loads | `weights: ["200 700"]` variable range | Astro Font API v1 (Astro 4.5+) | Single WOFF2, full axis access, smaller total download |
| Astro `<ViewTransitions />` component (SPA router) | Native CSS `@view-transition { navigation: auto }` | Chrome 126 / Safari 18.2 (2024) | Zero JS, no IO conflict, progressive enhancement in Firefox |
| `DOMContentLoaded` for animation setup (with `<ViewTransitions />`) | Not needed here — native CSS approach uses genuine page loads | N/A for this project | IO and hero animations work unchanged, no migration required |
| `font-weight: 600` hardcoded everywhere | `font-weight: var(--weight-body)` token system | Phase 11 defines tokens; Phase 14 applies them | Decoupled weight from usage; single `:root` change recalibrates entire type system |

**Deprecated / never-use in this codebase:**
- `<ClientRouter>` / `<ViewTransitions />` import from `astro:transitions` — permanently incompatible with IO scroll-reveal pattern; native CSS replaces it completely
- `@astrojs/tailwind` — deprecated for Tailwind v4, not installed, do not add

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `will-change: transform, opacity` pre-declared on `.matisse-shape` in Phase 11 will not cause layout or paint regression now (before Phase 15 adds animations) | Pattern 4 / Matisse stubs | Low — `will-change` without an actual animation has near-zero rendering cost; worst case: remove in Phase 15 if profiling shows otherwise |
| A2 | `ease-out` is the best easing for a 200ms opacity crossfade | Code Examples / Pattern 3 | Low — subjective; can be adjusted in the same edit without structural change |

---

## Open Questions

1. **Does Fontshare actually serve a variable WOFF2 for General Sans via the Astro Font API?**
   - What we know: Fontshare lists General Sans as a variable font (weight axis confirmed). Astro Font API supports the `"200 700"` range syntax for Fontsource and for Fontshare.
   - What's unclear: Whether Fontshare's CDN endpoint for General Sans returns a single variable WOFF2 or multiple static files when the range syntax is used. The SUMMARY.md flags this as an open gap (2026-05-14).
   - Recommendation: The Network tab verification in the success criteria ("single WOFF2 file loaded for General Sans covering weights 200-700") resolves this empirically. If Fontshare serves static files for General Sans, two or more WOFF2 requests will appear and the font config approach may need adjustment. The build step will complete either way — only verification tells us.

2. **Is `will-change: transform, opacity` on `.matisse-shape` premature optimization?**
   - What we know: The property promotes the element to a GPU compositing layer, which has a memory cost.
   - What's unclear: Whether Phase 15's animation approach will actually use transform/opacity (highly likely given the `prefers-reduced-motion` constraint on scroll-driven parallax), or whether it will change to a different property.
   - Recommendation: Include the stub but add a code comment linking it to Phase 15's animation plan. Phase 15 can remove it if unused.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 11 is a pure CSS + config change with no external runtime dependencies beyond the Astro build process already in use.

---

## Security Domain

Step: SKIPPED — Phase 11 contains no authentication, session management, user input handling, data persistence, or cryptography. All deliverables are static CSS and build config. ASVS categories V2–V6 do not apply.

---

## Sources

### Primary (HIGH confidence)

- `/withastro/docs` via Context7 (2026-05-15) — Astro Font API `weights` range syntax; variable font configuration; confirmed `["200 700"]` vs discrete strings
- [MDN: @view-transition](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition) — at-rule syntax, `navigation: auto`, `::view-transition-old`/`::view-transition-new` pseudo-elements, browser support matrix
- [Astro zero-JS view transitions blog](https://astro.build/blog/future-of-astro-zero-js-view-transitions/) — canonical reference for CSS-native approach, Chrome 126 / Edge 126 support
- Codebase inspection (2026-05-15) — `astro.config.mjs` (current font config), `src/styles/global.css` (existing `:root` token block and `prefers-reduced-motion` patterns), `src/layouts/BaseLayout.astro` (IO script and `<Font preload />`)

### Secondary (MEDIUM confidence)

- [MDN: View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) — cross-document transition behavior; Safari 18.2 support confirmed
- `.planning/research/SUMMARY.md` (2026-05-14) — project-level research; `@view-transition` recommendation, font config gap note, IO compatibility analysis
- `.planning/research/FEATURES.md` (2026-05-14) — Astro issue #9650 and W3C CSSWG #8269 references for IO/ViewTransitions incompatibility

### Tertiary (LOW confidence)

- None — all claims in this research were verified or cited.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — existing stack confirmed by codebase inspection; no new packages
- Architecture: HIGH — based on direct code reading of `astro.config.mjs`, `global.css`, `BaseLayout.astro`
- Pitfalls: HIGH — derived from official bug tracker references and confirmed MDN docs
- Font range syntax: HIGH — verified in Astro official docs via Context7
- View transition CSS: HIGH — verified in MDN and Astro blog post

**Research date:** 2026-05-15
**Valid until:** 2026-08-15 (stable CSS spec + stable Astro 6 API — 90 days conservative)
