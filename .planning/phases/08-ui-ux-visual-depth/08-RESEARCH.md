# Phase 8: UI/UX Visual Depth - Research

**Researched:** 2026-05-13
**Domain:** CSS micro-interactions, noise texture, CSS Grid bento layout, scroll-triggered counter animation
**Confidence:** HIGH

---

## Summary

Phase 8 elevates the Tuwa marketing site from a functional Tailwind template to a premium fitness brand experience. It delivers five focused visual improvements: full-page noise texture, consistent section spacing, button/card hover micro-interactions, a bento grid rework of FeatureGrid, and animated scroll-triggered metric counters.

All implementation decisions are pre-locked in `08-CONTEXT.md` and fully specified in `08-UI-SPEC.md`. The research phase here documents the implementation patterns, verifies they are compatible with the existing codebase, maps pitfalls, and confirms no new npm dependencies are required.

The codebase is in excellent shape for this phase. The `AnimationController` IntersectionObserver pattern in `BaseLayout.astro` is the correct hook for counters. The `data-animate` / `.is-visible` / `animationDelay` stagger system from Phase 7 is intact and requires no changes — only re-mapped delay values on the bento grid cards. All interactions must use the `@media (prefers-reduced-motion: no-preference)` guard already established as a pattern in `global.css`.

**Primary recommendation:** Implement all five work streams as CSS-only additions to `global.css` plus restructuring of `FeatureGrid.astro` and one new `StatsCounter.astro` component. Zero new npm packages required.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Subtle noise overlay across the full page background — CSS-only via SVG filter `feTurbulence` (no image asset). Full-page, site-wide.
- **D-02:** No gradient accents — noise alone provides visual depth.
- **D-03:** Claude's Discretion on exact spacing values within 120–160px desktop / 64–80px mobile range.
- **D-04:** Button/CTA hover: `scale(1.02)` 150ms ease-out; active: `scale(0.98)` 100ms ease-out.
- **D-05:** Card hover: box-shadow depth increase only — no `translateY`. Shadow lift simulates material depth.
- **D-06:** All interactive elements (buttons, CTAs, cards, nav links) get hover/active states. Mobile tap via `:active`.
- **D-07:** Recovery Scoring is the hero card in the bento grid — largest, most prominent position.
- **D-08:** Three-tier visual hierarchy: 1 large (Recovery Scoring) + 2 medium (Workload Tracking, Smart Templates) + 2 small (Cold Start, Coaching).
- **D-09:** FeatureGrid.astro restructured from `<ul>` list to CSS Grid bento. Existing per-card stagger animation preserved.
- **D-10:** Claude's Discretion — metrics: 1,200+ athletes, 85,000+ sessions, 94% HRV accuracy.
- **D-11:** Claude's Discretion — counter placement: between FeatureGrid and LandingCTA on index.astro.
- **D-12:** Counters animate on scroll-into-view using existing AnimationController; 300–500ms count-up; `prefers-reduced-motion` shows final numbers immediately.

### Claude's Discretion

- Exact section spacing values within 120–160px desktop / 64–80px mobile range.
- Counter metrics selection and placement (resolved in UI-SPEC: 1200+, 85000+, 94%).
- Bento grid CSS Grid template details (resolved in UI-SPEC: 3-col, grid-template-areas).
- Noise texture opacity and SVG filter parameters (resolved in UI-SPEC: 0.025 opacity, baseFrequency 0.65).
- Card shadow values (resolved in UI-SPEC: token values defined).

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| UIPX-01 | Spacing and typography consistency pass across all pages | New spacing tokens `--space-section-desktop` (128px) and `--space-section-mobile` (72px) applied to index.astro sections. No new type sizes needed. |
| UIPX-02 | Hover micro-interactions on buttons, links, and navigation | CSS `.btn-cta` class with scale transforms; nav link color transitions in global.css; Header and Footer inline hover styles replaced with CSS classes. |
| UIPX-03 | Card hover lift effects on feature cards and blog listing | Box-shadow transition on `.feature-card` using `--shadow-card` and `--shadow-card-hover` tokens; same pattern applied to blog listing `<li>` anchors. |
| UIPX-04 | Noise texture and glass morphism accents on key sections | CSS-only SVG `feTurbulence` filter on `body::after` pseudo-element. No glass morphism (D-02 excludes gradients). |
| UIPX-05 | Bento grid layout for feature overview | FeatureGrid.astro restructured to CSS Grid `grid-template-areas` bento layout per UI-SPEC grid template. |
| UIPX-06 | Animated counters for key metrics | New `StatsCounter.astro` component with `data-counter-target` / `data-counter-suffix` attributes; count-up logic added to AnimationController in BaseLayout.astro. |

