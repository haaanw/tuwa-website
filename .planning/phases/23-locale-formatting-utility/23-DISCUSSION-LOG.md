# Phase 23: Locale Formatting Utility - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-26
**Phase:** 23-Locale Formatting Utility
**Areas discussed:** Utility scope, API shape, Date style + tags, File location + naming

---

## Utility Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Dates only | Keep phase tight to I18N-21. Counters in BaseLayout stay as-is using default toLocaleString(). | |
| Dates + numbers | Add formatNumber and rewire the 3 counter calls. Counters live in inline script — import complication. | ✓ |

**User's choice:** Dates + numbers
**Notes:** Followed up because counters live in a client-side `<script>` and `toLocaleString()` with no arg uses browser locale, not page locale.

### Follow-up: Number locale source

| Option | Description | Selected |
|--------|-------------|----------|
| Page locale | Force numbers to match page (en/zh/fr) regardless of browser. Needs locale plumbed into inline script. | ✓ (Claude's discretion) |
| Browser locale | Keep current behavior — numbers follow visitor browser. Lower effort. | |
| You decide | Pick consistent option given rest of site forces page locale for dates. | (user selected) |

**User's choice:** You decide → Claude chose Page locale
**Notes:** Consistency with date behavior. Plumbed via `data-locale` attribute on counter elements.

---

## API Shape

| Option | Description | Selected |
|--------|-------------|----------|
| Fixed style | formatDate(date, locale) returning current long format. Simplest, matches all 4 current call sites exactly. | |
| Optional options arg | formatDate(date, locale, options?: Intl.DateTimeFormatOptions) defaulting to long style. More future flexibility. | ✓ |

**User's choice:** Optional options arg
**Notes:** Default options reproduce the current long style; optional arg leaves room for short/relative variants.

---

## Date Style + Tags

| Option | Description | Selected |
|--------|-------------|----------|
| Keep both | Long style + en→en-US, zh→zh-CN, fr→fr-FR. Zero visual change. | ✓ |
| Change tag mapping | Bare language tags (en/zh/fr). Possibly different conventions. | |

**User's choice:** Keep both
**Notes:** Visual contract preserved exactly; no change to live rendered output.

---

## File Location + Naming

| Option | Description | Selected |
|--------|-------------|----------|
| src/i18n/format.ts, named exports | Plain named exports formatDate, formatNumber, locale-tag map. Matches grep gate in success #3. | ✓ |
| Hook-style | useDateFormat(locale)/useNumberFormat(locale) matching use*Translations() convention. | |

**User's choice:** src/i18n/format.ts, named exports
**Notes:** File path is required exact for success-criteria #3 grep. Hook-style wrappers add cost without benefit (no dictionary to close over).

---

## Claude's Discretion

- Number-counter locale source: chose **page locale** when user said "you decide" — consistency with the date decision.
- Exact name of the locale-tag map constant (`LOCALE_TAG` vs `INTL_LOCALE` vs `LOCALE_BCP47`) — left to planner.

## Deferred Ideas

- Short / relative date variants (no current need; covered by optional `options` arg)
- Currency / unit formatting (no current usage)
- Timezone handling (blog dates are date-only)
