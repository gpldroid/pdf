const loaders={};
const urls={
  pdfLib:'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js',
  jspdf:'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
  xlsx:'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  docx:'https://cdn.jsdelivr.net/npm/docx@9.0.0/build/index.umd.js',
  pptx:'https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.min.js'
};
const globals={pdfLib:'PDFLib',jspdf:'jspdf',xlsx:'XLSX',docx:'docx',pptx:'PptxGenJS'};
function ensureLibrary(name){
 if(window[globals[name]]) return Promise.resolve(window[globals[name]]);
 if(loaders[name]) return loaders[name];
 loaders[name]=new Promise((resolve,reject)=>{
  const s=document.createElement('script'); s.src=urls[name]; s.async=true;
  s.onload=()=>window[globals[name]]?resolve(window[globals[name]]):reject(new Error(name+' failed to load'));
  s.onerror=()=>reject(new Error(name+' failed to load')); document.head.appendChild(s);
 });
 return loaders[name];
}
export {ensureLibrary};