</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Noise texture | Browser / Client (CSS) | — | Pure CSS `body::after` pseudo-element, zero JS, zero network cost |
| Section spacing tokens | Browser / Client (CSS) | — | CSS custom properties in global.css, applied via inline styles on Astro components |
| Button micro-interactions | Browser / Client (CSS) | — | CSS transform transitions; no JS required for scale on hover/active |
| Card hover lift | Browser / Client (CSS) | — | CSS box-shadow transition; no JS required |
| Nav/footer link hover | Browser / Client (CSS) | — | Replace inline `onmouseover` JS event handlers with CSS class-based transitions |
| Bento grid layout | Browser / Client (CSS) | FeatureGrid.astro (Astro) | CSS Grid `grid-template-areas` drives layout; Astro component owns DOM structure |
| Animated counters | Browser / Client (JS) | Astro component | `AnimationController` IntersectionObserver triggers count-up; `StatsCounter.astro` owns DOM |

---

## Standard Stack

### Core (all pre-existing — no new installs)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 6.x | Component authoring, static rendering | Project constraint — CLAUDE.md |
| Tailwind CSS v4 | 4.x | Utility classes where convenient | Project constraint — CLAUDE.md |
| CSS custom properties | Native | Design tokens, spacing, shadows | Established pattern across all components |
| IntersectionObserver API | Native browser | Scroll-triggered animation | Already implemented in BaseLayout AnimationController |
| requestAnimationFrame | Native browser | Counter animation loop | Smoother than setInterval; established best practice |

**No new npm dependencies required for Phase 8.** [VERIFIED: codebase inspection]

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CSS `feTurbulence` SVG filter | Native browser | Noise texture generation | Phase 8 only — `body::after` pseudo-element |
| CSS Grid `grid-template-areas` | Native browser | Bento layout | FeatureGrid.astro restructure |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS `feTurbulence` SVG filter | PNG noise image asset | Asset adds network cost and HTTP request; SVG filter is zero-cost. REQUIREMENTS.md explicitly lists GSAP as out of scope. |
| CSS box-shadow transition | `translateY` card lift | D-05 explicitly forbids translate — shadow depth only. |
| requestAnimationFrame counter | setInterval counter | rAF syncs to display refresh rate, eliminates jank on 120Hz displays. |
| CSS `.btn-cta` class | Inline `onmouseover` JS handlers | CSS transitions are better than JS event handlers for performance and reduced-motion compliance. Header already uses inline handlers — Phase 8 should migrate to class-based CSS. |

---

## Architecture Patterns

### System Architecture Diagram

```
User scrolls index.astro
         │
         ▼
  IntersectionObserver (AnimationController — BaseLayout.astro)
         │
         ├─ [data-animate] elements → add .is-visible → CSS fade-up fires
         │
         └─ [data-animate][data-counter-target] elements
                   │
                   └─ count-up JS loop (rAF, 400ms) → update textContent
                              │
                              └─ [prefers-reduced-motion: reduce] → skip loop, show final value


User hovers button / card
         │
         ├─ .btn-cta → CSS scale(1.02) / scale(0.98) — no JS
         └─ .feature-card → CSS box-shadow transition — no JS


Page load (all pages)
         │
         └─ body::after CSS pseudo-element → SVG feTurbulence noise (fixed, z-index: 0)
```

### Recommended Project Structure

No new directories required. Changes are in-place modifications and one new component.

```
src/
├── styles/
│   └── global.css          # Add: shadow tokens, spacing tokens, noise texture,
│                           #       btn-cta class, card hover, nav hover
├── components/
│   ├── FeatureGrid.astro   # Restructure: ul → CSS Grid bento
│   ├── StatsCounter.astro  # NEW: three-metric animated counter strip
│   ├── Hero.astro          # Update: apply spacing tokens, btn-cta class
│   ├── LandingCTA.astro    # Update: apply spacing tokens, btn-cta class
│   ├── FeatureCTA.astro    # Update: apply btn-cta class
│   ├── Header.astro        # Update: CSS nav link hover classes
│   └── Footer.astro        # Update: CSS footer link hover classes
├── layouts/
│   └── BaseLayout.astro    # Update: extend AnimationController with counter logic
└── pages/
    ├── index.astro          # Update: apply spacing tokens, insert StatsCounter
    └── blog/
        └── index.astro     # Update: blog listing card hover lift
```

