# Phase 1: Foundation - Research

**Researched:** 2026-05-10
**Domain:** Astro 6 + Tailwind v4 static site foundation — font loading, design tokens, navigation, SEO meta, Cloudflare Pages deployment
**Confidence:** HIGH

---

## Summary

Phase 1 establishes the complete technical foundation for the Tuwa marketing site: Astro 6 scaffold with Tailwind v4 design tokens, self-hosted Alpino font with no FOUT, a sticky responsive navigation header with mobile hamburger menu, a multi-column footer, and an SEO meta component. The project already has a bare Astro 6.3.1 scaffold with only `src/pages/index.astro` — zero dependencies beyond `astro` itself. All patterns in this phase are greenfield.

Dark mode has been **explicitly descoped** by D-06. FOUND-04 (dark/light switching) is cancelled. This eliminates the most complex FOUC-prevention work and reduces the component set (no ThemeToggle island needed). Light-mode-only implementation throughout.

The Astro 6 Fonts API (stable, added in astro@6.0.0) provides a first-party Fontshare provider that handles `@font-face` generation, preload hints, and fallback optimization automatically — strongly preferred over hand-writing `@font-face` declarations, which is the approach that risks FOUT and CLS regressions. Cloudflare Pages deployment for a static site requires no adapter; connect the GitHub repo in the dashboard with `npm run build` / `dist` settings.

