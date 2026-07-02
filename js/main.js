/* ===== EFFEKT-INNSTILLINGER =====
   Fra Kosmos v2-designet: tetthet 'rolig' 0.5 / 'balansert' 1 / 'maksimal' 1.7.
   PARALLAX flytter kosmos-bakgrunnen med mus og scroll (av i designets default). */
const STAR_DENSITY = 1;
const PARALLAX = false;

/* ===== STARFIELD ===== */
(function () {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const COLORS = ["255,255,255", "180,230,255", "190,170,255", "255,170,225"];
    let stars = [];
    let shoot = null;
    let shootTimer = 80;

    function resize() {
        const d = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * d;
        canvas.height = window.innerHeight * d;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(d, 0, 0, d, 0, 0);
        initStars();
    }

    function initStars() {
        const w = window.innerWidth, h = window.innerHeight;
        const count = Math.floor((w * h) / 6500 * STAR_DENSITY);
        stars = Array.from({ length: count }, () => {
            const z = Math.random();
            return {
                x: Math.random() * w,
                y: Math.random() * h,
                z,
                r: z * 1.6 + 0.3,
                a: Math.random() * 0.6 + 0.25,
                tw: Math.random() * 6.28,
                ts: Math.random() * 0.02 + 0.004,
                col: COLORS[Math.random() < 0.72 ? 0 : 1 + Math.floor(Math.random() * 3)],
            };
        });
        shoot = null;
        shootTimer = 80;
    }

    function draw() {
        const w = window.innerWidth, h = window.innerHeight;
        ctx.clearRect(0, 0, w, h);

        for (const s of stars) {
            s.tw += s.ts;
            const alpha = s.a * (0.5 + 0.5 * Math.sin(s.tw));
            s.y += s.z * 0.06 + 0.02;
            s.x -= s.z * 0.05 + 0.008;
            if (s.y > h + 2) s.y = -2;
            if (s.x < -2) s.x = w + 2;

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, 6.28);
            ctx.fillStyle = `rgba(${s.col},${alpha.toFixed(3)})`;
            ctx.fill();

            if (s.r > 1.25) {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r * 2.6, 0, 6.28);
                ctx.fillStyle = `rgba(${s.col},${(alpha * 0.13).toFixed(3)})`;
                ctx.fill();
            }
        }

        shootTimer--;
        if (!shoot && shootTimer <= 0 && Math.random() < 0.02) {
            shoot = {
                x: Math.random() * w * 0.5 + w * 0.4,
                y: Math.random() * h * 0.3,
                vx: -(6 + Math.random() * 4),
                vy: 3 + Math.random() * 2,
                life: 1,
            };
        }
        if (shoot) {
            const x2 = shoot.x - shoot.vx * 12, y2 = shoot.y - shoot.vy * 12;
            const g = ctx.createLinearGradient(shoot.x, shoot.y, x2, y2);
            g.addColorStop(0, `rgba(185,240,255,${Math.max(0, shoot.life)})`);
            g.addColorStop(1, "rgba(185,240,255,0)");
            ctx.strokeStyle = g;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(shoot.x, shoot.y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            shoot.x += shoot.vx;
            shoot.y += shoot.vy;
            shoot.life -= 0.018;
            if (shoot.life <= 0) {
                shoot = null;
                shootTimer = 120 + Math.random() * 200;
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();
})();

/* ===== PARALLAX for kosmos-bakgrunnen ===== */
(function () {
    if (!PARALLAX) return;
    const el = document.querySelector(".cosmos-bg");
    if (!el) return;
    const mouse = { x: 0, y: 0 };

    function apply() {
        const sy = window.scrollY || 0;
        const mx = mouse.x * 18, my = mouse.y * 16;
        el.style.transform =
            `scale(1.13) translate3d(${mx.toFixed(1)}px,${(sy * 0.12 + my).toFixed(1)}px,0)`;
    }

    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX / window.innerWidth - 0.5;
        mouse.y = e.clientY / window.innerHeight - 0.5;
        apply();
    });
    apply();
})();

/* ===== TYPEWRITER for hero-roller ===== */
(function () {
    const el = document.getElementById("typed-roles");
    if (!el) return;

    const roles = [
        "kursleder.",
        "styremedlem i ORKK.",
        "backend-utvikler.",
        "musikant.",
        "klatrer.",
        "lydtekniker.",
    ];
    let ri = 0, ci = 0, deleting = false;

    function tick() {
        const word = roles[ri];
        if (!deleting) {
            el.textContent = word.slice(0, ++ci);
            if (ci >= word.length) {
                deleting = true;
                setTimeout(tick, 1500);
                return;
            }
            setTimeout(tick, 80 + Math.random() * 50);
        } else {
            el.textContent = word.slice(0, Math.max(0, --ci));
            if (ci <= 0) {
                deleting = false;
                ri = (ri + 1) % roles.length;
                setTimeout(tick, 220);
                return;
            }
            setTimeout(tick, 42);
        }
    }

    setTimeout(tick, 700);
})();

/* ===== ACTIVE NAV LINK ===== */
(function () {
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((a) => {
        const href = a.getAttribute("href");
        if (href === path || (path === "" && href === "index.html")) {
            a.classList.add("active");
        }
    });
})();