### Pattern 1: CSS Noise Texture via SVG Filter

**What:** Full-page grain overlay using `body::after` with an inline SVG `feTurbulence` filter as `background-image`.
**When to use:** Single application site-wide. `position: fixed` ensures the texture tiles continuously during scroll without repositioning.

```css
/* Source: UI-SPEC.md Noise Texture Contract */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
```

**Critical:** All page content needs to be at a z-index that places it above the noise layer. If any `.feature-card` or section elements currently have `position: static` (the default), they are already above `z-index: 0` stacking context elements. Verify after implementation that interactive elements are not blocked by the `body::after` layer. [VERIFIED: existing components use `position: relative` or `static` — the `pointer-events: none` on `body::after` makes this safe regardless]

### Pattern 2: Button CTA Micro-Interaction

**What:** CSS `transform` scale on hover/active, gated in reduced-motion media query.
**When to use:** All elements styled as CTA buttons: Hero download button, LandingCTA App Store badge link, FeatureCTA badge link, Header "Get the App" button.

```css
/* Source: UI-SPEC.md Interaction Contract */
@media (prefers-reduced-motion: no-preference) {
  .btn-cta {
    transition: transform 150ms ease-out;
  }
  .btn-cta:hover {
    transform: scale(1.02);
  }
  .btn-cta:active {
    transform: scale(0.98);
  }
}
```

**Migration note:** `Header.astro` currently uses inline `onmouseover`/`onmouseout` for the "Get the App" button (background-color and box-shadow). Phase 8 must add `.btn-cta` class alongside the existing inline hover styles — or migrate the background-color hover to CSS as well. Keeping both in sync is cleaner: migrate Header CTA to full CSS class.

### Pattern 3: Card Hover Lift (Shadow Depth)

**What:** Box-shadow transition from resting shadow to elevated shadow on hover. No `translateY`.
**When to use:** All `.feature-card` elements in FeatureGrid, blog listing link elements.

```css
/* Source: UI-SPEC.md Interaction Contract + Color section */
@media (prefers-reduced-motion: no-preference) {
  .feature-card {
    box-shadow: var(--shadow-card);
    transition: box-shadow 200ms ease-out;
  }
  .feature-card:hover,
  .feature-card:focus-visible {
    box-shadow: var(--shadow-card-hover);
    background-color: var(--color-surface-el);  /* preserve existing */
  }
}
```

Blog listing cards currently have no hover state beyond text color. Apply the same shadow lift pattern to `.blog-card` (or inline on the `<li>` `<a>` element in blog/index.astro directly).

### Pattern 4: CSS Grid Bento Layout

**What:** `grid-template-areas` replaces the uniform 3-column card grid in FeatureGrid.astro.
**When to use:** FeatureGrid.astro only. Three responsive breakpoints.

```css
/* Source: UI-SPEC.md Bento Grid Contract */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-xl);
  grid-template-areas:
    "recovery  recovery  workload"
    "recovery  recovery  templates"
    "cold-start cold-start coaching";
}

/* Tablet */
@media (min-width: 480px) and (max-width: 767px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "recovery  recovery"
      "workload  templates"
      "cold-start coaching";
  }
}

/* Mobile */
@media (max-width: 479px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "recovery"
      "workload"
      "templates"
      "cold-start"
      "coaching";
  }
}
```

Each `<li>` in the restructured `<ul>` receives `style="grid-area: recovery;"` etc. The `<ul>` itself gets `class="bento-grid"`.

### Pattern 5: Animated Counter with requestAnimationFrame

**What:** Count-up animation from 0 to target number over 400ms, triggered by the existing `AnimationController` IntersectionObserver when `.is-visible` is added.
**When to use:** `StatsCounter.astro` component only.

