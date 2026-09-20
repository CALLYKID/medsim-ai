"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Patient } from "../data/patientGenerator";
import { generatePatient } from "../data/patientGenerator";
import { buildPatientPrompt } from "../data/patientPromptBuilder";
import { diseaseLibrary } from "../data/diseaseLibrary";
import VoiceCallModal from "../components//VoiceCallModal";
import { createClient } from "@/lib/supabase/client";

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

function StreamingText({
  text,
  speed = 4,
}: {
  text: string;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      return;
    }

    let i = 0;
    let currentString = "";

    const timer = setInterval(() => {
      if (i < text.length) {
        currentString += text.charAt(i);
        setDisplayedText(currentString);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="text-[var(--text)] text-sm leading-relaxed tracking-wide">
      {displayedText}
    </span>
  );
}

export default function LabsPage() {
  const [messages, setMessages] = useState<
    {
      id: number;
      role: "user" | "assistant";
      text: string;
      isNewAI?: boolean;
    }[]
  >([]);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [currentPatientPrompt, setCurrentPatientPrompt] = useState("");
  const [question, setQuestion] = useState("");

  const [diff1, setDiff1] = useState("");
  const [diff2, setDiff2] = useState("");
  const [diff3, setDiff3] = useState("");

  const [diagnosis, setDiagnosis] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState<number | null>(null);

  const [scoreBreakdown, setScoreBreakdown] = useState<{
    history: number;
    exam: number;
    differential: number;
    accuracy: number;
    empathy: number;
  } | null>(null);

  const [feedback, setFeedback] = useState("");
  const [performedExams, setPerformedExams] = useState<
    Record<string, boolean>
  >({});

  const [isGrading, setIsGrading] = useState(false);
  const [isResponding, setIsResponding] = useState(false);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    admitPatient();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      submitDiagnosis();
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  function admitPatient() {
    const randomDisease =
      diseaseLibrary[Math.floor(Math.random() * diseaseLibrary.length)];

    const generatedPatient = generatePatient(randomDisease);
    const patientPrompt = buildPatientPrompt(generatedPatient);

    setCurrentPatientPrompt(patientPrompt);
    setMessages([]);
    setPatient(generatedPatient);
    setQuestion("");
    setDiff1("");
    setDiff2("");
    setDiff3("");
    setDiagnosis("");
    setResult("");
    setScore(null);
    setScoreBreakdown(null);
    setFeedback("");
    setPerformedExams({});
    setIsResponding(false);
    setIsGrading(false);
    setIsCallActive(false);
    setTimeLeft(300);
    setTimerActive(false);
    setHasStarted(false);
  }

  async function handleVoiceMessage(userText: string): Promise<string> {
    if (!patient || !userText.trim()) return "";

    const newUserMessage = {
      id: Date.now(),
      role: "user" as const,
      text: userText.trim(),
    };

    const updatedHistoryForAPI = [newUserMessage, ...messages];

    setMessages((prev) => [newUserMessage, ...prev]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText.trim(),
          context: {
            patient,
            disease: patient.disease,
          },
          history: updatedHistoryForAPI,
        }),
      });

      const data = await res.json();

      if (res.ok && data && data.reply) {
        setMessages((prev) => [
          {
            id: Date.now() + 1,
            role: "assistant",
            text: data.reply,
            isNewAI: true,
          },
          ...prev,
        ]);

        return data.reply;
      }
    } catch (err) {
      console.error("Voice chat API error:", err);
    }

    return "";
  }

  async function askQuestion() {
    if (
      !patient ||
      !question.trim() ||
      isResponding ||
      isGrading ||
      !hasStarted
    )
      return;

    const currentQuestion = question.trim();

    setQuestion("");
    setIsResponding(true);

    const newUserMessage = {
      id: Date.now(),
      role: "user" as const,
      text: currentQuestion,
    };

    const updatedHistoryForAPI = [newUserMessage, ...messages];

    setMessages((prev) => [newUserMessage, ...prev]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentQuestion,
          context: {
            patient,
            disease: patient.disease,
          },
          history: updatedHistoryForAPI,
        }),
      });

      const data = await res.json();

      if (res.ok && data && data.reply) {
        setMessages((prev) => [
          {
            id: Date.now() + 1,
            role: "assistant",
            text: data.reply,
            isNewAI: true,
          },
          ...prev,
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsResponding(false);

      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }
  }

  function runPhysicalExam(
    type: "vitals" | "heent" | "chest" | "abdomen" | "neuro"
  ) {
    if (score !== null || isGrading || !hasStarted) return;

    setPerformedExams((prev) => ({
      ...prev,
      [type]: true,
    }));
  }

  async function saveConsultationResult(totalScore: number) {
    if (!patient) return;

    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error(
        "Cannot save consultation: no authenticated user.",
        userError
      );
      return;
    }

    const difficulty =
      patient.disease.hidden.severity === "Critical"
        ? "Expert"
        : patient.disease.hidden.severity === "Severe"
          ? "Hard"
          : patient.disease.hidden.severity === "Moderate"
            ? "Moderate"
            : "Easy";

    const { error } = await supabase
      .from("consultation_results")
      .insert({
        user_id: user.id,
        patient_name: patient.name,
        correct_diagnosis: patient.disease.hidden.diagnosis,
        final_score: totalScore,
        category: patient.disease.category,
        specialty: patient.disease.medicalSpecialty,
        severity: patient.disease.hidden.severity,
        difficulty,
        learning_points: patient.learningPoints ?? [],
        red_flags: patient.disease.hidden.redFlags ?? [],
      });

    if (error) {
      console.error("Failed to save consultation result:", error);
    } else {
      console.log("Consultation result saved to Supabase.");
    }
  }

  async function submitDiagnosis() {
    setTimerActive(false);

    if (!patient || !diagnosis.trim() || isGrading || !hasStarted) return;

    setIsGrading(true);

    const correct = patient.disease.hidden.diagnosis.toLowerCase().trim();
    const finalUserDiag = diagnosis.toLowerCase().trim();

    const isPrimaryCorrect = finalUserDiag.includes(correct);
    const accuracyScore = isPrimaryCorrect ? 10 : 0;

    let differentialScore = 0;

    const d1Match = diff1.toLowerCase().trim().includes(correct);
    const d2Match = diff2.toLowerCase().trim().includes(correct);
    const d3Match = diff3.toLowerCase().trim().includes(correct);

    if (isPrimaryCorrect) {
      differentialScore = 30;
    } else if (d1Match || d2Match || d3Match) {
      differentialScore = 20;
    } else {
      const activeDiffsCount = [diff1, diff2, diff3].filter(
        (d) => d.trim().length > 0
      ).length;

      differentialScore = activeDiffsCount * 5;
    }

    const totalExamsPerformed = Object.keys(performedExams).length;
    const examScore = Math.min(20, totalExamsPerformed * 4);

    setResult(
      isPrimaryCorrect
        ? "Correct working diagnosis 🎉"
        : d1Match || d2Match || d3Match
          ? `Inquiry Alert: Correct target was down in your differentials! (${patient.disease.hidden.diagnosis})`
          : `Incorrect. Primary presentation path was: ${patient.disease.hidden.diagnosis}`
    );

    const summaryBlock = `Exams Performed: ${
      Object.keys(performedExams).join(", ") || "None"
    }`;

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          investigationSummary: summaryBlock,
          chiefComplaint: patient.disease.presentation.chiefComplaint,
          correctDiagnosis: patient.disease.hidden.diagnosis,
          finalDiagnosis: diagnosis,
          differentials: [diff1, diff2, diff3],
          performedExamsCount: Object.keys(performedExams).length,
          personality: patient.personality,
          painTolerance: patient.painTolerance,
        }),
      });

      const data = await res.json();

      const rawHistory = data.historyScore ?? 20;
      const historyScore = Math.max(0, Math.min(30, rawHistory));

      const empathyScore = Math.max(
        0,
        Math.min(10, data.empathyScore ?? 7)
      );

      const totalScore = Math.max(
        0,
        Math.min(
          100,
          accuracyScore +
            differentialScore +
            examScore +
            historyScore +
            empathyScore
        )
      );

      setScore(totalScore);

      setScoreBreakdown({
        history: historyScore,
        exam: examScore,
        differential: differentialScore,
        empathy: empathyScore,
        accuracy: accuracyScore,
      });

      setFeedback(
        data.feedback ?? "Evaluation compiled successfully."
      );

      await saveConsultationResult(totalScore);
    } catch (e) {
      const historyFallback = 20;
      const empathyFallback = 7;

      const totalScore =
        accuracyScore +
        differentialScore +
        examScore +
        historyFallback +
        empathyFallback;

      setScore(totalScore);

      setScoreBreakdown({
        history: historyFallback,
        exam: examScore,
        differential: differentialScore,
        empathy: empathyFallback,
        accuracy: accuracyScore,
      });

      setFeedback(
        "Scoring evaluation completed with internal fallback logic values."
      );

      await saveConsultationResult(totalScore);
    } finally {
      setIsGrading(false);
    }
  }

  if (!patient) return null;

  const isSessionEnded = score !== null;

  return (
    <main
      className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 lg:p-8"
      style={{
        background:
          "radial-gradient(ellipse at top, color-mix(in srgb, var(--primary) 12%, var(--background)), var(--background) 65%, #020305)",
      }}
    >
      <div
        className="w-full max-w-7xl h-auto lg:h-[92vh] lg:max-h-[960px] grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-3xl border backdrop-blur-2xl p-5 sm:p-7 overflow-hidden shadow-[0_0_60px_-15px_rgba(15,23,42,0.8)]"
        style={{
          backgroundColor: "color-mix(in srgb, var(--card) 92%, transparent)",
          borderColor: "color-mix(in srgb, var(--primary) 12%, #334155)",
        }}
      >
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-0 justify-between space-y-4">
          <div className="space-y-4 shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-[var(--text)] flex items-center gap-2.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_var(--primary)]"
                    style={{ backgroundColor: "var(--primary)" }}
                  />
                  Patient Admission Sandbox
                </h1>

                <p className="text-xs text-[var(--muted)] mt-0.5">
                  OSCE Clinical Evaluation Station
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCallActive(true)}
                  disabled={!hasStarted || isSessionEnded}
                  className="cursor-pointer text-xs font-bold text-white px-3.5 py-2 rounded-xl border shadow-md transition-all active:scale-95 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--primary)",
                    borderColor:
                      "color-mix(in srgb, var(--primary) 70%, white)",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.826-1.47-5.11-3.754-6.58-6.58l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  <span>Call Patient</span>
                </button>

                <Link
                  href="/dashboard"
                  className="cursor-pointer text-xs font-semibold text-[var(--text)] bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 rounded-xl border border-white/10 shadow-md transition-all active:scale-95"
                >
                  📊 Dashboard
                </Link>
              </div>
            </div>

            <div
              className="p-4 rounded-2xl border flex items-center gap-5 group transition-all shadow-lg"
              style={{
                background:
                  "linear-gradient(90deg, color-mix(in srgb, var(--card) 95%, var(--primary)), color-mix(in srgb, var(--card) 75%, transparent))",
                borderColor:
                  "color-mix(in srgb, var(--primary) 15%, #334155)",
              }}
            >
              <div
                className="relative w-16 h-16 rounded-2xl border flex items-center justify-center overflow-hidden shrink-0 shadow-inner"
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--primary) 12%, var(--card))",
                  borderColor:
                    "color-mix(in srgb, var(--primary) 25%, #334155)",
                }}
              >
                <img
                  src={getPatientAvatar(patient.gender, patient.age)}
                  alt="Patient Avatar"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className="text-[10px] font-mono font-black uppercase tracking-widest block mb-0.5"
                  style={{ color: "var(--primary)" }}
                >
                  Case File // Intake Track
                </span>

                <h2 className="text-lg font-bold text-white tracking-tight truncate">
                  {patient.name}
                </h2>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)] font-medium mt-1">
                  <span>
                    Age:{" "}
                    <strong className="text-[var(--text)] font-semibold">
                      {patient.age}
                    </strong>
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />

                  <span>
                    Sex:{" "}
                    <strong className="text-[var(--text)] font-semibold">
                      {patient.gender}
                    </strong>
                  </span>

                  <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />

                  <span className="truncate">
                    Job:{" "}
                    <strong
                      className="font-semibold"
                      style={{ color: "var(--primary)" }}
                    >
                      {patient.occupation}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0 font-mono text-[10px]">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-wide">
                  {patient.personality}
                </span>

                <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold uppercase tracking-wide">
                  Pain: {patient.painTolerance}
                </span>
              </div>
            </div>

            {timeLeft !== null && (
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between shadow-lg transition-all duration-500 ${
                  !hasStarted
                    ? "bg-white/[0.02]"
                    : timeLeft <= 60
                      ? "bg-rose-950/30 border-rose-500/50 shadow-rose-950/40 animate-pulse"
                      : "bg-white/[0.025] border-white/10"
                }`}
                style={
                  !hasStarted
                    ? {
                        borderColor:
                          "color-mix(in srgb, var(--primary) 30%, transparent)",
                      }
                    : undefined
                }
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        hasStarted
                          ? "animate-ping"
                          : "bg-slate-600"
                      }`}
                      style={
                        hasStarted
                          ? { backgroundColor: "var(--primary)" }
                          : undefined
                      }
                    />

                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                        hasStarted && timeLeft <= 60
                          ? "bg-rose-500"
                          : hasStarted
                            ? ""
                            : "bg-slate-600"
                      }`}
                      style={
                        hasStarted && timeLeft > 60
                          ? { backgroundColor: "var(--primary)" }
                          : undefined
                      }
                    />
                  </span>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
                      OSCE Session Timer
                    </span>

                    <span className="text-xs font-semibold text-[var(--text)] mt-0.5">
                      {!hasStarted
                        ? "Awaiting Consultation Start"
                        : "Active Evaluation Station"}
                    </span>
                  </div>
                </div>

                {!hasStarted ? (
                  <button
                    onClick={() => {
                      setTimerActive(true);
                      setHasStarted(true);
                    }}
                    className="cursor-pointer text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-lg active:scale-95"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    ▶ Start Session
                  </button>
                ) : (
                  <div
                    className={`text-xl font-mono font-black tracking-widest px-4 py-1.5 rounded-xl bg-black/30 border shadow-inner ${
                      timeLeft <= 60
                        ? "text-rose-500 border-rose-500/30"
                        : ""
                    }`}
                    style={
                      timeLeft > 60
                        ? {
                            color: "var(--primary)",
                            borderColor:
                              "color-mix(in srgb, var(--primary) 20%, #334155)",
                          }
                        : undefined
                    }
                  >
                    {formatTime(timeLeft)}
                  </div>
                )}
              </div>
            )}

            <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] shadow-inner">
              <p className="text-[10px] font-mono font-bold text-[var(--muted)] uppercase tracking-widest mb-1.5">
                Presenting Chief Complaint
              </p>

              <p className="text-sm text-[var(--text)] font-medium leading-relaxed">
                {patient.disease.presentation?.chiefComplaint ??
                  "No data available."}
              </p>
            </div>

            <div className="relative flex items-center">
              <textarea
                ref={textareaRef}
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(
                    e.target.scrollHeight,
                    120
                  )}px`;
                }}
                disabled={
                  !hasStarted ||
                  isResponding ||
                  isGrading ||
                  isSessionEnded
                }
                placeholder={
                  !hasStarted
                    ? "Unlock clinical dashboard by initiating timer..."
                    : isSessionEnded
                      ? "Case finalized. Review score report."
                      : "Type clinical inquiry to patient..."
                }
                rows={1}
                className="cursor-text w-full pl-4 pr-14 py-3.5 rounded-2xl bg-black/20 border border-white/[0.08] text-[var(--text)] text-sm placeholder-[var(--muted)] focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed resize-none min-h-[50px] max-h-[120px] shadow-inner overflow-y-auto transition-all"
                style={
                  {
                    "--tw-ring-color":
                      "color-mix(in srgb, var(--primary) 20%, transparent)",
                  } as React.CSSProperties
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();

                    if (
                      question.trim() &&
                      !isResponding &&
                      !isGrading &&
                      !isSessionEnded &&
                      hasStarted
                    ) {
                      askQuestion();
                      (e.target as HTMLTextAreaElement).style.height =
                        "auto";
                    }
                  }
                }}
              />

              <button
                onClick={() => {
                  askQuestion();

                  if (textareaRef.current) {
                    textareaRef.current.style.height = "auto";
                    textareaRef.current.focus();
                  }
                }}
                disabled={
                  !hasStarted ||
                  !question.trim() ||
                  isResponding ||
                  isGrading ||
                  isSessionEnded
                }
                className="cursor-pointer absolute right-2.5 p-2.5 rounded-xl text-white transition-all active:scale-95 shadow-md disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[200px] lg:min-h-[260px] relative flex flex-col overflow-hidden border-t border-white/[0.07] pt-3">
            <div
              ref={chatContainerRef}
              className="absolute inset-0 overflow-y-auto pr-2 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pb-4"
            >
              {isResponding && (
                <div
                  className="p-3.5 rounded-2xl border text-xs font-semibold flex items-center gap-3 animate-pulse"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--primary) 8%, transparent)",
                    borderColor:
                      "color-mix(in srgb, var(--primary) 25%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  <span className="flex h-2.5 w-2.5 relative">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                  </span>

                  <span>Formulating patient clinical response...</span>
                </div>
              )}

              {messages.map((m, idx) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border transition-all duration-300 shadow-sm ${
                    m.role === "user"
                      ? "ml-10"
                      : "bg-white/[0.025] border-white/[0.07] mr-10"
                  }`}
                  style={
                    m.role === "user"
                      ? {
                          backgroundColor:
                            "color-mix(in srgb, var(--primary) 7%, transparent)",
                          borderColor:
                            "color-mix(in srgb, var(--primary) 20%, transparent)",
                        }
                      : undefined
                  }
                >
                  <p
                    className={`text-[10px] font-mono font-bold tracking-wider uppercase mb-1.5 ${
                      m.role === "assistant"
                        ? "text-emerald-400"
                        : ""
                    }`}
                    style={
                      m.role === "user"
                        ? { color: "var(--primary)" }
                        : undefined
                    }
                  >
                    {m.role === "user"
                      ? "Primary Practitioner"
                      : "Patient Response"}
                  </p>

                  {m.role === "assistant" &&
                  m.isNewAI &&
                  idx === 0 ? (
                    <StreamingText text={m.text} />
                  ) : (
                    <p className="text-[var(--text)] text-sm leading-relaxed tracking-wide">
                      {m.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/[0.07] pt-5 lg:pt-0 lg:pl-7 flex flex-col h-full min-h-0 justify-between">
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pb-3">
            <div className="flex items-center gap-2.5 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-[var(--muted)]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.25 2.25 0 0 1 10.5 2.25h4.5a2.25 2.25 0 0 1 2.25 2.25m-7.25 15.5H4.5A2.25 2.25 0 0 1 2.25 18V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0 1 1.123-.08"
                />
              </svg>

              <h2 className="text-sm font-bold text-[var(--text)] tracking-tight">
                Objective Physical Assessment
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2.5 shrink-0">
              {(
                ["vitals", "heent", "chest", "abdomen", "neuro"] as const
              ).map((examType) => {
                const isChecked = performedExams[examType];

                return (
                  <button
                    key={examType}
                    onClick={() => runPhysicalExam(examType)}
                    disabled={
                      !hasStarted || isGrading || isSessionEnded
                    }
                    className={`cursor-pointer group p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center justify-between transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                      isChecked
                        ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-400 shadow-md"
                        : "bg-white/[0.025] border-white/[0.07] text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    <span>{examType}</span>

                    <span
                      className={`h-4 w-4 rounded border flex items-center justify-center text-[9px] font-black transition-all ${
                        isChecked
                          ? "bg-emerald-500 border-emerald-400 text-slate-950 scale-100"
                          : "border-slate-700 bg-slate-950"
                      }`}
                    >
                      {isChecked && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="min-h-[110px] space-y-2">
              {Object.keys(performedExams).length === 0 ? (
                <div className="h-[110px] flex items-center justify-center p-4 text-center rounded-2xl border border-dashed border-white/[0.08] text-[var(--muted)] text-xs">
                  No clinical parameters logged. Select system check above.
                </div>
              ) : (
                Object.keys(performedExams).map((type) => {
                  const examKey =
                    type as keyof Required<
                      Patient["disease"]["hidden"]
                    >["examination"];

                  return (
                    <div
                      key={type}
                      className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.07] shadow-inner hover:border-emerald-500/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1 border-b border-white/[0.05] pb-1">
                        <p className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest">
                          {type} Metrics Report
                        </p>
                      </div>

                      <p className="text-xs text-[var(--text)] leading-relaxed font-medium">
                        {patient.disease.hidden?.examination?.[examKey] ||
                          "Standard baseline ranges. No anomalies detected."}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="border-t border-white/[0.07] pt-4 space-y-3 shrink-0 bg-[var(--card)]/95">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-mono font-bold uppercase tracking-widest"
                  style={{ color: "var(--primary)" }}
                >
                  Differential Diagnostics (DDx Board)
                </span>

                <span
                  className="text-[9px] px-2 py-0.5 rounded font-mono font-bold border"
                  style={{
                    color: "var(--primary)",
                    backgroundColor:
                      "color-mix(in srgb, var(--primary) 8%, transparent)",
                    borderColor:
                      "color-mix(in srgb, var(--primary) 20%, transparent)",
                  }}
                >
                  Max 30 Pts
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[diff1, diff2, diff3].map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => {
                      if (index === 0) setDiff1(e.target.value);
                      if (index === 1) setDiff2(e.target.value);
                      if (index === 2) setDiff3(e.target.value);
                    }}
                    disabled={
                      !hasStarted || isGrading || isSessionEnded
                    }
                    placeholder={`DDx #${index + 1}...`}
                    className="cursor-text w-full p-2.5 rounded-xl bg-black/20 border border-white/[0.08] text-[var(--text)] text-xs placeholder-[var(--muted)] focus:outline-none disabled:cursor-not-allowed"
                    style={{
                      caretColor: "var(--primary)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block pl-1">
                Primary Final Assessment
              </span>

              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                disabled={
                  !hasStarted || isGrading || isSessionEnded
                }
                placeholder="Commit to primary final diagnosis..."
                className="cursor-text w-full p-3 rounded-xl bg-black/20 border border-white/[0.08] text-[var(--text)] text-sm placeholder-[var(--muted)] focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed shadow-inner"
              />
            </div>

            <button
              onClick={submitDiagnosis}
              disabled={
                !hasStarted ||
                !diagnosis.trim() ||
                isGrading ||
                isSessionEnded
              }
              className={`w-full p-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2.5 ${
                isSessionEnded
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                  : "cursor-pointer disabled:bg-slate-900 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-600 text-white active:scale-95"
              }`}
              style={
                !isSessionEnded
                  ? {
                      backgroundColor: "var(--primary)",
                      borderColor:
                        "color-mix(in srgb, var(--primary) 30%, transparent)",
                    }
                  : undefined
              }
            >
              {isGrading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>

                  <span>Compiling Metrics Matrix...</span>
                </>
              ) : (
                "Finalize & Submit Diagnosis"
              )}
            </button>

            {isSessionEnded && (
              <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/[0.07] space-y-3 shadow-xl animate-[fadeIn_0.3s_ease-out] overflow-y-auto max-h-[220px] scrollbar-thin scrollbar-thumb-slate-800">
                <div className="flex justify-between items-center border-b border-white/[0.07] pb-2">
                  <div>
                    <h3 className="text-xs font-bold text-white tracking-tight">
                      OSCE Evaluation Summary
                    </h3>

                    <p className="text-[11px] text-slate-300 font-mono mt-0.5">
                      {result}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-mono font-black text-emerald-400">
                      {score}/100
                    </span>
                  </div>
                </div>

                {scoreBreakdown && (
                  <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-black/30 border border-white/[0.07] font-mono text-xs shadow-inner">
                    <div className="flex justify-between border-b border-white/[0.05] pb-1">
                      <span className="text-[var(--muted)]">
                        History Taking:
                      </span>

                      <span
                        className="font-bold"
                        style={{ color: "var(--primary)" }}
                      >
                        {scoreBreakdown.history}/30
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/[0.05] pb-1">
                      <span className="text-[var(--muted)]">
                        DDx Tracks:
                      </span>

                      <span
                        className="font-bold"
                        style={{ color: "var(--primary)" }}
                      >
                        {scoreBreakdown.differential}/30
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/[0.05] pb-1">
                      <span className="text-[var(--muted)]">
                        Bedside Manner / Empathy:
                      </span>

                      <span
                        className="font-bold"
                        style={{ color: "var(--primary)" }}
                      >
                        {scoreBreakdown.empathy}/10
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-white/[0.05] pb-1">
                      <span className="text-[var(--muted)]">
                        Physical Exam:
                      </span>

                      <span className="text-emerald-400 font-bold">
                        {scoreBreakdown.exam}/20
                      </span>
                    </div>

                    <div className="flex justify-between pt-0.5">
                      <span className="text-[var(--muted)]">
                        Primary Match:
                      </span>

                      <span className="text-emerald-400 font-bold">
                        {scoreBreakdown.accuracy}/10
                      </span>
                    </div>
                  </div>
                )}

                <div className="text-xs text-[var(--text)] leading-relaxed bg-black/30 p-3 rounded-xl border border-white/[0.07] shadow-inner">
                  {feedback}
                </div>

                <button
                  onClick={admitPatient}
                  className="cursor-pointer w-full bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs uppercase tracking-wider py-3 rounded-xl border border-slate-700/80 transition-all active:scale-95 shadow-md"
                >
                  Admit Next Case &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <VoiceCallModal
        patient={patient}
        isOpen={isCallActive}
        onClose={() => setIsCallActive(false)}
        onSendMessage={handleVoiceMessage}
      />
    </main>
  );
}