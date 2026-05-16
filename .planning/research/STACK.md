# Technology Stack: i18n (Chinese + French)

**Project:** Tuwa Marketing Website — Multi-Language Support
**Researched:** 2026-05-16
**Scope:** Additions/changes needed for zh + fr i18n on existing Astro 6 static site

## Recommended Stack Additions

### Routing: Astro Built-in i18n (NO additional package)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro i18n config | Built-in (Astro 6.x) | Locale-prefixed routing, locale detection, URL helpers | Zero-dependency. Astro's native i18n handles `/zh/`, `/fr/` URL prefixes, generates static paths per locale, provides `getRelativeLocaleUrl()` and `Astro.currentLocale`. No adapter or package needed — just config in `astro.config.mjs`. |

**Configuration:**

```javascript
// astro.config.mjs — add to existing defineConfig
export default defineConfig({
  site: "https://tuwa.app",
  i18n: {
    locales: ['en', 'zh', 'fr'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,  // English stays at / (no /en/ prefix)
      redirectToDefaultLocale: false,  // Don't redirect / to /en/
    },
    fallback: {
      zh: 'en',
      fr: 'en',
    },
    fallbackType: 'rewrite',  // Serve English content for untranslated pages
  },
  // ... rest of existing config
});
```

**Rationale:** English is the existing default with no prefix. Chinese and French get `/zh/` and `/fr/` prefixes. Fallback with `rewrite` means untranslated pages still render (with English content) rather than 404ing — critical during incremental translation rollout.

---

### Translation Management: TypeScript Dictionary Pattern (NO external library)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Custom TS translation utility | N/A | Type-safe translation access | For a 10-page static marketing site with 3 locales, a full i18n framework (Paraglide, i18next) is over-engineering. A ~50-line TypeScript utility with JSON dictionaries gives compile-time key checking, IDE autocomplete, and zero runtime cost. No build plugins, no compilation step, no inlang project file. |

**Why NOT Paraglide:**
- Paraglide adds a build compilation step, an `inlang` project config, and a `src/paraglide/` generated directory — complexity not justified for 3 locales on a static site with no dynamic interpolation needs beyond simple variable substitution.
- Paraglide's bundle-size advantage (tree-shaking unused messages) is irrelevant for a static site — translations are resolved at build time regardless.

**Why NOT astro-i18next:**
- Archived/unmaintained. Not compatible with Astro 5+, let alone Astro 6.
- Ships a runtime library (i18next) that adds ~20KB for zero benefit on a static build.

**Implementation pattern:**

```
src/
  i18n/
    index.ts          # useTranslations(locale) helper
    locales.ts        # type definitions, locale list
  translations/
    en.json           # English strings (source of truth)
    zh.json           # Chinese strings
    fr.json           # French strings
  pages/
    index.astro       # English (default, no prefix)
    zh/
      index.astro     # Chinese landing
    fr/
      index.astro     # French landing
```

```typescript
// src/i18n/locales.ts
import en from '../translations/en.json';

export const locales = ['en', 'zh', 'fr'] as const;
export type Locale = (typeof locales)[number];
export type TranslationKeys = typeof en;
export const defaultLocale: Locale = 'en';
```

```typescript
// src/i18n/index.ts
import type { Locale, TranslationKeys } from './locales';
import en from '../translations/en.json';
import zh from '../translations/zh.json';
import fr from '../translations/fr.json';

const translations: Record<Locale, TranslationKeys> = { en, zh, fr };

export function t(locale: Locale): TranslationKeys {
  return translations[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'zh' || lang === 'fr') return lang;
  return 'en';
}
```

