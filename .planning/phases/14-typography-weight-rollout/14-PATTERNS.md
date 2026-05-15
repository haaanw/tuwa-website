# Phase 14: Typography Weight Rollout - Pattern Map

**Mapped:** 2026-05-15
**Files analyzed:** 21 files (8 components + 4 layouts + 7 pages + global.css)
**Analogs found:** 21 / 21 (all files are being modified, not created — each file is its own analog)

---

## File Classification

| File | Role | Data Flow | Analog / Pattern Source | Match Quality |
|------|------|-----------|-------------------------|---------------|
| `src/components/Hero.astro` | component | transform | Self — `<style>` block pattern | exact |
| `src/components/StatsCounter.astro` | component | transform | Self — inline `style=""` pattern | exact |
| `src/components/Footer.astro` | component | transform | Self — inline `style=""` pattern | exact |
| `src/components/MobileMenu.astro` | component | transform | Self — inline `style=""` pattern (consolidation candidate) | exact |
| `src/components/FaqAccordion.astro` | component | transform | Self — `<style>` block pattern | exact |
| `src/components/FeatureGrid.astro` | component | transform | Self — `<style>` block + inline `style=""` | exact |
| `src/components/FeatureCTA.astro` | component | transform | Self — `<style>` block | exact |
| `src/components/LandingCTA.astro` | component | transform | Self — `<style>` block | exact |
| `src/layouts/FeaturePageLayout.astro` | layout | transform | `src/layouts/LegalPageLayout.astro` | exact |
| `src/layouts/CoachingPageLayout.astro` | layout | transform | `src/layouts/FeaturePageLayout.astro` | exact |
| `src/layouts/LegalPageLayout.astro` | layout | transform | Self | exact |
| `src/layouts/BlogPostLayout.astro` | layout | transform | Self | exact |
| `src/pages/blog/index.astro` | page | transform | `src/pages/support.astro` | role-match |
| `src/pages/support.astro` | page | transform | Self | exact |
| `src/pages/features/recovery-scoring.astro` | page | transform | Self — inline h2/h3 pattern | exact |
| `src/pages/features/workload-tracking.astro` | page | transform | `src/pages/features/recovery-scoring.astro` | exact |
| `src/pages/features/smart-templates.astro` | page | transform | `src/pages/features/recovery-scoring.astro` | exact |
| `src/pages/features/coaching.astro` | page | transform | `src/pages/features/recovery-scoring.astro` | exact |
| `src/pages/features/cold-start.astro` | page | transform | `src/pages/features/recovery-scoring.astro` | exact |
| `src/styles/global.css` (6 selectors) | config | transform | Self — CSS class rules | exact |

---

## Token Reference (Single Source of Truth)

**Source:** `src/styles/global.css` lines 80–83

```css
/* Phase 11 — Font Weight Tokens — General Sans variable axis (200-700) */
--weight-display: 200;  /* hero headlines 48px+ — maximum editorial lightness */
--weight-heading: 300;  /* section titles, page titles */
--weight-body:    500;  /* paragraphs, nav links, descriptions */
--weight-label:   600;  /* micro text, legal, all-caps captions */
```

**Decision-to-token mapping (locked):**
| Element category | Token | Replaces |
|-----------------|-------|---------|
| Hero headlines / display text | `var(--weight-display)` | `600` or `700` |
| Page titles, section h1/h2 headings | `var(--weight-heading)` | `600` |
| Body paragraphs, descriptions, nav/footer links, feature copy, FAQ answers | `var(--weight-body)` | `400` or `600` |
| CTA buttons, legal text, captions, FAQ questions, footer logo | `var(--weight-label)` | `600` |
| StatsCounter big numbers | `var(--weight-display)` | `700` |

---

## Pattern Assignments

### Pattern A: `<style>` Block Replacement

**Applies to:** `Hero.astro`, `FaqAccordion.astro`, `FeatureCTA.astro`, `LandingCTA.astro`, `FeatureGrid.astro`, all 4 layouts, `blog/index.astro`, `support.astro`, `coaching.astro`

