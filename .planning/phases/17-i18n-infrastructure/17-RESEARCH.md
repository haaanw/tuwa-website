# Phase 17: i18n Infrastructure - Research

**Researched:** 2026-05-16
**Domain:** Astro built-in i18n routing, TypeScript translation utilities, CJK font loading
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Single `common.ts` file per locale for shared strings (nav, footer, CTAs). Page-specific files import/override as needed.
- **D-02:** Missing translation keys fall back to English text — graceful degradation.
- **D-03:** Nested object structure for translation keys (e.g. `hero: { title: '...', subtitle: '...' }`). Full TypeScript type safety with IDE autocomplete.
- **D-04:** Noto Sans SC weights: Regular 400 + Bold 700 only. Matches General Sans usage pattern.
- **D-05:** Load via `@fontsource/noto-sans-sc` with automatic unicode-range subsetting. Only new npm dependency.
- **D-06:** CJK font CSS loads only on /zh/ pages — conditional import in locale-aware layout. Zero performance regression on English and French pages.
- **D-07:** Locale folders with thin wrapper pages: `src/pages/zh/index.astro`, `src/pages/fr/features/recovery-scoring.astro`. Each imports same layout/component, passes locale-specific translations. English pages stay at current paths untouched.
- **D-08:** Locale flows via `Astro.currentLocale` (built-in with i18n routing config). BaseLayout passes to Header/Footer for nav link generation. Components receive translated content as props — stay locale-agnostic.
- **D-09:** English pages get minimal touch — only BaseLayout changes (dynamic `lang` attr). No refactoring existing pages to use `t()` in this phase.
- **D-10:** Verify General Sans contains oe ligature (U+0153) during Phase 17 execution.
- **[Roadmap]:** Use Astro built-in i18n routing (no external i18n library).
- **[Roadmap]:** `@fontsource/noto-sans-sc` is the only new npm dependency.
- **[Roadmap]:** Per-page TypeScript translation files (not monolithic JSON).
- **[Roadmap]:** English unprefixed (`prefixDefaultLocale: false`) to preserve SEO equity.
- **[Roadmap]:** Components receive content via props (locale-agnostic pattern).

### Claude's Discretion

- Translation utility `t()` function implementation details (lookup mechanism, type inference approach)
- Astro i18n config specifics (locale codes, routing strategy details)
- Directory naming conventions for translation files (e.g. `src/i18n/`, `src/translations/`)

### Deferred Ideas (OUT OF SCOPE)

- None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| I18N-01 | Site serves pages at /zh/ and /fr/ URL prefixes with English as unprefixed default | Astro i18n routing config with `prefixDefaultLocale: false` + thin wrapper pages in `src/pages/zh/` and `src/pages/fr/` |
| I18N-02 | Translation utility (`t()` function) loads locale-specific strings from TS dictionary files | Per-page TS files + `useTranslations()` returning a typed `t` object with nested property access |
| I18N-03 | Chinese font (Noto Sans SC) loads via unicode-range subsetting — zero impact on English page performance | `@fontsource/noto-sans-sc` 400+700 weights, conditional `<Font>` component or CSS `@import` only in zh layout slot |
</phase_requirements>

---

## Summary

Phase 17 installs the scaffolding for a three-locale Astro site without changing any visible English content. The three deliverables are independent: locale routing infrastructure in `astro.config.mjs`, a type-safe `t()` translation utility, and conditional CJK font loading for `/zh/` pages.

Astro 6 has all required primitives built in. The i18n routing config block is 6 lines of configuration, `Astro.currentLocale` is available automatically, and the `getRelativeLocaleUrl()` helper from `astro:i18n` handles locale-prefixed link generation. The `@fontsource/noto-sans-sc` package uses CSS `unicode-range` subsetting — the browser downloads only the character slices it needs, so an English-only page that never imports the CSS incurs zero bytes.

The recommended translation utility pattern is the Ruben Smn nested-object approach: each locale's translations are a plain TypeScript object returned directly by `useTranslations(locale)`. The caller writes `t.hero.title` (not `t('hero.title')`) — TypeScript infers the full shape from the English baseline type, giving deep autocomplete with no external library.

