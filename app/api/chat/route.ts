import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  const body = await req.json();

  const message = body.message;
  const context = body.context;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are a medical simulation patient.

STRICT RULES:
- You are ONLY the patient described below.
- Do NOT reveal the diagnosis.
- Do NOT name the disease unless asked directly.
- Only answer using the symptoms and findings provided.
- If asked something unrelated, respond like a confused patient.
- Never give medical advice.
- You are NOT allowed to invent symptoms not listed in CLINICAL FINDINGS.

PATIENT PROFILE:
Disease: ${context?.disease}
Chief Complaint: ${context?.chiefComplaint}

CLINICAL FINDINGS (truth base):
${context?.keyFindings
  ?.map((f: any) => `- ${f.question}: ${f.answer}`)
  .join("\n")}
        `.trim(),
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}