Replace the numeric literal inside the CSS rule with `var(--weight-*)`. Leave all other declarations untouched.

---

### `src/components/Hero.astro` (component, `<style>` block)

**Current state** (lines 13–14, inline style on `<h1>`):
```html
<h1
  class="hero-headline"
  style="
    font-weight: 600;
    line-height: var(--leading-display);
    letter-spacing: var(--tracking-display);
    color: var(--color-text-1);
  "
>
```

**After migration:**
```html
<h1
  class="hero-headline"
  style="
    font-weight: var(--weight-display);
    line-height: var(--leading-display);
    letter-spacing: var(--tracking-display);
    color: var(--color-text-1);
  "
>
```

**Decision:** D-01 — hero headline → `--weight-display` (200). Biggest visible shift on landing page.

---

### `src/components/StatsCounter.astro` (component, inline `style=""`, 3 instances)

**Current state** (lines 22, 31, 40 — identical pattern):
```html
<span
  class="tabular-nums"
  data-counter-target="1200"
  data-counter-suffix="+"
  style="font-size: var(--text-display); font-weight: 700; line-height: var(--leading-display); color: var(--color-text-1);"
>
```

**After migration (all 3 spans):**
```html
<span
  class="tabular-nums"
  data-counter-target="1200"
  data-counter-suffix="+"
  style="font-size: var(--text-display); font-weight: var(--weight-display); line-height: var(--leading-display); color: var(--color-text-1);"
>
```

**Decision:** D-06 — stat numbers → `--weight-display` (200). Most dramatic visual shift in the codebase (700 → 200).

---

### `src/components/Footer.astro` (component, inline `style=""`, 4 instances)

**Current state:**

Logo link (line 12):
```html
<a href="/" aria-label="Tuwa home" class="inline-block"
  style="font-size: var(--text-heading); font-weight: 600; color: var(--color-text-1); letter-spacing: var(--tracking-heading);">
```

Section headers — 3 identical instances (lines 36, 48, 57):
```html
<p style="color: var(--color-text-1); font-weight: 600; margin-bottom: var(--space-sm);">Features</p>
<p style="color: var(--color-text-1); font-weight: 600; margin-bottom: var(--space-sm);">Resources</p>
<p style="color: var(--color-text-1); font-weight: 600; margin-bottom: var(--space-sm);">Legal</p>
```

**After migration:**

Logo link → `--weight-label` (D-04, footer logo is label-level):
```html
<a href="/" aria-label="Tuwa home" class="inline-block"
  style="font-size: var(--text-heading); font-weight: var(--weight-label); color: var(--color-text-1); letter-spacing: var(--tracking-heading);">
```

Section headers → `--weight-body` (D-07, footer section headers are middle-ground):
```html
<p style="color: var(--color-text-1); font-weight: var(--weight-body); margin-bottom: var(--space-sm);">Features</p>
```

---

### `src/components/MobileMenu.astro` (component, 4× inline `style=""` + 1× `<style>`, consolidation candidate)

**Current state** — 4 identical long inline style strings (lines 39, 48, 57, 66):
```html
<a
  href="/features/recovery-scoring"
  class="block"
  style="padding: var(--space-sm) var(--space-md); color: var(--color-text-1); text-decoration: none; font-size: var(--text-heading); font-weight: 600; border-radius: var(--radius-md); min-height: 44px; display: flex; align-items: center;"
>
```

CTA link (line 84):
```html
style="
  background-color: var(--color-accent);
  color: var(--color-accent-fg);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  font-weight: 600;
  text-decoration: none;
  font-size: var(--text-body);
  width: 100%;
  min-height: 44px;
"
```

**After migration — option B (class consolidation, recommended for 4 repetitions):**

Add to component `<style>` block (new block if none exists):
```html
<style>
  .mobile-nav-link {
    padding: var(--space-sm) var(--space-md);
    color: var(--color-text-1);
    text-decoration: none;
    font-size: var(--text-heading);
    font-weight: var(--weight-body);
    border-radius: var(--radius-md);
    min-height: 44px;
    display: flex;
    align-items: center;
  }
</style>
```

