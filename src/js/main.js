import { APP } from './core/state.js';
import { getFileBuffer } from './core/pdf-utils.js';
import { dict } from './core/i18n.js';
import { toolsData } from './core/tools.js';
import { $ } from './core/dom.js';

// PDF.js is loaded as a classic script before this ES module.
if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    APP.pdfjsReady = true;
}


// --- STREAMING_CHUNK:UI Updaters (i18n & Theme) ---
function renderGrid() {
    const grid = $('#toolsGrid');
    grid.innerHTML = toolsData.map(t => {
        const colors = {
            purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
            orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
            red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
            yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
        };
        return `
        <div class="tool-card bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-2xl p-5 cursor-pointer hover:border-primary hover:shadow-lg dark:hover:shadow-primary/5 transition-all group flex items-center gap-4" data-cat="${t.cat}" onclick="openTool('${t.id}')">
            <div class="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl transition-transform group-hover:scale-110 ${colors[t.color]}">
                <i class="fa-solid ${t.icon}"></i>
            </div>
            <div>
                <h3 class="font-bold text-gray-900 dark:text-white text-lg">${t[APP.lang].t}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">${t[APP.lang].d}</p>
            </div>
        </div>`;
    }).join('');
}

function applyLanguage() {
    document.documentElement.lang = APP.lang;
    document.documentElement.dir = APP.lang === 'ar' ? 'rtl' : 'ltr';
    $('#langBtn').textContent = APP.lang === 'ar' ? 'EN' : 'AR';
    
    // Text Replacements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[APP.lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                 el.placeholder = dict[APP.lang][key];
            } else {
                 el.innerHTML = dict[APP.lang][key]; // innerHTML used to keep icons/spans if present
            }
        }
    });
    
    // Special cases (innerHTML with links)
    $('#cookieText').innerHTML = dict[APP.lang].cookieMsg;

    renderGrid();
    if(APP.currentTool) {
        const tool = toolsData.find(t => t.id === APP.currentTool);
        $('#modalTitle').innerHTML = `<i class="fa-solid ${tool.icon} text-${tool.color}-500"></i> ${tool[APP.lang].t}`;
        $('#actionBtnText').textContent = dict[APP.lang][tool.actionBtn] || dict[APP.lang].btnActionExecute;
        updateExtraControlsLang();
    }
}

function applyTheme() {
    if (APP.theme === 'dark') {
        document.documentElement.classList.add('dark');
        $('#themeBtn').innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.documentElement.classList.remove('dark');
        $('#themeBtn').innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

// --- STREAMING_CHUNK:Event Listeners & Utils ---
$('#langBtn').onclick = () => { APP.lang = APP.lang === 'ar' ? 'en' : 'ar'; localStorage.setItem('wpdf-lang', APP.lang); applyLanguage(); };
$('#themeBtn').onclick = () => { APP.theme = APP.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('wpdf-theme', APP.theme); applyTheme(); };

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');
        document.querySelectorAll('.tool-card').forEach(card => {
            card.style.display = (cat === 'all' || card.getAttribute('data-cat') === cat) ? 'flex' : 'none';
        });
    };
});

window.onscroll = () => {
    const btn = $('#backTop');
    if (window.scrollY > 300) btn.classList.remove('opacity-0', 'pointer-events-none');
    else btn.classList.add('opacity-0', 'pointer-events-none');
};
$('#backTop').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

function showToast(msg, isError = false) {
    const t = $('#toast');
    $('#toastMsg').textContent = msg;
    $('#toastIcon').className = `fa-solid ${isError ? 'fa-circle-exclamation text-red-400' : 'fa-circle-check text-green-400'}`;
    t.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    setTimeout(() => t.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none'), 3500);
}

// --- STREAMING_CHUNK:Cookies & Content Modals (AdSense Setup) ---
function checkCookies() {
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            $('#cookieBanner').classList.remove('translate-y-full');
        }, 1000);
    }
}
function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    $('#cookieBanner').classList.add('translate-y-full');
}

