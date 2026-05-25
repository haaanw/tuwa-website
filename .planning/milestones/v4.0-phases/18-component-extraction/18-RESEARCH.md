# Phase 18: Component Extraction - Research

**Researched:** 2026-05-25
**Domain:** Astro i18n — language switcher, locale-aware navigation, translation key expansion
**Confidence:** HIGH

---

## Summary

Phase 18 adds a language switcher to the header/mobile menu and converts all bare navigation paths to locale-aware URLs. The i18n infrastructure (Astro routing config, `useTranslations()` utility, locale files, `getRelativeLocaleUrl()` in components) was established in Phase 17 and is already in place. This phase is primarily additive — new UI widget + new translation keys + mechanical path conversion.

The language switcher mirrors the existing Features dropdown pattern exactly. The only technically novel element is path-preservation during locale switching: deriving a locale-agnostic path from `Astro.url.pathname` and passing it through `getRelativeLocaleUrl(targetLocale, path)`. This requires stripping the current locale prefix before re-applying the new one to avoid double-prefix corruption.

All three locale dictionaries (`en/common.ts`, `zh/common.ts`, `fr/common.ts`) need new keys in `nav` and `footer` namespaces. The TypeScript type constraint (`const common: Common = { ... }`) will catch missing keys at build time — the planner should treat a clean `tsc --noEmit` as the correctness gate.

**Primary recommendation:** Implement in two logical waves — (1) expand translation keys in all three locale files and convert bare paths, then (2) build the language switcher widget. This ordering means the switcher can immediately use the complete `t()` dictionary without back-patching.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Language switcher in header as a dropdown. Trigger: globe icon (inline SVG) + current locale code + chevron. Dropdown lists: English, 中文, Français. No flags.
- **D-02:** Mobile: switcher appears between logo and hamburger. Same dropdown behavior.
- **D-03:** Switching language preserves current page path (e.g., /zh/features/coaching → /fr/features/coaching).
- **D-04:** All nav labels translated this phase — Header links (Features, Method, Coaches, Blog, Support), footer section headers, footer link text, mobile menu links, and feature dropdown titles + descriptions all get translation keys in common.ts.
- **D-05:** CTA "Get the App" translated per locale. Feature dropdown descriptions also translated.
- **D-06:** Convert ALL bare paths to `getRelativeLocaleUrl(locale, path)` now, even for pages without locale variants yet. Accepted tradeoff: clicking /zh/methodology will 404 until Phase 19. Correct routing from day one.
- **D-07:** Affected bare paths — Header: `/methodology`, `/for-coaches`. Footer: `/methodology`, `/readiness-score`, `/training-load`, `/for-coaches`, `/compare`. MobileMenu: `/methodology`, `/for-coaches`.

### Claude's Discretion

- Language switcher dropdown animation and close-on-outside-click behavior (follow existing Features dropdown pattern)
- Globe icon implementation (SVG inline — per D-01 SVG over emoji)
- Translation key naming conventions for nav items (follow existing common.ts structure)

### Deferred Ideas (OUT OF SCOPE)

- None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| I18N-04 | Language switcher component in header allows switching between en/zh/fr on any page | Verified: Astro `getRelativeLocaleUrl()` + `Astro.url.pathname` path-stripping pattern enables locale-preserving switcher. Existing Features dropdown JS pattern (is-open class, outside-click, Escape) is directly reusable. |
| I18N-05 | All navigation links (header, footer, mobile menu) render locale-aware paths | Verified: `getRelativeLocaleUrl(locale, path)` already imported in all three nav components. Only the 7 bare paths listed in D-07 remain unconverted. Translation keys for all nav text are missing and must be added to common.ts × 3. |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Language switcher UI | Frontend (Astro component) | — | Static HTML + inline JS `<script is:inline>` — no server or CDN layer needed |
| Locale-aware URL generation | Frontend (Astro build-time) | — | `getRelativeLocaleUrl()` resolves at build time in `.astro` frontmatter |
| Path preservation on locale switch | Frontend (Astro frontmatter) | — | `Astro.url.pathname` stripped of prefix, then passed to `getRelativeLocaleUrl()` |
| Translation strings | Frontend (TypeScript module) | — | `useTranslations(locale)` returns compile-time typed dictionary from `src/i18n/` |
| Dropdown open/close behavior | Browser (inline JS) | — | Mirrors existing Features dropdown `<script is:inline>` — no framework, no island |

