import { getInitialTheme } from './theme.js';

const APP = {
    lang: localStorage.getItem('wpdf-lang') || 'ar',
    theme: getInitialTheme(),
    files: [],
    currentTool: null,
    pdfjsReady: false
};

export { APP };
