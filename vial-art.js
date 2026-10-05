/* One photographic front with catalog-driven typography for every compound/size. */
(() => {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const imageURL = new URL('./vial-front.png', document.currentScript.src).href;
  // Illustration defaults from the published catalog; never used for order pricing.
  const exampleSizes = {
  "5-amino-1mq": "5 mg/vial",
  "adipotide": "10 mg/vial",
  "ahk-cu": "20 mg/vial",
  "aod-9604": "10 mg/vial",
  "ara-290": "10 mg/vial",
  "bpc-157": "10 mg/vial",
  "bpc-tb": "10 mg/vial (BPC-157 5 mg + TB-500 5 mg)",
  "cagrilintide": "10 mg/vial",
  "cagrisema": "10 mg/vial (5 mg + 5 mg)",
  "cjc-1295": "10 mg/vial",
  "cjc-ipa": "10 mg/vial (CJC-1295 without DAC 5 mg + Ipamorelin 5 mg)",
  "dsip": "10 mg/vial",
  "epitalon": "10 mg/vial",
  "foxo4-dri": "10 mg/vial",
  "ghk-cu": "100 mg/vial",
  "ghrp-2": "10 mg/vial",
  "ghrp-6": "10 mg/vial",
  "glow": "70 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg)",
  "glutathione": "1500 mg/vial",
  "igf-1-lr3": "0.1 mg/vial",
  "ipamorelin": "10 mg/vial",
  "kisspeptin-10": "10 mg/vial",
  "klow": "80 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg + KPV 10 mg)",
  "kpv": "10 mg/vial",
  "matrixyl": "10 mg/vial",
  "mazdutide": "10 mg/vial",
  "mots-c": "10 mg/vial",
  "mt-2": "10 mg/vial",
  "nad": "100 mg/vial",
  "oxytocin": "10 mg/vial",
  "p21": "5 mg/vial",
  "pinealon": "10 mg/vial",
  "pt-141": "10 mg/vial",
  "retatrutide": "10 mg/vial",
  "selank": "10 mg/vial",
  "semaglutide": "10 mg/vial",
  "semax": "10 mg/vial",
  "sermorelin": "10 mg/vial",
  "snap-8": "2 mg/vial",
  "ss-31": "10 mg/vial",
  "survodutide": "10 mg/vial",
  "tb-500": "10 mg/vial",
  "tesamorelin": "10 mg/vial",
  "thymosin-a1": "10 mg/vial",
  "tirzepatide": "10 mg/vial"
};
  function label(name, size) {
    const match = String(name).match(/^(.+?)\s*\((.+)\)$/);
    const primary = match ? match[1] : String(name);
    const subtitle = match ? match[2] : '';
    const amount = String(size || '').split('/vial')[0].trim();
    return {primary, subtitle, amount};
  }
  function render(name, size = '') {
    // Research pages have no strength selector: show an actual listed example size.
    // Explicit catalog selections always take precedence.
    let example = false;
    if (!size && typeof peptides !== 'undefined') {
      const product = peptides.find(p => p.name === name);
      const sizes = product ? (typeof miraiPrices !== 'undefined' ? Object.keys(miraiPrices[product.id] || {}) : [exampleSizes[product.id]].filter(Boolean)) : [];
      if (sizes.length) { size = sizes[0]; example = true; }
    }
    const text = label(name, size);
    const description = `Mirai Labs ${name}${size ? ', '+size : ''}. Front-label product illustration.${example ? ' Example size; select your size in the account catalog.' : ''}`;
    return `<div class="mirai-vial" role="img" aria-label="${escape(description)}"><img class="mirai-vial-photo" src="${escape(imageURL)}" width="1024" height="1536" alt="" loading="lazy" decoding="async"><div class="mirai-vial-type" aria-hidden="true"><span class="mirai-vial-name${text.primary.length>19?' mirai-vial-name-long':''}">${escape(text.primary)}</span>${text.subtitle?`<span class="mirai-vial-subtitle">${escape(text.subtitle)}</span>`:''}${text.amount?`<span class="mirai-vial-amount">${escape(text.amount)}</span>`:''}</div></div>${example ? '<span class="vial-art-note">Example vial size · choose your size in the account catalog</span>' : ''}`;
  }
  window.miraiVial = {render};
})();
