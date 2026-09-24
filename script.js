/*
  SITE INTERACTIONS
  ------------------------------------------------------------
  You shouldn't need to edit this file to update content, text,
  images or fonts — all of that lives in index.html and styles.css.

  This file only handles:
  - the mobile menu opening/closing
  - the WORK filter buttons (ALL / 3D / ART / etc.)
  - the project popup (opening, closing, prev/next, arrow keys)
  - the image gallery + full-size lightbox inside each popup

  The one thing you MAY want to edit is projectDescriptions below —
  that's the longer description text shown inside each project popup.
*/

// Auto-update the footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ---- Mobile navigation ----
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

// ---- Work filtering ----
const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.work-card')];

let activeFilter = 'all';
let currentProject = 0;

function visibleCards() {
  return cards.filter(card => !card.hidden);
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filters.forEach(filterButton => filterButton.classList.toggle('is-active', filterButton === button));

    cards.forEach(card => {
      card.hidden = activeFilter !== 'all' && card.dataset.category !== activeFilter;
    });
  });
});

// ---- Project popup (modal) ----
const dialog = document.getElementById('project-dialog');
const dialogTitle = document.getElementById('dialog-title');
const dialogType = document.getElementById('dialog-type');
const dialogYear = document.getElementById('dialog-year');
const dialogMedia = document.getElementById('dialog-media');
const dialogDescription = document.getElementById('dialog-description');
const dialogClose = document.querySelector('.dialog-close');
const dialogPrev = document.getElementById('dialog-prev');
const dialogNext = document.getElementById('dialog-next');
const dialogGallery = document.getElementById('dialog-gallery');

