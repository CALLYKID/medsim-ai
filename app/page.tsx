"use client";

import { useState, useEffect, useRef } from "react";
import { diseaseLibrary } from "./data/diseaseLibrary";
import type { Disease } from "./data/diseaseLibrary";

import {
  maleFirstNames,
  femaleFirstNames,
  lastNames,
  occupations,
  personalities,
  painTolerance,
  anxietyLevels,
} from "./data/generator";

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



export default function Home() {
  // -------------------------
  // STATE LAYER
  // -------------------------
  const [messages, setMessages] = useState<
    { id: number; role: "user" | "ai"; text: string; isNewAI?: boolean }[]
  >([]);

  const [phase, setPhase] = useState<"menu" | "patient">("menu");
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

const activeCaseRef = useRef<HTMLDivElement>(null);

  // Auto-scroll reference markers
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Keep chat pinned smoothly to the top of the viewport frame upon arrival
  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [messages.length]);
  // Add this effect to handle smooth section scrolling on admission
useEffect(() => {
  if (phase === "patient" && activeCaseRef.current) {
    activeCaseRef.current.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
  }
}, [phase]);


  // -------------------------
  // GAME ACTION SYSTEMS
  // -------------------------
  function admitPatient() {
    const randomDisease =
      diseaseLibrary[Math.floor(Math.random() * diseaseLibrary.length)];

    const generatedPatient = generatePatient(randomDisease);

    setMessages([]);
    setPatient(generatedPatient);
    setPhase("patient");

    setQuestion("");
    setDiagnosis("");
    setResult("");
    setScore(null);
    setFeedback("");
    setQuestionHistory([]);
    setPerformedExams({});
    setIsResponding(false);
    setIsGrading(false);
  }

  function reset() {
    setMessages([]);
    setPatient(null);
    setPhase("menu");

    setQuestion("");
    setDiagnosis("");
    setResult("");
    setScore(null);
    setFeedback("");
    setQuestionHistory([]);
    setPerformedExams({});
    setIsResponding(false);
    setIsGrading(false);
  }

  async function askQuestion() {
    if (!patient || !question.trim() || isResponding || isGrading) return;
    
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
    if (score !== null || isGrading) return;
    setPerformedExams((prev) => ({ ...prev, [type]: true }));
  }

  // -------------------------
  // DIAGNOSIS EVALUATION SYSTEM
  // -------------------------
  async function submitDiagnosis() {
    if (!patient || !diagnosis.trim() || isGrading) return;
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

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionHistory: questionHistory,
          chiefComplaint: patient.presentation.chiefComplaint,
          correctDiagnosis: patient.hidden.diagnosis,
          finalDiagnosis: diagnosis
        }),
      });

      const data = await res.json();
      
      const totalScore = Math.max(0, Math.min(100, Math.round(diagnosisScore + examScore + (data.historyScore ?? 0))));
      setScore(totalScore);
      setFeedback(data.feedback ?? "Evaluation compiled.");
    } catch (e) {
      setScore(diagnosisScore + examScore + 15);
      setFeedback("Scoring evaluation completed with internal fallback logic values.");
    } finally {
      setIsGrading(false);
    }
  }

  // -------------------------
  // UI CORE ROUTER
  // -------------------------
  if (phase === "patient" && patient) {
    const isSessionEnded = score !== null;

    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#0b0f17] to-[#0f172a]">
        
        {/* RIGHT HERE! Replace your old <div> with this ref-attached one: */}
        <div 
          ref={activeCaseRef} 
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-[#111827] border border-white/10 shadow-2xl p-6"
        >
          
          {/* LEFT COLUMN: HISTORY INTERVIEW PANEL */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h1 className="text-xl font-semibold mb-4 text-white">
                Patient Admission
              </h1>

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
                  disabled={isResponding || isGrading || isSessionEnded}
                  placeholder={isSessionEnded ? "Case finalized." : "Ask a clinical question..."}
                  className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); 
                      if (question.trim() && !isResponding && !isGrading && !isSessionEnded) {
                        askQuestion();
                      }
                    }
                  }}
                />

                <button
                  onClick={askQuestion}
                  disabled={!question.trim() || isResponding || isGrading || isSessionEnded}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-950 disabled:text-gray-500 disabled:cursor-not-allowed p-3 rounded-xl text-white font-medium text-sm transition-colors"
                >
                  Ask Question
                </button>
              </div>

              {/* FIXED SCROLL CONTAINER LOGIC WITH REVERSE CHAT INDEXING */}
              <div 
                ref={chatContainerRef}
                className="mt-4 space-y-3 max-h-48 overflow-y-auto pr-1 border-t border-white/5 pt-3 transition-all duration-300"
              >
                {/* COOL ANALYSING PULSE ANIMATION PLACED PROMINENTLY AT TOP */}
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
                    disabled={isGrading || isSessionEnded}
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
                disabled={isGrading || isSessionEnded}
                placeholder={isSessionEnded ? "Evaluation complete" : "Enter diagnosis..."}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm disabled:opacity-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault(); 
                }}
              />

              <button
                disabled={!diagnosis.trim() || isGrading || isSessionEnded}
                onClick={submitDiagnosis}
                className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-950 disabled:text-gray-600 disabled:cursor-not-allowed p-3 rounded-xl text-white font-medium text-sm transition-colors"
              >
                Submit Diagnosis
              </button>

              {/* HIGH-SATISFACTION INTERACTION FLOW: EXAM ANALYSIS LOADER */}
              {isGrading && (
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs space-y-2 animate-pulse shadow-md">
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Cross-referencing Diagnostic Findings...</span>
                  </div>
                  <p className="text-gray-400 italic text-[11px]">Compiling clinical history scores and evaluating physical exam workflow matrices.</p>
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

              <button
                onClick={reset}
                className="w-full bg-white/5 hover:bg-white/10 p-2.5 rounded-xl text-gray-400 text-xs transition-colors"
              >
                Back to Dashboard
              </button>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // -------------------------
  // MAIN MENU DASHBOARD
  // -------------------------
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0f17] to-[#0f172a]">
      <div className="text-center w-full max-w-md p-4">
        <h1 className="text-4xl font-bold text-white mb-3">MedSim AI</h1>
        <p className="text-gray-400 mb-8 text-sm">Clinical simulation training environment</p>
        <button
          onClick={admitPatient}
          className="w-full bg-indigo-600 hover:bg-indigo-500 p-4 rounded-xl font-semibold text-white tracking-wide transition-colors shadow-lg shadow-indigo-600/20"
        >
          Admit Patient
        </button>
      </div>
    </main>
  );
}
