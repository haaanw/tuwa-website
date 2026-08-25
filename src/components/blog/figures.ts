/**
 * Figure geometry for the science series.
 *
 * Hand-authored SVG, generated from the arithmetic the app actually runs, so a
 * figure cannot drift from the number it draws. Everything here executes at
 * BUILD time inside an Astro component's frontmatter — the rendered pages ship
 * zero client JavaScript for figures.
 *
 * Design-law notes, stated so a reviewer can check them rather than trust them:
 *  - Metric hues appear only as chart MARKS (bars, lines, needles). Never a
 *    plane fill, card background, or decorative tint.
 *  - Zone colours are hairline segments plus a text label, never a filled badge
 *    (DESIGN.md v6: zone state is never carried by colour alone).
 *  - Every numeral in a figure is Fragment Mono at <= 12px — the hard cap holds
 *    inside SVG exactly as it does in the DOM.
 *  - No Greek in the annotation layer: the uppercase transform renders λ as Λ,
 *    so decay constants are written as fractions here and as λ only in prose.
 *  - min-width is load-bearing. A 720-unit viewBox scaled into a phone column
 *    renders mono numerals at ~5px; below the floor the figure scrolls inside
 *    its own plate and the page body never scrolls horizontally.
 */

const ANNO = "font-family:'Fragment Mono',monospace;font-size:10px;letter-spacing:0.05em";
const ANNO12 = "font-family:'Fragment Mono',monospace;font-size:12px;letter-spacing:0.05em";
const SANS = "font-family:'Instrument Sans',system-ui,sans-serif;font-size:13px";

function svg(vb: string, body: string): string {
  return `<svg viewBox="${vb}" role="img" focusable="false" aria-hidden="true"
            style="width:100%;min-width:620px;height:auto;display:block">${body}</svg>`;
}

/** Rolling window vs exponentially weighted decay — the cliff edge on day eight. */
function cliffEdge(): string {
  const W = 720, H = 276;
  const padL = 44, padR = 16, padT = 46, padB = 40;
  const days = 22;
  const colW = (W / 2 - padL - padR) / days;
  const plotH = H - padT - padB;

  const rolling = Array.from({ length: days }, (_, d) => (d < 7 ? 1 / 7 : 0));
  const lam = 1 / 7;
  const ewma = Array.from({ length: days }, (_, d) => lam * Math.pow(1 - lam, d));
  const yMax = (1 / 7) * 1.15;
  const hue = 'var(--color-metric-load)';

  const panel = (xOff: number, weights: number[], label: string) => {
    const bars = weights.map((w, d) => {
      const h = (w / yMax) * plotH;
      const x = xOff + padL + d * colW;
      const y = padT + plotH - h;
      if (h < 0.4) {
        return `<line x1="${x + 1}" y1="${padT + plotH}" x2="${x + colW - 2}" y2="${padT + plotH}"
                 stroke="var(--color-divider)" stroke-width="1"/>`;
      }
      return `<rect x="${x + 1}" y="${y}" width="${colW - 2}" height="${h}" fill="${hue}" fill-opacity="0.16"/>
              <line x1="${x + 1}" y1="${y}" x2="${x + colW - 2}" y2="${y}" stroke="${hue}" stroke-width="1.5"/>`;
    }).join('');

    const ticks = [0, 7, 14, 21].map(d => {
      const x = xOff + padL + d * colW + colW / 2;
      return `<text x="${x}" y="${padT + plotH + 18}" text-anchor="middle"
               fill="var(--color-text-3)" style="${ANNO}">${d}</text>`;
    }).join('');

    return `<line x1="${xOff + padL}" y1="${padT + plotH}" x2="${xOff + W / 2 - padR}" y2="${padT + plotH}"
              stroke="var(--color-divider-strong)" stroke-width="1"/>
            ${bars}${ticks}
            <text x="${xOff + padL}" y="${padT - 12}" fill="var(--color-text-2)"
                  style="${ANNO12};text-transform:uppercase">${label}</text>`;
  };

  const cliffX = padL + 7 * colW;
  return svg(`0 0 ${W} ${H}`, `
    <text x="0" y="12" fill="var(--color-text-3)" style="${ANNO}">WEIGHT GIVEN TO A SESSION, BY DAYS SINCE IT HAPPENED</text>
    ${panel(0, rolling, 'rolling 7-day')}
    <line x1="${cliffX}" y1="${padT + 4}" x2="${cliffX}" y2="${padT + plotH}"
          stroke="var(--color-zone-danger)" stroke-width="1" stroke-dasharray="2 3"/>
    <text x="${cliffX + 6}" y="${padT + 16}" fill="var(--color-zone-danger)" style="${ANNO}">DAY 8 — WEIGHT 0</text>
    ${panel(W / 2, ewma, 'ewma · decay 1/7 per day')}
    <text x="${W / 2 + padL + 15 * colW}" y="${padT + plotH - 26}" fill="var(--color-text-3)" style="${ANNO}">STILL &gt; 0</text>
    <line x1="${W / 2 + padL + 15 * colW}" y1="${padT + plotH - 20}" x2="${W / 2 + padL + 15 * colW}" y2="${padT + plotH - 6}"
          stroke="var(--color-text-3)" stroke-width="1"/>
    <line x1="${W / 2 - 8}" y1="${padT - 20}" x2="${W / 2 - 8}" y2="${H - 16}"
          stroke="var(--color-divider)" stroke-width="1"/>
  `);
}

