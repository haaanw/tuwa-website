# Phase 1: Foundation - Pattern Map

**Mapped:** 2026-05-10
**Files analyzed:** 8 new files to create, 2 files to modify
**Analogs found:** 0 / 8 (greenfield project — all patterns sourced from RESEARCH.md)

---

## Codebase State

This is a bare Astro 6.3.1 scaffold. The only existing source file is `src/pages/index.astro` (14 lines, default Astro placeholder). There are no components, layouts, styles, or utilities to draw analogs from. Every pattern in this phase is the first of its kind in the project.

**Consequence for planner:** All pattern assignments reference RESEARCH.md code examples as the primary source. Line numbers below reference RESEARCH.md sections, not source files.

---

## File Classification

| New / Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------------|------|-----------|----------------|---------------|
| `astro.config.mjs` (modify) | config | build-time transform | `astro.config.mjs` (current stub) | partial — same file, needs rewrite |
| `src/styles/global.css` (create) | config | static | none | no analog |
| `src/layouts/BaseLayout.astro` (create) | layout | request-response | none | no analog |
| `src/components/SEO.astro` (create) | component | request-response | none | no analog |
| `src/components/Header.astro` (create) | component | request-response | none | no analog |
| `src/components/MobileMenu.astro` (create) | component | event-driven | none | no analog |
| `src/components/Footer.astro` (create) | component | request-response | none | no analog |
| `src/pages/index.astro` (modify) | page | request-response | `src/pages/index.astro` (current stub) | partial — same file, needs rewrite |

---

## Pattern Assignments

### `astro.config.mjs` (config, build-time transform)

**Analog:** None in codebase. Pattern sourced from RESEARCH.md "Pattern 1: Tailwind v4 Setup in Astro" and "Pattern 2: Astro 6 Fonts API".

**Complete replacement pattern** (RESEARCH.md lines 183–198 + 244–265):

```javascript
// astro.config.mjs
// Source: tailwindcss.com/docs/installation/framework-guides/astro
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

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
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Critical constraints:**
- `tailwindcss()` goes in `vite.plugins`, NOT in `integrations` — putting it in `integrations` causes silent style failures (Pitfall 1)
- `site: "https://tuwa.app"` is required for `@astrojs/sitemap` to generate any URLs (Pitfall 2)
- Do NOT add `@astrojs/cloudflare` adapter — it conflicts with static output (Pitfall 5)
- Fonts API: if `fontProviders.fontshare()` fails to resolve "Alpino" at build time, fall back to manual `@font-face` (see `global.css` fallback pattern below)

---

### `src/styles/global.css` (config, static)

**Analog:** None in codebase. Pattern sourced from RESEARCH.md "Pattern 1" (lines 201–233).

**Complete file pattern:**

```css
/* src/styles/global.css */
/* Source: tailwindcss.com/docs/installation/framework-guides/astro */
@import "tailwindcss";

/* Design tokens as CSS custom properties */
/* Derived from app DESIGN.md, web-tuned per D-01 */
:root {
  /* Colors — travertine family, web-tuned */
  --color-bg:           #F4F1ED;
  --color-surface:      #EDEAE6;
  --color-surface-el:   #E4E0DB;
  --color-divider:      #CFCBC5;
  --color-text-1:       #1C1915;
  --color-text-2:       #696560;
  --color-text-3:       #AFABA5;

  /* Accent — deep forest green (D-02) */
  --color-accent:       #2B5240;
  --color-accent-hover: #1E3D2F;
  --color-accent-fg:    #F4F1ED;

  /* Brand warm accent */
  --color-brand-accent: #7A6E5C;
  --color-destructive:  #6E3A3A;

  /* Spacing scale — 8px base, 4px micro added for web (D-03) */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Border radius — web softness (D-03) */
  --radius-sm: 4px;
  --radius-md: 8px;

  /* Typography */
  --font-alpino: "Alpino", system-ui, sans-serif;
}

