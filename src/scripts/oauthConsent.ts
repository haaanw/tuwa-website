// The OAuth consent page for the Tuwa MCP connector (tuwa.app/oauth/consent).
//
// Supabase's OAuth 2.1 server (Authentication › OAuth Server, authorization path
// /oauth/consent) sends the athlete here with ?authorization_id=…. The page:
//   1. signs the athlete in (Apple, Google, email + password as in the app, or a one-time email
//      code — never a sign-up; the password path also serves directory reviewers, who may not
//      use codes or magic links),
//   2. reads the request (getAuthorizationDetails) and shows what the AI app gets,
//   3. sends Allow / Deny (approveAuthorization / denyAuthorization) and follows the
//      redirect_url back to the AI app.
// Every value from the request (client name, redirect URI) is untrusted and goes into the
// page through textContent only. The page never stores anything of its own.

import { createClient, type AuthError, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '../config';
import en, { type OAuthConsent } from '../i18n/locales/en/oauth-consent';
import zh from '../i18n/locales/zh/oauth-consent';

type State = 'loading' | 'error' | 'signin' | 'consent' | 'done';

// MARK: - Language

function resolveLanguage(params: URLSearchParams): 'en' | 'zh' {
  const forced = params.get('lang');
  if (forced === 'zh' || forced === 'en') return forced;
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const lower = tag.toLowerCase();
    if (lower.startsWith('zh')) return 'zh';
    if (lower.startsWith('en')) return 'en';
  }
  return 'en';
}

/** Reads a dotted key ("consent.allow") from the string table. */
function lookup(table: OAuthConsent, key: string): string {
  let node: unknown = table;
  for (const part of key.split('.')) {
    node = (node as Record<string, unknown> | undefined)?.[part];
  }
  return typeof node === 'string' ? node : key;
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match);
}

// MARK: - Page wiring

const params = new URLSearchParams(window.location.search);
const language = resolveLanguage(params);
const t = language === 'zh' ? zh : en;
const authorizationId = params.get('authorization_id');

document.documentElement.lang = language;
document.title = `${t.meta.title} — Tuwa`;

const root = document.querySelector<HTMLElement>('[data-oauth-consent]');

function element<T extends HTMLElement = HTMLElement>(name: string): T {
  const found = root?.querySelector<T>(`[data-el="${name}"]`);
  if (!found) throw new Error(`OAuth consent: missing element ${name}`);
  return found;
}

function translateStatic(): void {
  root?.querySelectorAll<HTMLElement>('[data-t]').forEach((node) => {
    node.textContent = lookup(t, node.dataset.t ?? '');
  });
  root?.querySelectorAll<HTMLInputElement>('[data-t-placeholder]').forEach((node) => {
    node.placeholder = lookup(t, node.dataset.tPlaceholder ?? '');
  });
}

function show(state: State): void {
  root?.querySelectorAll<HTMLElement>('[data-state]').forEach((section) => {
    section.hidden = section.dataset.state !== state;
  });
  root?.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
}

function showError(message: string): void {
  element('error-message').textContent = message;
  show('error');
}

function setNote(name: string, message: string | null): void {
  const note = element(name);
  note.textContent = message ?? '';
  note.hidden = !message;
}

function setBusy(busy: boolean): void {
  root?.querySelectorAll<HTMLButtonElement | HTMLInputElement>('button, input').forEach((control) => {
    control.disabled = busy;
  });
}

/** The page's own address with only authorization_id (and an explicit lang) kept. */
function consentUrl(): string {
  const url = new URL('/oauth/consent/', window.location.origin);
  if (authorizationId) url.searchParams.set('authorization_id', authorizationId);
  const forced = params.get('lang');
  if (forced) url.searchParams.set('lang', forced);
  return url.toString();
}

/** Drops the sign-in leftovers (?code=, ?error=) from the address bar. */
function cleanAddressBar(): void {
  window.history.replaceState(null, '', consentUrl());
}

/** "claude.ai" for https URIs, "claude://" for a custom scheme, the raw text otherwise. */
function describeDestination(uri: string): string {
  try {
    const parsed = new URL(uri);
    return parsed.host || `${parsed.protocol}//`;
  } catch {
    return uri;
  }
}

