# Phase 5: Animation Infrastructure - Research

**Researched:** 2026-05-11
**Domain:** CSS animation system, IntersectionObserver, accessibility (prefers-reduced-motion), Astro script patterns
**Confidence:** HIGH

---

## Summary

Phase 5 is a surgical bug-fix and infrastructure consolidation — not a new feature build. The codebase already has all the raw ingredients: `@keyframes fade-up`, `[data-animate]` elements, and `IntersectionObserver` logic. The problem is that the observer lives in two component script blocks (`FeatureCTA.astro` and `LandingCTA.astro`) rather than in a single BaseLayout-owned controller. When both components are on the same page (currently impossible but architecturally fragile), both scripts would run and observe all `[data-animate]` elements twice. Even on pages with only one CTA, the observer is placed in a component rather than the layout, which violates the principle that layout concerns belong in the layout.

Two additional bugs exist in `global.css`: (1) the `[data-animate]` CSS hides elements unconditionally (not gated on `.js-enabled`), meaning users with JavaScript disabled see hidden content they can never reveal; (2) the `prefers-reduced-motion: reduce` block applies `opacity: 0` and a `transition`, which is itself motion and contradicts WCAG 2.1 SC 2.3.3.

The fix is three targeted edits: add a single `<script is:inline>` AnimationController to BaseLayout.astro, remove the two duplicate script blocks from FeatureCTA.astro and LandingCTA.astro, and refactor the CSS animation section in global.css to use `.js-enabled` gating and a truly empty reduced-motion block. No new files, no new dependencies, no new animation types.

**Primary recommendation:** Execute as three sequential tasks — CSS refactor, BaseLayout script injection, component script removal — with a manual browser smoke-test after each.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01 (Controller Placement):** Single `<script is:inline>` block in BaseLayout.astro, placed after `<Footer />` before `</body>`. Remove the duplicate IntersectionObserver IIFEs from both FeatureCTA.astro (lines 63-80) and LandingCTA.astro (lines 89-106). Every page gets the observer automatically through BaseLayout.
- **D-02 (No-JS Fallback):** JS-applied class gating. The AnimationController script adds `.js-enabled` to `<html>` before observing elements. CSS selectors for `[data-animate]` hiding (opacity:0, transform) are scoped under `.js-enabled [data-animate]`. Without JavaScript, elements render at full opacity with no transform — fully visible by default.
- **D-03 (Reduced-Motion Behavior):** Strict zero-motion for `prefers-reduced-motion: reduce` users. No opacity change, no transitions, no animations. Elements render normally as if `data-animate` were not present. The `@media (prefers-reduced-motion: reduce)` block in global.css must NOT apply opacity:0 or any transition — content is just there.

### Claude's Discretion

- Observer threshold value (currently 0.15) — adjust if needed during implementation
- Whether to use `rootMargin` for earlier/later trigger points
- Script placement within BaseLayout (before or after footer)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANIM-01 | Fix duplicated IntersectionObserver bug — single AnimationController in BaseLayout | Codebase audit confirmed two duplicate script blocks. CSS gating pattern verified from existing Header.astro `is:inline` IIFE precedent. AnimationController shape specified in UI-SPEC.md. |
| ANIM-02 | Add `prefers-reduced-motion` guard in global.css animation section | Current `@media (prefers-reduced-motion: reduce)` block at lines 101-109 of global.css incorrectly applies `opacity: 0` and `transition`. Fix: empty block. The `no-preference` block also needs `.js-enabled` scope added. |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| AnimationController (IntersectionObserver) | Frontend layout (BaseLayout.astro) | — | Layout concerns belong in the layout layer, not in leaf components. BaseLayout is the single page wrapper all pages share. |
| CSS animation hiding/reveal | Browser / Client (CSS) | — | Purely presentational. `opacity`, `transform`, `@keyframes` live in global.css. |
| JS-gating (`.js-enabled` class) | Browser / Client (inline script) | — | Must run synchronously before paint to avoid FOUC. `is:inline` IIFE in BaseLayout head area or just before `</body>`. |
| No-JS fallback | Browser / Client (CSS-only) | — | CSS must render content visible without any class from JS. The gating mechanism is the class scope, not a separate fallback layer. |
| Reduced-motion compliance | Browser / Client (CSS media query) | — | `@media (prefers-reduced-motion: reduce)` is a CSS-level concern. No JS required — CSS must simply not apply motion to `[data-animate]`. |

