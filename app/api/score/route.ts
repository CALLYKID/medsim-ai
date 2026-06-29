import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.MEDSIMAIANALYSIS;

const ai = new GoogleGenAI({
  apiKey: apiKey || "",
});

export async function POST(req: Request) {
  if (!apiKey) {
    console.error("CRITICAL ERROR: MEDSIMAIANALYSIS environment variable is missing.");
    return NextResponse.json({
      historyScore: 20,
      feedback: "System calibration error: Medical grading engine credentials are unconfigured on live host."
    });
  }

  try {
    const body = await req.json();
    const { investigationSummary, chiefComplaint, correctDiagnosis, finalDiagnosis } = body;

    const prompt = `
You are an expert medical school objective clinical examiner grading a student's history-taking performance.

CASE PROFILE:
- Patient Chief Complaint: "${chiefComplaint}"
- Actual Underlying Diagnosis: "${correctDiagnosis}"
- Student's Submitted Diagnosis: "${finalDiagnosis}"

STUDENT'S CLINICAL INVESTIGATION SUMMARY:
${investigationSummary}

TASK:
Evaluate the history-taking question transcript out of 40 points total.
Consider:
- Relevancy: Did they ask questions targeting the chief complaint and filtering key differentials?
- Efficiency: Did they follow a logical clinical path without wasting time on unrelated systems?
`.trim();

    // CORRECT METHOD: ai.models.generateContent with native JSON-Schema structural definition
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            historyScore: {
              type: "INTEGER",
              description: "An integer score from 0 to 40 based on history-taking quality.",
            },
            feedback: {
              type: "STRING",
              description: "A concise 2-sentence piece of feedback explaining why they received this score.",
            },
          },
          required: ["historyScore", "feedback"],
        },
      },
    });

    const rawText = response.text ? response.text.trim() : "{}";
    const data = JSON.parse(rawText);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Gemini Grading Error:", error);
    return NextResponse.json(
      { historyScore: 20, feedback: "Unable to process clinical history grading via Gemini engine." },
      { status: 500 }
    );
  }
}