/** A redirect target the page may follow: an absolute URL that is not javascript:/data:. */
function safeRedirect(uri: string): string | null {
  try {
    const parsed = new URL(uri);
    const blocked = ['javascript:', 'data:', 'vbscript:', 'blob:', 'file:'];
    return blocked.includes(parsed.protocol) ? null : parsed.toString();
  } catch {
    return null;
  }
}

// MARK: - Error mapping

function signInErrorMessage(error: AuthError): string {
  const code = error.code ?? '';
  if (error.status === 429 || code.includes('rate_limit')) return t.errors.rateLimit;
  if (code === 'otp_disabled' || code === 'signup_disabled' || code === 'user_not_found') return t.errors.noAccount;
  if (/signups? not allowed/i.test(error.message)) return t.errors.noAccount;
  if (code === 'validation_failed' || code === 'email_address_invalid') return t.errors.badEmail;
  if (code === 'otp_expired' || code === 'invalid_credentials' || error.status === 403) return t.errors.badCode;
  return t.errors.signInFailed;
}

/** The password path's own mapping: a wrong pair never says which half was wrong. */
function passwordErrorMessage(error: AuthError): string {
  const code = error.code ?? '';
  if (error.status === 429 || code.includes('rate_limit')) return t.errors.rateLimit;
  if (code === 'email_not_confirmed') return t.errors.emailNotConfirmed;
  if (code === 'invalid_credentials' || error.status === 400) return t.errors.badPassword;
  return t.errors.signInFailed;
}

/** The reset's own mapping (ruling A1): no message says whether an account uses the email. */
function resetErrorMessage(error: AuthError): string {
  const code = error.code ?? '';
  if (error.status === 429 || code.includes('rate_limit')) return t.errors.rateLimit;
  if (code === 'otp_expired' || error.status === 403) return t.errors.badResetCode;
  if (code === 'same_password') return t.errors.samePassword;
  if (code === 'weak_password') return t.errors.weakPassword;
  if (code === 'validation_failed' || code === 'email_address_invalid') return t.errors.badEmail;
  return t.errors.signInFailed;
}

// MARK: - Flow

async function loadRequest(supabase: SupabaseClient): Promise<void> {
  if (!authorizationId) return;
  show('loading');
  const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
  if (error || !data) {
    const expired = error && (error.status === 400 || error.status === 404 || error.status === 410);
    showError(expired ? t.errors.expired : t.errors.generic);
    return;
  }
  // Already allowed for these scopes: Supabase answers with the redirect at once.
  if (!('authorization_id' in data)) {
    const target = safeRedirect(data.redirect_url);
    if (target) {
      window.location.assign(target);
    } else {
      showError(t.errors.generic);
    }
    return;
  }

  const clientName = data.client?.name?.trim() || describeDestination(data.redirect_uri);
  element('consent-heading').textContent = fill(t.consent.heading, { client: clientName });
  element('consent-return').textContent = fill(t.consent.returnTo, { host: describeDestination(data.redirect_uri) });

  const scopes = new Set((data.scope ?? '').split(/\s+/).filter(Boolean));
  const items: string[] = [];
  if (scopes.has('email')) items.push(t.consent.accountEmail);
  if (scopes.has('profile')) items.push(t.consent.accountName);
  if (scopes.has('phone')) items.push(t.consent.accountPhone);
  const separator = language === 'zh' ? '、' : ', ';
  element('account-row').hidden = items.length === 0;
  element('account-value').textContent = items.length
    ? fill(t.consent.account, { client: clientName, items: items.join(separator) })
    : '';

  element('signed-in-as').textContent = fill(t.consent.signedInAs, { email: data.user?.email ?? '' });
  root?.setAttribute('data-client', clientName);
  show('consent');
}

