---
phase: 01-foundation
plan: 03
subsystem: page-layout
tags: [astro, layout, baselayout, font, seo, integration]
dependencies:
  requires:
    - tailwind-v4-configured
    - design-token-system
    - alpino-font-api
    - seo-component
    - sticky-header
    - multi-column-footer
  provides:
    - base-layout
    - index-page-shell
  affects:
    - every future page (all will use BaseLayout)
tech-stack:
  added:
    - "vite@^6.4.2 (pinned — vite 8/rolldown broke @tailwindcss/vite CSS import in build)"
  patterns:
    - BaseLayout.astro as universal page wrapper with Font + global.css + SEO + Header + Footer
    - Font preload before viewport meta (Pitfall 6 ordering)
    - index.astro delegates html/head/body to BaseLayout; provides only page-specific content
key-files:
  created:
    - src/layouts/BaseLayout.astro
  modified:
    - src/pages/index.astro
    - package.json
    - package-lock.json
decisions:
  - "Pinned vite to ^6.4.2 — vite 8 (rolldown) auto-installed by npm caused @tailwindcss/vite build failure when global.css is imported from a layout; vite 6 is stable and supported"
  - "Font API (fontProviders.fontshare()) confirmed working — using <Font cssVariable='--font-alpino' preload /> in BaseLayout"
metrics:
  completed_date: "2026-05-10"
  tasks_completed: 1
  tasks_total: 2
  files_created: 1
  files_modified: 3
---

# Phase 01 Plan 03: BaseLayout and Index Integration Summary

**One-liner:** BaseLayout.astro assembles Font preload, global.css, SEO meta, sticky Header, and Footer into the universal page wrapper; index.astro rewrites to use it with title/description props and a placeholder h1.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create BaseLayout.astro and rewrite index.astro | f188396 | src/layouts/BaseLayout.astro, src/pages/index.astro, package.json |

## What Was Built

### src/layouts/BaseLayout.astro
- Props interface: `title: string`, `description: string`, `ogImage?: string`, `canonical?: string`
- `<Font cssVariable="--font-alpino" preload />` placed BEFORE viewport meta tag (Pitfall 6)
- Imports `../styles/global.css` — Astro injects it as a stylesheet link
- Imports and renders `<SEO>`, `<Header>`, `<Footer>` components from Plan 02
- `<html lang="en">` on root element
- `<main>` wrapping `<slot />` — pages inject content here
- No hardcoded hex colors — all styling via CSS token vars in components and global.css

### src/pages/index.astro
- Imports and uses `<BaseLayout>` — no `<html>`, `<head>`, or `<body>` tags
- `title="Tuwa"` (SEO renders as just "Tuwa" — no suffix per siteName logic)
- `description="Precision training load and recovery management for serious athletes and coaches."`
- Placeholder `<section>` with exactly one `<h1>` (accessibility contract)
- Phase 2 will replace the placeholder section with hero + feature grid

### Built dist/index.html verification
- `<title>Tuwa</title>` present
- Font `<link rel="preload">` for `.woff2` in head
- `<meta name="description">` present with app tagline
- `<meta property="og:title">` and full OG tag set present
- `<link rel="canonical" href="https://tuwa.app/">` present
- `lang="en"` on `<html>`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Pinned Vite to v6 to fix @tailwindcss/vite rolldown compatibility**
- **Found during:** Task 1 build verification
- **Issue:** npm auto-resolved `vite` to v8 (rolldown-based, experimental). `@tailwindcss/vite@4.3.0` throws `Missing field 'tsconfigPaths' on BindingViteResolvePluginConfig.resolveOptions` when `global.css` is imported from a layout during the production build. The original `index.astro` stub didn't import global.css so the bug was latent.
- **Fix:** Added `"vite": "^6.4.2"` to `package.json` dependencies. npm reinstalled, resolving to `vite@6.4.2` (latest stable v6). Build passes cleanly.
- **Files modified:** `package.json`, `package-lock.json`
- **Commit:** f188396

## Checkpoint Status

**Task 2: Visual and functional verification** — AWAITING HUMAN VERIFICATION

The dev server is running at http://localhost:4321. The user needs to verify the complete foundation visually before this plan is marked complete.

## Known Stubs

- `src/pages/index.astro` placeholder section with `<h1>Tuwa</h1>` and tagline paragraph. Phase 2 will replace this with the full hero section and feature grid. This is intentional — the plan's goal is to verify the layout shell, not landing page content.

## Threat Flags

None — this plan introduces no new network endpoints, auth paths, file access patterns, or schema changes. The `<Font>` component and CSS import are build-time only.

## Self-Check: PASSED

- [x] `src/layouts/BaseLayout.astro` exists
- [x] BaseLayout.astro contains `import { Font } from "astro:assets"`
- [x] BaseLayout.astro contains `import Header from "../components/Header.astro"`
- [x] BaseLayout.astro contains `import Footer from "../components/Footer.astro"`
- [x] BaseLayout.astro contains `import SEO from "../components/SEO.astro"`
- [x] BaseLayout.astro contains `import "../styles/global.css"`
- [x] BaseLayout.astro contains `interface Props` with `title: string` and `description: string`
- [x] BaseLayout.astro contains `<html lang="en">`
- [x] BaseLayout.astro `<Font>` appears before `<meta name="viewport">`
- [x] BaseLayout.astro contains `<main>` wrapping `<slot />`
- [x] BaseLayout.astro contains NO hardcoded hex colors
- [x] `src/pages/index.astro` imports and uses BaseLayout
- [x] index.astro contains `title="Tuwa"`
- [x] index.astro contains exactly one `<h1>` element
- [x] index.astro does NOT contain `<html>`, `<head>`, or `<body>` tags
- [x] `npx astro build` exits with code 0
- [x] Commit f188396 exists (Task 1)
- [x] No file deletions in Task 1 commit