**Primary recommendation:** Use Astro's built-in i18n routing with `prefixDefaultLocale: false`, per-page TypeScript translation files with the nested-object `t` accessor pattern, and `@fontsource/noto-sans-sc` weight-specific CSS imports conditionally included only in the zh layout pass-through slot.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Locale routing (/zh/, /fr/ URL prefixes) | Astro build (static) | — | File-based routing — locale folders produce static URL paths at build time |
| Current locale detection | Astro server (build-time) | — | `Astro.currentLocale` reads from i18n config + URL; resolved at SSG render time |
| Translation string lookup | Page / layout (build-time) | — | `useTranslations()` called in component frontmatter, strings inlined at build time |
| `<html lang>` attribute | BaseLayout | — | Single change point for the entire document |
| CJK font loading | BaseLayout (conditional) | CDN (font delivery) | Import guard keyed on `Astro.currentLocale === 'zh'` prevents English pages from loading the CSS |
| Locale-aware nav link generation | Header / Footer | — | `getRelativeLocaleUrl()` from `astro:i18n` called at build time |
| French oe ligature verification | Dev task (one-off check) | — | Verify General Sans variable font contains U+0153 before Phase 19 content lands |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro i18n routing (built-in) | Astro 6.3.1 (already installed) | Locale URL routing, `Astro.currentLocale`, `getRelativeLocaleUrl` | First-party, zero dependencies, designed for static output mode |
| `@fontsource/noto-sans-sc` | 5.2.9 | Self-hosted Noto Sans SC with unicode-range subsets | Only approved new npm dependency (D-05); provides ready-made CSS with `unicode-range` per slice |

[VERIFIED: npm registry — `@fontsource/noto-sans-sc` latest is `5.2.9` as of 2026-05-16]
[VERIFIED: `astro` 6.3.1 already in package.json]

