/* ============================================
   PARETO — Animations & Interactivity
   Libraries: AOS, Swiper, VanillaTilt, Alpine
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- AOS: Animate on Scroll --- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* --- Swiper: Testimonials --- */
  if (typeof Swiper !== 'undefined' && document.querySelector('.swiper-testimonials')) {
    new Swiper('.swiper-testimonials', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        640:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  /* --- Vanilla Tilt: Service Cards --- */
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.service-card'), {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.08,
    });
  }

  /* --- Animated Counters (trust bar) --- */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const observerOptions = { threshold: 0.5 };
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(entry.target.dataset.counter, 10);
          const suffix = entry.target.dataset.suffix || '';
          animateCounter(entry.target, target, suffix);
        }
      });
    }, observerOptions);
    counters.forEach(c => counterObserver.observe(c));
  }

  function animateCounter(el, target, suffix) {
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(update);
  }

  /* --- Mobile Nav Toggle --- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.style.display === 'flex';
      mobileNav.style.display = isOpen ? 'none' : 'flex';
      hamburger.setAttribute('aria-expanded', !isOpen);
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.style.display = 'none';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Active Nav Link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- FAQ Accordion (Book page) --- */
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const answer = trigger.nextElementSibling;
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-trigger').forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        if (t.nextElementSibling) t.nextElementSibling.style.display = 'none';
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        answer.style.display = 'block';
      }
    });
  });

  /* --- Resources Tabs (Resources page) --- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) { panel.style.display = 'block'; AOS.refresh(); }
    });
  });
  if (tabBtns.length) tabBtns[0].click();

  /* --- Session Type Selector (Book page) --- */
  const sessionCards = document.querySelectorAll('.session-type-card');
  sessionCards.forEach(card => {
    card.addEventListener('click', () => {
      sessionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });
  if (sessionCards.length) sessionCards[0].classList.add('selected');

});
