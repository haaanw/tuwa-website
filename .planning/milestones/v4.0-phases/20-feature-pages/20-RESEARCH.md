# Phase 20: Feature Pages - Research

**Researched:** 2026-05-25
**Domain:** Astro i18n — per-page translation namespaces, layout locale wiring, thin wrapper pages
**Confidence:** HIGH

## Summary

Phase 20 translates 5 feature deep-dive pages (recovery-scoring, workload-tracking, smart-templates, cold-start, coaching) into Chinese and French. The infrastructure from Phases 17–19 is fully in place: `useTranslations()`, `WidenStrings<T>`, `CJKLayout`, locale-aware `BaseLayout`, and the thin-wrapper page pattern. This phase is a direct extension of that infrastructure — no new architectural patterns, no new npm packages, no new risks.

The primary work is mechanical but voluminous: 5 namespace `.ts` files per locale (15 total), 10 new wrapper `.astro` pages, locale prop threading into 2 layouts (`FeaturePageLayout` and `CoachingPageLayout`), and a `FeatureCTA` refactor to accept `locale` and use `useTranslations()`. The `utils.ts` file must also be extended to export `useFeatureTranslations()` functions per namespace, matching the `useHomeTranslations()` pattern already in place.

The coaching page is the most complex target: it uses `CoachingPageLayout` with 3 named slots (`coach-athlete`, `team-features`, `invite-flow`) and contains ~190 lines of English inline content. Its translation will be the largest single namespace file. All 4 other feature pages use `FeaturePageLayout` (simpler — props + default slot). French text expansion risk is real but managed by D-08 (trust fluid layout, only fix if UAT reveals breaks).

**Primary recommendation:** Follow the exact home.ts/zh/index.astro pattern. Wire locale prop into layouts first, refactor FeatureCTA second, create namespace files third, create wrapper pages last. This ordering avoids building wrapper pages against unfinished APIs.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** One namespace file per feature page per locale: `recovery-scoring.ts`, `workload-tracking.ts`, `smart-templates.ts`, `cold-start.ts`, `coaching.ts`. Matches the `home.ts` pattern.
- **D-02:** Full extraction — ALL text (headings, paragraphs, alt text, aria labels) becomes translation keys via `useTranslations()`. No inline English left in translated pages.
- **D-03:** Long body paragraphs are individual translation keys, not concatenated. Each `<p>` or `<h2>`/`<h3>` maps to its own key path.
- **D-04:** FeatureCTA locale-aware: add `locale` prop, use `useTranslations()` for headline, body text, and badge alt/aria text. CTA translation keys go in `common.ts` (shared, not duplicated per-page).
- **D-05:** Thin wrapper pages in `src/pages/zh/features/` and `src/pages/fr/features/`. Same pattern as `zh/index.astro`.
- **D-06:** Claude drafts all zh and fr translations inline during execution. User reviews in UAT.
- **D-07:** Chinese feels native — natural Chinese sports/training terminology, not transliterated English. French uses "tu" (informal) for athlete-facing copy.
- **D-08:** Trust fluid layout for French text expansion. Only fix if UAT reveals actual breaks.

### Claude's Discretion

- Translation key naming within each feature namespace (follow nested object patterns from home.ts)
- Whether coaching.ts keys use flat or nested structure for named slot sections
- Alt text translations for screenshots and device frames
- Meta title/description translations for zh/fr feature pages

### Deferred Ideas (OUT OF SCOPE)

- None — discussion stayed within phase scope.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| I18N-07 | 5 feature deep-dive pages fully translated in zh and fr | 15 namespace files (5 pages × 3 locales) + 10 wrapper pages enable full translation coverage |
| I18N-08 | Feature page layouts handle French text expansion without layout breaks | Fluid CSS layout (CSS variables, no fixed widths) + D-08 (trust layout, fix only if UAT breaks) — no layout changes required pre-emptively |

</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Translation key storage | Static build (TS files) | — | Namespace `.ts` files compile into the Astro SSG bundle; no runtime fetch |
| Locale routing | Astro i18n middleware | — | Existing routing from Phase 17; zh/fr prefix handled automatically |
| Font loading for zh | CJKLayout | BaseLayout | CJKLayout overrides `--font-sans` to Noto Sans SC; all zh pages must use CJKLayout or equivalent |
| Locale prop threading | Layout components | Wrapper pages | FeaturePageLayout/CoachingPageLayout pass `locale` down to BaseLayout; wrapper pages supply it |
| CTA translation | FeatureCTA (component) | common.ts (data) | FeatureCTA reads from common.ts via `useTranslations()` — keys shared, not per-page |
| French expansion resilience | CSS (existing) | UAT | No code changes needed; fluid CSS variables handle text growth naturally |

