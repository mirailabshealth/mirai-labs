// Public customer estimates only. Values are USD cents per vial by quantity tier.
// Edit each size's [1, 2, 3-4, 5-9, 10+] rates here. No supplier costs are published.
const miraiPriceVersion = '2026-10-04-replacement-margin';
const miraiPrices = {
  "5-amino-1mq": {
    "5 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
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
    "10 mg/vial": [
      10800,
      10800,
      10260,
      9180,
      8640
    ],
    "5 mg/vial": [
      9500,
      9500,
      9025,
      8075,
      7600
    ]
  },
  "ahk-cu": {
    "20 mg/vial": [
      5400,
      5400,
      5130,
      4590,
      4320
    ],
    "50 mg/vial": [
      6300,
      6300,
      5985,
      5355,
      5040
    ]
  },
  "aod-9604": {
    "10 mg/vial": [
      9800,
      9800,
      9310,
      8330,
      7840
    ],
    "5 mg/vial": [
      7300,
      7300,
      6935,
      6205,
      5840
    ]
  },
  "ara-290": {
    "10 mg/vial": [
      6700,
      6700,
      6365,
      5695,
      5360
    ]
  },
  "bpc-157": {
    "10 mg/vial": [
      6400,
      6400,
      6080,
      5440,
      5120
    ],
    "5 mg/vial": [
      5700,
      5700,
      5415,
      4845,
      4560
    ]
  },
  "bpc-tb": {
    "10 mg/vial (BPC-157 5 mg + TB-500 5 mg)": [
      7200,
      7200,
      6840,
      6120,
      5760
    ],
    "20 mg/vial (BPC-157 10 mg + TB-500 10 mg)": [
      9500,
      9500,
      9025,
      8075,
      7600
    ],
    "30 mg/vial (BPC-157 15 mg + TB-500 15 mg)": [
      14100,
      14100,
      13395,
      11985,
      11280
    ]
  },
  "cagrilintide": {
    "10 mg/vial": [
      11900,
      11900,
      11305,
      10115,
      9520
    ],
    "2 mg/vial": [
      6300,
      6300,
      5985,
      5355,
      5040
    ],
    "5 mg/vial": [
      7400,
      7400,
      7030,
      6290,
      5920
    ]
  },
  "cagrisema": {
    "10 mg/vial (5 mg + 5 mg)": [
      9500,
      9500,
      9025,
      8075,
      7600
    ],
    "20 mg/vial (10 mg + 10 mg)": [
      10500,
      10500,
      9975,
      8925,
      8400
    ],
    "5 mg/vial (2.5 mg + 2.5 mg)": [
      6700,
      6700,
      6365,
      5695,
      5360
    ]
  },
  "cjc-1295": {
    "10 mg/vial": [
      8600,
      8600,
      8170,
      7310,
      6880
    ],
    "5 mg/vial": [
      7000,
      7000,
      6650,
      5950,
      5600
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
  "dsip": {
    "10 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ],
    "5 mg/vial": [
      5600,
      5600,
      5320,
      4760,
      4480
    ]
  },
  "epitalon": {
    "10 mg/vial": [
      5700,
      5700,
      5415,
      4845,
      4560
    ],
    "50 mg/vial": [
      8400,
      8400,
      7980,
      7140,
      6720
    ]
  },
  "foxo4-dri": {
    "10 mg/vial": [
      16600,
      16600,
      15770,
      14110,
      13280
    ],
    "2 mg/vial": [
      7200,
      7200,
      6840,
      6120,
      5760
    ]
  },
  "ghk-cu": {
    "100 mg/vial": [
      5700,
      5700,
      5415,
      4845,
      4560
    ],
    "50 mg/vial": [
      5200,
      5200,
      4940,
      4420,
      4160
    ]
  },
  "ghrp-2": {
    "10 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
    ],
    "15 mg/vial": [
      6500,
      6500,
      6175,
      5525,
      5200
    ],
    "5 mg/vial": [
      5400,
      5400,
      5130,
      4590,
      4320
    ]
  },
  "ghrp-6": {
    "10 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
    ],
    "5 mg/vial": [
      5400,
      5400,
      5130,
      4590,
      4320
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
  "glutathione": {
    "1500 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ]
  },
  "igf-1-lr3": {
    "0.1 mg/vial": [
      5700,
      5700,
      5415,
      4845,
      4560
    ],
    "1 mg/vial": [
      9800,
      9800,
      9310,
      8330,
      7840
    ]
  },
  "ipamorelin": {
    "10 mg/vial": [
      6600,
      6600,
      6270,
      5610,
      5280
    ],
    "5 mg/vial": [
      5700,
      5700,
      5415,
      4845,
      4560
    ]
  },
  "kisspeptin-10": {
    "10 mg/vial": [
      7200,
      7200,
      6840,
      6120,
      5760
    ],
    "5 mg/vial": [
      6000,
      6000,
      5700,
      5100,
      4800
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
  },
  "kpv": {
    "10 mg/vial": [
      6600,
      6600,
      6270,
      5610,
      5280
    ]
  },
  "matrixyl": {
    "10 mg/vial": [
      5500,
      5500,
      5225,
      4675,
      4400
    ]
  },
  "mazdutide": {
    "10 mg/vial": [
      11100,
      11100,
      10545,
      9435,
      8880
    ]
  },
  "mots-c": {
    "10 mg/vial": [
      6300,
      6300,
      5985,
      5355,
      5040
    ],
    "40 mg/vial": [
      11900,
      11900,
      11305,
      10115,
      9520
    ]
  },
  "mt-2": {
    "10 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
    ]
  },
  "nad": {
    "100 mg/vial": [
      5500,
      5500,
      5225,
      4675,
      4400
    ],
    "1000 mg/vial": [
      8900,
      8900,
      8455,
      7565,
      7120
    ],
    "500 mg/vial": [
      6300,
      6300,
      5985,
      5355,
      5040
    ]
  },
  "oxytocin": {
    "10 mg/vial": [
      7200,
      7200,
      6840,
      6120,
      5760
    ],
    "2 mg/vial": [
      5300,
      5300,
      5035,
      4505,
      4240
    ],
    "5 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
    ]
  },
  "p21": {
    "5 mg/vial": [
      13900,
      13900,
      13205,
      11815,
      11120
    ]
  },
  "pinealon": {
    "10 mg/vial": [
      6300,
      6300,
      5985,
      5355,
      5040
    ],
    "20 mg/vial": [
      7200,
      7200,
      6840,
      6120,
      5760
    ]
  },
  "pt-141": {
    "10 mg/vial": [
      6500,
      6500,
      6175,
      5525,
      5200
    ]
  },
  "retatrutide": {
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
    "5 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
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
  "selank": {
    "10 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ],
    "5 mg/vial": [
      5900,
      5900,
      5605,
      5015,
      4720
    ]
  },
  "semaglutide": {
    "10 mg/vial": [
      5700,
      5700,
      5415,
      4845,
      4560
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
    ],
    "5 mg/vial": [
      5400,
      5400,
      5130,
      4590,
      4320
    ]
  },
  "semax": {
    "10 mg/vial": [
      7000,
      7000,
      6650,
      5950,
      5600
    ],
    "5 mg/vial": [
      6100,
      6100,
      5795,
      5185,
      4880
    ]
  },
  "sermorelin": {
    "10 mg/vial": [
      8400,
      8400,
      7980,
      7140,
      6720
    ],
    "5 mg/vial": [
      6600,
      6600,
      6270,
      5610,
      5280
    ]
  },
  "snap-8": {
    "2 mg/vial": [
      5700,
      5700,
      5415,
      4845,
      4560
    ]
  },
  "ss-31": {
    "10 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
    ],
    "50 mg/vial": [
      17900,
      17900,
      17005,
      15215,
      14320
    ]
  },
  "survodutide": {
    "10 mg/vial": [
      16200,
      16200,
      15390,
      13770,
      12960
    ]
  },
  "tb-500": {
    "10 mg/vial": [
      8400,
      8400,
      7980,
      7140,
      6720
    ],
    "5 mg/vial": [
      6400,
      6400,
      6080,
      5440,
      5120
    ]
  },
  "tesamorelin": {
    "10 mg/vial": [
      9600,
      9600,
      9120,
      8160,
      7680
    ],
    "20 mg/vial": [
      15200,
      15200,
      14440,
      12920,
      12160
    ],
    "5 mg/vial": [
      7300,
      7300,
      6935,
      6205,
      5840
    ]
  },
  "thymosin-a1": {
    "10 mg/vial": [
      9100,
      9100,
      8645,
      7735,
      7280
    ],
    "5 mg/vial": [
      7300,
      7300,
      6935,
      6205,
      5840
    ]
  },
  "tirzepatide": {
    "10 mg/vial": [
      6900,
      6900,
      6555,
      5865,
      5520
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
    "5 mg/vial": [
      5500,
      5500,
      5225,
      4675,
      4400
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
