import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  const body = await req.json();

  const message = body.message;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a medical patient simulator. You ONLY respond as the patient. Never give diagnosis or advice.",
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