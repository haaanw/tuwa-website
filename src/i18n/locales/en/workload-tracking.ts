type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const workloadTracking = {
  meta: {
    title: 'Workload Tracking',
    description:
      'Train hard without crossing the line. Tuwa tracks your training load with EWMA-based monitoring, spike detection, and personal records.',
  },
  hero: {
    outcomeStatement: 'Train hard without crossing the line',
    hookLine:
      "See exactly where your training load stands — and when you're pushing too far, too fast.",
    screenshotAlt:
      'Tuwa app workload screen showing acute and chronic training load trends with a safe ACWR zone highlighted',
  },
  howItWorks: {
    heading: 'How it works',
    p1: "Every workout you log in Tuwa feeds into a training load model that tracks not just what you did today, but how it fits into the broader arc of your training. You record your exercises, sets, reps, weight, and rate of perceived exertion — the familiar RPE scale that measures how hard a set felt on a scale of 1 to 10. Tuwa combines volume and intensity into a session load number, then tracks how those session loads stack up over time.",
    acuteChronicHeading: 'Acute versus chronic load',
    p2: "Tuwa maintains two parallel views of your training. Your acute load reflects what you've done in roughly the last week — how fresh or fatigued you are right now. Your chronic load reflects your training over roughly the last four weeks — your fitness base. The ratio between these two numbers is where the insight lives.",
    p3: "Your body can handle gradual increases in training stress because it adapts — muscles get stronger, tendons toughen, the cardiovascular system becomes more efficient. But sudden jumps are a different story. When your acute load spikes far above your chronic baseline — when you're doing dramatically more in a week than your body has been prepared for — injury risk increases significantly. Tuwa detects these spikes before you execute the session, not after, giving you the chance to adjust rather than just recover from a mistake.",
    repsInReserveHeading: 'Reps in reserve as a second intensity signal',
    p4: "RPE tells you how hard a set felt. Reps in reserve (RIR) tells you how close to failure you were. An RPE 8 on a heavy squat could mean you had two reps left in the tank. Tuwa supports both metrics because together they give a more complete picture of training intensity than weight and reps alone. When autoregulation kicks in during low-recovery days, Tuwa uses your RIR targets to suggest where to back off without eliminating the training stimulus entirely.",
    personalRecordsHeading: 'Personal records tracked automatically',
    p5: "Tuwa automatically flags when you hit new personal bests across three dimensions: max weight for a given exercise, max reps at a given weight, and total volume in a single session. No manual logging or separate tracking spreadsheet needed. The record surfaces in your session log and gets carried forward as your benchmark for future sessions. When you break it again, Tuwa notices.",
  },
  scienceSection: {
    heading: 'The science behind it',
    p1: "The acute-to-chronic workload ratio concept was developed and validated by sports scientist Tim Gabbett and colleagues, initially studying professional rugby and cricket players. The core finding: athletes whose weekly load spiked dramatically above their established baseline were significantly more likely to get injured than those who built load progressively. The research has since been replicated across team sports, endurance sports, and resistance training.",
    p2: "Tuwa implements this using exponentially weighted moving averages — a smoothing technique that gives more weight to recent training sessions than older ones. This means your load model responds quickly to changes in your training rather than being anchored to weeks-old data. A training block you completed a month ago matters less to your current baseline than what you've done in the past two weeks.",
    p3: 'The "sweet spot" for the acute-to-chronic ratio sits between roughly 0.8 and 1.3. Below 0.8 suggests you\'re undertraining relative to your fitness base — adaptation slows. Above 1.3 is where the injury risk curve starts to bend sharply upward. Staying in the band isn\'t about playing it safe; it\'s about creating conditions where progressive overload actually leads to adaptation rather than breakdown. The chart below shows how this ratio evolves across a representative training cycle.',
  },
} as const;

export default workloadTracking;
export type WorkloadTracking = WidenStrings<typeof workloadTracking>;
