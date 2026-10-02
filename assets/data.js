const peptides = [
  // ===== METABOLIC =====
  {
    id: "retatrutide",
    researchDoseNotes: "Clinical research programs have examined weekly subcutaneous dose-escalation schedules in the low-to-mid milligram range. Published protocols typically use gradual titration. These are study designs, not use recommendations.",
    name: "Retatrutide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Triple agonist targeting GLP-1, GIP, and glucagon receptors.",
    mechanism: "Retatrutide is a synthetic peptide engineered to activate three receptors simultaneously: GLP-1, GIP, and glucagon receptors. Multi-receptor activity is the primary focus of current laboratory investigation.",
    researchFocus: ["Multi-pathway metabolic signaling", "Energy homeostasis models", "Receptor co-activation studies", "Comparative incretin research"],
    keyFindings: "Preclinical and early clinical research examines how concurrent activation of these three pathways differs from single or dual agonist approaches.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "GIP", "glucagon", "triple agonist"]
  },
  {
    id: "tirzepatide",
    researchDoseNotes: "Clinical literature describes weekly subcutaneous regimens with stepwise titration across a range of milligram strengths. Dose-response relationships have been a major focus of published trials. For research discussion only.",
    name: "Tirzepatide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Dual GIP and GLP-1 receptor agonist.",
    mechanism: "Tirzepatide functions as a dual agonist at both the GIP and GLP-1 receptors. Research centers on simultaneous engagement of these two incretin pathways.",
    researchFocus: ["Incretin pathway interactions", "Dual-receptor pharmacology", "Metabolic regulation models"],
    keyFindings: "Laboratory and clinical literature investigates the relative contributions of GIP versus GLP-1 receptor activation.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "GIP", "dual agonist"]
  },
  {
    id: "semaglutide",
    researchDoseNotes: "Research and clinical literature commonly reference weekly subcutaneous administration with titration from lower to higher milligram strengths over several weeks. Study protocols vary by indication under investigation.",
    name: "Semaglutide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Long-acting GLP-1 receptor agonist.",
    mechanism: "Semaglutide is a modified GLP-1 receptor agonist designed for extended activity. Structural modifications slow degradation and prolong receptor engagement.",
    researchFocus: ["GLP-1 receptor signaling", "Long-acting peptide design", "Metabolic homeostasis models"],
    keyFindings: "Extensive research literature documents effects on GLP-1 receptor activation and downstream signaling.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "incretin"]
  },
  {
    id: "cagrilintide",
    researchDoseNotes: "Clinical research has examined weekly subcutaneous titration schedules in the low-milligram range, including combination protocols with GLP-1 agonists.",
    name: "Cagrilintide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Long-acting amylin analogue under investigation in metabolic models.",
    mechanism: "Cagrilintide is a long-acting amylin receptor agonist. Research focuses on satiety signaling, gastric emptying, and complementary pathways alongside incretin-based compounds.",
    researchFocus: ["Amylin receptor pharmacology", "Satiety pathways", "Combination metabolic research"],
    keyFindings: "Studies explore its effects alone and in combination with GLP-1/GIP agonists (e.g., CagriSema-style research).",
    form: "Lyophilized powder",
    tags: ["amylin", "satiety"]
  },
  {
    id: "cagrisema",
    name: "CagriSema (Cagrilintide + Semaglutide)",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Investigational combination of cagrilintide and semaglutide.",
    mechanism: "CagriSema pairs an amylin analogue with a GLP-1 receptor agonist. Research examines multi-hormone approaches to metabolic pathway modulation.",
    researchFocus: ["Multi-hormone metabolic models", "Amylin + GLP-1 co-administration research"],
    keyFindings: "Combination research explores complementary satiety and metabolic signaling pathways.",
    form: "Lyophilized powder",
    tags: ["amylin", "GLP-1", "combination"]
  },
  {
    id: "survodutide",
    name: "Survodutide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Dual GLP-1 and glucagon receptor agonist.",
    mechanism: "Survodutide is a dual agonist of the GLP-1 and glucagon receptors. Research investigates combined incretin and glucagon pathway activation.",
    researchFocus: ["GLP-1 + glucagon dual agonism", "Energy expenditure models"],
    keyFindings: "Literature examines effects on metabolic parameters through concurrent receptor engagement.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "glucagon", "dual agonist"]
  },
  {
    id: "mazdutide",
    name: "Mazdutide",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Dual GLP-1 and glucagon receptor agonist under investigation.",
    mechanism: "Mazdutide targets both GLP-1 and glucagon receptors. Research focuses on dual-pathway metabolic signaling.",
    researchFocus: ["Dual receptor pharmacology", "Metabolic regulation models"],
    keyFindings: "Studies explore comparative effects versus selective GLP-1 agonists.",
    form: "Lyophilized powder",
    tags: ["GLP-1", "glucagon"]
  },
  {
    id: "aod-9604",
    name: "AOD-9604",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Modified fragment of human growth hormone studied in fat metabolism models.",
    mechanism: "AOD-9604 corresponds to the C-terminal region of hGH (177-191) with a tyrosine substitution. Research examines lipolysis-related pathways independent of growth-promoting activity.",
    researchFocus: ["Lipolysis models", "hGH fragment research", "Metabolic pathway studies"],
    keyFindings: "Preclinical work has focused on fat metabolism parameters without significant IGF-1 elevation in many models.",
    form: "Lyophilized powder",
    tags: ["hGH fragment", "lipolysis"]
  },
  {
    id: "5-amino-1mq",
    name: "5-Amino-1MQ",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Small-molecule NNMT inhibitor studied in metabolic research.",
    mechanism: "5-Amino-1MQ inhibits nicotinamide N-methyltransferase (NNMT). Research explores effects on NAD+ metabolism and energy expenditure pathways.",
    researchFocus: ["NNMT inhibition", "NAD+ related pathways", "Metabolic rate models"],
    keyFindings: "Laboratory studies investigate links between NNMT activity and metabolic phenotypes.",
    form: "Lyophilized powder / research chemical",
    tags: ["NNMT", "metabolic", "NAD+"]
  },
  {
    id: "adipotide",
    name: "Adipotide (FTPP)",
    category: "metabolic",
    categoryLabel: "Metabolic Research",
    shortDesc: "Peptidomimetic studied in adipose vasculature research models.",
    mechanism: "Adipotide is designed to target prohibitin-expressing vasculature in white adipose tissue. Research has examined effects on adipose tissue in animal models.",
    researchFocus: ["Adipose vasculature targeting", "Prohibitin-related research"],
    keyFindings: "Preclinical literature explores selective effects on fat tissue blood supply in experimental models.",
    form: "Lyophilized powder",
    tags: ["adipose", "vasculature"]
  },

  // ===== RECOVERY =====
  {
    id: "bpc-157",
    researchDoseNotes: "Preclinical literature has used a wide range of doses (often expressed per kg in animal models). Human research remains limited; reported experimental ranges in secondary literature are typically in the microgram-to-low-milligram daily range when discussed. Not a use guideline.",
    name: "BPC-157",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    shortDesc: "Synthetic pentadecapeptide studied in tissue repair models.",
    mechanism: "BPC-157 is a 15-amino-acid sequence derived from a gastric protective protein. Research focuses on angiogenesis, growth factor pathways, and cytoprotective signaling.",
    researchFocus: ["Tendon and ligament models", "Gastrointestinal cytoprotection", "Angiogenesis pathways", "Soft tissue remodeling"],
    keyFindings: "Preclinical studies have examined wound healing parameters, vascular growth, and inflammatory modulation across multiple tissue injury models.",
    form: "Lyophilized powder",
    tags: ["tissue repair", "angiogenesis", "cytoprotection"]
  },
  {
    id: "tb-500",
    researchDoseNotes: "Research discussions often reference loading and maintenance concepts derived from preclinical and anecdotal research contexts, commonly in the low-milligram range per administration. Formal human dose-finding data are limited.",
    name: "TB-500 (Thymosin Beta-4 fragment)",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    shortDesc: "Synthetic fragment of Thymosin Beta-4.",
    mechanism: "TB-500 corresponds to an active region of Thymosin Beta-4. It is investigated for effects on actin regulation, cell migration, and tissue remodeling.",
    researchFocus: ["Cell migration and motility", "Actin cytoskeleton dynamics", "Wound and injury models"],
    keyFindings: "Laboratory research explores influences on cellular movement and recovery processes following experimental injury.",
    form: "Lyophilized powder",
    tags: ["cell migration", "thymosin", "actin"]
  },
  {
    id: "kpv",
    name: "KPV",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    shortDesc: "C-terminal tripeptide of α-MSH with anti-inflammatory research focus.",
    mechanism: "KPV is the C-terminal tripeptide of alpha-melanocyte-stimulating hormone. It is studied for anti-inflammatory activity while largely lacking pigmentary effects of the parent hormone.",
    researchFocus: ["Inflammatory pathway modulation", "α-MSH fragment research", "Tissue inflammation models"],
    keyFindings: "Preclinical work explores influence on inflammatory cytokine profiles and related cellular responses.",
    form: "Lyophilized powder",
    tags: ["anti-inflammatory", "α-MSH"]
  },
  {
    id: "glow",
    researchDoseNotes: "As a multi-peptide blend, research discussions typically reference the individual component literature rather than a single standardized blend dose. Component ratios and total peptide amounts vary by preparation.",
    name: "GLOW",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    shortDesc: "Multi-peptide blend typically combining GHK-Cu, BPC-157, and TB-500.",
    mechanism: "GLOW is a research blend that pairs a copper tripeptide (GHK-Cu) with two recovery-focused peptides (BPC-157 and TB-500). Investigators examine complementary pathways in tissue remodeling and repair models.",
    researchFocus: ["Multi-pathway tissue remodeling", "Copper peptide + recovery peptide combinations", "Matrix and repair signaling"],
    keyFindings: "Interest stems from combining matrix-support research (GHK-Cu) with tissue-repair and cell-migration research (BPC-157, TB-500). Formal combination studies remain limited compared with individual compound literature.",
    form: "Lyophilized powder (blend)",
    tags: ["blend", "GHK-Cu", "BPC-157", "TB-500", "remodeling"]
  },
  {
    id: "klow",
    researchDoseNotes: "KLOW-style four-peptide blends do not have established combination dose guidelines in formal literature. Any research discussion should start from the individual peptides' published experimental ranges.",
    name: "KLOW",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    shortDesc: "Four-peptide blend: GHK-Cu, BPC-157, TB-500, and KPV.",
    mechanism: "KLOW extends the GLOW concept by adding KPV (an α-MSH-derived tripeptide studied for anti-inflammatory activity). Research interest centers on concurrent examination of remodeling, repair, migration, and inflammatory-modulation pathways.",
    researchFocus: ["Multi-component recovery research", "Inflammation + repair pathway combinations", "Tissue remodeling models"],
    keyFindings: "The four-component design reflects interest in addressing complementary aspects of tissue research. Published formal combination data are sparse; most understanding derives from the individual peptides.",
    form: "Lyophilized powder (blend)",
    tags: ["blend", "GHK-Cu", "BPC-157", "TB-500", "KPV"]
  },
  {
    id: "bpc-tb",
    name: "BPC-157 + TB-500",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    shortDesc: "Classic dual recovery peptide blend.",
    mechanism: "Combines BPC-157 (studied in local tissue and angiogenic models) with TB-500 (studied in cell migration and actin-related processes).",
    researchFocus: ["Complementary repair pathways", "Tissue injury models"],
    keyFindings: "One of the most frequently discussed pairings in recovery-oriented research literature.",
    form: "Lyophilized powder (blend)",
    tags: ["blend", "BPC-157", "TB-500"]
  },
  {
    id: "thymosin-a1",
    name: "Thymosin Alpha-1",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    shortDesc: "Immunomodulatory peptide studied in immune regulation models.",
    mechanism: "Thymosin Alpha-1 is a synthetic 28-amino-acid peptide corresponding to a sequence from prothymosin alpha. Research focuses on T-cell maturation and immune modulation.",
    researchFocus: ["Immune modulation", "T-cell related research", "Inflammation models"],
    keyFindings: "Literature examines effects on immune cell function and related pathways.",
    form: "Lyophilized powder",
    tags: ["immune", "T-cell", "thymosin"]
  },
  {
    id: "ara-290",
    name: "ARA-290",
    category: "recovery",
    categoryLabel: "Recovery & Healing",
    shortDesc: "Erythropoietin-derived peptide studied in tissue protection models.",
    mechanism: "ARA-290 is a non-hematopoietic peptide derived from erythropoietin. Research investigates tissue-protective and anti-inflammatory signaling without significant red-cell stimulating activity.",
    researchFocus: ["Tissue protection models", "Innate repair receptor research"],
    keyFindings: "Studies explore selective tissue-protective pathways distinct from classical EPO effects.",
    form: "Lyophilized powder",
    tags: ["EPO-derived", "tissue protection"]
  },

  // ===== GH AXIS =====
  {
    id: "ipamorelin",
    researchDoseNotes: "Research literature on GH secretagogues often discusses microgram-range subcutaneous administration, sometimes multiple times per day in experimental protocols. Study designs differ substantially.",
    name: "Ipamorelin",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "Selective growth hormone secretagogue.",
    mechanism: "Ipamorelin is a pentapeptide that selectively activates the ghrelin/growth hormone secretagogue receptor (GHS-R).",
    researchFocus: ["Growth hormone secretion", "Ghrelin receptor pharmacology", "Selectivity versus older GHS compounds"],
    keyFindings: "Research compares its receptor selectivity and GH-releasing profile with earlier secretagogues.",
    form: "Lyophilized powder",
    tags: ["GHS", "ghrelin", "secretagogue"]
  },
  {
    id: "cjc-1295",
    researchDoseNotes: "GHRH analogue research has examined microgram-range subcutaneous dosing, sometimes combined with GHS compounds in experimental protocols. Frequency and timing are active research variables.",
    name: "CJC-1295 (No DAC)",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "GHRH analogue used in growth hormone axis research.",
    mechanism: "CJC-1295 (without Drug Affinity Complex) is a modified GHRH analogue studied for stimulation of pituitary growth hormone release.",
    researchFocus: ["GHRH receptor activation", "Pulsatile GH release models", "Combination with GHS compounds"],
    keyFindings: "Frequently examined alone and with growth hormone secretagogues for synergistic GH-axis research.",
    form: "Lyophilized powder",
    tags: ["GHRH", "GH axis"]
  },
  {
    id: "cjc-ipa",
    name: "CJC-1295 + Ipamorelin",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "GHRH analogue + GHS combination for growth hormone axis research.",
    mechanism: "Pairs GHRH-receptor activation (CJC-1295) with ghrelin-receptor activation (Ipamorelin).",
    researchFocus: ["Dual-pathway GH stimulation", "Synergistic GH-axis models"],
    keyFindings: "Classic research pairing for studying convergent stimulation of growth hormone release.",
    form: "Lyophilized powder (blend)",
    tags: ["GHRH", "GHS", "blend"]
  },
  {
    id: "tesamorelin",
    researchDoseNotes: "Clinical research literature describes daily subcutaneous administration in the low-milligram range for specific investigational contexts. Approved prescribing information (where applicable) differs from research-use discussion.",
    name: "Tesamorelin",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "GHRH analogue studied in GH axis and adipose research models.",
    mechanism: "Tesamorelin is a synthetic analogue of growth hormone-releasing hormone. Research has examined effects on the GH/IGF-1 axis and visceral adipose parameters.",
    researchFocus: ["GHRH receptor stimulation", "Visceral adipose models", "GH/IGF-1 axis"],
    keyFindings: "Clinical and laboratory literature documents changes in growth hormone secretion patterns and associated metabolic markers.",
    form: "Lyophilized powder",
    tags: ["GHRH", "visceral fat"]
  },
  {
    id: "sermorelin",
    name: "Sermorelin",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "GHRH (1-29) analogue studied in growth hormone secretion research.",
    mechanism: "Sermorelin is a synthetic peptide corresponding to the first 29 amino acids of GHRH. It is used in research examining pituitary GH release.",
    researchFocus: ["GHRH fragment research", "GH secretion models"],
    keyFindings: "Long-standing research tool for studying GHRH-mediated growth hormone release.",
    form: "Lyophilized powder",
    tags: ["GHRH", "GH secretion"]
  },
  {
    id: "ghrp-2",
    name: "GHRP-2",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "Growth hormone releasing peptide-2, a ghrelin mimetic.",
    mechanism: "GHRP-2 is a synthetic hexapeptide that acts at the ghrelin/GHS receptor to stimulate growth hormone release.",
    researchFocus: ["GHS receptor activation", "GH pulse research"],
    keyFindings: "Widely studied as a potent GH secretagogue in laboratory and clinical research contexts.",
    form: "Lyophilized powder",
    tags: ["GHS", "GHRP"]
  },
  {
    id: "ghrp-6",
    name: "GHRP-6",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "Growth hormone releasing peptide-6.",
    mechanism: "GHRP-6 is a hexapeptide ghrelin mimetic that stimulates GH release via the GHS receptor. It has also been studied in appetite-related models.",
    researchFocus: ["GHS receptor pharmacology", "GH and appetite pathway research"],
    keyFindings: "Research literature covers both GH-releasing and orexigenic observations in experimental settings.",
    form: "Lyophilized powder",
    tags: ["GHS", "GHRP"]
  },
  {
    id: "igf-1-lr3",
    name: "IGF-1 LR3",
    category: "gh",
    categoryLabel: "Growth Hormone Axis",
    shortDesc: "Long-acting IGF-1 analogue studied in growth factor research.",
    mechanism: "IGF-1 LR3 is a modified insulin-like growth factor-1 with an N-terminal extension and arginine substitution that reduces binding to IGF-binding proteins, prolonging activity in research models.",
    researchFocus: ["IGF-1 receptor signaling", "Growth factor pathway research", "Anabolic signaling models"],
    keyFindings: "Used in laboratory settings to study prolonged IGF-1 receptor engagement.",
    form: "Lyophilized powder",
    tags: ["IGF-1", "growth factor"]
  },

  // ===== SKIN & BEAUTY =====
  {
    id: "ghk-cu",
    researchDoseNotes: "Topical research concentrations and injectable research discussions vary widely. Laboratory and cosmetic-research literature reports diverse dosing approaches depending on the model (topical vs. other routes).",
    name: "GHK-Cu",
    category: "skin",
    categoryLabel: "Skin & Beauty",
    shortDesc: "Copper-binding tripeptide studied in remodeling and skin models.",
    mechanism: "GHK-Cu is a naturally occurring complex of glycyl-L-histidyl-L-lysine with copper ions. Research examines roles in gene expression related to tissue remodeling, antioxidant activity, and extracellular matrix support.",
    researchFocus: ["Collagen and matrix synthesis", "Wound healing models", "Antioxidant pathways", "Skin and tissue remodeling"],
    keyFindings: "Studies document effects on expression of genes involved in repair and remodeling, as well as copper-dependent enzymatic processes.",
    form: "Lyophilized powder",
    tags: ["copper peptide", "collagen", "remodeling"]
  },
  {
    id: "ahk-cu",
    name: "AHK-Cu",
    category: "skin",
    categoryLabel: "Skin & Beauty",
    shortDesc: "Copper tripeptide analogue studied in hair and skin research models.",
    mechanism: "AHK-Cu is a copper-binding tripeptide related to GHK-Cu. Research has explored effects in dermal and follicular models.",
    researchFocus: ["Dermal and follicular research", "Copper peptide comparisons"],
    keyFindings: "Literature examines similarities and differences versus GHK-Cu in tissue and hair follicle models.",
    form: "Lyophilized powder",
    tags: ["copper peptide", "dermal"]
  },
  {
    id: "snap-8",
    name: "SNAP-8",
    category: "skin",
    categoryLabel: "Skin & Beauty",
    shortDesc: "Octapeptide studied in expression-line and neuromuscular models.",
    mechanism: "SNAP-8 is a synthetic octapeptide designed as an elongation of the Argireline (Acetyl Hexapeptide-8) sequence. It is investigated for effects on SNARE complex formation.",
    researchFocus: ["SNARE complex research", "Expression-line models", "Neuromuscular signaling in skin"],
    keyFindings: "In vitro and topical research explores modulation of neurotransmitter release-related pathways in dermal models.",
    form: "Lyophilized powder",
    tags: ["expression lines", "SNARE"]
  },
  {
    id: "matrixyl",
    name: "Matrixyl (Palmitoyl Pentapeptide)",
    category: "skin",
    categoryLabel: "Skin & Beauty",
    shortDesc: "Palmitoylated pentapeptide studied in matrix and collagen research.",
    mechanism: "Matrixyl refers to palmitoyl pentapeptide sequences studied for effects on extracellular matrix components, including collagen and related proteins.",
    researchFocus: ["Collagen synthesis models", "Extracellular matrix research", "Dermal aging models"],
    keyFindings: "Topical and in vitro literature examines changes in matrix protein expression.",
    form: "Research peptide / cosmetic research ingredient",
    tags: ["collagen", "matrix", "dermal"]
  },

  // ===== LONGEVITY & CELLULAR =====
  {
    id: "epitalon",
    researchDoseNotes: "Research protocols discussed in the literature (particularly from earlier Russian and related research programs) have used short courses in the low-milligram range. Schedules and total exposure differ across studies.",
    name: "Epitalon (Epithalon)",
    category: "longevity",
    categoryLabel: "Longevity & Cellular",
    shortDesc: "Synthetic tetrapeptide studied in aging and telomere research.",
    mechanism: "Epitalon (Ala-Glu-Asp-Gly) is a synthetic tetrapeptide based on the active component of a pineal peptide complex. Research has focused on telomerase activity, melatonin regulation, and aging-related biomarkers.",
    researchFocus: ["Telomerase and telomere dynamics", "Pineal and melatonin pathways", "Aging biomarker models"],
    keyFindings: "Preclinical literature explores effects on telomerase expression and markers associated with cellular aging processes.",
    form: "Lyophilized powder",
    tags: ["tetrapeptide", "telomere", "pineal"]
  },
  {
    id: "mots-c",
    researchDoseNotes: "Emerging research has examined doses in the low-to-mid milligram range in experimental models. Human dose-finding literature remains limited.",
    name: "MOTS-c",
    category: "longevity",
    categoryLabel: "Longevity & Cellular",
    shortDesc: "Mitochondrial-derived peptide.",
    mechanism: "MOTS-c is a 16-amino-acid peptide encoded in the mitochondrial genome. Research investigates roles in metabolic regulation, insulin sensitivity pathways, and cellular responses to metabolic stress.",
    researchFocus: ["Mitochondrial signaling", "Metabolic homeostasis", "Exercise and stress adaptation models"],
    keyFindings: "Emerging studies examine how this mitochondria-encoded peptide influences nuclear gene expression and metabolic adaptation.",
    form: "Lyophilized powder",
    tags: ["mitochondrial", "metabolic"]
  },
  {
    id: "ss-31",
    researchDoseNotes: "Clinical research programs have investigated parenteral dosing in specific disease-model contexts. Published trial protocols should be consulted for exact study designs.",
    name: "SS-31 (Elamipretide)",
    category: "longevity",
    categoryLabel: "Longevity & Cellular",
    shortDesc: "Mitochondria-targeted peptide that interacts with cardiolipin.",
    mechanism: "SS-31 is a tetrapeptide designed to target mitochondria and associate with cardiolipin in the inner mitochondrial membrane. Research focuses on mitochondrial function and oxidative stress.",
    researchFocus: ["Mitochondrial membrane integrity", "Oxidative stress models", "Cardiolipin interactions"],
    keyFindings: "Laboratory studies investigate protection of mitochondrial structure and function under experimental stress conditions.",
    form: "Lyophilized powder",
    tags: ["mitochondria", "cardiolipin"]
  },
  {
    id: "nad",
    researchDoseNotes: "NAD+ research spans oral precursors, IV protocols in clinical research settings, and other routes. Doses in published work vary by route and study design, often in the tens to hundreds of milligrams depending on context.",
    name: "NAD+",
    category: "longevity",
    categoryLabel: "Longevity & Cellular",
    shortDesc: "Nicotinamide adenine dinucleotide — central coenzyme in cellular energy and redox research.",
    mechanism: "NAD+ is a critical coenzyme involved in redox reactions, sirtuin activity, DNA repair pathways, and cellular energy metabolism. Research examines age-related changes in NAD+ levels and interventions that influence the NAD+ pool.",
    researchFocus: ["Sirtuin and redox biology", "Cellular energy metabolism", "Aging and NAD+ decline models", "DNA repair pathways"],
    keyFindings: "Extensive literature links NAD+ availability to mitochondrial function, metabolic health markers, and cellular stress responses in experimental systems.",
    form: "Lyophilized powder / research chemical",
    tags: ["coenzyme", "sirtuins", "energy", "NAD+"]
  },
  {
    id: "foxo4-dri",
    name: "FOXO4-DRI",
    category: "longevity",
    categoryLabel: "Longevity & Cellular",
    shortDesc: "Peptide designed to interfere with FOXO4–p53 interaction in senescence research.",
    mechanism: "FOXO4-DRI is a research peptide developed to disrupt the interaction between FOXO4 and p53. Studies have explored effects on senescent cell populations in animal models.",
    researchFocus: ["Cellular senescence research", "FOXO4–p53 pathway", "Senolytic strategy models"],
    keyFindings: "Preclinical work has examined clearance of senescent cells and associated tissue changes in experimental settings.",
    form: "Lyophilized powder",
    tags: ["senescence", "FOXO4", "p53"]
  },
  {
    id: "glutathione",
    name: "Glutathione",
    category: "longevity",
    categoryLabel: "Longevity & Cellular",
    shortDesc: "Tripeptide antioxidant central to cellular redox research.",
    mechanism: "Glutathione (γ-glutamyl-cysteinyl-glycine) is the primary intracellular antioxidant. Research covers redox balance, detoxification pathways, and oxidative stress models.",
    researchFocus: ["Redox biology", "Oxidative stress models", "Detoxification pathways"],
    keyFindings: "Foundational molecule in virtually all research involving cellular oxidative stress and antioxidant capacity.",
    form: "Lyophilized powder",
    tags: ["antioxidant", "redox", "GSH"]
  },

  // ===== COGNITIVE & NEURO =====
  {
    id: "semax",
    researchDoseNotes: "Research literature (including intranasal experimental use) has reported microgram-to-low-milligram ranges depending on route and study. Formal standardized human guidelines do not exist for research peptides generally.",
    name: "Semax",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "Synthetic ACTH fragment studied in cognitive and neuroprotective models.",
    mechanism: "Semax is a synthetic heptapeptide analogue of ACTH (4-10). Research has examined effects on neurotrophic factor expression (including BDNF), cognitive performance models, and neuroprotection.",
    researchFocus: ["BDNF and neurotrophic signaling", "Cognitive performance models", "Neuroprotection pathways"],
    keyFindings: "Studies explore influences on learning, memory parameters, and cellular responses to neural stress.",
    form: "Lyophilized powder",
    tags: ["ACTH", "BDNF", "nootropic"]
  },
  {
    id: "selank",
    researchDoseNotes: "Experimental protocols have used microgram-range dosing, including intranasal routes in some research settings. Data are limited and not intended as use instructions.",
    name: "Selank",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "Synthetic tuftsin analogue studied in stress and cognitive models.",
    mechanism: "Selank is a synthetic heptapeptide analogue of the immunomodulatory peptide tuftsin. Research focuses on anxiolytic-like effects, cognitive parameters, and stress-response modulation.",
    researchFocus: ["Stress and anxiety models", "Cognitive performance", "Immunomodulatory pathways"],
    keyFindings: "Laboratory investigations examine behavioral and molecular changes associated with stress exposure and cognitive tasks.",
    form: "Lyophilized powder",
    tags: ["tuftsin", "anxiolytic"]
  },
  {
    id: "dsip",
    name: "DSIP",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "Delta sleep-inducing peptide studied in sleep and stress models.",
    mechanism: "DSIP is a naturally occurring nonapeptide. Research has examined effects on sleep architecture, stress responses, and related neuroendocrine pathways.",
    researchFocus: ["Sleep architecture models", "Stress and neuroendocrine research"],
    keyFindings: "Literature explores influences on sleep parameters and adaptive responses to stress in experimental systems.",
    form: "Lyophilized powder",
    tags: ["sleep", "stress"]
  },
  {
    id: "pinealon",
    name: "Pinealon",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "Synthetic tripeptide studied in neuroprotection and pineal-related research.",
    mechanism: "Pinealon is a synthetic tripeptide (Glu-Asp-Arg) investigated in models of neural stress, cognitive function, and pineal/circadian research.",
    researchFocus: ["Neuroprotection models", "Cognitive and circadian research"],
    keyFindings: "Preclinical work examines cellular responses to oxidative and excitatory stress in neural systems.",
    form: "Lyophilized powder",
    tags: ["tripeptide", "neuroprotection"]
  },
  {
    id: "p21",
    name: "P21 (P021)",
    category: "cognitive",
    categoryLabel: "Cognitive & Neuropeptides",
    shortDesc: "Synthetic peptide studied in neurotrophic and cognitive models.",
    mechanism: "P21 is a research peptide investigated for effects on neurotrophic signaling and cognitive performance parameters in experimental models.",
    researchFocus: ["Neurotrophic factor research", "Cognitive models"],
    keyFindings: "Laboratory studies explore influences on neural plasticity-related pathways.",
    form: "Lyophilized powder",
    tags: ["neurotrophic", "cognitive"]
  },

  // ===== OTHER RESEARCH =====
  {
    id: "pt-141",
    name: "PT-141 (Bremelanotide)",
    category: "other",
    categoryLabel: "Other Research",
    shortDesc: "Melanocortin receptor agonist studied in behavioral and neuroendocrine models.",
    mechanism: "PT-141 is a synthetic peptide that acts as an agonist at melanocortin receptors (notably MC3R/MC4R). Research has examined central nervous system and behavioral endpoints.",
    researchFocus: ["Melanocortin receptor pharmacology", "Behavioral and neuroendocrine models"],
    keyFindings: "Literature covers receptor activation profiles and associated physiological observations in research settings.",
    form: "Lyophilized powder",
    tags: ["melanocortin", "MC4R"]
  },
  {
    id: "mt-2",
    name: "Melanotan II (MT-2)",
    category: "other",
    categoryLabel: "Other Research",
    shortDesc: "Synthetic melanocortin peptide studied in pigmentation research.",
    mechanism: "Melanotan II is a synthetic analogue of α-MSH. It is used in research examining melanogenesis, skin pigmentation pathways, and melanocortin receptor activity.",
    researchFocus: ["Melanogenesis", "Melanocortin receptor research", "Pigmentation models"],
    keyFindings: "Extensive research on α-MSH analogues and their effects on melanocyte activity.",
    form: "Lyophilized powder",
    tags: ["melanocortin", "pigmentation", "α-MSH"]
  },
  {
    id: "kisspeptin-10",
    name: "Kisspeptin-10",
    category: "other",
    categoryLabel: "Other Research",
    shortDesc: "Peptide studied in reproductive hormone axis research.",
    mechanism: "Kisspeptin-10 is a fragment of kisspeptin that activates the GPR54 (KISS1R) receptor. Research focuses on the hypothalamic control of GnRH and downstream reproductive hormones.",
    researchFocus: ["GnRH regulation", "Reproductive axis models", "KISS1R pharmacology"],
    keyFindings: "Key research tool for studying upstream control of the reproductive hormone cascade.",
    form: "Lyophilized powder",
    tags: ["kisspeptin", "GnRH", "reproductive"]
  },
  {
    id: "oxytocin",
    name: "Oxytocin",
    category: "other",
    categoryLabel: "Other Research",
    shortDesc: "Neuropeptide studied in social behavior, bonding, and neuroendocrine research.",
    mechanism: "Oxytocin is a nine-amino-acid peptide produced in the hypothalamus. Research spans social behavior, stress modulation, and reproductive physiology models.",
    researchFocus: ["Social and bonding behavior models", "Neuroendocrine regulation", "Stress modulation"],
    keyFindings: "One of the most extensively studied neuropeptides in behavioral and physiological research.",
    form: "Lyophilized powder",
    tags: ["neuropeptide", "social behavior"]
  }
];

