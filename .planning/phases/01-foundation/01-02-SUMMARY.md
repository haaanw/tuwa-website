---
phase: 01-foundation
plan: 02
subsystem: site-shell-components
tags: [astro, seo, header, footer, mobile-menu, accessibility, aria]
dependencies:
  requires:
    - tailwind-v4-configured
    - design-token-system
  provides:
    - seo-component
    - sticky-header
    - mobile-menu-overlay
    - multi-column-footer
  affects:
    - src/layouts/BaseLayout.astro (Plan 03 — will import all four components)
    - every page going forward
tech-stack:
  added: []
  patterns:
    - Astro component with inline script (is:inline) for scroll shadow via IntersectionObserver
    - Astro component with bundled script tag for MobileMenu focus trap logic
    - CSS token vars exclusively — no hardcoded hex in component templates
    - rel="noopener noreferrer" on all external links (T-01-03 threat mitigation)
key-files:
  created:
    - src/components/SEO.astro
    - src/components/Header.astro
    - src/components/MobileMenu.astro
    - src/components/Footer.astro
  modified: []
decisions:
  - "MobileMenu uses <script> (bundled module) not <script is:inline> — simpler, deduplicates across pages"
  - "Header scroll shadow uses IntersectionObserver via <script is:inline> (not a full island) — zero KB overhead"
  - "Logo rendered as <a> not <h1> per accessibility contract — h1 stays in main page content"
metrics:
  duration_seconds: 174
  completed_date: "2026-05-10T10:00:18Z"
  tasks_completed: 2
  tasks_total: 2
  files_created: 4
  files_modified: 0
---

# Phase 01 Plan 02: Site Shell Components Summary

**One-liner:** Four Astro components forming the site shell — SEO meta/OG/Twitter tags, sticky glassmorphic header with focus-trapped mobile overlay, and 4-column footer with App Store CTA and dynamic copyright.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create SEO.astro and Footer.astro | 7f719d7 | src/components/SEO.astro, src/components/Footer.astro |
| 2 | Create Header.astro and MobileMenu.astro | 2715259 | src/components/Header.astro, src/components/MobileMenu.astro |

## What Was Built

### src/components/SEO.astro
- Props-driven meta tag component: `title`, `description`, `ogImage?`, `canonical?`
- `fullTitle` logic: if title equals "Tuwa", use as-is; otherwise append " — Tuwa"
- Default `ogImage` is `/og-default.png` (created in Plan 01)
- Default `canonical` is `Astro.url.href` (not import.meta.env.SITE)
- Complete OG tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`, `og:type`
- Complete Twitter card: `twitter:card` (summary_large_image), `twitter:title`, `twitter:description`, `twitter:image`
- No wrapping HTML element — renders directly into `<head>`

### src/components/Header.astro
- Sticky positioning: `sticky top-0 z-50`, height 64px per UI-SPEC Layout Contract
- Glassmorphic background: `color-mix(in srgb, var(--color-surface) 95%, transparent)` + `backdrop-filter: blur(8px)`
- Desktop nav: Features, Coaching, Blog, Support links (D-04)
- CTA: "Get the App" linking to `https://apps.apple.com/app/tuwa` with `rel="noopener noreferrer"`
- CTA hover: accent-hover background + `box-shadow: 0 2px 8px rgba(43,82,64,0.20)`
- Hamburger: 44px touch target, `aria-expanded="false"`, `aria-controls="mobile-menu"`, `aria-label="Open navigation menu"`
- Scroll shadow: IntersectionObserver via `<script is:inline>` — no extra JS bundle cost
- Renders `<MobileMenu />` after the header element

