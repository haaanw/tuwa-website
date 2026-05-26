# Phase 23: Locale Formatting Utility - Context

**Gathered:** 2026-05-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a shared locale-aware formatting utility at `src/i18n/format.ts` and migrate every existing call site off hardcoded locale strings. In scope:

- Date formatting for the 4 current call sites (`src/layouts/BlogPostLayout.astro`, `src/pages/blog/index.astro`, `src/pages/zh/blog/index.astro`, `src/pages/fr/blog/index.astro`).
- Number formatting for the 3 animated counter call sites in `src/layouts/BaseLayout.astro` (lines 50, 72, 76), driven by **page locale** (not browser locale).
- A canonical `Locale → Intl tag` map so future call sites have one source of truth.

Out of scope: translated URL slugs, new locales, relative-time formatting, currency formatting, blog schema changes (Phase 24), OG image work (Phase 25).

</domain>

<decisions>
## Implementation Decisions

### Utility Scope
- **D-01:** Cover both dates AND numbers. Number counters in `BaseLayout.astro` are in scope despite I18N-21 naming only dates — keeping all locale-formatted output on one utility avoids a second migration later.
- **D-02:** Number counters target the **page locale**, not the visitor's browser locale, so a zh page always renders zh-formatted numbers regardless of who's viewing. The page locale is plumbed into the inline counter `<script>` via a `data-locale` attribute on the counter element (read by the script with `el.dataset.locale`). Falls back to `'en'` if missing.

### API Shape
- **D-03:** Date formatter signature: `formatDate(date: Date, locale: Locale, options?: Intl.DateTimeFormatOptions): string`. Default options reproduce the current long style: `{ year: 'numeric', month: 'long', day: 'numeric' }`. The optional `options` arg leaves room for short/compact dates later without an API break.
- **D-04:** Number formatter signature: `formatNumber(value: number, locale: Locale, options?: Intl.NumberFormatOptions): string`. No default options needed (Intl default is fine for integer counters).
- **D-05:** Both exports are plain named functions — no hook/factory wrappers. Lighter at call sites than the `use*Translations()` style; that hook style is a translation-bundle pattern (closes over a dictionary), which doesn't apply here.

### Date Style + Locale Tags
- **D-06:** Keep the existing rendered output exactly. Default style stays long (`May 25, 2026` / `2026年5月25日` / `25 mai 2026`) — zero visible change to the live site.
- **D-07:** Locale-tag map is `{ en: 'en-US', zh: 'zh-CN', fr: 'fr-FR' }`, matching today's hardcoded tags. Exported from `format.ts` as `LOCALE_TAG` (or similar) so future call sites and Phase 24/25 work can reference it.

### File Location + Naming
- **D-08:** File path is exactly `src/i18n/format.ts` — required for the success-criteria #3 grep gate (`grep -r "toLocaleDateString" src/` must return zero hits *outside* this file).
- **D-09:** Named exports only: `formatDate`, `formatNumber`, `LOCALE_TAG`. The `Locale` type is re-imported from `src/i18n/utils.ts` (do not redefine).

### Claude's Discretion
- Number-counter locale source (page vs browser): user said "you decide" → chose **page locale** for consistency with dates. If this turns out to feel wrong for the stat-counter UX, easy to flip later by removing the `data-locale` attribute.
- Exact name of the locale-tag map constant (`LOCALE_TAG` vs `INTL_LOCALE` vs `LOCALE_BCP47`) — planner's call.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Roadmap + Requirements
- `.planning/ROADMAP.md` §Phase 23 — Goal, success criteria (4 items), dependency on Phase 22.
- `.planning/REQUIREMENTS.md` — I18N-21 (only active requirement for this phase).

### Existing i18n Foundation
- `src/i18n/utils.ts` — Defines `Locale` type (`'en' | 'zh' | 'fr'`) and the `use*Translations(locale)` pattern. `format.ts` re-imports `Locale` from here.
- `src/i18n/locales/` — Translation bundles (not consumed by format.ts; reference for project convention only).

### Call Sites to Migrate (dates)
- `src/layouts/BlogPostLayout.astro:53` — currently `toLocaleDateString('en-US', { long })`. Locale must come from the page (BlogPostLayout is shared across en/zh/fr blog post routes — verify how locale is currently inferred and pass it in).
- `src/pages/blog/index.astro:44` — `'en-US'` hardcoded.
- `src/pages/zh/blog/index.astro:34` — `'zh-CN'` hardcoded.
- `src/pages/fr/blog/index.astro:28` — `'fr-FR'` hardcoded.

### Call Sites to Migrate (numbers)
- `src/layouts/BaseLayout.astro:50, 72, 76` — inline `<script>` block; counters use `toLocaleString()` with no locale arg. Migration requires (a) adding `data-locale="{Astro.currentLocale ?? 'en'}"` to counter elements and (b) reading it inside the script before calling `formatNumber`.

### Success Criteria Gates
- Success #1/#2: visual verification on built zh/fr blog index pages.
- Success #3: `grep -r "toLocaleDateString" src/` returns zero hits outside `src/i18n/format.ts`. **Also extend the gate to `toLocaleString(` for the number migration** (planner: add this as an additional verification, not in lieu of the official gate).
- Success #4: `npx tsc --noEmit` clean.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Locale` type in `src/i18n/utils.ts:50` — single source of truth, import directly.
- Astro's built-in `Astro.currentLocale` in `.astro` frontmatter — already wired by Phase 17 i18n routing. Pass to `formatDate(date, Astro.currentLocale as Locale)`.

### Established Patterns
- Per-page translation hooks live in `src/i18n/utils.ts`. `format.ts` is a sibling module, not extending the same hook pattern — see D-05.
- Date-rendered output is always wrapped in `<time datetime={date.toISOString()}>` (see zh blog index:33). Keep `datetime` attribute as ISO; only the visible label is locale-formatted.

### Integration Points
- All 4 date call sites are in `.astro` frontmatter or templates → trivial import.
- 3 number call sites are inside a client-side `<script>` block in `BaseLayout.astro` → cannot directly import `format.ts` unless the script is a `<script>` (Astro bundles these by default) or you inline the small `formatNumber` body. Plan should specify the chosen mechanism.

</code_context>

<specifics>
## Specific Ideas

- The current rendered output (`2026年5月25日`, `25 mai 2026`, `May 25, 2026`) is the visual contract. Phase 23 must not change what users see on existing pages — only the implementation underneath.
- Tag map and formatter co-located in one file so a future contributor adding a 4th locale touches one file, not several.

</specifics>

<deferred>
## Deferred Ideas

- **Short/relative date variants** (e.g. "2 days ago") — no current call site needs them; the optional `options` arg in `formatDate` leaves room without committing now.
- **Currency / unit formatting** — no current usage; add when a price/metric call site appears.
- **Timezone handling** — blog dates are date-only (no time component), no timezone concern today. Revisit if event-style dated content appears.

None require a new phase yet; track as future enhancements to `format.ts`.

</deferred>

---

*Phase: 23-Locale Formatting Utility*
*Context gathered: 2026-05-26*
