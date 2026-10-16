"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroGraphic from "./HeroGraphic";
import { WELCOME_REVEAL_MS } from "./Welcome";

const TYPE_SPEED = 55;
const HOLD_MS = 2200;
const LINE_PAUSE_MS = 250;
const RESTART_PAUSE_MS = 500;

const LINE_1 = "Innovate";
const LINE_2 = "Beyond Limits";
const LINES = [LINE_1, LINE_2];

// "Innovate" should feel like the next word being typed right after
// "Digital Innovation" - so it starts just moments after that, not after
// the whole Hero container has finished fading in.
const SECTION_REVEAL_S = WELCOME_REVEAL_MS / 1000 + 0.15;

function useTypewriterLoop(lines: string[], startDelayMs: number) {
  const [display, setDisplay] = useState<string[]>(() => lines.map(() => ""));
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    let timer: ReturnType<typeof setTimeout>;

    function setLineText(idx: number, text: string) {
      setDisplay((prev) => {
        const next = [...prev];
        next[idx] = text;
        return next;
      });
    }

    function restart() {
      lineIndex = 0;
      charIndex = 0;
      setDisplay(lines.map(() => ""));
      timer = setTimeout(tick, TYPE_SPEED);
    }

    function tick() {
      if (cancelled) return;
      const currentText = lines[lineIndex];

      charIndex += 1;
      setLineText(lineIndex, currentText.slice(0, charIndex));
      setActiveLine(lineIndex);

      if (charIndex >= currentText.length) {
        if (lineIndex < lines.length - 1) {
          lineIndex += 1;
          charIndex = 0;
          timer = setTimeout(tick, LINE_PAUSE_MS);
        } else {
          timer = setTimeout(restart, HOLD_MS + RESTART_PAUSE_MS);
        }
        return;
      }
      timer = setTimeout(tick, TYPE_SPEED);
    }

    timer = setTimeout(tick, startDelayMs);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lines, startDelayMs]);

  return { display, activeLine };
}

function TypedLine({
  text,
  active,
  className,
}: {
  text: string;
  active: boolean;
  className?: string;
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(8px)", scale: 1.15 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
      {active && <span aria-hidden className="typing-caret" />}
    </span>
  );
}

export default function Hero() {
  const { display, activeLine } = useTypewriterLoop(LINES, SECTION_REVEAL_S * 1000);

  return (
    <section id="home" className="relative w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: WELCOME_REVEAL_MS / 1000 }}
        className="relative isolate flex min-h-[820px] flex-col items-center justify-center overflow-hidden px-6 py-24 pt-36 text-center md:min-h-[960px] md:px-10 md:py-32 md:pt-44"
        style={{ background: "var(--hero-bg)" }}
      >
        <HeroGraphic />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--hero-overlay)" }}
        />

        <div className="relative z-10 flex w-full max-w-none flex-col items-center gap-6">
          <h1 className="select-none text-[clamp(2.2rem,9vw,8.5rem)] font-black uppercase leading-[0.85] tracking-tighter text-slate-900 dark:text-white">
            <TypedLine text={display[0]} active={activeLine === 0} className="block" />
            <TypedLine
              text={display[1]}
              active={activeLine === 1}
              className="block font-light italic text-blue-700 dark:text-blue-200"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: SECTION_REVEAL_S + 0.55 }}
            className="max-w-2xl text-sm text-slate-600 dark:text-slate-300 md:text-base"
          >
            We design and engineer digital products that turn bold ideas into
            working technology — from first prototype to full-scale launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: SECTION_REVEAL_S + 0.75 }}
            className="mt-2 inline-flex items-center gap-1 rounded-full border border-slate-900/10 bg-slate-900/[0.04] p-1.5 backdrop-blur-md dark:border-white/15 dark:bg-white/[0.06]"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white sm:px-6 shadow-[0_4px_24px_rgba(37,99,235,0.55)] transition-all hover:bg-blue-500 hover:shadow-[0_4px_32px_rgba(59,130,246,0.7)]"
            >
              Start a project
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-70 transition-opacity group-hover:opacity-100"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
              View our work
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
