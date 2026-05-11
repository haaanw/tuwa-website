---
phase: 04-blog-polish
verified: 2026-05-11T16:13:00Z
status: human_needed
score: 11/12
overrides_applied: 0
human_verification:
  - test: "Run Lighthouse on landing page (mobile and desktop) to confirm >= 95 performance score"
    expected: "Performance score >= 95 on both mobile and desktop runs in Chrome DevTools"
    why_human: "Cannot run Lighthouse programmatically in this environment; SUMMARY-03 documents human approval but the verifier cannot independently confirm the score"
  - test: "Visit /blog in browser and confirm blog empty state renders with correct font"
    expected: "Page shows 'Blog' heading in General Sans font and 'Posts coming soon.' paragraph"
    why_human: "Font rendering confirmation requires visual inspection in a browser"
  - test: "Confirm /sitemap.xml is crawlable — the ROADMAP success criterion says accessible at /sitemap.xml but the actual file is at /sitemap-index.xml"
    expected: "Either /sitemap.xml redirects to /sitemap-index.xml, or the ROADMAP wording is accepted as a naming mismatch (both are correct @astrojs/sitemap behavior)"
    why_human: "The ROADMAP SC says /sitemap.xml; the implementation generates /sitemap-index.xml. robots.txt points to sitemap-index.xml correctly. No redirect alias exists. Developer needs to confirm this is acceptable or add a redirect."
---

# Phase 4: Blog + Polish Verification Report

**Phase Goal:** The site is crawlable, scores >= 95 on Lighthouse, and blog infrastructure is ready for future posts
**Verified:** 2026-05-11T16:13:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Blog listing page and individual post layout exist and render correctly with zero initial posts | VERIFIED | `src/pages/blog/index.astro` exists with `getCollection`, empty state "Posts coming soon.", h1 "Blog". `dist/blog/index.html` confirms build output. `src/layouts/BlogPostLayout.astro` exists with back link, date, minutesRead display. |
| 2 | Landing page Lighthouse performance score is >= 95 on mobile and desktop | PASSED (human) | SUMMARY-03 documents human verification checkpoint approved by user. Cannot confirm independently — see Human Verification. |
| 3 | XML sitemap is generated at build time and accessible at /sitemap.xml | PARTIAL | `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist and are generated at build time. However, ROADMAP SC says `/sitemap.xml` and no such file or redirect exists — actual path is `/sitemap-index.xml`. robots.txt correctly references `sitemap-index.xml`. |
| 4 | robots.txt allows crawling and is accessible at /robots.txt | VERIFIED | `public/robots.txt` contains `User-agent: *`, `Allow: /`, `Sitemap: https://tuwa.app/sitemap-index.xml`. `dist/robots.txt` confirms build copy. |
| 5 | All pages use semantic HTML with proper heading hierarchy, landmarks, and alt text on images | VERIFIED | index.astro: 1 h1, 2 h2s. Feature pages: h1 in FeaturePageLayout, h2s in page files. All `<Image>` and `<img>` elements have `alt` attributes (Hero, ScreenshotBlock, FeatureCTA, LandingCTA checked). BaseLayout provides `<main>` wrapper. |

