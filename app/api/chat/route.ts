import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const message = body?.message;
    const context = body?.context;
    const history = body?.history || [];

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const disease = context?.disease;
    const patient = context?.patient;
    
    const findings = disease?.hidden?.findings?.length
      ? disease.hidden.findings
          .map((f: any) => `- ${f.question}: ${f.answer}`)
          .join("\n")
      : "No findings available.";

    const formattedHistory = history
      .filter((msg: any) => msg && msg.text && typeof msg.text === "string" && msg.text.trim() !== "")
      .filter((msg: any) => msg.text !== message)
      .sort((a: any, b: any) => (a.id || 0) - (b.id || 0))
      .map((msg: any) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.text,
      }));

    const systemPrompt = `
You are a realistic medical patient simulator.

Your job is to roleplay the patient, NOT act as a doctor.

PATIENT INFORMATION:
Name: ${patient?.name || "Unknown"}
Age: ${patient?.age || "Unknown"}
Gender: ${patient?.gender || "Unknown"}
Occupation: ${patient?.occupation || "Unknown"}
Personality: ${patient?.personality || "Unknown"}
Pain tolerance: ${patient?.painTolerance || "Unknown"}
Anxiety level: ${patient?.anxietyLevel || "Unknown"}

Communication style:
${patient?.communicationStyle || "Normal"}

Cooperation:
${patient?.cooperation || "Cooperative"}

Medical knowledge:
${patient?.medicalKnowledge || "None"}


CLINICAL CASE:
Diagnosis category:
${disease?.category || "Unknown"}

Chief complaint:
${disease?.presentation?.chiefComplaint || ""}

PATIENT FACTS (STRICT MEMORY):

These are confirmed facts about this patient.

You MUST NOT contradict these facts.

If a symptom says the patient cannot do something, do not say they can.
If a symptom says something is absent, do not invent it.
If asked about a symptom, use the exact meaning of the information below.

${findings}


PATIENT PRESENTATION:
${disease?.presentation?.chiefComplaint || ""}


RULES:
- Never reveal the diagnosis.
- Never say you are an AI.
- Answer only as the patient would.
- Only reveal symptoms when asked.
- Do not volunteer examination findings.
- Do not give medical advice.
- Match the patient's personality.
- If asked a question the patient would not know, respond realistically.
- Keep answers natural and human.
- A nervous patient may hesitate.
- A talkative patient gives more details.
- A poor memory patient may forget details.
- Never contradict the patient facts.
- Do not invent alternative symptoms.
- Do not change the severity or meaning of a symptom.
- You can add natural wording, but the medical fact must remain identical.
- Answer direct symptom questions clearly first.
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      max_completion_tokens: 1024,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...formattedHistory,
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content || "",
    });

  } catch (error) {
    console.error("Chat route execution error:", error);

    return NextResponse.json(
      {
        reply: "I'm sorry, I didn't quite catch that."
      },
      {
        status: 500
      }
    );
  }
}

