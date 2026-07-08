type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const home = {
  hero: {
    headline: 'Stay in your strike zone — every workout.',
    subtitle: 'Tuwa is the sports-science back room for self-coached basketball players who lift seriously. Enter your plan, log the match tier, and get a daily go, modify, or hold suggestion with an adjusted top-set number and a one-line reason.',
    loopSteps: ['Plan', 'Check', 'Modify', 'Review'],
    loopAriaLabel: 'Tuwa training loop',
    deviceAlt: 'Tuwa Today screen showing a readiness verdict, planned strength session adjustment, recovery signals, and training load.',
    badgeAlt: 'Download on the App Store',
    badgeAriaLabel: 'Download Tuwa on the App Store',
  },
  stats: {
    heading: 'Built for basketball legs and serious lifting',
    science: {
      title: 'Your moving strike zone',
      desc: 'HRV, resting heart rate, sleep, soreness, match proximity, and lifting history move the day\'s optimal intensity band before you train.',
    },
    privacy: {
      title: 'Match proximity built in',
      desc: 'When a game is inside 48 hours, Tuwa frames the lift as a microdose: cap the top set, skip back-offs, and protect freshness.',
    },
    dayOne: {
      title: 'Local fatigue, not one body score',
      desc: 'Last night\'s game can hammer your legs while your upper body is fine. Tuwa ties that context to today\'s squat or bench decision.',
    },
  },
  cta: {
    headline: 'Keep your plan. Adjust the day.',
    body: 'Tuwa does not write your program or act like a chat coach. You author the plan; Tuwa makes today\'s lift safer and more precise.',
  },
  featureGrid: {
    heading: 'Your plan, made safe and optimal for today',
    features: [
      {
        title: 'Your Plan Input',
        desc: 'Bring in the strength session you already meant to run, with targets, notes, RPE caps, and top-set intent.',
        href: '/features/smart-templates',
      },
      {
        title: 'Lift + Match Logging',
        desc: 'Record sets, reps, load, RPE, RIR, and whether last night was pickup, scrimmage, or match intensity.',
        href: '/features/workload-tracking',
      },
      {
        title: 'Daily Verdict',
        desc: 'See a go, modify, or hold suggestion, an adjusted top-set number, and the reason before you start warming up.',
        href: '/features/recovery-scoring',
      },
      {
        title: 'Back-Room Review',
        desc: 'Review workload, recovery, match proximity, and strength progress without handing the program to an AI coach.',
        href: '/training-load',
      },
    ],
    segmentLabels: ['PLAN', 'LOG', 'VERDICT', 'REVIEW'],
    exploreCta: 'Explore',
  },
} as const;

export default home;
export type Home = WidenStrings<typeof home>;