---

## Standard Stack

### Core (Phase 17 — already installed, no new installs)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `astro:i18n` | Built into Astro 6 | `getRelativeLocaleUrl()`, `getAbsoluteLocaleUrl()` | First-party Astro i18n module — already active (astro.config.mjs has `i18n` block) |
| `src/i18n/utils.ts` | Project utility | `useTranslations(locale)` → typed dictionary | Already written in Phase 17 |

**No new npm installs required for Phase 18.**

### Translation Key Additions (all three locale files)

New keys required in `nav` namespace:

```typescript
nav: {
  // existing
  features: '...',
  support: '...',
  blog: '...',
  getApp: '...',
  // NEW in Phase 18
  method: 'Method',         // zh: '方法论', fr: 'Méthode'
  coaches: 'Coaches',       // zh: '教练', fr: 'Coachs'
  languageSwitcher: {
    label: 'Language',      // aria-label for switcher button
    en: 'English',
    zh: '中文',
    fr: 'Français',
    current: 'EN',          // locale-specific: 'EN' / '中文' / 'FR'
  },
  featuresDropdown: {
    recoveryScoringTitle: 'Recovery Scoring',
    recoveryScoringDesc: 'Daily readiness from HRV, sleep, and training load',
    workloadTrackingTitle: 'Workload Tracking',
    workloadTrackingDesc: 'Multi-factor fatigue and load spike detection',
    smartTemplatesTitle: 'Smart Templates',
    smartTemplatesDesc: 'Prescribed workouts with target sets and reps',
    coldStartTitle: 'Cold Start Solution',
    coldStartDesc: 'Useful on day one, no baseline wait',
    coachingTitle: 'Coaching',
    coachingDesc: 'Team recovery visibility and prescribed workouts',
  },
},
footer: {
  // existing
  features: '...', resources: '...', legal: '...', privacy: '...', terms: '...', copyright: '...',
  // NEW in Phase 18
  methodology: 'Methodology',
  readinessScore: 'Readiness Score',
  trainingLoad: 'Training Load',
  forCoaches: 'For Coaches',
  compare: 'Compare',
}
```

**CRITICAL:** All three locale files must be updated simultaneously. TypeScript will catch missing keys via `const common: Common = { ... }` — `tsc --noEmit` must pass before any task is considered done.

---

## Architecture Patterns

### System Architecture Diagram

```
Astro.url.pathname ──strip locale prefix──► bare path (e.g. /features/coaching)
                                                        │
locale prop (from page) ──────────────────────────────►│
                                                        ▼
                                          getRelativeLocaleUrl(targetLocale, barePath)
                                                        │
                                                        ▼
                                          href="/zh/features/coaching"  ── <a> in dropdown
```

```
Header.astro (receives locale prop from BaseLayout)
   ├── Desktop nav ────────── useTranslations(locale).nav.* for all label text
   │     ├── Features dropdown (existing, now with translated titles/descs)
   │     ├── Method, Coaches, Blog, Support ────── getRelativeLocaleUrl(locale, path)
   │     └── LanguageSwitcher widget (new)
   │           ├── Trigger: globe SVG + locale code + chevron
   │           └── Dropdown: [English → /], [中文 → /zh/...], [Français → /fr/...]
   ├── CTA button: useTranslations(locale).nav.getApp
   └── Mobile: hamburger + LanguageSwitcher trigger (between logo & hamburger)

MobileMenu.astro (receives locale prop)
   ├── Nav links ─────────── getRelativeLocaleUrl(locale, path) for bare paths
   └── CTA button: useTranslations(locale).nav.getApp

Footer.astro (receives locale prop)
   ├── Section headers ───── useTranslations(locale).footer.*
   └── Resources column ──── getRelativeLocaleUrl(locale, path) for bare paths
```

### Recommended Project Structure (no new files)

```
src/
├── components/
│   ├── Header.astro          # Modified: add switcher + translate nav + fix bare paths
│   ├── Footer.astro          # Modified: fix bare paths + translate labels
│   └── MobileMenu.astro      # Modified: add switcher entry + fix bare paths
└── i18n/
    └── locales/
        ├── en/common.ts      # Modified: add nav.method, coaches, languageSwitcher, featuresDropdown, footer.*
        ├── zh/common.ts      # Modified: same keys in Chinese
        └── fr/common.ts      # Modified: same keys in French
```

