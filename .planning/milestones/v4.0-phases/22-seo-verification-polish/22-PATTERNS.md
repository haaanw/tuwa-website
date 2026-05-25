# Phase 22: SEO Verification & Polish - Pattern Map

**Mapped:** 2026-05-25
**Files analyzed:** 9
**Analogs found:** 9 / 9

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/components/SEO.astro` | component | request-response | `src/components/SEO.astro` (self) | self |
| `astro.config.mjs` | config | transform | `astro.config.mjs` (self) | self |
| `src/pages/404.astro` | page | request-response | `src/pages/support.astro` | role-match |
| `src/pages/zh/404.astro` | page | request-response | `src/pages/zh/support.astro` | exact |
| `src/pages/fr/404.astro` | page | request-response | `src/pages/fr/support.astro` | exact |
| `src/i18n/locales/en/404.ts` | utility | transform | `src/i18n/locales/en/blog.ts` | exact |
| `src/i18n/locales/zh/404.ts` | utility | transform | `src/i18n/locales/zh/blog.ts` | exact |
| `src/i18n/locales/fr/404.ts` | utility | transform | `src/i18n/locales/fr/blog.ts` | exact |
| `src/i18n/utils.ts` | utility | transform | `src/i18n/utils.ts` (self) | self |

---

## Pattern Assignments

### `src/components/SEO.astro` (component, request-response)

**Analog:** `src/components/SEO.astro` (self — modify in place)

**Current props interface** (lines 1-8):
```typescript
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
}
```

**Current destructure + derivations** (lines 10-21):
```typescript
const {
  title,
  description,
  ogImage = "/og-default.png",
  canonical = Astro.url.href,
  type = "website",
} = Astro.props;

const siteName = "Tuwa";
const fullTitle = title === siteName ? title : `${title} — ${Tuwa}`;
const siteOrigin = Astro.site?.origin ?? "https://tuwa.app";
const resolvedOgImage = ogImage.startsWith("http") ? ogImage : `${siteOrigin}${ogImage}`;
```

**Add hreflang pattern** — derive alternate URLs from `Astro.url.pathname` and the known locales:
```typescript
// Add these lines after existing const declarations:
const locales = ['en', 'zh', 'fr'] as const;
const currentPath = Astro.url.pathname;

