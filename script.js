const root = document.documentElement;
const heroShell = document.querySelector(".hero-shell");
const revealPanels = document.querySelectorAll(".reveal-panel");
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

function updateHeroMotion() {
  if (!heroShell || reducedMotion.matches) {
    root.style.setProperty("--hero-progress", "0");
    root.style.setProperty("--hero-progress-smooth", "0");
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
    revealPanels.forEach((panel) => panel.classList.add("is-visible"));
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
