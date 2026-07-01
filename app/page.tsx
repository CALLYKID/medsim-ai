"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageTransition from "./components/PageTransition";

// Simple custom hook to handle scroll reveal animations cleanly
function useIntersectionObserver() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-8");
          observer.unobserve(entry.target); // Stop observing once animated
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

// Animated wrapper component for sections/cards
function ScrollReveal({ children, delay = "" }: { children: React.ReactNode; delay?: string }) {
  const ref = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`transform opacity-0 translate-y-8 transition-all duration-700 ease-out ${delay}`}
    >
      {children}
    </div>
  );
}

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#070a12] text-white selection:bg-indigo-500/30 overflow-x-hidden">
        
        {/* RESPONSIVE NAV BAR */}
        <nav className="w-full max-w-6xl mx-auto px-6 py-5 flex justify-between items-center border-b border-white/5 relative z-50">
          
          {/* ENHANCED HIGH-VISIBILITY LOGO */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <svg 
                className="w-4.5 h-4.5 text-white animate-pulse" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-wider text-white uppercase font-sans leading-none">
                MEDSIM<span className="text-indigo-400">.AI</span>
              </span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-black leading-none mt-1">
                Clinical Engine
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV BUTTONS */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-gray-400">
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

          {/* COOL MORPHING HAMBURGER BUTTON */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 text-gray-400 hover:text-white transition-colors focus:outline-none z-50"
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`} />
            <span className={`h-0.5 w-6 bg-current transition-all duration-200 ease-in-out ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`} />
            <span className={`h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`} />
          </button>

          {/* SMOOTH SLIDE-DOWN & FADE MOBILE DROPDOWN DRAWER */}
          <div className={`absolute top-full left-0 w-full bg-[#0a0e1a]/95 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex flex-col gap-4 md:hidden shadow-2xl transition-all duration-300 ease-out origin-top ${
            isMobileMenuOpen 
              ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }`}>
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 border-b border-white/5"
            >
              Core Modules
            </a>
            <a 
              href="#metrics" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 border-b border-white/5"
            >
              Metrics Matrix
            </a>
            <Link 
              href="/dashboard" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 border-b border-white/5"
            >
              Performance Logs
            </Link>
            <Link 
              href="/labs" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 px-4 py-3 rounded-xl text-center text-sm font-bold uppercase tracking-wider transition-all text-white shadow-lg shadow-indigo-600/20"
            >
              Launch Console
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
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-[#0f1626]/30 border border-white/5 backdrop-blur-md h-full hover:border-white/10 transition-colors duration-300">
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Dynamic Persona</p>
                <h3 className="text-xl font-bold mb-2 text-gray-100">Algorithmic Patients</h3>
                <p className="text-xs text-gray-400 leading-relaxed">AI systems compute structural pain tolerances, localized anxiety states, and distinct occupational histories dynamically per intake session.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="delay-100">
              <div className="p-6 rounded-2xl bg-[#0f1626]/30 border border-white/5 backdrop-blur-md h-full hover:border-white/10 transition-colors duration-300">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Objective Evaluation</p>
                <h3 className="text-xl font-bold mb-2 text-gray-100">Physical Assessments</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Directly interface with objective report panels including raw clinical breakdowns of Vitals, HEENT, Thoracic, and Abdominal telemetry mappings.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="delay-200">
              <div className="p-6 rounded-2xl bg-[#0f1626]/30 border border-white/5 backdrop-blur-md h-full hover:border-white/10 transition-colors duration-300">
                <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">Portfolio Architecture</p>
                <h3 className="text-xl font-bold mb-2 text-gray-100">Live Command Center</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Session logging preserves global performance matrices, precision accuracy rates, and differential target matching for admissions board presentation.</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* TECHNICAL ARCHITECTURE MODULE FEATURES */}
        <section id="features" className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5 space-y-12">
          <ScrollReveal>
            <div className="max-w-md">
              <span className="text-[10px] font-black tracking-widest uppercase text-indigo-500">System Modules</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">Engineered around clinical precision rules.</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-white/10 transition-colors duration-300">
                <div className="h-8 w-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center font-mono text-xs text-indigo-400 font-bold">01</div>
                <h4 className="font-bold text-base text-gray-200">Interactive Clinical History Log</h4>
                <p className="text-xs text-gray-400 leading-relaxed">The interview panel forces targeted interrogation workflows. Meta-profile screening queries are automatically flagged as contextually irrelevant to preserve strict timeframe simulation bounds.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="delay-100">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-white/10 transition-colors duration-300">
                <div className="h-8 w-8 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center font-mono text-xs text-emerald-400 font-bold">02</div>
                <h4 className="font-bold text-base text-gray-200">Algorithmic Score Processing</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Submissions automatically run an analysis script factoring aggregate question depth indicators, procedural accuracy parameters, and precision classification targeting models.</p>
              </div>
            </ScrollReveal>
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
