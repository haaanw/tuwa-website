type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const smartTemplates = {
  meta: {
    title: 'Smart Templates',
    description:
      "Prescribed workouts, not guesswork. Tuwa lets coaches build structured workout templates with named exercise groups, target sets, and weight/rep goals.",
  },
  hero: {
    outcomeStatement: 'Prescribed workouts, not guesswork',
    hookLine:
      'Structured training templates that bridge the gap between what your coach prescribes and what you execute.',
    screenshotAlt:
      'Tuwa app showing an active workout session with prescribed exercises, target sets, and weight goals from a coach template',
  },
  howItWorks: {
    heading: 'How it works',
    p1: 'Coaches build workout templates directly in Tuwa using named exercise groups — structures like "Upper Body Strength A," "Posterior Chain," or "Conditioning Finisher." Each group contains exercises with target sets, rep ranges, weight goals, and RPE targets. The template captures not just what to do, but how hard and in what order, reflecting the structure of real programming rather than a flat list of exercises.',
    prescriptionToExecutionHeading: 'From prescription to execution without friction',
    p2: "When a coach prescribes a template to an athlete, it appears in the athlete's app ready to start. Athletes load the prescription directly into their workout session — target placeholders pre-fill the log so they know exactly what's prescribed for each set. No translating from a spreadsheet, no manually re-entering weights from a previous session. The prescription is there, the athlete executes against it, and everything is captured automatically.",
    p3: "Actual performance is recorded alongside the prescription. Did the athlete hit the target weight? How many reps did they complete? What was their RPE at the end of the set? This side-by-side record — prescribed vs actual — is where meaningful coaching data lives. A week of sessions where an athlete consistently undershoots prescribed intensity is a signal. So is consistently overshooting it.",
    autoregulationHeading: 'Autoregulation on top of prescription',
    p4: "Prescribed workouts are a starting point, not a ceiling. When an athlete's recovery score is low, Tuwa overlays autoregulation guidance on top of the template — suggesting RPE caps and volume modifications that adjust the session to match the athlete's current capacity. The prescription still provides the structure; recovery data provides the calibration. An athlete executing at 70% of prescribed volume on a red-zone day is training smarter, not skipping.",
    connectHeading: 'Connect via invite code, email, or NFC',
    p5: "Linking a coach and athlete account takes less than a minute. Coaches share an invite code, an email link, or an NFC tap for in-person pairing. Once linked, the coach sees the athlete's full training history, recovery scores, and session logs. Prescriptions flow from coach to athlete in real time. Tuwa handles the connection — you focus on the training relationship.",
  },
  realProgramming: {
    heading: 'Built for real programming',
    p1: 'Most training apps treat workouts as flat lists of exercises. Coaches think in blocks, phases, and movement patterns. They build programs where the warm-up prepares the athlete for the main lifts, where accessory work addresses specific weaknesses, where conditioning is sequenced to support — not undermine — the strength work earlier in the session.',
    p2: 'Tuwa\'s template structure respects that logic. Exercise groups give sessions an internal architecture. A "Competition Prep" template looks different from a "Hypertrophy Phase A" template, not just in exercise selection but in how the work is organized and sequenced. That structure is preserved when athletes execute the session and when coaches review the data.',
    p3: "Templates also persist over time. A coach creates a strength program once; athletes execute it repeatedly across weeks or months. Progress is tracked against the template — not just session-to-session, but across the full duration of the programming block. Coaches can see whether an athlete is trending up on the key lifts, stalling, or showing signs of accumulated fatigue through the ACWR and recovery scores. The data tells the programming story without requiring the coach to piece it together manually.",
  },
} as const;

export default smartTemplates;
export type SmartTemplates = WidenStrings<typeof smartTemplates>;