/* Base body styles */
body {
  font-family: var(--font-alpino);
  background-color: var(--color-bg);
  color: var(--color-text-1);
  -webkit-font-smoothing: antialiased;
}
```

**Fallback `@font-face` block** — use only if Astro Fonts API fails to resolve Alpino (Assumption A5 in RESEARCH.md):

```css
/* Add this block to global.css ONLY if fontProviders.fontshare() build fails */
/* Place woff2 files in public/fonts/ first */
@font-face {
  font-family: "Alpino";
  src: url("/fonts/AlpinoVariable.woff2") format("woff2-variations");
  font-weight: 400 600;
  font-style: normal;
  font-display: swap;
}
```

**Critical constraints:**
- Never hardcode hex color values in component files — always use `var(--color-*)` tokens
- `@import "tailwindcss"` (not `@tailwind base; @tailwind components; @tailwind utilities`) — v4 syntax
- No `@custom-variant dark` or dark mode rules — D-06 descopes dark mode entirely

---

### `src/layouts/BaseLayout.astro` (layout, request-response)

**Analog:** None in codebase. Pattern sourced from RESEARCH.md "Pattern 3: BaseLayout Component" (lines 300–335).

**Props interface and structure pattern:**

```astro
---
// src/layouts/BaseLayout.astro
import { Font } from "astro:assets";
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
    <!-- Font preload FIRST — before stylesheet — to reduce render-blocking (Pitfall 6) -->
    <Font cssVariable="--font-alpino" preload />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="generator" content={Astro.generator} />
    <SEO title={title} description={description} ogImage={ogImage} canonical={canonical} />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Critical constraints:**
- `<Font>` must appear before `<link rel="stylesheet">` (Pitfall 6 in RESEARCH.md)
- `<Font>` import is from `"astro:assets"` — this is the Astro 6 Fonts API built-in
- If using manual `@font-face` fallback instead of Fonts API, replace `<Font>` with a `<link rel="preload">` tag
- Body uses CSS token vars for background/color — do not hardcode hex here

---

### `src/components/SEO.astro` (component, request-response)

**Analog:** None in codebase. Pattern sourced from RESEARCH.md "Pattern 4: SEO Component" (lines 340–372).

**Complete component pattern** — keep under 30 lines, no external package:

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

**Critical constraints:**
- Use `Astro.url.href` for canonical default — not `import.meta.env.SITE` (State of the Art, RESEARCH.md)
- Place a static `public/og-default.png` fallback; dynamic OG generation is deferred to Phase 4
- This component renders into `<head>` via BaseLayout — no wrapping HTML element needed

---

### `src/components/Header.astro` (component, request-response)

**Analog:** None in codebase. Pattern sourced from RESEARCH.md "Pattern 5: Sticky Header" and "Pattern 6: MobileMenu Island" (lines 377–421).

**Nav links from D-04:** Features, Coaching, Blog, Support + "Get the App" CTA button.

**Structure pattern:**

```astro
---
// src/components/Header.astro
import MobileMenu from "./MobileMenu.astro";
---
<header
  class="sticky top-0 z-50 h-16 border-b"
  style="
    background-color: color-mix(in srgb, var(--color-surface) 95%, transparent);
    backdrop-filter: blur(8px);
    border-color: var(--color-divider);
  "
>
  <nav
    class="mx-auto flex h-full max-w-6xl items-center justify-between px-6"
    aria-label="Main navigation"
  >
    <!-- Logo / brand — use <a> or <span>, NOT <h1> (accessibility contract) -->
    <a href="/" aria-label="Tuwa home">
      <!-- logo SVG or wordmark -->
    </a>

    <!-- Desktop nav links (hidden on mobile) -->
    <ul class="hidden items-center gap-8 md:flex" role="list">
      <li><a href="/features">Features</a></li>
      <li><a href="/coaching">Coaching</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/support">Support</a></li>
    </ul>

    <!-- CTA button — accent color (D-02) -->
    <a
      href="https://apps.apple.com/app/tuwa"
      rel="noopener noreferrer"
      class="hidden md:inline-flex"
      style="
        background-color: var(--color-accent);
        color: var(--color-accent-fg);
        border-radius: var(--radius-md);
        padding: var(--space-sm) var(--space-md);
      "
    >
      Get the App
    </a>

    <!-- Mobile hamburger — triggers MobileMenu island -->
    <button
      id="menu-toggle"
      aria-expanded="false"
      aria-controls="mobile-menu"
      aria-label="Open navigation menu"
      class="md:hidden"
    >
      <!-- hamburger icon SVG (3 lines) -->
    </button>
  </nav>
</header>

<MobileMenu client:load />

<!-- Scroll shadow: add box-shadow when page scrolled past header -->
<script is:inline>
  const header = document.querySelector("header");
  const observer = new IntersectionObserver(
    ([entry]) => {
      header.style.boxShadow = entry.isIntersecting
        ? "none"
        : "0 1px 8px rgba(28,25,21,0.08)";
    },
    { threshold: 1 }
  );
  const sentinel = document.createElement("div");
  sentinel.style.height = "1px";
  document.body.prepend(sentinel);
  observer.observe(sentinel);
</script>
```

