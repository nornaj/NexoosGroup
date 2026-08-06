/* ═══════════════════════════════════════════════════
   NEXOOS — Global Header Component
   Shared across all pages via <script src="header.js">
   Auto-detects dark theme via data-theme="dark" on <body>
   ═══════════════════════════════════════════════════ */

(function () {
  const isDark = document.body.getAttribute('data-theme') === 'dark';

  /* ---------- Color tokens ---------- */
  const c = isDark
    ? {
        headerBg:    'oklch(0.23 0.021 279)',
        headerBorder:'oklch(0.32 0.02 280)',
        headerShadow:'none',
        linkColor:   'oklch(0.92 0.008 280)',
        activeLink:  'oklch(0.665 0.184 36)',
        logoFilter:  'brightness(0) invert(1)',
        ctaClass:    'btn-hover-cta',
      }
    : {
        headerBg:    'oklch(1 0 0)',
        headerBorder:'oklch(0.92 0.005 280)',
        headerShadow:'0 12px 34px -22px oklch(0.196 0.021 279 / 0.4)',
        linkColor:   'oklch(0.3 0.015 280)',
        activeLink:  'oklch(0.665 0.184 36)',
        logoFilter:  'none',
        ctaClass:    'btn-hover-dark',
      };

  /* ---------- Detect current page ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  function isActive(page) {
    if (page === 'index.html' && (path === '' || path === 'index.html')) return true;
    return path === page;
  }
  function linkColor(page) {
    return isActive(page) ? c.activeLink : c.linkColor;
  }

  /* ---------- Mega menu HTML ---------- */
  function megaCol(title, desc, items) {
    return `<div>
      <div class="mega-col-head"><h3>${title}</h3><p>${desc}</p></div>
      ${items.map(i => `<a href="${i.href || 'services.html'}" class="mega-item">
        <div class="mega-item-icon">${i.icon}</div>
        <div class="mega-item-text"><h4>${i.name}</h4><p>${i.desc}</p></div>
      </a>`).join('')}
    </div>`;
  }

  const megaHTML = `<div class="mega-panel"><div class="mega-grid">
    ${megaCol('Design', 'Plan the look, UX and brand', [
      { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>', name: 'Web Design', desc: 'Websites, UX/UI, landing pages & brand identity', href: 'web-design.html' },
    ])}
    ${megaCol('Development', 'Build websites, stores and platforms', [
      { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>', name: 'Web Development', desc: 'Front-end build-only, e-commerce & web platforms', href: 'web-development.html' },
    ])}
    ${megaCol('Marketing', 'Drive traffic and generate leads', [
      { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>', name: 'Marketing & Paid Ads', desc: 'Google Ads, LinkedIn, Meta & tracking attribution', href: 'marketing.html' },
    ])}
    ${megaCol('SEO', 'Get found and rank higher', [
      { icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>', name: 'SEO Services', desc: 'Technical audit, site speed & keyword rankings', href: 'seo.html' },
    ])}
  </div></div>`;

  /* ---------- Logo link (index → #top, others → index.html) ---------- */
  const logoHref = isActive('index.html') ? '#top' : 'index.html';

  /* ---------- Contact CTA href ---------- */
  const ctaHref = isActive('contact.html') ? '#form' : 'contact.html';

  /* ---------- Case studies link ---------- */
  const caseHref = isActive('case-studies.html') ? '#grid' : 'case-studies.html';

  /* ---------- Header HTML ---------- */
  const headerHTML = `
  <div id="site-header" class="site-header-wrap"
    style="position: sticky; top: 0; z-index: 50; isolation: isolate; padding: clamp(12px, 1.6vw, 20px) clamp(16px, 4vw, 40px); display: flex; justify-content: center">
    <header
      style="position: relative; width: 100%; max-width: 1180px; background: ${c.headerBg}; border: 1px solid ${c.headerBorder}; border-radius: 12px; box-shadow: ${c.headerShadow}; overflow: visible">
      <div style="padding: 12px clamp(14px, 1.6vw, 20px); display: flex; align-items: center; gap: clamp(16px, 2.4vw, 40px)">
        <div style="flex: 1; display: flex; align-items: center">
          <a href="${logoHref}" style="display: flex; align-items: center; flex-shrink: 0">
            <img src="images/LOGO.svg" alt="Nexoos Group" style="display: block; height: 26px; width: auto; filter: ${c.logoFilter}">
          </a>
        </div>
        <nav data-nx-nav
          style="display: flex; align-items: center; gap: clamp(18px, 2.2vw, 34px); font-size: 15px; font-weight: 500; flex-shrink: 0">
          <div class="mega-trigger">
            <a href="services.html"
              style="display: inline-flex; align-items: center; gap: 6px; color: ${linkColor('services.html')}">
              Services
              <span class="mega-caret" style="display: inline-flex; line-height: 0"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="oklch(0.52 0.012 280)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4.5l3 3 3-3"/></svg></span>
            </a>
            ${megaHTML}
          </div>
          <a href="${caseHref}" style="color: ${linkColor('case-studies.html')}">Case studies</a>
          <a href="blog.html" style="color: ${linkColor('blog.html')}">Knowledge</a>
          <a href="${isActive('contact.html') ? '#form' : 'contact.html'}" style="color: ${linkColor('contact.html')}">Contact</a>
        </nav>
        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 12px; flex-shrink: 0; flex: 1">
          <a data-nx-cta-desktop href="${ctaHref}" class="${c.ctaClass}"
            style="align-items: center; height: 46px; padding: 0 22px; border-radius: 8px; background: oklch(0.665 0.184 36); color: oklch(0.99 0.003 280); font-size: 15px; font-weight: 600; letter-spacing: -0.01em; transition: background 0.3s">Free consultation</a>
          <button data-nx-menu type="button" id="hamburger-btn" class="hamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  </div>

  <!-- Mobile drawer -->
  <div class="mobile-drawer" id="mobile-drawer">
    <div class="mobile-drawer__backdrop" id="drawer-backdrop"></div>
    <div class="mobile-drawer__panel">
      <button type="button" class="mobile-drawer__close" id="drawer-close-btn" aria-label="Close menu">✕</button>
      <nav class="mobile-drawer__nav">
        <a href="services.html" class="drawer-link">Services</a>
        <a href="${caseHref}" class="drawer-link">Case studies</a>
        <a href="blog.html" class="drawer-link">Knowledge</a>
        <a href="${isActive('contact.html') ? '#form' : 'contact.html'}" class="drawer-link">Contact</a>
      </nav>
      <a href="${ctaHref}" class="mobile-drawer__cta drawer-link">
        Free consultation
        <span style="font-family: 'IBM Plex Mono', monospace; font-weight: 400">→</span>
      </a>
    </div>
  </div>`;

  /* ---------- Inject into placeholder ---------- */
  const placeholder = document.getElementById('nx-header');
  if (placeholder) {
    placeholder.outerHTML = headerHTML;
  }

  /* ---------- Scroll hide/show ---------- */
  (function () {
    const header = document.getElementById('site-header');
    if (!header) return;
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > lastScrollY && currentY > 80) {
            header.classList.add('is-hidden');
          } else {
            header.classList.remove('is-hidden');
          }
          lastScrollY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    });
  })();

  /* ---------- Mobile hamburger menu ---------- */
  (function () {
    const btn = document.getElementById('hamburger-btn');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('drawer-close-btn');
    if (!btn || !drawer) return;

    function openMenu() {
      btn.classList.add('is-active');
      btn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('is-open');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }

    btn.addEventListener('click', () => {
      drawer.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    if (backdrop) backdrop.addEventListener('click', closeMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    drawer.querySelectorAll('.drawer-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  })();

  /* ---------- Mega menu hover ---------- */
  (function () {
    const trigger = document.querySelector('.mega-trigger');
    const panel = trigger ? trigger.querySelector('.mega-panel') : null;
    const link = trigger ? trigger.querySelector('a') : null;
    if (!trigger || !panel || !link) return;

    let closeTimer = null;

    function openMega() {
      clearTimeout(closeTimer);
      trigger.classList.add('is-open');
    }

    function scheduleMegaClose() {
      closeTimer = setTimeout(() => {
        trigger.classList.remove('is-open');
      }, 250);
    }

    link.addEventListener('mouseenter', openMega);
    link.addEventListener('mouseleave', scheduleMegaClose);
    panel.addEventListener('mouseenter', openMega);
    panel.addEventListener('mouseleave', scheduleMegaClose);
  })();
})();