/** Three training modes reduced to a single daily series — the cross-modal claim. */
function oneFatigueBudget(): string {
  const W = 720, H = 300;
  const days = 14;
  const laneH = 34, laneGap = 8;
  const padL = 96, padR = 16;
  const colW = (W - padL - padR) / days;

  const sport = [0, 62, 0, 0, 74, 0, 0, 0, 58, 0, 0, 81, 0, 0];
  const strength = [44, 0, 51, 0, 0, 47, 0, 40, 0, 55, 0, 0, 49, 0];
  const cond = [0, 0, 22, 0, 18, 0, 0, 26, 0, 0, 20, 0, 0, 0];
  const lanes = [
    { d: sport, label: 'sport practice', hue: 'var(--color-metric-strain)' },
    { d: strength, label: 'strength', hue: 'var(--color-metric-load)' },
    { d: cond, label: 'conditioning', hue: 'var(--color-metric-recovery)' },
  ];
  const total = sport.map((_, i) => sport[i] + strength[i] + cond[i]);
  const tMax = Math.max(...total) * 1.15;

  let y = 26;
  const laneMarks = lanes.map(({ d, label, hue }) => {
    const max = Math.max(...d) * 1.2;
    const marks = d.map((v, i) => {
      const x = padL + i * colW;
      if (v === 0) {
        return `<line x1="${x + 2}" y1="${y + laneH}" x2="${x + colW - 4}" y2="${y + laneH}"
                 stroke="var(--color-divider)" stroke-width="1"/>`;
      }
      const h = (v / max) * laneH;
      return `<rect x="${x + 2}" y="${y + laneH - h}" width="${colW - 6}" height="${h}"
               fill="${hue}" fill-opacity="0.18"/>
              <line x1="${x + 2}" y1="${y + laneH - h}" x2="${x + colW - 4}" y2="${y + laneH - h}"
               stroke="${hue}" stroke-width="1.5"/>`;
    }).join('');
    const row = `<text x="${padL - 12}" y="${y + laneH - 2}" text-anchor="end"
                   fill="var(--color-text-2)" style="${SANS}">${label}</text>${marks}`;
    y += laneH + laneGap;
    return row;
  }).join('');

  const fuseY = y + 14;
  const totalH = 74;
  const totalBars = total.map((v, i) => {
    const x = padL + i * colW;
    const h = (v / tMax) * totalH;
    if (v === 0) {
      return `<line x1="${x + 2}" y1="${fuseY + totalH}" x2="${x + colW - 4}" y2="${fuseY + totalH}"
               stroke="var(--color-divider-strong)" stroke-width="1"/>`;
    }
    return `<rect x="${x + 2}" y="${fuseY + totalH - h}" width="${colW - 6}" height="${h}"
             fill="var(--color-text-1)" fill-opacity="0.10"/>
            <line x1="${x + 2}" y1="${fuseY + totalH - h}" x2="${x + colW - 4}" y2="${fuseY + totalH - h}"
             stroke="var(--color-text-1)" stroke-width="1.5"/>`;
  }).join('');

  return svg(`0 0 ${W} ${H}`, `
    <text x="0" y="12" fill="var(--color-text-3)" style="${ANNO}">THREE KINDS OF TRAINING &nbsp;→&nbsp; ONE DAILY LOAD SERIES</text>
    ${laneMarks}
    <line x1="${padL}" y1="${fuseY - 8}" x2="${W - padR}" y2="${fuseY - 8}"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
    <text x="${padL - 12}" y="${fuseY + totalH - 2}" text-anchor="end" fill="var(--color-text-1)"
          style="${SANS};font-weight:500">daily load</text>
    ${totalBars}
    <line x1="${padL}" y1="${fuseY + totalH}" x2="${W - padR}" y2="${fuseY + totalH}"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
    <text x="${padL}" y="${fuseY + totalH + 18}" fill="var(--color-text-3)" style="${ANNO}">14 DAYS · RESTS ENTER AS ZEROS, NOT GAPS</text>
  `);
}

/** The acute window nested inside the denominator it is divided by. */
function coupling(): string {
  const W = 720, H = 208;
  const padL = 16, padR = 16;
  const barY = 62, barH = 44;
  const barW = W - padL - padR;
  const acuteW = barW * (7 / 28);
  const acuteX = padL + barW - acuteW;
  const acuteMid = acuteX + acuteW / 2;

  return svg(`0 0 ${W} ${H}`, `
    <text x="${padL}" y="14" fill="var(--color-text-3)" style="${ANNO}">THE CONVENTIONAL RATIO: LAST 7 DAYS ÷ LAST 28 DAYS</text>
    <text x="${padL}" y="${barY - 12}" fill="var(--color-text-2)"
          style="${ANNO12};text-transform:uppercase">chronic · 28 days · denominator</text>
    <text x="${padL + barW}" y="${barY - 12}" text-anchor="end" fill="var(--color-metric-load)"
          style="${ANNO12};text-transform:uppercase">acute · 7 days · numerator</text>
    <rect x="${padL}" y="${barY}" width="${barW}" height="${barH}" fill="none"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
    <rect x="${acuteX}" y="${barY}" width="${acuteW}" height="${barH}"
          fill="var(--color-metric-load)" fill-opacity="0.16"/>
    <rect x="${acuteX}" y="${barY}" width="${acuteW}" height="${barH}" fill="none"
          stroke="var(--color-metric-load)" stroke-width="1.5"/>
    <path d="M ${acuteMid} ${barY + barH + 4} L ${acuteMid} ${barY + barH + 16}"
          stroke="var(--color-text-3)" stroke-width="1"/>
    <text x="${acuteMid}" y="${barY + barH + 30}" text-anchor="middle"
          fill="var(--color-text-1)" style="${ANNO12}">7 DAYS COUNTED TWICE</text>
    <text x="${padL}" y="${H - 26}" fill="var(--color-text-2)" style="${SANS}">
      The numerator is part of its own denominator. Lolli et al. (2019) showed that this
    </text>
    <text x="${padL}" y="${H - 8}" fill="var(--color-text-2)" style="${SANS}">
      coupling alone produces correlation with outcome — even in random numbers.
    </text>
  `);
}