No new component files. The language switcher is implemented inline in Header.astro following the Features dropdown model.

### Pattern 1: Path-Preserving Locale Switch

**What:** Compute locale-agnostic path from `Astro.url.pathname`, then generate per-locale hrefs.

**When to use:** Any language switcher that must keep the user on the same page.

**Critical detail:** `Astro.currentLocale` returns `'en'` (or the `defaultLocale`) even when the URL has no prefix (because `prefixDefaultLocale: false`). The stripping regex must handle both cases.

```typescript
// Source: [CITED: docs.astro.build/en/reference/modules/astro-i18n + community pattern]
// In Header.astro frontmatter:
const currentLocale = Astro.currentLocale ?? 'en';

// Strip locale prefix — handles /zh/path → /path AND /path → /path (en, no prefix)
const rawPath = Astro.url.pathname;
const pathWithoutLocale = rawPath.replace(/^\/[a-z]{2}(\/|$)/, '/').replace(/^\/\//, '/');
// Examples:
//   /zh/features/coaching → /features/coaching
//   /fr/blog             → /blog
//   /features/coaching   → /features/coaching  (no-op for en)

// Generate links
const localeSwitcherLinks = [
  { locale: 'en', label: 'English',  href: getRelativeLocaleUrl('en', pathWithoutLocale) },
  { locale: 'zh', label: '中文',     href: getRelativeLocaleUrl('zh', pathWithoutLocale) },
  { locale: 'fr', label: 'Français', href: getRelativeLocaleUrl('fr', pathWithoutLocale) },
];
```

**Why regex over string replace:** `Astro.url.pathname.replace(`/${currentLocale}/`, '/')` fails for English (currentLocale is 'en' but path has no `/en/` prefix). The regex `/^\/[a-z]{2}(\/|$)/` matches any 2-letter code prefix or handles paths with no prefix cleanly.

### Pattern 2: Reuse Features Dropdown JS (is:inline)

**What:** The Features dropdown JS block is fully reusable. Copy and change element IDs.

**When to use:** Language switcher dropdown — same open/close/hover/outside-click/Escape behavior.

```javascript
// Source: [VERIFIED: src/components/Header.astro existing script block]
// Features dropdown pattern — apply verbatim, change getElementById to 'lang-dropdown'
(function() {
  var dropdown = document.getElementById('lang-dropdown');  // was 'features-dropdown'
  if (!dropdown) return;
  var btn = dropdown.querySelector('button');
  var menu = dropdown.querySelector('.nav-dropdown');
  var chevron = btn.querySelector('.nav-chevron');

  function open() { menu.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); chevron.style.transform = 'rotate(180deg)'; }
  function close() { menu.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); chevron.style.transform = ''; }

  btn.addEventListener('click', function(e) { e.stopPropagation(); menu.classList.contains('is-open') ? close() : open(); });
  var closeTimer = null;
  dropdown.addEventListener('mouseenter', function() { clearTimeout(closeTimer); open(); });
  dropdown.addEventListener('mouseleave', function() { closeTimer = setTimeout(close, 200); });
  document.addEventListener('click', function(e) { if (!dropdown.contains(e.target)) close(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && menu.classList.contains('is-open')) { close(); btn.focus(); } });
})();
```

**Note:** The mobile language switcher in the header also uses this pattern. The MobileMenu itself (full-screen overlay) does NOT get the switcher inline — the switcher lives in `Header.astro` between logo and hamburger, visible at all breakpoints.

### Pattern 3: CSS for Language Switcher Dropdown

**What:** Language switcher uses existing `.nav-dropdown` class — **no new CSS needed**. The dropdown panel is identical to Features dropdown except narrower (160px vs 300px).

```astro
<!-- Width override via inline style only — no new class -->
<div class="nav-dropdown" role="listbox" style="width: 160px;">
  ...
</div>
```

**Active locale indicator:**
```astro
<!-- Active locale item: accent color + checkmark SVG -->
<a
  href={link.href}
  class="nav-dropdown-item"
  aria-current={link.locale === currentLocale ? 'true' : undefined}
  style={link.locale === currentLocale ? 'color: var(--color-accent);' : ''}
>
  {link.label}
  {link.locale === currentLocale && (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="margin-left: auto;">
      <polyline points="2,7 5.5,10.5 12,3.5"/>
    </svg>
  )}
</a>
```