**Critical constraints:**
- Header logo must use `<a>` or `<span>`, not `<h1>` — `<h1>` appears once in the main content slot (RESEARCH.md accessibility contract)
- All external links (App Store) need `rel="noopener noreferrer"`
- `backdrop-filter: blur()` uses `color-mix()` for translucent bg — supported in all modern browsers since 2023 (Assumption A3)
- Desktop nav/CTA hidden on mobile (`md:hidden` / `hidden md:flex`) — MobileMenu island handles mobile
- `client:load` on MobileMenu (not `client:visible`) — hamburger is above the fold (Anti-Pattern in RESEARCH.md)

---

### `src/components/MobileMenu.astro` (component, event-driven)

**Analog:** None in codebase. Pattern sourced from RESEARCH.md "Pattern 6: MobileMenu Astro Island" (lines 403–425) and accessibility contract.

**Same nav links as Header:** Features, Coaching, Blog, Support + "Get the App" CTA.

**Structure and JS pattern:**

```astro
---
// src/components/MobileMenu.astro
// Rendered as Astro island via <MobileMenu client:load /> in Header.astro
---
<div
  id="mobile-menu"
  role="dialog"
  aria-modal="true"
  aria-label="Mobile navigation"
  aria-hidden="true"
  style="display: none;"
>
  <nav>
    <ul role="list">
      <li><a href="/features">Features</a></li>
      <li><a href="/coaching">Coaching</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/support">Support</a></li>
    </ul>
    <a href="https://apps.apple.com/app/tuwa" rel="noopener noreferrer">
      Get the App
    </a>
  </nav>
</div>

<script>
  const menu = document.getElementById("mobile-menu");
  const toggle = document.getElementById("menu-toggle");

  function openMenu() {
    menu.style.display = "block";
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    // Focus first focusable element
    const firstFocusable = menu.querySelector("a, button");
    firstFocusable?.focus();
    document.addEventListener("keydown", handleKeydown);
  }

  function closeMenu() {
    menu.style.display = "none";
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
    document.removeEventListener("keydown", handleKeydown);
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      closeMenu();
      return;
    }
    // Focus trap: keep Tab within menu
    if (e.key === "Tab") {
      const focusable = Array.from(menu.querySelectorAll("a, button"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  toggle?.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMenu() : openMenu();
  });
</script>
```

**Critical constraints:**
- Focus trap is required (Pitfall 4 in RESEARCH.md) — Tab must not escape the open overlay
- Escape key must close the menu and return focus to the hamburger button
- `aria-expanded` on the toggle button must be kept in sync with menu state
- `aria-hidden="true"` on the menu div when closed prevents screen readers from reaching hidden content
- This is an Astro island (`client:load`) — the `<script>` block runs in the browser

---

### `src/components/Footer.astro` (component, request-response)

**Analog:** None in codebase. Pattern sourced from RESEARCH.md architecture diagram and D-05.

**Column structure from D-05:** Product (Features, Coaching) | Resources (Blog, Support) | Legal (Privacy, Terms, copyright).

**Structure pattern:**

```astro
---
// src/components/Footer.astro
const year = new Date().getFullYear();
---
<footer
  style="
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-divider);
    color: var(--color-text-2);
  "
>
  <div class="mx-auto max-w-6xl px-6 py-12">
    <div class="grid grid-cols-2 gap-8 md:grid-cols-4">

      <!-- Brand column -->
      <div class="col-span-2 md:col-span-1">
        <!-- Logo / wordmark -->
        <!-- App Store badge (prominent, D-05) -->
        <a
          href="https://apps.apple.com/app/tuwa"
          rel="noopener noreferrer"
          aria-label="Download Tuwa on the App Store"
        >
          <!-- App Store badge SVG or img -->
        </a>
      </div>

      <!-- Product column -->
      <div>
        <p style="color: var(--color-text-1); font-weight: 600;">Product</p>
        <ul role="list">
          <li><a href="/features">Features</a></li>
          <li><a href="/coaching">Coaching</a></li>
        </ul>
      </div>

      <!-- Resources column -->
      <div>
        <p style="color: var(--color-text-1); font-weight: 600;">Resources</p>
        <ul role="list">
          <li><a href="/blog">Blog</a></li>
          <li><a href="/support">Support</a></li>
        </ul>
      </div>

      <!-- Legal column -->
      <div>
        <p style="color: var(--color-text-1); font-weight: 600;">Legal</p>
        <ul role="list">
          <li><a href="/privacy">Privacy</a></li>
          <li><a href="/terms">Terms</a></li>
        </ul>
      </div>
    </div>

    <!-- Copyright row -->
    <p style="margin-top: var(--space-2xl); color: var(--color-text-3);">
      © {year} Tuwa. All rights reserved.
    </p>
  </div>
</footer>
```

