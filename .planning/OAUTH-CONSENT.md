# OAuth consent page — tuwa.app/oauth/consent (app v1.7.6, MCP connector)

Built 2026-10-15 by CLAUDE on HAN's go (pair claim C-oauth-001). NOT deployed. App-side record:
`.planning/v176/MCP-DEPLOY.md` §3 and §5 in the app repo (branch `claude/version-1-7-6-prep-a45148`).

## What it is

Supabase's OAuth 2.1 server (production project `wbqnzblcixlmlwbqmxjp`, Authentication › OAuth
Server, authorization path `/oauth/consent`) sends the athlete to **Site URL + `/oauth/consent`**
with `?authorization_id=…` when they add the Tuwa connector to Claude or ChatGPT.

- `src/pages/oauth/consent.astro` — the markup: five states (loading, error, sign-in, consent,
  done), all hidden until the script shows one. One route for every language.
- `src/scripts/oauthConsent.ts` — the flow: sign in an EXISTING account (Apple, Google, or a
  one-time email code with `shouldCreateUser: false`), `getAuthorizationDetails`, then
  `approveAuthorization` / `denyAuthorization` and follow `redirect_url`. Request values (client
  name, redirect URI) go in through `textContent` only; a `javascript:` / `data:` redirect is refused.
- `src/i18n/locales/{en,zh}/oauth-consent.ts` — the strings. Language = `?lang=` or the browser.
  The "reads" / "never sent" lines match the app's AI connector sheet (`aiConnector.*`).
- `src/config.ts` — `SUPABASE_URL` + the publishable key (public by design, the same one the app ships).
- `public/_headers` — `/oauth/*`: noindex, never framed, no-store, no referrer. The sitemap skips it.
- Dependency: `@supabase/supabase-js` 2.117.2 (exact; bundled by Vite — no CDN).

Allow and Deny are equal-weight butted cells. The page shows the sign-in scopes in plain words
(email / name / phone) because the AI app receives them with the token.

Checked locally (astro preview on :3000): the missing-id error, the sign-in state en + zh at
375 pt, the "no account" path for an unknown email, the consent state (filled by hand), and
"Continue with Google" reaching Google's sign-in page (client + callback accepted). NOT checked:
a real sign-in, a real Allow / Deny round trip (needs HAN's account).

## State of the Supabase settings (read 2026-10-15)

- OAuth server ON, dynamic registration ON, authorization path `/oauth/consent`: DONE.
- Site URL `http://localhost:3000`: real athletes land on a dead page until step 2.
- Google: client ID + secret set; the web flow works.
- Apple: Client IDs = `com.tonus.app` only, no web secret: "Continue with Apple" fails until step 3.
- Email: Supabase's built-in mailer (team members only, rate-limited); the "Magic link or OTP"
  template has the link only, no `{{ .Token }}`.

## HAN's steps (in this order)

1. **Deploy the page.** Merge `claude/oauth-consent` into `main` and push; Cloudflare Pages
   builds it. Check that `https://tuwa.app/oauth/consent/` says "This page opens from your AI app…".
2. **Site URL + redirect allow-list** (Authentication › URL Configuration), AFTER step 1:
   - Site URL: `https://tuwa.app`.
   - Add the redirect URL `https://tuwa.app/oauth/consent/**`. Keep `com.tonus.app://login-callback`.
   - Effect elsewhere: emails that use `{{ .SiteURL }}` and auth redirects without an allowed
     `redirect_to` point at tuwa.app instead of localhost. The app's sign-ins (password, Apple
     and Google ID tokens) do not use the Site URL. "Confirm email" is OFF.
3. **Sign in with Apple on the web** (Apple Developer › Certificates, Identifiers & Profiles):
   1. Identifiers › "+" › Services IDs. Description "Tuwa web sign-in", identifier
      `com.tonus.app.web`. Register.
   2. Open it › tick Sign in with Apple › Configure. Primary App ID `com.tonus.app`. Domain
      `wbqnzblcixlmlwbqmxjp.supabase.co`. Return URL
      `https://wbqnzblcixlmlwbqmxjp.supabase.co/auth/v1/callback`. Save › Continue › Save.
   3. Keys › "+" › name "Tuwa web sign-in" › tick Sign in with Apple › Configure ›
      `com.tonus.app` › Register. Download the `.p8` (one download only). Note the Key ID.
      Team ID `9XTU7KMJ4J`.
   4. Make the client secret: a JWT signed with the `.p8`, valid at most 6 months (Supabase's
      Apple guide has a generator; or CLAUDE runs a local script — the `.p8` stays on the Mac).
   5. Supabase › Authentication › Sign In / Providers › Apple: Client IDs =
      `com.tonus.app.web,com.tonus.app` — **the Services ID FIRST**. Supabase Auth uses the
      first ID for the web flow (`ClientID[0]` in `provider/apple.go`); the app's native
      ID-token sign-in accepts every ID in the list, so the app keeps working. Secret Key
      (for OAuth) = the JWT. Save.
   6. Put a renewal in the calendar (≤ 6 months). An expired secret stops web sign-in with
      Apple only; the app's native sign-in does not use it.
   - Apple's user ID is per team, so the same Apple ID on the web finds the athlete's account.
4. **Email codes** (Authentication › Emails):
   1. SMTP Settings: a custom sender (e.g. Resend or Postmark, `no-reply@tuwa.app` with SPF +
      DKIM on tuwa.app). Without it, codes reach team members only.
   2. Templates › Magic link or OTP: add the code, e.g.
      `<p>Your Tuwa code: <strong>{{ .Token }}</strong></p>`, above the link. Without
      `{{ .Token }}` only the link works, and only in the same browser.
   3. "Hide My Email" accounts: the relay drops mail from a domain not registered with Apple;
      those athletes use "Continue with Apple".
5. **End-to-end check:** Claude Desktop › Settings › Connectors › Add custom connector ›
   `https://wbqnzblcixlmlwbqmxjp.supabase.co/functions/v1/mcp` → this page → Allow → in Claude,
   `get_today` answers (with Profile › Legal › AI connector ON in the app). Then ChatGPT
   (Developer Mode › add a custom MCP server).

**Test before step 2.** While the Site URL is `http://localhost:3000`, the whole flow runs on
HAN's Mac: in this folder run `npm run build`, then `npx astro preview --port 3000`, then add
the connector in Claude Desktop. Google works now; Apple needs step 3; the email link (not
the code) works for a team-member address.

## Open

- The page has the site header + footer. A bare page (logo only) is possible if HAN prefers.
- The privacy policy (en / zh / fr) must name the connector path before a directory listing
  (MCP-DEPLOY §5.2) — CODEX's lane.
- fr: the page falls back to English.