// Strip any locale prefix to get the canonical path segment
// EN pages are unprefixed (prefixDefaultLocale: false), so /zh/... and /fr/... need stripping
const pathWithoutLocale = currentPath.replace(/^\/(zh|fr)\//, '/').replace(/^\/(zh|fr)$/, '/');

// Build alternate hrefs only for locales that have this page.
// hreflangAlternates prop allows callers to override — if not provided,
// assume all 3 locales exist (caller can pass [] to suppress).
const hreflangAlternates = Astro.props.hreflangAlternates ?? locales.map((loc) => ({
  hreflang: loc === 'en' ? 'en' : loc,
  href: loc === 'en'
    ? `${siteOrigin}${pathWithoutLocale}`
    : `${siteOrigin}/${loc}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
}));
```

**hreflang link tags to emit** — add after `<link rel="canonical">`:
```html
{hreflangAlternates.map(({ hreflang, href }) => (
  <link rel="alternate" hreflang={hreflang} href={href} />
))}
<link rel="alternate" hreflang="x-default" href={`${siteOrigin}${pathWithoutLocale}`} />
```

**og:locale tag to add** (after og:type):
```html
<meta property="og:locale" content={locale === 'zh' ? 'zh_CN' : locale === 'fr' ? 'fr_FR' : 'en_US'} />
```

**Updated Props interface additions:**
```typescript
interface Props {
  // ... existing props ...
  locale?: string;
  hreflangAlternates?: Array<{ hreflang: string; href: string }>;
}
```

**Note on blog posts:** Blog posts only exist in EN. Pass `hreflangAlternates={[]}` from BlogPostLayout to suppress zh/fr alternate links. The blog index pages exist in all 3 locales and can use the default auto-generation.

---

### `astro.config.mjs` (config, transform)

**Analog:** `astro.config.mjs` (self — modify in place)

**Current sitemap config** (line 20):
```javascript
integrations: [mdx(), sitemap()],
```

**Updated sitemap with i18n** — replace with:
```javascript
integrations: [
  mdx(),
  sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        en: 'en',
        zh: 'zh-CN',
        fr: 'fr',
      },
    },
  }),
],
```

**Note:** The `locales` map keys must match the path prefixes used in `src/pages/zh/` and `src/pages/fr/`. The value is the full BCP-47 language tag emitted in the sitemap `<xhtml:link hreflang>` annotations. `en` maps to `en` (not `en-US`) for broadest matching.

---

### `src/pages/404.astro` (page, request-response)

**Analog:** `src/pages/support.astro`

**EN 404 page pattern** — minimal, uses BaseLayout directly (no LegalPageLayout — 404 isn't legal content):
```astro
---
import { use404Translations } from '../i18n/utils';
import BaseLayout from '../layouts/BaseLayout.astro';

const t = use404Translations('en');
---
<BaseLayout title={t.meta.title} description={t.meta.description} locale="en">
  <!-- centered content block -->
  <div style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl); text-align: center;">
    <div class="mx-auto px-6" style="max-width: 480px;">
      <p style="font-size: var(--text-display); font-weight: var(--weight-heading); color: var(--color-accent);">
        404
      </p>
      <h1 style="font-size: var(--text-heading); font-weight: var(--weight-heading); ...">
        {t.heading}
      </h1>
      <p style="color: var(--color-text-2); margin-top: var(--space-md);">
        {t.body}
      </p>
      <a href="/" style="display: inline-flex; align-items: center; ... min-height: 44px;">
        {t.cta}
      </a>
    </div>
  </div>
</BaseLayout>
```

**Style values to use** (copy from `src/pages/zh/support.astro` lines 19-34):
- Container: `padding-top: var(--space-3xl); padding-bottom: var(--space-3xl)`
- CTA button: `background-color: var(--color-accent); color: var(--color-accent-fg); border-radius: var(--radius-md); padding: var(--space-sm) var(--space-md); font-weight: var(--weight-label); min-height: 44px`
- Body text: `color: var(--color-text-2); line-height: var(--leading-body)`

---

### `src/pages/zh/404.astro` (page, request-response)

**Analog:** `src/pages/zh/support.astro` (exact role-match — CJK locale wrapper)

**Imports pattern** (from `src/pages/zh/support.astro` lines 1-8):
```astro
---
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/700.css';
import { use404Translations } from '../../i18n/utils';
import BaseLayout from '../../layouts/BaseLayout.astro';
---
```

**Font override pattern** (from `src/pages/zh/support.astro` lines 10-12):
```astro
<style is:global>
  :root { --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif; }
</style>
```

**Layout usage** — use BaseLayout with `locale="zh"`, NOT LegalPageLayout (same reason as EN 404):
```astro
<BaseLayout title={t.meta.title} description={t.meta.description} locale="zh">
  <!-- same structure as EN 404 but with t = use404Translations('zh') -->
</BaseLayout>
```

---

### `src/pages/fr/404.astro` (page, request-response)

**Analog:** `src/pages/fr/support.astro` (exact role-match — FR locale wrapper)

**Imports pattern** (from `src/pages/fr/support.astro` lines 1-6):
```astro
---
import { use404Translations } from '../../i18n/utils';
import BaseLayout from '../../layouts/BaseLayout.astro';
---
```

**Note:** FR pages do NOT import Noto Sans SC — no CJK font override needed. Same structure as EN 404 but with `locale="fr"` and `use404Translations('fr')`.

---

### `src/i18n/locales/en/404.ts` (utility, transform)

**Analog:** `src/i18n/locales/en/blog.ts` (exact — small namespace, same file shape)

**File shape** (from `src/i18n/locales/en/blog.ts` lines 1-19):
```typescript
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const notFound = {
  meta: {
    title: 'Page Not Found',
    description: 'The page you were looking for doesn\'t exist.',
  },
  heading: 'Page not found',
  body: 'The page you\'re looking for doesn\'t exist or has been moved.',
  cta: 'Go back home',
} as const;

export default notFound;
export type NotFound = WidenStrings<typeof notFound>;
```

---

### `src/i18n/locales/zh/404.ts` (utility, transform)

**Analog:** `src/i18n/locales/zh/blog.ts` (exact — imports EN type and satisfies it)

**File shape** (from `src/i18n/locales/zh/blog.ts` lines 1-14):
```typescript
import type { NotFound } from '../en/404';

const notFound: NotFound = {
  meta: {
    title: '页面未找到',
    description: '您访问的页面不存在。',
  },
  heading: '页面未找到',
  body: '您访问的页面不存在或已被移动。',
  cta: '返回首页',
};

export default notFound;
```

---

### `src/i18n/locales/fr/404.ts` (utility, transform)

**Analog:** `src/i18n/locales/fr/blog.ts` (exact — same typed pattern as zh)

**File shape** (from `src/i18n/locales/fr/blog.ts` lines 1-13):
```typescript
import type { NotFound } from '../en/404';

const notFound: NotFound = {
  meta: {
    title: 'Page introuvable',
    description: 'La page que vous cherchez n\'existe pas.',
  },
  heading: 'Page introuvable',
  body: 'La page que vous cherchez n\'existe pas ou a été déplacée.',
  cta: 'Retour à l\'accueil',
};

export default notFound;
```

---

### `src/i18n/utils.ts` (utility, transform)

**Analog:** `src/i18n/utils.ts` (self — add new function following existing pattern)

**Existing import block pattern** (lines 1-33 — add 3 new imports after line 27):
```typescript
import enBlog from './locales/en/blog';      // line 25
import zhBlog from './locales/zh/blog';      // line 26
import frBlog from './locales/fr/blog';      // line 27
// ADD:
import en404 from './locales/en/404';
import zh404 from './locales/zh/404';
import fr404 from './locales/fr/404';
```

**Type import to add** (after line 44):
```typescript
import type { Blog } from './locales/en/blog';    // line 44 (existing)
// ADD:
import type { NotFound } from './locales/en/404';
```

**New translations record** (copy pattern from lines 110-114):
```typescript
const notFoundTranslations: Record<Locale, NotFound> = {
  en: en404,
  zh: zh404,
  fr: fr404,
};
```

**New exported function** (copy pattern from lines 156-158):
```typescript
export function use404Translations(locale: Locale | undefined): NotFound {
  return notFoundTranslations[locale ?? 'en'] ?? notFoundTranslations['en'];
}
```

---

## Shared Patterns

### CJK Font Override (zh pages only)
**Source:** `src/pages/zh/support.astro` lines 1-2 and 10-12
**Apply to:** `src/pages/zh/404.astro` only (not EN or FR)
```astro
import '@fontsource/noto-sans-sc/400.css';
import '@fontsource/noto-sans-sc/700.css';
```
```astro
<style is:global>
  :root { --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif; }
</style>
```

### Locale Wrapper Pattern
**Source:** `src/pages/fr/support.astro` (FR), `src/pages/zh/support.astro` (ZH)
**Apply to:** Both locale 404 pages
- Pass `locale="zh"` / `locale="fr"` to the layout
- Import translation function with the correct locale literal
- No `disclaimerText` prop needed for 404 pages (LegalPageLayout-specific)

### WidenStrings Type Utility
**Source:** `src/i18n/locales/en/blog.ts` lines 1-5 (and every EN locale file)
**Apply to:** `src/i18n/locales/en/404.ts` only (ZH/FR files import the EN type instead)
```typescript
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };
```

### CSS Design Token Variables
**Source:** `src/pages/zh/support.astro` lines 19-34
**Apply to:** All 3 new 404 pages
Use `var(--space-*)`, `var(--color-*)`, `var(--text-*)`, `var(--weight-*)`, `var(--radius-*)` tokens for all inline styles — never hardcoded values.

---

## No Analog Found

All files have close analogs. No RESEARCH.md fallback needed.

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| — | — | — | — |

---

## Implementation Notes for Planner

### hreflang scope caveat
Blog post pages (`src/pages/blog/[...slug].astro`) only exist in EN. The `BlogPostLayout.astro` should pass `hreflangAlternates={[]}` to SEO.astro to suppress spurious zh/fr alternates. Blog index pages at `/blog`, `/zh/blog`, `/fr/blog` all exist, so they use the default auto-generation.

### Astro 404 routing caveat
Astro's static 404 handling: `src/pages/404.astro` becomes `dist/404.html` and Cloudflare Pages serves it for unknown routes. Locale-specific 404s (`src/pages/zh/404.astro` → `dist/zh/404.html`) are served by Cloudflare Pages when the request path starts with `/zh/`. No `_routes.json` manipulation needed for static output.

### SEO.astro locale prop threading
`BaseLayout.astro` already has a `locale` prop (line 13) and passes it to `<html lang={locale}>`. It does NOT currently forward `locale` to `<SEO>`. When SEO.astro gains a `locale` prop for `og:locale`, either:
1. Update `BaseLayout.astro` line 29 to pass `locale` to `<SEO>`, or
2. Derive locale inside SEO.astro from `Astro.url.pathname` (self-contained, no prop threading change needed)

Option 2 is self-contained and requires no changes to BaseLayout.

---

## Metadata

**Analog search scope:** `src/components/`, `src/pages/`, `src/pages/zh/`, `src/pages/fr/`, `src/i18n/`, `src/layouts/`, root config
**Files scanned:** 18
**Pattern extraction date:** 2026-05-25
