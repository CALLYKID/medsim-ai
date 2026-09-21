"use client";
import Link from "next/link";
import {
useEffect,
useRef,
useState,
type ReactNode,
} from "react";
import AccountMenu from "./components/AccountMenu";

/* ─────────────────────────────────────────────
DATA
───────────────────────────────────────────── */

const features = [
{
icon: "🧠",
title: "60 Clinical Cases",
text: "A library of 60 distinct clinical cases designed around different presentations, diagnostic challenges and clinical reasoning.",
},
{
icon: "👤",
title: "AI Virtual Patients",
text: "Interact with dynamic virtual patients whose responses change according to the information you uncover.",
},
{
icon: "🗣️",
title: "Clinical History",
text: "Take a focused history, ask important questions and discover the information needed to understand the presentation.",
},
{
icon: "🎙️",
title: "Real-Time Voice",
text: "Use simulated voice consultations with speech recognition, live patient responses, waveform visualisation and push-to-talk.",
},
{
icon: "🩺",
title: "Physical Examination",
text: "Perform objective assessments including vitals, HEENT, thoracic and abdominal examinations.",
},
{
icon: "🔬",
title: "Investigations",
text: "Request clinical investigations and use objective findings to guide your diagnostic reasoning.",
},
{
icon: "📋",
title: "Differential Diagnosis",
text: "Build your differential diagnosis from the information gathered throughout the consultation.",
},
{
icon: "🎯",
title: "Final Diagnosis",
text: "Commit to your final diagnosis and see how accurately your reasoning matched the underlying case.",
},
{
icon: "📊",
title: "Automated Evaluation",
text: "Receive structured evaluation covering history taking, clinical reasoning, investigations and diagnostic accuracy.",
},
{
icon: "🚨",
title: "Red Flags",
text: "Review important clinical red flags and identify critical information that mattered during the case.",
},
{
icon: "💡",
title: "Learning Points",
text: "Turn every completed consultation into practical feedback with detailed learning points.",
},
{
icon: "📈",
title: "Performance Dashboard",
text: "Track completed consultations, scores, diagnostic accuracy, specialties, difficulty and progress over time.",
},
];

const workflow = [
["01", "Case", "A random case amongst 60 clinical cases is chosen."],
["02", "Consult", "Meet and question your virtual patient."],
["03", "Examine", "Perform physical assessments and investigations."],
["04", "Reason", "Build your differential and assess the evidence."],
["05", "Diagnose", "Submit your final clinical diagnosis."],
["06", "Review", "Receive scoring, feedback and learning points."],
];

const metrics = [
["60", "Clinical cases"],
["AI", "Virtual patients"],
["LIVE", "Voice consultations"],
["360°", "Evaluation"],
];

/* ─────────────────────────────────────────────
SCROLL REVEAL
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
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
HOME
───────────────────────────────────────────── */

export default function Home() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [mounted, setMounted] = useState(false);

useEffect(() => {
setMounted(true);
}, []);

