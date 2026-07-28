import { NextRequest, NextResponse } from "next/server";

// Disable bufferutil native build check for ws in Termux/bundlers
process.env.WS_NO_BUFFER_UTIL = "1";

// @ts-ignore
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

export async function POST(req: NextRequest) {
  try {
    const { text, voice } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text prompt is required" }, { status: 400 });
    }

    const selectedVoice = voice || "en-GB-SoniaNeural";

    const tts = new MsEdgeTTS();
    await tts.setMetadata(selectedVoice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const { audioStream } = tts.toStream(text);

    const chunks: Uint8Array[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": audioBuffer.length.toString(),
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("Edge TTS Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to synthesize voice using Edge TTS", details: error.message },
      { status: 500 }
    );
  }
}
