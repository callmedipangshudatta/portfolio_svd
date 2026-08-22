    /* ════════════════════════════════════════════
    script.js — Sneha Sharma Portfolio
    ════════════════════════════════════════════ */

    /* ── 1. TYPING EFFECT ── */
    const words = [
    "I'm a CS Student @ Bennett University",
    "I'm an Ex-AI Engineering Intern @ AI Mill",
    "I'm an AI/ML Specialisation Learner",
    "I'm a DSA Problem Solver — 85+ Solved"
];
    let wi = 0, ci = 0, deleting = false;
    const typingEl = document.getElementById('typingWord');

    function type() {
        if (!typingEl) return;
        const word = words[wi];
        if (!deleting) {
            typingEl.textContent = word.slice(0, ++ci);
            if (ci === word.length) { deleting = true; setTimeout(type, 1800); return; }
        } else {
            typingEl.textContent = word.slice(0, --ci);
            if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(type, deleting ? 55 : 85);
    }
    type();


    /* ── 2. TECH CANVAS — YELLOW & PINK NODES ── */
    const canvas = document.createElement('canvas');
    canvas.id = 'tech-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const NODE_COUNT = 90;
    // 0 = yellow, 1 = pink, 2 = soft white accent
    const COLORS = ['255,215,0', '255,79,173', '255,200,220'];

    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x:     Math.random() * window.innerWidth,
        y:     Math.random() * window.innerHeight,
        vx:    (Math.random() - 0.5) * 0.45,
        vy:    (Math.random() - 0.5) * 0.45,
        r:     Math.random() * 2 + 1,
        color: COLORS[i % COLORS.length]
    }));

    const MAX_DIST = 150;

    function drawTech() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Move nodes
        nodes.forEach(n => {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height)  n.vy *= -1;
        });

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx   = nodes[i].x - nodes[j].x;
                const dy   = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    const alpha = (1 - dist / MAX_DIST) * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(${nodes[i].color},${alpha})`;
                    ctx.lineWidth   = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${n.color},0.72)`;
            ctx.fill();
        });

        requestAnimationFrame(drawTech);
    }
    drawTech();


    /* ── 3. HAMBURGER MENU ── */
    const hamburger = document.getElementById('hamburger');
    const navbar    = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navbar.classList.toggle('open');
        document.body.style.overflow = navbar.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navbar.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
    document.addEventListener('click', (e) => {
        if (navbar.classList.contains('open') &&
            !navbar.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('open');
            navbar.classList.remove('open');
            document.body.style.overflow = '';
        }
    });


    /* ── 4. ACTIVE NAV ON SCROLL ── */
    const sections     = document.querySelectorAll('section[id], .home[id]');
    const navLinks     = document.querySelectorAll('.nav-link');
    const header       = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTop');

    function updateActiveNav() {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 10);
        scrollTopBtn.classList.toggle('visible', scrollY > 400);

        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - header.offsetHeight - 80)
                current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();


    /* ── 5. SMOOTH SCROLL ── */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }
        });
    });


    /* ── 6. SCROLL TO TOP ── */
    scrollTopBtn.addEventListener('click', () =>
        window.scrollTo({ top: 0, behavior: 'smooth' })
    );


    /* ── 7. SCROLL REVEAL ── */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const siblings = [...entry.target.parentElement.children]
                    .filter(c => c.classList.contains('reveal'));
                entry.target.style.transitionDelay = `${siblings.indexOf(entry.target) * 0.08}s`;
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));


    /* ── 8. SKILL BARS ── */
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('data-width') + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    skillFills.forEach(fill => skillObserver.observe(fill));