async function decide(supabase: SupabaseClient, allow: boolean): Promise<void> {
  if (!authorizationId) return;
  setBusy(true);
  const result = allow
    ? await supabase.auth.oauth.approveAuthorization(authorizationId, { skipBrowserRedirect: true })
    : await supabase.auth.oauth.denyAuthorization(authorizationId, { skipBrowserRedirect: true });
  setBusy(false);

  const target = result.data ? safeRedirect(result.data.redirect_url) : null;
  if (result.error || !target) {
    const expired = result.error && (result.error.status === 400 || result.error.status === 404);
    showError(expired ? t.errors.expired : t.errors.generic);
    return;
  }
  const clientName = root?.getAttribute('data-client') ?? '';
  element('done-message').textContent = fill(allow ? t.done.allowed : t.done.denied, { client: clientName });
  element<HTMLAnchorElement>('done-link').href = target;
  show('done');
  window.location.assign(target);
}

function wireSignIn(supabase: SupabaseClient): void {
  const emailForm = element<HTMLFormElement>('email-form');
  const codeForm = element<HTMLFormElement>('code-form');
  const emailInput = element<HTMLInputElement>('email-input');
  const passwordInput = element<HTMLInputElement>('password-input');
  const codeInput = element<HTMLInputElement>('code-input');
  let sentTo = '';

  /** The trimmed email, or null after showing the note when it is not an email. */
  const readEmail = (): string | null => {
    const email = emailInput.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNote('signin-note', t.errors.badEmail);
      return null;
    }
    return email;
  };

  const startProvider = async (provider: 'apple' | 'google') => {
    setNote('signin-note', null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: consentUrl() },
    });
    if (error) {
      setBusy(false);
      setNote('signin-note', signInErrorMessage(error));
    }
  };
  element('apple-button').addEventListener('click', () => void startProvider('apple'));
  element('google-button').addEventListener('click', () => void startProvider('google'));

  // Email + password, as the app signs email accounts in. signInWithPassword never creates an
  // account, so this page still signs in existing Tuwa accounts only.
  emailForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = readEmail();
    if (!email) return;
    const password = passwordInput.value;
    if (!password) {
      setNote('signin-note', t.errors.noPassword);
      passwordInput.focus();
      return;
    }
    setNote('signin-note', null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    passwordInput.value = '';
    if (error) {
      setNote('signin-note', passwordErrorMessage(error));
      return;
    }
    await loadRequest(supabase);
  });

  element('send-code').addEventListener('click', async () => {
    const email = readEmail();
    if (!email) return;
    setNote('signin-note', null);
    setBusy(true);
    // shouldCreateUser: false — this page signs in existing Tuwa accounts only.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: consentUrl() },
    });
    setBusy(false);
    if (error) {
      setNote('signin-note', signInErrorMessage(error));
      return;
    }
    sentTo = email;
    element('code-sent').textContent = fill(t.signIn.codeSentTo, { email });
    emailForm.hidden = true;
    codeForm.hidden = false;
    codeInput.focus();
  });

  codeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const token = codeInput.value.replace(/\s+/g, '');
    if (!/^\d{6,10}$/.test(token)) {
      setNote('signin-note', t.errors.badCode);
      return;
    }
    setNote('signin-note', null);
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({ email: sentTo, token, type: 'email' });
    setBusy(false);
    if (error) {
      setNote('signin-note', signInErrorMessage(error));
      return;
    }
    await loadRequest(supabase);
  });

  element('other-email').addEventListener('click', () => {
    codeInput.value = '';
    codeForm.hidden = true;
    emailForm.hidden = false;
    setNote('signin-note', null);
    emailInput.focus();
  });

  wirePasswordReset(supabase, emailForm, emailInput, readEmail);
}

/**
 * Forgot password (ruling A1, as in the app): the email → a 6-digit code → the code and a new
 * password in one form → signed in. The new password is saved before the page reads the
 * request, so the code alone never ends in a sign-in here, and no line says whether an
 * account uses the email (Supabase sends nothing to an unknown address and answers the same).
 */