// ADDED: lightbox elements (full-size image viewer inside the popup)
const dialogLightbox = document.getElementById('dialog-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

// ADDED: opens/closes the full-size lightbox
let lightboxList = [];
let lightboxIndex = 0;

const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

function showLightboxImage() {
  const current = lightboxList[lightboxIndex];
  if (!current) return;
  lightboxImage.src = current.src;
  lightboxImage.alt = current.alt;
  lightboxPrev.disabled = lightboxIndex === 0;
  lightboxNext.disabled = lightboxIndex === lightboxList.length - 1;
}

function openLightbox(list, startIndex) {
  if (!dialogLightbox || !lightboxImage) return;
  lightboxList = list;
  lightboxIndex = startIndex;
  showLightboxImage();
  if (!dialogLightbox.open) dialogLightbox.showModal();
}

function moveLightbox(direction) {
  const nextIndex = lightboxIndex + direction;
  if (nextIndex < 0 || nextIndex >= lightboxList.length) return;
  lightboxIndex = nextIndex;
  showLightboxImage();
}

function closeLightbox() {
  if (dialogLightbox.open) dialogLightbox.close();
}

lightboxPrev?.addEventListener('click', () => moveLightbox(-1));
lightboxNext?.addEventListener('click', () => moveLightbox(1));



lightboxClose?.addEventListener('click', closeLightbox);
dialogLightbox?.addEventListener('click', event => {
  if (event.target === dialogLightbox) closeLightbox();
});

// EDIT ME: longer description shown in each project's popup.
// The key on the left must exactly match that project's data-title
// in index.html.
const projectDescriptions = {
  'Environment Study': 'An environment study exploring form, atmosphere, lighting and spatial composition in Blender.',
  'Portrait Study': 'A portrait painting exploring shape, expression, surface and colour through acrylic.',
  'Motion Test': 'A short motion experiment combining animation, timing, composition and 3D graphics.',
  'Charcoal Study': 'A charcoal portrait study focused on tone, gesture and the relationship between light and form.',
  'Object Series': 'A Blender study focused on modelling, materials, lighting and controlled product-like presentation.',
  'Identity Experiment': 'A graphic identity exploration built as an experimental design study.'
};

// Builds the popup's media area by cloning whatever image or video
// is already inside the clicked card — so you never have to list
// your filenames twice.
function setDialogMedia(card) {
  const sourceMedia = card?.querySelector('.media-box img, .media-box video');
  dialogMedia.innerHTML = '';

  if (!sourceMedia) {
    dialogMedia.innerHTML = '<div class="dialog-placeholder">ADD AN IMAGE OR VIDEO TO THIS PROJECT CARD IN index.html</div>';
    return;
  }

  const clone = sourceMedia.cloneNode(true);
  clone.removeAttribute('loop');
  clone.removeAttribute('autoplay');
  clone.removeAttribute('muted');
  if (clone.tagName === 'VIDEO') {
    clone.controls = true;
    clone.setAttribute('aria-label', `${card.dataset.title} video`);
  } else {
    clone.alt = `${card.dataset.title} — ${card.dataset.type}`;
  }
  dialogMedia.appendChild(clone);
}

// File gallery function
function setDialogGallery(card) {
  if (!dialogGallery) return;
  dialogGallery.innerHTML = '';
  const list = (card.dataset.gallery || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
    .map(src => ({ src, alt: `${card.dataset.title} — additional view` }));

  list.forEach((entry, index) => {
    const item = document.createElement('div');
    item.className = 'dialog-gallery-item';
    const img = document.createElement('img');
    img.src = entry.src;
    img.alt = entry.alt;
    img.loading = 'lazy';
    img.onerror = () => item.remove();
    item.appendChild(img);
    item.addEventListener('click', () => openLightbox(list, index));
    dialogGallery.appendChild(item);
  });
}


function updateDialogControls() {
  const items = visibleCards();
  const count = items.length;
  const currentPosition = items.indexOf(cards[currentProject]);
  const hasPrev = currentPosition > 0;
  const hasNext = currentPosition >= 0 && currentPosition < count - 1;

  dialogPrev.disabled = !hasPrev;
  dialogNext.disabled = !hasNext;

  dialogPrev.querySelector('small').textContent = hasPrev ? items[currentPosition - 1].dataset.title : '';
  dialogNext.querySelector('small').textContent = hasNext ? items[currentPosition + 1].dataset.title : '';
}

function openProject(card) {
  currentProject = Number(card.dataset.index);
  dialogTitle.textContent = card.dataset.title || '';
  dialogType.textContent = card.dataset.type || '';
  dialogYear.textContent = card.dataset.year || '';
  dialogDescription.textContent = projectDescriptions[card.dataset.title] || 'Project details can be added here: role, tools, process and outcome.';
  setDialogMedia(card);
  setDialogGallery(card);
  updateDialogControls();
if (!dialog.open) {
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}}

function moveProject(direction) {
  const items = visibleCards();
  const currentPosition = items.indexOf(cards[currentProject]);
  const nextPosition = currentPosition + direction;
  if (nextPosition < 0 || nextPosition >= items.length) return;
  openProject(items[nextPosition]);
}

cards.forEach(card => {
  const trigger = card.querySelector('.card-button');
  trigger?.addEventListener('click', () => openProject(card));

  const heroLink = document.querySelector('.hero-visual-link');
heroLink?.addEventListener('click', () => {
  const target = cards.find(card => card.dataset.title === heroLink.dataset.jumpTo);
  if (target) openProject(target);
});

});

dialogPrev?.addEventListener('click', () => moveProject(-1));
dialogNext?.addEventListener('click', () => moveProject(1));
dialogClose?.addEventListener('click', () => dialog.close());

dialog?.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
  dialog?.addEventListener('close', () => {
  document.body.style.overflow = '';
});
});

// CHANGED: Escape now closes the lightbox first (if open), otherwise closes the popup
document.addEventListener('keydown', event => {
  if (!dialog?.open) return;
  if (dialogLightbox?.open) {
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
    return;
  }
  if (event.key === 'ArrowLeft') moveProject(-1);
  if (event.key === 'ArrowRight') moveProject(1);
  if (event.key === 'Escape') dialog.close();
});