### Plan-Level Truths (from PLAN frontmatter must_haves)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| P1 | General Sans font loads on all pages instead of Alpino | VERIFIED | `astro.config.mjs` has `name: "General Sans"`, `--font-general-sans`. `global.css` has `font-family: var(--font-general-sans)`. No `font-alpino` references remain in src/. Built pages include General Sans woff2 font-face declarations. |
| P2 | SEO component accepts og:type prop and defaults to website | VERIFIED | `SEO.astro` has `type?: string` in Props interface, `type = "website"` default, `content={type}` on og:type meta tag. |
| P3 | BaseLayout forwards type prop to SEO component | VERIFIED | `BaseLayout.astro` has `type?: string` in Props, destructures `type`, passes `type={type}` to `<SEO>`. |
| P4 | Remark reading time plugin produces minutesRead in remarkPluginFrontmatter | VERIFIED | `src/remark-reading-time.mjs` exports `remarkReadingTime`, sets `data.astro.frontmatter.minutesRead`. Wired into `astro.config.mjs` `markdown.remarkPlugins`. |
| P5 | Blog listing page renders at /blog with empty state message when no posts exist | VERIFIED | `src/pages/blog/index.astro` has `posts.length === 0` branch rendering "Posts coming soon." `dist/blog/index.html` confirms in built output. |
| P6 | Blog post layout renders MDX content with reading time and date | VERIFIED | `src/layouts/BlogPostLayout.astro` has `<time datetime=...>`, `{minutesRead && ...}`, `<slot />` in `prose prose-neutral` container. |
| P7 | Content collection schema validates title, date, description, tags, draft, coverImage fields | VERIFIED | `src/content.config.ts` has `z.string()` for title/description, `z.coerce.date()` for date, `z.array(z.string()).default([])` for tags, `z.boolean().default(false)` for draft, `z.string().optional()` for coverImage. |
| P8 | Draft posts are filtered from production listing and routes | VERIFIED | Both `src/pages/blog/index.astro` and `src/pages/blog/[...slug].astro` use `!import.meta.env.PROD || !data.draft`. |
| P9 | Blog post pages use og:type article via the type prop added in Plan 01 | VERIFIED | `BlogPostLayout.astro` passes `type="article"` to `<BaseLayout>`, which forwards to `<SEO>`. |
| P10 | robots.txt is accessible at /robots.txt and references sitemap-index.xml | VERIFIED | `public/robots.txt` contains `Sitemap: https://tuwa.app/sitemap-index.xml`. |
| P11 | Default OG image is a branded 1200x630 PNG replacing the 1x1 placeholder | VERIFIED | `public/og-default.png` is 26008 bytes (was 70-byte placeholder). PNG header confirms 1200x630 dimensions. |
| P12 | XML sitemap is generated at build time at /sitemap-index.xml | VERIFIED | `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist after build. |

**Score:** 11/12 truths verified (1 PARTIAL — sitemap path wording in ROADMAP SC)

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `astro.config.mjs` | Font switch, remark plugin wired | VERIFIED | Contains "General Sans", `--font-general-sans`, `remarkReadingTime` in markdown.remarkPlugins |
| `src/styles/global.css` | Font token --font-general-sans | VERIFIED | Line 44: `--font-general-sans: "General Sans", system-ui, sans-serif;` |
| `src/layouts/BaseLayout.astro` | Font variable updated, type prop forwarded | VERIFIED | `<Font cssVariable="--font-general-sans" preload />`, `type={type}` in SEO usage |
| `src/components/SEO.astro` | og:type prop with default website | VERIFIED | `type?: string`, `type = "website"`, `content={type}` |
| `src/remark-reading-time.mjs` | Remark plugin for reading time | VERIFIED | Exports `remarkReadingTime`, sets `minutesRead` in frontmatter |
| `src/content.config.ts` | Blog content collection with Zod schema | VERIFIED | All 6 schema fields present, uses glob loader |
| `src/layouts/BlogPostLayout.astro` | Blog post prose layout with reading time and back link | VERIFIED | `href="/blog"` back link, `<time>`, `minutesRead` display, `type="article"`, prose container |
| `src/pages/blog/index.astro` | Blog listing page with draft filter and empty state | VERIFIED | `getCollection('blog')`, draft filter, empty state, h1 "Blog" |
| `src/pages/blog/[...slug].astro` | Dynamic blog post route with reading time | VERIFIED | `getStaticPaths`, `remarkPluginFrontmatter.minutesRead`, `coverImage ?? '/og-default.png'` |
| `public/robots.txt` | Crawler directives with sitemap reference | VERIFIED | `User-agent: *`, `Allow: /`, `Sitemap: https://tuwa.app/sitemap-index.xml` |
| `public/og-default.png` | Branded 1200x630 default OG image | VERIFIED | 26008 bytes, 1200x630 PNG confirmed |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `astro.config.mjs` | `src/remark-reading-time.mjs` | `markdown.remarkPlugins` import | VERIFIED | `import { remarkReadingTime } from './src/remark-reading-time.mjs'` present; `remarkPlugins: [remarkReadingTime]` in markdown config |
| `src/layouts/BaseLayout.astro` | `src/components/SEO.astro` | type prop passthrough | VERIFIED | `type={type}` in SEO component usage at line 28 |
| `src/pages/blog/index.astro` | `src/content.config.ts` | `getCollection('blog')` | VERIFIED | `getCollection('blog', ...)` call present |
| `src/pages/blog/[...slug].astro` | `src/layouts/BlogPostLayout.astro` | layout import | VERIFIED | `import BlogPostLayout from '../../layouts/BlogPostLayout.astro'` |
| `src/pages/blog/[...slug].astro` | `src/remark-reading-time.mjs` | `remarkPluginFrontmatter.minutesRead` | VERIFIED | `const minutesRead = remarkPluginFrontmatter.minutesRead` |
| `src/components/SEO.astro` | `public/og-default.png` | ogImage default prop value | VERIFIED | `ogImage = "/og-default.png"` in SEO.astro destructuring |
| `public/robots.txt` | `dist/sitemap-index.xml` | Sitemap URL reference | VERIFIED | `Sitemap: https://tuwa.app/sitemap-index.xml` in robots.txt |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `src/pages/blog/index.astro` | `posts` | `getCollection('blog')` | Yes — Astro content collection reads from `src/content/blog/` | FLOWING (empty collection is correct; empty state handled) |
| `src/pages/blog/[...slug].astro` | `minutesRead` | `remarkPluginFrontmatter.minutesRead` via remark plugin at build time | Yes — plugin runs on MDX content tree | FLOWING |
| `src/layouts/BlogPostLayout.astro` | `minutesRead`, `date`, `title` | Props from `[...slug].astro` | Yes — passes through from content collection | FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build succeeds | `npm run build` | "10 page(s) built in 1.46s" — Complete! | PASS |
| Blog listing page built | Check `dist/blog/index.html` | File exists | PASS |
| Empty state text in built output | grep "Posts coming soon" in dist/blog/index.html | Match found | PASS |
| Sitemap generated | Check `dist/sitemap-index.xml` | File exists; references sitemap-0.xml | PASS |
| robots.txt copied to dist | Check `dist/robots.txt` | File exists (68B) | PASS |
| OG image file size | `stat public/og-default.png` | 26008 bytes (>1000 byte threshold) | PASS |
| OG image dimensions | PNG header bytes 16-23 | 1200x630 confirmed | PASS |
| Canonical URLs use https://tuwa.app | Check dist/index.html and dist/blog/index.html | Both have `href="https://tuwa.app/..."` — not localhost | PASS |
| No Alpino font references in src/ | grep font-alpino in src/ | No matches | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| BLOG-01 | 04-01, 04-02 | MDX content collection with Zod schema (title, date, description, tags, draft flag) | SATISFIED | `src/content.config.ts` — all 6 fields validated |
| BLOG-02 | 04-02 | Blog listing page with post cards | SATISFIED | `src/pages/blog/index.astro` — listing with date, title, description per post |
| BLOG-03 | 04-01, 04-02 | Individual blog post layout with reading time, date, back navigation | SATISFIED | `src/layouts/BlogPostLayout.astro` — all three elements present |
| BLOG-04 | 04-02 | No initial posts required — infrastructure only | SATISFIED | Empty collection builds cleanly; empty state message renders |
| PERF-01 | 04-03 | Lighthouse performance score >= 95 on landing page | NEEDS HUMAN | Documented as human-approved in SUMMARY-03 — cannot confirm programmatically |
| PERF-02 | 04-03 | Semantic HTML throughout (proper heading hierarchy, landmarks, alt text) | SATISFIED | h1 in all page roots, no skipped levels, all img elements have alt, `<main>` in BaseLayout |
| PERF-03 | 04-03 | XML sitemap generated at build time | SATISFIED | `dist/sitemap-index.xml` and `dist/sitemap-0.xml` generated at each build |
| PERF-04 | 04-03 | robots.txt configured for crawling | SATISFIED | `public/robots.txt` with `User-agent: *`, `Allow: /` |
| PERF-05 | 04-03 | Proper canonical URLs on all pages | SATISFIED | Canonical URLs confirmed as `https://tuwa.app/...` in built HTML output |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| None | — | — | — | — |

