// Public customer estimates only. Values are USD cents per vial by quantity tier.
// Edit each size's [1-2, 3-4, 5-9, 10+] rates here. No supplier costs are published.
const miraiPriceVersion = '2026-10-02-volume-30-40';
const miraiPrices = {
  "retatrutide": {
    "10 mg/vial": [
      7900,
      7505,
      5530,
      4740
    ],
    "20 mg/vial": [
      11900,
      11305,
      8330,
      7140
    ],
    "30 mg/vial": [
      15900,
      15105,
      11130,
      9540
    ]
  },
  "tirzepatide": {
    "10 mg/vial": [
      6900,
      6555,
      4830,
      4140
    ],
    "20 mg/vial": [
      10900,
      10355,
      7630,
      6540
    ],
    "30 mg/vial": [
      13900,
      13205,
      9730,
      8340
    ],
    "60 mg/vial": [
      17900,
      17005,
      12530,
      10740
    ]
  },
  "semaglutide": {
    "5 mg/vial": [
      3712,
      3712,
      2598,
      2227
    ],
    "10 mg/vial": [
      3845,
      3845,
      2692,
      2307
    ],
    "15 mg/vial": [
      4000,
      4000,
      2800,
      2400
    ],
    "20 mg/vial": [
      4145,
      4145,
      2902,
      2487
    ],
    "30 mg/vial": [
      4334,
      4334,
      3034,
      2600
    ]
  },
  "cagrilintide": {
    "2 mg/vial": [
      4067,
      4067,
      2847,
      2440
    ],
    "5 mg/vial": [
      4534,
      4534,
      3174,
      2720
    ],
    "10 mg/vial": [
      5634,
      5634,
      3944,
      3380
    ]
  },
  "mazdutide": {
    "10 mg/vial": [
      6023,
      6023,
      4216,
      3614
    ]
  },
  "5-amino-1mq": {
    "5 mg/vial": [
      3912,
      3912,
      2738,
      2347
    ],
    "50 mg/vial": [
      4634,
      4634,
      3244,
      2780
    ]
  },
  "adipotide": {
    "5 mg/vial": [
      5356,
      5356,
      3749,
      3214
    ],
    "10 mg/vial": [
      5912,
      5912,
      4138,
      3547
    ]
  },
  "tb-500": {
    "5 mg/vial": [
      4112,
      4112,
      2878,
      2467
    ],
    "10 mg/vial": [
      4945,
      4945,
      3462,
      2967
    ]
  },
  "bpc-157": {
    "5 mg/vial": [
      3823,
      3823,
      2676,
      2294
    ],
    "10 mg/vial": [
      4112,
      4112,
      2878,
      2467
    ]
  },
  "kpv": {
    "10 mg/vial": [
      4189,
      4189,
      2932,
      2513
    ]
  },
  "thymosin-a1": {
    "5 mg/vial": [
      4478,
      4478,
      3135,
      2687
    ],
    "10 mg/vial": [
      5200,
      5200,
      3640,
      3120
    ]
  },
  "ara-290": {
    "10 mg/vial": [
      4223,
      4223,
      2956,
      2534
    ]
  },
  "ipamorelin": {
    "5 mg/vial": [
      3823,
      3823,
      2676,
      2294
    ],
    "10 mg/vial": [
      4200,
      4200,
      2940,
      2520
    ]
  },
  "cjc-1295": {
    "5 mg/vial": [
      4378,
      4378,
      3065,
      2627
    ],
    "10 mg/vial": [
      5000,
      5000,
      3500,
      3000
    ]
  },
  "tesamorelin": {
    "5 mg/vial": [
      4478,
      4478,
      3135,
      2687
    ],
    "10 mg/vial": [
      5400,
      5400,
      3780,
      3240
    ],
    "20 mg/vial": [
      7356,
      7356,
      5149,
      4414
    ]
  },
  "sermorelin": {
    "5 mg/vial": [
      4200,
      4200,
      2940,
      2520
    ],
    "10 mg/vial": [
      4912,
      4912,
      3438,
      2947
    ]
  },
  "ghrp-2": {
    "5 mg/vial": [
      3712,
      3712,
      2598,
      2227
    ],
    "10 mg/vial": [
      3934,
      3934,
      2754,
      2360
    ],
    "15 mg/vial": [
      4167,
      4167,
      2917,
      2500
    ]
  },
  "ghrp-6": {
    "5 mg/vial": [
      3712,
      3712,
      2598,
      2227
    ],
    "10 mg/vial": [
      3934,
      3934,
      2754,
      2360
    ]
  },
  "igf-1-lr3": {
    "0.1 mg/vial": [
      3845,
      3845,
      2692,
      2307
    ],
    "1 mg/vial": [
      5489,
      5489,
      3842,
      3293
    ]
  },
  "ghk-cu": {
    "50 mg/vial": [
      3623,
      3623,
      2536,
      2174
    ],
    "100 mg/vial": [
      3823,
      3823,
      2676,
      2294
    ]
  },
  "ahk-cu": {
    "20 mg/vial": [
      3723,
      3723,
      2606,
      2234
    ],
    "50 mg/vial": [
      4067,
      4067,
      2847,
      2440
    ]
  },
  "snap-8": {
    "2 mg/vial": [
      3845,
      3845,
      2692,
      2307
    ]
  },
  "matrixyl": {
    "10 mg/vial": [
      3767,
      3767,
      2637,
      2260
    ]
  },
  "epitalon": {
    "10 mg/vial": [
      3845,
      3845,
      2692,
      2307
    ],
    "50 mg/vial": [
      4945,
      4945,
      3462,
      2967
    ]
  },
  "mots-c": {
    "10 mg/vial": [
      4056,
      4056,
      2839,
      2434
    ],
    "40 mg/vial": [
      6067,
      6067,
      4247,
      3640
    ]
  },
  "ss-31": {
    "10 mg/vial": [
      4334,
      4334,
      3034,
      2600
    ],
    "50 mg/vial": [
      8223,
      8223,
      5756,
      4934
    ]
  },
  "nad": {
    "100 mg/vial": [
      3734,
      3734,
      2614,
      2240
    ],
    "500 mg/vial": [
      4056,
      4056,
      2839,
      2434
    ],
    "1000 mg/vial": [
      4912,
      4912,
      3438,
      2947
    ]
  },
  "foxo4-dri": {
    "2 mg/vial": [
      4456,
      4456,
      3119,
      2674
    ],
    "10 mg/vial": [
      7000,
      7000,
      4900,
      4200
    ]
  },
  "glutathione": {
    "1500 mg/vial": [
      4056,
      4056,
      2839,
      2434
    ]
  },
  "semax": {
    "5 mg/vial": [
      3989,
      3989,
      2792,
      2393
    ],
    "10 mg/vial": [
      4378,
      4378,
      3065,
      2627
    ]
  },
  "selank": {
    "5 mg/vial": [
      3912,
      3912,
      2738,
      2347
    ],
    "10 mg/vial": [
      4334,
      4334,
      3034,
      2600
    ]
  },
  "dsip": {
    "5 mg/vial": [
      3800,
      3800,
      2660,
      2280
    ],
    "10 mg/vial": [
      4334,
      4334,
      3034,
      2600
    ]
  },
  "pinealon": {
    "10 mg/vial": [
      4067,
      4067,
      2847,
      2440
    ],
    "20 mg/vial": [
      4434,
      4434,
      3104,
      2660
    ]
  },
  "p21": {
    "5 mg/vial": [
      6923,
      6923,
      4846,
      4154
    ]
  },
  "pt-141": {
    "10 mg/vial": [
      4145,
      4145,
      2902,
      2487
    ]
  },
  "mt-2": {
    "10 mg/vial": [
      3912,
      3912,
      2738,
      2347
    ]
  },
  "kisspeptin-10": {
    "5 mg/vial": [
      3967,
      3967,
      2777,
      2380
    ],
    "10 mg/vial": [
      4423,
      4423,
      3096,
      2654
    ]
  },
  "oxytocin": {
    "2 mg/vial": [
      3678,
      3678,
      2575,
      2207
    ],
    "5 mg/vial": [
      3912,
      3912,
      2738,
      2347
    ],
    "10 mg/vial": [
      4423,
      4423,
      3096,
      2654
    ]
  },
  "cagrisema": {
    "5 mg/vial (2.5 mg + 2.5 mg)": [
      4256,
      4256,
      2979,
      2554
    ],
    "10 mg/vial (5 mg + 5 mg)": [
      5356,
      5356,
      3749,
      3214
    ],
    "20 mg/vial (10 mg + 10 mg)": [
      5778,
      5778,
      4045,
      3467
    ]
  },
  "cjc-ipa": {
    "10 mg/vial (CJC-1295 without DAC 5 mg + Ipamorelin 5 mg)": [
      4634,
      4634,
      3244,
      2780
    ]
  },
  "bpc-tb": {
    "10 mg/vial (BPC-157 5 mg + TB-500 5 mg)": [
      4423,
      4423,
      3096,
      2654
    ],
    "20 mg/vial (BPC-157 10 mg + TB-500 10 mg)": [
      5356,
      5356,
      3749,
      3214
    ],
    "30 mg/vial (BPC-157 15 mg + TB-500 15 mg)": [
      7000,
      7000,
      4900,
      4200
    ]
  },
  "glow": {
    "70 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg)": [
      6389,
      6389,
      4472,
      3833
    ]
  },
  "klow": {
    "80 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg + KPV 10 mg)": [
      6389,
      6389,
      4472,
      3833
    ]
  }
};
function priceMoney(cents) { return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100); }
function priceQuote(id,size,quantity) {
  const rates=miraiPrices[id]?.[size];
  if(!rates || !Number.isInteger(quantity) || quantity<1 || quantity>999) return null;
  const tier=quantity>=10?3:quantity>=5?2:quantity>=3?1:0;
  const unit=rates[tier];
  return {unit,total:unit*quantity,saving:(rates[0]-unit)*quantity};
}
function priceText(id,size,quantity) {
  if(!Number.isInteger(quantity)||quantity<1||quantity>999) return 'Enter a whole number of vials from 1 to 999.';
  if(!size) return 'Select a vial size to see an estimate.';
  const q=priceQuote(id,size,quantity);
  return q ? `${priceMoney(q.unit)} per vial · ${priceMoney(q.total)} estimated total${quantity>=10?' · 40% off':quantity>=5?' · 30% off':''}${q.saving ? ' · quantity savings '+priceMoney(q.saving) : ''} · 5–9 vials: 30% off; 10+ vials: 40% off (same compound and size).` : 'Price available on inquiry for this vial size.';
}
function priceFrom(id) {
  const entries=Object.values(miraiPrices[id]||{});
  return entries.length ? 'Estimated from '+priceMoney(Math.min(...entries.map(x=>x[0])))+' / single vial' : 'Pricing on inquiry';
}
