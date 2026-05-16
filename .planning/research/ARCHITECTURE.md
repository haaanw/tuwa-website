# Architecture: i18n Integration (Chinese + French)

**Project:** Tuwa Marketing Website
**Researched:** 2026-05-16
**Confidence:** HIGH (based on official Astro docs)

## Strategy: Astro Built-in i18n with Prefix Routing

Use Astro's native i18n routing (available since Astro 3.5, stable in Astro 6). English remains the default locale without a URL prefix. Chinese and French get `/zh/` and `/fr/` prefixes.

**Why this over third-party libraries:** Astro's built-in system handles routing, locale detection, URL generation, and sitemap integration. No extra dependencies needed.

---

## 1. Configuration Change

### astro.config.mjs

```javascript
export default defineConfig({
  site: "https://tuwa.app",
  i18n: {
    locales: ["en", "zh", "fr"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,  // tuwa.app/ = English, tuwa.app/zh/ = Chinese
      fallbackType: "rewrite",     // Missing translations show English content silently
    },
    fallback: {
      zh: "en",
      fr: "en",
    },
  },
  // ... rest unchanged
});
```

**Key decision: `prefixDefaultLocale: false`** -- English URLs stay clean (no `/en/` prefix), preserving existing SEO juice and inbound links. Only zh/fr get prefixes.

---

## 2. File Structure

### New Files to Create

```
src/
├── i18n/
│   ├── config.ts          # Language metadata, locale list
│   ├── utils.ts           # getLangFromUrl(), useTranslations(), getLocalizedPath()
│   ├── ui.ts              # Shared UI strings (nav, footer, CTAs, buttons)
│   └── pages/
│       ├── home.ts        # Page-specific content (hero headline, subtitle, etc.)
│       ├── recovery-scoring.ts
│       ├── workload-tracking.ts
│       ├── smart-templates.ts
│       ├── cold-start.ts
│       ├── coaching.ts
│       └── support.ts
├── pages/
│   ├── zh/
│   │   ├── index.astro
│   │   ├── support.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   └── features/
│   │       ├── recovery-scoring.astro
│   │       ├── workload-tracking.astro
│   │       ├── smart-templates.astro
│   │       ├── cold-start.astro
│   │       └── coaching.astro
│   └── fr/
│       ├── index.astro
│       ├── support.astro
│       ├── privacy.astro
│       ├── terms.astro
│       └── features/
│           ├── recovery-scoring.astro
│           ├── workload-tracking.astro
│           ├── smart-templates.astro
│           ├── cold-start.astro
│           └── coaching.astro
├── components/
│   └── LanguageSwitcher.astro  # NEW
```

### Translation File Pattern

**Why separate page files instead of one giant JSON:** Each feature page has 500+ words of copy. A single monolithic translation file would be unmaintainable. Per-page files keep translations co-located with the content they serve.

```typescript
// src/i18n/config.ts
export const languages = {
  en: { name: "English", flag: "🇬🇧", dir: "ltr" },
  zh: { name: "中文", flag: "🇨🇳", dir: "ltr" },
  fr: { name: "Français", flag: "🇫🇷", dir: "ltr" },
} as const;

export const defaultLang = "en";
export type Lang = keyof typeof languages;
```

```typescript
// src/i18n/ui.ts — shared strings (nav, footer, common CTAs)
export const ui = {
  en: {
    "nav.features": "Features",
    "nav.blog": "Blog",
    "nav.support": "Support",
    "footer.features": "Features",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "cta.download": "Download on the App Store",
    "cta.learn-more": "Learn more",
  },
  zh: {
    "nav.features": "功能",
    "nav.blog": "博客",
    "nav.support": "支持",
    "footer.features": "功能",
    "footer.company": "关于",
    "footer.legal": "法律",
    "footer.privacy": "隐私政策",
    "footer.terms": "使用条款",
    "cta.download": "在 App Store 下载",
    "cta.learn-more": "了解更多",
  },
  fr: {
    "nav.features": "Fonctionnalites",
    "nav.blog": "Blog",
    "nav.support": "Support",
    // ...
  },
} as const;
```

```typescript
// src/i18n/pages/home.ts — page-specific content
export const home = {
  en: {
    headline: "Train smarter. Recover with precision.",
    subtitle: "Tuwa combines HRV, sleep, training load, and six fatigue dimensions into a single readiness score — so you know exactly how hard to push today.",
    altDashboard: "Tuwa app showing today's recovery score of 82 — HRV in green zone, sleep 7.5 hours.",
  },
  zh: {
    headline: "更聪明地训练，更精准地恢复。",
    subtitle: "Tuwa 将 HRV、睡眠、训练负荷和六项疲劳维度整合为一个准备状态评分 — 让你确切知道今天该推多少。",
    altDashboard: "Tuwa 应用显示今日恢复评分 82 — HRV 绿区，睡眠 7.5 小时。",
  },
  fr: {
    headline: "Entrainez-vous plus intelligemment. Recuperez avec precision.",
    subtitle: "Tuwa combine VFC, sommeil, charge d'entrainement et six dimensions de fatigue en un seul score de readiness.",
    altDashboard: "Application Tuwa affichant un score de recuperation de 82.",
  },
} as const;
```

