# Phase 3: Content Pages - Pattern Map

**Mapped:** 2026-05-11
**Files analyzed:** 15 new/modified files
**Analogs found:** 13 / 15

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/layouts/FeaturePageLayout.astro` | layout | request-response | `src/layouts/BaseLayout.astro` | role-match |
| `src/layouts/CoachingPageLayout.astro` | layout | request-response | `src/layouts/BaseLayout.astro` | role-match |
| `src/layouts/LegalPageLayout.astro` | layout | request-response | `src/layouts/BaseLayout.astro` | role-match |
| `src/components/FeatureCTA.astro` | component | request-response | `src/components/LandingCTA.astro` | exact |
| `src/components/ScreenshotBlock.astro` | component | request-response | `src/components/Hero.astro` | role-match |
| `src/components/FaqAccordion.astro` | component | request-response | `src/components/FeatureGrid.astro` | partial |
| `src/components/charts/RecoveryChart.astro` | component | event-driven | `src/components/MobileMenu.astro` | partial (script pattern) |
| `src/components/charts/AcwrChart.astro` | component | event-driven | `src/components/MobileMenu.astro` | partial (script pattern) |
| `src/pages/features/recovery-scoring.astro` | page | request-response | `src/pages/index.astro` | exact |
| `src/pages/features/workload-tracking.astro` | page | request-response | `src/pages/index.astro` | exact |
| `src/pages/features/smart-templates.astro` | page | request-response | `src/pages/index.astro` | exact |
| `src/pages/features/cold-start.astro` | page | request-response | `src/pages/index.astro` | exact |
| `src/pages/features/coaching.astro` | page | request-response | `src/pages/index.astro` | exact |
| `src/pages/privacy.astro` | page | request-response | `src/pages/index.astro` | exact |
| `src/pages/terms.astro` | page | request-response | `src/pages/index.astro` | exact |
| `src/pages/support.astro` | page | request-response | `src/pages/index.astro` | exact |
| `public/_redirects` | config | transform | none (plain text file) | no analog |
| `src/styles/global.css` (modify: add @plugin) | config | transform | existing file | self-modification |

---

## Pattern Assignments

### `src/layouts/FeaturePageLayout.astro` (layout, request-response)

**Analog:** `src/layouts/BaseLayout.astro`

**Imports pattern** (BaseLayout lines 1-6):
```astro
---
import { Font } from "astro:assets";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import SEO from "../components/SEO.astro";
import "../styles/global.css";
```

**Props interface pattern** (BaseLayout lines 8-13):
```astro
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}
```

**Layout wrapping pattern** — FeaturePageLayout wraps BaseLayout, same as how `index.astro` wraps BaseLayout with components:
```astro
---
import BaseLayout from './BaseLayout.astro';
import ScreenshotBlock from '../components/ScreenshotBlock.astro';
import FeatureCTA from '../components/FeatureCTA.astro';
---
<BaseLayout {title} {description} {ogImage}>
  <slot />
</BaseLayout>
```

**Section + data-animate pattern** (Hero.astro lines 6-12 and LandingCTA.astro lines 17-21):
```astro
<section
  data-animate
  style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);"
>
  <div class="mx-auto max-w-6xl px-6">
```

**Heading styles to copy verbatim** (Hero.astro lines 13-20 for h1; FeatureGrid.astro lines 28-36 for h2):
```astro
<!-- h1 -->
style="
  font-size: var(--text-display);
  font-weight: 600;
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
  color: var(--color-text-1);
"
<!-- h2 -->
style="
  font-size: var(--text-heading);
  font-weight: 600;
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
  color: var(--color-text-1);
"
```

**Subtitle/body copy color pattern** (Hero.astro lines 21-30):
```astro
<p
  class="mx-auto"
  style="
    margin-top: var(--space-lg);
    max-width: 560px;
    font-size: var(--text-body);
    line-height: var(--leading-body);
    color: var(--color-text-2);
  "
>
```

**Surface-background section pattern** (LandingCTA.astro lines 17-19):
```astro
<section
  data-animate
  style="background-color: var(--color-surface); border-top: 1px solid var(--color-divider);"
>
```

---

### `src/layouts/CoachingPageLayout.astro` (layout, request-response)

**Analog:** `src/layouts/FeaturePageLayout.astro` (sibling — build after FeaturePageLayout)

This layout extends FeaturePageLayout by adding extra slot sections for coach vs athlete perspective and team features. Use FeaturePageLayout as the base and add additional named slots or extra sections after the standard `<slot />`.

**Extra sections pattern** — add after standard content slot, same `data-animate` + `var(--color-surface)` bg pattern:
```astro
<!-- Coaching-specific: Coach vs Athlete section -->
<section
  data-animate
  style="background-color: var(--color-surface); border-top: 1px solid var(--color-divider);"
