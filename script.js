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

const quoteBtn = document.getElementById('quoteBtn');
if (quoteBtn) {
  quoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!document.getElementById('playtest-form')) {
      const form = document.createElement('form');
      form.id = 'playtest-form';
      form.className = 'playtest-form';
      form.innerHTML = `
        <label for="playtest-email" class="visually-hidden">Email</label>
        <input id="playtest-email" name="email" type="email" placeholder="your.email@example.com" required />
        <button type="submit" class="btn primary">Sign up</button>
        <button type="button" id="playtest-cancel" class="btn secondary">Cancel</button>
      `;
      quoteBtn.parentNode.appendChild(form);

      const input = form.querySelector('#playtest-email');
      input.focus();

      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const email = input.value.trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
          input.setAttribute('aria-invalid', 'true');
          input.focus();
          return;
        }
        const msg = document.createElement('div');
        msg.className = 'cta-feedback';
        msg.setAttribute('role', 'status');
        msg.textContent = `Thanks — ${email} is on the playtest list.`;
        form.replaceWith(msg);
        setTimeout(() => msg.remove(), 6000);
      });

      const cancel = document.getElementById('playtest-cancel');
      cancel.addEventListener('click', () => form.remove());
    }
  });
}
