"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Eyebrow from "./Eyebrow";
import FocusTitle from "./FocusTitle";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We sit down with the team that asked for it, map how they work today, and pin down the real problem before writing a line of code.",
    points: ["Stakeholder interviews", "Current-process mapping", "Pain points & goals", "Requirements & scope", "Output — Scoped brief"],
  },
  {
    number: "02",
    title: "Design",
    description:
      "The scope becomes wireframes and a clickable prototype, tested with the people who will actually use it.",
    points: ["User flows", "Wireframes", "UI prototype", "Testing with end users", "Output — Approved prototype"],
  },
  {
    number: "03",
    title: "Build",
    description:
      "We develop in short sprints with regular demos, so feedback lands while it is still cheap to change.",
    points: ["Sprint planning", "Development & demos", "Code review", "QA & user acceptance testing", "Output — Working release"],
  },
  {
    number: "04",
    title: "Launch",
    description:
      "We deploy to production, train the users, and hand over clear documentation so the team can run with it.",
    points: ["Deployment", "Data migration", "User training", "Documentation & handover", "Output — Live system"],
  },
  {
    number: "05",
    title: "Improve",
    description:
      "After launch we watch real usage, fix issues quickly, and keep refining based on feedback and data.",
    points: ["Usage monitoring", "Bug fixes & support", "Feedback collection", "Enhancements & new features", "Output — Continuous improvement"],
  },
];

function Steps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // on touch, stop the auto-advance once someone has picked a step, so it doesn't change while they read
  const [picked, setPicked] = useState(false);
  const step = steps[active];

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <div className="mb-6">
            <Eyebrow>Our process</Eyebrow>
          </div>
          <FocusTitle
            lines={["How we work", "idea to impact"]}
          />
        </div>
        <div className="flex max-w-sm gap-4">
          <span
            aria-hidden
            className="w-[2px] shrink-0 rounded-full bg-gradient-to-b from-blue-600 via-blue-500/50 to-transparent dark:from-blue-400 dark:via-blue-400/40"
          />
          <div>
            <p className="font-display text-3xl font-black leading-none text-slate-900 dark:text-white">
              {String(steps.length).padStart(2, "0")}
              <span className="ml-2 align-middle font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-blue-700 dark:text-blue-400">
                Steps
              </span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
              How every request becomes a working system —{" "}
              <span className="font-semibold text-slate-900 dark:text-white">hover to pause</span>.
            </p>
          </div>
        </div>
      </div>

      <div
        className="mt-14 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* step list: the active row's underline fills, then hands off to the next */}
        <ol>
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.number} className="border-t border-slate-200 last:border-b dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setActive(i);
                    if (window.matchMedia("(hover: none)").matches) setPicked(true);
                  }}
                  aria-current={on ? "step" : undefined}
                  className="group relative flex w-full items-baseline gap-5 py-5 text-left"
                >
                  <span
                    className={`font-mono text-xs tabular-nums transition-colors ${
                      on ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-600"
                    }`}
                  >
                    {s.number}
                  </span>
                  <span
                    className={`text-2xl font-black uppercase tracking-tight transition-all duration-300 md:text-3xl ${
                      on
                        ? "translate-x-1 text-slate-900 dark:text-white"
                        : "text-slate-300 group-hover:text-slate-500 dark:text-slate-700 dark:group-hover:text-slate-400"
                    }`}
                  >
                    {s.title}
                  </span>
                  {on && (
                    <span
                      key={`bar-${active}`}
                      aria-hidden
                      onAnimationEnd={() => !picked && setActive((a) => (a + 1) % steps.length)}
                      style={{ animationPlayState: paused ? "paused" : "running" }}
                      className="animate-step-fill absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-blue-600 to-cyan-400"
                    />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden md:hidden"
                    >
                      <div className="relative pb-6 pl-9 pt-5">
                        <span
                          aria-hidden
                          className="pointer-events-none absolute top-0 right-0 select-none font-display text-[4rem] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(37,99,235,0.22)] dark:[-webkit-text-stroke:1.5px_rgba(147,197,253,0.22)]"
                        >
                          {s.number}
                        </span>
                        <p className="relative max-w-[14rem] text-base leading-snug text-slate-900 dark:text-white">
                          {s.description}
                        </p>
                        <ul className="relative mt-5 space-y-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                          {s.points.map((p) => (
                            <li key={p} className="flex items-center gap-3">
                              <span className="h-px w-5 shrink-0 bg-gradient-to-r from-blue-600 to-cyan-400" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        {/* the active step */}
        <div className="relative hidden min-h-[16rem] overflow-hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-0 select-none font-display text-[6rem] font-black leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(37,99,235,0.25)] md:text-[11rem] dark:[-webkit-text-stroke:1.5px_rgba(147,197,253,0.25)]"
              >
                {step.number}
              </span>
              <p className="relative max-w-lg pr-24 text-lg leading-snug text-slate-900 md:max-w-2xl md:pr-40 md:text-2xl dark:text-white">
                {step.description}
              </p>
              <ul className="relative mt-8 space-y-3 font-mono text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                {step.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="h-px w-6 bg-gradient-to-r from-blue-600 to-cyan-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      className="relative isolate w-full overflow-hidden border-t border-blue-200 bg-gradient-to-b from-blue-50 to-slate-100 dark:border-blue-400/20 dark:from-[#0b1636] dark:to-[#070d22]"
    >
      {/* backdrop that sets this section apart from the one above */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(50%_60%_at_85%_20%,rgba(59,130,246,0.18),transparent),radial-gradient(40%_50%_at_10%_90%,rgba(34,211,238,0.10),transparent)] dark:[background:radial-gradient(50%_60%_at_85%_20%,rgba(59,130,246,0.28),transparent),radial-gradient(40%_50%_at_10%_90%,rgba(34,211,238,0.12),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(37,99,235,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.8)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)] dark:opacity-[0.07] dark:[background-image:linear-gradient(rgba(147,197,253,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.9)_1px,transparent_1px)]"
      />
      <div className="mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <Steps />
      </div>
    </section>
  );
}
