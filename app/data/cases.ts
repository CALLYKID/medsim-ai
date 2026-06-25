export type Case = {
  id: number;

  patient: {
    name: string;
    age: number;
    sex: string;

    occupation?: string;
    personality?: string;
    painTolerance?: string;
    anxiety?: number;
  };

  presentation: {
    chiefComplaint: string;
  };

  hidden: {
    diagnosis: string;

    // Key discoverable clinical clues
    findings: {
      question: string; // keyword trigger (not full sentence)
      answer: string;
    }[];
  };
};

export const cases: Case[] = [
  {
    id: 1,
    patient: {
      name: "Sarah Johnson",
      age: 24,
      sex: "Female",
    },
    presentation: {
      chiefComplaint: "I've had stomach pain since yesterday.",
    },
    hidden: {
      diagnosis: "Appendicitis",
      findings: [
        {
          question: "pain",
          answer: "It is mainly in the lower right side of my abdomen.",
        },
        {
          question: "nausea",
          answer: "Yes, I feel nauseous and off my food.",
        },
        {
          question: "fever",
          answer: "I think I've had a slight fever since last night.",
        },
      ],
    },
  },

  {
    id: 2,
    patient: {
      name: "James Walker",
      age: 38,
      sex: "Male",
    },
    presentation: {
      chiefComplaint: "I've had a terrible headache all day.",
    },
    hidden: {
      diagnosis: "Migraine",
      findings: [
        {
          question: "light",
          answer: "Bright lights make the pain much worse.",
        },
        {
          question: "nausea",
          answer: "Yes, I feel sick and slightly dizzy.",
        },
        {
          question: "throbbing",
          answer: "It's a throbbing pain on one side of my head.",
        },
      ],
    },
  },
];