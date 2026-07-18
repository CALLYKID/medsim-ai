import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
const message = body.message;
const context = body.context;
const history = body.history || []; 

const findings = context?.keyFindings?.length
  ? context.keyFindings.map((f: any) => `- ${f.question}: ${f.answer}`).join("\n")
  : "No clinical findings available.";

// Clean and deduplicate history to ensure structural chronological consistency
const formattedHistory = history
  .filter((msg: any) => msg && msg.text && msg.text.trim() !== "")
  .filter((msg: any) => msg.text !== message) // Stop current question doubling duplication
  .sort((a: any, b: any) => a.id - b.id) // Chronological ascending order
  .map((msg: any) => ({
    role: msg.role === "user" ? "user" : "assistant",
    content: msg.text,
  }));

    // 2. Call Groq directly using their native model identifier from your console
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b", 
      max_completion_tokens: 1024, 
      messages: [
        {
          role: "system",
          content: context,
        },
        ...formattedHistory, 
        {
          role: "user",
          content: message, 
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content || "",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ reply: "I'm sorry, I didn't quite catch that." }, { status: 500 });
  }
}
