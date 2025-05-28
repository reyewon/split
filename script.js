// Mobile Menu Toggle
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenuPanel = document.getElementById('mobile-menu-panel');
if (menuButton && mobileMenuPanel) {
    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
        menuButton.setAttribute('aria-expanded', !isExpanded);
        mobileMenuPanel.classList.toggle('hidden');
    });
    // Close mobile menu when a link is clicked
    mobileMenuPanel.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuPanel.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

// Back to Top Button
const backToTopButton = document.getElementById('backToTopBtn');
if (backToTopButton) {
    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

// Active Day Link Highlight on Scroll
const sections = document.querySelectorAll('main section[id^="day"], main section[id="prep"]');
const navLinks = document.querySelectorAll('header nav a.nav-link, #mobile-menu-panel a.nav-link');

if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '-40% 0px -60% 0px', // Adjusted to better catch when section is prominent
        threshold: 0 // Trigger as soon as any part of the section is visible within the rootMargin
    };

    const activateLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active-day-link');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active-day-link');
            }
        });
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Also highlight on click for immediate feedback
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Let the default anchor link behavior happen
            // Then, after a very short delay, ensure the correct link is active
            // This helps if the scroll event doesn't fire immediately or precisely
            setTimeout(() => {
                const targetId = link.getAttribute('href').substring(1);
                activateLink(targetId); // Use the activateLink function for consistency

                // Also close mobile menu if open and it's a mobile link
                if (mobileMenuPanel && !mobileMenuPanel.classList.contains('hidden') && link.closest('#mobile-menu-panel')) {
                   mobileMenuPanel.classList.add('hidden');
                   menuButton.setAttribute('aria-expanded', 'false');
                }
            }, 50); // 50ms delay, adjust if needed
        });
    });
}

console.log("JavaScript file loaded for Poland Itinerary with enhancements.");
