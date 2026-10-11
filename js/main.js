// ============ FILTROS ============
const filterButtons = document.querySelectorAll('.filter-btn');
const categories = document.querySelectorAll('#view-normal .category');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    categories.forEach(cat => {
      if (filter === 'all' || cat.dataset.category === filter) {
        cat.style.display = 'block';
        cat.querySelectorAll('.item').forEach(item => {
          item.classList.remove('aos-animate');
          setTimeout(() => item.classList.add('aos-animate'), 40);
        });
      } else {
        cat.style.display = 'none';
      }
    });

    document.getElementById('menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============ TOGGLE VISTA NORMAL / SIMPLE ============
const viewToggle = document.getElementById('view-toggle');
const viewLabel = viewToggle.querySelector('.view-label');
const viewNormal = document.getElementById('view-normal');
const viewSimple = document.getElementById('view-simple');

function setView(mode) {
  if (mode === 'simple') {
    viewNormal.hidden = true;
    viewSimple.hidden = false;
    document.body.classList.add('view-simple-active');
    viewLabel.textContent = 'Vista Normal';
  } else {
    viewNormal.hidden = false;
    viewSimple.hidden = true;
    document.body.classList.remove('view-simple-active');
    viewLabel.textContent = 'Vista Simple';
  }
  if (window.AOS) AOS.refresh();
}

const savedView = localStorage.getItem('javichapa-view') || 'normal';
setView(savedView);

viewToggle.addEventListener('click', () => {
  const isSimple = !viewSimple.hidden;
  const newMode = isSimple ? 'normal' : 'simple';
  setView(newMode);
  localStorage.setItem('javichapa-view', newMode);
  document.getElementById('menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ============ AOS ============
AOS.init({
  duration: 600,
  once: true,
  offset: 60,
  easing: 'ease-out-cubic'
});

// ============ FALLBACK VIDEO ============
const video = document.querySelector('.bg-video');
if (video) {
  video.addEventListener('error', () => {
    video.style.display = 'none';
    document.body.style.background = 'linear-gradient(180deg, #FF8C42, #F26A21)';
  });
}

// ============ OCULTAR TOP BAR AL HACER SCROLL ============
const topBar = document.getElementById('top-bar');
let lastScrollY = window.scrollY;
let ticking = false;

function handleScroll() {
  const currentScrollY = window.scrollY;

  if (Math.abs(currentScrollY - lastScrollY) < 8) {
    ticking = false;
    return;
  }

  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    topBar.classList.add('hidden');
    document.body.classList.add('topbar-hidden');
  } else {
    topBar.classList.remove('hidden');
    document.body.classList.remove('topbar-hidden');
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });
