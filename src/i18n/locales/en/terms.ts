type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const terms = {
  meta: {
    title: 'Terms of Service',
    lastUpdated: 'April 10, 2026',
    description: 'Terms of Service for Tuwa — Training Load & Recovery app.',
  },
  disclaimer: {
    text: 'This is a translation. The English version is the legally binding document.',
  },
  intro: {
    p1: 'These Terms of Service ("Terms") govern your use of the Tuwa mobile application ("the app") developed by Hanwen Ma ("we", "us", "our"). By downloading, installing, or using the app, you agree to these Terms.',
  },
  useOfApp: {
    heading: '1. Use of the App',
    p1: 'Tuwa is a training load and recovery management tool. You may use it for personal fitness tracking and, if applicable, coach-athlete collaboration. You agree to:',
    items: [
      'Provide accurate information when creating your account',
      'Keep your login credentials secure',
      'Use the app in compliance with all applicable laws',
    ] as const,
  },
  accounts: {
    heading: '2. Accounts',
    p1: 'You need an account to use Tuwa. You are responsible for all activity under your account. If you suspect unauthorized access, contact us immediately.',
  },
  subscriptions: {
    heading: '3. Subscriptions',
    p1: "Tuwa offers free and paid subscription tiers (Athlete Pro and Coach). Paid subscriptions are billed through Apple's App Store and managed by RevenueCat.",
    items: [
      {
        label: 'Billing',
        description: 'Subscriptions auto-renew unless cancelled at least 24 hours before the end of the current period.',
      },
      {
        label: 'Cancellation',
        description: "You can cancel anytime through your device's Settings > Apple ID > Subscriptions. Cancellation takes effect at the end of the current billing period.",
      },
      {
        label: 'Refunds',
        description: 'Refund requests are handled by Apple per their App Store policies.',
      },
      {
        label: 'Price changes',
        description: 'We may change subscription prices. You will be notified before any price increase takes effect.',
      },
    ] as const,
  },
  healthKitData: {
    heading: '4. HealthKit Data',
    p1: 'Tuwa reads health data from Apple HealthKit with your explicit permission. We never write data to HealthKit. Raw HealthKit data stays on your device — only computed scores are synced to our servers. You can revoke HealthKit access at any time via iOS Settings.',
  },
  coachAthleteFeatures: {
    heading: '5. Coach-Athlete Features',
    p1: 'If you link with a coach, you grant them access to view your recovery scores, workload trends, workout summaries, and wellness check-in ratings. You can unlink from a coach at any time, which revokes their access to your data.',
    p2: 'Coaches who log workouts on behalf of athletes do so with attribution. Coaches are responsible for using the platform in good faith.',
  },
  acceptableUse: {
    heading: '6. Acceptable Use',
    p1: 'You agree not to:',
    items: [
      'Reverse-engineer, decompile, or tamper with the app',
      'Use the app for any unlawful purpose',
      "Attempt to gain unauthorized access to our servers or other users' data",
      'Resell or redistribute the app or its content',
    ] as const,
  },
  intellectualProperty: {
    heading: '7. Intellectual Property',
    p1: 'The app, including its design, code, and content, is owned by Hanwen Ma. Your use of the app does not grant you any ownership rights.',
  },
  disclaimerSection: {
    heading: '8. Disclaimer',
    p1: 'Tuwa provides training load and recovery data for informational purposes only. It is not medical advice. Always consult a qualified healthcare professional before making decisions about your health or training. We are not liable for injuries, overtraining, or health issues arising from use of the app.',
    informationalStrong: 'informational purposes only',
  },
  limitationOfLiability: {
    heading: '9. Limitation of Liability',
    p1: 'To the maximum extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the app. Our total liability is limited to the amount you paid for the app in the 12 months preceding the claim.',
  },
  termination: {
    heading: '10. Termination',
    p1: 'We may suspend or terminate your account if you violate these Terms. You may delete your account at any time by contacting us.',
  },
  changes: {
    heading: '11. Changes to These Terms',
    p1: 'We may update these Terms from time to time. Changes will be posted to this page with an updated date. Continued use of the app after changes constitutes acceptance.',
  },
  contact: {
    heading: '12. Contact',
    intro: 'For questions about these Terms:',
    emailLabel: 'Email',
    email: 'hanwenma09@gmail.com',
  },
} as const;

export default terms;
export type Terms = WidenStrings<typeof terms>;
