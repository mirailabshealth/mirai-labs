// Amounts per vial transcribed from the supplied product list; not administration doses.
// Survodutide and AOD-9604 require specification/identity confirmation.
// TB-500 vial amounts confirmed by the site owner: 5 mg and 10 mg.
const vialSizes = {
  "retatrutide": [
    "5 mg/vial",
    "10 mg/vial",
    "15 mg/vial",
    "20 mg/vial",
    "30 mg/vial",
    "40 mg/vial",
    "50 mg/vial",
    "60 mg/vial"
  ],
  "tirzepatide": [
    "5 mg/vial",
    "10 mg/vial",
    "15 mg/vial",
    "20 mg/vial",
    "30 mg/vial",
    "40 mg/vial",
    "50 mg/vial",
    "60 mg/vial",
    "70 mg/vial",
    "80 mg/vial",
    "90 mg/vial",
    "100 mg/vial",
    "110 mg/vial",
    "120 mg/vial"
  ],
  "semaglutide": [
    "5 mg/vial",
    "10 mg/vial",
    "15 mg/vial",
    "20 mg/vial",
    "30 mg/vial"
  ],
  "cagrilintide": [
    "2 mg/vial",
    "5 mg/vial",
    "10 mg/vial"
  ],
  "mazdutide": [
    "10 mg/vial"
  ],
  "5-amino-1mq": [
    "5 mg/vial",
    "50 mg/vial"
  ],
  "adipotide": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "tb-500": ["5 mg/vial", "10 mg/vial"],
  "bpc-157": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "kpv": [
    "10 mg/vial"
  ],
  "thymosin-a1": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "ara-290": [
    "10 mg/vial"
  ],
  "ipamorelin": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "cjc-1295": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "tesamorelin": [
    "5 mg/vial",
    "10 mg/vial",
    "20 mg/vial"
  ],
  "sermorelin": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "ghrp-2": [
    "5 mg/vial",
    "10 mg/vial",
    "15 mg/vial"
  ],
  "ghrp-6": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "igf-1-lr3": [
    "0.1 mg/vial",
    "1 mg/vial"
  ],
  "ghk-cu": [
    "50 mg/vial",
    "100 mg/vial"
  ],
  "ahk-cu": [
    "20 mg/vial",
    "50 mg/vial"
  ],
  "snap-8": [
    "2 mg/vial"
  ],
  "matrixyl": [
    "10 mg/vial"
  ],
  "epitalon": [
    "10 mg/vial",
    "50 mg/vial"
  ],
  "mots-c": [
    "10 mg/vial",
    "40 mg/vial"
  ],
  "ss-31": [
    "10 mg/vial",
    "50 mg/vial"
  ],
  "nad": [
    "100 mg/vial",
    "500 mg/vial",
    "1000 mg/vial"
  ],
  "foxo4-dri": [
    "2 mg/vial",
    "10 mg/vial"
  ],
  "glutathione": [
    "1500 mg/vial"
  ],
  "semax": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "selank": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "dsip": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "pinealon": [
    "10 mg/vial",
    "20 mg/vial"
  ],
  "p21": [
    "5 mg/vial"
  ],
  "pt-141": [
    "10 mg/vial"
  ],
  "mt-2": [
    "10 mg/vial"
  ],
  "kisspeptin-10": [
    "5 mg/vial",
    "10 mg/vial"
  ],
  "oxytocin": [
    "2 mg/vial",
    "5 mg/vial",
    "10 mg/vial"
  ],
  "cagrisema": [
    "5 mg/vial (2.5 mg + 2.5 mg)",
    "10 mg/vial (5 mg + 5 mg)",
    "20 mg/vial (10 mg + 10 mg)"
  ],
  "cjc-ipa": [
    "10 mg/vial (CJC-1295 without DAC 5 mg + Ipamorelin 5 mg)"
  ],
  "bpc-tb": [
    "10 mg/vial (BPC-157 5 mg + TB-500 5 mg)",
    "20 mg/vial (BPC-157 10 mg + TB-500 10 mg)",
    "30 mg/vial (BPC-157 15 mg + TB-500 15 mg)"
  ],
  "glow": [
    "70 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg)"
  ],
  "klow": [
    "80 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg + KPV 10 mg)"
  ]
};
function sizeOptions(id, current = '') {
  return '<option value="">No size preference</option>' + (vialSizes[id] || []).map(s => `<option value="${s}" ${s === current ? 'selected' : ''}>${s}</option>`).join('');
}
function readSaved(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}
