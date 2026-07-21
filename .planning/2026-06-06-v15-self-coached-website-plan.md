# Quick Plan: v1.5 Self-Coached Website Reposition

## Goal

Align tuwa.app with the current Tuwa v1.5 product direction:
self-coached adaptive strength training for serious strength and hybrid athletes.

## Scope

- Reframe the homepage from recovery/load-first to the athlete loop:
  plan, log, adapt, review.
- Demote coach-first messaging in top-level navigation and homepage copy.
- Keep science, privacy, and day-one usefulness as proof points.
- Polish the homepage surface with clearer above-the-fold product signal,
  stronger scannability, and restrained native motion.
- Preserve the existing Astro + Tailwind + i18n architecture.

## Requirements

1. English, Chinese, and French homepage copy reflect the new positioning.
2. Primary nav no longer puts coach content at the same priority as the self-coached athlete path.
3. Homepage feature set maps to Workout Planning, Strength Logging, Recovery-Informed Adjustments, and Progress Review.
4. Claims avoid unverifiable public proof numbers and precision language.
5. Build passes and the rendered homepage is checked on desktop and mobile.

## Verification

- `npm run build`
- Local rendered homepage smoke test
- Desktop and mobile screenshot review for layout, copy, animation, and overflow
