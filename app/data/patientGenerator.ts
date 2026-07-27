import { Disease } from "./diseaseLibrary";
import { classifyDisease } from "./diseaseClassifier";
import { generateLearningPoints } from "./learningPointGenerator";
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

  ethnicity?:string;
  bmi?:string;
  smoking?:boolean;
  alcohol?:boolean;

  anxietyLevel:number;

  education:string;
  communicationStyle:string;
  cooperation:string;
  medicalKnowledge:string;
  memory:string;
  learningPoints:string[];

  socialHistory?:string;

  disease:Disease;
};


function randomItem<T>(array:T[]):T{
  return array[Math.floor(Math.random()*array.length)];
}


function generateAge(disease:Disease):number{

  if(disease.patientProfile){

    const [min,max]=disease.patientProfile.ageRange;

    return Math.floor(
      Math.random()*(max-min+1)
    )+min;
  }

  return Math.floor(Math.random()*70)+18;
}


function generateGender(disease:Disease):"Male"|"Female"{

  if(disease.patientProfile?.gender){
    return disease.patientProfile.gender;
  }

  return Math.random()>0.5
  ?"Male"
  :"Female";
}


function generateName(gender:"Male"|"Female"){

  const firstName =
    gender==="Male"
    ? randomItem(maleFirstNames)
    : randomItem(femaleFirstNames);

  const surname=randomItem(lastNames);

  return `${firstName} ${surname}`;
}


function generateEducation(disease:Disease){

  if(disease.patientProfile?.education){
    return disease.patientProfile.education;
  }

  return randomItem([
    "No formal education",
    "High School",
    "College",
    "University"
  ]);
}


function generateOccupation(disease:Disease){

  if(disease.patientProfile?.occupation){
    return disease.patientProfile.occupation;
  }

  return randomItem(occupations);
}


function generatePersonality(disease:Disease){

  if(disease.patientProfile?.personality){
    return disease.patientProfile.personality;
  }

  return randomItem(personalities);
}


function generatePainTolerance(disease:Disease){

  if(disease.patientProfile?.painTolerance){
    return disease.patientProfile.painTolerance;
  }

  return randomItem(painTolerance);
}


function generateAnxiety(disease:Disease){

  if(disease.patientProfile?.anxietyLevel){
    return disease.patientProfile.anxietyLevel;
  }

  return randomItem(anxietyLevels);
}


function generateCommunicationStyle(disease:Disease){

  if(disease.patientProfile?.languageStyle){

    switch(disease.patientProfile.languageStyle){

      case "Formal":
        return "Formal";

      case "Very Casual":
        return "Very Casual";

      default:
        return "Normal";
    }
  }


  return randomItem([
    "Very Brief",
    "Normal",
    "Talkative",
    "Rambling"
  ]);
}


function generateCooperation(disease:Disease){

  if(disease.patientProfile?.cooperativeness){

    if(disease.patientProfile.cooperativeness>=8){
      return "Cooperative";
    }

    if(disease.patientProfile.cooperativeness<=3){
      return "Defensive";
    }
  }


  return randomItem([
    "Cooperative",
    "Guarded",
    "Defensive",
    "Impatient"
  ]);
}



export function generatePatient(disease:Disease):Patient{


  const gender=generateGender(disease);


  return {

    name:generateName(gender),

    age:generateAge(disease),

    gender,


    occupation:
    generateOccupation(disease),


    personality:
    generatePersonality(disease),


    painTolerance:
    generatePainTolerance(disease),


    ethnicity:
    disease.patientProfile?.ethnicity,


    bmi:
    disease.patientProfile?.bmi,


    smoking:
    disease.patientProfile?.smoking,


    alcohol:
    disease.patientProfile?.alcohol,


    anxietyLevel:
    generateAnxiety(disease),



    education:
    generateEducation(disease),



    communicationStyle:
    generateCommunicationStyle(disease),



    cooperation:
    generateCooperation(disease),



    medicalKnowledge:
    randomItem([
      "None",
      "Basic",
      "Average",
      "Healthcare Worker"
    ]),



    memory:
    randomItem([
      "Excellent",
      "Average",
      "Poor"
    ]),



    socialHistory:
    disease.patientProfile?.socialHistory,
    learningPoints: generateLearningPoints(disease),

    disease:{
  ...disease,
  category: classifyDisease(disease.name)
}

  };

}