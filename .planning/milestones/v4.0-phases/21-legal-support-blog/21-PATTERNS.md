# Phase 21: Legal, Support & Blog - Pattern Map

**Mapped:** 2026-05-25
**Files analyzed:** 18 (8 wrapper pages, 4 en namespace files, 4 zh namespace files, 4 fr namespace files — plus 3 modified existing files)
**Analogs found:** 18 / 18

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/pages/zh/privacy.astro` | page (locale wrapper) | request-response | `src/pages/zh/features/recovery-scoring.astro` | exact |
| `src/pages/fr/privacy.astro` | page (locale wrapper) | request-response | `src/pages/zh/features/recovery-scoring.astro` | exact |
| `src/pages/zh/terms.astro` | page (locale wrapper) | request-response | `src/pages/zh/features/recovery-scoring.astro` | exact |
| `src/pages/fr/terms.astro` | page (locale wrapper) | request-response | `src/pages/zh/features/recovery-scoring.astro` | exact |
| `src/pages/zh/support.astro` | page (locale wrapper) | request-response | `src/pages/zh/features/recovery-scoring.astro` | exact |
| `src/pages/fr/support.astro` | page (locale wrapper) | request-response | `src/pages/zh/features/recovery-scoring.astro` | exact |
| `src/pages/zh/blog/index.astro` | page (locale wrapper) | request-response | `src/pages/blog/index.astro` | role-match |
| `src/pages/fr/blog/index.astro` | page (locale wrapper) | request-response | `src/pages/blog/index.astro` | role-match |
| `src/i18n/locales/en/privacy.ts` | config (translation namespace) | transform | `src/i18n/locales/en/recovery-scoring.ts` | exact |
| `src/i18n/locales/zh/privacy.ts` | config (translation namespace) | transform | `src/i18n/locales/zh/recovery-scoring.ts` | exact |
| `src/i18n/locales/fr/privacy.ts` | config (translation namespace) | transform | `src/i18n/locales/fr/coaching.ts` | exact |
| `src/i18n/locales/en/terms.ts` | config (translation namespace) | transform | `src/i18n/locales/en/recovery-scoring.ts` | exact |
| `src/i18n/locales/zh/terms.ts` | config (translation namespace) | transform | `src/i18n/locales/zh/recovery-scoring.ts` | exact |
| `src/i18n/locales/fr/terms.ts` | config (translation namespace) | transform | `src/i18n/locales/fr/coaching.ts` | exact |
| `src/i18n/locales/en/support.ts` | config (translation namespace) | transform | `src/i18n/locales/en/recovery-scoring.ts` | exact |
| `src/i18n/locales/zh/support.ts` | config (translation namespace) | transform | `src/i18n/locales/zh/recovery-scoring.ts` | exact |
| `src/i18n/locales/fr/support.ts` | config (translation namespace) | transform | `src/i18n/locales/fr/coaching.ts` | exact |
| `src/i18n/locales/en/blog.ts` | config (translation namespace) | transform | `src/i18n/locales/en/recovery-scoring.ts` | exact |
| `src/i18n/locales/zh/blog.ts` | config (translation namespace) | transform | `src/i18n/locales/zh/recovery-scoring.ts` | exact |
| `src/i18n/locales/fr/blog.ts` | config (translation namespace) | transform | `src/i18n/locales/fr/coaching.ts` | exact |
| `src/layouts/LegalPageLayout.astro` (modify) | layout | request-response | `src/layouts/LegalPageLayout.astro` (self) | self |
| `src/components/FaqAccordion.astro` (modify) | component | request-response | `src/components/FaqAccordion.astro` (self) | self |
| `src/i18n/utils.ts` (modify) | utility | transform | `src/i18n/utils.ts` (self) | self |

---

## Pattern Assignments

### `src/pages/zh/privacy.astro` and `src/pages/fr/privacy.astro` (locale wrapper pages)

**Analog:** `src/pages/zh/features/recovery-scoring.astro`

**Imports pattern** (lines 1-10 of analog):
```astro
---
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/700.css';
import { useRecoveryScoringTranslations } from '../../../i18n/utils';
import FeaturePageLayout from '../../../layouts/FeaturePageLayout.astro';
```

For zh legal pages, copy the `@fontsource/noto-sans-sc` imports and the `--font-sans` CSS override. For fr pages, omit those — no CJK font override needed.

**Core pattern — zh privacy wrapper:**
```astro
---
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/700.css';
import { usePrivacyTranslations } from '../../i18n/utils';
import LegalPageLayout from '../../layouts/LegalPageLayout.astro';

const t = usePrivacyTranslations('zh');
---

