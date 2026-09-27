const storedTheme = localStorage.getItem('wpdf-theme');
const systemTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const initialTheme = storedTheme === 'light' || storedTheme === 'dark'
    ? storedTheme
    : (window.__wpdfTheme || systemTheme);

const APP = {
    lang: localStorage.getItem('wpdf-lang') || 'ar',
    theme: initialTheme,
    files: [],
    currentTool: null,
    pdfjsReady: false
};

export { APP };
