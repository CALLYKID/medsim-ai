export type Disease = {
 id:number;
 name:string;

 presentation:{
  chiefComplaint:string;
 };

 patientProfile:{
  ageRange:[number,number];
  gender:"Male"|"Female";
  occupation:string;
  personality:string;
  painTolerance:string;
};

 hidden:{
  diagnosis:string;

  history:{
 question:string;
 answer:string;
 importance:"high"|"medium"|"low";
}[];

  examination:{
   vitals:string;
   heent:string;
   chest:string;
   abdomen:string;
   neuro:string;
  };
 };
};

export const diseaseLibrary: Disease[] = [
  {
    id: 1,
    name: "Appendicitis",
    presentation: {
      chiefComplaint: "I’ve had stomach pain since yesterday."
    },
    hidden: {
      diagnosis: "Appendicitis",
      findings: [
        { question: "pain", answer: "Lower right abdominal pain." },
        { question: "nausea", answer: "Yes, I feel sick." },
        { question: "fever", answer: "Mild fever since last night." }
      ],
      examination: {
        vitals: "BP: 120/80, HR: 95 bpm, Temp: 37.8°C, O2: 99%",
        heent: "Normal, mucous membranes moist.",
        chest: "Heart sounds normal, lungs clear to auscultation.",
        abdomen: "Severe focal tenderness and guarding in the Right Lower Quadrant (RLQ). Positive rebound tenderness.",
        neuro: "Alert and oriented. Grossly intact."
      }
    }
  },
  {
    id: 2,
    name: "Migraine",
    presentation: {
      chiefComplaint: "I’ve had a terrible headache all day."
    },
    hidden: {
      diagnosis: "Migraine",
      findings: [
        { question: "light", answer: "Light makes it worse." },
        { question: "sound", answer: "Loud noises are painful." },
        { question: "nausea", answer: "I feel nauseous." }
      ],
      examination: {
        vitals: "BP: 118/75, HR: 72 bpm, Temp: 36.6°C, O2: 100%",
        heent: "Photophobia present. Pupils equal and reactive to light.",
        chest: "Normal heart and lung sounds.",
        abdomen: "Soft, non-tender, no bloating.",
        neuro: "Cranial nerves II-XII intact, normal gait, no deficits."
      }
    }
  },
  {
    id: 3,
    name: "Asthma Exacerbation",
    presentation: {
      chiefComplaint: "I’m struggling to breathe."
    },
    hidden: {
      diagnosis: "Asthma Exacerbation",
      findings: [
        { question: "wheeze", answer: "Yes, I hear wheezing." },
        { question: "breath", answer: "Short of breath when walking." },
        { question: "cough", answer: "Dry cough worsening at night." }
      ],
      examination: {
        vitals: "BP: 125/82, HR: 110 bpm, Temp: 36.8°C, O2: 92% on room air",
        heent: "Slight nasal flaring. No oral cyanosis.",
        chest: "Bilateral expiratory wheezing throughout all lung fields. Accessory muscle use noted.",
        abdomen: "Soft, non-tender.",
        neuro: "Alert, but appears anxious and speaks in short phrases."
      }
    }
  },
  {
    id: 4,
    name: "Pneumonia",
    presentation: {
      chiefComplaint: "I’ve had a cough and fever for days."
    },
    hidden: {
      diagnosis: "Pneumonia",
      findings: [
        { question: "fever", answer: "High fever and chills." },
        { question: "cough", answer: "Productive cough with mucus." },
        { question: "chest", answer: "Chest pain when breathing." }
      ],
      examination: {
        vitals: "BP: 115/70, HR: 104 bpm, Temp: 39.1°C, O2: 94%",
        heent: "Dry mucous membranes.",
        chest: "Decreased breath sounds and coarse crackles in the right lower lung base.",
        abdomen: "Soft, non-tender.",
        neuro: "Alert, oriented, slightly fatigued."
      }
    }
  },
  {
    id: 5,
    name: "Gastroenteritis",
    presentation: {
      chiefComplaint: "I’ve had vomiting and diarrhoea."
    },
    hidden: {
      diagnosis: "Gastroenteritis",
      findings: [
        { question: "vomit", answer: "Yes, multiple episodes." },
        { question: "diarrhoea", answer: "Watery stools." },
        { question: "food", answer: "I ate questionable food yesterday." }
      ],
      examination: {
        vitals: "BP: 108/68, HR: 102 bpm, Temp: 37.5°C, O2: 99%",
        heent: "Dry mouth and tongue showing signs of mild dehydration.",
        chest: "Heart sounds normal, lungs clear.",
        abdomen: "Diffuse, mild abdominal tenderness without guarding or rebound. Hyperactive bowel sounds.",
        neuro: "Alert and oriented x 3."
      }
    }
  },
  {
    id: 6,
    name: "Urinary Tract Infection",
    presentation: {
      chiefComplaint: "It hurts when I urinate."
    },
    hidden: {
      diagnosis: "Urinary Tract Infection",
      findings: [
        { question: "burn", answer: "Burning sensation when peeing." },
        { question: "frequency", answer: "Going to toilet very often." },
        { question: "fever", answer: "Low-grade fever." }
      ],
      examination: {
        vitals: "BP: 120/80, HR: 80 bpm, Temp: 37.4°C, O2: 100%",
        heent: "Normal appearance.",
        chest: "Cardiorespiratory exam completely normal.",
        abdomen: "Mild suprapubic tenderness to palpation. No flank tenderness.",
        neuro: "Normal neurological exam."
      }
    }
  },
  {
    id: 7,
    name: "Kidney Stones",
    presentation: {
      chiefComplaint: "Severe pain in my side."
    },
    hidden: {
      diagnosis: "Kidney Stones",
      findings: [
        { question: "pain", answer: "Sharp flank pain radiating down." },
        { question: "urine", answer: "Blood in urine sometimes." },
        { question: "waves", answer: "Pain comes in waves." }
      ],
      examination: {
        vitals: "BP: 145/90, HR: 105 bpm, Temp: 36.7°C, O2: 98%",
        heent: "Normal.",
        chest: "Clear breath sounds, tachycardia present.",
        abdomen: "Soft, but severe tenderness on the affected flank. Positive costovertebral angle (CVA) tenderness.",
        neuro: "Alert, but pacing around due to severe discomfort."
      }
    }
  },
  {
    id: 8,
    name: "Gallstones",
    presentation: {
      chiefComplaint: "Pain after eating fatty food."
    },
    hidden: {
      diagnosis: "Gallstones",
      findings: [
        { question: "food", answer: "Worse after fatty meals." },
        { question: "right", answer: "Pain under right ribs." },
        { question: "nausea", answer: "Feeling sick after eating." }
      ],
      examination: {
        vitals: "BP: 130/82, HR: 88 bpm, Temp: 36.9°C, O2: 99%",
        heent: "Sclera clear, no jaundice.",
        chest: "Lungs clear, heart sounds normal.",
        abdomen: "Tenderness to palpation in the Right Upper Quadrant (RUQ). Negative Murphy's sign (no acute inflammation).",
        neuro: "Normal exam."
      }
    }
  },
  {
    id: 9,
    name: "Meningitis",
    presentation: {
      chiefComplaint: "Severe headache and stiff neck."
    },
    hidden: {
      diagnosis: "Meningitis",
      findings: [
        { question: "neck", answer: "Neck stiffness." },
        { question: "light", answer: "Light sensitivity." },
        { question: "fever", answer: "High fever and confusion." }
      ],
      examination: {
        vitals: "BP: 110/70, HR: 115 bpm, Temp: 39.4°C, O2: 97%",
        heent: "Marked photophobia. Severe resistance to passive neck flexion (nuchal rigidity).",
        chest: "Tachycardia, lungs clear.",
        abdomen: "Soft and non-tender.",
        neuro: "Altered mental status; responds slowly. Positive Brudzinski's sign."
      }
    }
  },
  {
    id: 10,
    name: "Pulmonary Embolism",
    presentation: {
      chiefComplaint: "Sudden chest pain and breathlessness."
    },
    hidden: {
      diagnosis: "Pulmonary Embolism",
      findings: [
        { question: "breath", answer: "Sudden shortness of breath." },
        { question: "chest", answer: "Sharp chest pain." },
        { question: "leg", answer: "Recent leg swelling." }
      ],
      examination: {
        vitals: "BP: 105/65, HR: 120 bpm, Temp: 37.2°C, O2: 89% on room air",
        heent: "Jugular venous distension (JVD) slightly elevated.",
        chest: "Clear to auscultation bilaterally, but significant tachypnea and tachycardia.",
        abdomen: "Soft, non-tender.",
        neuro: "Anxious, otherwise grossly intact. Left calf is swollen, warm, and tender to touch."
      }
    }
  },
  {
    id: 11,
    name: "Otitis Media",
    presentation: {
      chiefComplaint: "Ear pain and fever."
    },
    hidden: {
      diagnosis: "Otitis Media",
      findings: [
        { question: "ear", answer: "Pain inside ear." },
        { question: "hearing", answer: "Muffled hearing." },
        { question: "fever", answer: "Mild fever." }
      ],
      examination: {
        vitals: "BP: 120/78, HR: 85 bpm, Temp: 38.0°C, O2: 100%",
        heent: "Right tympanic membrane is erythematous (red), bulging, with loss of light reflex. Left ear is normal.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Normal gait and balance."
      }
    }
  },
  {
    id: 12,
    name: "Tonsillitis",
    presentation: {
      chiefComplaint: "Sore throat and difficulty swallowing."
    },
    hidden: {
      diagnosis: "Tonsillitis",
      findings: [
        { question: "throat", answer: "Severe sore throat." },
        { question: "swallow", answer: "Pain when swallowing." },
        { question: "fever", answer: "Fever present." }
      ],
      examination: {
        vitals: "BP: 118/76, HR: 90 bpm, Temp: 38.5°C, O2: 99%",
        heent: "Bilateral tonsillar hypertrophy with prominent white exudates. Tender anterior cervical lymphadenopathy.",
        chest: "Lungs clear.",
        abdomen: "Soft, no organomegaly.",
        neuro: "Normal."
      }
    }
  },
  {
    id: 13,
    name: "Diabetic Ketoacidosis",
    presentation: {
      chiefComplaint: "Feeling very unwell and thirsty."
    },
    hidden: {
      diagnosis: "Diabetic Ketoacidosis",
      findings: [
        { question: "thirst", answer: "Extreme thirst." },
        { question: "urine", answer: "Frequent urination." },
        { question: "breath", answer: "Fruity-smelling breath." }
      ],
      examination: {
        vitals: "BP: 100/60, HR: 118 bpm, Temp: 36.5°C, O2: 98%, Respiratory Rate: 28/min",
        heent: "Very dry mucous membranes, sunken eyes, fruity/acetone breath odor detected.",
        chest: "Lungs clear, but breathing is deeply rapid and labored (Kussmaul respirations).",
        abdomen: "Generalized mild abdominal tenderness.",
        neuro: "Lethargic but answers questions appropriately."
      }
    }
  },
  {
    id: 14,
    name: "Hypertensive Crisis",
    presentation: {
      chiefComplaint: "Severe headache and dizziness."
    },
    hidden: {
      diagnosis: "Hypertensive Crisis",
      findings: [
        { question: "headache", answer: "Severe pressure headache." },
        { question: "vision", answer: "Blurred vision." },
        { question: "chest", answer: "Chest discomfort." }
      ],
      examination: {
        vitals: "BP: 210/120, HR: 92 bpm, Temp: 36.6°C, O2: 98%",
        heent: "Fundoscopy reveals mild arteriolar narrowing. No papilledema.",
        chest: "Strong apical impulse, S4 gallop heard on cardiac auscultation. Lungs clear.",
        abdomen: "Soft, non-tender, no renal bruits.",
        neuro: "Alert, oriented, no focal motor weakness or speech deficits."
      }
    }
  },
  {
    id: 15,
    name: "Stroke",
    presentation: {
      chiefComplaint: "Sudden weakness on one side."
    },
    hidden: {
      diagnosis: "Stroke",
      findings: [
        { question: "face", answer: "Facial droop." },
        { question: "arm", answer: "Weak arm on one side." },
        { question: "speech", answer: "Slurred speech." }
      ],
      examination: {
        vitals: "BP: 175/95, HR: 84 bpm, Temp: 36.8°C, O2: 97%",
        heent: "Left-sided facial flattening/droop with sparing of the forehead.",
        chest: "Heart sounds normal, irregular rhythm noted (possible AFib). Lungs clear.",
        abdomen: "Soft, non-tender.",
        neuro: "Pronator drift present in left arm. Left upper and lower extremity strength is 2/5. Speech is slurred (dysarthria)."
      }
    }
  },
  {
    id: 16,
    name: "Anaemia",
    presentation: {
      chiefComplaint: "I feel tired all the time."
    },
    hidden: {
      diagnosis: "Anaemia",
      findings: [
        { question: "fatigue", answer: "Constant tiredness." },
        { question: "dizzy", answer: "Feeling dizzy on standing." },
        { question: "pale", answer: "Pale skin noticed." }
      ],
      examination: {
        vitals: "BP: 110/70 (drops to 98/60 on standing), HR: 98 bpm, Temp: 36.5°C, O2: 99%",
        heent: "Substantial conjunctival pallor (inside lower eyelids). Paleness of oral mucosa.",
        chest: "Systolic hemic murmur (flow murmur) heard at the left sternal border. Lungs clear.",
        abdomen: "Soft, no spleen or liver enlargement.",
        neuro: "Normal strength, mild lightheadedness upon sitting up."
      }
    }
  },
  {
    id: 17,
    name: "Depression",
    presentation: {
      chiefComplaint: "I’ve been feeling low for weeks."
    },
    hidden: {
      diagnosis: "Depression",
      findings: [
        { question: "sleep", answer: "Disturbed sleep." },
        { question: "mood", answer: "Low mood daily." },
        { question: "interest", answer: "Loss of interest." }
      ],
      examination: {
        vitals: "BP: 122/78, HR: 70 bpm, Temp: 36.7°C, O2: 100%",
        heent: "Normal appearance, poor eye contact.",
        chest: "Normal heart and lung sounds.",
        abdomen: "Soft, non-tender.",
        neuro: "Psychomotor slowing observed; movements and speech are slow but physically completely intact."
      }
    }
  },
  {
    id: 18,
    name: "Anxiety Disorder",
    presentation: {
      chiefComplaint: "I feel constantly worried."
    },
    hidden: {
      diagnosis: "Anxiety Disorder",
      findings: [
        { question: "panic", answer: "Episodes of panic." },
        { question: "heart", answer: "Fast heartbeat." },
        { question: "worry", answer: "Constant worrying." }
      ],
      examination: {
        vitals: "BP: 135/85, HR: 102 bpm, Temp: 36.6°C, O2: 99%",
        heent: "Normal, pupils slightly dilated.",
        chest: "Mild tachycardia, clear lungs, breath sounds normal.",
        abdomen: "Soft, hyperactive bowel sounds.",
        neuro: "Visible tremors in hands, hyperreflexia noted globally, sweating palms."
      }
    }
  },
  {
    id: 19,
    name: "Dermatitis",
    presentation: {
      chiefComplaint: "Itchy rash on my skin."
    },
    hidden: {
      diagnosis: "Dermatitis",
      findings: [
        { question: "itch", answer: "Severe itching." },
        { question: "rash", answer: "Red rash present." },
        { question: "allergy", answer: "Possible allergen exposure." }
      ],
      examination: {
        vitals: "BP: 118/76, HR: 74 bpm, Temp: 36.8°C, O2: 100%",
        heent: "Normal, no swelling of eyes or lips.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Skin exam shows erythematous, scaling, pruritic plaques with some excoriations (scratch marks) on bilateral antecubital fossae."
      }
    }
  },
  {
    id: 20,
    name: "Fracture",
    presentation: {
      chiefComplaint: "I injured my arm badly."
    },
    hidden: {
      diagnosis: "Fracture",
      findings: [
        { question: "pain", answer: "Severe pain on movement." },
        { question: "swelling", answer: "Swelling present." },
        { question: "movement", answer: "Cannot move limb properly." }
      ],
      examination: {
        vitals: "BP: 138/84, HR: 96 bpm, Temp: 36.7°C, O2: 100%",
        heent: "Normal.",
        chest: "Normal.",
        abdomen: "Normal.",
        neuro: "Right forearm shows point tenderness, visible deformity, and marked localized edema. Distal radial pulse is strong, capillary refill is <2s, sensation is intact."
      }
    }
  },
    {
    id: 21,
    name: "Acute Myocardial Infarction",
    presentation: {
      chiefComplaint: "I have a crushing pressure in the middle of my chest."
    },
    hidden: {
      diagnosis: "Acute Myocardial Infarction",
      findings: [
        { question: "pain", answer: "It feels like an elephant sitting on my chest, radiating down my left arm and jaw." },
        { question: "sweat", answer: "Yes, I am breaking out in a cold sweat." },
        { question: "nausea", answer: "I feel quite sick to my stomach and lightheaded." }
      ],
      examination: {
        vitals: "BP: 142/90, HR: 104 bpm, Temp: 36.6°C, O2: 93% on room air",
        heent: "Diaphoretic (heavily sweating) face, pale conjunctiva.",
        chest: "S4 gallop present on heart auscultation. Lungs show mild bibasilar crackles due to early congestion.",
        abdomen: "Soft, non-tender.",
        neuro: "Alert, but extremely anxious and clutching chest (Levine's sign)."
      }
    }
  },
  {
    id: 22,
    name: "Anaphylaxis",
    presentation: {
      chiefComplaint: "My throat feels tight and I'm breaking out in hives."
    },
    hidden: {
      diagnosis: "Anaphylaxis",
      findings: [
        { question: "food", answer: "I accidentally ate a cookie containing peanuts about twenty minutes ago." },
        { question: "breathe", answer: "Yes, it is getting harder and harder to catch my breath." },
        { question: "itch", answer: "My whole body is itching intensely." }
      ],
      examination: {
        vitals: "BP: 88/52, HR: 125 bpm, Temp: 36.9°C, O2: 90%",
        heent: "Significant angioedema (swelling) of the lips and eyelids. Uvula is swollen.",
        chest: "Inspiratory stridor heard over the neck; diffuse expiratory wheezing bilaterally across lung fields.",
        abdomen: "Soft, hyperactive bowel sounds with complaints of cramping.",
        neuro: "Anxious, lightheaded from hypotension, but responsive."
      }
    }
  },
  {
    id: 23,
    name: "Hypothyroidism",
    presentation: {
      chiefComplaint: "I've been feeling exhausted, freezing cold, and gaining weight."
    },
    hidden: {
      diagnosis: "Hypothyroidism",
      findings: [
        { question: "weight", answer: "I've gained about 5kg over the last two months without changing my diet." },
        { question: "bowel", answer: "I have been suffering from severe constipation lately." },
        { question: "skin", answer: "My skin has become incredibly dry and my hair is thinning." }
      ],
      examination: {
        vitals: "BP: 105/72, HR: 54 bpm (bradycardia), Temp: 35.8°C, O2: 99%",
        heent: "Periorbital puffiness (swelling around eyes), dry thinning hair, mild diffuse enlargement of the thyroid gland.",
        chest: "Bradycardia, distant heart sounds, lung sounds clear.",
        abdomen: "Soft, mildly distended, hypoactive (slow) bowel sounds.",
        neuro: "Delayed relaxation phase of deep tendon reflexes (especially the Achilles reflex). Mentation appears slightly slow."
      }
    }
  },
  {
    id: 24,
    name: "Acute Cholecystitis",
    presentation: {
      chiefComplaint: "I have an agonizing, steady pain under my right ribs."
    },
    hidden: {
      diagnosis: "Acute Cholecystitis",
      findings: [
        { question: "pain", answer: "The pain is right under my right ribs and shoots straight through to my right shoulder blade." },
        { question: "fever", answer: "Yes, I developed chills and a fever a few hours ago." },
        { question: "nausea", answer: "I've thrown up twice because the pain is so intense." }
      ],
      examination: {
        vitals: "BP: 130/85, HR: 98 bpm, Temp: 38.3°C, O2: 98%",
        heent: "Sclera clear, no icterus (jaundice) noted.",
        chest: "Lungs clear, heart sounds normal.",
        abdomen: "Severe tenderness in Right Upper Quadrant (RUQ). Positive Murphy's sign (patient catches their breath in pain when you palpate under the right ribs while they inhale).",
        neuro: "Alert and oriented x 3."
      }
    }
  },
  {
    id: 25,
    name: "Hypoglycaemia",
    presentation: {
      chiefComplaint: "I'm feeling incredibly shaky, sweaty, and confused."
    },
    hidden: {
      diagnosis: "Hypoglycaemia",
      findings: [
        { question: "diabetes", answer: "Yes, I take insulin for Type 1 diabetes. I think I missed lunch today." },
        { question: "vision", answer: "My vision is blurry and my heart is racing." },
        { question: "hunger", answer: "I feel intensely, suddenly hungry." }
      ],
      examination: {
        vitals: "BP: 138/82, HR: 112 bpm, Temp: 36.4°C, O2: 98%",
        heent: "Profuse diaphoresis across forehead, pupils dilated but reactive.",
        chest: "Tachycardia present, regular rhythm, clear lung fields.",
        abdomen: "Soft, non-tender.",
        neuro: "Disoriented to time and place, fine resting tremors noted in both hands."
      }
    }
  },
  {
  id: 26,
  name: "COPD Exacerbation",
  presentation: {
    chiefComplaint: "I'm much more short of breath than usual."
  },
  hidden: {
    diagnosis: "COPD Exacerbation",
    findings: [
      { question: "smoke", answer: "I've smoked for over 40 years." },
      { question: "cough", answer: "My cough is worse and I'm coughing up more phlegm." },
      { question: "wheeze", answer: "Yes, I'm wheezing constantly." }
    ],
    examination: {
      vitals: "BP: 138/84, HR: 108 bpm, Temp: 37.4°C, O2: 88% on room air",
      heent: "Pursed-lip breathing noted.",
      chest: "Reduced air entry bilaterally with widespread expiratory wheeze.",
      abdomen: "Soft, non-tender.",
      neuro: "Alert but breathless when speaking."
    }
  }
},

{
  id: 27,
  name: "Congestive Heart Failure",
  presentation: {
    chiefComplaint: "I've been struggling to breathe when lying down."
  },
  hidden: {
    diagnosis: "Congestive Heart Failure",
    findings: [
      { question: "swelling", answer: "My ankles have become swollen." },
      { question: "sleep", answer: "I need three pillows to sleep." },
      { question: "breath", answer: "Walking upstairs leaves me breathless." }
    ],
    examination: {
      vitals: "BP: 148/88, HR: 102 bpm, Temp: 36.8°C, O2: 93%",
      heent: "Raised jugular venous pressure.",
      chest: "Bibasal crackles heard.",
      abdomen: "Mild hepatomegaly.",
      neuro: "Normal examination."
    }
  }
},

{
  id: 28,
  name: "Deep Vein Thrombosis",
  presentation: {
    chiefComplaint: "My calf has become swollen and painful."
  },
  hidden: {
    diagnosis: "Deep Vein Thrombosis",
    findings: [
      { question: "travel", answer: "I recently returned from a long flight." },
      { question: "leg", answer: "Only my left leg is swollen." },
      { question: "pain", answer: "It's painful when I walk." }
    ],
    examination: {
      vitals: "BP: 126/80, HR: 92 bpm, Temp: 37.2°C, O2: 98%",
      heent: "Normal.",
      chest: "Clear breath sounds.",
      abdomen: "Soft, non-tender.",
      neuro: "Left calf swollen, warm and tender."
    }
  }
},

{
  id: 29,
  name: "Cellulitis",
  presentation: {
    chiefComplaint: "My leg has become red and painful."
  },
  hidden: {
    diagnosis: "Cellulitis",
    findings: [
      { question: "fever", answer: "I've had a fever since yesterday." },
      { question: "skin", answer: "The redness keeps spreading." },
      { question: "injury", answer: "I cut my leg a few days ago." }
    ],
    examination: {
      vitals: "BP: 118/74, HR: 98 bpm, Temp: 38.4°C, O2: 99%",
      heent: "Normal.",
      chest: "Heart and lungs normal.",
      abdomen: "Soft.",
      neuro: "Warm erythematous swollen lower leg with tenderness."
    }
  }
},

{
  id: 30,
  name: "Acute Pancreatitis",
  presentation: {
    chiefComplaint: "I've got severe pain in the upper part of my stomach."
  },
  hidden: {
    diagnosis: "Acute Pancreatitis",
    findings: [
      { question: "pain", answer: "The pain goes straight through to my back." },
      { question: "vomit", answer: "I've been vomiting repeatedly." },
      { question: "alcohol", answer: "I drank heavily over the weekend." }
    ],
    examination: {
      vitals: "BP: 104/66, HR: 116 bpm, Temp: 38.1°C, O2: 97%",
      heent: "Dry mucous membranes.",
      chest: "Clear lungs.",
      abdomen: "Marked epigastric tenderness with guarding.",
      neuro: "Alert but distressed due to pain."
    }
  }
},

{
  id: 31,
  name: "Diverticulitis",
  presentation: {
    chiefComplaint: "I've had pain in the lower left side of my abdomen."
  },
  hidden: {
    diagnosis: "Diverticulitis",
    findings: [
      { question: "bowel", answer: "I've been constipated recently." },
      { question: "fever", answer: "I've had chills and fever." },
      { question: "pain", answer: "It hurts constantly." }
    ],
    examination: {
      vitals: "BP: 124/80, HR: 102 bpm, Temp: 38.2°C, O2: 99%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Tenderness in the left lower quadrant with mild guarding.",
      neuro: "Normal."
    }
  }
},

{
  id: 32,
  name: "Peptic Ulcer Disease",
  presentation: {
    chiefComplaint: "I've been getting burning pain in my stomach."
  },
  hidden: {
    diagnosis: "Peptic Ulcer Disease",
    findings: [
      { question: "food", answer: "The pain gets better after eating." },
      { question: "burning", answer: "It's a burning feeling." },
      { question: "medicine", answer: "I take ibuprofen regularly." }
    ],
    examination: {
      vitals: "BP: 120/78, HR: 78 bpm, Temp: 36.7°C, O2: 100%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Epigastric tenderness without guarding.",
      neuro: "Normal."
    }
  }
},

{
  id: 33,
  name: "Gastro-oesophageal Reflux Disease",
  presentation: {
    chiefComplaint: "I keep getting burning in my chest after meals."
  },
  hidden: {
    diagnosis: "Gastro-oesophageal Reflux Disease",
    findings: [
      { question: "food", answer: "It's worse after spicy food." },
      { question: "lying", answer: "It gets worse when I lie down." },
      { question: "acid", answer: "I taste acid in my mouth." }
    ],
    examination: {
      vitals: "BP: 118/76, HR: 72 bpm, Temp: 36.5°C, O2: 100%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Mild epigastric tenderness.",
      neuro: "Normal."
    }
  }
},

{
  id: 34,
  name: "Gout",
  presentation: {
    chiefComplaint: "My big toe became extremely painful overnight."
  },
  hidden: {
    diagnosis: "Gout",
    findings: [
      { question: "toe", answer: "I can barely let anything touch it." },
      { question: "alcohol", answer: "I had quite a few beers yesterday." },
      { question: "previous", answer: "I've had this once before." }
    ],
    examination: {
      vitals: "BP: 130/82, HR: 84 bpm, Temp: 37.6°C, O2: 100%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Soft.",
      neuro: "First metatarsophalangeal joint is swollen, red and exquisitely tender."
    }
  }
},

{
  id: 35,
  name: "Bell's Palsy",
  presentation: {
    chiefComplaint: "One side of my face suddenly became weak."
  },
  hidden: {
    diagnosis: "Bell's Palsy",
    findings: [
      { question: "face", answer: "I can't smile properly." },
      { question: "eye", answer: "I can't fully close my eye." },
      { question: "pain", answer: "I had pain behind my ear first." }
    ],
    examination: {
      vitals: "BP: 122/80, HR: 72 bpm, Temp: 36.7°C, O2: 100%",
      heent: "Complete unilateral facial weakness including the forehead.",
      chest: "Normal.",
      abdomen: "Soft, non-tender.",
      neuro: "Cranial nerve VII palsy only; remainder of neurological examination normal."
    }
  }
},
{
  id: 36,
  name: "Influenza",
  presentation: {
    chiefComplaint: "I've had a fever, cough, and body aches for two days."
  },
  hidden: {
    diagnosis: "Influenza",
    findings: [
      { question: "fever", answer: "High fever with chills." },
      { question: "cough", answer: "Dry cough that won't stop." },
      { question: "aches", answer: "My whole body feels sore." }
    ],
    examination: {
      vitals: "BP: 118/76, HR: 104 bpm, Temp: 39.2°C, O2: 97%",
      heent: "Mild pharyngeal redness without exudate.",
      chest: "Lungs clear bilaterally.",
      abdomen: "Soft, non-tender.",
      neuro: "Alert but fatigued."
    }
  }
},
{
  id: 37,
  name: "COVID-19",
  presentation: {
    chiefComplaint: "I've developed a cough and can't taste anything."
  },
  hidden: {
    diagnosis: "COVID-19",
    findings: [
      { question: "taste", answer: "I've completely lost my sense of taste and smell." },
      { question: "cough", answer: "Dry persistent cough." },
      { question: "breath", answer: "Slightly short of breath climbing stairs." }
    ],
    examination: {
      vitals: "BP: 122/78, HR: 92 bpm, Temp: 38.1°C, O2: 95%",
      heent: "Nasal congestion present.",
      chest: "Fine crackles at both lung bases.",
      abdomen: "Soft, non-tender.",
      neuro: "No focal neurological deficits."
    }
  }
},
{
    id: 38,
    name: "Aortic Dissection",
    presentation: {
      chiefComplaint: "I have a sudden, tearing pain in my chest and back."
    },
    hidden: {
      diagnosis: "Aortic Dissection",
      findings: [
        { question: "pain", answer: "It felt like a sudden rip or tear between my shoulder blades." },
        { question: "onset", answer: "It hit maximum intensity instantly a few minutes ago." },
        { question: "dizzy", answer: "Yes, I feel extremely lightheaded, like I'm going to pass out." }
      ],
      examination: {
        vitals: "BP Right Arm: 168/95, BP Left Arm: 130/72, HR: 110 bpm, Temp: 36.5°C, O2: 96%",
        heent: "Pale, cold sweat across face.",
        chest: "New early diastolic murmur heard along the right sternal border. Lungs clear.",
        abdomen: "Soft, non-tender. Diminished left femoral pulse relative to the right.",
        neuro: "Alert but severely distressed. No focal sensory deficits."
      }
    }
  },
{
    id: 39,
    name: "Opioid Toxicity",
    presentation: {
      chiefComplaint: "Patient brought in unresponsive by emergency services."
    },
    hidden: {
      diagnosis: "Opioid Toxicity",
      findings: [
        { question: "breathing", answer: "Patient is barely breathing with snorting sounds." },
        { question: "history", answer: "Empty prescription bottle found at the scene." },
        { question: "onset", answer: "Found unarousable roughly thirty minutes ago." }
      ],
      examination: {
        vitals: "BP: 90/58, HR: 52 bpm, Temp: 35.9°C, O2: 82% on room air, RR: 6/min",
        heent: "Pinpoint pupils (miosis) bilaterally, non-reactive to light. Cyanosis around lips.",
        chest: "Shallow, infrequent respirations. Clear lungs, slow regular heart rate.",
        abdomen: "Soft, markedly decreased or absent bowel sounds.",
        neuro: "Comatose. Unresponsive to painful stimuli. Generalized flaccid muscle tone."
      }
    }
  },
{
  id: 40,
  name: "Acute Sinusitis",
  presentation: {
    chiefComplaint: "I've had facial pain and blocked nose for over a week."
  },
  hidden: {
    diagnosis: "Acute Sinusitis",
    findings: [
      { question: "face", answer: "Pain around my cheeks and forehead." },
      { question: "discharge", answer: "Thick yellow nasal discharge." },
      { question: "bend", answer: "It hurts more when I lean forward." }
    ],
    examination: {
      vitals: "BP: 120/78, HR: 84 bpm, Temp: 37.8°C, O2: 99%",
      heent: "Maxillary sinus tenderness with purulent nasal discharge.",
      chest: "Clear.",
      abdomen: "Normal.",
      neuro: "Normal."
    }
  }
},
{
    id: 41,
    name: "Rheumatoid Arthritis",
    presentation: {
      chiefComplaint: "My hands are stiff and painful every single morning."
    },
    hidden: {
      diagnosis: "Rheumatoid Arthritis",
      findings: [
        { question: "morning", answer: "The stiffness lasts for over an hour after waking up." },
        { question: "joints", answer: "It affects the knuckles on both of my hands symmetrically." },
        { question: "fatigue", answer: "Yes, I have been feeling generally run down and exhausted." }
      ],
      examination: {
        vitals: "BP: 122/80, HR: 76 bpm, Temp: 37.1°C, O2: 99%",
        heent: "Normal.",
        chest: "Normal cardiorespiratory examination.",
        abdomen: "Soft, non-tender.",
        neuro: "Bilateral swelling, warmth, and ulnar deviation tendencies at the MCP and PIP joints. Erythema over knuckles."
      }
    }
  },
{
    id: 42,
    name: "Cholelithiasis",
    presentation: {
      chiefComplaint: "Intermittent cramping pain in my right upper stomach."
    },
    hidden: {
      diagnosis: "Cholelithiasis",
      findings: [
        { question: "food", answer: "The pain flares up badly about an hour after eating fried food." },
        { question: "duration", answer: "It hurts for a couple of hours and then goes away completely." },
        { question: "fever", answer: "No, I haven't had any fevers or chills." }
      ],
      examination: {
        vitals: "BP: 120/75, HR: 80 bpm, Temp: 36.6°C, O2: 100%",
        heent: "Sclera anicteric.",
        chest: "Normal.",
        abdomen: "Mild tenderness to deep palpation in the Right Upper Quadrant. Negative Murphy's sign.",
        neuro: "Completely normal."
      }
    }
  },
{
  id: 43,
  name: "Sepsis",
  presentation: {
    chiefComplaint: "I've become very unwell with fever and confusion."
  },
  hidden: {
    diagnosis: "Sepsis",
    findings: [
      { question: "fever", answer: "I've had shaking chills." },
      { question: "confusion", answer: "My family says I'm confused." },
      { question: "infection", answer: "I recently had a urine infection." }
    ],
    examination: {
      vitals: "BP: 86/54, HR: 128 bpm, Temp: 39.5°C, O2: 93%",
      heent: "Dry mucous membranes.",
      chest: "Tachypnoea with scattered crackles.",
      abdomen: "Soft, mild suprapubic tenderness.",
      neuro: "Confused, GCS 14."
    }
  }
},
{
  id: 44,
  name: "Herpes Zoster",
  presentation: {
    chiefComplaint: "I have a painful rash on one side of my chest."
  },
  hidden: {
    diagnosis: "Herpes Zoster",
    findings: [
      { question: "rash", answer: "It's only on one side." },
      { question: "pain", answer: "It burns before the rash appeared." },
      { question: "blisters", answer: "Small blisters have appeared." }
    ],
    examination: {
      vitals: "BP: 120/78, HR: 82 bpm, Temp: 37.3°C, O2: 100%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Normal.",
      neuro: "Grouped vesicular rash following a thoracic dermatome without crossing the midline."
    }
  }
},
{
  id: 45,
  name: "Conjunctivitis",
  presentation: {
    chiefComplaint: "My eye has become red and sticky."
  },
  hidden: {
    diagnosis: "Conjunctivitis",
    findings: [
      { question: "discharge", answer: "There's yellow discharge every morning." },
      { question: "vision", answer: "My vision is normal." },
      { question: "itch", answer: "It feels itchy and irritated." }
    ],
    examination: {
      vitals: "BP: 118/74, HR: 72 bpm, Temp: 36.8°C, O2: 100%",
      heent: "Injected conjunctiva with purulent discharge. Pupils equal and reactive.",
      chest: "Normal.",
      abdomen: "Normal.",
      neuro: "Normal."
    }
  }
},
{
  id: 46,
  name: "Atrial Fibrillation",
  presentation: {
    chiefComplaint: "My heart has been racing and feels irregular."
  },
  hidden: {
    diagnosis: "Atrial Fibrillation",
    findings: [
      { question: "palpitations", answer: "It started suddenly." },
      { question: "breath", answer: "I get breathless walking upstairs." },
      { question: "dizzy", answer: "I've felt lightheaded." }
    ],
    examination: {
      vitals: "BP: 128/78, HR: 146 bpm irregularly irregular, Temp: 36.8°C, O2: 98%",
      heent: "Normal.",
      chest: "Clear lungs.",
      abdomen: "Soft, non-tender.",
      neuro: "No focal neurological deficit."
    }
  }
},

{
  id: 47,
  name: "Pericarditis",
  presentation: {
    chiefComplaint: "Sharp chest pain that's worse when I lie down."
  },
  hidden: {
    diagnosis: "Pericarditis",
    findings: [
      { question: "lean", answer: "It feels better when I sit forward." },
      { question: "breath", answer: "Deep breaths make it worse." },
      { question: "virus", answer: "I had a viral illness last week." }
    ],
    examination: {
      vitals: "BP: 118/74, HR: 108 bpm, Temp: 37.9°C, O2: 98%",
      heent: "Normal.",
      chest: "Pericardial friction rub heard.",
      abdomen: "Soft.",
      neuro: "Normal."
    }
  }
},

{
  id: 48,
  name: "Infectious Mononucleosis",
  presentation: {
    chiefComplaint: "I've had a sore throat and swollen glands for over a week."
  },
  hidden: {
    diagnosis: "Infectious Mononucleosis",
    findings: [
      { question: "fatigue", answer: "I'm exhausted all the time." },
      { question: "throat", answer: "My throat is extremely sore." },
      { question: "glands", answer: "The glands in my neck are swollen." }
    ],
    examination: {
      vitals: "BP: 118/76, HR: 94 bpm, Temp: 38.2°C, O2: 99%",
      heent: "Enlarged tonsils with posterior cervical lymphadenopathy.",
      chest: "Normal.",
      abdomen: "Mild splenic enlargement.",
      neuro: "Normal."
    }
  }
},

{
  id: 49,
  name: "Iron Deficiency Anaemia",
  presentation: {
    chiefComplaint: "I've been unusually tired and short of breath."
  },
  hidden: {
    diagnosis: "Iron Deficiency Anaemia",
    findings: [
      { question: "fatigue", answer: "Even climbing stairs is difficult." },
      { question: "bleeding", answer: "I've had heavy periods." },
      { question: "craving", answer: "I've been craving ice recently." }
    ],
    examination: {
      vitals: "BP: 108/68, HR: 102 bpm, Temp: 36.6°C, O2: 99%",
      heent: "Conjunctival pallor.",
      chest: "Soft systolic flow murmur.",
      abdomen: "Soft.",
      neuro: "Normal."
    }
  }
},

{
  id: 50,
  name: "Hyperthyroidism",
  presentation: {
    chiefComplaint: "I've been losing weight even though I'm eating more."
  },
  hidden: {
    diagnosis: "Hyperthyroidism",
    findings: [
      { question: "weight", answer: "I've lost nearly 8 kilograms." },
      { question: "palpitations", answer: "My heart races frequently." },
      { question: "heat", answer: "I can't tolerate warm weather." }
    ],
    examination: {
      vitals: "BP: 138/78, HR: 118 bpm, Temp: 37.2°C, O2: 100%",
      heent: "Fine tremor and mild goitre.",
      chest: "Tachycardia present.",
      abdomen: "Soft.",
      neuro: "Brisk reflexes."
    }
  }
},

{
  id: 51,
  name: "Temporal Arteritis",
  presentation: {
    chiefComplaint: "I've developed a severe headache around my temple."
  },
  hidden: {
    diagnosis: "Temporal Arteritis",
    findings: [
      { question: "jaw", answer: "My jaw aches when chewing." },
      { question: "vision", answer: "My vision became blurry briefly." },
      { question: "headache", answer: "The pain is over my temple." }
    ],
    examination: {
      vitals: "BP: 136/82, HR: 88 bpm, Temp: 37.8°C, O2: 99%",
      heent: "Tender thickened temporal artery.",
      chest: "Normal.",
      abdomen: "Soft.",
      neuro: "No focal deficit."
    }
  }
},

{
  id: 52,
  name: "Carpal Tunnel Syndrome",
  presentation: {
    chiefComplaint: "My hand keeps going numb."
  },
  hidden: {
    diagnosis: "Carpal Tunnel Syndrome",
    findings: [
      { question: "night", answer: "It's worse at night." },
      { question: "thumb", answer: "My thumb and first fingers go numb." },
      { question: "shake", answer: "Shaking my hand helps." }
    ],
    examination: {
      vitals: "BP: 122/80, HR: 74 bpm, Temp: 36.6°C, O2: 100%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Normal.",
      neuro: "Positive Phalen's and Tinel's signs."
    }
  }
},

{
  id: 53,
  name: "Benign Paroxysmal Positional Vertigo",
  presentation: {
    chiefComplaint: "The room spins whenever I turn my head."
  },
  hidden: {
    diagnosis: "Benign Paroxysmal Positional Vertigo",
    findings: [
      { question: "movement", answer: "Rolling over in bed triggers it." },
      { question: "hearing", answer: "My hearing is normal." },
      { question: "vomit", answer: "It makes me feel sick." }
    ],
    examination: {
      vitals: "BP: 126/80, HR: 76 bpm, Temp: 36.5°C, O2: 100%",
      heent: "Horizontal nystagmus during Dix-Hallpike manoeuvre.",
      chest: "Normal.",
      abdomen: "Normal.",
      neuro: "Otherwise normal."
    }
  }
},

{
  id: 54,
  name: "Ectopic Pregnancy",
  presentation: {
    chiefComplaint: "I've got severe lower abdominal pain and some bleeding."
  },
  hidden: {
    diagnosis: "Ectopic Pregnancy",
    findings: [
      { question: "period", answer: "My period is late." },
      { question: "bleeding", answer: "I've had light vaginal bleeding." },
      { question: "pregnant", answer: "My pregnancy test was positive." }
    ],
    examination: {
      vitals: "BP: 94/58, HR: 118 bpm, Temp: 36.8°C, O2: 98%",
      heent: "Pale.",
      chest: "Normal.",
      abdomen: "Lower abdominal tenderness with guarding.",
      neuro: "Alert but distressed."
    }
  }
},

{
  id: 55,
  name: "Pelvic Inflammatory Disease",
  presentation: {
    chiefComplaint: "I've had lower abdominal pain and abnormal discharge."
  },
  hidden: {
    diagnosis: "Pelvic Inflammatory Disease",
    findings: [
      { question: "discharge", answer: "It's yellow and unpleasant." },
      { question: "sex", answer: "It hurts during sex." },
      { question: "fever", answer: "I've had a fever." }
    ],
    examination: {
      vitals: "BP: 116/74, HR: 104 bpm, Temp: 38.3°C, O2: 99%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Suprapubic tenderness.",
      neuro: "Normal."
    }
  }
},

{
  id: 56,
  name: "Testicular Torsion",
  presentation: {
    chiefComplaint: "I've suddenly developed severe pain in one testicle."
  },
  hidden: {
    diagnosis: "Testicular Torsion",
    findings: [
      { question: "pain", answer: "It came on suddenly." },
      { question: "vomit", answer: "I've been feeling sick." },
      { question: "injury", answer: "No injury." }
    ],
    examination: {
      vitals: "BP: 132/82, HR: 110 bpm, Temp: 36.7°C, O2: 99%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Lower abdominal discomfort.",
      neuro: "Affected testicle high-riding with absent cremasteric reflex."
    }
  }
},

{
  id: 57,
  name: "Acute Angle-Closure Glaucoma",
  presentation: {
    chiefComplaint: "I've developed severe pain in one eye."
  },
  hidden: {
    diagnosis: "Acute Angle-Closure Glaucoma",
    findings: [
      { question: "vision", answer: "Everything is blurry with halos." },
      { question: "nausea", answer: "I've been vomiting." },
      { question: "eye", answer: "The eye is extremely painful." }
    ],
    examination: {
      vitals: "BP: 140/84, HR: 94 bpm, Temp: 36.7°C, O2: 100%",
      heent: "Red eye with fixed mid-dilated pupil.",
      chest: "Normal.",
      abdomen: "Soft.",
      neuro: "Vision reduced in affected eye."
    }
  }
},

{
  id: 58,
  name: "Psoriasis",
  presentation: {
    chiefComplaint: "I've developed thick scaly patches on my skin."
  },
  hidden: {
    diagnosis: "Psoriasis",
    findings: [
      { question: "itch", answer: "Sometimes they're itchy." },
      { question: "family", answer: "My father has psoriasis." },
      { question: "elbows", answer: "It's mainly on my elbows and knees." }
    ],
    examination: {
      vitals: "BP: 120/78, HR: 72 bpm, Temp: 36.6°C, O2: 100%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Normal.",
      neuro: "Well-demarcated silvery plaques on extensor surfaces."
    }
  }
},

{
  id: 59,
  name: "Scabies",
  presentation: {
    chiefComplaint: "I've got an intensely itchy rash."
  },
  hidden: {
    diagnosis: "Scabies",
    findings: [
      { question: "night", answer: "It's much worse at night." },
      { question: "family", answer: "Other people at home are itching too." },
      { question: "hands", answer: "It's between my fingers." }
    ],
    examination: {
      vitals: "BP: 118/76, HR: 74 bpm, Temp: 36.6°C, O2: 100%",
      heent: "Normal.",
      chest: "Normal.",
      abdomen: "Normal.",
      neuro: "Burrows and excoriations in finger webs and wrists."
    }
  }
},

{
  id: 60,
  name: "Acute Kidney Injury",
  presentation: {
    chiefComplaint: "I've barely passed any urine today."
  },
  hidden: {
    diagnosis: "Acute Kidney Injury",
    findings: [
      { question: "urine", answer: "I've passed very little urine." },
      { question: "vomit", answer: "I've been vomiting for two days." },
      { question: "swelling", answer: "My ankles have started swelling." }
    ],
    examination: {
      vitals: "BP: 96/62, HR: 112 bpm, Temp: 37.0°C, O2: 98%",
      heent: "Dry mucous membranes.",
      chest: "Clear.",
      abdomen: "Soft with mild suprapubic fullness.",
      neuro: "Alert but lethargic."
    }
  }
}
];
