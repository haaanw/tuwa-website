---
phase: 01-foundation
verified: 2026-05-10T18:33:00Z
status: gaps_found
score: 3/5
overrides_applied: 0
gaps:
  - truth: "Dark mode and light mode both render correctly with system preference auto-detection and a manual toggle that persists across page loads"
    status: failed
    reason: "Dark mode was explicitly descoped by planning decision D-06 in 01-CONTEXT.md. No dark mode CSS, no prefers-color-scheme detection, no toggle component, and no flash-prevention logic exists anywhere in the codebase. The ROADMAP success criterion requires this feature but the planning context explicitly removed it from scope. A developer decision is required: either implement dark mode to satisfy SC-3, or add an override to ROADMAP.md and REQUIREMENTS.md acknowledging FOUND-04 is descoped."
    artifacts:
      - path: "src/styles/global.css"
        issue: "Comment explicitly states 'Light mode only — D-06 descopes dark mode entirely'. No @custom-variant dark, no prefers-color-scheme media query, no CSS variable variants for dark theme."
      - path: "src/components/Header.astro"
        issue: "No theme toggle button. No dark mode awareness."
      - path: "src/layouts/BaseLayout.astro"
        issue: "No flash-prevention script (the kind that reads localStorage before paint to apply theme class)."
    missing:
      - "Dark mode CSS custom property variants (either @custom-variant dark or prefers-color-scheme media query)"
      - "Manual theme toggle component with localStorage persistence"
      - "Flash-prevention inline script in BaseLayout head"
      - "OR: explicit override in ROADMAP.md descoping FOUND-04 and SC-3"
  - truth: "Pages built on the base layout have correct title, description, OG tags, and canonical URL in their HTML source"
    status: partial
    reason: "Title, description, OG title/description/url/site_name/type, Twitter card, and canonical URL are all present and correct in built HTML. However og:image and twitter:image use the relative path '/og-default.png' — social crawlers (Twitter/X, Facebook, LinkedIn, Slack) require an absolute URL with scheme and host. The Open Graph spec mandates absolute URLs for og:image. This is documented as CR-01 in 01-REVIEW.md."
    artifacts:
      - path: "src/components/SEO.astro"
        issue: "Line 12: ogImage defaults to '/og-default.png' (relative). Line 24: og:image renders the relative value directly. Line 31: twitter:image same issue. No absolute URL resolution using Astro.site.origin."
    missing:
      - "Absolute URL resolution for og:image: const siteOrigin = Astro.site?.origin ?? 'https://tuwa.app'; const resolvedOgImage = ogImage?.startsWith('http') ? ogImage : `${siteOrigin}${ogImage ?? '/og-default.png'}`;"
      - "Apply resolvedOgImage to both og:image and twitter:image meta tags"
human_verification:
  - test: "Alpino font renders with no visible FOUT"
    expected: "Page text renders in Alpino geometric sans-serif on first load, with no flash from system-ui fallback to Alpino (or a flash so brief it's imperceptible due to the optimized fallback metrics)"
    why_human: "The built HTML contains @font-face with optimizedFallbacks=true (size-adjust: 85.6885%, ascent-override: 108.5327%) which reduces CLS. Preload link is present. But actual visual FOUT depends on font cache state, connection speed, and browser rendering — cannot verify programmatically."
  - test: "Mobile hamburger menu is accessible and focus trap works"
    expected: "Tapping hamburger opens full-screen menu. Tab key cycles only within menu. Escape closes menu and returns focus to hamburger. Scroll behind menu is locked."
    why_human: "Focus trap and keyboard behavior requires interactive browser testing — cannot verify with static file analysis."
  - test: "Cloudflare Pages deployment at tuwa.app renders correctly"
    expected: "https://tuwa.app/ loads the site with header, content, footer, Alpino font, and correct SEO tags in source"
    why_human: "Cannot verify external deployment state programmatically. Requires browser access to the live URL."
---

# Phase 1: Foundation — Verification Report

