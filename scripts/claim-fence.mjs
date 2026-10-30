#!/usr/bin/env node
// Claim fence (W0.3, LEGAL-AUDIT A1). Marketing copy describes readings, accumulation and
// trajectory. It never names injury risk, never forecasts harm, never calls the product "safe".
// `npm run build` runs this first and fails on a forbidden word in en / zh / fr marketing text.
//
// Exempt:
//   - the legal pages (privacy, terms, health data, the OAuth consent page);
//   - the sources lists: citation lines (a year plus a journal or "et al") and every line after
//     a "Sources" / "References" heading in a blog post;
//   - a line that carries `claim-fence-allow`, or follows a line (blank lines skipped) that carries
//     it, and every line between `claim-fence-allow-start` and `claim-fence-allow-end`. Use them
//     only for a disclaimer, a negation ("Tuwa does not predict injury") or a description of what a
//     cited paper studied, and say why after the colon.
//
// Usage: node scripts/claim-fence.mjs [--root <dir>]

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const args = process.argv.slice(2);
const rootIndex = args.indexOf('--root');
const root = rootIndex >= 0 ? args[rootIndex + 1] : process.cwd();

// The scanned trees. Paths are relative to the site root.
const SCAN = ['src/i18n/locales', 'src/pages', 'src/components', 'src/layouts', 'src/scripts', 'src/data', 'src/content/blog', 'public/llms.txt'];
const EXTENSIONS = ['.ts', '.astro', '.mdx', '.md', '.txt'];

// Legal pages and utility code with no marketing copy.
const EXEMPT_FILES = [
  /\/locales\/(en|zh|fr)\/(privacy|terms|oauth-consent|health-data)\.ts$/,
  /\/pages\/(zh\/|fr\/)?(privacy|terms|health-data)\.astro$/,
  /\/pages\/oauth\//,
  /\/scripts\/oauthConsent\.ts$/,
  /\/components\/blog\/sources\.ts$/,
];

// Forbidden words. Each rule: a pattern and the locale it guards (all text is checked against
// every rule; a French word in an English file is still a hit).
const RULES = [
  { label: 'injury', re: /\binjur(y|ies|ed|e|es|ing)\b/i },
  { label: 'safe', re: /\b(un)?safe(r|st|ly|ty)?\b/i },
  { label: 'danger', re: /\bdanger(s|ous|eux|euse)?\b/i },
  { label: 'risk', re: /\brisk(s|y|ier)?\b/i },
  { label: 'blessure', re: /\bbless(ure|ures|é|ée|és|ées)\b/i },
  { label: 'sûr', re: /(^|[^\p{L}])sûre?s?(?=$|[^\p{L}])/iu },
  { label: 'sécurité', re: /s[ée]curit[ée]/i },
  { label: 'risque', re: /\brisques?\b/i },
  { label: '伤病', re: /伤病/ },
  { label: '受伤', re: /受伤/ },
  { label: '安全', re: /安全/ },
  { label: '危险', re: /危险/ },
  { label: '风险', re: /风险/ },
];

// Code tokens that contain a forbidden word but are not copy.
const CODE_TOKENS = [
  /[\w-]*zone-danger[\w-]*/g,
  /[\w-]*color-danger[\w-]*/g,
  /safe-area-inset[\w-]*/g,
  /\bsafeRedirect\b/g,
  /\bzseg-dang\b|\bzleg-dang\b/g,
];

// "sure" in English ("make sure") is not the French word; the fr rule only runs on fr text.
const FRENCH_ONLY = new Set(['sûr', 'sécurité', 'risque', 'blessure']);

const CITATION = /((19|20)\d\d)/;
const CITATION_MARK = /(Br J|British Journal|Journal|J Sports|Sports Med|Med Sci|Int J|J Strength|J Pediatr|PMID|pubmed|doi\.org|et al|et coll|杂志|期刊)/i;
const SOURCES_HEADING = /^#{2,3}\s+(Sources|References|Références|参考|来源)/i;

function walk(path, out) {
  let stats;
  try {
    stats = statSync(path);
  } catch {
    return;
  }
  if (stats.isDirectory()) {
    for (const name of readdirSync(path)) walk(join(path, name), out);
  } else if (EXTENSIONS.some((ext) => path.endsWith(ext))) {
    out.push(path);
  }
}

function localeOf(file) {
  const p = file.split(sep).join('/');
  if (/\/(locales\/)?fr\//.test(p) || /\/pages\/fr\//.test(p)) return 'fr';
  if (/\/(locales\/)?zh\//.test(p) || /\/pages\/zh\//.test(p)) return 'zh';
  return 'en';
}

export function scanText(text, { file = '<text>', locale = 'en' } = {}) {
  const hits = [];
  const isCode = /\.(ts|astro|mjs)$/.test(file);
  const lines = text.split('\n');
  let inSources = false;
  let inAllowBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (SOURCES_HEADING.test(raw)) inSources = true;
    if (inSources) continue;
    if (raw.includes('claim-fence-allow-start')) inAllowBlock = true;
    if (raw.includes('claim-fence-allow-end')) {
      inAllowBlock = false;
      continue;
    }
    if (inAllowBlock) continue;
    let p = i - 1;
    while (p >= 0 && lines[p].trim() === '') p--;
    const prev = p >= 0 ? lines[p] : '';
    const ALLOW_LINE = /claim-fence-allow(?!-(start|end))/;
    if (ALLOW_LINE.test(raw) || ALLOW_LINE.test(prev)) continue;
    if (CITATION.test(raw) && CITATION_MARK.test(raw)) continue;
    // Code comments are not copy (they may quote a retired claim to say why it left).
    if (isCode && /^\s*(\/\/|\/\*|\*)/.test(raw)) continue;
    let line = raw;
    for (const token of CODE_TOKENS) line = line.replace(token, ' ');
    for (const rule of RULES) {
      if (FRENCH_ONLY.has(rule.label) && locale !== 'fr') continue;
      const m = line.match(rule.re);
      if (m) hits.push({ file, line: i + 1, word: rule.label, text: raw.trim().slice(0, 140) });
    }
  }
  return hits;
}

function main() {
  const files = [];
  for (const entry of SCAN) walk(join(root, entry), files);
  const hits = [];
  for (const file of files) {
    const rel = relative(root, file).split(sep).join('/');
    if (EXEMPT_FILES.some((re) => re.test('/' + rel))) continue;
    hits.push(...scanText(readFileSync(file, 'utf8'), { file: rel, locale: localeOf('/' + rel) }));
  }
  if (hits.length) {
    console.error(`claim-fence: ${hits.length} forbidden word(s) in marketing copy.`);
    for (const h of hits) console.error(`  ${h.file}:${h.line}  [${h.word}]  ${h.text}`);
    console.error('Rewrite in reading language (readings, accumulation, trajectory), or mark a disclaimer / negation with claim-fence-allow.');
    process.exit(1);
  }
  console.log(`claim-fence: clean (${files.length} files scanned).`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
