# Phase 2: Landing Page - Research

**Researched:** 2026-05-10
**Domain:** Astro static page composition — hero, feature grid, scroll animations, QR code, App Store badge
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Hero: centered layout, headline + subtitle above, device mockup below, App Store badge between them
- **D-02:** Device mockup: Dieter Rams aesthetic — honest, minimal, functional. Flat with thin border, minimal bezel. No shadow, no gradient, no reflection
- **D-03:** Headline differentiates Tuwa for serious athletes vs generic fitness trackers. Outcome-led or problem-led wording. Claude picks
- **D-04:** Feature cards: minimal — icon + title + one-line description per card. Teaser only
- **D-05:** 5 feature cards: Recovery Scoring, Workload Tracking, Smart Templates, Cold-Start Onboarding, Coaching. Each links to Phase 3 deep-dive pages
- **D-06:** Scroll animations: subtle, elegant, no dramatic motion. CSS + IntersectionObserver only. No JS animation framework
- **D-07:** Desktop visitors see both QR code (App Store link) and App Store badge together. Mobile sees badge only
- **D-08:** Page ends with reinforcing CTA section with App Store badge + QR code (desktop)

### Claude's Discretion

- Grid arrangement for 5 feature cards
- Which sections get scroll animations
- Hero headline wording (must differentiate for serious athletes)
- Device mockup exact CSS treatment (Dieter Rams aesthetic)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| LAND-01 | Hero section with outcome-led headline, app screenshot in device mockup, and App Store download badge | UI-SPEC Hero component spec, device mockup CSS pattern, App Store badge asset |
| LAND-02 | Feature overview grid with 5 cards linking to deep-dive pages | UI-SPEC FeatureGrid spec, 3-2-1 responsive grid pattern, 5th card centering |
| LAND-03 | Scroll-triggered fade-in animations (CSS + IntersectionObserver, no JS framework) | IntersectionObserver pattern, prefers-reduced-motion, is:inline script pattern from Phase 1 |
| LAND-04 | Final CTA section with App Store badge and reinforcing copy | UI-SPEC LandingCTA spec, badge + QR layout |
| LAND-05 | Desktop-aware App Store CTA (QR code or "Available on iPhone" for non-mobile) | QR code generation approach, Tailwind responsive hiding pattern |

</phase_requirements>

---

## Summary

Phase 2 converts `src/pages/index.astro` from a placeholder into the full Tuwa landing page. Phase 1 delivered `BaseLayout.astro`, `Header.astro`, `Footer.astro`, `SEO.astro`, and all design tokens in `global.css`. This phase adds three new Astro components (`Hero.astro`, `FeatureGrid.astro`, `LandingCTA.astro`) wired together in `index.astro`. All copy, visual specifications, spacing, and color contracts are locked in `02-UI-SPEC.md` — the planner should treat the UI-SPEC as ground truth and not derive design decisions independently.

The two technically interesting sub-problems are (1) the device mockup frame — pure CSS/SVG, no image asset, Dieter Rams aesthetic with a thin 1.5px stroke border radius matching iPhone 16 — and (2) the QR code — generated at build time as an SVG string using the `qrcode` npm package in an Astro component script block, embedded inline. Both can be handled without client-side JavaScript.

App screenshots exist at `~/Desktop/Tonus/appstore screenshots/6"7/` — four framed PNGs (Dashboard_framed, Recovery_framed, Workload_framed, ActiveWorkout_framed). The Dashboard or Recovery screenshot is the correct choice for the hero mockup. These files must be copied to `public/screenshots/` or `src/assets/` so Astro's `<Image>` component can process them.

