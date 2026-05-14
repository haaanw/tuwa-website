# Phase 8: UI/UX Visual Depth - Pattern Map

**Mapped:** 2026-05-13
**Files analyzed:** 9 (8 modified, 1 new)
**Analogs found:** 9 / 9

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/styles/global.css` | config/style | transform | `src/styles/global.css` (existing sections) | exact — extend in-place |
| `src/layouts/BaseLayout.astro` | layout | event-driven | `src/layouts/BaseLayout.astro` (existing AnimationController) | exact — extend in-place |
| `src/components/FeatureGrid.astro` | component | request-response | `src/components/FeatureGrid.astro` (existing) | exact — restructure in-place |
| `src/components/StatsCounter.astro` | component | event-driven | `src/components/LandingCTA.astro` | role-match (section with data-animate) |
| `src/components/Hero.astro` | component | request-response | `src/components/Hero.astro` (existing) | exact — update spacing + class |
| `src/components/LandingCTA.astro` | component | request-response | `src/components/LandingCTA.astro` (existing) | exact — update spacing + class |
| `src/components/FeatureCTA.astro` | component | request-response | `src/components/FeatureCTA.astro` (existing) | exact — add class |
| `src/components/Header.astro` | component | request-response | `src/components/Header.astro` (existing) | exact — add class |
| `src/components/Footer.astro` | component | request-response | `src/components/Footer.astro` (existing) | exact — update hover pattern |
| `src/pages/index.astro` | page | request-response | `src/pages/index.astro` (existing) | exact — add spacing + insert component |
| `src/pages/blog/index.astro` | page | CRUD | `src/pages/blog/index.astro` (existing) | exact — add hover class |

---

## Pattern Assignments

### `src/styles/global.css` (config/style, transform)

**Analog:** `src/styles/global.css` — extend `:root`, add new CSS classes, new keyframes.

**Existing `:root` token pattern** (lines 10-61) — copy this pattern for new tokens; only ADD, never redeclare existing vars:
```css
:root {
  /* Spacing Scale — 8px base, 4px micro for web */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  /* Border Radius — web softness (D-03) */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
}
```

**New tokens to add to `:root`:**
```css
/* Phase 8 additions — do NOT redeclare existing tokens above */
--space-section-desktop: 128px;
--space-section-mobile: 72px;
--shadow-card: 0 1px 3px rgba(28,25,21,0.06), 0 1px 2px rgba(28,25,21,0.04);
--shadow-card-hover: 0 8px 24px rgba(28,25,21,0.10), 0 2px 8px rgba(28,25,21,0.06);
--shadow-bento-hero: 0 12px 40px rgba(28,25,21,0.12), 0 4px 12px rgba(28,25,21,0.07);
--shadow-bento-hero-hover: 0 20px 60px rgba(28,25,21,0.14), 0 6px 18px rgba(28,25,21,0.09);
```

**Existing reduced-motion guard pattern** (lines 86-103) — all new transitions/animations MUST follow this exact wrapping:
```css
@media (prefers-reduced-motion: no-preference) {
  .js-enabled [data-animate] {
    opacity: 0;
    transform: translateY(16px);
  }
  .js-enabled [data-animate].is-visible {
    animation: fade-up 400ms ease-out forwards;
  }
  @keyframes fade-up {
    to { opacity: 1; transform: translateY(0); }
  }
}
@media (prefers-reduced-motion: reduce) {
  /* Intentionally empty */
}
```

**Existing `<style>` scoped pattern in FeatureGrid.astro** (lines 1-19 of FeatureGrid.astro) — the `.feature-card` class lives in a `<style>` block inside the component. Phase 8 MOVES the hover shadow logic to `global.css` and REPLACES the current `:hover` rule there. Pattern for global card class additions:
```css
/* Current in FeatureGrid.astro <style> block — migrate to global.css for Phase 8: */
.feature-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  /* Add in Phase 8: */
  box-shadow: var(--shadow-card);
}
@media (prefers-reduced-motion: no-preference) {
  .feature-card {
    transition: box-shadow 200ms ease-out;
  }
  .feature-card:hover,
  .feature-card:focus-visible {
    box-shadow: var(--shadow-card-hover);
    background-color: var(--color-surface-el);
  }
}
```

**New `.btn-cta` class — follows existing step-dot transition pattern** (lines 177-184):
```css
/* Existing pattern from .step-dot: */
@media (prefers-reduced-motion: no-preference) {
  .step-dot {
    transition: background 200ms ease-out;
  }
}
/* New .btn-cta follows same guard: */
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