function openPage(page) {
    const m = $('#pageModal');
    let titleStr = page === 'privacy' ? 'pagePrivacyTitle' : 'pageTermsTitle';
    let contentStr = page === 'privacy' ? 'pagePrivacyHtml' : 'pageTermsHtml';
    
    $('#pageTitle').textContent = dict[APP.lang][titleStr];
    $('#pageContent').innerHTML = dict[APP.lang][contentStr];
    
    m.classList.remove('modal-hidden');
}
function closePage() {
    $('#pageModal').classList.add('modal-hidden');
}
$('#pageModal').addEventListener('mousedown', e => { if (e.target === $('#pageModal')) closePage(); });

$('#contactForm').onsubmit = (e) => {
    e.preventDefault();
    // Simulate form submission to keep it frontend only
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<div class="spinner border-t-white"></div>`;
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        e.target.reset();
        showToast(dict[APP.lang].formSuccess);
    }, 1500);
};


// --- STREAMING_CHUNK:File Operations & Tool Modals ---
const modal = $('#modal');
const fileInput = $('#fileInput');
const dropzone = $('#dropzone');

function openTool(toolId) {
    APP.currentTool = toolId;
    APP.files = [];
    const tool = toolsData.find(t => t.id === toolId);
    
    $('#modalTitle').innerHTML = `<i class="fa-solid ${tool.icon} text-${tool.color}-500"></i> ${tool[APP.lang].t}`;
    $('#actionBtnText').textContent = dict[APP.lang][tool.actionBtn] || dict[APP.lang].btnActionExecute;
    
    const subType = tool.type === 'img' ? 'dropSubImg' : tool.type === 'excel' ? 'dropSubExcel' : 'dropSubPDF';
    $('#dropSubtitle').setAttribute('data-i18n', subType);
    $('#dropSubtitle').textContent = dict[APP.lang][subType];
    
    fileInput.accept = tool.accept;
    tool.multi ? fileInput.setAttribute('multiple', '') : fileInput.removeAttribute('multiple');
    
    renderFiles();
    $('#resultBox').classList.add('hidden');
    $('#statusText').textContent = '';
    $('#actionBtn').disabled = false;
    $('#actionBtn').innerHTML = `<span id="actionBtnText">${dict[APP.lang][tool.actionBtn] || dict[APP.lang].btnActionExecute}</span>`;
    
    buildExtraControls(toolId);
    modal.classList.remove('modal-hidden');
}

function closeTool() { modal.classList.add('modal-hidden'); APP.currentTool = null; APP.files = []; fileInput.value = ''; }
modal.addEventListener('mousedown', e => { if (e.target === modal) closeTool(); });

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => dropzone.addEventListener(evt, e => { e.preventDefault(); e.stopPropagation(); }));
['dragenter', 'dragover'].forEach(evt => dropzone.addEventListener(evt, () => dropzone.classList.add('border-primary', 'bg-red-50', 'dark:bg-red-900/10')));
['dragleave', 'drop'].forEach(evt => dropzone.addEventListener(evt, () => dropzone.classList.remove('border-primary', 'bg-red-50', 'dark:bg-red-900/10')));
dropzone.addEventListener('drop', e => handleFiles(e.dataTransfer.files));
dropzone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => { handleFiles(e.target.files); e.target.value = ''; });

function handleFiles(files) {
    if (!files.length) return;
    const tool = toolsData.find(t => t.id === APP.currentTool);
    let newFiles = Array.from(files);
    if(!tool.multi) newFiles = [newFiles[0]];
    tool.multi ? APP.files = [...APP.files, ...newFiles] : APP.files = newFiles;
    renderFiles();
    $('#resultBox').classList.add('hidden');
}

function removeFile(index) { APP.files.splice(index, 1); renderFiles(); }

function renderFiles() {
    const list = $('#fileList');
    if(!APP.files.length) { list.innerHTML = ''; return; }
    list.innerHTML = APP.files.map((f, i) => `
        <div class="flex items-center justify-between bg-gray-100 dark:bg-[#1e293b] p-3 rounded-lg border border-gray-200 dark:border-darkBorder group">
            <div class="flex items-center gap-3 overflow-hidden">
                <i class="fa-solid fa-file text-gray-400"></i>
                <div class="flex flex-col overflow-hidden">
                    <span class="text-sm font-bold truncate" title="${f.name}">${f.name}</span>
                    <span class="text-xs text-gray-500">${(f.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
            </div>
            <button onclick="event.stopPropagation(); removeFile(${i})" class="text-gray-400 hover:text-red-500 p-2 rounded-md hover:bg-white dark:hover:bg-darkCard transition-colors">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function buildExtraControls(toolId) {
    const box = $('#toolControls');
    box.innerHTML = '';
    box.classList.remove('hidden');
    const inputClass = "w-full mt-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#0b1120] focus:border-primary focus:ring-1 focus:ring-primary outline-none";
    
    if (['split', 'delete', 'reorder'].includes(toolId)) {
        let lbl = toolId === 'reorder' ? 'lblOrder' : 'lblRange';
        box.innerHTML = `<label class="block text-sm font-bold mb-1" id="lblExt1" data-i18n="${lbl}">${dict[APP.lang][lbl]}</label><input type="text" id="toolInputVal" class="${inputClass}" dir="ltr" placeholder="1-3, 5, 7">`;
    } else if (toolId === 'protect') {
        box.innerHTML = `<label class="block text-sm font-bold mb-1" data-i18n="lblPassword">${dict[APP.lang].lblPassword}</label><input type="password" id="toolInputVal" class="${inputClass}" dir="ltr">`;
    } else if (toolId === 'numbers') {
        box.innerHTML = `<label class="block text-sm font-bold mb-1" data-i18n="lblPos">${dict[APP.lang].lblPos}</label><select id="toolInputVal" class="${inputClass}">
            <option value="bottom-center" data-i18n="posBC">${dict[APP.lang].posBC}</option>
            <option value="bottom-right" data-i18n="posBR">${dict[APP.lang].posBR}</option>
            <option value="bottom-left" data-i18n="posBL">${dict[APP.lang].posBL}</option></select>`;
    } else { box.classList.add('hidden'); }
}

function updateExtraControlsLang() {
    const toolId = APP.currentTool;
     if (['split', 'delete', 'reorder'].includes(toolId)) {
        let lbl = toolId === 'reorder' ? 'lblOrder' : 'lblRange';
        const l = $('#lblExt1'); if(l) { l.setAttribute('data-i18n', lbl); l.textContent = dict[APP.lang][lbl]; }
     }
}

// --- STREAMING_CHUNK:Processing Engine ---
let currentResultUrl = null;
function provideDownload(bytes, filename, type = 'application/pdf') {
    if(currentResultUrl) URL.revokeObjectURL(currentResultUrl);
    const blob = new Blob([bytes], { type });
    currentResultUrl = URL.createObjectURL(blob);
    $('#resultBox').classList.remove('hidden');
    const btn = $('#downloadBtn');
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.onclick = () => { const a = document.createElement('a'); a.href = currentResultUrl; a.download = filename; a.click(); };
}

async function loadPdfDoc(file, password) {
    return await PDFLib.PDFDocument.load(await getFileBuffer(file), password !== undefined ? { password } : undefined);
}

function parseRange(s, maxPages) {
    let a = [];
    if(!s) return a;
    for (const x of s.split(',').map(x => x.trim()).filter(Boolean)) {
        if (x.includes('-')) {
            let [u, v] = x.split('-').map(Number);
            if(u && v) for (let i = Math.min(u,v); i <= Math.max(u,v); i++) if (i >= 1 && i <= maxPages) a.push(i - 1);
        } else {
            let i = Number(x);
            if (!isNaN(i) && i >= 1 && i <= maxPages) a.push(i - 1);
        }
    }
    return [...new Set(a)];
}

$('#actionBtn').onclick = async () => {
    if (!APP.files.length) { showToast(dict[APP.lang].errNoFiles, true); return; }
    const btn = $('#actionBtn'); const status = $('#statusText'); const toolId = APP.currentTool;
    btn.disabled = true; const originalBtnHtml = btn.innerHTML;
    btn.innerHTML = `<div class="spinner"></div>`; status.textContent = dict[APP.lang].statusProcessing; $('#resultBox').classList.add('hidden');

    try {
        if (toolId === 'merge') await processMerge();
        else if (toolId === 'images') await processImages();
        else if (toolId === 'split') await processSplit();
        else if (['delete', 'reorder', 'numbers', 'compress'].includes(toolId)) await processEdit(toolId);
        else if (toolId === 'protect') await processProtect();
        else if (toolId === 'unlock') await processUnlock();
        else if (toolId === 'word') await processWord();
        else if (toolId === 'excel') await processExcel();
        else if (toolId === 'ppt') await processPPT();
        status.textContent = dict[APP.lang].statusDone;
    } catch (error) {
        console.error(error); showToast(error.message || dict[APP.lang].errGeneral, true); status.textContent = '';
    } finally {
        btn.disabled = false; btn.innerHTML = originalBtnHtml;
    }
};

// Tasks implementations
async function processMerge() {
    const out = await PDFLib.PDFDocument.create();
    for (const f of APP.files) {
        const p = await loadPdfDoc(f);
        const pages = await out.copyPages(p, p.getPageIndices());
        pages.forEach(pg => out.addPage(pg));
    }
    provideDownload(await out.save({ useObjectStreams: true }), 'merged.pdf');
}

async function processImages() {
    const out = await PDFLib.PDFDocument.create();
    for (const f of APP.files) {
        const b = await getFileBuffer(f);
        const img = f.type === 'image/png' ? await out.embedPng(b) : await out.embedJpg(b);
        const dim = img.scale(1);
        const page = out.addPage([dim.width, dim.height]);
        page.drawImage(img, { x: 0, y: 0, width: dim.width, height: dim.height });
    }
    provideDownload(await out.save({ useObjectStreams: true }), 'images_to_pdf.pdf');
}

async function processSplit() {
    const p = await loadPdfDoc(APP.files[0]);
    const nums = parseRange($('#toolInputVal').value, p.getPageCount());
    if(!nums.length) throw new Error('Invalid page range');
    const out = await PDFLib.PDFDocument.create();
    const pages = await out.copyPages(p, nums);
    pages.forEach(pg => out.addPage(pg));
    provideDownload(await out.save({ useObjectStreams: true }), 'split.pdf');
}

async function processEdit(type) {
    const p = await loadPdfDoc(APP.files[0]); const n = p.getPageCount(); let idx = [...Array(n).keys()];
    if (type === 'delete') {
        const del = parseRange($('#toolInputVal').value, n); idx = idx.filter(i => !del.includes(i));
        if(!idx.length) throw new Error('Cannot delete all pages');
    } else if (type === 'reorder') {
        const r = parseRange($('#toolInputVal').value, n); if (r.length > 0) idx = r; 
    }
    const out = await PDFLib.PDFDocument.create();
    const pages = await out.copyPages(p, idx);
    pages.forEach(pg => out.addPage(pg));
    if (type === 'numbers') {
        const pos = $('#toolInputVal').value;
        out.getPages().forEach((pg, i) => {
            const { width, height } = pg.getSize(); let x = width / 2;
            if (pos === 'bottom-right') x = width - 35; if (pos === 'bottom-left') x = 35;
            pg.drawText(String(i + 1), { x: x - 5, y: 20, size: 12, color: PDFLib.rgb(0.2, 0.2, 0.2) });
        });
    }
    provideDownload(await out.save({ useObjectStreams: true }), `${type}_result.pdf`);
}

async function processProtect() {
    const pwd = $('#toolInputVal').value.trim(); if (!pwd) throw new Error(dict[APP.lang].errPassword);
    const p = await loadPdfDoc(APP.files[0]);
    const pdfBytes = await p.save({ encrypt: { userPassword: pwd, ownerPassword: pwd + 'admin', permissions: { printing: 'highResolution', modifying: false, copying: false } }});
    provideDownload(pdfBytes, 'protected.pdf');
}

async function processUnlock() {
    const pwd = prompt(APP.lang === 'ar' ? 'أدخل كلمة المرور الحالية لفك الحماية:' : 'Enter current password to unlock:');
    if (pwd === null) throw new Error('Cancelled');
    const p = await loadPdfDoc(APP.files[0], pwd);
    provideDownload(await p.save(), 'unlocked.pdf');
}

async function processWord() {
    if (!APP.pdfjsReady) throw new Error(dict[APP.lang].errPdfjs || "PDF.js Error");
    const pdfData = new Uint8Array(await getFileBuffer(APP.files[0]));
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    let children = [];
    for (let i = 1; i <= pdf.numPages; i++) {
        const pg = await pdf.getPage(i); const content = await pg.getTextContent();
        children.push(new docx.Paragraph({ children: [new docx.TextRun(content.items.map(x => x.str).join(' '))] }));
    }
    const doc = new docx.Document({ sections: [{ properties: {}, children: children }] });
    provideDownload(await (await docx.Packer.toBlob(doc)).arrayBuffer(), 'converted.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
}

async function processExcel() {
    const wb = XLSX.read(await getFileBuffer(APP.files[0]), { type: 'array' });
    const { jsPDF } = window.jspdf; const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    pdf.setFontSize(10);
    wb.SheetNames.forEach((sn, si) => {
        if (si > 0) pdf.addPage();
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[sn], { header: 1 }); let y = 15;
        pdf.setFontSize(14); pdf.text(String(sn), 10, y); y += 10; pdf.setFontSize(9);
        rows.forEach(r => {
            pdf.text(r.map(x => String(x != null ? x : '')).join(' | ').substring(0, 120), 10, y); y += 6;
            if (y > 280) { pdf.addPage(); y = 15; }
        });
    });
    provideDownload(pdf.output('arraybuffer'), 'from_excel.pdf');
}

async function processPPT() {
    if (!APP.pdfjsReady) throw new Error(dict[APP.lang].errPdfjs || "PDF.js Error");
    const pdfData = new Uint8Array(await getFileBuffer(APP.files[0]));
    const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
    const ppt = new PptxGenJS(); ppt.layout = 'LAYOUT_WIDE';
    for (let i = 1; i <= pdf.numPages; i++) {
        const pg = await pdf.getPage(i); const vp = pg.getViewport({ scale: 1.5 });
        const canvas = document.createElement('canvas'); canvas.width = vp.width; canvas.height = vp.height;
        await pg.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        ppt.addSlide().addImage({ data: canvas.toDataURL('image/jpeg', 0.85), x: 0, y: 0, w: '100%', h: '100%' });
    }
    provideDownload(await ppt.write({ outputType: 'arraybuffer' }), 'slides.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
}

// --- STREAMING_CHUNK:App Initialization ---
applyTheme();
applyLanguage();
checkCookies(); // Check and show cookie banner if needed

const requestedTool = new URLSearchParams(location.search).get('tool');
if (requestedTool && toolsData.some(t => t.id === requestedTool)) {
    setTimeout(() => openTool(requestedTool), 0);
}

// Public handlers used by inline HTML attributes and dynamically generated tool cards.
Object.assign(window, { openTool, closeTool, removeFile, acceptCookies, openPage, closePage });