No TODO/FIXME comments, no hardcoded placeholder returns, no stub implementations found in any phase-4 files.

### Human Verification Required

#### 1. Lighthouse Performance Score

**Test:** Run Lighthouse on https://tuwa.app (or `npm run build && npx serve dist` then localhost) — use Chrome DevTools Lighthouse tab, run both mobile and desktop
**Expected:** Performance score >= 95 on both runs
**Why human:** Lighthouse requires a running browser and cannot be measured from static file inspection alone. SUMMARY-03 documents human approval but the verifier cannot independently confirm the score was >= 95.

#### 2. General Sans Font Visual Rendering

**Test:** Start `npm run dev`, visit http://localhost:4321 and http://localhost:4321/blog, visually confirm the font renders as General Sans (not Alpino or system fallback)
**Expected:** Text appears in General Sans — slightly different weight and character shapes from Alpino; DevTools Network tab shows font requests to Fontshare CDN for "General Sans"
**Why human:** Font rendering depends on Fontshare CDN availability and browser font-face loading — cannot verify from static assets alone.

#### 3. Sitemap Path Discrepancy

**Test:** Confirm whether the sitemap is accessible and crawlers can find it
**Expected:** Either (a) developer accepts that `/sitemap-index.xml` is the correct @astrojs/sitemap output and considers ROADMAP SC wording a naming error, or (b) developer adds a redirect rule `/sitemap.xml -> /sitemap-index.xml` in `public/_redirects`
**Why human:** ROADMAP success criterion 3 says "accessible at /sitemap.xml" but the actual generated file is at `/sitemap-index.xml`. The robots.txt correctly references `sitemap-index.xml`. Crawlers following robots.txt will find the sitemap. However the ROADMAP contract literal says `/sitemap.xml`. Developer decision required on whether to add a redirect alias or accept the current path.

