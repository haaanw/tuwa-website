# Phase 2: Landing Page - Pattern Map

**Mapped:** 2026-05-10
**Files analyzed:** 5 new/modified files
**Analogs found:** 5 / 5

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/pages/index.astro` | page (composition root) | request-response | `src/pages/index.astro` (placeholder) + `src/layouts/BaseLayout.astro` | exact (extend placeholder) |
| `src/components/Hero.astro` | component | build-time transform (QR SVG) + static | `src/components/Header.astro` | role-match (Astro component, inline script, CSS tokens, responsive hiding) |
| `src/components/FeatureGrid.astro` | component | static | `src/components/Footer.astro` | role-match (CSS grid, token-based styles, list of linked items) |
| `src/components/LandingCTA.astro` | component | build-time transform (QR SVG) + static | `src/components/Header.astro` + `src/components/Footer.astro` | role-match (CTA button, App Store link, badge pattern) |
| `src/config.ts` | utility / config | static | `src/components/SEO.astro` (constants pattern) | partial-match (single source of truth constants) |

---

## Pattern Assignments

### `src/pages/index.astro` (page, static composition)

**Analog:** `src/pages/index.astro` (existing placeholder, lines 1-17) and `src/layouts/BaseLayout.astro` (lines 1-37)

**Current placeholder — what to replace** (lines 1-17 of `src/pages/index.astro`):
```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout
  title="Tuwa"
  description="Precision training load and recovery management for serious athletes and coaches."
>
  <!-- Phase 2 landing page content goes here -->
  <section class="mx-auto max-w-6xl px-6" style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl); min-height: 60vh;">
    <h1 style="font-size: var(--text-heading); font-weight: 600; letter-spacing: var(--tracking-heading); color: var(--color-text-1);">
      Tuwa
    </h1>
    <p style="margin-top: var(--space-md); color: var(--color-text-2); max-width: 48ch;">
      Precision training load and recovery management for serious athletes and coaches.
    </p>
  </section>
</BaseLayout>
```

**Composition pattern to use** (from RESEARCH.md Code Examples section):
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import FeatureGrid from '../components/FeatureGrid.astro';
import LandingCTA from '../components/LandingCTA.astro';
---
<BaseLayout
  title="Tuwa"
  description="Precision training load and recovery management for serious athletes and coaches."
>
  <Hero />
  <FeatureGrid />
  <LandingCTA />
</BaseLayout>
```

**Slot contract** (from `src/layouts/BaseLayout.astro` lines 29-36): content placed inside `<BaseLayout>` renders into `<main><slot /></main>`. No wrapping needed in `index.astro`.

---

### `src/components/Hero.astro` (component, build-time transform + static)

**Analog:** `src/components/Header.astro`

**Imports pattern** (from `Header.astro` lines 1-3 and `MobileMenu.astro` lines 97-98):
```astro
---
import { Image } from 'astro:assets';
import { APP_STORE_URL } from '../config';
import QRCode from 'qrcode';
import dashboardScreenshot from '../assets/screenshots/dashboard.png';

const qrSvg = await QRCode.toString(APP_STORE_URL, {
  type: 'svg',
  width: 120,
  margin: 0,
  color: {
    dark: '#1C1915',    // --color-text-1
    light: '#00000000'  // transparent background
  }
});
---
```

**Token reference pattern** (from `Header.astro` lines 56-65 — all styles use CSS custom properties, never hardcoded values):
```astro
style="
  background-color: var(--color-accent);
  color: var(--color-accent-fg);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-weight: 600;
  text-decoration: none;
  font-size: var(--text-body);
"
```

**Responsive hiding pattern** (from `Header.astro` lines 28 and 55 — Tailwind class pairs):
```astro
<!-- Desktop only -->
class="hidden md:flex ..."

<!-- Mobile only -->
class="flex md:hidden ..."
```

**Inline script pattern** (from `Header.astro` lines 92-110 — `is:inline` IIFE for browser JS):
```astro
<script is:inline>
  (function() {
    // browser JS here — runs synchronously, no module bundling
  })();
</script>
```

**Device mockup CSS** (no direct analog — use RESEARCH.md Pattern 2):
```astro
<div
  class="relative mx-auto"
  style="
    width: 280px;
    border-radius: 44px;
    border: 1.5px solid var(--color-divider);
    overflow: hidden;
    background-color: var(--color-bg);
  "
  role="img"
  aria-label="Tuwa app showing today's recovery score of 82 — HRV in green zone, sleep 7.5 hours."
>
  <Image
    src={dashboardScreenshot}
    alt=""
    width={280}
    quality={90}
    format="webp"
    loading="eager"
  />
</div>
```

