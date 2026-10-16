"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Eyebrow from "./Eyebrow";
import FocusTitle from "./FocusTitle";

// `dim` words settle into a muted tone once revealed, the rest into full colour.
const copy: { text: string; dim?: boolean }[] = [
  {
    text: "We're the Digital Innovation team at Telex — web developers and innovation associates turning bold ideas into working technology, from first prototype to full-scale launch. The focus stays the same:",
  },
  { text: "systems that scale,", dim: true },
  { text: "solving the problems that actually matter, and keeping" },
  { text: "people first", dim: true },
  { text: "throughout the entire process." },
];

const words = copy.flatMap((part) =>
  part.text.split(" ").filter(Boolean).map((w) => ({ w, dim: !!part.dim })),
);

function Word({
  word,
  dim,
  range,
  progress,
}: {
  word: string;
  dim: boolean;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const filter = useTransform(progress, range, ["blur(9px)", "blur(0px)"]);
  return (
    <motion.span
      style={{ opacity, filter }}
      className={`inline-block ${dim ? "text-slate-400 dark:text-neutral-500" : ""}`}
    >
      {word}
    </motion.span>
  );
}

const statements = [
  {
    number: "01",
    label: "Mission",
    // draft copy: confirm / replace with the team's official wording
    text: (
      <>
        We build digital solutions that{" "}
        <span className="font-semibold text-slate-900 dark:text-white">give our clients their time back</span> — so
        they can focus on growing what matters to them.
      </>
    ),
  },
  {
    number: "02",
    label: "Vision",
    text: (
      <>
        To be the partner clients trust to turn{" "}
        <span className="font-semibold text-slate-900 dark:text-white">every good idea into working technology</span>{" "}
        — built to last and ready to grow.
      </>
    ),
  },
];

/** Mission and Vision, alternating on their own; hover to hold one, or pick with the tabs. */
function MissionVision() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % statements.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  const cur = statements[active];
  return (
    <div
      className="flex max-w-xs gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span
        aria-hidden
        className="w-[2px] shrink-0 rounded-full bg-gradient-to-b from-blue-600 via-blue-500/50 to-transparent dark:from-blue-400 dark:via-blue-400/40"
      />
      <div className="min-h-[9.5rem]">
        {/* number and tabs share one line */}
        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={cur.number}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
              transition={{ duration: 0.25 }}
              className="font-display text-3xl font-black leading-none text-slate-900 dark:text-white"
            >
              {cur.number}
            </motion.span>
          </AnimatePresence>
          <div className="flex items-center gap-3">
            {statements.map((st, i) => (
              <button
                key={st.label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`font-mono text-[11px] font-medium uppercase tracking-[0.25em] transition-colors ${
                  i === active
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-slate-400 hover:text-slate-600 dark:text-slate-600 dark:hover:text-slate-400"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={cur.label}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.3 }}
            className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400"
          >
            {cur.text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const n = words.length;

  return (
    <section
      id="about"
      className="w-full overflow-x-clip border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#05060a]"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row">
          <div className="min-w-0">
            <div className="mb-6">
              <Eyebrow>About us</Eyebrow>
            </div>
            <FocusTitle
              lines={["Who we are", "what we build"]}
            />
          </div>
          <MissionVision />
        </div>

        <div className="relative">
        <div aria-hidden className="pointer-events-none absolute -right-44 top-1/2 hidden w-[34rem] max-w-[48%] -translate-y-1/2 lg:block">
          <Image
            src="/logo-white.png"
            alt=""
            width={1123}
            height={749}
            className="hidden h-auto w-full opacity-[0.12] dark:block"
          />
          <Image
            src="/logo.png"
            alt=""
            width={1123}
            height={749}
            className="h-auto w-full opacity-[0.14] mix-blend-multiply invert dark:hidden"
          />
        </div>
        <p
          ref={ref}
          aria-label={words.map((x) => x.w).join(" ")}
          className="max-w-4xl text-2xl font-medium leading-[1.2] tracking-tight text-slate-900 md:text-4xl dark:text-white"
        >
          {words.map((x, i) => (
            <span key={i} aria-hidden>
              <Word
                word={x.w}
                dim={x.dim}
                progress={scrollYProgress}
                range={[i / n, Math.min(1, (i + 3) / n)]}
              />{" "}
            </span>
          ))}
        </p>
        </div>

      </div>
    </section>
  );
}
