'use strict';
// Small, dependency-free icon set. Icons are decorative; controls have text labels.
const paths = {
  mail:'M4 5h16v14H4z M4 6l8 7 8-7', github:'M9 19c-4 1-4-2-6-2 m12 5v-4c0-1-.4-2-1-2 3-.3 6-1.5 6-6 0-1.5-.5-2.5-1.5-3.5.2-1 .2-2-.3-3.5-1.5 0-3 1-3.5 1.5a12 12 0 0 0-7.4 0C6.5 3.5 5 3 3.5 3c-.5 1.5-.5 2.5-.3 3.5C2.2 7.5 2 8.5 2 10c0 4.5 3 5.7 6 6-.6.5-1 1.5-1 2v4',
  linkedin:'M4 9v11 M4 4v.1 M9 20V9h4v2c1-3 7-3 7 2v7 M13 20v-7',
  'arrow-up-right':'M6 18L18 6 M6 6h12v12','arrow-down':'M12 4v16 M5 13l7 7 7-7','arrow-up':'M12 20V4 M5 11l7-7 7 7',
  moon:'M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14z',sun:'M12 3V1 M12 23v-2 M3 12H1 M23 12h-2 M4 4l2 2 M18 18l2 2 M20 4l-2 2 M6 18l-2 2 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  menu:'M4 6h16 M4 12h16 M4 18h16',close:'M6 6l12 12 M6 18L18 6',code:'M8 6l-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18',
  database:'M3 5c0-4 18-4 18 0s-18 4-18 0v14c0 4 18 4 18 0V5 M3 12c0 4 18 4 18 0',brain:'M12 4v16 M12 5C7-1 3 5 5 8c-5 2-3 8 0 8-1 5 5 7 7 3 M12 5c5-6 9 0 7 3 5 2 3 8 0 8 1 5-5 7-7 3 M7 9l5 3 5-3 M7 16l5-4 5 4',
  eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',chart:'M4 3v17h17 M8 16v-5 M13 16V7 M18 16V4',award:'M16 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M8 13l-2 8 6-3 6 3-2-8',file:'M14 2H5v20h14V7z M14 2v6h5 M8 13h8 M8 17h6',clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M12 6v6l4 2'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.code}"/></svg>`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const config = window.PORTFOLIO;
const skills = [
  ['Frontend & UI Design','code',['HTML','CSS','JavaScript','React','Figma']],
  ['Backend & Database','database',['Python','Node.js','SQL','RESTful APIs']],
  ['Machine Learning & AI','brain',['Scikit-learn','Random Forest','TensorFlow','Neural Networks']],
  ['Computer Vision','eye',['OpenCV','AKAZE','SIFT','FLANN']],
  ['Data Science & Analytics','chart',['Pandas','NumPy','Matplotlib','Data Wrangling']]
];
const tags = items => items.map(item => `<span class="tag">${escapeHTML(item)}</span>`).join('');
document.querySelector('#skills-grid').innerHTML = skills.map(([title,symbol,items],i)=>`<article class="skill-card reveal" style="--delay:${i%3*90}ms"><div class="card-top">${icon(symbol)}<span>0${i+1}</span></div><h3>${title}</h3><div class="tags">${tags(items)}</div></article>`).join('');
document.querySelector('#projects-grid').innerHTML = config.projects.map((p,i)=>`<article class="project-card reveal" style="--delay:${i*100}ms"><div class="project-image"><img src="${escapeHTML(p.image)}" alt="Project ${i+1} image placeholder" width="720" height="464" loading="lazy"></div><div class="project-content"><p class="eyebrow">${escapeHTML(p.category)}</p><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.description)}</p><div class="tags">${tags(p.tags)}</div><div class="project-links"><a class="button" href="#project" data-project="${i}" data-kind="github">${icon('github')}View GitHub</a><a class="button" href="#project" data-project="${i}" data-kind="live">Live Prototype/App${icon('arrow-up-right')}</a></div></div></article>`).join('');
document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon)});