**New `.section-spaced` responsive class:**
```css
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

**New noise texture — uses `body::after` pseudo-element. Existing `body::before` is used by `.device-frame::before` (lines 149-158), NOT `body::before`. Assumption A1 in RESEARCH.md: safe to use `body::after`:**
```css
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

**New bento grid CSS — add after existing `.sticky-showcase` grid (lines 186-213):**
```css
/* Bento grid — FeatureGrid Phase 8 */
.bento-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-xl);
  grid-template-areas:
    "recovery  recovery  workload"
    "recovery  recovery  templates"
    "cold-start cold-start coaching";
}
@media (min-width: 480px) and (max-width: 767px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "recovery  recovery"
      "workload  templates"
      "cold-start coaching";
  }
}
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

**New `.blog-listing-item` hover lift — same pattern as `.feature-card`:**
```css
.blog-listing-item {
  display: block;
  text-decoration: none;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}
@media (prefers-reduced-motion: no-preference) {
  .blog-listing-item {
    transition: box-shadow 200ms ease-out;
  }
  .blog-listing-item:hover,
  .blog-listing-item:focus-visible {
    box-shadow: var(--shadow-card-hover);
  }
}
```

---

### `src/layouts/BaseLayout.astro` (layout, event-driven)

**Analog:** `src/layouts/BaseLayout.astro` — extend the existing `<script is:inline>` AnimationController.

**Existing AnimationController pattern** (lines 36-60) — counter logic extends the `if (entry.isIntersecting)` branch:
```astro
<script is:inline>
  (function () {
    document.documentElement.classList.add('js-enabled');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
            // Phase 8: counter logic fires here when element becomes visible
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      var delay = el.getAttribute('data-animate-delay');
      if (delay) {
        el.style.animationDelay = delay;
      }
      observer.observe(el);
    });
  })();
</script>
```

**Counter extension pattern — add inside the IIFE, after the observer setup:**
```js
// Counter animation — add after observer.observe loop
var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var counters = document.querySelectorAll('[data-counter-target]');

counters.forEach(function(counter) {
  var target = parseInt(counter.getAttribute('data-counter-target'), 10);
  var suffix = counter.getAttribute('data-counter-suffix') || '';
  if (reducedMotion) {
    counter.textContent = target.toLocaleString() + suffix;
  }
});

// In the observer callback, after entry.target.classList.add('is-visible'):
// Check if this element contains counter children
var counterEls = entry.target.querySelectorAll('[data-counter-target]');
counterEls.forEach(function(counter) {
  if (reducedMotion) return; // Already set above
  var target = parseInt(counter.getAttribute('data-counter-target'), 10);
  var suffix = counter.getAttribute('data-counter-suffix') || '';
  var duration = 400;
  var start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = Math.min((timestamp - start) / duration, 1);
    counter.textContent = Math.floor(progress * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else counter.textContent = target.toLocaleString() + suffix;
  }
  requestAnimationFrame(step);
});
```

---

### `src/components/FeatureGrid.astro` (component, request-response)

**Analog:** `src/components/FeatureGrid.astro` (existing) — restructure in-place.

**Existing `<ul>` list pattern** (lines 42-126) — replace `<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">` with `<ul class="bento-grid">`. Each `<li>` gets a `style="grid-area: [name];"` attribute. Remove the old `class="md:col-start-2"` workaround on Card 5.

**Existing per-card `data-animate-delay` stagger pattern** (lines 45, 61, 79, 95, 111) — preserve these exact attributes, remapped to visual reading order:
```astro
<!-- Card 1: Recovery Scoring — hero card, grid-area: recovery -->
<li style="grid-area: recovery;" data-animate data-animate-delay="0ms">

<!-- Card 2: Workload Tracking — grid-area: workload -->
<li style="grid-area: workload;" data-animate data-animate-delay="100ms">

<!-- Card 3: Smart Templates — grid-area: templates -->
<li style="grid-area: templates;" data-animate data-animate-delay="200ms">

<!-- Card 4: Cold-Start — grid-area: cold-start -->
<li style="grid-area: cold-start;" data-animate data-animate-delay="300ms">

<!-- Card 5: Coaching — grid-area: coaching -->
<li style="grid-area: coaching;" data-animate data-animate-delay="400ms">
```

**Existing `<a class="feature-card">` pattern** (lines 49, 65, 83, 99, 115) — add `btn-cta` is NOT added here (cards are not buttons). The `.feature-card` class gets its hover shadow from `global.css`. Remove `transition-colors duration-150` Tailwind classes from the `<a>` tags since transition is now handled in `global.css`.

