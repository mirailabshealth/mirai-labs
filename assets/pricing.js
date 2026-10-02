// Public customer estimates only. Values are USD cents per vial by quantity tier.
// Edit each size's [1, 2, 3-4, 5-9, 10+] rates here. No supplier costs are published.
const miraiPriceVersion = '2026-10-02-stacked-offers';
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
      3712,
      3712,
      3526,
      3155,
      2970
    ],
    "10 mg/vial": [
      3845,
      3845,
      3653,
      3268,
      3076
    ],
    "15 mg/vial": [
      4000,
      4000,
      3800,
      3400,
      3200
    ],
    "20 mg/vial": [
      4145,
      4145,
      3938,
      3523,
      3316
    ],
    "30 mg/vial": [
      4334,
      4334,
      4117,
      3684,
      3467
    ]
  },
  "cagrilintide": {
    "2 mg/vial": [
      4067,
      4067,
      3864,
      3457,
      3254
    ],
    "5 mg/vial": [
      4534,
      4534,
      4307,
      3854,
      3627
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
      8023,
      8023,
      7622,
      6820,
      6418
    ]
  },
  "5-amino-1mq": {
    "5 mg/vial": [
      3912,
      3912,
      3716,
      3325,
      3130
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
      7356,
      7356,
      6988,
      6253,
      5885
    ],
    "10 mg/vial": [
      7912,
      7912,
      7516,
      6725,
      6330
    ]
  },
  "tb-500": {
    "5 mg/vial": [
      4112,
      4112,
      3906,
      3495,
      3290
    ],
    "10 mg/vial": [
      6945,
      6945,
      6598,
      5903,
      5556
    ]
  },
  "bpc-157": {
    "5 mg/vial": [
      3823,
      3823,
      3632,
      3250,
      3058
    ],
    "10 mg/vial": [
      4112,
      4112,
      3906,
      3495,
      3290
    ]
  },
  "kpv": {
    "10 mg/vial": [
      4189,
      4189,
      3980,
      3561,
      3351
    ]
  },
  "thymosin-a1": {
    "5 mg/vial": [
      4478,
      4478,
      4254,
      3806,
      3582
    ],
    "10 mg/vial": [
      7200,
      7200,
      6840,
      6120,
      5760
    ]
  },
  "ara-290": {
    "10 mg/vial": [
      4223,
      4223,
      4012,
      3590,
      3378
    ]
  },
  "ipamorelin": {
    "5 mg/vial": [
      3823,
      3823,
      3632,
      3250,
      3058
    ],
    "10 mg/vial": [
      4200,
      4200,
      3990,
      3570,
      3360
    ]
  },
  "cjc-1295": {
    "5 mg/vial": [
      4378,
      4378,
      4159,
      3721,
      3502
    ],
    "10 mg/vial": [
      7000,
      7000,
      6650,
      5950,
      5600
    ]
  },
  "tesamorelin": {
    "5 mg/vial": [
      4478,
      4478,
      4254,
      3806,
      3582
    ],
    "10 mg/vial": [
      7400,
      7400,
      7030,
      6290,
      5920
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
      4200,
      4200,
      3990,
      3570,
      3360
    ],
    "10 mg/vial": [
      6912,
      6912,
      6566,
      5875,
      5530
    ]
  },
  "ghrp-2": {
    "5 mg/vial": [
      3712,
      3712,
      3526,
      3155,
      2970
    ],
    "10 mg/vial": [
      3934,
      3934,
      3737,
      3344,
      3147
    ],
    "15 mg/vial": [
      4167,
      4167,
      3959,
      3542,
      3334
    ]
  },
  "ghrp-6": {
    "5 mg/vial": [
      3712,
      3712,
      3526,
      3155,
      2970
    ],
    "10 mg/vial": [
      3934,
      3934,
      3737,
      3344,
      3147
    ]
  },
  "igf-1-lr3": {
    "0.1 mg/vial": [
      3845,
      3845,
      3653,
      3268,
      3076
    ],
    "1 mg/vial": [
      7489,
      7489,
      7115,
      6366,
      5991
    ]
  },
  "ghk-cu": {
    "50 mg/vial": [
      3623,
      3623,
      3442,
      3080,
      2898
    ],
    "100 mg/vial": [
      3823,
      3823,
      3632,
      3250,
      3058
    ]
  },
  "ahk-cu": {
    "20 mg/vial": [
      3723,
      3723,
      3537,
      3165,
      2978
    ],
    "50 mg/vial": [
      4067,
      4067,
      3864,
      3457,
      3254
    ]
  },
  "snap-8": {
    "2 mg/vial": [
      3845,
      3845,
      3653,
      3268,
      3076
    ]
  },
  "matrixyl": {
    "10 mg/vial": [
      3767,
      3767,
      3579,
      3202,
      3014
    ]
  },
  "epitalon": {
    "10 mg/vial": [
      3845,
      3845,
      3653,
      3268,
      3076
    ],
    "50 mg/vial": [
      6945,
      6945,
      6598,
      5903,
      5556
    ]
  },
  "mots-c": {
    "10 mg/vial": [
      4056,
      4056,
      3853,
      3448,
      3245
    ],
    "40 mg/vial": [
      8067,
      8067,
      7664,
      6857,
      6454
    ]
  },
  "ss-31": {
    "10 mg/vial": [
      4334,
      4334,
      4117,
      3684,
      3467
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
      3734,
      3734,
      3547,
      3174,
      2987
    ],
    "500 mg/vial": [
      4056,
      4056,
      3853,
      3448,
      3245
    ],
    "1000 mg/vial": [
      6912,
      6912,
      6566,
      5875,
      5530
    ]
  },
  "foxo4-dri": {
    "2 mg/vial": [
      4456,
      4456,
      4233,
      3788,
      3565
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
      4056,
      4056,
      3853,
      3448,
      3245
    ]
  },
  "semax": {
    "5 mg/vial": [
      3989,
      3989,
      3790,
      3391,
      3191
    ],
    "10 mg/vial": [
      4378,
      4378,
      4159,
      3721,
      3502
    ]
  },
  "selank": {
    "5 mg/vial": [
      3912,
      3912,
      3716,
      3325,
      3130
    ],
    "10 mg/vial": [
      4334,
      4334,
      4117,
      3684,
      3467
    ]
  },
  "dsip": {
    "5 mg/vial": [
      3800,
      3800,
      3610,
      3230,
      3040
    ],
    "10 mg/vial": [
      4334,
      4334,
      4117,
      3684,
      3467
    ]
  },
  "pinealon": {
    "10 mg/vial": [
      4067,
      4067,
      3864,
      3457,
      3254
    ],
    "20 mg/vial": [
      4434,
      4434,
      4212,
      3769,
      3547
    ]
  },
  "p21": {
    "5 mg/vial": [
      8923,
      8923,
      8477,
      7585,
      7138
    ]
  },
  "pt-141": {
    "10 mg/vial": [
      4145,
      4145,
      3938,
      3523,
      3316
    ]
  },
  "mt-2": {
    "10 mg/vial": [
      3912,
      3912,
      3716,
      3325,
      3130
    ]
  },
  "kisspeptin-10": {
    "5 mg/vial": [
      3967,
      3967,
      3769,
      3372,
      3174
    ],
    "10 mg/vial": [
      4423,
      4423,
      4202,
      3760,
      3538
    ]
  },
  "oxytocin": {
    "2 mg/vial": [
      3678,
      3678,
      3494,
      3126,
      2942
    ],
    "5 mg/vial": [
      3912,
      3912,
      3716,
      3325,
      3130
    ],
    "10 mg/vial": [
      4423,
      4423,
      4202,
      3760,
      3538
    ]
  },
  "cagrisema": {
    "5 mg/vial (2.5 mg + 2.5 mg)": [
      4256,
      4256,
      4043,
      3618,
      3405
    ],
    "10 mg/vial (5 mg + 5 mg)": [
      7356,
      7356,
      6988,
      6253,
      5885
    ],
    "20 mg/vial (10 mg + 10 mg)": [
      7778,
      7778,
      7389,
      6611,
      6222
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
      4423,
      4423,
      4202,
      3760,
      3538
    ],
    "20 mg/vial (BPC-157 10 mg + TB-500 10 mg)": [
      7356,
      7356,
      6988,
      6253,
      5885
    ],
    "30 mg/vial (BPC-157 15 mg + TB-500 15 mg)": [
      9000,
      9000,
      8550,
      7650,
      7200
    ]
  },
  "glow": {
    "70 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg)": [
      8389,
      8389,
      7970,
      7131,
      6711
    ]
  },
  "klow": {
    "80 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg + KPV 10 mg)": [
      8389,
      8389,
      7970,
      7131,
      6711
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
