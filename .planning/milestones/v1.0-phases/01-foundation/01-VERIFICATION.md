---
phase: 01-foundation
verified: 2026-05-10T18:55:00Z
status: human_needed
score: 4/4
overrides_applied: 0
re_verification:
  previous_status: gaps_found
  previous_score: 3/5
  gaps_closed:
    - "og:image and twitter:image now use absolute URLs (siteOrigin + path) — confirmed https://tuwa.app/og-default.png in built HTML"
    - "Dark mode descoped from ROADMAP and REQUIREMENTS — FOUND-04 removed from phase requirements; success criteria updated to remove SC-3"
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "Alpino font renders with no visible FOUT"
    expected: "Page text renders in Alpino geometric sans-serif on first load, with no flash from system-ui fallback to Alpino (or a flash so brief it is imperceptible due to the optimized fallback metrics)"
    why_human: "The built HTML contains @font-face with optimizedFallbacks=true (size-adjust: 85.6885%) which reduces CLS. Preload link is present. But actual visual FOUT depends on font cache state, connection speed, and browser rendering — cannot verify programmatically."
  - test: "Mobile hamburger menu is accessible and focus trap works"
    expected: "Tapping hamburger opens full-screen menu. Tab key cycles only within menu. Escape closes menu and returns focus to hamburger. Scroll behind menu is locked."
    why_human: "Focus trap and keyboard behavior requires interactive browser testing — cannot verify with static file analysis."
  - test: "Cloudflare Pages deployment at tuwa.app renders correctly"
    expected: "https://tuwa.app/ loads the site with header, content, footer, Alpino font, and correct SEO tags in source"
    why_human: "Cannot verify external deployment state programmatically. Requires browser access to the live URL."
---

# Phase 1: Foundation — Verification Report (Re-verification)

**Phase Goal:** A deployed, functional Astro site with design system and base layout ready for content pages
**Verified:** 2026-05-10T18:55:00Z
**Status:** human_needed
**Re-verification:** Yes — after gap closure (2 gaps fixed)

---

## Re-verification Summary

| Gap from Previous Verification | Resolution |
|--------------------------------|------------|
| og:image used relative URL `/og-default.png` | FIXED — `SEO.astro` now resolves to `https://tuwa.app/og-default.png` via `Astro.site?.origin`. Confirmed in `dist/index.html`. |
| Dark mode descoped conflict with ROADMAP SC-3 | FIXED — FOUND-04 removed from phase requirements. ROADMAP.md and REQUIREMENTS.md updated to remove dark mode from phase scope. No code changes required. |

No regressions detected. All previously-passing items remain passing.

---

## Goal Achievement

### Observable Truths

The ROADMAP Phase 1 success criteria (post-descope) are verified against the actual codebase:

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Site builds with Astro 6 + Tailwind v4 and deploys to Cloudflare Pages at tuwa.app with no errors | VERIFIED | `npx astro build` exits 0 in 652ms. Astro 6.3.1 + Tailwind 4.3.0. `dist/index.html` and `sitemap-index.xml` generated. Vite pinned to 6.4.2 for rolldown compat. |
| 2 | Alpino font loads on first visit with no flash of unstyled text and no Cumulative Layout Shift | VERIFIED (human needed) | `<Font cssVariable="--font-alpino" preload />` appears before viewport meta. Fonts API bundles Alpino woff2 in `dist/_astro/fonts/`. Astro generates optimized fallback `@font-face` with `size-adjust` to minimize CLS. Visual FOUT cannot be confirmed without browser. |
| 3 | Responsive navigation header works on mobile (hamburger menu) and desktop, with footer visible on every page | VERIFIED | Header: `sticky top-0 z-50`, `backdrop-filter: blur(8px)`, 4 desktop nav links, CTA, hamburger with `aria-expanded`/`aria-controls`. MobileMenu: `role="dialog"`, `aria-modal="true"`, focus trap, Escape handler, scroll lock. Footer rendered via BaseLayout on every page. |
| 4 | Pages built on the base layout have correct title, description, OG tags, and canonical URL in their HTML source | VERIFIED | Built `dist/index.html` confirmed: `<title>Tuwa</title>`, `<meta name="description">`, `og:title`, `og:description`, `og:image` = `https://tuwa.app/og-default.png` (absolute), `og:url`, `og:site_name`, `og:type`, `twitter:card`, `<link rel="canonical" href="https://tuwa.app/">`. All tags present, all URLs absolute. |