**QR + badge horizontal layout** (adapts `Header.astro` flex + responsive pattern):
```astro
<div class="flex items-center gap-6">
  <!-- App Store badge — always visible -->
  <a href={APP_STORE_URL} rel="noopener noreferrer" aria-label="Download Tuwa on the App Store">
    <img
      src="/badges/app-store-badge.svg"
      alt="Download on the App Store"
      height="44"
      width="148"
      loading="eager"
    />
  </a>
  <!-- QR code + label — desktop only -->
  <div class="hidden md:flex flex-col items-center gap-1">
    <div set:html={qrSvg} style="width: 120px; height: 120px; border: 1px solid var(--color-accent); border-radius: var(--radius-sm); padding: 4px;" aria-hidden="true" />
    <span style="font-size: var(--text-label); color: var(--color-text-2); letter-spacing: var(--tracking-label);">SCAN TO DOWNLOAD</span>
  </div>
</div>
```

**Hover state pattern** (from `Header.astro` lines 65-66 — inline event handlers for non-island hover without JS framework):
```astro
onmouseover="this.style.backgroundColor='var(--color-accent-hover)';this.style.boxShadow='0 2px 8px rgba(43,82,64,0.20)'"
onmouseout="this.style.backgroundColor='var(--color-accent)';this.style.boxShadow='none'"
```

**Max-width centering pattern** (from `Header.astro` line 15 and `Footer.astro` line 5):
```astro
class="mx-auto max-w-6xl px-6"
```
For Hero, use `max-w-3xl` (768px) to create a centered, focused column per UI-SPEC.

---

### `src/components/FeatureGrid.astro` (component, static)

**Analog:** `src/components/Footer.astro`

**Grid layout pattern** (from `Footer.astro` lines 7-8 — CSS grid via Tailwind responsive classes):
```astro
<div class="grid grid-cols-2 gap-8 md:grid-cols-4">
```
Adapted for feature grid (3-column desktop, 2-column tablet, 1-column mobile):
```astro
<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" role="list">
```

**Link list pattern** (from `Footer.astro` lines 30-33 — `<ul role="list">` with `<a>` items):
```astro
<ul role="list" class="space-y-2" style="color: var(--color-text-2);">
  <li><a href="/features" class="hover:underline" style="color: var(--color-text-2);">Features</a></li>
</ul>
```
Feature cards use the same semantic structure but as card links, not text links.

**Card token usage** (all tokens from `global.css`):
```astro
<!-- Feature card: entire <a> is the interactive element -->
<a
  href="/features/recovery-scoring"
  class="block transition-colors duration-150"
  style="
    background-color: var(--color-surface);
    border: 1px solid var(--color-divider);
    border-radius: var(--radius-lg);
    padding: var(--space-md);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  "
  onmouseover="this.style.backgroundColor='var(--color-surface-el)'"
  onmouseout="this.style.backgroundColor='var(--color-surface)'"
>
  <!-- icon 24x24 inline SVG -->
  <!-- category label -->
  <span style="font-size: var(--text-label); color: var(--color-text-3); letter-spacing: var(--tracking-label); text-transform: uppercase;">Recovery</span>
  <!-- title -->
  <span style="font-size: var(--text-body); font-weight: 600; color: var(--color-text-1);">Recovery Scoring</span>
  <!-- one-line description -->
  <span style="font-size: var(--text-body); color: var(--color-text-2);">Know if today is a push day or a rest day.</span>
</a>
```

**5th card centering pattern** (from RESEARCH.md Pattern 4 — Tailwind `col-start`):
```astro
<!-- Cards 1-4 fill rows normally -->
<!-- Card 5: centered on desktop (middle column of 3) -->
<li class="md:col-start-2">
  <!-- FeatureCard for Coaching -->
</li>
```

**Inline SVG icon pattern** (from `Header.astro` lines 80-84 — inline SVG, no icon library):
```astro
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
  <line x1="3" y1="6" x2="21" y2="6" />
  ...
</svg>
```
For feature card icons, use `fill="var(--color-accent)"` per UI-SPEC (accent fill, not stroke).

**Scroll animation attachment** (feature grid gets `data-animate` per UI-SPEC):
```astro
<section data-animate>
  <ul class="grid ...">...</ul>
</section>
```

