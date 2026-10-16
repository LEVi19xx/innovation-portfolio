"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Eyebrow from "./Eyebrow";
import FocusTitle from "./FocusTitle";
import ProjectArt from "./ProjectArt";
import ProjectDetail from "./ProjectDetail";
import TechBackdrop from "./TechBackdrop";
import { projects, slug, type Project } from "./projects-data";

const WORD = "PROJECTS".split("");
const N = projects.length;
// Each card sits STEP degrees round the ring from the last and DROP vh lower,
// so 20 projects wind down the helix in about four turns.
const STEP = 72;
const DROP = 9;

// Card styled as a little browser window onto the project.
function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
    <>
      {/* window chrome */}
      <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 border-b border-blue-900/10 bg-white/60 px-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-900/25 dark:bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-blue-900/25 dark:bg-white/30" />
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
        <span className="ml-2 truncate font-mono text-[9px] tracking-wide text-slate-500 dark:text-white/50">
          ~/projects/{slug(project.name)}
        </span>
        <span className="ml-auto font-mono text-[9px] tabular-nums text-blue-700 dark:text-blue-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* viewport: big artwork over a soft glow */}
      <span aria-hidden className="pointer-events-none absolute right-0 top-7 h-24 w-24 rounded-full bg-blue-400/40 blur-2xl dark:bg-blue-500/40" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-7 opacity-40 [background-image:linear-gradient(rgba(37,99,235,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.18)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_bottom,#000,transparent_80%)] dark:[background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)]"
      />
      <div className="pointer-events-none absolute right-3 top-9 h-[55%] w-[58%] text-blue-900/60 dark:text-white/80">
        <ProjectArt type={project.pattern} />
      </div>

      {/* sheen on hover */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100 dark:via-white/20" />

      {/* caption */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/90 to-transparent px-4 pb-3 pt-9 dark:from-[#05060a] dark:via-[#05060a]/80">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-blue-700 dark:text-blue-300">{project.tag}</p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h3 className="text-lg font-black uppercase leading-none tracking-tight text-slate-900 dark:text-white">
            {project.name}
          </h3>
          <span
            aria-hidden
            className="font-mono text-sm leading-none text-blue-700 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-blue-300"
          >
            ↗
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-[10.5px] leading-snug text-slate-600 dark:text-white/65">
          {project.description}
        </p>
      </div>
    </>
  );
}

const cardSurface =
  "group relative block aspect-[16/10] w-[min(60vw,380px)] overflow-hidden border border-blue-300/70 bg-gradient-to-br from-blue-300 via-blue-100 to-white dark:border-blue-400/40 dark:from-[#2563eb] dark:via-[#0a1330] dark:to-[#05060a]";

const cardOffsetVh = (i: number) => (i - (N - 1) / 2) * DROP;

// A card riding the helix. It orbits the centre column and turns to (mostly)
// face the viewer, so text never mirrors when it swings behind.
function RingCard({
  project,
  index,
  rotation,
  onOpen,
}: {
  project: Project;
  index: number;
  rotation: MotionValue<number>;
  onOpen: (i: number) => void;
}) {
  const base = STEP * index;
  // Angle from the front of the ring, wrapped to -180..180.
  const offset = (r: number) => ((((base + r + 180) % 360) + 360) % 360) - 180;
  // 0 when the card is off to the side, 1 when it has swung round to the front.
  const front = useTransform(rotation, (r) => {
    const t = Math.max(0, 1 - Math.abs(offset(r)) / 38);
    return t * t * (3 - 2 * t);
  });
  const transform = useTransform([rotation, front], ([r, f]: number[]) => {
    const a = base + r;
    const tilt = offset(r) * 0.4 * (1 - f); // slanted on the way round, flat at the front
    return `translate(-50%, -50%) translateY(${cardOffsetVh(index)}vh) rotateY(${a}deg) translateZ(var(--ring-r)) rotateY(${-a + tilt}deg)`;
  });
  // 1 at the front of the ring, 0 at the back.
  const facing = useTransform(rotation, (r) => (Math.cos(((base + r) * Math.PI) / 180) + 1) / 2);
  // Cards stay fully opaque (so nothing behind shows through); the ones round the back
  // are washed toward the background colour to look farther away.
  const veil = useTransform(facing, (f) => (1 - f) * 0.72);
  const pointerEvents = useTransform(facing, (f) => (f > 0.6 ? "auto" : "none"));

  return (
    <motion.div className="absolute left-1/2 top-1/2" style={{ transform }}>
      <motion.button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open ${project.name}`}
        style={{ pointerEvents }}
        className={`${cardSurface} cursor-pointer text-left shadow-[0_20px_50px_-20px_rgba(37,99,235,0.45)] dark:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)]`}
      >
        <ProjectCard project={project} index={index} />
        <motion.span
          aria-hidden
          style={{ opacity: veil }}
          className="pointer-events-none absolute inset-0 z-30 bg-slate-100 dark:bg-[#020308]"
        />
      </motion.button>
    </motion.div>
  );
}

function DesktopProjects({ setOpen }: { setOpen: (i: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Scrolling walks the ring round so each project in turn reaches the front.
  const rotation = useTransform(scrollYProgress, (p) => -p * (N - 1) * STEP);
  // The stack is taller than the screen, so it scrolls through: P-R-O-J first, E-C-T-S last.
  const lettersY = useTransform(scrollYProgress, (p) => `${32 - 64 * p}vh`);
  // The helix drifts so the front card goes from upper to lower while it winds down.
  const helixY = useTransform(scrollYProgress, (p) => `${(N - 1) * DROP * (0.5 - p) + (16 * p - 10)}vh`);
  const counter = useTransform(rotation, (r) =>
    String((((Math.round(-r / STEP) % N) + N) % N) + 1).padStart(2, "0"),
  );

  if (reduceMotion) {
    return (
      <section ref={ref} className="w-full border-t border-slate-200 bg-slate-100 px-6 py-28 md:px-10 dark:border-white/10 dark:bg-[#020308]">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-700 dark:text-blue-300">Selected work</p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-slate-900 md:text-5xl dark:text-white">Projects</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {projects.map((p, i) => (
              <button key={p.name} type="button" onClick={() => setOpen(i)} className={`${cardSurface} w-full cursor-pointer text-left`}>
                <ProjectCard project={p} index={i} />
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative h-[320vh] w-full border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#020308]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* backdrop: soft glow + scattered line-art tech logos (Process uses a grid, About is plain) */}
        <div
          aria-hidden
          className="absolute inset-0 [background:radial-gradient(60%_45%_at_15%_100%,rgba(59,130,246,0.2),transparent_70%),radial-gradient(55%_45%_at_90%_0%,rgba(34,211,238,0.14),transparent_70%)] dark:[background:radial-gradient(60%_45%_at_15%_100%,rgba(37,99,235,0.35),transparent_70%),radial-gradient(55%_45%_at_90%_0%,rgba(14,165,233,0.22),transparent_70%)]"
        />
        <TechBackdrop className="z-0 text-blue-800/[0.07] dark:text-blue-200/[0.05]" />

        {/* 3D stage: PROJECTS stacked in the middle, projects winding down a helix around it */}
        <div className="absolute inset-x-0 bottom-0 top-[18vh] z-10 [--ring-r:min(40vw,460px)] [perspective:2400px] [perspective-origin:50%_45%]">
          <div className="absolute inset-0 [transform:rotateX(-9deg)] [transform-style:preserve-3d]">
            <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ y: lettersY }}>
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                {WORD.map((char, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className="block select-none bg-gradient-to-b from-slate-900 via-blue-700 to-blue-500 bg-clip-text text-[16vh] font-black leading-[0.95] text-transparent [filter:drop-shadow(0_0_18px_rgba(59,130,246,0.3))] dark:from-white dark:via-blue-200 dark:to-[#3b82f6] dark:[filter:drop-shadow(0_0_24px_rgba(59,130,246,0.7))]"
                  >
                    {char}
                  </span>
                ))}
                <span className="sr-only">Projects</span>
              </div>
            </motion.div>
            <motion.div className="absolute inset-0 [transform-style:preserve-3d]" style={{ y: helixY }}>
              {projects.map((project, i) => (
                <RingCard key={project.name} project={project} index={i} rotation={rotation} onOpen={setOpen} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* HUD */}
        <div className="absolute inset-x-0 top-0 pt-24">
          <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-6 px-6 md:px-10">
            <div className="pointer-events-none min-w-0">
              <div className="mb-6">
                <Eyebrow>Our work</Eyebrow>
              </div>
              <FocusTitle lines={["Selected work", "worth shipping"]} />
            </div>
            <div className="pointer-events-none hidden max-w-xs gap-4 sm:flex">
              <span
                aria-hidden
                className="w-[2px] shrink-0 rounded-full bg-gradient-to-b from-blue-600 via-blue-500/40 to-transparent dark:from-blue-400 dark:via-blue-400/40"
              />
              <div>
                <p className="font-display text-3xl font-black leading-none text-slate-900 dark:text-white">
                  {String(N).padStart(2, "0")}
                  <span className="ml-2 align-middle font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-blue-700 dark:text-blue-400">
                    Projects
                  </span>
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                  A few of the products we&apos;ve helped{" "}
                  <span className="font-semibold text-slate-900 dark:text-white">build, ship, and grow</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-7xl items-end justify-between px-6 pb-8 font-mono text-xs uppercase tracking-[0.25em] text-slate-500 md:px-10 dark:text-white/60">
          <span>Scroll</span>
          <span>
            <motion.span className="text-slate-900 dark:text-white">{counter}</motion.span> / {String(N).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

const mobileSurface =
  "group relative aspect-[16/10] w-[82vw] max-w-[380px] shrink-0 snap-center overflow-hidden border border-blue-300/70 bg-gradient-to-br from-blue-300 via-blue-100 to-white text-left dark:border-blue-400/40 dark:from-[#2563eb] dark:via-[#0a1330] dark:to-[#05060a]";

/** Phones and tablets: the 3D helix needs a large canvas, so here the work is a swipeable row. */
function MobileProjects({ onOpen }: { onOpen: (i: number) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | undefined;
    if (!el || !first) return;
    const step = first.offsetWidth + 16;
    setActive(Math.min(N - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  return (
    <section className="relative overflow-hidden border-t border-slate-200 bg-slate-100 py-20 dark:border-white/10 dark:bg-[#020308]">
      <div
        aria-hidden
        className="absolute inset-0 [background:radial-gradient(60%_45%_at_15%_100%,rgba(59,130,246,0.2),transparent_70%),radial-gradient(55%_45%_at_90%_0%,rgba(34,211,238,0.14),transparent_70%)] dark:[background:radial-gradient(60%_45%_at_15%_100%,rgba(37,99,235,0.35),transparent_70%),radial-gradient(55%_45%_at_90%_0%,rgba(14,165,233,0.22),transparent_70%)]"
      />
      <TechBackdrop className="text-blue-800/[0.07] dark:text-blue-200/[0.05]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mb-6">
          <Eyebrow>Our work</Eyebrow>
        </div>
        <FocusTitle lines={["Selected work", "worth shipping"]} />
        <div className="mt-8 flex max-w-sm gap-4">
          <span
            aria-hidden
            className="w-[2px] shrink-0 rounded-full bg-gradient-to-b from-blue-600 via-blue-500/40 to-transparent dark:from-blue-400 dark:via-blue-400/40"
          />
          <div>
            <p className="font-display text-3xl font-black leading-none text-slate-900 dark:text-white">
              {String(N).padStart(2, "0")}
              <span className="ml-2 align-middle font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-blue-700 dark:text-blue-400">
                Projects
              </span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
              A few of the products we&apos;ve helped{" "}
              <span className="font-semibold text-slate-900 dark:text-white">build, ship, and grow</span>.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={track}
        onScroll={onScroll}
        className="relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Open ${p.name}`}
            className={`${mobileSurface} cursor-pointer shadow-[0_20px_50px_-20px_rgba(37,99,235,0.45)] dark:shadow-[0_0_60px_-10px_rgba(37,99,235,0.6)]`}
          >
            <ProjectCard project={p} index={i} />
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-4 flex w-full max-w-7xl items-center justify-between gap-6 px-6 font-mono text-xs uppercase tracking-[0.25em] text-slate-500 md:px-10 dark:text-white/60">
        <span>Swipe →</span>
        <span className="relative h-px flex-1 bg-slate-300 dark:bg-white/15">
          <span
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-400 transition-[width] duration-300"
            style={{ width: `${((active + 1) / N) * 100}%` }}
          />
        </span>
        <span>
          <span className="text-slate-900 dark:text-white">{String(active + 1).padStart(2, "0")}</span> / {String(N).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

export default function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + N) % N)), []);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % N)), []);

  return (
    <div id="projects">
      <div className="lg:hidden">
        <MobileProjects onOpen={setOpen} />
      </div>
      <div className="hidden lg:block">
        <DesktopProjects setOpen={setOpen} />
      </div>
      <AnimatePresence>
        {open !== null && (
          <ProjectDetail
            key="detail"
            project={projects[open]}
            index={open}
            total={N}
            projects={projects}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
