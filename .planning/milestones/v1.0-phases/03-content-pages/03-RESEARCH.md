# Phase 3: Content Pages - Research

**Researched:** 2026-05-11
**Domain:** Astro content pages — feature deep-dives, legal/support, Chart.js islands, Cloudflare redirects
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-03:** 4 feature pages share an identical reusable layout component. Coaching page gets extra sections for coach vs athlete perspective, team features, and invite flow — it targets a distinct audience.
- **D-04:** Screenshots are a mix — some ready, some need placeholders. Build with placeholder image blocks where screenshots aren't available yet; swap in real screenshots later.
- **D-05:** Long-form copy (800-1200 words per feature page). Deep enough to explain methodology without jargon walls.
- **D-06:** Claude drafts all feature page copy based on AppStoreMetadata.md and app knowledge. User reviews and iterates on wording after pages are built.
- **D-07:** Content structure is outcome-first — lead with what the athlete GETS, then deeper science sections explaining how the algorithm works. Comprehensive but concise methodology explanations.
- **D-08:** Interactive charts and graphs on feature pages where relevant (ACWR trends, recovery scoring visualization). Implemented as Astro islands with a lightweight chart library. This is in-scope for Phase 3, not deferred.
- **D-09:** Legal pages match the site aesthetic — same travertine palette, Alpino font, BaseLayout with header/footer. Clean prose container for legal content. Not a separate minimal style.
- **D-10:** "Bevel style" reference is a general quality bar — clean, well-formatted legal prose with good typography, clear sections, readable. Not a pixel-match to any specific page.
- **D-11:** Support page contains FAQ section (5-8 common questions) plus contact email address.
- **D-12:** Privacy and Terms content migrated from existing source files (~/Desktop/Tonus/PRIVACY.md and ~/Desktop/Tonus/TERMS.md).

### Claude's Discretion

- **D-01:** Page structure (hero + alternating sections + CTA vs long-form scroll). Pick based on marketing best practices and Rams-inspired aesthetic from Phase 2.
- **D-02:** Screenshot treatment (device mockup vs bare screenshots with rounded corners/shadow). Pick for visual consistency with landing page hero.
- **D-13:** Redirect implementation for old GitHub Pages URLs (same domain, tuwa.app). Old .html URLs (/privacy.html, /terms.html, /support.html) redirect to clean new routes with 301 permanent redirects.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FEAT-01 | Recovery Scoring page — HRV + RHR + sleep + wellness synthesized into single readiness score with plain-language explanations | Content from AppStoreMetadata.md + PRIVACY.md methodology notes; RecoveryChart island for visualization |
| FEAT-02 | Workload Tracking page — EWMA-based ACWR monitoring, session spike detection, personal record tracking | Content from AppStoreMetadata.md; AcwrChart island; Recovery_framed.png + Workload_framed.png screenshots available |
| FEAT-03 | Smart Templates page — prescribed workouts with named exercise groups, target sets, weight/rep goals | Content from AppStoreMetadata.md; placeholder screenshot (no specific screenshot available) |
| FEAT-04 | Cold-Start Onboarding page — how Tuwa bootstraps from zero data, manages baseline expectations honestly | Content from AppStoreMetadata.md; placeholder screenshot |
| FEAT-05 | Coaching page — coach-athlete sync, real-time recovery visibility, prescribed workouts, invite via code/email/NFC | Content from AppStoreMetadata.md; Coach+Athlete section from TERMS.md; placeholder or Dashboard screenshot |
| FEAT-06 | Each feature page has unique OG meta tags and screenshot | SEO.astro already accepts ogImage prop; per-page ogImage prop in FeaturePageLayout |
| FEAT-07 | Consistent feature page layout component (hero, explanation, screenshot, CTA) | FeaturePageLayout.astro + CoachingPageLayout.astro (two layouts, one for 4 standard pages, one for coaching) |
| FEAT-08 | Copy tone is accessible-credible — plain language backed by science, no jargon walls | D-07 outcome-first structure; copy drafted from AppStoreMetadata.md |
| LEGAL-01 | Privacy Policy page migrated from existing markdown | Source: ~/Desktop/Tonus/PRIVACY.md (confirmed readable, 80 lines, clean markdown) |
| LEGAL-02 | Terms of Service page migrated from existing markdown | Source: ~/Desktop/Tonus/TERMS.md (confirmed readable, 70 lines, clean markdown) |
| LEGAL-03 | Support page with FAQ and contact info | Source: ~/Desktop/Tonus/docs/support.html (5 existing FAQ items; spec calls for 8, so 3 new questions to add) |
| LEGAL-04 | URL redirects from old GitHub Pages URLs | public/_redirects file, 3 rules: /privacy.html -> /privacy, /terms.html -> /terms, /support.html -> /support (all 301) |

