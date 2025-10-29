// Carrousel 3 vidéos au premier plan + animation fluide
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const items = Array.from(track.querySelectorAll('.carousel-item'));
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  if (items.length === 0) return;

  // Largeur item détectée dynamiquement (fixée pour uniformité)
  const itemWidth = 270; // aligné avec le CSS

  let current = 1; // Commencer avec le 2e élément au centre

  function updateCarousel() {
    items.forEach((item, i) => {
      item.classList.remove('prev', 'active', 'next');
      item.style.transition = 'all .5s cubic-bezier(.33,1.44,.81,1)';
      item.style.position = 'absolute';
      item.style.left = '50%';
      item.style.top = '0';

      // Reset styles "fade"
      item.style.opacity = '0';
      item.style.zIndex = '0';
      item.style.pointerEvents = 'none';
      item.style.filter = 'none';
      
      if (i === current) {
        item.classList.add('active');
        item.style.transform = 'scale(1.12) translateX(-50%)';
        item.style.opacity = '1';
        item.style.zIndex = '3';
        item.style.pointerEvents = 'auto';
      } else if (i === (current - 1 + items.length) % items.length) {
        item.classList.add('prev');
        item.style.transform = 'scale(1) translateX(calc(-50% - 290px))';
        item.style.opacity = '0.7';
        item.style.zIndex = '2';
        item.style.pointerEvents = 'auto';
        item.style.filter = 'blur(2px)';
      } else if (i === (current + 1) % items.length) {
        item.classList.add('next');
        item.style.transform = 'scale(1) translateX(calc(-50% + 290px))';
        item.style.opacity = '0.7';
        item.style.zIndex = '2';
        item.style.pointerEvents = 'auto';
        item.style.filter = 'blur(2px)';
      } else {
        // Les autres restent cachées
        item.style.transform = 'scale(0.85) translateX(-50%)';
      }
    });
  }

  function showPrev() {
    current = (current - 1 + items.length) % items.length;
    updateCarousel();
  }

  function showNext() {
    current = (current + 1) % items.length;
    updateCarousel();
  }

  // Ajoute les écouteurs d'événements aux flèches
  if (prevBtn) prevBtn.onclick = showPrev;
  if (nextBtn) nextBtn.onclick = showNext;

  updateCarousel();
});

// ---- Zoom modale vidéo ----
document.querySelectorAll('.zoom-trigger').forEach(trigger => {
  trigger.onclick = function(e) {
    const item = trigger.closest('.carousel-item');
    let iframe = item.querySelector('.carousel-video iframe');
    let title = item.querySelector('h3') ? item.querySelector('h3').textContent : '';
    if (!iframe) return;
    let url = new URL(iframe.src, window.location.origin);
    url.searchParams.set('autoplay', '1');
    let zoomModal = document.getElementById('zoom-modal');
    let container = zoomModal.querySelector('.zoom-modal-video');
    let titleEl = zoomModal.querySelector('.zoom-modal-title');
    container.innerHTML = '';
    let newIframe = document.createElement('iframe');
    newIframe.src = url.toString();
    newIframe.setAttribute('allowfullscreen','');
    newIframe.setAttribute('allow','autoplay; fullscreen; picture-in-picture');
    newIframe.allow = "autoplay; fullscreen; picture-in-picture";
    newIframe.width = '100%';
    newIframe.height = '100%';
    container.appendChild(newIframe);
    if (titleEl) titleEl.textContent = title;
    zoomModal.classList.add('open');
    document.body.style.overflow='hidden';
  }
});
document.getElementById('zoom-modal').querySelector('.zoom-modal-close').onclick = function() {
  document.getElementById('zoom-modal').classList.remove('open');
  document.body.style.overflow='';
};
