<template>
  <div class="app" :class="{ 'menu-open': menuOpen }">
    <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress})` }"></div>
    <div class="cursor-badge" :class="{ active: cursor.active }" :style="cursorStyle">open</div>

    <header class="site-header">
      <a class="brand-mark magnetic" href="#top" aria-label="Detroit home">D</a>
      <nav class="desktop-nav">
        <a href="#talents">talents</a>
        <a href="#projects">projects</a>
        <a href="#services">services</a>
        <a href="#insights">insights</a>
        <a href="#contact">contact</a>
      </nav>
      <button class="menu-toggle magnetic" type="button" @click="menuOpen = true">menu</button>
    </header>

    <aside class="menu-panel" :aria-hidden="!menuOpen">
      <div class="menu-top">
        <a class="brand-mark" href="#top" @click="menuOpen = false">D</a>
        <button type="button" @click="menuOpen = false">close</button>
      </div>
      <nav>
        <a v-for="item in navItems" :key="item.href" :href="item.href" @click="menuOpen = false">
          {{ item.label }}
        </a>
      </nav>
      <div class="menu-footer">
        <a href="https://www.instagram.com/detroit.paris/" target="_blank" rel="noreferrer">instagram</a>
        <a href="https://www.linkedin.com/company/detroit-talents/" target="_blank" rel="noreferrer">linkedin</a>
      </div>
    </aside>

    <main id="top">
      <section class="hero-section">
        <ThreeHero />
        <div class="marquee">
          <span>AI production house in Paris</span>
          <span>Luxury campaigns</span>
          <span>3D, film, CGI, image systems</span>
          <span>AI production house in Paris</span>
        </div>
        <div class="hero-copy">
          <p class="hero-eyebrow">PRINT & FILM. AI. 3D. CGI.</p>
          <h1>
            <span>CRAFTING</span>
            <span>CULTURE</span>
          </h1>
          <p>Detroit shapes visual culture for luxury brands through AI production, cinematic art direction, and impossible digital worlds.</p>
        </div>
        <button class="scroll-cue magnetic" type="button" @click="scrollTo('#talents')">scroll</button>
      </section>

      <section id="talents" class="showcase-section reveal-block">
        <div class="section-header reveal-child">
          <h2>talents</h2>
          <div>
            <p>Image makers, directors, 3D artists, and cultural crafters.</p>
            <button class="magnetic" type="button" @click="shuffle('talents')">shuffle</button>
          </div>
        </div>
        <div class="kinetic-grid">
          <button
            v-for="(item, index) in talents"
            :key="`${item.name}-${index}`"
            class="media-card magnetic"
            type="button"
            :style="{ '--delay': index * 55 + 'ms' }"
            @click="openSpotlight(item, 'Talent')"
            @pointerenter="setCursor(true)"
            @pointerleave="setCursor(false)"
          >
            <span>{{ item.name }}</span>
            <img :src="item.image" :alt="item.name" />
          </button>
        </div>
      </section>

      <section id="services" class="services-section reveal-block">
        <p class="small-label">Detroit engine</p>
        <h2>services that move from idea to impossible image</h2>
        <div class="service-track">
          <article v-for="service in services" :key="service.title">
            <span>{{ service.number }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.copy }}</p>
          </article>
        </div>
      </section>

      <section id="projects" class="showcase-section reveal-block">
        <div class="section-header reveal-child">
          <h2>projects</h2>
          <div>
            <p>Campaign worlds built for motion, social gravity, and impossible production constraints.</p>
            <button class="magnetic" type="button" @click="shuffle('projects')">shuffle</button>
          </div>
        </div>
        <div class="horizontal-story">
          <button
            v-for="(item, index) in projects"
            :key="`${item.name}-${index}`"
            class="story-card"
            type="button"
            :style="{ '--z': index }"
            @click="openSpotlight(item, 'Project')"
            @pointerenter="setCursor(true)"
            @pointerleave="setCursor(false)"
          >
            <img :src="item.image" :alt="item.name" />
            <span>{{ item.name }}</span>
          </button>
        </div>
      </section>

      <section id="insights" class="insight-section reveal-block">
        <div>
          <p class="small-label">White paper analyzes</p>
          <h2>Generative AI to reduce the carbon footprint of visual production</h2>
        </div>
        <div class="insight-copy">
          <p>
            Developed with Lysi, Detroit compares traditional international shoots, local
            shoots, studio production, and AI-generated production.
          </p>
          <div class="action-row">
            <a class="magnetic" href="mailto:contact@detroit-talents.com?subject=Detroit%20white%20paper">version FR</a>
            <a class="magnetic" href="mailto:contact@detroit-talents.com?subject=Detroit%20white%20paper%20EN">version EN</a>
          </div>
        </div>
      </section>

      <section class="finale-section reveal-block" :style="{ '--finale-shift': `${finaleShift}px` }">
        <img src="/assets/noah.jpg" alt="Detroit visual atmosphere" />
        <div>
          <p class="small-label">join the culture</p>
          <h2>crafters</h2>
        </div>
      </section>
    </main>

    <footer id="contact" class="footer">
      <div>
        <p>© All right reserved. 2026 detroit</p>
        <a href="mailto:contact@detroit-talents.com">contact@detroit-talents.com</a>
        <a href="mailto:job@detroit-talents.com">job@detroit-talents.com</a>
      </div>
      <div>
        <a href="https://www.instagram.com/detroit.paris/" target="_blank" rel="noreferrer">instagram</a>
        <a href="https://www.linkedin.com/company/detroit-talents/" target="_blank" rel="noreferrer">linkedin</a>
        <a href="tel:+33674180268">+33 6 74 18 02 68</a>
      </div>
      <address>
        <span>paris</span>
        <a href="https://maps.app.goo.gl/" target="_blank" rel="noreferrer">49 rue du faubourg Saint martin, 75010 Paris</a>
        <span>marseille</span>
        <a href="https://maps.app.goo.gl/" target="_blank" rel="noreferrer">4 place Francis Chirat, 13002 Marseille</a>
      </address>
    </footer>

    <dialog ref="spotlightDialog" class="spotlight-dialog" @click.self="closeSpotlight">
      <button type="button" @click="closeSpotlight">close</button>
      <img :src="spotlight.item?.image" :alt="spotlight.item?.name" />
      <div>
        <p class="small-label">{{ spotlight.type }} spotlight</p>
        <h2>{{ spotlight.item?.name }}</h2>
        <p>{{ spotlight.item?.copy }}</p>
        <a class="magnetic" href="mailto:contact@detroit-talents.com?subject=Detroit%20Paris%20brief">start a brief</a>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import ThreeHero from "./components/ThreeHero.vue";

const asset = (name) => `/assets/${name}`;
const navItems = [
  { href: "#talents", label: "talents" },
  { href: "#projects", label: "projects" },
  { href: "#services", label: "services" },
  { href: "#insights", label: "insights" },
  { href: "#contact", label: "contact" },
];

const baseTalents = [
  ["Ulises", "ojai.webp", "Floating bodies, impossible light, and a bright editorial sense for AI-led stills."],
  ["Squad", "marly.webp", "Surreal product worlds shaped for luxury houses, gardens, fragrance, and spatial stories."],
  ["Alex", "google.webp", "Minimal silhouettes and sculptural compositions with a sharp digital production finish."],
  ["Alys Thomas", "lamer.webp", "Liquid textures, skincare surfaces, and macro imagery built for premium beauty campaigns."],
  ["Charlie Faye Mather", "alice.webp", "Dreamlike cinematic tableaux with saturated sets and polished campaign rhythm."],
  ["Noah Pharrel", "noah.jpg", "Human close-ups and expressive faces tuned for culture-first brand storytelling."],
].map(([name, image, copy]) => ({ name, image: asset(image), copy }));

const baseProjects = [
  ["Dom Perignon Winter", "noah.jpg", "A cinematic brand mood exploring luxury ritual through AI-produced scenes."],
  ["Marly garden", "marly.webp", "A fragrance garden rendered as a polished, impossible product environment."],
  ["La Mer", "lamer.webp", "Macro beauty and oceanic materiality translated into premium visual assets."],
  ["Taittinger", "ojai.webp", "Champagne imagery with movement, sunlight, and a surreal celebratory language."],
  ["Hermes", "alice.webp", "Tactile surfaces and restrained detail for a house defined by material precision."],
  ["GOOGLE", "google.webp", "Minimal graphic scenes and clear visual metaphors for a global technology brief."],
].map(([name, image, copy]) => ({ name, image: asset(image), copy }));

const services = [
  { number: "01", title: "AI production", copy: "Generative visual systems for campaigns, lookbooks, social films, and brand worlds." },
  { number: "02", title: "Print & film", copy: "Concept, art direction, production, post, and delivery for luxury-led image making." },
  { number: "03", title: "3D & CGI", copy: "Product visualization, animated assets, spatial stories, and impossible sets." },
];

const talents = ref([...baseTalents]);
const projects = ref([...baseProjects]);
const menuOpen = ref(false);
const scrollProgress = ref(0);
const finaleShift = ref(0);
const spotlightDialog = ref(null);
const spotlight = reactive({ item: null, type: "" });
const cursor = reactive({ active: false, x: 0, y: 0 });
const cursorStyle = computed(() => ({ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }));

const setCursor = (active) => {
  cursor.active = active;
};

const scrollTo = (selector) => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });

const shuffle = (type) => {
  const source = type === "talents" ? talents : projects;
  source.value = [...source.value].sort(() => Math.random() - 0.5);
  nextTick(() => revealVisible());
};

const openSpotlight = (item, type) => {
  spotlight.item = item;
  spotlight.type = type;
  spotlightDialog.value.showModal();
  document.body.classList.add("modal-lock");
};

const closeSpotlight = () => {
  spotlightDialog.value.close();
  document.body.classList.remove("modal-lock");
};

const updateScroll = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  const finale = document.querySelector(".finale-section");
  if (finale) {
    const rect = finale.getBoundingClientRect();
    finaleShift.value = ((window.innerHeight - rect.top) / (window.innerHeight + rect.height) - 0.5) * 80;
  }
};

const updatePointer = (event) => {
  cursor.x = event.clientX - 38;
  cursor.y = event.clientY - 38;
};

let observer;
const revealVisible = () => {
  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
  );
  document.querySelectorAll(".reveal-block, .reveal-child, .media-card, .story-card").forEach((element) => observer.observe(element));
};

const moveMagnet = (event) => {
  const target = event.target.closest(".magnetic");
  if (!target) return;
  const rect = target.getBoundingClientRect();
  target.style.setProperty("--mx", `${(event.clientX - rect.left - rect.width / 2) * 0.16}px`);
  target.style.setProperty("--my", `${(event.clientY - rect.top - rect.height / 2) * 0.16}px`);
};

const clearMagnet = (event) => {
  const target = event.target.closest(".magnetic");
  if (!target) return;
  target.style.setProperty("--mx", "0px");
  target.style.setProperty("--my", "0px");
};

onMounted(() => {
  revealVisible();
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("pointermove", updatePointer, { passive: true });
  document.addEventListener("pointermove", moveMagnet, { passive: true });
  document.addEventListener("pointerleave", clearMagnet, true);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  window.removeEventListener("scroll", updateScroll);
  window.removeEventListener("pointermove", updatePointer);
  document.removeEventListener("pointermove", moveMagnet);
  document.removeEventListener("pointerleave", clearMagnet, true);
});
</script>