>
  <div class="mx-auto max-w-6xl px-6" style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
    <slot name="coach-athlete" />
  </div>
</section>
```

---

### `src/layouts/LegalPageLayout.astro` (layout, request-response)

**Analog:** `src/layouts/BaseLayout.astro`

**Imports pattern** (BaseLayout lines 1-6 — same imports):
```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  lastUpdated: string;
}

const { title, lastUpdated } = Astro.props;
---
```

**Prose container pattern** — narrow centered column for readable prose (based on landing page section `max-width: 768px` pattern, narrowed to 680px):
```astro
<BaseLayout {title} description={`${title} for Tuwa — Training Load & Recovery app.`}>
  <div style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
    <div class="mx-auto px-6" style="max-width: 680px;">
      <h1 style="font-size: var(--text-heading); font-weight: 600; color: var(--color-text-1);">
        {title}
      </h1>
      <p style="font-size: var(--text-label); color: var(--color-text-3); margin-top: var(--space-sm);">
        Last updated: {lastUpdated}
      </p>
      <hr style="border-color: var(--color-divider); margin: var(--space-2xl) 0;" />
      <div class="prose prose-neutral max-w-none">
        <slot />
      </div>
    </div>
  </div>
</BaseLayout>
```

**Note on `prose` activation:** Add `@plugin "@tailwindcss/typography";` to `src/styles/global.css` (Wave 0 task) before implementing any legal page, or the prose class will not apply.

---

### `src/components/FeatureCTA.astro` (component, request-response)

**Analog:** `src/components/LandingCTA.astro` — adapt, do not duplicate

**Full source to adapt** (LandingCTA.astro lines 1-106):

Copy the entire `LandingCTA.astro` structure with these modifications:
1. Remove the `import QRCode from 'qrcode'` and QR code generation (lines 2-13)
2. Remove the QR code block (lines 69-80)
3. Keep the IntersectionObserver `<script is:inline>` exactly as-is (lines 89-106) — this is the single observer for the page
4. Adjust the heading to accept a prop or use a feature-appropriate default

**Section wrapper pattern** (LandingCTA.astro lines 17-21 — copy verbatim):
```astro
<section
  data-animate
  style="background-color: var(--color-surface); border-top: 1px solid var(--color-divider);"
>
  <div class="mx-auto max-w-6xl px-6" style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
    <div class="mx-auto text-center" style="max-width: 640px;">
```

**App Store badge pattern** (LandingCTA.astro lines 53-67 — copy verbatim, keep `rel="noopener noreferrer"`):
```astro
<a
  href={APP_STORE_URL}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Download Tuwa on the App Store"
>
  <img
    src="/badges/app-store-badge.svg"
    alt="Download on the App Store"
    height="44"
    width="148"
    loading="lazy"
  />
</a>
```

**Config import pattern** (LandingCTA.astro line 2):
```astro
import { APP_STORE_URL } from '../config';
```

**IntersectionObserver script** (LandingCTA.astro lines 89-106 — copy verbatim, critical: `is:inline`, IIFE, threshold 0.15):
```astro
<script is:inline>
  (function () {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });
  })();
</script>
```

**CRITICAL:** Include this IntersectionObserver script ONLY in `FeatureCTA.astro` — not in FeaturePageLayout or any other component. It fires for all `[data-animate]` elements on the page. DO NOT duplicate it.

---

### `src/components/ScreenshotBlock.astro` (component, request-response)

**Analog:** `src/components/Hero.astro` (lines 42-53 — Image usage pattern)

**Image import and usage pattern** (Hero.astro lines 1-4 and 42-53):
```astro
---
import { Image } from 'astro:assets';
import dashboardScreenshot from '../assets/screenshots/dashboard.png';
---
<!-- Image rendering: -->
<Image
  src={dashboardScreenshot}
  alt="descriptive alt text"
  width={320}
  quality={90}
  format="webp"
  loading="eager"
  class="rounded-[44px]"
/>
```

**Conditional render pattern** — framed screenshots are treated as full-bleed (no additional border-radius, only subtle box-shadow). Bare screenshots (if unframed) get `border-radius: var(--radius-lg)`. Placeholder uses `var(--color-surface)` bg and `9/19.5` aspect ratio:
```astro
---
import { Image } from 'astro:assets';

