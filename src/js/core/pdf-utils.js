import { APP } from './state.js';

// Init PDF.js Worker & Utilities (Cross-Browser Fix)
try {
    if (window.pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        APP.pdfjsReady = true;
    }
} catch (e) { console.error("PDF.js Init Error", e); }

// Polyfill for Older Browsers (Safari 13, older Android WebViews) that don't support file.arrayBuffer()
async function getFileBuffer(file) {
    if (typeof file.arrayBuffer === 'function') {
        return await file.arrayBuffer();
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

// --- Content & i18n Dictionary ---

export { getFileBuffer };
