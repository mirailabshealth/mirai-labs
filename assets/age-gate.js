// Educational-only navigation. Historical account data remains behind sign-in.
(()=>{const h=document.querySelector('header,nav');if(!h)return;const n=document.createElement('nav');n.setAttribute('aria-label','Support and account navigation');n.style.cssText='padding:10px 22px;background:white;border-bottom:1px solid #e2e7ee;font:14px/1.6 system-ui';n.innerHTML='<a href="./guide.html">Research guide</a> · <a href="./contact.html">Support</a> · <a href="./portal.html">Existing account / owner sign-in</a>';h.after(n);})();
// The former account bar hid the portal's own sign-out; retain that essential action.
(()=>{const s=document.createElement('style');s.textContent='body.signed-in header #signout{display:inline-block}';document.head.append(s);})();