interface Props {
  src?: ImageMetadata;
  alt: string;
  placeholderLabel?: string;
  isFramed?: boolean;  // true for _framed.png assets with baked-in device frame
}

const { src, alt, placeholderLabel = 'Screenshot coming soon', isFramed = false } = Astro.props;
---
<div class="mx-auto" style="max-width: 320px;">
  {src ? (
    <Image
      src={src}
      {alt}
      width={320}
      quality={90}
      format="webp"
      style={isFramed
        ? "box-shadow: 0 4px 24px rgba(28,25,21,0.10); display: block;"
        : "border-radius: var(--radius-lg); box-shadow: 0 4px 24px rgba(28,25,21,0.10);"}
    />
  ) : (
    <div
      role="img"
      aria-label={alt}
      style="
        background-color: var(--color-surface);
        border-radius: var(--radius-lg);
        aspect-ratio: 9/19.5;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-text-3);
        font-size: var(--text-label);
        text-align: center;
        padding: var(--space-md);
      "
    >
      {placeholderLabel}
    </div>
  )}
</div>
```

---

### `src/components/FaqAccordion.astro` (component, request-response)

**Analog:** `src/components/FeatureGrid.astro` (list rendering pattern, lines 43-128)

**List rendering pattern** (FeatureGrid.astro lines 43-59 — map over data array):
```astro
<ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" role="list">
  <!-- mapped items -->
</ul>
```

For FAQ, use `<dl>` + `<details>/<summary>` (zero JS, native accessible accordion). Render from a hardcoded array in the frontmatter.

**Section heading pattern** (FeatureGrid.astro lines 28-36):
```astro
<h2
  class="text-center"
  style="
    font-size: var(--text-heading);
    font-weight: 600;
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
    margin-bottom: var(--space-xl);
  "
>
```

**Divider line pattern** (Footer.astro line 4):
```astro
border-top: 1px solid var(--color-divider)
```

**Custom disclosure marker CSS** — override browser default triangle:
```css
details > summary {
  list-style: none;
}
details > summary::marker,
details > summary::-webkit-details-marker {
  display: none;
}
```

---

### `src/components/charts/RecoveryChart.astro` (component, event-driven)

**Analog:** `src/components/MobileMenu.astro` (bundled `<script>` pattern for browser JS, lines 97-152)

**Bundled script pattern** (MobileMenu.astro lines 97-99 — note: MobileMenu uses `<script>` NOT `<script is:inline>`):
```astro
<script>
  // ES module imports work here — bundled by Vite
  const menu = document.getElementById("mobile-menu");
```

**For Chart.js, follow this same bundled script pattern:**
```astro
---
// No frontmatter imports needed — Chart.js loaded in script tag
---
<div style="max-width: 600px; margin: 0 auto; padding: var(--space-md) 0;">
  <canvas
    id="recovery-chart"
    aria-label="Bar chart showing recovery score components: HRV, resting heart rate, sleep, wellness"
    role="img"
    style="width: 100%; height: auto;"
  ></canvas>
</div>

<script>
  import Chart from 'chart.js/auto';

  // Color constants derived from global.css design tokens
  const COLOR_ACCENT = '#2B5240';     // --color-accent
  const COLOR_TEXT_3 = '#AFABA5';     // --color-text-3
  const COLOR_DIVIDER = '#CFCBC5';    // --color-divider
  const COLOR_SURFACE = '#EDEAE6';    // --color-surface

  const canvas = document.getElementById('recovery-chart') as HTMLCanvasElement;
  if (canvas) {
    new Chart(canvas, { /* chart config */ });
  }
</script>
```

**CRITICAL:** Use `<script>` (bundled, no `is:inline`) for Chart.js because it requires `import`. Use `<script is:inline>` ONLY for code that does not import npm packages (like the IntersectionObserver IIFE in LandingCTA.astro).

---

### `src/components/charts/AcwrChart.astro` (component, event-driven)

**Analog:** `src/components/MobileMenu.astro` — same bundled script pattern as RecoveryChart.astro above.

Same `<canvas>` + `<script>` structure. Use `id="acwr-chart"` instead of `id="recovery-chart"`. Chart type: `'line'` with two datasets (acute 7-day EWMA, chronic 28-day EWMA).

---

### `src/pages/features/recovery-scoring.astro` (page, request-response)

**Analog:** `src/pages/index.astro` — exact pattern

**Full page pattern** (index.astro lines 1-14 — copy and adapt):
```astro
---
import FeaturePageLayout from '../../layouts/FeaturePageLayout.astro';
import RecoveryChart from '../../components/charts/RecoveryChart.astro';
import recoveryScreenshot from '../../assets/screenshots/recovery.png';
---
<FeaturePageLayout
  title="Recovery Scoring"
  description="Know exactly how hard to push today. Tuwa synthesizes HRV, resting heart rate, sleep, and wellness into a single daily readiness score."
  ogImage="/og/recovery-scoring.png"
  screenshot={recoveryScreenshot}
  screenshotAlt="..."
  outcomeStatement="..."
  hookLine="..."
