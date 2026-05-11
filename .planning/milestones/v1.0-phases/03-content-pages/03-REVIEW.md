---
phase: 03-content-pages
reviewed: 2026-05-11T00:00:00Z
depth: standard
files_reviewed: 18
files_reviewed_list:
  - src/components/charts/AcwrChart.astro
  - src/components/charts/RecoveryChart.astro
  - src/components/FaqAccordion.astro
  - src/components/FeatureCTA.astro
  - src/components/ScreenshotBlock.astro
  - src/layouts/CoachingPageLayout.astro
  - src/layouts/FeaturePageLayout.astro
  - src/layouts/LegalPageLayout.astro
  - src/pages/features/coaching.astro
  - src/pages/features/cold-start.astro
  - src/pages/features/recovery-scoring.astro
  - src/pages/features/smart-templates.astro
  - src/pages/features/workload-tracking.astro
  - src/pages/privacy.astro
  - src/pages/support.astro
  - src/pages/terms.astro
  - src/styles/global.css
  - public/_redirects
findings:
  critical: 0
  warning: 5
  info: 5
  total: 10
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-05-11T00:00:00Z
**Depth:** standard
**Files Reviewed:** 18
**Status:** issues_found

## Summary

Phase 03 delivers the full feature page system (workload tracking, recovery scoring, smart templates, cold-start, coaching), shared layout components (FeaturePageLayout, CoachingPageLayout, LegalPageLayout), interactive Chart.js visualisations, FaqAccordion, and legal pages. The code is well-structured and consistent. No security vulnerabilities were found. The issues centre on three themes: a semantic HTML problem in FaqAccordion, a missing app store URL that will silently link to a non-existent page, an animation timing gap caused by how the IntersectionObserver is scoped, and a handful of accessibility and quality items.

---

## Warnings

### WR-01: App Store URL resolves to a non-existent page

**File:** `src/config.ts:4`
**Issue:** `APP_STORE_URL` is set to `https://apps.apple.com/app/tuwa`, which is a partial URL that does not include an App Store numeric ID (e.g., `/id123456789`). Apple will return a 404 or redirect-loop for this URL. Every CTA button across the site links to it through `FeatureCTA.astro`.
**Fix:** Update the URL once the app is live. Until then, consider pointing it to a known-good holding destination (the Tuwa landing page itself, or a pre-registration form) rather than a broken external URL:
```ts
// src/config.ts
export const APP_STORE_URL = 'https://apps.apple.com/app/tuwa/id<YOUR_APP_ID>';
```

---

### WR-02: FaqAccordion nests `<details>` directly inside `<dl>` — invalid HTML

**File:** `src/components/FaqAccordion.astro:72-93`
**Issue:** The FAQ renders `<details>/<summary>` elements as direct children of a `<dl>` (description list). The HTML spec requires `<dl>` to contain only `<dt>`, `<dd>`, or `<div>` children. Placing `<details>` directly inside `<dl>` is invalid. Browsers render it today but it can break screen readers that navigate by landmark semantics, and the `<dt>`/`<dd>` pairing (the semantic intended by `<dl>`) is never established.
**Fix:** Either use a `<section>` wrapper with plain `<div>` children, or wrap each `<details>` in a `<div>`:
```astro
<section style="margin-top: var(--space-2xl);">
  <h2 ...>Frequently Asked Questions</h2>
  <div>
    {faqs.map(({ q, a }) => (
      <div style="border-bottom: 1px solid var(--color-divider);">
        <details>
          <summary ...>{q}</summary>
          <p ...>{a}</p>
        </details>
      </div>
    ))}
  </div>
</section>
```

---

### WR-03: IntersectionObserver in FeatureCTA observes all `[data-animate]` on the page — late-loading risk

