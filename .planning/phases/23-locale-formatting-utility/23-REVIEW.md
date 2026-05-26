---
phase: 23-locale-formatting-utility
reviewed: 2026-05-26T00:00:00Z
depth: standard
files_reviewed: 7
files_reviewed_list:
  - src/components/StatsCounter.astro
  - src/i18n/format.ts
  - src/layouts/BaseLayout.astro
  - src/layouts/BlogPostLayout.astro
  - src/pages/blog/index.astro
  - src/pages/fr/blog/index.astro
  - src/pages/zh/blog/index.astro
findings:
  critical: 0
  warning: 4
  info: 4
  total: 8
status: issues_found
---

# Phase 23: Code Review Report

**Reviewed:** 2026-05-26
**Depth:** standard
**Files Reviewed:** 7
**Status:** issues_found

## Summary

Phase 23 introduces `src/i18n/format.ts` as the single source of truth for locale-aware date and number formatting (D-03, D-04, D-06, D-07). The utility itself is small, typed, and defensive. Wiring into `BlogPostLayout`, the three `blog/index.astro` pages, and `StatsCounter.astro` is straightforward.

No Critical issues. Several Warning-class concerns surface around (a) the inline counter script in `BaseLayout.astro` re-implementing the BCP-47 mapping instead of importing it (the stated D-07 source of truth is bypassed by design, but the comment alone does not prevent drift), (b) the localized blog index pages displaying every post regardless of locale and linking to potentially non-existent translated routes, and (c) unsafe type assertions on `Astro.currentLocale`. A handful of Info-level polish items (hardcoded back-link text, redundant fallback, empty `hreflangAlternates`) round out the report.

## Warnings

### WR-01: LOCALE_TAG mapping duplicated in inline client script

**File:** `src/layouts/BaseLayout.astro:52, 72`
**Issue:** `format.ts` is declared the source of truth for the locale → BCP-47 mapping (D-07), but the inline counter script hardcodes the same mapping twice:
```js
var tag = locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr-FR' : 'en-US';
```
The comments above each occurrence acknowledge the duplication, but there is no compile-time guarantee they stay in sync with `LOCALE_TAG`. If a new locale (e.g. `de`) is added to `LOCALE_TAG`, the SSR counter rendering will succeed while the client-side count-up silently falls back to `en-US`, producing a visible mismatch on locale-specific pages.
**Fix:** Either (a) render the resolved BCP-47 tag server-side as a second data attribute (`data-locale-tag`) so the script only reads, never maps; or (b) move the script out of `is:inline` and import `LOCALE_TAG` from `format.ts`. Option (a) keeps the existing inline-script architecture intact:
```astro
---
import { LOCALE_TAG } from '../i18n/format';
const tag = LOCALE_TAG[pageLocale as Locale] ?? LOCALE_TAG.en;
---
<span data-counter-target="1200" data-counter-suffix="+" data-locale-tag={tag} ...>
```
```js
var tag = counter.getAttribute('data-locale-tag') || 'en-US';
counter.textContent = target.toLocaleString(tag) + suffix;
```

### WR-02: Localized blog indexes list every post and link to potentially missing translated routes

**File:** `src/pages/fr/blog/index.astro:9-11, 30`, `src/pages/zh/blog/index.astro:11-13, 36`
**Issue:** Both localized blog index pages call `getCollection('blog')` without a locale filter, then build links to `/fr/blog/${post.id}` / `/zh/blog/${post.id}`. If a post only exists in English, the FR/ZH index will display the English title/description and route to a `/fr/blog/<slug>` URL that 404s (or, worse, renders an English post under a localized prefix and confuses hreflang). The English `src/pages/blog/index.astro` has the same query but routes to `/blog/...`, which is the canonical English space, so it does not exhibit the broken-link case.
**Fix:** Filter the collection by `data.locale === 'fr'` (resp. `'zh'`) or by a known per-locale collection convention. Confirm with the content schema what locale field exists; if posts are not yet locale-tagged, render an empty state rather than English posts under a localized prefix:
```ts
const posts = (await getCollection('blog', ({ data }) =>
  (!import.meta.env.PROD || !data.draft) && data.locale === 'fr'
)).sort(...);
```

### WR-03: Unsafe cast on `Astro.currentLocale`

