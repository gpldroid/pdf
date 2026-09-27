const HISTORY_KEY='wpdf-history';
const MAX_HISTORY=8;
function readHistory(){try{return JSON.parse(localStorage.getItem(HISTORY_KEY)||'[]')}catch{return[]}}
function addHistory(tool,files){const next=[{tool,files:files.map(f=>f.name).slice(0,5),at:new Date().toISOString()},...readHistory().filter(x=>x.tool!==tool)].slice(0,MAX_HISTORY);try{localStorage.setItem(HISTORY_KEY,JSON.stringify(next))}catch{}}
export {readHistory,addHistory};
