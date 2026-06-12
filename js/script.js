const loader = document.getElementById('loader');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

const typedTexts = [
  'Systems administrator',
  'Cybersecurity advocate',
  'IT support technician',
  'SOC analyst',
  'Creative problem solver',
  'Customer Sevice',
];
let typedIndex = 0;
let charIndex = 0;
const heroTitle = document.querySelector('.hero-copy h1 span');

const setTheme = theme => {
  if (theme === 'light') {
    body.classList.add('light');
    if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    localStorage.setItem('portfolio-theme', 'light');
  } else {
    body.classList.remove('light');
    if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to light mode');
    localStorage.setItem('portfolio-theme', 'dark');
  }
};

const loadTheme = () => {
  const stored = localStorage.getItem('portfolio-theme');
  setTheme(stored === 'light' ? 'light' : 'dark');
};

const handleTyping = () => {
  const current = typedTexts[typedIndex];
  heroTitle.textContent = current.slice(0, charIndex);

  if (charIndex < current.length) {
    charIndex += 1;
    setTimeout(handleTyping, 100);
  } else {
    setTimeout(() => {
      charIndex = 0;
      typedIndex = (typedIndex + 1) % typedTexts.length;
      handleTyping();
    }, 1800);
  }
};

const handleScroll = () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 220) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.offsetTop - 140;
    const height = section.offsetHeight;
    if (scrollTop >= top && scrollTop < top + height) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`));
    }
  });
};

const revealOnScroll = () => {
  document.querySelectorAll('.reveal, .reveal-up').forEach(el => {
    const bounds = el.getBoundingClientRect();
    if (bounds.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('load', () => {
  loader.classList.add('hidden');
  loadTheme();
  handleTyping();
  revealOnScroll();
});

window.addEventListener('scroll', () => {
  handleScroll();
  revealOnScroll();
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(body.classList.contains('light') ? 'dark' : 'light');
  });
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

mobileToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

setTimeout(() => {
  if (typeof handleTyping === 'function') {
    if (heroTitle.textContent.length === 0) {
      handleTyping();
    }
  }
}, 500);
