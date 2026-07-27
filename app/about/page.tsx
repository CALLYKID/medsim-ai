"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageTransition from "./components/PageTransition";

// Custom hook to handle scroll reveal animations cleanly
function useIntersectionObserver() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-8");
          observer.unobserve(entry.target);
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

export default function AboutPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#070a12] text-white selection:bg-indigo-500/30 overflow-x-hidden">
        
        {/* RESPONSIVE NAV BAR */}
        <nav className="w-full max-w-6xl mx-auto px-6 py-5 flex justify-between items-center border-b border-white/5 relative z-50">
          
          {/* ENHANCED HIGH-VISIBILITY LOGO */}
          <Link href="/" className="flex items-center gap-3 group shrink-0 focus:outline-none">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 group-hover:scale-105 group-focus:scale-105 transition-transform duration-300">
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
            <Link 
              href="/" 
              className="relative py-1 hover:text-white transition-colors duration-300 block focus:outline-none focus:text-white
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500
                after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left focus:after:scale-x-100
                after:transition-transform after:duration-300 after:ease-out"
            >
              Home
            </Link>

            <a 
              href="#architecture" 
              className="relative py-1 hover:text-white transition-colors duration-300 block focus:outline-none focus:text-white
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500
                after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left focus:after:scale-x-100
                after:transition-transform after:duration-300 after:ease-out"
            >
              System Architecture
            </a>
            
            <a 
              href="#modules" 
              className="relative py-1 hover:text-white transition-colors duration-300 block focus:outline-none focus:text-white
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500
                after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left focus:after:scale-x-100
                after:transition-transform after:duration-300 after:ease-out"
            >
              Core Subsystems
            </a>
            
            <Link 
              href="/dashboard" 
              className="relative py-1 hover:text-white transition-colors duration-300 block focus:outline-none focus:text-white
                after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-500
                after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left focus:after:scale-x-100
                after:transition-transform after:duration-300 after:ease-out"
            >
              Dashboard
            </Link>
            
            <Link 
              href="/labs" 
              className="bg-white/5 hover:bg-white/10 focus:bg-white/10 px-4 py-2 rounded-lg border border-white/10 transition-all text-white relative overflow-hidden group/btn focus:outline-none"
            >
              <span className="relative z-10">Launch Console</span>
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-indigo-500 scale-x-0 origin-right group-hover/btn:scale-x-100 group-hover/btn:origin-left group-focus/btn:scale-x-100 transition-transform duration-300 ease-out" />
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
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 border-b border-white/5"
            >
              Home
            </Link>
            <a 
              href="#architecture" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 border-b border-white/5"
            >
              System Architecture
            </a>
            <a 
              href="#modules" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 border-b border-white/5"
            >
              Core Subsystems
            </a>
            <Link 
              href="/dashboard" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors py-2 border-b border-white/5"
            >
              Dashboard
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
          
          <div className="inline-flex flex-col items-center mb-10 relative group w-full max-w-2xl mx-auto animate-fade-in">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex flex-col md:flex-row items-center gap-4 px-5 py-3.5 rounded-2xl bg-[#0a0f1d]/80 border border-indigo-500/30 backdrop-blur-md shadow-2xl w-full">
              <div className="flex items-center gap-2 border-b md:border-b-0 md:border-r border-white/10 pb-2 md:pb-0 md:pr-4 shrink-0">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-xs font-black tracking-widest text-indigo-300 uppercase font-sans">
                  PLATFORM OVERVIEW
                </span>
              </div>
              <p className="text-sm sm:text-base font-normal text-gray-200 tracking-wide text-center md:text-left leading-relaxed">
                Combining AI, structured medical knowledge, and interactive software engineering{" "}
                <span className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
                  to create realistic clinical encounters.
                </span>
              </p>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-gradient-to-b from-white via-gray-200 to-gray-500 bg-clip-text text-transparent leading-[1.15] mb-6">
            Inside MedSim AI Architecture
          </h1>
          
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed mb-10 font-medium">
            Discover how our multi-layered system models genuine patient interactions, drives OSCE-style training, and evaluates clinical decision-making with absolute precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto sm:max-w-none">
            <a
              href="#architecture"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.99] hover:shadow-indigo-600/30 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-indigo-600/20 border border-indigo-400/20 text-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#070a12]"
            >
              Explore Architecture &rarr;
            </a>
            <Link 
              href="/labs" 
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.99] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-white/5 hover:border-white/20 text-gray-300 hover:text-white text-center focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-[#070a12]"
            >
              Launch Simulator
            </Link>
          </div>
        </header>

        {/* OVERALL SYSTEM DESCRIPTION SECTION */}
        <section id="architecture" className="max-w-5xl mx-auto px-6 py-12 border-t border-white/5">
          <ScrollReveal>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0f1626]/60 to-[#0a0f1d]/80 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <span className="text-[10px] font-black tracking-widest uppercase text-indigo-400 block mb-2 font-mono">Platform Blueprint</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-4">Overall System Description</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                MedSim AI can be described as a clinical simulation platform combining artificial intelligence, structured medical knowledge, and interactive software engineering to create realistic patient encounters for healthcare education.
              </p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                The main innovation is not simply using AI to answer medical questions, but using AI as the foundation of a dynamic patient simulation where users must think, investigate, and make decisions like they would in a real clinical environment.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* CORE SUBSYSTEMS & MODULES */}
        <section id="modules" className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5 space-y-12">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="text-[10px] font-black tracking-widest uppercase text-indigo-500 font-mono">Detailed Breakdown</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">The Core Subsystems of MedSim AI</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">Every technical layer is architected to mirror real-world hospital and ambulatory workflows.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Clinical Core */}
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-indigo-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">Module 01</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Clinical Core</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    The foundation of MedSim AI representing medical knowledge and patient logic that empowers the system to forge realistic clinical scenarios. Instead of a fixed question-and-answer layout, it models a true patient encounter where information must be actively gathered, findings interpreted, and clinical reasoning applied.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Manages elements such as patient demographics, presenting complaints, symptoms, medical history, vital signs, investigation results, and possible diagnoses, acting as the structural bridge between raw medical facts and interactive simulation.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. AI Patient Brain */}
            <ScrollReveal delay="delay-100">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-purple-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">Module 02</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">AI Patient Brain</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Controls how the virtual patient behaves during a consultation. It determines how the patient responds, what information is revealed, and how the conversation develops based directly on the practitioner's questions.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Rather than exposing the entire case immediately, the AI simulates an authentic consultation where critical details must be unearthed via effective history taking, encouraging communication skills over rote memorisation.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Simulation Engine */}
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-emerald-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">Module 03</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Simulation Engine</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Manages the rulebook and flow of each clinical scenario. It controls the consultation structure including case initialization, information discovery milestones, decision points, and final outcomes.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Delivers an OSCE-style experience demanding a systematic approach to patient evaluation, targeted investigations, and final clinical conclusions within a realistic timeframe framework.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. Hidden Clinical State System */}
            <ScrollReveal delay="delay-100">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-amber-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">Module 04</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Hidden Clinical State System</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Stores information withheld from the learner at initialization. In real clinical practice, doctors never start with a pre-written label; they build understanding through targeted questioning and physical examination.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Maintains hidden variables such as underlying pathology, unrevealed symptoms, disease severity, and subtle clinical details to enforce active investigation rather than passive data consumption.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. Evaluation Engine */}
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-rose-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">Module 05</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Evaluation Engine</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Analyzes user performance during or after a simulation, converting raw consultation logs into actionable, measurable learning feedback.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Evaluates history-taking quality, crucial questions asked or missed, clinical reasoning steps, selected investigations, diagnostic accuracy, and comprehensive management decisions to highlight specific targets for improvement.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 6. Disease Library */}
            <ScrollReveal delay="delay-100">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-cyan-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">Module 06</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Disease Library</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Serves as the structured repository of clinical cases utilized by the simulator, containing rich profiles across diverse medical conditions.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Each case houses symptoms, typical patient responses, investigation findings, differential diagnoses, and expected clinical approaches, establishing a highly scalable foundation for ongoing case expansion.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 7. Clinical Reasoning System */}
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-blue-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">Module 07</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Clinical Reasoning System</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Focuses on cognitive workflows of healthcare professionals. It pushes users beyond simple symptom recognition into pattern analysis, alternative consideration, and decision justification.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Mirrors real-world practice where multiple pathologies present identically and correct differential isolation demands rigorous interpretive skill.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 8. Frontend Application */}
            <ScrollReveal delay="delay-100">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-violet-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-widest bg-violet-500/10 px-2.5 py-1 rounded-md border border-violet-500/20">Module 08</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Frontend Application</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    The user-facing presentation layer of MedSim AI. Built using state-of-the-art web frameworks to manage consultation interfaces, patient telemetry panels, timers, dashboards, and evaluation views.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Engineered to deliver a fluid experience that feels like a dedicated medical diagnostic suite rather than a generic chat interface.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 9. Dashboard System */}
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-teal-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest bg-teal-500/10 px-2.5 py-1 rounded-md border border-teal-500/20">Module 09</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Dashboard System</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Acts as the central command console for users, centralizing simulation access, performance histories, and longitudinal learning progress tracking.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Provides a structured hub to launch new cases, review previous attempts, and monitor growth metrics over time.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 10. Performance Logging System */}
            <ScrollReveal delay="delay-100">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-transparent border border-white/5 space-y-3 h-full hover:border-orange-500/30 transition-colors duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">Module 10</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Performance Logging System</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Records consultation outcomes and granular learning metrics, letting users inspect past simulations to identify recurring behavioural or diagnostic patterns.
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Supports reflective learning models, enabling students to pinpoint personal weaknesses and execute targeted deliberate practice.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* TECHNICAL STACK & BACKEND ARCHITECTURE */}
        <section className="max-w-5xl mx-auto px-6 py-16 border-t border-white/5 space-y-12">
          <ScrollReveal>
            <div className="max-w-xl">
              <span className="text-[10px] font-black tracking-widest uppercase text-indigo-500 font-mono">Infrastructure</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">API & Backend Architecture / Technology Stack</h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">Built with modern production standards for scalability, reliability, and speed.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-[#0e1424]/50 border border-white/5 space-y-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono text-xs font-bold">API</div>
                  <h4 className="font-bold text-base text-white">Backend & Communication</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  The backend architecture handles communication between the user interface, AI systems, and core application logic. It manages API requests, processes simulation telemetry, handles complex scoring calculations, and ensures lightning-fast data exchange with underlying AI intelligence layers.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay="delay-100">
              <div className="p-6 rounded-2xl bg-[#0e1424]/50 border border-white/5 space-y-4 h-full">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-xs font-bold">TS</div>
                  <h4 className="font-bold text-base text-white">Technology Stack</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  MedSim AI leverages modern web development stacks including <strong className="text-white">Next.js</strong> and <strong className="text-white">React with TypeScript</strong> to ensure a scalable, type-safe interface. Includes robust API integrations, streamlined deployment pipelines, version control protocols, mobile device optimisation, and advanced state management for real-time simulations.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full max-w-5xl mx-auto px-6 py-8 border-t border-white/5 text-center text-[10px] font-mono text-gray-500 tracking-wider">
          MEDSIM ENTERPRISE ARCHITECTURE // ALL SYSTEMS OPERATIONAL AND LOGGED SECURELY.
        </footer>

      </div>
    </PageTransition>
  );
}
