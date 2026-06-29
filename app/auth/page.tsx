"use client";

import Link from "next/link";
import PageTransition from "../components/PageTransition";

export default function AuthGateway() {
  return (
    <PageTransition>
      <div className="min-h-screen w-full flex items-center justify-center bg-[#070a12] p-4 text-white relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md space-y-6 z-10 animate-fade-in">
          
          {/* LOGO AREA */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">Cloud Sync Gateway</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">Sync Your Progress</h2>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Link your institutional identity to save performance portfolios, logs, and global diagnostic statistics.
            </p>
          </div>

          {/* MAIN AUTHENTICATION CARD */}
          <div className="p-6 rounded-2xl bg-[#0f1626]/60 backdrop-blur-xl border border-white/5 shadow-2xl space-y-4">
            
            {/* OAUTH MOCK BUTTONS */}
            <button 
              onClick={() => alert("Institutional provider authentication is under configuration.")}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all shadow-lg shadow-indigo-600/10 border border-indigo-400/20 flex items-center justify-center gap-2"
            >
              <span>Sign In to Sync</span>
            </button>

            <div className="relative flex py-2 items-center text-xs text-gray-500 font-mono">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase tracking-wider">Session Contingency</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            {/* SECONDARY GUEST BUTTON */}
            <Link 
              href="/labs"
              className="w-full bg-white/5 hover:bg-white/10 active:scale-[0.99] py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-gray-300 transition-all border border-white/5 flex items-center justify-center"
            >
              Stay Signed Out
            </Link>

          </div>

          {/* SYSTEM TELEMETRY NOTE */}
          <p className="text-center text-[10px] font-mono text-gray-600 tracking-wide uppercase">
            Notice: Un-synced sessions store data exclusively in local browser memory.
          </p>

        </div>
      </div>
    </PageTransition>
  );
}