```js
// Source: UI-SPEC.md Counter Animation section + established AnimationController pattern
// Add to the is:inline script in BaseLayout.astro, after existing observer setup

var counters = document.querySelectorAll('[data-counter-target]');
var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

counters.forEach(function(counter) {
  var target = parseInt(counter.getAttribute('data-counter-target'), 10);
  var suffix = counter.getAttribute('data-counter-suffix') || '';
  var duration = 400; // ms

  if (reducedMotion) {
    counter.textContent = target.toLocaleString() + suffix;
    return;
  }

  // Hook into .is-visible being added by observer
  var mutationObs = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.classList.contains('is-visible')) {
        mutationObs.disconnect();
        var start = null;
        function step(timestamp) {
          if (!start) start = timestamp;
          var progress = Math.min((timestamp - start) / duration, 1);
          var current = Math.floor(progress * target);
          counter.textContent = current.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else counter.textContent = target.toLocaleString() + suffix;
        }
        requestAnimationFrame(step);
      }
    });
  });
  mutationObs.observe(counter.closest('[data-animate]') || counter, { attributes: true, attributeFilter: ['class'] });
});
```

**Alternative approach:** Trigger counters directly from the observer callback by checking for `data-counter-target` on the observed element. This is simpler than MutationObserver and integrates more cleanly with the existing AnimationController structure. Prefer this: extend the existing observer's `if (entry.isIntersecting)` block to also fire counter logic.

### Anti-Patterns to Avoid

- **Inline `onmouseover`/`onmouseout` for new interactions:** Header already has these for the features dropdown colors. Do not add more inline JS event handlers for hover states. CSS transitions are more performant and automatically respect reduced-motion when wrapped in the media query.
- **`z-index` on `body::after` without `pointer-events: none`:** The noise overlay will capture mouse events and break all clicks if `pointer-events: none` is omitted.
- **`setInterval` for counter animation:** Causes jitter on 90Hz/120Hz displays. Use `requestAnimationFrame`.
- **`translateY` on card hover:** D-05 explicitly forbids translate. Shadow depth only.
- **Applying `transition` outside `@media (prefers-reduced-motion: no-preference)`:** All transitions must be gated. Pattern is already established in global.css — follow it exactly.
- **Using `position: absolute` for noise overlay:** Must be `position: fixed` so texture is stable during scroll. Absolute would cause the texture to re-tile on scroll events.
- **Re-declaring existing CSS tokens:** `--color-accent`, `--color-surface`, etc. are already in `:root`. Only add new tokens (`--shadow-card`, `--space-section-desktop`, etc.).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Noise texture | Custom PNG/WebP noise image asset | CSS SVG `feTurbulence` filter | Zero network cost, zero HTTP request, scales to any resolution |
| Counter animation | Complex animation library | Native `requestAnimationFrame` + linear easing | rAF is the browser's own animation primitive; no library overhead |
| Scroll trigger | Custom scroll event listener | Existing `AnimationController` IntersectionObserver | Already implemented and battle-tested in the project; reuse, don't duplicate |
| Bento layout | JavaScript-driven card sizing | CSS Grid `grid-template-areas` | Native grid handles all responsive breakpoints with zero JS |
| Reduced-motion detection | Custom JS preference store | `@media (prefers-reduced-motion)` in CSS + `window.matchMedia` in JS | OS-level preference; both CSS and JS APIs read it natively |

**Key insight:** Every visual improvement in Phase 8 has a native browser solution. Adding npm packages would increase bundle size without adding capability the browser doesn't already provide.

---

## Common Pitfalls

### Pitfall 1: Noise Texture Blocks Interactive Elements

**What goes wrong:** `body::after` is rendered on top of interactive elements if `z-index` stacking context is not managed correctly.
**Why it happens:** `body::after` with `z-index: 0` combined with positioned children (e.g., `position: sticky` header) can create unexpected stacking.
**How to avoid:** Set `pointer-events: none` on `body::after` (already in UI-SPEC). Test clicking all buttons after implementation.
**Warning signs:** Clicking a button does nothing; cursor shows default instead of pointer over interactive elements.

### Pitfall 2: Counter Fires Before Element Is Visible

**What goes wrong:** The counter count-up runs during page load, not on scroll-into-view, so users who scroll down miss the animation.
**Why it happens:** If counter logic is not gated on the `.is-visible` class being applied by the observer, it fires immediately.
**How to avoid:** Counter logic must be triggered only inside the `if (entry.isIntersecting)` branch of the existing observer, or via a MutationObserver watching for `.is-visible`.
**Warning signs:** Counter completes animation before the section is visible on screen.

### Pitfall 3: Stagger Delays Wrong After Bento Restructure

