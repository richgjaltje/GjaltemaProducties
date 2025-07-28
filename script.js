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
    }
  }
});
