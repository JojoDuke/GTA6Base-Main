"use client";

import { useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { ADMIN_THEME_COOKIE, type AdminTheme } from "@/lib/cms/admin-theme";

export function ThemeToggle({ initialTheme }: { initialTheme: AdminTheme }) {
  const [theme, setTheme] = useState(initialTheme);
  const button = useRef<HTMLButtonElement>(null);
  const isDark = theme === "dark";

  function toggle() {
    const next: AdminTheme = isDark ? "light" : "dark";
    setTheme(next);
    button.current?.closest(".admin-theme")?.setAttribute("data-theme", next);
    document.cookie = `${ADMIN_THEME_COOKIE}=${next}; path=/admin; max-age=31536000; samesite=lax`;
  }

  return (
    <button
      ref={button}
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