**Phase Goal:** A deployed, functional Astro site with design system and base layout ready for content pages
**Verified:** 2026-05-10T18:33:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Site builds with Astro 6 + Tailwind v4 and deploys to Cloudflare Pages at tuwa.app with no errors | VERIFIED | `npx astro build` exits 0 in 740ms. Astro 6.3.1 + Tailwind 4.3.0. `dist/index.html` (11.8KB) and `sitemap-index.xml` generated. Vite pinned to 6.4.2 to fix rolldown compat issue. |
| 2 | Alpino font loads on first visit with no flash of unstyled text and no CLS | VERIFIED (human needed) | Fonts API bundles Alpino in `dist/_astro/fonts/33469d43990388fc.woff2` (23.5KB). HTML has `<link rel="preload">` before viewport meta. Astro generates optimized fallback `@font-face` (size-adjust: 85.6885%) to minimize CLS. Cannot verify visual FOUT without browser. |
| 3 | Dark mode and light mode both render correctly with system preference auto-detection and a manual toggle | FAILED | Dark mode explicitly descoped by D-06. `global.css` comment: "Light mode only — D-06 descopes dark mode entirely." No `@custom-variant dark`, no `prefers-color-scheme`, no toggle, no flash-prevention script anywhere. |
| 4 | Responsive navigation header works on mobile (hamburger menu) and desktop, with footer visible on every page | VERIFIED | Header: `sticky top-0 z-50`, `backdrop-filter: blur(8px)`, hamburger with `aria-expanded`, `aria-controls="mobile-menu"`. MobileMenu: `role="dialog"`, `aria-modal="true"`, focus trap (Tab wrapping), Escape key handler, body scroll lock. Footer on every page via BaseLayout. |
| 5 | Pages built on the base layout have correct title, description, OG tags, and canonical URL in HTML source | PARTIAL | Built `dist/index.html` has: `<title>Tuwa</title>`, `<meta name="description">`, `og:title`, `og:description`, `og:url` (absolute), `og:site_name`, `og:type`, `twitter:card`. BUT: `og:image` = `/og-default.png` (relative — social crawlers require absolute URL per OG spec). CR-01 in 01-REVIEW.md documents this bug. |

