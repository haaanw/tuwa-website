# Phase 2: Landing Page - Context

**Gathered:** 2026-05-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Landing page at tuwa.app with centered hero (headline + device mockup + App Store CTA), a 5-card feature overview grid linking to deep-dive pages, scroll-triggered animations, and a desktop-aware CTA section with QR code. This is the primary download conversion surface.

</domain>

<decisions>
## Implementation Decisions

### Hero Section
- **D-01:** Centered layout — headline and subtitle above, device mockup below, App Store badge between them. Stacks naturally on mobile.
- **D-02:** Device mockup styled in a Dieter Rams aesthetic — honest, minimal, functional presentation. Claude picks the exact treatment (flat with rounded corners, minimal bezel, or similar). The goal is to clearly show the app without ornamental framing.
- **D-03:** Headline should differentiate Tuwa for serious athletes vs generic fitness trackers. Emphasize why Tuwa serves this audience better — evidence-based workload management, not another step counter. Claude picks the wording, outcome-led or problem-led.

### Feature Grid
- **D-04:** Minimal card density — icon + title + one-line description per card. Cards are teasers that invite click-through to deep-dive pages.
- **D-05:** 5 feature cards: Recovery Scoring, Workload Tracking, Smart Templates, Cold-Start Onboarding, Coaching. Each links to its Phase 3 deep-dive page.

### Scroll Animations
- **D-06:** Subtle and elegant — no dramatic motion. Quiet, professional transitions. CSS + IntersectionObserver per LAND-03 requirement. No JS animation framework.

### Desktop CTA
- **D-07:** Desktop visitors see both a QR code (linking to App Store) and the standard App Store badge together. Mobile visitors see badge only (QR unnecessary on phone).

### Final CTA Section
- **D-08:** Page ends with a reinforcing CTA section (LAND-04) — App Store badge with closing copy. Desktop version includes QR code per D-07.

### Claude's Discretion
- Grid arrangement for 5 feature cards (D-05) — Claude picks based on Rams-inspired minimal aesthetic and 5-card constraint
- Which sections get scroll animations (D-06) — Claude picks based on page rhythm and the calm, authoritative aesthetic
- Hero headline wording (D-03) — Claude picks, must differentiate for serious athletes
- Device mockup exact treatment (D-02) — Dieter Rams aesthetic, Claude picks implementation

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `~/Desktop/Tonus/DESIGN.md` — App color tokens, spacing scale, typography. Web tokens derive from this per D-01 (Phase 1).
- `src/styles/global.css` — Live design tokens: travertine palette, forest green accent (#2B5240), Alpino font, spacing scale, type scale (display 48px, heading 28px, body 16px).

### Existing Assets
- `~/Desktop/Tonus/AppStoreMetadata.md` — App Store description, feature list, and marketing copy. Use for headline inspiration and feature card descriptions.

### Project Configuration
- `CLAUDE.md` — Technology stack (Astro 6, Tailwind v4 via @tailwindcss/vite, no adapter, CSS IntersectionObserver for animations).

### Phase 1 Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Foundation decisions: travertine palette (D-01), forest green accent for CTAs (D-02), web softness 4-8px radius with subtle shadows (D-03), header nav links (D-04), footer structure (D-05), light mode only (D-06).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/Header.astro` — Nav with "Get the App" CTA button already built
- `src/components/Footer.astro` — Multi-column footer with App Store badge
- `src/components/SEO.astro` — Meta tags, OG tags, canonical URL
- `src/layouts/BaseLayout.astro` — Full page shell (SEO, font preload, header, footer). Landing page content goes in the slot.

### Established Patterns
- Design tokens via CSS custom properties in `global.css` (not Tailwind config)
- Alpino font loaded via Astro Fonts API with preload
- No client-side JS frameworks — inline scripts only (MobileMenu pattern)
- Light mode only — no dark mode tokens or media queries

### Integration Points
- `src/pages/index.astro` — Currently a placeholder. Will become the full landing page.
- Feature card links point to `/features/[slug]` or similar — routes created in Phase 3.
- App Store URL needed for badge and QR code (from AppStoreMetadata.md or App Store Connect).

</code_context>

<specifics>
## Specific Ideas

- Dieter Rams / Braun aesthetic for device mockup — "less but better." Honest presentation of the app, no glossy marketing tricks.
- International Style Minimalism continues from app — calm, authoritative, warm (travertine).
- Headline must answer "why Tuwa over Whoop/Garmin/TrainingPeaks" for serious athletes — evidence-based workload management, not vanity metrics.
- Cards should feel like an invitation to learn more, not a complete feature dump.
- Animations should be felt, not noticed.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-landing-page*
*Context gathered: 2026-05-10*