**Primary recommendation:** Build three purpose-specific Astro components, generate QR code as inline SVG at build time, use the official Apple App Store badge SVG (dark variant) from Apple's marketing guidelines page, and copy the hero screenshot into the Astro assets pipeline.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Hero section layout | Browser/Static | — | Pure HTML + CSS, no server logic needed |
| Device mockup frame | Browser/Static | — | CSS-only frame, no image asset |
| App Store badge | Browser/Static | — | Static SVG from Apple official guidelines |
| QR code generation | Build Time (Astro script) | — | Generated once at build; embedded as inline SVG |
| Feature grid | Browser/Static | — | Static links to Phase 3 pages, no data fetching |
| Scroll animations | Browser/Static | — | CSS @keyframes + IntersectionObserver inline script |
| Responsive hiding (QR/badge) | Browser/Static | — | Tailwind responsive classes, no JS |
| Image optimization | Build Time (Astro Image) | — | `<Image>` component generates WebP/AVIF srcset |

---

## Standard Stack

### Core (already installed, no new deps required)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^6.3.1 | Component system, image optimization, page routing | Locked constraint |
| tailwindcss | ^4.3.0 | Responsive layout, utility classes | Locked constraint |
| @tailwindcss/vite | ^4.3.0 | Vite integration | Locked constraint |

[VERIFIED: package.json in codebase]

### New Dependency: QR Code Generation

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| qrcode | ^1.5.4 | Build-time QR code SVG generation | Lightweight, server-side capable (Node.js), generates SVG string, no client-side JS needed. Used in Astro component frontmatter at build time |

[VERIFIED: npm registry — version 1.5.4, published, description matches server-side use]

**Installation:**
```bash
npm install qrcode
# TypeScript types (optional but recommended)
npm install --save-dev @types/qrcode
```

### Alternatives Considered for QR Code

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| qrcode (server-side) | Pre-generated PNG image | PNG is simpler but not crisp at all sizes; SVG is resolution-independent and matches the minimal aesthetic |
| qrcode (server-side) | Client-side QR library in `<script>` | Adds client JS; violates project convention of no client frameworks; unnecessary since URL is static |
| qrcode (server-side) | lean-qr | lean-qr is also fine; qrcode has more weekly downloads and TypeScript types available |

### App Store Badge Asset

Apple's official badge SVG is available at:
`https://developer.apple.com/app-store/marketing/guidelines/`

Use the black badge variant (preferred per Apple guidelines for marketing communications). Download SVG and place at `public/badges/app-store-badge.svg`. Do NOT inline as base64 — treat as a static asset with an `<img>` tag for caching.

[CITED: developer.apple.com/app-store/marketing/guidelines/]

Guidelines require:
- Do not alter the artwork in any way
- Use only provided artwork (no custom badges)
- Gray border around black badge is part of the artwork — do not clip it

---

## Architecture Patterns

### System Architecture Diagram

```
index.astro
  └─► BaseLayout.astro (slot)
        ├─► Header.astro [built Phase 1]
        ├─► <main> slot:
        │     ├─► Hero.astro
        │     │     ├─► Headline + subtitle (static text)
        │     │     ├─► AppStoreBadge inline (or extracted component)
        │     │     ├─► QRCode block (desktop only, build-time SVG)
        │     │     └─► DeviceMockup (CSS frame + <Image> screenshot)
        │     ├─► FeatureGrid.astro
        │     │     └─► 5x FeatureCard (link, icon, category, title, desc)
        │     └─► LandingCTA.astro
        │           ├─► Closing headline + supporting copy
        │           ├─► AppStoreBadge (same pattern as hero)
        │           └─► QRCode block (same pattern as hero)
        └─► Footer.astro [built Phase 1]

Build-time data flow:
  screenshot PNG → Astro <Image> → WebP/AVIF srcset in HTML
  App Store URL → qrcode.toSvg() → inline SVG string → HTML
  global.css tokens → referenced via var(--token) throughout
```

### Recommended Project Structure

New files this phase creates:

```
src/
├── components/
│   ├── Hero.astro           # hero section (LAND-01)
│   ├── FeatureGrid.astro    # feature card grid (LAND-02)
│   └── LandingCTA.astro     # final CTA section (LAND-04, LAND-05)
├── pages/
│   └── index.astro          # replace placeholder with composed layout
public/
├── badges/
│   └── app-store-badge.svg  # official Apple badge (dark)
└── screenshots/
    └── dashboard.png         # or Recovery_framed.png — source for hero mockup
```

