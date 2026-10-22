# Tuwa 1.7.6 website handoff — local verification

Checked 2026-10-22. Prepared on `codex/v176-website`, starting from website
`c6c55bf` (the fetched `origin/main`), in a clean website worktree. No push or deploy.

## Approved sources

App worktree: `.claude/worktrees/version-1-7-6-prep-a45148/.planning/v176/`.

- Applied `C2-website-consent.patch`, `B5-website-password-signin.patch`, then
  `A1-website-password-reset.patch`. All four affected files were compared against
  a separate application of that sequence to `c6c55bf`: byte-identical.
- `RULINGS-1.7.6.md` C3: the new privacy section and Data Sharing sentence in en,
  zh and fr. The section heading links to the public connector documentation.
- `B8-CONNECTOR-PAGE.md`: `/connector/` and `/zh/connector/`. The authoring notes
  about where the privacy links should land became `#ai-connector` deep links;
  they are not displayed as copy. All eight tools and all three prompts remain.
- J4 / TypeSafe is excluded. No changes to the existing AI Reasoning disclosure
  or processor list.

## Results

- `npm run build`: PASS, 82 pages.
- `git diff --check`: PASS.
- Rendered B8 copy in both languages and C3 copy in all three languages match
  the approved sources, ignoring layout whitespace and Markdown formatting.
  Straight and curly punctuation is preserved; no smart-punctuation rewriting.
- Both connector routes are in the generated sitemap, with canonical URLs and
  en / zh-CN alternates; neither has a noindex directive. Existing robots and
  header configuration permits their indexing. Actual search indexing awaits
  deployment and crawling.
- Footer links exist in all three site languages. French footer/privacy links
  lead to English connector documentation; the connector language switcher
  offers only the two existing pages.
- Chrome profile verified as **Hanwen** before local browser testing.
- Opened `/oauth/consent/?authorization_id=test&lang=en` and the same URL with
  `lang=zh`. Both rendered email and password inputs, Sign in, Send a code and
  Forgot your password? in the corresponding language. Password input is masked.
- Empty-email forgot-password (en) and send-code (zh) actions display the local
  email validation error. No credentials entered, no email sent, no real sign-in,
  password change or authorization submission. The authenticated recovery flow
  and email delivery are therefore not end-to-end tested here.
- English and Chinese connector pages visually checked on desktop and at 375px;
  no horizontal overflow, and the two-column tool table fits within the page.
  Chinese privacy deep link opens the new disclosure and its heading links back.
- `npx astro check`: two existing errors in `src/i18n/locales/fr/terms.ts:31` and
  `src/i18n/locales/zh/terms.ts:31` (six entries versus the English four-entry tuple),
  plus the existing `execCommand` deprecation hint in `CopyBlock.astro`. Those
  files are unchanged from the baseline. No diagnostics in this change's files.

## Release boundary

HAN's separate deploy go is still required. This record confirms local build,
copy and browser checks only; it does not claim production deployment or a real
OAuth/password-recovery round trip.
