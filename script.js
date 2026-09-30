const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    });
  });
}

const revealItems = document.querySelectorAll('[data-reveal]');
revealItems.forEach((item) => {
  const delay = item.dataset.delay;
  if (delay) item.style.setProperty('--delay', `${delay}ms`);
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    const status = contactForm.querySelector('.form-status');
    button.disabled = true;
    button.innerHTML = 'Enviando <span aria-hidden="true">…</span>';
    status.textContent = '';

    window.setTimeout(() => {
      button.disabled = false;
      button.innerHTML = 'Quero dar o próximo passo';
      status.textContent = 'Recebemos seus dados. Em breve, nosso time entra em contato.';
      contactForm.reset();
    }, 650);
  });
}

if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

const timeline = document.querySelector('[data-timeline]');
if (timeline) {
  const track = timeline.querySelector('[data-timeline-track]');
  const fill = timeline.querySelector('[data-timeline-fill]');
  const items = [...timeline.querySelectorAll('[data-timeline-item]')];
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animationFrame = 0;
  let targetProgress = 0;
  let renderedProgress = 0;
  let previousFrameTime = 0;

  const applyTimelineProgress = (progress) => {
    const timelineProgress = Math.max(0, Math.min(1, progress));

    if (motionQuery.matches) {
      track.style.transform = 'none';
      fill.style.width = '100%';
      items.forEach((item) => item.classList.add('is-active'));
      return;
    }

    const horizontalDistance = window.innerWidth <= 640 ? 73 : 50;
    track.style.transform = `translate3d(${-timelineProgress * horizontalDistance}%, 0, 0)`;
    fill.style.width = `${Math.max(8, timelineProgress * 100)}%`;
    items.forEach((item) => {
      item.classList.toggle('is-active', timelineProgress >= Number(item.dataset.progress || 0));
    });
  };

  const updateTimeline = () => {
    const range = Math.max(1, timeline.offsetHeight - window.innerHeight);
    targetProgress = Math.max(0, Math.min(1, -timeline.getBoundingClientRect().top / range));

    if (motionQuery.matches) {
      renderedProgress = targetProgress;
      applyTimelineProgress(renderedProgress);
      return;
    }

    if (!animationFrame) {
      previousFrameTime = performance.now();
      animationFrame = window.requestAnimationFrame(animateTimeline);
    }
  };

  const animateTimeline = (timestamp) => {
    const elapsed = Math.min(64, timestamp - previousFrameTime || 16);
    const ease = 1 - Math.exp(-elapsed / 280);
    renderedProgress += (targetProgress - renderedProgress) * ease;

    const atSectionEnd = targetProgress >= 0.999 && timeline.getBoundingClientRect().bottom <= window.innerHeight + 1;
    const atSectionStart = targetProgress <= 0.001 && timeline.getBoundingClientRect().top >= -1;
    if (atSectionEnd || atSectionStart) renderedProgress = targetProgress;

    applyTimelineProgress(renderedProgress);
    previousFrameTime = timestamp;

    if (Math.abs(targetProgress - renderedProgress) > 0.0005) {
      animationFrame = window.requestAnimationFrame(animateTimeline);
    } else {
      renderedProgress = targetProgress;
      applyTimelineProgress(renderedProgress);
      animationFrame = 0;
    }
  };

  const requestTimelineUpdate = () => {
    updateTimeline();
  };

  updateTimeline();
  window.addEventListener('scroll', requestTimelineUpdate, { passive: true });
  window.addEventListener('resize', requestTimelineUpdate);
  window.addEventListener('hashchange', requestTimelineUpdate);
  motionQuery.addEventListener('change', requestTimelineUpdate);
  window.setTimeout(requestTimelineUpdate, 0);
}