**File:** `src/layouts/BlogPostLayout.astro:15`, `src/pages/blog/index.astro:11`, `src/pages/fr/blog/index.astro:13`, `src/pages/zh/blog/index.astro:15`
**Issue:** `Astro.currentLocale` is typed as `string | undefined`, but every call site asserts `(Astro.currentLocale ?? 'en') as Locale`. If Astro ever returns a locale not present in `Locale` (e.g. a region variant like `'en-GB'`, or a future locale added to `astro.config` but not to `Locale`), TypeScript will silently accept it and the downstream `LOCALE_TAG[locale]` lookup will be `undefined` — which `format.ts` does guard with `?? LOCALE_TAG['en']`, but other consumers (e.g. `useBlogTranslations`) may not. In `fr/blog/index.astro` and `zh/blog/index.astro`, the file is already locale-scoped, so the cast is pointlessly indirect.
**Fix:** In locale-scoped pages, drop `Astro.currentLocale` entirely and pass the literal:
```ts
const locale: Locale = 'fr';
```
For the shared `BlogPostLayout`, narrow with a guard instead of asserting:
```ts
const raw = Astro.currentLocale;
const locale: Locale = raw === 'zh' || raw === 'fr' ? raw : 'en';
```

### WR-04: `BlogPostLayout` overrides hreflang with an empty array

**File:** `src/layouts/BlogPostLayout.astro:17`
**Issue:** `hreflangAlternates={[]}` is passed unconditionally. If `BaseLayout`/`SEO` would otherwise emit default hreflang entries (or skip them when the prop is absent), this explicitly suppresses them for every blog post — harmful for SEO of translated posts and inconsistent with the SEO infrastructure decisions referenced elsewhere. The prop is optional in `BaseLayout` (line 14), so passing `[]` is a deliberate override rather than required boilerplate.
**Fix:** Either omit the prop and let SEO compute defaults, or compute real alternates from the post's available translations:
```astro
<BaseLayout ... locale={locale}>
```
(omit `hreflangAlternates`) — or wire it up to actual translations once available.

## Info

### IN-01: Redundant fallback in `formatDate`/`formatNumber`

**File:** `src/i18n/format.ts:24, 40`
**Issue:** `LOCALE_TAG[locale ?? 'en'] ?? LOCALE_TAG['en']` — the second `?? LOCALE_TAG['en']` is unreachable when `locale` is typed as `Locale | undefined`, because `LOCALE_TAG` has total coverage of `Locale` and `'en'` is always present. It only matters if a caller bypasses TypeScript (which several call sites in this PR effectively do via `as Locale` — see WR-03). Defensible as belt-and-suspenders, but worth a comment if kept.
**Fix:** Either remove the second fallback, or add a comment: `// Defensive: guards against unsafe casts at call sites (see WR-03).`

### IN-02: Hardcoded English "← Blog" back-link on all locales

**File:** `src/layouts/BlogPostLayout.astro:21-32`
**Issue:** The back-link href is `/blog` and the visible label is `&larr; Blog`, regardless of `locale`. On a French or Chinese blog post, the user is sent to the English blog index and sees English UI chrome. Not introduced by this phase, but the file is in scope and this surfaces alongside WR-02/WR-04 as part of the broader blog-i18n gap.
**Fix:** Route to `/${locale}/blog` for non-English locales, and pull the label from `useBlogTranslations(locale)`.

### IN-03: Counter parses target without range validation

**File:** `src/layouts/BaseLayout.astro:47, 67`
**Issue:** `parseInt(counter.getAttribute('data-counter-target'), 10)` accepts negative numbers and silently coerces things like `"1200abc"` to `1200`. Not exploitable (values come from server-rendered Astro markup), but a malformed authoring mistake (e.g. `data-counter-target="-1200"`) would animate from 0 to a negative number with `Math.floor(progress * target)`, producing decreasing values. `isNaN` guard catches only the fully-invalid case.
**Fix:** Tighten the guard:
```js
if (!Number.isFinite(target) || target < 0) return;
```

### IN-04: `pageLocale` triple-fallback collapses to a no-op

**File:** `src/components/StatsCounter.astro:12`
**Issue:** `const pageLocale = Astro.currentLocale ?? locale ?? 'en';` — `locale` already defaults to `'en'` in the destructuring on line 9, so the `?? 'en'` tail is dead. Harmless, but reads as if there's a third layer of defense that doesn't exist.
**Fix:** `const pageLocale = Astro.currentLocale ?? locale;`

---

_Reviewed: 2026-05-26_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
