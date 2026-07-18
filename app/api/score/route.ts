import { NextResponse } from "next/server";
import OpenAI from "openai";

const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

export async function POST(req: Request) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({
      historyScore: 20,
      feedback: "System calibration error: OpenRouter credentials unconfigured on live host."
    });
  }

  try {
    const body = await req.json();
    const { investigationSummary, chiefComplaint, correctDiagnosis, finalDiagnosis } = body;

    const prompt = `You are an expert medical school objective clinical examiner grading a student's history-taking performance.

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
}`;

    const completion = await openRouter.chat.completions.create({
      model: "google/gemini-2.5-flash",
      temperature: 0.1,
      max_tokens: 256,
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

    let rawText = completion.choices[0].message.content ? completion.choices[0].message.content.trim() : "{}";

    // Clean out any accidental markdown wrapper syntax (```json ... ```) safely
    if (rawText.startsWith("```")) {
      const firstLineBreak = rawText.indexOf("\n");
      if (firstLineBreak !== -1) {
        rawText = rawText.substring(firstLineBreak + 1);
      } else {
        rawText = rawText.replace(/```/g, "");
      }
      
      if (rawText.endsWith("```")) {
        rawText = rawText.substring(0, rawText.length - 3);
      }
      rawText = rawText.trim();
    }

    const data = JSON.parse(rawText);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Grading route error:", error);
    return NextResponse.json(
      { historyScore: 20, feedback: "Unable to process clinical history grading via evaluation engine." },
      { status: 500 }
    );
  }
}