**Score:** 3/5 truths verified (SC-3 FAILED, SC-5 PARTIAL)

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/styles/global.css` | Design token system and Tailwind v4 base | VERIFIED | `@import "tailwindcss"`. 13 color tokens (travertine + forest green), 7 spacing tokens, 4 type scale tokens, 3 radius tokens. No hardcoded hex in selectors. |
| `astro.config.mjs` | Astro config with Tailwind vite plugin, MDX, sitemap, Fonts API | VERIFIED | `tailwindcss()` in `vite.plugins`. `integrations: [mdx(), sitemap()]`. `fontProviders.fontshare()` with Alpino. `site: "https://tuwa.app"`. No Cloudflare adapter. |
| `public/og-default.png` | Default OG image fallback | VERIFIED (stub) | Exists. 70-byte 1x1 pixel PNG placeholder. Intentional — proper branded OG image deferred to Phase 4. |
| `src/components/SEO.astro` | Meta tag generation from props | VERIFIED (with gap) | All OG/Twitter tags present. Props interface correct. fullTitle logic correct. Gap: `og:image` uses relative URL. |
| `src/components/Header.astro` | Sticky responsive navigation | VERIFIED | `aria-label="Main navigation"`, sticky, blur backdrop, 4 nav links, CTA, hamburger with 44px touch target. |
| `src/components/MobileMenu.astro` | Mobile overlay menu with accessibility | VERIFIED | `aria-modal="true"`, focus trap, Escape-to-close, scroll lock, 44px touch targets. |
| `src/components/Footer.astro` | Multi-column footer with App Store badge | VERIFIED | `aria-label="Footer navigation"`, 4-column grid, Product/Resources/Legal columns, dynamic copyright year. |
| `src/layouts/BaseLayout.astro` | Page wrapper with head, font, SEO, header, footer | VERIFIED | Font preload before viewport meta, all components imported and rendered, `<html lang="en">`, `<main>` slot. |
| `src/pages/index.astro` | Landing page shell using BaseLayout | VERIFIED | Uses BaseLayout with `title="Tuwa"` and description. One `<h1>`. No `<html>/<head>/<body>` tags. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `astro.config.mjs` | `src/styles/global.css` | Tailwind vite plugin processes CSS | WIRED | `tailwindcss()` in `vite.plugins` confirmed; built CSS at `dist/_astro/index.CVd5jIM1.css` (14.4KB) |
| `astro.config.mjs` | Fontshare CDN | `fontProviders.fontshare()` | WIRED | Font resolved; woff2 bundled in dist. Note: CLAUDE.md requires self-hosting from `public/fonts/` — font IS bundled in dist but loaded via Fontshare API at build time, not from a locally committed font file. |
| `src/layouts/BaseLayout.astro` | `src/components/SEO.astro` | import + render in head | WIRED | `import SEO` present, `<SEO title={title}...>` rendered |
| `src/layouts/BaseLayout.astro` | `src/components/Header.astro` | import + render in body | WIRED | `import Header` present, `<Header />` in body |
| `src/layouts/BaseLayout.astro` | `src/components/Footer.astro` | import + render in body | WIRED | `import Footer` present, `<Footer />` in body |
| `src/layouts/BaseLayout.astro` | `src/styles/global.css` | import for design tokens | WIRED | `import "../styles/global.css"` present |
| `src/pages/index.astro` | `src/layouts/BaseLayout.astro` | wraps page content | WIRED | `import BaseLayout` present, `<BaseLayout>` wraps page |
| `src/components/Header.astro` | `src/components/MobileMenu.astro` | direct Astro import | WIRED | `import MobileMenu from "./MobileMenu.astro"` at line 2, `<MobileMenu />` rendered after `</header>` |
| `src/components/MobileMenu.astro` | `document.getElementById("menu-toggle")` | DOM query for hamburger | WIRED | `const toggle = document.getElementById("menu-toggle")` in script; `menu-toggle` id on hamburger in Header |

---

### Data-Flow Trace (Level 4)

Not applicable — this phase produces a static marketing site shell with no dynamic data sources. All components render either static content or props passed at build time.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build produces output with no errors | `npx astro build` | Exit 0, 1 page built in 740ms | PASS |
| Sitemap generated | `ls dist/sitemap-index.xml` | File exists, 179B | PASS |
| Built HTML has `<title>Tuwa</title>` | grep in dist/index.html | Found | PASS |
| Built HTML has canonical URL | grep canonical in dist/index.html | `<link rel="canonical" href="https://tuwa.app/">` — absolute URL | PASS |
| Built HTML has og:image | grep og:image in dist/index.html | `content="/og-default.png"` — relative, not absolute | FAIL |
| Font bundled in dist | `ls dist/_astro/fonts/` | `33469d43990388fc.woff2` (23.5KB) | PASS |
| Dark mode CSS exists | grep in src/styles/global.css | Only comment: "Light mode only — D-06 descopes" | FAIL |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| FOUND-01 | 01-01-PLAN | Site builds with Astro 6 + Tailwind v4, deploys to Cloudflare Pages | SATISFIED | Build passes, correct stack versions, static output compatible with Cloudflare Pages |
| FOUND-02 | 01-01-PLAN | Alpino font self-hosted with preload hints, no FOUT or CLS regression | SATISFIED (partial) | Font bundled in dist with preload link. Optimized fallback metrics reduce CLS. Not manually self-hosted from `public/fonts/` — uses Astro Fonts API. Needs human visual verification. |
| FOUND-03 | 01-01-PLAN | Design token system (colors, spacing, typography) in global.css | SATISFIED | 13 color tokens, 7 spacing, 4 type scale, 3 radius tokens in `src/styles/global.css` |
| FOUND-04 | 01-03-PLAN | Dark/light mode with system preference detection + manual toggle | BLOCKED | Explicitly descoped per D-06. No implementation. Conflicts with ROADMAP SC-3. |
| FOUND-05 | 01-02-PLAN, 01-03-PLAN | Base layout with SEO meta component (title, description, OG tags, canonical) | PARTIAL | All tags present. Gap: og:image is relative URL (CR-01). |
| FOUND-06 | 01-02-PLAN | Responsive navigation header with mobile menu | SATISFIED | Header sticky, desktop nav, hamburger, mobile overlay with a11y |
| FOUND-07 | 01-02-PLAN | Footer with nav links, legal links, and App Store badge | SATISFIED | 4-column footer with Product/Resources/Legal columns and App Store CTA |

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/components/SEO.astro` | 12, 24, 31 | `ogImage = "/og-default.png"` relative URL passed directly to `og:image` and `twitter:image` | Blocker | Social share previews will render with no image on all platforms (Twitter/X, Facebook, LinkedIn, Slack). OG spec requires absolute URLs. |
| `src/components/Header.astro` | 94-109 | `header.style.boxShadow = ...` inside IntersectionObserver callback with no null check on `header` | Warning | `document.querySelector("header")` returns `HTMLElement | null`. Null dereference will throw `TypeError` if header element is ever absent. |
| `src/components/Header.astro` | 30-48, 65-66 | `onmouseover`/`onmouseout` inline event handlers | Warning | Touch-incompatible (hover not fired on iOS/Android). Hardcoded token strings not caught by tooling. WR-03 in 01-REVIEW.md. |
| `src/components/MobileMenu.astro` | 108 | Body scroll lock not cleared when user navigates via menu links | Warning | `document.body.style.overflow = "hidden"` only cleared in `closeMenu()`. Nav link clicks skip `closeMenu()`. Scroll lock leaks across page transitions if View Transitions are added. WR-02 in 01-REVIEW.md. |
| All 3 CTAs | Multiple | `apps.apple.com/app/tuwa` missing numeric App Store app ID | Warning | Primary conversion CTA will 404 or redirect to App Store search. Needs `/id{NUMERIC_ID}` in URL. WR-04 in 01-REVIEW.md. |
| `src/layouts/BaseLayout.astro` | 2, 22 | `import { Font } from "astro:assets"` uses Fontshare CDN provider instead of self-hosted files | Warning | CLAUDE.md constraint: "must be self-hosted — there is no CDN URL. Place the font files in `public/fonts/`." No `public/fonts/` directory exists. Font IS bundled in dist at build time by Astro, but from CDN source, not committed font files. CR-02 in 01-REVIEW.md. |