---

## Standard Stack

### Core (no new dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| IntersectionObserver API (native) | Browser-native | Scroll-triggered visibility detection | Already in use. Zero KB. 97%+ browser support. [VERIFIED: caniuse.com] |
| CSS `@media (prefers-reduced-motion)` | Browser-native | Accessibility guard for motion sensitivity | WCAG 2.1 SC 2.3.3 standard. Already in global.css. [VERIFIED: codebase] |
| Astro `is:inline` script | Astro 6 feature | Non-bundled inline script, not deduped by Vite | Established project pattern (Header.astro scroll shadow). [VERIFIED: codebase] |

No new packages are installed for this phase. [VERIFIED: codebase — all required APIs are already present]

### Installation

```bash
# No installation required for this phase
```

---

## Architecture Patterns

### System Architecture Diagram

```
Page Request
     │
     ▼
BaseLayout.astro renders <html>
     │
     ├─► <head> — global.css loaded
     │      CSS defines:
     │        .js-enabled [data-animate] { opacity:0; transform:translateY(16px) }
     │        .js-enabled [data-animate].is-visible { animation: fade-up 400ms }
     │        @media (prefers-reduced-motion: reduce) { /* empty — no hiding */ }
     │
     ├─► <body>
     │      <Header />
     │      <main><slot /></main>   ←── page content with [data-animate] elements
     │      <Footer />
     │      <script is:inline>      ←── AnimationController (SINGLE, injected here)
     │           1. document.documentElement.classList.add('js-enabled')
     │           2. new IntersectionObserver(...)
     │           3. querySelectorAll('[data-animate]').forEach(observe)
     │      </script>
     │
     └─► Browser paint
            JS disabled: no .js-enabled class → CSS hiding rules never activate → content visible
            JS enabled:  .js-enabled added → elements hidden → observer fires as user scrolls
            prefers-reduced-motion: reduce → @media block empty → no hiding at all
```

### Recommended Project Structure

No structural changes. Only existing files are modified:

```
src/
├── layouts/
│   └── BaseLayout.astro     # ADD: AnimationController <script is:inline> after <Footer />
├── components/
│   ├── FeatureCTA.astro     # REMOVE: lines 61-80 (<script is:inline> block)
│   └── LandingCTA.astro     # REMOVE: lines 87-106 (<script is:inline> block)
└── styles/
    └── global.css           # REFACTOR: lines 85-109 (JS-gating + empty reduced-motion)
```

### Pattern 1: AnimationController in BaseLayout

**What:** A single `<script is:inline>` IIFE placed after `<Footer />` in BaseLayout.astro that owns the complete IntersectionObserver lifecycle.

**When to use:** Any page-level concern that must run once per page, with no bundling overhead. The `is:inline` directive prevents Vite from bundling the script — it emits verbatim into the HTML. Because it is `is:inline` (not a bundled module), Astro does NOT deduplicate it. Deduplication only applies to bundled scripts (no `is:inline`). Since BaseLayout is used by every page and is rendered once per page, placing the script here achieves exactly one instance per page without deduplication logic.

**Example:**
```javascript
// Source: UI-SPEC.md AnimationController shape + codebase pattern from Header.astro
(function () {
  document.documentElement.classList.add('js-enabled');
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('[data-animate]').forEach(function (el) {
    observer.observe(el);
  });
})();
```

**Why `is:inline` here is safe:** Unlike `MobileMenu.astro` which uses a bundled script for deduplication across multiple imports, the AnimationController only ever appears in BaseLayout — one occurrence per page. `is:inline` is the correct choice.

### Pattern 2: JS-Gated CSS Hiding

**What:** CSS hiding rules scoped under `.js-enabled` parent class, which is only added by the AnimationController script.

**When to use:** Any time content must be visible without JavaScript, but can be initially hidden when JS is available to animate it in.

