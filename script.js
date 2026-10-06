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
      top: '74px',
      left: '14px',
      right: '14px',
      padding: '18px',
      background: '#fff',
      border: '1px solid #dbe7eb',
      borderRadius: '16px',
      flexDirection: 'column',
      boxShadow: '0 16px 40px rgba(6,45,70,.12)'
    });
  });
}

window.addEventListener('load', () => {
  document.querySelector('.hero')?.classList.add('is-loaded');
});

const observeOnce = (selector, className = 'is-visible', threshold = 0.2) => {
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

observeOnce('.problem');
observeOnce('.stagger-group');
observeOnce('.reveal-image');
observeOnce('.equation', 'is-active', 0.45);

const growthDemo = document.querySelector('.growth-demo');

if (growthDemo) {
  const growthObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      growthDemo.classList.add('is-active');

      const start = Number(growthDemo.dataset.start || 1000000);
      const rate = Number(growthDemo.dataset.rate || 0.055);
      const years = Number(growthDemo.dataset.years || 5);
      const valueEl = growthDemo.querySelector('.growth-value');
      const yearEl = growthDemo.querySelector('.growth-year');

      const values = Array.from({ length: years + 1 }, (_, year) =>
        Math.round(start * Math.pow(1 + rate, year))
      );

      const labels = ['Today', 'Y1', 'Y2', 'Y3', 'Y4', 'Y5'];
      let step = 0;

      const renderStep = () => {
        const value = values[step];
        if (valueEl) {
          valueEl.textContent = value >= 1000000
            ? '$' + (value / 1000000).toFixed(step === 0 ? 2 : 3).replace(/0+$/, '').replace(/\.$/, '') + 'm'
            : '$' + Math.round(value / 1000) + 'k';
        }
        if (yearEl) yearEl.textContent = labels[step] || ('Y' + step);

        if (step < years) {
          step += 1;
          window.setTimeout(renderStep, 380);
        }
      };

      window.setTimeout(renderStep, 250);
      growthObserver.unobserve(growthDemo);
    });
  }, { threshold: 0.35 });

  growthObserver.observe(growthDemo);
}
