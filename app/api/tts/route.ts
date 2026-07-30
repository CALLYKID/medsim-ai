import { NextRequest, NextResponse } from "next/server";

// Ensure Node.js runtime compatibility for streaming and buffer operations
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

process.env.WS_NO_BUFFER_UTIL = "1";

// @ts-ignore
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { text, voice } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Valid text prompt is required" }, { status: 400 });
    }

    // Limit text length to prevent abuse, excessive resource usage, and timeouts
    const sanitizedText = text.trim().slice(0, 500);
    const selectedVoice = voice || "en-GB-SoniaNeural";

    const tts = new MsEdgeTTS();
    await tts.setMetadata(selectedVoice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const { audioStream } = tts.toStream(sanitizedText);

    // Transform Node.js readable stream to a Web Standard ReadableStream
    // This allows immediate streaming to the client without waiting to buffer the whole audio
    const webStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of audioStream) {
            controller.enqueue(chunk);
          }
          controller.close();
        } catch (streamError) {
          controller.error(streamError);
        }
      },
    });

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache identical phrases to save compute
      },
    });
  } catch (error: any) {
    console.error("Edge TTS Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to synthesize voice using Edge TTS", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

