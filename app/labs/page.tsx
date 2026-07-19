"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { Patient } from "../data/patientGenerator";
import { generatePatient } from "../data/patientGenerator";
import { buildPatientPrompt } from "../data/patientPromptBuilder";
import { diseaseLibrary } from "../data/diseaseLibrary";

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

  return <span className="text-slate-100 text-sm leading-relaxed tracking-wide">{displayedText}</span>;
}

export default function LabsPage() {
  const [messages, setMessages] = useState<
    { id: number; role: "user" | "ai"; text: string; isNewAI?: boolean }[]
  >([]);

  const [patient, setPatient] = useState<Patient | null>(null);
  const [currentPatientPrompt, setCurrentPatientPrompt] = useState("");
  const [question, setQuestion] = useState("");
  
  // Differential Inputs
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
  const [performedExams, setPerformedExams] = useState<Record<string, boolean>>({});
  
  const [isGrading, setIsGrading] = useState(false); 
  const [isResponding, setIsResponding] = useState(false); 
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    admitPatient();
  }, []);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
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
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  function admitPatient() {
    const randomDisease = diseaseLibrary[Math.floor(Math.random() * diseaseLibrary.length)];
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
    setTimeLeft(300); 
    setTimerActive(false);
    setHasStarted(false);
  }

  async function askQuestion() {
    if (!patient || !question.trim() || isResponding || isGrading || !hasStarted) return;

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentQuestion,
          context: currentPatientPrompt,
          history: updatedHistoryForAPI
        }),
      });

      const data = await res.json();    
      if (res.ok && data && data.reply) {    
        setMessages((prev) => [    
          {    
            id: Date.now() + 1,    
            role: "ai",    
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
    }
  }

  function runPhysicalExam(type: "vitals" | "heent" | "chest" | "abdomen" | "neuro") {
    if (score !== null || isGrading || !hasStarted) return;
    setPerformedExams((prev) => ({ ...prev, [type]: true }));
  }

    async function submitDiagnosis() {
    setTimerActive(false);
    if (!patient || !diagnosis.trim() || isGrading || !hasStarted) return;
    setIsGrading(true);

    const correct = patient.disease.hidden.diagnosis.toLowerCase().trim();
    const finalUserDiag = diagnosis.toLowerCase().trim();
    
    // 1. Accuracy Metric (10 pts)
    const isPrimaryCorrect = finalUserDiag.includes(correct);
    const accuracyScore = isPrimaryCorrect ? 10 : 0;

    // 2. Differential Working Matrix Metric (30 pts)
    let differentialScore = 0;
    const d1Match = diff1.toLowerCase().trim().includes(correct);
    const d2Match = diff2.toLowerCase().trim().includes(correct);
    const d3Match = diff3.toLowerCase().trim().includes(correct);

    if (isPrimaryCorrect) {
      differentialScore = 30; // Perfect mapping match
    } else if (d1Match || d2Match || d3Match) {
      differentialScore = 20; // On the secondary spectrum
    } else {
      const activeDiffsCount = [diff1, diff2, diff3].filter(d => d.trim().length > 0).length;
      differentialScore = activeDiffsCount * 5; // Basic process points
    }

    // 3. Physical Exam Metric (20 pts)
    const totalExamsPerformed = Object.keys(performedExams).length;
    const examScore = Math.min(20, totalExamsPerformed * 4);

    setResult(
      isPrimaryCorrect
        ? "Correct working diagnosis 🎉"
        : (d1Match || d2Match || d3Match)
          ? `Inquiry Alert: Correct target was down in your differentials! (${patient.disease.hidden.diagnosis})`
          : `Incorrect. Primary presentation path was: ${patient.disease.hidden.diagnosis}`
    );

    const summaryBlock = `Exams Performed: ${Object.keys(performedExams).join(", ") || "None"}`;

    try {
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investigationSummary: summaryBlock,
          chiefComplaint: patient.disease.presentation.chiefComplaint,
          correctDiagnosis: patient.disease.hidden.diagnosis,
          finalDiagnosis: diagnosis,
          differentials: [diff1, diff2, diff3],
          performedExamsCount: Object.keys(performedExams).length,
          personality: patient.personality,
          painTolerance: patient.painTolerance
        }),
      });

      const data = await res.json();
      
      // 4. History Chat Metric from LLM Evaluation (30 pts max now)
      const rawHistory = data.historyScore ?? 20; 
      const historyScore = Math.max(0, Math.min(30, rawHistory));
      
      // 5. Empathy Score from LLM Evaluation (10 pts max)
      const empathyScore = Math.max(0, Math.min(10, data.empathyScore ?? 7));
      
      // Combine all 5 elements to reach exactly 100 max
      const totalScore = Math.max(0, Math.min(100, accuracyScore + differentialScore + examScore + historyScore + empathyScore));
      
      setScore(totalScore);
      setScoreBreakdown({
        history: historyScore,
        exam: examScore,
        differential: differentialScore,
        empathy: empathyScore,
        accuracy: accuracyScore
      });
      setFeedback(data.feedback ?? "Evaluation compiled successfully.");

      const currentLogs = JSON.parse(localStorage.getItem("medsim_shift_logs") || "[]");
      const newLog = {
        id: Date.now().toString(),
        patientName: patient.name,
        correctDiagnosis: patient.disease.hidden.diagnosis,
        finalScore: totalScore,
        timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      };
      localStorage.setItem("medsim_shift_logs", JSON.stringify([newLog, ...currentLogs]));

    } catch (e) {
      // Fallback Engine Breakdown Calculation
      const historyFallback = 20;
      const empathyFallback = 7;
      const totalScore = accuracyScore + differentialScore + examScore + historyFallback + empathyFallback;
      
      setScore(totalScore);
      setScoreBreakdown({
        history: historyFallback,
        exam: examScore,
        differential: differentialScore,
        empathy: empathyFallback, // Fixed fallback configuration mapping
        accuracy: accuracyScore
      });
      setFeedback("Scoring evaluation completed with internal fallback logic values.");

      const currentLogs = JSON.parse(localStorage.getItem("medsim_shift_logs") || "[]");
      const fallbackLog = {
        id: Date.now().toString(),
        patientName: patient.name,
        correctDiagnosis: patient.disease.hidden.diagnosis,
        finalScore: totalScore,
        timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) + " • " + new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      };
      localStorage.setItem("medsim_shift_logs", JSON.stringify([fallbackLog, ...currentLogs]));
    } finally {
      setIsGrading(false);
    }
  }

  if (!patient) return null;
  const isSessionEnded = score !== null;

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 bg-[#070a12] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111a2e] via-[#070a12] to-[#04060a]">
      
      <div className="w-full max-w-6xl h-auto md:h-[85vh] md:max-h-[820px] grid grid-cols-1 md:grid-cols-12 gap-6 rounded-3xl bg-[#0d1527]/70 border border-slate-800 shadow-[0_0_50px_-12px_rgba(30,41,59,0.5)] backdrop-blur-xl p-4 sm:p-6 overflow-hidden">
        
        {/* LEFT COLUMN: History Chat & Intake */}
        <div className="md:col-span-7 flex flex-col h-full min-h-0 justify-between space-y-4">
          <div className="space-y-4 shrink-0">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-lg font-bold tracking-tight text-slate-100 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  Patient Admission
                </h1>
                <p className="text-[11px] text-slate-400 mt-0.5">Clinical Evaluation Sandbox</p>
              </div>
              <Link href="/dashboard" className="text-xs font-semibold text-slate-300 bg-slate-800/40 hover:bg-slate-800 hover:text-white px-3.5 py-1.5 rounded-xl border border-slate-700/50 shadow-inner transition-all active:scale-98">
                📊 Dashboard
              </Link>
            </div>

            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-900/40 border border-slate-800 flex items-center gap-4 group hover:border-indigo-500/20 transition-colors">
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src={getPatientAvatar(patient.gender, patient.age)} 
                  alt="Patient Avatar" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-mono font-black text-indigo-400 uppercase tracking-widest block mb-0.5">
                  Case File // Intake Track
                </span>
                <h2 className="text-base font-bold text-white tracking-tight truncate">
                  {patient.name}
                </h2>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-xs text-slate-400 font-medium mt-0.5">
                  <span>Age: <strong className="text-slate-200 font-semibold">{patient.age}</strong></span>
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span>Sex: <strong className="text-slate-200 font-semibold">{patient.gender}</strong></span>
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span className="truncate">Job: <strong className="text-indigo-300 font-semibold">{patient.occupation}</strong></span>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 font-mono text-[9px]">
                <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase tracking-wide">
                  {patient.personality}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold uppercase tracking-wide">
                  Pain: {patient.painTolerance}
                </span>
              </div>
            </div>

            {timeLeft !== null && (
              <div className={`p-3 rounded-xl border flex items-center justify-between shadow-md transition-all duration-500 ${
                !hasStarted 
                  ? "bg-indigo-950/10 border-indigo-500/20"
                  : timeLeft <= 60 
                    ? "bg-rose-950/20 border-rose-500/40 shadow-rose-950/30 animate-pulse" 
                    : "bg-slate-900/60 border-slate-800"
              }`}>
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${hasStarted ? "animate-ping bg-indigo-400" : "bg-slate-600"}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${hasStarted && timeLeft <= 60 ? "bg-rose-500" : hasStarted ? "bg-indigo-500" : "bg-slate-600"}`}></span>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">OSCE Session Timer</span>
                    <span className="text-xs font-semibold text-slate-300 mt-0.5">
                      {!hasStarted ? "Awaiting Consultation" : "Active Evaluation Station"}
                    </span>
                  </div>
                </div>

                {!hasStarted ? (
                  <button
                    onClick={() => {
                      setTimerActive(true);
                      setHasStarted(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    ▶ Start Session
                  </button>
                ) : (
                  <div className={`text-lg font-mono font-black tracking-widest px-3 py-1 rounded-xl bg-slate-950/60 border ${
                    timeLeft <= 60 ? "text-rose-500 border-rose-500/20" : "text-indigo-400 border-slate-800"
                  }`}>
                    {formatTime(timeLeft)}
                  </div>
                )}
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/80 shadow-inner">
              <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Presenting Complaint</p>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">{patient.disease.presentation?.chiefComplaint ?? "No data available."}</p>
            </div>

            <div className="relative flex items-center">
              <textarea
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
                }}
                disabled={!hasStarted || isResponding || isGrading || isSessionEnded}
                placeholder={!hasStarted ? "Unlock clinical dashboard by initiating timer..." : isSessionEnded ? "Case finalized. Review score report." : "Type clinical inquiry..."}
                rows={1}
                className="w-full pl-4 pr-12 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-40 resize-none min-h-[46px] max-h-[100px] shadow-inner overflow-y-auto transition-colors duration-200"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); 
                    if (question.trim() && !isResponding && !isGrading && !isSessionEnded && hasStarted) {
                      askQuestion();
                      (e.target as HTMLTextAreaElement).style.height = "auto";
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  askQuestion();
                  const txt = document.querySelector("textarea");
                  if (txt) txt.style.height = "auto";
                }}
                disabled={!hasStarted || !question.trim() || isResponding || isGrading || isSessionEnded}
                className="absolute right-2 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white transition-all active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[140px] relative flex flex-col overflow-hidden border-t border-slate-800/60 pt-2">
            <div 
              ref={chatContainerRef} 
              className="absolute inset-0 overflow-y-auto pr-1 space-y-3 scrollbar-thin scrollbar-thumb-slate-800/80 scrollbar-track-transparent pb-4"
            >
              {isResponding && (
                <div className="p-3 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-indigo-400 text-xs font-semibold flex items-center gap-2.5 animate-pulse">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span>Formulating patient response...</span>
                </div>
              )}

              {messages.map((m, idx) => (
                <div key={m.id} className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                  m.role === "user" 
                    ? "bg-indigo-950/10 border-indigo-500/10 ml-8" 
                    : "bg-slate-900/60 border-slate-800/80 mr-8"
                }`}>
                  <p className={`text-[9px] font-mono font-bold tracking-wider uppercase mb-1 ${m.role === "user" ? "text-indigo-400" : "text-emerald-400"}`}>
                    {m.role === "user" ? "Primary Practitioner" : "Patient Response"}
                  </p>
                  {m.role === "ai" && m.isNewAI && idx === 0 
                    ? <StreamingText text={m.text} /> 
                    : <p className="text-slate-200 text-sm leading-relaxed tracking-wide">{m.text}</p>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Objective Assessment, DDx Board, & Mixed Scoring */}
        <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-slate-800/80 pt-4 md:pt-0 md:pl-6 flex flex-col h-full min-h-0 justify-between space-y-4">
          
          <div className="flex flex-col flex-1 min-h-0 space-y-4">
            <div className="flex items-center gap-2 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.25 2.25 0 0 1 10.5 2.25h4.5a2.25 2.25 0 0 1 2.25 2.25m-7.25 15.5H4.5A2.25 2.25 0 0 1 2.25 18V6.108c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 0 1 1.123-.08" />
              </svg>
              <h2 className="text-sm font-bold text-slate-100 tracking-tight">Objective Physical Assessment</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-2 shrink-0">
              {(["vitals", "heent", "chest", "abdomen", "neuro"] as const).map((examType) => {
                const isChecked = performedExams[examType];
                return (
                  <button 
                    key={examType} 
                    onClick={() => runPhysicalExam(examType)}
                    disabled={!hasStarted || isGrading || isSessionEnded}
                    className={`group p-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider border flex items-center justify-between transition-all duration-200 active:scale-97 disabled:opacity-40 ${
                      isChecked 
                        ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-400" 
                        : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                    }`}
                  >
                    <span>{examType}</span>
                    <span className={`h-3.5 w-3.5 rounded border flex items-center justify-center text-[8px] transition-all ${
                      isChecked ? "bg-emerald-500 border-emerald-400 text-slate-950 scale-100" : "border-slate-700 bg-slate-950"
                    }`}>
                      {isChecked && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="h-[105px] relative overflow-hidden border-t border-slate-800/40 pt-2 shrink-0">
              <div className="absolute inset-0 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-800/80 scrollbar-track-transparent pb-2">
                {Object.keys(performedExams).length === 0 ? (
                  <div className="h-full flex items-center justify-center p-4 text-center rounded-2xl border border-dashed border-slate-800 text-slate-500 text-xs">
                    No clinical parameters logged. Select systems above.
                  </div>
                ) : (
                  Object.keys(performedExams).map((type) => {
                    const examKey = type as keyof Required<Patient["disease"]["hidden"]>["examination"];
                    return (
                      <div key={type} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-inner hover:border-emerald-500/20 transition-colors">
                        <div className="flex items-center justify-between mb-1 border-b border-slate-800/40 pb-1">
                          <p className="text-[9px] font-mono font-black text-emerald-400 uppercase tracking-widest">{type} Metrics Report</p>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">
                          {patient.disease.hidden?.examination?.[examKey] || "Standard ranges. No systematic anomalies detected."}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Differential Diagnosis (DDx) Tracker */}
            <div className="flex-1 min-h-[140px] flex flex-col space-y-2 border-t border-slate-800/40 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">Differential Diagnostics (DDx Board)</span>
                <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-mono font-bold">Max 30 Pts</span>
              </div>
              <div className="space-y-1.5 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                <input
                  type="text"
                  value={diff1}
                  onChange={(e) => setDiff1(e.target.value)}
                  disabled={!hasStarted || isGrading || isSessionEnded}
                  placeholder="Secondary Diagnosis Differential #1..."
                  className="w-full p-2 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-200 text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500/40"
                />
                <input
                  type="text"
                  value={diff2}
                  onChange={(e) => setDiff2(e.target.value)}
                  disabled={!hasStarted || isGrading || isSessionEnded}
                  placeholder="Secondary Diagnosis Differential #2..."
                  className="w-full p-2 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-200 text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500/40"
                />
                <input
                  type="text"
                  value={diff3}
                  onChange={(e) => setDiff3(e.target.value)}
                  disabled={!hasStarted || isGrading || isSessionEnded}
                  placeholder="Secondary Diagnosis Differential #3..."
                  className="w-full p-2 rounded-xl bg-slate-900/40 border border-slate-800 text-slate-200 text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500/40"
                />
              </div>
            </div>
          </div>

          {/* Sticky Submission & Score Reports */}
          <div className="border-t border-slate-800/60 pt-3 space-y-2.5 shrink-0">
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block pl-1">Primary Final Assessment</span>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                disabled={!hasStarted || isGrading || isSessionEnded}
                placeholder="Commit to primary final diagnosis..."
                className="w-full p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/20 disabled:opacity-40 shadow-inner"
              />
            </div>
            
            <button
              onClick={submitDiagnosis}
              disabled={!hasStarted || !diagnosis.trim() || isGrading || isSessionEnded}
              className={`w-full p-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-98 shadow-md flex items-center justify-center gap-2 ${
                isSessionEnded
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
                  : "bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 border border-emerald-500/20 disabled:border-slate-800 disabled:text-slate-600 text-slate-950 shadow-[0_4px_20px_rgba(16,185,129,0.15)]"
              }`}
            >
              {isGrading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Compiling Metrics Matrix...</span>
                </>
              ) : (
                "Finalize & Submit Diagnosis"
              )}
            </button>

            {isSessionEnded && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5 shadow-lg animate-[fadeIn_0.3s_ease-out] overflow-y-auto max-h-[220px] custom-scrollbar">
                <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                  <div>
                    <h3 className="text-xs font-bold text-white tracking-tight">OSCE Evaluation Summary</h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{result}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-black text-emerald-400">{score}/100</span>
                  </div>
                </div>

{/* Granular Breakdown Sub-panel */}
{scoreBreakdown && (
  <div className="flex flex-col gap-2 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 font-mono text-[11px]">
    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
      <span className="text-slate-400">History Chat:</span>
      <span className="text-indigo-300 font-bold">{scoreBreakdown.history}/30</span>
    </div>
    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
      <span className="text-slate-400">DDx Tracks:</span>
      <span className="text-indigo-300 font-bold">{scoreBreakdown.differential}/30</span>
    </div>
    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
      <span className="text-slate-400">Bedside Manner / Empathy:</span>
      <span className="text-indigo-300 font-bold">{scoreBreakdown.empathy}/10</span>
    </div>
    <div className="flex justify-between border-b border-slate-800/40 pb-1.5">
      <span className="text-slate-400">Physical Exam:</span>
      <span className="text-emerald-400 font-bold">{scoreBreakdown.exam}/20</span>
    </div>
    <div className="flex justify-between pt-0.5">
      <span className="text-slate-400">Primary Match:</span>
      <span className="text-emerald-400 font-bold">{scoreBreakdown.accuracy}/10</span>
    </div>
  </div>
)}

                
                <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 shadow-inner">
                  {feedback}
                </div>
                
                <button 
                  onClick={admitPatient} 
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-xl border border-slate-700/60 transition-all active:scale-98"
                >
                  Admit Next Case &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