**What goes wrong:** The bento grid cards animate in the wrong order (visually bottom-left before top-right) if stagger delays are not remapped to grid reading order.
**Why it happens:** The grid-template-areas layout means card DOM order and visual order may differ on desktop.
**How to avoid:** Assign `data-animate-delay` in visual reading order: Recovery (0ms), Workload (100ms), Templates (200ms), Cold Start (300ms), Coaching (400ms) — per UI-SPEC.
**Warning signs:** Cards in the second column animate before the hero card completes.

### Pitfall 4: Box-Shadow Transition Causes Layout Reflow

**What goes wrong:** Box-shadow transitions trigger layout calculations on some browsers.
**Why it happens:** `box-shadow` is a paint property, not a composited property. It is cheaper than most properties but can still cause paint in some browsers.
**How to avoid:** This is acceptable for marketing site scale. Do not add `will-change: box-shadow` speculatively — only if performance profiling shows issues. Keep shadow values moderate (no spread values > 60px).
**Warning signs:** Jank on low-end mobile during card grid scroll — unlikely at this scale.

### Pitfall 5: Blog Listing Cards Miss the Hover Lift

**What goes wrong:** UIPX-03 requires blog listing card hover lift, but blog/index.astro uses `<li>` elements with plain `<a>` links — no `.feature-card` class.
**Why it happens:** Blog cards are not FeatureGrid cards — different component, different markup.
**How to avoid:** Apply hover lift CSS to blog listing links directly in `blog/index.astro` using a `.blog-listing-item` class, or add inline CSS on the `<li>` elements. The shadow values should match `.feature-card` for visual consistency.
**Warning signs:** Feature cards lift on hover but blog listing items do not.

### Pitfall 6: Header Inline `onmouseover` Conflicts with CSS `.btn-cta`

**What goes wrong:** The Header "Get the App" button has inline `onmouseover`/`onmouseout` that set background-color and box-shadow. Adding `.btn-cta` for the scale transform will work, but the inline handlers will override some CSS.
**Why it happens:** Inline style attributes have highest specificity.
**How to avoid:** When adding `.btn-cta` to the Header CTA, also move the background-color hover from inline JS handler to a CSS class. Either keep inline JS for bg-color (both work simultaneously since they set different properties) or migrate fully to CSS.
**Warning signs:** The "Get the App" button scale works but bg-color hover stops working, or vice versa.

### Pitfall 7: `--space-section-desktop` Token Not Applied to FeatureGrid Section

**What goes wrong:** The FeatureGrid section is restructured (bento grid) but its outer `padding-top`/`padding-bottom` still uses `var(--space-3xl)` (64px) instead of the new `var(--space-section-desktop)` (128px).
**Why it happens:** The section padding is on the outer `<section>` wrapper in `FeatureGrid.astro`, not in `index.astro`.
**How to avoid:** Apply the new spacing tokens to the `<section>` wrapper in `FeatureGrid.astro` OR move section spacing control to `index.astro` and strip padding from the component. The UI-SPEC file map shows spacing applied in `index.astro` — prefer the latter for separation of concerns.
**Warning signs:** Desktop section gaps are 64px instead of 128px.

---

## Code Examples

### New CSS Tokens (add to `:root` in global.css)

```css
/* Source: UI-SPEC.md Phase 8 additions */
--space-section-desktop: 128px;
--space-section-mobile: 72px;
--shadow-card: 0 1px 3px rgba(28,25,21,0.06), 0 1px 2px rgba(28,25,21,0.04);
--shadow-card-hover: 0 8px 24px rgba(28,25,21,0.10), 0 2px 8px rgba(28,25,21,0.06);
--shadow-bento-hero: 0 12px 40px rgba(28,25,21,0.12), 0 4px 12px rgba(28,25,21,0.07);
--shadow-bento-hero-hover: 0 20px 60px rgba(28,25,21,0.14), 0 6px 18px rgba(28,25,21,0.09);
```

### StatsCounter.astro Component Structure

