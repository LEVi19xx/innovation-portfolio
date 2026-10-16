"use client";

import { AnimatePresence, motion } from "framer-motion";
import { setTheme, useTheme } from "./theme-store";

export default function ThemeToggle() {
  const theme = useTheme();
  const isDark = theme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
      <motion.span
        aria-hidden
        className={`pointer-events-none absolute -inset-1 rounded-full border-2 border-dashed ${
          isDark ? "border-blue-400/40" : "border-amber-500/70"
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border transition-colors ${
          isDark
            ? "border-blue-400/30 bg-blue-500/10 text-blue-300 hover:border-blue-400/50 hover:bg-blue-500/20"
            : "border-amber-400 bg-amber-100 text-amber-600 shadow-sm shadow-amber-200 hover:border-amber-500 hover:bg-amber-200"
        }`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(96,165,250,0.35) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)",
          }}
        />
        <AnimatePresence initial={false} mode="wait">
          {isDark ? (
            <motion.svg
              key="moon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