Optional: extract `AppStoreBadgeWithQR.astro` as a shared sub-component if the badge + QR block is used in both Hero and LandingCTA with identical markup.

---

### Pattern 1: Build-time QR Code as Inline SVG

**What:** In an Astro component frontmatter, call `qrcode.toString(url, {type: 'svg'})` synchronously at build time. Embed the resulting SVG string via `set:html`.

**When to use:** Any time you need a QR code on a static page without client-side JS.

```astro
---
// Source: qrcode npm package server-side API
import QRCode from 'qrcode';

const appStoreUrl = 'https://apps.apple.com/app/tuwa';
const qrSvg = await QRCode.toString(appStoreUrl, {
  type: 'svg',
  width: 120,
  margin: 0,
  color: {
    dark: '#1C1915',   // --color-text-1
    light: '#00000000' // transparent background
  }
});
---

<!-- Desktop only: hidden on mobile via Tailwind -->
<div class="hidden md:flex flex-col items-center gap-2">
  <div set:html={qrSvg} style="width: 120px; height: 120px;" aria-hidden="true" />
  <span style="font-size: var(--text-label); color: var(--color-text-2); letter-spacing: var(--tracking-label);">
    SCAN TO DOWNLOAD
  </span>
</div>
```

[VERIFIED: qrcode npm package v1.5.4 supports `toString()` with type 'svg' and color options]

**Pitfall:** `QRCode.toString()` is async — use `await` in the frontmatter (Astro frontmatter supports top-level await).

---

### Pattern 2: CSS-Only Device Mockup (Dieter Rams)

**What:** A `<div>` with carefully chosen border-radius, border stroke, and no decorative shadows replicates an honest iPhone outline. The screenshot fills the inner area via an absolutely-positioned `<Image>` component.

**When to use:** When you want an honest device frame without ornamental graphics, replica bezels, or image assets for the frame itself.

