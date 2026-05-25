# Phase 20: Feature Pages - Pattern Map

**Mapped:** 2026-05-25
**Files analyzed:** 34 (15 new namespace files, 3 modified common.ts, 2 modified layouts, 1 modified component, 1 modified utils.ts, 10 new wrapper pages, 2 new directories)
**Analogs found:** 34 / 34

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/i18n/utils.ts` (modify) | utility | transform | `src/i18n/utils.ts` itself | self — extend existing functions |
| `src/i18n/locales/en/recovery-scoring.ts` | config | transform | `src/i18n/locales/en/home.ts` | exact |
| `src/i18n/locales/en/workload-tracking.ts` | config | transform | `src/i18n/locales/en/home.ts` | exact |
| `src/i18n/locales/en/smart-templates.ts` | config | transform | `src/i18n/locales/en/home.ts` | exact |
| `src/i18n/locales/en/cold-start.ts` | config | transform | `src/i18n/locales/en/home.ts` | exact |
| `src/i18n/locales/en/coaching.ts` | config | transform | `src/i18n/locales/en/home.ts` | exact |
| `src/i18n/locales/zh/recovery-scoring.ts` | config | transform | `src/i18n/locales/zh/home.ts` | exact |
| `src/i18n/locales/zh/workload-tracking.ts` | config | transform | `src/i18n/locales/zh/home.ts` | exact |
| `src/i18n/locales/zh/smart-templates.ts` | config | transform | `src/i18n/locales/zh/home.ts` | exact |
| `src/i18n/locales/zh/cold-start.ts` | config | transform | `src/i18n/locales/zh/home.ts` | exact |
| `src/i18n/locales/zh/coaching.ts` | config | transform | `src/i18n/locales/zh/home.ts` | exact |
| `src/i18n/locales/fr/recovery-scoring.ts` | config | transform | `src/i18n/locales/fr/home.ts` | exact |
| `src/i18n/locales/fr/workload-tracking.ts` | config | transform | `src/i18n/locales/fr/home.ts` | exact |
| `src/i18n/locales/fr/smart-templates.ts` | config | transform | `src/i18n/locales/fr/home.ts` | exact |
| `src/i18n/locales/fr/cold-start.ts` | config | transform | `src/i18n/locales/fr/home.ts` | exact |
| `src/i18n/locales/fr/coaching.ts` | config | transform | `src/i18n/locales/fr/home.ts` | exact |
| `src/i18n/locales/en/common.ts` (modify) | config | transform | `src/i18n/locales/en/common.ts` itself | self — add featureCTA keys |
| `src/i18n/locales/zh/common.ts` (modify) | config | transform | `src/i18n/locales/zh/common.ts` itself | self — add featureCTA keys |
| `src/i18n/locales/fr/common.ts` (modify) | config | transform | `src/i18n/locales/fr/common.ts` itself | self — add featureCTA keys |
| `src/layouts/FeaturePageLayout.astro` (modify) | layout | request-response | `src/layouts/CJKLayout.astro` | role-match (locale prop threading) |
| `src/layouts/CoachingPageLayout.astro` (modify) | layout | request-response | `src/layouts/CJKLayout.astro` | role-match (locale prop threading) |
| `src/components/FeatureCTA.astro` (modify) | component | request-response | `src/components/Hero.astro` (uses locale prop + useTranslations) | role-match |
| `src/pages/zh/features/recovery-scoring.astro` | page | request-response | `src/pages/zh/index.astro` | exact |
| `src/pages/zh/features/workload-tracking.astro` | page | request-response | `src/pages/zh/index.astro` | exact |
| `src/pages/zh/features/smart-templates.astro` | page | request-response | `src/pages/zh/index.astro` | exact |
| `src/pages/zh/features/cold-start.astro` | page | request-response | `src/pages/zh/index.astro` | exact |
| `src/pages/zh/features/coaching.astro` | page | request-response | `src/pages/zh/index.astro` | exact |
| `src/pages/fr/features/recovery-scoring.astro` | page | request-response | `src/pages/fr/index.astro` | exact |
| `src/pages/fr/features/workload-tracking.astro` | page | request-response | `src/pages/fr/index.astro` | exact |
| `src/pages/fr/features/smart-templates.astro` | page | request-response | `src/pages/fr/index.astro` | exact |
| `src/pages/fr/features/cold-start.astro` | page | request-response | `src/pages/fr/index.astro` | exact |
| `src/pages/fr/features/coaching.astro` | page | request-response | `src/pages/fr/index.astro` | exact |

---

## Pattern Assignments

### `src/i18n/utils.ts` (modify — add 5 feature lookup functions)

**Analog:** `src/i18n/utils.ts` (lines 1–32, self-extension)

**Existing import/export pattern** (lines 1–12):
```typescript
import enCommon from './locales/en/common';
import zhCommon from './locales/zh/common';
import frCommon from './locales/fr/common';
import enHome from './locales/en/home';
import zhHome from './locales/zh/home';
import frHome from './locales/fr/home';
import type { Common } from './locales/en/common';
import type { Home } from './locales/en/home';

