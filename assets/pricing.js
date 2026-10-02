// Public customer estimates only. Values are USD cents per vial by quantity tier.
// Edit each size's [1-2, 3-4, 5-9, 10+] rates here. No supplier costs are published.
const miraiPriceVersion = '2026-10-02';
const miraiPrices = {
  "retatrutide": {
    "10 mg/vial": [
      7900,
      7505,
      7110,
      6715
    ],
    "20 mg/vial": [
      11900,
      11305,
      10710,
      10115
    ],
    "30 mg/vial": [
      15900,
      15105,
      14310,
      13515
    ]
  },
  "tirzepatide": {
    "10 mg/vial": [
      6900,
      6555,
      6210,
      5865
    ],
    "20 mg/vial": [
      10900,
      10355,
      9810,
      9265
    ],
    "30 mg/vial": [
      13900,
      13205,
      12510,
      11815
    ],
    "60 mg/vial": [
      17900,
      17005,
      16110,
      15215
    ]
  },
  "semaglutide": {
    "5 mg/vial": [
      3712,
      3712,
      3712,
      3712
    ],
    "10 mg/vial": [
      3845,
      3845,
      3845,
      3845
    ],
    "15 mg/vial": [
      4000,
      4000,
      4000,
      4000
    ],
    "20 mg/vial": [
      4145,
      4145,
      4145,
      4145
    ],
    "30 mg/vial": [
      4334,
      4334,
      4334,
      4334
    ]
  },
  "cagrilintide": {
    "2 mg/vial": [
      4067,
      4067,
      4067,
      4067
    ],
    "5 mg/vial": [
      4534,
      4534,
      4534,
      4534
    ],
    "10 mg/vial": [
      5634,
      5634,
      5634,
      5634
    ]
  },
  "mazdutide": {
    "10 mg/vial": [
      6023,
      6023,
      6023,
      6023
    ]
  },
  "5-amino-1mq": {
    "5 mg/vial": [
      3912,
      3912,
      3912,
      3912
    ],
    "50 mg/vial": [
      4634,
      4634,
      4634,
      4634
    ]
  },
  "adipotide": {
    "5 mg/vial": [
      5356,
      5356,
      5356,
      5356
    ],
    "10 mg/vial": [
      5912,
      5912,
      5912,
      5912
    ]
  },
  "tb-500": {
    "5 mg/vial": [
      4112,
      4112,
      4112,
      4112
    ],
    "10 mg/vial": [
      4945,
      4945,
      4945,
      4945
    ]
  },
  "bpc-157": {
    "5 mg/vial": [
      3823,
      3823,
      3823,
      3823
    ],
    "10 mg/vial": [
      4112,
      4112,
      4112,
      4112
    ]
  },
  "kpv": {
    "10 mg/vial": [
      4189,
      4189,
      4189,
      4189
    ]
  },
  "thymosin-a1": {
    "5 mg/vial": [
      4478,
      4478,
      4478,
      4478
    ],
    "10 mg/vial": [
      5200,
      5200,
      5200,
      5200
    ]
  },
  "ara-290": {
    "10 mg/vial": [
      4223,
      4223,
      4223,
      4223
    ]
  },
  "ipamorelin": {
    "5 mg/vial": [
      3823,
      3823,
      3823,
      3823
    ],
    "10 mg/vial": [
      4200,
      4200,
      4200,
      4200
    ]
  },
  "cjc-1295": {
    "5 mg/vial": [
      4378,
      4378,
      4378,
      4378
    ],
    "10 mg/vial": [
      5000,
      5000,
      5000,
      5000
    ]
  },
  "tesamorelin": {
    "5 mg/vial": [
      4478,
      4478,
      4478,
      4478
    ],
    "10 mg/vial": [
      5400,
      5400,
      5400,
      5400
    ],
    "20 mg/vial": [
      7356,
      7356,
      7356,
      7356
    ]
  },
  "sermorelin": {
    "5 mg/vial": [
      4200,
      4200,
      4200,
      4200
    ],
    "10 mg/vial": [
      4912,
      4912,
      4912,
      4912
    ]
  },
  "ghrp-2": {
    "5 mg/vial": [
      3712,
      3712,
      3712,
      3712
    ],
    "10 mg/vial": [
      3934,
      3934,
      3934,
      3934
    ],
    "15 mg/vial": [
      4167,
      4167,
      4167,
      4167
    ]
  },
  "ghrp-6": {
    "5 mg/vial": [
      3712,
      3712,
      3712,
      3712
    ],
    "10 mg/vial": [
      3934,
      3934,
      3934,
      3934
    ]
  },
  "igf-1-lr3": {
    "0.1 mg/vial": [
      3845,
      3845,
      3845,
      3845
    ],
    "1 mg/vial": [
      5489,
      5489,
      5489,
      5489
    ]
  },
  "ghk-cu": {
    "50 mg/vial": [
      3623,
      3623,
      3623,
      3623
    ],
    "100 mg/vial": [
      3823,
      3823,
      3823,
      3823
    ]
  },
  "ahk-cu": {
    "20 mg/vial": [
      3723,
      3723,
      3723,
      3723
    ],
    "50 mg/vial": [
      4067,
      4067,
      4067,
      4067
    ]
  },
  "snap-8": {
    "2 mg/vial": [
      3845,
      3845,
      3845,
      3845
    ]
  },
  "matrixyl": {
    "10 mg/vial": [
      3767,
      3767,
      3767,
      3767
    ]
  },
  "epitalon": {
    "10 mg/vial": [
      3845,
      3845,
      3845,
      3845
    ],
    "50 mg/vial": [
      4945,
      4945,
      4945,
      4945
    ]
  },
  "mots-c": {
    "10 mg/vial": [
      4056,
      4056,
      4056,
      4056
    ],
    "40 mg/vial": [
      6067,
      6067,
      6067,
      6067
    ]
  },
  "ss-31": {
    "10 mg/vial": [
      4334,
      4334,
      4334,
      4334
    ],
    "50 mg/vial": [
      8223,
      8223,
      8223,
      8223
    ]
  },
  "nad": {
    "100 mg/vial": [
      3734,
      3734,
      3734,
      3734
    ],
    "500 mg/vial": [
      4056,
      4056,
      4056,
      4056
    ],
    "1000 mg/vial": [
      4912,
      4912,
      4912,
      4912
    ]
  },
  "foxo4-dri": {
    "2 mg/vial": [
      4456,
      4456,
      4456,
      4456
    ],
    "10 mg/vial": [
      7000,
      7000,
      7000,
      7000
    ]
  },
  "glutathione": {
    "1500 mg/vial": [
      4056,
      4056,
      4056,
      4056
    ]
  },
  "semax": {
    "5 mg/vial": [
      3989,
      3989,
      3989,
      3989
    ],
    "10 mg/vial": [
      4378,
      4378,
      4378,
      4378
    ]
  },
  "selank": {
    "5 mg/vial": [
      3912,
      3912,
      3912,
      3912
    ],
    "10 mg/vial": [
      4334,
      4334,
      4334,
      4334
    ]
  },
  "dsip": {
    "5 mg/vial": [
      3800,
      3800,
      3800,
      3800
    ],
    "10 mg/vial": [
      4334,
      4334,
      4334,
      4334
    ]
  },
  "pinealon": {
    "10 mg/vial": [
      4067,
      4067,
      4067,
      4067
    ],
    "20 mg/vial": [
      4434,
      4434,
      4434,
      4434
    ]
  },
  "p21": {
    "5 mg/vial": [
      6923,
      6923,
      6923,
      6923
    ]
  },
  "pt-141": {
    "10 mg/vial": [
      4145,
      4145,
      4145,
      4145
    ]
  },
  "mt-2": {
    "10 mg/vial": [
      3912,
      3912,
      3912,
      3912
    ]
  },
  "kisspeptin-10": {
    "5 mg/vial": [
      3967,
      3967,
      3967,
      3967
    ],
    "10 mg/vial": [
      4423,
      4423,
      4423,
      4423
    ]
  },
  "oxytocin": {
    "2 mg/vial": [
      3678,
      3678,
      3678,
      3678
    ],
    "5 mg/vial": [
      3912,
      3912,
      3912,
      3912
    ],
    "10 mg/vial": [
      4423,
      4423,
      4423,
      4423
    ]
  },
  "cagrisema": {
    "5 mg/vial (2.5 mg + 2.5 mg)": [
      4256,
      4256,
      4256,
      4256
    ],
    "10 mg/vial (5 mg + 5 mg)": [
      5356,
      5356,
      5356,
      5356
    ],
    "20 mg/vial (10 mg + 10 mg)": [
      5778,
      5778,
      5778,
      5778
    ]
  },
  "cjc-ipa": {
    "10 mg/vial (CJC-1295 without DAC 5 mg + Ipamorelin 5 mg)": [
      4634,
      4634,
      4634,
      4634
    ]
  },
  "bpc-tb": {
    "10 mg/vial (BPC-157 5 mg + TB-500 5 mg)": [
      4423,
      4423,
      4423,
      4423
    ],
    "20 mg/vial (BPC-157 10 mg + TB-500 10 mg)": [
      5356,
      5356,
      5356,
      5356
    ],
    "30 mg/vial (BPC-157 15 mg + TB-500 15 mg)": [
      7000,
      7000,
      7000,
      7000
    ]
  },
  "glow": {
    "70 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg)": [
      6389,
      6389,
      6389,
      6389
    ]
  },
  "klow": {
    "80 mg/vial (BPC-157 10 mg + GHK-Cu 50 mg + TB-500 10 mg + KPV 10 mg)": [
      6389,
      6389,
      6389,
      6389
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
  return q ? `${priceMoney(q.unit)} per vial · ${priceMoney(q.total)} estimated total${q.saving ? ' · quantity savings '+priceMoney(q.saving) : ''}` : 'Price available on inquiry for this vial size.';
}
function priceFrom(id) {
  const entries=Object.values(miraiPrices[id]||{});
  return entries.length ? 'Estimated from '+priceMoney(Math.min(...entries.map(x=>x[0])))+' / single vial' : 'Pricing on inquiry';
}
