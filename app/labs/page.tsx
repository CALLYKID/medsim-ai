"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { diseaseLibrary } from "../data/diseaseLibrary";
import type { Disease } from "../data/diseaseLibrary";

import {
  maleFirstNames,
  femaleFirstNames,
  lastNames,
  occupations,
  personalities,
  painTolerance,
  anxietyLevels,
} from "../data/generator";

/**
 * =========================
 * PATIENT GENERATOR
 * =========================
 */
function generatePatient(caseData: Disease) {
  const sex = Math.random() > 0.5 ? "Male" : "Female";

  const firstName =
    sex === "Male"
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];

  const lastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  const age = Math.floor(Math.random() * 63) + 18;

  const occupation =
    occupations[Math.floor(Math.random() * occupations.length)];

  const personality =
    personalities[Math.floor(Math.random() * personalities.length)];

  const pain =
    painTolerance[Math.floor(Math.random() * painTolerance.length)];

  const anxiety =
    anxietyLevels[Math.floor(Math.random() * anxietyLevels.length)];

  return {
    ...caseData,

    patient: {
      name: `${firstName} ${lastName}`,
      sex,
      age,
      occupation,
      personality,
      painTolerance: pain,
      anxiety,
    },

    aiContext: {
      disease: caseData.name,
      chiefComplaint: caseData.presentation.chiefComplaint,
      keyFindings: caseData.hidden.findings,
      personality,
      painTolerance: pain,
      anxiety,
      name: `${firstName} ${lastName}`,
      age,
      sex,
      occupation,
    },
  };
}

type GeneratedPatient = Omit<Disease, "patient"> & {
  patient: {
    name: string;
    sex: string;
    age: number;
    occupation: string;
    personality: string;
    painTolerance: string;
    anxiety: number;
  };

  aiContext: {
    disease: string;
    chiefComplaint: string;
    keyFindings: Disease["hidden"]["findings"];
    personality: string;
    painTolerance: string;
    anxiety: number;
    name: string;
    age: number;
    sex: string;
    occupation: string;
  };
};

/**
 * =========================
 * BULLETPROOF NO-CHOP STREAMING EFFECT
 * =========================
 */
function StreamingText({ text, speed = 4 }: { text: string; speed?: number }) {
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

  return <span className="text-gray-200 text-sm leading-relaxed">{displayedText}</span>;
}

