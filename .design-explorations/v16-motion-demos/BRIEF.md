# Tuwa v1.6 website motion demos — shared brief

Goal: demo landing pages for tuwa.app translating the app's **DESIGN.md v5 "Pavilion" (Warm Stone)** system to the web, with rich scroll motion + Lottie. Each demo is ONE self-contained HTML file exploring a distinct motion language. These are direction samples for the founder to pick from, not production code — but they must feel premium and finished.

## Hard rules

- App name is **Tuwa** (never Faros, Tonus, Tutrice). Athlete-only — NO coach features, coach pages, or "for coaches" copy anywhere.
- One HTML file, self-contained CSS/JS inline. Relative asset paths (`assets/...`). CDN allowed only for: lenis, lottie-web (bodymovin).
- Respect `prefers-reduced-motion: reduce` — full content visible, no scroll hijack, counters render final values.
- Light-only. No dark surfaces, no shadows (elevation = plane + hairline + relief gradients). No emoji, no stock icons.

## Pavilion web tokens

```css
--bg:#F0EFEC; --surface:#F4F3F0; --surface-el:#F8F7F4; --surface-el-2:#FCFBF9;
--divider:#D6D3CD; --divider-strong:#CCC9C2;
--text-1:#1B1A17; --text-2:#57544E; --text-3:#8B877F;
--accent:#6F6759; /* travertine — hero readings + live-state marks ONLY, never CTA fill, never labels */
--well-top:#E7E5E0; --well-bottom:#EDEBE6;
--zone-optimal:#3F5A46; --zone-caution:#6E5624; --zone-danger:#7E362E; --zone-low:#46525E;
```

- Corners: cards 12px, controls 8px, pills fully rounded. Nothing else.
- Relief instead of shadows: raised = `linear-gradient(#FCFBF9,#F8F7F4)` + 1px top highlight `rgba(255,255,255,.7)` + 1px hairline border `--divider-strong`. Debossed well = `linear-gradient(#E7E5E0,#EDEBE6)` + inner top edge.
- Type: Instrument Sans only (`assets/fonts/InstrumentSans-Regular.ttf` 400, `InstrumentSans-Medium.ttf` 500). @font-face + `font-display:swap`. Hierarchy by size + the one weight step. Sentence case everywhere; micro-caps (11–12px, +0.08em tracking, uppercase) only for micro labels. Data numerals: `font-variant-numeric: tabular-nums`.
- Web type ramp (desktop): hero display clamp(56px,7vw,96px) w400; section head 32–40 w400; body 17–19; label 15; micro 11–12 caps.
- Spacing on an 8px grid; generous editorial breathing room (96–160px section padding desktop).
- The accent color appears as: hero score numerals, needle/live marks, progress fills, active states. CTAs are **ink-filled pills** (`--text-1` bg, `--surface-el` text), one primary per screen.
- Zone states: text label first, color supplementary. Desaturated zone colors only.

## Motion law (web translation of the app's spring law)

- No bounce, no ease-in. Ease-out / non-bouncy spring feel: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Reveals 300–500ms, stagger 40–80ms. Content never passes through full invisibility mid-scroll (no dip-to-blank handoffs).
- Lenis smooth scroll (CDN: `https://unpkg.com/lenis@1.3.11/dist/lenis.min.js`, init `new Lenis({ autoRaf: true })` — guard with reduced-motion check).
- Scroll-driven scrub effects: use IntersectionObserver + rAF reading `getBoundingClientRect`, or CSS `animation-timeline: scroll()`/`view()` with JS fallback. Must degrade gracefully.
- One "moment of delight" max per screenful (the app's count-up law). Numerals may count up once when entering view (~400ms).

## Assets

- `assets/screens/*.png` — real v1.6 app screenshots, 1320×2868 (iPhone, already includes app chrome; screen corners are square — put them in a device-ish plate: rounded-[48px] mask + 1px hairline + stone bezel, keep it minimal, NO fake titanium gradients).
  - dashboard.png (hero readiness card, score 82, metrics), workload.png (ACWR chart), recovery.png (HRV/sleep trends), workout-log.png (session history), active-workout.png (live logging), movement-bank.png (1,324-exercise catalog), verdict.png (go/modify/hold verdict + microdose), strike-zone.png (strike-zone bar).
- `assets/lottie/needle-sweep.json` — 512×512 readiness gauge: tick arc, travertine needle sweeps −90°→52°, holds, returns. 3.5s loop, stone bg baked in.
- `assets/lottie/verdict-tick.json` — 512×512 check draw-on + calm pulse ring, 3s loop, stone bg baked in.
- Load Lottie via `https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js`, `lottie.loadAnimation({container, renderer:'svg', loop:true, autoplay:true, path:'assets/lottie/… .json'})`. Pause when out of view (IntersectionObserver) and when reduced-motion (show a static frame via `goToAndStop`).

## Content outline (provisional copy — write tight, factual, athlete-to-athlete; no hype words like "revolutionary")

1. **Hero** — positioning: *Your plan. Made safe and optimal.* Tuwa is the sports-science back room for self-coached athletes: it reads your body (HRV, sleep, resting HR, training history) and modulates the training plan YOU authored — today's numbers, a go/modify/hold verdict, and where your load is trending. It never writes your program. Sub-line for the beachhead: built for athletes who train sport skill + strength in parallel. App Store CTA (ink pill) + "readiness score" motif (82, accent).
2. **Verdict / today** — the daily decision: concrete number adjustments, microdose options, strike-zone bar. Screens: verdict.png, strike-zone.png. Lottie: verdict-tick.
3. **Training load** — one fatigue budget across sport skill, strength, conditioning; ACWR strike zone; overreach forecast. Screens: workload.png, dashboard.png. Lottie: needle-sweep.
4. **Recovery** — HRV/sleep/RHR baselines → one readiness score with plain-language reasons. Screen: recovery.png.
5. **Movement bank / logging** — 1,324-exercise catalog, fast in-gym logging. Screens: movement-bank.png, active-workout.png, workout-log.png.
6. **Privacy + closing CTA** — HealthKit data never leaves the device (only composite scores sync). iOS 17+, App Store badge.

Keep nav minimal (logo wordmark "Tuwa" + one CTA). Footer: one line. No fake links to pages that don't exist — use `#`.

## Verification

Do NOT open a browser. Validate your HTML by eye and keep JS defensive (wrap init in try/catch so one failure doesn't blank the page). The orchestrator screenshots every demo afterward.
