type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const privacy = {
  meta: {
    title: 'Privacy Policy',
    lastUpdated: 'March 27, 2026',
    description: 'Privacy policy for Tuwa — Training Load & Recovery app.',
  },
  disclaimer: {
    text: 'This is a translation. The English version is the legally binding document.',
  },
  intro: {
    p1: 'Tuwa ("the app") is developed by Hanwen Ma. This policy explains what data the app collects, how it is used, and your rights.',
  },
  whatWeCollect: {
    heading: 'What Data We Collect',
    dataYouProvide: {
      heading: 'Data you provide',
      items: [
        {
          label: 'Account information',
          description: 'Email address and display name (used for authentication and coach-athlete pairing)',
        },
        {
          label: 'Workout logs',
          description: 'Exercises, sets, reps, weights, RPE, session duration, and notes you enter',
        },
        {
          label: 'Wellness check-ins',
          description: 'Self-reported sleep quality, soreness, energy, and stress ratings',
        },
      ] as const,
    },
    healthKitData: {
      heading: 'Data from HealthKit (read-only)',
      items: [
        'Heart rate variability (HRV)',
        'Resting heart rate',
        'Sleep duration',
        'Body temperature',
        'VO2 Max',
        'Workout heart rate',
      ] as const,
    },
    healthKitNote: 'Tuwa never writes data to HealthKit. HealthKit access is optional and requires your explicit permission.',
    healthKitNoteStrong: 'never writes',
    dataWeCompute: {
      heading: 'Data we compute',
      p1: 'Recovery scores, ACWR (Acute:Chronic Workload Ratio), training stress, and personal records are calculated on your device from the data above.',
    },
  },
  howDataIsStored: {
    heading: 'How Data Is Stored',
    items: [
      {
        label: 'On your device',
        description: 'All data is stored locally using SwiftData. The app works fully offline.',
      },
      {
        label: 'In the cloud',
        description: 'Composite scores (recovery score, workload snapshots, wellness ratings, workout session headers, and personal records) sync to Supabase (hosted on AWS) for coach-athlete features and multi-device access.',
      },
      {
        label: 'Raw HealthKit data is never uploaded.',
        description: 'Only computed scores derived from HealthKit data are synced.',
      },
    ] as const,
  },
  coachAthleteSharing: {
    heading: 'Coach-Athlete Data Sharing',
    intro: 'If you link with a coach, they can view:',
    items: [
      'Your recovery scores and ACWR trends',
      'Workout session summaries',
      'Personal records',
      'Wellness check-in ratings',
    ] as const,
    outro: 'Coaches cannot access your raw HealthKit data, and you can unlink from a coach at any time.',
  },
  thirdPartyServices: {
    heading: 'Third-Party Services',
    services: [
      {
        label: 'Supabase',
        description: '(authentication and cloud sync)',
        url: 'https://supabase.com/privacy',
        urlDisplay: 'supabase.com/privacy',
      },
      {
        label: 'RevenueCat',
        description: '(subscription management)',
        url: 'https://www.revenuecat.com/privacy',
        urlDisplay: 'revenuecat.com/privacy',
      },
    ] as const,
    outro: 'We do not use any advertising networks, analytics trackers, or third-party data brokers.',
  },
  dataRetention: {
    heading: 'Data Retention and Deletion',
    intro: 'Your data is retained as long as your account exists. To delete all your data:',
    steps: [
      'Go to Profile → Sign Out in the app',
      'Contact us at the email below to request full account and data deletion from our servers',
    ] as const,
    stepOneStrong: 'Profile → Sign Out',
    outro: 'Upon deletion, all your data — including workout logs, scores, and coach relationships — is permanently removed from our servers.',
  },
  yourRights: {
    heading: 'Your Rights',
    intro: 'You have the right to:',
    items: [
      'Access the data we store about you',
      'Request correction of inaccurate data',
      'Request deletion of your account and all associated data',
      'Withdraw HealthKit permissions at any time via iOS Settings → Privacy & Security → Health',
    ] as const,
  },
  children: {
    heading: 'Children',
    p1: 'Tuwa is not directed at children under 13. We do not knowingly collect data from children.',
  },
  changes: {
    heading: 'Changes to This Policy',
    p1: 'We may update this policy from time to time. Changes will be posted to this page with an updated date.',
  },
  contact: {
    heading: 'Contact',
    intro: 'For privacy questions or data deletion requests:',
    emailLabel: 'Email',
    email: 'hanwenma09@gmail.com',
  },
} as const;

export default privacy;
export type Privacy = WidenStrings<typeof privacy>;
