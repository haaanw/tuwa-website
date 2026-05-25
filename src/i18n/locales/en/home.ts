type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const home = {
  hero: {
    headline: 'Train smarter. Recover with precision.',
    subtitle: 'Tuwa combines HRV, sleep, training load, and six fatigue dimensions into a single readiness score — so you know exactly how hard to push today.',
    deviceAlt: 'Tuwa app showing today\'s recovery score of 82 — HRV in green zone, sleep 7.5 hours.',
    badgeAlt: 'Download on the App Store',
    badgeAriaLabel: 'Download Tuwa on the App Store',
  },
  stats: {
    athletes: 'Athletes using Tuwa',
    sessions: 'Sessions analyzed',
    accuracy: 'HRV prediction accuracy',
  },
  cta: {
    headline: 'Built for athletes who take training seriously.',
    body: 'Evidence-based workload management. No vanity metrics. No noise.',
  },
  featureGrid: {
    heading: 'Everything you need to train without guessing',
    features: [
      {
        title: 'Recovery Scoring',
        desc: 'HRV, sleep, heart rate, and training context synthesized into one daily readiness number.',
        href: '/features/recovery-scoring',
      },
      {
        title: 'Workload Tracking',
        desc: 'Multi-factor fatigue tracking and load spike detection keep you in the optimal zone.',
        href: '/features/workload-tracking',
      },
      {
        title: 'Smart Templates',
        desc: 'Prescribed workouts with target sets, weight, and rep goals built in.',
        href: '/features/smart-templates',
      },
      {
        title: 'Cold-Start Onboarding',
        desc: 'Tuwa starts useful on day one — no weeks of baseline data required.',
        href: '/features/cold-start',
      },
      {
        title: 'Coach + Athlete',
        desc: 'Real-time recovery visibility and prescribed workouts for your whole team.',
        href: '/features/coaching',
      },
    ],
    segmentLabels: ['RECOVERY', 'LOAD', 'TRAINING', 'ONBOARDING', 'COACHING'],
    exploreCta: 'Explore',
  },
} as const;

export default home;
export type Home = WidenStrings<typeof home>;
