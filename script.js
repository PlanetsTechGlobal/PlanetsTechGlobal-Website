/* =====================================================
   PLANETS TECH GLOBAL — script.js  (shared)
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* === CURSOR BLOB === */
  const blob = document.createElement('div');
  blob.id = 'cursor-blob';
  document.body.appendChild(blob);
  document.addEventListener('mousemove', e => {
    blob.style.left = e.clientX + 'px';
    blob.style.top  = e.clientY + 'px';
  });

  /* === NAVBAR === */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      const sp = hamburger.querySelectorAll('span');
      sp[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
      sp[1].style.opacity   = open ? '0' : '';
      sp[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
      });
    });
  }

  /* === ACTIVE NAV LINK === */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* === SCROLL REVEAL === */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revObs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 70);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => revObs.observe(el));
  }

  /* === COUNT-UP === */
  function countUp(el, target, duration = 1800) {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target, parseInt(entry.target.dataset.count));
          cObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  /* === CARD 3D TILT === */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y - r.height/2) / r.height) * -7;
      const ry = ((x - r.width/2)  / r.width)  *  7;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* === PROGRESS BARS === */
  const bars = document.querySelectorAll('.bar-fill');
  if (bars.length) {
    const bObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          bObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => { b.style.width = '0'; bObs.observe(b); });
  }

  /* === SECTION FADE IN === */
  document.querySelectorAll('section').forEach(sec => {
    // Don't hide the hero — it should always be visible immediately
    if (sec.id === 'hero' || sec.id === 'navbar') return;
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(18px)';
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sec.style.opacity = '1';
        sec.style.transform = 'translateY(0)';
        obs.unobserve(sec);
      }
    }, { threshold: 0.04 });
    obs.observe(sec);
  });

  // Safety fallback: make all sections visible after 2s (fixes edge cases on mobile)
  setTimeout(() => {
    document.querySelectorAll('section').forEach(sec => {
      if (sec.style.opacity === '0') {
        sec.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        sec.style.opacity = '1';
        sec.style.transform = 'translateY(0)';
      }
    });
  }, 2000);

  /* === FORM SUBMIT === */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const name = document.getElementById('form-name');
      if (!name || !name.value.trim()) {
        name.style.borderColor = '#e74c3c';
        name.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}], {duration:300});
        setTimeout(() => { name.style.borderColor = ''; }, 1500);
        return;
      }
      btn.textContent = 'Sending…';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.textContent = '✓ Message Sent — We\'ll be in touch within 24hrs!';
        btn.style.background = 'linear-gradient(135deg,#27ae60,#2ecc71)';
        form.reset();
        setTimeout(() => { btn.textContent = 'Send Message →'; btn.disabled=false; btn.style.opacity=''; btn.style.background=''; }, 5000);
      }, 1800);
    });
  }

  console.log('%c🌍 PLANETS TECH GLOBAL', 'color:#e74c3c;font-size:20px;font-weight:bold;');
  console.log('%cEngineering the Digital Future', 'color:#a0a0a0;font-size:12px;');
});