>
  <!-- slot content: <section> blocks starting at h2, data-animate on each -->
</FeaturePageLayout>
```

**Key: one layout import + named layout component + slot content.** Pages have no structural HTML of their own — all structure lives in the layout.

---

### `src/pages/features/workload-tracking.astro`, `src/pages/features/smart-templates.astro`, `src/pages/features/cold-start.astro` (pages, request-response)

**Analog:** `src/pages/index.astro` — identical pattern to recovery-scoring.astro above.

Only differences per page:
- `title`, `description`, `ogImage` props
- `screenshot` prop (or omitted for cold-start, which uses placeholder)
- `screenshotAlt`, `outcomeStatement`, `hookLine` props
- Slot content (copy unique to each feature)
- AcwrChart used on workload-tracking instead of RecoveryChart

---

### `src/pages/features/coaching.astro` (page, request-response)

**Analog:** `src/pages/index.astro` — same pattern but uses `CoachingPageLayout` instead of `FeaturePageLayout`.

```astro
---
import CoachingPageLayout from '../../layouts/CoachingPageLayout.astro';
---
<CoachingPageLayout
  title="Coach + Athlete"
  description="..."
  ogImage="/og/coaching.png"
  ...
>
  <!-- Standard slot: h2 sections -->
  <!-- Named slot coach-athlete: coach vs athlete perspective sections -->
</CoachingPageLayout>
```

---

### `src/pages/privacy.astro` (page, request-response)

**Analog:** `src/pages/index.astro` — same one-import, one-layout-component pattern.

```astro
---
import LegalPageLayout from '../layouts/LegalPageLayout.astro';
---
<LegalPageLayout title="Privacy Policy" lastUpdated="March 27, 2026">
  <!-- Migrated content from ~/Desktop/Tonus/PRIVACY.md -->
  <!-- Starts at <h2> — h1 is owned by LegalPageLayout -->
  <h2>What Data We Collect</h2>
  <p>...</p>
</LegalPageLayout>
```

---

### `src/pages/terms.astro` (page, request-response)

**Analog:** `src/pages/index.astro` — identical to privacy.astro pattern, different content source.

```astro
---
import LegalPageLayout from '../layouts/LegalPageLayout.astro';
---
<LegalPageLayout title="Terms of Service" lastUpdated="April 10, 2026">
  <!-- Migrated content from ~/Desktop/Tonus/TERMS.md -->
</LegalPageLayout>
```

---

### `src/pages/support.astro` (page, request-response)

**Analog:** `src/pages/index.astro` — same pattern, but uses `BaseLayout` directly (no `LegalPageLayout` — support has FAQ component + contact section, not pure prose).

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import FaqAccordion from '../components/FaqAccordion.astro';
---
<BaseLayout
  title="Support"
  description="Get help with Tuwa — frequently asked questions and contact information."
>
  <div style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
    <div class="mx-auto px-6" style="max-width: 680px;">
      <h1 style="font-size: var(--text-heading); font-weight: 600; color: var(--color-text-1);">
        Support
      </h1>
      <FaqAccordion />
      <!-- Contact section -->
    </div>
  </div>
</BaseLayout>
```

---

### `public/_redirects` (config, transform)

**No analog** — plain text file, no existing match in codebase.

**Pattern from RESEARCH.md** (verified against Cloudflare Pages docs):
```
/privacy.html    /privacy    301
/terms.html      /terms      301
/support.html    /support    301
```

Place at `public/_redirects`. Astro copies `public/` to `dist/` at build time. Cloudflare Pages reads `dist/_redirects` and processes redirects at the edge before serving static files.

---

### `src/styles/global.css` (modify: add @plugin directive)

**Analog:** existing file — self-modification

**Current state** (global.css lines 1-3):
```css
/* src/styles/global.css */
/* Tailwind v4 — uses @import directive, not @tailwind directives */
@import "tailwindcss";
```

**Add after line 3:**
```css
@plugin "@tailwindcss/typography";
```

