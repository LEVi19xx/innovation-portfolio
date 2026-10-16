"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  className?: string;
  /** ms between automatic focus changes */
  interval?: number;
  /** for always-dark backgrounds: ignore the light/dark theme and use light text */
  forceDark?: boolean;
};

/**
 * Stacked title where one line is in focus ([ bracketed ], sharp) and the
 * rest are blurred behind a scanline mask. Focus cycles on its own and
 * follows the pointer on hover.
 */
export default function FocusTitle({ lines, className = "", interval = 2400, forceDark = false }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || lines.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % lines.length), interval);
    return () => window.clearInterval(id);
  }, [paused, lines.length, interval]);

  return (
    <h2
      className={`rgb-title -ml-5 flex flex-col text-[clamp(1.3rem,4vw,2.75rem)] font-black uppercase leading-[1.08] tracking-tight md:-ml-10 ${forceDark ? "text-white" : "text-slate-900 dark:text-white"} ${className}`}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="sr-only">{lines.join(" ")}</span>
      {lines.map((line, i) => {
        const on = i === active;
        return (
          <span
            key={line}
            aria-hidden
            onMouseEnter={() => {
              setPaused(true);
              setActive(i);
            }}
            className="relative block w-fit cursor-default px-5 md:px-10"
          >
            <span
              className={`absolute left-0 top-0 font-light ${forceDark ? "text-blue-400" : "text-blue-600 dark:text-blue-400"} transition-all duration-500 ${
                on ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
              }`}
            >
              [
            </span>
            <span
              className={`rgb-split block whitespace-nowrap transition-all duration-500 ${
                on
                  ? "opacity-100 blur-0"
                  : "opacity-50 blur-[2.5px] [mask-image:repeating-linear-gradient(to_bottom,#000_0,#000_2px,transparent_2px,transparent_3px)]"
              }`}
            >
              {line}
            </span>
            <span
              className={`absolute right-0 top-0 font-light ${forceDark ? "text-blue-400" : "text-blue-600 dark:text-blue-400"} transition-all duration-500 ${
                on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
              }`}
            >
              ]
            </span>
          </span>
        );
      })}
    </h2>
  );
}
