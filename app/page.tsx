"use client";

import Link from "next/link";
import PageTransition from "./components/PageTransition";

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#070a12] text-white selection:bg-indigo-500/30 overflow-x-hidden">
        
        {/* NAV BAR */}
        <nav className="w-full max-w-6xl mx-auto px-6 py-5 flex justify-between items-center border-b border-white/5">
          
          {/* UPGRADED UNIQUE BRAND LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <svg 
                className="w-4 h-4 text-white animate-pulse" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wider text-white uppercase font-sans leading-none">
                MEDSIM<span className="text-indigo-400">.AI</span>
              </span>
              <span className="text-[8px] text-gray-500 uppercase tracking-widest font-bold leading-none mt-0.5">
                Clinical Engine
              </span>
            </div>
          </Link>

          {/* PREMIUM UX NAV BUTTONS WITH STRETCHING HOVER UNDERLINE */}
          <div className="flex items-center gap-6 text-xs font-medium text-gray-400">
            <a 
              href="#features" 
              className="relative py-1 hover:text-white transition-colors duration-300 block
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500
                after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left
                after:transition-transform after:duration-300 after:ease-out"
            >
              Core Modules
            </a>
            
            <a 
              href="#metrics" 
              className="relative py-1 hover:text-white transition-colors duration-300 block
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500
                after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left
                after:transition-transform after:duration-300 after:ease-out"
            >
              Metrics Matrix
            </a>
            
            <Link 
              href="/dashboard" 
              className="relative py-1 hover:text-white transition-colors duration-300 block
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500
                after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left
                after:transition-transform after:duration-300 after:ease-out"
            >
              Performance Logs
            </Link>
            
            <Link 
              href="/labs" 
              className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-all text-white relative overflow-hidden group/btn"
            >
              <span className="relative z-10">Launch Console</span>
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-indigo-500 scale-x-0 origin-right group-hover/btn:scale-x-100 group-hover/btn:origin-left transition-transform duration-300 ease-out" />
            </Link>
          </div>
        </nav>

        {/* HERO SECTION */}
        <header className="max-w-4xl mx-auto text-center px-6 pt-16 pb-20 relative">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/40 border border-indigo-500/30 mb-6 animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-indigo-300 uppercase">OSCE Simulation Engine v2.4</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-[1.15] mb-6">
            Next-Generation Clinical Assessment for Medical Candidates
          </h1>
          
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-8 font-medium">
            Bridge the gap between theoretical pathology and high-stakes diagnostic decision making. Train under a strict live-telemetry monitor mimicking actual UK diagnostic evaluation arrays.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/labs"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-indigo-600/20 border border-indigo-400/20 text-center"
            >
              Enter Clinical Lab
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-white/5 text-gray-300 text-center">
              View Analytics Dashboard
            </Link>
          </div>
        </header>

        {/* CORE TELEMETRY METRICS SECTION */}
        <section id="metrics" className="max-w-5xl mx-auto px-6 py-12 border-t border-white/5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0f1626]/30 border border-white/5 backdrop-blur-md">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Dynamic Persona</p>
              <h3 className="text-xl font-bold mb-2 text-gray-100">Algorithmic Patients</h3>
              <p className="text-xs text-gray-400 leading-relaxed">AI systems compute structural pain tolerances, localized anxiety states, and distinct occupational histories dynamically per intake session.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0f1626]/30 border border-white/5 backdrop-blur-md">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Objective Evaluation</p>
              <h3 className="text-xl font-bold mb-2 text-gray-100">Physical Assessments</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Directly interface with objective report panels including raw clinical breakdowns of Vitals, HEENT, Thoracic, and Abdominal telemetry mappings.</p>
            </div>
            <div className="p-6 rounded-2xl bg-[#0f1626]/30 border border-white/5 backdrop-blur-md">
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">Portfolio Architecture</p>
              <h3 className="text-xl font-bold mb-2 text-gray-100">Live Command Center</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Session logging preserves global performance matrices, precision accuracy rates, and differential target matching for admissions board presentation.</p>
            </div>
          </div>
        </section>

        {/* TECHNICAL ARCHITECTURE MODULE FEATURES */}
        <section id="features" className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5 space-y-12">
          <div className="max-w-md">
            <span className="text-[10px] font-black tracking-widest uppercase text-indigo-500">System Modules</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">Engineered around clinical precision rules.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center font-mono text-xs text-indigo-400 font-bold">01</div>
              <h4 className="font-bold text-base text-gray-200">Interactive Clinical History Log</h4>
              <p className="text-xs text-gray-400 leading-relaxed">The interview panel forces targeted interrogation workflows. Meta-profile screening queries are automatically flagged as contextually irrelevant to preserve strict timeframe simulation bounds.</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center font-mono text-xs text-emerald-400 font-bold">02</div>
              <h4 className="font-bold text-base text-gray-200">Algorithmic Score Processing</h4>
              <p className="text-xs text-gray-400 leading-relaxed">Submissions automatically run an analysis script factoring aggregate question depth indicators, procedural accuracy parameters, and precision classification targeting models.</p>
            </div>
          </div>
        </section>

        {/* FOOTER METRICS TELEMETRY */}
        <footer className="w-full max-w-5xl mx-auto px-6 py-8 border-t border-white/5 text-center text-[10px] font-mono text-gray-500 tracking-wider">
          MEDSIM ENTERPRISE PORTFOLIO SYSTEM // ALL CLINICAL TELEMETRY GENERATED DYNAMICALLY VIA REALTIME COMPUTE LABS.
        </footer>

      </div>
    </PageTransition>
  );
}
