"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import LoggedOutDashboard from "../components/LoggedOutDashboard";

interface ShiftLog {
  id: string;
  patientName: string;
  correctDiagnosis: string;
  finalScore: number;
  timestamp?: string;
  category?: string;
  specialty?: string;
  severity?: string;
  difficulty?: "Easy" | "Moderate" | "Hard" | "Expert";
  learningPoints?: string[];
  redFlags?: string[];
}

export default function DashboardPage() {
  const [shiftHistory, setShiftHistory] = useState<ShiftLog[]>([]);
  const [selectedLog, setSelectedLog] = useState<ShiftLog | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeModalLog, setActiveModalLog] = useState<ShiftLog | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadConsultationHistory() {
      const supabase = createClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("consultation_results")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load consultation history:", error);
        setAuthLoading(false);
        return;
      }

      const logs: ShiftLog[] = (data ?? []).map((row) => ({
        id: row.id,
        patientName: row.patient_name,
        correctDiagnosis: row.correct_diagnosis,
        finalScore: row.final_score,
        timestamp: row.created_at,
        category: row.category ?? undefined,
        specialty: row.specialty ?? undefined,
        severity: row.severity ?? undefined,
        difficulty: row.difficulty ?? undefined,
        learningPoints: row.learning_points ?? [],
        redFlags: row.red_flags ?? [],
      }));

      setShiftHistory(logs);
      setAuthLoading(false);
    }

    loadConsultationHistory();
  }, []);

  const openModal = (log: ShiftLog) => {
    setActiveModalLog(log);
    setIsAnimating(true);
    setSelectedLog(log);
  };

  const closeModal = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setSelectedLog(null);
      setActiveModalLog(null);
    }, 200);
  };

  const categoryStats = shiftHistory.reduce((acc, log) => {
    const category = log.category || "Unknown";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const severityStats = shiftHistory.reduce((acc, log) => {
    const severity = log.severity || "Unknown";
    acc[severity] = (acc[severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryPerformance = shiftHistory.reduce((acc, log) => {
    const category = log.category || "Unknown";

    if (!acc[category]) {
      acc[category] = { total: 0, score: 0 };
    }

    acc[category].total++;
    acc[category].score += log.finalScore;

    return acc;
  }, {} as Record<string, { total: number; score: number }>);

  const weakestArea = Object.entries(categoryPerformance).sort((a, b) => {
    const avgA = a[1].score / a[1].total;
    const avgB = b[1].score / b[1].total;
    return avgA - avgB;
  })[0];

  const averageScore =
    shiftHistory.length > 0
      ? Math.round(
          shiftHistory.reduce((acc, curr) => acc + curr.finalScore, 0) /
            shiftHistory.length
        )
      : 0;

  if (authLoading) {
    return null;
  }

  if (!user) {
    return <LoggedOutDashboard />;
  }

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-8 lg:p-12 bg-[var(--background)] text-[var(--text)] selection:bg-[var(--primary)]/30 transition-colors duration-300"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
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
          `,
        }}
      />

      <div className="w-full max-w-7xl space-y-6 sm:space-y-8 mt-2 sm:mt-4">

        {/* HEADER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--card)] border border-[var(--primary)]/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden transition-all duration-300">
          <div
            className="absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-15"
            style={{ backgroundColor: "var(--primary)" }}
          />

          <div className="z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                SimLab Live Environment
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-[var(--text)] via-[var(--text)] to-[var(--muted)] bg-clip-text text-transparent tracking-tight">
              Clinical Command Center
            </h1>

            <p className="text-sm text-[var(--muted)] font-medium mt-1">
              Track consultative performance matrices and evaluation history.
            </p>
          </div>

          <div className="flex flex-row items-center gap-3 z-10 w-full md:w-auto">
            <Link
              href="/labs"
              className="flex-1 md:flex-initial text-center whitespace-nowrap bg-[var(--primary)] hover:brightness-110 active:scale-[0.98] px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>+ Launch Active Exam</span>
            </Link>

            <Link
              href="/"
              className="bg-white/5 hover:bg-white/10 active:scale-[0.98] px-5 py-3.5 rounded-2xl border border-white/5 text-xs font-bold uppercase tracking-wider transition-all duration-200 text-[var(--muted)] text-center cursor-pointer"
            >
              Home
            </Link>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-[var(--card)]/60 backdrop-blur-md border border-white/5 shadow-xl flex flex-col justify-between relative group hover:border-[var(--primary)]/20 transition-all duration-300">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--muted)] font-bold block mb-1">
                Total Intakes
              </span>

              <span className="text-4xl sm:text-5xl font-black font-mono text-[var(--primary)] tracking-tight transition-transform duration-300 group-hover:scale-105 inline-block origin-left">
                {shiftHistory.length}
              </span>
            </div>

            <p className="text-xs text-[var(--muted)] mt-4 border-t border-white/5 pt-3">
              Cases evaluated this shift
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-3xl bg-[var(--card)]/60 backdrop-blur-md border border-white/5 shadow-xl flex flex-col justify-between relative group hover:border-[var(--primary)]/20 transition-all duration-300">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--muted)] font-bold block mb-1">
                Diagnostic Accuracy
              </span>

              <span
                className={`text-4xl sm:text-5xl font-black font-mono tracking-tight transition-transform duration-300 group-hover:scale-105 inline-block origin-left ${
                  averageScore >= 70
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {averageScore}%
              </span>
            </div>

            <p className="text-xs text-[var(--muted)] mt-4 border-t border-white/5 pt-3">
              Global session score index
            </p>
          </div>
        </div>

        {/* EMPTY STATE / ANALYTICS */}
        {shiftHistory.length === 0 ? (
          <div className="rounded-3xl bg-[var(--card)]/80 backdrop-blur-md border border-white/5 p-8 sm:p-14 shadow-2xl text-center relative overflow-hidden space-y-6">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-10"
              style={{ backgroundColor: "var(--primary)" }}
            />

            <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)] shadow-xl">
              <svg
                className="w-8 h-8 animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
                Your Command Center is Ready
              </h2>

              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-medium">
                No telemetry data has been recorded on this shift yet. Once
                you complete patient consultations, diagnostic feedback,
                scoring matrices, and clinical learning insights will
                automatically populate here.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 text-left">
              {[
                ["Step 1", "Launch Clinical Lab", "Pick a case and review patient background files."],
                ["Step 2", "Interrogate & Examine", "Use text or real-time voice calls and order physical exams."],
                ["Step 3", "Get Graded Feedback", "Review detailed breakdown scores and learning points here."],
              ].map(([step, title, description]) => (
                <div
                  key={step}
                  className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1 hover:border-[var(--primary)]/20 transition-colors"
                >
                  <span className="text-[10px] font-mono text-[var(--primary)] font-bold uppercase tracking-wider">
                    {step}
                  </span>

                  <p className="text-xs font-bold text-[var(--text)]">
                    {title}
                  </p>

                  <p className="text-[11px] text-[var(--muted)]">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/labs"
                className="inline-flex items-center gap-2 bg-[var(--primary)] hover:brightness-110 active:scale-[0.98] px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-white transition-all duration-200 shadow-xl cursor-pointer"
              >
                <span>Start Your First Consultation &rarr;</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* CLINICAL EXPOSURE */}
            <div className="rounded-3xl bg-[var(--card)]/60 backdrop-blur-md border border-white/5 p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
                    Clinical Exposure
                  </h2>

                  <span className="text-xs font-mono text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-1 rounded-lg border border-[var(--primary)]/20">
                    {Object.keys(categoryStats).length} specialties
                  </span>
                </div>

                <div className="space-y-4">
                  {Object.entries(categoryStats)
                    .sort((a, b) => b[1] - a[1])
                    .map(([category, count]) => (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs text-[var(--muted)] font-medium truncate max-w-[180px]">
                            {category}
                          </span>

                          <span className="text-xs text-[var(--primary)] font-mono">
                            {count} cases
                          </span>
                        </div>

                        <div className="h-2.5 bg-black/40 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${(count / shiftHistory.length) * 100}%`,
                              background:
                                "linear-gradient(to right, var(--primary), color-mix(in srgb, var(--primary) 55%, white))",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* SEVERITY */}
            <div className="rounded-3xl bg-[var(--card)]/60 backdrop-blur-md border border-white/5 p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-5">
                  Patient Acuity Profile
                </h2>

                <div className="grid grid-cols-2 gap-3.5">
                  {Object.entries(severityStats).map(([severity, count]) => (
                    <div
                      key={severity}
                      className="bg-black/25 border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-[var(--primary)]/20 transition-colors"
                    >
                      <p className="text-xs text-[var(--muted)] truncate">
                        {severity}
                      </p>

                      <p className="text-3xl font-black text-[var(--text)] mt-2 font-mono">
                        {count}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DIFFICULTY */}
            <div className="rounded-3xl bg-[var(--card)]/60 backdrop-blur-md border border-white/5 p-6 shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-5">
                  Case Difficulty Profile
                </h2>

                <div className="grid grid-cols-2 gap-3.5">
                  {["Easy", "Moderate", "Hard", "Expert"].map((level) => {
                    const count = shiftHistory.filter(
                      (log) => log.difficulty === level
                    ).length;

                    return (
                      <div
                        key={level}
                        className="bg-black/25 border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-[var(--primary)]/20 transition-colors"
                      >
                        <p className="text-xs text-[var(--muted)]">{level}</p>

                        <p className="text-3xl font-black text-[var(--text)] mt-2 font-mono">
                          {count}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* PERFORMANCE */}
            <div className="rounded-3xl bg-[var(--card)]/60 backdrop-blur-md border border-white/5 p-6 shadow-xl col-span-1 lg:col-span-2">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-5">
                Diagnostic Performance Matrix
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(categoryPerformance).map(([category, data]) => {
                  const average = Math.round(data.score / data.total);

                  return (
                    <div
                      key={category}
                      className="bg-black/25 p-4 rounded-2xl border border-white/5 hover:border-[var(--primary)]/20 transition-colors"
                    >
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-[var(--muted)] font-medium truncate max-w-[200px]">
                          {category}
                        </span>

                        <span
                          className={
                            average >= 70
                              ? "text-emerald-400 font-mono font-bold"
                              : "text-amber-400 font-mono font-bold"
                          }
                        >
                          {average}%
                        </span>
                      </div>

                      <div className="h-2.5 bg-black/40 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${average}%`,
                            backgroundColor: "var(--primary)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI INSIGHT */}
            {weakestArea && (
              <div className="rounded-3xl bg-[var(--card)]/70 border border-[var(--primary)]/20 p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top right, var(--primary), transparent 60%)",
                  }}
                />

                <div className="relative">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--primary)] mb-3">
                    Clinical Performance Insight
                  </h2>

                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                    Your current simulation history shows the lowest average
                    score in{" "}
                    <span className="text-[var(--primary)] font-bold">
                      {weakestArea[0]}
                    </span>
                    . This is based only on completed cases and may change as
                    more simulations are recorded.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* HISTORY */}
        <div className="rounded-3xl bg-[var(--card)]/50 backdrop-blur-md border border-white/5 shadow-2xl p-6 sm:p-8 overflow-hidden">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] flex items-center gap-2">
              <span>Shift Consultation Logs</span>

              <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-mono text-[var(--muted)]">
                {shiftHistory.length} Saved
              </span>
            </h2>
          </div>

          {shiftHistory.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-3xl bg-black/10 px-4">
              <p className="text-xs text-[var(--muted)] font-medium">
                No consultations logged yet. Your completed exam archives will
                appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 max-h-[440px] overflow-y-auto pr-2 space-y-3 pt-1 scrollbar-thin scrollbar-thumb-slate-800">
              {shiftHistory.map((log) => (
                <button
                  key={log.id}
                  onClick={() => openModal(log)}
                  className="w-full text-left py-4 px-4 sm:px-6 rounded-2xl bg-black/20 hover:bg-white/[0.03] border border-white/[0.02] hover:border-[var(--primary)]/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm transition-all duration-200 ease-out group focus:outline-none hover:translate-x-0.5 active:scale-[0.995] cursor-pointer"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="font-bold text-[var(--text)] group-hover:text-white transition-colors text-base truncate">
                      {log.patientName}
                    </p>

                    <p className="text-xs text-[var(--muted)] font-medium truncate">
                      Differential Target:{" "}
                      <span className="text-[var(--primary)] italic font-mono">
                        {log.correctDiagnosis}
                      </span>
                    </p>

                    <p className="text-[11px] text-[var(--muted)] font-medium">
                      {log.category || "Unknown"}
                      {" • "}
                      {log.difficulty || "Unknown"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    {log.timestamp && (
                      <span className="text-xs font-mono font-bold tracking-tight text-[var(--muted)] bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-xl flex items-center gap-2 transition-colors group-hover:border-white/10">
                        <svg
                          className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span>
                          {new Date(log.timestamp).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          ) +
                            " • " +
                            new Date(log.timestamp).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                        </span>
                      </span>
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        className={`font-mono font-black min-w-[65px] text-center px-3.5 py-1.5 rounded-xl border text-xs tracking-wider shadow-sm ${
                          log.finalScore >= 70
                            ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-400 group-hover:bg-emerald-950/30 group-hover:border-emerald-500/30"
                            : "bg-amber-950/20 border-amber-500/20 text-amber-400 group-hover:bg-amber-950/30 group-hover:border-amber-500/30"
                        }`}
                      >
                        {log.finalScore}/100
                      </div>

                      <svg
                        className="w-4 h-4 text-gray-600 group-hover:text-[var(--primary)] transition-all duration-200 transform group-hover:translate-x-1 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {selectedLog && activeModalLog && (
        <div
          className={`fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 ${
            isAnimating ? "animate-backdrop-in" : "animate-backdrop-out"
          }`}
          onClick={closeModal}
        >
          <div
            className={`w-full max-w-lg rounded-3xl bg-[var(--card)] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-5 ${
              isAnimating ? "animate-card-in" : "animate-card-out"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute top-0 left-0 w-full h-1.5"
              style={{ backgroundColor: "var(--primary)" }}
            />

            <div className="flex justify-between items-start gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-[var(--primary)] uppercase tracking-widest block mb-1">
                  Clinical Case File
                </span>

                <h3 className="text-xl font-black text-[var(--text)]">
                  {activeModalLog.patientName}
                </h3>
              </div>

              {activeModalLog.timestamp && (
                <span className="text-xs font-mono text-[var(--muted)] bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 shadow-inner whitespace-nowrap">
                  {new Date(activeModalLog.timestamp).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
              )}
            </div>

            <div className="space-y-4 pt-1 max-h-[60vh] overflow-y-auto pr-1">
              {activeModalLog.learningPoints &&
                activeModalLog.learningPoints.length > 0 && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-bold block mb-2">
                      Clinical Learning Points
                    </span>

                    <div className="space-y-2">
                      {activeModalLog.learningPoints.map((point, index) => (
                        <p
                          key={index}
                          className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed"
                        >
                          ✓ {point}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

              {activeModalLog.redFlags &&
                activeModalLog.redFlags.length > 0 && (
                  <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20">
                    <span className="text-[10px] uppercase tracking-wider text-red-400 font-bold block mb-2">
                      Critical Red Flags
                    </span>

                    <div className="space-y-2">
                      {activeModalLog.redFlags.map((flag, index) => (
                        <p
                          key={index}
                          className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed"
                        >
                          ⚠ {flag}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

              {activeModalLog.difficulty && (
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] font-bold block mb-1">
                    Case Difficulty
                  </span>

                  <p className="text-base font-black text-[var(--primary)] font-mono">
                    {activeModalLog.difficulty}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-1">
                  Full Differential Target
                </span>

                <p className="text-xs sm:text-sm font-semibold text-[var(--primary)] font-mono leading-relaxed break-words">
                  {activeModalLog.correctDiagnosis}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-0.5">
                    Final OSCE Evaluation
                  </span>

                  <span className="text-xs text-[var(--muted)]">
                    Total metrics achieved
                  </span>
                </div>

                <div
                  className={`font-mono font-black text-base px-4 py-2 rounded-xl border tracking-wider ${
                    activeModalLog.finalScore >= 70
                      ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-400 shadow-lg"
                      : "bg-amber-950/30 border-amber-500/30 text-amber-400 shadow-lg"
                  }`}
                >
                  {activeModalLog.finalScore}/100
                </div>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="w-full mt-4 bg-white/5 hover:bg-white/10 active:scale-[0.985] border border-white/5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-150 text-[var(--muted)] flex items-center justify-center shadow-md cursor-pointer"
            >
              Close Record Review
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