**Example:**
```css
/* Source: UI-SPEC.md design contract, global.css refactor target */
@media (prefers-reduced-motion: no-preference) {
  .js-enabled [data-animate] {
    opacity: 0;
    transform: translateY(16px);
  }
  .js-enabled [data-animate].is-visible {
    animation: fade-up 400ms ease-out forwards;
  }
  @keyframes fade-up {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  /* Intentionally empty — [data-animate] elements render at full opacity with no transform */
}
```

**Critical:** `@keyframes fade-up` stays outside the `.js-enabled` scope — keyframe declarations are not selectors and do not apply hiding. Only the selector rules need gating.

### Anti-Patterns to Avoid

- **Script in leaf component:** Placing IntersectionObserver in `FeatureCTA.astro` or `LandingCTA.astro` means it runs once per component import, not once per page. If both components exist on a page, the observer fires twice on the same elements.
- **Unconditional `[data-animate]` CSS hiding:** Without `.js-enabled` scope, `opacity: 0` applies even when JavaScript is disabled, making content permanently invisible.
- **Reduced-motion with opacity transition:** A 200ms opacity fade IS motion. WCAG 2.3.3 (Level AAA) and community consensus treat any animation/transition as motion. The `prefers-reduced-motion: reduce` block must be empty or absent, not filled with "gentle" alternatives.
- **`<noscript>` CSS override:** An alternative No-JS approach (keep hiding in CSS, override with `<noscript><style>`) is more complex and more fragile than the `.js-enabled` gating approach. The locked decision (D-02) uses gating.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll-triggered visibility | Custom scroll event listeners | `IntersectionObserver` (native) | IO is declarative, performant (no main-thread scroll events), and already in use in the project |
| Reduced-motion detection in JS | `window.matchMedia` checks in AnimationController | CSS `@media (prefers-reduced-motion)` | CSS handles it before JS runs. No JS needed for the accessibility guard — correct CSS eliminates the need for JS media query checks |
| Script deduplication | Guard variables (`if (window.__animInit)`) | Single placement in BaseLayout | Deduplication guards are only needed when a script might be imported multiple times. BaseLayout is a single-instance layout — the script appears exactly once. |

**Key insight:** The fix is subtraction, not addition. Removing two script blocks and refactoring 25 lines of CSS is the entire implementation.

---

## Runtime State Inventory

Step 2.5: SKIPPED — this is a CSS/JS refactor phase, not a rename/migration phase. No stored data, no live service config, no OS-registered state affected.

---

## Environment Availability

Step 2.6: SKIPPED — this phase has no external service dependencies. All changes are to local source files (Astro components and CSS). No CLI tools, databases, or external services are required beyond the existing `npm run dev` / `npm run build` workflow.

---

## Common Pitfalls

### Pitfall 1: Script Placement After DOMContentLoaded

**What goes wrong:** If the `<script is:inline>` is placed in `<head>` rather than at the bottom of `<body>`, `querySelectorAll('[data-animate]')` runs before `[data-animate]` elements exist in the DOM — the NodeList is empty and nothing gets observed.

**Why it happens:** Inline scripts execute synchronously at the point they appear in the HTML. Elements below the script tag do not yet exist in the DOM when the script runs.

**How to avoid:** Place the `<script is:inline>` after `<Footer />` before `</body>`, as specified in D-01. At that point, all page content has been parsed.

**Warning signs:** Elements never animate (observer is set up with 0 targets), no console errors.

### Pitfall 2: Elements Already In Viewport at Script Run Time

**What goes wrong:** Elements at the top of the page that are already in the viewport when the script runs may never trigger the observer callback because they are intersecting at the moment `observe()` is called.

**Why it happens:** IntersectionObserver callbacks fire asynchronously. The initial intersection state is reported on the next tick after `observe()`. This actually works correctly — the callback WILL fire for elements already intersecting when observed. [VERIFIED: MDN IntersectionObserver behavior — initial intersection is reported asynchronously]

**How to avoid:** No special handling needed. The observer reports initial intersection state on the first callback invocation. `is-visible` will be added correctly.

