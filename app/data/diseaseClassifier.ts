export function classifyDisease(name:string){
 const disease=name.toLowerCase();


 if([
  "myocardial",
  "heart",
  "cardiac",
  "atrial",
  "pericarditis",
  "heart failure",
  "hypertensive",
  "arrhythmia",
  "angina",
  "coronary"
 ].some(x=>disease.includes(x)))
 return "Cardiovascular";


 if([
  "stroke",
  "meningitis",
  "migraine",
  "bell",
  "vertigo",
  "carpal",
  "seizure",
  "epilepsy",
  "neuropathy"
 ].some(x=>disease.includes(x)))
 return "Neurological";


 if([
  "asthma",
  "pneumonia",
  "copd",
  "pulmonary",
  "covid",
  "influenza",
  "bronchitis",
  "pleural"
 ].some(x=>disease.includes(x)))
 return "Respiratory";


 if([
  "append",
  "gastr",
  "ulcer",
  "pancre",
  "chole",
  "divert",
  "crohn",
  "colitis",
  "ibs",
  "liver",
  "hepatic"
 ].some(x=>disease.includes(x)))
 return "Gastrointestinal";


 if([
  "diabetes",
  "thyroid",
  "hypogly",
  "hyperthy",
  "adrenal",
  "cushing"
 ].some(x=>disease.includes(x)))
 return "Endocrine";


 if([
  "kidney",
  "renal",
  "glomer",
  "nephritis"
 ].some(x=>disease.includes(x)))
 return "Renal";


 if([
  "uti",
  "urinary",
  "prostate",
  "cystitis"
 ].some(x=>disease.includes(x)))
 return "Urological";


 if([
  "fracture",
  "arthritis",
  "gout",
  "sprain",
  "osteoporosis"
 ].some(x=>disease.includes(x)))
 return "Musculoskeletal";


 if([
  "dermat",
  "psoriasis",
  "scabies",
  "cellulitis",
  "herpes",
  "eczema",
  "rash"
 ].some(x=>disease.includes(x)))
 return "Dermatological";


 if([
  "depression",
  "anxiety",
  "schizophrenia",
  "bipolar"
 ].some(x=>disease.includes(x)))
 return "Psychiatric";


 if([
  "eye",
  "glaucoma",
  "cataract",
  "retinal",
  "vision"
 ].some(x=>disease.includes(x)))
 return "Ophthalmology";


 if([
  "ear",
  "sinus",
  "tonsil",
  "throat",
  "otitis"
 ].some(x=>disease.includes(x)))
 return "ENT";


 if([
  "anemia",
  "leukemia",
  "lymphoma",
  "sickle",
  "haemoglobin"
 ].some(x=>disease.includes(x)))
 return "Haematology";


 if([
  "infection",
  "sepsis",
  "malaria",
  "tuberculosis",
  "meningococcal"
 ].some(x=>disease.includes(x)))
 return "Infectious";


 return "Emergency";
}