const THEME_KEY = 'wpdf-theme';
const THEMES = new Set(['light', 'dark']);

function getSystemTheme() {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme() {
    try {
        const stored = localStorage.getItem(THEME_KEY);
        return THEMES.has(stored) ? stored : null;
    } catch {
        return null;
    }
}

function getInitialTheme() {
    return getStoredTheme() || window.__wpdfTheme || getSystemTheme();
}

function applyTheme(theme) {
    const nextTheme = THEMES.has(theme) ? theme : 'light';
    const isDark = nextTheme === 'dark';

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
        themeColor.setAttribute('content', isDark ? '#0b1120' : '#ffffff');
    }

    const themeBtn = document.querySelector('#themeBtn');
    if (themeBtn) {
        themeBtn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
        themeBtn.setAttribute(
            'aria-label',
            isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'
        );
        themeBtn.setAttribute(
            'title',
            isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'
        );
    }

    document.documentElement.classList.add('theme-ready');
    return nextTheme;
}

function setTheme(theme) {
    const nextTheme = THEMES.has(theme) ? theme : getSystemTheme();
    try {
        localStorage.setItem(THEME_KEY, nextTheme);
    } catch {
        // Continue without persistence when storage is unavailable.
    }
    return applyTheme(nextTheme);
}

function toggleTheme(currentTheme) {
    return setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

export {
    getInitialTheme,
    getSystemTheme,
    applyTheme,
    setTheme,
    toggleTheme
};


const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
mediaQuery?.addEventListener?.('change', event => {
    if (!getStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
});
