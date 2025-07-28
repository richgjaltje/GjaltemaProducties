document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

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
});