---

### Human Verification Required

#### 1. Alpino FOUT and CLS

**Test:** Open https://tuwa.app/ or `npm run dev` + http://localhost:4321 on a fresh browser profile (cleared cache). Observe text on first paint.
**Expected:** Text renders immediately in Alpino's geometric shapes (distinctive rounded letterforms, even stroke width). No flash where body text briefly appears in system-ui before switching to Alpino.
**Why human:** The `size-adjust` optimized fallback (85.6885%) means Alpino and its fallback have matched metrics, so CLS should be near-zero. But actual FOUT imperceptibility depends on network speed and browser behavior — not verifiable from static file analysis.

#### 2. Mobile menu accessibility

**Test:** Open site on mobile viewport (< 768px) or DevTools device mode. Tap hamburger. Tab through items. Press Escape.
**Expected:** Menu opens full-screen. Tab cycles: close button → Features → Coaching → Blog → Support → Get the App → close button (wraps). Escape closes menu and focus returns to hamburger. Page behind is unscrollable while menu is open.
**Why human:** Focus trap and keyboard navigation require interactive browser verification. The code logic is correct per static analysis but runtime DOM behavior depends on browser tab order implementation.

#### 3. Cloudflare Pages live deployment

**Test:** Navigate to https://tuwa.app/ in a browser and check: header sticky, footer present, Alpino rendering, View Page Source shows title/description/og:title/canonical.
**Expected:** Site loads with no errors, same as local dev.
**Why human:** Cannot access external deployment state programmatically.

---

### Gaps Summary

Two gaps block full goal achievement:

**Gap 1 — Dark mode (SC-3, FOUND-04): PLANNING DECISION CONFLICT**
This is the most significant gap. The ROADMAP success criterion SC-3 requires dark mode with system preference detection and a manual toggle. REQUIREMENTS.md FOUND-04 requires the same. However, planning context D-06 explicitly descoped this feature: "FOUND-04 requirement is descoped: no dark/light switching, no system preference detection, no flash-prevention needed."

This creates a verifiable conflict between what the ROADMAP contract specifies and what was intentionally planned. A developer decision is required:
- **Option A:** Implement dark mode (adds ~2-4 hours of work — CSS custom properties for dark variants, toggle component, localStorage persistence, flash-prevention script)
- **Option B:** Formally override SC-3 and update REQUIREMENTS.md to mark FOUND-04 as descoped for v1, with an override entry in this file

To accept the deviation (Option B), add to this file's frontmatter:
```yaml
overrides:
  - must_have: "Dark mode and light mode both render correctly with system preference auto-detection and a manual toggle that persists across page loads"
    reason: "Dark mode descoped per D-06 planning decision — light mode only for v1, simplifies implementation"
    accepted_by: "{your name}"
    accepted_at: "{ISO timestamp}"
```

**Gap 2 — Relative og:image URL (SC-5, FOUND-05): CODE BUG**
The `og:image` and `twitter:image` tags emit `/og-default.png` (relative). Social crawlers require absolute URLs. Fix is small — add URL resolution in SEO.astro using `Astro.site?.origin`. This is documented as CR-01 in 01-REVIEW.md.

---

*Verified: 2026-05-10T18:33:00Z*
*Verifier: Claude (gsd-verifier)*