</phase_requirements>

---

## Summary

Phase 3 builds 8 content pages on an already-working Astro 6 + Tailwind v4 foundation. The work divides into three independent tracks: (1) 5 feature deep-dive pages sharing a reusable layout, (2) 3 legal/support pages migrating existing content into the site aesthetic, and (3) cross-cutting infrastructure — Chart.js interactive islands, URL redirects, and screenshot asset preparation.

The existing codebase is in good shape for this phase. `BaseLayout.astro`, `SEO.astro`, `LandingCTA.astro`, `FeatureGrid.astro`, and the scroll animation system in `global.css` are all already built and can be composed directly. The `@astrojs/mdx` and `@tailwindcss/typography` packages are already installed, so legal pages can be rendered from MDX with prose styles at zero additional install cost.

The one new dependency is Chart.js 4.5.1 [VERIFIED: npm registry]. Charts must be implemented using Astro's bundled `<script>` tag (not `client:*` island directives) because Chart.js is vanilla JavaScript — no framework adapter needed. The `_redirects` file goes in `public/` and requires zero configuration beyond three plain-text lines [VERIFIED: Cloudflare Pages docs].

**Primary recommendation:** Build in this order — (1) FeaturePageLayout + ScreenshotBlock + FeatureCTA infrastructure, (2) 4 standard feature pages, (3) CoachingPageLayout + Coaching page, (4) Chart.js islands, (5) LegalPageLayout + Privacy/Terms/Support pages, (6) _redirects file and OG image configuration. This order lets the plan front-load reusable components before page-level content.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Feature page content (copy, structure) | Static HTML (Astro) | — | No dynamic data; pure content pages |
| Feature page layout | Astro layout component | BaseLayout | FeaturePageLayout wraps BaseLayout; coaching variant extends it |
| Screenshot display with fallback | Astro component (ScreenshotBlock) | — | Accepts optional `src`; renders placeholder when absent |
| App Store CTA | Astro component (FeatureCTA) | config.ts | Reuses APP_STORE_URL from existing config constant |
| Interactive charts | Browser (Canvas / Chart.js) | Astro `<script>` | Chart.js must run client-side; Astro bundles and ships JS via `<script>` tag in component |
| Legal page content | MDX + @tailwindcss/typography | LegalPageLayout | MDX renders markdown from PRIVACY.md / TERMS.md content into prose-styled HTML |
| URL redirects | Cloudflare Pages edge | public/_redirects | Static redirect file; no server code; processed by Cloudflare before origin |
| OG meta tags per page | Astro SSG head (SEO.astro) | — | SEO component already accepts ogImage prop; pass unique value per feature page |
| Scroll animations | Browser (IntersectionObserver) | global.css | Existing [data-animate] pattern from Phase 2 — no new code needed |
| FAQ accordion | Browser (native `<details>`) | — | `<details>/<summary>` is keyboard-accessible with zero JS |

---

## Standard Stack

### Core (already installed — [VERIFIED: package.json])

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^6.3.1 | Static page generation, routing, component model | Already in project |
| @astrojs/mdx | ^5.0.4 | MDX rendering for legal pages | Already in project |
| @tailwindcss/typography | ^0.5.19 | Prose styles for legal MDX content | Already in project — apply `prose` class on container |
| tailwindcss | ^4.3.0 | Utility CSS, spacing helpers | Already in project |

### New Dependency

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| chart.js | ^4.5.1 | Canvas-based interactive charts | [VERIFIED: npm registry 2026-05-11] Vanilla JS, no React dependency, ~50KB gzipped, standard in Astro Chart.js patterns. Used for RecoveryChart and AcwrChart components. |

**Installation:**
```bash
npm install chart.js
```

### Supporting (already present — zero install)

| Asset | Location | Used By |
|-------|----------|---------|
| Dashboard_framed.png | `src/assets/screenshots/dashboard.png` | Already in Hero — **not** reused on feature pages (feature pages use bare screenshots per D-02) |
| Recovery_framed.png | `~/Desktop/Tonus/appstore screenshots/6"3/Recovery_framed.png` | Recovery Scoring feature page screenshot — copy to `src/assets/screenshots/` |
| Workload_framed.png | `~/Desktop/Tonus/appstore screenshots/6"3/Workload_framed.png` | Workload Tracking feature page screenshot — copy to `src/assets/screenshots/` |
| ActiveWorkout_framed.png | `~/Desktop/Tonus/appstore screenshots/6"3/ActiveWorkout_framed.png` | Smart Templates or Coaching page — available if needed |
| LandingCTA.astro | `src/components/LandingCTA.astro` | Reference for FeatureCTA — adapt, don't duplicate; remove QR code for feature context |

