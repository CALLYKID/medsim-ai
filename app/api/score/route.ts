import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.MEDSIMAIANALYSIS!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { questionHistory, chiefComplaint, correctDiagnosis, finalDiagnosis } = body;

    const prompt = `
You are an expert medical school objective clinical examiner grading a student's history-taking performance.

CASE PROFILE:
- Patient Chief Complaint: "${chiefComplaint}"
- Actual Underlying Diagnosis: "${correctDiagnosis}"
- Student's Submitted Diagnosis: "${finalDiagnosis}"

STUDENT'S INTERVIEW TRANSCRIPT (QUESTIONS ASKED):
${JSON.stringify(questionHistory, null, 2)}

TASK:
Evaluate the history-taking question transcript out of 40 points total.
Consider:
- Relevancy: Did they ask questions targeting the chief complaint and filtering key differentials?
- Efficiency: Did they follow a logical clinical path without wasting time on unrelated systems?

You must respond STRICTLY in the following JSON format. Do not write any regular markdown prose, explanations, or code blocks.
{
  "historyScore": number (an integer from 0 to 40),
  "feedback": "A concise 2-sentence piece of feedback explaining why they received this score and what high-yield history question they missed."
}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const data = JSON.parse(completion.choices[0].message.content || "{}");
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { historyScore: 20, feedback: "Unable to process clinical history grading via LLM engine." },
      { status: 500 }
    );
  }
}
