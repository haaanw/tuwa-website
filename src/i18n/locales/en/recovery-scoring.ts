type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const recoveryScoring = {
  meta: {
    title: 'Recovery Scoring',
    description:
      'Know exactly how hard to push today. Tuwa synthesizes HRV, resting heart rate, sleep, and wellness into a single daily readiness score.',
  },
  hero: {
    outcomeStatement: 'Know exactly how hard to push today',
    hookLine: 'One readiness number built from everything your body is telling you.',
    screenshotAlt:
      'Tuwa app recovery screen showing a daily readiness score with color-coded HRV trend, resting heart rate, sleep duration, and wellness factors',
  },
  howItWorks: {
    heading: 'How it works',
    deviceAlt: 'Tuwa recovery scoring screen showing daily readiness score with color-coded zones',
    p1: 'Every morning, before you pick up a barbell or lace up your shoes, Tuwa has already done the analysis. While you slept, it pulled physiological data from Apple HealthKit — your heart rate variability, resting heart rate, sleep duration, body temperature trend, and VO2 Max estimate — and combined that with your morning wellness check-in, where you rate your soreness, energy levels, and stress. These inputs feed a composite scoring algorithm that produces a single readiness number between 0 and 100.',
    p2: "That number is useful on its own, but it gets more valuable when paired with plain-language reasoning factors. Tuwa doesn't just tell you that your readiness is 62 — it tells you that your HRV is tracking 8% below your recent baseline, your sleep was cut short, but your resting heart rate is normal. You understand not just the score, but why.",
    threeZonesHeading: 'Three zones, clear guidance',
    p3: 'Recovery scores map to three zones, each with concrete training implications. Green means full capacity — go after your session as prescribed. Yellow means moderate recovery — train, but back off total volume by 10–20% and keep RPE capped. Red means your body is signaling genuine recovery need — light movement, mobility work, or rest. No guessing, no willpower battles with yourself. The data makes the call.',
  },
  deviceCompatibility: {
    heading: 'Data from any device you already own',
    p1: "Tuwa works with whatever hardware you already wear. Apple Watch is the most common source, but Whoop, Oura, Garmin, and any other device that writes HRV and sleep data to Apple HealthKit feeds directly into the scoring pipeline. You're not locked into a new wearable ecosystem — Tuwa meets you where you are.",
  },
  personalBaseline: {
    heading: "A baseline that's yours, not the population's",
    p1: "HRV numbers vary enormously between individuals — an athlete with a resting HRV of 45 ms isn't worse than one with 80 ms, they're just different. What matters is whether your HRV is above or below your own recent trend. Tuwa calculates that trend using an averaging method that gives more weight to recent days than older ones. Instead of being thrown off by a single anomalous reading, your baseline evolves naturally as your fitness and recovery patterns shift over weeks and months.",
  },
  scienceSection: {
    heading: 'The science behind it',
    p1: 'Heart rate variability is the variation in time between consecutive heartbeats, measured in milliseconds. A perfectly metronomic heartbeat — every interval exactly the same — is actually a sign of stress. Healthy hearts show subtle beat-to-beat variation because they\'re responding to signals from the autonomic nervous system, which balances the sympathetic (fight-or-flight) and parasympathetic (rest-and-digest) branches.',
    p2: "When you're well-recovered, parasympathetic activity is dominant and HRV is higher. When you're stressed, fatigued, or fighting off illness, sympathetic tone increases and HRV drops. This is why HRV has become one of the most researched biomarkers in sports science over the past two decades — it's a window into your nervous system's current state.",
    p3: 'But HRV is also noisy. A poor night\'s sleep, a glass of wine, an unusually early alarm — these all affect a single measurement. Comparing your Monday reading to your Sunday reading in isolation is misleading. The signal emerges over time, which is why Tuwa tracks your personal trend rather than individual data points. The chart below illustrates how each data source contributes to your composite readiness score.',
  },
} as const;

export default recoveryScoring;
export type RecoveryScoring = WidenStrings<typeof recoveryScoring>;