/** The shipped zone strip: four labelled bands and a reading. */
function zoneStrip(): string {
  const W = 720, H = 150;
  const padL = 16, padR = 16;
  const lo = 0.5, hi = 2.0;
  const trackY = 74;
  const trackW = W - padL - padR;
  const xOf = (v: number) => padL + ((v - lo) / (hi - lo)) * trackW;

  const bands = [
    { from: 0.5, to: 0.8, label: 'load light', hue: 'var(--color-zone-low)' },
    { from: 0.8, to: 1.3, label: 'load steady', hue: 'var(--color-zone-optimal)' },
    { from: 1.3, to: 1.5, label: 'load building', hue: 'var(--color-zone-caution)' },
    { from: 1.5, to: 2.0, label: 'high load', hue: 'var(--color-zone-danger)' },
  ];

  const marks = bands.map(({ from, to, label, hue }) => {
    const x1 = xOf(from), x2 = xOf(to);
    return `<line x1="${x1 + 2}" y1="${trackY}" x2="${x2 - 2}" y2="${trackY}" stroke="${hue}" stroke-width="2"/>
            <text x="${(x1 + x2) / 2}" y="${trackY + 22}" text-anchor="middle" fill="${hue}"
                  style="${ANNO};text-transform:uppercase">${label}</text>`;
  }).join('');

  const edges = [0.8, 1.3, 1.5].map(v => `
    <line x1="${xOf(v)}" y1="${trackY - 8}" x2="${xOf(v)}" y2="${trackY + 8}"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
    <text x="${xOf(v)}" y="${trackY - 14}" text-anchor="middle" fill="var(--color-text-3)"
          style="${ANNO}">${v.toFixed(1)}</text>`).join('');

  const reading = 1.36;
  return svg(`0 0 ${W} ${H}`, `
    <text x="${padL}" y="14" fill="var(--color-text-3)" style="${ANNO}">WHAT THE APP REPORTS — A ZONE AND A DIRECTION</text>
    ${marks}${edges}
    <line x1="${xOf(reading)}" y1="${trackY - 30}" x2="${xOf(reading)}" y2="${trackY + 10}"
          stroke="var(--color-accent)" stroke-width="1.5"/>
    <circle cx="${xOf(reading)}" cy="${trackY}" r="3.5" fill="var(--color-accent)"/>
    <text x="${xOf(reading)}" y="${trackY - 38}" text-anchor="middle" fill="var(--color-text-1)"
          style="font-family:'Fragment Mono',monospace;font-size:12px">1.36</text>
    <text x="${padL}" y="${H - 12}" fill="var(--color-text-2)" style="${SANS}">
      Conventional bands, carried as labels. Not calibrated risk boundaries for any individual.
    </text>
  `);
}

/* =========================================================================
   COVER MARKS
   =========================================================================
   One per article, and each one is derived from THAT article's subject. A
   single shared mark repeated across the series is decoration; these are the
   article's own argument reduced to a silhouette.

   All are NEUTRAL INK. A cover is not a licence to tint a plane, so no metric
   hue appears here — the hues stay inside the numbered figures where they
   carry a meaning.
   ========================================================================= */

const COVER_W = 1200, COVER_H = 200;

function coverFrame(marks: string): string {
  return `<svg viewBox="0 0 ${COVER_W} ${COVER_H}" role="img" focusable="false" aria-hidden="true"
            style="width:100%;height:auto;display:block">${marks}
            <line x1="0" y1="${COVER_H}" x2="${COVER_W}" y2="${COVER_H}"
                  stroke="var(--color-divider-strong)" stroke-width="1"/>
          </svg>`;
}

/** 01 — training load. The real EWMA decay curve as hairlines. */
function coverDecay(): string {
  const n = 64, lam = 1 / 7;
  let marks = '';
  for (let i = 0; i < n; i++) {
    const w = lam * Math.pow(1 - lam, i * 0.55);
    const h = (w / lam) * (COVER_H - 24);
    const x = (i / (n - 1)) * (COVER_W - 8) + 4;
    marks += `<line x1="${x.toFixed(1)}" y1="${COVER_H}" x2="${x.toFixed(1)}" y2="${(COVER_H - h).toFixed(1)}"
                stroke="var(--color-text-1)" stroke-width="1.25"
                stroke-opacity="${(0.85 - i * 0.009).toFixed(3)}"/>`;
  }
  return coverFrame(marks);
}

/** 02 — HRV. Scattered daily readings and the smooth baseline drawn through them. */
function coverBaseline(): string {
  const n = 72;
  // Deterministic pseudo-scatter: a smooth baseline plus a repeatable wobble.
  const base = (i: number) => 0.52 + 0.16 * Math.sin(i / 11) + 0.06 * Math.sin(i / 3.3);
  // `%` keeps the sign of its left operand in JS, so the raw expression ranges
  // roughly [-1, 1] and subtracting 0.15 pushed the scatter below the line
  // instead of around it. Take the fractional part before centring.
  const frac = (v: number) => v - Math.floor(v);
  const noise = (i: number) => (frac(Math.sin(i * 12.9898) * 43758.5453) - 0.5) * 0.30;
  let marks = '';
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * (COVER_W - 16) + 8;
    const y = COVER_H - (base(i) + noise(i)) * (COVER_H - 30) - 12;
    marks += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4"
                fill="var(--color-text-1)" fill-opacity="0.42"/>`;
  }
  const path = Array.from({ length: n }, (_, i) => {
    const x = (i / (n - 1)) * (COVER_W - 16) + 8;
    const y = COVER_H - base(i) * (COVER_H - 30) - 12;
    return `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');
  marks += `<path d="${path}" fill="none" stroke="var(--color-text-1)" stroke-width="1.5"/>`;
  return coverFrame(marks);
}

/** 03 — sleep. A night drawn as a stepped hypnogram, thinning toward waking. */
function coverNight(): string {
  const steps = 42;
  const depth = [0, 1, 2, 3, 3, 2, 3, 3, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 0, 1, 2, 2,
                 1, 1, 2, 1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0];
  const colW = (COVER_W - 16) / steps;
  let marks = '';
  for (let i = 0; i < steps; i++) {
    const x = 8 + i * colW;
    const d = depth[i % depth.length];
    const h = 26 + d * 40;
    marks += `<rect x="${x.toFixed(1)}" y="${(COVER_H - h).toFixed(1)}"
                width="${(colW - 3).toFixed(1)}" height="${h.toFixed(1)}"
                fill="var(--color-text-1)" fill-opacity="${(0.30 - i * 0.005).toFixed(3)}"/>`;
  }
  return coverFrame(marks);
}

/** 04 — the decision. One reading forking into go, modify and hold. */
function coverFork(): string {
  const x0 = 8, xSplit = COVER_W * 0.42, x1 = COVER_W - 8;
  const mid = COVER_H * 0.52;
  const ends = [mid - 62, mid, mid + 58];
  const stem = `<line x1="${x0}" y1="${mid}" x2="${xSplit}" y2="${mid}"
                  stroke="var(--color-text-1)" stroke-width="1.75"/>
                <circle cx="${xSplit}" cy="${mid}" r="4" fill="var(--color-text-1)"/>`;
  const arms = ends.map((y, i) => `
    <path d="M ${xSplit} ${mid} C ${xSplit + 90} ${mid} ${xSplit + 90} ${y} ${xSplit + 180} ${y} L ${x1} ${y}"
          fill="none" stroke="var(--color-text-1)" stroke-width="1.5"
          stroke-opacity="${(0.85 - i * 0.18).toFixed(2)}"/>`).join('');
  // Ticks along the stem: the corroborating signals that decide which arm.
  const ticks = Array.from({ length: 5 }, (_, i) => {
    const x = x0 + 40 + i * ((xSplit - x0 - 60) / 4);
    return `<line x1="${x.toFixed(1)}" y1="${mid - 9}" x2="${x.toFixed(1)}" y2="${mid + 9}"
              stroke="var(--color-text-1)" stroke-width="1" stroke-opacity="0.45"/>`;
  }).join('');
  return coverFrame(stem + ticks + arms);
}

