import { animate, stagger } from 'animejs';

let motionQuery: MediaQueryList | null = null;
const formatterLocaleMap: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  zh: 'zh-CN',
};

function isReducedMotion() {
  return motionQuery?.matches ?? true;
}

function formatCounterValue(counter: Element, value: number) {
  const suffix = counter.getAttribute('data-counter-suffix') || '';
  const locale = counter.getAttribute('data-locale') || 'en';
  const tag = formatterLocaleMap[locale] || 'en-US';
  return Math.floor(value).toLocaleString(tag) + suffix;
}

function setCounterValue(counter: Element) {
  const target = Number.parseInt(counter.getAttribute('data-counter-target') || '', 10);
  if (Number.isNaN(target)) return;
  counter.textContent = formatCounterValue(counter, target);
}

function animateCounters(root: ParentNode) {
  root.querySelectorAll('[data-counter-target]').forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute('data-counter-target') || '', 10);
    if (Number.isNaN(target)) return;

    if (isReducedMotion()) {
      setCounterValue(counter);
      return;
    }

    animate({ value: 0 }, {
      value: target,
      duration: 420,
      ease: 'outQuad',
      onUpdate: (animation) => {
        const current = Number((animation.targets[0] as { value: number }).value);
        counter.textContent = formatCounterValue(counter, current);
      },
      onComplete: () => setCounterValue(counter),
    });
  });
}

function revealElement(el: Element) {
  el.classList.add('is-visible');

  if (isReducedMotion()) {
    animateCounters(el);
    return;
  }

  const delay = Number.parseInt(el.getAttribute('data-animate-delay') || '0', 10) || 0;
  animate(el, {
    opacity: { from: 0, to: 1 },
    y: { from: 16, to: 0 },
    duration: 420,
    delay,
    ease: 'outQuad',
    onComplete: () => animateCounters(el),
  });
}

function initRevealMotion() {
  const animated = Array.from(document.querySelectorAll('[data-animate]'));
  if (!animated.length) return;

  if (isReducedMotion() || !('IntersectionObserver' in window)) {
    animated.forEach(revealElement);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      revealElement(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  animated.forEach((el) => observer.observe(el));
}

function initHeroMotion() {
  const heroParts = [
    '.hero-headline',
    '.hero-subtitle',
    '.hero-loop-rail',
    '.hero-device',
  ].map((selector) => document.querySelector(selector)).filter(Boolean) as Element[];

  if (!heroParts.length || isReducedMotion()) return;

  animate(heroParts, {
    opacity: { from: 0, to: 1 },
    y: { from: 18, to: 0 },
    scale: { from: 0.985, to: 1 },
    duration: 440,
    delay: stagger(110),
    ease: 'outQuad',
  });
}

function initFeatureLoopMotion() {
  const loop = document.getElementById('feature-loop');
  const panel = document.getElementById('feature-loop-panel');
  if (!loop || !panel || isReducedMotion()) return;

  const motionTargets = [
    panel.querySelector('.feature-loop-panel-icon'),
    panel.querySelector('.feature-loop-panel-copy'),
    panel.querySelector('.feature-loop-panel-cta'),
  ].filter(Boolean) as Element[];

  if (!motionTargets.length) return;

  let previousIndex = loop.getAttribute('data-active-index');
  const observer = new MutationObserver(() => {
    const nextIndex = loop.getAttribute('data-active-index');
    if (nextIndex === previousIndex) return;
    previousIndex = nextIndex;
    animate(motionTargets, {
      opacity: { from: 0, to: 1 },
      y: { from: 6, to: 0 },
      duration: 220,
      delay: stagger(30),
      ease: 'outQuad',
    });
  });

  observer.observe(loop, { attributes: true, attributeFilter: ['data-active-index'] });
}

function initStickySteps() {
  const steps = Array.from(document.querySelectorAll('.scroll-step'));
  if (!steps.length) return;

  if (isReducedMotion()) {
    steps.forEach((step) => step.classList.add('is-active'));
    return;
  }

  steps.forEach((step) => {
    let wasActive = step.classList.contains('is-active');
    const observer = new MutationObserver(() => {
      const active = step.classList.contains('is-active');
      if (active === wasActive) return;
      wasActive = active;
      animate(step, {
        opacity: active ? 1 : 0.58,
        y: active ? 0 : 2,
        duration: 220,
        ease: 'outQuad',
      });
    });
    observer.observe(step, { attributes: true, attributeFilter: ['class'] });
  });
}

function initPanelMotion() {
  const panels = Array.from(document.querySelectorAll('.nav-dropdown, .mobile-menu-panel'));
  if (!panels.length || isReducedMotion()) return;

  panels.forEach((panel) => {
    let wasOpen = panel.classList.contains('is-open');
    const observer = new MutationObserver(() => {
      const isOpen = panel.classList.contains('is-open');
      if (isOpen === wasOpen) return;
      wasOpen = isOpen;
      if (!isOpen) return;
      const isDropdown = panel.classList.contains('nav-dropdown');
      const params = {
        opacity: { from: 0, to: 1 },
        duration: 180,
        ease: 'outQuad',
        ...(!isDropdown ? { y: { from: -8, to: 0 } } : {}),
      };
      animate(panel, params);
    });
    observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
  });
}

function initFaqMotion() {
  const details = Array.from(document.querySelectorAll('details'));
  if (!details.length || isReducedMotion()) return;

  details.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      const answer = item.querySelector('.faq-answer, p');
      if (!answer) return;
      animate(answer, {
        opacity: { from: 0, to: 1 },
        y: { from: -4, to: 0 },
        duration: 180,
        ease: 'outQuad',
      });
    });
  });
}

function initMotion() {
  if (typeof window === 'undefined') return;
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.documentElement.classList.add('js-enabled');
  initHeroMotion();
  initRevealMotion();
  initFeatureLoopMotion();
  initStickySteps();
  initPanelMotion();
  initFaqMotion();
}

if (typeof window !== 'undefined') {
  initMotion();
}
