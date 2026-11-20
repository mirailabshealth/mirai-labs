(()=>{'use strict';
const config=window.MIRAI_NEWSLETTER||{};
function validUrl(raw){try{const u=new URL(raw);return u.protocol==='https:'&&!u.username&&!u.password&&u.hostname.endsWith('.sibforms.com')&&u.pathname.startsWith('/serve/')&&!u.search&&!u.hash?u.href:null;}catch{return null;}}
const url=config.enabled===true?validUrl(config.formUrl):null;
if(!url)return; // No dead signup UI, remote requests or storage when disconnected.
function embed(host){if(host.querySelector('iframe'))return;const frame=document.createElement('iframe');frame.title='Mirai Health email subscription form';frame.referrerPolicy='no-referrer';frame.src=url;host.append(frame);const fallback=document.createElement('a');fallback.href=url;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent='Open the signup form in a new tab';host.append(fallback);}
const mount=document.querySelector('[data-newsletter-form]');if(mount){document.querySelector('[data-newsletter-pending]')?.setAttribute('hidden','');embed(mount);return;}
const footer=document.querySelector('footer');if(footer){const link=document.createElement('a');link.href='subscribe.html';link.className='newsletter-footer-link';link.textContent='Subscribe to Mirai updates';footer.append(link);}
if(typeof HTMLDialogElement==='undefined'||typeof HTMLDialogElement.prototype.showModal!=='function')return;
const key='mirai_newsletter_dismissed_v1',cooldown=30*86400000;let dismissed=0;try{dismissed=Number(localStorage.getItem(key))||0;}catch{}
if(dismissed&&Date.now()-dismissed<cooldown)return;
const dialog=document.createElement('dialog');dialog.className='newsletter-shell';dialog.setAttribute('aria-labelledby','newsletter-title');
dialog.innerHTML='<button class="newsletter-close" type="button" aria-label="Close email invitation">Close</button><p class="newsletter-kicker">THE MIRAI HEALTH LETTER</p><h2 id="newsletter-title">Stay curious. Stay informed.</h2><p>Get clear research explainers, new learning resources, and updates from Mirai Health.</p><button class="newsletter-cta" type="button">Subscribe by email</button><div data-form-slot></div><p>Optional email updates. Unsubscribe anytime. Joining does not enroll you in clinical care.</p><a href="privacy.html#email-updates">How we use your information</a>';
let previous;
function remember(){try{localStorage.setItem(key,String(Date.now()));}catch{} if(previous?.isConnected)previous.focus();}
dialog.addEventListener('close',remember);dialog.querySelector('.newsletter-close').onclick=()=>dialog.close();
dialog.querySelector('.newsletter-cta').onclick=e=>{embed(dialog.querySelector('[data-form-slot]'));e.currentTarget.hidden=true;dialog.querySelector('iframe').focus();};
// Do not interrupt an age gate, another dialog, hidden tab or active text entry.
setTimeout(()=>{const active=document.activeElement;if(document.hidden||document.querySelector('dialog[open]')||active?.matches('input,textarea,select,[contenteditable="true"]'))return;previous=active;document.body.append(dialog);dialog.showModal();},20000);
})();
