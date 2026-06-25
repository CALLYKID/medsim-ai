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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  },

  {
    id: 13,
    name: "Diabetes Ketoacidosis",
    presentation: {
      chiefComplaint: "Feeling very unwell and thirsty."
    },
    hidden: {
      diagnosis: "Diabetic Ketoacidosis",
      findings: [
        { question: "thirst", answer: "Extreme thirst." },
        { question: "urine", answer: "Frequent urination." },
        { question: "breath", answer: "Fruity-smelling breath." }
      ]
    }
  },

  {
    id: 14,
    name: "Hypertension Crisis",
    presentation: {
      chiefComplaint: "Severe headache and dizziness."
    },
    hidden: {
      diagnosis: "Hypertensive Crisis",
      findings: [
        { question: "headache", answer: "Severe pressure headache." },
        { question: "vision", answer: "Blurred vision." },
        { question: "chest", answer: "Chest discomfort." }
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  }
];