This activates the `prose` utility class used by `LegalPageLayout.astro`. Must be added before any legal page is built or the `prose` class will not apply. This is a Wave 0 task.

---

## Shared Patterns

### CSS Custom Property Tokens
**Source:** `src/styles/global.css` (lines 9-61)
**Apply to:** All new components and layouts — never hardcode hex values in Astro markup

Always use `var(--color-*)`, `var(--space-*)`, `var(--text-*)`, `var(--leading-*)`, `var(--tracking-*)`, `var(--radius-*)` tokens. For Chart.js (which requires string values in JS options), declare hex constants at the top of the `<script>` block derived from the token values:
```astro
<script>
  const COLOR_ACCENT = '#2B5240';    // --color-accent
  const COLOR_TEXT_3 = '#AFABA5';    // --color-text-3
  const COLOR_DIVIDER = '#CFCBC5';   // --color-divider
</script>
```

### Scroll Animation
**Source:** `src/styles/global.css` (lines 86-109) + `src/components/LandingCTA.astro` (lines 89-106)
**Apply to:** All section elements in new layouts and pages

1. Add `data-animate` attribute to every top-level `<section>` element.
2. CSS in `global.css` handles initial opacity/transform state — no extra CSS needed.
3. IntersectionObserver in `FeatureCTA.astro` (copied from LandingCTA lines 89-106) fires `is-visible` class.
4. Include this observer script ONCE per page — in `FeatureCTA.astro` only.

### App Store Link
**Source:** `src/config.ts` (line 4) + `src/components/LandingCTA.astro` (line 2)
**Apply to:** `FeatureCTA.astro`, any page-level CTA

```astro
import { APP_STORE_URL } from '../config';
// or relative path: '../../config' from deeper paths
```

Always import from `config.ts`. Never hardcode `https://apps.apple.com/app/tuwa`.

### External Link Safety
**Source:** `src/components/LandingCTA.astro` (line 56) + `src/components/Footer.astro` (line 18)
**Apply to:** All `<a target="_blank">` links

```astro
rel="noopener noreferrer"
```

Always include on external links. Already established pattern — do not deviate.

### Section Layout Container
**Source:** `src/components/LandingCTA.astro` (lines 21-22) + `src/components/FeatureGrid.astro` (lines 25-26)
**Apply to:** All new section-level content blocks

```astro
<div class="mx-auto max-w-6xl px-6" style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
```

Full-width sections use `max-w-6xl`. Prose/legal containers use inline `max-width: 680px`.

### Minimum Touch Target
**Source:** `src/components/Header.astro` (lines 76-80) + `src/components/MobileMenu.astro` (line 37)
**Apply to:** All interactive elements (links, buttons, summary elements)

```astro
style="min-height: 44px;"
```

All tappable elements must be at least 44px tall. Apply to `<summary>` in FaqAccordion and any CTA buttons.

### Heading Hierarchy Contract
**Source:** `src/components/Hero.astro` (line 13 comment)
**Apply to:** All page-level layouts

- Each page has exactly ONE `<h1>`. The layout component owns the `<h1>` (via `outcomeStatement` or `title` prop).
- Slot content and sub-components always start at `<h2>`.
- This is enforced by the layout component structure, not by runtime checks.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `public/_redirects` | config | transform | No redirect configuration exists in the project; Cloudflare-specific plain text format |

---

## Implementation Order (from RESEARCH.md recommendation)

Follow this order to front-load reusable infrastructure before page content:

1. **Wave 0 (infrastructure):** Add `@plugin "@tailwindcss/typography"` to `global.css`; run `npm run build` to verify
2. **Wave 1 (components):** `ScreenshotBlock.astro`, `FeatureCTA.astro` (with IntersectionObserver), `FeaturePageLayout.astro`
3. **Wave 2 (standard feature pages):** 4 standard pages (recovery-scoring, workload-tracking, smart-templates, cold-start)
4. **Wave 3 (coaching):** `CoachingPageLayout.astro` + `coaching.astro`
5. **Wave 4 (charts):** `RecoveryChart.astro`, `AcwrChart.astro` (requires `npm install chart.js` first)
6. **Wave 5 (legal):** `LegalPageLayout.astro`, `FaqAccordion.astro`, `privacy.astro`, `terms.astro`, `support.astro`
7. **Wave 6 (redirects):** `public/_redirects`

---

## Metadata

**Analog search scope:** `src/` directory — all 9 existing `.astro` files read, `src/config.ts` read, `src/styles/global.css` read
**Files scanned:** 11
**Pattern extraction date:** 2026-05-11
