"use client";

import Link from "next/link";

export default function LoggedOutDashboard() {
  return (
    <main className="min-h-screen bg-[#070a12] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                Performance Dashboard
              </div>

              <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight">
                Your Clinical Performance
              </h1>

              <p className="mt-3 max-w-2xl text-gray-400 leading-relaxed">
                Track your consultation performance, identify learning gaps,
                and build your clinical reasoning skills over time.
              </p>
            </div>

            {/* HOME BUTTON */}
            <Link
              href="/"
              className="group shrink-0 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-300 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white hover:-translate-y-0.5 active:scale-95"
            >
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10.5 12 3l9 7.5M5.5 9v10.5h13V9"
                />
              </svg>
              Home
            </Link>
          </div>
        </div>

        {/* SYNC BANNER */}
        <div className="mb-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.06] p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <span className="text-xl">🔒</span>
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Sync your progress across devices
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Sign in with Google to save your completed consultations to
                your MedicSim account.
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="group shrink-0 inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3 text-xs font-black text-black shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-[0_12px_35px_rgba(255,255,255,0.14)] active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.22Z" />
              <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.03H3.27v2.53A9.74 9.74 0 0 0 12 21.5Z" />
              <path fill="#FBBC05" d="M6.51 13.58A5.86 5.86 0 0 1 6.2 12c0-.55.11-1.08.31-1.58V7.89H3.27A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.11l3.24-2.53Z" />
              <path fill="#EA4335" d="M12 6.39c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.49 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.73 5.39l3.24 2.53c.78-2.31 2.94-4.03 5.49-4.03Z" />
            </svg>

            Continue with Google

            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            ["00", "Consultations", "Total completed"],
            ["--", "Average Score", "Awaiting data"],
            ["--", "Accuracy", "Awaiting data"],
            ["--", "Recent Streak", "Awaiting data"],
          ].map(([value, title, subtitle]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] to-transparent pointer-events-none" />

              <div className="blur-md opacity-40 select-none pointer-events-none">
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="mt-2 text-sm font-bold text-white">{title}</p>
                <p className="mt-1 text-[11px] text-gray-500">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* PERFORMANCE */}
          <section className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-white">
                  Performance Overview
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Your consultation scores over time
                </p>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600 border border-white/10 rounded-full px-3 py-1">
                Locked
              </span>
            </div>

            <div className="h-64 p-6 flex items-end gap-3 overflow-hidden">
              <div className="w-full h-full flex items-end gap-3 blur-md opacity-35 select-none pointer-events-none">
                {[42, 58, 48, 72, 63, 80, 68, 88, 76, 92, 84, 96].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-lg bg-indigo-500"
                      style={{ height: `${height}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </section>

          {/* LEARNING */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <p className="text-sm font-black text-white">
                Learning Insights
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Areas identified from your consultations
              </p>
            </div>

            <div className="p-5 space-y-3">
              {[
                "Clinical reasoning",
                "Differential diagnosis",
                "History taking",
                "Examination technique",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/5 bg-black/20 p-4 blur-sm opacity-40 select-none pointer-events-none"
                >
                  <p className="text-xs font-bold text-gray-300">{item}</p>

                  <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-1/2 bg-indigo-500/40 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECENT CONSULTATIONS */}
          <section className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-white">
                  Recent Consultations
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Your latest completed clinical cases
                </p>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Sign in to view
              </span>
            </div>

            <div className="divide-y divide-white/5">
              {[
                "Clinical consultation",
                "Diagnostic reasoning case",
                "OSCE simulation",
              ].map((item) => (
                <div
                  key={item}
                  className="p-5 flex items-center justify-between blur-sm opacity-40 select-none pointer-events-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      🩺
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-300">{item}</p>
                      <p className="text-[11px] text-gray-600 mt-1">
                        Patient details hidden
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-black text-gray-500">--</p>
                    <p className="text-[10px] text-gray-700">Score</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/[0.08] to-purple-500/[0.05] p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl">
            🧠
          </div>

          <h2 className="mt-4 text-xl font-black">
            Start building your clinical record
          </h2>

          <p className="mt-2 text-sm text-gray-400 max-w-lg mx-auto">
            Complete consultations and sign in to keep your performance
            history available across your devices.
          </p>

          <Link
            href="/labs"
            className="inline-flex mt-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-xs font-black uppercase tracking-wider transition-all"
          >
            Start a Consultation
          </Link>
        </div>

      </div>
    </main>
  );
}