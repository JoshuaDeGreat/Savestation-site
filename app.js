// SaveStation UI behavior: mobile menu + active section highlighting.
(() => {
  const burger = document.querySelector('.burger');
  const mobile = document.querySelector('.mobile');
  const navLinks = [...document.querySelectorAll('.nav__link')];

  // Mobile menu toggle
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      mobile.hidden = expanded;
    });

    // Close menu on click
    mobile.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      burger.setAttribute('aria-expanded', 'false');
      mobile.hidden = true;
    });
  }

  // Active section highlighting (desktop nav)
  const sections = navLinks
    .map(a => document.getElementById(a.dataset.section))
    .filter(Boolean);

  if (sections.length) {
    const io = new IntersectionObserver((entries) => {
      // Pick most-visible intersecting section
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach(a => a.classList.toggle(
        'is-active',
        a.dataset.section === visible.target.id
      ));
    }, { root: null, threshold: [0.2, 0.35, 0.5, 0.65] });

    sections.forEach(s => io.observe(s));
  }
})();
