let pdfJsPromise=null;
const PDFJS_URL='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

function ensurePdfJs(){
  if(window.pdfjsLib){ window.pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS_WORKER; return Promise.resolve(window.pdfjsLib); }
  if(pdfJsPromise) return pdfJsPromise;
  pdfJsPromise=new Promise((resolve,reject)=>{
    const existing=document.querySelector('script[data-pdfjs-loader]');
    if(existing){ existing.addEventListener('load',()=>resolve(window.pdfjsLib)); existing.addEventListener('error',reject); return; }
    const script=document.createElement('script');
    script.src=PDFJS_URL; script.async=true; script.dataset.pdfjsLoader='true';
    script.onload=()=>{ if(!window.pdfjsLib){ reject(new Error('PDF.js failed to load')); return; } window.pdfjsLib.GlobalWorkerOptions.workerSrc=PDFJS_WORKER; resolve(window.pdfjsLib); };
    script.onerror=()=>reject(new Error('PDF.js failed to load'));
    document.head.appendChild(script);
  });
  return pdfJsPromise;
}
export { ensurePdfJs };
