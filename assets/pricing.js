// Public customer estimates only. Values are USD cents per vial by quantity tier.
// Edit each size's [1, 2, 3-4, 5-9, 10+] rates here. No supplier costs are published.
const miraiPriceVersion = '2026-10-02-quantity-update';
const miraiPrices = {
  "retatrutide": {
    "5 mg/vial": [
      5900,
      5900,
      5310,
      4720,
      4130
    ],
    "10 mg/vial": [
      7900,
      7900,
      7110,
      6320,
      5530
    ],
    "15 mg/vial": [
      9900,
      9900,
      8910,
      7920,
      6930
    ],
    "20 mg/vial": [
      11900,
      11900,
      10710,
      9520,
      8330
    ],
    "30 mg/vial": [
      15900,
      15900,
      14310,
      12720,
      11130
    ],
    "40 mg/vial": [
      19900,
      19900,
      17910,
      15920,
      13930
    ],
    "50 mg/vial": [
      23900,
      23900,
      21510,
      19120,
      16730
    ],
    "60 mg/vial": [
      27900,
      27900,
      25110,
      22320,
      19530
    ]
  },
  "tirzepatide": {
    "5 mg/vial": [
      4900,
      4900,
      4410,
      3920,
      3430
    ],
    "10 mg/vial": [
      6900,
      6900,
      6210,
      5520,
      4830
    ],
    "15 mg/vial": [
      8900,
      8900,
      8010,
      7120,
      6230
    ],
    "20 mg/vial": [
      10900,
      10900,
      9810,
      8720,
      7630
    ],
    "30 mg/vial": [
      13900,
      13900,
      12510,
      11120,
      9730
    ],
    "40 mg/vial": [
      15200,
      15200,
      13680,
      12160,
      10640
    ],
    "50 mg/vial": [
      16600,
      16600,
      14940,
      13280,
      11620
    ],
    "60 mg/vial": [
      17900,
      17900,
      16110,
      14320,
      12530
    ],
    "70 mg/vial": [
      19200,
      19200,
      17280,
      15360,
      13440
    ],
    "80 mg/vial": [
      20600,
      20600,
      18540,
      16480,
      14420
    ],
    "90 mg/vial": [
      21900,
      21900,
      19710,
      17520,
      15330
    ],
    "100 mg/vial": [
      23200,
      23200,
      20880,
      18560,
      16240
    ],
    "110 mg/vial": [
      24600,
      24600,
      22140,
      19680,
      17220
    ],
    "120 mg/vial": [
      25900,
      25900,
      23310,
      20720,
      18130
    ]
  },
  "semaglutide": {
    "5 mg/vial": [
      3712,
      3712,
      3341,
      2970,
      2598
    ],
    "10 mg/vial": [
      3845,
      3845,
      3461,
      3076,
      2692
    ],
    "15 mg/vial": [
      4000,
      4000,
      3600,
      3200,
      2800
    ],
    "20 mg/vial": [
      4145,
      4145,
      3731,
      3316,
      2902
    ],
    "30 mg/vial": [
      4334,
      4334,
      3901,
      3467,
      3034
    ]
  },
  "cagrilintide": {
    "2 mg/vial": [
      4067,
      4067,
      3660,
      3254,
      2847
    ],
    "5 mg/vial": [
      4534,
      4534,
      4081,
      3627,
      3174
    ],
    "10 mg/vial": [
      7634,
      7634,
      6871,
      6107,
      5344
    ]
  },
  "mazdutide": {
    "10 mg/vial": [
      8023,
      8023,
      7221,
      6418,
      5616
    ]
  },
  "5-amino-1mq": {
    "5 mg/vial": [
      3912,
      3912,
      3521,
      3130,
      2738
    ],
    "50 mg/vial": [
      4634,
      4634,
      4171,
      3707,
      3244
    ]
  },
  "adipotide": {
    "5 mg/vial": [
      7356,
      7356,
      6620,
      5885,
      5149
    ],
    "10 mg/vial": [
      7912,
      7912,
      7121,
      6330,
      5538
    ]
  },
  "tb-500": {
    "5 mg/vial": [
      4112,
      4112,
      3701,
      3290,
      2878
    ],
    "10 mg/vial": [
      6945,
      6945,
      6251,
      5556,
      4862
    ]
  },
  "bpc-157": {
    "5 mg/vial": [
      3823,
      3823,
      3441,
      3058,
      2676
    ],
    "10 mg/vial": [
      4112,
      4112,
      3701,
      3290,
      2878
    ]
  },
  "kpv": {
    "10 mg/vial": [
      4189,
      4189,
      3770,
      3351,
      2932
    ]
  },
  "thymosin-a1": {
    "5 mg/vial": [
      4478,
      4478,
      4030,
      3582,
      3135
    ],
    "10 mg/vial": [
      7200,
      7200,
      6480,
      5760,
      5040
    ]
  },
  "ara-290": {
    "10 mg/vial": [
      4223,
      4223,
      3801,
      3378,
      2956
    ]
  },
  "ipamorelin": {
    "5 mg/vial": [
      3823,
      3823,
      3441,
      3058,
      2676
    ],
    "10 mg/vial": [
      4200,
      4200,
      3780,
      3360,
      2940
    ]
  },
  "cjc-1295": {
    "5 mg/vial": [
      4378,
      4378,
      3940,
      3502,
      3065
    ],
    "10 mg/vial": [
      7000,
      7000,
      6300,
      5600,
      4900
    ]
  },
  "tesamorelin": {
    "5 mg/vial": [
      4478,
      4478,
      4030,
      3582,
      3135
    ],
    "10 mg/vial": [
      7400,
      7400,
      6660,
      5920,
      5180
    ],
    "20 mg/vial": [
      9356,
      9356,
      8420,
      7485,
      6549
    ]
  },
  "sermorelin": {
    "5 mg/vial": [
      4200,
      4200,
      3780,
      3360,
      2940
    ],
    "10 mg/vial": [
      6912,
      6912,
      6221,
      5530,
      4838
    ]
  },
  "ghrp-2": {
    "5 mg/vial": [
      3712,
      3712,
      3341,
      2970,
      2598
    ],
    "10 mg/vial": [
      3934,
      3934,
      3541,
      3147,
      2754
    ],
    "15 mg/vial": [
      4167,
      4167,
      3750,
      3334,
      2917
    ]
  },
  "ghrp-6": {
    "5 mg/vial": [
      3712,
      3712,
      3341,
      2970,
      2598
    ],
    "10 mg/vial": [
      3934,
      3934,
      3541,
      3147,
      2754
    ]
  },
  "igf-1-lr3": {
    "0.1 mg/vial": [
      3845,
      3845,
      3461,
      3076,
      2692
    ],
    "1 mg/vial": [
      7489,
      7489,
      6740,
      5991,
      5242
    ]
  },
  "ghk-cu": {
    "50 mg/vial": [
      3623,
      3623,
      3261,
      2898,
      2536
    ],
    "100 mg/vial": [
      3823,
      3823,
      3441,
      3058,
      2676
    ]
  },
  "ahk-cu": {
    "20 mg/vial": [
      3723,
      3723,
      3351,
      2978,
      2606
    ],
    "50 mg/vial": [
      4067,
      4067,
      3660,
      3254,
      2847
    ]
  },
  "snap-8": {
    "2 mg/vial": [
      3845,
      3845,
      3461,
      3076,
      2692
    ]
  },
  "matrixyl": {
    "10 mg/vial": [
      3767,
      3767,
      3390,
      3014,
      2637
    ]
  },
  "epitalon": {
    "10 mg/vial": [
      3845,
      3845,
      3461,
      3076,
      2692
    ],
    "50 mg/vial": [
      6945,
      6945,
      6251,
      5556,
      4862
    ]
  },
  "mots-c": {
    "10 mg/vial": [
      4056,
      4056,
      3650,
      3245,
      2839
    ],
    "40 mg/vial": [
      8067,
      8067,
      7260,
      6454,
      5647
    ]
  },
  "ss-31": {
    "10 mg/vial": [
      4334,
      4334,
      3901,
      3467,
      3034
    ],
    "50 mg/vial": [
      10223,
      10223,
      9201,
      8178,
      7156
    ]
  },
  "nad": {
    "100 mg/vial": [
      3734,
      3734,
      3361,
      2987,
      2614
    ],
    "500 mg/vial": [
      4056,
      4056,
      3650,
      3245,
      2839
    ],
    "1000 mg/vial": [
      6912,
      6912,
      6221,
      5530,
      4838
    ]
  },
  "foxo4-dri": {
    "2 mg/vial": [
      4456,
      4456,
      4010,
      3565,
      3119
    ],
    "10 mg/vial": [
      9000,
      9000,
      8100,
      7200,
      6300
    ]
  },
  "glutathione": {
    "1500 mg/vial": [
      4056,
      4056,
      3650,
      3245,
      2839
    ]
  },
  "semax": {
    "5 mg/vial": [
      3989,
      3989,
      3590,
      3191,
      2792
    ],
    "10 mg/vial": [
      4378,
      4378,
      3940,
      3502,
      3065
    ]
  },
  "selank": {
    "5 mg/vial": [
      3912,
      3912,
      3521,
      3130,
      2738
    ],
    "10 mg/vial": [
      4334,
      4334,
      3901,
      3467,
      3034
    ]
  },
  "dsip": {
    "5 mg/vial": [
      3800,
      3800,
      3420,
      3040,
      2660
    ],
    "10 mg/vial": [
      4334,
      4334,
      3901,
      3467,
      3034
    ]
  },
  "pinealon": {
    "10 mg/vial": [
      4067,
      4067,
      3660,
      3254,
      2847
    ],
    "20 mg/vial": [
      4434,
      4434,
      3991,
      3547,
      3104
    ]
  },
  "p21": {
    "5 mg/vial": [
      8923,
      8923,
      8031,
      7138,
      6246
    ]
  },
  "pt-141": {
    "10 mg/vial": [
      4145,
      4145,
      3731,
      3316,
      2902
    ]
  },
  "mt-2": {
    "10 mg/vial": [
      3912,
      3912,
      3521,
      3130,
      2738
    ]
  },
  "kisspeptin-10": {
    "5 mg/vial": [
      3967,
      3967,
      3570,
      3174,
      2777
    ],
    "10 mg/vial": [
      4423,
      4423,
      3981,
      3538,
      3096
    ]
  },
  "oxytocin": {
    "2 mg/vial": [
      3678,
      3678,
      3310,
      2942,
      2575
    ],
    "5 mg/vial": [
      3912,
      3912,
      3521,
      3130,
      2738
    ],
    "10 mg/vial": [
      4423,
      4423,
      3981,
      3538,
      3096
    ]
  },
  "cagrisema": {
    "5 mg/vial (2.5 mg + 2.5 mg)": [
      4256,
      4256,
      3830,
      3405,
      2979
    ],
    "10 mg/vial (5 mg + 5 mg)": [
      7356,
      7356,
      6620,
      5885,
      5149
    ],
    "20 mg/vial (10 mg + 10 mg)": [
      7778,
      7778,
      7000,
      6222,
      5445
    ]
  },
  "cjc-ipa": {
    "10 mg/vial (CJC-1295 without DAC 5 mg + Ipamorelin 5 mg)": [
      4634,
      4634,
      4171,
      3707,
      3244
    ]
  },
  "bpc-tb": {
    "10 mg/vial (BPC-157 5 mg + TB-500 5 mg)": [
      4423,
      4423,
      3981,
      3538,
      3096
    ],
    "20 mg/vial (BPC-157 10 mg + TB-500 10 mg)": [
      7356,
      7356,
      6620,
      5885,
      5149
    ],
    "30 mg/vial (BPC-157 15 mg + TB-500 15 mg)": [
      9000,
      9000,
      8100,
      7200,
      6300
    ]
  },
  "glow": {
    "70 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg)": [
      8389,
      8389,
      7550,
      6711,
      5872
    ]
  },
  "klow": {
    "80 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg + KPV 10 mg)": [
      8389,
      8389,
      7550,
      6711,
      5872
    ]
  }
};
function priceMoney(cents) { return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100); }
function priceQuote(id,size,quantity) {
  const rates=miraiPrices[id]?.[size];
  if(!rates || !Number.isInteger(quantity) || quantity<1 || quantity>999) return null;
  const tier=quantity>=10?4:quantity>=5?3:quantity>=3?2:quantity>=2?1:0;
  const unit=rates[tier];
  return {unit,total:unit*quantity,saving:(rates[0]-unit)*quantity};
}
function priceText(id,size,quantity) {
  if(!Number.isInteger(quantity)||quantity<1||quantity>999) return 'Enter a whole number of vials from 1 to 999.';
  if(!size) return 'Select a vial size to see an estimate.';
  const q=priceQuote(id,size,quantity);
  return q ? `${priceMoney(q.unit)} per vial · ${priceMoney(q.total)} estimated total${quantity>=10?' · 30% off':quantity>=5?' · 20% off':quantity>=3?' · 10% off':''}${q.saving ? ' · quantity savings '+priceMoney(q.saving) : ''} · 1–2 vials: full price; 3–4: 10% off; 5–9: 20%; 10+: 30% (same compound and size; discounts do not stack).` : 'Price available on inquiry for this vial size.';
}
function priceFrom(id) {
  const entries=Object.values(miraiPrices[id]||{});
  return entries.length ? 'Estimated from '+priceMoney(Math.min(...entries.map(x=>x[0])))+' / single vial' : 'Pricing on inquiry';
}
