# Phase 21: Legal, Support & Blog - Context

**Gathered:** 2026-05-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Privacy, Terms, and Support pages are available at /zh/ and /fr/ with translated content and binding-language disclaimers. Blog listing page at /zh/blog and /fr/blog displays translated UI chrome with correct locale routing.

</domain>

<decisions>
## Implementation Decisions

### Legal Content Strategy
- **D-01:** Fully translate Privacy and Terms page content into zh and fr. Users in those locales should read the policy in their language. The disclaimer (D-03) clarifies the English version is legally binding.
- **D-02:** Per-page namespace files: `privacy.ts`, `terms.ts`, `support.ts`, `blog.ts` per locale. Matches the per-page pattern from Phase 20.

### Legal Disclaimer
- **D-03:** Add a visible disclaimer banner at the TOP of Privacy and Terms pages (zh/fr only, not EN). Text: "This is a translation. The English version is the legally binding document." Styled as a subtle info banner (surface background, muted text, small font). Same component/pattern for both Privacy and Terms.
- **D-04:** Disclaimer is part of the LegalPageLayout component — add a `locale` prop and conditionally render the banner when locale !== 'en'. No separate component needed.

### Support Page
- **D-05:** Fully translate FaqAccordion content (6 Q&A pairs) into zh and fr. Extract all hardcoded text to translation keys. FAQ answers often contain technical terms — translate naturally per D-07.
- **D-06:** Support page "Contact us" section also translated. Email address stays the same.

### Blog Listing
- **D-07:** Blog has no posts — translate only UI chrome: page title "Blog", description, empty state text ("No posts yet..."), and any other UI strings. No blog post translation infrastructure needed in this phase.
- **D-08:** Blog listing wrapper pages at `src/pages/zh/blog/index.astro` and `src/pages/fr/blog/index.astro`.

### Content & Tone (carried from Phase 19/20)
- **D-09:** Claude drafts all translations inline. Chinese feels native, French uses "tu" (informal).
- **D-10:** Trust fluid layout for French text expansion.

### Claude's Discretion
- Translation key naming within each namespace
- Disclaimer banner exact styling (follow existing surface/muted patterns)
- Whether FaqAccordion receives locale as prop or uses a separate translated component
- Blog empty state message wording in zh/fr
- Meta title/description translations for all pages

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Legal Pages (source content)
- `src/pages/privacy.astro` — Privacy policy with inline legal HTML content
- `src/pages/terms.astro` — Terms of service with inline legal HTML content
- `src/pages/support.astro` — Support page with FaqAccordion + contact section

### Blog
- `src/pages/blog/index.astro` — Blog listing with empty state handling

### Layout
- `src/layouts/LegalPageLayout.astro` — Simple layout with title, lastUpdated, prose slot
- `src/layouts/BaseLayout.astro` — Blog listing uses this directly

### Components
- `src/components/FaqAccordion.astro` — 94 lines, 6 hardcoded Q&A pairs

### Translation Infrastructure
- `src/i18n/utils.ts` — useTranslations() utility, needs new lookup functions
- `src/i18n/locales/en/common.ts` — Shared keys
- `src/i18n/locales/zh/common.ts` — Chinese shared keys
- `src/i18n/locales/fr/common.ts` — French shared keys

### Pattern Reference
- `src/pages/zh/features/recovery-scoring.astro` — Thin wrapper pattern (Phase 20)
- `src/i18n/locales/en/recovery-scoring.ts` — Namespace file pattern

### Requirements
- `.planning/REQUIREMENTS.md` — I18N-09 (legal/support translated), I18N-10 (blog listing i18n)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useTranslations(locale)` from `src/i18n/utils.ts` — proven across Phases 18-20
- `WidenStrings<T>` type utility for non-en locale files
- `getRelativeLocaleUrl(locale, path)` for internal links
- CJKLayout.astro for zh pages

### Established Patterns
- Phase 20: per-page namespace .ts file, useXxxTranslations() lookup in utils.ts
- Thin wrapper pages import same layout, pass locale prop
- zh pages use inline @fontsource/noto-sans-sc imports (not CJKLayout to avoid double-wrap)

### Integration Points
- LegalPageLayout.astro needs `locale` prop added (same as FeaturePageLayout in Phase 20)
- FaqAccordion.astro needs `locale` prop and useTranslations() wiring
- Blog index.astro needs locale-aware version
- 6 new wrapper pages: zh/fr for privacy, terms, support
- 2 new wrapper pages: zh/fr for blog listing
- 8 new namespace files: 4 pages × 2 new locales (en files may be needed too)
- utils.ts extended with 4 new lookup functions

</code_context>

<specifics>
## Specific Ideas

- Legal disclaimer banner should be subtle — not alarming. Info-level styling, not warning.
- FAQ answers may reference app-specific features — use consistent terminology from Phase 20 glossary.

</specifics>

<deferred>
## Deferred Ideas

- Translated blog POSTS (not just UI chrome) — deferred to v4.1+ per STATE.md
- Blog post translation infrastructure (per-locale MDX collections) — future milestone

</deferred>

---

*Phase: 21-legal-support-blog*
*Context gathered: 2026-05-25*
