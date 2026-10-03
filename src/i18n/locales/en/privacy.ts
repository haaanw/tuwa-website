type WidenStrings<T> = T extends string
  ? string
  : T extends readonly any[]
  ? { [K in keyof T]: WidenStrings<T[K]> }
  : { [K in keyof T]: WidenStrings<T[K]> };

const privacy = {
  meta: {
    title: 'Privacy Policy',
    lastUpdated: 'October 3, 2026',
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
    // Added 2026-10-03 for app v1.7.5: cycle-aware readings (opt-in). Cycle
    // data and sleeping wrist temperature are used on the phone only.
    cycleAware: {
      label: 'Cycle-aware readings (optional).',
      text: 'If you turn on cycle-aware readings in Profile, Tuwa asks Apple Health for your cycle data and your sleeping wrist temperature. Tuwa uses them only on your phone, to read your HRV and resting heart rate against your own baseline for the same part of your cycle. Cycle data never leaves your phone: it is not synced, not sent to any AI service and not shared with anyone. Turning the feature off stops the reading; you can also remove access in iOS Settings › Health.',
    },
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
  // Updated 2026-09-27: the parser now routes through OpenRouter (an AI
  // gateway) to OpenAI by default; DeepSeek is no longer used anywhere in
  // this pipeline. Consent copy added to match the app's one-time AI
  // processing permission screen and its Profile › Legal › AI processing
  // withdraw path (HAN ruling; release gate for the OpenRouter switch).
  voiceParsing: {
    heading: 'Workout Text Parsing',
    p1: 'When you log a session by typing a description of it, that text is sent to our parsing service so it can be turned into a draft of sets, reps, and weights for you to review.',
    p2: 'The text goes through OpenRouter, an AI gateway that routes it to a language model — by default an OpenAI model. Requests go through our backend, require a signed-in account, and are limited by a daily quota per user. We ask OpenRouter to route requests only to providers that do not store prompts for training.',
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
        description: 'Tuwa asks for your permission the first time you use either this feature or Program Import below, before it sends anything. You can withdraw permission at any time in Profile › Legal › AI processing — without it, nothing is sent, and you can still log by hand.',
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
        description: 'The text is sent through OpenRouter, an AI gateway, which passes it to a language model — by default an OpenAI model — to turn it into a structured program.',
      },
      {
        label: 'What you get back',
        description: 'A draft program is returned to your device for you to review. Nothing is saved until you confirm it.',
      },
    ] as const,
  },
  // Added 2026-10-03 for app v1.7.5: optional AI reasoning (Pro). OpenAI is
  // called DIRECTLY from Tuwa's server (not through OpenRouter). Retention is
  // up to 30 days for abuse monitoring (HAN 2026-10-03: no zero data
  // retention). Separate from the AI processing permission above.
  aiReasoning: {
    heading: 'AI Reasoning (Optional, Pro)',
    p1: "If you have Tuwa Pro and you turn on AI reasoning, Tuwa asks an AI model which change fits today's session. Tuwa's server sends the request directly to OpenAI, which processes it on our behalf.",
    items: [
      {
        label: 'What is sent',
        description: 'Your training plan, the sets you logged, and your readings expressed as words — for example "readiness high", "strain elevated", "match in 2 days".',
      },
      {
        label: 'What is never sent',
        description: 'Any number from Apple Health (no heart rate, HRV, sleep time, temperature or menstrual cycle data), your name, your email address or your account ID. OpenAI receives only a one-way hashed identifier so that it can detect abuse.',
      },
      {
        label: 'Why',
        description: "To suggest which change fits today, inside limits that Tuwa's own engine sets. Tuwa checks every answer against those limits, and you decide on every change. If the service does not answer, Tuwa shows its own suggestion.",
      },
      {
        label: 'Retention',
        description: 'OpenAI may keep requests for up to 30 days to monitor for abuse, then deletes them. OpenAI does not use them to train its models. We do not use this data for advertising.',
      },
      {
        label: 'Your choice',
        description: 'AI reasoning is off until you allow it. This permission is separate from the AI processing permission for typed workouts and program import. You can withdraw at any time in Profile › Legal › AI reasoning. When you withdraw, Tuwa stops sending and deletes its AI-reasoning records on your phone.',
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
        label: 'OpenRouter',
        description: '(AI gateway that routes workout and program text to a language model — text only)',
        url: 'https://openrouter.ai/privacy',
        urlDisplay: 'openrouter.ai/privacy',
      },
      {
        label: 'OpenAI',
        description: "(default language model behind OpenRouter for workout and program text, and called directly by Tuwa's server for optional AI reasoning — text only)",
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
