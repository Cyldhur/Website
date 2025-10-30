// Carrousel 5 vidéos visibles avec fade sur les côtés
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const items = Array.from(track.querySelectorAll('.carousel-item'));
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  const isVertical = carousel.classList.contains('carousel-vertical');
  if (items.length === 0) return;

  let current = 2; // Commencer au 3e élément (index 2)

  function updateCarousel() {
    // Légèrement plus d’espace : gap = 200px pour shorts au lieu de 180
    const gap = isVertical ? 200 : 300; // espace horizontal entre les shorts
    const fadeGap = isVertical ? 400 : 600; // décale encore un peu plus les côtés
    items.forEach((item, i) => {
      item.classList.remove('far-left', 'prev-center', 'active', 'next-center', 'far-right');
      item.style.transition = 'all 0.5s cubic-bezier(.33,1.44,.81,1)';
      item.style.position = 'absolute';
      item.style.left = '50%';
      item.style.top = '0';
      item.style.opacity = '0';
      item.style.zIndex = '0';
      item.style.pointerEvents = 'none';
      item.style.transform = 'translateX(-50%) scale(0.85)';
    });

    const total = items.length;
    const farLeft = (current - 2 + total) % total;
    const prevCenter = (current - 1 + total) % total;
    const active = current % total;
    const nextCenter = (current + 1) % total;
    const farRight = (current + 2) % total;

    if (items[farLeft]) {
      items[farLeft].classList.add('far-left');
      items[farLeft].style.transform = `translateX(calc(-50% - ${fadeGap}px)) scale(0.9)`;
      items[farLeft].style.opacity = '0.4';
      items[farLeft].style.zIndex = '1';
    }
    if (items[prevCenter]) {
      items[prevCenter].classList.add('prev-center');
      items[prevCenter].style.transform = `translateX(calc(-50% - ${gap}px)) scale(1)`;
      items[prevCenter].style.opacity = '1';
      items[prevCenter].style.zIndex = '3';
      items[prevCenter].style.pointerEvents = 'auto';
    }
    if (items[active]) {
      items[active].classList.add('active');
      items[active].style.transform = 'translateX(-50%) scale(1)';
      items[active].style.opacity = '1';
      items[active].style.zIndex = '3';
      items[active].style.pointerEvents = 'auto';
    }
    if (items[nextCenter]) {
      items[nextCenter].classList.add('next-center');
      items[nextCenter].style.transform = `translateX(calc(-50% + ${gap}px)) scale(1)`;
      items[nextCenter].style.opacity = '1';
      items[nextCenter].style.zIndex = '3';
      items[nextCenter].style.pointerEvents = 'auto';
    }
    if (items[farRight]) {
      items[farRight].classList.add('far-right');
      items[farRight].style.transform = `translateX(calc(-50% + ${fadeGap}px)) scale(0.9)`;
      items[farRight].style.opacity = '0.4';
      items[farRight].style.zIndex = '1';
    }
  }

  // ... (reste inchangé)
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      current = (current - 1 + items.length) % items.length;
      updateCarousel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      current = (current + 1) % items.length;
      updateCarousel();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      current = (current - 1 + items.length) % items.length;
      updateCarousel();
    } else if (e.key === 'ArrowRight') {
      current = (current + 1) % items.length;
      updateCarousel();
    }
  });

  updateCarousel();
});

// --- ZOOM MODAL --- (reste inchangé)
function openZoomModal(ytid, title, isVertical) {
  const zoomModal = document.getElementById('zoom-modal');
  const zoomVideo = zoomModal.querySelector('.zoom-modal-video');
  const zoomTitle = zoomModal.querySelector('.zoom-modal-title');
  zoomVideo.innerHTML = `<iframe 
      src="https://www.youtube.com/embed/${ytid}?autoplay=1"
      allowfullscreen
      allow="autoplay; fullscreen; picture-in-picture"
      style="aspect-ratio: ${isVertical ? '9/16' : '16/9'}"></iframe>`;
  zoomTitle.textContent = title || '';
  zoomModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeZoomModal() {
  const zoomModal = document.getElementById('zoom-modal');
  zoomModal.classList.remove('active');
  setTimeout(() => {
    const zoomVideo = zoomModal.querySelector('.zoom-modal-video');
    if (zoomVideo) zoomVideo.innerHTML = '';
    document.body.style.overflow = '';
  }, 220);
}
document.querySelectorAll('.zoom-modal-close, .zoom-modal-overlay').forEach(btn =>
  btn.addEventListener('click', closeZoomModal)
);
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeZoomModal();
});
document.querySelectorAll('.zoomable-video').forEach(el => {
  el.addEventListener('click', function (e) {
    if (e.target.classList.contains('zoom-overlay') || e.target === this) {
      const ytid = this.getAttribute('data-ytid');
      const title = this.getAttribute('data-title') || '';
      const isVertical = this.closest('.carousel-vertical') !== null;
      openZoomModal(ytid, title, isVertical);
    }
  });
  el.setAttribute('tabindex', 0);
  el.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const ytid = this.getAttribute('data-ytid');
      const title = this.getAttribute('data-title') || '';
      const isVertical = this.closest('.carousel-vertical') !== null;
      openZoomModal(ytid, title, isVertical);
    }
  });
});
document.body.style.overflow = '';
