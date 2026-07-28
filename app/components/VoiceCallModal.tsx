"use client";

import { useState, useEffect, useRef } from "react";
import type { Patient } from "../data/patientGenerator";

// Patient Avatar Assets Mapping
export const patientAvatars = {
  male: {
    young: "/avatars/male_young.png",
    adult: "/avatars/male_adult.png",
    middle: "/avatars/male_middle.png",
    senior: "/avatars/male_senior.png",
  },
  female: {
    young: "/avatars/female_young.png",
    adult: "/avatars/female_adult.png",
    middle: "/avatars/female_middle.png",
    senior: "/avatars/female_senior.png",
  }
};

export function getPatientAvatar(sex: string, age: number): string {
  const genderMap = sex?.toLowerCase() === "male" ? patientAvatars.male : patientAvatars.female;
  if (age <= 25) return genderMap.young;
  if (age <= 50) return genderMap.adult;
  if (age <= 65) return genderMap.middle;
  return genderMap.senior;
}

interface VoiceCallModalProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (text: string) => Promise<string | void>;
}

export default function VoiceCallModal({
  patient,
  isOpen,
  onClose,
  onSendMessage,
}: VoiceCallModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [statusText, setStatusText] = useState("Connected");
  const recognitionRef = useRef<any>(null);

  // Call timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      setCallDuration(0);
      timer = setInterval(() => setCallDuration((prev) => prev + 1), 1000);
      setupSpeechRecognition();
    } else {
      stopVoice();
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  // 1. WebSpeech Speech-to-Text Setup
  function setupSpeechRecognition() {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setStatusText("Listening to practitioner...");
      };

      recognitionRef.current.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        setStatusText("Processing clinical response...");
        
        // Send user transcript to Groq/LLM
        const reply = await onSendMessage(transcript);
        if (reply) {
          speakPatientResponse(reply);
        } else {
          setStatusText("Connected");
        }
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setStatusText("Connected");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }

  const togglePushToTalk = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else if (recognitionRef.current && !isMuted) {
      recognitionRef.current.start();
    }
  };

  // 2. Play Audio via Edge TTS with WebSpeech Fallback
  async function speakPatientResponse(text: string) {
    setIsSpeaking(true);
    setStatusText(`${patient.name} is speaking...`);

    // Pick dynamic voice based on demographics
    let voice = "en-GB-SoniaNeural";
    if (patient.gender?.toLowerCase() === "male") {
      voice = patient.age > 60 ? "en-GB-ThomasNeural" : "en-GB-RyanNeural";
    } else {
      voice = patient.age > 60 ? "en-GB-LibbyNeural" : "en-GB-MaisieNeural";
    }

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsSpeaking(false);
        setStatusText("Connected");
      };

      audio.play();
    } catch (e) {
      // Fallback to Native Browser WebSpeech API
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
          setIsSpeaking(false);
          setStatusText("Connected");
        };
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
        setStatusText("Connected");
      }
    }
  }

  function stopVoice() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
    setIsSpeaking(false);
    setIsListening(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-[fadeIn_0.2s_ease-out]">
      <div className="w-full max-w-md rounded-3xl bg-[#0b111e] border border-slate-800 p-6 flex flex-col items-center justify-between min-h-[500px] shadow-[0_0_80px_rgba(15,23,42,0.9)] relative overflow-hidden">
        
        {/* Call Header */}
        <div className="w-full flex justify-between items-center text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            ENCRYPTED CLINICAL CALL
          </span>
          <span>{formatDuration(callDuration)}</span>
        </div>

        {/* Patient Profile & Pulse Graphic */}
        <div className="flex flex-col items-center my-auto space-y-4 relative">
          <div className="relative">
            {/* Animated Audio Ring */}
            {(isSpeaking || isListening) && (
              <div className={`absolute -inset-4 rounded-full opacity-50 animate-ping ${isSpeaking ? "bg-indigo-500" : "bg-emerald-500"}`} />
            )}
            
            <div className="relative w-28 h-28 rounded-full border-2 border-indigo-500/40 p-1 bg-slate-900 overflow-hidden shadow-2xl">
              <img
                src={getPatientAvatar(patient.gender, patient.age)}
                alt={patient.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-extrabold text-white">{patient.name}</h3>
            <p className="text-xs text-indigo-400 font-mono mt-1 uppercase tracking-wider">{statusText}</p>
          </div>
        </div>

        {/* Call Control Action Bar */}
        <div className="w-full flex items-center justify-center gap-6 pt-4 border-t border-slate-800/80">
          
          {/* Mute Mic Button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full border transition-all active:scale-95 ${
              isMuted
                ? "bg-rose-500/20 border-rose-500/40 text-rose-400"
                : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
              {isMuted ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.41 0-.75-.34-.75-.75V9.75c0-.41.34-.75.75-.75h4.49Z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              )}
            </svg>
          </button>

          {/* Push-to-Talk / Mic Button */}
          <button
            onClick={togglePushToTalk}
            disabled={isMuted || isSpeaking}
            className={`p-5 rounded-full border transition-all shadow-lg active:scale-95 ${
              isListening
                ? "bg-emerald-500 border-emerald-400 text-slate-950 animate-pulse shadow-emerald-500/40"
                : "bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500 shadow-indigo-600/30"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
          </button>

          {/* End Call Button */}
          <button
            onClick={() => {
              stopVoice();
              onClose();
            }}
            className="p-4 rounded-full bg-rose-600 border border-rose-500 text-white hover:bg-rose-500 transition-all active:scale-95 shadow-lg shadow-rose-600/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.41 0-.75-.34-.75-.75V9.75c0-.41.34-.75.75-.75h4.49Z" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
}
