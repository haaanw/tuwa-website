# Phase 23: Locale Formatting Utility - Pattern Map

**Mapped:** 2026-05-26
**Files analyzed:** 6 (1 new, 5 modified)
**Analogs found:** 6 / 6

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/i18n/format.ts` (new) | utility (i18n) | transform | `src/i18n/utils.ts` | exact (sibling i18n module) |
| `src/layouts/BlogPostLayout.astro` (modified) | layout | transform / template | self (line 53) + `src/pages/zh/blog/index.astro` for locale prop pattern | exact |
| `src/pages/blog/index.astro` (modified) | page | template | self (line 44) | exact |
| `src/pages/zh/blog/index.astro` (modified) | page | template | self (line 34) | exact |
| `src/pages/fr/blog/index.astro` (modified) | page | template | self (line 28) | exact |
| `src/layouts/BaseLayout.astro` (modified) | layout (client-script) | client transform via dataset | self (existing `data-counter-target` / `data-counter-suffix` dataset reads, lines 46-50, 62-72) | exact |

---

## Pattern Assignments

### `src/i18n/format.ts` (utility, transform) — NEW

**Analog:** `src/i18n/utils.ts`

**Why this analog:** Sibling module in the same directory. Same role: small typed exports keyed by `Locale`. Same conventions: named-only exports, `Locale` type as union, `Record<Locale, T>` lookup table with `?? 'en'` fallback. Phase 23 (D-09) explicitly re-imports `Locale` from here.

**Imports pattern** (`src/i18n/utils.ts:37-48`):
```typescript
import type { Common } from './locales/en/common';
// ...
import type { NotFound } from './locales/en/404';
```
- Type imports use `import type` and relative paths (`./...`).
- `format.ts` should follow: `import type { Locale } from './utils';`

**Locale-keyed lookup table** (`src/i18n/utils.ts:54-58`):
```typescript
const translations: Record<Locale, Common> = {
  en: enCommon,
  zh: zhCommon,
  fr: frCommon,
};
```
- Use this exact shape for the `LOCALE_TAG` constant: `const LOCALE_TAG: Record<Locale, string> = { en: 'en-US', zh: 'zh-CN', fr: 'fr-FR' }`.
- Export it (`export const LOCALE_TAG = ...`) — `utils.ts` keeps the internal table private, but D-07/D-09 require `LOCALE_TAG` to be a named export so future call sites can reference it.

**Fallback pattern** (`src/i18n/utils.ts:126-128`):
```typescript
export function useTranslations(locale: Locale | undefined): Common {
  return translations[locale ?? 'en'] ?? translations['en'];
}
```
- Defensive `?? 'en'` for both `undefined` locale and unknown-key lookup. Mirror this in `formatDate` / `formatNumber`:
  ```typescript
  export function formatDate(date: Date, locale: Locale | undefined, options?: Intl.DateTimeFormatOptions): string {
    const tag = LOCALE_TAG[locale ?? 'en'] ?? LOCALE_TAG['en'];
    return date.toLocaleDateString(tag, options ?? { year: 'numeric', month: 'long', day: 'numeric' });
  }
  ```
- Note D-03: default options are the long-style date object shown above. Keep the visual contract identical (D-06).
- D-04 / `formatNumber`: no default options; just `value.toLocaleString(tag, options)`.

**Signature style** (`src/i18n/utils.ts:126-172`):
- Every public function takes `locale: Locale | undefined` (not bare `Locale`). Phase 23 should match — `Astro.currentLocale` is typed as `string | undefined`, so this is the ergonomic shape.
- Plain named function, no class/factory wrapper (D-05).
- Single-line return where possible.

**Error handling:** None. `utils.ts` has no try/catch — Intl APIs accept unknown tags by falling back to the system default, and the `?? 'en'` guard makes invalid input safe. Do not introduce try/catch.

---

### `src/layouts/BlogPostLayout.astro` (layout, transform)

**Analog:** self (line 53) + `src/pages/zh/blog/index.astro:34` for locale-aware shape

**Current pattern** (line 52-54):
```astro
<time datetime={date.toISOString()}>
  {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
</time>
```

**Replacement pattern:**
```astro
---
import BaseLayout from './BaseLayout.astro';
import { formatDate } from '../i18n/format';
import type { Locale } from '../i18n/utils';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  date: Date;
  minutesRead?: string;
}

const { title, description, ogImage, date, minutesRead } = Astro.props;
const locale = (Astro.currentLocale ?? 'en') as Locale;
---
...
<time datetime={date.toISOString()}>
  {formatDate(date, locale)}