### Pattern 4: Globe Icon Inline SVG

**What:** Inline SVG globe icon, `aria-hidden="true"`, color via `currentColor`.

```svg
<!-- Source: 18-UI-SPEC.md Globe Icon Specification -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none"
     stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
     aria-hidden="true">
  <circle cx="8" cy="8" r="6.5"/>
  <path d="M8 1.5C8 1.5 5.5 4 5.5 8s2.5 6.5 2.5 6.5"/>
  <path d="M8 1.5C8 1.5 10.5 4 10.5 8s-2.5 6.5-2.5 6.5"/>
  <path d="M1.5 8h13"/>
</svg>
```

Color behavior: rest = `var(--color-text-2)` (via CSS on parent), open/hover = `var(--color-accent)` (matches `.nav-link:hover` cascade).

### Pattern 5: Mobile Switcher Position

**What:** In the header flex row (`justify-between`), add the switcher between the logo anchor and the hamburger button, visible only on mobile (`md:hidden`).

```astro
<!-- In Header.astro, inside the <nav> flex row -->
<a href="..." class="nav-logo">Tuwa</a>

<!-- Mobile lang switcher — hidden on desktop (where desktop nav has its own) -->
<div class="relative md:hidden" id="lang-dropdown-mobile">
  <button class="nav-link flex items-center gap-1" ...>
    [globe] [locale code] [chevron]
  </button>
  <div class="nav-dropdown" style="width: 160px;">
    ...
  </div>
</div>

<button id="menu-toggle" class="md:hidden">...</button>
```

The desktop nav switcher is inside the `<ul class="hidden md:flex">` list.

### Anti-Patterns to Avoid

- **Double-prefixing:** Passing `Astro.url.pathname` directly to `getRelativeLocaleUrl()` without stripping the existing locale prefix. Results in `/zh/zh/features/coaching`. Always strip first.
- **`Astro.currentLocale` for English path stripping:** When `prefixDefaultLocale: false`, the English path has no `/en/` prefix, so `path.replace('/en/', '/')` is a no-op (correct) but `currentLocale` is still 'en'. Use the regex `/^\/[a-z]{2}(\/|$)/` instead of `/${currentLocale}/`.
- **Wrapping App Store URL in `getRelativeLocaleUrl()`:** The CTA href `https://apps.apple.com/app/tuwa` is external — do not apply locale routing to it. [VERIFIED: src/components/Header.astro existing code]
- **Hardcoded nav text strings after this phase:** After Phase 18, all nav text must come from `t()` calls. No new hardcoded English strings in nav components.
- **Missing TypeScript type annotation on new locale keys:** Adding keys to `en/common.ts` without adding them to `zh/common.ts` and `fr/common.ts` will cause TypeScript errors at build time. Add all three simultaneously.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Locale-aware URL generation | Custom path manipulation | `getRelativeLocaleUrl(locale, path)` from `astro:i18n` | Handles `prefixDefaultLocale: false` edge cases, trailing slash config, and site base URL correctly |
| Dropdown open/close | New JS state machine | Copy Features dropdown `<script is:inline>` block | Already tested, already has outside-click, Escape, hover delay, focus management |
| Dropdown CSS | New component class | `.nav-dropdown` + `.nav-dropdown-item` (existing in global.css) | Zero new CSS required — width override via inline style only |

**Key insight:** This phase is almost entirely assembly of existing primitives. The path-stripping utility is the only truly new logic, and it's ~3 lines.

---

## Runtime State Inventory

> Greenfield phase (no rename/refactor involved) — this section does not apply.

---

## Common Pitfalls

### Pitfall 1: Double Locale Prefix in Switcher Links

**What goes wrong:** `/zh/features/coaching` becomes `/fr/zh/features/coaching` when switching from zh to fr.

**Why it happens:** `getRelativeLocaleUrl('fr', '/zh/features/coaching')` does NOT strip the zh prefix — it prepends `/fr/` to whatever path you pass.

**How to avoid:** Always strip the locale prefix from `Astro.url.pathname` before passing to `getRelativeLocaleUrl`. Use: `rawPath.replace(/^\/[a-z]{2}(\/|$)/, '/')`.

**Warning signs:** Switcher links contain two locale codes (e.g., `/fr/zh/`, `/zh/en/`).

### Pitfall 2: `Astro.currentLocale` Returns Default Locale on English Pages

