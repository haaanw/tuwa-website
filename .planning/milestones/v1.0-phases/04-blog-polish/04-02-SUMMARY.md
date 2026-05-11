---
phase: 04-blog-polish
plan: "02"
subsystem: blog-infrastructure
tags: [content-collections, blog, mdx, reading-time, draft-filter]
dependency_graph:
  requires: [04-01]
  provides: [blog-content-schema, blog-listing-page, blog-post-route, blog-post-layout]
  affects: [src/pages/blog, src/content.config.ts, src/layouts/BlogPostLayout]
tech_stack:
  added: []
  patterns: [astro-content-collections, glob-loader, draft-filter, zod-schema]
key_files:
  created:
    - src/content.config.ts
    - src/content/blog/.gitkeep
    - src/layouts/BlogPostLayout.astro
    - src/pages/blog/index.astro
    - src/pages/blog/[...slug].astro
  modified: []
decisions:
  - "draft filter uses !import.meta.env.PROD || !data.draft — drafts visible in dev, excluded in prod"
  - "blog listing uses post.id as route param (Astro v6 content loader provides id from filename)"
  - "BlogPostLayout passes type=article to BaseLayout for og:type article meta"
  - "empty state message 'Posts coming soon.' renders when collection has zero posts"
metrics:
  duration_seconds: ~300
  completed_date: "2026-05-11"
  tasks_completed: 2
  files_modified: 5
---

# Phase 04 Plan 02: Blog Infrastructure Summary

**One-liner:** Created MDX blog content collection with Zod schema, blog listing page with empty state and draft filter, and blog post layout with reading time and og:type article support.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create content collection schema and blog post layout | 592af15 | src/content.config.ts, src/content/blog/.gitkeep, src/layouts/BlogPostLayout.astro |
| 2 | Create blog listing page and dynamic post route | dcb411f | src/pages/blog/index.astro, src/pages/blog/[...slug].astro |

## What Was Built

- **Content collection schema:** `src/content.config.ts` defines the `blog` collection using Astro v6's glob loader. Zod schema validates `title`, `date` (with `z.coerce.date()` for string formats), `description`, `tags` (default `[]`), `draft` (default `false`), and optional `coverImage`.
- **Blog directory:** `src/content/blog/` created with `.gitkeep` placeholder — ready for MDX posts.
- **BlogPostLayout:** Renders blog articles with back-to-blog link, formatted date, optional reading time (from Plan 01's remark plugin), prose content container (680px, prose-neutral), and passes `type="article"` to BaseLayout for correct OG metadata.
- **Blog listing page:** `/blog` renders with `h1 "Blog"`, draft filter (`!import.meta.env.PROD || !data.draft`), posts sorted newest-first, empty state "Posts coming soon." when no posts exist. No images on listing per D-01.
- **Dynamic post route:** `src/pages/blog/[...slug].astro` uses `getStaticPaths` with same draft filter, reads `remarkPluginFrontmatter.minutesRead` from remark plugin, falls back to `/og-default.png` for OG image when post has no `coverImage`.

## Verification

- `npm run build` completes successfully — 10 pages built
- `dist/blog/index.html` exists and contains "Posts coming soon."
- Only `index.html` in `dist/blog/` — no draft post pages generated
- BlogPostLayout contains `type="article"` for OG metadata
- Draft filter present in both listing and dynamic route files

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

- **`/og-default.png`** fallback in `src/pages/blog/[...slug].astro` — the `og-default.png` file is a 1x1 PNG placeholder (documented in Phase 01 decisions). Blog posts without `coverImage` will use this placeholder. Proper OG image generation is deferred to Phase 4 Plan 03.

## Threat Flags

None — all changes are build-time only. Draft filter correctly prevents draft posts from appearing in production build output (`getStaticPaths` excludes drafts so pages are never generated in `dist/`).

## Self-Check: PASSED

- [x] `src/content.config.ts` exists and contains `defineCollection`
- [x] `src/content/blog/.gitkeep` exists
- [x] `src/layouts/BlogPostLayout.astro` exists and contains `type="article"` and `minutesRead`
- [x] `src/pages/blog/index.astro` exists and contains `getCollection`, `posts.length === 0`, "Posts coming soon."
- [x] `src/pages/blog/[...slug].astro` exists and contains `getStaticPaths`, `remarkPluginFrontmatter.minutesRead`
- [x] `dist/blog/index.html` exists after build
- [x] Commits 592af15 and dcb411f exist in git log
