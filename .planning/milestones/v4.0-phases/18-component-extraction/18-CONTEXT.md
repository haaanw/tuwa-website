# Phase 18: Component Extraction - Context

**Gathered:** 2026-05-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can switch languages from any page via a header language switcher, and all navigation links (header, footer, mobile menu) route correctly within the chosen locale. All nav text is translated.

</domain>

<decisions>
## Implementation Decisions

### Language Switcher Design
- **D-01:** Switcher lives in the header as a dropdown (not always-visible inline). Trigger: globe icon + current language code + chevron (e.g., 🌐 EN ▾). Dropdown lists languages in native text: English, 中文, Français. No country flags.
- **D-02:** On mobile, switcher appears between logo and hamburger menu (🌐 EN ▾). Same dropdown behavior.
- **D-03:** Switching language preserves the current page path (e.g., /zh/features/coaching → /fr/features/coaching).

### Nav Text Translation
- **D-04:** All nav labels translated in this phase — not deferred to Phase 19. Header links (Features, Method, Coaches, Blog, Support), footer section headers, footer link text, mobile menu links, and feature dropdown titles + descriptions all get translation keys in common.ts.
- **D-05:** CTA button "Get the App" translated per locale. Feature dropdown descriptions also translated. Full nav experience in chosen language.

### Bare Link Cleanup
- **D-06:** Convert ALL bare paths to `getRelativeLocaleUrl(locale, path)` now, even for pages that don't have locale variants yet. Accepted tradeoff: clicking /zh/methodology will 404 until Phase 19 creates that page. Correct routing from day one, no tech debt.
- **D-07:** Affected bare paths in current code: Header has `/methodology` and `/for-coaches`. Footer has `/methodology`, `/readiness-score`, `/training-load`, `/for-coaches`, `/compare`.

### Claude's Discretion
- Language switcher dropdown animation and close-on-outside-click behavior (follow existing Features dropdown pattern)
- Globe icon implementation (SVG inline vs emoji — prefer SVG for consistency)
- Translation key naming conventions for nav items (follow existing common.ts structure)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing Navigation Components
- `src/components/Header.astro` — Main nav, Features dropdown pattern, locale prop already wired
- `src/components/Footer.astro` — 4-column grid, locale prop wired, mix of getRelativeLocaleUrl and bare paths
- `src/components/MobileMenu.astro` — Full-screen overlay, locale prop wired

### Layout & Locale Infrastructure
- `src/layouts/BaseLayout.astro` — Passes locale to Header/Footer
- `src/layouts/CJKLayout.astro` — zh-specific layout wrapping BaseLayout with locale="zh"
- `src/i18n/utils.ts` — useTranslations() utility
- `src/i18n/locales/en/common.ts` — English translation dictionary (needs nav keys added)
- `src/i18n/locales/zh/common.ts` — Chinese translation dictionary
- `src/i18n/locales/fr/common.ts` — French translation dictionary

### Requirements
- `.planning/REQUIREMENTS.md` — I18N-04 (language switcher), I18N-05 (locale-aware nav links)

### Phase 17 Code Review
- `.planning/phases/17-i18n-infrastructure/17-REVIEW.md` — WR-01 through WR-05 document the exact bare path and hardcoded text issues to fix

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Features dropdown in Header.astro — same open/close/hover pattern can be reused for language switcher
- `getRelativeLocaleUrl()` from `astro:i18n` — already imported in Header, Footer, MobileMenu
- `useTranslations()` utility — available for loading translated nav strings

### Established Patterns
- Components receive `locale` prop with default `'en'`
- Dropdown uses `is-open` class toggle with JS `<script is:inline>` block
- Close on outside click + Escape key already implemented for Features dropdown
- Mobile menu is full-screen overlay with focus trap

### Integration Points
- Header.astro line 95, 98: bare paths `/methodology`, `/for-coaches` need conversion
- Footer.astro lines 56-60: bare paths in Resources column need conversion
- MobileMenu.astro: check for any remaining bare paths
- All three common.ts locale files: add nav translation keys (nav.features, nav.method, nav.coaches, etc.)

</code_context>

<specifics>
## Specific Ideas

- Globe icon as inline SVG (not emoji) for cross-browser consistency
- Switcher dropdown styled consistently with existing Features dropdown
- Current language highlighted or checked in dropdown

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 18-component-extraction*
*Context gathered: 2026-05-25*
