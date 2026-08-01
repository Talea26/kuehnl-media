/* ======================================================
   KUEHNL MEDIA
   Premium Website
   script.js
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* ==========================================
       ELEMENTE
    ========================================== */

    const header = document.querySelector(".header");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const heroButtons = document.querySelectorAll(".hero a[href^='#']");
    const sections = document.querySelectorAll("section[id]");
    const contactForm = document.querySelector(".contact-form");
    const footerYear = document.querySelector(".footer-year");

    /* ==========================================
       AKTUELLES JAHR
    ========================================== */

    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    /* ==========================================
       MOBILE MENÜ
    ========================================== */

    if (mobileMenu && navLinks) {

        mobileMenu.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");
            navLinks.classList.toggle("active");
            document.body.classList.toggle("menu-open");

        });

    }

    /* ==========================================
       MENÜ SCHLIESSEN
    ========================================== */

    function closeMenu() {

        if (mobileMenu)
            mobileMenu.classList.remove("active");

        if (navLinks)
            navLinks.classList.remove("active");

        document.body.classList.remove("menu-open");

    }

    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    function scrollToSection(id) {

    const target = document.querySelector(id);

    if (!target) return;

    const headerHeight = header.offsetHeight;

    const y =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        - 120;

    window.scrollTo({
        top: y,
        behavior: "smooth"
    });

}

    navItems.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            scrollToSection(link.getAttribute("href"));

            closeMenu();

        });

    });

    heroButtons.forEach(button => {

        button.addEventListener("click", e => {

            e.preventDefault();

            scrollToSection(button.getAttribute("href"));

        });

    });

    /* ==========================================
       NAVBAR
    ========================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader);

    /* ==========================================
       AKTIVER MENÜPUNKT
    ========================================== */

    function updateNavigation() {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 180;

            if (window.scrollY >= top) {

                current = section.id;

            }

        });

        navItems.forEach(link => {

            link.classList.remove("current");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("current");

            }

        });

    }

    updateNavigation();

    window.addEventListener("scroll", updateNavigation);
        /* ==========================================
       SCROLL ANIMATIONEN
    ========================================== */

    const animatedElements = document.querySelectorAll(
        ".section-header, .portfolio-card, .service-card, .logo-box, .about-image, .about-content, .highlight, .testimonial-card, .contact-form"
    );

    if (animatedElements.length > 0) {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        animatedElements.forEach(element => {

            element.classList.add("hidden");

            observer.observe(element);

        });

    }

    /* ==========================================
       HERO PARALLAX
    ========================================== */

    const heroImage = document.querySelector(".hero-image");

    let ticking = false;

    function heroParallax() {

        if (!heroImage) return;

        heroImage.style.transform =
            `translateY(${window.scrollY * 0.18}px) scale(1.05)`;

        ticking = false;

    }

    window.addEventListener("scroll", () => {

        if (!ticking) {

            requestAnimationFrame(heroParallax);

            ticking = true;

        }

    });

    /* ==========================================
       HERO EINBLENDEN
    ========================================== */

    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {

        requestAnimationFrame(() => {

            heroContent.classList.add("loaded");

        });

    }

    /* ==========================================
       BUTTON HOVER
    ========================================== */

    document.querySelectorAll(".btn-primary").forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.classList.add("glow");

        });

        button.addEventListener("mouseleave", () => {

            button.classList.remove("glow");

        });

    });

    /* ==========================================
       PORTFOLIO KARTEN
    ========================================== */

    document.querySelectorAll(".portfolio-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("active");

        });

        card.addEventListener("mouseleave", () => {

            card.classList.remove("active");

        });

    });

        /* ==========================================
       SCROLL TO TOP BUTTON
    ========================================== */

    const scrollButton = document.createElement("button");

    scrollButton.className = "scroll-top";

    scrollButton.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(scrollButton);

    function toggleScrollButton() {

        if (window.scrollY > 500) {

            scrollButton.classList.add("visible");

        } else {

            scrollButton.classList.remove("visible");

        }

    }

    toggleScrollButton();

    window.addEventListener("scroll", toggleScrollButton);

    scrollButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* ==========================================
       KONTAKTFORMULAR
    ========================================== */

    if (contactForm) {

        contactForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const submitButton =
                contactForm.querySelector("button");

            if (!submitButton) return;

            const originalText =
                submitButton.innerHTML;

            submitButton.disabled = true;

            submitButton.innerHTML =
                "Nachricht gesendet ✓";

            setTimeout(() => {

                contactForm.reset();

                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalText;

            }, 3000);

        });

    }

    /* ==========================================
       BILDER LAZY LOADING
    ========================================== */

    const images =
        document.querySelectorAll("img[data-src]");

    if (images.length > 0) {

        const imageObserver =
            new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const image = entry.target;

                    image.src = image.dataset.src;

                    image.onload = () => {

                        image.classList.add("loaded");

                    };

                    imageObserver.unobserve(image);

                });

            });

        images.forEach(image => {

            imageObserver.observe(image);

        });

    }

    /* ==========================================
       LOGO ANIMATION
    ========================================== */

    const logo =
        document.querySelector(".logo");

    if (logo) {

        logo.addEventListener("mouseenter", () => {

            logo.style.transform = "scale(1.03)";

        });

        logo.addEventListener("mouseleave", () => {

            logo.style.transform = "scale(1)";

        });

    }

    /* ==========================================
       KONSOLE
    ========================================== */

    console.log("Kuehnl Media Premium Website erfolgreich geladen.");
        /* ==========================================
       RESIZE EVENTS
    ========================================== */

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            updateHeader();
            updateNavigation();

        }, 150);

    });

    /* ==========================================
       KEYBOARD NAVIGATION
    ========================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });

    /* ==========================================
       PERFORMANCE
    ========================================== */

    window.addEventListener("load", () => {

        document.body.classList.add("loaded");

    });

    /* ==========================================
       FEHLERBEHANDLUNG VIDEOS
    ========================================== */

    document.querySelectorAll("video").forEach(video => {

        video.addEventListener("error", () => {

            console.warn("Video konnte nicht geladen werden.");

        });

    });

    /* ==========================================
       BROWSER INFO
    ========================================== */

    console.log("%cKuehnl Media",
        "font-size:22px;font-weight:bold;color:#C68923;");

    console.log("Website erfolgreich initialisiert.");

});