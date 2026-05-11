---
phase: 01-foundation
reviewed: 2026-05-10T00:00:00Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - astro.config.mjs
  - package.json
  - src/components/Footer.astro
  - src/components/Header.astro
  - src/components/MobileMenu.astro
  - src/components/SEO.astro
  - src/layouts/BaseLayout.astro
  - src/pages/index.astro
  - src/styles/global.css
findings:
  critical: 2
  warning: 4
  info: 3
  total: 9
status: issues_found
---

# Phase 01: Code Review Report

**Reviewed:** 2026-05-10
**Depth:** standard
**Files Reviewed:** 9
**Status:** issues_found

## Summary

Foundation scaffolding is solid: correct Tailwind v4 integration, proper Astro 6 patterns, clean design token system, and good accessibility fundamentals (focus rings, aria attributes, focus trap). Two critical issues require fixes before this code is production-worthy: the OG image URL is relative (social crawlers will silently fail), and Alpino font is being loaded from Fontshare's CDN rather than self-hosted as the project constraints require. Four warnings cover a null-dereference risk in the scroll-shadow script, a body-scroll-lock leak when mobile menu links are clicked, inline event handlers that are fragile and touch-incompatible, and placeholder App Store URLs that will 404. Three info items round out minor quality notes.

---

## Critical Issues

### CR-01: OG image URL is relative — social crawlers will not resolve it

**File:** `src/components/SEO.astro:24`
**Issue:** `og:image` defaults to `/og-default.png` — a relative path. The Open Graph specification and all major social crawlers (Twitter/X, Facebook, LinkedIn, Slack) require `og:image` to be an absolute URL with scheme and host. A relative URL will be silently ignored, meaning every shared link will render with no preview image.

**Fix:**
```astro
---
// Resolve the image to an absolute URL using the site origin
const siteOrigin = Astro.site?.origin ?? "https://tuwa.app";
const resolvedOgImage = ogImage?.startsWith("http")
  ? ogImage
  : `${siteOrigin}${ogImage ?? "/og-default.png"}`;
---
<meta property="og:image" content={resolvedOgImage} />
<meta name="twitter:image" content={resolvedOgImage} />
```

---

### CR-02: Alpino font loaded from Fontshare CDN — violates project self-hosting constraint

**File:** `astro.config.mjs:11`
**Issue:** `fontProviders.fontshare()` fetches Alpino from Fontshare's CDN at runtime/build time. The project's `CLAUDE.md` explicitly states: *"Alpino is from Fontshare (free commercial license) and must be self-hosted — there is no CDN URL. Place the font files in `public/fonts/`."* Using the CDN provider creates a runtime dependency on Fontshare's infrastructure. If their CDN is down or rate-limits the build, the font silently degrades to system-ui. It also means the font is not under the project's control.

**Fix:** Remove the `fonts` array from `astro.config.mjs` and self-host using `@font-face` in `global.css`:

```mjs
// astro.config.mjs — remove the fonts block entirely
export default defineConfig({
  site: "https://tuwa.app",
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* src/styles/global.css — add @font-face declarations */
@font-face {
  font-family: "Alpino";
  src: url("/fonts/Alpino-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Alpino";
  src: url("/fonts/Alpino-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```

```astro
<!-- src/layouts/BaseLayout.astro — replace <Font> with a preload link -->
<!-- Remove: <Font cssVariable="--font-alpino" preload /> -->
<link rel="preload" href="/fonts/Alpino-Regular.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/Alpino-SemiBold.woff2" as="font" type="font/woff2" crossorigin />
```

Place the `.woff2` files (downloaded from Fontshare) in `public/fonts/`.

---

## Warnings

### WR-01: Null dereference in scroll-shadow script — `header` is used without null check

**File:** `src/components/Header.astro:94-102`
**Issue:** `document.querySelector("header")` returns `HTMLElement | null`. The result is stored in `header` and then used directly at line 102 as `header.style.boxShadow = ...` inside the IntersectionObserver callback, with no null guard. If the selector ever fails to match — e.g. if the component is refactored and the element changes — this throws `TypeError: Cannot set properties of null`. The script is `is:inline` and runs in the browser, so TypeScript won't catch it.

**Fix:**
```js
const observer = new IntersectionObserver(
  ([entry]) => {
    if (header) {
      header.style.boxShadow = entry.isIntersecting
        ? "none"
        : "0 1px 0 var(--color-divider)";
    }
  },
  { threshold: 1 }
);
```

---

### WR-02: Body scroll lock leaks when user navigates via mobile menu links