// Safe link binding: unfinished content opens an accessible dialog instead of a dead URL.
const dialog = document.querySelector('#link-dialog');
function unavailable(message){document.querySelector('#dialog-message').textContent=message;dialog.showModal()}
document.querySelectorAll('.dialog-close,.dialog-dismiss').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
function bindLink(element,url,message){
  if(url){
    const resolved=new URL(url,location.href);
    if(!['https:','http:','mailto:','file:'].includes(resolved.protocol))return;
    element.href=url;
    if(resolved.protocol!=='mailto:'){element.target='_blank';element.rel='noopener noreferrer'}
  }else{element.addEventListener('click',event=>{event.preventDefault();unavailable(message)})}
}
document.querySelectorAll('[data-link]').forEach(a=>{const key=a.dataset.link;bindLink(a,key==='email'&&config.email?`mailto:${config.email}`:config[key],`${key==='email'?'Email':key==='github'?'GitHub':'LinkedIn'} details haven't been added yet. Please check back soon.`)});
document.querySelectorAll('[data-project]').forEach(a=>bindLink(a,config.projects[Number(a.dataset.project)][a.dataset.kind],'This is a project example. The actual repository and live application will be linked here when available.'));
document.querySelector('#certificate-title').textContent=config.certificate.title;
document.querySelector('#certificate-description').textContent=config.certificate.description;
bindLink(document.querySelector('#certificate-link'),config.certificate.pdf,'The certificate PDF has not been added yet. Please check back soon.');

// Theme preference is saved locally, with graceful handling of blocked storage.
const themeButton=document.querySelector('.theme-toggle');
function syncTheme(){const dark=document.documentElement.dataset.theme==='dark';themeButton.innerHTML=icon(dark?'sun':'moon');themeButton.setAttribute('aria-label',`Switch to ${dark?'light':'dark'} mode`);document.querySelector('meta[name="theme-color"]').content=dark?'#101c2a':'#f4f6f8'}
syncTheme();
themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('michael-theme',next)}catch{}syncTheme()});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',event=>{try{if(localStorage.getItem('michael-theme'))return}catch{}document.documentElement.dataset.theme=event.matches?'dark':'light';syncTheme()});

// Mobile navigation supports keyboard dismissal and closes after selection.
const menu=document.querySelector('.menu-toggle'),navigation=document.querySelector('.nav-links');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');menu.innerHTML=icon('menu')}
menu.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.innerHTML=icon(open?'close':'menu')});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menu.focus()}});
document.addEventListener('click',event=>{if(!event.target.closest('.nav'))closeMenu()});
matchMedia('(min-width: 801px)').addEventListener('change',closeMenu);

// One animation frame handles progress, active navigation, and back-to-top visibility.
const sections=[...document.querySelectorAll('main section[id]')],navLinks=[...navigation.querySelectorAll('a')],backTop=document.querySelector('.back-top');
let scrollQueued=false;
function updateScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  document.querySelector('.scroll-progress').style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`;
  const visible=document.querySelector('#home').getBoundingClientRect().bottom<=90;
  backTop.classList.toggle('visible',visible);backTop.inert=!visible;
  let active=sections[0].id;
  sections.forEach(section=>{if(section.getBoundingClientRect().top<=150)active=section.id});
  if(max>0&&scrollY>=max-4)active='contact';
  navLinks.forEach(a=>{const selected=a.hash===`#${active}`;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
  scrollQueued=false;
}
function queueScroll(){if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll)}}
addEventListener('scroll',queueScroll,{passive:true});addEventListener('resize',queueScroll);addEventListener('load',queueScroll);updateScroll();
backTop.addEventListener('click',()=>{document.querySelector('.brand').focus({preventScroll:true});window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})});

// Reveal each element once. Without observer support, everything stays visible.
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:0.08});
  document.documentElement.classList.add('motion-ready');
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
// Greeting follows the visitor's local hour, including after an overnight tab.
function greetingForHour(hour){
  if(hour>=5&&hour<12)return {text:'Good morning. Welcome to my corner of the web.',symbol:'sun'};
  if(hour>=12&&hour<17)return {text:'Good afternoon. Glad you are here.',symbol:'sun'};
  if(hour>=17&&hour<21)return {text:'Good evening. Take a look around.',symbol:'moon'};
  return {text:'Hello, night owl. Thanks for stopping by.',symbol:'moon'};
}
let greetingHour=-1;
function updateClock(){
  const now=new Date();
  document.querySelector('#local-clock').textContent=now.toLocaleTimeString('en-GB',{hour12:false});
  document.querySelector('#local-clock').dateTime=now.toISOString();
  document.querySelector('#year').textContent=now.getFullYear();
  if(now.getHours()!==greetingHour){
    greetingHour=now.getHours();
    const greeting=greetingForHour(greetingHour);
    document.querySelector('#dynamic-greeting').textContent=greeting.text;
    document.querySelector('#greeting-icon').innerHTML=icon(greeting.symbol);
  }
}
document.querySelector('#time-zone').textContent=Intl.DateTimeFormat().resolvedOptions().timeZone.replaceAll('_',' ');
updateClock();setInterval(updateClock,1000);