**Screenshots available for:** Recovery Scoring, Workload Tracking, Smart Templates (ActiveWorkout fits), Coaching (Dashboard fits).
**Placeholders needed for:** Cold-Start Onboarding (no matching screenshot exists).

---

## Architecture Patterns

### System Architecture Diagram

```
Request: /features/recovery-scoring
        |
BaseLayout.astro (SEO head, font preload, Header, Footer)
        |
FeaturePageLayout.astro (accepts: title, description, ogImage, screenshot, screenshotAlt, ctaHeading)
        |
+-------------------------------------------------------------+
|  Hero section [data-animate]                                 |
|    h1 outcome statement -> p hook -> App Store badge         |
+-------------------------------------------------------------+
|  Screenshot section [data-animate]                           |
|    ScreenshotBlock.astro (src? -> <Image> : placeholder)     |
+-------------------------------------------------------------+
|  Explanation section [data-animate]                          |
|    h2 "How it works" -> body paragraphs (800-1200 words)     |
+-------------------------------------------------------------+
|  Science section [data-animate] (--color-surface bg)         |
|    h2 "The science behind it" -> copy -> Chart island        |
|    RecoveryChart.astro or AcwrChart.astro                    |
|      -> <canvas> + bundled <script> (Chart.js)               |
+-------------------------------------------------------------+
|  FeatureCTA section [data-animate]                           |
|    "Download on the App Store" -> APP_STORE_URL              |
+-------------------------------------------------------------+
IntersectionObserver script (reused from LandingCTA.astro)

Request: /privacy (or /privacy.html -> 301 -> /privacy)
        |
public/_redirects (Cloudflare edge processes .html URLs)
        | (for /privacy)
BaseLayout.astro
        |
LegalPageLayout.astro (max-width: 680px prose container)
        |
MDX content (PRIVACY.md migrated) + @tailwindcss/typography prose
```

### Recommended Project Structure

```
src/
├── assets/
│   └── screenshots/          # Feature page screenshots (WebP via <Image>)
│       ├── dashboard.png     # Already present
│       ├── recovery.png      # Copy from Tonus repo
│       ├── workload.png      # Copy from Tonus repo
│       └── active-workout.png # Copy from Tonus repo (if needed)
├── components/
│   ├── charts/
│   │   ├── RecoveryChart.astro   # Canvas + bundled script (Chart.js)
│   │   └── AcwrChart.astro       # Canvas + bundled script (Chart.js)
│   ├── FeatureCTA.astro          # Adapted from LandingCTA; no QR code
│   ├── ScreenshotBlock.astro     # Conditional: <Image> or placeholder div
│   └── ... (existing)
├── layouts/
│   ├── BaseLayout.astro          # Already present — unchanged
│   ├── FeaturePageLayout.astro   # New: wraps BaseLayout, standard 4 pages
│   ├── CoachingPageLayout.astro  # New: extends FeaturePageLayout with extra sections
│   └── LegalPageLayout.astro     # New: prose container for legal pages
├── pages/
│   ├── index.astro               # Already present — unchanged
│   ├── features/
│   │   ├── recovery-scoring.astro
│   │   ├── workload-tracking.astro
│   │   ├── smart-templates.astro
│   │   ├── cold-start.astro
│   │   └── coaching.astro
│   ├── privacy.astro             # Renders migrated PRIVACY.md content
│   ├── terms.astro               # Renders migrated TERMS.md content
│   └── support.astro             # FAQ + contact
└── content/                      # (Optional) Could use MDX content collections for legal pages
                                  # OR inline MDX directly in page files — simpler for 2 pages
public/
├── og/                           # Per-page OG images (1200x630 PNGs)
│   ├── recovery-scoring.png
│   ├── workload-tracking.png
│   ├── smart-templates.png
│   ├── cold-start.png
│   └── coaching.png
└── _redirects                    # 3 Cloudflare Pages redirect rules
```

### Pattern 1: Reusable Feature Page Layout

`FeaturePageLayout.astro` accepts props and renders the full section structure, so individual feature pages contain only their content (copy, screenshot path, h1 text):