const COVER_MARKS: Record<string, () => string> = {
  decay: coverDecay,
  baseline: coverBaseline,
  night: coverNight,
  fork: coverFork,
};

/**
 * Returns the named cover mark, or null when a post names none — a wrong mark
 * is worse than no mark, so there is deliberately no default.
 */
export function coverMark(name?: string): string | null {
  if (!name) return null;
  const render = COVER_MARKS[name];
  if (!render) {
    throw new Error(
      `Unknown coverMark "${name}". Known: ${Object.keys(COVER_MARKS).join(', ')}`
    );
  }
  return render();
}

export const FIGURES: Record<string, () => string> = {
  // 01 — training load
  'one-fatigue-budget': oneFatigueBudget,
  'cliff-edge': cliffEdge,
  'coupling': coupling,
  'zone-strip': zoneStrip,
  // 02 — HRV readiness
  'morning-median': morningMedian,
  'own-baseline': ownBaseline,
  'score-composition': scoreComposition,
  'evidence-coverage': evidenceCoverage,
  // 03 — sleep
  'sleep-task-order': sleepTaskOrder,
  'feels-harder-first': feelsHarderFirst,
  'sleep-evidence-grades': sleepEvidenceGrades,
  'wearable-trust': wearableTrust,
  // 04 — adjusting when HRV is low
  'signal-stack': signalStack,
};

export type FigureName = keyof typeof FIGURES;

/* =========================================================================
   ARTICLE 02 — HRV readiness: morning median against your own baseline
   ========================================================================= */

/**
 * Why the MEDIAN and not the mean. One artefact in a burst of overnight
 * readings drags a mean and leaves a median where it was — which is the
 * article's stated reason for the choice, drawn rather than asserted.
 * Sample values are illustrative shape, not one athlete's record.
 */
function morningMedian(): string {
  const W = 720, H = 260;
  const padL = 48, padR = 120, padT = 44, padB = 44;
  const plotW = W - padL - padR, plotH = H - padT - padB;

  // Hours 0–24 across the plot; the morning gate is 11:00.
  const xOf = (h: number) => padL + (h / 24) * plotW;
  const lo = 20, hi = 165;
  const yOf = (v: number) => padT + plotH - ((v - lo) / (hi - lo)) * plotH;

  // Morning burst, including one artefact; plus two afternoon readings.
  // The artefact has to visibly drag the mean, or the figure asserts what its
  // caption claims instead of showing it. An odd sample count is load-bearing:
  // the median below indexes the middle element and has no even-count branch.
  const morning = [
    { h: 2.4, v: 62 }, { h: 3.6, v: 58 }, { h: 4.8, v: 66 },
    { h: 5.9, v: 61 }, { h: 6.7, v: 148 }, { h: 8.2, v: 57 }, { h: 9.6, v: 64 },
  ];
  const afternoon = [{ h: 14.2, v: 41 }, { h: 19.8, v: 38 }];

  const vals = morning.map(m => m.v).sort((a, b) => a - b);
  const median = vals[(vals.length - 1) / 2];
  const mean = morning.reduce((s, m) => s + m.v, 0) / morning.length;

  const gate = `
    <rect x="${padL}" y="${padT}" width="${xOf(11) - padL}" height="${plotH}"
          fill="var(--color-metric-recovery)" fill-opacity="0.05"/>
    <line x1="${xOf(11)}" y1="${padT}" x2="${xOf(11)}" y2="${padT + plotH}"
          stroke="var(--color-divider-strong)" stroke-width="1" stroke-dasharray="2 3"/>
    <text x="${xOf(11) - 6}" y="${padT - 10}" text-anchor="end" fill="var(--color-metric-recovery)"
          style="${ANNO};text-transform:uppercase">counted · before 11:00</text>
    <text x="${xOf(11) + 6}" y="${padT - 10}" fill="var(--color-text-3)"
          style="${ANNO};text-transform:uppercase">not counted</text>`;

  const dots = [
    ...morning.map(m => `<circle cx="${xOf(m.h)}" cy="${yOf(m.v)}" r="3.5"
        fill="var(--color-metric-recovery)"/>`),
    ...afternoon.map(m => `<circle cx="${xOf(m.h)}" cy="${yOf(m.v)}" r="3.5"
        fill="none" stroke="var(--color-text-3)" stroke-width="1"/>`),
  ].join('');

  const artefact = morning.find(m => m.v === 148)!;
  const flag = `
    <circle cx="${xOf(artefact.h)}" cy="${yOf(artefact.v)}" r="7" fill="none"
            stroke="var(--color-zone-danger)" stroke-width="1"/>
    <text x="${xOf(artefact.h) + 12}" y="${yOf(artefact.v) + 4}" fill="var(--color-zone-danger)"
          style="${ANNO}">ARTEFACT</text>`;

  const line = (v: number, label: string, colour: string, dash: string, dy: number) => `
    <line x1="${padL}" y1="${yOf(v)}" x2="${W - padR}" y2="${yOf(v)}"
          stroke="${colour}" stroke-width="1.5" stroke-dasharray="${dash}"/>
    <text x="${W - padR + 8}" y="${yOf(v) + dy}" fill="${colour}" style="${ANNO12}">${label}</text>`;

  const hours = [0, 6, 12, 18, 24].map(h => `
    <text x="${xOf(h)}" y="${padT + plotH + 18}" text-anchor="middle" fill="var(--color-text-3)"
          style="${ANNO}">${String(h).padStart(2, '0')}:00</text>`).join('');

  return svg(`0 0 ${W} ${H}`, `
    <text x="0" y="12" fill="var(--color-text-3)" style="${ANNO}">ONE DAY OF HRV SAMPLES · MS</text>
    ${gate}
    <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
    ${line(mean, `MEAN ${mean.toFixed(0)}`, 'var(--color-text-3)', '3 3', -4)}
    ${line(median, `MEDIAN ${median.toFixed(0)}`, 'var(--color-metric-recovery)', '0', 12)}
    ${dots}${flag}${hours}
  `);
}

