const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));

    if (open) {
      nav.removeAttribute('style');
      return;
    }

    Object.assign(nav.style, {
      display: 'flex',
      position: 'absolute',
      top: '60px',
      left: '14px',
      right: '14px',
      padding: '16px',
      background: '#fff',
      border: '1px solid #dbe7eb',
      borderRadius: '14px',
      flexDirection: 'column',
      boxShadow: '0 14px 34px rgba(6,45,70,.12)'
    });
  });
}

window.addEventListener('load', () => {
  document.querySelector('.hero')?.classList.add('is-loaded');
});

const observeOnce = (selector, className = 'is-visible', threshold = 0.22) => {
  document.querySelectorAll(selector).forEach((el) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(className);
        observer.unobserve(entry.target);
      });
    }, { threshold });

    observer.observe(el);
  });
};

observeOnce('.problem', 'is-visible', 0.2);
observeOnce('.equation', 'is-active', 0.55);

const growthStrip = document.querySelector('.growth-strip');

if (growthStrip) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      growthStrip.classList.add('is-active');

      const start = Number(growthStrip.dataset.start || 1000000);
      const rate = Number(growthStrip.dataset.rate || 0.055);
      const years = Number(growthStrip.dataset.years || 5);
      const finish = start * Math.pow(1 + rate, years);
      const valueEl = growthStrip.querySelector('.growth-value');

      const duration = 1900;
      const startTime = performance.now();

      const animateValue = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = start + (finish - start) * eased;

        if (valueEl) {
          valueEl.textContent = '$' + (value / 1000000).toFixed(2) + 'm';
        }

        if (progress < 1) requestAnimationFrame(animateValue);
      };

      requestAnimationFrame(animateValue);
      observer.unobserve(growthStrip);
    });
  }, { threshold: 0.45 });

  observer.observe(growthStrip);
}
