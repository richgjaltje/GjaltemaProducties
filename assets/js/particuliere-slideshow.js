document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('particuliere-slideshow');
  if (!container) return;
  const imgEl = container.querySelector('.slide-image');
  const captionEl = container.querySelector('.slide-caption');
  const slides = Array.from({ length: 8 }, (_, i) => ({
    image: `licht-en-geluid/particuliere-slideshow/images/Slide_${i + 1}.jpg`,
    text: `licht-en-geluid/particuliere-slideshow/Slide_${i + 1}.txt`
  }));
  let index = 0;
  const showSlide = () => {
    const slide = slides[index];
    imgEl.src = slide.image;
    fetch(slide.text)
      .then(r => r.text())
      .then(t => { captionEl.textContent = t; })
      .catch(() => { captionEl.textContent = ''; });
    index = (index + 1) % slides.length;
  };
  showSlide();
  setInterval(showSlide, 5000);
});