<style is:global>
  :root { --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif; }
</style>

<LegalPageLayout
  title={t.meta.title}
  lastUpdated={t.meta.lastUpdated}
  locale="zh"
>
  <!-- translated legal content via slot — structured HTML rendered from t.* keys -->
</LegalPageLayout>
```

**Core pattern — fr privacy wrapper:**
```astro
---
import { usePrivacyTranslations } from '../../i18n/utils';
import LegalPageLayout from '../../layouts/LegalPageLayout.astro';

const t = usePrivacyTranslations('fr');
---

<LegalPageLayout
  title={t.meta.title}
  lastUpdated={t.meta.lastUpdated}
  locale="fr"
>
  <!-- translated legal content via slot -->
</LegalPageLayout>
```

**Path depth note:** zh and fr pages at `src/pages/zh/privacy.astro` import from `../../i18n/utils` (two levels up), not three — they are not inside a subdirectory like `features/`.

---

### `src/pages/zh/terms.astro` and `src/pages/fr/terms.astro`

Same pattern as privacy wrappers above. Substitute `useTermsTranslations` and `t.meta.title` / `t.meta.lastUpdated`. Content body is slotted translated HTML.

---

### `src/pages/zh/support.astro` and `src/pages/fr/support.astro`

**Analog:** `src/pages/support.astro` (lines 1-49)

**Core pattern:**
```astro
---
import '@fontsource/noto-sans-sc/400.css'; // zh only
import '@fontsource/noto-sans-sc/700.css'; // zh only
import { useSupportTranslations } from '../../i18n/utils';
import LegalPageLayout from '../../layouts/LegalPageLayout.astro';
import FaqAccordion from '../../components/FaqAccordion.astro';

const t = useSupportTranslations('zh'); // or 'fr'
---

<LegalPageLayout title={t.meta.title} locale="zh">
  <FaqAccordion locale="zh" />

  <section style="margin-top: var(--space-2xl);">
    <h2 ...>{t.contact.heading}</h2>
    <p ...>{t.contact.subtext}</p>
    <p style="margin-top: var(--space-md);">
      <a href="mailto:hanwenma09@gmail.com" ...>
        {t.contact.buttonLabel}
      </a>
    </p>
    <p ...>{t.contact.responseTime}</p>
  </section>
</LegalPageLayout>
```

---

### `src/pages/zh/blog/index.astro` and `src/pages/fr/blog/index.astro`

**Analog:** `src/pages/blog/index.astro` (lines 1-72)

**Imports pattern** (lines 1-7 of analog):
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = (await getCollection('blog', ({ data }) =>
  !import.meta.env.PROD || !data.draft
)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
```

**Core pattern — zh blog wrapper** (path depth: `src/pages/zh/blog/index.astro` → three levels up):
```astro
---
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/700.css';
import { getCollection } from 'astro:content';
import BaseLayout from '../../../layouts/BaseLayout.astro';
import { useBlogTranslations } from '../../../i18n/utils';

const t = useBlogTranslations('zh');
const posts = (await getCollection('blog', ({ data }) =>
  !import.meta.env.PROD || !data.draft
)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---

<style is:global>
  :root { --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif; }
</style>

<BaseLayout title={t.meta.title} description={t.meta.description} locale="zh">
  <div class="section-spaced">
    <div class="mx-auto px-6" style="max-width: 680px;">
      <h1 style="font-size: var(--text-heading); font-weight: var(--weight-heading); ...">
        {t.page.heading}
      </h1>
      {posts.length === 0 ? (
        <p style="color: var(--color-text-2); margin-top: var(--space-2xl);">
          {t.page.emptyState}
        </p>
      ) : (
        <!-- post list — same structure as en/blog/index.astro lines 36-69 -->
      )}
    </div>
  </div>
</BaseLayout>
```

**Empty state string in EN source** (line 27-30 of `src/pages/blog/index.astro`):
```astro
<p style="color: var(--color-text-2); margin-top: var(--space-2xl);">
  Posts coming soon.
</p>
```
Translate this string into zh/fr via `t.page.emptyState`.

---

### `src/i18n/locales/en/privacy.ts` (and terms.ts, support.ts, blog.ts)

**Analog:** `src/i18n/locales/en/recovery-scoring.ts` (lines 1-44)

**Full file pattern — en namespace file:**
```typescript
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const privacy = {
  meta: {
    title: 'Privacy Policy',
    lastUpdated: 'March 27, 2026',
    description: 'Privacy policy for Tuwa — Training Load & Recovery app.',
  },
  disclaimer: {
    text: 'This is a translation. The English version is the legally binding document.',
  },
  // ... content keys matching the HTML structure in src/pages/privacy.astro
} as const;

export default privacy;
export type Privacy = WidenStrings<typeof privacy>;
```

