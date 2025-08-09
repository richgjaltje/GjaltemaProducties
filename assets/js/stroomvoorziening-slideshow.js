document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('stroomvoorziening-slideshow');
  if (!container) return;

  const imgEl = container.querySelector('.slide-image');
  const captionEl = container.querySelector('.slide-caption');
  const dotsContainer = container.querySelector('.slideshow-dots');

  const slides = Array.from({ length: 4 }, (_, i) => ({
    image: `stroomvoorziening/stroomvoorziening${i + 1}.jpg`,
    text: `stroomvoorziening/slideshow/Slide_${i + 1}.txt`
  }));

  let index = 0;
  let timer;

  const updateDots = () => {
    dotsContainer.querySelectorAll('.slideshow-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  const showSlide = i => {
    index = (i + slides.length) % slides.length;
    const slide = slides[index];
    imgEl.src = slide.image;
    fetch(slide.text)
      .then(r => r.text())
      .then(t => {
        captionEl.textContent = t;
      })
      .catch(() => {
        captionEl.textContent = '';
      });
    updateDots();
  };

  const startTimer = () => {
    timer = setInterval(() => {
      showSlide(index + 1);
    }, 5000);
  };

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slideshow-dot';
    dot.setAttribute('aria-label', `Ga naar slide ${i + 1}`);
    dot.addEventListener('click', () => {
      clearInterval(timer);
      showSlide(i);
      startTimer();
    });
    dotsContainer.appendChild(dot);
  });

  showSlide(0);
  startTimer();
});
