type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const privacy = {
  meta: {
    title: 'Privacy Policy',
    lastUpdated: 'August 24, 2026',
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
          description: 'Email address and display name (used for authentication)',
        },
        {
          label: 'Workout logs',
          description: 'Exercises, sets, reps, weights, RPE, session duration, and notes you enter',
        },
        {
          label: 'Wellness check-ins',
          description: 'Self-reported sleep quality, soreness, energy, and stress ratings',
        },
        {
          label: 'Workout descriptions',
          description: 'The sentence you speak, type, or dictate when you log a session in words (see Workout Text Parsing below)',
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
        description: 'Composite scores (recovery score, workload snapshots, wellness ratings, workout session headers, and personal records) sync to Supabase (hosted on AWS) for multi-device access.',
      },
      {
        label: 'Raw HealthKit data is never uploaded.',
        description: 'Only computed scores derived from HealthKit data are synced.',
      },
    ] as const,
  },
  // Added for app v1.7.2 (voice and text logging). The workout narrative the
  // athlete submits is the ONLY thing that takes this path; the HealthKit claim
  // above is unchanged and is restated here so the two cannot be confused.
  voiceParsing: {
    heading: 'Workout Text Parsing',
    p1: 'When you log a session by describing it — spoken in the app, typed, or dictated with the keyboard microphone — speech is converted to text on your device, and that text is sent to our parsing service so it can be turned into a draft of sets, reps, and weights for you to review.',
    p2: 'The text is processed by a third-party language model provider (DeepSeek) on our behalf. Requests require a signed-in account and are limited by a daily quota per user.',
    items: [
      {
        label: 'What is sent',
        description: 'Only the workout description you submitted, and the units you train in.',
      },
      {
        label: 'What is never sent',
        description: 'No HealthKit data of any kind, no recovery or readiness scores, no email address, and no audio recording — only text.',
      },
      {
        label: 'It is optional',
        description: 'Manual entry does the same job. If you never describe a session in words, nothing is ever sent to the parsing service.',
      },
    ] as const,
    p3: 'The parsed result is returned to your device as a draft. Nothing is saved to your log until you confirm it.',
    healthKitReminder: 'This is separate from the HealthKit rule above, which is unchanged: raw HealthKit data is never uploaded, to this service or to any other.',
    healthKitReminderStrong: 'raw HealthKit data is never uploaded',
  },
  dataSharing: {
    heading: 'Data Sharing',
    p1: 'Tuwa does not share your training or recovery data with coaches, other users, advertisers, or data brokers. If future sharing features are added, they will require your explicit consent.',
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
      {
        label: 'DeepSeek',
        description: '(language model that parses workout descriptions into sets — text only)',
        url: 'https://cdn.deepseek.com/policies/en-US/deepseek-privacy-policy.html',
        urlDisplay: 'deepseek.com privacy policy',
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
    outro: 'Upon deletion, all your data — including workout logs and scores — is permanently removed from our servers.',
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
    email: 'support@tuwa.app',
  },
} as const;

export default privacy;
export type Privacy = WidenStrings<typeof privacy>;
