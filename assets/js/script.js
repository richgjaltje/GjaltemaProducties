document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) {
    let lastScrollY = window.scrollY;
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    };

    const isMobile = () => window.getComputedStyle(toggle).display !== 'none';

    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });

    const collapseOnInteraction = (e) => {
      if (
        isMobile() &&
        nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        e.target !== toggle
      ) {
        closeMenu();
      }
    };

    document.addEventListener('click', collapseOnInteraction);
    document.addEventListener('keydown', () => {
      if (isMobile() && nav.classList.contains('open')) {
        closeMenu();
      }
    });
    document.addEventListener('scroll', () => {
      if (isMobile()) {
        // Laat het menu open wanneer er gescrold wordt op mobiele schermen
        nav.classList.remove('nav-hidden');
      } else {
        if (window.scrollY > lastScrollY) {
          nav.classList.add('nav-hidden');
        } else {
          nav.classList.remove('nav-hidden');
        }
        lastScrollY = window.scrollY;
      }
    }, { passive: true });
  }

  document.querySelectorAll('[data-text-src]').forEach(el => {
    fetch(el.dataset.textSrc)
      .then(r => r.text())
      .then(t => { el.textContent = t; })
      .catch(e => console.error('Text load error', e));
  });

  const success = document.getElementById('success');
    if (success) {
      success.style.display = 'none';
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('success') === '1') {
        success.style.display = 'block';

      // remove ?success=1 from the URL so the message is not shown on refresh
      const url = new URL(window.location);
      url.searchParams.delete('success');
      history.replaceState(null, '', url);

      // hide the message after a short delay
      setTimeout(() => {
        success.style.display = 'none';
      }, 5000);
      }
    }

    const messageField = document.getElementById('message');
    if (messageField) {
      const urlParams = new URLSearchParams(window.location.search);
      const pakket = urlParams.get('pakket');
      if (pakket) {
        messageField.value = `Ik ben geïnteresseerd in pakket ${pakket}`;
      }
    }
  });
