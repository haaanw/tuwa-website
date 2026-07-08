type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const recoveryScoring = {
  meta: {
    title: 'Daily Verdict',
    description:
      'A daily go, modify, or hold suggestion for your planned strength session, with an adjusted top-set number and a one-line reason.',
  },
  hero: {
    outcomeStatement: 'Go, modify, or hold — with the why',
    hookLine: 'Tuwa turns HRV, sleep, resting heart rate, training history, soreness, and match proximity into a suggested adjustment for the lift you planned.',
    screenshotAlt:
      'Tuwa app Insights recovery screen showing recovery score, HRV, resting heart rate, sleep, and recovery trend rows',
  },
  howItWorks: {
    heading: 'How it works',
    deviceAlt: 'Tuwa app Insights recovery screen showing recovery score, HRV, resting heart rate, sleep, and recovery trend rows',
    p1: 'Every morning, Tuwa reads the physiology you already collect through HealthKit: HRV, resting heart rate, and sleep. It pairs those signals with your training history, soreness, and match proximity, then evaluates the strength session you planned.',
    p2: "The output is intentionally practical: go, modify, or hold, plus an adjusted top-set number and a one-line reason. For example: \"Match Saturday — cap the top set, skip back-offs.\" You see the suggestion before warmups, while the session can still change.",
    threeZonesHeading: 'Three verdicts, athlete-controlled',
    p3: 'Go means the planned dose still fits the day. Modify means keep the session but trim the dose: cap RPE, reduce load, or microdose near a game. Hold means Tuwa sees enough fatigue context to suggest delaying the hard part. None of these is a command; the athlete confirms the call.',
  },
  deviceCompatibility: {
    heading: 'HealthKit physiology, your basketball context',
    p1: 'Tuwa uses the HealthKit signals available to the app — HRV, resting heart rate, and sleep — then adds what a wearable score usually misses: the plan you wrote, the lift you are about to run, and whether your last court session was pickup, scrimmage, or match intensity.',
  },
  personalBaseline: {
    heading: 'The strike zone moves daily',
    p1: 'HRV numbers vary enormously between athletes. What matters is whether your signals are above or below your own recent trend, and how that trend intersects with today\'s planned lift. Tuwa uses that context to move the day\'s strike zone before you load the bar.',
  },
  scienceSection: {
    heading: 'The science behind it',
    p1: 'Heart rate variability is the variation in time between consecutive heartbeats, measured in milliseconds. A perfectly metronomic heartbeat — every interval exactly the same — is actually a sign of stress. Healthy hearts show subtle beat-to-beat variation because they\'re responding to signals from the autonomic nervous system, which balances the sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) branches.',
    p2: "When you're well-recovered, parasympathetic activity is dominant and HRV is higher. When you're stressed, fatigued, or fighting off illness, sympathetic tone increases and HRV drops. This is why HRV has become one of the most researched biomarkers in sports science over the past two decades — it's a window into your nervous system's current state.",
    p3: 'But HRV is also noisy. A poor night\'s sleep, a late game, or an unusually early alarm can affect a single measurement. That is why Tuwa treats physiology as one part of the verdict, not the verdict itself. The planned session, match proximity, soreness, and recent training history give the signal training context.',
  },
} as const;

export default recoveryScoring;
export type RecoveryScoring = WidenStrings<typeof recoveryScoring>;