Key rules:
- `WidenStrings<T>` type must be declared at the top of every en namespace file (copy verbatim from recovery-scoring.ts lines 1-5)
- `as const` on the object literal
- Export both the default value and the named type (`export type Privacy = WidenStrings<typeof privacy>`)

---

### `src/i18n/locales/zh/privacy.ts` (and terms.ts, support.ts, blog.ts)

**Analog:** `src/i18n/locales/zh/recovery-scoring.ts` (lines 1-39)

**Full file pattern — zh namespace file:**
```typescript
import type { Privacy } from '../en/privacy';

const privacy: Privacy = {
  meta: {
    title: '隐私政策 — Tuwa',
    lastUpdated: '2026年3月27日',
    description: 'Tuwa 隐私政策 — 训练负荷与恢复管理应用。',
  },
  disclaimer: {
    text: '此为翻译版本。英文版为具有法律效力的正式文件。',
  },
  // ... translated content keys
};

export default privacy;
```

Key rules:
- Import the en type via `import type { Privacy } from '../en/privacy'`
- No `WidenStrings` declaration in zh/fr files — the type is already widened from the en file
- No `as const` in zh/fr files (the type annotation is the constraint)

---

### `src/i18n/locales/fr/privacy.ts` (and terms.ts, support.ts, blog.ts)

**Analog:** `src/i18n/locales/fr/coaching.ts` (same shape as zh but French content)

**Full file pattern — fr namespace file:**
```typescript
import type { Privacy } from '../en/privacy';

const privacy: Privacy = {
  meta: {
    title: 'Politique de confidentialité — Tuwa',
    lastUpdated: '27 mars 2026',
    description: 'Politique de confidentialité de Tuwa — application de gestion de charge et récupération.',
  },
  disclaimer: {
    text: "Ceci est une traduction. La version anglaise est le document juridiquement contraignant.",
  },
  // ... translated content keys
};

export default privacy;
```

Use "tu" (informal) for all French prose. Trust layout to handle text expansion.

---

### `src/layouts/LegalPageLayout.astro` (modify existing)

**Self-analog** — current state (lines 1-48):
```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  lastUpdated?: string;
}

const { title, lastUpdated } = Astro.props;
---
```

**Modification — add `locale` prop and conditional disclaimer banner:**
```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  lastUpdated?: string;
  locale?: string;
}

const { title, lastUpdated, locale = 'en' } = Astro.props;
const showDisclaimer = locale !== 'en';
---
<BaseLayout title={title} description={`${title} for Tuwa.`} locale={locale}>
  <div style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
    <div class="mx-auto px-6" style="max-width: 680px;">

      {showDisclaimer && (
        <div style="
          background-color: var(--color-surface);
          border: 1px solid var(--color-divider);
          border-radius: var(--radius-md);
          padding: var(--space-sm) var(--space-md);
          margin-bottom: var(--space-xl);
          font-size: var(--text-label);
          color: var(--color-text-3);
          line-height: var(--leading-body);
        ">
          <!-- text injected from translation key in wrapper page via slot or hardcoded string -->
        </div>
      )}

      <!-- existing h1, lastUpdated, hr, prose slot unchanged -->
    </div>
  </div>
</BaseLayout>
```

Note: D-04 specifies the disclaimer text is rendered by LegalPageLayout when `locale !== 'en'`. The disclaimer text itself should come from a translation key passed as a prop (e.g., `disclaimerText?: string`) so both zh and fr pages can pass their locale-specific wording.

---

### `src/components/FaqAccordion.astro` (modify existing)

**Self-analog** — current state (lines 1-94): hardcoded `faqs` array at top of frontmatter, no locale awareness.

**Modification pattern — add locale prop, wire translations:**
```astro
---
import { useSupportTranslations } from '../i18n/utils';

interface Props {
  locale?: string;
}

const { locale = 'en' } = Astro.props;
const t = useSupportTranslations(locale as any);

const faqs = t.faq; // array of { q, a } objects from translation namespace
---
```

The FAQ content (8 Q&A pairs) moves from hardcoded strings into the `support.ts` namespace under a `faq` array key. The existing `faqs.map(({ q, a }) => ...)` render loop (lines 72-92 of FaqAccordion.astro) requires no change — only the data source changes.

**Heading key** (line 69 of FaqAccordion.astro, currently hardcoded):
```astro
<h2 ...>Frequently Asked Questions</h2>
```
Replace with `{t.faq.heading}` (add `heading` as a sibling key to `faq` array in support namespace).

