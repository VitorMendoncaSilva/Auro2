document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelector('.slides');

  /* ======================
     CONFIG
     ====================== */
  const speed = 0.5;        // velocidade do auto-scroll
  const resumeDelay = 2000; // 2 segundos para voltar

  /* ======================
     ESTADO
     ====================== */
  let position = 0;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;
  let lastInteraction = Date.now();

  /* ======================
     AUTO SCROLL (LOOP)
     ====================== */
  function autoScroll() {
    const maxScroll = slides.scrollWidth - slides.clientWidth;
    const now = Date.now();

    // só anda se não estiver arrastando
    // e se já passou o tempo de espera
    if (!isDragging && now - lastInteraction > resumeDelay) {
      position += speed;

      if (position >= maxScroll) {
        position = 0;
      }

      slides.scrollLeft = position;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  /* ======================
     POINTER EVENTS
     (mouse + touch)
     ====================== */
  slides.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    scrollStart = slides.scrollLeft;
    lastInteraction = Date.now();

    slides.setPointerCapture(e.pointerId);
    slides.style.cursor = 'grabbing';
  });

  slides.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const move = e.clientX - startX;
    slides.scrollLeft = scrollStart - move;
    position = slides.scrollLeft; // mantém sincronizado
  });

  function stopDragging() {
    isDragging = false;
    lastInteraction = Date.now();
    slides.style.cursor = 'grab';
  }

  slides.addEventListener('pointerup', stopDragging);
  slides.addEventListener('pointercancel', stopDragging);
  slides.addEventListener('pointerleave', stopDragging);

  /* ======================
     PREVENIR DRAG DA IMG
     ====================== */
  slides.querySelectorAll('img').forEach(img => {
    img.draggable = false;
  });
});