**File:** `src/components/FeatureCTA.astro:63-80`
**Issue:** The `is:inline` IntersectionObserver script runs when the `<FeatureCTA>` component mounts at the bottom of the page. It calls `document.querySelectorAll('[data-animate]')` at that point, which selects all elements on the page — including elements earlier in the document that may not yet have been observed if a prior observer wasn't registered. More critically: if the component is rendered but its `<script>` runs before the DOM is fully parsed (e.g., deferred execution order), elements higher in the page may be missed. Additionally, if `FeatureCTA` is absent from a page, no observer is ever registered and all `[data-animate]` elements stay invisible (opacity: 0) permanently.
**Fix:** Move the IntersectionObserver to `BaseLayout.astro` as a single, reliable attachment point, rather than relying on `FeatureCTA` being present on every page that uses `data-animate`. Place it just before `</body>`:
```astro
<!-- BaseLayout.astro, before </body> -->
<script is:inline>
  (function () {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });
  })();
</script>
```

---

### WR-04: Chart canvases use hardcoded light-mode color constants — no CSS variable linkage

**File:** `src/components/charts/AcwrChart.astro:16-19`, `src/components/charts/RecoveryChart.astro:15-18`
**Issue:** Both charts hardcode hex color literals (`'#2B5240'`, `'#696560'`, etc.) matching the light-mode design tokens. These are copy-pasted constants not linked to the CSS custom properties in `global.css`. If the design tokens are updated (e.g., for a dark mode or a brand refresh), the charts will be visually inconsistent and require a manual sync hunt. This is a maintainability defect.
**Fix:** Read the resolved CSS variable values at runtime so the charts stay in sync with the design token system:
```ts
// At the top of the <script> block
const style = getComputedStyle(document.documentElement);
const COLOR_ACCENT   = style.getPropertyValue('--color-accent').trim();
const COLOR_TEXT_2   = style.getPropertyValue('--color-text-2').trim();
const COLOR_TEXT_3   = style.getPropertyValue('--color-text-3').trim();
const COLOR_DIVIDER  = style.getPropertyValue('--color-divider').trim();
```

---

### WR-05: `ScreenshotBlock` applies `border-radius` only when `isFramed=false` — likely inverted intent

**File:** `src/components/ScreenshotBlock.astro:21-24`
**Issue:** The `style` prop logic is:
- `isFramed=true` (default): `box-shadow` only — no `border-radius`
- `isFramed=false`: `border-radius` + `box-shadow`

A "framed" screenshot typically implies a device frame (e.g., iPhone mockup), where the frame itself provides rounding and the inner image should clip to it — so not applying `border-radius` to the raw `<img>` is reasonable. However, the unframed path (a bare screenshot without a device frame) _also_ should display with a subtle radius for a polished appearance. The current code achieves that. The issue is the inverse case: with `isFramed=true` and no actual frame asset wrapping the image, the screenshot renders with sharp corners and a box shadow, which can look unpolished. The current usage in `recovery-scoring.astro` and `smart-templates.astro` passes `screenshot={recoveryScreenshot}` without a frame — the image will render with sharp corners.

