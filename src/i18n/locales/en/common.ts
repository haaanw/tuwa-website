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
    languageSwitcher: {
      label: 'Language',
      en: 'English',
      zh: '中文',
      fr: 'Français',
      current: 'EN',
    },
    featuresDropdown: {
      recoveryScoringTitle: 'Daily Verdict',
      recoveryScoringDesc: 'Go, modify, or hold with the reason',
      workloadTrackingTitle: 'Lift + Match Logging',
      workloadTrackingDesc: 'Sets, RPE, RIR, match tier, and load',
      smartTemplatesTitle: 'Your Plan Input',
      smartTemplatesDesc: 'Planned top sets, caps, notes, and targets',
      coldStartTitle: 'Day-One Setup',
      coldStartDesc: 'Useful before long personal baselines',
      backRoomTitle: 'Back-Room Review',
      backRoomDesc: 'Workload, recovery, match proximity, and PRs',
    },
  },
  footer: {
    features: 'Features',
    resources: 'Resources',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    copyright: '© {year} Tuwa. All rights reserved.',
    more: 'More',
    methodology: 'Methodology',
    readinessScore: 'Readiness Score',
    trainingLoad: 'Training Load',
    compare: 'Compare Tuwa',
  },
  meta: {
    title: 'Tuwa',
    description: 'The sports-science back room for self-coached basketball players who strength-train seriously.',
  },
  featureCTA: {
    headline: 'Stay in your strike zone',
    body: 'Download Tuwa to bring your own plan, check today\'s verdict, and adjust the top set before you train.',
    badgeAlt: 'Download on the App Store',
    badgeAriaLabel: 'Download Tuwa on the App Store',
  },
} as const;

export default common;
export type Common = WidenStrings<typeof common>;