Nav links simplified:
```html
<a href="/features/recovery-scoring" class="block mobile-nav-link">Features</a>
<a href="/features/coaching" class="block mobile-nav-link">Coaching</a>
<a href="/blog" class="block mobile-nav-link">Blog</a>
<a href="/support" class="block mobile-nav-link">Support</a>
```

CTA link (inline var replacement, not class — it has distinct visual treatment):
```html
style="
  background-color: var(--color-accent);
  color: var(--color-accent-fg);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  font-weight: var(--weight-label);
  text-decoration: none;
  font-size: var(--text-body);
  width: 100%;
  min-height: 44px;
"
```

**Decisions:** D-08 (nav links → `--weight-body`), D-04 (CTA → `--weight-label`), D-09 (class consolidation at discretion).

---

### `src/components/FaqAccordion.astro` (component, `<style>` block, 3 instances)

**Current state** (lines 38–56 `<style>` block, plus inline styles on h2 and summary):

`<style>` block — `::after` pseudo-element marker (line 49):
```css
details > summary::after {
  content: '+';
  font-size: 20px;
  font-weight: 400;
  color: var(--color-text-3);
  transition: transform 150ms ease;
}
```

`<h2>` inline (line 61):
```html
<h2
  style="
    font-size: var(--text-heading);
    font-weight: 600;
    ...
  "
>
```

`<summary>` inline (line 75):
```html
<summary
  style="
    padding: var(--space-md) 0;
    font-weight: 600;
    ...
  "
>
```

`<p>` answer text (line 88 — no font-weight, currently inheriting from body):
```html
<p style="padding-bottom: var(--space-md); color: var(--color-text-2); line-height: var(--leading-body);">
```

**After migration:**

`::after` marker (decorative icon, NOT a design weight — leave at 400, not a migration target):
```css
/* No change — font-weight: 400 on a decorative '+' glyph is not a design token target */
details > summary::after {
  font-weight: 400;
}
```

`<h2>` FAQ section title → `--weight-heading`:
```html
<h2
  style="
    font-size: var(--text-heading);
    font-weight: var(--weight-heading);
    ...
  "
>
```

`<summary>` question text → `--weight-label` (D-04, FAQ questions are label-level):
```html
<summary
  style="
    padding: var(--space-md) 0;
    font-weight: var(--weight-label);
    ...
  "
>
```

`<p>` answer text — add explicit `font-weight` (D-05, bump from inherited 400 to body token):
```html
<p style="padding-bottom: var(--space-md); color: var(--color-text-2); line-height: var(--leading-body); font-weight: var(--weight-body);">
```

**Note on `::after`:** The `font-weight: 400` on the `+`/`−` decorative icon glyph is not a hardcoded design weight — it controls the stroke weight of a punctuation character and is not within the scope of this migration. Do not replace it.

---

### `src/components/FeatureGrid.astro` (component, inline h2 + global.css wheel classes)

**Note:** `FeatureGrid.astro` is the iPod-style wheel component. The file's own `<h2>` section title uses an inline style. The `wheel-segment-label`, `wheel-center-title`, and `wheel-center-cta` classes live in `global.css` (covered in the global.css section below).

**Current state** — `<h2>` inline (lines 9–18):
```html
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
  Everything you need to train without guessing
</h2>
```

**After migration:**
```html
<h2
  class="text-center"
  style="
    font-size: var(--text-heading);
    font-weight: var(--weight-heading);
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
    margin-bottom: var(--space-xl);
  "
>
```

**Decision:** D-02 — section h2 → `--weight-heading` (300).

---

### `src/components/FeatureCTA.astro` (component, inline `<h2>`)

**Current state** (lines 14–22):
```html
<h2
  style="
    font-size: var(--text-heading);
    font-weight: 600;
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
  "
>
```

**After migration:**
```html
<h2
  style="
    font-size: var(--text-heading);
    font-weight: var(--weight-heading);
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
  "
>
```

**Decision:** D-02 — CTA heading (h2) → `--weight-heading` (300).