## Standard Stack

All established by Phases 17–19. No new packages needed.

### Core (unchanged from prior phases)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro i18n routing | built-in (Astro 6.x) | Locale URL prefixing | Configured in Phase 17; `prefixDefaultLocale: false` |
| `useTranslations()` | project utility | Per-locale string lookup | Proven pattern from Phase 18/19; `WidenStrings<T>` handles type safety |
| `@fontsource/noto-sans-sc` | installed | Chinese font | Only npm dep added for i18n; loaded in CJKLayout |
| TypeScript | 5.x | Type-safe namespace files | All locale files are `.ts`, validated at build time |

**Installation:** No new packages needed. [VERIFIED: existing package.json]

## Architecture Patterns

### System Architecture Diagram

```
Source feature page (en)          Locale wrapper page (zh/fr)
         │                                   │
    [FeaturePageLayout]              [FeaturePageLayout]
    title={en string}        →      title={t.meta.title}
    hookLine={en string}            hookLine={t.hookLine}
    screenshotAlt={en}              screenshotAlt={t.screenshotAlt}
         │                          locale prop added ──────────────┐
    [slot: page body]          [slot: translated body]              │
    (inline English)           (translation keys)                   ▼
         │                                              [BaseLayout locale={locale}]
    [FeatureCTA]               [FeatureCTA locale={locale}]        │
    (hardcoded English)  →     (reads common.ts via t)    [html lang={locale}]
                                                                    │
                                                           [Header locale={locale}]
                                                           [Footer locale={locale}]
```

```
Translation data flow:

src/i18n/locales/en/recovery-scoring.ts  ─┐
src/i18n/locales/zh/recovery-scoring.ts  ─┼─► useRecoveryScoringTranslations(locale)
src/i18n/locales/fr/recovery-scoring.ts  ─┘        │
                                                    ▼
                                    zh/features/recovery-scoring.astro
                                    (thin wrapper, passes all keys as props)
```

### Recommended Project Structure

```
src/
├── i18n/
│   ├── utils.ts                          # Add useXxxTranslations() per feature + useFeatureCTATranslations()
│   └── locales/
│       ├── en/
│       │   ├── common.ts                 # Add featureCTA keys (D-04)
│       │   ├── home.ts                   # Unchanged
│       │   ├── recovery-scoring.ts       # NEW — source of truth
│       │   ├── workload-tracking.ts      # NEW
│       │   ├── smart-templates.ts        # NEW
│       │   ├── cold-start.ts             # NEW
│       │   └── coaching.ts               # NEW (largest file, ~190 lines content)
│       ├── zh/
│       │   ├── common.ts                 # Add featureCTA keys
│       │   ├── recovery-scoring.ts       # NEW — zh translations
│       │   ├── workload-tracking.ts      # NEW
│       │   ├── smart-templates.ts        # NEW
│       │   ├── cold-start.ts             # NEW
│       │   └── coaching.ts               # NEW
│       └── fr/
│           ├── common.ts                 # Add featureCTA keys
│           ├── recovery-scoring.ts       # NEW — fr translations
│           ├── workload-tracking.ts      # NEW
│           ├── smart-templates.ts        # NEW
│           ├── cold-start.ts             # NEW
│           └── coaching.ts              # NEW
├── layouts/
│   ├── FeaturePageLayout.astro           # MODIFY — add locale prop to Props, pass to BaseLayout
│   └── CoachingPageLayout.astro          # MODIFY — same locale prop threading
├── components/
│   └── FeatureCTA.astro                  # MODIFY — add locale prop, useTranslations() for CTA copy
└── pages/
    ├── zh/features/                      # NEW directory
    │   ├── recovery-scoring.astro        # NEW thin wrapper
    │   ├── workload-tracking.astro       # NEW thin wrapper
    │   ├── smart-templates.astro         # NEW thin wrapper
    │   ├── cold-start.astro              # NEW thin wrapper
    │   └── coaching.astro               # NEW thin wrapper
    └── fr/features/                      # NEW directory
        ├── recovery-scoring.astro        # NEW thin wrapper
        ├── workload-tracking.astro       # NEW thin wrapper
        ├── smart-templates.astro         # NEW thin wrapper
        ├── cold-start.astro              # NEW thin wrapper
        └── coaching.astro               # NEW thin wrapper
```