function wirePasswordReset(
  supabase: SupabaseClient,
  emailForm: HTMLFormElement,
  emailInput: HTMLInputElement,
  readEmail: () => string | null,
): void {
  const resetForm = element<HTMLFormElement>('reset-form');
  const resetCodeInput = element<HTMLInputElement>('reset-code-input');
  const newPasswordInput = element<HTMLInputElement>('new-password-input');
  const resendButton = element<HTMLButtonElement>('reset-resend');
  let resetEmail = '';
  // True once the code checked out: the code is used up, so a failed save retries the save
  // only, and leaving the form ends the recovery session the code opened.
  let codeVerified = false;

  const sendResetCode = async (email: string): Promise<boolean> => {
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setBusy(false);
    if (error) {
      setNote('signin-note', resetErrorMessage(error));
      return false;
    }
    return true;
  };

  element('forgot-password').addEventListener('click', async () => {
    const email = readEmail();
    if (!email) return;
    setNote('signin-note', null);
    if (!(await sendResetCode(email))) return;
    resetEmail = email;
    codeVerified = false;
    resetCodeInput.readOnly = false;
    resendButton.hidden = false;
    element('reset-sent').textContent = fill(t.signIn.resetSentTo, { email });
    emailForm.hidden = true;
    resetForm.hidden = false;
    resetCodeInput.focus();
  });

  resendButton.addEventListener('click', async () => {
    setNote('signin-note', null);
    if (await sendResetCode(resetEmail)) {
      element('reset-sent').textContent = t.signIn.resetResent;
    }
  });

  resetForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const token = resetCodeInput.value.replace(/\s+/g, '');
    const password = newPasswordInput.value;
    if (!codeVerified && !/^\d{6,10}$/.test(token)) {
      setNote('signin-note', t.errors.badResetCode);
      resetCodeInput.focus();
      return;
    }
    if (password.length < 8) {
      setNote('signin-note', t.errors.shortPassword);
      newPasswordInput.focus();
      return;
    }
    setNote('signin-note', null);
    setBusy(true);
    if (!codeVerified) {
      const { error } = await supabase.auth.verifyOtp({ email: resetEmail, token, type: 'recovery' });
      if (error) {
        setBusy(false);
        setNote('signin-note', resetErrorMessage(error));
        return;
      }
      codeVerified = true;
      resetCodeInput.readOnly = true;
      resendButton.hidden = true;
    }
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      setNote('signin-note', resetErrorMessage(error));
      return;
    }
    newPasswordInput.value = '';
    await loadRequest(supabase);
  });

  element('reset-back').addEventListener('click', async () => {
    if (codeVerified) {
      // The checked code opened a recovery session; leaving the reset ends it.
      setBusy(true);
      await supabase.auth.signOut({ scope: 'local' });
      setBusy(false);
    }
    codeVerified = false;
    resetCodeInput.readOnly = false;
    resetCodeInput.value = '';
    newPasswordInput.value = '';
    resendButton.hidden = false;
    resetForm.hidden = true;
    emailForm.hidden = false;
    setNote('signin-note', null);
    emailInput.focus();
  });
}

async function start(): Promise<void> {
  if (!root) return;
  translateStatic();

  if (!authorizationId) {
    showError(t.errors.missing);
    return;
  }

  const providerError = params.get('error_description') ?? params.get('error');
  const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      flowType: 'pkce',
      detectSessionInUrl: true,
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'tuwa-oauth-consent',
    },
  });

  wireSignIn(supabase);
  element('allow-button').addEventListener('click', () => void decide(supabase, true));
  element('deny-button').addEventListener('click', () => void decide(supabase, false));
  element('sign-out').addEventListener('click', async () => {
    setBusy(true);
    await supabase.auth.signOut({ scope: 'local' });
    setBusy(false);
    show('signin');
  });

  // getSession waits for the client to finish any ?code= exchange (Apple, Google, email link).
  const { data } = await supabase.auth.getSession();
  if (params.has('code') || params.has('error')) cleanAddressBar();

  if (data.session) {
    // getUser asks Supabase Auth, so a revoked or expired local session is not trusted.
    const { data: userData, error } = await supabase.auth.getUser();
    if (!error && userData.user) {
      await loadRequest(supabase);
      return;
    }
    await supabase.auth.signOut({ scope: 'local' });
  }

  show('signin');
  if (providerError) setNote('signin-note', t.errors.signInFailed);
}

void start().catch((error: unknown) => {
  console.error('OAuth consent error:', error);
  showError(t.errors.generic);
});
