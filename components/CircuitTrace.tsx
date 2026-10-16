"use client";

import { useCallback, useEffect, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

/**
 * A power trace down the left edge of the page. Scrolling sends current along it and lights a
 * node as each section is reached; at the very end the whole board lights up.
 */

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "projects", label: "Projects" },
  { id: "team", label: "Team" },
  { id: "contact", label: "Contact" },
];

export default function CircuitTrace() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [marks, setMarks] = useState<number[]>(() => SECTIONS.map((_, i) => i / (SECTIONS.length - 1)));

  useMotionValueEvent(scrollYProgress, "change", setProgress);

  // where each section sits along the page, as a 0..1 fraction of the scrollable distance
  const measure = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return;
    setMarks(
      SECTIONS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return 0;
        const top = el.getBoundingClientRect().top + window.scrollY;
        return Math.min(1, Math.max(0, top / max));
      }),
    );
  }, []);

  useEffect(() => {
    // the ResizeObserver fires once on observe(), which does the first measurement
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [measure]);

  const allLit = progress > 0.985;

  // tell the rest of the page (CSS) when the board is fully powered
  useEffect(() => {
    document.documentElement.dataset.board = allLit ? "lit" : "";
  }, [allLit]);

  // a round power gauge: the ring fills as you scroll, and a lamp on the rim lights for each section
  const R = 26;
  const C = 2 * Math.PI * R;
  const shown = allLit ? 1 : progress;
  const here = marks.reduce((acc, m, i) => (progress >= m - 0.004 ? i : acc), 0);

  return (
    <div aria-hidden className="pointer-events-none fixed bottom-4 right-4 z-30 lg:bottom-6 lg:right-6">
      <div
        className={`relative h-[68px] w-[68px] rounded-full bg-white/70 backdrop-blur-md transition-shadow duration-700 dark:bg-[#05060a]/70 ${
          allLit ? "shadow-[0_0_28px_6px_rgba(34,211,238,0.45)]" : "shadow-lg shadow-slate-900/15 dark:shadow-black/50"
        }`}
      >
        <svg viewBox="0 0 68 68" className="absolute inset-0 -rotate-90">
          <circle cx="34" cy="34" r={R} fill="none" strokeWidth="3" className="stroke-slate-300/70 dark:stroke-white/15" />
          <circle
            cx="34"
            cy="34"
            r={R}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            stroke="url(#gauge-grad)"
            strokeDasharray={+C.toFixed(2)}
            strokeDashoffset={+(C * (1 - shown)).toFixed(2)}
            style={{ transition: "stroke-dashoffset 120ms linear", filter: allLit ? "drop-shadow(0 0 5px #22d3ee)" : "drop-shadow(0 0 3px rgba(59,130,246,0.8))" }}
          />
          <defs>
            <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
          </defs>
          {/* a lamp on the rim for each section */}
          {marks.map((m, i) => {
            const ang = m * 2 * Math.PI;
            const lit = progress >= m - 0.004 || allLit;
            return (
              <circle
                key={SECTIONS[i].id}
                cx={+(34 + R * Math.cos(ang)).toFixed(2)}
                cy={+(34 + R * Math.sin(ang)).toFixed(2)}
                r={lit ? 3 : 2}
                className={lit ? "fill-cyan-200 stroke-cyan-400" : "fill-slate-100 stroke-slate-400/70 dark:fill-[#05060a] dark:stroke-white/30"}
                strokeWidth="1.2"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono text-[13px] font-bold tabular-nums leading-none ${allLit ? "text-cyan-600 dark:text-cyan-300" : "text-slate-800 dark:text-white"}`}>
            {allLit ? 100 : Math.round(progress * 100)}
          </span>
          <span className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {String(allLit ? SECTIONS.length : here + 1).padStart(2, "0")}/{String(SECTIONS.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