**Primary recommendation:** Install the four missing packages in one shot (`tailwindcss @tailwindcss/vite @astrojs/mdx @astrojs/sitemap`), configure `astro.config.mjs` with Tailwind vite plugin + MDX + sitemap + Fonts API (Fontshare/Alpino), define all design tokens as CSS custom properties in `global.css`, then build the four components (BaseLayout, SEO, Header with MobileMenu island, Footer) in order.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Web tokens use the same warm travertine family as the app's DESIGN.md but are tuned for web rendering — not exact hex copies. Keep the vibe, adjust for screen context.
- **D-02:** Introduce a distinct contrasting accent color for web CTAs (App Store buttons, interactive elements) that complements the travertine palette but stands out. UI-SPEC resolved this as deep forest green `#2B5240`.
- **D-03:** Web styling uses subtle softness: small border-radius (4-8px), subtle shadows on cards. Clean and minimal but not the app's strict 0pt-radius/no-shadow rule.
- **D-04:** Header nav links: Features, Coaching, Blog, Support — plus a compact "Get the App" CTA button.
- **D-05:** Footer is multi-column: Product (Features, Coaching), Resources (Blog, Support), Legal (Privacy, Terms, ©). App Store badge prominent.
- **D-06:** Light mode only — no dark mode, no toggle. FOUND-04 is descoped. No system preference detection, no flash-prevention for dark mode needed.
- **D-07 (Claude's Discretion):** URL structure for feature pages. Recommendation from UI-SPEC: `/features/[slug]` for SEO grouping and namespace protection.
- **D-08 (Claude's Discretion):** Sticky vs scrolling header. Recommendation from UI-SPEC: sticky (position: sticky, top: 0) with backdrop-filter blur to keep CTA visible at all scroll depths.

### Claude's Discretion

- D-07: URL structure — `/features/[slug]` recommended
- D-08: Header stickiness — sticky recommended
- All other areas not explicitly discussed: follow standard Astro + marketing site conventions

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Site builds with Astro 6 + Tailwind v4, deploys to Cloudflare Pages at tuwa.app | Stack verified; Cloudflare Pages static deployment confirmed (no adapter needed) |
| FOUND-02 | Alpino font self-hosted, preload hints, no FOUT or CLS | Astro 6 Fonts API with Fontshare provider handles this; manual @font-face fallback documented |
| FOUND-03 | Design token system (colors, spacing, typography) in Tailwind config matching app palette with web extensions | Tailwind v4 CSS variable approach documented; UI-SPEC provides complete token set |
| FOUND-04 | **DESCOPED by D-06** — Dark mode removed from Phase 1 | N/A — light mode only |
| FOUND-05 | Base layout with SEO meta component (title, description, OG tags, canonical URL) | 30-line Astro component pattern documented; no external package needed |
| FOUND-06 | Responsive navigation header with mobile menu | Astro island (client:load) for MobileMenu; accessibility contract defined in UI-SPEC |
| FOUND-07 | Footer with nav links, legal links, App Store badge | Multi-column CSS grid; copywriting contract defined in UI-SPEC |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Font loading + FOUT prevention | Frontend Server (SSR/build) | Browser | `@font-face` + preload runs at build time / in `<head>` before paint |
| Design token system | Static / CDN | — | CSS custom properties in `global.css`, zero runtime cost |
| SEO meta tags | Frontend Server (build) | — | Static per-page `<meta>` in `<head>`, generated at Astro build time |
| Responsive nav (desktop) | Static | — | Pure HTML + CSS, no JS needed |
| Mobile hamburger menu | Browser (Astro island) | — | Requires JS for open/close toggle — scoped to `client:load` island |
| Footer | Static | — | Pure HTML + CSS |
| Cloudflare Pages deploy | CDN / Static | — | Git-connected, no adapter, no runtime |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | 6.3.1 (already installed) | Framework, routing, build | Already in project; current major |
| tailwindcss | 4.3.0 | Utility CSS + design tokens | v4 CSS-variable config aligns with DESIGN.md token approach |
| @tailwindcss/vite | 4.3.0 | Vite plugin required for Tailwind v4 in Astro | Required integration method; `@astrojs/tailwind` is deprecated for v4 |
| @astrojs/mdx | 5.0.4 | MDX rendering for blog (Phase 4) | First-party; configure now so Phase 4 has zero setup cost |
| @astrojs/sitemap | 3.7.2 | Auto-generates sitemap.xml at build time | First-party; requires `site` property in astro.config |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/typography | 0.5.19 | Prose styles for MDX blog | Phase 4 blog posts need typographic defaults; install now so it's available |

**Version verification:** All versions confirmed against npm registry on 2026-05-10. [VERIFIED: npm registry]

**Installation:**
```bash
npm install tailwindcss @tailwindcss/vite @astrojs/mdx @astrojs/sitemap @tailwindcss/typography
```

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Astro 6 Fonts API (Fontshare provider) | Manual @font-face in global.css | Manual approach works but requires hand-writing preload hints, fallback sizing, and format declarations — the Fonts API handles all of this and prevents CLS via automatic fallback optimization |
| @tailwindcss/vite | @astrojs/tailwind | @astrojs/tailwind is explicitly deprecated for Tailwind v4 — do not use |
| Custom SEO component | astro-seo package | CLAUDE.md explicitly recommends custom 30-line component; single-maintainer package adds unnecessary risk |
| Astro island for MobileMenu | Vanilla JS `<script>` tag | Island gives proper scoping; either is valid, but the island pattern is cleaner for an interactive component with state |

---

## Architecture Patterns

### System Architecture Diagram

```
Build time (Astro SSG)
─────────────────────────────────────────────────────
     astro.config.mjs
       │
       ├─ Tailwind vite plugin ──► global.css (design tokens → CSS vars)
       │
       ├─ Fonts API (Fontshare) ──► @font-face blocks + preload hints injected into <head>
       │
       ├─ MDX integration
       │
       └─ Sitemap integration ──► dist/sitemap-index.xml

     src/layouts/BaseLayout.astro
       │  <head>: font preload, SEO slot, global.css
       │  <body>: <Header> + <slot/> + <Footer>
       │
       ├─ src/components/SEO.astro  (props: title, description, ogImage, canonical)
       │     └─ emits <title>, <meta>, <og:*> tags
       │
       ├─ src/components/Header.astro
       │     ├─ desktop: nav links + CTA (pure HTML/CSS)
       │     └─ mobile: hamburger button + <MobileMenu client:load />
       │           └─ src/components/MobileMenu.astro (Astro island)
       │                 └─ JS: open/close toggle, focus trap, Escape key
       │
       └─ src/components/Footer.astro
             └─ 3-column grid + App Store badge (pure HTML/CSS)

     src/pages/index.astro  (uses BaseLayout)

Runtime (Cloudflare Pages CDN — static)
─────────────────────────────────────────────────────
     dist/  ──► Cloudflare global CDN
       ├─ index.html
       ├─ _astro/ (fonts cached, CSS, JS island bundle)
       └─ sitemap-index.xml
```

### Recommended Project Structure

```
src/
├── layouts/
│   └── BaseLayout.astro       # Wraps all pages; head + header + main slot + footer
├── components/
│   ├── SEO.astro              # Props-driven meta/OG tags
│   ├── Header.astro           # Sticky nav; desktop links + mobile hamburger
│   ├── MobileMenu.astro       # Astro island (client:load); overlay drawer
│   └── Footer.astro           # Multi-column footer with App Store badge
├── styles/
│   └── global.css             # @import "tailwindcss"; design tokens; @font-face fallback
└── pages/
    └── index.astro            # Landing page (content in Phase 2)

public/
├── fonts/                     # Alpino woff2 files (if using manual approach)
├── favicon.svg
└── favicon.ico
```

### Pattern 1: Tailwind v4 Setup in Astro

**What:** Vite plugin goes in `vite.plugins`, NOT in Astro's `integrations` array. CSS uses `@import "tailwindcss"` directive.
**When to use:** Always for Tailwind v4.

```javascript
// astro.config.mjs
// Source: https://tailwindcss.com/docs/installation/framework-guides/astro
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tuwa.app",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/installation/framework-guides/astro */
@import "tailwindcss";

/* Design tokens as CSS custom properties */
:root {
  /* Colors — tuned from app DESIGN.md light mode (UI-SPEC) */
  --color-bg:           #F4F1ED;
  --color-surface:      #EDEAE6;
  --color-surface-el:   #E4E0DB;
  --color-divider:      #CFCBC5;
  --color-text-1:       #1C1915;
  --color-text-2:       #696560;
  --color-text-3:       #AFABA5;
  --color-accent:       #2B5240;
  --color-accent-hover: #1E3D2F;
  --color-accent-fg:    #F4F1ED;
  --color-brand-accent: #7A6E5C;
  --color-destructive:  #6E3A3A;

  /* Spacing scale (8px base, web adds 4px micro) */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Typography */
  --font-alpino: "Alpino", system-ui, sans-serif;
}
```

[VERIFIED: tailwindcss.com/docs/installation/framework-guides/astro]

### Pattern 2: Astro 6 Fonts API (Fontshare — Alpino)

**What:** The Astro 6 Fonts API (stable, added in astro@6.0.0) provides a built-in Fontshare provider. It auto-generates `@font-face` rules, injects preload links, and creates optimized system font fallbacks to prevent CLS. This is the recommended approach over manual `@font-face`.

**When to use:** Use this for Alpino. The Fonts API handles FOUND-02 (no FOUT, no CLS) by design.

```javascript
// astro.config.mjs — Fonts API addition
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://tuwa.app",
  fonts: [
    {
      provider: fontProviders.fontshare(),
      name: "Alpino",
      cssVariable: "--font-alpino",
      weights: ["400", "600"],
      styles: ["normal"],
      display: "swap",
      fallbacks: ["system-ui", "sans-serif"],
      optimizedFallbacks: true,
    }
  ],
  // ... rest of config
});
```

In `global.css`, use the CSS variable:
```css
body {
  font-family: var(--font-alpino);
}
```

In `BaseLayout.astro`, add the `<Font>` component with preload:
```astro
---
import { Font } from "astro:assets";
---
<head>
  <Font cssVariable="--font-alpino" preload />
</head>
```

[CITED: docs.astro.build/en/guides/fonts/] [CITED: docs.astro.build/en/reference/font-provider-reference/]

**Fallback approach (if Fonts API has issues with Alpino):** Place woff2 files in `public/fonts/` and declare manually:
```css
@font-face {
  font-family: "Alpino";
  src: url("/fonts/AlpinoVariable.woff2") format("woff2-variations");
  font-weight: 400 600;
  font-style: normal;
  font-display: swap;
}
```
Add `<link rel="preload" as="font" type="font/woff2" href="/fonts/AlpinoVariable.woff2" crossorigin>` in `<head>`.

### Pattern 3: BaseLayout Component

**What:** Wraps all pages. Accepts `title`, `description`, `ogImage`, `canonical` props passed through to the SEO component.

```astro
---
// src/layouts/BaseLayout.astro
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import SEO from "../components/SEO.astro";
import "../styles/global.css";

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}
const { title, description, ogImage, canonical } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <SEO title={title} description={description} ogImage={ogImage} canonical={canonical} />
    {/* Font preload injected here by Fonts API or manually */}
  </head>
  <body style="background-color: var(--color-bg); color: var(--color-text-1);">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Pattern 4: SEO Component

**What:** Accepts page-specific props, outputs all required meta tags. Keep under 30 lines.

```astro
---
// src/components/SEO.astro
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}
const {
  title,
  description,
  ogImage = "/og-default.png",
  canonical = Astro.url.href,
} = Astro.props;
const siteName = "Tuwa";
const fullTitle = title === siteName ? title : `${title} — ${siteName}`;
---
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={canonical} />
<meta property="og:site_name" content={siteName} />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
```

[ASSUMED] — Pattern follows standard Astro component conventions; no official template for SEO component

### Pattern 5: Sticky Header with Backdrop Blur

**What:** Position sticky, z-index above content. Backdrop blur provides depth cue without violating D-03's web-flourishes allowance.

```astro
<!-- src/components/Header.astro (structure) -->
<header
  style="
    position: sticky;
    top: 0;
    z-index: 50;
    height: 64px;
    background-color: color-mix(in srgb, var(--color-surface) 95%, transparent);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--color-divider);
  "
