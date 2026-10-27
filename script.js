/* =====================================
   1. MENÚ PARA CELULARES
===================================== */

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll("#nav-links a");

function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    navLinks.classList.remove("is-open");
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Abrir menú" : "Cerrar menú"
        );

        navLinks.classList.toggle("is-open", !isOpen);
    });

    navItems.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 680) {
            closeMenu();
        }
    });
}


/* =====================================
   2. CARRUSEL DE IMÁGENES
===================================== */

const carousel = document.querySelector("#hero-carousel");

if (carousel) {
    const slides = Array.from(
        carousel.querySelectorAll(".carousel-slide")
    );

    const dots = Array.from(
        carousel.querySelectorAll(".carousel-dot")
    );

    const previousButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");
    const counter = carousel.querySelector(".carousel-counter");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let currentSlide = 0;
    let autoplayTimer = null;

    const totalSlides = slides.length;
    const autoplayDelay = 6000;

    function showSlide(index) {
        if (totalSlides === 0) return;

        currentSlide = (index + totalSlides) % totalSlides;

        slides.forEach((slide, position) => {
            const isActive = position === currentSlide;

            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach((dot, position) => {
            const isActive = position === currentSlide;

            dot.classList.toggle("is-active", isActive);

            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        if (counter) {
            const currentNumber = String(currentSlide + 1).padStart(2, "0");
            const totalNumber = String(totalSlides).padStart(2, "0");

            counter.textContent = `${currentNumber} / ${totalNumber}`;
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    function stopAutoplay() {
        if (autoplayTimer !== null) {
            window.clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
    }

    function startAutoplay() {
        stopAutoplay();

        if (
            prefersReducedMotion.matches ||
            document.hidden ||
            carousel.matches(":hover") ||
            carousel.contains(document.activeElement)
        ) {
            return;
        }

        autoplayTimer = window.setInterval(
            nextSlide,
            autoplayDelay
        );
    }

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            previousSlide();
            startAutoplay();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            nextSlide();
            startAutoplay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoplay();
        });
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) {
            startAutoplay();
        }
    });

    document.addEventListener("visibilitychange", startAutoplay);

    prefersReducedMotion.addEventListener("change", startAutoplay);

    showSlide(0);
    startAutoplay();
}


/* =====================================
   3. AÑO DEL PIE DE PÁGINA
===================================== */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}