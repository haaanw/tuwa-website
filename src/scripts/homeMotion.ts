/**
 * Field Notes homepage motion — loaded ONLY by the three index pages.
 *
 * Ported from the locked Session W demo (.design-explorations/website-v2-demo/
 * motion.js). What changed against the previous Pavilion version:
 *
 * - The hero is no longer a pinned scrub. The reading counts 0→82 once on
 *   load over 700ms and the tick-rail needle rises WITH it on the same cubic
 *   ease, so the reading and its live-state mark move together.
 * - The vocabulary marquee is gone (HAN dropped it), and with it the pause
 *   control and the nav-pill auto-hide: hero and close now use App Store
 *   badges, so the nav pill is the page's only ink pill and never competes.
 * - The strike-zone bar runs on the demo's 0.0–2.0 axis (pos = acwr / 2).
 *
 * Still here: the pinned 3-step showcase, the pinned zone scrub, the fanned
 * spread, ghost drift, the self-drawing baseline chart, the 40ms annotation
 * stagger, and the self-hosted Lottie pair (paused off-screen).
 *
 * Reduced motion: the markup already carries every final value, so we only
 * fill counters and show a static Lottie frame. All initial-hidden CSS sits
 * behind :where(html.motion) plus a prefers-reduced-motion override in
 * global.css. Every block is wrapped in try/catch so one failure never blanks
 * the page.
 */

declare global {
  interface Window {
    lottie?: {
      loadAnimation: (params: {
        container: Element;
        renderer: string;
        loop: boolean;
        autoplay: boolean;
        path: string;
      }) => LottieAnim;
    };
  }
}

interface LottieAnim {
  play: () => void;
  pause: () => void;
  goToAndStop: (frame: number, isFrame: boolean) => void;
  addEventListener: (name: string, cb: () => void) => void;
  totalFrames: number;
}

