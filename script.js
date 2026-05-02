const talents = [
  ["Ulises", "assets/ojai.webp", "/talents/ulises"],
  ["Squad", "assets/marly.webp", "/talents/squad"],
  ["Alex", "assets/google.webp", "/talents/alex"],
  ["Alys Thomas", "assets/lamer.webp", "/talents/alys-thomas"],
  ["Charlie Faye Mather", "assets/alice.webp", "/talents/charlie-faye-mather"],
  ["Arnaud", "assets/marly.webp", "/talents/arnaud"],
  ["Chelios", "assets/lamer.webp", "/talents/chelios"],
  ["Floow", "assets/alice.webp", "/talents/floow"],
  ["Laura Baiardini", "assets/google.webp", "/talents/laura-baiardini"],
  ["Leo Cannone", "assets/ojai.webp", "/talents/leo-cannone"],
  ["Noah Pharrel", "assets/noah.jpg", "/talents/noah-pharrel"],
  ["Ojaï", "assets/ojai.webp", "/talents/ojai"],
  ["Pierrick Jegou", "assets/lamer.webp", "/talents/pierrick-jegou"],
  ["Sard", "assets/google.webp", "/talents/sard"],
];

const projects = [
  ["SumUp", "assets/alice.webp", "/projects/sumup"],
  ["Dom Perignon Winter", "assets/noah.jpg", "/projects/dom-perignon-winter"],
  ["Taittinger II", "assets/ojai.webp", "/projects/taittinger-ii"],
  ["Taittinger I", "assets/alice.webp", "/projects/taittinger-i"],
  ["Paris berlin", "assets/google.webp", "/projects/paris-berlin"],
  ["Marly garden", "assets/marly.webp", "/projects/marly-garden"],
  ["La Mer", "assets/lamer.webp", "/projects/lamer"],
  ["Louis Vuitton Grasse", "assets/marly.webp", "/projects/louis-vuitton-grasse"],
  ["Louis Vuitton Asnieres", "assets/lamer.webp", "/projects/louis-vuitton-asnieres"],
  ["GOOGLE", "assets/google.webp", "/projects/google10"],
  ["Dom Perignon Summer", "assets/marly.webp", "/projects/dom-perignon-summer"],
  ["Hermes", "assets/lamer.webp", "/projects/hermes"],
];

const renderCards = (selector, items) => {
  const root = document.querySelector(selector);
  root.innerHTML = items
    .map(
      ([name, image, href]) => `
        <article class="media-card">
          <div class="media-label">${name}</div>
          <a href="${href}" aria-label="${name}">
            <img src="${image}" alt="${name}" decoding="async">
          </a>
        </article>
      `,
    )
    .join("");
};

renderCards('[data-render="talents"]', talents);
renderCards('[data-render="projects"]', projects);

const panel = document.querySelector(".menu-panel");
const openButton = document.querySelector(".menu-button");
const closeButton = document.querySelector(".menu-close");

const setMenu = (open) => {
  panel.classList.toggle("is-open", open);
  panel.setAttribute("aria-hidden", String(!open));
  openButton.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
};

openButton.addEventListener("click", () => setMenu(true));
closeButton.addEventListener("click", () => setMenu(false));
panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
