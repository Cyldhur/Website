// Carrousel 5 vidéos visibles avec fade sur les côtés
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const items = Array.from(track.querySelectorAll('.carousel-item'));
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  
  if (items.length === 0) return;

  let current = 2; // Commencer au 3e élément (index 2)

  function updateCarousel() {
    items.forEach((item, i) => {
      // Retirer toutes les classes
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

    // Calculer les indices avec boucle circulaire
    const total = items.length;
    const farLeft = (current - 2 + total) % total;
    const prevCenter = (current - 1 + total) % total;
    const active = current % total;
    const nextCenter = (current + 1) % total;
    const farRight = (current + 2) % total;

    // Appliquer les classes et styles
    if (items[farLeft]) {
      items[farLeft].classList.add('far-left');
      items[farLeft].style.transform = 'translateX(calc(-50% - 600px)) scale(0.9)';
      items[farLeft].style.opacity = '0.4';
      items[farLeft].style.zIndex = '1';
    }
    
    if (items[prevCenter]) {
      items[prevCenter].classList.add('prev-center');
      items[prevCenter].style.transform = 'translateX(calc(-50% - 300px)) scale(1)';
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
      items[nextCenter].style.transform = 'translateX(calc(-50% + 300px)) scale(1)';
      items[nextCenter].style.opacity = '1';
      items[nextCenter].style.zIndex = '3';
      items[nextCenter].style.pointerEvents = 'auto';
    }
    
    if (items[farRight]) {
      items[farRight].classList.add('far-right');
      items[farRight].style.transform = 'translateX(calc(-50% + 600px)) scale(0.9)';
      items[farRight].style.opacity = '0.4';
      items[farRight].style.zIndex = '1';
    }
  }

  // Gestion des boutons
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

  // Navigation au clavier (optionnel)
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

// Restaurer le scroll du body
document.body.style.overflow = '';
