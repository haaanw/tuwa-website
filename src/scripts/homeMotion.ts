/**
 * Pavilion homepage motion (demo-d port) — loaded ONLY by src/pages/index.astro.
 *
 * - rAF scrub engine for the three pinned scenes (hero score 0→82, 3-step
 *   phone showcase, strike-zone bar 0.40→1.45) + fanned spreads + ghost drift
 * - hero line masks, reveal/count-up/quote observers, marquee pause,
 *   nav-pill auto-hide (one ink pill per screenful)
 * - Lottie via the self-hosted /vendor/lottie.min.js (classic script loaded by
 *   index.astro before this module runs); animations pause off-screen
 * - Lenis smooth scroll is initialised globally in BaseLayout.astro (npm
 *   package, touch + reduced-motion guarded) — NOT here, to avoid double init
 * - Reduced motion: markup already carries final values; we only fill counters
 *   and show a static Lottie frame. All initial-hidden CSS sits behind
 *   :where(html.motion) and a prefers-reduced-motion override in global.css.
 *
 * Every block is wrapped in try/catch so one failure never blanks the page.
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

  /* nav CTA discipline: exactly one ink pill visible per screenful */
  const navCta = document.getElementById('navCta');
  const heroCta = document.getElementById('heroCta');
  let heroCtaPlayed = RM;
  let inkHeroVisible = false;
  let inkCloseVisible = false;
  function applyNavCta() {
    try {
      if (navCta) {
        navCta.classList.toggle('is-hidden', (inkHeroVisible && heroCtaPlayed) || inkCloseVisible);
      }
    } catch (e) { /* noop */ }
  }
  try {
    const closeCta = document.getElementById('closeCta');
    if (typeof IntersectionObserver !== 'undefined') {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.target === heroCta) inkHeroVisible = en.isIntersecting;
          if (en.target === closeCta) inkCloseVisible = en.isIntersecting;
        });
        applyNavCta();
      }, { threshold: 0.25 });
      if (heroCta) cio.observe(heroCta);
      if (closeCta) cio.observe(closeCta);
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
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* reveal + counter + quote observer (homepage uses data-reveal, NOT
     data-animate, so siteMotion.ts never double-drives these elements) */
  try {
    const revealEls = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]')) as HTMLElement[];
    const countEls = Array.prototype.slice.call(document.querySelectorAll('[data-count]')) as HTMLElement[];
    const quoteEls = Array.prototype.slice.call(document.querySelectorAll('[data-quote]')) as HTMLElement[];

    if (RM || typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => { el.classList.add('in'); });
      quoteEls.forEach((el) => { el.classList.add('in'); });
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
          if (el.hasAttribute('data-count') && !counted.has(el)) {
            counted.add(el);
            runCount(el);
          }
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -5% 0px' });

      revealEls.forEach((el) => { io.observe(el); });
      quoteEls.forEach((el) => { io.observe(el); });
      countEls.forEach((el) => { io.observe(el); });
    }
  } catch (e) {
    try {
      document.querySelectorAll('[data-reveal]').forEach((el) => { el.classList.add('in'); });
    } catch (e2) { /* noop */ }
  }

  /* marquee pause */
  try {
    const mq = document.getElementById('marquee');
    const mqBtn = document.getElementById('mqPause');
    if (mq && mqBtn && !RM) {
      const pauseLabel = mqBtn.getAttribute('data-label-pause') || 'pause';
      const playLabel = mqBtn.getAttribute('data-label-play') || 'play';
      mqBtn.addEventListener('click', () => {
        const paused = mq.classList.toggle('paused');
        mqBtn.textContent = paused ? playLabel : pauseLabel;
        mqBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
      });
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

  if (RM) { applyNavCta(); return; } /* reduced motion: markup already shows final values */

  /* ---------- scroll-scrubbed pinned scenes + fans and ghost drift ---------- */
  try {
    let vh = window.innerHeight || 800;
    const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const easeO = (t: number) => 1 - Math.pow(1 - t, 3);
    interface Scene { el: Element; p: number; fn: (p: number) => void }
    const scenes: Scene[] = [];

    function progressOf(el: Element) {
      const r = el.getBoundingClientRect();
      const span = r.height - vh;
      if (span <= 0) return r.top < 0 ? 1 : 0;
      return clamp01(-r.top / span);
    }

    /* scene: pinned hero — score 0→82, tick-rail needle sweep, CTA after scrub */
    (function () {
      const wrap = document.getElementById('heroWrap');
      const score = document.getElementById('heroScore');
      const needle = document.getElementById('heroNeedle');
      const rail = document.getElementById('heroRail');
      const cue = document.getElementById('scrollCue');
      const ctaRow = document.getElementById('heroCtaRow');
      if (!wrap || !score || !needle || !rail) return;
      let railW = rail.clientWidth || 1;
      window.addEventListener('resize', () => {
        railW = rail.clientWidth || 1;
      });
      needle.style.left = '0';
      scenes.push({ el: wrap, p: -1, fn: (p) => {
        const t = easeO(Math.min(1, p / 0.75));
        score.textContent = String(Math.round(82 * t));
        needle.style.transform = 'translateX(' + (railW * 0.82 * t).toFixed(1) + 'px)';
        if (cue) cue.style.opacity = Math.max(0, 1 - p / 0.12).toFixed(3);
        if (p > 0.82 && !heroCtaPlayed) {
          heroCtaPlayed = true;
          if (ctaRow) ctaRow.classList.add('played');
          applyNavCta();
        }
      } });
    })();

    /* scene: sticky 3-step phone showcase — verdict → strike zone → load */
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

    /* scene: pinned strike-zone bar — ACWR 0.40→1.45, live zone label */
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
        const ac = 0.4 + 1.05 * p;          /* 0.40 → 1.45 */
        const pos = (ac - 0.4) / 1.3;       /* position on the 0.4–1.7 scale */
        fill.style.transform = 'scaleX(' + pos.toFixed(4) + ')';
        needle.style.transform = 'translateX(' + (pos * barW).toFixed(1) + 'px)';
        chip.textContent = ac.toFixed(2);
        const z = ac < 0.8 ? 0 : ac <= 1.3 ? 1 : ac <= 1.5 ? 2 : 3;
        if (z !== curZ) {
          curZ = z;
          label.textContent = zones[z].txt;
          label.className = 'zone-label num ' + zones[z].cls;
        }
      } });
    })();

    /* fans + ghost numerals, driven from the same loop */
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
        eased = 1 - Math.pow(1 - clamp01(raw), 3);
        spreads[i].style.setProperty('--p', eased.toFixed(4));
      }
      for (i = 0; i < ghosts.length; i++) {
        r = ghosts[i].getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        off = (r.top + r.height / 2 - vh / 2) * -0.06;
        ghosts[i].style.transform = 'translateY(' + off.toFixed(1) + 'px)';
      }
      window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  } catch (e) { /* noop */ }
})();

export {};