```astro
---
// src/layouts/FeaturePageLayout.astro
import BaseLayout from './BaseLayout.astro';
import ScreenshotBlock from '../components/ScreenshotBlock.astro';
import FeatureCTA from '../components/FeatureCTA.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
  screenshot?: ImageMetadata;
  screenshotAlt: string;
  outcomeStatement: string;   // h1 content
  hookLine: string;           // p subtitle
}

const { title, description, ogImage, screenshot, screenshotAlt, outcomeStatement, hookLine } = Astro.props;
---
<BaseLayout {title} {description} {ogImage}>
  <!-- Hero -->
  <section data-animate style="padding-top: var(--space-3xl); padding-bottom: var(--space-2xl);">
    <div class="mx-auto text-center" style="max-width: 768px; padding: 0 var(--space-md);">
      <h1 style="font-size: var(--text-display); font-weight: 600; ...">
        {outcomeStatement}
      </h1>
      <p style="color: var(--color-text-2); margin-top: var(--space-lg);">{hookLine}</p>
      <!-- App Store badge (mobile) — same markup as Hero.astro -->
    </div>
  </section>

  <!-- Screenshot -->
  <section data-animate style="padding-bottom: var(--space-3xl);">
    <ScreenshotBlock src={screenshot} alt={screenshotAlt} />
  </section>

  <!-- Explanation + Science — slot for page-specific content -->
  <slot />

  <!-- CTA -->
  <FeatureCTA />
</BaseLayout>
```

Individual feature page files pass only their unique data:

```astro
---
// src/pages/features/recovery-scoring.astro
import { Image } from 'astro:assets';
import FeaturePageLayout from '../../layouts/FeaturePageLayout.astro';
import RecoveryChart from '../../components/charts/RecoveryChart.astro';
import recoveryScreenshot from '../../assets/screenshots/recovery.png';
---
<FeaturePageLayout
  title="Recovery Scoring"
  description="Know exactly how hard to push today. Tuwa synthesizes HRV, resting heart rate, sleep, and wellness into a single daily readiness score."
  ogImage="/og/recovery-scoring.png"
  screenshot={recoveryScreenshot}
  screenshotAlt="Tuwa app showing a recovery score of 78, with HRV trend in yellow zone and sleep 6.5 hours annotated."
  outcomeStatement="Know exactly how hard to push today"
  hookLine="One readiness number built from everything your body is telling you."
>
  <!-- Explanation section -->
  <section data-animate style="...">
    <h2>How it works</h2>
    <p>...</p>
  </section>

  <!-- Science section -->
  <section data-animate style="background-color: var(--color-surface);">
    <h2>The science behind it</h2>
    <p>...</p>
    <RecoveryChart />
  </section>
</FeaturePageLayout>
```

### Pattern 2: ScreenshotBlock with Placeholder Fallback

```astro
---
// src/components/ScreenshotBlock.astro
import { Image } from 'astro:assets';

interface Props {
  src?: ImageMetadata;
  alt: string;
  placeholderLabel?: string;
}

const { src, alt, placeholderLabel = 'Screenshot coming soon' } = Astro.props;
---
<div class="mx-auto" style="max-width: 320px;">
  {src ? (
    <Image
      src={src}
      {alt}
      width={320}
      quality={90}
      format="webp"
      style="border-radius: var(--radius-lg); box-shadow: 0 4px 24px rgba(28,25,21,0.10);"
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

### Pattern 3: Chart.js in Astro Without a Framework

**Critical finding:** Chart.js is vanilla JavaScript. In Astro, the correct approach is to use a bundled `<script>` tag inside the Astro component — NOT `client:*` island directives (those require a UI framework like React/Vue). [VERIFIED: Astro docs - scripts and event handling]

```astro
---
// src/components/charts/AcwrChart.astro
// No frontmatter imports needed — Chart.js loaded in script
---
<div style="max-width: 600px; margin: 0 auto; padding: var(--space-md) 0;">
  <canvas
    id="acwr-chart"
    aria-label="Line chart showing 28-day ACWR trend with chronic load in grey and acute load in forest green"
    role="img"
    style="width: 100%; height: auto;"
  ></canvas>
</div>

<script>
  import Chart from 'chart.js/auto';

  // Sample data — replace with static representative values
  const labels = Array.from({ length: 28 }, (_, i) => `Day ${i + 1}`);
  const acuteLoad = [/* representative values */];
  const chronicLoad = [/* representative values */];

  const canvas = document.getElementById('acwr-chart') as HTMLCanvasElement;
  if (canvas) {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Acute Load (7-day EWMA)',
            data: acuteLoad,
            borderColor: '#2B5240',   // --color-accent
            backgroundColor: 'transparent',
            tension: 0.3,
          },
          {
            label: 'Chronic Load (28-day EWMA)',
            data: chronicLoad,
            borderColor: '#AFABA5',   // --color-text-3
            backgroundColor: 'transparent',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          y: {
            grid: { color: '#CFCBC5' },  // --color-divider
          },
          x: {
            grid: { color: '#CFCBC5' },
          },
        },
      },
    });
  }
