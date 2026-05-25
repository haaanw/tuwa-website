---
phase: 20-feature-pages
reviewed: 2026-05-25T00:00:00Z
depth: standard
files_reviewed: 32
files_reviewed_list:
  - src/components/FeatureCTA.astro
  - src/i18n/locales/en/coaching.ts
  - src/i18n/locales/en/cold-start.ts
  - src/i18n/locales/en/common.ts
  - src/i18n/locales/en/recovery-scoring.ts
  - src/i18n/locales/en/smart-templates.ts
  - src/i18n/locales/en/workload-tracking.ts
  - src/i18n/locales/fr/coaching.ts
  - src/i18n/locales/fr/cold-start.ts
  - src/i18n/locales/fr/common.ts
  - src/i18n/locales/fr/recovery-scoring.ts
  - src/i18n/locales/fr/smart-templates.ts
  - src/i18n/locales/fr/workload-tracking.ts
  - src/i18n/locales/zh/coaching.ts
  - src/i18n/locales/zh/cold-start.ts
  - src/i18n/locales/zh/common.ts
  - src/i18n/locales/zh/recovery-scoring.ts
  - src/i18n/locales/zh/smart-templates.ts
  - src/i18n/locales/zh/workload-tracking.ts
  - src/i18n/utils.ts
  - src/layouts/CoachingPageLayout.astro
  - src/layouts/FeaturePageLayout.astro
  - src/pages/fr/features/coaching.astro
  - src/pages/fr/features/cold-start.astro
  - src/pages/fr/features/recovery-scoring.astro
  - src/pages/fr/features/smart-templates.astro
  - src/pages/fr/features/workload-tracking.astro
  - src/pages/zh/features/coaching.astro
  - src/pages/zh/features/cold-start.astro
  - src/pages/zh/features/recovery-scoring.astro
  - src/pages/zh/features/smart-templates.astro
  - src/pages/zh/features/workload-tracking.astro
findings:
  critical: 0
  warning: 4
  info: 4
  total: 8
status: issues_found
---

# Phase 20: Code Review Report

**Reviewed:** 2026-05-25
**Depth:** standard
**Files Reviewed:** 32
**Status:** issues_found

## Summary

Phase 20 adds localized (zh, fr) feature pages for all five feature sections (recovery scoring, workload tracking, smart templates, cold start, coaching), a shared `FeatureCTA` component, two layout files (`FeaturePageLayout`, `CoachingPageLayout`), an i18n utility module, and the full set of English, Chinese, and French locale files. Translations are complete — no English fragments appear in zh or fr locale files, and all locale files satisfy their TypeScript type constraints via the `import type` pattern.

The structural issues are concentrated in two areas: a type-safety bypass in `FeatureCTA.astro` and four missing `ogImage` props in the coaching pages, which cause OG image metadata to fall back to the site default rather than the feature-specific image. The layouts are pixel-identical to each other (`CoachingPageLayout` is a strict superset of `FeaturePageLayout`), which is a duplication concern but not a bug.

---

## Warnings

### WR-01: Missing `ogImage` on both coaching pages

**File:** `src/pages/fr/features/coaching.astro:8` and `src/pages/zh/features/coaching.astro:16`
**Issue:** Neither coaching page passes `ogImage` to `CoachingPageLayout`. The prop is typed `ogImage?: string` so no build error surfaces, but every locale's coaching URL will render with the site-wide default OG image instead of `/og/coaching.png`. All other feature pages in both locales correctly pass `ogImage`.
**Fix:**
```astro
<CoachingPageLayout
  locale="fr"
  title={t.meta.title}
  description={t.meta.description}
  ogImage="/og/coaching.png"
  screenshotAlt={t.hero.screenshotAlt}
  ...
>
```
Apply the same addition to `src/pages/zh/features/coaching.astro`.

---

### WR-02: `as any` type cast bypasses locale type safety in `FeatureCTA`

**File:** `src/components/FeatureCTA.astro:10`
**Issue:** `useTranslations(locale as any)` suppresses TypeScript's check on the `locale` prop. The component's `Props` interface declares `locale?: string`, meaning any string value — including invalid locales like `"es"` or `"de"` — is accepted at the call site without error. The `useTranslations` function accepts `Locale | undefined` (`'en' | 'zh' | 'fr'`), and the cast hides invalid inputs that would otherwise produce a type error at compile time.
**Fix:** Constrain the prop to the `Locale` type and remove the cast:
```typescript
import type { Locale } from '../i18n/utils';

interface Props {
  locale?: Locale;
}

const { locale = 'en' } = Astro.props;
const t = useTranslations(locale);
```
The same pattern should be applied to `FeaturePageLayout.astro` and `CoachingPageLayout.astro`, which also declare `locale?: string` and forward it to child components.

---

### WR-03: `WidenStrings` definition is inconsistent across locale source files

