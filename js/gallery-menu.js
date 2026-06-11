(function(){
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  dropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector('.gallery-mega-menu');
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!menu) return;

    let closeTimer;

    function openMenu(){
      window.clearTimeout(closeTimer);
      dropdown.classList.add('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }

    function closeMenuNow(){
      window.clearTimeout(closeTimer);
      dropdown.classList.remove('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }

    function closeMenu(){
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        closeMenuNow();
      }, 350);
    }

    if (trigger) {
      trigger.setAttribute('aria-expanded', 'false');
      trigger.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        dropdowns.forEach((openDropdown) => {
          if (openDropdown !== dropdown) {
            openDropdown.classList.remove('is-open');
            const openTrigger = openDropdown.querySelector('.nav-dropdown-trigger');
            if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        openMenu();
      });
    }

    dropdown.addEventListener('pointerenter', openMenu);
    dropdown.addEventListener('pointerleave', closeMenu);
    menu.addEventListener('pointerenter', openMenu);
    menu.addEventListener('pointerleave', closeMenu);
    dropdown.addEventListener('focusin', openMenu);
    dropdown.addEventListener('focusout', (event) => {
      if (event.relatedTarget && dropdown.contains(event.relatedTarget)) return;
      closeMenu();
    });
    document.addEventListener('click', (event) => {
      if (dropdown.contains(event.target)) return;
      closeMenuNow();
    });
  });
})();

(function(){
  const header = document.querySelector('.site-header');
  if (!header) return;

  const nav = header.querySelector('.site-nav.header-nav');
  if (!nav) return;

  const headerActions = header.querySelector('.header-right');
  const headerActionsParent = headerActions ? headerActions.parentNode : null;
  const headerActionsNext = headerActions ? headerActions.nextSibling : null;
  const langSwitcher = headerActions ? headerActions.querySelector('.lang-switcher') : null;
  const contactLink = headerActions ? headerActions.querySelector('.header-contact') : null;

  if (!nav.id) nav.id = 'site-mobile-nav';

  const logo = header.querySelector('.logo');
  const logoSrc = logo ? logo.getAttribute('src') || '' : '';
  const burgerSrc = logoSrc.includes('../')
    ? '../assets/images/burgermenu.png'
    : 'assets/images/burgermenu.png';

  const toggle = document.createElement('button');
  toggle.className = 'mobile-nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.setAttribute('aria-controls', nav.id);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = `<img src="${burgerSrc}" alt="" aria-hidden="true">`;
  header.insertBefore(toggle, nav);
  document.body.classList.add('mobile-nav-ready');

  const mobileQuery = window.matchMedia('(max-width: 560px)');

  function syncHeaderActions(){
    if (!headerActions || !headerActionsParent) return;

    if (mobileQuery.matches) {
      if (langSwitcher && langSwitcher.parentNode !== nav) nav.insertBefore(langSwitcher, nav.firstChild);
      if (contactLink && contactLink.parentNode !== nav) nav.appendChild(contactLink);
      return;
    }

    if (langSwitcher && langSwitcher.parentNode !== headerActions) {
      headerActions.insertBefore(langSwitcher, headerActions.firstChild);
    }
    if (contactLink && contactLink.parentNode !== headerActions) {
      headerActions.appendChild(contactLink);
    }
    if (headerActions.parentNode !== headerActionsParent) {
      headerActionsParent.insertBefore(headerActions, headerActionsNext);
    }
  }

  function setOpen(isOpen){
    document.body.classList.toggle('mobile-nav-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    if (!isOpen) {
      nav.querySelectorAll('.nav-dropdown.is-open').forEach((dropdown) => {
        dropdown.classList.remove('is-open');
        const dropdownTrigger = dropdown.querySelector('.nav-dropdown-trigger');
        if (dropdownTrigger) dropdownTrigger.setAttribute('aria-expanded', 'false');
      });
    }
  }

  toggle.addEventListener('click', () => {
    setOpen(!document.body.classList.contains('mobile-nav-open'));
  });

  nav.addEventListener('click', (event) => {
    if (!mobileQuery.matches) return;

    const dropdownTrigger = event.target.closest('.nav-dropdown-trigger');
    if (dropdownTrigger) {
      event.preventDefault();
      const dropdown = dropdownTrigger.closest('.nav-dropdown');
      const shouldOpen = dropdown && !dropdown.classList.contains('is-open');
      nav.querySelectorAll('.nav-dropdown.is-open').forEach((openDropdown) => {
        if (openDropdown !== dropdown) openDropdown.classList.remove('is-open');
      });
      if (dropdown) dropdown.classList.toggle('is-open', shouldOpen);
      return;
    }

    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  mobileQuery.addEventListener('change', (event) => {
    syncHeaderActions();
    if (!event.matches) setOpen(false);
  });

  syncHeaderActions();
})();
