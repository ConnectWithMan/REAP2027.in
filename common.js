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
    const collegesUrl = isFile ? 'colleges.html' : '/colleges';
    const eligUrl = isFile ? 'eligibility.html' : '/eligibility';
    const resUrl = isFile ? 'reservation.html' : '/reservation';
    const docsUrl = isFile ? 'documents.html' : '/documents';
    const cutoffUrl = isFile ? 'cutoff.html' : '/cutoff';

    // Determine current active page ('home', 'registration', 'counselling', 'allotment', 'colleges', 'eligibility', 'reservation', 'documents', or 'cutoff')
    function getActivePage() {
        const bodyPage = document.body.getAttribute('data-page');
        if (bodyPage) return bodyPage.toLowerCase();

        const path = window.location.pathname.toLowerCase();
        if (path.includes('allotment')) return 'allotment';
        if (path.includes('college')) return 'colleges';
        if (path.includes('document')) return 'documents';
        if (path.includes('reservation')) return 'reservation';
        if (path.includes('registration')) return 'registration';
        if (path.includes('counselling')) return 'counselling';
        if (path.includes('eligibility')) return 'eligibility';
        if (path.includes('cutoff')) return 'cutoff';
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
                <a href="${collegesUrl}" class="nav-link ${page === 'colleges' ? 'active' : ''}"><i class="fas fa-university"></i> Colleges</a>
                <a href="${eligUrl}" class="nav-link ${page === 'eligibility' ? 'active' : ''}"><i class="fas fa-check-circle"></i> Eligibility</a>
                <a href="${resUrl}" class="nav-link ${page === 'reservation' ? 'active' : ''}"><i class="fas fa-users"></i> Reservation</a>
                <a href="${docsUrl}" class="nav-link ${page === 'documents' ? 'active' : ''}"><i class="fas fa-file-invoice"></i> Documents</a>
                <a href="${cutoffUrl}" class="nav-link ${page === 'cutoff' ? 'active' : ''}"><i class="fas fa-chart-line"></i> Cutoffs</a>
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
                <a href="${collegesUrl}">Colleges</a>
                <a href="${eligUrl}">Eligibility</a>
                <a href="${resUrl}">Reservation</a>
                <a href="${docsUrl}">Documents</a>
                <a href="${cutoffUrl}">Cutoffs</a>
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
                        (linkPath.includes('college') && currentPage === 'colleges') ||
                        (linkPath.includes('cutoff') && currentPage === 'cutoff') ||
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

    // Inject comprehensive, modern responsive and component styles across all pages
    function injectCommonStyles() {
        if (document.getElementById('reap-common-styles')) return;
        const style = document.createElement('style');
        style.id = 'reap-common-styles';
        style.textContent = `
            /* ============================================================
               GLOBAL VIEWPORT & OVERFLOW SAFETY
               ============================================================ */
            html, body {
                overflow-x: hidden !important;
                width: 100% !important;
                max-width: 100vw !important;
                -webkit-text-size-adjust: 100%;
            }
            *, *::before, *::after {
                box-sizing: border-box;
            }

            /* Responsive media elements */
            img, svg, video, canvas, audio, iframe {
                max-width: 100% !important;
                height: auto !important;
            }

            /* ============================================================
               UNIVERSAL BUTTONS & TOUCH TARGETS
               ============================================================ */
            .btn, button, .filter-chip, a.btn, a.status-tag {
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
                box-sizing: border-box !important;
            }

            /* Prevent long text buttons and tags from overflowing viewports */
            .btn, a.btn {
                max-width: 100% !important;
            }

            .status-tag, a.status-tag {
                max-width: 100% !important;
                box-sizing: border-box !important;
            }

            /* ============================================================
               COMMON FOOTER STYLING
               ============================================================ */
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
                padding: 0.35rem 0.65rem !important;
                border-radius: 4px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                min-height: 38px !important;
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

            /* ============================================================
               RESPONSIVE BREAKPOINTS (TABLETS & MOBILE <= 992PX)
               ============================================================ */
            @media (max-width: 992px) {
                .site-nav .nav-inner {
                    position: relative !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: space-between !important;
                }
                .site-nav .mobile-toggle,
                .mobile-toggle,
                #mobileToggle {
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    width: 44px !important;
                    height: 44px !important;
                    min-width: 44px !important;
                    min-height: 44px !important;
                    cursor: pointer !important;
                    border: 1.5px solid #94a3b8 !important;
                    border-radius: 8px !important;
                    background: #f1f5f9 !important;
                    color: #0f172a !important;
                    padding: 0 !important;
                    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.1) !important;
                    z-index: 1002 !important;
                    outline: none !important;
                    transition: all 0.2s ease !important;
                }
                .site-nav .mobile-toggle i,
                .mobile-toggle i,
                #mobileToggle i {
                    color: #0f172a !important;
                    font-size: 1.25rem !important;
                    line-height: 1 !important;
                    display: inline-block !important;
                }
                .site-nav .mobile-toggle:hover,
                .site-nav .mobile-toggle:focus,
                .mobile-toggle:hover,
                .mobile-toggle:focus,
                .site-nav .mobile-toggle[aria-expanded="true"],
                .mobile-toggle[aria-expanded="true"] {
                    background: #eff6ff !important;
                    color: #1d4ed8 !important;
                    border-color: #3b82f6 !important;
                }
                .site-nav .mobile-toggle:hover i,
                .site-nav .mobile-toggle:focus i,
                .mobile-toggle:hover i,
                .mobile-toggle:focus i,
                .site-nav .mobile-toggle[aria-expanded="true"] i,
                .mobile-toggle[aria-expanded="true"] i {
                    color: #1d4ed8 !important;
                }
                .site-nav .nav-menu {
                    display: none;
                    flex-direction: column !important;
                    position: absolute !important;
                    top: 100% !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    max-height: calc(100vh - 72px) !important;
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                    background: #ffffff !important;
                    padding: 0.85rem 1rem !important;
                    border-bottom: 2px solid #cbd5e1 !important;
                    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.18) !important;
                    gap: 0.35rem !important;
                    z-index: 99999 !important;
                    box-sizing: border-box !important;
                }
                .site-nav .nav-menu.active {
                    display: flex !important;
                }
                .site-nav .nav-link {
                    width: 100% !important;
                    padding: 0.75rem 1rem !important;
                    min-height: 44px !important;
                    font-size: 0.95rem !important;
                    font-weight: 600 !important;
                    border-radius: 8px !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 0.75rem !important;
                    color: #1e293b !important;
                    text-decoration: none !important;
                    box-sizing: border-box !important;
                    border: 1px solid #e2e8f0 !important;
                    background: #f8fafc !important;
                    transition: all 0.15s ease !important;
                }
                .site-nav .nav-link:hover,
                .site-nav .nav-link.active {
                    background: #eff6ff !important;
                    color: #1d4ed8 !important;
                    border-color: #93c5fd !important;
                }
            }

            /* ============================================================
               RESPONSIVE BREAKPOINTS (<= 768PX)
               ============================================================ */
            @media (max-width: 768px) {
                /* Allow button text to wrap smoothly on smaller viewports */
                .btn, a.btn {
                    white-space: normal !important;
                    word-break: break-word !important;
                    overflow-wrap: break-word !important;
                    text-align: center !important;
                    line-height: 1.35 !important;
                }
                .status-tag, a.status-tag {
                    white-space: normal !important;
                    word-break: break-word !important;
                    overflow-wrap: break-word !important;
                    line-height: 1.35 !important;
                    text-align: center !important;
                }

                /* Tables & Overflow wrappers */
                .table-responsive {
                    width: 100% !important;
                    max-width: 100% !important;
                    overflow-x: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                    display: block !important;
                    box-sizing: border-box !important;
                    margin: 1.25rem 0 !important;
                }
                .data-table {
                    min-width: 100% !important;
                    box-sizing: border-box !important;
                }
                .data-table th,
                .data-table td {
                    padding: 0.65rem 0.75rem !important;
                    font-size: 0.82rem !important;
                }

                /* Grid collapses */
                .grid-2,
                .grid-3,
                .grid-4,
                .hero-cards-wrapper {
                    grid-template-columns: 1fr !important;
                }

                /* Site footer on tablet/mobile */
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
                    white-space: normal !important;
                }
            }

            /* ============================================================
               RESPONSIVE BREAKPOINTS (SMARTPHONES <= 576PX)
               ============================================================ */
            @media (max-width: 576px) {
                .container {
                    padding-left: 1rem !important;
                    padding-right: 1rem !important;
                    box-sizing: border-box !important;
                }

                /* Button Groups Stack Full-Width for Easy Thumb Tapping */
                .hero-cta-group,
                .hero-actions,
                .callout-cta-group,
                .btn-group,
                .cta-actions,
                .calc-actions,
                .evaluator-actions,
                .sim-actions,
                .dossier-actions {
                    display: flex !important;
                    flex-direction: column !important;
                    width: 100% !important;
                    gap: 0.65rem !important;
                }

                .hero-cta-group .btn,
                .hero-actions .btn,
                .callout-cta-group .btn,
                .btn-group .btn,
                .cta-actions .btn,
                .calc-actions .btn,
                .evaluator-actions .btn,
                .sim-actions .btn,
                .dossier-actions .btn {
                    width: 100% !important;
                    min-height: 44px !important;
                    display: flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    text-align: center !important;
                    margin: 0 !important;
                    padding: 0.65rem 1rem !important;
                    box-sizing: border-box !important;
                }

                /* Filter buttons & chips responsive grids */
                .filter-buttons {
                    width: 100% !important;
                    display: grid !important;
                    grid-template-columns: repeat(2, 1fr) !important;
                    gap: 0.45rem !important;
                }
                .filter-buttons .btn {
                    width: 100% !important;
                    min-height: 40px !important;
                    padding: 0.45rem 0.5rem !important;
                    font-size: 0.8rem !important;
                    text-align: center !important;
                }
                .filter-chips-bar {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 0.45rem !important;
                    width: 100% !important;
                }
                .filter-chip {
                    min-height: 38px !important;
                    padding: 0.4rem 0.75rem !important;
                    font-size: 0.8rem !important;
                }

                /* Form Controls (16px font-size prevents iOS Safari auto-zoom) */
                .form-control,
                .form-select,
                input[type="text"],
                input[type="number"],
                input[type="email"],
                select,
                textarea {
                    font-size: 16px !important;
                    min-height: 44px !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    box-sizing: border-box !important;
                }

                .filter-bar {
                    flex-direction: column !important;
                    align-items: stretch !important;
                    gap: 0.75rem !important;
                    padding: 0.85rem !important;
                }
                .filter-item {
                    width: 100% !important;
                    min-width: 0 !important;
                }

                /* Card containers padding */
                .card,
                .choice-card,
                .college-card,
                .step-content,
                .hero-info-card,
                .simulator-box,
                .checklist-container,
                .calc-body,
                .calc-header,
                .builder-sidebar,
                .check-card,
                .dossier-card {
                    max-width: 100% !important;
                    box-sizing: border-box !important;
                    padding: 1.15rem 1rem !important;
                }

                /* Typography scaling */
                .hero-title {
                    font-size: 1.6rem !important;
                    line-height: 1.25 !important;
                }
                .hero-title span {
                    font-size: 1.2rem !important;
                }
                .section-title {
                    font-size: 1.45rem !important;
                }
                .section-subtitle,
                .hero-desc {
                    font-size: 0.88rem !important;
                }

                .data-table th,
                .data-table td {
                    padding: 0.55rem 0.65rem !important;
                    font-size: 0.78rem !important;
                }
            }

            /* ============================================================
               RESPONSIVE BREAKPOINTS (SMALL MOBILE <= 400PX)
               ============================================================ */
            @media (max-width: 400px) {
                .container {
                    padding-left: 0.75rem !important;
                    padding-right: 0.75rem !important;
                }
                .brand-title {
                    font-size: 1.1rem !important;
                }
                .hero-title {
                    font-size: 1.4rem !important;
                }
                .section-title {
                    font-size: 1.3rem !important;
                }
                .filter-buttons {
                    grid-template-columns: 1fr !important;
                }
                .filter-chip {
                    flex: 1 1 calc(50% - 0.45rem);
                    text-align: center;
                    justify-content: center;
                }
                .card,
                .choice-card,
                .college-card,
                .step-content,
                .hero-info-card,
                .simulator-box,
                .checklist-container,
                .calc-body,
                .calc-header,
                .builder-sidebar,
                .check-card,
                .dossier-card {
                    padding: 1rem 0.75rem !important;
                }
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

    // Auto-wrap any unwrapped tables in .table-responsive container
    function ensureResponsiveTables() {
        document.querySelectorAll('table').forEach(table => {
            if (!table.parentElement || !table.parentElement.classList.contains('table-responsive')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-responsive';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }

    // Mount Navbar, Footer, Styles and Responsiveness
    function mountCommonComponents() {
        injectCommonStyles();
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

        // Ensure all tables are scrollable on mobile
        ensureResponsiveTables();
    }

    // Expose REAPCommon API to global scope
    window.REAPCommon = {
        mount: mountCommonComponents,
        initMobileNav: initMobileNav,
        getActivePage: getActivePage,
        getNavbarHTML: getNavbarHTML,
        getFooterHTML: getFooterHTML,
        ensureResponsiveTables: ensureResponsiveTables
    };

    // Auto-mount when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountCommonComponents);
    } else {
        mountCommonComponents();
    }
})();
