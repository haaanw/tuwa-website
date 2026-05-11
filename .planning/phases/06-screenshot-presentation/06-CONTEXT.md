# Phase 6: Screenshot Presentation - Context

**Gathered:** 2026-05-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Make every app screenshot on the site crisp, Retina-ready, and displayed inside a professional CSS iPhone device frame. Delivers SHOT-01 through SHOT-05. Does not add new illustrations, animation, or layout changes beyond what's needed for the device frame component.

</domain>

<decisions>
## Implementation Decisions

### Device Frame Design
- **D-01:** Detailed CSS-only iPhone bezel — visible frame border, side buttons (volume/power as pseudo-elements), dynamic island/camera cutout at top. Pure CSS, no SVG overlay or image assets. Should look realistic enough to read as "iPhone" at a glance.
- **D-02:** Dark frame color (near-black or very dark gray) to contrast against the warm travertine page background.

### Screenshot Sourcing
- **D-03:** Use existing screenshots as-is — they're already 1206-1320px wide, which is ~3x for iPhone 15 Pro (393pt). No manual re-export step needed.
- **D-04:** Pages without screenshots (coaching, cold-start) get the DeviceFrame component with a styled placeholder inside (gradient background + "Coming soon" text). Ship the frame now, add real screenshots later.

### Hero Mockup
- **D-05:** Claude's discretion on hero frame treatment — may be same DeviceFrame component or enhanced with subtle perspective/shadow. The hero should feel polished and premium.
- **D-06:** Design direction for overall site aesthetic: "precision and concise data/science combined with simplistic, alive, blending-with-art feeling." Inspired by Henri Matisse black cut-out moving figures. Reference: contralabs.com. For Phase 6, this informs hero backdrop treatment. Full illustration system is Phase 8 scope.

### Responsive Sizing
- **D-07:** Claude's discretion on responsive frame sizing. Frames should look good across mobile/tablet/desktop without being rigidly fixed.

### Image Optimization
- **D-08:** Use Astro `<Image>` component with proper `widths` prop for srcset/DPR handling — replace the fixed `width={320}` approach in current ScreenshotBlock.
- **D-09:** Hero image must have `loading="eager"` and `fetchpriority="high"` — it's the LCP element. Feature page screenshots use default lazy loading.

### Claude's Discretion
- Exact frame dimensions, border widths, and corner radii
- Whether to include a home indicator bar at bottom of frame
- Responsive breakpoint sizing strategy (fixed vs fluid)
- Hero perspective angle or shadow enhancement level
- Placeholder styling for missing screenshots

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Screenshot Components
- `src/components/ScreenshotBlock.astro` — Current component to replace with DeviceFrame (width=320, no srcset)
- `src/components/Hero.astro` — Hero section using dashboard.png with rounded-[44px], needs DeviceFrame
- `src/layouts/FeaturePageLayout.astro` — Imports ScreenshotBlock, passes screenshot prop
- `src/layouts/CoachingPageLayout.astro` — Imports ScreenshotBlock, passes screenshot prop

### Existing Screenshots
- `src/assets/screenshots/dashboard.png` — 1320x2868 (hero)
- `src/assets/screenshots/recovery.png` — 1206x2622 (recovery-scoring page)
- `src/assets/screenshots/workload.png` — 1206x2622 (workload-tracking page)
- `src/assets/screenshots/active-workout.png` — 1206x2622 (smart-templates page)

### Feature Pages Using Screenshots
- `src/pages/features/recovery-scoring.astro` — has screenshot
- `src/pages/features/workload-tracking.astro` — has screenshot
- `src/pages/features/smart-templates.astro` — has screenshot
- `src/pages/features/coaching.astro` — NO screenshot (placeholder)
- `src/pages/features/cold-start.astro` — NO screenshot (placeholder)

### Requirements
- `.planning/REQUIREMENTS.md` -- SHOT-01 through SHOT-05 definitions

### Design Reference
- contralabs.com — reference for artistic style (Matisse-inspired, science+art blend)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ScreenshotBlock.astro` — has Image import, isFramed prop, placeholder div with aspect-ratio 9/19.5. Replace with DeviceFrame component.
- `Hero.astro` — uses Image component with eager loading. Needs DeviceFrame wrapper.
- Astro `<Image>` component — already imported throughout, handles WebP/AVIF conversion.

### Established Patterns
- Image imports use `import x from '../assets/screenshots/x.png'` (TypeScript ImageMetadata type)
- Layouts pass `screenshot?: ImageMetadata` and `screenshotAlt: string` as props
- `isFramed` prop pattern exists but currently only controls box-shadow (no actual frame)
- Design tokens in global.css for colors, spacing, radii — use these in DeviceFrame

### Integration Points
- `FeaturePageLayout.astro` line 51 — where ScreenshotBlock is rendered (swap to DeviceFrame)
- `CoachingPageLayout.astro` line 51 — same swap point
- `Hero.astro` line 44 — Image component needs DeviceFrame wrapper
- 5 feature page files pass screenshot imports to their layout

</code_context>

<specifics>
## Specific Ideas

- **Matisse art direction:** User envisions site blending data precision with organic, alive artistic feeling. Henri Matisse black moving figure cut-outs as inspiration. Reference contralabs.com for how artistic elements integrate with product content. Phase 6 scope is limited to device frames, but hero backdrop treatment should be informed by this direction.
- **iPhone 15 Pro as reference device:** Frame should match current iPhone proportions (dynamic island, not notch).

</specifics>

<deferred>
## Deferred Ideas

- **Matisse illustration system** — Full implementation of Matisse-inspired black cut-out figures as site-wide artistic accents (hero backdrop, footer, section dividers). Belongs in Phase 8 (UI/UX Visual Depth) where broader visual identity work happens.
- **Coaching + cold-start screenshots** — Real screenshot exports from Xcode Simulator to replace placeholders. Separate task when those app screens are finalized.

</deferred>

---

*Phase: 06-screenshot-presentation*
*Context gathered: 2026-05-11*