---

## 3. Utility Functions

```typescript
// src/i18n/utils.ts
import { ui, defaultLang, type Lang, languages } from "./config";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui["en"]): string {
    return ui[lang]?.[key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

export function getAlternateLinks(currentPath: string): Array<{ lang: Lang; href: string }> {
  // Strip locale prefix to get base path
  const basePath = currentPath.replace(/^\/(zh|fr)/, "") || "/";
  return Object.keys(languages).map((lang) => ({
    lang: lang as Lang,
    href: getLocalizedPath(lang as Lang, basePath),
  }));
}
```

---

## 4. Component Modifications

### Pattern: Components Accept Translated Content via Props

Components do NOT import translations themselves. Pages pass translated strings down. This keeps components locale-agnostic and reusable.

#### Hero.astro (modified)

```astro
---
import DeviceFrame from './DeviceFrame.astro';
import MatisseFrieze from './MatisseFrieze.astro';
import { APP_STORE_URL } from '../config';

interface Props {
  headline: string;
  subtitle: string;
  altDashboard: string;
  downloadLabel: string;
}

const { headline, subtitle, altDashboard, downloadLabel } = Astro.props;
---
<section class="section-spaced px-6" style="position: relative;">
  <MatisseFrieze />
  <div class="mx-auto text-center" style="...">
    <h1 class="hero-headline" style="...">{headline}</h1>
    <p class="hero-subtitle mx-auto" style="...">{subtitle}</p>
    <!-- device frame unchanged -->
    <DeviceFrame src={dashboardScreenshot} alt={altDashboard} ... />
    <!-- badge -->
    <img src="/badges/app-store-badge.svg" alt={downloadLabel} ... />
  </div>
</section>
```

#### Header.astro (modified)

```astro
---
import { getLangFromUrl, useTranslations, getLocalizedPath } from '../i18n/utils';
import LanguageSwitcher from './LanguageSwitcher.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---
<!-- Nav links use t() and getLocalizedPath() -->
<a href={getLocalizedPath(lang, "/features/recovery-scoring")}>{t("nav.features")}</a>
<!-- Add LanguageSwitcher in nav -->
<LanguageSwitcher currentLang={lang} currentPath={Astro.url.pathname} />
```

#### Footer.astro (modified)

Same pattern as Header: import `getLangFromUrl`, `useTranslations`, `getLocalizedPath`. All hardcoded link text and hrefs become dynamic.

#### SEO.astro (modified — add hreflang)

```astro
---
import { getAlternateLinks } from '../i18n/utils';

// ... existing props ...
const lang = Astro.props.lang || "en";
const alternates = getAlternateLinks(Astro.url.pathname);
---
<!-- existing meta tags -->

<!-- hreflang tags for SEO -->
{alternates.map(({ lang: l, href }) => (
  <link rel="alternate" hreflang={l} href={`https://tuwa.app${href}`} />
))}
<link rel="alternate" hreflang="x-default" href={`https://tuwa.app${alternates.find(a => a.lang === 'en')?.href}`} />
```

### New Component: LanguageSwitcher.astro

```astro
---
import { languages, type Lang } from '../i18n/config';
import { getLocalizedPath } from '../i18n/utils';

interface Props {
  currentLang: Lang;
  currentPath: string;
}

const { currentLang, currentPath } = Astro.props;
// Strip existing locale prefix to get base path
const basePath = currentPath.replace(/^\/(zh|fr)/, '') || '/';
---
<div class="language-switcher">
  {Object.entries(languages).map(([code, { name }]) => (
    <a
      href={getLocalizedPath(code as Lang, basePath)}
      aria-current={code === currentLang ? "page" : undefined}
      class:list={["lang-link", { active: code === currentLang }]}
    >
      {name}
    </a>
  ))}
</div>
```

---

## 5. Layout Modifications

### BaseLayout.astro

```astro
---
// Add lang prop
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
  lang?: string;  // NEW
}

const { title, description, ogImage, canonical, type, lang = "en" } = Astro.props;
---
<!doctype html>
<html lang={lang}>  <!-- was hardcoded "en" -->
  <head>
    <!-- existing head content -->
    <!-- hreflang links added via SEO component -->
  </head>
  <body>
    <Header />  <!-- Header self-detects lang from URL -->
    <main class="max-w-[1440px] mx-auto w-full">
      <slot />
    </main>
    <Footer />  <!-- Footer self-detects lang from URL -->
  </body>
