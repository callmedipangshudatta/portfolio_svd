
/* ==================================================
   SNEHA SHARMA — PORTFOLIO INTERACTIONS
================================================== */
/* ==================================================
   SNEHA SHARMA — PORTFOLIO INTERACTIONS
================================================== */

/* 0. Motion preference (was missing — caused the script to crash) */
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

/* 1. Mobile navigation */
const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");

function closeMenu() {
    if (!hamburger || !navbar) return;
    hamburger.classList.remove("open");
    navbar.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

function openMenu() {
    if (!hamburger || !navbar) return;
    hamburger.classList.add("open");
    navbar.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

hamburger?.addEventListener("click", () => {
    navbar?.classList.contains("open") ? closeMenu() : openMenu();
});

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        closeMenu();

        const headerHeight = header?.offsetHeight || 0;
        const targetTop =
            target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
            top: targetTop,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });
});

document.addEventListener("click", (event) => {
    if (
        navbar?.classList.contains("open") &&
        !navbar.contains(event.target) &&
        !hamburger?.contains(event.target)
    ) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 920) closeMenu();
});

/* 2. Active navigation and header shadow */
const sections = document.querySelectorAll("main section[id]");
const scrollTopBtn = document.getElementById("scrollTop");

function updatePageState() {
    const scrollY = window.scrollY;
    const headerHeight = header?.offsetHeight || 0;

    header?.classList.toggle("scrolled", scrollY > 10);
    scrollTopBtn?.classList.toggle("visible", scrollY > 400);

    let currentSection = "";
    sections.forEach((section) => {
        if (scrollY >= section.offsetTop - headerHeight - 100) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentSection}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updatePageState, { passive: true });
window.addEventListener("load", updatePageState);
updatePageState();

/* 3. Scroll to top */
scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
    });
});

/* 4. Scroll reveal */
const revealElements = document.querySelectorAll(".reveal");

function revealAll() {
    revealElements.forEach((el) => el.classList.add("visible"));
}

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealAll();
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const parent = entry.target.parentElement;
                const siblings = parent
                    ? [...parent.children].filter((el) =>
                          el.classList.contains("reveal")
                      )
                    : [];
                const delay = Math.max(0, siblings.indexOf(entry.target)) * 70;

                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.08, rootMargin: "0px 0px -35px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
}

/* 5. Dark / light mode */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector("i");
const themeStorageKey = "sneha-portfolio-theme";

function getSavedTheme() {
    try {
        return localStorage.getItem(themeStorageKey);
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(themeStorageKey, theme);
    } catch {
        /* Theme still works if storage is unavailable. */
    }
}

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);

    if (themeIcon) {
        themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }

    if (themeToggle) {
        const label = isDark ? "Switch to light mode" : "Switch to dark mode";
        themeToggle.setAttribute("aria-label", label);
        themeToggle.setAttribute("title", label);
    }

    saveTheme(theme);
}

/* Light mode is the default for first-time visitors. */
applyTheme(getSavedTheme() === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
    applyTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
});

/* 1. STATIC HERO TAGLINE — ALWAYS FULLY VISIBLE */

const typingEl = document.getElementById("typingWord");

if (typingEl) {
    typingEl.textContent =
        "Ex-AI Intern · Python & FastAPI · Full-Stack Web Apps";
}


/* 2. Mobile navigation */

const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");

function closeMenu() {
    if (!hamburger || !navbar) return;

    hamburger.classList.remove("open");
    navbar.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
}

function openMenu() {
    if (!hamburger || !navbar) return;

    hamburger.classList.add("open");
    navbar.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
}

hamburger?.addEventListener("click", () => {
    const isOpen = navbar?.classList.contains("open");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || !href.startsWith("#")) return;

        const target = document.querySelector(href);

        if (!target) return;

        event.preventDefault();
        closeMenu();

        const headerHeight = header?.offsetHeight || 0;
        const targetTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetTop,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    });
});

document.addEventListener("click", (event) => {
    if (
        navbar?.classList.contains("open") &&
        !navbar.contains(event.target) &&
        !hamburger?.contains(event.target)
    ) {
        closeMenu();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 920) {
        closeMenu();
    }
});

/* 3. Active navigation and header shadow */

const sections = document.querySelectorAll("main section[id]");
const scrollTopBtn = document.getElementById("scrollTop");

function updatePageState() {
    const scrollY = window.scrollY;
    const headerHeight = header?.offsetHeight || 0;

    header?.classList.toggle("scrolled", scrollY > 10);
    scrollTopBtn?.classList.toggle("visible", scrollY > 400);

    let currentSection = "";

    sections.forEach((section) => {
        if (scrollY >= section.offsetTop - headerHeight - 100) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", updatePageState, {
    passive: true
});

window.addEventListener("load", updatePageState);
updatePageState();

/* 4. Scroll to top */

scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
    });
});

/* 5. Scroll reveal */

const revealElements = document.querySelectorAll(".reveal");

function revealAll() {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
) {
    revealAll();
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const parent = entry.target.parentElement;

                const siblings = parent
                    ? [...parent.children].filter((element) =>
                          element.classList.contains("reveal")
                      )
                    : [];

                const siblingIndex = siblings.indexOf(entry.target);
                const delay = Math.max(0, siblingIndex) * 70;

                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

/* 6. Skill bars */

const skillFills = document.querySelectorAll(".skill-fill");

if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
) {
    skillFills.forEach((fill) => {
        const width = Number(fill.dataset.width);

        if (Number.isFinite(width)) {
            fill.style.width = `${Math.max(0, Math.min(width, 100))}%`;
        }
    });
} else {
    const skillObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const fill = entry.target;
                const width = Number(fill.dataset.width);

                if (Number.isFinite(width)) {
                    fill.style.width =
                        `${Math.max(0, Math.min(width, 100))}%`;
                }

                observer.unobserve(fill);
            });
        },
        { threshold: 0.25 }
    );

    skillFills.forEach((fill) => {
        skillObserver.observe(fill);
    });
}

/* 7. Dark / light mode */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector("i");
const themeStorageKey = "sneha-portfolio-theme";

function getSavedTheme() {
    try {
        return localStorage.getItem(themeStorageKey);
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(themeStorageKey, theme);
    } catch {
        // The theme still works if browser storage is unavailable.
    }
}

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark-mode", isDark);

    if (themeIcon) {
        themeIcon.className = isDark
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
    }

    if (themeToggle) {
        const label = isDark
            ? "Switch to light mode"
            : "Switch to dark mode";

        themeToggle.setAttribute("aria-label", label);
        themeToggle.setAttribute("title", label);
    }

    saveTheme(theme);
}

/* Light mode is the default for first-time visitors. */

const savedTheme = getSavedTheme();

applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");

    applyTheme(isDark ? "light" : "dark");
});
