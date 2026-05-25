// WidenStrings: recursively converts string literal types to string,
// allowing zh/fr locale files to satisfy the Common shape with translated values.
type WidenStrings<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
  ? WidenStrings<U>[]
  : { [K in keyof T]: WidenStrings<T[K]> };

const common = {
  nav: {
    features: 'Features',
    support: 'Support',
    blog: 'Blog',
    getApp: 'Get the App',
    method: 'Method',
    coaches: 'Coaches',
    languageSwitcher: {
      label: 'Language',
      en: 'English',
      zh: '中文',
      fr: 'Français',
      current: 'EN',
    },
    featuresDropdown: {
      recoveryScoringTitle: 'Recovery Scoring',
      recoveryScoringDesc: 'Daily readiness from HRV, sleep, and training load',
      workloadTrackingTitle: 'Workload Tracking',
      workloadTrackingDesc: 'Multi-factor fatigue and load spike detection',
      smartTemplatesTitle: 'Smart Templates',
      smartTemplatesDesc: 'Prescribed workouts with target sets and reps',
      coldStartTitle: 'Cold Start Solution',
      coldStartDesc: 'Useful on day one, no baseline wait',
      coachingTitle: 'Coaching',
      coachingDesc: 'Team recovery visibility and prescribed workouts',
    },
  },
  footer: {
    features: 'Features',
    resources: 'Resources',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© {year} Tuwa. All rights reserved.',
    methodology: 'Methodology',
    readinessScore: 'Readiness Score',
    trainingLoad: 'Training Load',
    forCoaches: 'For Coaches',
    compare: 'Compare Tuwa',
  },
  meta: {
    title: 'Tuwa',
    description: 'Precision training load and recovery management for serious athletes and coaches.',
  },
  featureCTA: {
    headline: 'Start training with confidence',
    body: 'Download Tuwa and take the guesswork out of recovery and load management.',
    badgeAlt: 'Download on the App Store',
    badgeAriaLabel: 'Download Tuwa on the App Store',
  },
} as const;

export default common;
export type Common = WidenStrings<typeof common>;
