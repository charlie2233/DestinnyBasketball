const heroShell = document.querySelector(".hero-shell");

function updateReveal() {
  if (!heroShell) {
    return;
  }

  const scrollable = heroShell.offsetHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(Math.max(-heroShell.getBoundingClientRect().top / scrollable, 0), 1) : 0;

  document.documentElement.style.setProperty("--reveal", progress.toFixed(4));
}

window.addEventListener("scroll", updateReveal, { passive: true });
window.addEventListener("resize", updateReveal);
window.addEventListener("load", updateReveal);

updateReveal();
