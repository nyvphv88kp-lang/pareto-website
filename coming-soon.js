/* ============================================
   PARETO — "Coming soon" notice for resources
   Any link still pointing at the Gumroad placeholder
   (exactly https://gumroad.com) opens this notice instead.
   Real product links (gumroad.com/l/...) are left alone.
   ============================================ */

(function () {
  const PLACEHOLDER = /^https?:\/\/(www\.)?gumroad\.com\/?$/i;

  const css = `
    .press-overlay {
      position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center;
      padding: 1.25rem; background: rgba(10,24,44,.62); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
      opacity: 0; transition: opacity .25s ease;
    }
    .press-overlay.is-open { opacity: 1; }
    .press-overlay[hidden] { display: none; }
    .press-card {
      position: relative; width: 100%; max-width: 460px; background: var(--white, #fff);
      border-radius: var(--radius-lg, 20px); box-shadow: 0 24px 60px rgba(10,24,44,.35); overflow: hidden;
      transform: translateY(14px) scale(.98); transition: transform .3s cubic-bezier(.2,.8,.2,1);
    }
    .press-overlay.is-open .press-card { transform: none; }
    .press-card__top {
      position: relative; height: 128px; background: linear-gradient(135deg, #0b1e36 0%, #0f2744 60%, #1a3a5e 100%);
      display: flex; align-items: flex-end; justify-content: center; gap: 7px; padding-bottom: 0;
    }
    .press-book { width: 30px; border-radius: 3px 3px 0 0; position: relative; }
    .press-book::before, .press-book::after {
      content: ''; position: absolute; left: 18%; right: 18%; border-top: 1.5px solid currentColor;
      border-bottom: 1.5px solid currentColor; padding-top: 2px; opacity: .85;
    }
    .press-book::before { top: 8px; } .press-book::after { bottom: 10px; }
    .press-book--1 { height: 74px; background: #c9a44a; color: #0f2744; }
    .press-book--2 { height: 88px; background: #f3ecd8; color: #c9a44a; }
    .press-book--3 { height: 64px; background: #2a5080; color: #e8c96a; }
    .press-book--gap { height: 70px; width: 30px; border: 1.5px dashed rgba(232,201,106,.7); border-bottom: 0; background: transparent; }
    .press-book--gap::before, .press-book--gap::after { display: none; }
    .press-stamp {
      position: absolute; top: 18px; right: 22px; transform: rotate(-9deg);
      font: 700 0.62rem/1 var(--font-body, Inter, sans-serif); letter-spacing: .2em; text-transform: uppercase;
      color: #e8c96a; border: 1.5px solid #e8c96a; border-radius: 4px; padding: 6px 8px 5px;
    }
    .press-card__body { padding: 1.75rem 2rem 2rem; }
    .press-eyebrow {
      font-size: .72rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: var(--gold, #c9a44a);
    }
    .press-card h2 {
      font-family: var(--font-head, 'Playfair Display', Georgia, serif); color: var(--navy, #0f2744);
      font-size: clamp(1.45rem, 4.6vw, 1.75rem); line-height: 1.2; margin: .45rem 0 .8rem;
    }
    .press-card p { color: var(--text-muted, #666); line-height: 1.7; margin: 0 0 1.5rem; font-size: .97rem; }
    .press-card__actions { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; }
    .press-close-link {
      background: none; border: 0; padding: .25rem 0; cursor: pointer; font: 600 .85rem var(--font-body, Inter, sans-serif);
      color: var(--navy, #0f2744); border-bottom: 1px solid currentColor;
    }
    .press-close-link:hover { color: var(--gold, #c9a44a); }
    .press-x {
      position: absolute; top: 10px; left: 12px; width: 34px; height: 34px; border-radius: 50%; border: 0; cursor: pointer;
      background: rgba(255,255,255,.12); color: #fff; font-size: 1.2rem; line-height: 1;
    }
    .press-x:hover { background: rgba(255,255,255,.22); }
    .press-overlay :focus-visible { outline: 2px solid var(--gold, #c9a44a); outline-offset: 3px; }
    @media (max-width: 420px) { .press-card__body { padding: 1.5rem 1.4rem 1.75rem; } }
    @media (prefers-reduced-motion: reduce) { .press-overlay, .press-card { transition: none; } }
  `;

  let overlay, lastFocus;

  function build() {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    overlay = document.createElement('div');
    overlay.className = 'press-overlay';
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="press-card" role="dialog" aria-modal="true" aria-labelledby="pressTitle" aria-describedby="pressText">
        <div class="press-card__top" aria-hidden="true">
          <span class="press-book press-book--1"></span>
          <span class="press-book press-book--2"></span>
          <span class="press-book press-book--gap"></span>
          <span class="press-book press-book--3"></span>
          <span class="press-stamp">In preparation</span>
        </div>
        <button class="press-x" type="button" aria-label="Close">×</button>
        <div class="press-card__body">
          <div class="press-eyebrow">Pareto Resource Library</div>
          <h2 id="pressTitle">This edition is still at the press.</h2>
          <p id="pressText">We're putting the finishing touches on our study guides, so that every page is accurate, clear and genuinely exam-ready. This resource will be available here very soon. In the meantime, we're happy to help you one-to-one.</p>
          <div class="press-card__actions">
            <a class="btn btn--primary" href="book.html">Book a session</a>
            <button class="press-close-link" type="button">Keep browsing</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      if (e.target === overlay || e.target.closest('.press-x, .press-close-link')) close();
    });
    document.addEventListener('keydown', e => {
      if (overlay.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {                       // keep focus inside the dialog
        const f = [...overlay.querySelectorAll('a, button')];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });
  }

  function open() {
    if (!overlay) build();
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    overlay.querySelector('.btn').focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    setTimeout(() => { overlay.hidden = true; }, 250);
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || !PLACEHOLDER.test(a.getAttribute('href'))) return;
    e.preventDefault();
    open();
  });
})();
