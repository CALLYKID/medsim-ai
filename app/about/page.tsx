"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import AccountMenu from "../components/AccountMenu";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const systems = [
  {
    number: "01",
    icon: "🩺",
    title: "Clinical Core",
    text: "Stores the structured clinical information behind each simulation, including demographics, presenting complaints, symptoms, medical history, vital signs, investigation results and possible diagnoses.",
  },
  {
    number: "02",
    icon: "🧠",
    title: "AI Patient Brain",
    text: "Controls how virtual patients behave, respond to questions and reveal information during a consultation.",
  },
  {
    number: "03",
    icon: "⚙️",
    title: "Simulation Engine",
    text: "Manages case initialization, information discovery, decision points, consultation progression and final outcomes.",
  },
  {
    number: "04",
    icon: "🔒",
    title: "Hidden Clinical State",
    text: "Maintains the underlying pathology, unrevealed symptoms, disease severity and subtle clinical details that the learner must uncover.",
  },
  {
    number: "05",
    icon: "📊",
    title: "Evaluation Engine",
    text: "Evaluates history-taking quality, crucial questions, clinical reasoning, investigations, diagnostic accuracy and management decisions.",
  },
  {
    number: "06",
    icon: "📚",
    title: "Disease Library",
    text: "Provides the structured repository of clinical cases, symptoms, patient responses, investigation findings, differential diagnoses and expected approaches.",
  },
  {
    number: "07",
    icon: "🔎",
    title: "Clinical Reasoning",
    text: "Supports the reasoning layer behind pattern recognition, alternative diagnoses and the evidence used to reach a conclusion.",
  },
  {
    number: "08",
    icon: "💻",
    title: "Frontend Application",
    text: "Connects the learner to consultation interfaces, patient telemetry, timers, dashboards and evaluation views.",
  },
  {
    number: "09",
    icon: "📈",
    title: "Dashboard System",
    text: "Provides access to simulations, performance history, longitudinal progress, completed attempts and performance metrics.",
  },
  {
    number: "10",
    icon: "🗂️",
    title: "Performance Logging",
    text: "Records completed consultation outcomes and learning metrics so performance can be reviewed over time.",
  },
];

const consultationStages = [
  {
    number: "01",
    title: "Present",
    description: "A clinical case is initialized with its own hidden state.",
  },
  {
    number: "02",
    title: "Interact",
    description: "Question the AI patient through text or real-time voice.",
  },
  {
    number: "03",
    title: "Examine",
    description: "Use physical assessments and objective clinical findings.",
  },
  {
    number: "04",
    title: "Investigate",
    description: "Request investigations and interpret the available evidence.",
  },
  {
    number: "05",
    title: "Reason",
    description: "Construct a differential diagnosis from the information gathered.",
  },
  {
    number: "06",
    title: "Diagnose",
    description: "Submit the final diagnosis and complete the consultation.",
  },
  {
    number: "07",
    title: "Evaluate",
    description: "Receive structured scoring, red flags and learning points.",
  },
];

const stack = [
  ["Frontend", "Next.js", "React + TypeScript"],
  ["Application", "API Layer", "Simulation logic"],
  ["Intelligence", "AI Systems", "Patient behaviour"],
  ["Persistence", "Supabase", "Account data"],
  ["Deployment", "Vercel", "Production platform"],
  ["Interface", "Responsive UI", "Mobile optimisation"],
];

