
(function () {

    // Get HTML elements
    var root = document.documentElement;
    var theme = document.getElementById('theme');
    var menu = document.getElementById('menu');
    var nav = document.getElementById('nav');


    // ==============================
    // 1. DARK / LIGHT MODE
    // ==============================

    function setLabel() {
        var isDark = root.getAttribute('data-theme') === 'dark';

        theme.setAttribute(
            'aria-label',
            isDark ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    // Set initial theme label
    setLabel();

    // Toggle theme when button is clicked
    theme.addEventListener('click', function () {

        var next = root.getAttribute('data-theme') === 'dark'
            ? 'light'
            : 'dark';

        root.setAttribute('data-theme', next);

        setLabel();

        // Save selected theme
        try {
            localStorage.setItem('theme', next);
        } catch (e) {}

    });


    // ==============================
    // 2. MOBILE NAVIGATION
    // ==============================

    function closeMenu() {

        nav.classList.remove('open');

        menu.setAttribute('aria-expanded', 'false');

    }

    // Open and close mobile menu
    menu.addEventListener('click', function () {

        var isOpen = nav.classList.toggle('open');

        menu.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

    });

    // Close menu after clicking a navigation link
    nav.addEventListener('click', function (e) {

        if (e.target.tagName === 'A') {
            closeMenu();
        }

    });

    // Close menu when Escape key is pressed
    document.addEventListener('keydown', function (e) {

        if (e.key === 'Escape') {
            closeMenu();
        }

    });

    // Close menu when switching to desktop screen
    window.addEventListener('resize', function () {

        if (window.innerWidth > 900) {
            closeMenu();
        }

    });


    // ==============================
    // 3. SCROLL REVEAL ANIMATIONS
    // ==============================

    // Check browser support
    if (!('IntersectionObserver' in window)) {

        document.querySelectorAll('.reveal').forEach(function (el) {

            el.classList.add('in');

        });

        return;

    }

    // Observe elements while scrolling
    var ro = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add('in');

                    // Stop observing after animation
                    ro.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.08
        }

    );

    // Apply observer to reveal elements
    document.querySelectorAll('.reveal').forEach(function (el) {

        ro.observe(el);

    });


    // ==============================
    // 4. ACTIVE NAVIGATION LINK
    // ==============================

    var links = document.querySelectorAll('nav a');

    var so = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    links.forEach(function (link) {

                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === '#' + entry.target.id
                        );

                    });

                }

            });

        },

        {
            rootMargin: '-40% 0px -55% 0px'
        }

    );

    // Observe all main sections
    document.querySelectorAll('main section[id]').forEach(function (section) {

        so.observe(section);

    });

})();