### Pattern 1: Namespace File Structure (matches home.ts)

Each feature namespace follows the same `WidenStrings<T>` + `as const` + exported type pattern from `home.ts`. [VERIFIED: src/i18n/locales/en/home.ts]

```typescript
// Source: src/i18n/locales/en/home.ts (verified pattern)

// en/recovery-scoring.ts
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const recoveryScoring = {
  meta: {
    title: 'Recovery Scoring — Tuwa',
    description: 'Know exactly how hard to push today. Tuwa synthesizes HRV, resting heart rate, sleep, and wellness into a single daily readiness score.',
  },
  hero: {
    outcomeStatement: 'Know exactly how hard to push today',
    hookLine: 'One readiness number built from everything your body is telling you.',
    screenshotAlt: 'Tuwa app recovery screen showing a daily readiness score with color-coded HRV trend, resting heart rate, sleep duration, and wellness factors',
  },
  howItWorks: {
    heading: 'How it works',
    overview1: 'Every morning, before you pick up a barbell...',
    overview2: 'That number is useful on its own, but...',
    zonesHeading: 'Three zones, clear guidance',
    zones: 'Recovery scores map to three zones...',
    // ... one key per <p> or <h2>/<h3> per D-03
  },
  deviceCompatibility: {
    heading: 'Data from any device you already own',
    body: '...',
  },
  personalBaseline: {
    heading: 'A baseline that\'s yours, not the population\'s',
    body: '...',
  },
  scienceSection: {
    heading: 'The science behind it',
    p1: '...',
    p2: '...',
    p3: '...',
  },
} as const;

export default recoveryScoring;
export type RecoveryScoring = WidenStrings<typeof recoveryScoring>;
```

```typescript
// zh/recovery-scoring.ts — matches type
import type { RecoveryScoring } from '../en/recovery-scoring';

const recoveryScoring: RecoveryScoring = {
  meta: {
    title: '恢复评分 — Tuwa',
    description: '...',
  },
  // ... all keys translated
};
export default recoveryScoring;
```

### Pattern 2: Extending utils.ts (matches useHomeTranslations)

```typescript
// src/i18n/utils.ts — add per-feature lookup functions
// Source: src/i18n/utils.ts (verified pattern)

import enRecoveryScoring from './locales/en/recovery-scoring';
import zhRecoveryScoring from './locales/zh/recovery-scoring';
import frRecoveryScoring from './locales/fr/recovery-scoring';
import type { RecoveryScoring } from './locales/en/recovery-scoring';

const recoveryScoringTranslations: Record<Locale, RecoveryScoring> = {
  en: enRecoveryScoring,
  zh: zhRecoveryScoring,
  fr: frRecoveryScoring,
};

export function useRecoveryScoringTranslations(locale: Locale | undefined): RecoveryScoring {
  return recoveryScoringTranslations[locale ?? 'en'] ?? recoveryScoringTranslations['en'];
}
// ... repeat for each of the 5 features
```

### Pattern 3: FeaturePageLayout locale prop threading

```typescript
// src/layouts/FeaturePageLayout.astro — BEFORE (no locale)
interface Props {
  title: string;
  description: string;
  // ...
}
const { title, description, ... } = Astro.props;
// <BaseLayout title={title} description={description} ogImage={ogImage}>

// AFTER — add locale
interface Props {
  title: string;
  description: string;
  locale?: string;  // add this
  // ...
}
const { title, description, locale = 'en', ... } = Astro.props;
// <BaseLayout title={title} description={description} ogImage={ogImage} locale={locale}>
```

CoachingPageLayout receives identical treatment — same Props change, same BaseLayout pass-through. [VERIFIED: src/layouts/CoachingPageLayout.astro — no locale prop currently]

### Pattern 4: FeatureCTA refactor (D-04)

