import { Disease } from "./diseaseLibrary";
import {
  maleFirstNames,
  femaleFirstNames,
  lastNames,
  occupations,
  personalities,
  painTolerance,
  anxietyLevels
} from "./generator";

export type Patient = {
  name:string;
  age:number;
  gender:"Male"|"Female";
  occupation:string;
  personality:string;
  painTolerance:string;
  anxietyLevel:number;

  education:string;
  communicationStyle:string;
  cooperation:string;
  medicalKnowledge:string;
  memory:string;

  disease:Disease;
};

function randomItem<T>(array:T[]):T{
  return array[Math.floor(Math.random()*array.length)];
}

function generateAge(disease:Disease):number{
  if(disease.patientProfile){
    const [min,max]=disease.patientProfile.ageRange;
    return Math.floor(Math.random()*(max-min+1))+min;
  }

  return Math.floor(Math.random()*70)+18;
}

function generateGender(disease: Disease): "Male" | "Female" {
  if (disease.patientProfile?.gender === "Male") {
    return "Male";
  }

  if (disease.patientProfile?.gender === "Female") {
    return "Female";
  }

  return Math.random() > 0.5 ? "Male" : "Female";
}


function generateName(gender:"Male"|"Female"){
  const firstName =
    gender==="Male"
    ? randomItem(maleFirstNames)
    : randomItem(femaleFirstNames);

  const surname=randomItem(lastNames);

  return `${firstName} ${surname}`;
}

export function generatePatient(disease:Disease):Patient{

  const gender=generateGender(disease);

  return {
  name:generateName(gender),
  age:generateAge(disease),
  gender,
  occupation:randomItem(occupations),
  personality:randomItem(personalities),
  painTolerance:randomItem(painTolerance),
  anxietyLevel:randomItem(anxietyLevels),

  education: randomItem([
    "No formal education",
    "High School",
    "College",
    "University"
  ]),

  communicationStyle: randomItem([
    "Very Brief",
    "Normal",
    "Talkative",
    "Rambling"
  ]),

  cooperation: randomItem([
    "Cooperative",
    "Guarded",
    "Defensive",
    "Impatient"
  ]),

  medicalKnowledge: randomItem([
    "None",
    "Basic",
    "Average",
    "Healthcare Worker"
  ]),

  memory: randomItem([
    "Excellent",
    "Average",
    "Poor"
  ]),

  disease
};
}