```astro
<!-- src/components/StatsCounter.astro -->
<!-- Placement: between FeatureGrid and LandingCTA in index.astro -->
<section
  aria-label="Tuwa by the numbers"
  data-animate
  style="
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-divider);
    border-bottom: 1px solid var(--color-divider);
    padding-top: var(--space-2xl);
    padding-bottom: var(--space-2xl);
  "
>
  <div
    class="mx-auto max-w-6xl px-6"
    style="display: flex; justify-content: center; gap: var(--space-3xl); flex-wrap: wrap;"
  >
    <div class="text-center">
      <span
        class="tabular-nums"
        data-counter-target="1200"
        data-counter-suffix="+"
        style="font-size: var(--text-display); font-weight: 700; line-height: var(--leading-display); color: var(--color-text-1);"
      >1,200+</span>
      <p style="font-size: var(--text-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-text-2); margin-top: var(--space-xs);">Athletes using Tuwa</p>
    </div>
    <!-- repeat for other two metrics -->
  </div>
</section>
```

### Responsive Section Spacing in index.astro

```astro
<!-- Apply section spacing tokens via responsive inline style -->
<!-- Current: style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);" -->
<!-- After: wrap in clamp or use Tailwind responsive class with CSS var override -->
<section
  style="
    padding-top: var(--space-section-mobile);
    padding-bottom: var(--space-section-mobile);
  "
  class="md:![padding-top:var(--space-section-desktop)] md:![padding-bottom:var(--space-section-desktop)]"
>
```

**Note:** Tailwind v4 allows arbitrary CSS property overrides with `!` prefix and bracket notation. However, since this project uses inline styles extensively, a simpler approach is to apply the desktop spacing via a media query in global.css:

```css
/* global.css — responsive section spacing */
.section-spaced {
  padding-top: var(--space-section-mobile);
  padding-bottom: var(--space-section-mobile);
}
@media (min-width: 768px) {
  .section-spaced {
    padding-top: var(--space-section-desktop);
    padding-bottom: var(--space-section-desktop);
  }
}
```

This `.section-spaced` class is cleaner than mixing Tailwind arbitrary values with inline styles.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `setInterval` counter animation | `requestAnimationFrame` count-up | ~2020 | Eliminates jitter on high-refresh-rate displays |
| PNG/GIF noise image | CSS SVG `feTurbulence` | ~2019 | Zero network cost, infinite resolution |
| Uniform card grids | Bento grid layouts | ~2022 (popularized by Apple/Notion) | Creates visual hierarchy and reading order |
| JS-based hover effects | CSS `transition` + `transform` | ~2015 | GPU-composited, jank-free, reduced-motion safe |
| `onmouseover` inline handlers | CSS pseudo-class transitions | ~2012 | Declarative, performant, accessible |

**Deprecated/outdated in this context:**
- Inline `onmouseover`/`onmouseout` in Header.astro for CTA background-color: works but is an anti-pattern. Phase 8 should migrate Header CTA hover to CSS for consistency with new `.btn-cta` class.
- `md:col-start-2` centering trick on the 5th card in current FeatureGrid: this workaround disappears entirely with bento grid.

---

## Open Questions

1. **Counter trigger integration point**
   - What we know: The existing `AnimationController` in `BaseLayout.astro` is an `is:inline` script. Adding counter logic there is straightforward.
   - What's unclear: Should counter elements also have `data-animate` so they trigger the fade-up animation in addition to counting? Or should they only count (no opacity fade)?
   - Recommendation: Give the counter container `data-animate` for the fade-up reveal, and give each individual counter number element `data-counter-target`. The observer fires on the container, which triggers fade-up; the counter JS triggers on the same `.is-visible` class being added.

2. **Header inline hover migration scope**
   - What we know: Header has inline `onmouseover` for background-color (CTA) and dropdown links (color). The phase touches header hover states (D-06).
   - What's unclear: Full CSS migration of all Header hover states, or just add `.btn-cta` for the scale transform?
   - Recommendation: Add `.btn-cta` class to the CTA `<a>` for scale. Leave the background-color inline handler as-is (it sets a different property and the two do not conflict). Mark full hover migration as a future cleanup. This minimizes scope.

3. **Blog listing card hover: class or inline?**
   - What we know: Blog listing items are `<li>` wrappers with `<a>` links in `blog/index.astro`. No shared card class exists.
   - What's unclear: Best approach — add a `.blog-listing-item` class or use scoped `<style>` inside the page file?
   - Recommendation: Add a `.blog-listing-item` class to global.css and apply it to the `<a>` elements. Consistent with the `.feature-card` pattern.

---

## Environment Availability