</time>
```
- Preserve `<time datetime={date.toISOString()}>` wrapper (per CONTEXT §code_context: `datetime` stays ISO; only the visible label is locale-formatted).
- Locale source: `Astro.currentLocale` (already wired by Phase 17, per CONTEXT §code_context). Cast `as Locale` after `??` fallback.
- Also propagate `locale` to `<BaseLayout locale={locale}>` so the counter scripts (see below) inherit it — but the existing `BaseLayout` props already accept `locale?: string`, so this is a one-line addition.

---

### `src/pages/blog/index.astro` (page, template)

**Analog:** self (line 44)

**Current** (line 44): `{post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`

**Replacement** (apply at the `.astro` frontmatter + call site):
```astro
---
import { formatDate } from '../../i18n/format';
import type { Locale } from '../../i18n/utils';

const locale = (Astro.currentLocale ?? 'en') as Locale;
---
...
{formatDate(post.data.date, locale)}
```
- Default options reproduce the long-style output (D-03/D-06); no second arg needed.

### `src/pages/zh/blog/index.astro` and `src/pages/fr/blog/index.astro`

Identical replacement to the en variant above. The hardcoded tags (`'zh-CN'`, `'fr-FR'`) drop out because `formatDate` reads them from `LOCALE_TAG[locale]`. Confirm `Astro.currentLocale` returns `'zh'` / `'fr'` on these routes (Phase 17 routing — already in place).

---

### `src/layouts/BaseLayout.astro` (layout, client-script transform)

**Analog:** self — the existing `data-counter-target` / `data-counter-suffix` pattern (lines 46-50, 62-72) is exactly the dataset-reading convention to extend.

**Current dataset-read pattern** (lines 46-50, inline `is:inline` script):
```javascript
document.querySelectorAll('[data-counter-target]').forEach(function(counter) {
  var target = parseInt(counter.getAttribute('data-counter-target'), 10);
  if (isNaN(target)) return;
  var suffix = counter.getAttribute('data-counter-suffix') || '';
  counter.textContent = target.toLocaleString() + suffix;
});
```

**Three call sites to migrate** (lines 50, 72, 76): each currently calls `.toLocaleString()` with no arg. After migration, each must use the page locale (D-02) via a third dataset attribute, mirroring the `data-counter-suffix` pattern already in place.

**Replacement pattern — add `data-locale` read alongside the existing reads:**
```javascript
document.querySelectorAll('[data-counter-target]').forEach(function(counter) {
  var target = parseInt(counter.getAttribute('data-counter-target'), 10);
  if (isNaN(target)) return;
  var suffix = counter.getAttribute('data-counter-suffix') || '';
  var locale = counter.getAttribute('data-locale') || 'en';
  var tag = locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr-FR' : 'en-US';
  counter.textContent = target.toLocaleString(tag) + suffix;
});
```

**Important — `is:inline` constraint (lines 39-99):** The counter script is `<script is:inline>`, which Astro does NOT bundle. ESM imports cannot be added here — see CONTEXT §code_context bullet 3: "cannot directly import `format.ts` unless the script is a `<script>` (Astro bundles these by default) or you inline the small `formatNumber` body."

Planner must choose one of:
1. **Inline the tag-map and call `.toLocaleString(tag, ...)` directly inside the `is:inline` script** (above pattern). Simplest, no bundling change, but duplicates the tag map. Acceptable since the duplication is 3 lines and `LOCALE_TAG` in `format.ts` remains the documented source of truth.
2. **Drop `is:inline` from the counter script** so Astro bundles it and `formatNumber` / `LOCALE_TAG` can be imported. Risk: changes script load timing relative to FCP for an animation-critical script.

Decision is the planner's; flag both options in the PLAN.

**Plumbing the `data-locale` attribute onto counter elements:**

Counter elements are rendered in the home page (or wherever `[data-counter-target]` exists — search at plan time). The page already has `Astro.currentLocale` available; add `data-locale={Astro.currentLocale ?? 'en'}` to each counter element alongside the existing `data-counter-target` / `data-counter-suffix` attributes. Mirrors the prop-to-data-attribute pattern that already works in this file.

**Existing locale-prop precedent** (`src/layouts/BaseLayout.astro:13-20, 30, 34, 38`):
```astro
interface Props {
  // ...
  locale?: string;
  // ...
}
const { title, description, ogImage, canonical, type, locale = 'en', hreflangAlternates } = Astro.props;
---
<html lang={locale}>
  ...
  <SEO ... locale={locale} ... />
  <Header locale={locale} />
  <Footer locale={locale} />
```
- `locale` is already a first-class prop with `'en'` default and is threaded through `<html lang>`, SEO, Header, Footer. Reuse this same variable when writing `data-locale={locale}` on counter elements — no new prop needed.

---

## Shared Patterns

### Locale plumbing (Astro frontmatter → template)
**Source:** `src/layouts/BaseLayout.astro:17` and `src/pages/zh/blog/index.astro` (already uses page locale via translations).
**Apply to:** All 5 modified files.
```astro
const locale = (Astro.currentLocale ?? 'en') as Locale;
```
- `as Locale` cast is necessary because `Astro.currentLocale` is `string | undefined`. The `?? 'en'` guard makes the cast safe.

### Locale-keyed lookup with fallback
**Source:** `src/i18n/utils.ts:126-128`
**Apply to:** `format.ts` (both formatters + `LOCALE_TAG` lookup).
```typescript
table[locale ?? 'en'] ?? table['en']
```
- Double fallback: handles undefined input AND unknown locale keys.

### `<time>` element wrapper for dates
**Source:** `src/layouts/BlogPostLayout.astro:52`, all 3 blog index pages.
**Apply to:** All 4 date call sites (already in place — do not remove).
```astro
<time datetime={date.toISOString()}>{formatDate(date, locale)}</time>
```
- `datetime` attribute stays machine-readable ISO. Only the visible text changes.

### Dataset-attribute → client script (Astro `is:inline` convention)
**Source:** `src/layouts/BaseLayout.astro:46-50, 62-72` (`data-counter-target`, `data-counter-suffix`)
**Apply to:** New `data-locale` attribute on counter elements.
- Read with `el.getAttribute('data-locale')` (the existing code uses `getAttribute`, not `dataset` — match the local style for consistency).
- Always provide an OR-fallback default: `|| 'en'`.

---

## No Analog Found

None. Every file has a precise in-codebase analog (most are self-analogs because Phase 23 is a refactor of existing call sites).

---

## Metadata

**Analog search scope:** `src/i18n/`, `src/layouts/`, `src/pages/blog/`, `src/pages/zh/blog/`, `src/pages/fr/blog/`
**Files scanned:** 6 (all are listed above; no broader search needed since every modified file is its own best analog and `utils.ts` is the canonical sibling for `format.ts`)
**Pattern extraction date:** 2026-05-26