### Supporting (no new installs)
| Module | Source | Purpose | When to Use |
|--------|--------|---------|-------------|
| `astro:i18n` | Astro built-in | `getRelativeLocaleUrl()`, `getAbsoluteLocaleUrl()` | Header/Footer nav links need locale-aware hrefs |
| TypeScript (already installed) | devDependencies | Translation file type definitions | Type-safe `t` accessor object |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@fontsource/noto-sans-sc` (static CSS import) | Astro Fonts API (`fontProviders.fontsource()`) | Fonts API is stable in Astro 6 but adds config complexity and the `<Font>` component doesn't cleanly support conditional-per-locale injection without extra layout indirection; direct CSS import is simpler and equally performant |
| Flat dot-notation key strings (`t('hero.title')`) | Nested object accessor (`t.hero.title`) | Nested object gives true TypeScript property traversal with IDE autocomplete at each level; flat strings require a string-union type that degrades to `string` with nested fallback |
| Monolithic `src/i18n/ui.ts` | Per-page translation files | Per-page files keep bundles small and make it obvious which page owns which strings; decided in CONTEXT.md D-01 |

**Installation:**
```bash
npm install @fontsource/noto-sans-sc
```

**Version verification:**
```bash
npm view @fontsource/noto-sans-sc version
# 5.2.9 (verified 2026-05-16)
```

---

## Architecture Patterns

### System Architecture Diagram

```
Build time:
  astro.config.mjs
  └─ i18n: { locales: ['en','zh','fr'], defaultLocale: 'en',
              routing: { prefixDefaultLocale: false } }
        │
        ▼
  src/pages/
  ├── index.astro          → /          (en, Astro.currentLocale = 'en')
  ├── features/*.astro     → /features/ (en)
  ├── zh/
  │   └── index.astro      → /zh/       (Astro.currentLocale = 'zh')
  └── fr/
      └── index.astro      → /fr/       (Astro.currentLocale = 'fr')
        │
        ▼
  Thin wrapper page
  ├── import { useTranslations } from '../../i18n/utils'
  ├── const t = useTranslations('zh')
  └── <BaseLayout locale="zh">
          <IndexPage translations={t} />
      </BaseLayout>
        │
        ▼
  BaseLayout.astro
  ├── <html lang={locale}>                ← dynamic from prop
  ├── [if locale === 'zh']
  │     import '@fontsource/noto-sans-sc/400.css'
  │     import '@fontsource/noto-sans-sc/700.css'
  └── <Header locale={locale} />
      <Footer locale={locale} />

Translation files:
  src/i18n/
  ├── locales/
  │   ├── en/
  │   │   ├── common.ts     ← shared nav/footer/CTA strings
  │   │   └── home.ts       ← page-specific (used as type baseline)
  │   ├── zh/
  │   │   ├── common.ts
  │   │   └── home.ts
  │   └── fr/
  │       ├── common.ts
  │       └── home.ts
  └── utils.ts              ← useTranslations(), type definitions
```

### Recommended Project Structure
```
src/
├── i18n/
│   ├── locales/
│   │   ├── en/
│   │   │   └── common.ts      # baseline + type source
│   │   ├── zh/
│   │   │   └── common.ts
│   │   └── fr/
│   │       └── common.ts
│   └── utils.ts               # useTranslations(), Locale type
├── pages/
│   ├── index.astro            # English (unchanged)
│   ├── features/              # English (unchanged)
│   ├── zh/
│   │   └── index.astro        # thin wrapper, locale='zh'
│   └── fr/
│       └── index.astro        # thin wrapper, locale='fr'
└── layouts/
    └── BaseLayout.astro       # receives locale prop, dynamic lang attr
```

### Pattern 1: Astro i18n Config Block

**What:** Add minimal i18n routing config to `astro.config.mjs`
**When to use:** Required once; enables `Astro.currentLocale` and locale validation across the whole site

```typescript
// Source: https://docs.astro.build/en/guides/internationalization/
// astro.config.mjs
export default defineConfig({
  site: "https://tuwa.app",
  i18n: {
    locales: ["en", "zh", "fr"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,   // /about not /en/about
    },
  },
  // ... existing config unchanged
});
```

[VERIFIED: docs.astro.build/en/guides/internationalization/]

### Pattern 2: Nested-Object Translation Utility

**What:** `useTranslations(locale)` returns the locale's translation object typed against the English baseline. Caller accesses `t.hero.title` — full property-level autocomplete.
**When to use:** Any component or page that renders locale-specific copy

```typescript
// Source: pattern from https://rubensmn.dev/blog/type-safe-i18n-with-astro/
// src/i18n/utils.ts

import type en from './locales/en/common';

export type Locale = 'en' | 'zh' | 'fr';
export type CommonTranslations = typeof en;

const translations: Record<Locale, CommonTranslations> = {
  en: (await import('./locales/en/common')).default,
  zh: (await import('./locales/zh/common')).default,
  fr: (await import('./locales/fr/common')).default,
};

export function useTranslations(locale: Locale | undefined): CommonTranslations {
  return translations[locale ?? 'en'] ?? translations['en'];
}
```

```typescript
// src/i18n/locales/en/common.ts  (English is the type baseline)
const common = {
  nav: {
    features: 'Features',
    support: 'Support',
    blog: 'Blog',
    getApp: 'Get the App',
  },
  footer: {
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
} as const;

export default common;
export type Common = typeof common;
```

```typescript
// src/i18n/locales/zh/common.ts
import type { Common } from '../en/common';

const common: Common = {
  nav: {
    features: '功能',
    support: '支持',
    blog: '博客',
    getApp: '下载应用',
  },
  footer: {
    legal: '法律',
    privacy: '隐私政策',
    terms: '服务条款',
  },
};

export default common;
```

Usage in a thin wrapper page:
```astro
---
// src/pages/zh/index.astro
import { useTranslations } from '../../i18n/utils';
import BaseLayout from '../../layouts/BaseLayout.astro';
import IndexContent from '../../components/IndexContent.astro';

const t = useTranslations('zh');
---
<BaseLayout title="Tuwa" description="..." locale="zh">
  <IndexContent translations={t} />
</BaseLayout>
```

[VERIFIED: Astro docs recipe — https://docs.astro.build/en/recipes/i18n/]
[CITED: rubensmn.dev pattern for nested-object type inference]

### Pattern 3: Dynamic `lang` Attribute + Conditional CJK Font

**What:** BaseLayout accepts a `locale` prop, sets `<html lang>`, conditionally imports CJK CSS
**When to use:** Every locale-aware layout must do this

```astro
---
// src/layouts/BaseLayout.astro (modified)
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
  locale?: string;   // NEW — defaults to 'en' for backward compat
}

const { title, description, ogImage, canonical, type, locale = 'en' } = Astro.props;
const isCJK = locale === 'zh';

// Conditional CJK font load (only on zh pages)
if (isCJK) {
  await import('@fontsource/noto-sans-sc/400.css');
  await import('@fontsource/noto-sans-sc/700.css');
}
---
<!doctype html>
<html lang={locale}>   <!-- was hardcoded lang="en" -->
  ...
```

**Important:** The `await import()` in Astro frontmatter is the correct pattern for conditional CSS loading — it is resolved at build time for static pages. [ASSUMED — dynamic import for CSS in Astro frontmatter; verify this works for CSS files specifically vs. using a conditional `<style>` or slot approach]

**Alternative approach (safer, more explicit):**
```astro
---
const isCJK = locale === 'zh';
---
<html lang={locale}>
  <head>
    ...
    {isCJK && (
      <link rel="stylesheet" href="/fonts/noto-sans-sc-400.css" />
    )}
  </head>
```

The `@fontsource` package places CSS files in `node_modules`; they are bundled by Vite at build time. The conditional import guard — whether via frontmatter `import()` or a conditional `<link>` — ensures English and French pages never reference the CJK CSS.

### Pattern 4: Locale-Aware Nav Links

**What:** Header/Footer use `getRelativeLocaleUrl()` from `astro:i18n` to generate correct locale-prefixed hrefs
**When to use:** Any hardcoded `href="/"` or `href="/features/..."` that must work on /zh/ and /fr/ pages

```astro
---
// src/components/Header.astro (modified)
import { getRelativeLocaleUrl } from 'astro:i18n';

// currentLocale comes from Astro.currentLocale
const locale = Astro.currentLocale ?? 'en';
const homeHref = getRelativeLocaleUrl(locale, '/');
const supportHref = getRelativeLocaleUrl(locale, '/support');
---
<a href={homeHref}>Tuwa</a>
```

[VERIFIED: docs.astro.build/en/reference/modules/astro-i18n/]

**Note:** In Phase 17, Header/Footer pass locale for the `lang` attr and `getRelativeLocaleUrl` links. Full nav translation (nav strings in Chinese/French) is also wired here via the `t` prop from BaseLayout. The language switcher is Phase 18.

### Anti-Patterns to Avoid

- **Hardcoded `lang="en"` after adding i18n config:** BaseLayout currently has this — it MUST become `lang={locale}` as the first BaseLayout change. Leaving it hardcoded silently produces wrong accessibility/SEO output even with correct routing.
- **Importing CJK font CSS at the top of BaseLayout unconditionally:** An unconditional `import '@fontsource/noto-sans-sc/400.css'` in BaseLayout would load the CSS on every page including English, violating D-06 and causing unnecessary network requests.
- **Using `getLangFromUrl(Astro.url)` with manual URL parsing:** Astro 6 provides `Astro.currentLocale` built-in — no need to parse `url.pathname.split('/')`. The built-in is aware of the i18n config (locale aliases, custom paths) while manual parsing is not.
- **Flat string keys (`t('hero.title')`) in a per-page file approach:** Mixing the Astro docs recipe flat-key pattern (using `as const` string union) with the decision to use nested objects (D-03) will lose autocomplete. Commit to the nested object accessor pattern (`t.hero.title`) from the start.
- **Putting English pages inside `src/pages/en/`:** With `prefixDefaultLocale: false`, English pages live at the root `src/pages/`. Moving them would break all existing URLs.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale URL generation | Custom `buildLocaleUrl()` helper | `getRelativeLocaleUrl()` from `astro:i18n` | Built-in handles `prefixDefaultLocale`, locale aliases, `site` config, and edge cases |
| CJK unicode-range font slicing | Manual `@font-face` declarations with `unicode-range` | `@fontsource/noto-sans-sc` | CJK fonts have 100+ unicode-range slices; Fontsource generates these correctly for all supported weights |
| Locale detection from URL | `url.pathname.split('/')[1]` | `Astro.currentLocale` | Built-in is i18n-config-aware; manual splitting breaks with locale aliases or custom paths |
| Translation fallback chain | Custom `get(obj, key, fallback)` | TypeScript `satisfies` constraint + English as type baseline | TypeScript compiler enforces all keys present in non-English locales; missing keys are compile errors not silent runtime undefineds |

**Key insight:** Astro's built-in i18n covers routing, locale detection, and URL helpers. The only custom code needed is the translation lookup utility — and even that is 20 lines of TypeScript.

---

## Common Pitfalls

### Pitfall 1: `Astro.currentLocale` Returns `undefined` Without i18n Config

**What goes wrong:** `Astro.currentLocale` is `undefined` on all pages until the `i18n` block is added to `astro.config.mjs`.
**Why it happens:** The property is only populated after Astro's i18n middleware activates, which requires the config block.
**How to avoid:** Add `astro.config.mjs` i18n block as Wave 0 (first task). All subsequent tasks depend on it.
**Warning signs:** `locale ?? 'en'` always evaluates to `'en'` even on /zh/ pages.

### Pitfall 2: Static Build Requires No `fallback` Config for 404 Avoidance

**What goes wrong:** Adding `i18n.fallback: { zh: 'en', fr: 'en' }` with `fallbackType: 'rewrite'` only works in SSR mode.
**Why it happens:** Fallback rewrites require server-side routing to intercept 404s. Static output generates files at build time — if `src/pages/zh/index.astro` doesn't exist, the `/zh/` URL returns 404 regardless of fallback config.
**How to avoid:** Always create the thin wrapper page file first. The fallback config is irrelevant for a static site — empty pages returning English content satisfy I18N-01 ("even if content is English fallback").
**Warning signs:** Build succeeds but `/zh/` returns 404 in Cloudflare Pages preview.

### Pitfall 3: CJK Font CSS Bundled on English Pages via Vite

**What goes wrong:** If `@fontsource/noto-sans-sc/400.css` is imported anywhere that runs on every build — e.g., in `global.css` via `@import`, or unconditionally in a shared component — Vite bundles it into the shared CSS chunk. All pages then ship the CJK font declarations regardless of `unicode-range`.
**Why it happens:** Vite/Rollup CSS bundling does not tree-shake `@font-face` rules based on whether the font-family is referenced.
**How to avoid:** The import must be strictly conditional on `locale === 'zh'` inside the locale-aware layout scope. Never add CJK CSS to `global.css`.
**Warning signs:** Build output shows the CJK `@font-face` declarations in the main CSS bundle. Check with `grep -r 'Noto Sans SC' dist/` after build.

### Pitfall 4: TypeScript Type for Non-English Locale Must Use `satisfies` or Explicit Type Annotation

**What goes wrong:** The zh/common.ts file exports a plain object without a type constraint. Keys get typo'd or omitted without a compile error. The fallback logic silently returns English strings for missing keys — which looks like it works until a translator notices.
**Why it happens:** TypeScript infers the object's literal type rather than checking it against the English baseline shape.
**How to avoid:** Use `const common: Common = { ... }` (explicit type annotation) or `export default { ... } satisfies Common`. Either forces a compile error if a key is missing or mistyped.
**Warning signs:** `npx astro check` passes but non-English locale is missing keys at runtime.

### Pitfall 5: `src/pages/zh/` Folder Must Exactly Match Locale Code in Config

**What goes wrong:** Folder is named `src/pages/zh-CN/` or `src/pages/zh_CN/` but config has `locales: ['zh']`. Astro silently treats the folder as a non-locale path.
**Why it happens:** Astro's file-based routing matches locale folders by exact string equality against the `locales` array.
**How to avoid:** Use `zh` (not `zh-CN`) both in config and folder name, consistent with the short code. Locale codes should be lowercase.
**Warning signs:** `/zh/` returns 404; `astro build` completes without warning.

### Pitfall 6: `getRelativeLocaleUrl` Throws for Unknown Locales

**What goes wrong:** `getRelativeLocaleUrl('en-US', '/')` throws a runtime error because `'en-US'` is not in the `locales` array.
**Why it happens:** The function validates the locale code against the i18n config.
**How to avoid:** Always pass locale values sourced from `Astro.currentLocale` (already validated) rather than arbitrary strings. Guard with `locale ?? 'en'` where undefined is possible.

---

## Code Examples

Verified patterns from official sources:

### astro.config.mjs i18n Block
```typescript
// Source: https://docs.astro.build/en/guides/internationalization/
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from './src/remark-reading-time.mjs';

export default defineConfig({
  site: "https://tuwa.app",
  i18n: {
    locales: ["en", "zh", "fr"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### BaseLayout.astro locale prop addition
```astro
---
// src/layouts/BaseLayout.astro
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
  locale?: string;        // NEW
}

const { title, description, ogImage, canonical, type, locale = 'en' } = Astro.props;
const isCJK = locale === 'zh';
---
<!doctype html>
<html lang={locale}>     <!-- was lang="en" -->
  <head>
    ...
    {isCJK && (
      <>
        <link rel="preload" href="/fonts/noto-sans-sc-400.woff2" as="font" type="font/woff2" crossorigin />
      </>
    )}
  </head>
```

### Thin Wrapper Page (zh/index.astro)
```astro
---
// src/pages/zh/index.astro
import { useTranslations } from '../../i18n/utils';
import BaseLayout from '../../layouts/BaseLayout.astro';
// Import same content component as English version
import IndexContent from '../../components/IndexContent.astro';

const t = useTranslations('zh');
---
<BaseLayout
  title={t.meta.title}
  description={t.meta.description}
  locale="zh"
>
  <IndexContent translations={t} />
</BaseLayout>
```

### General Sans oe Ligature Check (D-10)
```bash
# Run during Phase 17 execution to verify U+0153 (oe) is in the variable font
# Use fonttools if available, or check via browser devtools on a fr page
python3 -c "
from fontTools.ttLib import TTFont
font = TTFont('public/fonts/GeneralSans-Variable.woff2')
cmap = font.getBestCmap()
print('U+0153 (oe) present:', 0x0153 in cmap)
"
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| External i18n libraries (astro-i18next, astro-i18n) | Astro built-in i18n routing | Astro 3.5 (2023) | No extra dependency; `Astro.currentLocale` available out of the box |
| `experimental.fonts` flag | Stable `fonts:` config key | Astro 6.0 (March 2026) | Fonts API is now stable; no experimental flag needed |
| `@astrojs/tailwind` | `@tailwindcss/vite` (already in use) | Tailwind v4 | Already adopted in this project |

**Deprecated/outdated:**
- `astro-i18next`: Wraps i18next, adds ~30KB dependency, last meaningful release 2023. Astro's built-in routing covers the routing piece natively.
- `getLangFromUrl(Astro.url)` (Astro docs recipe helper): Still works, but `Astro.currentLocale` (available since Astro 3.5) is the first-party equivalent and locale-config-aware.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Conditional `await import('@fontsource/noto-sans-sc/400.css')` in Astro frontmatter correctly prevents CJK CSS from bundling into English page CSS chunks | Standard Stack, Common Pitfalls | CJK font CSS bleeds into all pages; violates D-06. Mitigation: use conditional `<link rel="stylesheet">` with href pointing to node_modules-resolved path, or use a locale-specific layout variant. Verify with post-build `grep`. |
| A2 | `@fontsource/noto-sans-sc` 400+700 CSS imports trigger browser-side `unicode-range` lazy loading (browser only fetches character slices it needs) | Standard Stack | If CJK fonts load fully regardless of characters on page, performance goal of D-03 is violated. Mitigation: the package is documented to use `unicode-range` per slice; verify in Network tab during Phase 17 execution. |
| A3 | General Sans Variable (single woff2 file) contains the French oe ligature U+0153 | Code Examples | French pages would render oe in system serif; visible regression before Phase 19. Mitigation: D-10 explicitly flags this check during Phase 17 execution. |

---

## Open Questions

1. **Conditional CSS import approach in Astro frontmatter**
   - What we know: Astro frontmatter `import` statements are processed by Vite; CSS imports in frontmatter get bundled per-page in static output.
   - What's unclear: Whether a conditional `if (isCJK) { await import(...) }` in the frontmatter correctly scopes the CSS to only zh pages, or if Vite still bundles it globally.
   - Recommendation: Use the `{isCJK && <link rel="stylesheet" href={...} />}` HTML approach as a fallback if the dynamic import approach is unverified. The planner should include a post-build verification step: `grep -r 'Noto Sans SC' dist/_astro/*.css` — if any non-zh page bundle contains the declaration, switch approach.

2. **`@fontsource/noto-sans-sc` CSS import path with Vite**
   - What we know: Fontsource packages expose CSS at `@fontsource/noto-sans-sc/400.css` and `@fontsource/noto-sans-sc/700.css`.
   - What's unclear: The exact Vite/Astro handling of this import when used conditionally in a layout (does it copy woff2 files to `dist/` with correct content hashes?).
   - Recommendation: Install the package in Wave 0 and confirm build output before writing wrapper pages. Check that woff2 files appear in `dist/_astro/` or `dist/fonts/`.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| `@fontsource/noto-sans-sc` | I18N-03 | ✗ (not installed) | 5.2.9 on npm | — |
| Astro i18n routing | I18N-01 | ✓ (built into Astro 6.3.1) | 6.3.1 | — |
| TypeScript | I18N-02 | ✓ | 6.0.3 | — |
| fonttools (Python) | D-10 oe ligature check | Unknown | — | Browser devtools character inspection |

**Missing dependencies with no fallback:**
- `@fontsource/noto-sans-sc` must be installed (`npm install @fontsource/noto-sans-sc`) in Wave 0.

**Missing dependencies with fallback:**
- fonttools: Python `fonttools` library for scripted oe glyph check. If not available, check via browser devtools on a French test page with "œ" character.

---

## Sources

### Primary (HIGH confidence)
- [docs.astro.build/en/guides/internationalization/](https://docs.astro.build/en/guides/internationalization/) — i18n config, `prefixDefaultLocale`, `Astro.currentLocale`, file structure
- [docs.astro.build/en/reference/modules/astro-i18n/](https://docs.astro.build/en/reference/modules/astro-i18n/) — `getRelativeLocaleUrl` and related helpers
- [docs.astro.build/en/reference/configuration-reference/#i18n](https://docs.astro.build/en/reference/configuration-reference/#i18n) — complete config options, types, defaults
- [docs.astro.build/en/recipes/i18n/](https://docs.astro.build/en/recipes/i18n/) — official `useTranslations` + `getLangFromUrl` recipe
- npm registry: `@fontsource/noto-sans-sc` v5.2.9 [VERIFIED 2026-05-16]
- npm registry: `astro` v6.3.1 already in package.json [VERIFIED]

### Secondary (MEDIUM confidence)
- [rubensmn.dev/blog/type-safe-i18n-with-astro/](https://rubensmn.dev/blog/type-safe-i18n-with-astro/) — nested-object `t` accessor pattern with TypeScript shape inference; multiple sources describe this same approach
- [docs.astro.build/en/guides/fonts/](https://docs.astro.build/en/guides/fonts/) — Astro Fonts API (stable in Astro 6), `fontProviders.fontsource()` config
- [astro.build/blog/astro-6/](https://astro.build/blog/astro-6/) — confirmed Fonts API stable status in Astro 6.0

### Tertiary (LOW confidence)
- WebSearch aggregates on Fontsource unicode-range behavior — multiple sources agree CJK subsets use per-slice unicode-range, but not independently verified against the actual CSS output from `@fontsource/noto-sans-sc`

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Astro 6.3.1 confirmed installed; @fontsource/noto-sans-sc version verified on npm; Astro i18n docs checked directly
- Architecture: HIGH — Astro i18n routing docs verified; locale folder structure, `prefixDefaultLocale: false`, and `Astro.currentLocale` behavior confirmed
- Translation utility pattern: HIGH — official Astro recipe confirmed + nested-object pattern from reputable source; TypeScript `satisfies`/type annotation approach is standard TS
- CJK font conditional loading: MEDIUM — Fontsource unicode-range behavior documented; conditional import mechanism in Astro frontmatter has one assumption (A1) flagged
- Pitfalls: MEDIUM — derived from official docs + known Astro/Vite behaviors; some confirmed by multiple sources

**Research date:** 2026-05-16
**Valid until:** 2026-08-16 (Astro i18n API is stable; Fontsource package versions may increment but API is stable)