const categories = {
  metabolic: "Metabolic Research",
  recovery: "Recovery & Healing",
  gh: "Growth Hormone Axis",
  skin: "Skin & Beauty",
  longevity: "Longevity & Cellular",
  cognitive: "Cognitive & Neuropeptides",
  other: "Other Research"
};

const stackNotes = {
  "bpc-157+tb-500": {
    title: "BPC-157 + TB-500",
    summary: "One of the most frequently discussed combinations in recovery-oriented research.",
    details: "BPC-157 is often studied for local tissue and angiogenic effects, while TB-500 is investigated for broader cell migration and actin-related processes. Researchers explore whether concurrent use engages complementary repair pathways."
  },
  "bpc-157+tb-500+ghk-cu": {
    title: "BPC-157 + TB-500 + GHK-Cu (GLOW-style)",
    summary: "Core of the GLOW research blend concept.",
    details: "Adding GHK-Cu introduces a copper-peptide component linked in research to matrix support and gene expression related to remodeling. Interest centers on multi-pathway tissue research."
  },
  "bpc-157+tb-500+ghk-cu+kpv": {
    title: "BPC-157 + TB-500 + GHK-Cu + KPV (KLOW-style)",
    summary: "Four-component recovery and inflammation research interest.",
    details: "KLOW-style combinations add KPV for anti-inflammatory pathway research alongside remodeling and repair peptides. Formal combination data remain limited."
  },
  "glow": {
    title: "GLOW",
    summary: "GHK-Cu + BPC-157 + TB-500 research blend.",
    details: "Designed to examine matrix support, tissue repair, and cell migration pathways together. Understanding is largely built from the individual compound literature."
  },
  "klow": {
    title: "KLOW",
    summary: "GHK-Cu + BPC-157 + TB-500 + KPV research blend.",
    details: "Extends GLOW by incorporating anti-inflammatory research angles via KPV. Multi-pathway interest with limited formal combination studies."
  },
  "cjc-1295+ipamorelin": {
    title: "CJC-1295 + Ipamorelin",
    summary: "Classic dual approach to the growth hormone axis.",
    details: "CJC-1295 acts via the GHRH receptor while Ipamorelin acts via the ghrelin/GHS receptor. Researchers study potential synergistic stimulation of growth hormone release."
  },
  "ipamorelin+cjc-1295": {
    title: "Ipamorelin + CJC-1295",
    summary: "Classic dual approach to the growth hormone axis.",
    details: "CJC-1295 acts via the GHRH receptor while Ipamorelin acts via the ghrelin/GHS receptor. Researchers study potential synergistic stimulation of growth hormone release."
  },
  "cagrilintide+semaglutide": {
    title: "Cagrilintide + Semaglutide (CagriSema-style)",
    summary: "Amylin + GLP-1 combination research.",
    details: "Pairs satiety/amylin pathway research with GLP-1 receptor agonism. Reflects multi-hormone approaches under investigation in metabolic research."
  },
  "semax+selank": {
    title: "Semax + Selank",
    summary: "Neuropeptide pairing studied in cognitive and stress models.",
    details: "Both are synthetic peptides examined for effects on cognitive parameters and stress-related responses. Combination data remain limited."
  },
  "epitalon+mots-c": {
    title: "Epitalon + MOTS-c",
    summary: "Longevity-oriented cellular research interest.",
    details: "Epitalon has been investigated in telomere and pineal-related models; MOTS-c in mitochondrial and metabolic stress models. Different cellular aging pathways."
  },
  "bpc-157+kpv": {
    title: "BPC-157 + KPV",
    summary: "Tissue repair + anti-inflammatory research pairing.",
    details: "KPV is studied for anti-inflammatory properties. Pairing with BPC-157 is of interest where both repair signaling and inflammatory modulation are relevant."
  },
  "nad+mots-c": {
    title: "NAD+ + MOTS-c",
    summary: "Cellular energy and mitochondrial research interest.",
    details: "NAD+ is central to redox and sirtuin biology; MOTS-c is a mitochondria-encoded peptide. Combined interest in cellular energy and stress-adaptation pathways."
  },
  "ss-31+nad": {
    title: "SS-31 + NAD+",
    summary: "Mitochondrial support research pairing.",
    details: "SS-31 targets cardiolipin and mitochondrial membranes; NAD+ supports redox and energetic pathways. Interest in complementary mitochondrial research angles."
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