</script>
```

**Why `chart.js/auto`:** Registers all chart types automatically. For production optimization, use selective imports (`import { Chart, LineController, ... } from 'chart.js'`) to reduce bundle. For Phase 3, `chart.js/auto` is acceptable.

**Why Astro `<script>` (not `<script is:inline>`):** Bundled scripts get TypeScript support, deduplication, and module resolution. `is:inline` bypasses bundling and cannot use npm imports. [VERIFIED: Astro docs]

### Pattern 4: Legal Pages via Inline MDX

For 2 legal pages, the simplest approach is inline MDX in `.astro` page files rather than a content collection (collections add schema boilerplate for minimal benefit at 2 pages):

```astro
---
// src/pages/privacy.astro
import LegalPageLayout from '../layouts/LegalPageLayout.astro';
---
<LegalPageLayout title="Privacy Policy" lastUpdated="March 27, 2026">
  <h2>What Data We Collect</h2>
  <p>...</p>
  <!-- Migrated content from ~/Desktop/Tonus/PRIVACY.md -->
</LegalPageLayout>
```

**Alternative:** For the support page (which has interactive FAQ), use plain `.astro` with `FaqAccordion` component rather than MDX.

### Pattern 5: Cloudflare Pages _redirects

```
# public/_redirects
/privacy.html    /privacy    301
/terms.html      /terms      301
/support.html    /support    301
```

Rules: placed in `public/` directory, one redirect per line, format: `[source] [destination] [status]`. Cloudflare Pages processes this before serving static files — the `.html` URLs never reach Astro. [VERIFIED: Cloudflare Pages docs]

### Anti-Patterns to Avoid

- **Using `client:*` directives for Chart.js:** Chart.js is vanilla JavaScript — it does not need a framework component wrapper. Use Astro's bundled `<script>` tag instead. `client:visible` requires a React/Vue/Svelte component.
- **Hardcoding color hex values in components:** Use `var(--color-*)` tokens. Chart.js options accept hex strings directly — use the token hex values as constants at the top of the script block.
- **Duplicating the IntersectionObserver script:** LandingCTA.astro already includes the observer that covers all `[data-animate]` elements on the page. If LandingCTA is not included on feature pages (it won't be — FeatureCTA replaces it), include the observer script once in FeatureCTA.astro.
- **Using MDX content collections for 2 static pages:** Collections add `content.config.ts` schema overhead. For 2 legal pages with fixed content, inline the migrated content directly in `.astro` page files.
- **Using the Dashboard_framed.png device mockup on feature pages:** The hero uses a full device mockup (framed PNG). Feature pages use bare screenshots with `border-radius` + `box-shadow` only — no additional frame (D-02). Do not import the `_framed` images with the expectation they will look consistent without a frame.
- **Adding `<h1>` inside FeaturePageLayout AND in the slot content:** Each page must have exactly one `<h1>`. The layout owns the `<h1>` (outcomeStatement prop). Slot content starts at `<h2>`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Prose typography for legal content | Custom paragraph/heading CSS | `@tailwindcss/typography` prose classes | Already installed; handles rhythm, line length, heading hierarchy in one class |
| FAQ accordion toggle | Custom JS toggle | `<details>/<summary>` HTML | Native, keyboard accessible, zero JavaScript required |
| Image format optimization | Manual WebP conversion | Astro `<Image>` component | Auto-generates WebP/AVIF at build time from PNG source |
| URL redirects | Astro middleware or edge function | `public/_redirects` file | Cloudflare Pages processes natively — 3 lines of text |
| App Store URL duplication | Hard-coded URLs in each CTA | `APP_STORE_URL` from `src/config.ts` | Already established in Phase 2 |
| IntersectionObserver per component | Multiple observer instances | Single observer in FeatureCTA (or shared script) | One observer watching all `[data-animate]` on the page is sufficient |

---

## Common Pitfalls

### Pitfall 1: Chart.js `import` in `<script is:inline>`

**What goes wrong:** Using `<script is:inline>` to load Chart.js, then attempting to `import` it — inline scripts cannot use ES module imports.
**Why it happens:** Developers confuse the two script modes. `is:inline` outputs the script verbatim; bundled `<script>` (without `is:inline`) goes through Vite bundler.
**How to avoid:** Always use a regular `<script>` tag (no `is:inline`) when importing npm packages. Astro automatically bundles it.
**Warning signs:** Browser console error "Cannot use import statement outside a module" or "Chart is not defined."

### Pitfall 2: Duplicate IntersectionObserver Registrations

**What goes wrong:** Each component that uses `[data-animate]` includes its own observer script, causing multiple observers to race and potentially fire `is-visible` multiple times.
**Why it happens:** Copy-paste of the observer from LandingCTA.astro into each component.
**How to avoid:** Include the IntersectionObserver script exactly once per page. Place it in `FeatureCTA.astro` (the last component on every feature page) so it initializes after all `[data-animate]` elements are in the DOM.
**Warning signs:** Elements animate twice, or console shows multiple observer instances.

### Pitfall 3: `<Image>` Import Type Mismatch for Optional Screenshots

**What goes wrong:** Passing `undefined` to `<Image src={screenshot}>` when no screenshot is available causes a build-time type error.
**Why it happens:** Astro's `<Image>` component requires `src` to be a resolved `ImageMetadata` — `undefined` is not valid.
**How to avoid:** Use the conditional pattern in `ScreenshotBlock.astro` — only render `<Image>` when `src` is defined; render the placeholder div otherwise.
**Warning signs:** TypeScript error `Type 'undefined' is not assignable to type 'ImageMetadata'` during `astro build`.

### Pitfall 4: OG Image Path Resolution

**What goes wrong:** Passing a relative path like `"../og/recovery-scoring.png"` to `SEO.astro`'s `ogImage` prop causes broken OG previews because `SEO.astro` prepends `siteOrigin` only for paths starting with `/`.
**Why it happens:** The `resolvedOgImage` logic in `SEO.astro` checks `ogImage.startsWith("http")` — it assumes non-http paths start with `/`.
**How to avoid:** Always pass `ogImage` as an absolute-from-root path starting with `/`: `ogImage="/og/recovery-scoring.png"`. Static per-page OG images are generated in Plan 01 and placed in `public/og/`.
**Warning signs:** Social media preview shows the default OG image instead of a feature-specific one.

### Pitfall 5: `_redirects` File Not in `public/`

**What goes wrong:** Placing `_redirects` in the project root or `src/` causes Cloudflare Pages to ignore it.
**Why it happens:** Developers expect the file to behave like other config files in the repo root.
**How to avoid:** Place `_redirects` in `public/` — Astro copies `public/` contents to `dist/` at build time, which is what Cloudflare Pages reads.
**Warning signs:** Old `.html` URLs return 404 instead of redirecting.

### Pitfall 6: `framed.png` Screenshots Have Phone Frame Baked In

**What goes wrong:** The available screenshots (`Recovery_framed.png`, `Workload_framed.png`, etc.) already include a phone device frame in the image. Using them on feature pages alongside the `border-radius` + `box-shadow` treatment creates a doubled-frame visual (frame image + CSS border).
**Why it happens:** The framed PNGs were designed for App Store submission — they have a device mockup baked into the PNG file.
**How to avoid:** Use the framed PNGs as-is (they look fine on a white/travertine bg without additional CSS border/shadow), OR source bare unframed screenshots from the app. Given the Hero section uses `dashboard.png` (framed) with `rounded-[44px]` successfully, the same approach works here — apply only a subtle box-shadow, no additional border-radius that would conflict with the frame corners.
**Decision for implementation:** Treat framed screenshots as full-bleed images (like the hero); use `object-fit: contain` and skip the `border-radius` + `box-shadow`. Use the placeholder approach for Cold-Start.

---

## Content Sources Summary

| Feature Page | Copy Source | Screenshot Available |
|--------------|-------------|---------------------|
| Recovery Scoring | AppStoreMetadata.md "RECOVERY SCORING" section + app algorithm knowledge | Recovery_framed.png (6"3 folder) |
| Workload Tracking | AppStoreMetadata.md "TRAINING LOAD TRACKING" section | Workload_framed.png (6"3 folder) |
| Smart Templates | AppStoreMetadata.md "COACH + ATHLETE" prescribed workouts section | ActiveWorkout_framed.png (6"3 folder) |
| Cold-Start Onboarding | AppStoreMetadata.md + cold-start logic from app knowledge | Placeholder only |
| Coaching | AppStoreMetadata.md "COACH + ATHLETE" full section + invite mechanics | Dashboard_framed.png or placeholder |
| Privacy Policy | ~/Desktop/Tonus/PRIVACY.md (80 lines, clean markdown, last updated March 27 2026) | N/A |
| Terms of Service | ~/Desktop/Tonus/TERMS.md (70 lines, 12 numbered sections, last updated April 10 2026) | N/A |
| Support FAQ | ~/Desktop/Tonus/docs/support.html (5 existing Q&As) + 3 new per UI-SPEC | N/A |

**Contact email across all pages:** hanwenma09@gmail.com (confirmed in PRIVACY.md and TERMS.md)

---

## Code Examples

### Legal Page with Prose Styles

```astro
---
// src/layouts/LegalPageLayout.astro
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  lastUpdated: string;
}