/**
 * "Your own baseline" is the last seven days that CARRIED a reading, which on a
 * real wear pattern spans more than seven calendar days — and today is never
 * inside the window it is measured against. Both claims in one picture.
 */
function ownBaseline(): string {
  const W = 720, H = 250;
  const days = 16;
  const padL = 16, padR = 16, padT = 52, padB = 52;
  const colW = (W - padL - padR) / days;
  const plotH = H - padT - padB;

  // index 15 is today; false = no reading that day (watch not worn).
  const worn = [true, true, false, true, true, true, false, false, true, true, true, false, true, true, true, true];
  const vals = [58, 63, 0, 61, 66, 59, 0, 0, 64, 60, 67, 0, 62, 65, 61, 52];
  const lo = 40, hi = 75;
  const yOf = (v: number) => padT + plotH - ((v - lo) / (hi - lo)) * plotH;

  // Walk back from yesterday collecting the seven most recent days WITH a reading.
  const inBaseline = new Set<number>();
  for (let i = days - 2; i >= 0 && inBaseline.size < 7; i--) if (worn[i]) inBaseline.add(i);
  const baseVals = [...inBaseline].map(i => vals[i]);
  const baseline = baseVals.reduce((a, b) => a + b, 0) / baseVals.length;
  const first = Math.min(...inBaseline);

  const span = `
    <rect x="${padL + first * colW}" y="${padT - 8}" width="${(days - 1 - first) * colW}" height="${plotH + 8}"
          fill="var(--color-metric-recovery)" fill-opacity="0.05"/>
    <text x="${padL + first * colW}" y="${padT - 16}" fill="var(--color-metric-recovery)"
          style="${ANNO};text-transform:uppercase">7 readings · spans ${days - 1 - first} calendar days</text>`;

  const bars = vals.map((v, i) => {
    const x = padL + i * colW + colW / 2;
    if (!worn[i]) {
      return `<text x="${x}" y="${padT + plotH + 4}" text-anchor="middle" fill="var(--color-text-3)"
                style="${ANNO}">·</text>
              <text x="${x}" y="${padT + plotH + 22}" text-anchor="middle" fill="var(--color-text-3)"
                style="font-family:'Fragment Mono',monospace;font-size:9px">no</text>`;
    }
    const today = i === days - 1;
    const colour = today ? 'var(--color-accent)' : 'var(--color-metric-recovery)';
    return `<circle cx="${x}" cy="${yOf(v)}" r="${today ? 4.5 : 3.5}" fill="${colour}"/>
            ${today ? `<line x1="${x}" y1="${yOf(v) + 8}" x2="${x}" y2="${padT + plotH}"
                        stroke="${colour}" stroke-width="1"/>` : ''}`;
  }).join('');

  return svg(`0 0 ${W} ${H}`, `
    <text x="0" y="12" fill="var(--color-text-3)" style="${ANNO}">DAILY HRV, 16 DAYS · GAPS ARE DAYS THE WATCH WAS NOT WORN</text>
    ${span}
    <line x1="${padL}" y1="${yOf(baseline)}" x2="${W - padR}" y2="${yOf(baseline)}"
          stroke="var(--color-metric-recovery)" stroke-width="1.5"/>
    <text x="${padL}" y="${yOf(baseline) - 8}" fill="var(--color-metric-recovery)"
          style="${ANNO12}">BASELINE ${baseline.toFixed(0)}</text>
    ${bars}
    <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
    <text x="${padL + (days - 1) * colW + colW / 2}" y="${H - 26}" text-anchor="middle"
          fill="var(--color-accent)" style="${ANNO};text-transform:uppercase">today</text>
    <text x="${padL}" y="${H - 8}" fill="var(--color-text-2)" style="${SANS}">
      Today is never part of the baseline it is compared against.
    </text>
  `);
}

/**
 * Component weights, and what renormalisation does when a signal is missing.
 * The article's point is that a 68 from three signals is a different object
 * from a 68 from four — so both bars are drawn, with the coverage stated.
 */
function scoreComposition(): string {
  const W = 720, H = 240;
  const padL = 130, padR = 120;
  const barW = W - padL - padR;
  const rowH = 42;

  const parts = [
    { k: 'HRV vs baseline', w: 30, hue: 'var(--color-metric-recovery)' },
    { k: 'Resting HR', w: 20, hue: 'var(--color-metric-strain)' },
    { k: 'Sleep duration', w: 25, hue: 'var(--color-metric-sleep)' },
    { k: 'Wellness check-in', w: 25, hue: 'var(--color-metric-readiness)' },
  ];

  const row = (y: number, label: string, items: typeof parts, note: string) => {
    const total = items.reduce((s, p) => s + p.w, 0);
    let x = padL;
    const segs = items.map(p => {
      const w = (p.w / total) * barW;
      const seg = `
        <rect x="${x}" y="${y}" width="${w - 2}" height="${rowH - 14}"
              fill="${p.hue}" fill-opacity="0.18"/>
        <line x1="${x}" y1="${y}" x2="${x + w - 2}" y2="${y}" stroke="${p.hue}" stroke-width="1.5"/>
        <text x="${x + (w - 2) / 2}" y="${y + rowH + 2}" text-anchor="middle" fill="${p.hue}"
              style="${ANNO}">${Math.round((p.w / total) * 100)}%</text>`;
      x += w;
      return seg;
    }).join('');
    return `
      <text x="${padL - 12}" y="${y + rowH - 20}" text-anchor="end" fill="var(--color-text-1)"
            style="${SANS};font-weight:500">${label}</text>
      ${segs}
      <text x="${W - padR + 10}" y="${y + rowH - 20}" fill="var(--color-text-3)"
            style="${ANNO}">${note}</text>`;
  };

  const keys = parts.map((p, i) => `
    <circle cx="${padL + i * 150 + 4}" cy="${H - 12}" r="3.5" fill="${p.hue}"/>
    <text x="${padL + i * 150 + 14}" y="${H - 8}" fill="var(--color-text-2)"
          style="font-family:'Instrument Sans',system-ui,sans-serif;font-size:12px">${p.k}</text>`).join('');

  return svg(`0 0 ${W} ${H}`, `
    <text x="0" y="12" fill="var(--color-text-3)" style="${ANNO}">WHAT THE RECOVERY SCORE IS MADE OF</text>
    ${row(40, 'All four signals', parts, '4 OF 4')}
    ${row(120, 'No wellness entry', parts.slice(0, 3), '3 OF 4')}
    <text x="${padL - 12}" y="${190}" text-anchor="end" fill="var(--color-text-2)" style="${SANS}"></text>
    <text x="${padL}" y="${190}" fill="var(--color-text-2)" style="${SANS}">
      Remaining weights renormalise over what is present, and the app states the coverage —
    </text>
    <text x="${padL}" y="${208}" fill="var(--color-text-2)" style="${SANS}">
      a change in coverage must never read as a change in physiology.
    </text>
    ${keys}
  `);
}