**File:** `src/i18n/locales/en/common.ts:1-7` vs `src/i18n/locales/en/recovery-scoring.ts:1-5` (and all other feature locale en files)
**Issue:** `en/common.ts` defines `WidenStrings` with a special-cased tuple branch:
```typescript
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
  ? WidenStrings<U>[]
  : { [K in keyof T]: WidenStrings<T[K]> };
```
All feature locale files (`recovery-scoring.ts`, `workload-tracking.ts`, `smart-templates.ts`, `cold-start.ts`, `coaching.ts`) use a different variant:
```typescript
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };
```
These two definitions produce different mapped types for tuple/array values. If any future locale file adds an array-typed field, the exported `Type` alias used by zh/fr files may not correctly widen it depending on which variant is in play. The inconsistency also makes the codebase harder to maintain — readers must check which file they are in to understand the type behavior.
**Fix:** Consolidate into a single canonical definition, preferably extracted to `src/i18n/types.ts` and re-exported, so all locale files use the same implementation.

---

### WR-04: `CoachingPageLayout` is a full copy of `FeaturePageLayout` with extra slots — layout duplication risks divergence

**File:** `src/layouts/CoachingPageLayout.astro:1-91` vs `src/layouts/FeaturePageLayout.astro:1-63`
**Issue:** The hero and screenshot sections in `CoachingPageLayout` are copied verbatim from `FeaturePageLayout` (lines 22–56 are identical). Future style changes to the hero in `FeaturePageLayout` will not automatically apply to `CoachingPageLayout`, causing visual divergence between feature pages. This is not a build-time error today but is a structural maintainability issue that will produce bugs when either file is independently modified.
**Fix:** Refactor `CoachingPageLayout` to extend `FeaturePageLayout` using a named slot pattern, or extract the shared hero + screenshot section into a shared `FeatureHero.astro` component that both layouts import.

---

## Info

### IN-01: `zh/common.ts` uses `current: '中文'` while `fr/common.ts` uses `current: 'FR'`

**File:** `src/i18n/locales/zh/common.ts:16` vs `src/i18n/locales/fr/common.ts:16`
**Issue:** The language switcher `current` field is inconsistent in format: French uses a two-letter code (`'FR'`), Chinese uses the full native name (`'中文'`), and the English source uses a two-letter code (`'EN'`). If the language switcher component renders `current` as a compact label (e.g., in a dropdown button), `'中文'` will be wider than `'EN'`/`'FR'` and may cause layout overflow on small screens. This is intentional only if the zh label is expected to display the full word.
**Fix:** If consistency is desired, standardize to `'ZH'` to match the `'EN'`/`'FR'` pattern. If `'中文'` is intentional for legibility on Chinese devices, document the decision in the locale file with a comment.

---

### IN-02: `src/i18n/utils.ts` imports are not grouped by locale

**File:** `src/i18n/utils.ts:1-21`
**Issue:** Imports are interleaved — `enCoaching` is imported at line 15, then `zhRecoveryScoring` at line 16. The grouping is neither by locale nor by feature, making the import block harder to scan as new locales or features are added. Type imports are also separated from their corresponding value imports (value imports end at line 21; type imports start at line 22).
**Fix:** Group imports by locale (all `en/*` together, all `zh/*` together, all `fr/*` together) or by feature pair (en/zh/fr for each feature in sequence). Either convention works; pick one and apply it consistently.

---

### IN-03: `zh/smart-templates.ts` omits "— Tuwa" suffix in `meta.title` while other zh locale files include it

**File:** `src/i18n/locales/zh/smart-templates.ts:5`
**Issue:** The meta title is `'智能训练模板'` with no brand suffix. Compare:
- `zh/recovery-scoring.ts:5` — `'恢复评分 — Tuwa'`
- `zh/workload-tracking.ts:5` — `'训练负荷追踪 — Tuwa'`
- `zh/coaching.ts:5` — `'教练功能 — Tuwa'`
- `zh/smart-templates.ts:5` — `'智能训练模板'` (missing suffix)

The missing suffix means the browser tab and search engine title for the Chinese smart-templates page will not include the Tuwa brand name, unlike every other zh feature page.
**Fix:**
```typescript
title: '智能训练模板 — Tuwa',
```

---

### IN-04: `src/i18n/locales/fr/recovery-scoring.ts:19` minor gender agreement error in French

**File:** `src/i18n/locales/fr/recovery-scoring.ts:19`
**Issue:** The sentence reads `"que ton sommeil a été écourtée"` — `écourtée` is feminine past participle but `sommeil` (sleep) is masculine in French. The correct form is `écourtÉ`. This is a content quality issue and will read as incorrect to native French speakers.
**Fix:**
```typescript
p2: 'Ce chiffre est utile en lui-même, mais il prend encore plus de valeur associé à des facteurs d\'explication en langage clair. Tuwa ne te dit pas seulement que ta forme est à 62 — il t\'explique que ta VFC est 8 % en dessous de ta référence récente, que ton sommeil a été écourté, mais que ta fréquence cardiaque au repos est normale. Tu comprends non seulement le score, mais aussi pourquoi.',
```

---

_Reviewed: 2026-05-25_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
