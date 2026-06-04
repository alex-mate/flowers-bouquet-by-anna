const languageToggle = document.getElementById("languageToggle");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

let currentLanguage = "en";

year.textContent = new Date().getFullYear();

const updateLanguage = () => {
  const translatableElements = document.querySelectorAll("[data-en][data-ro]");

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[currentLanguage];
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

updateLanguage();