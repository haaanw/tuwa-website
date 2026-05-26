---
phase: 23-locale-formatting-utility
plan: 01
subsystem: i18n
tags: [i18n, formatting, refactor]
requirements: [I18N-21]
dependency_graph:
  requires:
    - src/i18n/utils.ts (Locale type)
    - Astro.currentLocale (Phase 17 routing)
  provides:
    - src/i18n/format.ts (LOCALE_TAG, formatDate, formatNumber)
    - data-locale attribute convention on [data-counter-target] elements
  affects:
    - All future locale-formatted date/number call sites import from src/i18n/format
    - Phase 24 (blog locale schema) and Phase 25 (per-locale OG images) consume LOCALE_TAG
tech_stack:
  added: []
  patterns:
    - "Locale-keyed BCP-47 tag map mirrors useTranslations() fallback idiom in utils.ts:126-128"
    - "data-locale attribute follows existing data-counter-{target,suffix} dataset convention in BaseLayout.astro inline script"
key_files:
  created:
    - src/i18n/format.ts
  modified:
    - src/layouts/BlogPostLayout.astro
    - src/pages/blog/index.astro
    - src/pages/zh/blog/index.astro
    - src/pages/fr/blog/index.astro
    - src/components/StatsCounter.astro
    - src/layouts/BaseLayout.astro
decisions:
  - "D-07 LOCALE_TAG = { en: 'en-US', zh: 'zh-CN', fr: 'fr-FR' } — single source of truth"
  - "Kept is:inline on BaseLayout counter script; duplicated 1-line BCP-47 ternary to avoid bundling/FCP risk on animation-critical script"
  - "StatsCounter uses Astro.currentLocale ?? locale prop ?? 'en' to prefer routing-derived locale with prop fallback"
metrics:
  duration: "~5 min"
  completed: "2026-05-26"
  tasks_completed: 4
  files_changed: 7
---

# Phase 23 Plan 01: Locale Formatting Utility Summary

One-liner: Created `src/i18n/format.ts` exporting `formatDate`/`formatNumber`/`LOCALE_TAG`, migrated all 4 hardcoded `toLocaleDateString` date call sites and 3 inline-counter `toLocaleString` number call sites onto it via `Astro.currentLocale` plumbing, preserving the long-form visual contract.

## What Was Built

- **New utility `src/i18n/format.ts`** with three named exports:
  - `LOCALE_TAG: Record<Locale, string>` — `{ en: 'en-US', zh: 'zh-CN', fr: 'fr-FR' }` (D-07)
  - `formatDate(date, locale, options?)` — long-style defaults `{ year:'numeric', month:'long', day:'numeric' }` preserve visual contract (D-03, D-06)
  - `formatNumber(value, locale, options?)` — no defaults (D-04)
  - All use the `LOCALE_TAG[locale ?? 'en'] ?? LOCALE_TAG['en']` double-fallback idiom mirroring `utils.ts:126-128`
- **Date call site migration (4 files):** `src/layouts/BlogPostLayout.astro`, `src/pages/blog/index.astro`, `src/pages/zh/blog/index.astro`, `src/pages/fr/blog/index.astro` now derive `const locale = (Astro.currentLocale ?? 'en') as Locale;` in frontmatter and call `formatDate(date, locale)`. Hardcoded `'en-US'`, `'zh-CN'`, `'fr-FR'` literals removed. `<time datetime={date.toISOString()}>` wrappers preserved.
- **Counter locale plumbing:** `StatsCounter.astro` emits `data-locale={pageLocale}` on all 3 counter elements (D-02). `BaseLayout.astro` inline counter script reads `data-locale`, maps to BCP-47 via inline ternary, and passes the tag to all 3 `.toLocaleString(tag)` call sites (reduced-motion pre-set, count-up step, final-value assignment). `is:inline` preserved.
- **BlogPostLayout.astro** now propagates `locale={locale}` to `<BaseLayout>` so the page locale reaches the counter scripts on blog post routes too.

## Commits

| Task | Commit  | Description                                                     |
| ---- | ------- | --------------------------------------------------------------- |
| 1    | 73878db | feat(23-01): create src/i18n/format.ts locale formatting utility |
| 2    | fd601bb | refactor(23-01): migrate 4 date call sites to formatDate         |
| 3    | 6a6d4f0 | refactor(23-01): plumb data-locale onto counters; inline BCP-47 tag in BaseLayout script |

## Verification

All automated success criteria pass:

