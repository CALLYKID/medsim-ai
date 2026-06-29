"use client";

import { useState, useEffect, useRef } from "react";
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
      // CRITICAL FIX: Pass properties into the actual runtime object context
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
    // ADD THESE FOUR LINES RIGHT HERE:
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
  // TIMER STATES
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  
    // SHIFT LOG TRACKER STATE
  const [shiftHistory, setShiftHistory] = useState<{
    id: string;
    patientName: string;
    correctDiagnosis: string;
    finalScore: number;
  }[]>([]);

  // ENGINE 1: INITIALIZE AND LOAD CLOUD BACKUP IF SIGNED IN
  useEffect(() => {
    const isSynced = localStorage.getItem("medsim_auth_status") === "true";
    if (isSynced) {
      const savedLogs = localStorage.getItem("medsim_cloud_backup_logs");
      if (savedLogs) {
        setShiftHistory(JSON.parse(savedLogs));
      }
    }
  }, []);

  // ENGINE 2: AUTOMATIC BACKUP SYNC LAYER
  useEffect(() => {
    const isSynced = localStorage.getItem("medsim_auth_status") === "true";
    // ONLY back up data if the user explicitly chose to sign in
    if (isSynced && shiftHistory.length > 0) {
      localStorage.setItem("medsim_cloud_backup_logs", JSON.stringify(shiftHistory));
    }
  }, [shiftHistory]);


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
  // OSCE TIMER COUNTDOWN ENGINE
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timeLeft !== null && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      // TIME OUT ACTION: Force-submit what they have
      setTimerActive(false);
      submitDiagnosis(); 
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);
    // AUTO-ADMIT ON INITIAL LAB LANDING
  useEffect(() => {
    if (shiftHistory.length === 0 && phase === "menu") {
      admitPatient();
    }
  }, []);


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
    
    // START THE COUNTDOWN
    setTimeLeft(300); // 5 minutes in seconds
    setTimerActive(true);
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
    
    // RESET TIMER TO CLEAN SLATE
    setTimeLeft(null);
    setTimerActive(false);
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
          // PASS CURRENT HISTORY
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
    if (score !== null || isGrading) return;
    setPerformedExams((prev) => ({ ...prev, [type]: true }));
  }

  // -------------------------
  // DIAGNOSIS EVALUATION SYSTEM
  // -------------------------
  async function submitDiagnosis() {
    setTimerActive(false);

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

    // COST OPTIMIZATION MATRIX: Build lean text summary string
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

      // Move this tracking record variable declaration out here
      const caseRecord = {
        id: Date.now().toString(),
        patientName: patient.patient.name,
        correctDiagnosis: patient.hidden.diagnosis,
        finalScore: totalScore
      };
      setShiftHistory(prev => [caseRecord, ...prev]);

    } catch (e) {
      const fallbackScore = diagnosisScore + examScore + 15;
      setScore(fallbackScore);
      setFeedback("Scoring evaluation completed with internal fallback logic values.");

      // CRITICAL: Catch errors and log the fallback case anyway!
      const caseRecord = {
        id: Date.now().toString(),
        patientName: patient.patient.name,
        correctDiagnosis: patient.hidden.diagnosis,
        finalScore: fallbackScore
      };
      setShiftHistory(prev => [caseRecord, ...prev]);
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
{/* HIGH-END OSCE TIMER DISPLAY */}
{timeLeft !== null && (
  <div className={`p-4 rounded-xl border flex items-center justify-between shadow-lg transition-all duration-500 mb-6 backdrop-blur-md ${
    timeLeft <= 60 
      ? "bg-red-950/20 border-red-500/40 shadow-red-950/50 animate-pulse" 
      : "bg-gray-900/40 border-white/10 shadow-black/40"
  }`}>
    <div className="flex items-center gap-2.5">
      {/* Dynamic Status Beacon */}
      <span className="relative flex h-2.5 w-2.5">
        <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
          timeLeft <= 60 ? "bg-red-400" : "bg-indigo-400"
        }`}></span>
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
          timeLeft <= 60 ? "bg-red-500" : "bg-indigo-500"
        }`}></span>
      </span>
      
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none mb-0.5">
          OSCE Examination
        </span>
        <span className={`text-xs font-medium tracking-wide ${
          timeLeft <= 60 ? "text-red-400" : "text-gray-300"
        }`}>
          Active Evaluation Station
        </span>
      </div>
    </div>

    {/* Digital Monospace Clock Face */}
    <div className={`text-2xl font-mono font-black tracking-widest px-3 py-1 rounded-lg bg-black/40 border transition-colors duration-500 ${
      timeLeft <= 60 
        ? "text-red-500 border-red-500/20" 
        : "text-indigo-400 border-white/5"
    }`}>
      {formatTime(timeLeft)}
    </div>
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
  // MAIN MENU DASHBOARD (PREMIUM HOSPITAL PORTAL)
  // -------------------------
  // Inside the dashboard return layer, right above your <h1> title:
  const isSyncedMode = typeof window !== "undefined" && localStorage.getItem("medsim_auth_status") === "true";

  // Inside the header div, near your live environment pulse:
  <div className="flex items-center gap-2 mb-1">
    <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isSyncedMode ? "bg-emerald-400" : "bg-amber-400"}`} />
    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
      {isSyncedMode ? "Cloud Sync Enabled (Backup Active)" : "Local Session (No Backup)"}
    </span>
  </div>


  const averageScore = shiftHistory.length > 0 
    ? Math.round(shiftHistory.reduce((acc, curr) => acc + curr.finalScore, 0) / shiftHistory.length)
    : 0;

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 bg-[#070a12] text-white">
      <div className="w-full max-w-4xl space-y-6 mt-6 sm:mt-12 animate-fade-in">
        
        {/* PREMIUM GLOWING HEADER BLOCK */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-950 to-[#0e1626] border border-white/5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">SimLab Live Environment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight">
              Clinical Command Center
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Track consultative performance matrices and evaluation history.</p>
          </div>
          <button
            onClick={admitPatient}
            className="z-10 whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all shadow-lg shadow-indigo-600/20 border border-indigo-400/20 flex items-center justify-center gap-2"
          >
            <span>+ Admit Next Patient</span>
          </button>
        </div>

        {/* METRICS DISPLAY PANEL */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#0f1626]/60 backdrop-blur-md border border-white/5 shadow-xl flex flex-col justify-between relative group hover:border-white/10 transition-colors">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Total Intakes</span>
              <span className="text-4xl font-black font-mono text-indigo-400 tracking-tight">{shiftHistory.length}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-3 border-t border-white/5 pt-2">Cases evaluated this shift</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0f1626]/60 backdrop-blur-md border border-white/5 shadow-xl flex flex-col justify-between relative group hover:border-white/10 transition-colors">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Diagnostic Accuracy</span>
              <span className={`text-4xl font-black font-mono tracking-tight ${averageScore >= 70 ? "text-emerald-400" : "text-amber-400"}`}>{averageScore}%</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-3 border-t border-white/5 pt-2">Global session score index</p>
          </div>
        </div>

        {/* HISTORICAL CLINICAL LOG TABLE */}
        <div className="rounded-2xl bg-[#0f1626]/40 backdrop-blur-md border border-white/5 shadow-2xl p-5 overflow-hidden">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
              <span>Shift Consultation Logs</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] font-mono text-gray-400">{shiftHistory.length} Saved</span>
            </h2>
          </div>
          
          {shiftHistory.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl bg-black/10">
              <p className="text-xs text-gray-500 font-medium max-w-xs mx-auto">No telemetry data recorded. Launch an intake session above to initiate your clinical trial log.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 max-h-72 overflow-y-auto pr-1 space-y-1.5 pt-1">
              {shiftHistory.map((log) => (
                <div key={log.id} className="py-3 px-4 rounded-xl bg-black/20 border border-white/[0.02] flex justify-between items-center text-sm hover:bg-black/30 transition-all group">
                  <div className="space-y-0.5">
                    <p className="font-bold text-gray-200 group-hover:text-white transition-colors">{log.patientName}</p>
                    <p className="text-[11px] text-gray-400 font-medium">Differential Target: <span className="text-indigo-400/80 italic">{log.correctDiagnosis}</span></p>
                  </div>
                  <div className={`font-mono font-black px-3 py-1.5 rounded-lg border text-xs tracking-wider shadow-sm ${
                    log.finalScore >= 70 
                      ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400" 
                      : "bg-amber-950/20 border-amber-500/20 text-amber-400"
                  }`}>
                    {log.finalScore}/100
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