const { title, lastUpdated } = Astro.props;
---
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
      <!-- prose class from @tailwindcss/typography -->
      <div class="prose prose-neutral max-w-none">
        <slot />
      </div>
    </div>
  </div>
</BaseLayout>
```

### FAQ Accordion (Zero JS)

```astro
---
// src/components/FaqAccordion.astro
const faqs = [
  { q: "How does Tuwa calculate my recovery score?", a: "..." },
  // ... more items
];
---
<section style="margin-top: var(--space-2xl);">
  <h2 style="font-size: var(--text-heading); font-weight: 600; margin-bottom: var(--space-xl);">
    Frequently Asked Questions
  </h2>
  <dl>
    {faqs.map(({ q, a }) => (
      <details style="border-bottom: 1px solid var(--color-divider);">
        <summary
          style="
            padding: var(--space-md) 0;
            font-weight: 600;
            cursor: pointer;
            list-style: none;
            min-height: 44px;
            display: flex;
            align-items: center;
          "
        >
          {q}
        </summary>
        <p style="padding-bottom: var(--space-md); color: var(--color-text-2);">{a}</p>
      </details>
    ))}
  </dl>
</section>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tailwind config.js dark mode | `@custom-variant dark` in global.css | Tailwind v4 | Not applicable — project is light-mode only |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` Vite plugin | Tailwind v4 + Astro 5.2+ | Already implemented in this project — no change |
| Chart.js `require()` / CDN script | `import Chart from 'chart.js/auto'` in bundled script | Chart.js v3+ / ESM | Use ESM import in Astro bundled `<script>` |
| Content collections for 2-3 pages | Inline MDX in `.astro` pages | Ongoing best practice | Collections overkill for <5 pages without schema validation benefit |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | Yes | >=22.12.0 (project constraint) | — |
| astro | All pages | Yes | 6.3.1 | — |
| @astrojs/mdx | Legal MDX content | Yes | 5.0.4 | Inline HTML in .astro |
| @tailwindcss/typography | Legal prose styles | Yes | 0.5.19 | Manual prose CSS |
| chart.js | Interactive charts | No | Not installed | Static SVG charts (no interactivity) |
| Screenshots (Recovery, Workload) | Feature pages | Yes | PNGs in ~/Desktop/Tonus/appstore screenshots/6"3/ | Placeholder blocks |
| Screenshots (Smart Templates, Coaching) | Feature pages | Yes (ActiveWorkout, Dashboard) | PNGs in same folder | Placeholder blocks |
| Screenshots (Cold-Start) | Cold-Start page | No | Not available | Placeholder block |
| PRIVACY.md source | LEGAL-01 | Yes | ~/Desktop/Tonus/PRIVACY.md | — |
| TERMS.md source | LEGAL-02 | Yes | ~/Desktop/Tonus/TERMS.md | — |
| support.html source | LEGAL-03 | Yes | ~/Desktop/Tonus/docs/support.html | — |

**Missing dependencies with no fallback:**
- chart.js — must install via `npm install chart.js` before implementing chart components

**Missing dependencies with fallback:**
- Cold-Start screenshot — use `ScreenshotBlock` placeholder (already designed for this case)

---

## Validation Architecture

> workflow.nyquist_validation not explicitly set to false — including this section.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — this is a static site with no test runner configured |
| Config file | None (no vitest.config.*, jest.config.*, or playwright.config.*) |
| Quick run command | `npm run build` (build-time type errors surface here) |
| Full suite command | `npx astro check` (Astro-specific type checking across all components) |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FEAT-01..05 | Feature pages render at correct routes | Smoke (build) | `npm run build` — build fails if routes broken | N/A Wave 0: build succeeds = pages exist |
| FEAT-06 | Unique OG meta per feature page | Manual | Inspect `<head>` in browser or `curl` page | N/A |
| FEAT-07 | All 4 standard pages use same layout | Code review | `grep -r "FeaturePageLayout"` in pages/features/ | N/A |
| FEAT-08 | Copy tone | Manual review | User reviews drafts per D-06 | Manual only |
| LEGAL-01..03 | Legal/support pages render | Smoke (build) | `npm run build` | N/A Wave 0 |
| LEGAL-04 | Redirects configured | Manual | Deploy to Cloudflare + curl /privacy.html | Manual only |
| TypeScript | No prop type errors | Unit (build) | `npx astro check` | N/A Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build` — catches broken imports and missing routes
- **Per wave merge:** `npx astro check` — catches prop type errors in new layouts
- **Phase gate:** `npm run build && npx astro check` succeeds with zero errors before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] No test infrastructure to create — static site, no test runner
- [ ] Type-check command is `npx astro check` — Astro-specific type checking
- [ ] Add `npm run check` to package.json scripts: `"check": "astro check"` for convenience

