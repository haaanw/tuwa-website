# Phase 4: Blog + Polish - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-11
**Phase:** 04-blog-polish
**Areas discussed:** Blog listing & post layout, Blog content schema, Performance strategy, SEO completeness

---

## Blog Listing & Post Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal list (Recommended) | Title + date + one-line description per entry. Clean, matches calm aesthetic. No images. | ✓ |
| Card grid | Cards with optional cover image, title, date, description. Richer but needs covers. | |
| You decide | Claude picks based on existing patterns | |

**User's choice:** Minimal list
**Notes:** None

---

| Option | Description | Selected |
|--------|-------------|----------|
| Clean prose (Recommended) | Typography prose styling, reading time + date, back link, CTA at bottom. | ✓ |
| Magazine style | Cover image hero, byline, share buttons, sidebar. | |
| You decide | Claude picks | |

**User's choice:** Clean prose
**Notes:** None

---

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, reuse FeatureCTA | Every post ends with App Store CTA. Consistent with feature pages. | |
| Subtle inline mention | No dedicated CTA section, natural mention/link within content. | ✓ |
| You decide | Claude picks | |

**User's choice:** Subtle inline mention
**Notes:** No dedicated CTA block on blog posts

---

## Blog Content Schema

| Option | Description | Selected |
|--------|-------------|----------|
| Tags field, no filter UI yet | Include tags in schema for future use, no tag pages this phase. | ✓ |
| No tags | Minimal schema only. | |
| Tags with filter pages | Full tag system with listing pages. | |

**User's choice:** Tags field, no filter UI yet
**Notes:** Infrastructure-only approach

---

| Option | Description | Selected |
|--------|-------------|----------|
| Optional field, not displayed | Schema includes coverImage for OG meta. Listing stays minimal. | |
| No cover image field | Use default site OG image. Simpler. | |
| You decide | Claude picks based on SEO best practices. | ✓ |

**User's choice:** You decide (Claude's discretion)
**Notes:** None

---

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, standard draft behavior (Recommended) | draft: true visible in dev, hidden in prod. | ✓ |
| No draft support | All posts published. | |
| You decide | Claude picks | |

**User's choice:** Standard draft behavior
**Notes:** None

---

## Performance Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Audit and fix (Recommended) | Run Lighthouse, identify bottlenecks, fix top issues. Pragmatic. | ✓ |
| Comprehensive optimization pass | Systematic audit of every page. More thorough. | |
| You decide | Claude assesses and decides scope | |

**User's choice:** Audit and fix
**Notes:** None

---

| Option | Description | Selected |
|--------|-------------|----------|
| Static PNG files | Create branded 1200x630 default OG image. Simple, reliable. | ✓ |
| Per-page generated (satori) | Generate unique OG per page at build time. MEDIUM confidence with font. | |
| Defer to v2 | Keep placeholder, OG images are v2 requirement. | |

**User's choice:** Static PNG files
**Notes:** None

---

## SEO Completeness

| Option | Description | Selected |
|--------|-------------|----------|
| Standard allow-all (Recommended) | Allow all crawlers, reference sitemap. | ✓ |
| Custom rules | Block specific paths or user agents. | |
| You decide | Claude picks | |

**User's choice:** Standard allow-all
**Notes:** None

---

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, all published posts (Recommended) | Auto-include all non-draft pages in sitemap. | ✓ |
| Blog excluded from sitemap | Only main pages in sitemap. | |
| You decide | Claude picks | |

**User's choice:** All published posts in sitemap
**Notes:** None

---

| Option | Description | Selected |
|--------|-------------|----------|
| Full site audit (Recommended) | Check all pages for heading hierarchy, landmarks, alt text. | ✓ |
| Blog pages only | Only new blog pages get semantic HTML check. | |
| You decide | Claude assesses and decides | |

**User's choice:** Full site audit
**Notes:** User also requested font switch from Alpino to General Sans (Fontshare) during this question

## Claude's Discretion

- Cover image field in blog schema (D-05)
- Blog post URL structure
- Lighthouse issue prioritization
- Blog listing page route

## Deferred Ideas

- Per-page dynamic OG images via satori (v2)
- Tag listing/filtering pages
- Blog search
- Author profiles/bylines
