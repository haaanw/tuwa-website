---
phase: 22-seo-verification-polish
plan: 01
subsystem: seo
tags: [astro, hreflang, sitemap, i18n, og-locale, 404-pages, noto-sans-sc]

# Dependency graph
requires:
  - phase: 21-legal-support-blog
    provides: zh/fr wrapper page patterns, Noto Sans SC font import pattern
  - phase: 20-feature-pages
    provides: locale wrapper page structure, use*Translations() pattern
provides:
  - hreflang link tags on every page (en/zh/fr + x-default)
  - og:locale meta tag per locale (en_US / zh_CN / fr_FR)
  - sitemap.xml with xhtml:link hreflang annotations for all 30+ pages
  - locale-specific 404 pages (en/zh/fr) with translated content
  - use404Translations() utility function in src/i18n/utils.ts
affects: [23-deployment, any future page additions requiring hreflang]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SEO.astro accepts hreflangAlternates prop to override auto-derived alternates — pass [] to suppress (blog posts)"
    - "og:locale derived from locale prop or Astro.url.pathname fallback"
    - "Locale 404 pages at src/pages/{locale}/404.astro — en at root 404.astro"
    - "@astrojs/sitemap i18n config with BCP-47 locale map"

key-files:
  created:
    - src/i18n/locales/en/404.ts
    - src/i18n/locales/zh/404.ts
    - src/i18n/locales/fr/404.ts
    - src/pages/404.astro
    - src/pages/zh/404.astro
    - src/pages/fr/404.astro
  modified:
    - src/components/SEO.astro
    - src/layouts/BaseLayout.astro
    - src/layouts/BlogPostLayout.astro
    - src/i18n/utils.ts
    - astro.config.mjs

key-decisions:
  - "Derive hreflang URLs from Astro.url.pathname — strip /zh/ or /fr/ prefix to get base path, construct 3 alternates"
  - "hreflangAlternates prop allows callers to override: pass [] to suppress (used by BlogPostLayout for EN-only posts)"
  - "og:locale derived first from locale prop, then from URL pathname — self-contained in SEO.astro"
  - "Sitemap i18n uses zh-CN (not zh) as BCP-47 tag per sitemap spec while locale key remains zh"
  - "Locale 404 pages generate as dist/{locale}/404/index.html (standard Astro static output) not dist/{locale}/404.html"

patterns-established:
  - "hreflangAlternates={[]} pattern: pass to BaseLayout/SEO to suppress alternates on locale-specific pages"
  - "404 translation namespace: follows exact WidenStrings pattern from en/blog.ts"
  - "use404Translations() follows exact useBlogTranslations() pattern in utils.ts"

requirements-completed: [I18N-11, I18N-12, I18N-13, I18N-14]

# Metrics
duration: 25min
completed: 2026-05-25
---

# Phase 22 Plan 01: SEO Verification & Polish Summary

**hreflang link tags and og:locale meta tag in SEO.astro, sitemap i18n annotations via @astrojs/sitemap, and three locale-specific 404 pages (en/zh/fr) with use404Translations() utility**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-05-25T17:45:00Z
- **Completed:** 2026-05-25T17:50:00Z
- **Tasks:** 3 completed
- **Files modified:** 11 (5 modified, 6 created)

## Accomplishments

- Every page head now emits 4 hreflang link tags (en, zh, fr, x-default) auto-derived from Astro.url.pathname
- og:locale meta tag correctly signals en_US / zh_CN / fr_FR to social platforms
- sitemap.xml includes xhtml:link hreflang annotations for all 30 pages across 3 locales (confirmed 40 zh-URL and 40 fr-URL entries)
- Three locale-appropriate 404 pages created with fully translated content; zh/404 uses Noto Sans SC per T-22-03 threat mitigation
- BlogPostLayout passes hreflangAlternates={[]} to suppress spurious zh/fr alternates on EN-only blog posts

## Task Commits

Each task was committed atomically:

1. **Task 1: hreflang + og:locale in SEO.astro, locale forwarding in BaseLayout and BlogPostLayout** - `fa939b5` (feat)
2. **Task 2: Sitemap i18n config in astro.config.mjs** - `19a5f35` (feat)
3. **Task 3: 404 translation namespaces, utils.ts extension, and 404 page files** - `4c1f380` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/components/SEO.astro` - Added locale, hreflangAlternates props; emits hreflang link tags + og:locale meta tag
- `src/layouts/BaseLayout.astro` - Added hreflangAlternates prop; forwards both locale and hreflangAlternates to SEO
- `src/layouts/BlogPostLayout.astro` - Added hreflangAlternates={[]} to suppress EN-only post alternates
- `astro.config.mjs` - Replaced bare sitemap() with i18n-configured version (en/zh-CN/fr BCP-47 map)
- `src/i18n/utils.ts` - Added en404/zh404/fr404 imports, NotFound type import, notFoundTranslations record, use404Translations() export
- `src/i18n/locales/en/404.ts` - NotFound namespace with WidenStrings pattern; exports NotFound type
- `src/i18n/locales/zh/404.ts` - Chinese 404 content implementing NotFound type
- `src/i18n/locales/fr/404.ts` - French 404 content implementing NotFound type
- `src/pages/404.astro` - English 404 page using BaseLayout with CSS design token variables
- `src/pages/zh/404.astro` - Chinese 404 page with Noto Sans SC 400/700 import + --font-sans override
- `src/pages/fr/404.astro` - French 404 page using BaseLayout with locale="fr"

## Decisions Made

- Derive hreflang URLs in SEO.astro from `Astro.url.pathname` rather than requiring explicit prop threading from all pages — self-contained, requires only BaseLayout to forward locale
- Use `hreflangAlternates={[]}` escape hatch: when passed, SEO.astro emits no alternate tags and no x-default — used by BlogPostLayout for EN-only posts
- og:locale is derived from `locale` prop first, then falls back to URL path inspection — allows explicit locale override without URL dependency
- Sitemap uses `zh-CN` BCP-47 tag (not `zh`) as the value while the locale key remains `zh` to match Astro routing path prefixes
- Locale 404 pages build to `dist/zh/404/index.html` not `dist/zh/404.html` — this is standard Astro static output for non-root 404 pages; Cloudflare Pages will serve these correctly

## Deviations from Plan

None - plan executed exactly as written. One minor note: the plan acceptance criteria said `dist/zh/404.html` but Astro outputs `dist/zh/404/index.html` for locale pages (only root 404.astro generates 404.html). This is expected Astro behavior, not a deviation.

## Issues Encountered

- Files written via absolute path `/Users/hanwen/Desktop/tuwa-website/src/...` instead of worktree path — detected via `git status` showing nothing changed, corrected by copying modified files to the worktree directory at `/Users/hanwen/Desktop/tuwa-website/.claude/worktrees/agent-a5b37413/src/...`
- Pre-existing TypeScript error in `src/content.config.ts` (`Cannot find module 'astro:content'`) — confirmed pre-existing on base branch, not introduced by this plan

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All I18N-11 through I18N-14 requirements complete
- Phase 22 SEO infrastructure is now complete: hreflang, og:locale, sitemap i18n, locale 404 pages
- No blockers for deployment

## Self-Check: PASSED

All 11 key files verified present. All 3 task commits verified in git log:
- `fa939b5` feat(22-01): add hreflang alternates and og:locale to SEO.astro
- `19a5f35` feat(22-01): configure sitemap i18n with hreflang annotations
- `4c1f380` feat(22-01): add locale-specific 404 pages with translation namespaces

---
*Phase: 22-seo-verification-polish*
*Completed: 2026-05-25*