// A subtle ambient follower, not a replacement cursor. Stop rendering when
// settled, outside the page, on touch devices, or when motion is disabled.
const aura=document.querySelector('#cursor-aura');
const motionButton=document.querySelector('#motion-toggle');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const finePointer=matchMedia('(hover: hover) and (pointer: fine) and (min-width: 481px)');
let effectsPaused=false;
try{effectsPaused=localStorage.getItem('michael-effects-paused')==='true'}catch{}
let auraFrame=0,auraX=0,auraY=0,targetX=0,targetY=0,lastFrame=0,auraStarted=false;
function canFollow(){return finePointer.matches&&!reducedMotion.matches&&!effectsPaused&&!document.hidden}
function stopAura(){
  cancelAnimationFrame(auraFrame);auraFrame=0;lastFrame=0;auraStarted=false;
  aura.classList.remove('is-visible');
}
function animateAura(time){
  if(!canFollow()){stopAura();return}
  const elapsed=lastFrame?Math.min(time-lastFrame,50):16;
  lastFrame=time;
  const easing=1-Math.exp(-elapsed/110);
  auraX+=(targetX-auraX)*easing;auraY+=(targetY-auraY)*easing;
  aura.style.transform=`translate3d(${auraX}px,${auraY}px,0)`;
  if(Math.abs(targetX-auraX)+Math.abs(targetY-auraY)>.5){auraFrame=requestAnimationFrame(animateAura)}
  else{auraFrame=0;lastFrame=0}
}
function syncEffects(){
  const paused=effectsPaused||reducedMotion.matches;
  document.documentElement.classList.toggle('effects-paused',paused);
  motionButton.setAttribute('aria-pressed',String(paused));
  motionButton.disabled=reducedMotion.matches;
  motionButton.textContent=reducedMotion.matches?'Reduced motion':paused?'Resume effects':'Pause effects';
  motionButton.title=reducedMotion.matches?'Motion reduced by your device preference':paused?'Resume decorative animations':'Pause decorative animations';
  if(!canFollow())stopAura();
}
motionButton.addEventListener('click',()=>{
  effectsPaused=!effectsPaused;
  try{localStorage.setItem('michael-effects-paused',String(effectsPaused))}catch{}
  syncEffects();
});
document.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch'||!canFollow())return;
  targetX=event.clientX;targetY=event.clientY;
  if(!auraStarted){auraX=targetX;auraY=targetY;auraStarted=true}
  aura.classList.add('is-visible');
  if(!auraFrame)auraFrame=requestAnimationFrame(animateAura);
},{passive:true});
document.documentElement.addEventListener('pointerleave',stopAura);
window.addEventListener('blur',stopAura);
document.addEventListener('visibilitychange',()=>{
  document.documentElement.classList.toggle('page-hidden',document.hidden);
  if(document.hidden)stopAura();else updateClock();
});
reducedMotion.addEventListener('change',syncEffects);
finePointer.addEventListener('change',syncEffects);
syncEffects();

// Static form: use native validation and create a draft, never claim delivery.
document.querySelector('#contact-form').addEventListener('submit',event=>{
  event.preventDefault();
  const status=document.querySelector('#form-status');
  if(!config.email){status.textContent='Email contact is not available yet. Your message has not been sent.';return}
  const data=new FormData(event.currentTarget);
  const name=String(data.get('name')).trim(),email=String(data.get('email')).trim(),message=String(data.get('message')).trim();
  if(!name||message.length<10){status.textContent='Please enter your name and a message of at least 10 characters.';return}
  const subject=encodeURIComponent(`Portfolio inquiry from ${name}`),body=encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  location.href=`mailto:${config.email}?subject=${subject}&body=${body}`;
  status.textContent='Email draft requested. Review and send it in your email app; this website has not sent your message.';
});