### Gaps Summary

One ambiguous item identified:

**Sitemap path (ROADMAP SC #3):** The ROADMAP says the sitemap is "accessible at /sitemap.xml" but `@astrojs/sitemap` generates `sitemap-index.xml`. The plan explicitly accounts for this (Plan 03 documents the correct filename). robots.txt points to `sitemap-index.xml`. No redirect from `/sitemap.xml` to `/sitemap-index.xml` exists.

This is most likely an acceptable wording error in the ROADMAP (written before knowing the exact filename), not an implementation gap. Crawlers that follow robots.txt will discover the sitemap. However, it requires developer confirmation before marking this phase fully passed.

To close this item without adding a redirect: add an override to this VERIFICATION.md frontmatter:

```yaml
overrides:
  - must_have: "XML sitemap is generated at build time and accessible at /sitemap.xml"
    reason: "@astrojs/sitemap generates sitemap-index.xml (not sitemap.xml) — robots.txt correctly references the generated path; ROADMAP wording was written before the exact filename was known"
    accepted_by: "{your name}"
    accepted_at: "{ISO timestamp}"
```

To close this item by adding a redirect alias: add `/sitemap.xml /sitemap-index.xml 301` to `public/_redirects`.

---

_Verified: 2026-05-11T16:13:00Z_
_Verifier: Claude (gsd-verifier)_