```typescript
// src/components/FeatureCTA.astro — BEFORE (hardcoded English)
// <h2>Start training with confidence</h2>
// <p>Download Tuwa and take the guesswork out...</p>
// alt="Download on the App Store"
// aria-label="Download Tuwa on the App Store"

// AFTER
---
import { useTranslations } from '../i18n/utils';
import { APP_STORE_URL } from '../config';

interface Props {
  locale?: string;
}
const { locale = 'en' } = Astro.props;
const t = useTranslations(locale as any);
---
// <h2>{t.featureCTA.headline}</h2>
// <p>{t.featureCTA.body}</p>
// alt={t.featureCTA.badgeAlt}
// aria-label={t.featureCTA.badgeAriaLabel}
```

CTA keys added to `common.ts` in all 3 locales:
```typescript
// en/common.ts addition
featureCTA: {
  headline: 'Start training with confidence',
  body: 'Download Tuwa and take the guesswork out of recovery and load management.',
  badgeAlt: 'Download on the App Store',
  badgeAriaLabel: 'Download Tuwa on the App Store',
},
```

### Pattern 5: Thin wrapper pages — zh variant

```astro
// src/pages/zh/features/recovery-scoring.astro
---
import { useRecoveryScoringTranslations } from '../../../i18n/utils';
import CJKLayout from '../../../layouts/CJKLayout.astro';
import FeaturePageLayout from '../../../layouts/FeaturePageLayout.astro';
import DeviceFrame from '../../../components/DeviceFrame.astro';
import RecoveryChart from '../../../components/charts/RecoveryChart.astro';
import recoveryScreenshot from '../../../assets/screenshots/recovery.png';

const t = useRecoveryScoringTranslations('zh');
---
// NOTE: CJKLayout wraps BaseLayout; FeaturePageLayout also wraps BaseLayout.
// Resolution: FeaturePageLayout receives locale="zh"; CJKLayout's font override
// is applied via a style block on this wrapper page (or by using CJKLayout directly
// and bypassing FeaturePageLayout's BaseLayout call — see Anti-Patterns below).
```

**CRITICAL ARCHITECTURE DECISION FOR PLANNER:** There is a layout nesting conflict for zh feature pages. `CJKLayout` wraps `BaseLayout` with `locale="zh"` and applies Noto Sans SC. `FeaturePageLayout` also wraps `BaseLayout`. If a zh wrapper page tries to use both, BaseLayout will be rendered twice.

