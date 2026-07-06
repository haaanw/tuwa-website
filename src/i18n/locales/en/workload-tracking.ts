type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const workloadTracking = {
  meta: {
    title: 'Lift + Match Logging',
    description:
      'Log lifting work and basketball match tier together so Tuwa can separate leg fatigue from upper-body readiness.',
  },
  hero: {
    outcomeStatement: 'Last night\'s game matters to today\'s squat',
    hookLine:
      "Tuwa connects sets, reps, load, RPE, RIR, and match tier so the verdict can say: legs down, bench still fine.",
    screenshotAlt:
      'Tuwa app Insights load screen showing load score, acute load, chronic load, training stress balance, and daily volume rows',
  },
  howItWorks: {
    heading: 'How it works',
    p1: "Every lift you log in Tuwa carries the details that matter for a readiness verdict: exercise, sets, reps, load, RPE, and reps in reserve. Basketball work gets its own context through match tier logging, so a casual pickup run does not count the same as a full match.",
    acuteChronicHeading: 'Cross-modal fatigue',
    p2: "A whole-body wearable score can tell you that you are generally recovered or generally strained. It cannot say the useful thing for a basketball player who lifts: last night's game hammered your legs, today's squat readiness is down, and your bench is fine.",
    p3: "Tuwa can make that distinction because the plan and the log are in the same system. The court session, lower-body soreness, recent leg volume, and planned squat top set are evaluated together before the verdict is shown.",
    repsInReserveHeading: 'RPE and RIR keep the dose honest',
    p4: "RPE tells you how hard a set felt. Reps in reserve (RIR) tells you how close to failure you were. Together they let Tuwa suggest a smaller top set or fewer back-off sets without pretending the entire training day has to vanish.",
    personalRecordsHeading: 'Progress still matters',
    p5: "Tuwa tracks personal records and session history so the back-room view is not only about caution. If the verdict says go, you can train hard with the week in view. If it says modify, you still know what stimulus you preserved.",
  },
  scienceSection: {
    heading: 'The science behind it',
    p1: "The acute-to-chronic workload idea compares recent workload with a longer baseline. The useful product lesson is not that one ratio predicts an injury. It is that sudden changes deserve attention before you add another hard lift.",
    p2: "Tuwa uses exponentially weighted moving averages so recent sessions matter more than older ones. That keeps the load model responsive to a week with two games and a heavy lower-body day instead of anchoring the verdict to stale work.",
    p3: 'Tuwa treats the target range as planning context, not a universal safety rule. Below the range, you may be doing much less than your recent base. Above it, the current week may be asking for a bigger jump than your recent training supports. The chart below shows how the ratio evolves across a representative training cycle.',
  },
} as const;

export default workloadTracking;
export type WorkloadTracking = WidenStrings<typeof workloadTracking>;
