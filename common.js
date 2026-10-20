/**
 * REAP 2027 - Common Navigation & Footer Components
 * Dynamically renders the identical, responsive navbar and footer across all pages.
 */

(function () {
    'use strict';

    // Environment & protocol-aware URL resolution (handles file:/// and clean URLs)
    const isFileProtocol = window.location.protocol === 'file:';
    const homeUrl = isFileProtocol ? 'index.html' : '/';
    const regUrl = isFileProtocol ? 'registration.html' : '/registration';
    const counselUrl = isFileProtocol ? 'counselling.html' : '/counselling';

    // Determine current active page ('home', 'registration', or 'counselling')
    function getActivePage() {
        const bodyPage = document.body.getAttribute('data-page');
        if (bodyPage) return bodyPage.toLowerCase();

        const path = window.location.pathname.toLowerCase();
        if (path.includes('registration')) return 'registration';
        if (path.includes('counselling')) return 'counselling';
        return 'home';
    }

    // Generate Common Navbar HTML (Identical across all pages with active page highlight)
    function getNavbarHTML(page) {
        return `
        <div class="container nav-inner">
            <a href="${homeUrl}" class="brand-logo" aria-label="REAP 2027">
                <div><span class="brand-title">REAP 2027</span></div>
            </a>
            <nav class="nav-menu" id="navMenu" aria-label="Main Navigation">
                <a href="${homeUrl}" class="nav-link ${page === 'home' ? 'active' : ''}"><i class="fas fa-home"></i> Home</a>
                <a href="${regUrl}" class="nav-link ${page === 'registration' ? 'active' : ''}" style="color:var(--primary);font-weight:700;"><i class="fas fa-edit"></i> Registration</a>
                <a href="${counselUrl}" class="nav-link ${page === 'counselling' ? 'active' : ''}" style="color:var(--emerald);font-weight:700;"><i class="fas fa-compass"></i> Counselling</a>
                <a href="${homeUrl}#merit" class="nav-link">Merit List</a>
                <a href="${homeUrl}#eligibility" class="nav-link">Eligibility</a>
                <a href="${homeUrl}#quotas" class="nav-link">Reservation</a>
                <a href="${homeUrl}#dates" class="nav-link">Dates</a>
                <a href="${homeUrl}#cutoffs" class="nav-link">Cutoffs</a>
            </nav>
            <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle navigation menu" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        `;
    }

    // Generate Common Footer HTML (Identical across all pages)
    function getFooterHTML() {
        return `
        <div class="container">
            <nav aria-label="Footer Navigation">
                <ul class="footer-nav">
                    <li><a href="${homeUrl}">Home</a></li>
                    <li><a href="${regUrl}">Registration</a></li>
                    <li><a href="${homeUrl}#eligibility">Eligibility Criteria</a></li>
                    <li><a href="${homeUrl}#quotas">Seat Reservation</a></li>
                    <li><a href="${homeUrl}#dates">Important Dates</a></li>
                    <li><a href="${homeUrl}#roadmap">Counselling Process</a></li>
                    <li><a href="${homeUrl}#cutoffs">College Cutoffs</a></li>
                </ul>
            </nav>
        </div>
        `;
    }

    // Initialize Mobile Navigation and Smooth In-Page Anchor Scrolling
    function initMobileNav() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        if (!mobileToggle || !navMenu) return;

        // Clean up duplicate listeners by cloning
        const newToggle = mobileToggle.cloneNode(true);
        mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);

        newToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            newToggle.setAttribute('aria-expanded', isOpen);
            const icon = newToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                navMenu.classList.remove('active');
                const icon = newToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
                newToggle.setAttribute('aria-expanded', 'false');

                // Smooth scroll for anchors on the current page
                const href = link.getAttribute('href');
                if (href && href.includes('#')) {
                    const hashIndex = href.indexOf('#');
                    const linkPath = href.substring(0, hashIndex);
                    const targetId = href.substring(hashIndex + 1);

                    const isCurrentPageAnchor = !linkPath ||
                        linkPath === window.location.pathname ||
                        (linkPath === homeUrl && getActivePage() === 'home') ||
                        (linkPath === regUrl && getActivePage() === 'registration') ||
                        (linkPath === counselUrl && getActivePage() === 'counselling');

                    if (isCurrentPageAnchor && targetId) {
                        const targetEl = document.getElementById(targetId);
                        if (targetEl) {
                            e.preventDefault();
                            targetEl.scrollIntoView({ behavior: 'smooth' });
                            history.pushState(null, '', '#' + targetId);
                        }
                    }
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !newToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = newToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
                newToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Mount Navbar and Footer into placeholders
    function mountCommonComponents() {
        const page = getActivePage();

        // Mount Header
        const header = document.getElementById('site-header') || document.querySelector('.site-nav');
        if (header) {
            header.innerHTML = getNavbarHTML(page);
        }

        // Mount Footer
        const footer = document.getElementById('site-footer') || document.querySelector('.site-footer');
        if (footer) {
            footer.innerHTML = getFooterHTML();
        }

        // Initialize mobile menu actions & smooth scrolling
        initMobileNav();
    }

    // Expose REAPCommon API to global scope
    window.REAPCommon = {
        mount: mountCommonComponents,
        initMobileNav: initMobileNav,
        getActivePage: getActivePage,
        getNavbarHTML: getNavbarHTML,
        getFooterHTML: getFooterHTML
    };

    // Auto-mount when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountCommonComponents);
    } else {
        mountCommonComponents();
    }
})();
