// The OAuth consent page (tuwa.app/oauth/consent) for the Tuwa MCP connector.
// Supabase's OAuth 2.1 server sends the athlete here, always to the same path, so the
// page picks the language at runtime (navigator.language, or ?lang=zh / ?lang=en).
// The "reads" / "never" lines match the app's AI connector sheet (aiConnector.* in
// WorkloadApp/Resources/Localizable.xcstrings). Change both together.

const oauthConsent = {
  meta: {
    title: 'Connect your AI app',
    description: 'Sign in to Tuwa and allow or deny an AI app that asks to connect.',
  },
  loading: 'Checking the request…',
  signIn: {
    heading: 'Sign in to Tuwa',
    lede: 'An AI app asks to connect to your Tuwa account. Sign in with the method you use in the Tuwa app.',
    apple: 'Continue with Apple',
    google: 'Continue with Google',
    or: 'or',
    emailLabel: 'Email',
    emailHint: 'Use the email of your Tuwa account.',
    passwordLabel: 'Password',
    passwordHint: 'The password you use in the Tuwa app. No password? Send a one-time code instead.',
    passwordSubmit: 'Sign in',
    sendCode: 'Send a code',
    codeLabel: 'Code from the email',
    codeSentTo: 'We sent a code to {email}.',
    linkNote: 'If the email shows a link, open the link in this browser.',
    verify: 'Sign in',
    otherEmail: 'Use another email',
    forgotPassword: 'Forgot your password?',
    resetSentTo: 'If a Tuwa account uses {email}, a 6-digit code is on its way. Enter it and choose a new password.',
    resetResent: 'If a Tuwa account uses this email, a new code is on its way.',
    newPasswordLabel: 'New password',
    newPasswordHint: 'At least 8 characters. The Tuwa app uses the new password too.',
    resetSubmit: 'Set password and sign in',
    resetResend: 'Send a new code',
  },
  consent: {
    heading: '{client} wants to connect to your Tuwa account',
    returnTo: 'After you choose, you return to {host}.',
    readsKey: 'It can read',
    reads:
      "Your recovery and sleep scores (composite scores only — raw Apple Health readings never leave your phone), the day's decision, your logged sessions and training load, your personal records, and your plan — its position and its text.",
    sendsKey: 'It can send',
    sends: 'A plan draft. The draft stays a draft until you activate it in Tuwa.',
    cannotKey: 'It cannot',
    cannot: 'Change your plan, log a workout or answer your check-in.',
    neverKey: 'Never sent',
    never: 'No number from Apple Health — no heart rate, HRV, sleep time, temperature or cycle data.',
    accountKey: 'Sign-in details',
    accountEmail: 'your account email',
    accountName: 'your account name',
    accountPhone: 'your phone number',
    account: '{client} also receives {items}.',
    providerKey: 'Your AI provider',
    provider: 'It handles what it reads under its own terms.',
    keptKey: 'Kept',
    kept: 'Tuwa keeps the plan drafts your AI app sends and a count of its requests, with your account. Your AI provider keeps what it reads under its own terms.',
    inApp: 'Tuwa serves your data only after you also allow the connector in the app: Profile › Legal › AI connector.',
    revoke:
      "You can disconnect at any time in your AI app's connector settings, or turn the connector off in Tuwa › Profile › Legal › AI connector.",
    signedInAs: 'Signed in as {email}.',
    signOut: 'Not you? Sign out',
    allow: 'Allow',
    deny: 'Deny',
  },
  done: {
    allowed: 'Allowed. Returning to {client}…',
    denied: 'Denied. Returning to {client}…',
    manual: 'Nothing happened? Continue',
  },
  errors: {
    missing: 'This page opens from your AI app when you add the Tuwa connector. Start again in your AI app.',
    expired: 'This request expired or was already used. Start again in your AI app.',
    generic: 'Something went wrong. Start again in your AI app.',
    noAccount: 'No Tuwa account uses this email. Create your account in the Tuwa app first, or sign in with Apple or Google.',
    badEmail: 'Enter a valid email.',
    badCode: 'That code did not work. Check it, or send a new code.',
    noPassword: 'Enter your password, or send a code.',
    badPassword: 'That email and password do not match. Check them, or send a code.',
    emailNotConfirmed: 'This email is not confirmed yet. Open the confirmation email from Tuwa, then try again.',
    badResetCode: 'That code is wrong or has expired. Check it, or send a new one.',
    shortPassword: 'Choose a password of at least 8 characters.',
    samePassword: 'Choose a new password, not the one you use now.',
    weakPassword: 'Choose a longer or stronger password.',
    rateLimit: 'Too many attempts. Wait a minute, then try again.',
    signInFailed: 'Sign-in did not finish. Try again.',
  },
};

type WidenStrings<T> = T extends string ? string : { [K in keyof T]: WidenStrings<T[K]> };
export type OAuthConsent = WidenStrings<typeof oauthConsent>;

export default oauthConsent as OAuthConsent;
