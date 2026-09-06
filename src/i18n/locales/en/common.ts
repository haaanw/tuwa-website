// WidenStrings: recursively converts string literal types to string,
// allowing zh/fr locale files to satisfy the Common shape with translated values.
type WidenStrings<T> = T extends string
  ? string
  // `readonly` is load-bearing: `common` below is `as const`, so every array in
  // it is a readonly tuple. Widening to a MUTABLE array made `enCommon`
  // unassignable to `Common` and put one error on `astro check` at
  // src/i18n/utils.ts:68. A mutable zh/fr array still satisfies a readonly one,
  // so the locale files need no change.
  : T extends readonly (infer U)[]
  ? readonly WidenStrings<U>[]
  : { [K in keyof T]: WidenStrings<T[K]> };

const common = {
  nav: {
    features: 'Features',
    anchors: [
      { href: '#today', label: 'Features' },
      { href: '#zone', label: 'Training load' },
      { href: '#logging', label: 'Logging' },
      { href: '#method', label: 'Methodology' },
      { href: '#get', label: 'Privacy' },
    ],
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
      recoveryScoringTitle: 'Recovery scoring',
      recoveryScoringDesc: 'HRV, sleep, and resting heart rate vs your baselines',
      workloadTrackingTitle: 'Workload tracking',
      workloadTrackingDesc: 'One fatigue budget, ACWR strike zone',
      smartTemplatesTitle: 'Logging & movement bank',
      smartTemplatesDesc: 'Fast logging, templates, 1,324 exercises',
      coldStartTitle: 'Starting out',
      coldStartDesc: 'Useful before long personal baselines',
      backRoomTitle: 'Back-Room Review',
      backRoomDesc: 'Workload, recovery, match proximity, and PRs',
    },
    menu: 'Menu',
  },
  drawer: {
    ariaLabel: 'Site navigation',
    close: 'Close menu',
    product: 'Product',
    science: 'Science',
    company: 'Company',
    verdict: 'The daily verdict',
    trainingLoad: 'Training load',
    recoveryScore: 'Recovery score',
    logging: 'Logging & templates',
    voiceLogging: 'Voice logging',
    startingOut: 'Starting out',
    methodology: 'Methodology',
    readinessScore: 'Readiness score',
    trainingLoadGuide: 'Training load guide',
    compare: 'Compare',
    about: 'About',
    support: 'Support',
    blog: 'Blog',
    privacy: 'Privacy',
    terms: 'Terms',
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
    description:
      'Tuwa is the sports-science back room for self-coached athletes. You write the plan; Tuwa returns today’s dose: go, modify, or hold. It never writes your program.',
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