>
  <nav aria-label="Main navigation">
    <!-- Logo left, nav links center-right, CTA rightmost -->
  </nav>
</header>
```

On scroll: header gains `box-shadow: 0 1px 0 var(--color-divider)` via IntersectionObserver or a scroll listener in an inline `<script is:inline>`.

### Pattern 6: MobileMenu Astro Island

**What:** The only interactive component in Phase 1 requiring JavaScript. Declared as `client:load` so it hydrates immediately (nav is above the fold on every page).

```astro
---
// src/components/Header.astro
import MobileMenu from "./MobileMenu.astro";
---
<!-- hamburger button — always visible on mobile -->
<button
  id="menu-toggle"
  aria-expanded="false"
  aria-controls="mobile-menu"
  class="md:hidden"
>
  <!-- hamburger icon SVG -->
</button>

<MobileMenu client:load />
```

The MobileMenu island must implement: focus trap when open, Escape key to close, `aria-expanded` toggle on the hamburger button, `aria-label="Mobile navigation"` on the nav element inside.

[ASSUMED] — Island implementation pattern follows Astro islands architecture; specific focus trap code is a greenfield decision

### Anti-Patterns to Avoid

- **Using `@astrojs/tailwind`:** Deprecated for Tailwind v4. Use `@tailwindcss/vite` in `vite.plugins` instead.
- **Using `@astrojs/cloudflare` adapter with static output:** CLAUDE.md explicitly flags this as causing deployment failures. Pure static site needs no adapter.
- **Hardcoding colors as hex literals in components:** Use CSS custom properties (`var(--color-accent)`) everywhere so the token system is the single source of truth.
- **Loading Alpino from a CDN URL:** Fontshare has no CDN URL — it must be self-hosted or fetched via the Astro Fonts API. Any CDN URL found elsewhere will be wrong.
- **Using `client:visible` for MobileMenu:** The hamburger is above the fold; `client:load` is correct so it's interactive immediately.
- **`<h1>` in the Header:** The UI-SPEC accessibility contract requires `<h1>` appears once per page in the main content slot. Header contains the logo/brand name but should use `<span>` or `<a>`, not `<h1>`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font FOUT/CLS prevention | Custom @font-face + manual preload sizing | Astro 6 Fonts API | Automatic fallback metric matching eliminates CLS; manual approach requires font-size-adjust math |
| Sitemap generation | Custom sitemap script | @astrojs/sitemap | Handles dynamic routes, respects `sitemap: false` frontmatter, outputs sitemap-index.xml |
| OG image generation (static PNG) | Satori at build time | Defer to Phase 4 (v2 requirement SEO-01) | Phase 1 only needs a default OG image fallback — place a static PNG in `public/` |

**Key insight:** The Astro Fonts API is the correct tool for FOUND-02. The most common FOUT mistake on marketing sites is implementing `@font-face` + `font-display: swap` without matching the fallback font metrics — this causes CLS even with swap. The Fonts API's `optimizedFallbacks: true` option solves this automatically.

---

## Common Pitfalls

### Pitfall 1: Tailwind Plugin in Wrong Config Location

**What goes wrong:** Developer adds `@tailwindcss/vite` to `integrations: []` instead of `vite.plugins`. Tailwind styles silently don't apply or apply inconsistently.
**Why it happens:** Tailwind v3 used `@astrojs/tailwind` in integrations; v4 changed the integration point.
**How to avoid:** Always put `tailwindcss()` in `vite: { plugins: [] }`, never in `integrations`.
**Warning signs:** No Tailwind utilities applying; no error thrown.

### Pitfall 2: Missing `site` Property for Sitemap

**What goes wrong:** `@astrojs/sitemap` silently generates no URLs or throws a build error.
**Why it happens:** The integration requires `site` in `astro.config.mjs` to know the base URL for absolute sitemap entries.
**How to avoid:** Set `site: "https://tuwa.app"` in `defineConfig`.
**Warning signs:** Build warning "sitemap: site property required"; empty sitemap output.

### Pitfall 3: Alpino Variable Font Format Mismatch

**What goes wrong:** Font loads on Chrome but not Safari, or vice versa. `font-weight` range fails.
**Why it happens:** Variable fonts use `format("woff2-variations")` but some CSS guides incorrectly show `format("woff2")`.
**How to avoid:** For variable font `@font-face`, use `format("woff2-variations")`. For fixed-weight files, use `format("woff2")`. The Astro Fonts API handles this automatically.
**Warning signs:** Font weight changes have no effect; font falls back to system font on some browsers.

### Pitfall 4: MobileMenu Focus Trap Missing

**What goes wrong:** Keyboard users can tab behind an open mobile menu to hidden nav items.
**Why it happens:** Focus trap logic (keeping Tab within the open overlay) is easy to forget on first implementation.
**How to avoid:** Use `focusable elements` query + `keydown` handler; see UI-SPEC accessibility contract.
**Warning signs:** Tab key escapes the mobile menu overlay; screen reader can reach content behind the menu.

### Pitfall 5: Cloudflare Pages Adapter Conflict

**What goes wrong:** Adding `@astrojs/cloudflare` adapter with `output: "static"` causes build errors or deployment failures.
**Why it happens:** The adapter is designed for SSR/edge functions, not static output.
**How to avoid:** Do not install `@astrojs/cloudflare` for a static site. CLAUDE.md flags this explicitly. Connect the repo in the Cloudflare Pages dashboard with build command `npm run build` and output directory `dist`.
**Warning signs:** Build errors mentioning adapter conflicts; deployment fails with module resolution errors.

### Pitfall 6: Fonts API `<Font>` Component in Wrong Position

**What goes wrong:** Preload hint appears after other resources in `<head>`, reducing its effectiveness.
**Why it happens:** Placing `<Font>` import after stylesheets or scripts.
**How to avoid:** Place `<Font cssVariable="--font-alpino" preload />` as early as possible in `<head>`, before `<link rel="stylesheet">` for global.css.
**Warning signs:** Lighthouse flags render-blocking font; LCP score degraded.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` with `darkMode: 'class'` | `@custom-variant dark` in CSS | Tailwind v4 (2025) | Config moved to CSS; no JS config file needed |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` in `vite.plugins` | Tailwind v4 / Astro 5.2+ | Old package deprecated — causes silent failures if used |
| `import.meta.env.SITE` for canonical | `Astro.url.href` | Astro 3+ | More reliable; respects request context |
| Third-party `astro-font` package | Astro 6 built-in Fonts API | Astro 6.0 (2025) | First-party; no extra package needed |
| `@astrojs/cloudflare` for Pages static | No adapter (dashboard config only) | Always true, frequently confused | Adapter only needed for SSR |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | ✓ | 24.7.0 | — |
| npm | Package management | ✓ | 11.5.1 | — |
| astro | Framework | ✓ | 6.3.1 (installed) | — |
| tailwindcss | Styling | ✗ (not yet installed) | — | Install: `npm install tailwindcss @tailwindcss/vite` |
| @tailwindcss/vite | Tailwind/Astro bridge | ✗ | — | Install same command |
| @astrojs/mdx | MDX blog (Phase 4) | ✗ | — | Install: `npm install @astrojs/mdx` |
| @astrojs/sitemap | Sitemap generation | ✗ | — | Install: `npm install @astrojs/sitemap` |
| @tailwindcss/typography | Blog prose styles | ✗ | — | Install: `npm install @tailwindcss/typography` |
| wrangler | Cloudflare CLI deploy | ✗ | not found | Not needed — use Cloudflare dashboard Git integration |
| Alpino font files | FOUND-02 | ✗ (not in project) | — | Download from fontshare.com; OR use Astro Fonts API (auto-downloads at build) |

**Missing dependencies with no fallback:**
- None — all missing deps have clear install commands or the Fonts API as an alternative.

**Missing dependencies with fallback:**
- Alpino font files: if using manual `@font-face`, files must be downloaded from Fontshare and placed in `public/fonts/`. If using Astro Fonts API, the build process fetches them automatically — no manual download needed.
- Wrangler: not needed for dashboard-connected deployments.

[VERIFIED: npm registry, environment probe 2026-05-10]

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | MobileMenu implemented as Astro island with `client:load` | Architecture Patterns | Low — `client:visible` or inline script are valid alternatives; island is cleaner |
| A2 | SEO component pattern (props → meta tags, ~30 lines) | Code Examples | Low — standard Astro pattern, no library needed |
| A3 | `color-mix(in srgb, ...)` for translucent header supported in target browsers | Architecture Patterns | Low — supported in all modern browsers since 2023; Cloudflare Pages serves globally |
| A4 | Alpino available as variable font from Fontshare (weight range 400–600) | Standard Stack | MEDIUM — Fontshare page requires JS; variable font availability unconfirmed. Fallback: use fixed-weight woff2 files for 400 and 600 separately |
| A5 | `fontProviders.fontshare()` resolves "Alpino" by that exact name | Standard Stack | MEDIUM — Font name in Fontshare API may differ from display name. Test at Wave 0: if Fonts API fails to resolve, fall back to manual `@font-face` |

---

## Open Questions

1. **Alpino exact font file format from Fontshare**
   - What we know: Fontshare offers Alpino; Astro 6 has a built-in Fontshare provider; UI-SPEC expects `AlpinoVariable.woff2`
   - What's unclear: Whether Fontshare serves a variable font or only fixed-weight files; the exact slug/name the Fonts API requires
   - Recommendation: Attempt `fontProviders.fontshare()` with `name: "Alpino"` first; if build fails, download the font package from fontshare.com manually and use `@font-face` with files in `public/fonts/`

2. **Astro Fonts API caching behavior in Cloudflare Pages CI**
   - What we know: Fonts API caches to `.astro/fonts` in dev; fetches at build time
   - What's unclear: Whether Cloudflare Pages build CI preserves the `.astro/` cache between deploys (relevant for build speed, not correctness)
   - Recommendation: Not a blocker; first deploy will fetch fresh; subsequent deploys depend on CF cache configuration

---

## Validation Architecture

`nyquist_validation` is `false` in `.planning/config.json`. This section is skipped per configuration.

---

## Security Domain

This phase has no authentication, no form submissions, no user data, and no API calls. The only security-relevant consideration is:

- **Content Security Policy (CSP):** The Fonts API fetches fonts at build time, so no external font CDN requests occur at runtime. Inline `<script is:inline>` tags for the mobile menu JS are present — any future CSP header should allow `'unsafe-inline'` scripts or use nonces. Defer CSP header configuration to Cloudflare Pages settings (not in scope for Phase 1).
- **`rel="noopener noreferrer"`:** All external links (App Store badge) should include this attribute. Document as a convention.

No ASVS categories apply materially to a static marketing site foundation with no user input.

---

## Sources

### Primary (HIGH confidence)
- [tailwindcss.com/docs/installation/framework-guides/astro](https://tailwindcss.com/docs/installation/framework-guides/astro) — Tailwind v4 vite plugin setup, astro.config.mjs pattern
- [tailwindcss.com/docs/dark-mode](https://tailwindcss.com/docs/dark-mode) — `@custom-variant` dark mode config (noted but not used — D-06 descopes dark mode)
- [docs.astro.build/en/guides/fonts/](https://docs.astro.build/en/guides/fonts/) — Fonts API, Fontshare provider, preload, CLS prevention
- [docs.astro.build/en/reference/font-provider-reference/](https://docs.astro.build/en/reference/font-provider-reference/) — Fontshare provider stable in Astro 6.0.0
- [developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) — No adapter for static sites; build command `npm run build`, output `dist`
- [docs.astro.build/en/guides/integrations-guide/sitemap/](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — `site` property required for sitemap
- npm registry probe (2026-05-10) — package versions: tailwindcss 4.3.0, @tailwindcss/vite 4.3.0, @astrojs/mdx 5.0.4, @astrojs/sitemap 3.7.2, @tailwindcss/typography 0.5.19

### Secondary (MEDIUM confidence)
- DESIGN.md (app design system) — color tokens, spacing scale, typography scale; web tokens derive from these per D-01
- 01-UI-SPEC.md — Complete visual/interaction contract: exact hex values, spacing values, component inventory, accessibility contract, motion contract, copywriting contract

### Tertiary (LOW confidence / ASSUMED)
- SEO component pattern (A2): Standard Astro convention, no official Astro template for this exact component

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all package versions verified against npm registry; Tailwind/Astro integration verified against official docs
- Architecture: HIGH — component structure follows established Astro conventions; tier assignments are unambiguous for a static marketing site
- Font loading: MEDIUM — Astro Fonts API approach verified; Alpino-specific resolution via Fontshare provider is ASSUMED (A4, A5)
- Cloudflare deployment: HIGH — no-adapter pattern confirmed against official Cloudflare Pages + Astro docs
- Pitfalls: HIGH — each pitfall verified against official docs or known common errors in the stack

**Research date:** 2026-05-10
**Valid until:** 2026-06-10 (Tailwind v4 and Astro 6 are stable; check for minor version updates before execution)