---

### `src/i18n/utils.ts` (modify existing)

**Self-analog** — current state (lines 1-102).

**Modification — add 4 new namespace imports and lookup functions:**

Add imports at lines 1-28 area (follow the established grouping pattern: en imports first, then zh, then fr):
```typescript
import enPrivacy from './locales/en/privacy';
import zhPrivacy from './locales/zh/privacy';
import frPrivacy from './locales/fr/privacy';
import enTerms from './locales/en/terms';
import zhTerms from './locales/zh/terms';
import frTerms from './locales/fr/terms';
import enSupport from './locales/en/support';
import zhSupport from './locales/zh/support';
import frSupport from './locales/fr/support';
import enBlog from './locales/en/blog';
import zhBlog from './locales/zh/blog';
import frBlog from './locales/fr/blog';
import type { Privacy } from './locales/en/privacy';
import type { Terms } from './locales/en/terms';
import type { Support } from './locales/en/support';
import type { Blog } from './locales/en/blog';
```

Add Record maps (follow the pattern at lines 46-74):
```typescript
const privacyTranslations: Record<Locale, Privacy> = {
  en: enPrivacy,
  zh: zhPrivacy,
  fr: frPrivacy,
};
// ... same for terms, support, blog
```

Add lookup functions (follow the pattern at lines 84-102):
```typescript
export function usePrivacyTranslations(locale: Locale | undefined): Privacy {
  return privacyTranslations[locale ?? 'en'] ?? privacyTranslations['en'];
}
export function useTermsTranslations(locale: Locale | undefined): Terms {
  return termsTranslations[locale ?? 'en'] ?? termsTranslations['en'];
}
export function useSupportTranslations(locale: Locale | undefined): Support {
  return supportTranslations[locale ?? 'en'] ?? supportTranslations['en'];
}
export function useBlogTranslations(locale: Locale | undefined): Blog {
  return blogTranslations[locale ?? 'en'] ?? blogTranslations['en'];
}
```

---

## Shared Patterns

### CJK Font Override (zh pages only)
**Source:** `src/pages/zh/features/recovery-scoring.astro` lines 1-15
**Apply to:** All new `src/pages/zh/*.astro` files (privacy, terms, support, blog/index)
```astro
---
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/700.css';
---
<style is:global>
  :root { --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif; }
</style>
```
Do NOT apply to fr pages. Do NOT wrap in CJKLayout — per CONTEXT.md code insights, zh feature pages use inline imports, not CJKLayout, to avoid double-wrap.

### Locale Prop Passthrough
**Source:** `src/pages/zh/index.astro` line 15 (`<Hero locale="zh" />`)
**Apply to:** All layout and component calls in new wrapper pages
```astro
<LegalPageLayout title={t.meta.title} locale="zh">
```
```astro
<BaseLayout title={t.meta.title} description={t.meta.description} locale="zh">
```
BaseLayout already accepts `locale` prop (lines 13-16 of BaseLayout.astro) and passes it to `<html lang={locale}>` and `<Header locale={locale}>`.

### Translation Lookup Call Site
**Source:** `src/pages/zh/features/recovery-scoring.astro` line 10
**Apply to:** All new wrapper pages
```astro
const t = useRecoveryScoringTranslations('zh');
```
Always pass the locale as a string literal (`'zh'` or `'fr'`), not as a variable, in wrapper pages. Locale is statically known at build time.

### Design Tokens for Disclaimer Banner
**Source:** `src/layouts/LegalPageLayout.astro` lines 28-42 (existing muted/divider tokens) and `src/pages/support.astro` line 44 (`var(--color-text-3)`, `var(--text-label)`)
**Apply to:** Disclaimer banner in LegalPageLayout.astro
```css
background-color: var(--color-surface);
border: 1px solid var(--color-divider);
border-radius: var(--radius-md);
font-size: var(--text-label);
color: var(--color-text-3);
```
This produces a subtle info-level appearance, not alarming, matching D-03.

### WidenStrings Type Pattern
**Source:** `src/i18n/locales/en/recovery-scoring.ts` lines 1-5
**Apply to:** Every new `src/i18n/locales/en/*.ts` file
```typescript
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };
```
zh and fr locale files import the type from the en file instead — they do NOT redeclare WidenStrings.

---

## No Analog Found

All files in this phase have close analogs in the existing codebase. No novel patterns are introduced.

---

## Metadata

**Analog search scope:** `src/pages/`, `src/layouts/`, `src/components/`, `src/i18n/`
**Files scanned:** 13 source files read directly
**Pattern extraction date:** 2026-05-25
