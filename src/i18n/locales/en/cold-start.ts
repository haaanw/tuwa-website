type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const coldStart = {
  meta: {
    title: 'Cold-Start Onboarding',
    description:
      'Honest setup from day one. Tuwa uses onboarding answers to seed your workload profile, then waits for real recovery data before making stronger calls.',
  },
  hero: {
    outcomeStatement: 'Useful setup on day one — without pretending certainty',
    hookLine: 'Tuwa starts with your profile and first logged sessions, then gets more personal as real data arrives.',
    screenshotAlt: 'Cold-Start Onboarding Screenshot — coming soon',
  },
  howItWorks: {
    heading: 'How it works',
    p1: 'Every system that learns from personal data faces the same problem on day one: there is not much personal history yet. Recovery scoring, training load trends, and personal baselines all get better once you have real records. Tuwa does not fill that gap with fake precision.',
    p2: "Tuwa starts by building a training profile from your onboarding answers: sport context, current lifting rhythm, recent workload, and the kind of sessions you plan to log. That profile helps the workload model start organized, while readiness and verdicts stay conservative until enough real physiology and training data exist.",
    day1Heading: 'Day 1: set the workload profile',
    p3: 'On your first day, Tuwa collects the context it can honestly use: your training background, planned lifting pattern, wellness check-in, and any HealthKit data you permit. If recovery history is thin, the app avoids over-reading it; a no-data recovery state stays neutral instead of pretending to know your personal baseline.',
    days3to5Heading: 'First sessions: build from what you log',
    p4: 'As you log workouts, Tuwa starts calculating session load from the work you actually did: exercises, sets, reps, weight, RPE, and reps in reserve. Those logs create the early acute-load picture and make the next review more grounded than a blank calendar.',
    day7Heading: 'After history accumulates: personalize the trend',
    p5: "With consistent HealthKit readings, wellness check-ins, and logged sessions, Tuwa can compare more signals against your own recent trend. When the evidence is still too thin for a confident adjustment, the verdict can defer rather than trimming your plan on a guess.",
    p6: "Training load tracking starts building from the first logged workout. The first session gives Tuwa real load data to store, and each later session makes the acute and chronic workload views more useful.",
  },
  honestySection: {
    heading: 'Why honesty matters',
    p1: 'False precision is worse than acknowledged uncertainty. If an app tells you "your recovery score is 84" on day one with no physiological data behind it, that number is fabricated. Athletes who rely on it are training by fiction. Over time, the disconnect between the app\'s confident output and their subjective experience erodes trust in the tool entirely.',
    p2: "Serious athletes already have good intuitions about their own recovery — built from years of training, competition, and paying attention to how their body responds. Tuwa's cold-start approach respects that. Early on, it helps you structure the log and understand what is known, while leaving room for your judgment when the data is incomplete.",
    p3: "The payoff is practical: instead of acting confident before it has evidence, Tuwa lets your own records become the baseline. As HealthKit readings, wellness check-ins, and logged sessions accumulate, the explanations become more specific to your physiology and training history.",
  },
} as const;

export default coldStart;
export type ColdStart = WidenStrings<typeof coldStart>;
