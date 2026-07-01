"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [shiftHistory, setShiftHistory] = useState<{
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
  }, []);

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
          <div className="flex gap-3 z-10">
            <Link
              href="/labs"
              className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all shadow-lg shadow-indigo-600/20 border border-indigo-400/20 flex items-center justify-center gap-2"
            >
              <span>+ Launch Active Exam</span>
            </Link>
            <Link href="/" className="bg-white/5 hover:bg-white/10 px-4 py-3.5 rounded-xl border border-white/5 text-xs font-bold uppercase tracking-wider transition-all text-gray-300">
              Home
            </Link>
          </div>
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