export default function LabsPage() {
  // -------------------------
  // STATE LAYER
  // -------------------------
  const [messages, setMessages] = useState<
    { id: number; role: "user" | "ai"; text: string; isNewAI?: boolean }[]
  >([]);

  const [patient, setPatient] = useState<GeneratedPatient | null>(null);
  const [question, setQuestion] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState(""); 
  const [questionHistory, setQuestionHistory] = useState<string[]>([]);
  const [performedExams, setPerformedExams] = useState<Record<string, boolean>>({});
  
  // INFRASTRUCTURE PROTECTION STATES
  const [isGrading, setIsGrading] = useState(false); 
  const [isResponding, setIsResponding] = useState(false); 
  
  // TIMER STATES
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  
  // NEW: LOCKOUT TRACKER STATE
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  
  // SHIFT LOG TRACKER STATE
  const [shiftHistory, setShiftHistory] = useState<{
    id: string;
    patientName: string;
    correctDiagnosis: string;
    finalScore: number;
  }[]>([]);

  // ENGINE 1: INITIALIZE AND LOAD CLOUD BACKUP
  useEffect(() => {
    const savedLogs = localStorage.getItem("medsim_shift_logs");
    if (savedLogs) {
      setShiftHistory(JSON.parse(savedLogs));
    }
    admitPatient();
  }, []);

  const activeCaseRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Keep chat pinned smoothly
  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [messages.length]);

  // OSCE TIMER COUNTDOWN ENGINE
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

  // Format seconds into professional MM:SS display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // -------------------------
  // GAME ACTION SYSTEMS
  // -------------------------
  function admitPatient() {
    const randomDisease =
      diseaseLibrary[Math.floor(Math.random() * diseaseLibrary.length)];

    const generatedPatient = generatePatient(randomDisease);

    setMessages([]);
    setPatient(generatedPatient);
    setQuestion("");
    setDiagnosis("");
    setResult("");
    setScore(null);
    setFeedback("");
    setQuestionHistory([]);
    setPerformedExams({});
    setIsResponding(false);
    setIsGrading(false);
    
    // Set up 5 mins, but do not auto-start countdown or unlock inputs yet
    setTimeLeft(300); 
    setTimerActive(false);
    setHasStarted(false);
  }

  async function askQuestion() {
    if (!patient || !question.trim() || isResponding || isGrading || !hasStarted) return;
    
    const currentQuestion = question.trim();
    setQuestion(""); 
    setIsResponding(true);
    setQuestionHistory((prev) => [...prev, currentQuestion]);

    setMessages((prev) => [
      {
        id: Date.now(),
        role: "user",
        text: currentQuestion,
      },
      ...prev,
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentQuestion,
          context: patient.aiContext,
          history: messages 
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        {
          id: Date.now() + 1,
          role: "ai",
          text: data.reply || "",
          isNewAI: true,
        },
        ...prev,
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsResponding(false); 
    }
  }

  // -------------------------
  // OBJECTIVE EXAM ENGINE
  // -------------------------
  function runPhysicalExam(type: "vitals" | "heent" | "chest" | "abdomen" | "neuro") {
    if (score !== null || isGrading || !hasStarted) return;
    setPerformedExams((prev) => ({ ...prev, [type]: true }));
  }

  // -------------------------
  // DIAGNOSIS EVALUATION SYSTEM
  // -------------------------
  async function submitDiagnosis() {
    setTimerActive(false);

    if (!patient || !diagnosis.trim() || isGrading || !hasStarted) return;
    setIsGrading(true);

    const correct = patient.hidden.diagnosis.toLowerCase().trim();
    const user = diagnosis.toLowerCase().trim();
    const isCorrect = user.includes(correct);

    const diagnosisScore = isCorrect ? 40 : 0;
    const totalExamsPerformed = Object.keys(performedExams).length;
    const examScore = Math.min(20, totalExamsPerformed * 4);

    setResult(
      isCorrect
        ? "Correct diagnosis 🎉"
        : `Incorrect. Correct answer was: ${patient.hidden.diagnosis}`
    );

    const userQuestionsOnly = questionHistory
      .map(q => `- ${q}`)
      .join("\n");
    
    const checkedExams = Object.keys(performedExams).join(", ") || "None";
    const summaryBlock = `Questions Asked:\n${userQuestionsOnly}\n\nExams Performed: ${checkedExams}`;

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investigationSummary: summaryBlock,
          chiefComplaint: patient.presentation.chiefComplaint,
          correctDiagnosis: patient.hidden.diagnosis,
          finalDiagnosis: diagnosis
        }),
      });

      const data = await res.json();
      
      const totalScore = Math.max(0, Math.min(100, Math.round(diagnosisScore + examScore + (data.historyScore ?? 0))));
      setScore(totalScore);
      setFeedback(data.feedback ?? "Evaluation compiled.");

      const currentLogs = JSON.parse(localStorage.getItem("medsim_shift_logs") || "[]");
      const updated = [{
        id: Date.now().toString(),
        patientName: patient.patient.name,
        correctDiagnosis: patient.hidden.diagnosis,
        finalScore: totalScore
      }, ...currentLogs];
      localStorage.setItem("medsim_shift_logs", JSON.stringify(updated));

    } catch (e) {
      const fallbackScore = diagnosisScore + examScore + 15;
      setScore(fallbackScore);
      setFeedback("Scoring evaluation completed with internal fallback logic values.");

      const currentLogs = JSON.parse(localStorage.getItem("medsim_shift_logs") || "[]");
      const updated = [{
        id: Date.now().toString(),
        patientName: patient.patient.name,
        correctDiagnosis: patient.hidden.diagnosis,
        finalScore: fallbackScore
      }, ...currentLogs];
      localStorage.setItem("medsim_shift_logs", JSON.stringify(updated));
    } finally {
      setIsGrading(false);
    }
  }

  if (!patient) return null;
  const isSessionEnded = score !== null;

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#0b0f17] to-[#0f172a]">
      
      <div 
        ref={activeCaseRef} 
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-[#111827] border border-white/10 shadow-2xl p-6"
      >
        
        {/* LEFT COLUMN: HISTORY INTERVIEW PANEL */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold text-white">
                Patient Admission
              </h1>
              <Link href="/dashboard" className="text-xs text-gray-400 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-all">
                📊 Exit to Dashboard
              </Link>
            </div>

            {/* OSCE TIMER DISPLAY WITH INTERACTIVE START TRIGGER */}
            {timeLeft !== null && (
              <div className={`p-4 rounded-xl border flex items-center justify-between shadow-lg transition-all duration-500 mb-6 backdrop-blur-md ${
                !hasStarted 
                  ? "bg-indigo-950/10 border-indigo-500/20 shadow-black/20"
                  : timeLeft <= 60 
                    ? "bg-red-950/20 border-red-500/40 shadow-red-950/50 animate-pulse" 
                    : "bg-gray-900/40 border-white/10 shadow-black/40"
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      hasStarted && timeLeft <= 60 ? "animate-ping bg-red-400" : hasStarted ? "animate-ping bg-indigo-400" : "bg-gray-500"
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                      hasStarted && timeLeft <= 60 ? "bg-red-500" : hasStarted ? "bg-indigo-500" : "bg-gray-500"
                    }`}></span>
                  </span>
                  
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none mb-0.5">
                      OSCE Examination
                    </span>
                    <span className="text-xs font-medium tracking-wide text-gray-300">
                      {!hasStarted ? "Awaiting Consultation Init" : "Active Evaluation Station"}
                    </span>
                  </div>
                </div>

                {!hasStarted ? (
                  <button
                    onClick={() => {
                      setTimerActive(true);
                      setHasStarted(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all shadow-md shadow-indigo-600/10 border border-indigo-400/20"
                  >
                    ▶ Start Timer
                  </button>
                ) : (
                  <div className={`text-2xl font-mono font-black tracking-widest px-3 py-1 rounded-lg bg-black/40 border transition-colors duration-500 ${
                    timeLeft <= 60 
                      ? "text-red-500 border-red-500/20" 
                      : "text-indigo-400 border-white/5"
                  }`}>
                    {formatTime(timeLeft)}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-1 text-sm text-gray-300 bg-black/20 p-4 rounded-xl border border-white/5">
              <p><span className="text-gray-400">Name:</span> {patient.patient.name}</p>
              <p><span className="text-gray-400">Age:</span> {patient.patient.age}</p>
              <p><span className="text-gray-400">Sex:</span> {patient.patient.sex}</p>
              <p><span className="text-gray-400">Occupation:</span> {patient.patient.occupation}</p>
              <p><span className="text-gray-400">Personality:</span> {patient.patient.personality}</p>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-black/30 border border-white/10">
              <p className="text-xs text-gray-400 uppercase mb-2">
                Presenting Complaint
              </p>
              <p className="text-sm text-gray-100">
                {patient.presentation.chiefComplaint}
              </p>
            </div>

            <div className="space-y-3 mt-4">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={!hasStarted || isResponding || isGrading || isSessionEnded}
                placeholder={!hasStarted ? "Start consultation timer above to write..." : isSessionEnded ? "Case finalized." : "Ask a clinical question..."}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); 
                    if (question.trim() && !isResponding && !isGrading && !isSessionEnded && hasStarted) {
                      askQuestion();
                    }
                  }
                }}
              />

              <button
                onClick={askQuestion}
                disabled={!hasStarted || !question.trim() || isResponding || isGrading || isSessionEnded}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-950 disabled:text-gray-500 disabled:cursor-not-allowed p-3 rounded-xl text-white font-medium text-sm transition-colors"
              >
                Ask Question
              </button>
            </div>

            <div 
              ref={chatContainerRef}
              className="mt-4 space-y-3 max-h-48 overflow-y-auto pr-1 border-t border-white/5 pt-3 transition-all duration-300"
            >
              {isResponding && (
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 text-xs font-medium flex items-center justify-between shadow-inner animate-pulse">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span>Patient processing inquiry...</span>
                  </div>
                  <span className="text-[10px] uppercase bg-indigo-900/50 px-2 py-0.5 rounded border border-indigo-500/20 tracking-wider">Analyzing</span>
                </div>
              )}

              {messages.map((m, idx) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-xl border border-white/5 transition-all duration-300 ${
                    m.role === "user" 
                      ? "bg-indigo-950/20 border-indigo-500/10 ml-6" 
                      : "bg-black/40 mr-6"
                  }`}
                >
                  <p className={`text-xs mb-1 font-semibold ${m.role === "user" ? "text-indigo-400" : "text-emerald-400"}`}>
                    {m.role === "user" ? "You" : "Patient"}
                  </p>
                  
                  {m.role === "ai" && m.isNewAI && idx === 0 ? (
                    <StreamingText text={m.text} />
                  ) : (
                    <p className="text-gray-200 text-sm leading-relaxed">{m.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PHYSICAL ASSESSMENT PANEL */}
        <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Objective Assessment</h2>
            <p className="text-xs text-gray-400 mb-2">Perform components of the physical exam:</p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {(["vitals", "heent", "chest", "abdomen", "neuro"] as const).map((examType) => (
                <button 
                  key={examType} 
                  onClick={() => runPhysicalExam(examType)}
                  disabled={!hasStarted || isGrading || isSessionEnded}
                  className={`p-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    performedExams[examType] 
                      ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400" 
                      : "bg-black/20 border-white/10 text-gray-300 hover:bg-black/40"
                  }`}
                >
                  {examType} {performedExams[examType] ? "✓" : ""}
                </button>
              ))}
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-2.5 h-44 overflow-y-auto text-sm">
              <p className="text-gray-400 font-bold uppercase tracking-wider text-xs">Exam Reports</p>
              {Object.keys(performedExams).length === 0 && (
                <p className="text-gray-500 italic text-xs pt-1">No examinations performed yet.</p>
              )}
              {Object.keys(performedExams).map((key) => (
                <div key={key} className="border-b border-white/5 pb-2 last:border-0 text-xs">
                  <span className="text-indigo-400 font-bold uppercase mr-1.5">{key}:</span>
                  <span className="text-gray-300">{(patient.hidden.examination as any)[key]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DIAGNOSIS SUBMISSION & GRADING SYSTEM */}
          <div className="space-y-3">
            <input
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              disabled={!hasStarted || isGrading || isSessionEnded}
              placeholder={!hasStarted ? "Locked until timer runs..." : isSessionEnded ? "Evaluation complete" : "Enter diagnosis..."}
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm disabled:opacity-50"
            />

            <button
              disabled={!hasStarted || !diagnosis.trim() || isGrading || isSessionEnded}
              onClick={submitDiagnosis}
              className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-950 disabled:text-gray-600 disabled:cursor-not-allowed p-3 rounded-xl text-white font-medium text-sm transition-colors"
            >
              Submit Diagnosis
            </button>

            {isGrading && (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs space-y-2 animate-pulse shadow-md">
                <p className="font-semibold">Cross-referencing Diagnostic Findings...</p>
              </div>
            )}

            {result && !isGrading && (
              <div className="p-4 rounded-xl bg-black/40 text-gray-200 text-xs border border-white/5 space-y-2">
                <p className="font-semibold text-emerald-400">{result}</p>
                {feedback && <p className="text-gray-400 border-t border-white/5 pt-1.5 italic">"{feedback}"</p>}
              </div>
            )}

            {score !== null && !isGrading && (
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex justify-between items-center">
                <p className="text-xs text-gray-400 uppercase font-medium">
                  Performance Score
                </p>
                <p className="text-2xl font-bold text-white">
                  {score}/100
                </p>
              </div>
            )}

            {isSessionEnded && (
              <button 
                onClick={admitPatient} 
                className="w-full bg-indigo-600 hover:bg-indigo-500 p-2.5 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Admit Next Patient
              </button>
            )}

            <Link href="/dashboard" className="w-full bg-white/5 hover:bg-white/10 p-2.5 rounded-xl text-gray-400 text-xs transition-colors block text-center border border-white/5">
              Back to Dashboard Overview
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