**Translation file format: JSON** — not YAML (no parser needed), not TS (can't be sent to external translators). JSON is universally understood by translation tools, human editors, and LLMs alike.

---

### Chinese Font: Fontsource Noto Sans SC (auto-subsetted)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @fontsource/noto-sans-sc | latest (5.x) | Chinese character rendering | Fontsource automatically splits Noto Sans SC into ~100 small WOFF2 files with `unicode-range` declarations. Browser downloads ONLY the subsets containing characters actually used on each page. Total potential: ~7MB, but typical page load: 200-400KB of Chinese glyphs. No manual subsetting needed. |

**Why Fontsource over Google Fonts CDN:**
- Self-hosted = no third-party request, no GDPR cookie banner trigger, consistent with existing self-hosted General Sans pattern.
- Fontsource's npm package pre-splits into unicode-range subsets identically to Google Fonts' approach.

**Why Noto Sans SC specifically:**
- Pairs well with General Sans (both are geometric sans-serif).
- Covers all simplified Chinese characters needed for marketing copy.
- Variable weight available (matches General Sans's 200-700 weight range).

**Integration:**

```bash
npm install @fontsource/noto-sans-sc
```

```css
/* src/styles/global.css — add after General Sans @font-face */
/* Chinese font — only loads on pages with Chinese characters (unicode-range) */
@import "@fontsource/noto-sans-sc/400.css";
@import "@fontsource/noto-sans-sc/500.css";
@import "@fontsource/noto-sans-sc/700.css";
```

```css
:root {
  --font-general-sans: 'General Sans', 'Noto Sans SC', system-ui, sans-serif;
}
```

**Performance note:** Because of `unicode-range`, the Noto Sans SC files are only fetched when the browser encounters Chinese characters on the page. English-only pages download 0 bytes of Chinese font.

---

### French Font: No addition needed

French uses the Latin alphabet. General Sans already covers all French diacritics (e, a, u, c, etc.). No font changes required for French.

---

### SEO: Hreflang Tags in Layout

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Custom `<HreflangTags>` component | N/A | Per-page alternate language links | Search engines need `<link rel="alternate" hreflang="x">` to associate language variants. Write a 15-line Astro component using `getAbsoluteLocaleUrl()` from `astro:i18n`. |
| @astrojs/sitemap (existing) | already installed | Per-locale sitemap entries | As of Astro 6.1+, the sitemap integration automatically includes i18n fallback pages. With the i18n config above, it generates correct per-locale sitemap entries with no additional config. |

**Implementation:**

```astro
---
// src/components/HreflangTags.astro
import { getAbsoluteLocaleUrl } from 'astro:i18n';
const locales = ['en', 'zh', 'fr'];
const path = Astro.url.pathname.replace(/^\/(zh|fr)\//, '/');
---
{locales.map(locale => (
  <link rel="alternate" hreflang={locale} href={getAbsoluteLocaleUrl(locale, path)} />
))}
<link rel="alternate" hreflang="x-default" href={getAbsoluteLocaleUrl('en', path)} />
```

---

### Language Switcher: Custom Astro Component (NO library)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Custom `<LanguageSwitcher>` | N/A | UI for switching locale | A dropdown or link group in the header. Uses `getRelativeLocaleUrl()` to build links to the same page in other locales. 20 lines of Astro, zero JS needed (plain `<a>` tags). |

---

## What NOT to Add

| Technology | Why NOT |
|------------|---------|
| Paraglide / @inlang/paraglide-js | Over-engineered for 3 locales, 10 pages, static output. Adds build complexity (inlang project, generated directory) for zero measurable benefit. |
| astro-i18next | Archived, incompatible with Astro 5+. Ships runtime JS. |
| i18next (standalone) | Runtime translation library. Pointless for static builds where all strings resolve at build time. |
| @astrojs/cloudflare adapter | Still not needed. i18n routing works at build time for static sites. |
| ICU MessageFormat | Marketing copy has no complex pluralization rules. Simple `{variable}` interpolation in JSON covers all needs. |
| Translation management SaaS (Crowdin, Phrase, Lokalise) | Solo developer. 10 pages. Not worth the integration overhead. Use JSON files in Git, optionally translate with LLM assistance. |

---

## Page Structure Strategy

**Recommended approach: Shared layout + per-locale page files**

```
src/pages/
  index.astro                    # English landing (default)
  privacy.astro                  # English privacy
  features/coaching.astro        # English coaching
  zh/
    index.astro                  # Chinese landing
    privacy.astro                # Chinese privacy
    features/coaching.astro      # Chinese coaching
  fr/
    index.astro                  # French landing
    privacy.astro                # French privacy
    features/coaching.astro      # French coaching
```

Each locale page imports the same layout and components but passes `locale="zh"` prop, which triggers the translation lookup. Shared layouts remain DRY; only the string content differs.

**Alternative considered (dynamic `[...lang]` route):** Rejected because feature pages have significantly different content structures (not just string swaps) — coaching.astro has distinct sections with localized screenshots. Explicit page files per locale give maximum control.

---

## Installation Summary

```bash
# Only new dependency
npm install @fontsource/noto-sans-sc
```

That is it. One package. Everything else is built-in Astro features + custom TypeScript utilities.

---

## Integration Points with Existing Config

| Existing | Change Needed |
|----------|---------------|
| `astro.config.mjs` | Add `i18n` object (locales, defaultLocale, routing, fallback) |
| `src/styles/global.css` | Add Noto Sans SC imports, update font-family fallback stack |
| `src/components/SEO.astro` | Add hreflang `<link>` tags |
| `src/components/Header.astro` | Add language switcher |
| `@astrojs/sitemap` | No change needed — auto-detects i18n config |
| Existing page files | No changes — they remain the English default |

---

## Build-Time Translation Workflow

### Authoring Flow

1. **Source of truth:** `src/translations/en.json` — all keys defined here first
2. **Translation:** Copy `en.json` to `zh.json`/`fr.json`, translate values (use Claude or manual)
3. **Type safety:** TypeScript ensures all keys present — build fails if a key is missing from any locale file (enforced by `Record<Locale, TranslationKeys>` type)
4. **Review:** `git diff` on JSON files shows exactly what changed

### Build Behavior

- Astro generates static HTML for every locale page at build time
- No runtime translation resolution — all strings baked into HTML
- Missing translation = TypeScript compile error (caught before deploy)
- Fallback config only applies to missing PAGE FILES, not missing translation strings

### Incremental Rollout

Start with high-value pages (landing, feature pages), defer low-value pages (terms, privacy) using Astro's fallback rewrite — those will serve English content at `/zh/terms` until translated.

---

## Confidence Assessment

| Decision | Confidence | Source |
|----------|------------|--------|
| Astro built-in i18n routing config | HIGH | Official Astro docs, verified for v6 |
| prefixDefaultLocale: false for English | HIGH | Official docs, standard pattern |
| Fallback with rewrite type | HIGH | Astro 6.1 release notes confirm sitemap integration |
| TypeScript dictionary over Paraglide | MEDIUM | Pattern verified in multiple community guides; Paraglide would also work but adds complexity |
| @fontsource/noto-sans-sc with unicode-range | HIGH | Fontsource docs, npm package confirmed |
| No font needed for French | HIGH | General Sans covers full Latin Extended |
| @astrojs/sitemap auto i18n support | HIGH | Astro 6.1 release notes |

---

## Sources

- [Astro i18n Routing Docs](https://docs.astro.build/en/guides/internationalization/)
- [Astro i18n Recipe (manual pattern)](https://docs.astro.build/en/recipes/i18n/)
- [Type-Safe i18n in Astro Without External Packages](https://rubensmn.dev/blog/type-safe-i18n-with-astro/)
- [Paraglide-Astro (assessed, not recommended)](https://inlang.com/m/iljlwzfs/paraglide-astro-i18n)
- [Paraglide JS GitHub](https://github.com/opral/paraglide-js)
- [Why I Replaced i18next with Paraglide](https://dropanote.de/en/blog/20250726-why-i-replaced-i18next-with-paraglide-js/)
- [Fontsource Noto Sans SC](https://fontsource.org/fonts/noto-sans-sc)
- [Astro 6.1 Release (fallback routes in sitemap)](https://astro.build/blog/astro-610/)
- [Astro i18n Configuration Guide (BetterLink)](https://eastondev.com/blog/en/posts/dev/20251202-astro-i18n-guide/)
- [Noto Sans SC — Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+SC)
