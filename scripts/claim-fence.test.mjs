import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scanText } from './claim-fence.mjs';

test('a planted forbidden word fails in each locale', () => {
  assert.equal(scanText("body: 'Your plan, made safe.'", { file: 'x.ts' }).length, 1);
  assert.equal(scanText("body: 'Spikes raise injury risk.'", { file: 'x.ts' }).length, 2);
  assert.equal(scanText("body: '你的计划，更安全。'", { file: 'x.ts', locale: 'zh' }).length, 1);
  assert.equal(scanText("body: 'Rendu sûr et optimal.'", { file: 'x.ts', locale: 'fr' }).length, 1);
  assert.equal(scanText("body: 'Le risque de blessure monte.'", { file: 'x.ts', locale: 'fr' }).length, 2);
});

test('French "sur" and English "sure" are not hits', () => {
  assert.equal(scanText("a: 'Télécharger sur l’App Store.'", { file: 'x.ts', locale: 'fr' }).length, 0);
  assert.equal(scanText("a: 'Make sure the plan is yours.'", { file: 'x.ts' }).length, 0);
});

test('an allow marker, a citation and a sources list are exempt', () => {
  assert.equal(scanText("'it does not diagnose, treat, or prevent injury', // claim-fence-allow: disclaimer", { file: 'x.ts' }).length, 0);
  assert.equal(scanText('"label": "Gabbett TJ (2016). The training–injury prevention paradox. Br J Sports Med."', { file: 'x.ts' }).length, 0);
  assert.equal(scanText('Intro.\n\n## Sources\n\n- A paper on injury risk.', { file: 'x.mdx' }).length, 0);
  assert.equal(scanText('{/* claim-fence-allow-start: papers */}\nInjury risk was studied.\n{/* claim-fence-allow-end */}\nInjury risk.', { file: 'x.mdx' }).length, 2);
});

test('code tokens and code comments are not copy', () => {
  assert.equal(scanText('color: var(--color-zone-danger);', { file: 'x.astro' }).length, 0);
  assert.equal(scanText('padding: env(safe-area-inset-top);', { file: 'x.astro' }).length, 0);
  assert.equal(scanText('// replaces "Made safe and optimal"', { file: 'x.ts' }).length, 0);
});
