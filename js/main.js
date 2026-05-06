/* ===== STARFIELD ===== */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initStars(count = 260) {
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      speed: Math.random() * 0.15 + 0.03,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleSpeed: Math.random() * 0.01 + 0.003,
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
      s.opacity += s.twinkleSpeed * s.twinkleDir;
      if (s.opacity > 0.85 || s.opacity < 0.1) s.twinkleDir *= -1;
      s.y += s.speed;
      if (s.y > H) { s.y = 0; s.x = Math.random() * W; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${s.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initStars(); });
  resize();
  initStars();
  draw();
})();

/* ===== TYPEWRITER for hero roles ===== */
(function () {
  const el = document.getElementById('typed-roles');
  if (!el) return;

  const roles = ['Lærer', 'Klatreklubb-leder', 'Utvikler', 'Musikant'];
  let ri = 0, ci = 0, deleting = false;

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.after(cursor);

  function tick() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
      setTimeout(tick, 80);
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 45);
    }
  }

  setTimeout(tick, 1200);
})();

/* ===== SCROLL TO SECTIONS ===== */
document.querySelectorAll('[data-scroll]').forEach(el => {
  el.addEventListener('click', () => {
    const target = document.querySelector(el.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ===== CONTACT FORM (Formspree AJAX) ===== */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-send');
    const success = document.getElementById('form-success');

    btn.textContent = 'Sender...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        form.reset();
        form.style.display = 'none';
        success.style.display = 'block';
      } else {
        btn.textContent = 'Noe gikk galt — prøv igjen';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Noe gikk galt — prøv igjen';
      btn.disabled = false;
    }
  });
})();

/* ===== ACTIVE NAV LINK ===== */
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();