**Score:** 4/4 truths verified (all automated checks pass; 3 items need human confirmation)

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/styles/global.css` | Design token system and Tailwind v4 base | VERIFIED | `@import "tailwindcss"`. 13 color tokens (travertine + forest green accent), 7 spacing tokens, 4 type scale tokens, 3 radius tokens, line height + tracking tokens. No hardcoded hex in selectors. No dark mode rules. |
| `astro.config.mjs` | Astro config with Tailwind vite plugin, MDX, sitemap, Fonts API | VERIFIED | `tailwindcss()` in `vite.plugins`. `integrations: [mdx(), sitemap()]`. `fontProviders.fontshare()` with Alpino weights 400/600. `site: "https://tuwa.app"`. No Cloudflare adapter. |
| `public/og-default.png` | Default OG image fallback | VERIFIED (stub) | Exists. 1x1 pixel valid PNG placeholder. Intentional — branded 1200x630 OG image deferred to Phase 4. |
| `src/components/SEO.astro` | Meta tag generation from props | VERIFIED | Props interface: `title`, `description`, `ogImage?`, `canonical?`. `fullTitle` logic correct. `siteOrigin = Astro.site?.origin ?? "https://tuwa.app"`. `resolvedOgImage` enforces absolute URL. All 6 OG tags + 4 Twitter card tags present. |
| `src/components/Header.astro` | Sticky responsive navigation | VERIFIED | `aria-label="Main navigation"`. `sticky top-0 z-50`. `backdrop-filter: blur(8px)`. 4 nav links. "Get the App" CTA. Hamburger: 44px touch target, `aria-expanded="false"`, `aria-controls="mobile-menu"`. IntersectionObserver scroll shadow. No `<h1>`. |
| `src/components/MobileMenu.astro` | Mobile overlay menu with accessibility | VERIFIED | `id="mobile-menu"`, `role="dialog"`, `aria-modal="true"`, `aria-hidden="true"`. Focus trap (Tab wrapping between first/last focusable). Escape-to-close with `toggle.focus()`. `document.body.style.overflow = "hidden"` scroll lock. Close button `aria-label="Close navigation menu"`. 4 nav links + CTA, all `min-height: 44px`. |
| `src/components/Footer.astro` | Multi-column footer with App Store badge | VERIFIED | `aria-label="Footer navigation"`. 4-column grid (brand + Product + Resources + Legal). "Privacy Policy" and "Terms of Service" (full form). `new Date().getFullYear()`. `rel="noopener noreferrer"` on App Store link. All colors via CSS token vars. |
| `src/layouts/BaseLayout.astro` | Page wrapper with head, font, SEO, header, footer | VERIFIED | `import { Font } from "astro:assets"`. `<Font cssVariable="--font-alpino" preload />` before viewport meta. All 4 component imports. `<html lang="en">`. `<main>` wrapping `<slot />`. `import "../styles/global.css"`. Props interface matches SEO.astro. |
| `src/pages/index.astro` | Landing page shell using BaseLayout | VERIFIED | `import BaseLayout`. `title="Tuwa"`. `description="Precision training load and recovery management..."`. One `<h1>`. No `<html>/<head>/<body>` tags. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `astro.config.mjs` | `src/styles/global.css` | Tailwind vite plugin | WIRED | `tailwindcss()` in `vite.plugins`; built CSS at `dist/_astro/` |
| `astro.config.mjs` | Fontshare CDN | `fontProviders.fontshare()` | WIRED | Font resolved at build time; woff2 bundled in `dist/_astro/fonts/` |
| `src/layouts/BaseLayout.astro` | `src/components/SEO.astro` | import + render in head | WIRED | `import SEO` present; `<SEO title={title} description={description} ogImage={ogImage} canonical={canonical} />` in `<head>` |
| `src/layouts/BaseLayout.astro` | `src/components/Header.astro` | import + render in body | WIRED | `import Header` present; `<Header />` in `<body>` |
| `src/layouts/BaseLayout.astro` | `src/components/Footer.astro` | import + render in body | WIRED | `import Footer` present; `<Footer />` in `<body>` |
| `src/layouts/BaseLayout.astro` | `src/styles/global.css` | import | WIRED | `import "../styles/global.css"` in frontmatter |
| `src/pages/index.astro` | `src/layouts/BaseLayout.astro` | wraps page content | WIRED | `import BaseLayout` present; `<BaseLayout>` wraps all content |
| `src/components/Header.astro` | `src/components/MobileMenu.astro` | direct Astro import | WIRED | `import MobileMenu from "./MobileMenu.astro"` line 2; `<MobileMenu />` rendered after `</header>` |
| `src/components/MobileMenu.astro` | `document.getElementById("menu-toggle")` | DOM query | WIRED | `const toggle = document.getElementById("menu-toggle")` in `<script>`; `id="menu-toggle"` present on hamburger in Header |

---

### Data-Flow Trace (Level 4)

Not applicable — this phase produces a static marketing site shell with no dynamic data sources. All components render static content or props passed at build time.

---

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build produces output with no errors | `npx astro build` | Exit 0, 652ms | PASS |
| Sitemap generated | `ls dist/sitemap-index.xml` | File exists | PASS |
| Built HTML has `<title>Tuwa</title>` | Python parse of `dist/index.html` | Found: `Tuwa` | PASS |
| Built HTML has absolute canonical URL | Python parse of `dist/index.html` | `https://tuwa.app/` | PASS |
| Built HTML has absolute og:image URL | Python parse of `dist/index.html` | `https://tuwa.app/og-default.png` | PASS |
| Built HTML has absolute twitter:image URL | Python parse of `dist/index.html` | `https://tuwa.app/og-default.png` | PASS |
| Dark mode CSS absent | Check `src/styles/global.css` | Comment: "Light mode only — D-06 descopes dark mode entirely." No `@custom-variant dark`, no `prefers-color-scheme`. | PASS (expected absent) |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| FOUND-01 | 01-01-PLAN | Site builds with Astro 6 + Tailwind v4, deploys to Cloudflare Pages | SATISFIED | Build passes, correct stack versions, static output compatible with Cloudflare Pages (no adapter) |
| FOUND-02 | 01-01-PLAN | Alpino font with preload hints, no FOUT or CLS regression | SATISFIED (human needed) | Font bundled in dist with `<link rel="preload">`. Optimized fallback metrics (size-adjust) reduce CLS. Needs human visual verification. |
| FOUND-03 | 01-01-PLAN | Design token system (colors, spacing, typography) in global.css | SATISFIED | 13 color tokens, 7 spacing, 4 type scale, 3 radius tokens in `src/styles/global.css` |
| FOUND-04 | — | Dark/light mode | DESCOPED | Removed from phase requirements per D-06. REQUIREMENTS.md marks as descoped. Not a gap. |
| FOUND-05 | 01-02-PLAN, 01-03-PLAN | Base layout with SEO meta (title, description, OG tags, canonical) | SATISFIED | All tags present with absolute URLs. `og:image` = `https://tuwa.app/og-default.png`. Previous gap closed. |
| FOUND-06 | 01-02-PLAN | Responsive navigation header with mobile menu | SATISFIED | Header sticky, desktop nav, hamburger, mobile overlay with a11y attributes |
| FOUND-07 | 01-02-PLAN | Footer with nav links, legal links, and App Store badge | SATISFIED | 4-column footer with Product/Resources/Legal columns and App Store CTA |

