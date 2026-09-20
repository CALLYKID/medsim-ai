"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "default", name: "Clinical", icon: "🩺" },
  { id: "cardiology", name: "Cardiology", icon: "❤️" },
  { id: "neurology", name: "Neurology", icon: "🧠" },
  { id: "emergency", name: "Emergency", icon: "🚑" },
  { id: "laboratory", name: "Laboratory", icon: "🧬" },
  { id: "radiology", name: "Radiology", icon: "🩻" },
];

export default function ThemeSelector() {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("medicsim-theme");

    if (savedTheme) {
      setTheme(savedTheme);

      document.documentElement.setAttribute(
        "data-theme",
        savedTheme === "default" ? "" : savedTheme
      );
    }
  }, []);

  function changeTheme(newTheme: string) {
    setTheme(newTheme);

    localStorage.setItem("medicsim-theme", newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme === "default" ? "" : newTheme
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {themes.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => changeTheme(item.id)}
          className={`cursor-pointer rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
            theme === item.id
              ? "border-[var(--primary)]/60 bg-[var(--primary)]/10 shadow-lg shadow-black/10"
              : "border-white/10 bg-white/[0.03] hover:border-white/20"
          }`}
        >
          <div className="text-2xl">{item.icon}</div>

          <p className="mt-2 text-sm font-bold text-white">
            {item.name}
          </p>

          {theme === item.id && (
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[var(--primary)]">
              Active
            </p>
          )}
        </button>
      ))}
    </div>
  );
}
