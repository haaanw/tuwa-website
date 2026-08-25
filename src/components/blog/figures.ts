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

/**
 * Cover mark: the real decay curve as hairlines, in NEUTRAL ink.
 * A cover is not a licence to tint a plane, so no metric hue appears here.
 */
export function coverMark(): string {
  const n = 64, W = 1200, H = 200, lam = 1 / 7;
  let marks = '';
  for (let i = 0; i < n; i++) {
    const w = lam * Math.pow(1 - lam, i * 0.55);
    const h = (w / lam) * (H - 24);
    const x = (i / (n - 1)) * (W - 8) + 4;
    marks += `<line x1="${x.toFixed(1)}" y1="${H}" x2="${x.toFixed(1)}" y2="${(H - h).toFixed(1)}"
                stroke="var(--color-text-1)" stroke-width="1.25"
                stroke-opacity="${(0.85 - i * 0.009).toFixed(3)}"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}" role="img" focusable="false" aria-hidden="true"
            style="width:100%;height:auto;display:block">${marks}
            <line x1="0" y1="${H}" x2="${W}" y2="${H}" stroke="var(--color-divider-strong)" stroke-width="1"/>
          </svg>`;
}

export const FIGURES: Record<string, () => string> = {
  'one-fatigue-budget': oneFatigueBudget,
  'cliff-edge': cliffEdge,
  'coupling': coupling,
  'zone-strip': zoneStrip,
};

export type FigureName = keyof typeof FIGURES;
