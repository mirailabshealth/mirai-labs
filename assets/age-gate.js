// Shared educational controls. No commerce or analytics initialization.
(()=>{
  document.querySelectorAll('.edu-links a').forEach(a=>{if(new URL(a.href).pathname===location.pathname)a.setAttribute('aria-current','page');});
  const form=document.getElementById('education-form');
  if(form){
    if(typeof selected!=='undefined')form.elements.compounds.value=selected.map(id=>peptides.find(p=>p.id===id)?.name).filter(Boolean).join(', ');
    form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
      const body=`Educational inquiry\nName: ${form.elements.name.value.trim()}\nEmail: ${form.elements.email.value.trim()}\nResearch selection: ${form.elements.compounds.value||'None'}\n\n${form.elements.notes.value.trim()}\n\nFor educational follow-up only.`;
      const a=document.createElement('a');a.href='mailto:mirai.labs.health@gmail.com?subject='+encodeURIComponent('Mirai Labs educational inquiry')+'&body='+encodeURIComponent(body);a.click();
      document.getElementById('education-status').textContent='Your email app should open. Review and send there. If it does not open, email mirai.labs.health@gmail.com directly. This website has not submitted your message.';
    });
  }
  let acknowledged=false;try{acknowledged=localStorage.getItem('mirai_education_age_v1')==='21';}catch{}
  if(acknowledged)return;
  const dialog=document.createElement('dialog');dialog.setAttribute('aria-labelledby','age-title');dialog.setAttribute('aria-describedby','age-explanation');
  dialog.style.cssText='max-width:520px;width:calc(100% - 32px);padding:30px;border:1px solid #ddd;border-radius:20px;color:#172033;background:#fff;font:16px/1.7 system-ui';
  dialog.innerHTML='<h2 id="age-title" style="font-size:25px;font-weight:750;margin:0 0 14px">Welcome to Mirai Labs 未来</h2><p id="age-explanation">This educational resource is intended for adults aged 21 and over. Research information is not medical advice. Research compounds are not for human or animal consumption. Consult qualified healthcare providers for medical concerns.</p><p>Research dose context is literature only — not a recommendation.</p><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:22px"><button id="age-yes" style="background:#b91c1c;color:white;border:0;border-radius:9px;padding:12px 18px;font:inherit;cursor:pointer">I am 21 or older — continue</button><button id="age-no" style="background:#f1f5f9;border:1px solid #cbd5e1;border-radius:9px;padding:12px 18px;font:inherit;cursor:pointer">I am under 21</button></div><p id="age-status" role="status"></p>';
  const style=document.createElement('style');style.textContent='dialog::backdrop{background:rgba(15,23,42,.78)}';document.head.append(style);document.body.append(dialog);
  dialog.addEventListener('cancel',e=>e.preventDefault());
  dialog.querySelector('#age-yes').onclick=()=>{try{localStorage.setItem('mirai_education_age_v1','21');}catch{}dialog.close();dialog.remove();};
  dialog.querySelector('#age-no').onclick=()=>{dialog.querySelector('#age-status').textContent='This resource is restricted to adults aged 21 and over. Please close this page.';dialog.querySelector('#age-yes').disabled=true;};
  if(typeof dialog.showModal==='function')dialog.showModal();else{dialog.setAttribute('open','');dialog.style.cssText+=';position:fixed;inset:0;z-index:99999;margin:auto;box-shadow:0 0 0 100vmax rgba(15,23,42,.9)';}
})();
