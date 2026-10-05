const peptides = [
  // ===== METABOLIC =====
  {
    id: "retatrutide",
    name: "Retatrutide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "This investigational multi-receptor agonist activates GLP-1, GIP and glucagon receptors.",
    mechanism: "This investigational multi-receptor agonist activates GLP-1, GIP and glucagon receptors. These signals influence appetite, glucose handling and energy metabolism; receptor activity alone does not establish a clinical benefit.",
    researchFocus: ["Human randomized trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2023 phase 2 obesity trial followed adults for 48 weeks. Mean weight reduction reached 24.2% in the highest studied group. This was an individual-drug trial, not a trial of adding retatrutide to other weight-management peptides.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "GIP", "glucagon", "triple agonist"]
  },
  {
    id: "tirzepatide",
    name: "Tirzepatide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Tirzepatide activates GIP and GLP-1 receptors, affecting glucose-dependent insulin secretion and appetite.",
    mechanism: "Tirzepatide activates GIP and GLP-1 receptors, affecting glucose-dependent insulin secretion and appetite. A dual-action molecule is not the same as mixing two separately supplied products.",
    researchFocus: ["Human randomized trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "SURMOUNT-1 (2022) studied 2,539 adults with obesity or overweight without diabetes over 72 weeks. The highest studied group had a mean 20.9% weight reduction versus 3.1% with placebo, with lifestyle intervention in both groups.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "GIP", "dual agonist"]
  },
  {
    id: "semaglutide",
    name: "Semaglutide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Semaglutide activates the GLP-1 receptor, influencing appetite, insulin and glucagon signaling, and gastric emptying.",
    mechanism: "Semaglutide activates the GLP-1 receptor, influencing appetite, insulin and glucagon signaling, and gastric emptying.",
    researchFocus: ["Human randomized trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "STEP 1 (2021) enrolled 1,961 adults with overweight or obesity without diabetes. At 68 weeks, average weight reduction was 14.9% with semaglutide versus 2.4% with placebo, alongside lifestyle intervention.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "incretin"]
  },
  {
    id: "cagrilintide",
    name: "Cagrilintide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Cagrilintide is a long-acting amylin analogue studied for satiety signaling.",
    mechanism: "Cagrilintide is a long-acting amylin analogue studied for satiety signaling. Amylin and GLP-1 act through different receptors, providing a rationale for research on the pair, not proof that any combination is safe.",
    researchFocus: ["Human randomized trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2021 randomized phase 2 trial in adults with overweight or obesity found greater weight reduction with cagrilintide than placebo over 26 weeks.",
    form: "Lyophilized powder",
    tags: ["amylin", "satiety"]
  },
  {
    id: "cagrisema",
    name: "CagriSema (Cagrilintide + Semaglutide)",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "CagriSema refers to coadministration of cagrilintide and semaglutide, combining amylin-related satiety signaling with GLP-1 receptor agonism.",
    mechanism: "CagriSema refers to coadministration of cagrilintide and semaglutide, combining amylin-related satiety signaling with GLP-1 receptor agonism.",
    researchFocus: ["Direct human combination trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "REDEFINE 1 (2025) randomized 3,417 adults with overweight or obesity without diabetes. At 68 weeks, the treatment-policy analysis estimated mean weight change of −20.4% with the combination versus −3.0% with placebo. Gastrointestinal adverse events occurred in 79.6% versus 39.9%.",
    form: "Lyophilized powder",
    tags: ["amylin", "GLP-1", "combination"]
  },
  {
    id: "survodutide",
    name: "Survodutide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Survodutide activates GLP-1 and glucagon receptors.",
    mechanism: "Survodutide activates GLP-1 and glucagon receptors. Research examines the balance between appetite, energy expenditure and glucose regulation.",
    researchFocus: ["Human randomized trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2024 randomized phase 2 study in adults with overweight or obesity evaluated body-weight change over 46 weeks and reported weight reduction with survodutide.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "glucagon", "dual agonist"]
  },
  {
    id: "mazdutide",
    name: "Mazdutide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Mazdutide is a dual GLP-1/glucagon receptor agonist studied for body-weight and metabolic outcomes.",
    mechanism: "Mazdutide is a dual GLP-1/glucagon receptor agonist studied for body-weight and metabolic outcomes.",
    researchFocus: ["Human randomized trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "The 2025 GLORY-1 phase 3 trial in Chinese adults with overweight or obesity reported significant weight reduction versus placebo across 48 weeks.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "glucagon"]
  },
  {
    id: "aod-9604",
    name: "AOD-9604",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "AOD-9604 is a modified fragment related to the fat-metabolism region of human growth hormone.",
    mechanism: "AOD-9604 is a modified fragment related to the fat-metabolism region of human growth hormone. Its proposed lipid effects should not be equated with the full hormone.",
    researchFocus: ["Animal study; human safety uncertainty","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2000 study in obese Zucker rats examined lipid metabolism and weight gain. It reported metabolic changes under experimental conditions.",
    form: "Lyophilized powder",
    tags: ["hGH fragment", "lipolysis"]
  },
  {
    id: "5-amino-1mq",
    name: "5-Amino-1MQ",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "5-Amino-1MQ is a small-molecule NNMT inhibitor, not a peptide.",
    mechanism: "5-Amino-1MQ is a small-molecule NNMT inhibitor, not a peptide. NNMT uses a methyl donor to modify nicotinamide; inhibition can alter cellular metabolic pathways.",
    researchFocus: ["Cell and animal studies","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2017 study examined NNMT inhibition in cells and obese mice, reporting reduced adiposity and body weight during a short experiment.",
    form: "Lyophilized powder / research chemical",
    tags: ["NNMT", "metabolic", "NAD+"]
  },
  {
    id: "adipotide",
    name: "Adipotide (FTPP)",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Adipotide was designed to target blood vessels supporting white fat and induce cell death.",
    mechanism: "Adipotide was designed to target blood vessels supporting white fat and induce cell death. This is a vascular-targeting mechanism, not simply increased fat burning.",
    researchFocus: ["Nonhuman primate study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2011 study in obese monkeys reported weight and metabolic changes after experimental treatment.",
    form: "Lyophilized powder",
    tags: ["adipose", "vasculature"]
  },

  // ===== RECOVERY =====
  {
    id: "bpc-157",
    name: "BPC-157",
    category: "recovery",
    categoryLabel: "Tissue & immune research",
    shortDesc: "BPC-157 is a synthetic 15-amino-acid peptide.",
    mechanism: "BPC-157 is a synthetic 15-amino-acid peptide. Tendon-cell experiments found migration and survival signals associated with FAK-paxillin signaling; they did not establish a single clinical receptor or prove human tissue repair.",
    researchFocus: ["Preclinical findings; limited human reports","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2021 retrospective knee-pain report contacted 16 people: 11 of 12 given BPC-157 alone reported improvement, as did 3 of 4 given BPC-157 with material described as thymosin beta-4. There was no randomized comparator or objective demonstration of tissue repair. A 2024 bladder-symptom pilot included 12 women without a control group. A 2025 intravenous pilot involved only two previously exposed adults. FDA also reviewed a 2005 ulcerative-colitis randomized study reported only as a meeting abstract: 53 enrolled, 46 completed, and the between-group confidence interval crossed zero.",
    form: "Lyophilized powder",
    tags: ["tissue repair", "angiogenesis", "cytoprotection"]
  },
  {
    id: "tb-500",
    name: "TB-500 (identity requires verification)",
    category: "recovery",
    categoryLabel: "Tissue & immune research",
    shortDesc: "TB-500 is a commercial name, not a sufficient chemical specification.",
    mechanism: "TB-500 is a commercial name, not a sufficient chemical specification. A 2012 analytical study identified Ac-LKKTETQ, an acetylated seven-amino-acid fragment, in a product sold under this name. This differs from unacetylated LKKTETQ and full-length 43-amino-acid thymosin beta-4. The sequence and modification of the Mirai batch have not been verified in this evidence review.",
    researchFocus: ["Uncertain product identity; no established human efficacy","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "In a 2024 fibroblast wound-assay study, parent TB-500 did not significantly improve the measured wound-healing outcome; a shorter metabolite, Ac-LKKTE, did. This is evidence against assuming the parent and metabolite have identical effects in that assay. FDA’s 2026 review did not identify human administration studies establishing efficacy or safety of the fragment.",
    form: "Lyophilized powder",
    tags: ["cell migration", "thymosin", "actin"]
  },
  {
    id: "kpv",
    name: "KPV",
    category: "recovery",
    categoryLabel: "Tissue & immune research",
    shortDesc: "KPV is a three-amino-acid fragment of alpha-MSH.",
    mechanism: "KPV is a three-amino-acid fragment of alpha-MSH. Experiments investigate inflammatory signaling and transport into intestinal cells through PepT1.",
    researchFocus: ["Cell and animal studies","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2008 study reported anti-inflammatory effects in cell systems and mouse colitis models, including a role for PepT1-mediated uptake.",
    form: "Lyophilized powder",
    tags: ["anti-inflammatory", "α-MSH"]
  },
  {
    id: "glow",
    name: "GLOW",
    category: "recovery",
    categoryLabel: "Tissue & immune research",
    shortDesc: "This blend combines GHK-Cu, BPC-157, TB-500 (identity requires verification).",
    mechanism: "This blend combines GHK-Cu, BPC-157, TB-500 (identity requires verification). Individual mechanisms are described in the linked component profiles.",
    researchFocus: ["Combination evidence gap","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "No controlled human study establishing clinical benefit of this exact blend was identified in the sources reviewed. The references below concern individual components or related experimental pathways, not validation of the finished blend.",
    form: "Lyophilized powder (blend)",
    tags: ["blend", "GHK-Cu", "BPC-157", "TB-500", "remodeling"]
  },
  {
    id: "klow",
    name: "KLOW",
    category: "recovery",
    categoryLabel: "Tissue & immune research",
    shortDesc: "This blend combines GHK-Cu, BPC-157, TB-500 (identity requires verification), KPV.",
    mechanism: "This blend combines GHK-Cu, BPC-157, TB-500 (identity requires verification), KPV. Individual mechanisms are described in the linked component profiles.",
    researchFocus: ["Combination evidence gap","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "No controlled human study establishing clinical benefit of this exact blend was identified in the sources reviewed. The references below concern individual components or related experimental pathways, not validation of the finished blend.",
    form: "Lyophilized powder (blend)",
    tags: ["blend", "GHK-Cu", "BPC-157", "TB-500", "KPV"]
  },
  {
    id: "bpc-tb",
    name: "BPC-157 + TB-500",
    category: "recovery",
    categoryLabel: "Tissue & immune research",
    shortDesc: "This blend combines BPC-157, TB-500 (identity requires verification).",
    mechanism: "This blend combines BPC-157, TB-500 (identity requires verification). Individual mechanisms are described in the linked component profiles.",
    researchFocus: ["Combination evidence gap","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "No controlled human study establishing clinical benefit of this exact blend was identified in the sources reviewed. The references below concern individual components or related experimental pathways, not validation of the finished blend.",
    form: "Lyophilized powder (blend)",
    tags: ["blend", "BPC-157", "TB-500"]
  },
  {
    id: "thymosin-a1",
    name: "Thymosin Alpha-1",
    category: "recovery",
    categoryLabel: "Tissue & immune research",
    shortDesc: "Thymosin alpha-1 is investigated as an immune modulator.",
    mechanism: "Thymosin alpha-1 is investigated as an immune modulator. Immune modulation is context-dependent and is not equivalent to universally boosting immunity.",
    researchFocus: ["Human randomized trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "The large TESTS phase 3 trial (2025) evaluated adults with sepsis. It did not demonstrate a significant reduction in 28-day mortality compared with placebo.",
    form: "Lyophilized powder",
    tags: ["immune", "T-cell", "thymosin"]
  },
  {
    id: "ara-290",
    name: "ARA-290",
    category: "recovery",
    categoryLabel: "Tissue & immune research",
    shortDesc: "ARA-290, also called cibinetide, is an erythropoietin-derived peptide designed to investigate tissue-protective signaling separately from red-cell production.",
    mechanism: "ARA-290, also called cibinetide, is an erythropoietin-derived peptide designed to investigate tissue-protective signaling separately from red-cell production.",
    researchFocus: ["Small human randomized trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2012 double-blind pilot trial studied patients with sarcoidosis-associated small-fiber neuropathy and reported symptom-related signals warranting further study.",
    form: "Lyophilized powder",
    tags: ["EPO-derived", "tissue protection"]
  },

  // ===== GH AXIS =====
  {
    id: "ipamorelin",
    name: "Ipamorelin",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "Ipamorelin activates the ghrelin/growth-hormone-secretagogue receptor, which can stimulate growth hormone release.",
    mechanism: "Ipamorelin activates the ghrelin/growth-hormone-secretagogue receptor, which can stimulate growth hormone release.",
    researchFocus: ["Preclinical receptor pharmacology","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "The original 1998 pharmacology study compared hormone-release selectivity in experimental models.",
    form: "Lyophilized powder",
    tags: ["GHS", "ghrelin", "secretagogue"]
  },
  {
    id: "cjc-1295",
    name: "CJC-1295 (No DAC)",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "GHRH analogues stimulate pituitary growth-hormone-releasing-hormone receptors.",
    mechanism: "GHRH analogues stimulate pituitary growth-hormone-releasing-hormone receptors. The DAC modification enables albumin binding and prolonged exposure. A product called CJC-1295 without DAC must be chemically distinguished from the long-acting molecule; equivalence to modified GRF(1–29) requires a verified specification.",
    researchFocus: ["Human DAC studies do not validate the no-DAC item","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "Two 2006 randomized placebo-controlled healthy-adult studies lasted 28 and 49 days. Long-acting CJC-1295 increased GH and IGF-1 and had an estimated half-life of 5.8–8.1 days. These were endocrine measurements with the DAC molecule, not evidence of clinical benefit from the no-DAC catalog item.",
    form: "Lyophilized powder",
    tags: ["GHRH", "GH axis"]
  },
  {
    id: "cjc-ipa",
    name: "CJC-1295 + Ipamorelin",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "This blend combines CJC-1295 (No DAC), Ipamorelin.",
    mechanism: "This blend combines CJC-1295 (No DAC), Ipamorelin. Individual mechanisms are described in the linked component profiles.",
    researchFocus: ["Combination evidence gap","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "No controlled human study establishing clinical benefit of this exact blend was identified in the sources reviewed. The references below concern individual components or related experimental pathways, not validation of the finished blend.",
    form: "Lyophilized powder (blend)",
    tags: ["GHRH", "GHS", "blend"]
  },
  {
    id: "tesamorelin",
    name: "Tesamorelin",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "Tesamorelin is a GHRH analogue that stimulates endogenous GH and downstream IGF-1 signaling.",
    mechanism: "Tesamorelin is a GHRH analogue that stimulates endogenous GH and downstream IGF-1 signaling. Effects on visceral fat differ from general weight reduction.",
    researchFocus: ["Human randomized trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2014 randomized trial in people with HIV and abdominal fat accumulation investigated visceral and liver fat, reporting reductions during six months of treatment.",
    form: "Lyophilized powder",
    tags: ["GHRH", "visceral fat"]
  },
  {
    id: "sermorelin",
    name: "Sermorelin",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "Sermorelin corresponds to the active GHRH(1–29) amide fragment and stimulates pituitary GH release.",
    mechanism: "Sermorelin corresponds to the active GHRH(1–29) amide fragment and stimulates pituitary GH release.",
    researchFocus: ["Human hormone-response study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 1995 study in eight healthy men compared GHRH(1–29), GHRP-2 and their combination. Combining the two produced a larger acute GH response.",
    form: "Lyophilized powder",
    tags: ["GHRH", "GH secretion"]
  },
  {
    id: "ghrp-2",
    name: "GHRP-2",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "GHRP-2 stimulates the growth-hormone-secretagogue receptor.",
    mechanism: "GHRP-2 stimulates the growth-hormone-secretagogue receptor. It acts through a different receptor from GHRH while converging on GH release.",
    researchFocus: ["Human hormone-response study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 1995 acute study in eight healthy men found that GHRP-2 combined with GHRH(1–29) increased GH release more than the individual stimulation conditions.",
    form: "Lyophilized powder",
    tags: ["GHS", "GHRP"]
  },
  {
    id: "ghrp-6",
    name: "GHRP-6",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "GHRP-6 is a growth-hormone secretagogue investigated for GH release and related neuroendocrine effects.",
    mechanism: "GHRP-6 is a growth-hormone secretagogue investigated for GH release and related neuroendocrine effects.",
    researchFocus: ["Small human physiology study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 1995 study in normal men examined GH, ACTH, cortisol and sleep after GHRP-6, demonstrating effects beyond a single hormone pathway.",
    form: "Lyophilized powder",
    tags: ["GHS", "GHRP"]
  },
  {
    id: "igf-1-lr3",
    name: "IGF-1 LR3",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "Long R3 IGF-I is a modified IGF-I analogue with reduced binding to IGF-binding proteins.",
    mechanism: "Long R3 IGF-I is a modified IGF-I analogue with reduced binding to IGF-binding proteins. It can stimulate growth-related signaling; reduced binding does not automatically mean a longer circulating half-life.",
    researchFocus: ["Animal study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 1996 rat experiment compared LR3IGF-I with IGF-I for growth and anti-catabolic effects and reported differences in potency and clearance.",
    form: "Lyophilized powder",
    tags: ["IGF-1", "growth factor"]
  },

  // ===== SKIN & BEAUTY =====
  {
    id: "ghk-cu",
    name: "GHK-Cu",
    category: "skin",
    categoryLabel: "Skin & Beauty",
    shortDesc: "GHK-Cu is a copper-binding tripeptide studied in extracellular-matrix remodeling.",
    mechanism: "GHK-Cu is a copper-binding tripeptide studied in extracellular-matrix remodeling. Copper binding and fibroblast responses are research mechanisms, not proof of systemic rejuvenation.",
    researchFocus: ["Cell studies","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 1988 cultured-fibroblast study investigated collagen synthesis. Later cell work examined matrix-remodeling enzymes and their inhibitors.",
    form: "Lyophilized powder",
    tags: ["copper peptide", "collagen", "remodeling"]
  },
  {
    id: "ahk-cu",
    name: "AHK-Cu",
    category: "skin",
    categoryLabel: "Skin & Beauty",
    shortDesc: "AHK-Cu is a copper tripeptide investigated in hair-follicle and dermal-papilla biology.",
    mechanism: "AHK-Cu is a copper tripeptide investigated in hair-follicle and dermal-papilla biology.",
    researchFocus: ["Human tissue ex vivo and cell study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2007 study examined isolated human hair follicles and cultured dermal papilla cells, reporting follicle elongation and cell-related effects.",
    form: "Lyophilized powder",
    tags: ["copper peptide", "dermal"]
  },
  {
    id: "snap-8",
    name: "SNAP-8",
    category: "skin",
    categoryLabel: "Skin & Beauty",
    shortDesc: "SNAP-8 is a name used for acetyl octapeptide-3, a cosmetic research peptide.",
    mechanism: "SNAP-8 is a name used for acetyl octapeptide-3, a cosmetic research peptide. Its chemical identity should be distinguished from acetyl hexapeptide products and botulinum toxin.",
    researchFocus: ["Identity reference; efficacy evidence gap","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "The linked PubChem record supports compound identity. This review did not locate a robust, independently replicated clinical study establishing the effects of the exact catalog material.",
    form: "Lyophilized powder",
    tags: ["expression lines", "SNARE"]
  },
  {
    id: "matrixyl",
    name: "Matrixyl (Palmitoyl Pentapeptide)",
    category: "skin",
    categoryLabel: "Skin & Beauty",
    shortDesc: "The palmitoyl pentapeptide studied as pal-KTTKS is a collagen-related signaling peptide used in cosmetic formulation research.",
    mechanism: "The palmitoyl pentapeptide studied as pal-KTTKS is a collagen-related signaling peptide used in cosmetic formulation research. Matrixyl is a trade-family name; sequence matters.",
    researchFocus: ["Human topical formulation trial","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2005 split-face study in 93 women evaluated a topical pal-KTTKS moisturizer over 12 weeks and reported improvement in appearance-related skin measures.",
    form: "Research peptide / cosmetic research ingredient",
    tags: ["collagen", "matrix", "dermal"]
  },

  // ===== LONGEVITY & CELLULAR =====
  {
    id: "epitalon",
    name: "Epitalon (Epithalon)",
    category: "longevity",
    categoryLabel: "Cellular-aging research",
    shortDesc: "Epitalon is a synthetic short peptide investigated in telomerase and cellular-aging experiments.",
    mechanism: "Epitalon is a synthetic short peptide investigated in telomerase and cellular-aging experiments. Telomerase helps maintain chromosome ends; activating it is not inherently proof of healthier aging.",
    researchFocus: ["Cell study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2003 experiment in human fetal fibroblast cultures reported telomerase-related activity and telomere changes.",
    form: "Lyophilized powder",
    tags: ["tetrapeptide", "telomere", "pineal"]
  },
  {
    id: "mots-c",
    name: "MOTS-c",
    category: "longevity",
    categoryLabel: "Cellular-aging research",
    shortDesc: "MOTS-c is a mitochondria-derived peptide investigated in cellular stress responses and metabolic regulation, including AMPK-related signaling.",
    mechanism: "MOTS-c is a mitochondria-derived peptide investigated in cellular stress responses and metabolic regulation, including AMPK-related signaling.",
    researchFocus: ["Cell and animal studies","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2015 study used cells and mice to investigate metabolic homeostasis, obesity and insulin resistance, reporting favorable experimental metabolic signals.",
    form: "Lyophilized powder",
    tags: ["mitochondrial", "metabolic"]
  },
  {
    id: "ss-31",
    name: "SS-31 (Elamipretide)",
    category: "longevity",
    categoryLabel: "Cellular-aging research",
    shortDesc: "SS-31, or elamipretide, interacts with mitochondrial cardiolipin.",
    mechanism: "SS-31, or elamipretide, interacts with mitochondrial cardiolipin. Research examines whether this changes mitochondrial membrane function and energy production.",
    researchFocus: ["Human randomized trial; indication-specific approval","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "MMPOWER-3 (2023) did not demonstrate significant improvement in its primary exercise/fatigue endpoints in primary mitochondrial myopathy. Separately, FDA granted accelerated approval in 2025 to Forzinity for muscle strength in Barth syndrome in patients weighing at least 30 kg.",
    form: "Lyophilized powder",
    tags: ["mitochondria", "cardiolipin"]
  },
  {
    id: "nad",
    name: "NAD+",
    category: "longevity",
    categoryLabel: "Cellular-aging research",
    shortDesc: "NAD+ is a coenzyme, not a peptide.",
    mechanism: "NAD+ is a coenzyme, not a peptide. It participates in electron transfer and is used by enzymes involved in cell signaling and repair.",
    researchFocus: ["Small human metabolism pilot","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A small 2019 intravenous pilot measured changes in NAD+ metabolites during a six-hour infusion. It studied biochemical handling, not whether treatment improved cognition, fatigue or lifespan.",
    form: "Lyophilized powder / research chemical",
    tags: ["coenzyme", "sirtuins", "energy", "NAD+"]
  },
  {
    id: "foxo4-dri",
    name: "FOXO4-DRI",
    category: "longevity",
    categoryLabel: "Cellular-aging research",
    shortDesc: "FOXO4-DRI is an experimental peptide designed to disrupt FOXO4–p53 interactions and induce death in certain senescent cells.",
    mechanism: "FOXO4-DRI is an experimental peptide designed to disrupt FOXO4–p53 interactions and induce death in certain senescent cells.",
    researchFocus: ["Cell and animal studies","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2017 cell and mouse study reported selective effects on senescent cells and tissue-related outcomes in aging and chemotherapy-associated models.",
    form: "Lyophilized powder",
    tags: ["senescence", "FOXO4", "p53"]
  },
  {
    id: "glutathione",
    name: "Glutathione",
    category: "longevity",
    categoryLabel: "Cellular-aging research",
    shortDesc: "Glutathione is a naturally occurring tripeptide involved in cellular redox balance and peroxide handling.",
    mechanism: "Glutathione is a naturally occurring tripeptide involved in cellular redox balance and peroxide handling. Its physiological role does not prove benefit from every supplemental formulation.",
    researchFocus: ["Human oral supplementation trials","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2015 randomized oral study in 54 adults reported increased body glutathione stores over six months. A separate shorter oral trial found no significant improvement in glutathione status or oxidative-stress measures.",
    form: "Lyophilized powder",
    tags: ["antioxidant", "redox", "GSH"]
  },

  // ===== COGNITIVE & NEURO =====
  {
    id: "semax",
    name: "Semax",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "Semax is an ACTH-fragment-related synthetic peptide investigated in neural signaling.",
    mechanism: "Semax is an ACTH-fragment-related synthetic peptide investigated in neural signaling. Proposed neurotrophic mechanisms remain distinct from demonstrated improvements in everyday cognition.",
    researchFocus: ["Small human imaging study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2018 study in 24 healthy volunteers investigated brain-network changes using imaging.",
    form: "Lyophilized powder",
    tags: ["ACTH", "BDNF", "nootropic"]
  },
  {
    id: "selank",
    name: "Selank",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "Selank is a tuftsin-related synthetic peptide studied in anxiety-related and neurochemical models.",
    mechanism: "Selank is a tuftsin-related synthetic peptide studied in anxiety-related and neurochemical models. A precise mechanism explaining clinical outcomes is not settled by the cited trial.",
    researchFocus: ["Small human clinical study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2008 clinical study in generalized anxiety disorder and neurasthenia examined symptom changes and enkephalin-related measures.",
    form: "Lyophilized powder",
    tags: ["tuftsin", "anxiolytic"]
  },
  {
    id: "dsip",
    name: "DSIP",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "Delta sleep-inducing peptide is studied in sleep and neuroendocrine physiology.",
    mechanism: "Delta sleep-inducing peptide is studied in sleep and neuroendocrine physiology. Its name should not be mistaken for proof that it reliably induces restorative sleep.",
    researchFocus: ["Small human trial; limited benefit","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 1992 double-blind study in 16 people with chronic insomnia found limited effects and no improvement in subjective sleep quality; the authors did not consider a major therapeutic benefit likely.",
    form: "Lyophilized powder",
    tags: ["sleep", "stress"]
  },
  {
    id: "pinealon",
    name: "Pinealon",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "Pinealon is a short synthetic peptide investigated in oxidative-stress and cell-survival models.",
    mechanism: "Pinealon is a short synthetic peptide investigated in oxidative-stress and cell-survival models.",
    researchFocus: ["Cell and animal studies","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2011 cell experiment reported changes in reactive oxygen species, viability and proliferation. A rat study examined offspring exposed to prenatal hyperhomocysteinemia.",
    form: "Lyophilized powder",
    tags: ["tripeptide", "neuroprotection"]
  },
  {
    id: "p21",
    name: "P21 (P021)",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "The research summarized here concerns P021, a CNTF-derived neurotrophic peptidomimetic.",
    mechanism: "The research summarized here concerns P021, a CNTF-derived neurotrophic peptidomimetic. The shorthand P21 is ambiguous and must not be confused with the p21 cell-cycle protein.",
    researchFocus: ["Animal study; verify molecular identity","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2017 study in a transgenic mouse model of Alzheimer-like pathology investigated long-term early P021 treatment and reported preservation of synaptic and cognitive measures.",
    form: "Lyophilized powder",
    tags: ["neurotrophic", "cognitive"]
  },

  // ===== OTHER RESEARCH =====
  {
    id: "pt-141",
    name: "PT-141 (Bremelanotide)",
    category: "other",
    categoryLabel: "Other Research",
    shortDesc: "PT-141, or bremelanotide, activates melanocortin receptors involved in central sexual-response signaling.",
    mechanism: "PT-141, or bremelanotide, activates melanocortin receptors involved in central sexual-response signaling. It does not work simply by increasing testosterone.",
    researchFocus: ["Human randomized trials","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "Two RECONNECT phase 3 trials (2019) in premenopausal women with hypoactive sexual desire disorder reported improvements in desire and associated distress measures.",
    form: "Lyophilized powder",
    tags: ["melanocortin", "MC4R"]
  },
  {
    id: "mt-2",
    name: "Melanotan II (MT-2)",
    category: "other",
    categoryLabel: "Other Research",
    shortDesc: "Melanotan-II activates melanocortin receptors involved in pigmentation and other functions.",
    mechanism: "Melanotan-II activates melanocortin receptors involved in pigmentation and other functions. Pigmentation is not its only biological effect.",
    researchFocus: ["Very small human pilot","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 1996 phase 1 pilot in three men explored pigmentation and tolerability. The sample is far too small to characterize uncommon or long-term harms.",
    form: "Lyophilized powder",
    tags: ["melanocortin", "pigmentation", "α-MSH"]
  },
  {
    id: "kisspeptin-10",
    name: "Kisspeptin-10",
    category: "other",
    categoryLabel: "Other Research",
    shortDesc: "Kisspeptin-10 activates KISS1R signaling upstream of GnRH, influencing pituitary LH and downstream reproductive hormones.",
    mechanism: "Kisspeptin-10 activates KISS1R signaling upstream of GnRH, influencing pituitary LH and downstream reproductive hormones.",
    researchFocus: ["Small human hormone-response study","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2011 study in men demonstrated LH release and changes in pulsatility during controlled kisspeptin-10 exposure.",
    form: "Lyophilized powder",
    tags: ["kisspeptin", "GnRH", "reproductive"]
  },
  {
    id: "oxytocin",
    name: "Oxytocin",
    category: "other",
    categoryLabel: "Other Research",
    shortDesc: "Oxytocin is a hormone and neuropeptide with reproductive and context-dependent behavioral signaling.",
    mechanism: "Oxytocin is a hormone and neuropeptide with reproductive and context-dependent behavioral signaling. Calling it a bonding hormone oversimplifies its effects.",
    researchFocus: ["Human randomized trial; negative primary finding","Study-specific findings and limitations","Combination evidence and overlapping pathways"],
    keyFindings: "A 2021 randomized trial in children and adolescents with autism did not find a significant advantage over placebo on its primary social-function outcome.",
    form: "Lyophilized powder",
    tags: ["neuropeptide", "social behavior"]
  }
];

const categories = {
  metabolic: "Metabolic Research",
  recovery: "Tissue & immune research",
  gh: "Growth Hormone Axis",
  skin: "Skin & Beauty",
  longevity: "Cellular-aging research",
  cognitive: "Cognitive & Neuropeptides",
  other: "Other Research"
};

const stackNotes = {
  "bpc-157+tb-500": {
    "title": "BPC-157 + TB-500",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "bpc-157+tb-500+ghk-cu": {
    "title": "BPC-157 + TB-500 + GHK-Cu (GLOW-style)",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "bpc-157+tb-500+ghk-cu+kpv": {
    "title": "BPC-157 + TB-500 + GHK-Cu + KPV (KLOW-style)",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "glow": {
    "title": "GLOW",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "klow": {
    "title": "KLOW",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "cjc-1295+ipamorelin": {
    "title": "CJC-1295 + Ipamorelin",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "ipamorelin+cjc-1295": {
    "title": "Ipamorelin + CJC-1295",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "cagrilintide+semaglutide": {
    "title": "Cagrilintide + Semaglutide (CagriSema-style)",
    "summary": "Combination evidence requires direct study.",
    "details": "REDEFINE 1 studied cagrilintide plus semaglutide as controlled study medicines. This does not establish equivalence, stability or safety of a catalog blend. See the source-linked evidence review."
  },
  "semax+selank": {
    "title": "Semax + Selank",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "epitalon+mots-c": {
    "title": "Epitalon + MOTS-c",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "bpc-157+kpv": {
    "title": "BPC-157 + KPV",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "nad+mots-c": {
    "title": "NAD+ + MOTS-c",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  },
  "ss-31+nad": {
    "title": "SS-31 + NAD+",
    "summary": "Combination evidence requires direct study.",
    "details": "Individual compound findings do not establish effects of this combination. See the source-linked evidence review for study limitations, molecular identity and overlapping pathways. Different mechanisms do not demonstrate synergy or safety."
  }
};

function getStackKey(ids) {
  return [...ids].sort().join('+');
}

function getStackNote(ids) {
  if (!ids || ids.length === 0) return null;
  if (ids.length === 1) {
    const p = peptides.find(x => x.id === ids[0]);
    if (!p) return null;
    return {
      title: p.name,
      summary: "Single-compound research focus.",
      details: p.keyFindings
    };
  }
  const key = getStackKey(ids);
  if (stackNotes[key]) return stackNotes[key];

  // Special handling for known blends by id
  if (ids.includes("glow") || ids.includes("klow")) {
    const blend = peptides.find(p => ids.includes(p.id) && (p.id === "glow" || p.id === "klow"));
    if (blend && stackNotes[blend.id]) return stackNotes[blend.id];
  }

  const names = ids.map(id => peptides.find(p => p.id === id)?.name).filter(Boolean);
  return {
    title: names.join(' + '),
    summary: "Custom research combination.",
    details: "This specific combination is not among the most frequently documented pairings in the current research literature. Researchers evaluating novel stacks typically examine the individual mechanisms of each compound and consider potential pathway overlap, complementarity, or interference. Formal combination studies for many peptide pairings remain limited."
  };
}
