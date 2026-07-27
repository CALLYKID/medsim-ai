import { Disease } from "./diseaseLibrary";

export function generateLearningPoints(disease: Disease): string[] {
  const name = disease.name.toLowerCase();

  if (
    name.includes("myocardial") ||
    name.includes("infarction") ||
    name.includes("heart attack") ||
    name.includes("acute coronary")
  ) {
    return [
      "Recognise myocardial infarction from acute chest pain patterns",
      "Assess ST elevation as a possible STEMI emergency",
      "Identify cardiogenic shock as a life-threatening complication",
      "Prioritise ECG and urgent reperfusion assessment"
    ];
  }

  if (name.includes("stroke")) {
    return [
      "Recognise sudden neurological deficits as possible stroke symptoms",
      "Assess FAST criteria to identify stroke emergencies",
      "Identify red flags such as cerebral swelling and rapid neurological decline",
      "Prioritise rapid imaging and treatment"
    ];
  }

  if (
    name.includes("pneumonia") ||
    name.includes("bronchitis") ||
    name.includes("copd")
  ) {
    return [
      "Recognise respiratory deterioration through symptoms and observations",
      "Assess oxygenation and breathing difficulty severity",
      "Identify red flags of respiratory failure and sepsis",
      "Prioritise appropriate investigations and treatment"
    ];
  }

  if (
    name.includes("asthma") ||
    name.includes("wheeze") ||
    name.includes("bronchospasm")
  ) {
    return [
      "Recognise acute asthma exacerbations and trigger factors",
      "Assess peak flow rates and work of breathing",
      "Identify red flags of a life-threatening asthma attack",
      "Prioritise bronchodilator therapy and steroid administration"
    ];
  }

  if (
    name.includes("overdose-paracetamol") ||
    name.includes("paracetamol toxicity") ||
    name.includes("acetaminophen poisoning")
  ) {
    return [
      "Recognise delayed onset of hepatic injury following ingestion",
      "Assess time of ingestion against plasma concentration nomograms",
      "Identify red flags of severe hepatotoxicity",
      "Prioritise prompt administration of N-acetylcysteine"
    ];
  }

  if (
    name.includes("overdose") ||
    name.includes("poisoning") ||
    name.includes("toxicity")
  ) {
    return [
      "Recognise toxicological syndromes based on clinical presentation",
      "Assess airway stability and level of consciousness",
      "Identify red flags requiring specific antidotes and decontamination",
      "Prioritise supportive care and toxicology specialist consultation"
    ];
  }

  if (
    name.includes("diabetes") ||
    name.includes("diabetic") ||
    name.includes("ketoacidosis") ||
    name.includes("hyperglycaemia") ||
    name.includes("hypoglycaemia")
  ) {
    return [
      "Recognise acute blood glucose disturbances and symptoms",
      "Assess fluid balance and electrolyte status",
      "Identify red flags of diabetic ketoacidosis or severe hypoglycaemia",
      "Prioritise insulin therapy, monitoring, and corrective protocols"
    ];
  }

  if (
    name.includes("sepsis") ||
    name.includes("septicaemia") ||
    name.includes("blood poisoning")
  ) {
    return [
      "Recognise early signs of systemic infection and systemic inflammatory response",
      "Assess vital sign parameters using sepsis screening tools",
      "Identify red flags of septic shock and organ dysfunction markers",
      "Prioritise the Sepsis Six bundle including cultures, antibiotics, and fluids"
    ];
  }

  if (
    name.includes("heart failure") ||
    name.includes("cardiac failure") ||
    name.includes("congestive heart failure")
  ) {
    return [
      "Recognise signs of acute decompensated heart failure",
      "Assess fluid overload, oedema, and respiratory distress",
      "Identify red flags such as medication non-adherence or infection triggers",
      "Prioritise diuretic therapy and fluid restriction management"
    ];
  }

  if (
    name.includes("renal failure") ||
    name.includes("kidney failure") ||
    name.includes("acute kidney injury") ||
    name.includes("aki")
  ) {
    return [
      "Recognise sudden changes in urine output and biochemical markers",
      "Assess fluid balance, electrolyte imbalances, and uremic symptoms",
      "Identify red flags across pre-renal, intrinsic, and post-renal causes",
      "Prioritise nephrotoxic drug avoidance and fluid optimisation"
    ];
  }

  if (
    name.includes("hypertension") ||
    name.includes("high blood pressure") ||
    name.includes("hypertensive emergency")
  ) {
    return [
      "Recognise dangerously high blood pressure readings",
      "Assess neurological and cardiovascular symptoms in crisis",
      "Identify red flags of target organ damage",
      "Prioritise controlled blood pressure reduction and monitoring"
    ];
  }

  if (
    name.includes("pulmonary embolism") ||
    name.includes("blood clot in lung")
  ) {
    return [
      "Recognise sudden onset pleuritic chest pain and breathlessness",
      "Assess risk factors such as immobility, DVT, or surgery",
      "Identify red flags of right ventricular strain and haemodynamic instability",
      "Prioritise urgent imaging, V/Q scanning, and anticoagulation therapy"
    ];
  }

  if (
    name.includes("deep vein thrombosis") ||
    name.includes("dvt") ||
    name.includes("venous thrombosis")
  ) {
    return [
      "Recognise unilateral limb swelling, pain, and tenderness",
      "Assess clinical probability scores such as the Wells criteria",
      "Identify red flags of clot propagation and pulmonary embolism",
      "Prioritise compression ultrasonography and prompt anticoagulation"
    ];
  }

  if (
    name.includes("arrhythmia") ||
    name.includes("atrial fibrillation") ||
    name.includes("supraventricular tachycardia") ||
    name.includes("ventricular fibrillation") ||
    name.includes("tachycardia") ||
    name.includes("bradycardia")
  ) {
    return [
      "Recognise irregular heart rhythms from ECG and pulse assessment",
      "Assess haemodynamic stability during rhythm disturbances",
      "Identify red flags of thromboembolism or sudden cardiac arrest",
      "Prioritise rate or rhythm control strategies and resuscitation protocols"
    ];
  }

  if (
    name.includes("cardiac arrest") ||
    name.includes("asystole") ||
    name.includes("pulseless electrical activity")
  ) {
    return [
      "Recognise sudden loss of consciousness and absence of signs of life",
      "Assess rhythm type and immediate resuscitation needs",
      "Identify red flags of unshockable versus shockable rhythms",
      "Prioritise high-quality CPR and advanced life support algorithms"
    ];
  }

  if (
    name.includes("anaphylaxis") ||
    name.includes("severe allergic reaction") ||
    name.includes("allergy")
  ) {
    return [
      "Recognise rapid multi-system allergic signs and airway compromise",
      "Assess respiratory distress and cardiovascular collapse",
      "Identify red flags of severe upper airway swelling and shock",
      "Prioritise immediate intramuscular adrenaline administration and airway support"
    ];
  }

  if (
    name.includes("meningitis") ||
    name.includes("encephalitis") ||
    name.includes("brain infection")
  ) {
    return [
      "Recognise classic signs including neck stiffness, fever, and altered mental state",
      "Assess for characteristic non-blanching rashes",
      "Identify red flags of rapid neurological decline and raised intracranial pressure",
      "Prioritise emergency antibiotic administration and isolation protocols"
    ];
  }

  if (
    name.includes("appendicitis") ||
    name.includes("acute abdomen") ||
    name.includes("peritonitis")
  ) {
    return [
      "Recognise migrating abdominal pain starting periumbilical to right iliac fossa",
      "Assess peritoneal signs including guarding and rebound tenderness",
      "Identify red flags of perforation and systemic infection",
      "Prioritise surgical consultation and pre-operative preparation"
    ];
  }

  if (
    name.includes("bowel obstruction") ||
    name.includes("intestinal obstruction") ||
    name.includes("ileus")
  ) {
    return [
      "Recognise colicky abdominal pain, vomiting, and absolute constipation",
      "Assess abdominal distension and bowel sounds",
      "Identify red flags of bowel ischaemia, necrosis, and perforation",
      "Prioritise decompression via nasogastric tube and surgical evaluation"
    ];
  }

  if (
    name.includes("pancreatitis") ||
    name.includes("acute pancreatitis")
  ) {
    return [
      "Recognise severe upper abdominal pain radiating to the back",
      "Assess systemic inflammatory response and fluid sequestration",
      "Identify red flags of organ failure and local complications",
      "Prioritise aggressive fluid resuscitation and analgesia"
    ];
  }

  if (
    name.includes("liver failure") ||
    name.includes("cirrhosis") ||
    name.includes("hepatic encephalopathy") ||
    name.includes("liver disease")
  ) {
    return [
      "Recognise signs of chronic liver disease including jaundice and ascites",
      "Assess neurological status for early signs of hepatic encephalopathy",
      "Identify red flags of variceal bleeding and coagulopathy",
      "Prioritise multidisciplinary management and avoidance of hepatotoxins"
    ];
  }

  if (
    name.includes("gastrointestinal bleed") ||
    name.includes("gi bleed") ||
    name.includes("haematemesis") ||
    name.includes("melaena")
  ) {
    return [
      "Recognise upper versus lower GI bleeding manifestations",
      "Assess haemodynamic compromise and signs of acute blood loss anaemia",
      "Identify red flags of high-risk endoscopic features",
      "Prioritise fluid resuscitation, blood transfusion, and urgent endoscopy"
    ];
  }

  if (
    name.includes("cholecystitis") ||
    name.includes("gallstones") ||
    name.includes("biliary colic")
  ) {
    return [
      "Recognise right upper quadrant pain exacerbated by fatty foods",
      "Assess positive Murphy's sign and signs of biliary obstruction",
      "Identify red flags of cholangitis and secondary pancreatitis",
      "Prioritise imaging, analgesia, and surgical referral"
    ];
  }

  if (
    name.includes("peptic ulcer") ||
    name.includes("gastric ulcer") ||
    name.includes("duodenal ulcer")
  ) {
    return [
      "Recognise burning epigastric pain related to food intake",
      "Assess for complications like bleeding or perforation",
      "Identify red flags of acute peritonitis or severe haemorrhage",
      "Prioritise acid suppression therapy and eradication treatment"
    ];
  }

  if (
    name.includes("inflammatory bowel disease") ||
    name.includes("crohn's") ||
    name.includes("ulcerative colitis")
  ) {
    return [
      "Recognise chronic abdominal pain, weight loss, and bloody diarrhoea patterns",
      "Assess systemic and extra-intestinal manifestations",
      "Identify red flags of acute flares and toxic megacolon",
      "Prioritise anti-inflammatory therapies and specialist gastroenterology input"
    ];
  }

  if (
    name.includes("urinary tract infection") ||
    name.includes("uti") ||
    name.includes("pyelonephritis") ||
    name.includes("cystitis")
  ) {
    return [
      "Recognise dysuria, frequency, and lower urinary tract symptoms",
      "Assess for loin pain and systemic fever indicating upper tract involvement",
      "Identify red flags in high-risk groups such as pregnant or immunocompromised hosts",
      "Prioritise urinalysis, culture, and targeted antimicrobial therapy"
    ];
  }

  if (
    name.includes("nephrolithiasis") ||
    name.includes("kidney stones") ||
    name.includes("renal colic")
  ) {
    return [
      "Recognise excruciating loin-to-groin flank pain",
      "Assess microscopic or macroscopic haematuria",
      "Identify red flags of urinary tract obstruction and infection",
      "Prioritise pain relief, hydration, and urological evaluation"
    ];
  }

  if (
    name.includes("septic shock") ||
    name.includes("hypovolemic shock") ||
    name.includes("distributive shock") ||
    name.includes("shock")
  ) {
    return [
      "Recognise tissue hypoperfusion signs including hypotension and altered perfusion",
      "Assess microvascular status, lactate levels, and urine output",
      "Identify red flags of rapid decompensation and multiorgan failure",
      "Prioritise immediate fluid resuscitation and vasoactive support"
    ];
  }

  if (
    name.includes("seizure") ||
    name.includes("epilepsy") ||
    name.includes("status epilepticus")
  ) {
    return [
      "Recognise tonic-clonic movements and post-ictal states",
      "Assess duration of seizure activity to identify status epilepticus",
      "Identify red flags such as prolonged seizure duration or triggers",
      "Prioritise airway protection and emergency rescue anti-seizure medication"
    ];
  }

  if (
    name.includes("syncope") ||
    name.includes("fainting") ||
    name.includes("collapse")
  ) {
    return [
      "Recognise transient loss of consciousness with spontaneous recovery",
      "Assess prodromal symptoms to differentiate vasovagal from cardiac causes",
      "Identify red flags indicating underlying structural heart disease",
      "Prioritise ECG evaluation and orthostatic vital sign checks"
    ];
  }

  if (
    name.includes("trauma") ||
    name.includes("injury") ||
    name.includes("fracture") ||
    name.includes("head injury")
  ) {
    return [
      "Apply primary survey principles (ABCDE approach) in trauma assessment",
      "Assess life-threatening bleeding and skeletal deformities",
      "Identify red flags of secondary brain injury following head impacts",
      "Prioritise spinal precautions, imaging, and surgical stabilisation"
    ];
  }

  if (
    name.includes("burns") ||
    name.includes("thermal injury") ||
    name.includes("chemical burn")
  ) {
    return [
      "Assess total body surface area percentage and burn depth classification",
      "Recognise upper airway involvement and inhalation injury risks",
      "Identify red flags of systemic fluid loss and compartment syndrome",
      "Prioritise cooling, wound care, and specialised burns unit referral"
    ];
  }

  if (
    name.includes("hypothermia") ||
    name.includes("cold exposure")
  ) {
    return [
      "Recognise core body temperature reduction and shivering cessation stages",
      "Assess cardiovascular stability and cardiac irritability risks",
      "Identify red flags of severe bradycardia or ventricular arrhythmias",
      "Prioritise gentle active or passive rewarming and careful handling"
    ];
  }

  if (
    name.includes("hyperthermia") ||
    name.includes("heat stroke") ||
    name.includes("heat exhaustion")
  ) {
    return [
      "Recognise elevated core body temperature and altered mental status",
      "Assess signs of dehydration and electrolyte loss",
      "Identify red flags of central nervous system dysfunction",
      "Prioritise rapid active cooling and supportive fluid therapy"
    ];
  }

  if (
    name.includes("cellulitis") ||
    name.includes("skin infection") ||
    name.includes("abscess")
  ) {
    return [
      "Recognise localised erythema, warmth, swelling, and tenderness",
      "Assess markers of spreading infection and systemic involvement",
      "Identify red flags of necrotising fasciitis or systemic sepsis",
      "Prioritise appropriate antimicrobial therapy and wound care"
    ];
  }

  if (
    name.includes("osteomyelitis") ||
    name.includes("bone infection")
  ) {
    return [
      "Recognise deep bone pain, local inflammation, and systemic fever",
      "Assess risk factors such as open fractures or contiguous infections",
      "Identify red flags of chronic bone destruction on imaging",
      "Prioritise prolonged targeted antibiotic therapy and surgical debridement"
    ];
  }

  if (
    name.includes("thyroid crisis") ||
    name.includes("thyrotoxicosis") ||
    name.includes("hyperthyroidism")
  ) {
    return [
      "Recognise symptoms of excess thyroid hormone including tachycardia and tremors",
      "Assess for signs of thyroid storm in acute decompensation",
      "Identify red flags of hypermetabolic crisis",
      "Prioritise anti-thyroid medications, beta-blockers, and supportive care"
    ];
  }

  if (
    name.includes("hypothyroidism") ||
    name.includes("myxoedema coma")
  ) {
    return [
      "Recognise symptoms of underactive thyroid including fatigue and cold intolerance",
      "Assess for severe complications like myxoedema coma and hypothermia",
      "Identify red flags of respiratory depression and altered consciousness",
      "Prioritise thyroid hormone replacement therapy and supportive care"
    ];
  }

  if (
    name.includes("addisonian crisis") ||
    name.includes("adrenal crisis") ||
    name.includes("adrenal insufficiency")
  ) {
    return [
      "Recognise profound hypotension, weakness, and abdominal pain",
      "Assess electrolyte disturbances such as hyperkalaemia and hyponatraemia",
      "Identify red flags of acute vascular collapse",
      "Prioritise emergency glucocorticoid administration and fluid resuscitation"
    ];
  }

  if (
    name.includes("anaemia") ||
    name.includes("haemorrhage") ||
    name.includes("blood loss")
  ) {
    return [
      "Recognise pallor, fatigue, and tachycardia related to low red cell mass",
      "Assess haemodynamic stability and acute versus chronic onset",
      "Identify red flags of acute severe blood loss",
      "Prioritise investigation of aetiology and blood product replacement if indicated"
    ];
  }

  if (
    name.includes("thrombocytopenia") ||
    name.includes("bleeding disorder") ||
    name.includes("coagulopathy")
  ) {
    return [
      "Recognise petechiae, purpura, and spontaneous mucosal bleeding",
      "Assess platelet count and coagulation screen profiles",
      "Identify red flags of major spontaneous haemorrhage",
      "Prioritise avoidance of trauma and appropriate haematology consultation"
    ];
  }

  if (
    name.includes("dementia") ||
    name.includes("alzheimer's") ||
    name.includes("cognitive impairment")
  ) {
    return [
      "Recognise progressive memory loss and executive function decline",
      "Assess functional independence and behavioural changes",
      "Identify red flags of acute deterioration or safety risks",
      "Prioritise supportive care, safety measures, and caregiver support"
    ];
  }

  if (
    name.includes("delirium") ||
    name.includes("acute confusional state")
  ) {
    return [
      "Recognise acute onset fluctuations in attention and consciousness",
      "Assess underlying precipitating factors such as infection or medications",
      "Identify red flags in hyperactive and hypoactive delirium subtypes",
      "Prioritise multi-component non-pharmacological interventions and trigger treatment"
    ];
  }

  if (
    name.includes("depression") ||
    name.includes("mood disorder") ||
    name.includes("psychiatric emergency")
  ) {
    return [
      "Recognise persistent low mood, anhedonia, and vegetative symptoms",
      "Assess explicit risk of self-harm or suicidal ideation",
      "Identify red flags of imminent harm",
      "Prioritise safety planning, psychological support, and psychiatric referral"
    ];
  }

  if (
    name.includes("schizophrenia") ||
    name.includes("psychosis") ||
    name.includes("delusion")
  ) {
    return [
      "Recognise positive symptoms including hallucinations and delusions",
      "Assess negative symptoms and impact on daily functioning",
      "Identify red flags of acute psychotic exacerbations and safety risks",
      "Prioritise antipsychotic therapy and multidisciplinary mental health support"
    ];
  }

  if (
    name.includes("anxiety") ||
    name.includes("panic attack") ||
    name.includes("phobia")
  ) {
    return [
      "Recognise excessive worry, autonomic arousal, and panic symptoms",
      "Assess physical symptoms to exclude medical mimickers like cardiac events",
      "Identify red flags of severe functional impairment",
      "Prioritise cognitive behavioural strategies and relaxation techniques"
    ];
  }

  if (
    name.includes("glaucoma") ||
    name.includes("eye emergency") ||
    name.includes("acute angle closure")
  ) {
    return [
      "Recognise sudden eye pain, blurred vision, and halos around lights",
      "Assess intraocular pressure changes and pupil reactivity",
      "Identify red flags of permanent optic nerve damage",
      "Prioritise urgent ophthalmology assessment and intraocular pressure lowering"
    ];
  }

  if (
    name.includes("otitis media") ||
    name.includes("ear infection") ||
    name.includes("mastoiditis")
  ) {
    return [
      "Recognise earache, hearing muffling, and tympanic membrane inflammation",
      "Assess for complications such as mastoiditis or facial nerve involvement",
      "Identify red flags of intracranial spread",
      "Prioritise symptom relief and targeted antimicrobial management"
    ];
  }

  if (
    name.includes("tonsillitis") ||
    name.includes("pharyngitis") ||
    name.includes("strep throat")
  ) {
    return [
      "Recognise sore throat, fever, and tonsillar exudates",
      "Assess criteria for bacterial versus viral aetiology",
      "Identify red flags of peritonsillar abscess formation",
      "Prioritise supportive hydration and appropriate antibiotic stewardship"
    ];
  }

  if (
    name.includes("sinusitis") ||
    name.includes("sinus infection")
  ) {
    return [
      "Recognise facial pain, nasal congestion, and purulent discharge",
      "Assess duration of symptoms to distinguish viral from bacterial rhinosinusitis",
      "Identify red flags of orbital or intracranial complications",
      "Prioritise nasal hygiene and judicious antimicrobial use"
    ];
  }

  if (
    name.includes("arthritis") ||
    name.includes("gout") ||
    name.includes("joint inflammation")
  ) {
    return [
      "Recognise joint pain, swelling, erythema, and restricted range of motion",
      "Assess acute monoarticular versus polyarticular distribution",
      "Identify red flags of crystal arthropathies or septic arthritis differentials",
      "Prioritise joint aspiration, anti-inflammatory therapy, and specialist referral"
    ];
  }

  if (
    name.includes("back pain") ||
    name.includes("sciatica") ||
    name.includes("spine condition")
  ) {
    return [
      "Recognise mechanical back pain features versus radicular patterns",
      "Assess for surgical red flags including cauda equina syndrome signs",
      "Identify red flags of progressive neurological deficit",
      "Prioritise structured physical assessment and conservative management"
    ];
  }

  if (
    name.includes("pregnancy complication") ||
    name.includes("ectopic pregnancy") ||
    name.includes("pre-eclampsia") ||
    name.includes("obstetric emergency")
  ) {
    return [
      "Recognise obstetric warning signs including pelvic pain and hypertension in pregnancy",
      "Assess maternal haemodynamic stability and fetal well-being indicators",
      "Identify red flags of life-threatening conditions such as ruptured ectopic pregnancy or eclampsia",
      "Prioritise emergency obstetric consultation and stabilisation"
    ];
  }

  if (
    name.includes("malaria") ||
    name.includes("tropical disease") ||
    name.includes("infectious disease")
  ) {
    return [
      "Recognise cyclical fever patterns and recent travel history",
      "Assess multi-organ involvement and severe parasitaemia markers",
      "Identify red flags of severe systemic infection",
      "Prioritise rapid diagnostic testing and specialised anti-malarial therapy"
    ];
  }

  if (
    name.includes("hiv") ||
    name.includes("aids") ||
    name.includes("immunocompromised")
  ) {
    return [
      "Recognise opportunistic infection presentations and immune status markers",
      "Assess adherence to antiretroviral therapy and CD4 counts",
      "Identify red flags of severe immunodeficiency complications",
      "Prioritise specialist infectious disease care and prophylaxis"
    ];
  }

  if (
    name.includes("cancer") ||
    name.includes("malignancy") ||
    name.includes("tumour") ||
    name.includes("oncology")
  ) {
    return [
      "Recognise red flag constitutional symptoms including unexplained weight loss and fatigue",
      "Assess local tumour effects and metastatic disease patterns",
      "Identify red flags of oncological emergencies such as spinal cord compression",
      "Prioritise staging investigations and multidisciplinary cancer care pathways"
    ];
  }

  if (
    name.includes("palliative") ||
    name.includes("end of life") ||
    name.includes("terminal care")
  ) {
    return [
      "Recognise goals of comfort-focused care and symptom control",
      "Assess pain, breathlessness, and distress in terminal illness",
      "Identify red flags of acute distressing symptoms",
      "Prioritise advance care planning and compassionate multidisciplinary management"
    ];
  }

  return [
    `Recognise key clinical features of ${disease.name}`,
    "Assess important complications and warning signs",
    "Identify red flags requiring urgent escalation",
    "Prioritise structured clinical assessment and management approach"
  ];
}
