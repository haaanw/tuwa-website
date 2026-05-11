---
phase: 04-blog-polish
plan: "01"
subsystem: fonts, seo, blog-infra
tags: [font-switch, seo, remark, reading-time, general-sans]
dependency_graph:
  requires: []
  provides: [general-sans-font, og-type-prop, remark-reading-time-plugin]
  affects: [BaseLayout, SEO, all-pages, blog-posts]
tech_stack:
  added: [reading-time, mdast-util-to-string]
  patterns: [remark-plugin, astro-fonts-api, og-type-prop]
key_files:
  created:
    - src/remark-reading-time.mjs
  modified:
    - astro.config.mjs
    - src/styles/global.css
    - src/layouts/BaseLayout.astro
    - src/components/SEO.astro
decisions:
  - "Switch from Alpino to General Sans font (D-07) via Astro Fonts API — fontshare provider, cssVariable --font-general-sans"
  - "SEO og:type prop defaults to 'website'; blog post layout will pass 'article'"
  - "Pre-existing TS2322 type error in astro.config.mjs (Vite plugin hotUpdate types) is not caused by this plan — build succeeds"
metrics:
  duration_seconds: ~600
  completed_date: "2026-05-11"
  tasks_completed: 2
  files_modified: 5
---

# Phase 04 Plan 01: Font Switch, SEO og:type, Remark Reading Time Summary

**One-liner:** Switched site font from Alpino to General Sans via Astro Fonts API, added og:type prop to SEO component for blog article support, and wired the remarkReadingTime plugin into Astro markdown config.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Install deps, create remark plugin, update astro.config.mjs | f69c4aa | astro.config.mjs, src/remark-reading-time.mjs, package.json, package-lock.json |
| 2 | Update global.css, BaseLayout, SEO.astro | 22d5bbe | src/styles/global.css, src/layouts/BaseLayout.astro, src/components/SEO.astro |

## What Was Built

- **Font switch:** Alpino replaced with General Sans across all source files. `--font-alpino` CSS variable renamed to `--font-general-sans`. `astro.config.mjs` font provider config updated. `BaseLayout.astro` Font component cssVariable updated. `global.css` body `font-family` updated.
- **SEO og:type prop:** `SEO.astro` now accepts an optional `type` prop defaulting to `"website"`. `BaseLayout.astro` accepts and forwards `type` to `SEO`. Blog post layout can pass `type="article"` to get correct OG metadata.
- **Remark reading time plugin:** `src/remark-reading-time.mjs` created using `reading-time` + `mdast-util-to-string`. Exported `remarkReadingTime` function wired into `astro.config.mjs` `markdown.remarkPlugins`. Blog posts will have `minutesRead` available in `remarkPluginFrontmatter`.

## Verification

- `npm run build` completes successfully — 9 pages built
- No `--font-alpino` or `font-alpino` references remain in `src/`
- `General Sans` appears in `astro.config.mjs`
- `SEO.astro` renders `og:type` from prop, not hardcoded
- `src/remark-reading-time.mjs` exports `remarkReadingTime`
- `reading-time` and `mdast-util-to-string` present in `package.json`

## Deviations from Plan

### Pre-existing Issue (not a deviation)

**TS2322 type error in astro.config.mjs line 27** (`plugins: [tailwindcss()]`) — Vite plugin `hotUpdate` type incompatibility between astro's bundled Vite and `@tailwindcss/vite`. This error existed before this plan and is not caused by any change here. `npm run build` succeeds regardless. Logged for awareness.

No plan deviations — executed exactly as written.

## Known Stubs

None — no placeholder data or hardcoded stubs introduced.

## Threat Flags

None — all changes are build-time only, no new network endpoints or trust boundaries introduced.

## Self-Check: PASSED

- [x] `src/remark-reading-time.mjs` exists
- [x] `astro.config.mjs` contains "General Sans"
- [x] `src/styles/global.css` contains "--font-general-sans"
- [x] `src/layouts/BaseLayout.astro` contains "--font-general-sans"
- [x] `src/components/SEO.astro` contains `content={type}`
- [x] Commits f69c4aa and 22d5bbe exist in git log