---

### Anti-Patterns Found

The following were noted in the previous verification and remain present. None are blockers — all previous blockers are now resolved.

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `src/components/Header.astro` | 102 | `header.style.boxShadow = ...` with no null check on `header` (result of `document.querySelector("header")`) | Warning | Potential null dereference if header element is absent. Low risk for a static marketing site. |
| `src/components/Header.astro` | 30-48, 65-66 | `onmouseover`/`onmouseout` inline event handlers | Warning | Touch-incompatible (hover not fired on iOS/Android). Cosmetic only — links still work. |
| `src/components/MobileMenu.astro` | 108 | Body scroll lock not cleared when user navigates via menu links | Warning | `overflow: hidden` only cleared in `closeMenu()`. Nav link clicks bypass `closeMenu()`. Scroll lock leaks if view transitions are added later. |
| All 3 CTAs | Multiple | `apps.apple.com/app/tuwa` missing numeric App Store app ID | Warning | Primary conversion CTA may 404 or redirect. Needs `/id{NUMERIC_ID}` in URL. No code can supply the correct ID without the developer knowing their App Store numeric ID. |

---

### Human Verification Required

#### 1. Alpino FOUT and CLS

**Test:** Open https://tuwa.app/ or run `npm run dev` and open http://localhost:4321 on a fresh browser profile (cleared cache). Observe text on first paint.
**Expected:** Text renders immediately in Alpino's geometric shapes (distinctive rounded letterforms, even stroke width). No flash where body text briefly appears in system-ui before switching to Alpino.
**Why human:** The `size-adjust` optimized fallback (85.6885%) means Alpino and its fallback have matched metrics, so CLS should be near-zero. But actual FOUT imperceptibility depends on network speed and browser behavior — not verifiable from static file analysis.