**Fix:** Add `border-radius` to the framed case as well, or document clearly that `isFramed=true` is only for use when the image asset itself already contains device frame artwork:
```astro
style={isFramed
  ? "border-radius: var(--radius-lg); box-shadow: 0 4px 24px rgba(28,25,21,0.10); display: block;"
  : "border-radius: var(--radius-lg); box-shadow: 0 4px 24px rgba(28,25,21,0.10); display: block;"}
```
(Or collapse them to a single style, since they'd be identical, and remove the unused `isFramed` prop.)

---

## Info

### IN-01: `<details>/<summary>` open/close indicator uses Unicode escape `'\2212'` — readability

**File:** `src/components/FaqAccordion.astro:54`
**Issue:** The CSS for the close indicator uses `content: '\2212'` (Unicode minus sign). The open indicator uses the literal character `'+'`. Mixing a Unicode escape and a literal character is inconsistent. The minus sign (`−`) and hyphen-minus (`-`) are visually similar but semantically different; reviewers cannot confirm the correct character without looking up the code point.
**Fix:** Use the literal character for both, or use the named entity equivalent — this is more readable and auditable:
```css
details[open] > summary::after {
  content: '−'; /* Unicode minus, same as \2212 but readable */
}
```

---

### IN-02: `LegalPageLayout` generates `description` by string-interpolating `title` — generic meta description

**File:** `src/layouts/LegalPageLayout.astro:11`
**Issue:** The description passed to `BaseLayout` is `${title} for Tuwa — Training Load & Recovery app.` This produces descriptions like "Privacy Policy for Tuwa — Training Load & Recovery app." and "Terms of Service for Tuwa — Training Load & Recovery app." These are valid but generic. The privacy and terms pages accept no `description` prop, making it impossible to customise without changing the layout for all legal pages.
**Fix:** Add an optional `description` prop to `LegalPageLayout` with a fallback to the current interpolated value:
```astro
interface Props {
  title: string;
  lastUpdated?: string;
  description?: string;
}
const { title, lastUpdated, description = `${title} for Tuwa — Training Load & Recovery app.` } = Astro.props;
```

---

### IN-03: `CoachingPageLayout` is a near-duplicate of `FeaturePageLayout` — DRY violation

**File:** `src/layouts/CoachingPageLayout.astro:1-87` vs `src/layouts/FeaturePageLayout.astro:1-59`
**Issue:** The first 59 lines of `CoachingPageLayout` are byte-for-byte identical to `FeaturePageLayout` (same Props interface, same hero section, same screenshot section). The coaching layout extends the feature layout only by adding three named slot sections (`coach-athlete`, `team-features`, `invite-flow`). Any future change to the shared hero pattern (padding, font scale, etc.) must be made in two places.
**Fix:** Extend `FeaturePageLayout` or extract a shared `FeaturePageBase` component, then have `CoachingPageLayout` add only the coaching-specific named slots via composition:
```astro
---
import FeaturePageLayout from './FeaturePageLayout.astro';
// ... coaching-specific props only
---
<FeaturePageLayout ...sharedProps>
  <slot />
  <!-- coaching slot wrappers -->
</FeaturePageLayout>
```

---

### IN-04: `_redirects` file redirects `.html` URLs to extensionless paths — redirect direction may be wrong for Cloudflare Pages

**File:** `public/_redirects:1-3`
**Issue:** The redirects send `/privacy.html → /privacy`, `/terms.html → /terms`, `/support.html → /support`. This is the correct direction for cleaning up old `.html` URLs. However, Cloudflare Pages serves static Astro output with extensionless clean URLs natively — so `/privacy.html` would not be generated as a real file in `dist/`. The redirects may be unnecessary overhead (Cloudflare will 404 on `/privacy.html` regardless), or they were added to handle inbound links from a prior version of the site. If this is a new site with no prior HTML-extension history, these redirects serve no purpose and add noise.
**Fix:** Verify whether any inbound links to `.html` URLs exist. If not, remove the `_redirects` file or leave it empty. If they exist (e.g., App Store support URL pointed to `/support.html`), keep the redirects — they are correct as written.

---

### IN-05: Personal email address exposed in FAQ answer content

**File:** `src/components/FaqAccordion.astro:33`
**Issue:** The FAQ answer for "How do I contact support?" hardcodes `hanwenma09@gmail.com` as plain text inside the `<p>` element. This email is not a clickable `mailto:` link, unlike the equivalent in `support.astro` and `privacy.astro`. Users on mobile who want to email support must manually copy the address. Additionally, exposing a personal Gmail address in FAQ body text (rather than a business address) may raise trust concerns for users evaluating the app.
**Fix:** Wrap the email in a `mailto:` link for usability:
```astro
a: "... Email us at <a href=\"mailto:hanwenma09@gmail.com\">hanwenma09@gmail.com</a>. We typically respond..."
```
Note: Since FAQ answers are plain strings in the frontmatter, the simplest fix is either to omit the email from the FAQ answer and direct users to the contact button on the support page, or render the FAQ answers as HTML fragments rather than plain strings.

---

_Reviewed: 2026-05-11T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
