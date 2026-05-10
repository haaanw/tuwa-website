# Phase 3: Content Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-11
**Phase:** 3-content-pages
**Areas discussed:** Feature page layout, Copy & content depth, Legal page approach, URL redirects & routing

---

## Feature page layout

| Option | Description | Selected |
|--------|-------------|----------|
| Hero + sections + CTA | Top hero, 2-3 alternating text/image sections, App Store CTA | |
| Long-form scroll | Single flowing page with inline screenshots and callouts | |
| You decide | Claude picks based on marketing best practices | ✓ |

**User's choice:** You decide
**Notes:** Claude has discretion on page structure.

| Option | Description | Selected |
|--------|-------------|----------|
| Device mockup (like hero) | Reuse Dieter Rams device frame from Phase 2 | |
| Bare screenshots | No device frame, rounded corners + shadow | |
| You decide | Claude picks for visual consistency | ✓ |

**User's choice:** You decide
**Notes:** Claude has discretion on screenshot treatment.

| Option | Description | Selected |
|--------|-------------|----------|
| Identical structure | Same layout for all 5 pages | |
| Mostly same, coaching unique | 4 share template, coaching gets extra sections | ✓ |
| You decide | Claude picks based on content needs | |

**User's choice:** Mostly same, coaching unique
**Notes:** Coaching page targets a different audience (coaches) and needs extra sections.

| Option | Description | Selected |
|--------|-------------|----------|
| Screenshots ready | All screenshots available | |
| Build with placeholders | Placeholder image blocks | |
| Mix — some ready | Some exist, others need capturing | ✓ |

**User's choice:** Mix — some ready
**Notes:** Build with real screenshots where available, placeholders for the rest.

---

## Copy & content depth

| Option | Description | Selected |
|--------|-------------|----------|
| Short (300-500 words) | Punchy, scannable | |
| Medium (500-800 words) | Explain science without overwhelming | |
| Long (800-1200 words) | Deep-dive with methodology explanation | ✓ |

**User's choice:** Long (800-1200 words)

| Option | Description | Selected |
|--------|-------------|----------|
| Claude drafts all copy | Claude writes, user reviews | |
| I'll write it | User provides copy | |
| Claude drafts, I review | Claude writes first draft, user iterates | ✓ |

**User's choice:** Claude drafts, I review

| Option | Description | Selected |
|--------|-------------|----------|
| Name the method, explain outcome | Mention EWMA/ACWR/HRV, focus on athlete benefit | |
| Show the science | Brief methodology section per feature | |
| You decide | Claude calibrates per feature | |

**User's choice:** Other (free text) — "Outcome-first, then deeper science with graphs/charts, ideally interactive"
**Notes:** Lead with results athletes get, then show comprehensive but concise science. Wants graphs and charts, ideally interactive.

| Option | Description | Selected |
|--------|-------------|----------|
| Interactive now (Phase 3) | Build lightweight chart islands | ✓ |
| Static images first | Static SVG/PNG, add interactivity later | |
| You decide | Claude picks | |

**User's choice:** Interactive now (Phase 3)
**Notes:** Interactive charts are in-scope for Phase 3, not deferred.

---

## Legal page approach

| Option | Description | Selected |
|--------|-------------|----------|
| Match site aesthetic | Same palette, font, BaseLayout | ✓ |
| Minimal plain text | Simple white background, system font | |
| You decide | Claude picks | |

**User's choice:** Match site aesthetic

| Option | Description | Selected |
|--------|-------------|----------|
| General quality bar | Clean, well-formatted legal prose | ✓ |
| Specific reference | Specific Bevel page URL to match | |

**User's choice:** General quality bar

| Option | Description | Selected |
|--------|-------------|----------|
| FAQ + contact email | 5-8 FAQ questions plus email | ✓ |
| Contact form | Embedded form with backend | |
| Just contact info | Minimal email + response times | |
| You decide | Claude picks | |

**User's choice:** FAQ + contact email

---

## URL redirects & routing

| Option | Description | Selected |
|--------|-------------|----------|
| Same domain (tuwa.app) | Old .html URLs on tuwa.app need redirecting | ✓ |
| Different domain | Old site on GitHub Pages subdomain | |
| No old URLs exist | Fresh domain, no redirects needed | |
| Not sure | Check later, build infrastructure | |

**User's choice:** Same domain (tuwa.app)

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, _redirects file | Cloudflare Pages _redirects file, 301 redirects | |
| You decide | Claude handles implementation | ✓ |

**User's choice:** You decide

## Claude's Discretion

- Feature page structure (hero + sections vs long-form)
- Screenshot treatment (device mockup vs bare)
- Redirect implementation details
- Chart library selection for interactive visualizations

## Deferred Ideas

None — discussion stayed within phase scope