</html>
```

**Key insight:** Header and Footer detect their own language from `Astro.url` rather than requiring a lang prop drilled from every page. This minimizes changes to the 10+ page files that use BaseLayout.

---

## 6. Page File Pattern (Localized Pages)

Each localized page is a thin wrapper that imports translations and passes them to the same components.

```astro
---
// src/pages/zh/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Hero from '../../components/Hero.astro';
import FeatureGrid from '../../components/FeatureGrid.astro';
import StatsCounter from '../../components/StatsCounter.astro';
import LandingCTA from '../../components/LandingCTA.astro';
import { home } from '../../i18n/pages/home';

const content = home.zh;
---
<BaseLayout
  title="Tuwa"
  description={content.subtitle}
  lang="zh"
>
  <Hero
    headline={content.headline}
    subtitle={content.subtitle}
    altDashboard={content.altDashboard}
    downloadLabel="在 App Store 下载"
  />
  <FeatureGrid lang="zh" />
  <StatsCounter />
  <LandingCTA lang="zh" />
</BaseLayout>
```

**Legal pages (privacy, terms):** These are long-form content. Instead of translating them string-by-string, create separate full-page MDX or HTML content per locale. The layout stays the same; only the content slot changes.

---

## 7. Build Output Structure

With `prefixDefaultLocale: false`, the static build produces:

```
dist/
├── index.html                    # English (default)
├── features/
│   ├── recovery-scoring/index.html
│   └── ...
├── support/index.html
├── privacy/index.html
├── terms/index.html
├── blog/index.html
├── zh/
│   ├── index.html                # Chinese
│   ├── features/
│   │   ├── recovery-scoring/index.html
│   │   └── ...
│   ├── support/index.html
│   ├── privacy/index.html
│   └── terms/index.html
├── fr/
│   ├── index.html                # French
│   ├── features/...
│   └── ...
└── sitemap-index.xml             # Auto-includes all locale URLs
```

Cloudflare Pages serves this identically to the current setup -- no adapter or worker changes needed. It is purely additive static files.

---

## 8. Sitemap and SEO Integration

Astro's `@astrojs/sitemap` automatically picks up all generated pages including `/zh/` and `/fr/` routes. No config change needed for sitemap generation.

For `hreflang` in the sitemap XML (preferred by Google), the sitemap integration respects the i18n config and can generate `<xhtml:link>` elements if configured. Verify this works in Phase 1 testing.

---

## 9. Data Flow Diagram

```
Translation Files (src/i18n/)
        │
        ▼
Page Files (src/pages/zh/index.astro)
  ├── imports translations
  ├── passes content as props to components
  └── sets lang on BaseLayout
        │
        ▼
BaseLayout (sets <html lang>, renders Header/Footer)
  ├── Header: self-detects lang from URL, uses t() for nav
  ├── Footer: self-detects lang from URL, uses t() for links
  └── SEO: generates hreflang alternates