Step 2.6: SKIPPED — Phase 8 is purely CSS and Astro component changes. No external CLI tools, databases, or services required. All work is within the existing Astro dev server (`npm run dev`) and build (`npm run build`) pipeline.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual visual verification (no automated test framework configured) |
| Config file | None |
| Quick run command | `npm run build && npm run preview` |
| Full suite command | `npm run build` (TypeScript type check is implicit) + manual visual checklist |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| UIPX-01 | Section vertical gaps 120–160px desktop, 64–80px mobile | Manual visual | Open dev server, measure with browser DevTools | N/A |
| UIPX-02 | Every CTA/button scales on hover and active | Manual visual | Hover each interactive element on desktop + tap on mobile | N/A |
| UIPX-03 | Feature cards and blog cards lift on hover | Manual visual | Hover over FeatureGrid cards and blog listing items | N/A |
| UIPX-04 | Noise texture visible on hero and site-wide | Manual visual | Open any page, zoom in on background to verify grain | N/A |
| UIPX-05 | Bento grid with Recovery Scoring as hero card | Manual visual | Load index.astro, verify 3-tier hierarchy at all breakpoints | N/A |
| UIPX-06 | Counters count up on scroll-into-view | Manual visual + reduced-motion check | Scroll to counter section; also test with `prefers-reduced-motion: reduce` in DevTools | N/A |

### Build Check (Mandatory)

```bash
npx tsc --noEmit
```

Run after each batch of 3–5 file changes per the incremental build verification rule in CLAUDE.md.

### Sampling Rate

- **Per task commit:** `npm run build` (verifies no Astro compilation errors)
- **Per wave merge:** Full visual checklist on `npm run preview` across mobile and desktop viewports
- **Phase gate:** All 6 success criteria verified manually before marking phase complete

### Wave 0 Gaps

None — no automated test framework is needed for visual CSS changes. The build itself validates Astro component syntax and TypeScript types.

---

## Security Domain

This phase makes no changes to authentication, session management, access control, cryptography, or data handling. All changes are presentational CSS and static component updates. No user input is processed. ASVS categories V2–V6 do not apply.

The only interactive JS added (counter animation, scroll observation) is read-only DOM manipulation with no user input surface.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `body::after` does not conflict with existing `body::before` usage | Noise Texture Pattern | If any existing code uses `body::after`, the noise texture would need a different host element (wrapper div or `html::after`) |
| A2 | CSS `feTurbulence` SVG filter renders correctly in Webkit/Safari for `background-image: url(data:...)` | Code Examples | Safari has historically had quirks with data-URI SVG filters in background-image; may need fallback |
| A3 | Extending the `is:inline` AnimationController script is the correct integration point for counter JS | Code Examples | If Astro 6 has restrictions on extending `is:inline` scripts, the counter JS may need its own `<script is:inline>` block in BaseLayout or StatsCounter |

---

## Sources

### Primary (HIGH confidence)

- Codebase inspection — `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/FeatureGrid.astro`, `src/components/Hero.astro`, `src/components/LandingCTA.astro`, `src/components/FeatureCTA.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/pages/index.astro`, `src/pages/blog/index.astro` [VERIFIED: Read tool]
- `.planning/phases/08-ui-ux-visual-depth/08-CONTEXT.md` — Locked implementation decisions [VERIFIED: Read tool]
- `.planning/phases/08-ui-ux-visual-depth/08-UI-SPEC.md` — Visual and interaction contract [VERIFIED: Read tool]
- `CLAUDE.md` (project) — Stack constraints, performance requirements [VERIFIED: Read tool]
- `.planning/REQUIREMENTS.md` — UIPX-01 through UIPX-06 definitions [VERIFIED: Read tool]

### Secondary (MEDIUM confidence)

- MDN Web Docs — CSS `feTurbulence`, `requestAnimationFrame`, `grid-template-areas`, `prefers-reduced-motion` [ASSUMED — well-established APIs, not re-verified in this session]
- CSS Grid `grid-template-areas` browser support — all modern browsers since 2017 [ASSUMED]

### Tertiary (LOW confidence)

None — all claims are either verified from the codebase or from well-established CSS/JS fundamentals.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies, all existing project patterns
- Architecture: HIGH — codebase fully inspected, patterns verified
- Pitfalls: HIGH — derived from direct inspection of existing code and established CSS/JS gotchas
- Counter animation pattern: MEDIUM — rAF pattern is standard but exact integration with AnimationController needs implementation verification (see A3)

**Research date:** 2026-05-13
**Valid until:** 2026-06-13 (stable CSS/browser APIs; Astro 6 patch releases unlikely to break these patterns)
