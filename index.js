
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
    menu.classList.toggle("flex-col"); // makes vertical on mobile
    menu.classList.toggle("absolute");
    menu.classList.toggle("top-16");
    menu.classList.toggle("left-0");
    menu.classList.toggle("bg-black/90");
    menu.classList.toggle("w-full");
    menu.classList.toggle("p-4");
    menu.classList.toggle("space-y-4");
  });
});




function handleScroll() {
      const navbar = document.getElementById('navbar');
      const links = document.querySelectorAll('.nav-link');
      const sections = document.querySelectorAll('section');

      if (window.scrollY > 100) {
        navbar.classList.remove('bg-transparent', 'text-white');
        navbar.classList.add('bg-black/40', 'text-accent', 'backdrop-blur-lg');
      } else {
        navbar.classList.add('bg-transparent', 'text-white');
        navbar.classList.remove('bg-black/40', 'text-accent');
      }

      let currentSection = '';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentSection = section.getAttribute('id');
        }
      });

      links.forEach((link) => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.remove('active-link');
        if (href === currentSection) {
          link.classList.add('active-link');
        }
      });

      document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', handleScroll);

    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function updateCarousel() {
      slides.forEach((s, i) => {
        s.classList.toggle('opacity-100', i === currentIndex);
        s.classList.toggle('opacity-0', i !== currentIndex);
      });
    }

    function nextSlide() { currentIndex = (currentIndex + 1) % totalSlides; updateCarousel(); }
    function prevSlide() { currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; updateCarousel(); }

    function startCarousel() {
      slides[0].classList.add('opacity-100');
      setInterval(nextSlide, 5000);
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    });

    document.getElementById('menu-toggle').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    });

  function scrollRow(rowId, direction) {
    const row = document.getElementById(rowId);
    const cardWidth = row.querySelector('.gallery-item').offsetWidth + 24; // 24px = gap
    const visibleCards = Math.floor(row.offsetWidth / cardWidth);
    const scrollAmount = cardWidth * visibleCards; // scroll by visible width

    row.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  }

 const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when scrolling down
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollTopBtn.classList.remove("hidden");
  } else {
    scrollTopBtn.classList.add("hidden");
  }
});

// Scroll-to-top with acceleration (ease-in)
scrollTopBtn.addEventListener("click", () => {
  const start = window.scrollY;
  const duration = 700; // total scroll duration in ms
  let startTime = null;

  function easeIn(t) {
    return t * t; // quadratic ease-in
  }

  function scrollStep(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 to 1
    const easeProgress = easeIn(progress);

    window.scrollTo(0, start * (1 - easeProgress));

    if (elapsed < duration) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
});


      // Intersection Observer to animate PNG when section enters viewport
  const contactSection = document.getElementById('contact');
  const contactBg = document.querySelector('#contact-bg img');

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          contactBg.classList.add('animate-slide-in', 'opacity-20');
          observer.unobserve(entry.target); // animate only once
        }
      });
    }, 
    { threshold: 0.3 } // triggers when 30% of section is visible
  );

  observer.observe(contactSection);

  function openForm(course) {
    document.getElementById("courseName").value = course;
    document.getElementById("enquiryModal").classList.remove("hidden");
    document.getElementById("enquiryModal").classList.add("flex");
  }

  function closeForm() {
    document.getElementById("enquiryModal").classList.add("hidden");
    document.getElementById("enquiryModal").classList.remove("flex");
  }

  function sendWhatsApp() {
    let course = document.getElementById("courseName").value;
    let name = document.getElementById("name").value;
    let message = document.getElementById("message").value;

    let whatsappURL =
      "https://wa.me/919342258568?text=" +
      encodeURIComponent(
        "Course: " + course + "\n" +
        "Name: " + name + "\n" +
        "Message: " + message
      );

    window.open(whatsappURL, "_blank");
  }