**What goes wrong:** On `/features/coaching` (English, no prefix), `Astro.currentLocale` correctly returns `'en'`. However `path.replace('/en/', '/')` finds nothing to replace (path has no `/en/`), leaving the path unchanged — this is the correct behavior. The pitfall is if code assumes currentLocale's prefix is in the URL.

**Why it happens:** `prefixDefaultLocale: false` means English URLs have no locale segment. `Astro.currentLocale` still returns `'en'` but the URL has no `/en/` to strip.

**How to avoid:** The regex pattern `/^\/[a-z]{2}(\/|$)/` handles this correctly — it only strips if there is a 2-letter prefix at the start of the path.

**Warning signs:** English pages show correct switcher links; non-English pages generate malformed URLs with missing or doubled prefixes.

### Pitfall 3: TypeScript Build Failure from Partial Translation Key Addition

**What goes wrong:** Adding `nav.method` to `en/common.ts` but forgetting `zh/common.ts` causes `tsc --noEmit` to fail: "Property 'method' is missing in type".

**Why it happens:** Locale files declare `const common: Common = { ... }` with explicit type annotation — TypeScript enforces structural completeness.

**How to avoid:** Update all three locale files in the same task or verify with `tsc --noEmit` before committing.

**Warning signs:** TypeScript error citing `zh/common.ts` or `fr/common.ts` with "missing property".

### Pitfall 4: Nav Link Hover State Broken After Using `<button>` for Switcher Trigger

**What goes wrong:** The switcher trigger button inherits `font: inherit` from `.nav-link` but may look slightly different from `<a>` nav links (no underline, correct) or may not apply hover color.

**Why it happens:** `.nav-link` applies `font: inherit; background: none; border: none; cursor: pointer;` — the button reset is already in the class. Color on hover is inherited via CSS cascade.

**How to avoid:** Apply `.nav-link` class to the switcher trigger button (same as the Features dropdown button). [VERIFIED: Header.astro line 37]

### Pitfall 5: Mobile Switcher Breaks Header Layout

**What goes wrong:** Adding the language switcher between logo and hamburger disrupts the `justify-between` flex layout — the switcher takes up unexpected space or misaligns.

**Why it happens:** The header is a flex row with `justify-between`. Inserting a third element changes the distribution.

**How to avoid:** Wrap the mobile switcher in a `<div class="flex items-center gap-2 md:hidden">` that groups it with... actually it must be standalone between logo and hamburger. Use `flex-1` on the middle spacer or explicitly lay out as `logo | spacer (flex-1) | lang-switcher | hamburger`. Alternatively keep the existing 2-element `justify-between` and position the mobile switcher absolutely — but the UI-SPEC calls for it to be between logo and hamburger in the flow.

**Recommended layout:** Three-element flex row — logo (flex-none), spacer (flex-1), lang-switcher (flex-none, md:hidden), hamburger (flex-none, md:hidden). On desktop: hamburger is already hidden, so the spacer + lang-switcher collapse, and the desktop nav list fills the middle with `justify-between` between logo and CTA.

---

## Code Examples

### Complete path-stripping utility (Astro frontmatter)

```typescript
// Source: [CITED: docs.astro.build/en/reference/modules/astro-i18n + community pattern]
// Place in Header.astro frontmatter

import { getRelativeLocaleUrl } from 'astro:i18n';
import { useTranslations } from '../i18n/utils';

const { locale = 'en' } = Astro.props;
const t = useTranslations(locale as 'en' | 'zh' | 'fr');

// Strip locale prefix to get bare path for language switching
const rawPath = Astro.url.pathname;
const pathWithoutLocale = rawPath.replace(/^\/[a-z]{2}(\/|$)/, '/');

const LOCALES = [
  { code: 'en', label: t.nav.languageSwitcher.en },
  { code: 'zh', label: t.nav.languageSwitcher.zh },
  { code: 'fr', label: t.nav.languageSwitcher.fr },
] as const;
```

### Bare path conversion (before / after)

```astro
<!-- BEFORE (bare path — wrong) -->
<a href="/methodology" class="nav-link">Method</a>
<a href="/for-coaches" class="nav-link">Coaches</a>

<!-- AFTER (locale-aware — correct) -->
<a href={getRelativeLocaleUrl(locale, '/methodology')} class="nav-link">{t.nav.method}</a>
<a href={getRelativeLocaleUrl(locale, '/for-coaches')} class="nav-link">{t.nav.coaches}</a>
```

