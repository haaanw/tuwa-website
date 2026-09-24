type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const privacy = {
  meta: {
    title: 'Privacy Policy',
    lastUpdated: 'September 24, 2026',
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
          description: 'The sentence you type when you log a session in words (see Workout Text Parsing below)',
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
  // Updated 2026-09-24 for app v1.7.4: WORKOUT VOICE LOGGING WAS REMOVED (HAN
  // ruling). Only a typed workout description takes this path now. The
  // HealthKit claim above is unchanged and is restated here so the two cannot
  // be confused.
  voiceParsing: {
    heading: 'Workout Text Parsing',
    p1: 'When you log a session by typing a description of it, that text is sent to our parsing service so it can be turned into a draft of sets, reps, and weights for you to review.',
    p2: 'The text is processed by a third-party language model provider (DeepSeek) on our behalf. Requests require a signed-in account and are limited by a daily quota per user.',
    items: [
      {
        label: 'What is sent',
        description: 'Only the workout description you typed, and the units you train in.',
      },
      {
        label: 'What is never sent',
        description: 'No HealthKit data of any kind, no recovery or readiness scores, and no email address — only the text you typed.',
      },
      {
        label: 'It is optional',
        description: 'Manual entry does the same job. If you never type a description, nothing is ever sent to the parsing service.',
      },
    ] as const,
    p3: 'The parsed result is returned to your device as a draft. Nothing is saved to your log until you confirm it.',
    healthKitReminder: 'This is separate from the HealthKit rule above, which is unchanged: raw HealthKit data is never uploaded, to this service or to any other.',
    healthKitReminderStrong: 'raw HealthKit data is never uploaded',
  },
  // Added 2026-09-24 for app v1.7.4. Program import is a SEPARATE feature from
  // workout logging above. As of v1.7.4 the app no longer uses the microphone
  // or speech recognition anywhere: a program is brought in as pasted text or
  // a PDF/photo, with the text extracted on the device.
  programImport: {
    heading: 'Program Import',
    p1: 'You can bring a training program into Tuwa by pasting text, or by importing a PDF or photo of it — the text is extracted on your device.',
    items: [
      {
        label: 'What is sent',
        description: 'The program text you paste, or the text extracted from your PDF or photo on your device — text only. No audio, no HealthKit data, and no scores are sent.',
      },
      {
        label: 'Who processes it',
        description: 'A third-party language model provider (OpenAI) processes the text on our behalf to turn it into a structured program.',
      },
      {
        label: 'What you get back',
        description: 'A draft program is returned to your device for you to review. Nothing is saved until you confirm it.',
      },
    ] as const,
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
      {
        label: 'OpenAI',
        description: '(language model that parses imported training programs — text only)',
        url: 'https://openai.com/policies/privacy-policy/',
        urlDisplay: 'openai.com privacy policy',
      },
    ] as const,
    outro: 'We do not use any advertising networks, analytics trackers, or third-party data brokers.',
  },
  dataRetention: {
    heading: 'Data Retention and Deletion',
    intro: 'Your data is retained as long as your account exists. To delete your account and all its data:',
    steps: [
      'Go to Profile → Delete account in the app',
    ] as const,
    outro: 'This deletes your account and its data — including workout logs and scores — from our database. For any other privacy request, contact us at the email below.',
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
