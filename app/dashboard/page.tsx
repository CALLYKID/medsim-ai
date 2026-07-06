"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ShiftLog {
  id: string;
  patientName: string;
  correctDiagnosis: string;
  finalScore: number;
  timestamp?: string;
}

export default function DashboardPage() {
  const [shiftHistory, setShiftHistory] = useState<ShiftLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<ShiftLog | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeModalLog, setActiveModalLog] = useState<ShiftLog | null>(null);

  useEffect(() => {
    const savedLogs = localStorage.getItem("medsim_shift_logs");
    if (savedLogs) {
      setShiftHistory(JSON.parse(savedLogs));
    }
  }, []);

  // Handle smooth state transitions for opening the overlay
  const openModal = (log: ShiftLog) => {
    setActiveModalLog(log);
    setIsAnimating(true);
    setSelectedLog(log);
  };

  // Handle smooth state transitions for closing the overlay
  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setSelectedLog(null);
      setActiveModalLog(null);
    }, 200); // Matches transition duration
  };

  const averageScore = shiftHistory.length > 0 
    ? Math.round(shiftHistory.reduce((acc, curr) => acc + curr.finalScore, 0) / shiftHistory.length)
    : 0;

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-6 bg-[#070a12] text-white">
      {/* SCOPED BUTTERY SMOOTH TRANSITIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes smoothBackdropIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(8px); }
        }
        @keyframes smoothBackdropOut {
          from { opacity: 1; backdrop-filter: blur(8px); }
          to { opacity: 0; backdrop-filter: blur(0px); }
        }
        @keyframes springyCardIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0px); }
        }
        @keyframes springyCardOut {
          from { opacity: 1; transform: scale(1) translateY(0px); }
          to { opacity: 0; transform: scale(0.95) translateY(8px); }
        }
        .animate-backdrop-in {
          animation: smoothBackdropIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-backdrop-out {
          animation: smoothBackdropOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-card-in {
          animation: springyCardIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-card-out {
          animation: springyCardOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      <div className="w-full max-w-4xl space-y-6 mt-6 sm:mt-12">
        
        {/* PREMIUM GLOWING HEADER BLOCK */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-950 to-[#0e1626] border border-white/5 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden transition-all duration-300">
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
          <div className="flex gap-3 z-10">
            <Link
              href="/labs"
              className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 shadow-lg shadow-indigo-600/20 border border-indigo-400/20 flex items-center justify-center gap-2"
            >
              <span>+ Launch Active Exam</span>
            </Link>
            <Link href="/" className="bg-white/5 hover:bg-white/10 active:scale-[0.98] px-4 py-3.5 rounded-xl border border-white/5 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-gray-300">
              Home
            </Link>
          </div>
        </div>

        {/* METRICS DISPLAY PANEL */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#0f1626]/60 backdrop-blur-md border border-white/5 shadow-xl flex flex-col justify-between relative group hover:border-white/10 transition-all duration-300">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Total Intakes</span>
              <span className="text-4xl font-black font-mono text-indigo-400 tracking-tight transition-transform duration-300 group-hover:scale-105 inline-block origin-left">{shiftHistory.length}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-3 border-t border-white/5 pt-2">Cases evaluated this shift</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#0f1626]/60 backdrop-blur-md border border-white/5 shadow-xl flex flex-col justify-between relative group hover:border-white/10 transition-all duration-300">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Diagnostic Accuracy</span>
              <span className={`text-4xl font-black font-mono tracking-tight transition-transform duration-300 group-hover:scale-105 inline-block origin-left ${averageScore >= 70 ? "text-emerald-400" : "text-amber-400"}`}>{averageScore}%</span>
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
                <button
                  key={log.id} 
                  onClick={() => openModal(log)}
                  className="w-full text-left py-3 px-4 rounded-xl bg-black/10 hover:bg-white/[0.02] border border-white/[0.01] hover:border-white/[0.08] flex justify-between items-center text-sm transition-all duration-200 ease-out group focus:outline-none hover:translate-x-0.5 active:scale-[0.995]"
                >
                  {/* LEFT SIDE: CLINICAL DETAILS */}
                  <div className="space-y-0.5 min-w-0 flex-1 pr-4">
                    <p className="font-bold text-gray-200 group-hover:text-white transition-colors truncate">{log.patientName}</p>
                    <p className="text-[11px] text-gray-400 font-medium truncate">
                      Differential Target: <span className="text-indigo-400/80 italic font-mono transition-colors group-hover:text-indigo-300">{log.correctDiagnosis}</span>
                    </p>
                  </div>

                                   {/* RIGHT SIDE: METRIC SCORE & PROGRESS TIMESTAMP WITH EXPAND CUE */}
                  <div className="flex items-center gap-3 shrink-0 text-right">
                    {log.timestamp && (
                      <span className="text-[10px] font-mono font-bold tracking-tight text-gray-500 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors group-hover:border-white/10 group-hover:text-gray-400">
                        {/* Tiny clock indicator */}
                        <svg className="w-3 h-3 text-gray-500 group-hover:text-indigo-400 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{log.timestamp.split(" • ")[1] || log.timestamp}</span>
                      </span>
                    )}
                    
                    <div className={`font-mono font-black min-w-[60px] text-center px-2.5 py-1.5 rounded-lg border text-xs tracking-wider shadow-sm ${
                      log.finalScore >= 70 
                        ? "bg-emerald-950/10 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-950/20 group-hover:border-emerald-500/30" 
                        : "bg-amber-950/10 border-amber-500/20 text-amber-400 group-hover:bg-amber-950/20 group-hover:border-amber-500/30"
                    }`}>
                      {log.finalScore}/100
                    </div>

                    {/* Tiny trailing interactive expand chevron */}
                    <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-300 transition-all duration-200 transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* OVERLAY CARD / MODAL DETAILED REVIEW PANEL */}
      {selectedLog && activeModalLog && (
        <div 
          className={`fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 ${
            isAnimating ? "animate-backdrop-in" : "animate-backdrop-out"
          }`} 
          onClick={closeModal}
        >
          <div 
            className={`w-full max-w-md rounded-2xl bg-[#0f1626] border border-white/10 p-6 shadow-2xl relative overflow-hidden space-y-4 ${
              isAnimating ? "animate-card-in" : "animate-card-out"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest block mb-0.5">Clinical Case File</span>
                <h3 className="text-lg font-black text-white">{activeModalLog.patientName}</h3>
              </div>
              {activeModalLog.timestamp && (
                <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5 shadow-inner">
                  {activeModalLog.timestamp}
                </span>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors duration-300">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Full Differential Target</span>
                <p className="text-sm font-semibold text-indigo-300 font-mono leading-relaxed break-words whitespace-normal">
                  {activeModalLog.correctDiagnosis}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors duration-300">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">Final OSCE Evaluation</span>
                  <span className="text-xs text-gray-400">Total metrics achieved</span>
                </div>
                <div className={`font-mono font-black text-base px-4 py-2 rounded-xl border tracking-wider transition-all duration-300 ${
                  activeModalLog.finalScore >= 70 
                    ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/5" 
                    : "bg-amber-950/30 border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/5"
                }`}>
                  {activeModalLog.finalScore}/100
                </div>
              </div>
            </div>

            <button 
              onClick={closeModal}
              className="w-full mt-2 bg-white/5 hover:bg-white/10 active:scale-[0.985] border border-white/5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 text-gray-300 flex items-center justify-center"
            >
              Close Record Review
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
