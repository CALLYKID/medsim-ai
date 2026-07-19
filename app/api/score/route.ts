import { NextResponse } from "next/server";
import OpenAI from "openai";

const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "",
});

export async function POST(req: Request) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({
      historyScore: 25,
      feedback: "System calibration error: OpenRouter credentials unconfigured on live host."
    });
  }

  try {
    const body = await req.json();
    const { 
      investigationSummary, 
      chiefComplaint, 
      correctDiagnosis, 
      finalDiagnosis,
      // NEW PARAMS FROM THE UPDATED LABS PAGE:
      differentials,
      performedExamsCount
    } = body;

        const prompt = `You are an expert medical school objective clinical examiner grading a student's history-taking performance during an OSCE simulation.

CASE PROFILE:
- Patient Chief Complaint: "${chiefComplaint}"
- Actual Underlying Diagnosis: "${correctDiagnosis}"

STUDENT'S CLINICAL CLERKSHIP PERFORMANCE:
- Primary Final Diagnosis Submitted: "${finalDiagnosis}"
- Working Differential Board (DDx): [ ${differentials ? differentials.join(", ") : "None entered"} ]
- Number of Physical Systems Examined: ${performedExamsCount || 0} / 5
- Question & Answer Chat Transcript Context: ${investigationSummary}

TASK:
Evaluate the history-taking chat component out of 40 points total. Use the student's working differentials and physical exams to contextually understand their questioning strategy.

SCORING CRITERIA (40 Points Max):
1. Relevancy & Strategy (Up to 20 pts): Did their history questions align with ruling in/out the diseases they listed on their DDx board? If their questions seem random but align with a listed differential, award higher points for strategic tracking.
2. Efficiency & Clinical Flow (Up to 20 pts): Did they follow a logical path based on the chief complaint? Deduct points if they repeated questions, asked completely irrelevant questions outside their DDx scope, or failed to explore the presenting symptom.

OUTPUT SPECIFICATION:
Provide a score for the history-taking part only. Then write a highly customized, concise 2-sentence feedback string referencing their overall approach. Acknowledge if their differentials correctly guided their questioning.

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
      { historyScore: 25, feedback: "Unable to process clinical history grading via evaluation engine." },
      { status: 500 }
    );
  }
}
