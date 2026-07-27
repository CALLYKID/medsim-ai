export type Disease = {
 id: number;
 name: string;
 category?: "Cardiovascular" | "Respiratory" | "Neurological" | "Gastrointestinal" | "Endocrine" | "Renal" | "Urological" | "Infectious" | "Musculoskeletal" | "Dermatological" | "Psychiatric" | "Ophthalmology" | "ENT" | "Haematology" | "Emergency";

 presentation: {
  chiefComplaint: string;
 };
 medicalSpecialty?: string;
 
difficulty?: "Easy" | "Moderate" | "Hard" | "Expert";

learningPoints?: string[];

gradingRubric?: {
 patientICE: {
  ideas: string;
  concerns: string;
  expectations: string;
 };
 criticalRedFlag: string;
};

 patientProfile?: {
  ageRange: [number, number];
  gender: "Male" | "Female";
  occupation: string;
  personality: string;
  painTolerance: string;
  ethnicity?: string;
  bmi?: "Underweight" | "Normal" | "Overweight" | "Obese";
  smoking?: boolean;
  alcohol?: boolean;
  languageStyle?: "Formal" | "Casual" | "Very Casual";
  anxietyLevel?: number;
  cooperativeness?: number;
  education?: string;
  socialHistory?: string;
   
 };

 hidden: {
  diagnosis: string;
  severity: "Mild" | "Moderate" | "Severe" | "Critical";
  urgency: "Routine" | "Urgent" | "Emergency";
  disposition: "Discharge" | "Observe" | "Admit" | "ICU";

  findings: {
   question: string;
   answer: string;
   importance?: "high" | "medium" | "low";
   asked?: boolean;
  }[];

  examination: {
   vitals: string;
   heent: string;
   chest: string;
   abdomen: string;
   neuro: string;
  };

  investigations: {
   bloods: string[];
   imaging: string[];
   ecg?: string;
   urine?: string;
  };

  treatment: {
   immediate: string[];
   medications: string[];
   definitive: string[];
  };

  complications: string[];
  differentialDiagnoses: string[];
  redFlags: string[];
  keywords: string[];

  progression: {
   untreated: string;
   worsening: string[];
  };
 };
};

