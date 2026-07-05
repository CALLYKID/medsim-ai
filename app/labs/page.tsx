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
  const genderMap = sex === "Male" ? patientAvatars.male : patientAvatars.female;
  if (age <= 25) return genderMap.young;
  if (age <= 50) return genderMap.adult;
  if (age <= 65) return genderMap.middle;
  return genderMap.senior;
}

function generatePatient(caseData: Disease) {
  const sex = Math.random() > 0.5 ? "Male" : "Female";

  const firstName =
    sex === "Male"
      ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
      : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];

  const lastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  const age = Math.floor(Math.random() * 63) + 18;
  const occupation = occupations[Math.floor(Math.random() * occupations.length)];
  const personality = personalities[Math.floor(Math.random() * personalities.length)];
  const pain = painTolerance[Math.floor(Math.random() * painTolerance.length)];
  const anxiety = anxietyLevels[Math.floor(Math.random() * anxietyLevels.length)];

  return {
    ...caseData,
    presentation: {
      ...caseData.presentation,
      physicalExam: caseData.hidden?.examination ?? {
        vitals: "Vitals within acceptable operational variance.",
        heent: "HEENT evaluation clear.",
        chest: "Lungs clear to auscultation bilaterally.",
        abdomen: "Abdomen soft, non-distended.",
        neuro: "Grossly neurologically intact."
      }
    },
    patient: {
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
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

type GeneratedPatient = Disease & {
  presentation: Disease["presentation"] & {
    physicalExam: {
      vitals: string;
      heent: string;
      chest: string;
      abdomen: string;
      neuro: string;
    };
  };
  patient: {
    name: string;
    firstName: string;
    lastName: string;
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
  
  const [isGrading, setIsGrading] = useState(false); 
  const [isResponding, setIsResponding] = useState(false); 
  
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  
  const [, setShiftHistory] = useState<{
    id: string;
    patientName: string;
    correctDiagnosis: string;
    finalScore: number;
  }[]>([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem("medsim_shift_logs");
    if (savedLogs) {
      setShiftHistory(JSON.parse(savedLogs));
    }
    admitPatient();
  }, []);

  const activeCaseRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
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
  const secs = seconds % 60; // This extracts the 0-59 remainder
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};


  function admitPatient() {
    const randomDisease = diseaseLibrary[Math.floor(Math.random() * diseaseLibrary.length)];
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

  const newUserMessage = {
    id: Date.now(),
    role: "user" as const,
    text: currentQuestion,
  };

  // Synchronously compute the exact history payload to avoid React batching delays
  const updatedHistoryForAPI = [newUserMessage, ...messages];

  setMessages((prev) => [newUserMessage, ...prev]);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: currentQuestion,
        context: patient.aiContext,
        history: updatedHistoryForAPI // Sending the clean, predictable array
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      {
        id: Date.now() + 1,
        role: "ai",
        text: data.reply || "...",
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


  function runPhysicalExam(type: "vitals" | "heent" | "chest" | "abdomen" | "neuro") {
    if (score !== null || isGrading || !hasStarted) return;
    setPerformedExams((prev) => ({ ...prev, [type]: true }));
  }

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

    const userQuestionsOnly = questionHistory.map(q => `- ${q}`).join("\n");
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
      <div ref={activeCaseRef} className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-[#111827] border border-white/10 shadow-2xl p-6">
        
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold text-white">Patient Admission</h1>
              <Link href="/dashboard" className="text-xs text-gray-400 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 transition-all">
                📊 Exit to Dashboard
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-[#0f1626]/40 border border-white/5 backdrop-blur-md shadow-xl flex items-center gap-4 group hover:border-white/10 transition-colors duration-300 mb-4">
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src={getPatientAvatar(patient.patient.sex, patient.patient.age)} 
                  alt="Patient Avatar" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest mb-0.5">
                  Active Clinical Case // Intake Track
                </p>
                <h2 className="text-lg font-black text-white truncate leading-tight">
                  {patient.patient.firstName} {patient.patient.lastName}
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-gray-400 font-medium">
                  <span>Age: <strong className="text-gray-200">{patient.patient.age}</strong></span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span>Sex: <strong className="text-gray-200">{patient.patient.sex}</strong></span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="truncate">Occupation: <strong className="text-indigo-300">{patient.patient.occupation}</strong></span>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-amber-500/5 text-amber-400 border border-amber-500/10 font-bold uppercase tracking-wider">
                  {patient.patient.personality}
                </span>
                <span className="px-2 py-0.5 rounded bg-red-500/5 text-red-400 border border-red-500/10 font-bold uppercase tracking-wider">
                  Pain: {patient.patient.painTolerance}
                </span>
              </div>
            </div>

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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none mb-0.5">OSCE Examination</span>
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
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg transition-all shadow-md"
                  >
                    ▶ Start Timer
                  </button>
                ) : (
                  <div className={`text-2xl font-mono font-black tracking-widest px-3 py-1 rounded-lg bg-black/40 border ${
                    timeLeft <= 60 ? "text-red-500 border-red-500/20" : "text-indigo-400 border-white/5"
                  }`}>
                    {formatTime(timeLeft)}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 p-4 rounded-xl bg-black/30 border border-white/10">
              <p className="text-xs text-gray-400 uppercase mb-2">Presenting Complaint</p>
              <p className="text-sm text-gray-100">{patient.presentation?.chiefComplaint ?? "No data available."}</p>
            </div>

            <div className="space-y-3 mt-4">
              <textarea
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
                }}
                disabled={!hasStarted || isResponding || isGrading || isSessionEnded}
                placeholder={!hasStarted ? "Start consultation timer..." : isSessionEnded ? "Case finalized." : "Ask a clinical question..."}
                rows={1}
                className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm disabled:opacity-50 resize-none min-h-[44px] max-h-[160px] overflow-y-auto"
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
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-950 p-3 rounded-xl text-white font-medium text-sm transition-colors"
              >
                Ask Question
              </button>
            </div>

            <div ref={chatContainerRef} className="mt-4 space-y-3 max-h-48 overflow-y-auto border-t border-white/5 pt-3">
              {isResponding && (
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 text-xs font-medium flex items-center justify-between animate-pulse">
                  <span>Patient processing inquiry...</span>
                </div>
              )}

              {messages.map((m, idx) => (
                <div key={m.id} className={`p-3 rounded-xl border border-white/5 ${m.role === "user" ? "bg-indigo-950/20 border-indigo-500/10 ml-6" : "bg-black/40 mr-6"}`}>
                  <p className={`text-xs mb-1 font-semibold ${m.role === "user" ? "text-indigo-400" : "text-emerald-400"}`}>
                    {m.role === "user" ? "You" : "Patient"}
                  </p>
                  {m.role === "ai" && m.isNewAI && idx === 0 ? <StreamingText text={m.text} /> : <p className="text-gray-200 text-sm">{m.text}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">Objective Assessment</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {(["vitals", "heent", "chest", "abdomen", "neuro"] as const).map((examType) => (
                <button 
                  key={examType} 
                  onClick={() => runPhysicalExam(examType)}
                  disabled={!hasStarted || isGrading || isSessionEnded}
                  className={`p-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    performedExams[examType] ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-400" : "bg-black/20 border-white/5 text-gray-400"
                  }`}
                >
                  {examType}
                </button>
              ))}
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {Object.keys(performedExams).map((type) => {
                const examKey = type as keyof Required<Required<Disease>["presentation"]>["physicalExam"];
                return (
                  <div key={type} className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">{type} Report</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {patient.presentation?.physicalExam?.[examKey] || "No anomalies detected."}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-3">
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              disabled={!hasStarted || isGrading || isSessionEnded}
              placeholder="Type final diagnosis..."
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white text-sm"
            />
            <button
              onClick={submitDiagnosis}
              disabled={!hasStarted || !diagnosis.trim() || isGrading || isSessionEnded}
              className="w-full bg-emerald-600 hover:bg-emerald-500 p-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-widest"
            >
              {isGrading ? "Compiling Matrix..." : "Finalize & Submit Diagnosis"}
            </button>

            {isSessionEnded && (
              <div className="p-4 rounded-xl bg-[#0f172a] border border-white/10 space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <h3 className="text-sm font-bold text-white">OSCE Score Matrix</h3>
                  <span className="text-base font-mono font-black text-emerald-400">{score}/100</span>
                </div>
                <p className="text-xs text-red-400 font-mono">{result}</p>
                <div className="text-xs text-gray-400 whitespace-pre-line max-h-32 overflow-y-auto bg-black/20 p-2.5 rounded">{feedback}</div>
                <button onClick={admitPatient} className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs py-2 rounded-lg">
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
