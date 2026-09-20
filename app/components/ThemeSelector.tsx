"use client";

import { useEffect, useState } from "react";

const themes = [
  {
    id: "default",
    name: "Clinical",
    icon: "🩺",
    background: "#0b0f17",
    card: "#111827",
    primary: "#4f46e5",
    text: "#e5e7eb",
    description: "Standard clinical interface",
  },
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "❤️",
    background: "#12090c",
    card: "#1c1014",
    primary: "#dc3545",
    text: "#f3e8ea",
    description: "Cardiac red interface",
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: "🧠",
    background: "#07111f",
    card: "#0d1b2e",
    primary: "#06b6d4",
    text: "#e6f7ff",
    description: "Neural cyan interface",
  },
  {
    id: "emergency",
    name: "Emergency",
    icon: "🚑",
    background: "#110d08",
    card: "#1c1510",
    primary: "#f97316",
    text: "#fff4e8",
    description: "Emergency response interface",
  },
  {
    id: "laboratory",
    name: "Laboratory",
    icon: "🧬",
    background: "#07120f",
    card: "#0d1d18",
    primary: "#10b981",
    text: "#e8fff7",
    description: "Laboratory green interface",
  },
  {
    id: "radiology",
    name: "Radiology",
    icon: "🩻",
    background: "#080d16",
    card: "#101a2a",
    primary: "#60a5fa",
    text: "#eef6ff",
    description: "Radiology blue interface",
  },
];

export default function ThemeSelector() {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("medicsim-theme") || "default";

    setTheme(savedTheme);

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme === "default" ? "" : savedTheme
    );
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
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {themes.map((item) => {
        const isActive = theme === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => changeTheme(item.id)}
            aria-label={`Use ${item.name} theme`}
            className="group relative min-w-0 cursor-pointer overflow-hidden rounded-xl text-left transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
            style={{
              border: `1px solid ${
                isActive ? item.primary : "rgba(255,255,255,0.08)"
              }`,
              boxShadow: isActive
                ? `0 0 0 1px ${item.primary}30, 0 8px 25px ${item.primary}18`
                : undefined,
            }}
          >
            {/* Theme preview */}
            <div
              className="relative h-20 w-full overflow-hidden p-2.5 transition-all duration-300 group-hover:h-[84px]"
              style={{
                background: item.background,
              }}
            >
              {/* Fake application window */}
              <div
                className="h-full w-full overflow-hidden rounded-lg border"
                style={{
                  background: item.card,
                  borderColor: `${item.primary}35`,
                }}
              >
                {/* Fake top bar */}
                <div
                  className="flex h-4 items-center gap-1 border-b px-2"
                  style={{
                    borderColor: `${item.primary}25`,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: item.primary }}
                  />
                  <span
                    className="h-1 w-8 rounded-full opacity-40"
                    style={{ background: item.text }}
                  />
                </div>

                {/* Fake content */}
                <div className="flex gap-1.5 p-2">
                  <div
                    className="h-7 w-7 shrink-0 rounded-md"
                    style={{
                      background: `${item.primary}20`,
                      border: `1px solid ${item.primary}35`,
                    }}
                  />

                  <div className="min-w-0 flex-1 space-y-1">
                    <div
                      className="h-1.5 w-3/4 rounded-full"
                      style={{ background: `${item.text}35` }}
                    />
                    <div
                      className="h-1.5 w-1/2 rounded-full"
                      style={{ background: `${item.text}18` }}
                    />
                    <div
                      className="mt-1.5 h-2 w-10 rounded-full"
                      style={{ background: item.primary }}
                    />
                  </div>
                </div>
              </div>

              {/* Active glow */}
              {isActive && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-30 blur-xl"
                  style={{
                    background: item.primary,
                  }}
                />
              )}
            </div>

            {/* Information */}
            <div
              className="min-w-0 p-3"
              style={{
                background: `${item.card}`,
              }}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-lg leading-none">
                  {item.icon}
                </span>

                <span
                  className="min-w-0 truncate text-xs font-black"
                  style={{
                    color: item.text,
                  }}
                >
                  {item.name}
                </span>
              </div>

              <p
                className="mt-1 truncate text-[9px] font-medium"
                style={{
                  color: `${item.text}80`,
                }}
              >
                {item.description}
              </p>

              {/* Accent indicator */}
              <div className="mt-2 flex items-center gap-1.5">
                <span
                  className="h-1.5 w-8 rounded-full transition-all duration-300 group-hover:w-12"
                  style={{
                    background: item.primary,
                    boxShadow: `0 0 8px ${item.primary}70`,
                  }}
                />

                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: `${item.primary}50`,
                  }}
                />

                {isActive && (
                  <span
                    className="ml-auto text-[8px] font-black uppercase tracking-wider"
                    style={{
                      color: item.primary,
                    }}
                  >
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Hover border glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                boxShadow: `inset 0 0 0 1px ${item.primary}70, 0 0 18px ${item.primary}20`,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}