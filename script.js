
  // CURSOR
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top = my - 6 + 'px';
  });

  function animateTrail() {
    tx += (mx - tx - 20) * 0.12;
    ty += (my - ty - 20) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  document.querySelectorAll('a, button, .service-card, .contact-item, .value-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2.5)';
      trail.style.transform = 'scale(1.5)';
      trail.style.borderColor = 'var(--red-glow)';
      trail.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      trail.style.transform = 'scale(1)';
      trail.style.borderColor = 'var(--red-bright)';
      trail.style.opacity = '0.5';
    });
  });

  // COUNTER ANIMATION
  function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      el.textContent = Math.floor(current).toString().padStart(el.textContent.length, '0');
    }, 16);
  }

  // SCROLL REVEAL
  const revealEls = document.querySelectorAll('.reveal');
  const statNums = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  // Stats counter trigger
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNums.forEach(n => animateCounter(n));
      }
    });
  }, { threshold: 0.5 });
  if (statNums.length) statsObserver.observe(statNums[0].closest('.stats-strip'));

  // GLITCH on hover for h1
  document.querySelectorAll('.glitch').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.animation = 'none';
      setTimeout(() => el.style.animation = '', 10);
    });
  });

  // FORM SUBMIT
  function submitForm() {
    const name = document.getElementById('f-name').value;
    const email = document.getElementById('f-email').value;
    const service = document.getElementById('f-service').value;

    if (!name || !email || !service) {
      const btn = document.getElementById('submitBtn');
      btn.style.background = '#4a0000';
      btn.textContent = '✗ PREENCHA OS CAMPOS';
      setTimeout(() => {
        btn.style.background = 'var(--red)';
        btn.innerHTML = '&#9654; Enviar Mensagem';
      }, 2000);
      return;
    }

    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '⟳ ENVIANDO...';
    btn.disabled = true;

    setTimeout(() => {
      btn.style.display = 'none';
      document.getElementById('successMsg').style.display = 'block';
      document.getElementById('f-name').value = '';
      document.getElementById('f-email').value = '';
      document.getElementById('f-company').value = '';
      document.getElementById('f-msg').value = '';
    }, 1500);
  }

  // SMOOTH NAV
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // NAV SCROLL STYLE
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.background = window.scrollY > 80
      ? 'rgba(0,0,0,0.98)'
      : 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, transparent 100%)';
  });

  // PARALLAX on hero glow
  document.addEventListener('mousemove', e => {
    const glow = document.querySelector('.hero-glow');
    if (!glow) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });
