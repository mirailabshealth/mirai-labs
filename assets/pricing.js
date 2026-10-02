// Public customer estimates only. Values are USD cents per vial by quantity tier.
// Edit each size's [1, 2, 3-4, 5-9, 10+] rates here. No supplier costs are published.
const miraiPriceVersion = '2026-10-02-live-catalog-review';
const miraiPrices = {
  "retatrutide": {
    "5 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
    ],
    "10 mg/vial": [
      7900,
      7900,
      7505,
      6715,
      6320
    ],
    "15 mg/vial": [
      9900,
      9900,
      9405,
      8415,
      7920
    ],
    "20 mg/vial": [
      11900,
      11900,
      11305,
      10115,
      9520
    ],
    "30 mg/vial": [
      15900,
      15900,
      15105,
      13515,
      12720
    ],
    "40 mg/vial": [
      19900,
      19900,
      18905,
      16915,
      15920
    ],
    "50 mg/vial": [
      23900,
      23900,
      22705,
      20315,
      19120
    ],
    "60 mg/vial": [
      27900,
      27900,
      26505,
      23715,
      22320
    ]
  },
  "tirzepatide": {
    "5 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ],
    "10 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ],
    "15 mg/vial": [
      8900,
      8900,
      8455,
      7565,
      7120
    ],
    "20 mg/vial": [
      10900,
      10900,
      10355,
      9265,
      8720
    ],
    "30 mg/vial": [
      13900,
      13900,
      13205,
      11815,
      11120
    ],
    "40 mg/vial": [
      15200,
      15200,
      14440,
      12920,
      12160
    ],
    "50 mg/vial": [
      16600,
      16600,
      15770,
      14110,
      13280
    ],
    "60 mg/vial": [
      17900,
      17900,
      17005,
      15215,
      14320
    ],
    "70 mg/vial": [
      19200,
      19200,
      18240,
      16320,
      15360
    ],
    "80 mg/vial": [
      20600,
      20600,
      19570,
      17510,
      16480
    ],
    "90 mg/vial": [
      21900,
      21900,
      20805,
      18615,
      17520
    ],
    "100 mg/vial": [
      23200,
      23200,
      22040,
      19720,
      18560
    ],
    "110 mg/vial": [
      24600,
      24600,
      23370,
      20910,
      19680
    ],
    "120 mg/vial": [
      25900,
      25900,
      24605,
      22015,
      20720
    ]
  },
  "semaglutide": {
    "5 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "10 mg/vial": [
      5400,
      5400,
      5130,
      4590,
      4320
    ],
    "15 mg/vial": [
      7900,
      7900,
      7505,
      6715,
      6320
    ],
    "20 mg/vial": [
      9900,
      9900,
      9405,
      8415,
      7920
    ],
    "30 mg/vial": [
      10400,
      10400,
      9880,
      8840,
      8320
    ]
  },
  "cagrilintide": {
    "2 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ],
    "5 mg/vial": [
      7400,
      7400,
      7030,
      6290,
      5920
    ],
    "10 mg/vial": [
      11900,
      11900,
      11305,
      10115,
      9520
    ]
  },
  "mazdutide": {
    "10 mg/vial": [
      9400,
      9400,
      8930,
      7990,
      7520
    ]
  },
  "5-amino-1mq": {
    "5 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ],
    "50 mg/vial": [
      12900,
      12900,
      12255,
      10965,
      10320
    ]
  },
  "adipotide": {
    "5 mg/vial": [
      7900,
      7900,
      7505,
      6715,
      6320
    ],
    "10 mg/vial": [
      8900,
      8900,
      8455,
      7565,
      7120
    ]
  },
  "tb-500": {
    "5 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ],
    "10 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
    ]
  },
  "bpc-157": {
    "5 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "10 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ]
  },
  "kpv": {
    "10 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ]
  },
  "thymosin-a1": {
    "5 mg/vial": [
      5400,
      5400,
      5130,
      4590,
      4320
    ],
    "10 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ]
  },
  "ara-290": {
    "10 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ]
  },
  "ipamorelin": {
    "5 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "10 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ]
  },
  "cjc-1295": {
    "5 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ],
    "10 mg/vial": [
      6400,
      6400,
      6080,
      5440,
      5120
    ]
  },
  "tesamorelin": {
    "5 mg/vial": [
      5400,
      5400,
      5130,
      4590,
      4320
    ],
    "10 mg/vial": [
      7900,
      7900,
      7505,
      6715,
      6320
    ],
    "20 mg/vial": [
      15000,
      15000,
      14250,
      12750,
      12000
    ]
  },
  "sermorelin": {
    "5 mg/vial": [
      5400,
      5400,
      5130,
      4590,
      4320
    ],
    "10 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ]
  },
  "ghrp-2": {
    "5 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "10 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ],
    "15 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ]
  },
  "ghrp-6": {
    "5 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "10 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ]
  },
  "igf-1-lr3": {
    "0.1 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "1 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ]
  },
  "ghk-cu": {
    "50 mg/vial": [
      3400,
      3400,
      3230,
      2890,
      2720
    ],
    "100 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ]
  },
  "ahk-cu": {
    "20 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "50 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ]
  },
  "snap-8": {
    "2 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ]
  },
  "matrixyl": {
    "10 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ]
  },
  "epitalon": {
    "10 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "50 mg/vial": [
      6400,
      6400,
      6080,
      5440,
      5120
    ]
  },
  "mots-c": {
    "10 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ],
    "40 mg/vial": [
      11900,
      11900,
      11305,
      10115,
      9520
    ]
  },
  "ss-31": {
    "10 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ],
    "50 mg/vial": [
      13900,
      13900,
      13205,
      11815,
      11120
    ]
  },
  "nad": {
    "100 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "500 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ],
    "1000 mg/vial": [
      8900,
      8900,
      8455,
      7565,
      7120
    ]
  },
  "foxo4-dri": {
    "2 mg/vial": [
      5400,
      5400,
      5130,
      4590,
      4320
    ],
    "10 mg/vial": [
      16600,
      16600,
      15770,
      14110,
      13280
    ]
  },
  "glutathione": {
    "1500 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ]
  },
  "semax": {
    "5 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ],
    "10 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ]
  },
  "selank": {
    "5 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ],
    "10 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ]
  },
  "dsip": {
    "5 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ],
    "10 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ]
  },
  "pinealon": {
    "10 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ],
    "20 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
    ]
  },
  "p21": {
    "5 mg/vial": [
      11400,
      11400,
      10830,
      9690,
      9120
    ]
  },
  "pt-141": {
    "10 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ]
  },
  "mt-2": {
    "10 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ]
  },
  "kisspeptin-10": {
    "5 mg/vial": [
      4400,
      4400,
      4180,
      3740,
      3520
    ],
    "10 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ]
  },
  "oxytocin": {
    "2 mg/vial": [
      3900,
      3900,
      3705,
      3315,
      3120
    ],
    "5 mg/vial": [
      4900,
      4900,
      4655,
      4165,
      3920
    ],
    "10 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
    ]
  },
  "cagrisema": {
    "5 mg/vial (2.5 mg + 2.5 mg)": [
      5400,
      5400,
      5130,
      4590,
      4320
    ],
    "10 mg/vial (5 mg + 5 mg)": [
      7900,
      7900,
      7505,
      6715,
      6320
    ],
    "20 mg/vial (10 mg + 10 mg)": [
      8900,
      8900,
      8455,
      7565,
      7120
    ]
  },
  "cjc-ipa": {
    "10 mg/vial (CJC-1295 without DAC 5 mg + Ipamorelin 5 mg)": [
      7900,
      7900,
      7505,
      6715,
      6320
    ]
  },
  "bpc-tb": {
    "10 mg/vial (BPC-157 5 mg + TB-500 5 mg)": [
      5900,
      5900,
      5605,
      5015,
      4720
    ],
    "20 mg/vial (BPC-157 10 mg + TB-500 10 mg)": [
      8400,
      8400,
      7980,
      7140,
      6720
    ],
    "30 mg/vial (BPC-157 15 mg + TB-500 15 mg)": [
      11900,
      11900,
      11305,
      10115,
      9520
    ]
  },
  "glow": {
    "70 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg)": [
      12900,
      12900,
      12255,
      10965,
      10320
    ]
  },
  "klow": {
    "80 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg + KPV 10 mg)": [
      12900,
      12900,
      12255,
      10965,
      10320
    ]
  }
};
function priceMoney(cents) { return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100); }
function priceQuote(id,size,quantity,audienceDiscount=false) {
  const rates=miraiPrices[id]?.[size];
  if(!rates || !Number.isInteger(quantity) || quantity<1 || quantity>999) return null;
  const tier=quantity>=10?4:quantity>=5?3:quantity>=3?2:quantity>=2?1:0;
  const unit=audienceDiscount ? Math.round(rates[tier]*95/100) : rates[tier];
  return {unit,total:unit*quantity,saving:(rates[0]-unit)*quantity};
}
function priceText(id,size,quantity) {
  if(!Number.isInteger(quantity)||quantity<1||quantity>999) return 'Enter a whole number of vials from 1 to 999.';
  if(!size) return 'Select a vial size to see an estimate.';
  const q=priceQuote(id,size,quantity);
  return q ? `${priceMoney(q.unit)} per vial · ${priceMoney(q.total)} estimated total${quantity>=10?' · 20% off':quantity>=5?' · 15% off':quantity>=3?' · 5% off':''}${q.saving ? ' · quantity savings '+priceMoney(q.saving) : ''} · 1–2 vials: full price; 3–4: 5% off; 5–9: 15%; 10+: 20% (same compound and size; approved partner codes take an additional 5% off the discounted price).` : 'Price available on inquiry for this vial size.';
}
function priceFrom(id) {
  const entries=Object.values(miraiPrices[id]||{});
  return entries.length ? 'Estimated from '+priceMoney(Math.min(...entries.map(x=>x[0])))+' / single vial' : 'Pricing on inquiry';
}
