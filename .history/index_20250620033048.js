
  // Carrousel par produit
document.querySelectorAll(".carousel").forEach(carousel => {
  const images = carousel.querySelectorAll("img");
  let index = 0;

  const showImage = (i) => {
    images.forEach(img => img.classList.remove("active"));
    images[i].classList.add("active");
  };

  carousel.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % images.length;
    showImage(index);
  });

  carousel.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  showImage(index);
});

// Lightbox Zoom avec navigation
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const nextBtn = document.querySelector(".lightbox .next");
const prevBtn = document.querySelector(".lightbox .prev");

let currentImages = [];
let currentIndex = 0;

// Click sur image pour ouvrir la lightbox
document.querySelectorAll(".carousel img").forEach((img) => {
  img.addEventListener("click", (e) => {
    const carousel = e.target.closest(".carousel");
    currentImages = Array.from(carousel.querySelectorAll("img"));
    currentIndex = currentImages.indexOf(e.target);
    openLightbox(currentImages[currentIndex].src);
  });
});

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add("show");
}

function closeLightbox() {
  lightbox.classList.remove("show");
}

function showNext() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

function showPrev() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex].src;
}

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// Navigation clavier
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("show")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});



// Swipe mobile pour lightbox
let startX = 0;
let endX = 0;

lightbox.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const deltaX = endX - startX;

  // Seuil pour détecter un vrai glissement
  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0) {
      showNext();  // Glissement vers la gauche → suivant
    } else {
      showPrev();  // Glissement vers la droite → précédent
    }
  }
}


// Menu burger
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle?.addEventListener('click', () => {
  menu?.classList.toggle('open');
});

// FAQ accordéon
document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    document.querySelectorAll(".faq-answer").forEach(a => {
      if (a !== answer) a.style.maxHeight = null;
    });
    answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
  });
});




function animateSlide(direction) {
  lightboxImg.style.opacity = "0";
  lightboxImg.style.transform = `translateX(${direction === 'next' ? '100%' : '-100%'})`;

  setTimeout(() => {
    lightboxImg.src = currentImages[currentIndex].src;
    lightboxImg.style.transform = `translateX(0)`;
    lightboxImg.style.opacity = "1";
  }, 200);
}

function showNext() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  animateSlide('next');
}

function showPrev() {
  if (currentImages.length === 0) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  animateSlide('prev');
}