---

### `src/components/LandingCTA.astro` (component, build-time transform + static)

**Analog:** `src/components/Footer.astro` (section structure) + `src/components/Header.astro` (CTA button, QR pattern)

**Section background pattern** (from `Footer.astro` line 4 — surface color for visual break):
```astro
<section style="background-color: var(--color-surface); border-top: 1px solid var(--color-divider);">
  <div class="mx-auto max-w-6xl px-6" style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
```
LandingCTA uses same surface background and border-top for section break.

**CTA button pattern** (from `Header.astro` lines 52-69 — accent button with hover):
```astro
<a
  href={APP_STORE_URL}
  rel="noopener noreferrer"
  class="hidden md:inline-flex items-center transition-colors duration-100"
  style="
    background-color: var(--color-accent);
    color: var(--color-accent-fg);
    border-radius: var(--radius-md);
    padding: var(--space-sm) var(--space-md);
    font-weight: 600;
    text-decoration: none;
    font-size: var(--text-body);
  "
  onmouseover="this.style.backgroundColor='var(--color-accent-hover)'"
  onmouseout="this.style.backgroundColor='var(--color-accent)'"
>
  Get the App
</a>
```

**Imports pattern** (same as `Hero.astro` — QR generated identically):
```astro
---
import { APP_STORE_URL } from '../config';
import QRCode from 'qrcode';

const qrSvg = await QRCode.toString(APP_STORE_URL, {
  type: 'svg',
  width: 120,
  margin: 0,
  color: { dark: '#1C1915', light: '#00000000' }
});
---
```

**Centered column layout** (from `Footer.astro` + `index.astro` placeholder):
```astro
<div class="mx-auto text-center" style="max-width: 640px;">
  <h2 style="font-size: var(--text-heading); font-weight: 600; line-height: var(--leading-heading); letter-spacing: var(--tracking-heading); color: var(--color-text-1);">
    Train with precision.
  </h2>
  <p style="margin-top: var(--space-lg); color: var(--color-text-2);">
    Supporting copy here.
  </p>
  <div style="margin-top: var(--space-xl);">
    <!-- Badge + QR block (same pattern as Hero) -->
  </div>
</div>
```

**Scroll animation attachment** (LandingCTA gets `data-animate` per UI-SPEC):
```astro
<section data-animate style="background-color: var(--color-surface); ...">
```

---

### `src/config.ts` (utility/config, static)

**Analog:** `src/components/SEO.astro` (lines 16-19 — single constants defined once, referenced elsewhere)

**Constants pattern** (from `SEO.astro` lines 16-19):
```typescript
const siteName = "Tuwa";
const fullTitle = title === siteName ? title : `${title} — ${siteName}`;
const siteOrigin = Astro.site?.origin ?? "https://tuwa.app";
```
`config.ts` follows the same "define once, import everywhere" pattern:
```typescript
// src/config.ts
// Single source of truth for the App Store URL.
// Update when the app is live on the App Store.
export const APP_STORE_URL = 'https://apps.apple.com/app/tuwa';
```

---

## Shared Patterns

### CSS Token Reference (apply to ALL new components)
**Source:** `src/styles/global.css` (lines 9-61)
**Apply to:** `Hero.astro`, `FeatureGrid.astro`, `LandingCTA.astro`

Rule: Never hardcode color, spacing, font-size, or border-radius values. Always reference via `var(--token)`. Do NOT re-declare any token — they are already in `global.css` and inherited globally.

```css
/* Correct — always reference from global.css */
style="color: var(--color-text-1); font-size: var(--text-display);"

/* Wrong — never hardcode or re-declare */
style="color: #1C1915; font-size: 48px;"
```

---

### Responsive Hiding (apply to QR code block in Hero and LandingCTA)
**Source:** `src/components/Header.astro` (lines 28, 55)
**Apply to:** `Hero.astro`, `LandingCTA.astro` (QR code desktop-only block)

```astro
<!-- QR block: desktop only -->
<div class="hidden md:flex flex-col items-center gap-1">

<!-- Nav links: desktop only -->
<ul class="hidden items-center gap-8 md:flex">
```

---

### Inline Script Pattern (apply to scroll animation observer)
**Source:** `src/components/Header.astro` (lines 92-110) and `src/components/MobileMenu.astro` (lines 97-98)
**Apply to:** One of `FeatureGrid.astro` or `LandingCTA.astro` — add the IntersectionObserver `<script is:inline>` block once; it targets all `[data-animate]` elements on the page.