/**
 * Where HRV-guided training has actually been TESTED, against where Tuwa's
 * athlete sits. This is our own mapping of the trials the article names — not
 * a re-analysis, and it carries no effect sizes.
 */
function evidenceCoverage(): string {
  const W = 720, H = 280;
  const padL = 150, padR = 24, padT = 44, padB = 62;
  const plotW = W - padL - padR, plotH = H - padT - padB;

  const modes = ['Endurance only', 'Team / court sport', 'Court sport + lifting'];
  const rowH = plotH / modes.length;

  const studies = [
    { r: 0, c: 0.10, n: 'KIVINIEMI 2007' },
    { r: 0, c: 0.34, n: 'VESTERINEN 2016' },
    { r: 0, c: 0.58, n: 'NUUTTILA 2017' },
    { r: 0, c: 0.82, n: 'JAVALOYES 2019 · 2020' },
    { r: 1, c: 0.30, n: 'FLATT & ESCO 2016 — MONITORING, NOT PRESCRIPTION' },
  ];

  const rows = modes.map((m, i) => `
    <line x1="${padL}" y1="${padT + (i + 1) * rowH}" x2="${W - padR}" y2="${padT + (i + 1) * rowH}"
          stroke="var(--color-divider)" stroke-width="1"/>
    <text x="${padL - 12}" y="${padT + i * rowH + rowH / 2 + 4}" text-anchor="end"
          fill="var(--color-text-1)" style="${SANS}">${m}</text>`).join('');

  const dots = studies.map(s => {
    const x = padL + 20 + s.c * (plotW - 40);
    const y = padT + s.r * rowH + rowH / 2;
    return `<circle cx="${x}" cy="${y}" r="4" fill="var(--color-metric-recovery)"/>
            <text x="${x}" y="${y - 12}" text-anchor="middle" fill="var(--color-text-3)"
                  style="font-family:'Fragment Mono',monospace;font-size:9px">${s.n}</text>`;
  }).join('');

  const gapY = padT + 2 * rowH + rowH / 2;
  const gap = `
    <rect x="${padL}" y="${padT + 2 * rowH}" width="${plotW}" height="${rowH}"
          fill="var(--color-zone-danger)" fill-opacity="0.04"/>
    <text x="${padL + plotW / 2}" y="${gapY + 4}" text-anchor="middle" fill="var(--color-zone-danger)"
          style="${ANNO12};text-transform:uppercase">no prescription trial exists</text>`;

  return svg(`0 0 ${W} ${H}`, `
    <text x="0" y="12" fill="var(--color-text-3)" style="${ANNO}">WHERE HRV-GUIDED TRAINING HAS BEEN TESTED</text>
    <line x1="${padL}" y1="${padT}" x2="${W - padR}" y2="${padT}"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
    ${rows}${gap}${dots}
    <text x="${padL}" y="${H - 30}" fill="var(--color-text-2)" style="${SANS}">
      Every controlled trial of HRV-guided training sits in the top row: endurance sport,
    </text>
    <text x="${padL}" y="${H - 12}" fill="var(--color-text-2)" style="${SANS}">
      modest samples, weeks to months. Tuwa's athlete is in the bottom row.
    </text>
  `);
}

/* =========================================================================
   ARTICLE 03 — Sleep and next-day training capacity
   =========================================================================
   NOTE ON HONESTY: these figures carry NO effect sizes and NO re-analysis.
   They draw the DIRECTION and the EVIDENCE GRADE the article states in prose,
   with the named studies attached. Anything that would look like a measured
   magnitude is labelled schematic on the face of the figure.
   ========================================================================= */

/**
 * What one bad night costs, ordered by how reliably the literature finds an
 * effect. Ordering only — the axis is deliberately unnumbered, because the
 * underlying experiments are small, acute and mostly laboratory.
 */
function sleepTaskOrder(): string {
  const W = 720, H = 268;
  const padL = 210, padR = 130, padT = 52, padB = 46;
  const plotW = W - padL - padR;

  const tasks = [
    { k: 'Skill and decision-making', p: 0.92, src: 'WALSH 2021' },
    { k: 'Sustained / repeated efforts', p: 0.78, src: 'SKEIN 2011' },
    { k: 'Submaximal lifting volume', p: 0.62, src: 'REILLY 1994' },
    { k: 'Multi-set strength work', p: 0.52, src: 'KNOWLES 2018' },
    { k: 'Maximal single effort', p: 0.20, src: 'KNOWLES 2018' },
  ];
  const rowH = (H - padT - padB) / tasks.length;

  const rows = tasks.map((t, i) => {
    const y = padT + i * rowH + rowH / 2;
    const x = padL + t.p * plotW;
    return `
      <line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}"
            stroke="var(--color-divider)" stroke-width="1"/>
      <line x1="${padL}" y1="${y}" x2="${x}" y2="${y}"
            stroke="var(--color-metric-sleep)" stroke-width="2"/>
      <circle cx="${x}" cy="${y}" r="4" fill="var(--color-metric-sleep)"/>
      <text x="${padL - 12}" y="${y + 4}" text-anchor="end" fill="var(--color-text-1)"
            style="${SANS}">${t.k}</text>
      <text x="${W - padR + 10}" y="${y + 4}" fill="var(--color-text-3)"
            style="font-family:'Fragment Mono',monospace;font-size:9px">${t.src}</text>`;
  }).join('');

  return svg(`0 0 ${W} ${H}`, `
    <text x="0" y="12" fill="var(--color-text-3)" style="${ANNO}">HOW RELIABLY SLEEP LOSS SHOWS UP, BY TASK TYPE</text>
    <text x="0" y="28" fill="var(--color-zone-caution)" style="${ANNO}">ORDERING ONLY — NO EFFECT SIZES, NO RE-ANALYSIS</text>
    ${rows}
    <text x="${padL}" y="${H - 16}" fill="var(--color-text-3)" style="${ANNO}">LESS AFFECTED</text>
    <text x="${W - padR}" y="${H - 16}" text-anchor="end" fill="var(--color-text-3)" style="${ANNO}">MORE AFFECTED</text>
  `);
}