### Language switcher trigger anatomy

```astro
<!-- Desktop: inside <ul class="hidden md:flex"> list -->
<li class="relative" id="lang-dropdown">
  <button
    type="button"
    class="nav-link flex items-center gap-1"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-label={t.nav.languageSwitcher.label}
  >
    <!-- Globe SVG (16×16, aria-hidden) -->
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
         stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
         aria-hidden="true">
      <circle cx="8" cy="8" r="6.5"/>
      <path d="M8 1.5C8 1.5 5.5 4 5.5 8s2.5 6.5 2.5 6.5"/>
      <path d="M8 1.5C8 1.5 10.5 4 10.5 8s-2.5 6.5-2.5 6.5"/>
      <path d="M1.5 8h13"/>
    </svg>
    <span style="font-size: var(--text-label); font-weight: var(--weight-label); letter-spacing: var(--tracking-label);">
      {t.nav.languageSwitcher.current}
    </span>
    <!-- Reuse existing chevron SVG -->
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="nav-chevron" style="margin-top: 1px;">
      <polyline points="2,4 6,8 10,4" />
    </svg>
  </button>

  <div class="nav-dropdown" role="listbox" aria-label={t.nav.languageSwitcher.label} style="width: 160px;">
    {LOCALES.map(({ code, label }) => (
      <a
        href={getRelativeLocaleUrl(code, pathWithoutLocale)}
        class="nav-dropdown-item"
        role="option"
        aria-selected={code === locale}
        style={code === locale ? 'color: var(--color-accent);' : ''}
      >
        {label}
        {code === locale && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="margin-left: auto; flex-shrink: 0;">
            <polyline points="2,7 5.5,10.5 12,3.5"/>
          </svg>
        )}
      </a>
    ))}
  </div>
</li>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin | Tailwind v4 | Already done in project setup |
| Hardcoded locale in HTML lang attr | `locale` prop on BaseLayout | Phase 17 | Already done |
| All hrefs as bare strings | `getRelativeLocaleUrl(locale, path)` | Phase 17 (partial), Phase 18 (complete) | Phase 18 completes the conversion |
| No i18n in common.ts | Full nav + footer translation keys | Phase 18 | This phase adds missing keys |

**No deprecated approaches are being introduced in this phase.** All patterns are consistent with Astro 6 i18n documentation.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `Astro.currentLocale` returns `'en'` (not `undefined`) for English pages when `prefixDefaultLocale: false` | Common Pitfalls §2, Code Examples | If it returns `undefined`, the `locale ?? 'en'` fallback in `useTranslations()` still works, but path-stripping logic may need a null-check: `if (currentLocale && currentLocale !== 'en') rawPath.replace(...)` — safe either way due to regex matching |
| A2 | The regex `/^\/[a-z]{2}(\/|$)/` correctly strips zh/fr prefixes without matching English paths | Pattern 1 | Could theoretically match 2-char English paths like `/zh` (valid) — but all locale paths are exactly 2 chars. English paths never start with 2 lowercase letters followed by `/` or end-of-string in this project |
| A3 | `.nav-dropdown` CSS class in global.css applies to the language switcher dropdown without modification | Pattern 3, Don't Hand-Roll | If the class has Features-dropdown-specific assumptions, new CSS may be needed — verify visually |

**3 assumptions — low risk. A1 and A2 are self-correcting; A3 is immediately visible on first render.**

---

## Open Questions

1. **Mobile: does the header flex layout need adjustment for the third element?**
   - What we know: Current mobile header is `justify-between` with 2 elements (logo, hamburger)
   - What's unclear: Whether inserting the lang switcher as a third element requires explicit `flex-1` spacer or a changed layout strategy
   - Recommendation: Use explicit three-column layout: `logo (flex-none) | flex-1 spacer | lang-switcher (md:hidden) | hamburger (md:hidden)`. Verify visually on first render.

2. **Does `getRelativeLocaleUrl('en', '/features/coaching')` return `/features/coaching` (no prefix) or `/en/features/coaching`?**
   - What we know: `prefixDefaultLocale: false` should produce `/features/coaching`
   - What's unclear: Confirmed by docs reference but not locally verified in this session
   - Recommendation: Test with `console.log(getRelativeLocaleUrl('en', '/features/coaching'))` in dev server on first run. If it produces `/en/features/coaching`, the astro.config routing block is misconfigured.

---

## Environment Availability

Step 2.6: SKIPPED (no external dependencies — all code/config changes to existing Astro project)

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected (no jest.config, no vitest.config, no pytest.ini) |
| Config file | none |
| Quick run command | `npm run build` (Astro build — catches TypeScript errors and broken imports) |
| Full suite command | `npm run build && npx tsc --noEmit` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| I18N-04 | Language switcher appears in header on every page | smoke | `npm run build` (build must succeed) | ❌ visual check |
| I18N-04 | Switching locale preserves current path | smoke | Manual browser test | ❌ manual-only |
| I18N-04 | Dropdown open/close works (click, Escape, outside) | smoke | Manual browser test | ❌ manual-only |
| I18N-05 | All nav hrefs include locale prefix for zh/fr pages | type-check | `npx tsc --noEmit` | ❌ Wave 0 |
| I18N-05 | Footer bare paths converted to getRelativeLocaleUrl | build | `npm run build` | ✅ (build catches wrong function signatures) |
| I18N-05 | Mobile menu bare paths converted | build | `npm run build` | ✅ |

**Rationale for manual-only on I18N-04 switcher behavior:** The open/close/path-preservation behavior is DOM interaction — not testable without a browser driver. The build gate (TypeScript + Astro build) catches structural errors; manual smoke test catches UX.

### Sampling Rate

- **Per task commit:** `npm run build` (catches TypeScript errors instantly)
- **Per wave merge:** `npm run build && npx tsc --noEmit`
- **Phase gate:** Build green + manual browser smoke test of language switching on 3 pages (home, /zh/, /fr/)

### Wave 0 Gaps

- [ ] No automated test infrastructure to add — this phase has no unit-testable pure functions beyond the regex (which is exercised implicitly by the build)

*(Existing test infrastructure: none. Build + manual verification is the established project pattern.)*

---

## Security Domain

No new authentication, sessions, user data, or external API calls introduced in this phase. Language switching is pure URL navigation — no ASVS categories apply.

---

## Sources

### Primary (HIGH confidence)
- [VERIFIED: src/components/Header.astro] — Features dropdown pattern, existing bare paths at lines 95, 98
- [VERIFIED: src/components/Footer.astro] — Bare paths in Resources column at lines 56-60
- [VERIFIED: src/components/MobileMenu.astro] — Bare paths at lines 72, 77
- [VERIFIED: src/i18n/locales/en/common.ts] — Existing keys, missing nav.method etc.
- [VERIFIED: src/i18n/locales/zh/common.ts] — Current state, missing keys
- [VERIFIED: src/i18n/locales/fr/common.ts] — Current state, missing keys
- [VERIFIED: astro.config.mjs] — i18n block with `prefixDefaultLocale: false` confirmed active
- [VERIFIED: src/styles/global.css] — `.nav-dropdown`, `.nav-dropdown-item`, `.nav-link` CSS classes confirmed reusable
- [CITED: docs.astro.build/en/reference/modules/astro-i18n/] — `getRelativeLocaleUrl(locale, path)` signature
- [CITED: 18-CONTEXT.md] — All locked decisions D-01 through D-07
- [CITED: 18-UI-SPEC.md] — Globe SVG spec, dropdown anatomy, interaction states, typography

### Secondary (MEDIUM confidence)
- [CITED: docs.astro.build/en/guides/internationalization/] — Path-stripping pattern for language switcher (page returned content consistent with community pattern)
- [CITED: .planning/phases/17-i18n-infrastructure/17-PATTERNS.md] — Phase 17 patterns, shared conventions

### Tertiary (LOW confidence)
- [WebSearch: community pattern] — Regex `/^\/[a-z]{2}(\/|$)/` for locale prefix stripping — widely referenced but not in official Astro docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries from Phase 17, no new installs
- Architecture: HIGH — direct extension of Features dropdown pattern; verified in source code
- Path-stripping pattern: MEDIUM — documented in Astro guides and community; one assumption (A2) about regex correctness
- Translation keys: HIGH — exact keys specified in 18-UI-SPEC.md; TypeScript will enforce completeness

**Research date:** 2026-05-25
**Valid until:** 2026-08-25 (stable Astro i18n API; no fast-moving dependencies)