---

## Security Domain

> security_enforcement not explicitly set to false — including standard assessment.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Static site — no auth |
| V3 Session Management | No | No sessions |
| V4 Access Control | No | All pages public |
| V5 Input Validation | No | No user inputs on content pages (FAQ is read-only `<details>`, no form submissions) |
| V6 Cryptography | No | No secrets handled |

### Known Threat Patterns for Static Marketing Site

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| mailto: link harvesting | Information Disclosure | Already accepted — contact email is intentionally public (hanwenma09@gmail.com) |
| Clickjacking on CTA buttons | Tampering | Cloudflare Pages sets `X-Frame-Options: SAMEORIGIN` by default for Pages projects |
| External link abuse (`target="_blank"`) | Elevation of Privilege | Always use `rel="noopener noreferrer"` on external links — pattern already established in LandingCTA.astro |

**Security posture:** Minimal attack surface. Static HTML only. No form inputs, no auth, no dynamic data. Main risk is external link safety (`rel="noopener noreferrer"`) — already established in codebase.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Cold-Start Onboarding page has no matching screenshot in the Tonus repo | Content Sources Summary | Low — placeholder is already designed for this case |
| A2 | `@tailwindcss/typography` prose classes work with Tailwind v4 in this project without additional configuration | Standard Stack | Medium — if prose classes don't apply, need to add `@plugin "@tailwindcss/typography"` directive in global.css |
| A3 | The framed screenshots (Recovery_framed.png etc.) are appropriate for feature pages despite having device frames baked in | Pitfall 6 | Low — worst case is a slightly heavy visual; placeholders can be swapped in |
| A4 | Chart.js 4.5.1 bundled `<script>` approach works in Astro 6 with Vite 6.4.2 without additional Vite configuration | Pattern 3 | Low — standard ESM import pattern; Vite handles this natively |