---

### `src/components/LandingCTA.astro` (component, inline `<h2>`)

**Current state** (lines 10–19) — identical pattern to `FeatureCTA.astro`:
```html
<h2
  style="
    font-size: var(--text-heading);
    font-weight: 600;
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
  "
>
```

**After migration:** Same replacement as `FeatureCTA.astro` above — `font-weight: var(--weight-heading)`.

---

### `src/layouts/FeaturePageLayout.astro` (layout, inline `<h1>`)

**Current state** (lines 23–33):
```html
<h1
  style="
    font-size: var(--text-display);
    font-weight: 600;
    line-height: var(--leading-display);
    letter-spacing: var(--tracking-display);
    color: var(--color-text-1);
  "
>
```

**After migration:**
```html
<h1
  style="
    font-size: var(--text-display);
    font-weight: var(--weight-heading);
    line-height: var(--leading-display);
    letter-spacing: var(--tracking-display);
    color: var(--color-text-1);
  "
>
```

**Decision:** D-02 — page title h1 → `--weight-heading` (300). Applied to `outcomeStatement` prop rendered as h1.

---

### `src/layouts/CoachingPageLayout.astro` (layout, inline `<h1>`)

**Current state** (lines 23–33) — identical to `FeaturePageLayout.astro`:
```html
<h1
  style="
    font-size: var(--text-display);
    font-weight: 600;
    ...
  "
>
```

**After migration:** Same replacement — `font-weight: var(--weight-heading)`.

---

### `src/layouts/LegalPageLayout.astro` (layout, inline `<h1>`)

**Current state** (lines 14–23):
```html
<h1
  style="
    font-size: var(--text-heading);
    font-weight: 600;
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
  "
>
```

**After migration:**
```html
<h1
  style="
    font-size: var(--text-heading);
    font-weight: var(--weight-heading);
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
  "
>
```

**Decision:** D-02 — legal page title h1 → `--weight-heading` (300). Used by Privacy, Terms, and Support pages.

---

### `src/layouts/BlogPostLayout.astro` (layout, inline `<h1>`)

**Current state** (lines 29–38):
```html
<h1
  style="
    font-size: var(--text-heading);
    font-weight: 600;
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
    margin-top: var(--space-lg);
  "
>
```

**After migration:**
```html
<h1
  style="
    font-size: var(--text-heading);
    font-weight: var(--weight-heading);
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
    margin-top: var(--space-lg);
  "
>
```

**Decision:** D-02 — blog post title h1 → `--weight-heading` (300).

---

### `src/pages/blog/index.astro` (page, 2 instances)

**Current state:**

Page title h1 (lines 15–24):
```html
<h1
  style="
    font-size: var(--text-heading);
    font-weight: 600;
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
  "
>
  Blog
</h1>
```

Blog listing post titles h2 (lines 47–54):
```html
<h2
  style="
    font-size: var(--text-body);
    font-weight: 600;
    color: var(--color-text-1);
    margin-top: var(--space-xs);
  "
>
```

**After migration:**

Page title h1 → `--weight-heading`:
```html
<h1
  style="
    font-size: var(--text-heading);
    font-weight: var(--weight-heading);
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
  "
>
```

Post listing h2 → `--weight-heading` (D-02, these are section/card headings):
```html
<h2
  style="
    font-size: var(--text-body);
    font-weight: var(--weight-heading);
    color: var(--color-text-1);
    margin-top: var(--space-xs);
  "
>
```

---

### `src/pages/support.astro` (page, 2 instances)

**Current state:**

Contact h2 (lines 11–19):
```html
<h2
  style="
    font-size: var(--text-heading);
    font-weight: 600;
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
  "
>
  Contact us
</h2>
```

Contact button link (line 36–40):
```html
style="
  ...
  font-weight: 600;
  ...
"
```

**After migration:**

Contact h2 → `--weight-heading`:
```html
<h2
  style="
    font-size: var(--text-heading);
    font-weight: var(--weight-heading);
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
  "
>
```

