# Phase 12: Device Frame Realism - Context

**Gathered:** 2026-05-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Make CSS iPhone device frames look like physical hardware — with layered shadow falloff, a proportional Dynamic Island, visible side buttons (all 4), and screenshots that fit without misalignment. Pure CSS enhancement of existing DeviceFrame.astro component.

</domain>

<decisions>
## Implementation Decisions

### Shadow Depth & Layering
- **D-01:** Soft natural falloff with 4-5 graduated shadow layers (tight/dark → wide/faint) — mimics object on desk under diffuse light
- **D-02:** Subtle inset shadow on screen interior — display looks physically recessed into the bezel (DFRM-04)
- **D-03:** Keep existing inset highlight lines (top white, bottom dark) on the bezel for edge realism

### Dynamic Island
- **D-04:** Proportional pill shape — width ~32% of screen width, ~2.7:1 aspect ratio (matching real iPhone 15 Pro)
- **D-05:** No camera dot detail — clean pill only
- **D-06:** Scales with frame width (260px, 300px, 320px breakpoints)

### Side Buttons
- **D-07:** All 4 buttons: action button + volume up + volume down (left side), power button (right side)
- **D-08:** Proportionally scaled — button positions and sizes use relative units or calc() to stay correct at all 3 frame widths
- **D-09:** Current approach uses ::before/::after pseudo-elements with box-shadow for multi-button on same side — extend this pattern for 4 buttons

### Screenshot Fit
- **D-10:** Fix extra border/gap issue — screenshots should fill to bezel edge with no visible gap
- **D-11:** Match iPhone 15 Pro aspect ratio exactly (393:852) — ensure screenshots exported at this ratio
- **D-12:** Fix padding/border-radius mismatch causing the gap — diagnose exact cause (likely inner border-radius vs image edge)
- **D-13:** Keep object-fit:cover — no zoom hack; fix the root cause instead

### Claude's Discretion
- Exact shadow opacity values and blur radii for each layer — tune visually against travertine/white backgrounds
- Inset shadow intensity — subtle enough not to darken screenshot edges noticeably
- Whether to migrate inline styles to global.css classes or keep in component — pick cleaner approach
- Button color treatment (match bezel gradient or flat color)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Device Frame Component
- `src/components/DeviceFrame.astro` — Current component with inline styles (bezel, Dynamic Island, screen area, home indicator)
- `src/styles/global.css` lines 397-422 — `.device-frame` class with ::before/::after side button pseudo-elements

### Existing Patterns
- `src/styles/global.css` lines 1-60 — Design token system in :root (follow same pattern if adding device frame tokens)
- `src/layouts/FeaturePageLayout.astro` — Uses DeviceFrame component (integration point)
- `src/layouts/CoachingPageLayout.astro` — Uses DeviceFrame component (integration point)
- `src/components/Hero.astro` — Uses DeviceFrame in hero section

### Requirements
- `.planning/REQUIREMENTS.md` — DFRM-01 through DFRM-05

### Prior Phase Context
- `.planning/phases/11-css-foundation-token-system/11-CONTEXT.md` — Phase 11 decisions (weight tokens, view transitions — no direct impact but establishes pattern)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `DeviceFrame.astro` component — well-structured with props for src, alt, loading, widths, className
- `.device-frame` CSS class — already has ::before/::after for side buttons (extend, don't replace)
- Design token pattern in `:root` — could add device-frame-specific tokens if needed

### Established Patterns
- Inline styles on DeviceFrame.astro for bezel, Dynamic Island, screen area — may want to migrate to global.css for maintainability
- Responsive sizing via Tailwind utility classes on outer wrapper: `max-w-[260px] sm:max-w-[300px] lg:max-w-[320px]`
- CSS pseudo-elements + box-shadow for multiple buttons on same side (volume up + down currently as single element with box-shadow offset)

### Integration Points
- DeviceFrame used in: Hero.astro, FeaturePageLayout.astro, CoachingPageLayout.astro
- All feature deep-dive pages and hero section will be affected by shadow/proportion changes
- Screenshot images in `src/assets/screenshots/` — may need re-export if aspect ratio doesn't match 393:852

</code_context>

<specifics>
## Specific Ideas

- Shadow should feel like phone sitting on a desk under soft diffuse lighting — premium, not dramatic
- Gap issue is the primary screenshot problem — extra border/gap visible between image edge and frame border
- Real iPhone 15 Pro Dynamic Island is 126×37.33pt at 393pt screen width (~32% width, ~2.7:1 ratio)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 12-device-frame-realism*
*Context gathered: 2026-05-15*
