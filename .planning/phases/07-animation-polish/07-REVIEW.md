---
phase: 07-animation-polish
reviewed: 2026-05-12T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - src/components/FeatureGrid.astro
  - src/components/Hero.astro
  - src/layouts/BaseLayout.astro
  - src/pages/features/recovery-scoring.astro
  - src/styles/global.css
findings:
  critical: 0
  warning: 3
  info: 2
  total: 5
status: issues_found
---

# Phase 07: Code Review Report

**Reviewed:** 2026-05-12
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Five files from the animation-polish phase were reviewed: the global stylesheet, the base layout (which owns the IntersectionObserver animation controller), the Hero component, the FeatureGrid component, and the recovery-scoring feature page. The animation architecture itself is sound — the JS-gated, reduced-motion-aware reveal system in `BaseLayout.astro` and `global.css` is correctly implemented. The hero entrance animations use `fill-mode: both` correctly to prevent FOUC. Three issues warrant attention before ship: broken links on four feature cards, a `display` property conflict on the card anchor element, and an inconsistent heading hierarchy on the recovery-scoring page that breaks semantic document structure.

---

## Warnings

### WR-01: Four feature card links point to non-existent pages

**File:** `src/components/FeatureGrid.astro:62–124`

**Issue:** Cards 2–5 link to `/features/workload-tracking`, `/features/smart-templates`, `/features/cold-start`, and `/features/coaching`. The comment on line 2 acknowledges these are Phase 3 pages that have not been created. As written, clicking any of these cards produces a 404. The links are fully rendered, hover states are active, and nothing in the UI signals they are placeholders. Users will click them.

**Fix:** While the destination pages are under development, disable the links to prevent dead ends. Two options:

Option A — Replace `<a>` with `<div>` and add a visual "coming soon" cue (no interactive element, no broken link):
```astro
<!-- Card 2: Workload Tracking — page not yet live -->
<li data-animate data-animate-delay="100ms">
  <div class="feature-card" aria-label="Workload Tracking — coming soon">
    <!-- icon, label, title, body unchanged -->
    <span style="font-size: var(--text-label); color: var(--color-text-3);">Coming soon</span>
  </div>
</li>
```

Option B — Keep `<a>` tags but add `aria-disabled="true"`, `tabindex="-1"`, and a CSS `pointer-events: none` rule so they are inert until pages ship:
```css
.feature-card[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.5;
}
```
```astro
<a href="/features/workload-tracking" class="feature-card block transition-colors duration-150"
   aria-disabled="true" tabindex="-1">
```

---

### WR-02: Conflicting `display` declarations on feature card anchor

**File:** `src/components/FeatureGrid.astro:48, 63, 82, 98, 112`

**Issue:** Each card's `<a>` element carries both the `feature-card` CSS class (which sets `display: flex` via the component `<style>` block) and the Tailwind utility class `block` (which sets `display: block`). The `flex` layout is load-bearing — it uses `gap: var(--space-sm)` to space the icon, label, title, and body text. If `display: block` wins the cascade, `gap` has no effect and all four spans collapse into a block flow without controlled spacing.

In practice, Astro scopes the component `<style>` block with an attribute selector (e.g., `[data-astro-cid-xxx]`), which raises its specificity above plain Tailwind utilities. The `flex` likely wins today. But this is an implementation detail of Astro's scoping mechanism and is not guaranteed to remain stable across Astro version upgrades. The `block` class is also misleading to future readers.

**Fix:** Remove the redundant `block` class from all five card anchors:
```astro
<!-- Before -->
<a href="/features/recovery-scoring" class="feature-card block transition-colors duration-150">

<!-- After -->
<a href="/features/recovery-scoring" class="feature-card transition-colors duration-150">
```

---

### WR-03: Inconsistent heading hierarchy on recovery-scoring page

**File:** `src/pages/features/recovery-scoring.astro:45, 64, 74`

**Issue:** The sticky scroll section uses `<h2>` for Step 1 ("How it works", line 45) and `<h3>` for Steps 2 and 3 ("Data from any device you already own", line 64; "A baseline that's yours, not the population's", line 74). All three step headings are visually styled identically (both use `var(--text-heading)` font-size, weight 600). The semantic mismatch means Steps 2 and 3 are subordinate to Step 1 in the document outline, which is incorrect — they are peers.

Screen readers and search engines parse the heading hierarchy. A heading tree of `h2 → h3 → h3` inside a section implies "h3s are subsections of the h2", which misrepresents the content. Step 1's heading should also be `<h3>` (Steps are subsections of the page-level section), or all three should be `<h2>`.

**Fix:** Make all three step headings the same level. Since the section is a subsection of the feature page (which has its own `<h1>` and `<h2>` from `FeaturePageLayout`), `<h3>` is the appropriate level for all steps:
```astro
<!-- Step 1: change h2 to h3 -->
<h3 style="font-size: var(--text-heading); font-weight: 600; ...">
  How it works
</h3>

<!-- Step 2 and 3: already h3, no change needed -->
```

---

## Info

### IN-01: Magic number in device frame button shadow offset

**File:** `src/styles/global.css:157`

**Issue:** The volume button spacing uses `box-shadow: 0 36px 0 #2A2A2A` to render the second volume button via shadow offset. The `36px` value is a magic number with no token or comment explaining its origin (it represents the gap between the two volume button segments on the iPhone 15 Pro frame).

**Fix:** Add an inline comment explaining the magic number so it can be maintained alongside the frame dimensions:
```css
.device-frame::before {
  /* ...existing props... */
  box-shadow: 0 36px 0 #2A2A2A; /* 36px = gap to second volume button */
}
```

---

### IN-02: Sticky scroll observer may miss steps on short viewports

**File:** `src/pages/features/recovery-scoring.astro:133–148`

**Issue:** The `StickyScrollController` uses `threshold: 0.5`, requiring 50% of a scroll-step element to be visible before it becomes active. Each scroll-step has `padding-top` and `padding-bottom` of `var(--space-3xl)` (64px each), making step elements tall. On a landscape phone (viewport height ~375px), a step element taller than 750px will never reach 50% intersection, so its `is-active` state and dot indicator will never update.

The sticky column is hidden on mobile (`max-width: 767px`), so the dot indicators are not visible on mobile, but the text `is-active` styling (which uses `opacity` fade per the scroll-step CSS) may also be affected.

**Fix:** Lower the threshold to `0.3` or use `rootMargin` to trigger earlier:
```js
var observer = new IntersectionObserver(function (entries) {
  // ...
}, { threshold: 0.3 }); // was 0.5 — reduced for short landscape viewports
```

---

_Reviewed: 2026-05-12_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