**File:** `src/components/MobileMenu.astro:108`
**Issue:** `openMenu()` sets `document.body.style.overflow = "hidden"`. This is only restored in `closeMenu()`. If the user taps a nav link inside the open menu (e.g. `/features`), the link triggers a full page navigation without calling `closeMenu()`. On the next page, `document.body.style.overflow` will still be `"hidden"` — blocking all scrolling. For Astro's default full-page navigation this resolves on page load (styles reset), but if View Transitions are ever added, this becomes a real bug. It's worth fixing now before View Transitions land.

**Fix:** Add a `click` listener to each anchor in the menu that calls `closeMenu()` before navigation:
```js
// After the existing event listeners
menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});
```

---

### WR-03: Inline `onmouseover`/`onmouseout` event handlers are fragile and touch-incompatible

**File:** `src/components/Header.astro:30-48, 65-66`
**Issue:** Nav link hover states use `onmouseover`/`onmouseout` inline handlers that directly set `this.style.color`. These have three problems: (1) they do not fire on touch devices — on iOS/Android, hover is simulated only on tap, so users see a flash of the accent color then it resets; (2) the CSS variable name strings are hardcoded in HTML attributes — if the token names ever change, these won't be caught by tooling or search; (3) on the CTA button (line 65-66), the `onmouseout` handler resets `boxShadow` to `"none"` — but if the user mouseouts during the CSS transition, the box-shadow flicker may be visible.

**Fix:** Replace inline handlers with CSS. Since Tailwind v4 supports arbitrary values and CSS variables, this can be done purely in CSS without inline JS:
```astro
<!-- For nav links, use a CSS class instead -->
<a href="/features" class="nav-link">Features</a>
```
```css
/* global.css */
.nav-link {
  color: var(--color-text-1);
  text-decoration: none;
  transition: color 100ms;
}
.nav-link:hover {
  color: var(--color-accent);
}
```

---

### WR-04: App Store URLs are non-functional placeholders

**File:** `src/components/Footer.astro:16`, `src/components/Header.astro:53`, `src/components/MobileMenu.astro:77`
**Issue:** All three "Get the App" links point to `https://apps.apple.com/app/tuwa`. This URL does not include the required numeric App Store app ID (format: `/app/app-name/id1234567890`). Without the ID, Apple's URL scheme will either 404 or redirect to a search page, breaking the primary conversion CTA on every page.

**Fix:** Replace with the real App Store URL once the app is submitted. As a stopgap (before App Store approval), either disable the link or point it to a pre-launch waitlist:
```astro
href="https://apps.apple.com/app/tuwa/id<YOUR_APP_ID>"
```
Consider extracting this to a single constant to avoid the three-place update:
```astro
---
// src/lib/constants.ts
export const APP_STORE_URL = "https://apps.apple.com/app/tuwa/id1234567890";
---
```

---

## Info

### IN-01: `index.astro` h1 heading text is a placeholder that duplicates the logo

**File:** `src/pages/index.astro:10`
**Issue:** The `<h1>` reads "Tuwa" — identical to the logo link text in the header. When Phase 2 landing content arrives this will be replaced, but as currently deployed, visitors and screen readers see two instances of "Tuwa" as the primary heading, which is semantically awkward. The comment `<!-- Phase 2 landing page content goes here -->` confirms this is a placeholder.

**Fix:** No action needed until Phase 2. When filling in landing page content, the `<h1>` should contain the hero headline (e.g., "Train smarter. Recover better."), not the brand name.

---

### IN-02: `og:type` is hardcoded to `"website"` — blog posts will need `"article"`

**File:** `src/components/SEO.astro:27`
**Issue:** `og:type` is always `"website"`. Individual blog post pages should use `og:type = "article"` with additional `article:published_time`, `article:author` metadata for correct social card rendering and SEO signals.

**Fix:** Add an optional `ogType` prop:
```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  ogType?: "website" | "article";
}
const { ogType = "website" } = Astro.props;
---
<meta property="og:type" content={ogType} />
```

---

### IN-03: `<Font>` component import in BaseLayout will become dead import after CR-02 fix

**File:** `src/layouts/BaseLayout.astro:2`
**Issue:** `import { Font } from "astro:assets"` is used only for the Fontshare font loading pattern. Once CR-02 is resolved (self-hosting via `@font-face`), this import and the `<Font>` tag at line 22 should both be removed to keep the layout clean.

**Fix:** After applying CR-02, remove:
```astro
import { Font } from "astro:assets";  // line 2 — delete
// ...
<Font cssVariable="--font-alpino" preload />  // line 22 — replace with <link rel="preload">
```

---

_Reviewed: 2026-05-10_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