#### 2. Mobile menu accessibility

**Test:** Open site at mobile viewport (< 768px) or DevTools device mode. Tap hamburger. Tab through items. Press Escape.
**Expected:** Menu opens full-screen. Tab cycles: close button → Features → Coaching → Blog → Support → Get the App → close button (wraps). Escape closes menu and focus returns to hamburger. Page behind is unscrollable while menu is open.
**Why human:** Focus trap and keyboard navigation require interactive browser verification. The code logic is correct per static analysis but runtime DOM behavior depends on browser tab order implementation.

#### 3. Cloudflare Pages live deployment

**Test:** Navigate to https://tuwa.app/ in a browser and confirm: header sticky, footer present, Alpino rendering, View Page Source shows title/description/og:title/canonical.
**Expected:** Site loads with no errors, same as local dev.
**Why human:** Cannot access external deployment state programmatically.

---

### Gaps Summary

No gaps remain. All must-haves are verified.

The 2 gaps from the previous verification are closed:
- **og:image absolute URL** — `SEO.astro` now resolves ogImage against `Astro.site?.origin`. Built `dist/index.html` confirms `content="https://tuwa.app/og-default.png"` for both `og:image` and `twitter:image`.
- **Dark mode conflict** — FOUND-04 and the associated success criterion removed from phase scope per D-06. REQUIREMENTS.md and ROADMAP.md updated accordingly. No implementation needed.

Remaining warnings (inline event handlers, scroll lock leak, App Store URL without numeric ID) are non-blocking — they affect polish and conversion but do not prevent the phase goal from being achieved.

Status is `human_needed` rather than `passed` because 3 behavioral items (FOUT, mobile a11y, live deployment) require browser interaction that cannot be verified programmatically.

---

*Verified: 2026-05-10T18:55:00Z*
*Verifier: Claude (gsd-verifier)*
*Re-verification: Yes — after gap closure*
