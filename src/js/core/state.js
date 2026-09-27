const APP = {
    lang: localStorage.getItem('wpdf-lang') || 'ar',
    theme: localStorage.getItem('wpdf-theme') || 'dark',
    files: [],
    currentTool: null,
    pdfjsReady: false
};

export { APP };