### src/components/MobileMenu.astro
- Full-screen overlay: `fixed inset-0 z-[60]` (above header z-50), `md:hidden`
- Background: `var(--color-surface-el)` (elevated surface token)
- `role="dialog"`, `aria-modal="true"`, `aria-hidden="true"` (initial state)
- Close button: X icon, 44px touch target, `aria-label="Close navigation menu"`
- Nav links: Features, Coaching, Blog, Support (matches header — D-04)
- Full-width "Get the App" CTA at bottom
- All links have `min-height: 44px` (accessibility touch target)
- Focus trap: Tab key wraps between first and last focusable element in overlay
- Escape key: closes menu, returns focus to hamburger button via `toggle.focus()`
- Body scroll lock: `document.body.style.overflow = "hidden"` when open
- `aria-expanded` on toggle and `aria-hidden` on menu stay in sync

### src/components/Footer.astro
- 4-column grid on desktop (brand + Product + Resources + Legal), 2-column on mobile
- Brand column: Tuwa wordmark link + "Get the App" App Store badge
- Product column: Features, Coaching links
- Resources column: Blog, Support links
- Legal column: Privacy Policy, Terms of Service (full form per Copywriting Contract)
- `<nav aria-label="Footer navigation">` wrapper per Accessibility Contract
- Dynamic copyright year via `new Date().getFullYear()`
- All App Store links: `rel="noopener noreferrer"` (T-01-03 mitigation)

## Deviations from Plan

None — plan executed exactly as written.

## Threat Model Compliance

| Threat ID | Mitigation Applied |
|-----------|-------------------|
| T-01-03 | All 3 App Store links across 3 components include `rel="noopener noreferrer"` (Header, MobileMenu, Footer) |
| T-01-04 | OG meta tags expose only title/description by design — no sensitive data exposed |

## Known Stubs

None — all components render real content from props or static values. No placeholder text, hardcoded empty values, or unconnected data sources.

## Threat Flags

None — these components introduce no new network endpoints, auth paths, or schema changes beyond the external App Store links already in the threat model.

## Self-Check: PASSED

- [x] `src/components/SEO.astro` exists and contains og:title, og:description, og:image, og:url, og:site_name, og:type, twitter:card
- [x] `src/components/SEO.astro` contains `Astro.url.href` (not import.meta.env.SITE)
- [x] `src/components/SEO.astro` contains `og-default.png` as default ogImage
- [x] `src/components/SEO.astro` contains `title === siteName ? title : \`\${title} — \${siteName}\`` logic
- [x] `src/components/Footer.astro` exists with `aria-label="Footer navigation"`
- [x] `src/components/Footer.astro` contains "Privacy Policy" and "Terms of Service" (full form)
- [x] `src/components/Footer.astro` contains `apps.apple.com/app/tuwa` with `rel="noopener noreferrer"`
- [x] `src/components/Footer.astro` contains `new Date().getFullYear()`
- [x] `src/components/Header.astro` exists with `aria-label="Main navigation"`
- [x] `src/components/Header.astro` contains `sticky top-0 z-50` and `backdrop-filter: blur(8px)`
- [x] `src/components/Header.astro` contains `id="menu-toggle"` with `aria-expanded="false"` and `aria-controls="mobile-menu"`
- [x] `src/components/Header.astro` contains `IntersectionObserver` in `<script is:inline>`
- [x] `src/components/Header.astro` does NOT contain `<h1>`
- [x] `src/components/MobileMenu.astro` exists with `id="mobile-menu"`, `role="dialog"`, `aria-modal="true"`
- [x] `src/components/MobileMenu.astro` contains `handleKeydown` with Escape key handler
- [x] `src/components/MobileMenu.astro` contains focus trap (Tab key wrapping)
- [x] `src/components/MobileMenu.astro` contains `document.body.style.overflow = "hidden"`
- [x] `src/components/MobileMenu.astro` contains `toggle.focus()` in closeMenu
- [x] No hardcoded hex colors in any component template (only CSS token vars)
- [x] TypeScript check passed: npx tsc --noEmit exit 0
- [x] Commit 7f719d7 exists (Task 1)
- [x] Commit 2715259 exists (Task 2)
- [x] No file deletions in either commit
