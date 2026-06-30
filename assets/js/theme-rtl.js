// Theme & RTL Controller for DentScale platform

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialise State from LocalStorage (Astro-Clinical Default is Dark)
    const currentTheme = localStorage.getItem('dentscale_theme') || 'dark';
    const currentDir = localStorage.getItem('dentscale_dir') || 'ltr';

    // Apply states
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('dir', currentDir);

    // Update body classes if clinic page is active
    if (window.location.pathname.includes('clinic')) {
        document.body.classList.add('clinic-theme');
    }

    // 2. Insert Toggle Controller Bar inside navigation containers
    const injectControls = () => {
        const containers = document.querySelectorAll('.theme-rtl-controls');
        containers.forEach(container => {
            if (container.children.length > 0) return; // Prevent double injection

            container.innerHTML = `
                <button id="theme-toggle" class="control-btn" aria-label="Toggle Theme">
                    <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                    <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
                </button>
                <button id="rtl-toggle" class="control-btn" aria-label="Toggle RTL">
                    <svg class="rtl-text" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="21" y1="6" x2="3" y2="6"></line>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                        <line x1="21" y1="18" x2="6" y2="18"></line>
                    </svg>
                    <svg class="ltr-text" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="15" y2="12"></line>
                        <line x1="3" y1="18" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;

            // Event Listeners for new buttons
            const themeBtn = container.querySelector('#theme-toggle');
            const rtlBtn = container.querySelector('#rtl-toggle');

            themeBtn.addEventListener('click', toggleTheme);
            rtlBtn.addEventListener('click', toggleRTL);
        });
    };

    // Helper functions
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('dentscale_theme', next);

        // Dispatch theme changed event for charts to redraw
        window.dispatchEvent(new CustomEvent('themechanged', { detail: next }));
    }

    function toggleRTL() {
        const current = document.documentElement.getAttribute('dir');
        const next = current === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', next);
        localStorage.setItem('dentscale_dir', next);

        // Dispatch dir changed event
        window.dispatchEvent(new CustomEvent('dirchanged', { detail: next }));
    }

    // Run injection
    injectControls();

    // Re-check periodically or on page additions
    const observer = new MutationObserver(injectControls);
    observer.observe(document.body, { childList: true, subtree: true });
});