Contact button → `--weight-label` (D-04, it is a CTA/button):
```html
style="
  ...
  font-weight: var(--weight-label);
  ...
"
```

---

### Pattern B: Feature Page Inline h2/h3 Replacement

**Applies to:** `recovery-scoring.astro`, `workload-tracking.astro`, `smart-templates.astro`, `cold-start.astro`, `coaching.astro`

All feature pages use the same inline style pattern on h2 and h3 elements within their section content slots.

**Current state — canonical example from `recovery-scoring.astro`:**

h2 (line 45):
```html
<h2 style="font-size: var(--text-heading); font-weight: 600; line-height: var(--leading-heading); letter-spacing: var(--tracking-heading); color: var(--color-text-1); margin-bottom: var(--space-lg);">
  How it works
</h2>
```

h3 at heading size (line 64):
```html
<h3 style="font-size: var(--text-heading); font-weight: 600; line-height: var(--leading-heading); letter-spacing: var(--tracking-heading); color: var(--color-text-1); margin-bottom: var(--space-lg);">
  Data from any device you already own
</h3>
```

h3 at body size (line 54):
```html
<h3 style="font-size: var(--text-body); font-weight: 600; color: var(--color-text-1); margin-top: var(--space-xl);">
  Three zones, clear guidance
</h3>
```

**After migration — all h2 and h3 → `--weight-heading` (D-02, locked decision):**

h2:
```html
<h2 style="font-size: var(--text-heading); font-weight: var(--weight-heading); line-height: var(--leading-heading); letter-spacing: var(--tracking-heading); color: var(--color-text-1); margin-bottom: var(--space-lg);">
```

h3 at heading size:
```html
<h3 style="font-size: var(--text-heading); font-weight: var(--weight-heading); line-height: var(--leading-heading); letter-spacing: var(--tracking-heading); color: var(--color-text-1); margin-bottom: var(--space-lg);">
```

h3 at body size:
```html
<h3 style="font-size: var(--text-body); font-weight: var(--weight-heading); color: var(--color-text-1); margin-top: var(--space-xl);">
```

**IMPORTANT NOTE on h3 at body size:** Per D-02, all h2/h3 headings map to `--weight-heading` (300) regardless of their `font-size`. An h3 at `--text-body` size carrying weight 300 will appear lighter than surrounding paragraph text (weight 500). This is a deliberate inversion — the contrast comes from weight, not size alone. This is a locked decision. Mark for visual verification after the wave completes.

**Per-file occurrence count:**
- `recovery-scoring.astro` — 4 occurrences (lines 45, 54, 64, 74)
- `workload-tracking.astro` — 4 occurrences (same pattern)
- `smart-templates.astro` — 4 occurrences (same pattern)
- `cold-start.astro` — 5+ occurrences (RESEARCH.md A1: more than UI-SPEC estimate, use live grep to confirm)
- `coaching.astro` — 6 occurrences (includes named-slot sections)

---

### Pattern C: `src/styles/global.css` (6 selectors, lines 169/233/251/580/669/696)

These rules stay in `global.css`. Replace numeric literals with token vars in-place.

**Current state:**

Line 169:
```css
.nav-logo {
  font-size: var(--text-heading);
  font-weight: 600;
  color: var(--color-text-1);
  letter-spacing: var(--tracking-heading);
  text-decoration: none;
}
```

Line 233:
```css
.nav-dropdown-title {
  display: block;
  font-size: var(--text-body);
  font-weight: 600;
  color: var(--color-text-1);
  line-height: var(--leading-body);
}
```

Line 251:
```css
.btn-cta {
  background-color: var(--color-accent);
  color: var(--color-accent-fg);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  font-weight: 600;
  ...
}
```

Line 580:
```css
.wheel-segment-label {
  fill: var(--color-text-1);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  ...
}
```

Line 669:
```css
.wheel-center-title {
  font-size: var(--text-body);
  font-weight: 600;
  color: var(--color-text-1);
  line-height: var(--leading-heading);
}
```