**Section spacing — current pattern to replace** (line 22):
```astro
<!-- Current: -->
<section style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
<!-- Replace with (spacing controlled by index.astro per UI-SPEC): -->
<section>
```
Per RESEARCH.md Pitfall 7: move spacing control to `index.astro`, strip from component.

**Scoped `<style>` block** (lines 1-19) — the `.feature-card` base styles move to `global.css`. Remove the `<style>` block entirely from `FeatureGrid.astro` after migrating.

---

### `src/components/StatsCounter.astro` (component, event-driven) — NEW FILE

**Analog:** `src/components/LandingCTA.astro` — closest existing section with `data-animate`, design token inline styles, and `mx-auto max-w-6xl px-6` layout wrapper.

**Section wrapper pattern from LandingCTA.astro** (lines 17-21):
```astro
<section
  data-animate
  style="background-color: var(--color-surface); border-top: 1px solid var(--color-divider);"
>
  <div class="mx-auto max-w-6xl px-6" style="padding-top: var(--space-2xl); padding-bottom: var(--space-2xl);">
```

**Inline style token pattern** (all components) — inline styles use `var(--token-name)` directly, no Tailwind for design-token properties:
```astro
style="font-size: var(--text-display); font-weight: 700; line-height: var(--leading-display); color: var(--color-text-1);"
```

**`tabular-nums` class** — already declared in `global.css` line 82. Use on counter `<span>` elements:
```astro
<span class="tabular-nums" data-counter-target="1200" data-counter-suffix="+">1,200+</span>
```

**Label pattern from FeatureGrid.astro** (line 54) — counter labels reuse this uppercase tracking style:
```astro
<span style="font-size: var(--text-label); color: var(--color-text-3); letter-spacing: var(--tracking-label); text-transform: uppercase;">Athletes using Tuwa</span>
```

**Full StatsCounter.astro structure (new file, no existing component):**
```astro
---
// No props — metrics are hardcoded per D-10
---
<section
  aria-label="Tuwa by the numbers"
  data-animate
  style="
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-divider);
    border-bottom: 1px solid var(--color-divider);
  "
>
  <div
    class="mx-auto max-w-6xl px-6"
    style="padding-top: var(--space-2xl); padding-bottom: var(--space-2xl); display: flex; justify-content: center; gap: var(--space-3xl); flex-wrap: wrap;"
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
    <div class="text-center">
      <span
        class="tabular-nums"
        data-counter-target="85000"
        data-counter-suffix="+"
        style="font-size: var(--text-display); font-weight: 700; line-height: var(--leading-display); color: var(--color-text-1);"
      >85,000+</span>
      <p style="font-size: var(--text-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-text-2); margin-top: var(--space-xs);">Training sessions logged</p>
    </div>
    <div class="text-center">
      <span
        class="tabular-nums"
        data-counter-target="94"
        data-counter-suffix="%"
        style="font-size: var(--text-display); font-weight: 700; line-height: var(--leading-display); color: var(--color-text-1);"
      >94%</span>
      <p style="font-size: var(--text-label); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--color-text-2); margin-top: var(--space-xs);">HRV accuracy rate</p>
    </div>
  </div>
</section>
```

---

### `src/components/Hero.astro` (component, request-response)

**Analog:** `src/components/Hero.astro` (existing) — update spacing token only.

**Current section spacing pattern** (line 8) — replace with `.section-spaced` class:
```astro
<!-- Current: -->
<section class="px-6" style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
<!-- After: -->
<section class="section-spaced px-6">
```

No CTA button in Hero — the download link is in LandingCTA. Hero has no interactive elements requiring `.btn-cta`. No other changes to Hero.

---

### `src/components/LandingCTA.astro` (component, request-response)

**Analog:** `src/components/LandingCTA.astro` (existing) — update spacing, add `.btn-cta` to badge link.

**Current spacing pattern** (line 21) — replace padding on inner div:
```astro
<!-- Current: -->
<div class="mx-auto max-w-6xl px-6" style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
<!-- After: -->
<div class="section-spaced mx-auto max-w-6xl px-6">
```

**App Store badge link** (lines 53-65) — add `btn-cta` class:
```astro
<!-- Current: -->
<a
  href={APP_STORE_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
>
<!-- After: -->
<a
  href={APP_STORE_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
  class="btn-cta inline-block"
>
```

---

