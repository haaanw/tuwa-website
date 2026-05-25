# Phase 17: i18n Infrastructure - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-17
**Phase:** 17-i18n-infrastructure
**Areas discussed:** Translation file organization, CJK font loading strategy, Routing & page structure, French typography gaps

---

## Translation File Organization

### Shared string organization

| Option | Description | Selected |
|--------|-------------|----------|
| Single common.ts file | One shared dictionary per locale for nav, footer, CTAs. Page files import/override as needed. | ✓ |
| Grouped by component | Separate files per component area: nav.ts, footer.ts, cta.ts. More granular but more files. | |
| You decide | Claude picks best approach | |

**User's choice:** Single common.ts file
**Notes:** None

### Missing key fallback

| Option | Description | Selected |
|--------|-------------|----------|
| Fall back to English | Show English text rather than blank or error. Graceful degradation. | ✓ |
| Show key name as placeholder | Display raw key so missing translations are obvious during dev. | |
| You decide | Claude picks based on dev vs prod needs | |

**User's choice:** Fall back to English
**Notes:** None

### Key structure

| Option | Description | Selected |
|--------|-------------|----------|
| Nested objects | hero: { title: '...', subtitle: '...' } — groups related strings, IDE autocomplete | ✓ |
| Flat dot-notation keys | 'hero.title': '...' — simpler lookup, easier grep, less type safety | |

**User's choice:** Nested objects
**Notes:** None

---

## CJK Font Loading Strategy

### Font weights

| Option | Description | Selected |
|--------|-------------|----------|
| Regular 400 + Bold 700 | Matches General Sans pattern, keeps CJK payload minimal (~2-4MB with subsetting) | ✓ |
| Variable weight | Full variable font — flexible but CJK variable fonts are very large (10MB+) | |
| 400 only | Minimal payload, bold text falls back to synthetic bold | |

**User's choice:** Regular 400 + Bold 700
**Notes:** None

### Loading method

| Option | Description | Selected |
|--------|-------------|----------|
| @fontsource with unicode-range | Auto-splits into ~120 unicode-range slices. Import in CJK layout only. | ✓ |
| Manual @font-face | Self-host woff2, write @font-face rules manually. Full control, more maintenance. | |
| You decide | Claude picks based on Astro patterns | |

**User's choice:** @fontsource with unicode-range
**Notes:** Already decided as only new npm dependency

### Loading scope

| Option | Description | Selected |
|--------|-------------|----------|
| Only on /zh/ pages | Conditional import in locale-aware layout. Zero perf regression for existing pages. | ✓ |
| Global (all pages) | Simpler — one CSS import everywhere. unicode-range limits actual downloads but CSS parsing cost present. | |

**User's choice:** Only on /zh/ pages
**Notes:** None

---

## Routing & Page Structure

### Page file organization

| Option | Description | Selected |
|--------|-------------|----------|
| Locale folders with thin wrappers | src/pages/zh/index.astro etc. Each imports same component, passes locale translations. English untouched. | ✓ |
| Dynamic [locale] parameter | src/pages/[locale]/index.astro with getStaticPaths. Less duplication but English routing needs special handling. | |
| You decide | Claude picks based on Astro i18n best practices | |

**User's choice:** Locale folders with thin wrappers
**Notes:** None

### Locale flow to components

| Option | Description | Selected |
|--------|-------------|----------|
| Astro.currentLocale + layout prop | Built-in with i18n routing. BaseLayout passes to Header/Footer. Components receive content as props. | ✓ |
| Explicit locale prop everywhere | Every component gets locale prop, ignoring Astro.currentLocale. More explicit, more prop drilling. | |
| You decide | Claude picks | |

**User's choice:** Astro.currentLocale + layout prop
**Notes:** None

### English page changes

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal touch — only BaseLayout | Only change BaseLayout for dynamic lang attr. No refactoring existing pages. | ✓ |
| Refactor all pages to use t() | Extract all English strings into translation files too. More consistent but large refactor. | |

**User's choice:** Minimal touch — only BaseLayout
**Notes:** None

---

## French Typography Gaps

### oe ligature verification timing

| Option | Description | Selected |
|--------|-------------|----------|
| Verify now in Phase 17 | Quick check if General Sans contains U+0153. Low effort, prevents surprise later. | ✓ |
| Defer to Phase 19 | Check when French content is rendered. Risk: fixing mid-content phase is messier. | |
| You decide | Claude verifies and handles it | |

**User's choice:** Verify now in Phase 17
**Notes:** None

## Claude's Discretion

- t() function implementation details
- Astro i18n config specifics
- Translation file directory naming

## Deferred Ideas

None — discussion stayed within phase scope.