export const diseaseLibrary: Disease[] = [
  {
    id: 1,
    name: "Appendicitis",
    presentation: { chiefComplaint: "I’ve had stomach pain since yesterday." },
    patientProfile: {
      ageRange: [22, 35],
      gender: "Male",
      occupation: "Software Developer",
      personality: "Anxious and impatient",
      painTolerance: "Moderate",
      ethnicity: "Caucasian",
      bmi: "Normal",
      smoking: false,
      alcohol: true,
      languageStyle: "Casual",
      anxietyLevel: 6,
      cooperativeness: 8,
      education: "Bachelor's Degree",
      socialHistory: "Lives with a roommate, non-smoker, drinks socially."
    },
    hidden: {
      diagnosis: "Appendicitis",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "Admit",
      findings: [
        { question: "pain", answer: "Lower right abdominal pain.", importance: "high", asked: false },
        { question: "nausea", answer: "Yes, I feel sick.", importance: "medium", asked: false },
        { question: "fever", answer: "Mild fever since last night.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 120/80, HR: 95 bpm, Temp: 37.8°C, O2: 99%",
        heent: "Normal, mucous membranes moist.",
        chest: "Heart sounds normal, lungs clear to auscultation.",
        abdomen: "Severe focal tenderness and guarding in the Right Lower Quadrant (RLQ). Positive rebound tenderness.",
        neuro: "Alert and oriented. Grossly intact."
      },
      investigations: {
        bloods: ["Elevated white blood cell count (WBC 14.5)", "Elevated CRP"],
        imaging: ["Ultrasound showing thickened, non-compressible appendix >6mm"],
        urine: ["Normal urinalysis"]
      },
      treatment: {
        immediate: ["NPO (Nothing by mouth)", "IV access & Fluid resuscitation"],
        medications: ["IV Analgesia", "Broad-spectrum IV Antibiotics"],
        definitive: ["Laparoscopic Appendectomy"]
      },
      complications: ["Perforation", "Peritonitis", "Abscess formation"],
      differentialDiagnoses: ["Gastroenteritis", "Mesenteric Adenitis", "Ectopic Pregnancy", "Kidney Stones"],
      redFlags: ["Sudden generalized abdominal pain", "High spiking fever", "Rigidity"],
      keywords: ["appendix", "RLQ", "rebound", "McBurney", "appendicitis"],
      progression: {
        untreated: "Perforation within 24-48h",
        worsening: ["fever increases", "tachycardia", "peritonitis"]
      }
    }
  },
  {
    id: 2,
    name: "Migraine",
    presentation: { chiefComplaint: "I’ve had a terrible headache all day." },
    patientProfile: {
      ageRange: [25, 45],
      gender: "Female",
      occupation: "Graphic Designer",
      personality: "Stressed and fatigued",
      painTolerance: "Low",
      ethnicity: "Hispanic",
      bmi: "Normal",
      smoking: false,
      alcohol: false,
      languageStyle: "Casual",
      anxietyLevel: 5,
      cooperativeness: 9,
      education: "Master's Degree",
      socialHistory: "Works long hours, high stress."
    },
    hidden: {
      diagnosis: "Migraine",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "light", answer: "Light makes it worse.", importance: "high", asked: false },
        { question: "sound", answer: "Loud noises are painful.", importance: "medium", asked: false },
        { question: "nausea", answer: "I feel nauseous.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 118/75, HR: 72 bpm, Temp: 36.6°C, O2: 100%",
        heent: "Photophobia present. Pupils equal and reactive to light.",
        chest: "Normal heart and lung sounds.",
        abdomen: "Soft, non-tender, no bloating.",
        neuro: "Cranial nerves II-XII intact, normal gait, no deficits."
      },
      investigations: {
        bloods: ["Normal routine blood panel"],
        imaging: ["None typically required unless atypical features present"]
      },
      treatment: {
        immediate: ["Rest in a dark, quiet room"],
        medications: ["Triptans", "NSAIDs", "Antiemetics"],
        definitive: ["Lifestyle modifications and prophylactic medication if frequent"]
      },
      complications: ["Status migrainosus", "Migrainous infarction"],
      differentialDiagnoses: ["Tension headache", "Cluster headache", "Meningitis", "Subarachnoid hemorrhage"],
      redFlags: ["Thunderclap onset", "Focal neurological deficits", "Fever with stiff neck"],
      keywords: ["migraine", "photophobia", "throbbing", "aura", "headache"],
      progression: {
        untreated: "Pain persists for 4-72 hours with severe nausea",
        worsening: ["persistent vomiting", "extreme prostration"]
      }
    }
  },
  {
    id: 3,
    name: "Asthma Exacerbation",
    presentation: { chiefComplaint: "I’m struggling to breathe." },
    patientProfile: {
      ageRange: [18, 50],
      gender: "Female",
      occupation: "Teacher",
      personality: "Panicked",
      painTolerance: "Moderate",
      ethnicity: "African American",
      bmi: "Normal",
      smoking: false,
      alcohol: false,
      languageStyle: "Formal",
      anxietyLevel: 8,
      cooperativeness: 7,
      education: "Bachelor's Degree",
      socialHistory: "Known asthmatic, recent exposure to cold air."
    },
    hidden: {
      diagnosis: "Asthma Exacerbation",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "Observe",
      findings: [
        { question: "wheeze", answer: "Yes, I hear wheezing.", importance: "high", asked: false },
        { question: "breath", answer: "Short of breath when walking.", importance: "high", asked: false },
        { question: "cough", answer: "Dry cough worsening at night.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 125/82, HR: 110 bpm, Temp: 36.8°C, O2: 92% on room air",
        heent: "Slight nasal flaring. No oral cyanosis.",
        chest: "Bilateral expiratory wheezing throughout all lung fields. Accessory muscle use noted.",
        abdomen: "Soft, non-tender.",
        neuro: "Alert, but appears anxious and speaks in short phrases."
      },
      investigations: {
        bloods: ["Normal CBC", "ABG showing mild hypoxemia"],
        imaging: ["Chest X-ray to rule out pneumothorax or pneumonia"],
        ecg: ["Sinus tachycardia"]
      },
      treatment: {
        immediate: ["Administer supplemental oxygen", "Nebulized short-acting beta-agonists"],
        medications: ["Albuterol", "Ipratropium bromide", "Systemic corticosteroids"],
        definitive: ["Inhaled corticosteroid maintenance adjustment"]
      },
      complications: ["Respiratory failure", "Pneumothorax", "Status asthmaticus"],
      differentialDiagnoses: ["COPD exacerbation", "Heart failure", "Anaphylaxis", "Pulmonary embolism"],
      redFlags: ["Silent chest", "Cyanosis", "Exhaustion / altered mental status"],
      keywords: ["asthma", "wheeze", "shortness of breath", "inhaler", "bronchospasm"],
      progression: {
        untreated: "Respiratory fatigue, hypercapnic respiratory arrest",
        worsening: ["dropping oxygen saturation", "confusion", "cyanosis"]
      }
    }
  },
  {
    id: 4,
    name: "Pneumonia",
    presentation: { chiefComplaint: "I’ve had a cough and fever for days." },
    patientProfile: {
      ageRange: [50, 75],
      gender: "Male",
      occupation: "Retired",
      personality: "Stoic",
      painTolerance: "High",
      ethnicity: "Caucasian",
      bmi: "Overweight",
      smoking: true,
      alcohol: true,
      languageStyle: "Casual",
      anxietyLevel: 3,
      cooperativeness: 9,
      education: "High School",
      socialHistory: "Ex-smoker, lives alone."
    },
    hidden: {
      diagnosis: "Pneumonia",
      severity: "Moderate",
      urgency: "Urgent",
      disposition: "Admit",
      findings: [
        { question: "fever", answer: "High fever and chills.", importance: "high", asked: false },
        { question: "cough", answer: "Productive cough with mucus.", importance: "high", asked: false },
        { question: "chest", answer: "Chest pain when breathing.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 115/70, HR: 104 bpm, Temp: 39.1°C, O2: 94%",
        heent: "Dry mucous membranes.",
        chest: "Decreased breath sounds and coarse crackles in the right lower lung base.",
        abdomen: "Soft, non-tender.",
        neuro: "Alert, oriented, slightly fatigued."
      },
      investigations: {
        bloods: ["Elevated WBC count", "Elevated inflammatory markers (CRP/ESR)"],
        imaging: ["Chest X-ray showing right lower lobe consolidation"],
        urine: ["Antigen tests for Legionella/Pneumococcus"]
      },
      treatment: {
        immediate: ["Supplemental oxygen if needed", "IV hydration"],
        medications: ["Empiric oral or IV antibiotics (e.g., Ceftriaxone + Azithromycin)"],
        definitive: ["Complete antibiotic course and supportive care"]
      },
      complications: ["Pleural effusion", "Empyema", "Sepsis", "Respiratory failure"],
      differentialDiagnoses: ["Bronchitis", "Congestive heart failure", "Pulmonary embolism", "Lung cancer"],
      redFlags: ["Severe dyspnea", "Confusion", "Hypotension"],
      keywords: ["pneumonia", "consolidation", "crackles", "productive cough", "fever"],
      progression: {
        untreated: "Progression to severe sepsis and multi-organ failure",
        worsening: ["worsening hypoxia", "hypotension", "confusion"]
      }
    }
  },
  {
    id: 5,
    name: "Gastroenteritis",
    presentation: { chiefComplaint: "I’ve had vomiting and diarrhoea." },
    patientProfile: {
      ageRange: [18, 40],
      gender: "Female",
      occupation: "Student",
      personality: "Cooperative",
      painTolerance: "Moderate",
      ethnicity: "Asian",
      bmi: "Normal",
      smoking: false,
      alcohol: false,
      languageStyle: "Casual",
      anxietyLevel: 4,
      cooperativeness: 10,
      education: "Some College",
      socialHistory: "College student living in dorms."
    },
    hidden: {
      diagnosis: "Gastroenteritis",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "vomit", answer: "Yes, multiple episodes.", importance: "high", asked: false },
        { question: "diarrhoea", answer: "Watery stools.", importance: "high", asked: false },
        { question: "food", answer: "I ate questionable food yesterday.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 108/68, HR: 102 bpm, Temp: 37.5°C, O2: 99%",
        heent: "Dry mouth and tongue showing signs of mild dehydration.",
        chest: "Heart sounds normal, lungs clear.",
        abdomen: "Diffuse, mild abdominal tenderness without guarding or rebound. Hyperactive bowel sounds.",
        neuro: "Alert and oriented x 3."
      },
      investigations: {
        bloods: ["Electrolytes to check for mild hypokalemia or dehydration"],
        stool: ["Stool culture/PCR if symptoms persist"]
      },
      treatment: {
        immediate: ["Oral rehydration therapy"],
        medications: ["Antiemetics if severe vomiting", "Antidiarrheals selectively"],
        definitive: ["Dietary modification (BRAT diet) and rest"]
      },
      complications: ["Severe dehydration", "Electrolyte imbalance", "Acute kidney injury"],
      differentialDiagnoses: ["Appendicitis", "Inflammatory bowel disease", "Food poisoning", "Colitis"],
      redFlags: ["Bloody stools", "Inability to keep fluids down", "Severe abdominal rigidity"],
      keywords: ["diarrhea", "vomiting", "dehydration", "stomach bug", "gastroenteritis"],
      progression: {
        untreated: "Worsening electrolyte imbalances and severe dehydration",
        worsening: ["lethargy", "sunken eyes", "decreased urine output"]
      }
    }
  },
  {
    id: 6,
    name: "Urinary Tract Infection",
    presentation: { chiefComplaint: "It hurts when I urinate." },
    patientProfile: {
      ageRange: [20, 60],
      gender: "Female",
      occupation: "Accountant",
      personality: "Mild-mannered",
      painTolerance: "Moderate",
      ethnicity: "Caucasian",
      bmi: "Normal",
      smoking: false,
      alcohol: false,
      languageStyle: "Formal",
      anxietyLevel: 3,
      cooperativeness: 10,
      education: "Bachelor's Degree",
      socialHistory: "Office worker, healthy lifestyle."
    },
    hidden: {
      diagnosis: "Urinary Tract Infection",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "burn", answer: "Burning sensation when peeing.", importance: "high", asked: false },
        { question: "frequency", answer: "Going to toilet very often.", importance: "high", asked: false },
        { question: "fever", answer: "Low-grade fever.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 120/80, HR: 80 bpm, Temp: 37.4°C, O2: 100%",
        heent: "Normal appearance.",
        chest: "Cardiorespiratory exam completely normal.",
        abdomen: "Mild suprapubic tenderness to palpation. No flank tenderness.",
        neuro: "Normal neurological exam."
      },
      investigations: {
        bloods: ["Not routinely needed for simple cystitis"],
        urine: ["Urinalysis positive for nitrites, leukocyte esterase, and pyuria", "Urine culture"]
      },
      treatment: {
        immediate: ["Increase fluid intake"],
        medications: ["Empiric oral antibiotics (e.g., Nitrofurantoin)", "Phenazopyridine for pain relief"],
        definitive: ["Course of antibiotics"]
      },
      complications: ["Pyelonephritis", "Urosepsis"],
      differentialDiagnoses: ["Vaginitis", "Sexually transmitted infection", "Interstitial cystitis"],
      redFlags: ["Flank pain", "High fever with rigors", "Persistent vomiting"],
      keywords: ["dysuria", "burning", "frequency", "UTI", "urine"],
      progression: {
        untreated: "Ascending infection leading to pyelonephritis",
        worsening: ["flank pain", "fever", "rigors"]
      }
    }
  },
  {
    id: 7,
    name: "Kidney Stones",
    presentation: { chiefComplaint: "Severe pain in my side." },
    patientProfile: {
      ageRange: [30, 60],
      gender: "Male",
      occupation: "Sales Manager",
      personality: "Agitated",
      painTolerance: "Low",
      ethnicity: "Caucasian",
      bmi: "Overweight",
      smoking: false,
      alcohol: true,
      languageStyle: "Casual",
      anxietyLevel: 7,
      cooperativeness: 8,
      education: "Bachelor's Degree",
      socialHistory: "Low fluid intake, high protein diet."
    },
    hidden: {
      diagnosis: "Kidney Stones",
      severity: "Severe",
      urgency: "Urgent",
      disposition: "Observe",
      findings: [
        { question: "pain", answer: "Sharp flank pain radiating down.", importance: "high", asked: false },
        { question: "urine", answer: "Blood in urine sometimes.", importance: "medium", asked: false },
        { question: "waves", answer: "Pain comes in waves.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 145/90, HR: 105 bpm, Temp: 36.7°C, O2: 98%",
        heent: "Normal.",
        chest: "Clear breath sounds, tachycardia present.",
        abdomen: "Soft, but severe tenderness on the affected flank. Positive costovertebral angle (CVA) tenderness.",
        neuro: "Alert, but pacing around due to severe discomfort."
      },
      investigations: {
        bloods: ["Creatinine and BUN to assess renal function"],
        imaging: ["Non-contrast CT KUB or Ultrasound"],
        urine: ["Urinalysis showing microscopic hematuria"]
      },
      treatment: {
        immediate: ["Aggressive IV analgesia", "IV hydration"],
        medications: ["Tamsulosin", "Anti-emetics"],
        definitive: ["Ureteroscopy, Lithotripsy (ESWL), or spontaneous passage"]
      },
      complications: ["Ureteral obstruction", "Hydronephrosis", "Pyonephrosis", "Sepsis"],
      differentialDiagnoses: ["Pyelonephritis", "Appendicitis", "Diverticulitis", "Aortic aneurysm"],
      redFlags: ["Fever with obstructing stone", "Anuria", "Intractable pain/vomiting"],
      keywords: ["flank pain", "renal colic", "hematuria", "kidney stone", "lithiasis"],
      progression: {
        untreated: "Persistent obstruction leading to kidney damage and infection",
        worsening: ["fever", "uncontrolled pain", "rising creatinine"]
      }
    }
  },
  {
    id: 8,
    name: "Gallstones",
    presentation: { chiefComplaint: "Pain after eating fatty food." },
    patientProfile: {
      ageRange: [35, 65],
      gender: "Female",
      occupation: "Manager",
      personality: "Calm",
      painTolerance: "Moderate",
      ethnicity: "Hispanic",
      bmi: "Obese",
      smoking: false,
      alcohol: false,
      languageStyle: "Formal",
      anxietyLevel: 4,
      cooperativeness: 9,
      education: "Bachelor's Degree",
      socialHistory: "Sedentary lifestyle, high fat diet."
    },
    hidden: {
      diagnosis: "Gallstones",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "food", answer: "Worse after fatty meals.", importance: "high", asked: false },
        { question: "right", answer: "Pain under right ribs.", importance: "high", asked: false },
        { question: "nausea", answer: "Feeling sick after eating.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 130/82, HR: 88 bpm, Temp: 36.9°C, O2: 99%",
        heent: "Sclera clear, no jaundice.",
        chest: "Lungs clear, heart sounds normal.",
        abdomen: "Tenderness to palpation in the Right Upper Quadrant (RUQ). Negative Murphy's sign.",
        neuro: "Normal exam."
      },
      investigations: {
        bloods: ["Liver function tests (LFTs)"],
        imaging: ["Right upper quadrant ultrasound"]
      },
      treatment: {
        immediate: ["Dietary modification (low fat)"],
        medications: ["Analgesics as needed"],
        definitive: ["Elective laparoscopic cholecystectomy"]
      },
      complications: ["Acute cholecystitis", "Choledocholithiasis", "Gallstone pancreatitis"],
      differentialDiagnoses: ["Peptic ulcer disease", "GERD", "Hepatitis"],
      redFlags: ["Persistent fever", "Jaundice", "Severe constant RUQ pain"],
      keywords: ["gallstones", "RUQ pain", "fatty food", "biliary colic", "cholelithiasis"],
      progression: {
        untreated: "Progression to acute cholecystitis or biliary obstruction",
        worsening: ["fever", "jaundice", "constant severe pain"]
      }
    }
  },
  {
    id: 9,
    name: "Meningitis",
    presentation: { chiefComplaint: "Severe headache and stiff neck." },
    patientProfile: {
      ageRange: [18, 30],
      gender: "Male",
      occupation: "College Student",
      personality: "Confused / Lethargic",
      painTolerance: "Low",
      ethnicity: "Caucasian",
      bmi: "Normal",
      smoking: false,
      alcohol: false,
      languageStyle: "Casual",
      anxietyLevel: 9,
      cooperativeness: 5,
      education: "Some College",
      socialHistory: "Living in university dorms."
    },
    hidden: {
      diagnosis: "Meningitis",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "neck", answer: "Neck stiffness.", importance: "high", asked: false },
        { question: "light", answer: "Light sensitivity.", importance: "high", asked: false },
        { question: "fever", answer: "High fever and confusion.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 110/70, HR: 115 bpm, Temp: 39.4°C, O2: 97%",
        heent: "Marked photophobia. Severe resistance to passive neck flexion.",
        chest: "Tachycardia, lungs clear.",
        abdomen: "Soft and non-tender.",
        neuro: "Altered mental status; positive Brudzinski's sign."
      },
      investigations: {
        bloods: ["Blood cultures", "CBC"],
        imaging: ["CT head prior to lumbar puncture"],
        urine: ["Lumbar puncture showing elevated WBC, elevated protein, low glucose"]
      },
      treatment: {
        immediate: ["Immediate IV antibiotics", "Dexamethasone"],
        medications: ["Empiric antimicrobial therapy", "Antipyretics"],
        definitive: ["Targeted antibiotic therapy"]
      },
      complications: ["Septic shock", "Brain herniation", "Hearing loss", "Death"],
      differentialDiagnoses: ["Encephalitis", "Subarachnoid hemorrhage", "Brain abscess"],
      redFlags: ["Petechial rash", "Coma", "Seizures"],
      keywords: ["meningitis", "nuchal rigidity", "stiff neck", "photophobia", "kernig"],
      progression: {
        untreated: "Rapid deterioration to coma, brain herniation, and death",
        worsening: ["declining GCS", "seizures", "shock"]
      }
    }
  },
  {
    id: 10,
    name: "Pulmonary Embolism",
    presentation: { chiefComplaint: "Sudden chest pain and breathlessness." },
    patientProfile: {
      ageRange: [40, 70],
      gender: "Female",
      occupation: "Administrative Assistant",
      personality: "Anxious",
      painTolerance: "Moderate",
      ethnicity: "Caucasian",
      bmi: "Overweight",
      smoking: false,
      alcohol: false,
      languageStyle: "Formal",
      anxietyLevel: 9,
      cooperativeness: 8,
      education: "High School",
      socialHistory: "Recent long-haul flight, oral contraceptive use."
    },
    hidden: {
      diagnosis: "Pulmonary Embolism",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "breath", answer: "Sudden shortness of breath.", importance: "high", asked: false },
        { question: "chest", answer: "Sharp chest pain.", importance: "high", asked: false },
        { question: "leg", answer: "Recent leg swelling.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 105/65, HR: 120 bpm, Temp: 37.2°C, O2: 89% on room air",
        heent: "JVD slightly elevated.",
        chest: "Clear to auscultation, significant tachypnea.",
        abdomen: "Soft, non-tender.",
        neuro: "Anxious. Left calf swollen and tender."
      },
      investigations: {
        bloods: ["Elevated D-dimer", "Troponin"],
        imaging: ["CT Pulmonary Angiography (CTPA)"],
        ecg: ["Sinus tachycardia, S1Q3T3 pattern"]
      },
      treatment: {
        immediate: ["High-flow oxygen", "IV access", "Anticoagulation"],
        medications: ["Anticoagulants", "Thrombolytics if unstable"],
        definitive: ["Long-term oral anticoagulation"]
      },
      complications: ["Right heart failure", "Cardiogenic shock", "Death"],
      differentialDiagnoses: ["Myocardial infarction", "Pneumonia", "Aortic dissection"],
      redFlags: ["Hypotension", "Severe hypoxemia", "Syncope"],
      keywords: ["pulmonary embolism", "PE", "chest pain", "shortness of breath", "DVT"],
      progression: {
        untreated: "Cardiovascular collapse and sudden cardiac death",
        worsening: ["hypotension", "syncope", "cyanosis", "cardiac arrest"]
      }
    }
  },
  {
    id: 11,
    name: "Otitis Media",
    presentation: { chiefComplaint: "Ear pain and fever." },
    patientProfile: { ageRange: [3, 12], gender: "Male", occupation: "Student", personality: "Irritable", painTolerance: "Low" },
    hidden: {
      diagnosis: "Otitis Media",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "ear", answer: "Pain inside ear.", importance: "high", asked: false },
        { question: "hearing", answer: "Muffled hearing.", importance: "medium", asked: false },
        { question: "fever", answer: "Mild fever.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 120/78, HR: 85 bpm, Temp: 38.0°C, O2: 100%",
        heent: "Right tympanic membrane erythematous and bulging.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Normal."
      },
      investigations: { bloods: [], imaging: [], urine: [] },
      treatment: { immediate: ["Pain management"], medications: ["Analgesics", "Antibiotics if indicated"], definitive: ["Resolution of infection"] },
      complications: ["Mastoiditis", "Hearing loss"],
      differentialDiagnoses: ["Otitis externa", "Dental pain"],
      redFlags: ["Severe mastoid tenderness", "Facial droop"],
      keywords: ["ear pain", "otitis", "tympanic", "fever"],
      progression: { untreated: "Spontaneous rupture or mastoiditis", worsening: ["increasing pain", "swelling behind ear"] }
    }
  },
  {
    id: 12,
    name: "Tonsillitis",
    presentation: { chiefComplaint: "Sore throat and difficulty swallowing." },
    patientProfile: { ageRange: [10, 30], gender: "Female", occupation: "Student", personality: "Cooperative", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Tonsillitis",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "throat", answer: "Severe sore throat.", importance: "high", asked: false },
        { question: "swallow", answer: "Pain when swallowing.", importance: "high", asked: false },
        { question: "fever", answer: "Fever present.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 118/76, HR: 90 bpm, Temp: 38.5°C, O2: 99%",
        heent: "Bilateral tonsillar hypertrophy with white exudates. Tender lymphadenopathy.",
        chest: "Lungs clear.",
        abdomen: "Soft.",
        neuro: "Normal."
      },
      investigations: { bloods: ["Throat swab / Rapid Strep test"], imaging: [], urine: [] },
      treatment: { immediate: ["Hydration"], medications: ["Analgesics", "Antibiotics if bacterial"], definitive: ["Full recovery"] },
      complications: ["Peritonsillar abscess", "Rheumatic fever"],
      differentialDiagnoses: ["Mononucleosis", "Pharyngitis"],
      redFlags: ["Trismus", "Drooling", "Muffled voice"],
      keywords: ["sore throat", "tonsillitis", "exudate", "swallowing"],
      progression: { untreated: "Abscess formation", worsening: ["inability to swallow saliva", "stridor"] }
    }
  },
  {
    id: 13,
    name: "Diabetic Ketoacidosis",
    presentation: { chiefComplaint: "Feeling very unwell and thirsty." },
    patientProfile: { ageRange: [15, 40], gender: "Male", occupation: "Worker", personality: "Lethargic", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Diabetic Ketoacidosis",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "thirst", answer: "Extreme thirst.", importance: "high", asked: false },
        { question: "urine", answer: "Frequent urination.", importance: "medium", asked: false },
        { question: "breath", answer: "Fruity-smelling breath.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 100/60, HR: 118 bpm, Temp: 36.5°C, O2: 98%, RR: 28/min",
        heent: "Dry mucous membranes, fruity breath odor.",
        chest: "Kussmaul respirations.",
        abdomen: "Generalized mild tenderness.",
        neuro: "Lethargic."
      },
      investigations: { bloods: ["High blood glucose", "ABG low pH", "Ketones positive"], imaging: [], urine: ["Urinalysis positive for ketones"] },
      treatment: { immediate: ["IV Fluid resuscitation", "IV Insulin infusion"], medications: ["Insulin", "Potassium replacement"], definitive: ["Glycemic control stabilization"] },
      complications: ["Cerebral edema", "Hypokalemia", "Coma", "Death"],
      differentialDiagnoses: ["Lactic acidosis", "Sepsis", "Alcoholic ketoacidosis"],
      redFlags: ["Coma", "Profound hypotension", "Severe acidemia"],
      keywords: ["DKA", "ketones", "fruity breath", "glucose", "insulin"],
      progression: { untreated: "Profound metabolic collapse and death", worsening: ["declining mental status", "shock"] }
    }
  },
  {
    id: 14,
    name: "Hypertensive Crisis",
    presentation: { chiefComplaint: "Severe headache and dizziness." },
    patientProfile: { ageRange: [45, 75], gender: "Male", occupation: "Executive", personality: "Stressed", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Hypertensive Crisis",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "headache", answer: "Severe pressure headache.", importance: "high", asked: false },
        { question: "vision", answer: "Blurred vision.", importance: "high", asked: false },
        { question: "chest", answer: "Chest discomfort.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 210/120, HR: 92 bpm, Temp: 36.6°C, O2: 98%",
        heent: "Arteriolar narrowing.",
        chest: "S4 gallop.",
        abdomen: "Soft.",
        neuro: "Alert, no focal motor weakness."
      },
      investigations: { bloods: ["Renal panel", "Cardiac enzymes"], imaging: ["Chest X-ray", "CT Head"], ecg: ["LVH strain pattern"] },
      treatment: { immediate: ["IV antihypertensives"], medications: ["Labetalol", "Nicardipine"], definitive: ["Blood pressure control regimen"] },
      complications: ["Stroke", "Myocardial infarction", "Aortic dissection", "Acute kidney injury"],
      differentialDiagnoses: ["Stroke", "Panic attack", "Pheochromocytoma"],
      redFlags: ["Focal neurological deficits", "Chest pain", "Pulmonary edema"],
      keywords: ["hypertension", "high blood pressure", "crisis", "headache"],
      progression: { untreated: "End-organ damage including stroke or renal failure", worsening: ["confusion", "chest pain", "seizures"] }
    }
  },
  {
    id: 15,
    name: "Stroke",
    presentation: { chiefComplaint: "Sudden weakness on one side." },
    patientProfile: { ageRange: [55, 80], gender: "Female", occupation: "Retired", personality: "Confused", painTolerance: "High" },
    hidden: {
      diagnosis: "Stroke",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "face", answer: "Facial droop.", importance: "high", asked: false },
        { question: "arm", answer: "Weak arm on one side.", importance: "high", asked: false },
        { question: "speech", answer: "Slurred speech.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 175/95, HR: 84 bpm, Temp: 36.8°C, O2: 97%",
        heent: "Left-sided facial droop.",
        chest: "Irregular rhythm (AFib).",
        abdomen: "Soft.",
        neuro: "Pronator drift present, left arm strength 2/5, dysarthria."
      },
      investigations: { bloods: ["Coagulation profile", "Glucose"], imaging: ["CT Head non-contrast"] },
      treatment: { immediate: ["Stroke team activation", "Thrombolytic therapy if eligible"], medications: ["Alteplase / Tenecteplase"], definitive: ["Rehabilitation and secondary prevention"] },
      complications: ["Permanent disability", "Brain swelling", "Aspiration pneumonia", "Death"],
      differentialDiagnoses: ["Bell's palsy", "Todd's paralysis", "Hypoglycemia", "Migraine aura"],
      redFlags: ["Rapidly decreasing level of consciousness", "Coma"],
      keywords: ["stroke", "FAST", "facial droop", "weakness", "slurred speech"],
      progression: { untreated: "Permanent brain infarction and neurological loss", worsening: ["expanding infarct", "coma"] }
    }
  },
  {
    id: 16,
    name: "Anaemia",
    presentation: { chiefComplaint: "I feel tired all the time." },
    patientProfile: { ageRange: [20, 60], gender: "Female", occupation: "Office Worker", personality: "Fatigued", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Anaemia",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "fatigue", answer: "Constant tiredness.", importance: "high", asked: false },
        { question: "dizzy", answer: "Feeling dizzy on standing.", importance: "medium", asked: false },
        { question: "pale", answer: "Pale skin noticed.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 110/70, HR: 98 bpm, Temp: 36.5°C, O2: 99%",
        heent: "Conjunctival pallor.",
        chest: "Systolic flow murmur.",
        abdomen: "Soft.",
        neuro: "Normal strength, mild lightheadedness."
      },
      investigations: { bloods: ["Complete Blood Count (CBC)", "Ferritin", "Iron panel"], imaging: [] },
      treatment: { immediate: ["Dietary advice"], medications: ["Iron supplementation"], definitive: ["Treat underlying cause of blood loss/deficiency"] },
      complications: ["High-output heart failure", "Severe fatigue"],
      differentialDiagnoses: ["Hypothyroidism", "Depression", "Chronic fatigue syndrome"],
      redFlags: ["Severe shortness of breath at rest", "Chest pain"],
      keywords: ["anaemia", "fatigue", "pallor", "iron", "hemoglobin"],
      progression: { untreated: "Worsening fatigue and cardiovascular strain", worsening: ["severe shortness of breath", "tachycardia"] }
    }
  },
  {
    id: 17,
    name: "Depression",
    presentation: { chiefComplaint: "I’ve been feeling low for weeks." },
    patientProfile: { ageRange: [20, 50], gender: "Male", occupation: "Worker", personality: "Withdrawn", painTolerance: "High" },
    hidden: {
      diagnosis: "Depression",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "sleep", answer: "Disturbed sleep.", importance: "high", asked: false },
        { question: "mood", answer: "Low mood daily.", importance: "high", asked: false },
        { question: "interest", answer: "Loss of interest.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 122/78, HR: 70 bpm, Temp: 36.7°C, O2: 100%",
        heent: "Poor eye contact.",
        chest: "Normal.",
        abdomen: "Soft.",
        neuro: "Psychomotor slowing observed."
      },
      investigations: { bloods: ["Thyroid panel", "CBC"], imaging: [] },
      treatment: { immediate: ["Psychological support / Counseling"], medications: ["SSRIs"], definitive: ["Long-term psychiatric management"] },
      complications: ["Suicidal ideation", "Self-harm", "Social isolation"],
      differentialDiagnoses: ["Bipolar disorder", "Hypothyroidism", "Adjustment disorder"],
      redFlags: ["Suicidal intent or plan", "Active self-harm"],
      keywords: ["depression", "low mood", "sadness", "suicidal", "fatigue"],
      progression: { untreated: "Chronic worsening of mental health and risk of self-harm", worsening: ["suicidal ideation", "complete withdrawal"] }
    }
  },
  {
    id: 18,
    name: "Anxiety Disorder",
    presentation: { chiefComplaint: "I feel constantly worried." },
    patientProfile: { ageRange: [18, 45], gender: "Female", occupation: "Student", personality: "Anxious", painTolerance: "Low" },
    hidden: {
      diagnosis: "Anxiety Disorder",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "panic", answer: "Episodes of panic.", importance: "high", asked: false },
        { question: "heart", answer: "Fast heartbeat.", importance: "high", asked: false },
        { question: "worry", answer: "Constant worrying.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 135/85, HR: 102 bpm, Temp: 36.6°C, O2: 99%",
        heent: "Pupils slightly dilated.",
        chest: "Mild tachycardia.",
        abdomen: "Hyperactive bowel sounds.",
        neuro: "Visible tremors in hands, sweating palms."
      },
      investigations: { bloods: ["Thyroid panel", "Toxicology screen"], imaging: [] },
      treatment: { immediate: ["Reassurance and breathing exercises"], medications: ["Anxiolytics / SSRIs"], definitive: ["Cognitive Behavioral Therapy (CBT)"] },
      complications: ["Panic disorder", "Agoraphobia", "Secondary depression"],
      differentialDiagnoses: ["Hyperthyroidism", "Pheochromocytoma", "Substance-induced anxiety"],
      redFlags: ["Severe panic with chest pain mimicking heart attack"],
      keywords: ["anxiety", "panic", "worry", "palpitations", "tremors"],
      progression: { untreated: "Escalation into debilitating panic attacks and avoidance behavior", worsening: ["agoraphobia", "severe panic attacks"] }
    }
  },
  {
    id: 19,
    name: "Dermatitis",
    presentation: { chiefComplaint: "Itchy rash on my skin." },
    patientProfile: { ageRange: [10, 60], gender: "Male", occupation: "Builder", personality: "Cooperative", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Dermatitis",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "itch", answer: "Severe itching.", importance: "high", asked: false },
        { question: "rash", answer: "Red rash present.", importance: "high", asked: false },
        { question: "allergy", answer: "Possible allergen exposure.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 118/76, HR: 74 bpm, Temp: 36.8°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Erythematous, scaling, pruritic plaques with excoriations."
      },
      investigations: { bloods: [], imaging: [] },
      treatment: { immediate: ["Avoid irritants"], medications: ["Topical corticosteroids", "Emollients"], definitive: ["Skin barrier repair"] },
      complications: ["Secondary bacterial skin infection"],
      differentialDiagnoses: ["Psoriasis", "Eczema", "Contact dermatitis"],
      redFlags: ["Signs of spreading cellulitis or systemic infection"],
      keywords: ["dermatitis", "rash", "itch", "eczema", "skin"],
      progression: { untreated: "Chronic skin thickening and lichenification", worsening: ["secondary infection", "severe cracking"] }
    }
  },
  {
    id: 20,
    name: "Fracture",
    presentation: { chiefComplaint: "I injured my arm badly." },
    patientProfile: { ageRange: [15, 65], gender: "Male", occupation: "Laborer", personality: "In pain", painTolerance: "Low" },
    hidden: {
      diagnosis: "Fracture",
      severity: "Moderate",
      urgency: "Urgent",
      disposition: "Observe",
      findings: [
        { question: "pain", answer: "Severe pain on movement.", importance: "high", asked: false },
        { question: "swelling", answer: "Swelling present.", importance: "high", asked: false },
        { question: "movement", answer: "Cannot move limb properly.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 138/84, HR: 96 bpm, Temp: 36.7°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Right forearm deformity, edema. Strong pulse, intact sensation."
      },
      investigations: { bloods: [], imaging: ["X-ray of affected limb"] },
      treatment: { immediate: ["Immobilization", "Pain control", "RICE protocol"], medications: ["Analgesia"], definitive: ["Orthopedic reduction and casting or surgery"] },
      complications: ["Compartment syndrome", "Malunion", "Nerve damage", "Osteomyelitis"],
      differentialDiagnoses: ["Soft tissue sprain", "Dislocation", "Contusion"],
      redFlags: ["Loss of pulse / perfusion", "Paresthesias / nerve palsy", "Open fracture"],
      keywords: ["fracture", "broken bone", "arm", "deformity", "pain"],
      progression: { untreated: "Malunion, chronic pain, or neurovascular compromise", worsening: ["increasing pain", "loss of pulse", "cold fingers"] }
    }
  },
  {
    id: 21,
    name: "Acute Myocardial Infarction",
    presentation: { chiefComplaint: "I have a crushing pressure in the middle of my chest." },
    patientProfile: { ageRange: [45, 80], gender: "Male", occupation: "Retired", personality: "Distressed", painTolerance: "Low" },
    hidden: {
      diagnosis: "Acute Myocardial Infarction",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "pain", answer: "Elephant sitting on chest, radiating to left arm.", importance: "high", asked: false },
        { question: "sweat", answer: "Cold sweat.", importance: "high", asked: false },
        { question: "nausea", answer: "Sick to stomach.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 142/90, HR: 104 bpm, Temp: 36.6°C, O2: 93%",
        heent: "Diaphoretic.",
        chest: "S4 gallop, bibasilar crackles.",
        abdomen: "Soft.",
        neuro: "Anxious, clutching chest (Levine's sign)."
      },
      investigations: { bloods: ["Elevated Troponin I/T"], imaging: ["Chest X-ray"], ecg: ["ST-segment elevation"] },
      treatment: { immediate: ["Aspirin", "Oxygen", "Immediate PCI activation"], medications: ["Antiplatelets", "Nitroglycerin", "Heparin"], definitive: ["Coronary angioplasty and stenting"] },
      complications: ["Heart failure", "Arrhythmias", "Cardiogenic shock", "Cardiac arrest"],
      differentialDiagnoses: ["Aortic dissection", "Pulmonary embolism", "Pericarditis", "GERD"],
      redFlags: ["Ventricular fibrillation", "Severe hypotension", "Cardiogenic shock"],
      keywords: ["heart attack", "AMI", "myocardial infarction", "chest pain", "ST elevation"],
      progression: { untreated: "Massive myocardial necrosis, cardiogenic shock, and cardiac arrest", worsening: ["ventricular arrhythmias", "hypotension", "shock"] }
    }
  },
  {
    id: 22,
    name: "Anaphylaxis",
    presentation: { chiefComplaint: "My throat feels tight and I'm breaking out in hives." },
    patientProfile: { ageRange: [10, 50], gender: "Female", occupation: "Student", personality: "Panicked", painTolerance: "Low" },
    hidden: {
      diagnosis: "Anaphylaxis",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "food", answer: "Ate peanut cookie.", importance: "high", asked: false },
        { question: "breathe", answer: "Harder to breathe.", importance: "high", asked: false },
        { question: "itch", answer: "Whole body itching.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 88/52, HR: 125 bpm, Temp: 36.9°C, O2: 90%",
        heent: "Angioedema of lips and eyelids, swollen uvula.",
        chest: "Inspiratory stridor, diffuse expiratory wheezing.",
        abdomen: "Soft, cramping.",
        neuro: "Anxious, lightheaded."
      },
      investigations: { bloods: ["Serum tryptase"], imaging: [] },
      treatment: { immediate: ["IM Epinephrine", "IV fluids", "Airway management"], medications: ["Epinephrine", "Antihistamines", "Corticosteroids"], definitive: ["Allergen avoidance"] },
      complications: ["Respiratory arrest", "Hypotensive shock", "Death"],
      differentialDiagnoses: ["Asthma attack", "Panic attack", "Urticaria"],
      redFlags: ["Stridor", "Hypotension", "Airway obstruction"],
      keywords: ["anaphylaxis", "allergy", "epinephrine", "hives", "throat tightness"],
      progression: { untreated: "Complete airway closure, cardiovascular collapse, and death", worsening: ["stridor", "loss of consciousness", "pulselessness"] }
    }
  },
  {
    id: 23,
    name: "Hypothyroidism",
    presentation: { chiefComplaint: "I've been feeling exhausted, freezing cold, and gaining weight." },
    patientProfile: { ageRange: [30, 70], gender: "Female", occupation: "Teacher", personality: "Sluggish", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Hypothyroidism",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "weight", answer: "Gained 5kg recently.", importance: "high", asked: false },
        { question: "bowel", answer: "Severe constipation.", importance: "medium", asked: false },
        { question: "skin", answer: "Dry skin and thinning hair.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 105/72, HR: 54 bpm, Temp: 35.8°C, O2: 99%",
        heent: "Periorbital puffiness, thinning hair.",
        chest: "Bradycardia, distant heart sounds.",
        abdomen: "Hypoactive bowel sounds.",
        neuro: "Delayed deep tendon reflex relaxation phase."
      },
      investigations: { bloods: ["Elevated TSH", "Low Free T4"], imaging: [] },
      treatment: { immediate: ["Supportive care"], medications: ["Levothyroxine replacement"], definitive: ["Long-term hormone replacement therapy"] },
      complications: ["Myxedema coma", "Heart failure", "Infertility"],
      differentialDiagnoses: ["Depression", "Chronic fatigue syndrome", "Anaemia"],
      redFlags: ["Decreased mental status (Myxedema coma)", "Hypothermia"],
      keywords: ["hypothyroidism", "thyroid", "fatigue", "weight gain", "cold intolerance"],
      progression: { untreated: "Progression to myxedema coma, profound hypothermia, and failure", worsening: ["lethargy", "hypothermia", "bradycardia"] }
    }
  },
  {
    id: 24,
    name: "Acute Cholecystitis",
    presentation: { chiefComplaint: "I have an agonizing, steady pain under my right ribs." },
    patientProfile: { ageRange: [35, 70], gender: "Female", occupation: "Accountant", personality: "Distressed", painTolerance: "Low" },
    hidden: {
      diagnosis: "Acute Cholecystitis",
      severity: "Severe",
      urgency: "Urgent",
      disposition: "Admit",
      findings: [
        { question: "pain", answer: "Pain right under right ribs shooting to shoulder blade.", importance: "high", asked: false },
        { question: "fever", answer: "Chills and fever.", importance: "high", asked: false },
        { question: "nausea", answer: "Thrown up twice.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 130/85, HR: 98 bpm, Temp: 38.3°C, O2: 98%",
        heent: "Sclera clear.",
        chest: "Lungs clear.",
        abdomen: "Severe RUQ tenderness. Positive Murphy's sign.",
        neuro: "Alert."
      },
      investigations: { bloods: ["Elevated WBC", "Elevated LFTs"], imaging: ["RUQ Ultrasound showing gallbladder wall thickening and pericholecystic fluid"] },
      treatment: { immediate: ["NPO", "IV fluids", "IV antibiotics"], medications: ["Analgesics", "Antibiotics"], definitive: ["Laparoscopic cholecystectomy"] },
      complications: ["Gallbladder gangrene", "Perforation", "Empymea"],
      differentialDiagnoses: ["Appendicitis", "Peptic ulcer disease", "Pancreatitis"],
      redFlags: ["Peritonitis", "Sepsis", "High fever with jaundice"],
      keywords: ["cholecystitis", "gallbladder", "RUQ", "Murphy's sign", "fever"],
      progression: { untreated: "Gallbladder necrosis, perforation, and generalized peritonitis", worsening: ["sepsis", "hypotension", "rigidity"] }
    }
  },
  {
    id: 25,
    name: "Hypoglycaemia",
    presentation: { chiefComplaint: "I'm feeling incredibly shaky, sweaty, and confused." },
    patientProfile: { ageRange: [20, 70], gender: "Male", occupation: "Worker", personality: "Anxious / Confused", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Hypoglycaemia",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "Observe",
      findings: [
        { question: "diabetes", answer: "Type 1 diabetes, missed lunch.", importance: "high", asked: false },
        { question: "vision", answer: "Blurry vision.", importance: "high", asked: false },
        { question: "hunger", answer: "Suddenly intensely hungry.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 138/82, HR: 112 bpm, Temp: 36.4°C, O2: 98%",
        heent: "Profuse diaphoresis, dilated pupils.",
        chest: "Tachycardia.",
        abdomen: "Soft.",
        neuro: "Disoriented, fine resting tremors."
      },
      investigations: { bloods: ["Bedside capillary blood glucose < 3.0 mmol/L"], imaging: [] },
      treatment: { immediate: ["Oral fast-acting glucose or IV Dextrose"], medications: ["Glucagon / Dextrose 50%"], definitive: ["Carbohydrate snack and dietary review"] },
      complications: ["Seizures", "Coma", "Permanent brain injury", "Death"],
      differentialDiagnoses: ["Stroke", "Intoxication", "Panic attack"],
      redFlags: ["Unresponsiveness", "Seizure activity", "Coma"],
      keywords: ["hypoglycemia", "low blood sugar", "diabetes", "shaky", "sweaty"],
      progression: { untreated: "Coma, generalized seizures, and hypoxic brain injury", worsening: ["unresponsiveness", "seizures"] }
    }
  },
  {
    id: 26,
    name: "COPD Exacerbation",
    presentation: { chiefComplaint: "I'm much more short of breath than usual." },
    patientProfile: { ageRange: [55, 80], gender: "Male", occupation: "Retired", personality: "Exhausted", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "COPD Exacerbation",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "Admit",
      findings: [
        { question: "smoke", answer: "Smoked for 40 years.", importance: "high", asked: false },
        { question: "cough", answer: "Worse cough, more phlegm.", importance: "high", asked: false },
        { question: "wheeze", answer: "Wheezing constantly.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 138/84, HR: 108 bpm, Temp: 37.4°C, O2: 88% on room air",
        heent: "Pursed-lip breathing.",
        chest: "Reduced air entry, widespread expiratory wheeze.",
        abdomen: "Soft.",
        neuro: "Alert but breathless."
      },
      investigations: { bloods: ["ABG showing hypercapnia and hypoxemia"], imaging: ["Chest X-ray hyperinflation"] },
      treatment: { immediate: ["Controlled oxygen therapy", "Bronchodilators"], medications: ["Nebulized bronchodilators", "Systemic steroids", "Antibiotics"], definitive: ["Pulmonary rehabilitation"] },
      complications: ["Respiratory failure", "Cor pulmonale", "Pneumothorax"],
      differentialDiagnoses: ["Asthma", "Heart failure", "Pneumonia"],
      redFlags: ["Drowsiness / confusion", "Cyanosis", "Severe respiratory acidosis"],
      keywords: ["COPD", "emphysema", "bronchitis", "shortness of breath", "wheeze"],
      progression: { untreated: "Hypercapnic respiratory failure and arrest", worsening: ["drowsiness", "cyanosis", "worsening acidosis"] }
    }
  },
  {
    id: 27,
    name: "Congestive Heart Failure",
    presentation: { chiefComplaint: "I've been struggling to breathe when lying down." },
    patientProfile: { ageRange: [50, 85], gender: "Female", occupation: "Retired", personality: "Fatigued", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Congestive Heart Failure",
      severity: "Severe",
      urgency: "Urgent",
      disposition: "Admit",
      findings: [
        { question: "swelling", answer: "Swollen ankles.", importance: "high", asked: false },
        { question: "sleep", answer: "Need three pillows to sleep.", importance: "high", asked: false },
        { question: "breath", answer: "Breathless walking upstairs.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 148/88, HR: 102 bpm, Temp: 36.8°C, O2: 93%",
        heent: "Raised JVP.",
        chest: "Bibasal crackles.",
        abdomen: "Mild hepatomegaly.",
        neuro: "Normal."
      },
      investigations: { bloods: ["Elevated BNP"], imaging: ["Chest X-ray showing cardiomegaly and pulmonary edema"], ecg: ["LVH"] },
      treatment: { immediate: ["Loop diuretics", "Oxygen"], medications: ["Furosemide", "ACE inhibitors", "Beta-blockers"], definitive: ["Fluid and salt restriction, medication titration"] },
      complications: ["Acute pulmonary edema", "Cardiogenic shock", "Arrhythmias"],
      differentialDiagnoses: ["Pneumonia", "Asthma", "COPD"],
      redFlags: ["Severe respiratory distress", "Pink frothy sputum", "Hypotension"],
      keywords: ["CHF", "heart failure", "edema", "orthopnea", "crackles"],
      progression: { untreated: "Worsening pulmonary edema and cardiogenic shock", worsening: ["pink frothy sputum", "severe hypoxia", "shock"] }
    }
  },
  {
    id: 28,
    name: "Deep Vein Thrombosis",
    presentation: { chiefComplaint: "My calf has become swollen and painful." },
    patientProfile: { ageRange: [30, 70], gender: "Male", occupation: "Office Worker", personality: "Concerned", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Deep Vein Thrombosis",
      severity: "Moderate",
      urgency: "Urgent",
      disposition: "Observe",
      findings: [
        { question: "travel", answer: "Returned from long flight.", importance: "high", asked: false },
        { question: "leg", answer: "Only left leg swollen.", importance: "high", asked: false },
        { question: "pain", answer: "Painful when walking.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 126/80, HR: 92 bpm, Temp: 37.2°C, O2: 98%",
        heent: "Normal.",
        chest: "Clear breath sounds.",
        abdomen: "Soft.",
        neuro: "Left calf swollen, warm, and tender."
      },
      investigations: { bloods: ["D-dimer"], imaging: ["Venous duplex ultrasound of lower extremity"] },
      treatment: { immediate: ["Anticoagulation initiation"], medications: ["Direct oral anticoagulants (DOACs) or LMWH"], definitive: ["Course of anticoagulation"] },
      complications: ["Pulmonary embolism", "Post-thrombotic syndrome"],
      differentialDiagnoses: ["Cellulitis", "Muscle tear", "Baker's cyst rupture"],
      redFlags: ["Sudden shortness of breath (signs of PE)", "Chest pain"],
      keywords: ["DVT", "deep vein thrombosis", "calf swelling", "blood clot", "leg pain"],
      progression: { untreated: "Clot propagation and detachment leading to pulmonary embolism", worsening: ["sudden shortness of breath", "chest pain"] }
    }
  },
  {
    id: 29,
    name: "Cellulitis",
    presentation: { chiefComplaint: "My leg has become red and painful." },
    patientProfile: { ageRange: [20, 70], gender: "Female", occupation: "Retail Worker", personality: "Anxious", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Cellulitis",
      severity: "Moderate",
      urgency: "Urgent",
      disposition: "Observe",
      findings: [
        { question: "fever", answer: "Fever since yesterday.", importance: "high", asked: false },
        { question: "skin", answer: "Redness keeps spreading.", importance: "high", asked: false },
        { question: "injury", answer: "Cut leg a few days ago.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 118/74, HR: 98 bpm, Temp: 38.4°C, O2: 99%",
        heent: "Normal.",
        chest: "Clear.",
        abdomen: "Soft.",
        neuro: "Warm, erythematous, swollen lower leg with tenderness."
      },
      investigations: { bloods: ["Elevated WBC", "Blood cultures if febrile"], imaging: [] },
      treatment: { immediate: ["Elevation and supportive care"], medications: ["Empiric oral or IV antibiotics covering staph/strep"], definitive: ["Complete antibiotic course"] },
      complications: ["Abscess", "Sepsis", "Necrotizing fasciitis"],
      differentialDiagnoses: ["DVT", "Stasis dermatitis", "Erysipelas"],
      redFlags: ["Rapidly spreading erythema", "Crepitus", "Severe pain out of proportion"],
      keywords: ["cellulitis", "skin infection", "redness", "warmth", "fever"],
      progression: { untreated: "Progression to sepsis or necrotizing soft tissue infection", worsening: ["blistering", "crepitus", "hypotension"] }
    }
  },
  {
    id: 30,
    name: "Acute Pancreatitis",
    presentation: { chiefComplaint: "I've got severe pain in the upper part of my stomach." },
    patientProfile: { ageRange: [30, 65], gender: "Male", occupation: "Chef", personality: "Agonized", painTolerance: "Low" },
    hidden: {
      diagnosis: "Acute Pancreatitis",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "Admit",
      findings: [
        { question: "pain", answer: "Pain goes straight through to my back.", importance: "high", asked: false },
        { question: "vomit", answer: "Vomiting repeatedly.", importance: "high", asked: false },
        { question: "alcohol", answer: "Drank heavily over the weekend.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 104/66, HR: 116 bpm, Temp: 38.1°C, O2: 97%",
        heent: "Dry mucous membranes.",
        chest: "Clear lungs.",
        abdomen: "Marked epigastric tenderness with guarding.",
        neuro: "Alert but distressed."
      },
      investigations: { bloods: ["Elevated serum lipase (>3x normal)", "Elevated CRP"], imaging: ["CT Abdomen or Ultrasound"] },
      treatment: { immediate: ["Aggressive IV fluid resuscitation", "NPO"], medications: ["IV Analgesia", "Anti-emetics"], definitive: ["Supportive care and treatment of underlying cause"] },
      complications: ["Pancreatic pseudocyst", "Necrosis", "Sepsis", "ARDS"],
      differentialDiagnoses: ["Perforated peptic ulcer", "Acute cholecystitis", "Mesenteric ischemia"],
      redFlags: ["Hypotension", "Signs of systemic inflammatory response (SIRS)", "Organ failure"],
      keywords: ["pancreatitis", "epigastric pain", "back pain", "lipase", "vomiting"],
      progression: { untreated: "Pancreatic necrosis, multi-organ failure, and septic shock", worsening: ["hypotension", "oliguria", "respiratory distress"] }
    }
  },
  {
    id: 31,
    name: "Diverticulitis",
    presentation: { chiefComplaint: "I've had pain in the lower left side of my abdomen." },
    patientProfile: { ageRange: [40, 75], gender: "Female", occupation: "Retired", personality: "Uncomfortable", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Diverticulitis",
      severity: "Moderate",
      urgency: "Urgent",
      disposition: "Observe",
      findings: [
        { question: "bowel", answer: "Constipated recently.", importance: "medium", asked: false },
        { question: "fever", answer: "Chills and fever.", importance: "high", asked: false },
        { question: "pain", answer: "Hurts constantly.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 124/80, HR: 102 bpm, Temp: 38.2°C, O2: 99%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Tenderness in left lower quadrant with mild guarding.",
        neuro: "Normal."
      },
      investigations: { bloods: ["Elevated WBC"], imaging: ["CT Abdomen with contrast showing diverticula and fat stranding"] },
      treatment: { immediate: ["Clear liquid diet or NPO", "IV antibiotics if severe"], medications: ["Oral/IV Antibiotics", "Analgesia"], definitive: ["Dietary modification / elective surgery if recurrent"] },
      complications: ["Abscess", "Perforation", "Fistula formation", "Bowel obstruction"],
      differentialDiagnoses: ["IBS", "Colitis", "Ectopic pregnancy", "Appendicitis (left-sided)"],
      redFlags: ["Free air on CT / Peritonitis", "Rigidity", "Hypotension"],
      keywords: ["diverticulitis", "LLQ pain", "colon", "fever", "diverticula"],
      progression: { untreated: "Bowel perforation, abscess, and generalized peritonitis", worsening: ["generalized abdominal pain", "rigidity", "septic shock"] }
    }
  },
  {
    id: 32,
    name: "Peptic Ulcer Disease",
    presentation: { chiefComplaint: "I've been getting burning pain in my stomach." },
    patientProfile: { ageRange: [30, 70], gender: "Male", occupation: "Driver", personality: "Stoic", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Peptic Ulcer Disease",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "food", answer: "Pain gets better after eating.", importance: "high", asked: false },
        { question: "burning", answer: "Burning feeling.", importance: "high", asked: false },
        { question: "medicine", answer: "Take ibuprofen regularly.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 120/78, HR: 78 bpm, Temp: 36.7°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Epigastric tenderness without guarding.",
        neuro: "Normal."
      },
      investigations: { bloods: ["H. pylori testing (stool antigen / breath test)"], imaging: ["Upper endoscopy (EGD)"] },
      treatment: { immediate: ["Stop NSAIDs", "Acid suppression"], medications: ["PPIs (e.g., Omeprazole)", "H. pylori eradication antibiotics"], definitive: ["Ulcer healing and mucosal protection"] },
      complications: ["GI bleeding", "Perforation", "Gastric outlet obstruction"],
      differentialDiagnoses: ["GERD", "Gastritis", "Pancreatitis"],
      redFlags: ["Melena / hematemesis", "Severe sudden abdominal pain (perforation)", "Weight loss"],
      keywords: ["peptic ulcer", "stomach pain", "burning", "ibuprofen", "H. pylori"],
      progression: { untreated: "Ulcer perforation or severe upper gastrointestinal hemorrhage", worsening: ["black tarry stools", "vomiting blood", "rigid abdomen"] }
    }
  },
  {
    id: 33,
    name: "Gastro-oesophageal Reflux Disease",
    presentation: { chiefComplaint: "I keep getting burning in my chest after meals." },
    patientProfile: { ageRange: [25, 65], gender: "Female", occupation: "Manager", personality: "Anxious", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Gastro-oesophageal Reflux Disease",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "food", answer: "Worse after spicy food.", importance: "high", asked: false },
        { question: "lying", answer: "Worse when I lie down.", importance: "high", asked: false },
        { question: "acid", answer: "Taste acid in my mouth.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 118/76, HR: 72 bpm, Temp: 36.5°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Mild epigastric tenderness.",
        neuro: "Normal."
      },
      investigations: { bloods: [], imaging: [] },
      treatment: { immediate: ["Lifestyle and dietary modifications"], medications: ["Antacids", "H2 blockers", "PPIs"], definitive: ["Long-term acid control"] },
      complications: ["Esophagitis", "Barrett's esophagus", "Esophageal stricture"],
      differentialDiagnoses: ["Myocardial infarction", "Peptic ulcer disease", "Esophageal spasm"],
      redFlags: ["Dysphagia", "Odynophagia", "Unexplained weight loss"],
      keywords: ["GERD", "acid reflux", "heartburn", "burning", "indigestion"],
      progression: { untreated: "Chronic esophagitis and metaplasia (Barrett's esophagus)", worsening: ["difficulty swallowing", "weight loss"] }
    }
  },
  {
    id: 34,
    name: "Gout",
    presentation: { chiefComplaint: "My big toe became extremely painful overnight." },
    patientProfile: { ageRange: [40, 70], gender: "Male", occupation: "Accountant", personality: "Agonized", painTolerance: "Low" },
    hidden: {
      diagnosis: "Gout",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "toe", answer: "Barely let anything touch it.", importance: "high", asked: false },
        { question: "alcohol", answer: "Had quite a few beers yesterday.", importance: "medium", asked: false },
        { question: "previous", answer: "Had this once before.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 130/82, HR: 84 bpm, Temp: 37.6°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Soft.",
        neuro: "First MTP joint swollen, red, and exquisitely tender."
      },
      investigations: { bloods: ["Serum uric acid", "WBC / CRP"], imaging: ["Joint aspiration showing needle-shaped negative birefringent urate crystals"] },
      treatment: { immediate: ["Rest and elevation", "NSAIDs or Colchicine"], medications: ["NSAIDs", "Colchicine", "Allopurinol (interval)"], definitive: ["Urate-lowering therapy"] },
      complications: ["Tophaceous gout", "Joint destruction", "Kidney stones"],
      differentialDiagnoses: ["Septic arthritis", "Pseudogout", "Cellulitis"],
      redFlags: ["High fever with joint effusion (rule out septic arthritis)"],
      keywords: ["gout", "toe pain", "uric acid", "joint pain", "podagra"],
      progression: { untreated: "Recurrent painful flares and chronic tophaceous joint damage", worsening: ["multiple joint involvement", "tophus formation"] }
    }
  },
  {
    id: 35,
    name: "Bell's Palsy",
    presentation: { chiefComplaint: "One side of my face suddenly became weak." },
    patientProfile: { ageRange: [20, 60], gender: "Female", occupation: "Teacher", personality: "Anxious", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Bell's Palsy",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "face", answer: "Can't smile properly.", importance: "high", asked: false },
        { question: "eye", answer: "Can't fully close my eye.", importance: "high", asked: false },
        { question: "pain", answer: "Pain behind my ear first.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 122/80, HR: 72 bpm, Temp: 36.7°C, O2: 100%",
        heent: "Complete unilateral facial weakness including forehead.",
        chest: "Normal.",
        abdomen: "Soft.",
        neuro: "Cranial nerve VII palsy only; remainder normal."
      },
      investigations: { bloods: [], imaging: [] },
      treatment: { immediate: ["Eye protection / lubrication"], medications: ["Oral corticosteroids (Prednisolone)", "Valacyclovir if indicated"], definitive: ["Spontaneous recovery expected in most cases"] },
      complications: ["Corneal ulceration", "Permanent facial weakness", "Synkinesis"],
      differentialDiagnoses: ["Stroke", "Lyme disease", "Ramsay Hunt syndrome"],
      redFlags: ["Forehead sparing (indicates central stroke)", "Multiple cranial nerve deficits"],
      keywords: ["Bell's palsy", "facial droop", "facial nerve", "weakness", "eye closure"],
      progression: { untreated: "Prolonged recovery or permanent facial asymmetry", worsening: ["corneal drying", "conjunctivitis"] }
    }
  },
  {
    id: 36,
    name: "Influenza",
    presentation: { chiefComplaint: "I've had a fever, cough, and body aches for two days." },
    patientProfile: { ageRange: [15, 60], gender: "Female", occupation: "Student", personality: "Fatigued", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Influenza",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "fever", answer: "High fever with chills.", importance: "high", asked: false },
        { question: "cough", answer: "Dry cough that won't stop.", importance: "high", asked: false },
        { question: "aches", answer: "Whole body feels sore.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 118/76, HR: 104 bpm, Temp: 39.2°C, O2: 97%",
        heent: "Mild pharyngeal redness.",
        chest: "Lungs clear bilaterally.",
        abdomen: "Soft.",
        neuro: "Alert but fatigued."
      },
      investigations: { bloods: [], imaging: [], urine: [] },
      treatment: { immediate: ["Rest and hydration"], medications: ["Antivirals (Oseltamivir) if early", "Antipyretics"], definitive: ["Supportive recovery"] },
      complications: ["Viral pneumonia", "Secondary bacterial pneumonia", "Myocarditis"],
      differentialDiagnoses: ["COVID-19", "Common cold", "Strep throat"],
      redFlags: ["Severe shortness of breath", "Chest pain", "Confusion"],
      keywords: ["flu", "influenza", "fever", "body aches", "cough"],
      progression: { untreated: "Risk of secondary bacterial pneumonia or respiratory failure in high-risk patients", worsening: ["dyspnea", "secondary infection"] }
    }
  },
  {
    id: 37,
    name: "COVID-19",
    presentation: { chiefComplaint: "I've developed a cough and can't taste anything." },
    patientProfile: { ageRange: [20, 70], gender: "Male", occupation: "Worker", personality: "Anxious", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "COVID-19",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "taste", answer: "Completely lost sense of taste and smell.", importance: "high", asked: false },
        { question: "cough", answer: "Dry persistent cough.", importance: "high", asked: false },
        { question: "breath", answer: "Slightly short of breath climbing stairs.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 122/78, HR: 92 bpm, Temp: 38.1°C, O2: 95%",
        heent: "Nasal congestion.",
        chest: "Fine crackles at both lung bases.",
        abdomen: "Soft.",
        neuro: "No focal deficits."
      },
      investigations: { bloods: ["CBC", "Inflammatory markers"], imaging: ["Chest X-ray / CT chest"] },
      treatment: { immediate: ["Isolation and monitoring"], medications: ["Antivirals if high risk", "Supportive care"], definitive: ["Resolution of infection"] },
      complications: ["Acute Respiratory Distress Syndrome (ARDS)", "Long COVID", "Thromboembolism"],
      differentialDiagnoses: ["Influenza", "Common cold", "Pneumonia"],
      redFlags: ["Oxygen saturation < 92%", "Severe dyspnea", "Confusion"],
      keywords: ["COVID-19", "coronavirus", "anosmia", "loss of taste", "cough"],
      progression: { untreated: "Rapid hypoxemic respiratory failure and bilateral pneumonia", worsening: ["dropping oxygen levels", "severe dyspnea"] }
    }
  },
  {
    id: 38,
    name: "Aortic Dissection",
    presentation: { chiefComplaint: "I have a sudden, tearing pain in my chest and back." },
    patientProfile: { ageRange: [50, 80], gender: "Male", occupation: "Retired", personality: "Terrified", painTolerance: "Low" },
    hidden: {
      diagnosis: "Aortic Dissection",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "pain", answer: "Sudden rip or tear between shoulder blades.", importance: "high", asked: false },
        { question: "onset", answer: "Hit maximum intensity instantly.", importance: "high", asked: false },
        { question: "dizzy", answer: "Extremely lightheaded, going to pass out.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP Right Arm: 168/95, BP Left Arm: 130/72, HR: 110 bpm, Temp: 36.5°C, O2: 96%",
        heent: "Pale, cold sweat.",
        chest: "Early diastolic murmur.",
        abdomen: "Soft. Diminished left femoral pulse.",
        neuro: "Severely distressed."
      },
      investigations: { bloods: [], imaging: ["CT Aortogram / CTA Chest (gold standard)"], ecg: ["Normal or LVH"] },
      treatment: { immediate: ["Immediate blood pressure and heart rate control", "Surgical consultation"], medications: ["IV Beta-blockers (Esmolol / Labetalol)"], definitive: ["Emergency open or endovascular surgical repair"] },
      complications: ["Cardiac tamponade", "Stroke", "Aortic rupture", "Death"],
      differentialDiagnoses: ["Myocardial infarction", "Pulmonary embolism", "Musculoskeletal chest pain"],
      redFlags: ["Hypotension", "Pulse deficit", "Neurological deficit", "Cardiac tamponade"],
      keywords: ["aortic dissection", "tearing pain", "chest pain", "back pain", "pulse deficit"],
      progression: { untreated: "Rapid fatal rupture of the aorta and cardiac tamponade", worsening: ["hypotension", "loss of consciousness", "cardiac arrest"] }
    }
  },
  {
    id: 39,
    name: "Opioid Toxicity",
    presentation: { chiefComplaint: "Patient brought in unresponsive by emergency services." },
    patientProfile: { ageRange: [18, 50], gender: "Male", occupation: "Unknown", personality: "Unresponsive", painTolerance: "High" },
    hidden: {
      diagnosis: "Opioid Toxicity",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "breathing", answer: "Barely breathing with snorting sounds.", importance: "high", asked: false },
        { question: "history", answer: "Empty prescription bottle found.", importance: "medium", asked: false },
        { question: "onset", answer: "Found unarousable 30 minutes ago.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 90/58, HR: 52 bpm, Temp: 35.9°C, O2: 82% on room air, RR: 6/min",
        heent: "Pinpoint pupils (miosis), cyanosis around lips.",
        chest: "Shallow, infrequent respirations.",
        abdomen: "Absent bowel sounds.",
        neuro: "Comatose, unresponsive to pain, flaccid."
      },
      investigations: { bloods: ["Toxicology screen", "ABG"], imaging: ["Chest X-ray for aspiration pneumonia"] },
      treatment: { immediate: ["Airway support / BVM ventilation", "Naloxone administration"], medications: ["Naloxone titration"], definitive: ["Supportive care and monitoring"] },
      complications: ["Respiratory arrest", "Anoxic brain injury", "Aspiration pneumonia", "Death"],
      differentialDiagnoses: ["Sedative overdose", "Stroke", "Hypoglycemia"],
      redFlags: ["Respiratory rate < 8/min", "Coma", "Severe cyanosis"],
      keywords: ["opioid", "overdose", "naloxone", "respiratory depression", "miosis"],
      progression: { untreated: "Complete respiratory arrest and irreversible anoxic brain injury", worsening: ["apnea", "asystole"] }
    }
  },
  {
    id: 40,
    name: "Acute Sinusitis",
    presentation: { chiefComplaint: "I've had facial pain and blocked nose for over a week." },
    patientProfile: { ageRange: [20, 60], gender: "Female", occupation: "Office Worker", personality: "Uncomfortable", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Acute Sinusitis",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "face", answer: "Pain around cheeks and forehead.", importance: "high", asked: false },
        { question: "discharge", answer: "Thick yellow nasal discharge.", importance: "high", asked: false },
        { question: "bend", answer: "Hurts more when I lean forward.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 120/78, HR: 84 bpm, Temp: 37.8°C, O2: 99%",
        heent: "Maxillary sinus tenderness with purulent nasal discharge.",
        chest: "Clear.",
        abdomen: "Normal.",
        neuro: "Normal."
      },
      investigations: { bloods: [], imaging: [] },
      treatment: { immediate: ["Nasal decongestants / saline rinses"], medications: ["Analgesics", "Antibiotics if bacterial and prolonged"], definitive: ["Symptom resolution"] },
      complications: ["Orbital cellulitis", "Meningitis", "Brain abscess"],
      differentialDiagnoses: ["Allergic rhinitis", "Dental abscess", "Migraine"],
      redFlags: ["Periorbital swelling", "Visual changes", "Severe headache with meningeal signs"],
      keywords: ["sinusitis", "facial pain", "nasal discharge", "sinus pressure"],
      progression: { untreated: "Spread of infection to orbit or intracranial structures", worsening: ["periorbital swelling", "severe headache", "vision loss"] }
    }
  },
  {
    id: 41,
    name: "Rheumatoid Arthritis",
    presentation: { chiefComplaint: "My hands are stiff and painful every single morning." },
    patientProfile: { ageRange: [30, 70], gender: "Female", occupation: "Secretary", personality: "Accommodating", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Rheumatoid Arthritis",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "morning", answer: "Stiffness lasts over an hour after waking.", importance: "high", asked: false },
        { question: "joints", answer: "Affects knuckles on both hands symmetrically.", importance: "high", asked: false },
        { question: "fatigue", answer: "Generally run down and exhausted.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 122/80, HR: 76 bpm, Temp: 37.1°C, O2: 99%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Soft.",
        neuro: "Bilateral swelling and warmth at MCP and PIP joints."
      },
      investigations: { bloods: ["Elevated Rheumatoid Factor (RF)", "Anti-CCP", "Elevated ESR/CRP"], imaging: ["X-rays of hands showing periarticular osteopenia and erosions"] },
      treatment: { immediate: ["Pain management"], medications: ["NSAIDs", "DMARDs (Methotrexate)", "Biologics"], definitive: ["Long-term rheumatologic disease modification"] },
      complications: ["Joint deformities", "Rheumatoid nodules", "Cardiovascular disease"],
      differentialDiagnoses: ["Osteoarthritis", "Psoriatic arthritis", "Systemic lupus erythematosus"],
      redFlags: ["Cervical spine instability", "Severe systemic vasculitis"],
      keywords: ["rheumatoid arthritis", "RA", "joint stiffness", "morning stiffness", "knuckles"],
      progression: { untreated: "Progressive joint destruction, deformity, and permanent disability", worsening: ["severe joint deformity", "loss of function"] }
    }
  },
  {
    id: 42,
    name: "Cholelithiasis",
    presentation: { chiefComplaint: "Intermittent cramping pain in my right upper stomach." },
    patientProfile: { ageRange: [30, 60], gender: "Female", occupation: "Accountant", personality: "Calm", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Cholelithiasis",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "food", answer: "Flares up an hour after eating fried food.", importance: "high", asked: false },
        { question: "duration", answer: "Hurts for a couple of hours then goes away.", importance: "high", asked: false },
        { question: "fever", answer: "No fevers or chills.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 120/75, HR: 80 bpm, Temp: 36.6°C, O2: 100%",
        heent: "Sclera anicteric.",
        chest: "Normal.",
        abdomen: "Mild tenderness in RUQ. Negative Murphy's sign.",
        neuro: "Normal."
      },
      investigations: { bloods: ["Normal LFTs"], imaging: ["Ultrasound showing gallstones without wall thickening"] },
      treatment: { immediate: ["Dietary modification"], medications: ["Analgesics as needed"], definitive: ["Elective cholecystectomy if symptoms persist"] },
      complications: ["Acute cholecystitis", "Choledocholithiasis"],
      differentialDiagnoses: ["GERD", "Peptic ulcer disease"],
      redFlags: ["Fever", "Jaundice", "Constant severe pain"],
      keywords: ["cholelithiasis", "gallstones", "biliary colic", "RUQ pain"],
      progression: { untreated: "Progression to symptomatic cholecystitis or duct obstruction", worsening: ["constant pain", "fever", "jaundice"] }
    }
  },
  {
    id: 43,
    name: "Sepsis",
    presentation: { chiefComplaint: "I've become very unwell with fever and confusion." },
    patientProfile: { ageRange: [45, 85], gender: "Male", occupation: "Retired", personality: "Confused", painTolerance: "High" },
    hidden: {
      diagnosis: "Sepsis",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "fever", answer: "Shaking chills.", importance: "high", asked: false },
        { question: "confusion", answer: "Family says I'm confused.", importance: "high", asked: false },
        { question: "infection", answer: "Recently had a urine infection.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 86/54, HR: 128 bpm, Temp: 39.5°C, O2: 93%",
        heent: "Dry mucous membranes.",
        chest: "Tachypnea with scattered crackles.",
        abdomen: "Soft, mild suprapubic tenderness.",
        neuro: "Confused, GCS 14."
      },
      investigations: { bloods: ["Elevated lactate", "Blood cultures", "Elevated WBC and CRP"], imaging: ["Chest X-ray", "CT source imaging"] },
      treatment: { immediate: ["IV fluid bolus", "Broad-spectrum IV antibiotics within 1 hour"], medications: ["Vasopressors (Norepinephrine)", "IV Antibiotics"], definitive: ["Source control and ICU support"] },
      complications: ["Septic shock", "Multi-organ failure", "DIC", "Death"],
      differentialDiagnoses: ["Severe dehydration", "Cardiogenic shock", "Anaphylaxis"],
      redFlags: ["Refractory hypotension", "Lactate > 4 mmol/L", "Decreasing GCS"],
      keywords: ["sepsis", "septic shock", "infection", "hypotension", "fever"],
      progression: { untreated: "Rapid progression to refractory septic shock, multi-organ failure, and death", worsening: ["refractory hypotension", "anuria", "coma"] }
    }
  },
  {
    id: 44,
    name: "Herpes Zoster",
    presentation: { chiefComplaint: "I have a painful rash on one side of my chest." },
    patientProfile: { ageRange: [40, 80], gender: "Female", occupation: "Retired", personality: "Uncomfortable", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Herpes Zoster",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "rash", answer: "Only on one side.", importance: "high", asked: false },
        { question: "pain", answer: "Burned before rash appeared.", importance: "high", asked: false },
        { question: "blisters", answer: "Small blisters appeared.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 120/78, HR: 82 bpm, Temp: 37.3°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Grouped vesicular rash following thoracic dermatome not crossing midline."
      },
      investigations: { bloods: [], imaging: [] },
      treatment: { immediate: ["Pain management"], medications: ["Antivirals (Valacyclovir)", "Analgesics / Gabapentin"], definitive: ["Lesion healing and pain control"] },
      complications: ["Post-herpetic neuralgia", "Disseminated zoster", "Ophthalmic complications"],
      differentialDiagnoses: ["Contact dermatitis", "Herpes simplex"],
      redFlags: ["Rash involving the tip of the nose (Hutchinson's sign - ocular emergency)", "Disseminated rash"],
      keywords: ["shingles", "herpes zoster", "rash", "blisters", "dermatome"],
      progression: { untreated: "Prolonged painful eruption and high risk of chronic post-herpetic neuralgia", worsening: ["severe spreading pain", "skin ulceration"] }
    }
  },
  {
    id: 45,
    name: "Conjunctivitis",
    presentation: { chiefComplaint: "My eye has become red and sticky." },
    patientProfile: { ageRange: [5, 50], gender: "Male", occupation: "Student", personality: "Cooperative", painTolerance: "High" },
    hidden: {
      diagnosis: "Conjunctivitis",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "discharge", answer: "Yellow discharge every morning.", importance: "high", asked: false },
        { question: "vision", answer: "Vision is normal.", importance: "high", asked: false },
        { question: "itch", answer: "Feels itchy and irritated.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 118/74, HR: 72 bpm, Temp: 36.8°C, O2: 100%",
        heent: "Injected conjunctiva with purulent discharge. Pupils equal and reactive.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Normal."
      },
      investigations: { bloods: [], imaging: [] },
      treatment: { immediate: ["Hygiene measures / warm compresses"], medications: ["Antibiotic eye drops if bacterial"], definitive: ["Resolution of infection"] },
      complications: ["Keratitis", "Corneal ulceration"],
      differentialDiagnoses: ["Acute glaucoma", "Uveitis", "Corneal abrasion"],
      redFlags: ["Visual loss", "Severe eye pain", "Pupillary irregularity"],
      keywords: ["conjunctivitis", "pink eye", "red eye", "discharge", "eye infection"],
      progression: { untreated: "Prolonged infection or spread to the other eye and cornea", worsening: ["blurring of vision", "severe pain"] }
    }
  },
  {
    id: 46,
    name: "Atrial Fibrillation",
    presentation: { chiefComplaint: "My heart has been racing and feels irregular." },
    patientProfile: { ageRange: [50, 80], gender: "Male", occupation: "Retired", personality: "Anxious", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Atrial Fibrillation",
      severity: "Moderate",
      urgency: "Urgent",
      disposition: "Observe",
      findings: [
        { question: "palpitations", answer: "Started suddenly.", importance: "high", asked: false },
        { question: "breath", answer: "Breathless walking upstairs.", importance: "medium", asked: false },
        { question: "dizzy", answer: "Felt lightheaded.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 128/78, HR: 146 bpm irregularly irregular, Temp: 36.8°C, O2: 98%",
        heent: "Normal.",
        chest: "Clear lungs.",
        abdomen: "Soft.",
        neuro: "No focal neurological deficit."
      },
      investigations: { bloods: ["Thyroid panel", "Electrolytes"], imaging: ["Chest X-ray", "Echocardiogram"], ecg: ["Irregularly irregular rhythm with no distinct P waves"] },
      treatment: { immediate: ["Rate or rhythm control", "Anticoagulation assessment"], medications: ["Beta-blockers / Rate controllers", "Anticoagulants"], definitive: ["Long-term rate/rhythm management and stroke prevention"] },
      complications: ["Stroke", "Heart failure", "Tachycardia-induced cardiomyopathy"],
      differentialDiagnoses: ["Multifocal atrial tachycardia", "Supraventricular tachycardia", "Flutter"],
      redFlags: ["Hemodynamic instability", "Acute stroke symptoms", "Chest pain"],
      keywords: ["atrial fibrillation", "AFib", "palpitations", "irregular pulse", "arrhythmia"],
      progression: { untreated: "Risk of thromboembolic stroke and heart failure over time", worsening: ["hypotension", "heart failure symptoms", "stroke"] }
    }
  },
  {
    id: 47,
    name: "Pericarditis",
    presentation: { chiefComplaint: "Sharp chest pain that's worse when I lie down." },
    patientProfile: { ageRange: [20, 60], gender: "Male", occupation: "Worker", personality: "Uncomfortable", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Pericarditis",
      severity: "Moderate",
      urgency: "Urgent",
      disposition: "Observe",
      findings: [
        { question: "lean", answer: "Feels better when I sit forward.", importance: "high", asked: false },
        { question: "breath", answer: "Deep breaths make it worse.", importance: "medium", asked: false },
        { question: "virus", answer: "Had a viral illness last week.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 118/74, HR: 108 bpm, Temp: 37.9°C, O2: 98%",
        heent: "Normal.",
        chest: "Pericardial friction rub heard.",
        abdomen: "Soft.",
        neuro: "Normal."
      },
      investigations: { bloods: ["Elevated CRP", "Elevated Troponin (mild)"], imaging: ["Echocardiogram"], ecg: ["Diffuse concave ST-elevation and PR depression"] },
      treatment: { immediate: ["Rest"], medications: ["NSAIDs (Ibuprofen)", "Colchicine"], definitive: ["Anti-inflammatory course"] },
      complications: ["Pericardial effusion", "Cardiac tamponade", "Constrictive pericarditis"],
      differentialDiagnoses: ["Myocardial infarction", "Pneumonia", "Pulmonary embolism"],
      redFlags: ["Beck's triad (hypotension, muffled heart sounds, JVD - tamponade)", "Dyspnea"],
      keywords: ["pericarditis", "chest pain", "friction rub", "leaning forward", "ST elevation"],
      progression: { untreated: "Pericardial effusion and progression to life-threatening cardiac tamponade", worsening: ["hypotension", "muffled heart sounds", "increasing dyspnea"] }
    }
  },
  {
    id: 48,
    name: "Infectious Mononucleosis",
    presentation: { chiefComplaint: "I've had a sore throat and swollen glands for over a week." },
    patientProfile: { ageRange: [15, 25], gender: "Female", occupation: "Student", personality: "Fatigued", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Infectious Mononucleosis",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "fatigue", answer: "Exhausted all the time.", importance: "high", asked: false },
        { question: "throat", answer: "Extremely sore throat.", importance: "high", asked: false },
        { question: "glands", answer: "Glands in neck are swollen.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 118/76, HR: 94 bpm, Temp: 38.2°C, O2: 99%",
        heent: "Enlarged tonsils with posterior cervical lymphadenopathy.",
        chest: "Normal.",
        abdomen: "Mild splenic enlargement.",
        neuro: "Normal."
      },
      investigations: { bloods: ["Monospot test / EBV serology", "CBC showing atypical lymphocytes"], imaging: [] },
      treatment: { immediate: ["Rest and hydration"], medications: ["Analgesics", "Avoid contact sports due to spleen"], definitive: ["Supportive recovery"] },
      complications: ["Splenic rupture", "Airway obstruction from tonsillar swelling", "Hepatitis"],
      differentialDiagnoses: ["Strep throat", "Tonsillitis"],
      redFlags: ["Left upper quadrant abdominal pain (splenic rupture risk)", "Severe respiratory difficulty"],
      keywords: ["mononucleosis", "mono", "EBV", "fatigue", "swollen glands"],
      progression: { untreated: "Prolonged fatigue and risk of splenic rupture with trauma", worsening: ["severe LUQ pain", "respiratory distress"] }
    }
  },
  {
    id: 49,
    name: "Iron Deficiency Anaemia",
    presentation: { chiefComplaint: "I've been unusually tired and short of breath." },
    patientProfile: { ageRange: [20, 50], gender: "Female", occupation: "Office Worker", personality: "Fatigued", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Iron Deficiency Anaemia",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "fatigue", answer: "Even climbing stairs is difficult.", importance: "high", asked: false },
        { question: "bleeding", answer: "Heavy periods.", importance: "high", asked: false },
        { question: "craving", answer: "Craving ice recently.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 108/68, HR: 102 bpm, Temp: 36.6°C, O2: 99%",
        heent: "Conjunctival pallor.",
        chest: "Soft systolic flow murmur.",
        abdomen: "Soft.",
        neuro: "Normal."
      },
      investigations: { bloods: ["Low hemoglobin", "Low ferritin", "Low serum iron"], imaging: [] },
      treatment: { immediate: ["Identify source of blood loss"], medications: ["Oral iron supplementation (Ferrous sulfate)"], definitive: ["Iron repletion and underlying cause treatment"] },
      complications: ["Severe fatigue", "Cardiovascular strain"],
      differentialDiagnoses: ["Vitamin B12 deficiency", "Chronic disease anaemia"],
      redFlags: ["Severe dyspnea at rest", "Chest pain"],
      keywords: ["iron deficiency", "anaemia", "heavy periods", "pica", "fatigue"],
      progression: { untreated: "Worsening anemia and cardiac strain", worsening: ["severe shortness of breath", "tachycardia"] }
    }
  },
  {
    id: 50,
    name: "Hyperthyroidism",
    presentation: { chiefComplaint: "I've been losing weight even though I'm eating more." },
    patientProfile: { ageRange: [20, 50], gender: "Female", occupation: "Manager", personality: "Anxious / Restless", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Hyperthyroidism",
      severity: "Moderate",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "weight", answer: "Lost nearly 8 kilograms.", importance: "high", asked: false },
        { question: "palpitations", answer: "Heart races frequently.", importance: "high", asked: false },
        { question: "heat", answer: "Can't tolerate warm weather.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 138/78, HR: 118 bpm, Temp: 37.2°C, O2: 100%",
        heent: "Fine tremor and mild goiter.",
        chest: "Tachycardia present.",
        abdomen: "Soft.",
        neuro: "Brisk reflexes."
      },
      investigations: { bloods: ["Low TSH", "Elevated Free T3/T4", "Thyroid receptor antibodies (Graves)"], imaging: ["Thyroid uptake scan"] },
      treatment: { immediate: ["Symptom control"], medications: ["Beta-blockers (Propranolol)", "Antithyroid drugs (Methimazole)"], definitive: ["Radioiodine therapy or thyroidectomy"] },
      complications: ["Thyroid storm", "Atrial fibrillation", "Osteoporosis"],
      differentialDiagnoses: ["Anxiety disorder", "Pheochromocytoma", "Diabetes"],
      redFlags: ["High fever, altered mental status, tachyarrhythmia (Thyroid storm)"],
      keywords: ["hyperthyroidism", "Graves", "weight loss", "palpitations", "heat intolerance"],
      progression: { untreated: "Progression to life-threatening thyroid storm or cardiac failure", worsening: ["high fever", "confusion", "rapid arrhythmias"] }
    }
  },
  {
    id: 51,
    name: "Temporal Arteritis",
    presentation: { chiefComplaint: "I've developed a severe headache around my temple." },
    patientProfile: { ageRange: [50, 90], gender: "Female", occupation: "Retired", personality: "Uncomfortable", painTolerance: "Low" },
    hidden: {
      diagnosis: "Temporal Arteritis",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "Admit",
      findings: [
        { question: "jaw", answer: "Jaw aches when chewing.", importance: "high", asked: false },
        { question: "vision", answer: "Vision became blurry briefly.", importance: "high", asked: false },
        { question: "headache", answer: "Pain is over my temple.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 136/82, HR: 88 bpm, Temp: 37.8°C, O2: 99%",
        heent: "Tender, thickened temporal artery.",
        chest: "Normal.",
        abdomen: "Soft.",
        neuro: "No focal deficit."
      },
      investigations: { bloods: ["Markedly elevated ESR and CRP"], imaging: ["Temporal artery biopsy (gold standard)"] },
      treatment: { immediate: ["High-dose systemic corticosteroids (Prednisone) immediately to prevent blindness"], medications: ["Corticosteroids"], definitive: ["Long-term steroid taper"] },
      complications: ["Permanent blindness (anterior ischemic optic neuropathy)", "Aortic aneurysm"],
      differentialDiagnoses: ["Migraine", "Tension headache", "Trigeminal neuralgia"],
      redFlags: ["Sudden vision loss", "Diplopia"],
      keywords: ["temporal arteritis", "giant cell arteritis", "jaw claudication", "headache", "vision loss"],
      progression: { untreated: "Irreversible ischemic optic neuropathy and permanent blindness", worsening: ["sudden complete blindness", "stroke"] }
    }
  },
  {
    id: 52,
    name: "Carpal Tunnel Syndrome",
    presentation: { chiefComplaint: "My hand keeps going numb." },
    patientProfile: { ageRange: [30, 60], gender: "Female", occupation: "Typist", personality: "Cooperative", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Carpal Tunnel Syndrome",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "night", answer: "Worse at night.", importance: "high", asked: false },
        { question: "thumb", answer: "Thumb and first fingers go numb.", importance: "high", asked: false },
        { question: "shake", answer: "Shaking my hand helps.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 122/80, HR: 74 bpm, Temp: 36.6°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Positive Phalen's and Tinel's signs."
      },
      investigations: { bloods: [], imaging: ["Nerve conduction studies (NCS)"] },
      treatment: { immediate: ["Wrist splinting at night"], medications: ["NSAIDs", "Corticosteroid injection"], definitive: ["Carpal tunnel release surgery"] },
        complications: ["Thenar muscle atrophy", "Permanent nerve damage"],
      differentialDiagnoses: ["Cervical radiculopathy", "Pronator teres syndrome"],
      redFlags: ["Constant numbness", "Thenar wasting"],
      keywords: ["carpal tunnel", "numbness", "tingling", "wrist", "median nerve"],
      progression: { untreated: "Progressive motor weakness and permanent thenar atrophy", worsening: ["constant numbness", "dropping objects"] }
    }
  },
  {
    id: 53,
    name: "Benign Paroxysmal Positional Vertigo",
    presentation: { chiefComplaint: "The room spins whenever I turn my head." },
    patientProfile: { ageRange: [40, 80], gender: "Female", occupation: "Retired", personality: "Anxious", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Benign Paroxysmal Positional Vertigo",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "movement", answer: "Rolling over in bed triggers it.", importance: "high", asked: false },
        { question: "hearing", answer: "Hearing is normal.", importance: "high", asked: false },
        { question: "vomit", answer: "Makes me feel sick.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 126/80, HR: 76 bpm, Temp: 36.5°C, O2: 100%",
        heent: "Horizontal nystagmus during Dix-Hallpike maneuver.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Otherwise normal."
      },
      investigations: { bloods: [], imaging: [] },
      treatment: { immediate: ["Canalith repositioning maneuver (Epley maneuver)"], medications: ["Antivertigo medications selectively"], definitive: ["Epley maneuver resolution"] },
      complications: ["Falls and injury in elderly"],
      differentialDiagnoses: ["Meniere's disease", "Vestibular neuritis", "Stroke"],
      redFlags: ["Vertical nystagmus", "Focal neurological signs", "Hearing loss"],
      keywords: ["vertigo", "BPPV", "dizziness", "spinning", "Epley maneuver"],
      progression: { untreated: "Recurrent episodic vertigo triggered by head position changes", worsening: ["frequent severe falls"] }
    }
  },
  {
    id: 54,
    name: "Ectopic Pregnancy",
    presentation: { chiefComplaint: "I've got severe lower abdominal pain and some bleeding." },
    patientProfile: { ageRange: [18, 40], gender: "Female", occupation: "Student", personality: "Distressed", painTolerance: "Low" },
    hidden: {
      diagnosis: "Ectopic Pregnancy",
      severity: "Critical",
      urgency: "Emergency",
      disposition: "ICU",
      findings: [
        { question: "period", answer: "Period is late.", importance: "high", asked: false },
        { question: "bleeding", answer: "Light vaginal bleeding.", importance: "high", asked: false },
        { question: "pregnant", answer: "Pregnancy test was positive.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 94/58, HR: 118 bpm, Temp: 36.8°C, O2: 98%",
        heent: "Pale.",
        chest: "Normal.",
        abdomen: "Lower abdominal tenderness with guarding.",
        neuro: "Alert but distressed."
      },
      investigations: { bloods: ["Positive serum beta-hCG", "CBC"], imaging: ["Transvaginal ultrasound showing adnexal mass / fluid in pouch of Douglas"] },
      treatment: { immediate: ["IV access", "Resuscitation", "Urgent gynecologic consultation"], medications: ["Methotrexate or surgical intervention (Salpingostomy/ectomy)"], definitive: ["Surgical or medical termination of ectopic pregnancy"] },
      complications: ["Tubal rupture", "Hemorrhagic shock", "Death"],
      differentialDiagnoses: ["Appendicitis", "Pelvic inflammatory disease", "Miscarriage"],
      redFlags: ["Hypotension / hemorrhagic shock", "Severe guarding / peritonitis"],
      keywords: ["ectopic pregnancy", "abdominal pain", "positive pregnancy test", "tubal rupture"],
      progression: { untreated: "Rupture of Fallopian tube, massive internal hemorrhage, and shock", worsening: ["hypotension", "syncope", "rigid abdomen"] }
    }
  },
  {
    id: 55,
    name: "Pelvic Inflammatory Disease",
    presentation: { chiefComplaint: "I've had lower abdominal pain and abnormal discharge." },
    patientProfile: { ageRange: [15, 35], gender: "Female", occupation: "Student", personality: "Uncomfortable", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Pelvic Inflammatory Disease",
      severity: "Moderate",
      urgency: "Urgent",
      disposition: "Observe",
      findings: [
        { question: "discharge", answer: "Yellow and unpleasant.", importance: "high", asked: false },
        { question: "sex", answer: "Hurts during sex.", importance: "high", asked: false },
        { question: "fever", answer: "Had a fever.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 116/74, HR: 104 bpm, Temp: 38.3°C, O2: 99%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Suprapubic tenderness.",
        neuro: "Normal."
      },
      investigations: { bloods: ["Elevated WBC", "STI screening (Chlamydia/Gonorrhea PCR)"], imaging: ["Pelvic ultrasound"] },
      treatment: { immediate: ["Broad-spectrum IV/oral antibiotic therapy"], medications: ["Ceftriaxone", "Doxycycline", "Metronidazole"], definitive: ["Complete antibiotic eradication"] },
      complications: ["Tubo-ovarian abscess", "Infertility", "Ectopic pregnancy risk", "Chronic pelvic pain"],
      differentialDiagnoses: ["Appendicitis", "Ectopic pregnancy", "UTI"],
      redFlags: ["High fever", "Severe peritoneal signs", "Tubo-ovarian abscess"],
      keywords: ["PID", "pelvic inflammatory disease", "lower abdominal pain", "discharge", "fever"],
      progression: { untreated: "Tubo-ovarian abscess formation, chronic pelvic pain, and infertility", worsening: ["high fever", "worsening pelvic pain", "sepsis"] }
    }
  },
  {
    id: 56,
    name: "Testicular Torsion",
    presentation: { chiefComplaint: "I've suddenly developed severe pain in one testicle." },
    patientProfile: { ageRange: [12, 25], gender: "Male", occupation: "Student", personality: "Agonized", painTolerance: "Low" },
    hidden: {
      diagnosis: "Testicular Torsion",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "Admit",
      findings: [
        { question: "pain", answer: "Came on suddenly.", importance: "high", asked: false },
        { question: "vomit", answer: "Feeling sick.", importance: "medium", asked: false },
        { question: "injury", answer: "No injury.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 132/82, HR: 110 bpm, Temp: 36.7°C, O2: 99%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Lower abdominal discomfort.",
        neuro: "Affected testicle high-riding with absent cremasteric reflex."
      },
      investigations: { bloods: [], imaging: ["Doppler ultrasound of scrotum showing absent blood flow"] },
      treatment: { immediate: ["Urgent urological surgical consultation"], medications: ["Analgesia"], definitive: ["Emergency surgical detorsion and bilateral orchidopexy"] },
      complications: ["Testicular necrosis", "Infertility", "Testicular loss"],
      differentialDiagnoses: ["Epididymitis", "Testicular trauma", "Orchitis"],
      redFlags: ["Long duration of pain (>6 hours risk of infarction)", "Scrotal skin necrosis"],
      keywords: ["testicular torsion", "testicle pain", "scrotal pain", "absent cremasteric reflex"],
      progression: { untreated: "Testicular ischemia, infarction, necrosis, and loss of testicle within hours", worsening: ["increasing pain", "scrotal swelling and redness"] }
    }
  },
  {
    id: 57,
    name: "Acute Angle-Closure Glaucoma",
    presentation: { chiefComplaint: "I've developed severe pain in one eye." },
    patientProfile: { ageRange: [50, 80], gender: "Female", occupation: "Retired", personality: "Distressed", painTolerance: "Low" },
    hidden: {
      diagnosis: "Acute Angle-Closure Glaucoma",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "Admit",
      findings: [
        { question: "vision", answer: "Everything blurry with halos.", importance: "high", asked: false },
        { question: "nausea", answer: "Vomiting.", importance: "high", asked: false },
        { question: "eye", answer: "Eye is extremely painful.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 140/84, HR: 94 bpm, Temp: 36.7°C, O2: 100%",
        heent: "Red eye with fixed mid-dilated pupil.",
        chest: "Normal.",
        abdomen: "Soft.",
        neuro: "Vision reduced in affected eye."
      },
      investigations: { bloods: [], imaging: ["Tonometry showing markedly elevated intraocular pressure"] },
      treatment: { immediate: ["Urgent ophthalmology referral", "Topical pressure-lowering drops"], medications: ["Pilocarpine", "Timolol", "Acetazolamide IV"], definitive: ["Laser peripheral iridotomy"] },
      complications: ["Permanent vision loss", "Optic nerve damage"],
      differentialDiagnoses: ["Conjunctivitis", "Uveitis", "Corneal abrasion"],
      redFlags: ["Severe eye pain with nausea/vomiting", "Fixed mid-dilated pupil", "Vision loss"],
      keywords: ["glaucoma", "eye pain", "halos", "blurred vision", "fixed pupil"],
      progression: { untreated: "Permanent ischemic damage to the optic nerve and total blindness", worsening: ["complete vision loss", "intractable eye pain"] }
    }
  },
  {
    id: 58,
    name: "Psoriasis",
    presentation: { chiefComplaint: "I've developed thick scaly patches on my skin." },
    patientProfile: { ageRange: [20, 60], gender: "Male", occupation: "Worker", personality: "Cooperative", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Psoriasis",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "itch", answer: "Sometimes itchy.", importance: "medium", asked: false },
        { question: "family", answer: "Father has psoriasis.", importance: "medium", asked: false },
        { question: "elbows", answer: "Mainly on my elbows and knees.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 120/78, HR: 72 bpm, Temp: 36.6°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Well-demarcated silvery plaques on extensor surfaces."
      },
      investigations: { bloods: [], imaging: [] },
      treatment: { immediate: ["Emollients"], medications: ["Topical corticosteroids", "Vitamin D analogues", "Phototherapy"], definitive: ["Long-term skin disease management"] },
      complications: ["Psoriatic arthritis", "Erythrodermic psoriasis"],
      differentialDiagnoses: ["Eczema", "Dermatitis", "Pityriasis rosea"],
      redFlags: ["Widespread painful pustules", "Signs of psoriatic arthritis joint pain"],
      keywords: ["psoriasis", "plaques", "scaly", "silver scales", "skin rash"],
      progression: { untreated: "Spreading plaques and possible progression to psoriatic arthritis", worsening: ["joint pain", "widespread skin coverage"] }
    }
  },
  {
    id: 59,
    name: "Scabies",
    presentation: { chiefComplaint: "I've got an intensely itchy rash." },
    patientProfile: { ageRange: [10, 60], gender: "Female", occupation: "Student", personality: "Distressed", painTolerance: "Low" },
    hidden: {
      diagnosis: "Scabies",
      severity: "Mild",
      urgency: "Routine",
      disposition: "Discharge",
      findings: [
        { question: "night", answer: "Much worse at night.", importance: "high", asked: false },
        { question: "family", answer: "Other people at home itching too.", importance: "high", asked: false },
        { question: "hands", answer: "Between my fingers.", importance: "high", asked: false }
      ],
      examination: {
        vitals: "BP: 118/76, HR: 74 bpm, Temp: 36.6°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Burrows and excoriations in finger webs and wrists."
      },
      investigations: { bloods: [], imaging: [] },
      treatment: { immediate: ["Treat all household contacts simultaneously"], medications: ["Permethrin 5% cream application"], definitive: ["Eradication of mites"] },
      complications: ["Secondary bacterial skin infection from scratching"],
      differentialDiagnoses: ["Eczema", "Contact dermatitis", "Insect bites"],
      redFlags: ["Crusted (Norwegian) scabies in immunocompromised patients"],
      keywords: ["scabies", "itchy", "mites", "finger webs", "rash"],
      progression: { untreated: "Intensifying itch and spread of infestation to household contacts", worsening: ["severe excoriations", "secondary bacterial infection"] }
    }
  },
  {
    id: 60,
    name: "Acute Kidney Injury",
    presentation: { chiefComplaint: "I've barely passed any urine today." },
    patientProfile: { ageRange: [50, 80], gender: "Male", occupation: "Retired", personality: "Lethargic", painTolerance: "Moderate" },
    hidden: {
      diagnosis: "Acute Kidney Injury",
      severity: "Severe",
      urgency: "Emergency",
      disposition: "Admit",
      findings: [
        { question: "urine", answer: "Passed very little urine.", importance: "high", asked: false },
        { question: "vomit", answer: "Vomiting for two days.", importance: "high", asked: false },
        { question: "swelling", answer: "Ankles started swelling.", importance: "medium", asked: false }
      ],
      examination: {
        vitals: "BP: 96/62, HR: 112 bpm, Temp: 37.0°C, O2: 98%",
        heent: "Dry mucous membranes.",
        chest: "Clear.",
        abdomen: "Soft with mild suprapubic fullness.",
        neuro: "Alert but lethargic."
      },
      investigations: { bloods: ["Elevated Creatinine and BUN", "Electrolyte panel (Hyperkalemia)"], imaging: ["Renal ultrasound ruling out obstruction"], urine: ["Urinalysis and fractional excretion of sodium"] },
      treatment: { immediate: ["IV fluid resuscitation if pre-renal", "Stop nephrotoxic drugs"], medications: ["Diuretics if overloaded", "Treat hyperkalemia"], definitive: ["Correction of underlying renal insult"] },
      complications: ["Severe hyperkalemia", "Metabolic acidosis", "Volume overload", "Uremia"],
      differentialDiagnoses: ["Chronic kidney disease", "Urinary obstruction", "Glomerulonephritis"],
      redFlags: ["Severe hyperkalemia (ECG changes)", "Anuria", "Pulmonary edema"],
      keywords: ["AKI", "acute kidney injury", "oliguria", "creatinine", "renal failure"],
      progression: { untreated: "Severe electrolyte derangement, uremia, and permanent kidney damage", worsening: ["hyperkalemic cardiac arrhythmia", "pulmonary edema", "coma"] }
    }
  }
];
