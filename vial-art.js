/* One photographic front with catalog-driven typography for every compound/size. */
(() => {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const imageURL = new URL('./vial-front.png', document.currentScript.src).href;
  function label(name, size) {
    const match = String(name).match(/^(.+?)\s*\((.+)\)$/);
    const primary = match ? match[1] : String(name);
    const subtitle = match ? match[2] : '';
    const amount = String(size || '').split('/vial')[0].trim();
    return {primary, subtitle, amount};
  }
  function render(name, size = '') {
    const text = label(name, size);
    const description = `Mirai Labs ${name}${size ? ', '+size : ''}. Front-label product illustration.`;
    return `<div class="mirai-vial" role="img" aria-label="${escape(description)}"><img class="mirai-vial-photo" src="${escape(imageURL)}" width="1024" height="1536" alt="" loading="lazy" decoding="async"><div class="mirai-vial-type" aria-hidden="true"><span class="mirai-vial-name${text.primary.length>19?' mirai-vial-name-long':''}">${escape(text.primary)}</span>${text.subtitle?`<span class="mirai-vial-subtitle">${escape(text.subtitle)}</span>`:''}${text.amount?`<span class="mirai-vial-amount">${escape(text.amount)}</span>`:''}</div></div>`;
  }
  window.miraiVial = {render};
})();
