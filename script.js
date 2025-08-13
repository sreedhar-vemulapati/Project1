// Mobile menu toggle (simple)
const menuToggle = document.getElementById('menuToggle');
menuToggle && menuToggle.addEventListener('click', () => {
  // simple mobile menu behavior: toggle nav links
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(a => {
    if (a.style.display === 'inline-block') a.style.display = '';
    else a.style.display = 'inline-block';
  });
});

// Stats counting animation when visible
const counters = document.querySelectorAll('.stat-num');
const speed = 200; // lower = faster

function animateCounter(el, target) {
  let current = 0;
  const increment = Math.ceil(target / speed);
  function step(){
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
    } else {
      el.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

// Use IntersectionObserver to start when visible
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const t = parseInt(el.getAttribute('data-target'), 10) || 0;
        animateCounter(el, t);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => obs.observe(c));
} else {
  // fallback
  counters.forEach(c => animateCounter(c, parseInt(c.getAttribute('data-target'), 10)));
}