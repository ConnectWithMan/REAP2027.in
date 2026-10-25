/**
 * REAP 2027 - Common Navigation & Footer Components
 * Dynamically renders the identical, responsive navbar and footer across all pages.
 */

(function () {
    'use strict';

    // Clean URL routing across all pages
    const isFile = window.location.protocol === 'file:' || !window.location.hostname;
    const homeUrl = isFile ? 'index.html' : '/';
    const regUrl = isFile ? 'registration.html' : '/registration';
    const counselUrl = isFile ? 'counselling.html' : '/counselling';
    const allotUrl = isFile ? 'seat-allotment.html' : '/seat-allotment';
    const eligUrl = isFile ? 'eligibility.html' : '/eligibility';
    const resUrl = isFile ? 'reservation.html' : '/reservation';
    const docsUrl = isFile ? 'documents.html' : '/documents';

    // Determine current active page ('home', 'registration', 'counselling', 'allotment', 'eligibility', 'reservation', or 'documents')
    function getActivePage() {
        const bodyPage = document.body.getAttribute('data-page');
        if (bodyPage) return bodyPage.toLowerCase();

        const path = window.location.pathname.toLowerCase();
        if (path.includes('allotment')) return 'allotment';
        if (path.includes('document')) return 'documents';
        if (path.includes('reservation')) return 'reservation';
        if (path.includes('registration')) return 'registration';
        if (path.includes('counselling')) return 'counselling';
        if (path.includes('eligibility')) return 'eligibility';
        return 'home';
    }

    // Generate Common Navbar HTML (Identical across all pages with active page highlight)
    function getNavbarHTML(page) {
        return `
        <div class="container nav-inner">
            <a href="${homeUrl}" class="brand-logo" aria-label="REAP 2027 Admission Portal Home">
                <div><span class="brand-title">REAP 2027</span></div>
            </a>
            <nav class="nav-menu" id="navMenu" aria-label="Main Navigation">
                <a href="${homeUrl}" class="nav-link ${page === 'home' ? 'active' : ''}"><i class="fas fa-home"></i> Home</a>
                <a href="${regUrl}" class="nav-link ${page === 'registration' ? 'active' : ''}"><i class="fas fa-edit"></i> Registration</a>
                <a href="${counselUrl}" class="nav-link ${page === 'counselling' ? 'active' : ''}"><i class="fas fa-compass"></i> Counselling</a>
                <a href="${allotUrl}" class="nav-link ${page === 'allotment' ? 'active' : ''}"><i class="fas fa-chair"></i> Seat Allotment</a>
                <a href="${eligUrl}" class="nav-link ${page === 'eligibility' ? 'active' : ''}"><i class="fas fa-check-circle"></i> Eligibility</a>
                <a href="${resUrl}" class="nav-link ${page === 'reservation' ? 'active' : ''}"><i class="fas fa-users"></i> Reservation</a>
                <a href="${docsUrl}" class="nav-link ${page === 'documents' ? 'active' : ''}"><i class="fas fa-file-invoice"></i> Documents</a>
                <a href="${homeUrl}#merit" class="nav-link"><i class="fas fa-list-ol"></i> Merit List</a>
                <a href="${homeUrl}#dates" class="nav-link"><i class="fas fa-calendar-alt"></i> Dates</a>
                <a href="${homeUrl}#cutoffs" class="nav-link"><i class="fas fa-chart-line"></i> Cutoffs</a>
            </nav>
            <button class="mobile-toggle" id="mobileToggle" aria-label="Toggle navigation menu" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        `;
    }

    // Generate Clean & Simple Common Footer HTML
    function getFooterHTML() {
        return `
        <div class="container">
            <nav class="footer-nav" aria-label="Footer Navigation">
                <a href="${homeUrl}">Home</a>
                <a href="${regUrl}">Registration</a>
                <a href="${counselUrl}">Counselling</a>
                <a href="${allotUrl}">Seat Allotment</a>
                <a href="${eligUrl}">Eligibility</a>
                <a href="${resUrl}">Reservation</a>
                <a href="${docsUrl}">Documents</a>
                <a href="${homeUrl}#dates">Dates</a>
                <a href="${homeUrl}#cutoffs">Cutoffs</a>
            </nav>
            <p class="footer-copy">
                &copy; 2027 REAP Admission Guide. All official updates subject to CEG Rajasthan.
            </p>
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

                    const currentPage = getActivePage();
                    const isCurrentPageAnchor = !linkPath ||
                        linkPath === window.location.pathname ||
                        linkPath === window.location.pathname.replace(/\/$/, '') ||
                        (linkPath === '/' && currentPage === 'home') ||
                        (linkPath.includes('index') && currentPage === 'home') ||
                        (linkPath.includes('registration') && currentPage === 'registration') ||
                        (linkPath.includes('counselling') && currentPage === 'counselling') ||
                        (linkPath.includes('eligibility') && currentPage === 'eligibility') ||
                        (linkPath.includes('reservation') && currentPage === 'reservation') ||
                        (linkPath.includes('allotment') && currentPage === 'allotment') ||
                        (linkPath.includes('document') && currentPage === 'documents');

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

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !newToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = newToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
                newToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close on Escape key for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = newToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
                newToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Inject simple, modern footer styling with symmetrical alignment
    function injectFooterStyles() {
        if (document.getElementById('reap-common-footer-style')) return;
        const style = document.createElement('style');
        style.id = 'reap-common-footer-style';
        style.textContent = `
            .site-footer {
                background: #090d16 !important;
                color: #94a3b8 !important;
                padding: 2.25rem 1rem 2rem !important;
                border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
                text-align: center !important;
                width: 100% !important;
                box-sizing: border-box !important;
            }
            .site-footer .container {
                max-width: 1200px !important;
                margin: 0 auto !important;
                padding: 0 1rem !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                box-sizing: border-box !important;
            }
            .site-footer .footer-nav {
                list-style: none !important;
                padding: 0 !important;
                margin: 0 auto 1.25rem auto !important;
                display: flex !important;
                justify-content: center !important;
                align-items: center !important;
                flex-wrap: wrap !important;
                gap: 0.6rem 1.6rem !important;
                max-width: 960px !important;
                width: 100% !important;
                text-align: center !important;
            }
            .site-footer .footer-nav li {
                display: inline-block !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .site-footer .footer-nav a {
                color: #cbd5e1 !important;
                font-size: 0.9rem !important;
                font-weight: 500 !important;
                text-decoration: none !important;
                white-space: nowrap !important;
                padding: 0.3rem 0.6rem !important;
                border-radius: 4px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: color 0.15s ease, background 0.15s ease !important;
            }
            .site-footer .footer-nav a:hover {
                color: #38bdf8 !important;
                background: rgba(255, 255, 255, 0.05) !important;
            }
            .site-footer .footer-copy {
                margin: 0 !important;
                font-size: 0.82rem !important;
                color: #64748b !important;
                line-height: 1.5 !important;
                text-align: center !important;
                width: 100% !important;
            }
            @media (max-width: 768px) {
                .site-footer {
                    padding: 1.85rem 1rem 1.65rem !important;
                }
                .site-footer .footer-nav {
                    display: grid !important;
                    grid-template-columns: repeat(4, 1fr) !important;
                    gap: 0.5rem 0.5rem !important;
                    max-width: 520px !important;
                    margin: 0 auto 1.15rem auto !important;
                }
                .site-footer .footer-nav a {
                    font-size: 0.86rem !important;
                    padding: 0.35rem 0.25rem !important;
                }
            }
            @media (max-width: 480px) {
                .site-footer .footer-nav {
                    grid-template-columns: repeat(2, 1fr) !important;
                    max-width: 280px !important;
                    gap: 0.5rem 0.75rem !important;
                }
                .site-footer .footer-nav a {
                    font-size: 0.84rem !important;
                    justify-content: center !important;
                }
                .site-footer .footer-copy {
                    font-size: 0.78rem !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Mount Navbar and Footer into placeholders
    function mountCommonComponents() {
        injectFooterStyles();
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