/* ─────────────────────────────────────────────
   REVEAL
───────────────────────────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-10 scale-[0.985] opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────── */

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--text)] selection:bg-[var(--primary)]/30">

      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-22rem] h-[52rem] w-[52rem] -translate-x-1/2 rounded-full bg-[var(--primary)]/[0.06] blur-[150px]" />

        <div className="absolute bottom-[15%] left-[-15rem] h-[32rem] w-[32rem] rounded-full bg-cyan-500/[0.02] blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 75%)",
          }}
        />
      </div>

      {/* NAVIGATION */}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.055] bg-[var(--background)]/65 backdrop-blur-2xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link
            href="/"
            className="group flex cursor-pointer items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-lg transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--primary)]/60 group-hover:shadow-[0_0_25px_var(--primary)]/20">
              🩺
            </div>

            <div>
              <div className="text-sm font-black tracking-tight text-white">
                MedicSim
              </div>

              <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-gray-600">
                Clinical OSCE Engine
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link
              href="/"
              className="text-xs font-bold text-gray-500 transition-colors hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-xs font-bold text-white"
            >
              About
            </Link>

            <Link
              href="/dashboard"
              className="text-xs font-bold text-gray-500 transition-colors hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/labs"
              className="rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-2.5 text-xs font-black text-[var(--primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/15 hover:shadow-[0_8px_30px_var(--primary)]/10 active:scale-95"
            >
              Launch Simulation
            </Link>

            <AccountMenu />
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-all hover:border-white/20 hover:bg-white/[0.06] active:scale-95 md:hidden"
            aria-label="Toggle navigation"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-gray-300 transition-transform duration-300 ${
                  mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-5 bg-gray-300 transition-opacity duration-200 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-5 bg-gray-300 transition-transform duration-300 ${
                  mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/[0.06] bg-[var(--card)]/95 px-5 py-5 backdrop-blur-2xl md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1.5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-bold text-gray-400 transition-all hover:bg-white/[0.04] hover:text-white"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-white/[0.04] px-4 py-3.5 text-sm font-bold text-white"
              >
                About
              </Link>

              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3.5 text-sm font-bold text-gray-400 transition-all hover:bg-white/[0.04] hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/labs"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-4 py-3.5 text-center text-sm font-black text-[var(--primary)] transition-all hover:bg-[var(--primary)]/15 active:scale-[0.98]"
              >
                Launch Simulation
              </Link>

              <div className="mt-2 border-t border-white/[0.06] pt-3">
                <AccountMenu />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}

      <section className="relative px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">

            <Reveal>
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/[0.045] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]" />

                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                    Inside MedicSim
                  </span>
                </div>

                <h1 className="max-w-4xl text-[3.3rem] font-black leading-[0.92] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.5rem]">
                  A clinical
                  <span className="block text-[var(--primary)]">
                    simulation
                  </span>
                  built to think.
                </h1>

                <p className="mt-7 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">
                  MedicSim combines AI patient behaviour, clinical reasoning,
                  simulation logic and automated evaluation into one
                  interactive OSCE-style environment.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    "60 Cases",
                    "AI Patients",
                    "Voice",
                    "Examination",
                    "Evaluation",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] font-bold text-gray-500"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* SYSTEM VISUAL */}

            <Reveal delay={160}>
              <div className="relative mx-auto w-full max-w-[460px]">

                <div className="absolute -inset-8 rounded-full bg-[var(--primary)]/[0.05] blur-[90px]" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[var(--card)]/65 shadow-[0_30px_100px_rgba(0,0,0,.35)] backdrop-blur-2xl">

                  <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-500">
                        MEDICSIM CORE
                      </div>

                      <div className="mt-1 text-[8px] text-gray-700">
                        Simulation architecture
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

                      <span className="text-[8px] font-black text-emerald-400">
                        ONLINE
                      </span>
                    </div>
                  </div>

                  <div className="p-5">

                    <div className="rounded-2xl border border-[var(--primary)]/15 bg-[var(--primary)]/[0.035] p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10">
                          🧠
                        </div>

                        <div>
                          <div className="text-xs font-black text-white">
                            Clinical Intelligence
                          </div>

                          <div className="text-[8px] text-gray-600">
                            Hidden state + reasoning
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 space-y-2">
                        {[
                          ["Patient State", "ACTIVE"],
                          ["Information", "DYNAMIC"],
                          ["Reasoning", "TRACKING"],
                          ["Evaluation", "READY"],
                        ].map(([label, status]) => (
                          <div
                            key={label}
                            className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-black/[0.12] px-3 py-2.5"
                          >
                            <span className="text-[8px] font-bold text-gray-600">
                              {label}
                            </span>

                            <span className="text-[8px] font-black text-[var(--primary)]">
                              {status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative my-4 flex items-center justify-center">
                      <div className="h-px w-full bg-white/[0.06]" />

                      <div className="absolute rounded-full border border-white/[0.07] bg-[var(--card)] px-3 py-1 text-[7px] font-black uppercase tracking-wider text-gray-700">
                        Simulation layer
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        ["01", "AI Patient"],
                        ["02", "History"],
                        ["03", "Examination"],
                        ["04", "Investigations"],
                        ["05", "Diagnosis"],
                        ["06", "Evaluation"],
                      ].map(([number, label]) => (
                        <div
                          key={number}
                          className="rounded-xl border border-white/[0.05] bg-white/[0.018] p-3"
                        >
                          <div className="text-[7px] font-black text-[var(--primary)]">
                            {number}
                          </div>

                          <div className="mt-1.5 text-[9px] font-bold text-gray-400">
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* PLATFORM STATEMENT */}

      <section className="border-y border-white/[0.055] bg-white/[0.012] px-5 py-24 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">

            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.22em] text-[var(--primary)]">
                The architecture
              </div>

              <div className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-7xl">
                10
              </div>

              <div className="mt-1 text-xs font-black uppercase tracking-[0.15em] text-gray-600">
                interconnected systems
              </div>
            </div>

            <p className="max-w-3xl text-lg font-medium leading-8 text-gray-500 sm:text-xl sm:leading-9">
              Every consultation sits on top of a connected clinical
              architecture. The patient, hidden pathology, simulation state,
              reasoning process and evaluation layer all work together to
              create a consultation that unfolds as you interact with it.
            </p>

          </div>
        </Reveal>
      </section>

      {/* SYSTEMS */}

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[9px] font-black uppercase tracking-[0.22em] text-[var(--primary)]">
                Core architecture
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white sm:text-5xl">
                What's happening
                <span className="block text-gray-600">
                  underneath the interface.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {systems.map((system, index) => (
              <Reveal
                key={system.number}
                delay={(index % 3) * 80}
                className="h-full"
              >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--card)]/45 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--primary)]/25 hover:bg-[var(--card)]/75">

                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[var(--primary)]/[0.035] blur-3xl transition-all duration-500 group-hover:bg-[var(--primary)]/[0.09]" />

                  <div className="relative flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-lg transition-transform duration-300 group-hover:scale-110">
                      {system.icon}
                    </div>

                    <span className="text-[8px] font-black tracking-widest text-gray-700">
                      {system.number}
                    </span>
                  </div>

                  <h3 className="relative mt-6 text-sm font-black text-white">
                    {system.title}
                  </h3>

                  <p className="relative mt-2 text-xs leading-6 text-gray-600 transition-colors duration-300 group-hover:text-gray-500">
                    {system.text}
                  </p>

                  <div className="mt-6 h-px w-8 bg-[var(--primary)]/30 transition-all duration-300 group-hover:w-14 group-hover:bg-[var(--primary)]" />
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* CONSULTATION PIPELINE */}

      <section className="border-y border-white/[0.055] bg-white/[0.012] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="text-center">
              <div className="text-[9px] font-black uppercase tracking-[0.22em] text-[var(--primary)]">
                End-to-end simulation
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white sm:text-5xl">
                From presentation
                <span className="block text-gray-600">
                  to performance report.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="relative mx-auto mt-16 max-w-5xl">

            <div className="absolute bottom-0 left-[20px] top-0 w-px bg-gradient-to-b from-[var(--primary)]/40 via-[var(--primary)]/10 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-5">
              {consultationStages.map((stage, index) => (
                <Reveal
                  key={stage.number}
                  delay={index * 70}
                >
                  <div
                    className={`relative flex items-start gap-5 sm:gap-8 ${
                      index % 2 === 0
                        ? "sm:flex-row"
                        : "sm:flex-row-reverse"
                    }`}
                  >

                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--primary)]/25 bg-[var(--card)] text-[8px] font-black text-[var(--primary)] shadow-[0_0_20px_var(--primary)]/5 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                      {stage.number}
                    </div>

                    <div
                      className={`w-full rounded-2xl border border-white/[0.06] bg-[var(--card)]/55 p-5 transition-all duration-500 hover:border-[var(--primary)]/20 hover:bg-[var(--card)] sm:w-[calc(50%-38px)] ${
                        index % 2 === 0
                          ? "sm:mr-auto"
                          : "sm:ml-auto"
                      }`}
                    >
                      <div className="text-[8px] font-black uppercase tracking-wider text-[var(--primary)]">
                        Stage {stage.number}
                      </div>

                      <h3 className="mt-2 text-sm font-black text-white">
                        {stage.title}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-gray-600">
                        {stage.description}
                      </p>
                    </div>

                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VOICE + OBJECTIVE ASSESSMENT */}

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">

          <Reveal className="h-full">
            <div className="group relative h-full overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[var(--card)]/50 p-7 sm:p-9">

              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--primary)]/[0.05] blur-[90px]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-xl">
                  🎙️
                </div>

                <div className="mt-7 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                  Real-time communication
                </div>

                <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Talk to the patient.
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  MedicSim supports simulated voice consultations with speech
                  recognition, live text-to-speech responses, audio waveform
                  visualisation, push-to-talk controls and full-duplex call
                  rooms.
                </p>

                <div className="mt-8 rounded-2xl border border-white/[0.06] bg-black/[0.15] p-5">
                  <div className="flex h-12 items-center justify-center gap-[3px]">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-[2px] rounded-full bg-[var(--primary)]/50"
                        style={{
                          height: `${7 + ((i * 19) % 28)}px`,
                          opacity: 0.25 + ((i * 11) % 70) / 100,
                        }}
                      />
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[7px] font-black uppercase tracking-wider text-gray-700">
                    <span>Voice channel</span>
                    <span className="text-emerald-400">
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[var(--card)]/50 p-7 sm:p-9">

              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/[0.025] blur-[90px]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.05] text-xl">
                  🩺
                </div>

                <div className="mt-7 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400">
                  Objective assessment
                </div>

                <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Investigate the evidence.
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  Objective clinical panels allow you to perform physical
                  assessments and access investigation findings as you work
                  through the case.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-2">
                  {[
                    ["♥", "Vitals"],
                    ["◉", "HEENT"],
                    ["◈", "Thoracic"],
                    ["◇", "Abdominal"],
                  ].map(([icon, label]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/[0.05] bg-black/[0.12] p-4 transition-all duration-300 hover:border-cyan-400/15 hover:bg-cyan-400/[0.025]"
                    >
                      <div className="text-sm text-cyan-400/70">
                        {icon}
                      </div>

                      <div className="mt-2 text-[9px] font-black text-gray-400">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* TECHNOLOGY */}

      <section className="border-y border-white/[0.055] bg-white/[0.012] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">

          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[9px] font-black uppercase tracking-[0.22em] text-[var(--primary)]">
                Technology
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] text-white sm:text-5xl">
                Built as a platform,
                <span className="block text-gray-600">
                  not just a page.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-600">
                MedicSim combines a modern web application, AI systems,
                simulation logic, APIs and persistent performance data into one
                responsive clinical environment.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stack.map(([category, technology, detail], index) => (
              <Reveal
                key={category}
                delay={(index % 3) * 80}
              >
                <div className="group rounded-2xl border border-white/[0.06] bg-[var(--card)]/45 p-5 transition-all duration-400 hover:-translate-y-1 hover:border-[var(--primary)]/20">

                  <div className="text-[8px] font-black uppercase tracking-[0.16em] text-gray-700">
                    {category}
                  </div>

                  <div className="mt-4 text-sm font-black text-white">
                    {technology}
                  </div>

                  <div className="mt-1 text-[10px] text-gray-600">
                    {detail}
                  </div>

                  <div className="mt-5 h-px w-7 bg-[var(--primary)]/30 transition-all duration-300 group-hover:w-12 group-hover:bg-[var(--primary)]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36">

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/[0.055] blur-[130px]" />

        <Reveal className="relative mx-auto max-w-4xl text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/[0.07] text-2xl">
            🧠
          </div>

          <div className="mt-7 text-[9px] font-black uppercase tracking-[0.22em] text-[var(--primary)]">
            Ready to enter the simulation?
          </div>

          <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-6xl">
            Stop reading cases.
            <span className="block text-gray-600">
              Start working them.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600">
            Start a case, meet your patient and work through the consultation
            from first question to final diagnosis.
          </p>

          <Link
            href="/labs"
            className="group mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-4 text-sm font-black text-white shadow-[0_15px_50px_var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_65px_var(--primary)]/30 active:translate-y-0 active:scale-[0.98]"
          >
            Launch MedicSim

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

        </Reveal>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/[0.055] px-5 py-9 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="text-sm font-black text-white">
              MedicSim
            </div>

            <div className="mt-1 text-[9px] font-medium text-gray-700">
              Clinical OSCE Assessment Engine
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[10px] font-bold text-gray-700">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              className="transition-colors hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms
            </Link>

            <span>
              © {new Date().getFullYear()} MedicSim
            </span>
          </div>

        </div>
      </footer>

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}