export type Locale = 'en' | 'zh' | 'fr';
export type CommonTranslations = Common;
export type HomeTranslations = Home;
```

**Existing record + function pattern** (lines 20–32 — copy exactly for each feature):
```typescript
const homeTranslations: Record<Locale, Home> = {
  en: enHome,
  zh: zhHome,
  fr: frHome,
};

export function useHomeTranslations(locale: Locale | undefined): Home {
  return homeTranslations[locale ?? 'en'] ?? homeTranslations['en'];
}
```

**What to add for each of the 5 features** (repeat this block 5 times, substituting names):
```typescript
// --- Add at top with other imports ---
import enRecoveryScoring from './locales/en/recovery-scoring';
import zhRecoveryScoring from './locales/zh/recovery-scoring';
import frRecoveryScoring from './locales/fr/recovery-scoring';
import type { RecoveryScoring } from './locales/en/recovery-scoring';

// --- Add with other record declarations ---
const recoveryScoringTranslations: Record<Locale, RecoveryScoring> = {
  en: enRecoveryScoring,
  zh: zhRecoveryScoring,
  fr: frRecoveryScoring,
};

// --- Add with other exported functions ---
export function useRecoveryScoringTranslations(locale: Locale | undefined): RecoveryScoring {
  return recoveryScoringTranslations[locale ?? 'en'] ?? recoveryScoringTranslations['en'];
}
```

**Name substitution table for each feature:**

| Feature | Import prefix | Type name | Function name |
|---|---|---|---|
| recovery-scoring | `RecoveryScoring` / `enRecoveryScoring` | `RecoveryScoring` | `useRecoveryScoringTranslations` |
| workload-tracking | `WorkloadTracking` / `enWorkloadTracking` | `WorkloadTracking` | `useWorkloadTrackingTranslations` |
| smart-templates | `SmartTemplates` / `enSmartTemplates` | `SmartTemplates` | `useSmartTemplatesTranslations` |
| cold-start | `ColdStart` / `enColdStart` | `ColdStart` | `useColdStartTranslations` |
| coaching | `Coaching` / `enCoaching` | `Coaching` | `useCoachingTranslations` |

---

### `src/i18n/locales/en/recovery-scoring.ts` (new — and all 4 other en feature namespace files)

**Analog:** `src/i18n/locales/en/home.ts` (lines 1–59, exact match)

**WidenStrings type declaration** (lines 1–5 of home.ts — copy verbatim into each en namespace file):
```typescript
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };
```

**`as const` object + export pattern** (lines 7–59 of home.ts — structure to follow):
```typescript
const recoveryScoring = {
  meta: {
    title: 'Recovery Scoring — Tuwa',
    description: '...',
  },
  hero: {
    outcomeStatement: '...',
    hookLine: '...',
    screenshotAlt: '...',
  },
  // One key per <h2>, <h3>, <p> in the source page per D-03
  howItWorks: {
    heading: 'How it works',
    overview1: '...',
    overview2: '...',
    zonesHeading: 'Three zones, clear guidance',
    zones: '...',
  },
  deviceCompatibility: {
    heading: 'Data from any device you already own',
    body: '...',
  },
  personalBaseline: {
    heading: "A baseline that's yours, not the population's",
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

**Key extraction rules (D-02, D-03):**
- Every `<h2>` → `heading` key in its parent section object
- Every `<h3>` → camelCase key with `Heading` suffix (e.g., `zonesHeading`, `acuteVsChronicHeading`)
- Every `<p>` → sequential `p1`, `p2`, `p3` OR descriptive name within its section object
- `screenshotAlt` → key for alt text on DeviceFrame
- `title` and `description` → always under `meta` object

**Source text locations for each en namespace file:**

| File | Source page | Lines with extractable text |
|---|---|---|
| `en/recovery-scoring.ts` | `src/pages/features/recovery-scoring.astro` | lines 8–16 (props), 46–81 (scroll steps), 103–119 (science section) |
| `en/workload-tracking.ts` | `src/pages/features/workload-tracking.astro` | lines 7–16 (props), 33–99 (two sections) |
| `en/smart-templates.ts` | `src/pages/features/smart-templates.astro` | lines 6–15 (props), 33–99 (two sections) |
| `en/cold-start.ts` | `src/pages/features/cold-start.astro` | lines 5–12 (props), 31–100 (two sections) |
| `en/coaching.ts` | `src/pages/features/coaching.astro` | lines 5–12 (props), 31–193 (default slot + 3 named slots) |

---

### `src/i18n/locales/zh/recovery-scoring.ts` (new — and all 4 other zh feature namespace files)

**Analog:** `src/i18n/locales/zh/home.ts` (lines 1–54, exact match)

**Import + typed constant pattern** (lines 1–4 of zh/home.ts — copy verbatim, substituting type name):
```typescript
import type { RecoveryScoring } from '../en/recovery-scoring';

const recoveryScoring: RecoveryScoring = {
  meta: {
    title: '恢复评分 — Tuwa',
    description: '...',
  },
  // ... all keys translated to natural Chinese sports terminology
};

export default recoveryScoring;
```

**zh translation conventions** (verified from `src/i18n/locales/zh/home.ts` lines 3–52 and `src/i18n/locales/zh/common.ts` lines 3–48):
- No `WidenStrings` re-declaration — zh files import the type from en and use it directly
- No `as const` — zh/fr files declare a typed variable, not an inferred const
- No `export type` — only `export default` at bottom
- Chinese sports terminology consistent with established glossary in common.ts (see Shared Patterns section)

---

### `src/i18n/locales/fr/recovery-scoring.ts` (new — and all 4 other fr feature namespace files)

**Analog:** `src/i18n/locales/fr/home.ts` (lines 1–54, exact match)

**Import + typed constant pattern** (lines 1–4 of fr/home.ts — copy verbatim, substituting type name):
```typescript
import type { RecoveryScoring } from '../en/recovery-scoring';

const recoveryScoring: RecoveryScoring = {
  meta: {
    title: 'Score de récupération — Tuwa',
    description: '...',
  },
  // ... all keys translated to French with "tu" informal register
};

export default recoveryScoring;
```

**fr translation conventions** (verified from `src/i18n/locales/fr/home.ts` lines 3–52 and `src/i18n/locales/fr/common.ts` lines 3–47):
- Same structure as zh: import type from en, typed variable, `export default` only
- Use "tu" (informal) for all athlete-facing copy (verified: "Entraîne-toi", "Télécharger l'app")
- VFC for HRV, "Charge d'entraînement" for Training Load (verified in fr/common.ts line 40)

---

### `src/i18n/locales/en/common.ts` (modify — add featureCTA keys)

**Analog:** `src/i18n/locales/en/common.ts` itself (lines 9–56)

**Insertion location:** After `meta` object (line 53), before `} as const;` (line 54)

**Keys to add:**
```typescript
  featureCTA: {
    headline: 'Start training with confidence',
    body: 'Download Tuwa and take the guesswork out of recovery and load management.',
    badgeAlt: 'Download on the App Store',
    badgeAriaLabel: 'Download Tuwa on the App Store',
  },
```

**Source text:** `src/components/FeatureCTA.astro` lines 23, 33, 49, 45 (current hardcoded English strings)

---

### `src/i18n/locales/zh/common.ts` (modify — add featureCTA keys)

**Analog:** `src/i18n/locales/zh/common.ts` itself (lines 1–50)

**Keys to add** (after `meta` object, before closing brace, consistent with zh terminology):
```typescript
  featureCTA: {
    headline: '开启自信的训练之旅',
    body: '下载 Tuwa，让恢复与负荷管理不再靠猜测。',
    badgeAlt: '在 App Store 下载',
    badgeAriaLabel: '在 App Store 下载 Tuwa',
  },
```

**Note:** `badgeAlt` and `badgeAriaLabel` mirror existing keys from `zh/home.ts` lines 8–9.

---

### `src/i18n/locales/fr/common.ts` (modify — add featureCTA keys)

**Analog:** `src/i18n/locales/fr/common.ts` itself (lines 1–48)

**Keys to add** (after `meta` object, before closing brace):
```typescript
  featureCTA: {
    headline: "Commence à t'entraîner avec confiance",
    body: "Télécharge Tuwa et dis adieu aux approximations en matière de récupération et de charge.",
    badgeAlt: "Télécharger sur l'App Store",
    badgeAriaLabel: "Télécharger Tuwa sur l'App Store",
  },
```

**Note:** `badgeAlt` and `badgeAriaLabel` mirror existing keys from `fr/home.ts` lines 8–9.

---

### `src/layouts/FeaturePageLayout.astro` (modify — add locale prop)

**Analog:** `src/layouts/CJKLayout.astro` (lines 1–23, locale prop threading to BaseLayout)

**CJKLayout pattern showing locale prop threading** (lines 6–22):
```typescript
// CJKLayout.astro — locale prop pattern to replicate
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
}
const props = Astro.props;
// ...
<BaseLayout {...props} locale="zh">
```

**FeaturePageLayout current Props interface** (lines 8–17 of FeaturePageLayout.astro):
```typescript
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  screenshot?: ImageMetadata;
  screenshotAlt: string;
  outcomeStatement: string;
  hookLine: string;
  shapeId?: 'blob-1' | 'blob-2' | 'blob-3' | 'blob-4' | 'blob-5' | 'blob-6' | 'blob-7';
}
```

**What to change:**
1. Add `locale?: string;` to Props interface (after `hookLine`)
2. Add `locale = 'en'` to destructure on line 19
3. Change line 21 from `<BaseLayout title={title} description={description} ogImage={ogImage}>` to `<BaseLayout title={title} description={description} ogImage={ogImage} locale={locale}>`
4. Change line 61 from `<FeatureCTA />` to `<FeatureCTA locale={locale} />`

**Identical changes apply to `src/layouts/CoachingPageLayout.astro`** — same Props interface, same BaseLayout call on line 21, same FeatureCTA call on line 88.

---

### `src/components/FeatureCTA.astro` (modify — add locale prop + useTranslations)

**Analog:** `src/pages/zh/index.astro` (lines 1–19, useTranslations pattern)

**Current FeatureCTA frontmatter** (lines 1–3 of FeatureCTA.astro):
```typescript
---
import { APP_STORE_URL } from '../config';
---
```

**What to change — new frontmatter:**
```typescript
---
import { useTranslations } from '../i18n/utils';
import { APP_STORE_URL } from '../config';

interface Props {
  locale?: string;
}
const { locale = 'en' } = Astro.props;
const t = useTranslations(locale as any);
---
```

**Hardcoded strings to replace with translation keys** (lines 23, 33, 45, 49 of FeatureCTA.astro):

| Line | Current hardcoded value | Replace with |
|---|---|---|
| 23 | `Start training with confidence` | `{t.featureCTA.headline}` |
| 33 | `Download Tuwa and take the guesswork out of recovery and load management.` | `{t.featureCTA.body}` |
| 45 | `aria-label="Download Tuwa on the App Store"` | `aria-label={t.featureCTA.badgeAriaLabel}` |
| 49 | `alt="Download on the App Store"` | `alt={t.featureCTA.badgeAlt}` |

---

### `src/pages/zh/features/recovery-scoring.astro` (new — and all 4 other zh wrapper pages)

**Analog:** `src/pages/zh/index.astro` (lines 1–19, thin wrapper pattern)

**zh/index.astro full pattern** (lines 1–19):
```astro
---
import { useTranslations } from '../../i18n/utils';
import CJKLayout from '../../layouts/CJKLayout.astro';
import Hero from '../../components/Hero.astro';
// ... other component imports

const t = useTranslations('zh');
---
<CJKLayout
  title={t.meta.title}
  description={t.meta.description}
>
  <Hero locale="zh" />
  <!-- ... -->
</CJKLayout>
```

**CRITICAL DEVIATION for zh feature pages (verified from CJKLayout.astro lines 1–23):** Do NOT use CJKLayout as outer wrapper — it renders BaseLayout internally, and FeaturePageLayout also renders BaseLayout, causing double `<html>` tags. Instead, replicate only CJKLayout's two unique behaviors inline:

**Correct zh feature wrapper pattern:**
```astro
---
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/700.css';
import { useRecoveryScoringTranslations } from '../../../i18n/utils';
import FeaturePageLayout from '../../../layouts/FeaturePageLayout.astro';
import DeviceFrame from '../../../components/DeviceFrame.astro';
import RecoveryChart from '../../../components/charts/RecoveryChart.astro';
import recoveryScreenshot from '../../../assets/screenshots/recovery.png';

const t = useRecoveryScoringTranslations('zh');
---
<style is:global>
  :root { --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif; }
</style>
<FeaturePageLayout
  locale="zh"
  title={t.meta.title}
  description={t.meta.description}
  screenshot={recoveryScreenshot}
  screenshotAlt={t.hero.screenshotAlt}
  outcomeStatement={t.hero.outcomeStatement}
  hookLine={t.hero.hookLine}
  shapeId="blob-3"
>
  <!-- Translated slot content — all text via t.* keys, no inline English -->
  <section class="section-spaced">
    <!-- ... mirror structure of src/pages/features/recovery-scoring.astro
         but replace every English string with t.sectionName.keyName -->
  </section>
</FeaturePageLayout>
```

**`<style is:global>` block** — verbatim copy from `src/layouts/CJKLayout.astro` lines 16–20:
```astro
<style is:global>
  :root {
    --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif;
  }
</style>
```

**Import path depth:** zh feature pages are at `src/pages/zh/features/` — 3 levels deep, so use `'../../../i18n/utils'`, `'../../../layouts/FeaturePageLayout.astro'`, etc.

**shapeId mapping** (from source pages — pass through unchanged):

| Feature | shapeId |
|---|---|
| recovery-scoring | `blob-3` |
| workload-tracking | `blob-5` |
| smart-templates | `blob-4` |
| cold-start | `blob-2` |
| coaching | `blob-1` |

---

### `src/pages/fr/features/recovery-scoring.astro` (new — and all 4 other fr wrapper pages)

**Analog:** `src/pages/fr/index.astro` (lines 1–20, thin wrapper with BaseLayout directly)

**fr/index.astro full pattern** (lines 1–20):
```astro
---
import { useTranslations } from '../../i18n/utils';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Hero from '../../components/Hero.astro';
// ...

const t = useTranslations('fr');
---
<BaseLayout
  title={t.meta.title}
  description={t.meta.description}
  locale="fr"
>
  <Hero locale="fr" />
  <!-- ... -->
</BaseLayout>
```

**Correct fr feature wrapper pattern** (no font override needed — fr uses Alpino like en):
```astro
---
import { useRecoveryScoringTranslations } from '../../../i18n/utils';
import FeaturePageLayout from '../../../layouts/FeaturePageLayout.astro';
import DeviceFrame from '../../../components/DeviceFrame.astro';
import RecoveryChart from '../../../components/charts/RecoveryChart.astro';
import recoveryScreenshot from '../../../assets/screenshots/recovery.png';

const t = useRecoveryScoringTranslations('fr');
---
<FeaturePageLayout
  locale="fr"
  title={t.meta.title}
  description={t.meta.description}
  screenshot={recoveryScreenshot}
  screenshotAlt={t.hero.screenshotAlt}
  outcomeStatement={t.hero.outcomeStatement}
  hookLine={t.hero.hookLine}
  shapeId="blob-3"
>
  <!-- Translated slot content — all text via t.* keys, no inline English -->
</FeaturePageLayout>
```

**Import path depth:** fr feature pages are at `src/pages/fr/features/` — 3 levels deep, same as zh wrappers.

---

### `src/pages/zh/features/coaching.astro` and `src/pages/fr/features/coaching.astro` (new)

**Analog:** `src/pages/zh/index.astro` + `src/pages/features/coaching.astro` (named slot structure)

**Named slot pattern** (from `src/pages/features/coaching.astro` lines 53–194):
```astro
<CoachingPageLayout
  locale="zh"
  title={t.meta.title}
  ...
>
  <!-- default slot -->
  <section data-animate>
    <div class="section-spaced mx-auto max-w-3xl px-6">
      <h2 ...>{t.howItWorks.heading}</h2>
      <p ...>{t.howItWorks.p1}</p>
      <!-- ... -->
    </div>
  </section>

  <!-- named slot: coach-athlete -->
  <div slot="coach-athlete">
    <h2 ...>{t.coachAthlete.athleteHeading}</h2>
    <p ...>{t.coachAthlete.athleteP1}</p>
    <!-- ... -->
    <h2 ...>{t.coachAthlete.coachHeading}</h2>
    <!-- ... -->
  </div>

  <!-- named slot: team-features -->
  <div slot="team-features">
    <h2 ...>{t.teamFeatures.heading}</h2>
    <!-- ... -->
  </div>

  <!-- named slot: invite-flow -->
  <div slot="invite-flow">
    <h2 ...>{t.inviteFlow.heading}</h2>
    <!-- ... -->
  </div>
</CoachingPageLayout>
```

**zh coaching wrapper** uses same font override as other zh feature pages (import fontsource + `<style is:global>`).
**fr coaching wrapper** uses FeaturePageLayout pattern directly with no font override.

---

## Shared Patterns

### Locale Prop Threading Chain
**Source:** `src/layouts/CJKLayout.astro` lines 21–22 + `src/pages/zh/index.astro` lines 9–19
**Apply to:** All 2 modified layouts, all 10 new wrapper pages
```astro
<!-- Thread: wrapper page → layout → BaseLayout → html[lang] -->
<!-- Each locale prop flows down this chain without transformation -->
<FeaturePageLayout locale="zh" ...>
  <!-- layout internally calls: <BaseLayout locale={locale}> -->
```

### WidenStrings Type (en namespace files only)
**Source:** `src/i18n/locales/en/home.ts` lines 1–5 (identical to `en/common.ts` lines 1–7, slight variant)
**Apply to:** All 5 new en namespace files — paste verbatim:
```typescript
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };
```

### zh/fr Type Import (zh and fr namespace files only)
**Source:** `src/i18n/locales/zh/home.ts` line 1 + `src/i18n/locales/fr/home.ts` line 1
**Apply to:** All 10 new zh/fr namespace files — import en type, do not re-declare WidenStrings:
```typescript
import type { RecoveryScoring } from '../en/recovery-scoring';

const recoveryScoring: RecoveryScoring = { ... };
export default recoveryScoring;
// NO export type line — only en files export types
```

### Terminology Glossary (zh and fr translations)
**Source:** Verified from `src/i18n/locales/zh/common.ts`, `src/i18n/locales/fr/common.ts`, `src/i18n/locales/zh/home.ts`, `src/i18n/locales/fr/home.ts`
**Apply to:** All 10 new zh/fr namespace files — use these established terms consistently:

| English | Chinese (zh) | French (fr) |
|---|---|---|
| HRV / Heart Rate Variability | 心率变异性 (HRV) | VFC (Variabilité de la Fréquence Cardiaque) |
| Recovery Score / Readiness | 恢复评分 / 准备状态 | Score de récupération / niveau de forme |
| Training Load | 训练负荷 | Charge d'entraînement |
| ACWR | 急慢性训练负荷比 (ACWR) | Ratio charge aiguë:chronique (ACWR) |
| RPE | 主观运动强度 (RPE) | RPE (Effort Perçu) |
| Reps in Reserve (RIR) | 储备次数 (RIR) | Reps en réserve (RIR) |
| Acute load | 急性负荷 | Charge aiguë |
| Chronic load | 慢性负荷 | Charge chronique |
| Coach | 教练 | Coach |
| Athlete | 运动员 | Athlète |
| Template | 模板 | Modèle |
| HealthKit | HealthKit (untranslated) | HealthKit (untranslated) |
| Apple Watch | Apple Watch (untranslated) | Apple Watch (untranslated) |

**Source lines for zh terminology:** `src/i18n/locales/zh/common.ts` lines 19–29, `src/i18n/locales/zh/home.ts` lines 3–51
**Source lines for fr terminology:** `src/i18n/locales/fr/common.ts` lines 19–29, `src/i18n/locales/fr/home.ts` lines 3–51, lines 39–40 (`Charge d'entraînement`, `VFC`)

### CJK Font Override Block (zh wrapper pages only)
**Source:** `src/layouts/CJKLayout.astro` lines 3–4 + 16–20
**Apply to:** All 5 zh feature wrapper pages — paste these two blocks exactly:
```astro
---
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/700.css';
// ... other imports
---
<style is:global>
  :root {
    --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif;
  }
</style>
<!-- then FeaturePageLayout or CoachingPageLayout immediately after -->
```

### useTranslations Call Pattern
**Source:** `src/pages/zh/index.astro` line 9 + `src/pages/fr/index.astro` line 9
**Apply to:** All 10 new wrapper pages — call with string literal locale, not variable:
```typescript
const t = useRecoveryScoringTranslations('zh');   // zh wrapper
const t = useRecoveryScoringTranslations('fr');   // fr wrapper
```

---

## No Analog Found

All files in this phase have direct analogs. No files require novel patterns.

---

## Anti-Pattern Warnings for Planner

These are verified gotchas from RESEARCH.md to embed in plan actions as guard rails:

1. **Double BaseLayout:** Never use `<CJKLayout>` wrapping `<FeaturePageLayout>` in zh wrapper pages. CJKLayout renders BaseLayout internally (verified: `src/layouts/CJKLayout.astro` line 21). Instead: import fontsource + `<style is:global>` directly in zh wrapper page.

2. **FeatureCTA locale not threaded:** FeaturePageLayout calls `<FeatureCTA />` with no props (verified: line 61). The locale prop thread is: wrapper page `locale="zh"` → FeaturePageLayout `locale` prop → `<FeatureCTA locale={locale} />`. If FeaturePageLayout is modified before wrapper pages are created, the CTA will be in English on all zh/fr feature pages.

3. **WidenStrings allows missing keys:** zh/fr files satisfy the type even with missing keys because WidenStrings widens to `string`. Verify key count manually against en file before closing each namespace file.

4. **Correct import path depth:** Wrapper pages at `src/pages/zh/features/` need `'../../../'` prefix (not `'../../'` like zh/index.astro which is one level shallower).

---

## Metadata

**Analog search scope:** `src/i18n/`, `src/layouts/`, `src/components/`, `src/pages/zh/`, `src/pages/fr/`, `src/pages/features/`
**Files scanned:** 19 source files read directly
**Pattern extraction date:** 2026-05-25
