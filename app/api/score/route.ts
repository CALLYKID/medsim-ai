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

    const completion = await openRouter.chat.completions.create({
      model: "openai/gpt-oss-120b:free",
      temperature: 0.1,
      response_format: { type: "json_object" },
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
    return NextResponse.json(JSON.parse(rawText));
  } catch (error) {
    return NextResponse.json(
      { historyScore: 20, feedback: "Unable to process clinical history grading via evaluation engine." },
      { status: 500 }
    );
  }
}
