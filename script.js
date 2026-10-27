const progressBar=document.getElementById('progress-bar');
const nav=document.getElementById('nav-links');
const toggle=document.getElementById('menu-toggle');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;progressBar.style.width=(max>0?window.scrollY/max*100:0)+'%';}
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const gallery=document.getElementById('game-gallery');
const lightbox=document.getElementById('lightbox'), lbimg=document.getElementById('lightbox-img'), lbcap=document.getElementById('lightbox-caption');
function openImage(src,alt){lbimg.src=src;lbimg.alt=alt;lbcap.textContent=alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');}
function closeImage(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');lbimg.src='';}
document.getElementById('lightbox-close').addEventListener('click',closeImage);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeImage();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeImage();});
fetch('gallery-data.json').then(r=>{if(!r.ok)throw Error('gallery data unavailable');return r.json();}).then(games=>{
  gallery.innerHTML=games.map(game=>`<article class="game-card reveal"><div class="game-card-head"><h3>${game.name.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</h3><span class="count">${game.count} CAPTURES</span></div><div class="thumbs">${game.images.map(img=>`<button class="thumb" type="button" aria-label="View ${img.alt.replace(/"/g,'&quot;')}"><img loading="lazy" src="${img.src}" alt="${img.alt.replace(/"/g,'&quot;')}"></button>`).join('')}</div></article>`).join('');
  gallery.querySelectorAll('.game-card').forEach(el=>observer.observe(el));
  gallery.querySelectorAll('.thumb').forEach(btn=>btn.addEventListener('click',()=>{const img=btn.querySelector('img');openImage(img.src,img.alt);}));
}).catch(()=>{gallery.innerHTML='<p class="section-intro">Gallery data could not be loaded. Please ensure gallery-data.json and assets/gallery/ are deployed together.</p>';});