### `src/components/FeatureCTA.astro` (component, request-response)

**Analog:** `src/components/FeatureCTA.astro` (existing) — same changes as LandingCTA.

**Current spacing pattern** (line 10):
```astro
<!-- Current: -->
<div class="mx-auto max-w-6xl px-6" style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
<!-- After: -->
<div class="section-spaced mx-auto max-w-6xl px-6">
```

**App Store badge link** (lines 41-49) — add `btn-cta` class:
```astro
<a
  href={APP_STORE_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
  class="btn-cta inline-block"
>
```

---

### `src/components/Header.astro` (component, request-response)

**Analog:** `src/components/Header.astro` (existing) — minimal change per RESEARCH.md Open Question 2.

**CTA button** (lines 77-94) — add `btn-cta` class only. The existing `onmouseover`/`onmouseout` set `backgroundColor` and `boxShadow` — these are different CSS properties from `transform` (which `.btn-cta` sets). Both work simultaneously without conflict:
```astro
<!-- Current (line 80-91): -->
<a
  href="https://apps.apple.com/app/tuwa"
  rel="noopener noreferrer"
  class="hidden md:inline-flex items-center transition-colors duration-100"
  ...
  onmouseover="this.style.backgroundColor='var(--color-accent-hover)';this.style.boxShadow='0 2px 8px rgba(43,82,64,0.20)'"
  onmouseout="this.style.backgroundColor='var(--color-accent)';this.style.boxShadow='none'"
>
<!-- After — add btn-cta to class, keep existing inline handlers: -->
<a
  href="https://apps.apple.com/app/tuwa"
  rel="noopener noreferrer"
  class="btn-cta hidden md:inline-flex items-center transition-colors duration-100"
  ...
  onmouseover="this.style.backgroundColor='var(--color-accent-hover)';this.style.boxShadow='0 2px 8px rgba(43,82,64,0.20)'"
  onmouseout="this.style.backgroundColor='var(--color-accent)';this.style.boxShadow='none'"
>
```

**Nav links with `onmouseover`** (lines 57-73) — D-06 requires hover states. These already have inline JS handlers setting `color`. No additional change required per RESEARCH.md Open Question 2 (minimal scope). The `.btn-cta` scale applies to the CTA button only.

---

### `src/components/Footer.astro` (component, request-response)

**Analog:** `src/components/Footer.astro` (existing) — update footer CTA button and link hover pattern.

**Existing footer link pattern** (lines 31-35) — currently uses `hover:underline` Tailwind class. Replace with color transition per D-06:
```astro
<!-- Current pattern: -->
<a href="/features/recovery-scoring" class="hover:underline" style="color: var(--color-text-2);">Recovery Scoring</a>
<!-- After — add nav-link class (defined in global.css): -->
<a href="/features/recovery-scoring" class="nav-link" style="color: var(--color-text-2);">Recovery Scoring</a>
```

**Footer "Get the App" CTA button** (lines 20-24) — add `btn-cta` class:
```astro
<!-- Current: -->
<a
  href="https://apps.apple.com/app/tuwa"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
  class="inline-flex items-center gap-2"
  style="background-color: var(--color-accent); color: var(--color-accent-fg); border-radius: var(--radius-md); padding: var(--space-sm) var(--space-md); font-weight: 600; text-decoration: none;"
>
<!-- After: -->
<a
  href="https://apps.apple.com/app/tuwa"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
  class="btn-cta inline-flex items-center gap-2"
  style="background-color: var(--color-accent); color: var(--color-accent-fg); border-radius: var(--radius-md); padding: var(--space-sm) var(--space-md); font-weight: 600; text-decoration: none;"
>
```

**New `.nav-link` class to add to `global.css`:**
```css
@media (prefers-reduced-motion: no-preference) {
  .nav-link {
    transition: color 100ms ease-out;
  }
}
.nav-link:hover {
  color: var(--color-accent);
}
```

---

### `src/pages/index.astro` (page, request-response)

**Analog:** `src/pages/index.astro` (existing) — add spacing classes, insert `StatsCounter`.

**Current pattern** (lines 1-14) — entire file. Component import block and section ordering:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import FeatureGrid from '../components/FeatureGrid.astro';
import LandingCTA from '../components/LandingCTA.astro';
---
<BaseLayout title="Tuwa" description="...">
  <Hero />
  <FeatureGrid />
  <LandingCTA />