```

---

## 10. What Changes vs What Stays

### Files Modified (existing)

| File | Change | Complexity |
|------|--------|-----------|
| `astro.config.mjs` | Add `i18n` config block | Low |
| `src/layouts/BaseLayout.astro` | Add `lang` prop, pass to `<html>` | Low |
| `src/components/Header.astro` | Add i18n utils, LanguageSwitcher, localized hrefs | Medium |
| `src/components/Footer.astro` | Add i18n utils, localized hrefs and text | Medium |
| `src/components/SEO.astro` | Add hreflang alternate links | Low |
| `src/components/Hero.astro` | Accept content via props instead of hardcoded | Medium |
| `src/components/FeatureGrid.astro` | Accept `lang` prop, localize labels | High (largest component, 15.5K) |
| `src/components/LandingCTA.astro` | Accept translated CTA text | Low |
| `src/components/StatsCounter.astro` | Accept translated labels | Low |
| `src/components/FaqAccordion.astro` | Accept translated Q&A content | Medium |
| `src/components/FeatureCTA.astro` | Accept translated text | Low |

### Files Created (new)

| File | Purpose |
|------|---------|
| `src/i18n/config.ts` | Language definitions, types |
| `src/i18n/utils.ts` | Translation helpers, URL utilities |
| `src/i18n/ui.ts` | Shared UI strings (nav, footer, CTAs) |
| `src/i18n/pages/home.ts` | Home page content (3 locales) |
| `src/i18n/pages/recovery-scoring.ts` | Feature page content |
| `src/i18n/pages/workload-tracking.ts` | Feature page content |
| `src/i18n/pages/smart-templates.ts` | Feature page content |
| `src/i18n/pages/cold-start.ts` | Feature page content |
| `src/i18n/pages/coaching.ts` | Feature page content |
| `src/i18n/pages/support.ts` | Support page content |
| `src/components/LanguageSwitcher.astro` | Language picker UI |
| `src/pages/zh/index.astro` | Chinese home |
| `src/pages/zh/features/*.astro` (5 files) | Chinese feature pages |
| `src/pages/zh/support.astro` | Chinese support |
| `src/pages/zh/privacy.astro` | Chinese privacy |
| `src/pages/zh/terms.astro` | Chinese terms |
| `src/pages/fr/index.astro` | French home |
| `src/pages/fr/features/*.astro` (5 files) | French feature pages |
| `src/pages/fr/support.astro` | French support |
| `src/pages/fr/privacy.astro` | French privacy |
| `src/pages/fr/terms.astro` | French terms |

### Files Unchanged

- `src/styles/global.css` -- CSS is language-agnostic
- `src/components/DeviceFrame.astro` -- receives alt text via prop already
- `src/components/MatisseFrieze.astro` -- decorative, no text
- `src/components/MatisseDecoration.astro` -- decorative, no text
- `src/components/MatisseShape.astro` -- decorative, no text
- `src/components/ScreenshotBlock.astro` -- alt text via props already
- `src/components/MobileMenu.astro` -- will mirror Header's nav items (modify alongside Header)
- `src/config.ts` -- APP_STORE_URL is language-independent
- All screenshot/image assets -- same across locales

---

## 11. Recommended Build Order

Phases ordered to minimize rework and enable incremental testing:

### Phase 1: Infrastructure (no visible changes yet)
1. Create `src/i18n/config.ts` + `src/i18n/utils.ts`
2. Add `i18n` block to `astro.config.mjs`
3. Create `src/i18n/ui.ts` with English strings extracted from Header/Footer
4. **Test:** Build still works, English site unchanged

### Phase 2: Shared Components (English extraction)
1. Modify Header to use `t()` — English strings come from `ui.ts` now
2. Modify Footer to use `t()` and `getLocalizedPath()`
3. Modify BaseLayout to accept and propagate `lang`
4. Modify SEO component to emit hreflang
5. Create LanguageSwitcher component
6. **Test:** English site works identically, lang switcher visible but links 404

### Phase 3: Home Page Localization (first complete locale)
1. Create `src/i18n/pages/home.ts` with all 3 locales
2. Refactor Hero.astro to accept props
3. Refactor FeatureGrid, StatsCounter, LandingCTA for lang prop
4. Create `src/pages/zh/index.astro` (thin wrapper)
5. Create `src/pages/fr/index.astro`
6. Add zh/fr strings to `ui.ts`
7. **Test:** Full Chinese and French home pages render correctly

### Phase 4: Feature Pages
1. Create translation files for each feature page
2. Create `src/pages/zh/features/*.astro` (5 pages)
3. Create `src/pages/fr/features/*.astro` (5 pages)
4. **Test:** All feature pages render in 3 languages

### Phase 5: Legal and Support Pages
1. Create full translated content for privacy, terms, support
2. Create localized page files
3. **Test:** Complete site navigable in all 3 languages

### Phase 6: Polish and SEO Verification
1. Verify hreflang tags on all pages
2. Verify sitemap includes all locale URLs
3. Test language switcher from every page
4. Verify OG metadata per locale
5. Lighthouse audit on locale pages

**Rationale for this order:**
- Phase 1-2 establish the pattern without creating locale pages (safe, reversible)
- Phase 3 proves the full pattern on one page before scaling to all 10
- Phases 4-5 are parallelizable grunt work once the pattern is proven
- Phase 6 catches SEO issues before deployment

---

## 12. Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Props-down pattern (not component-level imports) | Components stay testable and reusable; translation logic lives in pages |
| Header/Footer self-detect via URL | Avoids prop drilling through every page; these two components always exist |
| Separate page files per locale (not dynamic routes) | Static build, better SEO, simpler mental model for 10 pages x 3 locales |
| TypeScript translation files (not JSON) | Type safety, autocomplete in IDE, can include computed values |
| Per-page translation files | Feature pages have 500+ words each; monolithic file would be unmaintainable |
| `prefixDefaultLocale: false` | Preserves existing English URLs and SEO equity |
| Fallback rewrite (not redirect) | Users see English content instead of 404 for untranslated pages during rollout |

---

## Sources

- [Astro i18n Routing Guide](https://docs.astro.build/en/guides/internationalization/)
- [Astro i18n Recipe (translation utilities)](https://docs.astro.build/en/recipes/i18n/)
- [Astro i18n API Reference](https://docs.astro.build/en/reference/modules/astro-i18n/)
- [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/)
