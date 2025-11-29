const items = document.querySelectorAll('.masonry-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const counter = document.getElementById('counter');
    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = items[index].src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCounter();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { lightboxImg.src = ''; }, 500);
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % items.length;
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = items[currentIndex].src;
            lightboxImg.style.opacity = 1;
            updateCounter();
        }, 300);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        lightboxImg.style.opacity = 0;
        setTimeout(() => {
            lightboxImg.src = items[currentIndex].src;
            lightboxImg.style.opacity = 1;
            updateCounter();
        }, 300);
    }

    function updateCounter() {
        counter.textContent = `${currentIndex + 1} / ${items.length}`;
    }

    // Click to open
    items.forEach((img, i) => {
        img.style.cursor = 'zoom-in';
        img.onclick = () => openLightbox(i);
    });

    // Navigation
    nextBtn.onclick = showNext;
    prevBtn.onclick = showPrev;
    closeBtn.onclick = closeLightbox;

    // Click outside image
    lightbox.onclick = (e) => {
        if (e.target === lightbox || e.target === lightboxImg) {
            closeLightbox();
        }
    };

    // Keyboard
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') closeLightbox();
    });

    // Touch swipe
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? showNext() : showPrev();
        }
    });