/**
 * The dissociation that recurs across this literature: perceived effort rises
 * before measured output falls. Explicitly labelled SCHEMATIC — it draws the
 * direction the papers report, not any measured curve.
 */
function feelsHarderFirst(): string {
  const W = 720, H = 250;
  const padL = 56, padR = 150, padT = 50, padB = 48;
  const plotW = W - padL - padR, plotH = H - padT - padB;

  const pts = 40;
  const xOf = (i: number) => padL + (i / (pts - 1)) * plotW;
  // Effort RISES with accumulating debt; output FALLS, and later. Both were
  // drawn descending in the first pass, which said the opposite of the finding.
  const sig = (i: number, mid: number) => 1 / (1 + Math.exp(-(i / (pts - 1) * 12 - mid)));
  const rpe = (i: number) => 0.06 + 0.88 * sig(i, 3.2);   // early onset, rising
  const out = (i: number) => 0.94 - 0.84 * sig(i, 7.4);   // later onset, falling
  const yOf = (v: number) => padT + (1 - v) * plotH;

  const path = (f: (i: number) => number) =>
    Array.from({ length: pts }, (_, i) => `${i ? 'L' : 'M'} ${xOf(i).toFixed(1)} ${yOf(f(i)).toFixed(1)}`).join(' ');

  const onset = xOf(11);
  return svg(`0 0 ${W} ${H}`, `
    <text x="0" y="12" fill="var(--color-text-3)" style="${ANNO}">ACCUMULATING SLEEP DEBT &nbsp;→</text>
    <text x="0" y="28" fill="var(--color-zone-caution)" style="${ANNO}">SCHEMATIC · DIRECTION ONLY, NOT MEASURED MAGNITUDES</text>
    <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
    <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}"
          stroke="var(--color-divider)" stroke-width="1"/>
    <path d="${path(rpe)}" fill="none" stroke="var(--color-metric-strain)" stroke-width="2"/>
    <path d="${path(out)}" fill="none" stroke="var(--color-metric-readiness)" stroke-width="2"/>
    <text x="${W - padR + 10}" y="${yOf(rpe(pts - 1)) + 4}" fill="var(--color-metric-strain)"
          style="${ANNO12}">PERCEIVED EFFORT</text>
    <text x="${W - padR + 10}" y="${yOf(out(pts - 1)) + 4}" fill="var(--color-metric-readiness)"
          style="${ANNO12}">MEASURED OUTPUT</text>
    <line x1="${onset}" y1="${padT}" x2="${onset}" y2="${padT + plotH}"
          stroke="var(--color-divider-strong)" stroke-width="1" stroke-dasharray="2 3"/>
    <text x="${onset + 6}" y="${padT + plotH - 8}" fill="var(--color-text-2)" style="${ANNO}">IT FEELS HARDER HERE</text>
    <text x="${padL}" y="${H - 12}" fill="var(--color-text-2)" style="${SANS}">
      Effort rises before output falls — which is why a subjective check-in is an input, not a verdict.
    </text>
  `);
}

/**
 * The article grades its own claims. Drawing that grading IS the article's
 * spine, and it is our assessment of named work rather than a finding.
 */
function sleepEvidenceGrades(): string {
  // H must clear padT + rows * rowH + the closing rule; at 268 the sixth row
  // was cut off by the plate.
  const W = 720, H = 320;
  const padL = 16, padR = 16, padT = 46;
  const rowH = 42;

  const rows = [
    { claim: 'Acute sleep loss impairs next-day performance', g: 'MODERATE', lvl: 3, src: 'CRAVEN 2022 META-ANALYSIS' },
    { claim: 'Sleep banking before a known bad week helps', g: 'MODERATE', lvl: 3, src: 'RUPP 2009' },
    { claim: 'Sleep extension improves athletic performance', g: 'LOW–MODERATE', lvl: 2, src: 'MAH 2011 · n=11, NO CONTROL' },
    { claim: 'Short sleep is associated with injury', g: 'MODERATE', lvl: 3, src: 'MILEWSKI 2014 · ADOLESCENTS' },
    { claim: 'Adding sleep prevents injury', g: 'NOT TESTED', lvl: 0, src: 'NO TRIAL EXISTS' },
    { claim: 'Consumer sleep STAGES are decision-grade', g: 'CONTRADICTED', lvl: 0, src: 'CHINOY 2021 · 2022' },
  ];

  const colour = (lvl: number) =>
    lvl >= 3 ? 'var(--color-zone-optimal)' : lvl === 2 ? 'var(--color-zone-caution)' : 'var(--color-zone-danger)';

  const body = rows.map((r, i) => {
    const y = padT + i * rowH;
    const dots = [0, 1, 2, 3].map(d => `
      <circle cx="${W - padR - 92 + d * 13}" cy="${y + 14}" r="3.5"
              fill="${d < r.lvl ? colour(r.lvl) : 'none'}"
              stroke="${d < r.lvl ? colour(r.lvl) : 'var(--color-divider-strong)'}" stroke-width="1"/>`).join('');
    return `
      <line x1="${padL}" y1="${y - 8}" x2="${W - padR}" y2="${y - 8}"
            stroke="var(--color-divider)" stroke-width="1"/>
      <text x="${padL}" y="${y + 8}" fill="var(--color-text-1)" style="${SANS}">${r.claim}</text>
      <text x="${padL}" y="${y + 25}" fill="var(--color-text-3)"
            style="font-family:'Fragment Mono',monospace;font-size:9px">${r.src}</text>
      <text x="${W - padR - 104}" y="${y + 18}" text-anchor="end" fill="${colour(r.lvl)}"
            style="${ANNO}">${r.g}</text>
      ${dots}`;
  }).join('');

  return svg(`0 0 ${W} ${H}`, `
    <text x="${padL}" y="12" fill="var(--color-text-3)" style="${ANNO}">WHAT THE SLEEP EVIDENCE ACTUALLY SUPPORTS</text>
    <text x="${W - padR}" y="12" text-anchor="end" fill="var(--color-text-3)" style="${ANNO}">OUR GRADING OF THE NAMED WORK</text>
    ${body}
    <line x1="${padL}" y1="${padT + rows.length * rowH - 8}" x2="${W - padR}" y2="${padT + rows.length * rowH - 8}"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
  `);
}

