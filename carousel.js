// Carrousel 3 vidéos au premier plan + animation fluide
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const items = Array.from(track.querySelectorAll('.carousel-item'));
  if (items.length === 0) return;

  let current = 1; // Commencer avec le 2e élément au centre

  function updateCarousel() {
    items.forEach((item, i) => {
      item.classList.remove('prev', 'active', 'next');
      item.style.transition = 'all .5s cubic-bezier(.33,1.44,.81,1)';
      if (i === (current - 1 + items.length) % items.length) {
        item.classList.add('prev');
        item.style.transform = 'translateX(-290px) scale(1)';
        item.style.opacity = '1';
        item.style.pointerEvents = 'auto';
        item.style.position = 'relative';
        item.style.zIndex = '1';
      } else if (i === current) {
        item.classList.add('active');
        item.style.transform = 'translateX(0) scale(1.12)';
        item.style.opacity = '1';
        item.style.pointerEvents = 'auto';
        item.style.position = 'relative';
        item.style.zIndex = '2';
      } else if (i === (current + 1) % items.length) {
        item.classList.add('next');
        item.style.transform = 'translateX(290px) scale(1)';
        item.style.opacity = '1';
        item.style.pointerEvents = 'auto';
        item.style.position = 'relative';
        item.style.zIndex = '1';
      } else {
        item.style.transform = 'scale(0.85) translateX(0)';
        item.style.opacity = '0';
        item.style.pointerEvents = 'none';
        item.style.position = 'absolute';
        item.style.left = '0';
        item.style.right = '0';
        item.style.top = '0';
        item.style.bottom = '0';
        item.style.zIndex = '0';
      }
    });
  }
  updateCarousel();

  carousel.querySelector('.prev').onclick = () => {
    current = (current - 1 + items.length) % items.length;
    updateCarousel();
  };
  carousel.querySelector('.next').onclick = () => {
    current = (current + 1) % items.length;
    updateCarousel();
  };
});

// Zoom modal vidéo – clique sur .zoom-trigger
document.querySelectorAll('.zoom-trigger').forEach(trigger => {
  trigger.onclick = function(e) {
    const item = trigger.closest('.carousel-item');
    let iframe = item.querySelector('.carousel-video iframe');
    let title = item.querySelector('h3') ? item.querySelector('h3').textContent : '';
    if (!iframe) return;
    // Ajoute autoplay=1 à l'URL
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
    newIframe.style.borderRadius = '12px';
    container.appendChild(newIframe);
    titleEl.textContent = title;
    zoomModal.style.display = 'flex';
    document.body.style.overflow='hidden';
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
});

// Fermer la modale (overlay/croix)
document.querySelectorAll('.zoom-modal-close, .zoom-modal-overlay').forEach(el => {
  el.onclick = function() {
    let zoomModal = document.getElementById('zoom-modal');
    zoomModal.style.display = 'none';
    zoomModal.querySelector('.zoom-modal-video').innerHTML = '';
    document.body.style.overflow='';
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    let zoomModal = document.getElementById('zoom-modal');
    zoomModal.style.display = 'none';
    zoomModal.querySelector('.zoom-modal-video').innerHTML = '';
    document.body.style.overflow='';
  }
});