**Resolution (Claude's discretion per D-05):** zh wrapper pages should use `FeaturePageLayout` with `locale="zh"` prop AND apply the Noto Sans SC font override directly in the wrapper page (same `<style is:global>` block as CJKLayout). Do NOT use CJKLayout + FeaturePageLayout together. [VERIFIED: CJKLayout source — the only unique behavior is the `@font-face` import and the `--font-sans` CSS override, which can be applied inline on wrapper pages]

```astro
// zh/features/recovery-scoring.astro — correct pattern
---
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/700.css';
import FeaturePageLayout from '../../../layouts/FeaturePageLayout.astro';
// ...
---
<style is:global>
  :root { --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif; }
</style>
<FeaturePageLayout locale="zh" title={t.meta.title} ...>
  <!-- translated slot content -->
</FeaturePageLayout>
```

fr wrapper pages use `FeaturePageLayout` directly with `locale="fr"` — no font override needed.

### Pattern 6: coaching.ts key structure — nested by slot

Given coaching.astro uses named slots, the key structure should mirror the slot names:

```typescript
const coaching = {
  meta: { title: '...', description: '...' },
  hero: { outcomeStatement: '...', hookLine: '...', screenshotAlt: '...' },
  howItWorks: {
    heading: 'How it works',
    p1: '...', p2: '...', p3: '...', p4: '...', p5: '...',  // 5 paragraphs
  },
  coachAthlete: {
    athleteHeading: 'For athletes',
    athleteP1: '...', athleteP2: '...', athleteP3: '...',
    coachHeading: 'For coaches',
    coachP1: '...', coachP2: '...', coachP3: '...',
  },
  teamFeatures: {
    heading: 'Team workflows',
    p1: '...', p2: '...', p3: '...', p4: '...',
  },
  inviteFlow: {
    heading: 'Connect in seconds',
    intro: '...',
    codeMethod: '6-character invite code',
    emailMethod: 'Email invitation',
    nfcMethod: 'NFC tap',
    howConnectionLabel: 'How connection works',
    step1: '...', step2: '...', step3: '...', step4: '...',
  },
} as const;
```

### Anti-Patterns to Avoid

- **Double-wrapping BaseLayout:** Never use `CJKLayout` inside a page that also renders `FeaturePageLayout` — both wrap `BaseLayout`, causing duplicate `<html>` elements. [VERIFIED: CJKLayout renders `<BaseLayout>` directly]
- **Concatenating keys for long paragraphs:** D-03 is explicit — each `<p>` is its own key. Do not create `body: p1 + ' ' + p2` patterns.
- **Leaving FeatureCTA untranslated:** The layout renders `<FeatureCTA />` internally. If the locale prop is not threaded to FeatureCTA, every feature page in zh/fr will have an English CTA footer regardless of locale.
- **Using inline English in slot content:** D-02 mandates full extraction. No hardcoded strings inside the `<slot>` content of wrapper pages.
- **Mismatched WidenStrings type:** zh/fr files must `import type { XxxType } from '../en/xxx'` and use it as the variable type. Without this, TypeScript won't catch missing keys.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Type-safe locale lookup | Custom locale map | `useXxxTranslations(locale)` pattern (established) | Already solved in Phase 18/19; adding a new function per namespace is 5 lines |
| Chinese font loading | Manual `@font-face` | `@fontsource/noto-sans-sc` import | Already installed; CJKLayout pattern shows correct usage |
| French text overflow | Custom truncation/resize JS | Fluid CSS variables (existing) | Design uses `max-width`, relative units — text wraps naturally; no JS needed |
| Locale URL generation | Manual string concat | `getRelativeLocaleUrl(locale, path)` from `astro:i18n` | Built-in Astro utility; already used in Phase 19 |

**Key insight:** This phase extends an already-working i18n system. Every pattern needed has been proven in Phase 19. The risk is in volume (15 files) and attention to completeness (D-02: full extraction), not in novel technical problems.

## Common Pitfalls

### Pitfall 1: FeatureCTA locale prop not threaded to layout
**What goes wrong:** zh/fr feature pages display translated content but English "Start training with confidence" CTA at the bottom.
**Why it happens:** `FeaturePageLayout` and `CoachingPageLayout` both call `<FeatureCTA />` with no arguments. The locale prop must be added to both layout Props interfaces AND forwarded to FeatureCTA.
**How to avoid:** Thread locale through: wrapper page → FeaturePageLayout → FeatureCTA. Do this before creating any wrapper pages.
**Warning signs:** zh pages show 中文 content but English CTA footer.

### Pitfall 2: CJKLayout + FeaturePageLayout double-wrapping
**What goes wrong:** Double `<html>` and `<body>` tags; browser renders broken page.
**Why it happens:** Developer uses `<CJKLayout>` as outer wrapper thinking it handles Chinese, then inside renders `<FeaturePageLayout>` which also renders `<BaseLayout>`.
**How to avoid:** zh feature wrapper pages import `@fontsource/noto-sans-sc` directly and apply the CSS override via `<style is:global>`. Do NOT compose CJKLayout with FeaturePageLayout.
**Warning signs:** TypeScript won't catch this; check rendered HTML for duplicate `<html>` tags.

### Pitfall 3: Missing keys in zh/fr namespace files
**What goes wrong:** TypeScript build passes (WidenStrings allows string for any key), but runtime translation shows undefined or empty string.
**Why it happens:** WidenStrings widens all types to string, which means zh/fr files type-check even with missing keys — the type `string | undefined` widens to string at the type level.
**How to avoid:** Manually verify key count matches between en/ and zh/ and fr/ files. Consider adding a test that imports all 3 locales for each namespace and compares key paths.
**Warning signs:** Empty sections or `undefined` rendered in browser during dev.

### Pitfall 4: French text breaking device frame layout in sticky scroll
**What goes wrong:** recovery-scoring's sticky scroll showcase has a left-pinned device frame and right scrolling steps. Very long French paragraph keys could push the step column too wide.
**Why it happens:** recovery-scoring.astro uses a custom `.sticky-showcase` two-column layout (not in FeaturePageLayout). If step text is significantly longer, layout may overflow.
**How to avoid:** Per D-08, trust the layout first. Flag specific elements for UAT. If UAT reveals actual break, the fix is `overflow-wrap: break-word` or reducing max-width on step column — CSS-only, no JS.
**Warning signs:** Horizontal scroll appears on recovery-scoring/fr page at mobile widths.

### Pitfall 5: coaching.ts is the largest file — incomplete first pass
**What goes wrong:** coaching.ts has ~190 lines of English content across 4 named sections + default slot. Rushing the extraction leaves some paragraphs with inline English.
**Why it happens:** Large file, easy to miss paragraphs mid-extraction.
**How to avoid:** Count paragraphs per section in coaching.astro before writing coaching.ts (5 in howItWorks, 3+3 in coachAthlete, 4 in teamFeatures, 1 intro + 3 list items + 4 steps in inviteFlow = ~23 text strings). Verify count matches.
**Warning signs:** zh/fr coaching page has mixed Chinese/French and English paragraphs.

### Pitfall 6: utils.ts becomes unwieldy
**What goes wrong:** Adding 5 more `useXxxTranslations()` functions balloons utils.ts with repetitive boilerplate.
**Why it happens:** Current pattern (home, common) requires a separate record + function per namespace.
**How to avoid:** This is acceptable for 5 features (10 functions total including home). If it grows further in future phases, refactor to a generic `useTranslations(locale, namespace)` pattern. For Phase 20, add 5 functions and move on.
**Warning signs:** utils.ts exceeds ~150 lines — not a blocker, just a code smell.

## Code Examples

### Feature-specific terminology glossary (for translation consistency, D-07)

These terms appear across multiple feature pages and must be consistent within each locale:

| English Term | Chinese (zh) | French (fr) | Notes |
|---|---|---|---|
| HRV / Heart Rate Variability | 心率变异性 (HRV) | VFC (Variabilité de la Fréquence Cardiaque) | Established in zh/fr home.ts and common.ts |
| Recovery Score | 恢复评分 | Score de récupération | Established in common.ts nav |
| Training Load | 训练负荷 | Charge d'entraînement | Established in footer keys |
| ACWR (Acute:Chronic Workload Ratio) | 急慢性训练负荷比 (ACWR) | Ratio charge aiguë:chronique (ACWR) | Keep acronym in parentheses |
| RPE (Rate of Perceived Exertion) | 主观运动强度 (RPE) | RPE (Effort Perçu) | Acronym first in French |
| Reps in Reserve (RIR) | 储备次数 (RIR) | Reps en réserve (RIR) | Keep acronym |
| Readiness | 准备状态 | Forme / niveau de forme | "Forme" used in common.ts |
| Acute load | 急性负荷 | Charge aiguë | Consistent with ACWR term |
| Chronic load | 慢性负荷 | Charge chronique | Consistent with ACWR term |
| Personal Record (PR) | 个人最佳成绩 (PR) | Record personnel (PR) | |
| Autoregulation | 自动调节 | Autorégulation | Technical term, same root |
| HealthKit | HealthKit | HealthKit | Proper noun, untranslated |
| Apple Watch | Apple Watch | Apple Watch | Proper noun, untranslated |
| Coach | 教练 | Coach | "Coach" is commonly used in French sports context |
| Athlete | 运动员 | Athlète | |
| Template | 模板 | Modèle | Established in smart-templates nav key |

[ASSUMED: French sports terminology choices. zh sports terminology verified against common.ts existing translations. Full French term verification would require native speaker review — flag for UAT.]

### complete file count for planning

Total new/modified files:

| Category | Count | Files |
|---|---|---|
| NEW locale namespace files | 15 | 5 features × 3 locales (en/zh/fr) |
| MODIFIED locale files | 3 | en/zh/fr common.ts (featureCTA keys) |
| MODIFIED layouts | 2 | FeaturePageLayout.astro, CoachingPageLayout.astro |
| MODIFIED components | 1 | FeatureCTA.astro |
| MODIFIED utils | 1 | utils.ts (5 new lookup functions) |
| NEW wrapper pages | 10 | 5 pages × 2 locales (zh/fr) |
| NEW directories | 2 | src/pages/zh/features/, src/pages/fr/features/ |
| **TOTAL files touched** | **34** | |

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Monolithic i18n JSON | Per-page TypeScript namespace files | Phase 17 decision | Type-safe, tree-shakeable, readable |
| CJKLayout as page wrapper | CJKLayout for zh/index.astro; inline font import for zh feature pages | Phase 20 (new) | Avoids BaseLayout double-wrapping |
| Hardcoded English FeatureCTA | locale-aware FeatureCTA via common.ts keys | Phase 20 (new) | Single source for CTA copy across all locales |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | French sports terminology is natural and idiomatic for athlete audience | Code Examples (glossary) | French copy may feel clinical; flag in UAT |
| A2 | zh feature page wrapper pattern (inline font import + style override) avoids double-BaseLayout correctly | Pattern 5 | Could cause layout issues if font loading order differs from CJKLayout's approach |
| A3 | `WidenStrings<T>` does not enforce key completeness for zh/fr locale files | Pitfall 3 | If WidenStrings is actually strict (not shown in reviewed code), missing key warnings would surface at compile time |

## Open Questions

1. **zh wrapper pages: font loading order vs CJKLayout**
   - What we know: CJKLayout imports `@fontsource/noto-sans-sc` and sets `--font-sans` via `<style is:global>`. Wrapper pages can replicate this.
   - What's unclear: Whether Astro deduplicates multiple imports of the same fontsource package across pages (it should, via Vite).
   - Recommendation: Implement and verify in browser — no correctness blocker, just a minor optimization concern.

2. **coaching.astro: content is inline, not in a component**
   - What we know: coaching.astro has ~190 lines of inline content across default slot + 3 named slots. Translation keys will be numerous.
   - What's unclear: Whether the planner should break coaching into a sub-wave (layout/CTA first, coaching last due to volume).
   - Recommendation: Planner should schedule coaching.astro as its own task, not bundled with other feature pages. Its key count is 3-4× higher than any other feature page.

## Environment Availability

Step 2.6: SKIPPED (no external dependencies — this phase is pure TypeScript/Astro file creation extending an established codebase pattern).

## Validation Architecture

Step 2.4: nyquist_validation is explicitly `false` in .planning/config.json. SKIPPED.

## Security Domain

No security surface introduced by this phase. Translation files are static TypeScript constants with no user input, no authentication, no external service calls.

## Sources

### Primary (HIGH confidence)
- `src/i18n/utils.ts` — verified: useTranslations/useHomeTranslations pattern, WidenStrings type, Locale union
- `src/i18n/locales/en/home.ts` — verified: namespace file structure, as const + WidenStrings export
- `src/i18n/locales/zh/home.ts` — verified: zh translation style, Chinese sports terminology in use
- `src/i18n/locales/fr/home.ts` — verified: fr translation style, "tu" informal register, VFC terminology
- `src/i18n/locales/zh/common.ts` — verified: established zh nav/footer terminology
- `src/i18n/locales/fr/common.ts` — verified: established fr nav/footer terminology
- `src/layouts/FeaturePageLayout.astro` — verified: Props interface (no locale prop currently), BaseLayout usage
- `src/layouts/CoachingPageLayout.astro` — verified: 3 named slots, Props interface (no locale prop)
- `src/layouts/CJKLayout.astro` — verified: font import pattern, BaseLayout wrapping with locale="zh"
- `src/layouts/BaseLayout.astro` — verified: locale prop exists, passes to html lang and Header/Footer
- `src/components/FeatureCTA.astro` — verified: hardcoded English strings, no locale prop
- `src/pages/zh/index.astro` — verified: thin wrapper pattern with CJKLayout
- `src/pages/fr/index.astro` — verified: thin wrapper pattern with BaseLayout + locale="fr"
- `src/pages/features/recovery-scoring.astro` — verified: all English content to translate
- `src/pages/features/workload-tracking.astro` — verified: all English content to translate
- `src/pages/features/smart-templates.astro` — verified: all English content to translate
- `src/pages/features/cold-start.astro` — verified: all English content to translate
- `src/pages/features/coaching.astro` — verified: 190-line file, 3 named slots + default slot
- `.planning/config.json` — verified: nyquist_validation=false, commit_docs=true

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages; all patterns verified in codebase
- Architecture: HIGH — all source files read and verified; layout threading pattern is unambiguous
- Pitfalls: HIGH — CJKLayout double-wrap pitfall is a real gotcha verified from reading both layouts; other pitfalls are logical consequences of verified code
- Translations: MEDIUM — zh/fr content drafted by Claude per D-06; terminology glossary ASSUMED for French

**Research date:** 2026-05-25
**Valid until:** 2026-06-25 (stable Astro project, no moving dependencies)