(function () {
  'use strict';
  let RM = false;
  try {
    RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { /* noop */ }

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  /* hero line masks */
  try {
    const heroLines = document.getElementById('heroLines');
    if (heroLines) {
      if (RM) {
        heroLines.classList.add('played');
      } else {
        setTimeout(() => { heroLines.classList.add('played'); }, 120);
      }
    }
  } catch (e) { /* noop */ }

  /* hero reading: count-up and needle rise together, once, on load. Final
     values (82 / left:82%) are baked into the markup, so no-JS and reduced
     motion land on the finished state without this block running. */
  try {
    const score = document.getElementById('heroScore');
    const needle = document.getElementById('heroNeedle');
    if (score && !RM) {
      let start: number | null = null;
      const dur = 700;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const t = Math.min((ts - start) / dur, 1);
        const v = 82 * easeOut(t);
        score.textContent = String(Math.round(v));
        if (needle) needle.style.left = v.toFixed(2) + '%';
        if (t < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  } catch (e) { /* noop */ }

  /* count-ups — markup carries final values; the count plays once on entry */
  function runCount(el: Element) {
    const target = parseInt(el.getAttribute('data-count') || '', 10) || 0;
    const comma = el.getAttribute('data-comma') === '1';
    function fmt(v: number) {
      return comma ? v.toLocaleString('en-US') : String(v);
    }
    if (RM) { el.textContent = fmt(target); return; }
    let start: number | null = null;
    const dur = 400;
    function step(ts: number) {
      if (start === null) start = ts;
      const t = Math.min((ts - start) / dur, 1);
      el.textContent = fmt(Math.round(target * easeOut(t)));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* annotation choreography: the surface settles, THEN the scientist labels
     it. The marks inside a [data-anno-reveal] surface start hidden in CSS;
     here we stamp each one with a 40ms-stepped delay and flip the parent, so
     a whole card's marginalia is choreographed without hand-indexing every
     label in the template. */
  const ANNO_STAGGER = 40;
  const ANNO_SETTLE = 240;
  const ANNO_SELECTOR = '.micro, .anno, .anno-sm, .tree-row';
  function labelSurface(el: HTMLElement) {
    if (el.classList.contains('in')) return;
    const marks = el.querySelectorAll(ANNO_SELECTOR);
    for (let i = 0; i < marks.length; i++) {
      (marks[i] as HTMLElement).style.transitionDelay = (ANNO_SETTLE + i * ANNO_STAGGER) + 'ms';
    }
    el.classList.add('in');
  }

  /* reveal + counter + quote observer (the homepage uses data-reveal, NOT
     data-animate, so siteMotion.ts never double-drives these elements) */
  try {
    const revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]')) as HTMLElement[];
    const countEls = Array.prototype.slice.call(document.querySelectorAll('[data-count]')) as HTMLElement[];
    const quoteEls = Array.prototype.slice.call(document.querySelectorAll('[data-quote]')) as HTMLElement[];
    const annoEls = Array.prototype.slice.call(document.querySelectorAll('[data-anno-reveal]')) as HTMLElement[];
    const staticAnnoEls = Array.prototype.slice.call(document.querySelectorAll('.annotation-reveal')) as HTMLElement[];

    if (RM || typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => { el.classList.add('in'); });
      quoteEls.forEach((el) => { el.classList.add('in'); });
      annoEls.forEach((el) => { el.classList.add('in'); });
      staticAnnoEls.forEach((el) => { el.classList.add('in'); });
      countEls.forEach((el) => { runCount(el); });
    } else {
      const counted = new WeakSet<Element>();
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          if (el.hasAttribute('data-reveal') && !el.classList.contains('in')) {
            const siblings = revealEls.filter((s) =>
              s.parentElement === el.parentElement && !s.classList.contains('in'));
            const idx = siblings.indexOf(el);
            el.style.transitionDelay = (Math.max(idx, 0) * 60) + 'ms';
            el.classList.add('in');
          }
          if (el.hasAttribute('data-quote')) el.classList.add('in');
          if (el.hasAttribute('data-anno-reveal')) labelSurface(el);
          if (el.classList.contains('annotation-reveal')) el.classList.add('in');
          if (el.hasAttribute('data-count') && !counted.has(el)) {
            counted.add(el);
            runCount(el);
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -5% 0px' });

      revealEls.forEach((el) => { io.observe(el); });
      quoteEls.forEach((el) => { io.observe(el); });
      annoEls.forEach((el) => { io.observe(el); });
      staticAnnoEls.forEach((el) => { io.observe(el); });
      countEls.forEach((el) => { io.observe(el); });
    }
  } catch (e) {
    try {
      document.querySelectorAll('[data-reveal]').forEach((el) => { el.classList.add('in'); });
      document.querySelectorAll('[data-anno-reveal]').forEach((el) => { el.classList.add('in'); });
      document.querySelectorAll('.annotation-reveal').forEach((el) => { el.classList.add('in'); });
    } catch (e2) { /* noop */ }
  }

  /* self-drawing baseline chart (section 05). Reduced motion is handled in CSS
     — html:not(.motion) and prefers-reduced-motion both show the finished
     chart — so this block only runs when motion is on. Draw order: line (left
     to right), then the dashed baseline, then the "now" marker. */
  try {
    const spark = document.getElementById('spark');
    if (spark && !RM && typeof IntersectionObserver !== 'undefined') {
      const line = spark.querySelector('path.line') as SVGPathElement | null;
      const baseline = document.getElementById('baseline');
      const nowDot = document.getElementById('nowDot');
      let drawn = false;
      const cio = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting || drawn) return;
          drawn = true;
          cio.disconnect();
          if (line) {
            line.style.transition = 'stroke-dashoffset 900ms var(--ease)';
            window.requestAnimationFrame(() => { line.style.strokeDashoffset = '0'; });
          }
          window.setTimeout(() => {
            if (baseline) {
              baseline.style.transition = 'opacity var(--dur-entrance) var(--ease)';
              baseline.style.opacity = '1';
            }
          }, 700);
          window.setTimeout(() => {
            if (nowDot) {
              nowDot.style.transition = 'opacity var(--dur-state) var(--ease)';
              nowDot.style.opacity = '1';
            }
          }, 1000);
        });
      }, { threshold: 0.4 });
      cio.observe(spark);
    }
  } catch (e) { /* noop */ }

  /* lottie — self-hosted vendor file, pause off-screen, static frame when reduced */
  try {
    const lottie = window.lottie;
    if (lottie) {
      const lottieEls = Array.prototype.slice.call(document.querySelectorAll('[data-lottie]')) as HTMLElement[];
      lottieEls.forEach((el) => {
        const anim = lottie.loadAnimation({
          container: el,
          renderer: 'svg',
          loop: true,
          autoplay: false,
          path: el.getAttribute('data-lottie') || ''
        });
        if (RM) {
          anim.addEventListener('DOMLoaded', () => {
            try { anim.goToAndStop(Math.floor(anim.totalFrames * 0.55), true); } catch (e) { /* noop */ }
          });
          return;
        }
        if (typeof IntersectionObserver !== 'undefined') {
          const lio = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              try {
                if (entry.isIntersecting) anim.play();
                else anim.pause();
              } catch (e) { /* noop */ }
            });
          }, { threshold: 0.1 });
          lio.observe(el);
        } else {
          anim.play();
        }
      });
    }
  } catch (e) { /* noop */ }

  if (RM) return; /* reduced motion: markup already shows final values */

  /* ---------- scroll-scrubbed pinned scenes + fan and ghost drift ---------- */
  try {
    let vh = window.innerHeight || 800;
    const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
    interface Scene { el: Element; p: number; fn: (p: number) => void }
    const scenes: Scene[] = [];

    function progressOf(el: Element) {
      const r = el.getBoundingClientRect();
      const span = r.height - vh;
      if (span <= 0) return r.top < 0 ? 1 : 0;
      return clamp01(-r.top / span);
    }

    /* scene: pinned 3-step showcase — verdict → strike zone → load */
    (function () {
      const wrap = document.getElementById('showWrap');
      if (!wrap) return;
      const railFill = document.getElementById('railFill');
      const plates = Array.prototype.slice.call(wrap.querySelectorAll('.shot')) as HTMLElement[];
      const steps = Array.prototype.slice.call(wrap.querySelectorAll('.step')) as HTMLElement[];
      let cur = -1;
      scenes.push({ el: wrap, p: -1, fn: (p) => {
        if (railFill) railFill.style.transform = 'scaleY(' + p.toFixed(4) + ')';
        const idx = Math.min(2, Math.floor(p * 3));
        if (idx !== cur) {
          cur = idx;
          plates.forEach((pl, i) => {
            pl.classList.toggle('active', i === idx);
            pl.classList.toggle('prev', i < idx);
          });
          steps.forEach((st, i) => {
            st.classList.toggle('active', i === idx);
          });
        }
      } });
    })();

    /* scene: pinned strike-zone bar — ACWR 0.40→1.45 on a 0.0–2.0 axis */
    (function () {
      const wrap = document.getElementById('zoneWrap');
      const bar = document.getElementById('zoneBar');
      const fill = document.getElementById('zoneFill');
      const needle = document.getElementById('zoneNeedle');
      const chip = document.getElementById('zoneChip');
      const label = document.getElementById('zoneLabel');
      if (!wrap || !bar || !fill || !needle || !chip || !label) return;
      let barW = bar.getBoundingClientRect().width || 1;
      window.addEventListener('resize', () => {
        barW = bar.getBoundingClientRect().width || 1;
      });
      needle.style.left = '0';
      /* "now" prefix on the live reading, from the locale copy */
      const nowRaw = chip.getAttribute('data-now') || '';
      const nowLabel = nowRaw ? nowRaw + ' ' : '';
      /* zone labels come from the locale copy via data-zones (EN fallback) */
      let zoneTexts = [
        'Undertraining — room to build',
        'In the strike zone',
        'Trending hot — time to modify',
        'Overreach risk — hold'
      ];
      try {
        const parsed = JSON.parse(label.getAttribute('data-zones') || '');
        if (Array.isArray(parsed) && parsed.length === 4 && parsed.every((z) => typeof z === 'string')) {
          zoneTexts = parsed;
        }
      } catch (e) { /* noop — keep EN fallback */ }
      const zones = [
        { txt: zoneTexts[0], cls: 'zl0' },
        { txt: zoneTexts[1], cls: 'zl1' },
        { txt: zoneTexts[2], cls: 'zl2' },
        { txt: zoneTexts[3], cls: 'zl3' }
      ];
      let curZ = -1;
      scenes.push({ el: wrap, p: -1, fn: (p) => {
        const ac = 0.4 + 1.05 * p;   /* 0.40 → 1.45 */
        const pos = ac / 2;          /* the bar axis runs 0.0–2.0 */
        fill.style.transform = 'scaleX(' + pos.toFixed(4) + ')';
        needle.style.transform = 'translateX(' + (pos * barW).toFixed(1) + 'px)';
        chip.textContent = nowLabel + ac.toFixed(2);
        const z = ac < 0.8 ? 0 : ac <= 1.3 ? 1 : ac <= 1.5 ? 2 : 3;
        if (z !== curZ) {
          curZ = z;
          label.textContent = zones[z].txt;
          label.className = 'zone-label num ' + zones[z].cls;
        }
      } });
    })();

    /* fan + ghost numerals, driven from the same loop */
    const spreads = Array.prototype.slice.call(document.querySelectorAll('[data-spread]')) as HTMLElement[];
    const ghosts = Array.prototype.slice.call(document.querySelectorAll('[data-ghost]')) as HTMLElement[];

    window.addEventListener('resize', () => {
      vh = window.innerHeight || 800;
    });

    function frame() {
      let i: number, s: Scene, p: number, r: DOMRect, raw: number, eased: number, off: number;
      for (i = 0; i < scenes.length; i++) {
        s = scenes[i];
        p = progressOf(s.el);
        if (Math.abs(p - s.p) > 0.0004) { s.p = p; s.fn(p); }
      }
      for (i = 0; i < spreads.length; i++) {
        r = spreads[i].getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        raw = (vh * 0.92 - r.top) / (vh * 0.55);
        eased = easeOut(clamp01(raw));
        spreads[i].style.setProperty('--p', eased.toFixed(4));
      }
      for (i = 0; i < ghosts.length; i++) {
        r = ghosts[i].getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        /* -0.08 matches design-system/ui_kits/website/motion.js */
        off = (r.top + r.height / 2 - vh / 2) * -0.08;
        ghosts[i].style.transform = 'translateY(' + off.toFixed(1) + 'px)';
      }
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  } catch (e) { /* noop */ }
})();

export {};
