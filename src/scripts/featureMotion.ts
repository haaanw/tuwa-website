/**
 * Pavilion feature-page motion — loaded by src/pages/features/*.astro.
 *
 * Complements the site-wide reveal system (siteMotion.ts drives [data-animate])
 * with the three Pavilion behaviours that homeMotion.ts only wires on the
 * homepage:
 *
 * - rAF loop driving fanned spreads ([data-spread] --p) and ghost-numeral
 *   drift ([data-ghost]) — no pinned scrub scenes here, feature pages stay
 *   editorial
 * - Lottie via the self-hosted /vendor/lottie.min.js (classic script loaded
 *   by the page before this module); animations pause off-screen, reduced
 *   motion shows a static frame
 * - ink-pill discipline: the header pill (#navCta) hides while the closing
 *   ink CTA (#closeCta) is on screen — one ink pill per screenful
 *
 * Every block is wrapped in try/catch so one failure never blanks the page.
 */

interface LottieAnim {
  play: () => void;
  pause: () => void;
  goToAndStop: (frame: number, isFrame: boolean) => void;
  addEventListener: (name: string, cb: () => void) => void;
  totalFrames: number;
}

interface LottiePlayer {
  loadAnimation: (params: {
    container: Element;
    renderer: string;
    loop: boolean;
    autoplay: boolean;
    path: string;
  }) => LottieAnim;
}

(function () {
  'use strict';
  let RM = false;
  try {
    RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { /* noop */ }

  /* ink-pill discipline: hide the nav pill while the closing CTA is visible */
  try {
    const navCta = document.getElementById('navCta');
    const closeCta = document.getElementById('closeCta');
    if (navCta && closeCta && typeof IntersectionObserver !== 'undefined') {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          navCta.classList.toggle('is-hidden', en.isIntersecting);
        });
      }, { threshold: 0.25 });
      cio.observe(closeCta);
    }
  } catch (e) { /* noop */ }

  /* lottie — self-hosted vendor file, pause off-screen, static frame when reduced */
  try {
    const lottie = (window as unknown as { lottie?: LottiePlayer }).lottie;
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

  if (RM) return; /* reduced motion: CSS shows spreads fanned and ghosts static */

  /* fans + ghost numerals — same loop shape as homeMotion, no pinned scenes */
  try {
    let vh = window.innerHeight || 800;
    const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const spreads = Array.prototype.slice.call(document.querySelectorAll('[data-spread]')) as HTMLElement[];
    const ghosts = Array.prototype.slice.call(document.querySelectorAll('[data-ghost]')) as HTMLElement[];
    if (!spreads.length && !ghosts.length) return;

    window.addEventListener('resize', () => {
      vh = window.innerHeight || 800;
    });

    function frame() {
      let i: number, r: DOMRect, raw: number, eased: number, off: number;
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