**Warning signs:** If elements were previously visible (already had `is-visible`) and are re-observed, the class would be added again (no-op since it already exists). The `unobserve` call prevents repeated callbacks.

### Pitfall 3: FOUC — Flash of Unstyled/Hidden Content

**What goes wrong:** If `.js-enabled` is added to `<html>` after the browser has already painted the page, users briefly see all content fully visible before it snaps to hidden (the initial state for animation). This flash can be jarring, especially on slow connections.

**Why it happens:** The script runs after `</body>`, after the DOM is ready. On fast connections, this is imperceptible. On slow connections, initial paint happens before the script executes.

**How to avoid:** The `is:inline` placement at the bottom of `<body>` is the pragmatic choice — consistent with D-01 and the Header.astro IIFE pattern. If FOUC becomes perceptible on slow connections, the threshold for concern is low: elements animate in smoothly rather than disappearing-then-animating-in. The gap is typically sub-100ms. Accept this as an acceptable tradeoff for architectural simplicity. [ASSUMED — FOUC severity depends on connection speed and will need empirical validation]

**Warning signs:** On Network Throttling in DevTools, observe whether elements flash visible-then-hidden at page load.

### Pitfall 4: Forgetting to Remove Both Script Blocks

**What goes wrong:** Only one of the two duplicate scripts (FeatureCTA or LandingCTA) is removed. The remaining script creates a second observer on pages that include that component.

**Why it happens:** The two files are almost identical and easy to conflate.

**How to avoid:** The planner should create explicit checklist items for BOTH files. The success criteria explicitly requires no duplicate `<script>` tags in page source — verify by viewing source on `/` (LandingCTA) and any feature page (FeatureCTA).

**Warning signs:** Viewing page source shows two identical `IntersectionObserver` IIFE blocks.

### Pitfall 5: Scoping `@keyframes` Under `.js-enabled`

**What goes wrong:** Developer scopes `@keyframes fade-up` inside `.js-enabled { ... }`, which is not valid CSS — keyframe names are global and cannot be nested inside selectors.

**Why it happens:** Consistency reflex: since selector rules are scoped, the keyframe definition feels like it should be too.

**How to avoid:** Keep `@keyframes fade-up` at the top level of the `@media` block. Only the selector rules (`[data-animate]`, `[data-animate].is-visible`) receive the `.js-enabled` prefix. [VERIFIED: CSS spec — @keyframes is a global at-rule, not a selector-scoped rule]

---

## Code Examples

Verified patterns from codebase inspection and UI-SPEC.md:

### Correct global.css Animation Section (after refactor)

```css
/* Source: UI-SPEC.md design contract + CONTEXT.md D-02, D-03 */
@media (prefers-reduced-motion: no-preference) {
  .js-enabled [data-animate] {
    opacity: 0;
    transform: translateY(16px);
  }
  .js-enabled [data-animate].is-visible {
    animation: fade-up 400ms ease-out forwards;
  }
  @keyframes fade-up {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  /* Intentionally empty — [data-animate] elements render at full opacity with no transform */
}
```

### Correct BaseLayout.astro (after script injection)

```astro
<!-- Source: CONTEXT.md D-01, UI-SPEC.md AnimationController shape -->
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    <script is:inline>
      (function () {
        document.documentElement.classList.add('js-enabled');
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15 }
        );
        document.querySelectorAll('[data-animate]').forEach(function (el) {
          observer.observe(el);
        });
      })();
    </script>
  </body>
```

### Correct FeatureCTA.astro (after script removal)

