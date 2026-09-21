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
  const genderMap =
    sex?.toLowerCase() === "male"
      ? patientAvatars.male
      : patientAvatars.female;

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

type CallState =
  | "CONNECTING"
  | "CONNECTED"
  | "LISTENING"
  | "PROCESSING"
  | "SPEAKING"
  | "DISCONNECTING";

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

      // Read the currently selected MedicSim theme colour.
      const primary =
        typeof window !== "undefined"
          ? getComputedStyle(document.documentElement)
              .getPropertyValue("--primary")
              .trim() || "#4f46e5"
          : "#4f46e5";

      for (let i = 0; i < barCount; i++) {
        const value = dataArray[i * 2] || 0;
        const barHeight = Math.max(
          4,
          (value / 255) * canvas.height * 0.8
        );

        const gradient = ctx.createLinearGradient(
          0,
          canvas.height,
          0,
          0
        );

        if (callState === "SPEAKING") {
          gradient.addColorStop(0, `${primary}33`);
          gradient.addColorStop(0.5, `${primary}CC`);
          gradient.addColorStop(1, `${primary}`);
        } else {
          // Listening remains green because it represents microphone activity.
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.2)");
          gradient.addColorStop(0.5, "rgba(52, 211, 153, 0.8)");
          gradient.addColorStop(1, "rgba(167, 243, 208, 1)");
        }

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.roundRect(
          startX,
          (canvas.height - barHeight) / 2,
          barWidth,
          barHeight,
          20
        );
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
      animFrameRef.current = null;
    }

    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }

    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
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

    const timeout = setTimeout(() => {
      onClose();
    }, 800);

    return () => clearTimeout(timeout);
  }, [stopVoice, onClose]);

  // Speak Patient TTS Response with Web Audio Analyser
  const speakPatientResponse = useCallback(
    async (text: string) => {
      stopAudio();
      setCallState("SPEAKING");

      let voice = "en-GB-SoniaNeural";

      if (patient.gender?.toLowerCase() === "male") {
        voice =
          patient.age > 60
            ? "en-GB-ThomasNeural"
            : "en-GB-RyanNeural";
      } else {
        voice =
          patient.age > 60
            ? "en-GB-LibbyNeural"
            : "en-GB-MaisieNeural";
      }

      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            voice,
          }),
        });

        if (!res.ok) {
          throw new Error("TTS Route Failed");
        }

        const blob = await res.blob();
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);

        currentAudioRef.current = audio;

        // Apply audio volume based on speaker state toggle
        audio.volume = isSpeakerOn ? 1.0 : 0.4;

        const AudioCtx =
          window.AudioContext ||
          (window as any).webkitAudioContext;

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
          URL.revokeObjectURL(audioUrl);
        };

        await audio.play();
      } catch (e) {
        if (
          typeof window !== "undefined" &&
          "speechSynthesis" in window
        ) {
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
    }, 2);

    const durationTimer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

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

            const reply =
              await onSendMessageRef.current(transcript);

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

          console.error(
            "Speech Recognition Error:",
            event.error
          );

          setCallState("CONNECTED");
        };

        recognition.onend = () => {
          setCallState((current) =>
            current === "LISTENING"
              ? "CONNECTED"
              : current
          );
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

    return `${mins.toString().padStart(2, "0")}:${remaining
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePushToTalk = () => {
    if (
      callState === "DISCONNECTING" ||
      isMuted
    ) {
      return;
    }

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
        return `${patient.name
          .split(" ")[0]
          .toUpperCase()} IS SPEAKING...`;

      case "DISCONNECTING":
        return "DISCONNECTING CALL...";

      default:
        return "ENCRYPTED CALL CONNECTED";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex h-screen w-screen
        items-center justify-center
        overflow-hidden
        bg-[var(--background)]
        p-4
        select-none
        transition-colors duration-500
        md:p-6
      "
    >
      {/* Dynamic Background Lighting Meshes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Main theme glow */}
        <div
          className={`
            absolute left-1/2 top-1/2
            h-[600px] w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[140px]
            transition-all duration-1000
            ${
              callState === "DISCONNECTING"
                ? "scale-125 bg-rose-600/40"
                : callState === "LISTENING"
                ? "scale-110 bg-emerald-500/35"
                : callState === "SPEAKING"
                ? "scale-125 bg-[var(--primary)]/35"
                : "scale-90 bg-[var(--primary)]/20"
            }
          `}
        />

        {/* Secondary theme glow */}
        <div
          className={`
            absolute left-1/2 top-1/3
            h-[350px] w-[350px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[90px]
            transition-all duration-1000
            ${
              callState === "SPEAKING"
                ? "bg-[var(--primary)]/30"
                : callState === "LISTENING"
                ? "bg-teal-300/25"
                : "bg-[var(--primary)]/10"
            }
          `}
        />
      </div>

      {/* Main Container Card */}
      <div
        className="
          relative flex min-h-[590px]
          w-full max-w-lg
          flex-col items-center justify-between
          overflow-hidden
          rounded-[2.5rem]
          border border-[var(--primary)]/15
          bg-[var(--card)]/90
          p-8
          shadow-[0_0_80px_rgba(0,0,0,0.75)]
          backdrop-blur-2xl
          backdrop-saturate-200
          transition-all duration-500
        "
      >
        {/* Subtle theme edge glow */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            rounded-[2.5rem]
            opacity-40
            transition-opacity duration-500
          "
          style={{
            boxShadow:
              "inset 0 0 60px color-mix(in srgb, var(--primary) 8%, transparent)",
          }}
        />

        {/* Top Header Status Pills */}
        <div
          className="
            z-10 flex w-full
            items-center justify-between
            text-[11px]
            font-mono
            tracking-wider
            text-[var(--muted)]
          "
        >
          <div
            className="
              flex items-center gap-2.5
              rounded-full
              border border-[var(--primary)]/10
              bg-[var(--background)]/80
              px-4 py-2
              shadow-inner
            "
          >
            <span
              className={`
                h-2 w-2 rounded-full
                transition-colors duration-300
                ${
                  callState === "DISCONNECTING"
                    ? "bg-rose-500"
                    : callState === "SPEAKING"
                    ? "bg-[var(--primary)] animate-pulse"
                    : callState === "LISTENING"
                    ? "bg-emerald-400 animate-ping"
                    : "bg-emerald-500"
                }
              `}
            />

            <span className="font-semibold tracking-widest text-[var(--text)]/80">
              PATIENT CALL SESSION
            </span>
          </div>

          <div
            className="
              rounded-full
              border border-[var(--primary)]/10
              bg-[var(--background)]/80
              px-4 py-2
              font-bold
              tracking-widest
              text-[var(--text)]/80
              shadow-inner
            "
          >
            {formatDuration(callDuration)}
          </div>
        </div>

        {/* Patient Profile Avatar & Spectrum Renderer */}
        <div className="relative z-10 my-auto flex w-full flex-col items-center space-y-6">
          <div className="relative flex items-center justify-center">
            {/* Dynamic Halo Glow Ring */}
            <div
              className={`
                absolute -inset-5
                rounded-full
                blur-md
                opacity-40
                transition-all duration-500
                ${
                  callState === "SPEAKING"
                    ? "animate-pulse bg-[var(--primary)]/70"
                    : callState === "LISTENING"
                    ? "animate-pulse bg-gradient-to-tr from-emerald-400 to-teal-200"
                    : callState === "DISCONNECTING"
                    ? "bg-rose-500/50"
                    : "bg-transparent"
                }
              `}
            />

            <div
              className="
                relative
                h-36 w-36
                overflow-hidden
                rounded-full
                border-2
                border-[var(--primary)]/35
                bg-[var(--background)]
                p-1.5
                shadow-[0_10px_40px_rgba(0,0,0,0.8)]
                transition-all duration-500
              "
            >
              <img
                src={getPatientAvatar(
                  patient.gender,
                  patient.age
                )}
                alt={patient.name}
                className={`
                  h-full w-full
                  rounded-full
                  object-cover
                  filter
                  transition-all duration-500
                  ${
                    callState === "DISCONNECTING"
                      ? "brightness-50 grayscale"
                      : "brightness-105"
                  }
                `}
              />
            </div>
          </div>

          {/* Patient Details & Dynamic Engine Status */}
          <div className="space-y-1.5 text-center">
            <h3 className="text-2xl font-black tracking-tight text-[var(--text)]">
              {patient.name}
            </h3>

            <p
              className={`
                text-[11px]
                font-mono
                font-semibold
                tracking-[0.2em]
                transition-colors duration-300
                ${
                  isMuted
                    ? "text-amber-400"
                    : callState === "DISCONNECTING"
                    ? "text-rose-400"
                    : callState === "LISTENING"
                    ? "text-emerald-400"
                    : "text-[var(--primary)]"
                }
              `}
            >
              {getDisplayStatus()}
            </p>
          </div>

          {/* Real-time Spectrum Visualizer Canvas */}
          <div className="flex h-10 w-full items-center justify-center pt-1">
            <canvas
              ref={canvasRef}
              width={240}
              height={40}
              className="h-[40px] w-[240px]"
            />
          </div>

          {/* Subtitle Transcripts Box */}
          {lastTranscript &&
            callState !== "DISCONNECTING" && (
              <div className="w-full px-4 animate-[fadeIn_0.3s_ease-out]">
                <div
                  className="
                    rounded-2xl
                    border border-[var(--primary)]/15
                    bg-[var(--background)]/70
                    p-3.5
                    text-center
                    font-sans
                    text-xs
                    tracking-wide
                    leading-relaxed
                    text-[var(--text)]/85
                    shadow-lg
                    backdrop-blur-md
                  "
                >
                  "{lastTranscript}"
                </div>
              </div>
            )}
        </div>

        {/* Dynamic Hardware Controls Suite */}
        <div
          className="
            z-10 flex w-full
            items-center justify-center
            gap-5
            border-t
            border-[var(--primary)]/10
            pt-6
          "
        >
          {/* Mute Button */}
          <button
            onClick={toggleMute}
            disabled={callState === "DISCONNECTING"}
            title={
              isMuted
                ? "Unmute Microphone"
                : "Mute Microphone"
            }
            className={`
              group relative
              cursor-pointer
              rounded-full
              border
              p-4
              transition-all duration-300
              ease-out
              hover:-translate-y-1
              active:scale-90
              ${
                isMuted
                  ? "border-amber-500/50 bg-amber-500/20 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:border-amber-400"
                  : "border-[var(--primary)]/15 bg-[var(--background)]/80 text-[var(--muted)] hover:border-[var(--primary)]/45 hover:text-[var(--text)] hover:shadow-[0_0_25px_color-mix(in_srgb,var(--primary)_18%,transparent)]"
              }
              disabled:cursor-not-allowed
              disabled:opacity-30
            `}
          >
            <span
              className="
                pointer-events-none
                absolute inset-0
                rounded-full
                bg-gradient-to-tr
                from-[var(--primary)]/10
                to-transparent
                opacity-0
                transition-opacity duration-300
                group-hover:opacity-100
              "
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="
                h-6 w-6
                transition-transform duration-300
                group-hover:scale-110
              "
            >
              {isMuted ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.41 0-.75-.34-.75-.75V9.75c0-.41.34-.75.75-.75h4.49Z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                />
              )}
            </svg>
          </button>

          {/* Speaker Audio Mode Toggle */}
          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            disabled={callState === "DISCONNECTING"}
            title={
              isSpeakerOn
                ? "Switch to Earpiece Mode"
                : "Switch to Speaker Mode"
            }
            className={`
              group relative
              cursor-pointer
              rounded-full
              border
              p-4
              transition-all duration-300
              ease-out
              hover:-translate-y-1
              active:scale-90
              ${
                isSpeakerOn
                  ? "border-[var(--primary)]/50 bg-[var(--primary)]/20 text-[var(--primary)] shadow-[0_0_25px_color-mix(in_srgb,var(--primary)_25%,transparent)]"
                  : "border-[var(--primary)]/15 bg-[var(--background)]/80 text-[var(--muted)] hover:border-[var(--primary)]/45 hover:text-[var(--text)]"
              }
              disabled:cursor-not-allowed
              disabled:opacity-30
            `}
          >
            <span
              className="
                pointer-events-none
                absolute inset-0
                rounded-full
                bg-gradient-to-tr
                from-[var(--primary)]/10
                to-transparent
                opacity-0
                transition-opacity duration-300
                group-hover:opacity-100
              "
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="
                h-6 w-6
                transition-transform duration-300
                group-hover:scale-110
              "
            >
              {isSpeakerOn ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.287a6 6 0 0 1 0 7.427M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.41 0-.75-.34-.75-.75V9.75c0-.41.34-.75.75-.75h4.49Z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.41 0-.75-.34-.75-.75V9.75c0-.41.34-.75.75-.75h4.49Z"
                />
              )}
            </svg>
          </button>

          {/* Primary Push-to-Talk Mic Button */}
          <div className="relative flex items-center justify-center">
            {callState === "LISTENING" && (
              <>
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
                <span className="absolute -inset-2 animate-pulse rounded-full bg-emerald-500/20 blur-sm" />
              </>
            )}

            <span
              className={`
                absolute -inset-1.5
                rounded-full
                blur-md
                transition-all duration-500
                ${
                  callState === "LISTENING"
                    ? "bg-gradient-to-r from-emerald-400 to-teal-300 opacity-80"
                    : "bg-[var(--primary)] opacity-35 group-hover:opacity-70"
                }
              `}
            />

            <button
              onClick={togglePushToTalk}
              disabled={
                isMuted ||
                callState === "DISCONNECTING" ||
                callState === "SPEAKING"
              }
              title={
                isMuted
                  ? "Unmute microphone to speak"
                  : "Push to speak"
              }
              className={`
                group relative
                cursor-pointer
                rounded-full
                border
                p-6
                transition-all duration-300
                ease-out
                active:scale-95
                ${
                  callState === "LISTENING"
                    ? "scale-105 border-emerald-200 bg-emerald-500 text-slate-950 shadow-[0_0_40px_rgba(16,185,129,0.6)]"
                    : "border-[var(--primary)]/70 bg-[var(--primary)] text-white shadow-[0_0_35px_color-mix(in_srgb,var(--primary)_45%,transparent)] hover:-translate-y-1 hover:brightness-110"
                }
                disabled:cursor-not-allowed
                disabled:opacity-30
              `}
            >
              <span
                className="
                  pointer-events-none
                  absolute inset-x-0 top-0
                  h-1/2
                  rounded-t-full
                  bg-gradient-to-b
                  from-white/25
                  to-transparent
                "
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`
                  h-7 w-7
                  transition-all duration-300
                  ${
                    callState === "LISTENING"
                      ? "rotate-6 scale-110"
                      : "group-hover:scale-110"
                  }
                `}
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
            className="
              group relative
              cursor-pointer
              rounded-full
              border
              border-rose-400/60
              bg-rose-600/90
              p-4
              text-white
              shadow-[0_0_25px_rgba(225,29,72,0.4)]
              transition-all duration-300
              ease-out
              hover:-translate-y-1
              hover:border-rose-300
              hover:bg-rose-500
              hover:shadow-[0_0_35px_rgba(225,29,72,0.6)]
              active:scale-90
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <span
              className="
                pointer-events-none
                absolute inset-x-0 top-0
                h-1/2
                rounded-t-full
                bg-gradient-to-b
                from-white/25
                to-transparent
              "
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="
                h-6 w-6
                transition-transform duration-300
                group-hover:-rotate-12
                group-hover:scale-110
              "
            >
              <path
                d="M16.2 13.8a2.5 2.5 0 0 0-3.5 0l-1.2 1.2a12.8 12.8 0 0 1-5.5-5.5l1.2-1.2a2.5 2.5 0 0 0 0-3.5L5.4 3a2.5 2.5 0 0 0-3.5 0A9.9 9.9 0 0 0 1 7.5 15.5 15.5 0 0 0 16.5 23a9.9 9.9 0 0 0 4.5-1 2.5 2.5 0 0 0 0-3.5l-4.8-4.7z"
                transform="rotate(135 12 12)"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}