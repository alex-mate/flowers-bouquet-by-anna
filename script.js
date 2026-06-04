const languageToggle = document.getElementById("languageToggle");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const galleryImages = Array.from(document.querySelectorAll(".gallery-grid img"));
const galleryLightbox = document.getElementById("galleryLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentLanguage = "en";
let currentGalleryIndex = 0;

year.textContent = new Date().getFullYear();

const updateLanguage = () => {
  const translatableElements = document.querySelectorAll("[data-en][data-ro]");
  const ariaLabelElements = document.querySelectorAll("[data-aria-en][data-aria-ro]");

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[currentLanguage];
  });

  ariaLabelElements.forEach((element) => {
    element.setAttribute(
      "aria-label",
      currentLanguage === "en" ? element.dataset.ariaEn : element.dataset.ariaRo
    );
  });

  document.documentElement.lang = currentLanguage;
  languageToggle.textContent = currentLanguage === "en" ? "RO" : "EN";
};

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "en" ? "ro" : "en";
  updateLanguage();
});

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("active");
  }
});

const updateLightboxImage = () => {
  const activeImage = galleryImages[currentGalleryIndex];

  lightboxImage.src = activeImage.src;
  lightboxImage.alt = activeImage.alt;
  lightboxCaption.textContent = activeImage.alt;
};

const openLightbox = (index) => {
  currentGalleryIndex = index;
  updateLightboxImage();
  galleryLightbox.classList.add("active");
  galleryLightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
};

const closeLightbox = () => {
  galleryLightbox.classList.remove("active");
  galleryLightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
};

const stepLightbox = (direction) => {
  currentGalleryIndex =
    (currentGalleryIndex + direction + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
};

galleryImages.forEach((image, index) => {
  image.tabIndex = 0;
  image.setAttribute("role", "button");
  image.setAttribute("aria-label", `${image.alt}. Open larger image`);

  image.addEventListener("click", () => {
    openLightbox(index);
  });

  image.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", () => stepLightbox(-1));
lightboxNext.addEventListener("click", () => stepLightbox(1));

galleryLightbox.addEventListener("click", (event) => {
  if (event.target === galleryLightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!galleryLightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    stepLightbox(-1);
  }

  if (event.key === "ArrowRight") {
    stepLightbox(1);
  }
});

updateLanguage();
