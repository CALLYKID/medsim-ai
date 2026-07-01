"use client";

import Link from "next/link";

export default function NavigationHeader() {
  const navItems = [
    { name: "Core Modules", href: "/modules" },
    { name: "Metrics Matrix", href: "/metrics" },
    { name: "Performance Logs", href: "/logs" },
    { name: "Launch Console", href: "/console" },
  ];

  return (
    <header className="w-full bg-[#0b0f17]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* UPGRADED UNIQUE BRAND LOGO */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
          <svg 
            className="w-5 h-5 text-white animate-pulse" 
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
          <span className="text-sm font-black tracking-wider text-white uppercase font-sans">
            MEDSIM<span className="text-indigo-400">.AI</span>
          </span>
          <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold leading-none -mt-0.5">
            Clinical Engine
          </span>
        </div>
      </Link>

      {/* PREMIUM UX NAV BUTTONS WITH SMOOTH UNDERLINE HOVER EFFECT */}
      <nav className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="relative text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors duration-300 py-2 block
              after:absolute 
              after:bottom-0 
              after:left-0 
              after:h-[2px] 
              after:w-full 
              after:bg-gradient-to-r 
              after:from-indigo-500 
              after:to-purple-500
              after:scale-x-0 
              after:origin-left
              hover:after:scale-x-100
              after:transition-transform 
              after:duration-300 
              after:ease-out"
          >
            {item.name}
          </Link>
        ))}
      </nav>

    </header>
  );
}
