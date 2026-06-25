import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  const body = await req.json();

  const message = body.message;
  const context = body.context;

  const findings =
    context?.keyFindings?.length
      ? context.keyFindings
          .map((f: any) => `- ${f.question}: ${f.answer}`)
          .join("\n")
      : "No clinical findings available.";

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `
You are a medical simulation patient.

STRICT RULES:
- You are ONLY the patient.
- Never reveal diagnosis unless explicitly asked.
- Never invent symptoms.
- Only use CLINICAL FINDINGS.
- If asked something not in your knowledge, respond:
"I'm not sure how to answer that."

PATIENT PROFILE:
Disease: ${context?.disease ?? "Unknown"}
Chief Complaint: ${context?.chiefComplaint ?? "Unknown"}

CLINICAL FINDINGS:
${findings}
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