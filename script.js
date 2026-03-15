const root = document.documentElement;
const heroShell = document.querySelector(".hero-shell");
const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const trackedSections = Array.from(
  document.querySelectorAll(
    "#home, #about, #players, #purpose, #pillars, #faq, #contact, #instagram"
  )
);
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let ticking = false;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeInOutCubic(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function getRevealPanels() {
  return document.querySelectorAll(".reveal-panel");
}

function updateActiveNav() {
  if (!navLinks.length || !trackedSections.length) {
    return;
  }

  const navOffset = parseFloat(
    getComputedStyle(root).getPropertyValue("--nav-offset")
  );
  const anchorLine = Math.max(window.innerHeight * 0.26, navOffset || 0);
  let currentId = trackedSections[0].id;

  trackedSections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= anchorLine) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

function updateHeroMotion() {
  if (!heroShell || reducedMotion.matches) {
    root.style.setProperty("--hero-progress", "0");
    root.style.setProperty("--hero-progress-smooth", "0");
    updateActiveNav();
    ticking = false;
    return;
  }

  const scrollable = heroShell.offsetHeight - window.innerHeight;
  const progress =
    scrollable > 0
      ? clamp(-heroShell.getBoundingClientRect().top / scrollable, 0, 1)
      : 0;
  const eased = easeInOutCubic(progress);

  root.style.setProperty("--hero-progress", progress.toFixed(4));
  root.style.setProperty("--hero-progress-smooth", eased.toFixed(4));
  updateActiveNav();
  ticking = false;
}

function requestHeroMotion() {
  if (ticking) {
    return;
  }

  ticking = true;
  window.requestAnimationFrame(updateHeroMotion);
}

function updatePointerGlow(event) {
  if (reducedMotion.matches) {
    return;
  }

  const x = clamp(event.clientX / window.innerWidth, 0, 1);
  const y = clamp(event.clientY / window.innerHeight, 0, 1);

  root.style.setProperty("--pointer-x", x.toFixed(4));
  root.style.setProperty("--pointer-y", y.toFixed(4));
}

function setupRevealPanels() {
  const revealPanels = getRevealPanels();

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealPanels.forEach((panel) => panel.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.22,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealPanels.forEach((panel, index) => {
    panel.style.setProperty("--stagger", String(index % 4));
    observer.observe(panel);
  });
}

function handleReducedMotionChange() {
  if (reducedMotion.matches) {
    getRevealPanels().forEach((panel) => panel.classList.add("is-visible"));
  }

  requestHeroMotion();
}

window.addEventListener("scroll", requestHeroMotion, { passive: true });
window.addEventListener("resize", requestHeroMotion);
window.addEventListener("pointermove", updatePointerGlow, { passive: true });
window.addEventListener("load", requestHeroMotion);

if (typeof reducedMotion.addEventListener === "function") {
  reducedMotion.addEventListener("change", handleReducedMotionChange);
} else if (typeof reducedMotion.addListener === "function") {
  reducedMotion.addListener(handleReducedMotionChange);
}

setupRevealPanels();
requestHeroMotion();