Line 696:
```css
.wheel-center-cta {
  font-size: var(--text-label);
  font-weight: 600;
  color: var(--color-accent);
  letter-spacing: var(--tracking-label);
}
```

**After migration:**

```css
/* Line 169 */
.nav-logo        { font-weight: var(--weight-label); }   /* 600→600 no visual change */

/* Line 233 */
.nav-dropdown-title { font-weight: var(--weight-label); } /* 600→600 no visual change */

/* Line 251 */
.btn-cta         { font-weight: var(--weight-label); }   /* 600→600 no visual change */

/* Line 580 */
.wheel-segment-label { font-weight: var(--weight-label); } /* 700→600 slight reduction */

/* Line 669 */
.wheel-center-title  { font-weight: var(--weight-body); }  /* 600→500 subtle drop */

/* Line 696 */
.wheel-center-cta    { font-weight: var(--weight-label); } /* 600→600 no visual change */
```

**DISCREPANCY NOTE (from RESEARCH.md):** The UI-SPEC labels line 696 as a second `.wheel-center-title` mobile media query block. This is incorrect — line 696 is the `.wheel-center-cta` selector. Verified by live grep 2026-05-15. Token assignment (`--weight-label`) is the same either way.

**ANTI-PATTERN:** Do NOT touch the `@font-face` declaration:
```css
/* This line declares the font file's supported weight RANGE — not a design value */
/* Do NOT replace with a var */
@font-face {
  font-weight: 200 700;  /* ← leave exactly as-is */
}
```

---

## Shared Patterns

### The One Migration Rule

Every replacement in this phase follows exactly one of these two forms:

**Form 1 — Inline style attribute:**
```
font-weight: 600;   →   font-weight: var(--weight-heading);
font-weight: 700;   →   font-weight: var(--weight-display);
font-weight: 400;   →   font-weight: var(--weight-body);
```

**Form 2 — CSS `<style>` block or global.css rule:**
```css
/* Before */
.classname { font-weight: 600; }

/* After */
.classname { font-weight: var(--weight-heading); }
```

The decision table in CONTEXT.md decisions D-01 through D-08 is the authoritative lookup for which token to use per element type.

### Verification Gate (run after each wave)

```bash
grep -rn "font-weight: [0-9]" src/ --include="*.astro" --include="*.css"
```

- Must return 0 results after Wave 3 is complete
- The `@font-face` range (`font-weight: 200 700`) does NOT match this pattern — naturally excluded
- Run after Wave 1 (components), Wave 2 (layouts), and Wave 3 (pages + global.css)

### Class Consolidation Guidance

Only consolidate to a new CSS class when:
1. 3+ sibling elements share an identical long inline style string (primary trigger: MobileMenu 4 nav links)
2. The class is placed in the **component's own `<style>` block** (Astro scopes it automatically — it will not leak to child components)
3. The class is not needed globally (no new classes in global.css for this phase)

---

## No Analog Found

Not applicable. This phase modifies 21 existing files. No new files are created.

---

## Wave Execution Order

| Wave | Files | Target count | Rationale |
|------|-------|-------------|-----------|
| 1 — Components | Hero, StatsCounter, Footer, MobileMenu, FaqAccordion, FeatureGrid, FeatureCTA, LandingCTA | 23 occurrences | Biggest visual shifts (Hero, StatsCounter); components are independent units |
| 2 — Layouts | FeaturePageLayout, CoachingPageLayout, LegalPageLayout, BlogPostLayout | 4 occurrences | Layout changes cascade to all pages using them |
| 3 — Pages + global.css | blog/index, support, recovery-scoring, workload-tracking, smart-templates, coaching, cold-start, global.css | 20 + 6 occurrences | Pages last; global.css closes the loop |

---

## Metadata

**Analog search scope:** `src/components/`, `src/layouts/`, `src/pages/`, `src/styles/`
**Files scanned:** 21 `.astro` files + `global.css`
**Verified occurrences:** 53 in `.astro` files + 6 in `global.css` = 59 total (RESEARCH.md: live grep 2026-05-15)
**Pattern extraction date:** 2026-05-15