```astro
<!-- Source: src/components/FeatureCTA.astro (current lines 1-59 stay, lines 61-80 removed) -->
<section
  data-animate
  style="background-color: var(--color-surface); border-top: 1px solid var(--color-divider);"
>
  <!-- ... all HTML content unchanged ... -->
</section>
<!-- Script block removed — AnimationController in BaseLayout handles observation -->
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `scroll` event listeners for visibility | `IntersectionObserver` | ~2017 (broad browser support by 2019) | Off-main-thread, no scroll jank, native threshold support |
| CSS-only `prefers-reduced-motion` alternatives (gentle fade) | Strict zero-motion (empty block) | WCAG 2.1 (2018), community consensus 2020+ | Users with vestibular disorders require truly zero motion, not just reduced motion |
| `<noscript>` style overrides for No-JS fallback | `.js-enabled` class gating | Progressive enhancement best practice, widely documented | No-JS users see content by default, no noscript maintenance burden |

**Deprecated/outdated:**
- `opacity:0` in reduced-motion block: was common circa 2016-2019 as a "subtle alternative", now recognized as still causing issues for vestibular disorder users — replaced by empty block per strict WCAG interpretation.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | FOUC from late `.js-enabled` class addition is imperceptible on typical connections and acceptable as a tradeoff for end-of-body placement | Common Pitfalls — Pitfall 3 | If FOUC is visually jarring, the script might need to move to `<head>` with a `DOMContentLoaded` listener, which adds complexity |
| A2 | No page currently uses both `FeatureCTA` and `LandingCTA` simultaneously (confirmed by codebase grep) | Architecture Patterns | If a future page uses both, the single-controller fix prevents double-fire — this is the correct behavior regardless |

**If A1 needs validation:** Load any feature page over DevTools Network Throttle (Slow 4G) and observe whether content flashes visible before hiding. If visible FOUC exceeds ~50ms perceptual threshold, relocate the `.js-enabled` class addition to a `<script>` in `<head>` (synchronous, before paint) and keep the `observe` call at end-of-body.

---

## Open Questions

1. **Script placement: after `<Footer />` vs. in `<head>`**
   - What we know: CONTEXT.md says "after `<Footer />` before `</body>`" (D-01). UI-SPEC.md confirms this. The `.js-enabled` class is added as the first line of the IIFE.
   - What's unclear: Whether end-of-body placement causes perceptible FOUC on slow connections. Elements that are initially visible (above the fold) may flash visible → hidden → animated-in.
   - Recommendation: Proceed with end-of-body as decided. Flag for empirical testing during implementation. If FOUC is observed, the mitigation is a two-part split: add `.js-enabled` in a `<script>` in `<head>`, keep IntersectionObserver setup at end-of-body.

---

## Security Domain

This phase modifies only frontend CSS and inline JavaScript. No authentication, data handling, API calls, input validation, or cryptography is involved. ASVS categories V2-V6 do not apply.

No security concerns for this phase.

---

## Sources

### Primary (HIGH confidence)
- `src/components/FeatureCTA.astro` — duplicate IntersectionObserver IIFE confirmed at lines 61-80 [VERIFIED: codebase]
- `src/components/LandingCTA.astro` — duplicate IntersectionObserver IIFE confirmed at lines 87-106 [VERIFIED: codebase]
- `src/layouts/BaseLayout.astro` — confirmed no existing AnimationController; `<Footer />` at line 36 is the injection target [VERIFIED: codebase]
- `src/styles/global.css` — animation section lines 85-109 confirmed; reduced-motion block applies `opacity:0` and `transition` (incorrect) [VERIFIED: codebase]
- `src/components/Header.astro` — `is:inline` IIFE pattern at lines 92-110 confirmed as the established project pattern [VERIFIED: codebase]
- `.planning/phases/05-animation-infrastructure/05-UI-SPEC.md` — AnimationController shape, CSS contract, file change table [VERIFIED: codebase]
- `.planning/phases/05-animation-infrastructure/05-CONTEXT.md` — D-01, D-02, D-03 locked decisions [VERIFIED: codebase]

### Secondary (MEDIUM confidence)
- MDN IntersectionObserver — initial intersection reported asynchronously on first callback invocation [CITED: developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API]
- WCAG 2.1 SC 2.3.3 (Animation from Interactions) — Level AAA, recommends zero motion for reduced-motion preference [CITED: www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; all patterns verified in codebase
- Architecture: HIGH — all three changes fully specified in CONTEXT.md + UI-SPEC.md; codebase confirmed
- Pitfalls: HIGH (code-level) / MEDIUM (FOUC severity — empirical) — CSS/JS mechanics are deterministic; FOUC depends on runtime conditions

**Research date:** 2026-05-11
**Valid until:** 2026-06-11 (CSS/IntersectionObserver APIs are stable; no expiry risk)
