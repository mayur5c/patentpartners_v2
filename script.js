// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    hamburger.setAttribute('aria-expanded', String(!open));
  });
}

// Form validation and local “submission”
const form = document.getElementById('applyForm');
const statusEl = document.getElementById('formStatus');

const validators = {
  name: v => v.trim().length >= 3,
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  affiliation: v => v.trim().length >= 2,
  cohort: v => v.trim().length > 0,
  stage: v => v.trim().length > 0,
  trl: v => v.trim().length > 0,
  fundingLane: v => v.trim().length > 0,
  consent: v => v === true
};

function setError(field, msg) {
  const err = document.querySelector(`.err[data-for="${field}"]`);
  if (err) err.textContent = msg || '';
}

function collect() {
  return {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    affiliation: document.getElementById('affiliation').value,
    cohort: document.getElementById('cohort').value,
    stage: document.getElementById('stage').value,
    trl: document.getElementById('trl').value,
    problem: document.getElementById('problem').value,
    solution: document.getElementById('solution').value,
    ip: document.getElementById('ip').value,
    reg: document.getElementById('reg').value,
    fundingLane: document.getElementById('fundingLane').value,
    ask: document.getElementById('ask').value,
    consent: document.getElementById('consent').checked,
  };
}

function validate(payload) {
  let ok = true;
  for (const [k, fn] of Object.entries(validators)) {
    const valid = fn(payload[k] ?? '');
    setError(k, valid ? '' : 'Required or invalid');
    if (!valid) ok = false;
  }
  return ok;
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = collect();
  if (!validate(data)) {
    statusEl.textContent = 'Please fix the highlighted fields and try again.';
    statusEl.style.color = '#ff7b7b';
    return;
  }
  // Demo persistence: localStorage
  const submissions = JSON.parse(localStorage.getItem('ffl_submissions') || '[]');
  submissions.push({...data, ts: new Date().toISOString()});
  localStorage.setItem('ffl_submissions', JSON.stringify(submissions));
  form.reset();
  statusEl.textContent = 'Application submitted. A confirmation email will be sent after review.';
  statusEl.style.color = '#00d68f';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
});
