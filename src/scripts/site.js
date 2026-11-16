// Southern Playbook — the only JS on the page (~1.5KB). Everything works without it.
document.documentElement.classList.add('js');

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveals
const revealEls = document.querySelectorAll('[data-reveal]');
if (reduced || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
}

// Parallax: [data-parallax="0.15"] drifts against its parent as it crosses the viewport.
// Positive = slower than the page, negative = faster. One rAF per frame, transforms only.
const layers = [...document.querySelectorAll('[data-parallax]')];
if (layers.length && !reduced) {
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    for (const el of layers) {
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -200 || box.top > vh + 200) continue; // off screen
      const speed = parseFloat(el.dataset.parallax) || 0;
      const delta = box.top + box.height / 2 - vh / 2; // distance from viewport center
      const max = box.height * 0.13; // stay inside the overscan so no edge shows
      const y = Math.max(-max, Math.min(max, -delta * speed));
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
  };
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  update();
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
}

// Mobile dock CTA: shows after the hero, hides at the contact section
const dock = document.querySelector('[data-dock]');
const hero = document.querySelector('[data-hero]');
const talk = document.querySelector('#talk');
if (dock && hero && 'IntersectionObserver' in window) {
  let pastHero = false, atTalk = false;
  const sync = () => dock.classList.toggle('is-shown', pastHero && !atTalk);
  new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(hero);
  if (talk) new IntersectionObserver(([e]) => { atTalk = e.isIntersecting; sync(); }, { threshold: 0.2 }).observe(talk);
}

// Header shadow once scrolled
const header = document.querySelector('[data-header]');
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Sample-site showcase: tabs + auto-rotate
document.querySelectorAll('[data-showcase]').forEach((root) => {
  const tabs = [...root.querySelectorAll('[data-tab]')];
  const panels = [...root.querySelectorAll('[data-panel]')];
  const url = root.querySelector('[data-url]');
  const ROTATE_MS = 6000;
  let index = 0;
  let timer;

  const show = (i, focus = false) => {
    index = (i + tabs.length) % tabs.length;
    tabs.forEach((t, n) => {
      const on = n === index;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      // restart the progress bar
      const bar = t.querySelector('.bar');
      if (bar && on) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
    });
    panels.forEach((p, n) => {
      const on = n === index;
      p.hidden = !on;
      p.classList.toggle('is-active', on);
    });
    if (url) url.textContent = panels[index].dataset.urlValue;
    // On phones the industry list scrolls sideways: keep the active one in view
    // (scroll the list itself, never the page).
    const list = tabs[index].parentElement;
    if (list.scrollWidth > list.clientWidth + 1) {
      list.scrollTo({ left: Math.max(0, tabs[index].offsetLeft - 16), behavior: reduced ? 'auto' : 'smooth' });
    }
    if (focus) tabs[index].focus({ preventScroll: true });
  };

  const play = () => {
    if (reduced) return;
    clearInterval(timer);
    root.classList.add('is-playing');
    root.classList.remove('is-paused');
    timer = setInterval(() => show(index + 1), ROTATE_MS);
  };
  const pause = () => {
    clearInterval(timer);
    root.classList.add('is-paused');
  };
  const stop = () => {
    clearInterval(timer);
    root.classList.remove('is-playing', 'is-paused');
  };

  root.style.setProperty('--rotate', `${ROTATE_MS}ms`);

  tabs.forEach((t, n) =>
    t.addEventListener('click', () => { show(n); stop(); })
  );
  root.querySelector('[role=tablist]')?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { show(index + 1, true); stop(); }
    if (e.key === 'ArrowLeft') { show(index - 1, true); stop(); }
  });
  root.addEventListener('mouseenter', () => root.classList.contains('is-playing') && pause());
  root.addEventListener('mouseleave', () => root.classList.contains('is-paused') && play());

  // Only run while on screen
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !root.dataset.touched) play();
      else if (!e.isIntersecting && !root.dataset.touched) pause();
    }, { threshold: 0.35 }).observe(root);
  } else {
    play();
  }
  tabs.forEach((t) => t.addEventListener('click', () => (root.dataset.touched = '1')));
});