```astro
---
import { Image } from 'astro:assets';
import dashboardScreenshot from '../assets/screenshots/dashboard.png';
---

<div
  class="relative mx-auto"
  style="
    width: 280px;
    /* match iPhone 16 corner radius proportion */
    border-radius: 44px;
    border: 1.5px solid var(--color-divider);
    overflow: hidden;
    background-color: var(--color-bg);
    /* 4px inset handled by padding inside, or treat screenshot as content */
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

[ASSUMED] The exact CSS border-radius value (44px) approximates iPhone 16's physical screen radius proportionally for a 280px-wide container — this is a reasonable visual approximation, not a spec value. Adjust if the screenshot's rounded corners create visual misalignment with the outer frame.

Note on screenshot: The `_framed.png` screenshots from App Store Connect already include a device frame drawn in. If using these directly, the CSS-only border is additive and may look doubled. Two options:
1. Use an **unframed screenshot** (request from Xcode simulator export or Screen Recording) — then the CSS frame is the only frame
2. Use the **framed PNG as-is** with no CSS border (just use it as an image, no CSS wrapper frame)

The UI-SPEC calls for option 1 (CSS frame, screenshot inside). If only framed PNGs are available at implementation time, use option 2 as fallback — the framed screenshots already look clean.

---

### Pattern 3: Scroll Animations via IntersectionObserver

**What:** CSS `@keyframes` + `data-animate` attribute + `<script is:inline>` — same pattern as `MobileMenu.astro` from Phase 1. Respects `prefers-reduced-motion`.

**When to use:** Any section that should fade in on scroll. Per UI-SPEC: feature grid and final CTA section animate; hero does not (above the fold).

```astro
<!-- In global.css additions (or in a <style> tag in the component) -->
<style>
  @media (prefers-reduced-motion: no-preference) {
    [data-animate] {
      opacity: 0;
      transform: translateY(16px);
    }
    [data-animate].is-visible {
      animation: fade-up 400ms ease-out forwards;
    }
    @keyframes fade-up {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  /* Reduced motion: instant, no transform */
  @media (prefers-reduced-motion: reduce) {
    [data-animate] {
      opacity: 0;
      transition: opacity 200ms ease-out;
    }
    [data-animate].is-visible {
      opacity: 1;
    }
  }
</style>

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

Then add `data-animate` to the wrapping element of each animating section:
```html
<section data-animate>...</section>
```

[VERIFIED: IntersectionObserver is available in all modern browsers. `is:inline` script deduplication is established Phase 1 pattern — see MobileMenu.astro and Header.astro scroll shadow script]

---

### Pattern 4: Feature Grid with 5th Card Centering

**What:** A 3-column grid where the 5th card sits centered in the last row (columns 2 of 3 on desktop).

```astro
<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" role="list">
  <!-- Cards 1-4: fill rows normally -->
  {features.slice(0, 4).map(f => <FeatureCardItem {...f} />)}

  <!-- Card 5: centered on desktop — offset via col-start -->
  <li class="sm:col-start-1 md:col-start-2">
    <FeatureCardItem {...features[4]} />
  </li>
</ul>
```

On tablet (2-column): 5th card is in its own row, left-aligned. Acceptable for tablet viewport.
On desktop (3-column): 5th card uses `md:col-start-2` to land in the center column.

[ASSUMED] The `col-start-2` centering approach works with Tailwind v4 utility classes — Tailwind v4 still supports `col-start-*` utilities. Verify at implementation by inspecting the rendered grid.

---

### Pattern 5: Responsive Badge + QR Layout

**What:** On desktop, badge and QR code display horizontally. On mobile, QR code is hidden.

```astro
<div class="flex items-center gap-6">
  <!-- App Store badge — always visible -->
  <a href="https://apps.apple.com/app/tuwa" rel="noopener noreferrer" aria-label="Download Tuwa on the App Store">
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
    <div set:html={qrSvg} style="width: 120px; height: 120px; border: 1px solid var(--color-accent); border-radius: var(--radius-sm); padding: 4px;" />
    <span style="font-size: var(--text-label); color: var(--color-text-2); letter-spacing: var(--tracking-label);">SCAN TO DOWNLOAD</span>
  </div>
</div>
```

[VERIFIED: Tailwind v4 `hidden md:flex` responsive utility pattern — established in Header.astro (Phase 1) and FeatureGrid col-start]

---

### Anti-Patterns to Avoid

- **Double device frame:** Using `_framed.png` screenshots (which already have a drawn iPhone frame) inside a CSS-bordered container produces two overlapping frames. Use unframed screenshots for the CSS frame pattern, or remove the CSS border when using framed PNGs.
- **Accent overuse:** UI-SPEC strictly limits `--color-accent` to CTA buttons and QR border only. Feature card icons use accent fill per UI-SPEC, but hover states must NOT use accent color on cards.
- **Animating the hero:** The hero section is above the fold and must NOT have `data-animate`. The IntersectionObserver script must only target sections that are initially off-screen.
- **Client-side QR generation:** Do not generate QR codes in a `<script>` tag or Astro island. The URL is static — generate once at build time in frontmatter.
- **`@astrojs/tailwind` import:** This package is deprecated for Tailwind v4. Do not use it. The project uses `@tailwindcss/vite` correctly.
- **Defining design tokens twice:** All CSS custom properties are already in `global.css`. Do not redeclare them in component `<style>` blocks — reference via `var(--token)`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| QR code pixel matrix | Manual QR encoding algorithm | `qrcode` npm package | QR encoding (Reed-Solomon error correction, version selection, masking) is ~2000 lines of spec-compliant code |
| Image format conversion | Custom WebP conversion | Astro `<Image>` component with `format="webp"` | Sharp is already bundled; `<Image>` auto-generates srcset with WebP and AVIF |
| App Store badge design | Custom badge SVG | Official Apple badge from marketing guidelines | Apple guidelines prohibit custom badges; official SVG is already pixel-perfect |
| CSS grid centering math | Manual nth-child calculations | Tailwind `col-start-2` + `md:col-start-2` | CSS Grid `grid-column-start` handles this cleanly |

**Key insight:** The QR code is the only technical sub-problem that needs a new dependency. Everything else is pure CSS, Astro markup, and existing tooling.

---

## Common Pitfalls

### Pitfall 1: Framed Screenshots Doubled Frame

**What goes wrong:** The App Store screenshots at `~/Desktop/Tonus/appstore screenshots/6"7/` are `_framed.png` — they already contain a rendered iPhone device frame drawn by Apple's marketing tools. If placed inside a CSS `border-radius` container styled as a device mockup, they appear to have two frames.

**Why it happens:** The App Store marketing tool adds a photorealistic iPhone frame to screenshots for the App Store submission. These are not raw screenshots.

**How to avoid:** Two options:
1. **Preferred (UI-SPEC intent):** Export an unframed screenshot from the Xcode Simulator (Device > Screenshot) or from the iPhone (screenshot, then AirDrop). Use this raw screenshot inside the CSS device mockup frame.
2. **Acceptable fallback:** Use the existing `_framed.png` as a plain `<img>` with no CSS device frame wrapper. The Dieter Rams aesthetic is still achievable by keeping white space around the image and not adding decorative elements.

**Warning signs:** Visual doubling of corner radii, bezel-inside-bezel appearance.

---

### Pitfall 2: IntersectionObserver Fires on Hidden Elements

**What goes wrong:** If `opacity: 0` elements are inside a parent that is also `display: none` (e.g., during server-side render), IntersectionObserver may misfire.

**Why it happens:** Browsers handle intersection differently for elements with `opacity: 0` vs `visibility: hidden` vs `display: none`. With the `is:inline` pattern and `opacity: 0` as the initial state, this is generally safe — but test in Firefox and Safari.

**How to avoid:** Use the `opacity: 0` initial state (as specified in UI-SPEC), not `display: none`. The `data-animate` attribute approach is the established correct pattern.

---

### Pitfall 3: QR Code Points to Wrong URL

**What goes wrong:** Header.astro uses `https://apps.apple.com/app/tuwa` as a placeholder. The actual App Store URL is only available after the app is submitted and approved. If the app is not yet live on the App Store, the QR code and badge link lead to a 404.

**Why it happens:** The App Store URL requires a live app ID (e.g., `https://apps.apple.com/app/id1234567890`).

**How to avoid:** Confirm the actual App Store URL before Phase 2 is deployed. If the app is not yet live, use a placeholder URL for development and add a TODO comment. The QR code and badge links should both use the same URL constant, defined once (e.g., a constant in a `src/config.ts` file imported by Hero and LandingCTA).

**Warning signs:** Clicking the App Store badge or scanning QR code leads to "App not found" page.

---

### Pitfall 4: Astro `<Image>` Requires Import or `src/assets/`

**What goes wrong:** `<Image src="/screenshots/dashboard.png" />` fails or skips optimization if the file is in `public/` instead of `src/assets/`.

**Why it happens:** Astro's `<Image>` component processes images imported as modules (from `src/assets/`) through Sharp for WebP/AVIF generation and srcset. Files in `public/` are served as-is with no optimization.

**How to avoid:** Copy the screenshot to `src/assets/screenshots/dashboard.png` and import it in the component frontmatter:
```astro
import dashboardScreenshot from '../assets/screenshots/dashboard.png';
```
Then pass it to `<Image src={dashboardScreenshot} alt="..." />`.

---

### Pitfall 5: Feature Card Links to Non-Existent Phase 3 Routes

**What goes wrong:** Feature cards link to `/features/recovery-scoring`, `/features/workload-tracking`, etc. These routes don't exist until Phase 3. Clicking a card returns 404.

**Why it happens:** Phase 3 hasn't been built yet.

**How to avoid:** This is expected and acceptable — the links are forward declarations. No special handling needed. Do NOT use `href="#"` or JS `preventDefault`. The real routes will be created in Phase 3. Add a comment in FeatureGrid.astro: `{/* Links activate in Phase 3 */}`.

Optionally, add a visual "coming soon" treatment or simply let 404 pages handle it — the Cloudflare Pages default 404 is acceptable for development.

---

## Code Examples

### Astro `<Image>` for screenshot (WebP + srcset)

```astro
---
// Source: docs.astro.build/en/guides/images
import { Image } from 'astro:assets';
import screenshot from '../assets/screenshots/dashboard.png';
---
<Image
  src={screenshot}
  alt="Tuwa app showing today's recovery score of 82 — HRV in green zone, sleep 7.5 hours."
  width={280}
  format="webp"
  quality={90}
  loading="eager"
/>
```

`loading="eager"` is correct here — the hero image is above the fold and must not be lazy-loaded (would cause LCP regression).

### `index.astro` composition structure

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

### Defining the App Store URL constant

```typescript
// src/config.ts
// Single source of truth for the App Store URL
// Update this when the app is live on the App Store
export const APP_STORE_URL = 'https://apps.apple.com/app/id[APP_ID_HERE]';
```

Import in Hero.astro and LandingCTA.astro:
```astro
---
import { APP_STORE_URL } from '../config';
import QRCode from 'qrcode';
const qrSvg = await QRCode.toString(APP_STORE_URL, { type: 'svg', width: 120, margin: 0, color: { dark: '#1C1915', light: '#00000000' } });
---
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin in `vite.plugins` | Tailwind v4 (2025) | `@astrojs/tailwind` is deprecated for v4 — already using correct approach |
| `astro-seo` package | Custom 30-line `SEO.astro` component | Phase 1 decision | Less dependency risk; SEO.astro already built |
| Static QR PNG image | Build-time SVG via `qrcode` npm | Best practice for Astro | Resolution-independent, no extra image asset |
| Third-party animation lib (GSAP) | CSS + IntersectionObserver | Project decision (REQUIREMENTS.md) | 0KB, zero dependency, explicitly descoped |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build, `qrcode` npm | ✓ | >=22.12.0 (engines field) | — |
| Astro dev server | Development | ✓ | ^6.3.1 | — |
| App screenshots | Hero device mockup | Partial | `_framed.png` files at `~/Desktop/Tonus/appstore screenshots/6"7/` | Use framed PNG as plain `<img>` without CSS frame |
| App Store badge SVG | LAND-01, LAND-04 | Needs download | Download from Apple's marketing guidelines page | Use styled `<a>` button with text as interim |
| App Store URL (real) | QR code, badge links | Unknown | Not confirmed | Use placeholder URL with TODO comment |

**Missing dependencies with no fallback:**
- None blocking — all can be addressed during implementation

**Missing dependencies with fallback:**
- App Store URL: use `https://apps.apple.com/app/tuwa` as placeholder (same as Header.astro) until real URL confirmed
- Unframed screenshot: use `_framed.png` as fallback if unframed export is not available before Phase 2 begins

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `col-start-2` centering works with Tailwind v4 for 5th card | Pattern 4 | Grid layout looks wrong; fallback: use `justify-self-center` on the 5th `<li>` |
| A2 | iPhone 16 corner radius approximates to 44px at 280px mockup width | Pattern 2 | Minor visual mismatch; adjustable in CSS without code impact |
| A3 | `qrcode.toString()` with `type: 'svg'` produces clean SVG suitable for `set:html` injection | Pattern 1 | If SVG has XSS risk or malformed markup, use `qrcode.toDataURL()` and embed as `<img src>` |
| A4 | `_framed.png` screenshots at 6"7 size are the correct hero candidate | Common Pitfalls | If aspect ratio or content doesn't suit web presentation, need unframed export |
| A5 | App Store URL `https://apps.apple.com/app/tuwa` resolves to the Tuwa app | Pitfall 3 | URL may be wrong or app may not be live; placeholder is fine for development |

---

## Open Questions

1. **App Store URL**
   - What we know: Header.astro uses `https://apps.apple.com/app/tuwa` as placeholder
   - What's unclear: Is the Tuwa app live on the App Store? What is the real App Store ID?
   - Recommendation: Define `APP_STORE_URL` in `src/config.ts`. Use placeholder during development. The planner should create a task to confirm/update this value before the page goes live.

2. **Hero screenshot: framed vs unframed**
   - What we know: Only `_framed.png` files exist at `~/Desktop/Tonus/appstore screenshots/`
   - What's unclear: Are unframed screenshots available or exportable from the simulator?
   - Recommendation: Planner should include a task to export an unframed screenshot from Xcode Simulator. If unavailable by implementation time, use `Dashboard_framed.png` directly as a plain `<img>` without the CSS border frame (fallback path).

3. **Apple App Store badge SVG availability**
   - What we know: Apple hosts the official badge at their marketing guidelines page
   - What's unclear: Whether the badge needs to be downloaded manually or can be referenced directly
   - Recommendation: Download the badge SVG to `public/badges/app-store-badge.svg` in Wave 0 / setup task. Do not hotlink from Apple's servers.

---

## Project Constraints (from CLAUDE.md)

| Directive | Impact on Phase 2 |
|-----------|-------------------|
| Stack: Astro + Tailwind CSS + MDX, Cloudflare Pages | No new frameworks; all components are `.astro` files |
| No client-side JS frameworks | QR code must be generated at build time, not in a React/Vue island |
| CSS + IntersectionObserver for animations | No GSAP, no Motion, no animation library |
| `@tailwindcss/vite` in `vite.plugins`, NOT `integrations` | Already configured correctly in `astro.config.mjs` — do not change |
| No `@astrojs/cloudflare` adapter | Not applicable to Phase 2 (pure content page) |
| Font: Alpino via Astro Fonts API | Already in `BaseLayout.astro`, Phase 2 inherits automatically |
| Light mode only | No dark mode tokens, no `dark:` Tailwind variants |
| After every 3-5 files: run `npx tsc --noEmit` | Planner should include type-check tasks between implementation tasks |
| After generating/modifying files: verify build before moving on | Include `npm run build` verification step in plan |

---

## Sources

### Primary (HIGH confidence)
- `src/styles/global.css` — Design tokens (all verified from codebase)
- `.planning/phases/02-landing-page/02-UI-SPEC.md` — Full visual and copy contract
- `.planning/phases/02-landing-page/02-CONTEXT.md` — Locked decisions
- `src/components/Header.astro`, `Footer.astro`, `MobileMenu.astro`, `SEO.astro` — Established patterns from Phase 1
- `src/layouts/BaseLayout.astro` — Slot contract
- `package.json` — Installed dependencies and versions
- `astro.config.mjs` — Integration configuration
- `~/Desktop/Tonus/AppStoreMetadata.md` — Copy inspiration source

### Secondary (MEDIUM confidence)
- [Apple App Store Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) — Badge asset and usage rules
- [qrcode npm package](https://www.npmjs.com/package/qrcode) — v1.5.4, server-side SVG generation

### Tertiary (LOW confidence)
- WebSearch results on QR code approaches — general ecosystem patterns, not Astro-specific

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Phase 1 is complete, all decisions verified from codebase
- Architecture: HIGH — UI-SPEC is locked and fully detailed; component structure is straightforward
- QR code approach: HIGH — `qrcode` npm package verified against registry; build-time SVG pattern well-established
- Screenshot pitfall: MEDIUM — Based on observing the `_framed.png` files exist; actual visual check at implementation time is the real gate
- App Store URL: LOW — Placeholder URL in codebase; actual URL unconfirmed

**Research date:** 2026-05-10
**Valid until:** 2026-06-10 (stable tech stack, 30-day window)
