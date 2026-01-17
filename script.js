const accordionButtons = document.querySelectorAll('.accordion-btn');

accordionButtons.forEach(button => {
  const contentId = button.getAttribute('aria-controls');
  const content = document.getElementById(contentId);
  if (content) {
    content.style.maxHeight = '0';
    content.setAttribute('hidden', '');
  }

  button.addEventListener('click', () => toggleAccordion(button));

  button.addEventListener('keydown', (ev) => {
    if (ev.key === ' ' || ev.key === 'Spacebar') {
      ev.preventDefault();
      toggleAccordion(button);
    }
  });
});

function toggleAccordion(btn) {
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  const contentId = btn.getAttribute('aria-controls');
  const content = document.getElementById(contentId);

  if (!content) return;

  if (isExpanded) {
    btn.setAttribute('aria-expanded', 'false');
    content.style.maxHeight = content.scrollHeight + 'px';
    void content.offsetHeight;
    content.style.maxHeight = '0';
    content.addEventListener('transitionend', function handleEnd() {
      content.setAttribute('hidden', '');
      content.removeEventListener('transitionend', handleEnd);
    });
  } else {
    btn.setAttribute('aria-expanded', 'true');
    content.removeAttribute('hidden');
    content.style.maxHeight = content.scrollHeight + 'px';
    content.addEventListener('transitionend', function handleEnd() {
      content.style.maxHeight = 'none';
      content.removeEventListener('transitionend', handleEnd);
    });
  }
}

function updateActiveNavigation() {
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('section[id]');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    
    if (window.scrollY >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.removeAttribute('aria-current');
    const href = link.getAttribute('href');
    if (href === '#' + currentSection || (currentSection === 'home' && href === '#')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

window.addEventListener('scroll', updateActiveNavigation, { passive: true });
updateActiveNavigation();