"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  },
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

type CallState = "CONNECTING" | "CONNECTED" | "LISTENING" | "PROCESSING" | "SPEAKING" | "DISCONNECTING";

export default function VoiceCallModal({
  patient,
  isOpen,
  onClose,
  onSendMessage,
}: VoiceCallModalProps) {
  // Call State Engine
  const [callState, setCallState] = useState<CallState>("CONNECTING");
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [lastTranscript, setLastTranscript] = useState<string>("");

  const recognitionRef = useRef<any>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const onSendMessageRef = useRef(onSendMessage);
  useEffect(() => {
    onSendMessageRef.current = onSendMessage;
  }, [onSendMessage]);

  // Audio Canvas Visualizer Renderer
  const drawVisualizer = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 24;
      const barWidth = 4;
      const gap = 6;
      const totalWidth = barCount * (barWidth + gap);
      let startX = (canvas.width - totalWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * 2] || 0;
        const barHeight = Math.max(4, (value / 255) * canvas.height * 0.8);

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        if (callState === "SPEAKING") {
          gradient.addColorStop(0, "rgba(99, 102, 241, 0.2)");
          gradient.addColorStop(0.5, "rgba(129, 140, 248, 0.8)");
          gradient.addColorStop(1, "rgba(199, 210, 254, 1)");
        } else {
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)");
          gradient.addColorStop(0.5, "rgba(52, 211, 153, 0.8)");
          gradient.addColorStop(1, "rgba(167, 243, 208, 1)");
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(startX, (canvas.height - barHeight) / 2, barWidth, barHeight, 20);
        ctx.fill();

        startX += barWidth + gap;
      }
    };

    render();
  }, [callState]);

  // Stop Audio Playback
  const stopAudio = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Teardown voice recognition & audio
  const stopVoice = useCallback(() => {
    stopAudio();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // Safe catch
      }
    }
  }, [stopAudio]);

  // Handle End Call Sequence
  const handleEndCall = useCallback(() => {
    setCallState("DISCONNECTING");
    stopVoice();

    // Smooth teardown delay to give actual ending feedback
    setTimeout(() => {
      onClose();
    }, 800);
  }, [stopVoice, onClose]);

  // Speak Patient TTS Response with Web Audio Analyser
  const speakPatientResponse = useCallback(
    async (text: string) => {
      stopAudio();
      setCallState("SPEAKING");

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

        if (!res.ok) throw new Error("TTS Route Failed");

        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        currentAudioRef.current = audio;

        // Apply audio volume based on speaker state toggle
        audio.volume = isSpeakerOn ? 1.0 : 0.4;

        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          if (!audioContextRef.current) {
            audioContextRef.current = new AudioCtx();
          }
          const ctx = audioContextRef.current;
          if (ctx.state === "suspended") {
            await ctx.resume();
          }

          const source = ctx.createMediaElementSource(audio);
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          analyser.connect(ctx.destination);
          analyserRef.current = analyser;

          drawVisualizer();
        }

        audio.onended = () => {
          setCallState("CONNECTED");
          URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
          setCallState("CONNECTED");
        };

        await audio.play();
      } catch (e) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.onend = () => {
            setCallState("CONNECTED");
          };
          utterance.onerror = () => {
            setCallState("CONNECTED");
          };
          window.speechSynthesis.speak(utterance);
        } else {
          setCallState("CONNECTED");
        }
      }
    },
    [patient, stopAudio, drawVisualizer, isSpeakerOn]
  );

  const speakResponseRef = useRef(speakPatientResponse);
  useEffect(() => {
    speakResponseRef.current = speakPatientResponse;
  }, [speakPatientResponse]);

  // Adjust volume dynamically if user toggles Speaker mode during call
  useEffect(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.volume = isSpeakerOn ? 1.0 : 0.4;
    }
  }, [isSpeakerOn]);

  // Lock background scrolling while modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Initialize Speech Recognition & Call Lifecycle
  useEffect(() => {
    if (!isOpen) {
      stopVoice();
      return;
    }

    setCallDuration(0);
    setLastTranscript("");
    setIsMuted(false);
    setCallState("CONNECTING");

    // Establish Call Connection simulation
    const connectTimer = setTimeout(() => {
      setCallState("CONNECTED");
    }, 1200);

    const durationTimer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
          setCallState("LISTENING");
        };

        recognition.onresult = async (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join("");

          setLastTranscript(transcript);

          if (event.results[0].isFinal) {
            setCallState("PROCESSING");
            const reply = await onSendMessageRef.current(transcript);
            if (reply) {
              speakResponseRef.current(reply);
            } else {
              setCallState("CONNECTED");
            }
          }
        };

        recognition.onerror = (event: any) => {
          if (event.error === "aborted") {
            setCallState("CONNECTED");
            return;
          }
          console.error("Speech Recognition Error:", event.error);
          setCallState("CONNECTED");
        };

        recognition.onend = () => {
          if (callState === "LISTENING") {
            setCallState("CONNECTED");
          }
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      clearTimeout(connectTimer);
      clearInterval(durationTimer);
      stopVoice();
    };
  }, [isOpen, stopVoice]);

  // Handle Mute Action
  const toggleMute = () => {
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);

    if (nextMuteState && callState === "LISTENING") {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // Safe catch
      }
      setCallState("CONNECTED");
    }
  };

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remaining.toString().padStart(2, "0")}`;
  };

  const togglePushToTalk = () => {
    if (callState === "DISCONNECTING" || isMuted) return;

    if (callState === "LISTENING") {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // Safe catch
      }
      setCallState("CONNECTED");
    } else if (recognitionRef.current) {
      stopAudio();
      try {
        recognitionRef.current.start();
      } catch (e) {
        // Safe catch
      }
    }
  };

  // Helper status text formatter based on active Call State Engine
  const getDisplayStatus = () => {
    if (isMuted) return "MICROPHONE MUTED";
    switch (callState) {
      case "CONNECTING":
        return "INITIALIZING LINK...";
      case "LISTENING":
        return "LISTENING...";
      case "PROCESSING":
        return "PROCESSING RESPONSE...";
      case "SPEAKING":
        return `${patient.name.split(" ")[0].toUpperCase()} IS SPEAKING...`;
      case "DISCONNECTING":
        return "DISCONNECTING CALL...";
      default:
        return "ENCRYPTED CALL CONNECTED";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-screen w-screen z-[9999] flex items-center justify-center p-4 md:p-6 bg-[#030712] select-none overflow-hidden">
      
      {/* Dynamic Background Lighting Meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-35 transition-all duration-1000 ${
            callState === "SPEAKING"
              ? "bg-indigo-600 scale-125"
              : callState === "LISTENING"
              ? "bg-emerald-500 scale-110"
              : callState === "DISCONNECTING"
              ? "bg-rose-600 scale-125 opacity-45"
              : "bg-blue-600/40 scale-90"
          }`}
        />
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full blur-[90px] opacity-25 transition-all duration-1000 ${
            callState === "SPEAKING" ? "bg-cyan-400" : callState === "LISTENING" ? "bg-teal-300" : "bg-indigo-500/20"
          }`}
        />
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-lg rounded-[2.5rem] bg-[#090d16]/85 border border-slate-800/80 p-8 flex flex-col items-center justify-between min-h-[590px] shadow-[0_0_80px_rgba(0,0,0,0.95)] relative overflow-hidden backdrop-blur-2xl backdrop-saturate-200">
        
        {/* Top Header Status Pills */}
        <div className="w-full flex justify-between items-center text-[11px] font-mono tracking-wider text-slate-400 z-10">
          <div className="flex items-center gap-2.5 bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800/80 shadow-inner">
            <span
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                callState === "DISCONNECTING"
                  ? "bg-rose-500"
                  : callState === "SPEAKING"
                  ? "bg-indigo-400 animate-pulse"
                  : callState === "LISTENING"
                  ? "bg-emerald-400 animate-ping"
                  : "bg-emerald-500"
              }`}
            />
            <span className="text-slate-300 font-semibold tracking-widest">PATIENT CALL SESSION</span>
          </div>

          <div className="bg-slate-950/80 px-4 py-2 rounded-full border border-slate-800/80 text-slate-300 font-bold tracking-widest shadow-inner">
            {formatDuration(callDuration)}
          </div>
        </div>

        {/* Patient Profile Avatar & Spectrum Renderer */}
        <div className="flex flex-col items-center my-auto space-y-6 relative z-10 w-full">
          <div className="relative flex items-center justify-center">
            
            {/* Dynamic Halo Glow Ring */}
            <div
              className={`absolute -inset-5 rounded-full blur-md opacity-40 transition-all duration-500 ${
                callState === "SPEAKING"
                  ? "bg-gradient-to-tr from-indigo-500 to-cyan-400 animate-pulse"
                  : callState === "LISTENING"
                  ? "bg-gradient-to-tr from-emerald-400 to-teal-200 animate-pulse"
                  : callState === "DISCONNECTING"
                  ? "bg-rose-500/50"
                  : "bg-transparent"
              }`}
            />

            <div className="relative w-36 h-36 rounded-full border-2 border-slate-700/80 p-1.5 bg-slate-950 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
              <img
                src={getPatientAvatar(patient.gender, patient.age)}
                alt={patient.name}
                className={`w-full h-full object-cover rounded-full filter transition-all duration-500 ${
                  callState === "DISCONNECTING" ? "brightness-50 grayscale" : "brightness-105"
                }`}
              />
            </div>
          </div>

          {/* Patient Details & Dynamic Engine Status */}
          <div className="text-center space-y-1.5">
            <h3 className="text-2xl font-black text-white tracking-tight">{patient.name}</h3>
            <p className={`text-[11px] font-mono tracking-[0.2em] font-semibold transition-colors duration-300 ${
              isMuted ? "text-amber-400" : callState === "DISCONNECTING" ? "text-rose-400" : "text-indigo-400/90"
            }`}>
              {getDisplayStatus()}
            </p>
          </div>

          {/* Real-time Spectrum Visualizer Canvas */}
          <div className="h-10 w-full flex items-center justify-center pt-1">
            <canvas ref={canvasRef} width={240} height={40} className="w-[240px] h-[40px]" />
          </div>

          {/* Subtitle Transcripts Box */}
          {lastTranscript && callState !== "DISCONNECTING" && (
            <div className="w-full px-4 animate-[fadeIn_0.3s_ease-out]">
              <div className="bg-slate-950/70 border border-slate-800/90 rounded-2xl p-3.5 text-xs text-slate-200 text-center font-sans tracking-wide leading-relaxed shadow-lg backdrop-blur-md">
                "{lastTranscript}"
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Hardware Controls Suite */}
        <div className="w-full flex items-center justify-center gap-5 pt-6 border-t border-slate-800/60 z-10">
          
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            disabled={callState === "DISCONNECTING"}
            title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
            className={`group relative p-4 rounded-full border transition-all duration-300 ease-out active:scale-90 ${
              isMuted
                ? "bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:border-amber-400"
                : "bg-slate-950/80 border-slate-800/90 text-slate-400 hover:text-slate-100 hover:border-slate-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 transition-transform duration-300 group-hover:scale-110">
              {isMuted ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.41 0-.75-.34-.75-.75V9.75c0-.41.34-.75.75-.75h4.49Z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              )}
            </svg>
          </button>

          {/* Speaker Audio Mode Toggle */}
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            disabled={callState === "DISCONNECTING"}
            title={isSpeakerOn ? "Switch to Earpiece Mode" : "Switch to Speaker Mode"}
            className={`group relative p-4 rounded-full border transition-all duration-300 ease-out active:scale-90 ${
              isSpeakerOn
                ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:border-indigo-400"
                : "bg-slate-950/80 border-slate-800/90 text-slate-400 hover:text-slate-100 hover:border-slate-600"
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6 transition-transform duration-300 group-hover:scale-110">
              {isSpeakerOn ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.287a6 6 0 0 1 0 7.427M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.41 0-.75-.34-.75-.75V9.75c0-.41.34-.75.75-.75h4.49Z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.41 0-.75-.34-.75-.75V9.75c0-.41.34-.75.75-.75h4.49Z" />
              )}
            </svg>
          </button>

          {/* Primary Push-to-Talk Mic Button */}
          <div className="relative flex items-center justify-center">
            {callState === "LISTENING" && (
              <>
                <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
                <span className="absolute -inset-2 rounded-full bg-emerald-500/20 animate-pulse blur-sm" />
              </>
            )}

            <span
              className={`absolute -inset-1.5 rounded-full blur-md transition-all duration-500 ${
                callState === "LISTENING"
                  ? "bg-gradient-to-r from-emerald-400 to-teal-300 opacity-80"
                  : "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-40 group-hover:opacity-75"
              }`}
            />

            <button
              onClick={togglePushToTalk}
              disabled={isMuted || callState === "DISCONNECTING" || callState === "SPEAKING"}
              title={isMuted ? "Unmute microphone to speak" : "Push to speak"}
              className={`group relative p-6 rounded-full border transition-all duration-300 ease-out active:scale-95 ${
                callState === "LISTENING"
                  ? "bg-emerald-500 border-emerald-200 text-slate-950 scale-105 shadow-[0_0_40px_rgba(16,185,129,0.6)]"
                  : "bg-indigo-600/90 border-indigo-400/80 text-white hover:bg-indigo-500 hover:border-indigo-300 shadow-[0_0_35px_rgba(79,70,229,0.5)]"
              } disabled:opacity-30 disabled:cursor-not-allowed`}
            >
              <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-7 h-7 transition-all duration-300 ${
                  callState === "LISTENING" ? "scale-110 rotate-6" : "group-hover:scale-110"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                />
              </svg>
            </button>
          </div>

          {/* Authentic Red End Call Button */}
          <button
            onClick={handleEndCall}
            disabled={callState === "DISCONNECTING"}
            title="End Call"
            className="group relative p-4 rounded-full bg-rose-600/90 border border-rose-400/60 text-white transition-all duration-300 ease-out hover:bg-rose-500 hover:border-rose-300 active:scale-90 shadow-[0_0_25px_rgba(225,29,72,0.4)] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
            >
              <path d="M16.2 13.8a2.5 2.5 0 0 0-3.5 0l-1.2 1.2a12.8 12.8 0 0 1-5.5-5.5l1.2-1.2a2.5 2.5 0 0 0 0-3.5L5.4 3a2.5 2.5 0 0 0-3.5 0A9.9 9.9 0 0 0 1 7.5 15.5 15.5 0 0 0 16.5 23a9.9 9.9 0 0 0 4.5-1 2.5 2.5 0 0 0 0-3.5l-4.8-4.7z" transform="rotate(135 12 12)" />
            </svg>
          </button>

        </div>
      </div>
    </div>
  );
}

