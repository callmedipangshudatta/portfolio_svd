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


    // /* ── 2. TECH CANVAS — YELLOW & PINK NODES ── */
    // const canvas = document.createElement('canvas');
    // canvas.id = 'tech-canvas';
    // document.body.prepend(canvas);
    // const ctx = canvas.getContext('2d');

    // function resizeCanvas() {
    //     canvas.width  = window.innerWidth;
    //     canvas.height = window.innerHeight;
    // }
    // resizeCanvas();
    // window.addEventListener('resize', resizeCanvas);

    // const NODE_COUNT = 90;
    // // 0 = yellow, 1 = pink, 2 = soft white accent
    // const COLORS = ['255,215,0', '255,79,173', '255,200,220'];

    // const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    //     x:     Math.random() * window.innerWidth,
    //     y:     Math.random() * window.innerHeight,
    //     vx:    (Math.random() - 0.5) * 0.45,
    //     vy:    (Math.random() - 0.5) * 0.45,
    //     r:     Math.random() * 2 + 1,
    //     color: COLORS[i % COLORS.length]
    // }));

    // const MAX_DIST = 150;

    // function drawTech() {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     // Move nodes
    //     nodes.forEach(n => {
    //         n.x += n.vx; n.y += n.vy;
    //         if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
    //         if (n.y < 0 || n.y > canvas.height)  n.vy *= -1;
    //     });

    //     // Draw connections
    //     for (let i = 0; i < nodes.length; i++) {
    //         for (let j = i + 1; j < nodes.length; j++) {
    //             const dx   = nodes[i].x - nodes[j].x;
    //             const dy   = nodes[i].y - nodes[j].y;
    //             const dist = Math.sqrt(dx * dx + dy * dy);
    //             if (dist < MAX_DIST) {
    //                 const alpha = (1 - dist / MAX_DIST) * 0.2;
    //                 ctx.beginPath();
    //                 ctx.moveTo(nodes[i].x, nodes[i].y);
    //                 ctx.lineTo(nodes[j].x, nodes[j].y);
    //                 ctx.strokeStyle = `rgba(${nodes[i].color},${alpha})`;
    //                 ctx.lineWidth   = 0.8;
    //                 ctx.stroke();
    //             }
    //         }
    //     }

    //     // Draw nodes
    //     nodes.forEach(n => {
    //         ctx.beginPath();
    //         ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    //         ctx.fillStyle = `rgba(${n.color},0.72)`;
    //         ctx.fill();
    //     });

    //     requestAnimationFrame(drawTech);
    // }
    // drawTech();

/* ── 2. ENERGETIC NEURAL NETWORK CANVAS ── */
    const canvas = document.createElement('canvas');
    canvas.id = 'neural-canvas';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let particlesArray;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let mouse = {
        x: null,
        y: null,
        radius: 150 // Connection radius for mouse
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            // Give nodes an intense glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset for lines
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            // Interactive mouse repel effect
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                
                this.x -= forceDirectionX * force * 5;
                this.y -= forceDirectionY * force * 5;
            }
            
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        // Creates a dense network
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        
        // Energetic Palette matching the reference image (Cyan, Neon Green, Yellow)
        const colors = ['#00F0FF', '#00FF66', '#FFD700']; 
        
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1.5;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1.2) - 0.6;
            let directionY = (Math.random() * 1.2) - 0.6;
            let color = colors[Math.floor(Math.random() * colors.length)];
            
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                
                // Connection threshold
                if (distance < (canvas.width/9) * (canvas.height/9)) {
                    opacityValue = 1 - (distance/15000);
                    // Use a glowing cyan/green tint for the web lines
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue * 0.25})`;
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    init();
    animate();

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