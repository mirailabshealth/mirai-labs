/* Curated educational evidence. Initial review 2026-10-04 UTC; selected updates 2026-10-05 UTC. No dosing guidance.
   Evidence labels describe the cited studies, not an exhaustive systematic review.
   Product identity, formulation, route and study population limit applicability. */
const researchEvidence = {};
const study = (id, label) => ({url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`, label});
const safetySource = {url:'https://www.fda.gov/drugs/human-drug-compounding/certain-bulk-drug-substances-use-compounding-may-present-significant-safety-risks',label:'FDA: safety uncertainties for selected compounded substances'};
const glpSource = {url:'https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management',label:'FDA: tirzepatide mechanisms and combination limitations'};
function evidence(id, level, mechanism, findings, limits, safety, sources) {
  researchEvidence[id] = {level,mechanism,findings,limits,safety,sources};
}
evidence('retatrutide','Human randomized trial',
'This investigational multi-receptor agonist activates GLP-1, GIP and glucagon receptors. These signals influence appetite, glucose handling and energy metabolism; receptor activity alone does not establish a clinical benefit.',
'A 2023 phase 2 obesity trial followed adults for 48 weeks. Mean weight reduction reached 24.2% in the highest studied group. This was an individual-drug trial, not a trial of adding retatrutide to other weight-management peptides.',
'Phase 2 results cannot establish long-term outcomes or predict results for a particular person. Percentages from separate trials should not be treated as head-to-head comparisons.',
'Gastrointestinal adverse effects and increased heart rate were reported. Combining it with another GLP-1-active compound introduces overlapping pharmacology without established benefit in the studies cited.',[study('37366315','2023: Retatrutide phase 2 obesity trial')]);
evidence('tirzepatide','Human randomized trial',
'Tirzepatide activates GIP and GLP-1 receptors, affecting glucose-dependent insulin secretion and appetite. A dual-action molecule is not the same as mixing two separately supplied products.',
'SURMOUNT-1 (2022) studied 2,539 adults with obesity or overweight without diabetes over 72 weeks. The highest studied group had a mean 20.9% weight reduction versus 3.1% with placebo, with lifestyle intervention in both groups.',
'These findings concern the trial formulation and population. They do not establish equivalence of research vials or arbitrary combinations.',
'Gastrointestinal effects were common. FDA states that Zepbound should not be combined with another tirzepatide product or a GLP-1 receptor agonist.',[study('35658024','2022: SURMOUNT-1'),glpSource]);
evidence('semaglutide','Human randomized trial',
'Semaglutide activates the GLP-1 receptor, influencing appetite, insulin and glucagon signaling, and gastric emptying.',
'STEP 1 (2021) enrolled 1,961 adults with overweight or obesity without diabetes. At 68 weeks, average weight reduction was 14.9% with semaglutide versus 2.4% with placebo, alongside lifestyle intervention.',
'A controlled trial measures an average in a defined population. It does not validate every formulation or predict individual outcomes; it also does not test stacking with another GLP-1 agonist.',
'Nausea and diarrhea were common trial adverse effects. Adding other appetite- or GLP-1-active agents may compound tolerability problems; the magnitude of an untested interaction is unknown.',[study('33567185','2021: STEP 1 trial')]);
evidence('cagrilintide','Human randomized trial',
'Cagrilintide is a long-acting amylin analogue studied for satiety signaling. Amylin and GLP-1 act through different receptors, providing a rationale for research on the pair, not proof that any combination is safe.',
'A 2021 randomized phase 2 trial in adults with overweight or obesity found greater weight reduction with cagrilintide than placebo over 26 weeks.',
'Monotherapy evidence and cagrilintide-semaglutide trial evidence answer different questions. Neither establishes outcomes when cagrilintide is added to retatrutide or tirzepatide.',
'Gastrointestinal adverse effects were reported. Combination-related nausea or reduced intake must be evaluated directly rather than assumed to be acceptable.',[study('34798060','2021: Cagrilintide phase 2 trial')]);
evidence('cagrisema','Direct human combination trial',
'CagriSema refers to coadministration of cagrilintide and semaglutide, combining amylin-related satiety signaling with GLP-1 receptor agonism.',
'REDEFINE 1 (2025) randomized 3,417 adults with overweight or obesity without diabetes. At 68 weeks, the treatment-policy analysis estimated mean weight change of −20.4% with the combination versus −3.0% with placebo. Gastrointestinal adverse events occurred in 79.6% versus 39.9%.',
'The trial tested controlled study medicines and a defined protocol. A catalog blend is not shown to have the same identity, stability, bioavailability or outcomes. This trial does not validate additional compounds.',
'Adding semaglutide or cagrilintide separately duplicates a component. Adding another GLP-1-active compound creates further overlap.',[study('40544433','2025: REDEFINE 1 combination trial')]);
evidence('survodutide','Human randomized trial',
'Survodutide activates GLP-1 and glucagon receptors. Research examines the balance between appetite, energy expenditure and glucose regulation.',
'A 2024 randomized phase 2 study in adults with overweight or obesity evaluated body-weight change over 46 weeks and reported weight reduction with survodutide.',
'Treatment discontinuation and the analysis population matter when interpreting weight-loss estimates. These results do not establish benefit from adding another metabolic peptide.',
'Gastrointestinal adverse effects affected tolerability. Overlap with other GLP-1-active agents is a concern requiring direct study.',[study('38330987','2024: Survodutide phase 2 obesity trial')]);
evidence('mazdutide','Human randomized trial',
'Mazdutide is a dual GLP-1/glucagon receptor agonist studied for body-weight and metabolic outcomes.',
'The 2025 GLORY-1 phase 3 trial in Chinese adults with overweight or obesity reported significant weight reduction versus placebo across 48 weeks.',
'Population, formulation and duration limit generalization. Results do not establish an optimal combination with other GLP-1-active compounds.',
'Gastrointestinal tolerability is an important trial outcome. More receptor stimulation should not be assumed to mean better or safer results.',[study('40421736','2025: GLORY-1 phase 3 trial')]);
evidence('aod-9604','Animal study; human safety uncertainty',
'AOD-9604 is a modified fragment related to the fat-metabolism region of human growth hormone. Its proposed lipid effects should not be equated with the full hormone.',
'A 2000 study in obese Zucker rats examined lipid metabolism and weight gain. It reported metabolic changes under experimental conditions.',
'Rodent findings do not establish clinically meaningful fat loss in humans or benefit in a stack. This cited experiment is not a human efficacy trial.',
'FDA identifies limited safety information for this substance.',[study('11146367','2000: AOD-9604 metabolic study in rats'),safetySource]);
evidence('5-amino-1mq','Cell and animal studies',
'5-Amino-1MQ is a small-molecule NNMT inhibitor, not a peptide. NNMT uses a methyl donor to modify nicotinamide; inhibition can alter cellular metabolic pathways.',
'A 2017 study examined NNMT inhibition in cells and obese mice, reporting reduced adiposity and body weight during a short experiment.',
'Short-term mouse results cannot establish human fat loss, metabolic safety or a useful combination with NAD+ or appetite agents.',
'Human long-term safety and interaction effects are not established by the cited study.',[study('29155147','2017: NNMT inhibition in cells and obese mice')]);
evidence('adipotide','Nonhuman primate study',
'Adipotide was designed to target blood vessels supporting white fat and induce cell death. This is a vascular-targeting mechanism, not simply increased fat burning.',
'A 2011 study in obese monkeys reported weight and metabolic changes after experimental treatment.',
'Primate research is not proof of acceptable human risk or routine weight-management benefit.',
'Renal toxicity was observed in the study. Potential tissue injury is a central limitation, not an incidental detail.',[study('22072637','2011: Adipose vascular targeting in obese primates')]);
evidence("bpc-157",
"Preclinical findings; limited human reports",
"BPC-157 is a synthetic 15-amino-acid peptide. Tendon-cell experiments found migration and survival signals associated with FAK-paxillin signaling; they did not establish a single clinical receptor or prove human tissue repair.",
"A 2021 retrospective knee-pain report contacted 16 people: 11 of 12 given BPC-157 alone reported improvement, as did 3 of 4 given BPC-157 with material described as thymosin beta-4. There was no randomized comparator or objective demonstration of tissue repair. A 2024 bladder-symptom pilot included 12 women without a control group. A 2025 intravenous pilot involved only two previously exposed adults. FDA also reviewed a 2005 ulcerative-colitis randomized study reported only as a meeting abstract: 53 enrolled, 46 completed, and the between-group confidence interval crossed zero.",
"Small uncontrolled symptom reports cannot separate treatment effects from placebo, natural recovery or other care. The ulcerative-colitis abstract is insufficient to establish efficacy. The knee combination report does not verify equivalence to a TB-500 fragment blend. Rat and dog pharmacokinetics showed a short intact-peptide half-life, but do not establish human absorption, oral bioavailability or duration. Several human reports share investigators; independent controlled replication is needed.",
"Short follow-up and very small samples cannot establish safety or exclude uncommon harms. Human long-term safety and combination effects remain unresolved. BPC-157 has no FDA-approved drug product.",
[{"url": "https://pubmed.ncbi.nlm.nih.gov/21030672/", "label": "2011: Tendon explants and fibroblast signaling"}, {"url": "https://pubmed.ncbi.nlm.nih.gov/34324435/", "label": "2021: Retrospective knee-pain report (abstract reviewed)"}, {"url": "https://pubmed.ncbi.nlm.nih.gov/39325560/", "label": "2024: Uncontrolled bladder-symptom pilot (abstract reviewed)"}, {"url": "https://pubmed.ncbi.nlm.nih.gov/40131143/", "label": "2025: Two-person intravenous pilot (abstract reviewed)"}, {"url": "https://pubmed.ncbi.nlm.nih.gov/36588717/", "label": "2022: Rat and dog pharmacokinetics"}, {"url": "https://www.fda.gov/media/193343/download", "label": "FDA 2026: BPC-157 evidence review, including 2005 meeting abstract"}]);
evidence("tb-500",
"Uncertain product identity; no established human efficacy",
"TB-500 is a commercial name, not a sufficient chemical specification. A 2012 analytical study identified Ac-LKKTETQ, an acetylated seven-amino-acid fragment, in a product sold under this name. This differs from unacetylated LKKTETQ and full-length 43-amino-acid thymosin beta-4. The sequence and modification of the Mirai batch have not been verified in this evidence review.",
"In a 2024 fibroblast wound-assay study, parent TB-500 did not significantly improve the measured wound-healing outcome; a shorter metabolite, Ac-LKKTE, did. This is evidence against assuming the parent and metabolite have identical effects in that assay. FDA’s 2026 review did not identify human administration studies establishing efficacy or safety of the fragment.",
"A cell wound assay is not human tendon healing. Full-length thymosin beta-4 findings cannot establish efficacy, actin effects or pharmacokinetics of an unverified fragment product. The negative assay does not resolve all possible biological effects, but must not be omitted from the evidence.",
"Absence of cytotoxicity in one assay does not establish systemic safety. Human pharmacokinetics, long-term safety and combination risks are not established. TB-500 has no FDA-approved drug product.",
[{"url": "https://pubmed.ncbi.nlm.nih.gov/22962027/", "label": "2012: Analytical identification of Ac-LKKTETQ (abstract reviewed)"}, {"url": "https://pubmed.ncbi.nlm.nih.gov/38382158/", "label": "2024: Parent TB-500 and metabolite wound assay (abstract reviewed)"}, {"url": "https://www.fda.gov/media/193349/download", "label": "FDA 2026: Thymosin beta-4 fragment evidence and safety gaps"}]);
evidence('kpv','Cell and animal studies',
'KPV is a three-amino-acid fragment of alpha-MSH. Experiments investigate inflammatory signaling and transport into intestinal cells through PepT1.',
'A 2008 study reported anti-inflammatory effects in cell systems and mouse colitis models, including a role for PepT1-mediated uptake.',
'Mouse colitis and cultured-cell findings do not establish human inflammatory bowel disease treatment or benefit from combining KPV with BPC-157.',
'FDA identifies an absence of human drug-exposure data in its review.',[study('18061177','2008: KPV, PepT1 and experimental intestinal inflammation'),safetySource]);
evidence('thymosin-a1','Human randomized trial',
'Thymosin alpha-1 is investigated as an immune modulator. Immune modulation is context-dependent and is not equivalent to universally boosting immunity.',
'The large TESTS phase 3 trial (2025) evaluated adults with sepsis. It did not demonstrate a significant reduction in 28-day mortality compared with placebo.',
'A negative sepsis endpoint is important evidence. It neither proves benefit in healthy people nor resolves every other disease-specific research question.',
'Immune effects and risks depend on the clinical setting. The trial does not validate self-directed combinations.',[study('39814420','2025: TESTS randomized sepsis trial'),{url:'https://www.bmj.com/content/389/bmj.r1098',label:'2025: Published correction to TESTS'}]);
evidence('ara-290','Small human randomized trial',
'ARA-290, also called cibinetide, is an erythropoietin-derived peptide designed to investigate tissue-protective signaling separately from red-cell production.',
'A 2012 double-blind pilot trial studied patients with sarcoidosis-associated small-fiber neuropathy and reported symptom-related signals warranting further study.',
'A small, disease-specific pilot does not establish broad nerve regeneration, recovery benefits or effectiveness in healthy people.',
'Small trials cannot reliably exclude rare harms or establish long-term safety and combination effects.',[study('23168581','2012: ARA-290 pilot trial in sarcoidosis neuropathy')]);
evidence('ipamorelin','Preclinical receptor pharmacology',
'Ipamorelin activates the ghrelin/growth-hormone-secretagogue receptor, which can stimulate growth hormone release.',
'The original 1998 pharmacology study compared hormone-release selectivity in experimental models.',
'Selectivity in a laboratory model does not establish better sleep, muscle growth, fat loss or safety in a CJC-1295 combination.',
'FDA flags limited safety information and serious events in an intravenous study; reported events alone do not establish causation.',[study('9849822','1998: Ipamorelin pharmacology'),safetySource]);
evidence("cjc-1295",
"Human DAC studies do not validate the no-DAC item",
"GHRH analogues stimulate pituitary growth-hormone-releasing-hormone receptors. The DAC modification enables albumin binding and prolonged exposure. A product called CJC-1295 without DAC must be chemically distinguished from the long-acting molecule; equivalence to modified GRF(1–29) requires a verified specification.",
"Two 2006 randomized placebo-controlled healthy-adult studies lasted 28 and 49 days. Long-acting CJC-1295 increased GH and IGF-1 and had an estimated half-life of 5.8–8.1 days. These were endocrine measurements with the DAC molecule, not evidence of clinical benefit from the no-DAC catalog item.",
"The DAC half-life cannot be assigned to a no-DAC peptide. Hormone increases do not prove muscle gain, improved sleep, injury recovery or longer life. These studies do not establish benefits or long-term safety of CJC no-DAC plus ipamorelin.",
"No serious adverse reactions were reported in the published trials, but that does not mean no adverse effects. FDA’s appraisal describes reactions including injection-site effects, headache, flushing and hypotension. Long-term and combination risks remain uncertain. CJC-1295 has no FDA-approved drug product.",
[{"url": "https://pubmed.ncbi.nlm.nih.gov/16352683/", "label": "2006: Two randomized long-acting CJC-1295 studies (abstract reviewed)"}, {"url": "https://www.fda.gov/media/183819/download", "label": "FDA 2024: CJC-1295 identities, clinical studies and safety appraisal"}]);
evidence('tesamorelin','Human randomized trial',
'Tesamorelin is a GHRH analogue that stimulates endogenous GH and downstream IGF-1 signaling. Effects on visceral fat differ from general weight reduction.',
'A 2014 randomized trial in people with HIV and abdominal fat accumulation investigated visceral and liver fat, reporting reductions during six months of treatment.',
'Disease-specific pharmaceutical evidence does not establish general anti-aging benefit or equivalence of research vials. Reduced visceral fat is not the same endpoint as lower body weight.',
'The GH/IGF axis affects glucose regulation and tissue growth. Adding GH secretagogues increases pathway overlap without establishing improved clinical outcomes.',[study('25038357','2014: Tesamorelin trial in HIV-associated abdominal adiposity')]);
evidence('sermorelin','Human hormone-response study',
'Sermorelin corresponds to the active GHRH(1–29) amide fragment and stimulates pituitary GH release.',
'A 1995 study in eight healthy men compared GHRH(1–29), GHRP-2 and their combination. Combining the two produced a larger acute GH response.',
'This small hormone-response experiment did not establish muscle growth, recovery, longevity or long-term combination safety. It does not test CJC-1295 plus ipamorelin.',
'Combining multiple GH-axis agents may intensify endocrine effects; the clinical consequences require direct measurement.',[study('7586605','1995: GHRH(1–29) and GHRP-2 in healthy men')]);
evidence('ghrp-2','Human hormone-response study',
'GHRP-2 stimulates the growth-hormone-secretagogue receptor. It acts through a different receptor from GHRH while converging on GH release.',
'A 1995 acute study in eight healthy men found that GHRP-2 combined with GHRH(1–29) increased GH release more than the individual stimulation conditions.',
'The endpoint was hormone secretion, not sustained body-composition change. This evidence cannot justify treating all secretagogue combinations as interchangeable.',
'Long-term safety of a custom stack is not established by an acute challenge study.',[study('7586605','1995: GHRP-2 and GHRH combination experiment')]);
evidence('ghrp-6','Small human physiology study',
'GHRP-6 is a growth-hormone secretagogue investigated for GH release and related neuroendocrine effects.',
'A 1995 study in normal men examined GH, ACTH, cortisol and sleep after GHRP-6, demonstrating effects beyond a single hormone pathway.',
'Physiological signals in a small experiment do not establish beneficial sleep, muscle or recovery outcomes over time.',
'FDA highlights cortisol and glucose/insulin-sensitivity concerns.',[study('7617137','1995: GHRP-6 hormone and sleep physiology'),safetySource]);
evidence('igf-1-lr3','Animal study',
'Long R3 IGF-I is a modified IGF-I analogue with reduced binding to IGF-binding proteins. It can stimulate growth-related signaling; reduced binding does not automatically mean a longer circulating half-life.',
'A 1996 rat experiment compared LR3IGF-I with IGF-I for growth and anti-catabolic effects and reported differences in potency and clearance.',
'Rodent growth data do not establish safe human muscle gain. This analogue is distinct from approved pharmaceutical IGF-I formulations.',
'Uncontrolled growth and glucose-related effects are important mechanistic concerns. Human interaction risks are not resolved by the cited animal study.',[study('8708565','1996: LR3IGF-I potency and clearance in rats')]);
evidence('ghk-cu','Cell studies',
'GHK-Cu is a copper-binding tripeptide studied in extracellular-matrix remodeling. Copper binding and fibroblast responses are research mechanisms, not proof of systemic rejuvenation.',
'A 1988 cultured-fibroblast study investigated collagen synthesis. Later cell work examined matrix-remodeling enzymes and their inhibitors.',
'Cellular collagen signals do not establish visible human skin improvement from injectable material. Route and formulation are essential distinctions.',
'FDA identifies limited human safety information for injectable GHK-Cu.',[study('3169264','1988: GHK-Cu and fibroblast collagen synthesis'),study('11045606','2000: Matrix-remodeling signals in fibroblasts'),safetySource]);
evidence('ahk-cu','Human tissue ex vivo and cell study',
'AHK-Cu is a copper tripeptide investigated in hair-follicle and dermal-papilla biology.',
'A 2007 study examined isolated human hair follicles and cultured dermal papilla cells, reporting follicle elongation and cell-related effects.',
'Isolated human tissue is not a clinical trial in people. These findings do not establish hair regrowth or treatment for hair loss.',
'Systemic safety and useful combinations cannot be inferred from an ex vivo experiment.',[study('17703734','2007: AHK-Cu in isolated follicles and cultured cells')]);
evidence('snap-8','Identity reference; efficacy evidence gap',
'SNAP-8 is a name used for acetyl octapeptide-3, a cosmetic research peptide. Its chemical identity should be distinguished from acetyl hexapeptide products and botulinum toxin.',
'The linked PubChem record supports compound identity. This review did not locate a robust, independently replicated clinical study establishing the effects of the exact catalog material.',
'An identity database is not an efficacy study. Claims such as a predictable reduction in wrinkles or equivalence to a medical procedure are not established here.',
'Cosmetic marketing does not establish injectable safety or safety in a blend.',[{url:'https://pubchem.ncbi.nlm.nih.gov/compound/Snap-8',label:'PubChem: SNAP-8 identity record (not an efficacy trial)'}]);
evidence('matrixyl','Human topical formulation trial',
'The palmitoyl pentapeptide studied as pal-KTTKS is a collagen-related signaling peptide used in cosmetic formulation research. Matrixyl is a trade-family name; sequence matters.',
'A 2005 split-face study in 93 women evaluated a topical pal-KTTKS moisturizer over 12 weeks and reported improvement in appearance-related skin measures.',
'The evidence concerns a topical formulation, not an injectable vial or every product using the Matrixyl name.',
'Route-specific findings cannot establish systemic safety or outcomes from combining cosmetic peptides.',[study('18492182','2005: Topical pal-KTTKS split-face study')]);
evidence('epitalon','Cell study',
'Epitalon is a synthetic short peptide investigated in telomerase and cellular-aging experiments. Telomerase helps maintain chromosome ends; activating it is not inherently proof of healthier aging.',
'A 2003 experiment in human fetal fibroblast cultures reported telomerase-related activity and telomere changes.',
'Human cells in a dish are not a human longevity trial. This does not show increased lifespan, lower cancer risk or reversal of aging in people.',
'Long-term effects of manipulating cellular proliferation remain unresolved by the experiment.',[study('12937682','2003: Epitalon and telomerase in fibroblast cultures')]);
evidence('mots-c','Cell and animal studies',
'MOTS-c is a mitochondria-derived peptide investigated in cellular stress responses and metabolic regulation, including AMPK-related signaling.',
'A 2015 study used cells and mice to investigate metabolic homeostasis, obesity and insulin resistance, reporting favorable experimental metabolic signals.',
'Preclinical results do not establish human endurance, weight-loss or longevity benefits. Studies measuring endogenous MOTS-c are also different from administering a product.',
'FDA identifies a lack of human drug-exposure data in its review.',[study('25738459','2015: MOTS-c metabolic homeostasis in experimental models'),safetySource]);
evidence('ss-31','Human randomized trial; indication-specific approval',
'SS-31, or elamipretide, interacts with mitochondrial cardiolipin. Research examines whether this changes mitochondrial membrane function and energy production.',
'MMPOWER-3 (2023) did not demonstrate significant improvement in its primary exercise/fatigue endpoints in primary mitochondrial myopathy. Separately, FDA granted accelerated approval in 2025 to Forzinity for muscle strength in Barth syndrome in patients weighing at least 30 kg.',
'Different mitochondrial diseases are not interchangeable. The Barth approval requires confirmatory evidence and does not establish an anti-aging benefit or approval of research vials.',
'Injection-site reactions are reported with the pharmaceutical product. Combining with NAD+ or MOTS-c lacks demonstrated benefit in the sources reviewed.',[study('37268435','2023: MMPOWER-3 randomized trial'),{url:'https://www.fda.gov/news-events/press-announcements/fda-grants-accelerated-approval-first-treatment-barth-syndrome',label:'FDA 2025: Forzinity accelerated approval and required confirmation'}]);
evidence('nad','Small human metabolism pilot',
'NAD+ is a coenzyme, not a peptide. It participates in electron transfer and is used by enzymes involved in cell signaling and repair.',
'A small 2019 intravenous pilot measured changes in NAD+ metabolites during a six-hour infusion. It studied biochemical handling, not whether treatment improved cognition, fatigue or lifespan.',
'Changing a blood metabolite does not establish a clinical benefit. Studies of oral NR or NMN precursors cannot automatically validate NAD+ itself.',
'A small metabolic pilot cannot establish long-term safety or combined effects with mitochondrial peptides.',[study('31572171','2019: Intravenous NAD+ metabolome pilot')]);
evidence('foxo4-dri','Cell and animal studies',
'FOXO4-DRI is an experimental peptide designed to disrupt FOXO4–p53 interactions and induce death in certain senescent cells.',
'A 2017 cell and mouse study reported selective effects on senescent cells and tissue-related outcomes in aging and chemotherapy-associated models.',
'Senescent cells have context-dependent roles. These experiments do not establish safe removal of senescent cells or longer life in humans.',
'Human selectivity, long-term tissue effects and combination safety remain unresolved by the cited preclinical study.',[study('28340339','2017: FOXO4–p53 targeting in senescent cells and mice')]);
evidence('glutathione','Human oral supplementation trials',
'Glutathione is a naturally occurring tripeptide involved in cellular redox balance and peroxide handling. Its physiological role does not prove benefit from every supplemental formulation.',
'A 2015 randomized oral study in 54 adults reported increased body glutathione stores over six months. A separate shorter oral trial found no significant improvement in glutathione status or oxidative-stress measures.',
'The studies differ in duration and methods. Biomarker changes are not proof of broad detoxification, skin lightening or clinical benefit from injected material.',
'Oral results cannot establish injectable safety or benefits of combining with NAD+.',[study('24791752','2015: Six-month oral glutathione randomized trial'),study('21875351','2011: Shorter oral trial with null biomarker findings')]);
evidence('semax','Small human imaging study',
'Semax is an ACTH-fragment-related synthetic peptide investigated in neural signaling. Proposed neurotrophic mechanisms remain distinct from demonstrated improvements in everyday cognition.',
'A 2018 study in 24 healthy volunteers investigated brain-network changes using imaging.',
'A difference in functional connectivity is a surrogate measurement, not proof of better memory, focus or neurological recovery. This was not a Semax-plus-Selank efficacy trial.',
'Long-term and combined-use safety are not established by a small imaging experiment.',[study('30225715','2018: Semax and brain-network imaging')]);
evidence('selank','Small human clinical study',
'Selank is a tuftsin-related synthetic peptide studied in anxiety-related and neurochemical models. A precise mechanism explaining clinical outcomes is not settled by the cited trial.',
'A 2008 clinical study in generalized anxiety disorder and neurasthenia examined symptom changes and enkephalin-related measures.',
'The small, condition-specific evidence does not establish general cognitive enhancement or superiority to established care. Findings require independent replication.',
'The study does not establish long-term safety or benefit of combining with Semax.',[study('18454096','2008: Selank anxiety-related clinical study')]);
evidence('dsip','Small human trial; limited benefit',
'Delta sleep-inducing peptide is studied in sleep and neuroendocrine physiology. Its name should not be mistaken for proof that it reliably induces restorative sleep.',
'A 1992 double-blind study in 16 people with chronic insomnia found limited effects and no improvement in subjective sleep quality; the authors did not consider a major therapeutic benefit likely.',
'Small older trials do not establish reliable insomnia treatment or synergy with other sleep-related compounds.',
'Long-term safety and effects alongside sedating substances are not determined by this evidence.',[study('1299794','1992: Double-blind DSIP insomnia trial')]);
evidence('pinealon','Cell and animal studies',
'Pinealon is a short synthetic peptide investigated in oxidative-stress and cell-survival models.',
'A 2011 cell experiment reported changes in reactive oxygen species, viability and proliferation. A rat study examined offspring exposed to prenatal hyperhomocysteinemia.',
'These experimental models do not establish improvements in human memory, mood or brain aging.',
'Human safety and meaningful clinical outcomes are not established by the cited studies.',[study('21978084','2011: Pinealon cell viability experiment'),study('22567179','2012: Pinealon in a rat developmental model')]);
evidence('p21','Animal study; verify molecular identity',
'The research summarized here concerns P021, a CNTF-derived neurotrophic peptidomimetic. The shorthand P21 is ambiguous and must not be confused with the p21 cell-cycle protein.',
'A 2017 study in a transgenic mouse model of Alzheimer-like pathology investigated long-term early P021 treatment and reported preservation of synaptic and cognitive measures.',
'A prevention experiment in genetically modified mice is not evidence of Alzheimer disease treatment or cognitive enhancement in people. Sequence identity must match the research molecule.',
'Human long-term safety and interaction effects remain unknown from the cited evidence.',[study('28655344','2017: P021 in a transgenic mouse model')]);
evidence('pt-141','Human randomized trials',
'PT-141, or bremelanotide, activates melanocortin receptors involved in central sexual-response signaling. It does not work simply by increasing testosterone.',
'Two RECONNECT phase 3 trials (2019) in premenopausal women with hypoactive sexual desire disorder reported improvements in desire and associated distress measures.',
'These results concern a defined diagnosis and pharmaceutical formulation. They do not establish universal libido enhancement or benefits from adding melanotan-II.',
'Nausea was common. Blood-pressure effects are relevant; pairing melanocortin agonists introduces overlapping pharmacology.',[study('31599840','2019: RECONNECT phase 3 trials'),study('27977473','2017: Bremelanotide ambulatory blood-pressure study')]);
evidence('mt-2','Very small human pilot',
'Melanotan-II activates melanocortin receptors involved in pigmentation and other functions. Pigmentation is not its only biological effect.',
'A 1996 phase 1 pilot in three men explored pigmentation and tolerability. The sample is far too small to characterize uncommon or long-term harms.',
'This is not evidence of safe cosmetic tanning, sun protection or a useful combination with PT-141.',
'FDA summarizes serious adverse-event reports; those reports do not establish causality.',[study('8637402','1996: Melanotan-II phase 1 pilot'),safetySource]);
evidence('kisspeptin-10','Small human hormone-response study',
'Kisspeptin-10 activates KISS1R signaling upstream of GnRH, influencing pituitary LH and downstream reproductive hormones.',
'A 2011 study in men demonstrated LH release and changes in pulsatility during controlled kisspeptin-10 exposure.',
'An acute hormone response does not establish lasting fertility improvement, testosterone restoration or benefit in a libido stack. Kisspeptin-54 trials involve a different peptide length.',
'Reproductive endocrine effects depend on physiological context. Long-term and multi-agent effects are not settled by this experiment.',[study('21632807','2011: Kisspeptin-10 and LH pulsatility in men')]);
evidence('oxytocin','Human randomized trial; negative primary finding',
'Oxytocin is a hormone and neuropeptide with reproductive and context-dependent behavioral signaling. Calling it a bonding hormone oversimplifies its effects.',
'A 2021 randomized trial in children and adolescents with autism did not find a significant advantage over placebo on its primary social-function outcome.',
'Laboratory social-attention effects do not imply a general improvement in trust, relationships or social function. Route and population strongly affect interpretation.',
'The clinical trial does not establish benefits or safety of custom behavioral or sexual-function combinations.',[study('34644471','2021: Intranasal oxytocin randomized autism trial')]);
const blendComponents = {
  glow:['ghk-cu','bpc-157','tb-500'], klow:['ghk-cu','bpc-157','tb-500','kpv'],
  'bpc-tb':['bpc-157','tb-500'], 'cjc-ipa':['cjc-1295','ipamorelin'],
  cagrisema:['cagrilintide','semaglutide']
};
for (const id of ['glow','klow','bpc-tb','cjc-ipa']) {
  const parts = blendComponents[id];
  evidence(id,'Combination evidence gap',
    'This blend combines '+parts.map(x=>peptides.find(p=>p.id===x).name).join(', ')+'. Individual mechanisms are described in the linked component profiles.',
    'No controlled human study establishing clinical benefit of this exact blend was identified in the sources reviewed. The references below concern individual components or related experimental pathways, not validation of the finished blend.',
    'Different mechanisms do not prove synergy. Sequence, ratios, stability and route can change the result; a blend does not inherit the efficacy of its components.',
    'Adding another blend or separate component can duplicate exposure. Combined toxicity, immunogenicity and long-term effects have not been established here.',
    [...new Map(parts.flatMap(x=>researchEvidence[x].sources).map(s=>[s.url,s])).values()]);
}
for (const id of ['bpc-157','tb-500','cjc-1295']) researchEvidence[id].reviewed='October 5, 2026 (UTC)';
for (const p of peptides) {
  const e = researchEvidence[p.id];
  if (!e) throw new Error('Missing evidence profile: '+p.id);
  p.mechanism=e.mechanism; p.keyFindings=e.findings; p.shortDesc=e.mechanism.split('. ')[0].replace(/\.$/, '')+'.';
  p.researchFocus=[e.level, 'Study-specific findings and limitations', 'Combination evidence and overlapping pathways'];
  delete p.researchDoseNotes;
}
function researchEscape(value) { return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function researchSourceLinks(sources) {
  return sources.map(s=>`<li><a class="text-red-700 underline break-words" href="${researchEscape(s.url)}" target="_blank" rel="noopener noreferrer">${researchEscape(s.label)} ↗</a></li>`).join('');
}
function renderEvidence(id) {
  const e=researchEvidence[id]; if(!e)return '';
  const components=blendComponents[id];
  return `<section class="mb-8 border border-slate-200 rounded-2xl p-5 sm:p-7 bg-slate-50">
    <p class="text-xs font-semibold uppercase tracking-wider text-red-700 mb-2">Evidence in context</p>
    <h2 class="text-xl font-semibold mb-3">${researchEscape(e.level)}</h2>
    <p class="text-xs text-slate-500">Source review: ${researchEscape(e.reviewed || 'October 3, 2026 (US Eastern)')}. Labels describe the cited evidence, not a systematic review or endorsement.</p>
  </section>
  ${[['What it does in research',e.mechanism],['What the cited studies found',e.findings],['What this does not establish',e.limits],['Safety and combination uncertainties',e.safety]].map(([h,t])=>`<section class="mb-8"><h2 class="text-lg font-semibold mb-3">${h}</h2><p class="text-slate-600 leading-relaxed">${researchEscape(t)}</p></section>`).join('')}
  ${components?`<section class="mb-8"><h2 class="text-lg font-semibold mb-3">Read the component evidence</h2><ul class="space-y-2">${components.map(x=>`<li><a class="text-red-700 underline" href="peptide.html?id=${x}">${researchEscape(peptides.find(p=>p.id===x).name)}</a></li>`).join('')}</ul></section>`:''}
  <section class="mb-8"><h2 class="text-lg font-semibold mb-3">Sources & further reading</h2><ul class="space-y-3 text-sm">${researchSourceLinks(e.sources)}</ul></section>
  <section class="mb-8"><h2 class="text-lg font-semibold mb-3">What a certificate of analysis can establish</h2><p class="text-slate-600 leading-relaxed">Identity, chemical purity, amount per vial, biological potency, sterility, endotoxins and stability require appropriate, separate tests. A purity percentage alone does not establish the amount present, absence of microbes or endotoxins, or stability after storage. Results apply to the sampled batch and tested conditions; a COA does not prove clinical safety or effectiveness.</p><p class="mt-3 text-sm"><a class="text-red-700 underline" href="https://www.fda.gov/media/71510/download" target="_blank" rel="noopener noreferrer">FDA / ICH Q6B: analytical quality principles</a></p></section>
  <div class="mb-8 p-5 rounded-xl bg-amber-50 text-amber-950 text-sm leading-relaxed">Research summaries are not dosing, mixing or treatment instructions. A study of a pharmaceutical preparation does not establish equivalence of a research product. Selecting items together does not establish that they are safe or effective together.</div>`;
}
// Assess the entire selection, including ingredients inside blends; never hide extra selections.
getStackNote = function(ids) {
  const selected=[...new Set(ids||[])].filter(id=>researchEvidence[id]);
  if(!selected.length)return null;
  const expanded=selected.flatMap(id=>blendComponents[id]||[id]);
  const unique=[...new Set(expanded)];
  const duplicates=unique.filter(id=>expanded.filter(x=>x===id).length>1);
  const names=selected.map(id=>peptides.find(p=>p.id===id).name);
  const notes=[];
  const sources=[...new Map(selected.flatMap(id=>researchEvidence[id].sources).map(s=>[s.url,s])).values()];
  if(duplicates.length) notes.push('Duplicate components: '+duplicates.map(id=>peptides.find(p=>p.id===id).name).join(', ')+'. A blend plus its separate ingredient is repeated exposure, not a new mechanism.');
  const glp=unique.filter(x=>['semaglutide','tirzepatide','retatrutide','survodutide','mazdutide'].includes(x));
  if(glp.length>1) {notes.push('GLP-1 pathway overlap: '+glp.map(id=>peptides.find(p=>p.id===id).name).join(', ')+'. No benefit for this multi-agonist combination is established by the cited individual trials. Gastrointestinal effects may overlap; FDA advises against combining tirzepatide with a GLP-1 receptor agonist.');sources.push(glpSource);}
  const exactCagri=unique.length===2&&unique.includes('semaglutide')&&unique.includes('cagrilintide')&&!duplicates.length;
  if(unique.includes('semaglutide')&&unique.includes('cagrilintide'))notes.push('Direct combination evidence: cagrilintide plus semaglutide was studied in REDEFINE 1. That evidence concerns controlled study medicines; it does not validate a catalog blend, mixing compatibility or any extra compounds selected here.');
  if(unique.includes('cagrilintide')&&glp.some(x=>x!=='semaglutide'))notes.push('Amylin plus a different metabolic agonist: the semaglutide combination trial cannot establish results for cagrilintide with tirzepatide, retatrutide, survodutide or mazdutide.');
  const gh=unique.filter(x=>['cjc-1295','ipamorelin','sermorelin','tesamorelin','ghrp-2','ghrp-6','igf-1-lr3'].includes(x));
  if(gh.length>1)notes.push('GH/IGF pathway overlap: different receptors can converge on growth-hormone signaling. A small GHRH(1–29) plus GHRP-2 experiment showed greater acute GH release, not proven muscle, sleep or recovery benefit. It does not validate CJC no-DAC plus ipamorelin or the full selection.');
  if(unique.includes('bpc-157')&&unique.includes('tb-500'))notes.push('BPC-157 plus TB-500: a repair-related rationale is not demonstrated synergy. Small uncontrolled BPC human reports do not establish tissue repair. A four-person subgroup received material described as thymosin beta-4, without verified equivalence to this TB-500 fragment. Controlled clinical benefit for this exact pair was not established in the reviewed sources.');
  if(unique.includes('kpv')&&unique.includes('bpc-157'))notes.push('KPV plus BPC-157: inflammatory and repair signals have been investigated separately. The sources here do not establish improved human healing or gastrointestinal outcomes for the combination.');
  if(unique.includes('semax')&&unique.includes('selank'))notes.push('Semax plus Selank: studies examining the two separately or side by side are not trials proving that taking both improves cognition or anxiety. Combined effects and long-term safety remain unresolved.');
  if(unique.includes('pt-141')&&unique.includes('mt-2'))notes.push('Melanocortin overlap: PT-141 and melanotan-II share receptor-family activity. There is no demonstrated additive benefit here, and unwanted effects may overlap.');
  if(unique.filter(x=>['nad','mots-c','ss-31','epitalon','foxo4-dri','glutathione'].includes(x)).length>1)notes.push('Cellular aging and energy pathways: NAD metabolism, mitochondrial membranes, telomerase and senescence are different processes. Combining them has not been shown in the cited sources to improve human lifespan or reverse aging.');
  if(selected.length===1&&!blendComponents[selected[0]])notes.push(researchEvidence[selected[0]].findings+' '+researchEvidence[selected[0]].limits);
  if(!notes.length)notes.push('No direct controlled human evidence for this exact selection was identified in the sources reviewed. Individual effects cannot predict the net result: interactions may be additive, opposing or harmful.');
  if(selected.length>1||blendComponents[selected[0]])notes.push('This is not a compatibility or interaction checker covering all medicines and conditions. No absence of a flag should be interpreted as safety. Physical mixing, stability and dosing are not assessed.');
  if(unique.includes('cagrilintide')&&unique.includes('semaglutide'))sources.push(...researchEvidence.cagrisema.sources);
  if(gh.length>1)sources.push(...researchEvidence.sermorelin.sources);
  return {title:names.join(' + '),summary:exactCagri?'Direct evidence exists for the two study medicines; product equivalence is unproven.':selected.length===1&&!blendComponents[selected[0]]?researchEvidence[selected[0]].level:'Combination evidence and pathway overlap',details:notes.join('\n\n'),sources:[...new Map(sources.map(s=>[s.url,s])).values()]};
};
