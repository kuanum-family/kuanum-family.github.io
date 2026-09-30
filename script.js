const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const languageButton = document.querySelector('[data-language]');
const dialog = document.querySelector('[data-service-dialog]');
const modalArt = document.querySelector('[data-modal-art]');
const modalEyebrow = document.querySelector('[data-modal-eyebrow]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const services = {
  gastronomia: {
    eyebrow: '01 · Arqueogastronomía',
    title: 'Recetas que guardan memoria.',
    text: 'Diseñamos catas, talleres, demostraciones culinarias y recorridos gastronómicos basados en investigación histórica. Cada actividad se adapta al lugar, al público y a la historia que quieres contar.',
    image: 'https://images.gestionaweb.cat/3302/img-1600-1200/3-6-2-2265868.jpg'
  },
  pedagogia: {
    eyebrow: '02 · Servicios pedagógicos',
    title: 'Aprender con todos los sentidos.',
    text: 'Propuestas participativas para centros educativos, museos y familias. Transformamos conceptos complejos en experiencias que invitan a tocar, oler, cocinar, conversar y descubrir.',
    image: 'https://images.gestionaweb.cat/3302/img-1600-1200/4-9-1-2265894.png'
  },
  exposiciones: {
    eyebrow: '03 · Exposiciones itinerantes',
    title: 'Historias que viajan contigo.',
    text: 'Creamos exposiciones didácticas y adaptables que hacen cercano el mundo antiguo. Relato, objetos, recursos gráficos y participación se encuentran para activar cualquier espacio cultural.',
    image: 'https://images.gestionaweb.cat/3302/img-1600-1200/5-2-1-2265914.jpg'
  }
};

function toggleMenu(force) {
  const open = typeof force === 'boolean' ? force : !nav.classList.contains('is-open');
  nav.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
}

menuButton?.addEventListener('click', () => toggleMenu());
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => toggleMenu(false)));

languageButton?.addEventListener('click', () => {
  const isSpanish = languageButton.textContent.trim().startsWith('ES');
  languageButton.innerHTML = `${isSpanish ? 'CA' : 'ES'} <span aria-hidden="true">⌄</span>`;
  languageButton.setAttribute('aria-label', isSpanish ? 'Idioma actual: catalán' : 'Idioma actual: español');
});

document.querySelectorAll('[data-modal]').forEach((button) => {
  button.addEventListener('click', () => {
    const service = services[button.dataset.modal];
    if (!service || !dialog) return;
    modalEyebrow.textContent = service.eyebrow;
    modalTitle.textContent = service.title;
    modalText.textContent = service.text;
    modalArt.style.backgroundImage = `url("${service.image}")`;
    dialog.showModal();
  });
});

document.querySelector('[data-close-modal]')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

function updateHeader() {
  header?.classList.toggle('is-stuck', window.scrollY > 30);
}
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
document.querySelector('[data-year]').textContent = new Date().getFullYear();