---

## Open Questions (RESOLVED)

1. **`@tailwindcss/typography` activation in Tailwind v4** (RESOLVED)
   - Resolution: Plan 03-01 Task 1 adds `@plugin "@tailwindcss/typography";` to `src/styles/global.css` as part of infrastructure setup. This activates prose classes for Tailwind v4.

2. **OG images per feature page** (RESOLVED)
   - Resolution: Plan 03-01 Task 1 generates 5 static 1200x630 PNG OG images (one per feature page) using sharp at build time. Images are placed in `public/og/{slug}.png`. Each feature page passes its unique `ogImage="/og/{slug}.png"` prop. This satisfies FEAT-06 without satori/dynamic generation. Plans 03-03 and 03-04 reference these paths.

3. **`<details>/<summary>` styling for Alpino font** (RESOLVED)
   - Resolution: Plan 03-02 Task 2 (FaqAccordion) uses `list-style: none`, `summary::marker { display: none }`, and `summary::-webkit-details-marker { display: none }` to remove browser default markers. Custom `+`/`-` indicators are added via CSS `::after` pseudo-element on `<summary>`.

---

## Sources

### Primary (HIGH confidence)

- `package.json` (tuwa-website) — confirmed installed packages and versions
- `src/styles/global.css` — confirmed design tokens, scroll animation CSS
- `src/components/SEO.astro`, `src/layouts/BaseLayout.astro`, `src/components/LandingCTA.astro` — confirmed component APIs and patterns
- `src/components/FeatureGrid.astro` — confirmed feature page routes
- `~/Desktop/Tonus/PRIVACY.md` — confirmed content, format, last updated date
- `~/Desktop/Tonus/TERMS.md` — confirmed content, format, last updated date
- `~/Desktop/Tonus/docs/support.html` — confirmed FAQ content (5 items) and contact email
- `~/Desktop/Tonus/AppStoreMetadata.md` — confirmed feature copy source
- `~/Desktop/Tonus/appstore screenshots/6"3/` — confirmed available screenshots (4 PNGs)
- npm registry — Chart.js 4.5.1 [VERIFIED: npm view chart.js version]
- [Cloudflare Pages redirects docs](https://developers.cloudflare.com/pages/configuration/redirects/) — confirmed `_redirects` file format and `public/` placement
- `.planning/phases/03-content-pages/03-UI-SPEC.md` — confirmed component inventory, color tokens, page structure

### Secondary (MEDIUM confidence)

- [Astro docs: Scripts and event handling](https://docs.astro.build/en/guides/client-side-scripts/) — bundled `<script>` vs `is:inline` behavior
- [Astro docs: Islands architecture](https://docs.astro.build/en/concepts/islands/) — `client:*` directives require UI framework components

### Tertiary (LOW confidence)

- Chart.js + Astro bundled script integration pattern — inferred from Astro script documentation; no single authoritative example confirmed for this exact version combination

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified via package.json or npm registry
- Architecture: HIGH — based on existing codebase patterns, not assumptions
- Content sources: HIGH — all source files read and confirmed
- Pitfalls: MEDIUM — based on Astro documentation and common patterns; Chart.js specific pitfall is LOW confidence (see Assumptions Log A4)
- Redirect implementation: HIGH — verified against Cloudflare Pages official docs

**Research date:** 2026-05-11
**Valid until:** 2026-06-11 (stable stack — Astro, Tailwind v4, Chart.js 4.x change infrequently)