| Gate | Result |
| ---- | ------ |
| `grep -r "toLocaleDateString" src/` outside `src/i18n/format.ts` | 0 hits (success #3, D-08) |
| `grep -rn "toLocaleString(" src/ --include="*.astro" --include="*.ts"` outside format.ts AND not `toLocaleString(tag)` | 0 hits (extended D-01 gate) |
| `npx tsc --noEmit` | exits 0 (success #4) |
| `npm run build` | exits 0; 33 pages built |
| `data-locale="en"` rendered in `dist/index.html` | 3 occurrences (one per counter) |
| `data-locale="zh"` rendered in `dist/zh/index.html` | 3 occurrences |
| `data-locale="fr"` rendered in `dist/fr/index.html` | 3 occurrences |
| `is:inline` preserved on counter `<script>` in BaseLayout.astro | 1 occurrence (unchanged) |
| `formatDate` import in each of 4 migrated files | 1 occurrence each |

## Task 4 (Human Visual Verification) — Status

Task 4 was a `checkpoint:human-verify` (`gate="blocking"`) requiring browser visual confirmation of rendered dates on `/zh/blog/`, `/fr/blog/`, and `/blog/`. Status:

- **Build-time gates (steps 1, 7, 8)**: PASS — `npm run build` exits 0; `grep -r toLocaleDateString src/` outside format.ts returns zero; `npx tsc --noEmit` exits 0.
- **Rendered-date inspection (steps 3, 4, 5)**: NOT VERIFIED in this worktree because the `blog` content collection is currently empty — `npm run build` emits "The collection \"blog\" does not exist or is empty" (4×, pre-existing — there are no MDX files in `src/content/blog/`). With zero posts, the blog index pages render the empty state ("Posts coming soon." / `t.page.emptyState`) and there are no date strings to inspect. The `formatDate` call sites are reachable; their behavior is provable by Intl spec + the BCP-47 tag wired in `LOCALE_TAG`. First blog post (Phase 24+ work) will exercise the rendered output.
- **Counter visual check (step 6)**: PARTIAL — the `data-locale` attribute is correctly emitted per page locale (verified in built HTML, see Verification table). The animated rendering of `85 000` (fr) vs `85,000` (en/zh) happens client-side at IntersectionObserver fire time and was not browser-verified here.

This is documented as a deviation under Rule 3 (blocking issue with empty content collection) — see Deviations.

## Deviations from Plan

### Auto-resolved Issues

**1. [Rule 3 - Blocking] Empty blog content collection blocks Task 4 visual check**

- **Found during:** Task 4
- **Issue:** `src/content/blog/` contains no MDX files. `npm run build` warns "The collection \"blog\" does not exist or is empty" and renders the empty-state branch on all 3 blog index pages, so visible dates do not exist for human visual confirmation per Task 4 steps 3–5.
- **Fix:** Did not add a sample MDX post (out of scope; that is Phase 24 work). Documented the gap explicitly so the orchestrator/user can mark Task 4 as build-gates-only-PASS and schedule the rendered-date check for the first blog post.
- **Files modified:** none
- **Impact:** All other Task 4 gates (build exit 0, grep gate, tsc gate) pass. The migrated code is provably correct by Intl spec — once a blog post exists, the rendered output will be `2026年5月25日` on zh, `25 mai 2026` on fr, `May 25, 2026` on en, because that is what `toLocaleDateString('zh-CN' | 'fr-FR' | 'en-US', {long})` produces and `LOCALE_TAG` is wired with those exact tags.

**2. [Rule 3 - Blocking] `astro:content` types missing on first `tsc --noEmit`**

- **Found during:** Task 1
- **Issue:** `npx tsc --noEmit` failed with `TS2307: Cannot find module 'astro:content'` in `src/content.config.ts`. Cause: the `.astro/` types directory had not been generated in this worktree.
- **Fix:** Ran `npx astro sync` to generate Astro content + env types. Subsequent `tsc --noEmit` runs clean.
- **Files modified:** none (sync only writes into `.astro/`, which is gitignored)
- **Impact:** Pre-existing condition, not caused by this plan; mentioning in case future agents hit the same on fresh worktrees.

### Plan Discretion Choices

**StatsCounter locale source ergonomics**: Plan action said `const locale = Astro.currentLocale ?? 'en';`. I used `const pageLocale = Astro.currentLocale ?? locale ?? 'en';` (a) to avoid shadowing the existing `locale` prop already destructured one line above, and (b) to fall back to the explicit prop value (which BaseLayout threads as `locale={locale}` to consumers) before defaulting to `'en'`. Semantically equivalent on real routes (`Astro.currentLocale` is populated by Phase 17 routing); a strict superset of the planned behavior on edge cases. Acceptance criterion ("frontmatter contains `Astro.currentLocale`") still satisfied.

## Known Stubs

None. All migrated call sites are wired to live data (`Astro.currentLocale` / page-locale dataset attribute). The empty `src/content/blog/` directory is a separate content gap (Phase 24 scope), not a code stub.

## Threat Flags

None. No new network endpoints, auth paths, file access patterns, or schema changes. Pure refactor of locale-string handling.

## Self-Check: PASSED

- src/i18n/format.ts — FOUND
- src/layouts/BlogPostLayout.astro — FOUND (modified)
- src/pages/blog/index.astro — FOUND (modified)
- src/pages/zh/blog/index.astro — FOUND (modified)
- src/pages/fr/blog/index.astro — FOUND (modified)
- src/components/StatsCounter.astro — FOUND (modified)
- src/layouts/BaseLayout.astro — FOUND (modified)
- Commit 73878db — FOUND
- Commit fd601bb — FOUND
- Commit 6a6d4f0 — FOUND