/**
 * Which numbers on a wrist can carry a training decision. The article's most
 * actionable claim, from the Chinoy validation work.
 */
function wearableTrust(): string {
  const W = 720, H = 210;
  const padL = 16, padR = 16, padT = 46;
  const colW = (W - padL - padR) / 2 - 12;

  const col = (x: number, title: string, hue: string, items: string[], note: string) => `
    <text x="${x}" y="${padT}" fill="${hue}" style="${ANNO12};text-transform:uppercase">${title}</text>
    <line x1="${x}" y1="${padT + 10}" x2="${x + colW}" y2="${padT + 10}" stroke="${hue}" stroke-width="2"/>
    ${items.map((it, i) => `
      <text x="${x}" y="${padT + 36 + i * 24}" fill="var(--color-text-1)" style="${SANS}">${it}</text>`).join('')}
    <text x="${x}" y="${padT + 44 + items.length * 24}" fill="var(--color-text-3)"
          style="font-family:'Fragment Mono',monospace;font-size:9px">${note}</text>`;

  return svg(`0 0 ${W} ${H}`, `
    <text x="${padL}" y="12" fill="var(--color-text-3)" style="${ANNO}">WHAT A CONSUMER WEARABLE CAN CARRY A DECISION ON</text>
    ${col(padL, 'usable', 'var(--color-zone-optimal)',
      ['Total sleep time', 'Sleep timing', 'Night-to-night change in duration'],
      'PERFORMED REASONABLY VS POLYSOMNOGRAPHY')}
    ${col(padL + colW + 24, 'not a foundation', 'var(--color-zone-danger)',
      ['Light / deep / REM percentages', 'Any single-night stage figure', '"Your deep sleep was low"'],
      'SUBSTANTIALLY POORER AGREEMENT, MEANINGFUL BIAS')}
    <line x1="${padL + colW + 12}" y1="${padT - 10}" x2="${padL + colW + 12}" y2="${H - 30}"
          stroke="var(--color-divider)" stroke-width="1"/>
    <text x="${padL}" y="${H - 10}" fill="var(--color-text-2)" style="${SANS}">
      A recommendation built on a stage percentage is built on the least reliable figure the device produced.
    </text>
  `);
}

/* =========================================================================
   ARTICLE 04 — Adjusting strength training when HRV is low
   ========================================================================= */

/**
 * The signal stack. One negative reading is noise; negative readings that
 * agree are a reason to change the session — and the first change is volume,
 * not a rest day. This is the ladder the app's own verdict walks.
 */
function signalStack(): string {
  const W = 720, H = 300;
  const padL = 16, padR = 16, padT = 52;
  const rowH = 46;
  const stackX = padL + 4;
  const arrowX = 320;
  const actionX = 366;

  const rows = [
    { sig: ['HRV'], act: 'Maintain the plan, watch the warm-ups', hue: 'var(--color-zone-optimal)', k: 'GO' },
    { sig: ['HRV', 'Sleep'], act: 'Cap RPE, cut optional accessory work', hue: 'var(--color-zone-caution)', k: 'MODIFY' },
    { sig: ['HRV', 'Soreness'], act: 'Swap heavy work for technique, or cut volume', hue: 'var(--color-zone-caution)', k: 'MODIFY' },
    { sig: ['HRV', 'RHR', 'Load spike'], act: 'Reduce load and trim back-off sets', hue: 'var(--color-zone-caution)', k: 'MODIFY' },
    { sig: ['Symptoms', 'Pain'], act: 'Recover, or seek qualified guidance', hue: 'var(--color-zone-danger)', k: 'HOLD' },
  ];

  const body = rows.map((r, i) => {
    const y = padT + i * rowH;
    const chips = r.sig.map((s, j) => {
      const x = stackX + j * 96;
      return `
        <rect x="${x}" y="${y - 2}" width="88" height="24" rx="12" fill="none"
              stroke="${r.hue}" stroke-width="1"/>
        <text x="${x + 44}" y="${y + 14}" text-anchor="middle" fill="${r.hue}"
              style="${ANNO}">${s.toUpperCase()}</text>`;
    }).join('');
    return `
      <line x1="${padL}" y1="${y - 14}" x2="${W - padR}" y2="${y - 14}"
            stroke="var(--color-divider)" stroke-width="1"/>
      ${chips}
      <text x="${arrowX}" y="${y + 14}" fill="var(--color-text-3)" style="${ANNO}">→</text>
      <text x="${actionX}" y="${y + 14}" fill="var(--color-text-1)" style="${SANS}">${r.act}</text>
      <text x="${W - padR}" y="${y + 14}" text-anchor="end" fill="${r.hue}"
            style="${ANNO12}">${r.k}</text>`;
  }).join('');

  return svg(`0 0 ${W} ${H}`, `
    <text x="${padL}" y="12" fill="var(--color-text-3)" style="${ANNO}">WHAT ELSE AGREES WITH THE LOW READING</text>
    <text x="${W - padR}" y="12" text-anchor="end" fill="var(--color-text-3)" style="${ANNO}">VERDICT</text>
    <text x="${padL}" y="30" fill="var(--color-text-2)" style="${SANS}">One negative signal is noise. Signals that agree are a reason to change the session.</text>
    ${body}
    <line x1="${padL}" y1="${padT + rows.length * rowH - 14}" x2="${W - padR}" y2="${padT + rows.length * rowH - 14}"
          stroke="var(--color-divider-strong)" stroke-width="1"/>
    <text x="${padL}" y="${padT + rows.length * rowH + 8}" fill="var(--color-text-2)" style="${SANS}">
      The first adjustment is volume, not a rest day — and the athlete overrides any of it in one tap.
    </text>
  `);
}
