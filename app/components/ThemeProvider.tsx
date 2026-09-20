"use client";

import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("medicsim-theme") || "default";

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme === "default" ? "" : savedTheme
    );
  }, []);

  return null;
}