</BaseLayout>
```

**After Phase 8 — add `StatsCounter` import and insert between `FeatureGrid` and `LandingCTA` (D-11):**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import FeatureGrid from '../components/FeatureGrid.astro';
import StatsCounter from '../components/StatsCounter.astro';
import LandingCTA from '../components/LandingCTA.astro';
---
<BaseLayout title="Tuwa" description="...">
  <Hero />
  <FeatureGrid />
  <StatsCounter />
  <LandingCTA />
</BaseLayout>
```

Note: Section spacing is applied within each component via the `.section-spaced` class (Hero, FeatureGrid). `index.astro` itself does not add wrapper padding around components — the components own their spacing.

---

### `src/pages/blog/index.astro` (page, CRUD)

**Analog:** `src/pages/blog/index.astro` (existing) — add `.blog-listing-item` class to listing links.

**Current blog listing link pattern** (lines 38-68) — the `<a>` inside each `<li>`:
```astro
<li style="border-top: 1px solid var(--color-divider); padding: var(--space-lg) 0;">
  <a href={`/blog/${post.id}`} style="text-decoration: none; display: block;">
```

**After — add class to `<a>` for hover lift (UIPX-03):**
```astro
<li style="border-top: 1px solid var(--color-divider); padding: var(--space-lg) 0;">
  <a href={`/blog/${post.id}`} class="blog-listing-item" style="display: block;">
```

Note: `text-decoration: none` moves to the `.blog-listing-item` class in `global.css`. This keeps inline styles clean.

---

## Shared Patterns

### Design Token Inline Styles
**Source:** All existing components (Hero.astro, LandingCTA.astro, FeatureGrid.astro, etc.)
**Apply to:** StatsCounter.astro and all modifications
```astro
style="font-size: var(--text-body); color: var(--color-text-2); margin-top: var(--space-xs);"
```
Rule: All sizing, color, and spacing values use `var(--token-name)`. Never hardcode px values that duplicate existing tokens. Tailwind utility classes are only used for layout (flex, grid, hidden, mx-auto, etc.).

### Reduced-Motion Guard
**Source:** `src/styles/global.css` lines 86-103, 108-141, 177-184
**Apply to:** All new CSS transitions and animations in `global.css`
```css
@media (prefers-reduced-motion: no-preference) {
  /* ALL transition and animation declarations go here */
}
```
No transition or animation CSS may exist outside this guard. This is the established project pattern without exception.

### `is:inline` Script Pattern
**Source:** `src/layouts/BaseLayout.astro` lines 36-60, `src/components/Header.astro` lines 117-160
**Apply to:** Counter animation logic extension in BaseLayout.astro
```astro
<script is:inline>
  (function () {
    // All browser-side JS in an IIFE
    // Uses var (not const/let) for IE-safe inline scripts
  })();
</script>
```
Counter logic extension must use `var` declarations and function-scoped patterns to match the existing AnimationController style exactly.

### `data-animate` Scroll Trigger
**Source:** `src/layouts/BaseLayout.astro` lines 50-58, `src/components/FeatureGrid.astro` lines 45-124
**Apply to:** StatsCounter.astro section wrapper
```astro
<!-- On the container element that should trigger IntersectionObserver: -->
<section data-animate>
  <!-- Children with data-counter-target are queried from within this element -->
  <span data-counter-target="1200" data-counter-suffix="+">1,200+</span>
</section>
```
The observer fires on `[data-animate]` elements at `threshold: 0.15`. The counter JS queries `data-counter-target` children from within the observed element when it becomes visible.

### Section Layout Wrapper
**Source:** All component sections (LandingCTA.astro line 21, FeatureGrid.astro line 24, FeatureCTA.astro line 10)
**Apply to:** StatsCounter.astro
```astro
<div class="mx-auto max-w-6xl px-6">
```
Max-width 6xl (72rem / 1152px), horizontal padding 24px (px-6), centered. This is the universal content wrapper across all full-width sections.

---

## No Analog Found

All files in Phase 8 have close analogs in the codebase. No files require falling back to RESEARCH.md patterns exclusively. The only net-new file (`StatsCounter.astro`) has a role-match analog in `LandingCTA.astro`.

---

## Metadata

**Analog search scope:** `src/components/`, `src/layouts/`, `src/pages/`, `src/styles/`
**Files read:** 11 (global.css, BaseLayout.astro, FeatureGrid.astro, Hero.astro, LandingCTA.astro, FeatureCTA.astro, Header.astro, Footer.astro, index.astro, blog/index.astro, 08-CONTEXT.md, 08-RESEARCH.md)
**Pattern extraction date:** 2026-05-13
