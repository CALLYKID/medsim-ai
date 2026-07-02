import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

const groq = new Groq({
  apiKey: apiKey || "",
});

console.log("Score endpoint called via Groq", Date.now());

export async function POST(req: Request) {
  if (!apiKey) {
    console.error("CRITICAL ERROR: GROQ_API_KEY environment variable is missing.");
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
- Relevancy (up to 20 pts): Did they ask questions targeting the chief complaint and filtering key differentials?
- Efficiency (up to 20 pts): Did they follow a logical clinical path without wasting time on unrelated systems?

OUTPUT SPECIFICATION:
You must respond with a strictly valid JSON object matching this exact format:
{
  "historyScore": <integer between 0 and 40>,
  "feedback": "<concise 2-sentence feedback string>"
}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "GPT OSS 120B / Qwen3.6 27B",
      temperature: 0.1, // Low temperature enforces strict rule adherence
      response_format: { type: "json_object" }, // Guarantees structural JSON compilation
      messages: [
        {
          role: "system",
          content: "You are a rigid grading engine that outputs nothing but structured JSON strings.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawText = completion.choices[0].message.content ? completion.choices[0].message.content.trim() : "{}";
    const data = JSON.parse(rawText);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Groq Grading Error:");
    console.error(error);

    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
    }
    return NextResponse.json(
      { historyScore: 20, feedback: "Unable to process clinical history grading via Groq engine." },
      { status: 500 }
    );
  }
}
