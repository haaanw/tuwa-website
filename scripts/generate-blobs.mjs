/**
 * generate-blobs.mjs
 *
 * One-time build script to generate 7 biomorphic blob SVG path strings
 * using a Catmull-Rom-to-cubic-Bezier algorithm.
 *
 * Usage: node scripts/generate-blobs.mjs
 * Output: scripts/blobs-raw.svg (all 7 paths in a single SVG)
 *
 * After running, optimize with:
 *   npx svgo --config '{"plugins":[{"name":"preset-default"},{"name":"convertPathData","params":{"floatPrecision":1}}]}' scripts/blobs-raw.svg -o scripts/blobs-optimized.svg
 *
 * Then copy the optimized path `d` strings into src/components/MatisseShape.astro.
 */

import { writeFileSync } from 'node:fs';

// Simple seeded pseudo-random number generator (deterministic)
function pseudoRandom(s) {
  const x = Math.sin(s * 9999.9) * 9999.9;
  return x - Math.floor(x);
}

/**
 * Generate a biomorphic blob as an SVG path string.
 * Places N equally-spaced anchor points on a circle with per-point radius
 * variance, then converts to cubic Bezier via Catmull-Rom formula.
 */
function generateBlob({
  numPoints = 8,
  centerX = 100,
  centerY = 100,
  baseRadius = 70,
  variance = 0.35,
  seed = 0.5,
} = {}) {
  const points = [];
  const angleStep = (Math.PI * 2) / numPoints;

  for (let i = 0; i < numPoints; i++) {
    const theta = i * angleStep;
    const r = baseRadius * (1 - variance + variance * pseudoRandom(seed + i));
    points.push({
      x: centerX + Math.cos(theta) * r,
      y: centerY + Math.sin(theta) * r,
    });
  }

  return pointsToCubicBezierPath(points, true);
}

/**
 * Convert an array of points to a closed cubic Bezier SVG path string
 * using the Catmull-Rom-to-Bezier formula.
 *
 * Source: Catmull-Rom to Bezier — adapted from gist.github.com/njvack/6925609
 */
function pointsToCubicBezierPath(pts, closed = true) {
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} `;

  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];

    // Catmull-Rom tension = 0.5 (alpha = 0.5)
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += `C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }

  if (closed) d += 'Z';
  return d.trim();
}

// Generate 7 distinct blob shapes with varying parameters
const shapes = [
  { id: 'blob-1', seed: 0.10, variance: 0.35 },
  { id: 'blob-2', seed: 0.25, variance: 0.38 },
  { id: 'blob-3', seed: 0.40, variance: 0.32 },
  { id: 'blob-4', seed: 0.55, variance: 0.40 },
  { id: 'blob-5', seed: 0.70, variance: 0.33 },
  { id: 'blob-6', seed: 0.85, variance: 0.42 },
  { id: 'blob-7', seed: 0.95, variance: 0.45 },
];

const paths = shapes.map(({ id, seed, variance }) => {
  const d = generateBlob({
    numPoints: 8,
    centerX: 100,
    centerY: 100,
    baseRadius: 70,
    variance,
    seed,
  });
  console.log(`${id}: ${d}`);
  return { id, d };
});

// Write raw SVG with all 7 shapes (flat structure, no nested <g>)
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
${paths.map(({ id, d }) => `  <path id="${id}" d="${d}" fill="#2B5240" />`).join('\n')}
</svg>`;

writeFileSync(new URL('./blobs-raw.svg', import.meta.url), svgContent, 'utf-8');
console.log('\nWrote scripts/blobs-raw.svg');