**Critical constraints:**
- App Store badge link needs `rel="noopener noreferrer"` (RESEARCH.md Security Domain)
- Pure HTML/CSS — no JavaScript, no islands
- Use CSS token vars for all colors — no hardcoded hex

---

### `src/pages/index.astro` (page, request-response)

**Analog:** Current stub at `src/pages/index.astro` (14 lines, default Astro placeholder). Rewrite to use BaseLayout.

**Minimal replacement pattern** — Phase 1 only establishes the shell; content arrives in Phase 2:

```astro
---
// src/pages/index.astro
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout
  title="Tuwa"
  description="Precision training load and recovery management for serious athletes and coaches."
>
  <!-- Phase 2 hero and content sections go here -->
  <div style="min-height: 60vh;" />
</BaseLayout>
```

**Critical constraints:**
- Must use `BaseLayout` — do not re-declare `<html>`, `<head>`, or `<body>` tags directly in page files
- `<h1>` for the page goes inside `<main>` (the slot) — not in Header

---

## Shared Patterns

### Token Usage Convention
**Apply to:** All component and page files
**Rule:** Never hardcode hex color values. Always reference CSS custom properties.

```css
/* Correct */
color: var(--color-text-1);
background-color: var(--color-accent);
border-radius: var(--radius-md);

/* Wrong — do not do this */
color: #1C1915;
background-color: #2B5240;
```

### External Link Safety
**Source:** RESEARCH.md Security Domain section
**Apply to:** All external links (App Store badges, any outbound URLs)

```html
<a href="https://apps.apple.com/app/tuwa" rel="noopener noreferrer">
  <!-- content -->
</a>
```

### Tailwind Utility + CSS Token Hybrid
**Apply to:** All component files
**Rule:** Use Tailwind utilities for layout/spacing primitives (`flex`, `grid`, `gap-*`, `px-*`, `hidden`, `md:flex`). Use inline `style` or `class` with CSS vars for brand colors, since Tailwind utilities cannot reference `var(--color-*)` tokens without CSS variable syntax.

```astro
<!-- Correct: layout via Tailwind, brand colors via CSS vars -->
<div class="flex items-center gap-4" style="color: var(--color-text-2);">

<!-- Also correct: Tailwind arbitrary value with CSS var -->
<div class="text-[var(--color-text-1)] bg-[var(--color-surface)]">
```

### Astro Frontmatter Convention
**Apply to:** All `.astro` files
**Rule:** Props interface declared in frontmatter using TypeScript `interface Props`. Destructure from `Astro.props`. Import statements at top of frontmatter block.

```astro
---
import SomeComponent from "../components/SomeComponent.astro";

interface Props {
  title: string;
  optional?: string;
}

const { title, optional = "default" } = Astro.props;
---
```

---

## No Analog Found

All 8 files in this phase have no close codebase match — this is a greenfield project.

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `astro.config.mjs` | config | build-time transform | Only a 5-line stub exists; needs complete rewrite |
| `src/styles/global.css` | config | static | No styles directory exists yet |
| `src/layouts/BaseLayout.astro` | layout | request-response | No layouts directory exists yet |
| `src/components/SEO.astro` | component | request-response | No components directory exists yet |
| `src/components/Header.astro` | component | request-response | No components directory exists yet |
| `src/components/MobileMenu.astro` | component | event-driven | No components directory exists yet |
| `src/components/Footer.astro` | component | request-response | No components directory exists yet |
| `src/pages/index.astro` | page | request-response | Current stub is default placeholder with no patterns to reuse |

**Planner guidance:** Use RESEARCH.md code examples (lines cited per assignment above) as the authoritative pattern source. All patterns in this document are derived from those examples plus locked decisions D-01 through D-08 from CONTEXT.md.

---

## Metadata

**Analog search scope:** `/Users/hanwen/Desktop/tuwa-website/src/` (entire project)
**Files scanned:** 1 source file (`src/pages/index.astro`), 3 config files (`astro.config.mjs`, `package.json`, `tsconfig.json`), 2 assets (`public/favicon.svg`, `public/favicon.ico`)
**Pattern extraction date:** 2026-05-10
**Pattern source:** RESEARCH.md (primary), CONTEXT.md decisions D-01 through D-08 (locked constraints)
