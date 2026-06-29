export type Disease = {
  id: number;
  name: string;
  presentation: {
    chiefComplaint: string;
  };
  hidden: {
    diagnosis: string;
    findings: {
      question: string;
      answer: string;
    }[];
    // This tells TypeScript every case MUST have this data
    examination: {
      vitals: string;
      heent: string;
      chest: string;
      abdomen: string;
      neuro: string;
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
  }
];