return (
<main className="min-h-screen overflow-x-hidden bg-[var(--background)] text-[var(--text)] selection:bg-[var(--primary)]/30">

{/* ─────────────────────────────────────────  
      AMBIENT BACKGROUND  
  ───────────────────────────────────────── */}  

  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">  
    <div className="absolute left-1/2 top-[-25rem] h-[55rem] w-[55rem] -translate-x-1/2 rounded-full bg-[var(--primary)]/[0.075] blur-[150px]" />  

    <div className="absolute left-[-15rem] top-[35%] h-[30rem] w-[30rem] rounded-full bg-cyan-500/[0.025] blur-[130px]" />  

    <div className="absolute right-[-15rem] top-[65%] h-[30rem] w-[30rem] rounded-full bg-violet-500/[0.025] blur-[130px]" />  

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

  {/* ─────────────────────────────────────────  
      NAVIGATION  
  ───────────────────────────────────────── */}  

  <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.055] bg-[var(--background)]/65 backdrop-blur-2xl">  
    <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8">  

      <Link  
        href="/"  
        className="group flex cursor-pointer items-center gap-3"  
      >  
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-lg transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--primary)]/60 group-hover:shadow-[0_0_25px_var(--primary)]/20">  
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
          className="text-xs font-bold text-white transition-colors hover:text-[var(--primary)]"  
        >  
          Home  
        </Link>  

        <Link  
          href="/about"  
          className="text-xs font-bold text-gray-500 transition-colors hover:text-white"  
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
          {[  
            ["/", "Home"],  
            ["/about", "About"],  
            ["/dashboard", "Dashboard"],  
          ].map(([href, label]) => (  
            <Link  
              key={href}  
              href={href}  
              onClick={() => setMobileMenuOpen(false)}  
              className="rounded-xl px-4 py-3.5 text-sm font-bold text-gray-400 transition-all hover:bg-white/[0.04] hover:text-white"  
            >  
              {label}  
            </Link>  
          ))}  

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

  {/* ─────────────────────────────────────────  
      HERO  
  ───────────────────────────────────────── */}  

  <section className="relative px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">  
    <div className="mx-auto max-w-7xl">  
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">  

        {/* HERO TEXT */}  

        <div  
          className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${  
            mounted  
              ? "translate-y-0 opacity-100"  
              : "translate-y-8 opacity-0"  
          }`}  
        >  
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/[0.045] px-3 py-1.5 shadow-[0_0_30px_var(--primary)]/5">  
            <span className="relative flex h-1.5 w-1.5">  
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-50" />  
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />  
            </span>  

            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">  
              Clinical Simulation Platform  
            </span>  
          </div>  

          <h1 className="max-w-4xl text-[3.3rem] font-black leading-[0.91] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.4rem]">  
            Think.  
            <span className="block text-[var(--primary)]">  
              Investigate.  
            </span>  
            <span className="block">Diagnose.</span>  
          </h1>  

          <p className="mt-7 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base sm:leading-8">  
            MedicSim places you inside realistic clinical consultations  
            with AI virtual patients. Work through{" "}  
            <span className="font-bold text-gray-300">  
              60 distinct cases  
            </span>  
            , take histories, use real-time voice, perform examinations,  
            investigate, build differentials and submit your diagnosis.  
          </p>  

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">  
            <Link  
              href="/labs"  
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3.5 text-sm font-black text-white shadow-[0_12px_40px_var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_var(--primary)]/30 active:translate-y-0 active:scale-[0.98]"  
            >  
              Enter Clinical Simulation  

              <span className="transition-transform duration-300 group-hover:translate-x-1">  
                →  
              </span>  
            </Link>  

            <Link  
              href="/about"  
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] px-6 py-3.5 text-sm font-bold text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] active:translate-y-0 active:scale-[0.98]"  
            >  
              Explore the Platform  
            </Link>  
          </div>  

          {/* METRICS */}  

          <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.06] sm:grid-cols-4">  
            {metrics.map(([value, label], index) => (  
              <div  
                key={label}  
                className={`bg-[var(--card)]/45 p-4 transition-colors duration-300 hover:bg-[var(--card)] ${  
                  index < 3  
                    ? "border-b border-white/[0.06] sm:border-b-0 sm:border-r"  
                    : ""  
                }`}  
              >  
                <div className="text-lg font-black text-white sm:text-xl">  
                  {value}  
                </div>  

                <div className="mt-1 text-[8px] font-black uppercase tracking-wider text-gray-600">  
                  {label}  
                </div>  
              </div>  
            ))}  
          </div>  
        </div>  

        {/* HERO SIMULATION VISUAL */}  

        <div className="relative">  
          <div className="absolute -inset-10 rounded-full bg-[var(--primary)]/[0.055] blur-[100px]" />  

          <div className="relative mx-auto max-w-[540px]">  

            {/* floating status */}  

            <div className="absolute -left-3 top-10 z-20 hidden animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-white/[0.08] bg-[var(--card)]/80 p-3 shadow-2xl backdrop-blur-xl sm:block lg:-left-8">  
              <div className="flex items-center gap-2">  
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.7)]" />  
                <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">  
                  Patient connected  
                </span>  
              </div>  
            </div>  

            <div className="absolute -right-2 bottom-16 z-20 hidden animate-[float_7s_ease-in-out_infinite_reverse] rounded-2xl border border-white/[0.08] bg-[var(--card)]/85 p-3 shadow-2xl backdrop-blur-xl sm:block lg:-right-8">  
              <div className="text-[8px] font-black uppercase tracking-wider text-gray-600">  
                Case library  
              </div>  
              <div className="mt-1 text-xl font-black text-white">  
                60  
              </div>  
            </div>  

            {/* main panel */}  

            <div className="overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[var(--card)]/75 shadow-[0_30px_100px_rgba(0,0,0,.35)] backdrop-blur-2xl">  

              {/* panel header */}  

              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">  
                <div className="flex items-center gap-3">  
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/10">  
                    🫀  
                  </div>  

                  <div>  
                    <div className="text-[10px] font-black text-white">  
                      ACTIVE CONSULTATION  
                    </div>  

                    <div className="mt-0.5 text-[8px] uppercase tracking-wider text-gray-600">  
                      AI patient simulation  
                    </div>  
                  </div>  
                </div>  

                <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.04] px-2.5 py-1">  
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />  
                  <span className="text-[8px] font-black text-emerald-400">  
                    LIVE  
                  </span>  
                </div>  
              </div>  

              {/* patient */}  

              <div className="p-5">  
                <div className="rounded-2xl border border-white/[0.06] bg-black/[0.12] p-4">  
                  <div className="flex items-center gap-4">  
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-xl">  
                      👤  
                    </div>  

                    <div className="min-w-0">  
                      <div className="text-sm font-black text-white">  
                        Virtual Patient  
                      </div>  

                      <div className="text-[10px] text-gray-600">  
                        Dynamic clinical state  
                      </div>  
                    </div>  
                  </div>  

                  <div className="mt-5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">  
                    <div className="flex items-center gap-2">  
                      <span className="text-[8px] font-black uppercase tracking-[0.15em] text-[var(--primary)]">  
                        Patient response  
                      </span>  

                      <span className="h-px flex-1 bg-white/[0.05]" />  
                    </div>  

                    <div className="mt-3 space-y-2">  
                      <div className="h-2 w-[92%] rounded-full bg-white/[0.06]" />  
                      <div className="h-2 w-[74%] rounded-full bg-white/[0.045]" />  
                      <div className="h-2 w-[55%] rounded-full bg-white/[0.03]" />  
                    </div>  
                  </div>  
                </div>  

                {/* consultation modules */}  

                <div className="mt-4 grid grid-cols-2 gap-2">  
                  {[  
                    ["🗣️", "History"],  
                    ["🎙️", "Voice"],  
                    ["🩺", "Examination"],  
                    ["🔬", "Investigations"],  
                    ["📋", "Differential"],  
                    ["🎯", "Diagnosis"],  
                  ].map(([icon, label]) => (  
                    <div  
                      key={label}  
                      className="group flex cursor-default items-center gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.018] px-3 py-3 transition-all duration-300 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/[0.04]"  
                    >  
                      <span className="text-sm transition-transform duration-300 group-hover:scale-110">  
                        {icon}  
                      </span>  

                      <span className="text-[9px] font-bold text-gray-500 group-hover:text-gray-300">  
                        {label}  
                      </span>  
                    </div>  
                  ))}  
                </div>  

                {/* telemetry */}  

                <div className="mt-4 grid grid-cols-3 gap-2">  
                  {[  
                    ["HR", "82", "bpm"],  
                    ["BP", "128/76", "mmHg"],  
                    ["SpO₂", "98", "%"],  
                  ].map(([label, value, unit]) => (  
                    <div  
                      key={label}  
                      className="rounded-xl border border-white/[0.05] bg-white/[0.018] p-3"  
                    >  
                      <div className="text-[7px] font-black uppercase tracking-wider text-gray-700">  
                        {label}  
                      </div>  

                      <div className="mt-1 text-sm font-black text-white">  
                        {value}  
                      </div>  

                      <div className="text-[7px] text-gray-700">  
                        {unit}  
                      </div>  
                    </div>  
                  ))}  
                </div>  

                {/* waveform */}  

                <div className="mt-4 rounded-xl border border-white/[0.05] bg-black/[0.1] p-3">  
                  <div className="flex h-8 items-center justify-center gap-[3px]">  
                    {Array.from({ length: 42 }).map((_, index) => (  
                      <span  
                        key={index}  
                        className="w-[2px] rounded-full bg-[var(--primary)]/50"  
                        style={{  
                          height: `${8 + ((index * 17) % 20)}px`,  
                          opacity: 0.35 + ((index * 7) % 50) / 100,  
                        }}  
                      />  
                    ))}  
                  </div>  

                  <div className="mt-1 text-center text-[7px] font-black uppercase tracking-[0.18em] text-gray-700">  
                    Voice consultation channel  
                  </div>  
                </div>  
              </div>  
            </div>  
          </div>  
        </div>  

      </div>  
    </div>  
  </section>  

  {/* ─────────────────────────────────────────  
      INTRO  
  ───────────────────────────────────────── */}  

  <section className="relative border-y border-white/[0.055] bg-white/[0.012] px-5 py-24 sm:px-8">  
    <Reveal className="mx-auto max-w-7xl">  
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">  

        <div>  
          <div className="mb-4 text-[9px] font-black uppercase tracking-[0.22em] text-[var(--primary)]">  
            The MedicSim experience  
          </div>  

          <h2 className="text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">  
            A consultation you  
            <span className="block text-gray-500">  
              actually have to work through.  
            </span>  
          </h2>  
        </div>  

        <p className="max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">  
          MedicSim doesn't simply reveal a case and ask you for an answer.  
          You discover the clinical picture through interaction. Ask the  
          right questions. Examine the patient. Investigate. Build your  
          differential. Then commit to a diagnosis.  
        </p>  

      </div>  
    </Reveal>  
  </section>  

  {/* ─────────────────────────────────────────  
      FEATURES  
  ───────────────────────────────────────── */}  

  <section className="px-5 py-24 sm:px-8 sm:py-32">  
    <div className="mx-auto max-w-7xl">  

      <Reveal>  
        <div className="max-w-3xl">  
          <div className="mb-4 text-[9px] font-black uppercase tracking-[0.22em] text-[var(--primary)]">  
            Inside the platform  
          </div>  

          <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-5xl">  
            Everything that happens  
            <span className="block text-gray-600">  
              inside the consultation.  
            </span>  
          </h2>  

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500">  
            From your first question to the final feedback report,  
            every major part of the clinical workflow is connected.  
          </p>  
        </div>  
      </Reveal>  

      <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">  
        {features.map((feature, index) => (  
          <Reveal  
            key={feature.title}  
            delay={(index % 3) * 80}  
            className="h-full"  
          >  
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--card)]/45 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--primary)]/25 hover:bg-[var(--card)]/75 hover:shadow-[0_20px_60px_rgba(0,0,0,.18)]">  

              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--primary)]/[0.04] blur-3xl transition-all duration-500 group-hover:bg-[var(--primary)]/[0.1]" />  

              <div className="relative">  
                <div className="flex items-center justify-between">  
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-lg transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--primary)]/20 group-hover:bg-[var(--primary)]/10">  
                    {feature.icon}  
                  </div>  

                  <span className="text-[8px] font-black tracking-widest text-gray-700">  
                    {String(index + 1).padStart(2, "0")}  
                  </span>  
                </div>  

                <h3 className="mt-6 text-sm font-black text-white">  
                  {feature.title}  
                </h3>  

                <p className="mt-2 text-xs leading-6 text-gray-600 transition-colors duration-300 group-hover:text-gray-500">  
                  {feature.text}  
                </p>  
              </div>  
            </div>  
          </Reveal>  
        ))}  
      </div>  
    </div>  
  </section>  

  {/* ─────────────────────────────────────────  
      WORKFLOW  
  ───────────────────────────────────────── */}  

  <section className="border-y border-white/[0.055] bg-white/[0.012] px-5 py-24 sm:px-8 sm:py-32">  
    <div className="mx-auto max-w-7xl">  

      <Reveal>  
        <div className="text-center">  
          <div className="mb-4 text-[9px] font-black uppercase tracking-[0.22em] text-[var(--primary)]">  
            Clinical workflow  
          </div>  

          <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-5xl">  
            One consultation.  
            <span className="block text-gray-600">  
              Six stages.  
            </span>  
          </h2>  
        </div>  
      </Reveal>  

      <div className="relative mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">  

        <div className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-transparent via-[var(--primary)]/25 to-transparent lg:block" />  

        {workflow.map(([number, title, description], index) => (  
          <Reveal  
            key={number}  
            delay={index * 90}  
            className="relative z-10"  
          >  
            <div className="group h-full rounded-2xl border border-white/[0.06] bg-[var(--card)]/55 p-5 transition-all duration-500 hover:-translate-y-2 hover:border-[var(--primary)]/25 hover:bg-[var(--card)]">  

              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--primary)]/25 bg-[var(--card)] text-[8px] font-black text-[var(--primary)] transition-all duration-300 group-hover:border-[var(--primary)]/60 group-hover:shadow-[0_0_20px_var(--primary)]/15">  
                {number}  
              </div>  

              <h3 className="mt-5 text-sm font-black text-white">  
                {title}  
              </h3>  

              <p className="mt-2 text-[10px] leading-5 text-gray-600">  
                {description}  
              </p>  
            </div>  
          </Reveal>  
        ))}  
      </div>  
    </div>  
  </section>  

  {/* ─────────────────────────────────────────  
      EVALUATION  
  ───────────────────────────────────────── */}  

  <section className="px-5 py-24 sm:px-8 sm:py-32">  
    <Reveal className="mx-auto max-w-7xl">  
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--primary)]/15 bg-[var(--card)]/55 p-7 sm:p-10 lg:p-14">  

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[var(--primary)]/[0.08] blur-[110px]" />  

        <div className="relative grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">  

          <div>  
            <div className="mb-5 inline-flex rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/[0.04] px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-[var(--primary)]">  
              Post-consultation intelligence  
            </div>  

            <h2 className="max-w-xl text-3xl font-black leading-tight tracking-[-0.03em] text-white sm:text-4xl">  
              The case ends.  
              <span className="block text-gray-600">  
                Your learning doesn't.  
              </span>  
            </h2>  

            <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">  
              After completing a consultation, MedicSim produces a  
              structured result with scoring, diagnostic performance,  
              clinical feedback, red flags and learning points.  
            </p>  

            <Link  
              href="/dashboard"  
              className="group mt-7 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-xs font-black text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/25 hover:bg-[var(--primary)]/[0.04] active:scale-95"  
            >  
              View Performance Dashboard  

              <span className="transition-transform duration-300 group-hover:translate-x-1">  
                →  
              </span>  
            </Link>  
          </div>  

          <div className="grid grid-cols-2 gap-2.5">  
            {[  
              ["🎯", "Final Score"],  
              ["🧠", "Diagnostic Accuracy"],  
              ["🚨", "Red Flags"],  
              ["💡", "Learning Points"],  
              ["📋", "History Performance"],  
              ["📈", "Progress Tracking"],  
            ].map(([icon, title], index) => (  
              <Reveal key={title} delay={index * 60}>  
                <div className="group rounded-2xl border border-white/[0.06] bg-black/[0.1] p-4 transition-all duration-300 hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/[0.025]">  
                  <div className="text-lg transition-transform duration-300 group-hover:scale-110">  
                    {icon}  
                  </div>  

                  <div className="mt-3 text-[10px] font-black text-gray-300">  
                    {title}  
                  </div>  

                  <div className="mt-1 text-[8px] text-gray-700">  
                    Completed consultation data  
                  </div>  
                </div>  
              </Reveal>  
            ))}  
          </div>  

        </div>  
      </div>  
    </Reveal>  
  </section>  

  {/* ─────────────────────────────────────────  
      ACCOUNT / SYNC  
  ───────────────────────────────────────── */}  

  <section className="border-y border-white/[0.055] bg-white/[0.012] px-5 py-24 sm:px-8">  
    <Reveal className="mx-auto max-w-5xl text-center">  

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/[0.06] text-xl">  
        ☁️  
      </div>  

      <div className="mt-6 text-[9px] font-black uppercase tracking-[0.22em] text-[var(--primary)]">  
        Your performance history  
      </div>  

      <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">  
        Complete a consultation.  
        <span className="block text-gray-600">  
          Keep the result.  
        </span>  
      </h2>  

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500">  
        Sign in with Google to keep your completed consultation results  
        available through the MedicSim dashboard and across your devices.  
      </p>  

      <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">  
        {[  
          ["01", "Complete", "Finish your consultation"],  
          ["02", "Evaluate", "Receive your result"],  
          ["03", "Track", "Review your progress"],  
        ].map(([number, title, text], index) => (  
          <Reveal key={number} delay={index * 100}>  
            <div className="rounded-2xl border border-white/[0.06] bg-[var(--card)]/45 p-5">  
              <div className="text-[9px] font-black text-[var(--primary)]">  
                {number}  
              </div>  

              <div className="mt-3 text-xs font-black text-white">  
                {title}  
              </div>  

              <div className="mt-1 text-[9px] text-gray-700">  
                {text}  
              </div>  
            </div>  
          </Reveal>  
        ))}  
      </div>  

    </Reveal>  
  </section>  

  {/* ─────────────────────────────────────────  
      CTA  
  ───────────────────────────────────────── */}  

  <section className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36">  

    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/[0.06] blur-[130px]" />  

    <Reveal className="relative mx-auto max-w-4xl text-center">  

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/[0.07] text-2xl shadow-[0_0_40px_var(--primary)]/10">  
        🩺  
      </div>  

      <h2 className="mt-7 text-4xl font-black leading-tight tracking-[-0.04em] text-white sm:text-6xl">  
        Your next case  
        <span className="block text-[var(--primary)]">  
          is waiting.  
        </span>  
      </h2>  

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600">  
        Enter the simulation and put your history taking, examination and  
        diagnostic reasoning to work.  
      </p>  

      <Link  
        href="/labs"  
        className="group mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--primary)] px-7 py-4 text-sm font-black text-white shadow-[0_15px_50px_var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_65px_var(--primary)]/30 active:translate-y-0 active:scale-[0.98]"  
      >  
        Start Clinical Simulation  

        <span className="transition-transform duration-300 group-hover:translate-x-1">  
          →  
        </span>  
      </Link>  

    </Reveal>  
  </section>  

  {/* ─────────────────────────────────────────  
      FOOTER  
  ───────────────────────────────────────── */}  

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
          href="/about"  
          className="transition-colors hover:text-white"  
        >  
          About  
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

  {/* FLOAT ANIMATION */}  
  <style jsx global>{`  
    @keyframes float {  
      0%,  
      100% {  
        transform: translateY(0px);  
      }  

      50% {  
        transform: translateY(-8px);  
      }  
    }  

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