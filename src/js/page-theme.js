(function(){
  const key='wpdf-theme';
  function system(){return window.matchMedia?.('(prefers-color-scheme: dark)').matches?'dark':'light'}
  function get(){try{const x=localStorage.getItem(key);return x==='dark'||x==='light'?x:system()}catch{return system()}}
  function apply(theme,persist=false){const t=theme==='dark'?'dark':'light';document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;if(persist){try{localStorage.setItem(key,t)}catch{}}const b=document.querySelector('#themeBtn');if(b){b.innerHTML=t==='dark'?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';b.setAttribute('aria-label',t==='dark'?'تفعيل الوضع الفاتح':'تفعيل الوضع الداكن')}} 
  window.WPDFPageTheme={apply,get,toggle:function(){const n=get()==='dark'?'light':'dark';apply(n,true)}};
  apply(get());
  document.addEventListener('DOMContentLoaded',()=>{const b=document.querySelector('#themeBtn');if(b){apply(get());b.onclick=()=>apply(get()==='dark'?'light':'dark',true)}});
})();