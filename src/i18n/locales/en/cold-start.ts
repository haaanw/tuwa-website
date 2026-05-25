type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const coldStart = {
  meta: {
    title: 'Cold-Start Onboarding',
    description:
      'Honest guidance from day one — even without historical data. Tuwa bootstraps your training intelligence from the moment you sign up.',
  },
  hero: {
    outcomeStatement: 'Honest guidance from day one — even without historical data',
    hookLine: 'Most apps need weeks of data before they\'re useful. Tuwa starts working immediately.',
    screenshotAlt: 'Cold-Start Onboarding Screenshot — coming soon',
  },
  howItWorks: {
    heading: 'How it works',
    p1: 'Every algorithm that learns from personal data faces the same problem on day one: there is no personal data. Recovery scoring, training load trends, personal baselines — all of these require history. Most apps handle this by giving you placeholder scores, optimistic defaults, or a holding message that says "come back after two weeks." None of these are honest, and none of them are useful.',
    p2: "Tuwa's approach is different: start with population-level baselines drawn from validated sports science literature, and progressively replace them with your own data as it accumulates. From the moment you open the app, you receive actionable guidance — with transparent communication about what that guidance is built on.",
    day1Heading: 'Day 1: immediate signal from what you have',
    p3: 'On your first day, Tuwa runs a morning wellness check-in — subjective ratings for soreness, energy, and stress. These data points are available immediately, no hardware required. If you have an Apple Watch or another device writing to HealthKit, Tuwa reads whatever historical HRV and sleep data is already there. Your first recovery score reflects both sources, clearly labeling which factors are based on your personal data and which are supplemented by population baselines.',
    days3to5Heading: 'Days 3–5: directional accuracy',
    p4: 'After a few days, Tuwa has enough consecutive readings to establish rudimentary personal trends. Your HRV baseline starts to emerge. Sleep patterns become visible. Recovery scores carry wider confidence intervals at this stage — the model is still learning — but the directional signal is reliable. A low score after poor sleep and high stress reflects something real about your current state, even if the specific number is still being calibrated.',
    day7Heading: 'Day 7 and beyond: personal baselines stabilize',
    p5: "With a week of consistent data, personal baselines begin to stabilize. Tuwa transitions progressively from population-weighted scoring to individual-weighted scoring as your data accumulates. This isn't a sudden switch — it's a gradual handoff, weighted by data confidence. By the end of your first week, your recovery scores reflect your physiology, not a generic athlete profile.",
    p6: "Training load tracking works differently: it's accurate from session one. Load is calculated from what you actually log — sets, reps, weight, RPE — and doesn't depend on historical trends. Your first workout session produces a real load number that feeds directly into your acute load calculation. The workload model doesn't need weeks of history to start working; it just needs you to log your sessions.",
  },
  honestySection: {
    heading: 'Why honesty matters',
    p1: 'False precision is worse than acknowledged uncertainty. If an app tells you "your recovery score is 84" on day one with no physiological data behind it, that number is fabricated. Athletes who rely on it are training by fiction. Over time, the disconnect between the app\'s confident output and their subjective experience erodes trust in the tool entirely.',
    p2: "Serious athletes already have good intuitions about their own recovery — built from years of training, competition, and paying attention to how their body responds. Tuwa's cold-start approach respects that. During the calibration period, the app supplements your judgment rather than overriding it with manufactured certainty. You're told what the model knows and what it doesn't. That transparency is a feature, not a limitation.",
    p3: "The transition from population baselines to personal baselines is visible in the app. As data accumulates, your confidence intervals narrow, your scores become more precise, and the reasoning factors become more specific to your physiology. You watch the model learn. By the time Tuwa is operating on your personal baseline, you've seen the calibration happen — so you trust the output in a way you couldn't with an app that simply handed you numbers from day one.",
  },
} as const;

export default coldStart;
export type ColdStart = WidenStrings<typeof coldStart>;
