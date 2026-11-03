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
    if (focus) tabs[index].focus();
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