```astro
<script is:inline>
  (function () {
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
```

Scroll animation CSS should be added to `global.css` (not in component `<style>` blocks) to keep token declarations in one place:
```css
@media (prefers-reduced-motion: no-preference) {
  [data-animate] {
    opacity: 0;
    transform: translateY(16px);
  }
  [data-animate].is-visible {
    animation: fade-up 400ms ease-out forwards;
  }
  @keyframes fade-up {
    to { opacity: 1; transform: translateY(0); }
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-animate] { opacity: 0; transition: opacity 200ms ease-out; }
  [data-animate].is-visible { opacity: 1; }
}
```

---

### Hover State Pattern (apply to all interactive elements)
**Source:** `src/components/Header.astro` (lines 65-66), `src/components/MobileMenu.astro` (lines 75-90)
**Apply to:** Feature cards in `FeatureGrid.astro`, CTA buttons in `Hero.astro` and `LandingCTA.astro`

Since this project uses no client-side JS framework, hover states on styled elements use inline `onmouseover`/`onmouseout` handlers that toggle CSS variable references:
```astro
onmouseover="this.style.backgroundColor='var(--color-surface-el)'"
onmouseout="this.style.backgroundColor='var(--color-surface)'"
```
For CTA buttons:
```astro
onmouseover="this.style.backgroundColor='var(--color-accent-hover)';this.style.boxShadow='0 2px 8px rgba(43,82,64,0.20)'"
onmouseout="this.style.backgroundColor='var(--color-accent)';this.style.boxShadow='none'"
```

---

### Inline SVG Icons (apply to feature card icons)
**Source:** `src/components/Header.astro` (lines 80-84), `src/components/MobileMenu.astro` (lines 23-29)
**Apply to:** `FeatureGrid.astro` — one 24x24 inline SVG per card

No icon library. All icons are inline `<svg>` elements. Feature card icons use `fill="var(--color-accent)"` (not `stroke`) per UI-SPEC. The icon must be meaningful and relate to the feature category.

---

### App Store Link Constant (apply to all badge/QR references)
**Source:** `src/config.ts` (to be created)
**Apply to:** `Hero.astro`, `LandingCTA.astro`, (and `Header.astro` if updated later)

```astro
---
import { APP_STORE_URL } from '../config';
---
<a href={APP_STORE_URL} rel="noopener noreferrer">
```
The URL is used in three places: `Hero.astro` badge link, `Hero.astro` QR code generation, `LandingCTA.astro` badge link, `LandingCTA.astro` QR code generation. Always import from `src/config.ts`; never repeat the string literal.

---

### Max-Width Container (apply to all full-width sections)
**Source:** `src/components/Header.astro` (line 15), `src/components/Footer.astro` (line 5)
**Apply to:** All new sections in `Hero.astro`, `FeatureGrid.astro`, `LandingCTA.astro`

```astro
<!-- Standard page container -->
<div class="mx-auto max-w-6xl px-6">

<!-- Narrow centered column (Hero, LandingCTA) -->
<div class="mx-auto text-center" style="max-width: 768px;">  <!-- Hero -->
<div class="mx-auto text-center" style="max-width: 640px;">  <!-- LandingCTA -->
```

---

## No Analog Found

All files in this phase have meaningful analogs from Phase 1. No files require falling back to RESEARCH.md patterns exclusively — though `Hero.astro` (device mockup) and the QR code generation are new technical sub-problems with no prior codebase analog. These should follow the RESEARCH.md Pattern 1 (QR SVG) and Pattern 2 (CSS mockup) exactly.

| File | Role | Data Flow | Notes |
|------|------|-----------|-------|
| — | — | — | All files covered by analogs above |

Sub-problems with no codebase analog (use RESEARCH.md):
- Build-time QR SVG via `qrcode` npm — RESEARCH.md Pattern 1 (lines 181-213)
- CSS-only device mockup frame — RESEARCH.md Pattern 2 (lines 219-261)
- Scroll animation CSS + observer — RESEARCH.md Pattern 3 (lines 265-319)

---

## Metadata

**Analog search scope:** `src/components/`, `src/layouts/`, `src/pages/`, `src/styles/`
**Files scanned:** 6 (Header.astro, Footer.astro, MobileMenu.astro, SEO.astro, BaseLayout.astro, index.astro, global.css)
**Pattern extraction date:** 2026-05-10
