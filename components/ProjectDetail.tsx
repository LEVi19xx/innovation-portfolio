"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { animate, motion, useInView, useScroll } from "framer-motion";
import ProjectArt from "./ProjectArt";
import { slug, type Project } from "./projects-data";

const ART = ["circles", "grid", "wave", "diagonal"];
const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  project: Project;
  index: number;
  total: number;
  projects: Project[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

/** Counts a leading number up when it scrolls into view ("60%", "120k", "1M+"); other text is left alone. */
function CountUp({ value }: { value: string }) {
  const m = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [shown, setShown] = useState(m ? "0" : value);

  useEffect(() => {
    if (!m || !inView) return;
    const target = parseFloat(m[1]);
    const decimals = (m[1].split(".")[1] ?? "").length;
    const controls = animate(0, target, {
      duration: 1.3,
      ease: EASE,
      onUpdate: (v) => setShown(v.toFixed(decimals)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <span ref={ref}>
      {shown}
      {m ? m[2] : ""}
    </span>
  );
}

/** Fades/rises in once when it enters the scrolling panel. */
function Reveal({
  children,
  root,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  root: RefObject<HTMLElement | null>;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, root, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stand-in for a project screenshot until real images are available. */
function Screen({ art, label, name }: { art: string; label: string; name: string }) {
  return (
    <div className="group relative aspect-[16/10] w-full overflow-hidden border border-blue-300/70 bg-gradient-to-br from-blue-200 via-blue-50 to-white shadow-[0_30px_70px_-35px_rgba(37,99,235,0.5)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-30px_rgba(37,99,235,0.65)] dark:border-blue-400/25 dark:from-[#1d4ed8] dark:via-[#0a1330] dark:to-[#05060a]">
      <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-1.5 border-b border-blue-900/10 bg-white/60 px-3.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
        <span className="h-2 w-2 rounded-full bg-blue-900/25 dark:bg-white/30" />
        <span className="h-2 w-2 rounded-full bg-blue-900/25 dark:bg-white/30" />
        <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
        <span className="ml-3 truncate font-mono text-[10px] tracking-wide text-slate-500 dark:text-white/50">
          {slug(name)}.app
        </span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
          {label}
        </span>
      </div>
      <span aria-hidden className="pointer-events-none absolute right-0 top-8 h-48 w-48 rounded-full bg-blue-400/40 blur-3xl dark:bg-blue-500/40" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-8 opacity-40 [background-image:linear-gradient(rgba(37,99,235,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.18)_1px,transparent_1px)] [background-size:26px_26px] dark:[background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)]"
      />
      <div className="absolute inset-x-[10%] bottom-[8%] top-[18%] text-blue-900/60 transition-transform duration-700 ease-out group-hover:scale-105 dark:text-white/80">
        <ProjectArt type={art} />
      </div>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[130%] group-hover:opacity-100 dark:via-white/20" />
    </div>
  );
}

export default function ProjectDetail({ project, index, total, projects, onClose, onPrev, onNext }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const upNext = projects[(index + 1) % total];

  // lock the page behind, and wire up the keyboard
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  // jump back to the top when moving to another project
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [index]);

  const start = ART.indexOf(project.pattern);
  const art = (n: number) => ART[(start + n) % ART.length];
  const num = String(index + 1).padStart(2, "0");

  const label = "font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500";
  // left column items rise in one after another
  const rise = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay: 0.15 + i * 0.07 },
  });

  return (
    <motion.div
      ref={scrollRef}
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 28 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed inset-0 z-[90] overflow-x-hidden overflow-y-auto bg-white text-slate-900 dark:bg-[#05060a] dark:text-white"
    >
      {/* reading progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: scrollYProgress }}
        className="fixed left-0 top-0 z-[95] h-[2px] w-full origin-left bg-gradient-to-r from-blue-600 to-cyan-400"
      />
      {/* backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 [background:radial-gradient(50%_40%_at_0%_100%,rgba(59,130,246,0.14),transparent_70%),radial-gradient(45%_40%_at_100%_0%,rgba(34,211,238,0.1),transparent_70%)] dark:[background:radial-gradient(50%_40%_at_0%_100%,rgba(37,99,235,0.28),transparent_70%),radial-gradient(45%_40%_at_100%_0%,rgba(14,165,233,0.18),transparent_70%)]"
      />

      <div className="relative grid min-h-full grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* details */}
        <aside className="px-6 pb-12 pt-10 md:px-10 lg:pt-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:overflow-y-auto">
          <motion.div {...rise(0)} className="flex items-center justify-between gap-4">
            <p className="truncate font-mono text-xs tracking-wide text-slate-500 dark:text-slate-400">
              digital-innovation / work / <span className="text-slate-900 dark:text-white">{slug(project.name)}</span>
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project"
              className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition-all hover:rotate-90 hover:border-blue-600 hover:text-blue-700 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </motion.div>

          <div className="mt-10 lg:mt-auto">
            <motion.p {...rise(1)} className="font-mono text-xs uppercase tracking-[0.3em] text-blue-700 dark:text-blue-300">
              {num} / {String(total).padStart(2, "0")}
            </motion.p>
            <motion.h2
              {...rise(2)}
              className="mt-3 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl"
            >
              {project.name}
            </motion.h2>
            <motion.p {...rise(3)} className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              {project.tag}
            </motion.p>

            <motion.p {...rise(4)} className="mt-8 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {project.overview}
            </motion.p>

            <motion.dl
              {...rise(5)}
              className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-5 border-t border-slate-200 pt-6 dark:border-white/10"
            >
              {(
                [
                  ["Status", project.status],
                  ["Year", project.date ? undefined : project.year],
                  ["Date", project.date],
                  ["Est. time", project.estTime],
                  ["Role", project.role],
                  ["Team", project.team],
                  ["Type", project.tag.split(" · ")[0]],
                ] as [string, string | undefined][]
              )
                .filter(([, v]) => v)
                .map(([k, v]) => (
                  <div key={k}>
                    <dt className={label}>{k}</dt>
                    <dd className="mt-1 flex items-center gap-2 text-sm font-semibold">
                      {k === "Status" && (
                        <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      )}
                      {v}
                    </dd>
                  </div>
                ))}
            </motion.dl>

            {project.stack && project.stack.length > 0 && (
              <motion.div {...rise(6)} className="mt-6 max-w-md">
                <p className={label}>Stack</p>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-slate-700 dark:text-slate-300">
                  {project.stack.map((s, i) => (
                    <li key={`${s}-${i}`} className="flex items-center gap-2">
                      <span className="h-px w-4 bg-gradient-to-r from-blue-600 to-cyan-400" />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            <motion.div
              {...rise(7)}
              className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-slate-200 pt-6 dark:border-white/10"
            >
              {project.results.map((r, i) => (
                <div key={i}>
                  <p className="font-display text-2xl font-black leading-none text-slate-900 md:text-3xl dark:text-white">
                    <CountUp value={r.value} />
                  </p>
                  <p className="mt-2 text-[11px] leading-snug text-slate-500 dark:text-slate-400">{r.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div {...rise(8)} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={project.link}
                onClick={project.link.startsWith("#") ? onClose : undefined}
                className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-slate-900 dark:text-white"
              >
                Visit live site
                <span className="h-px w-8 bg-blue-600 transition-all duration-300 group-hover:w-14 dark:bg-blue-300" />
                <span aria-hidden>→</span>
              </a>
              <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <button type="button" onClick={onPrev} className="transition-colors hover:text-blue-700 dark:hover:text-blue-300">
                  ← Prev
                </button>
                <button type="button" onClick={onNext} className="transition-colors hover:text-blue-700 dark:hover:text-blue-300">
                  Next →
                </button>
              </div>
            </motion.div>
          </div>
        </aside>

        {/* visuals + story */}
        <main className="space-y-10 px-6 pb-16 pt-20 md:px-10 lg:pt-6">
          <Reveal root={scrollRef}>
            <Screen art={art(0)} label="Screen 01" name={project.name} />
          </Reveal>

          {project.challenge && (
            <Reveal root={scrollRef} className="max-w-xl">
              <p className={label}>The challenge</p>
              <p className="mt-3 text-xl leading-snug md:text-2xl">{project.challenge}</p>
            </Reveal>
          )}

          {(project.before || project.after) && (
            <Reveal root={scrollRef} className="grid gap-4 md:grid-cols-2">
              {project.before && (
                <div className="border border-slate-200 bg-white/60 p-6 dark:border-white/10 dark:bg-white/[0.03]">
                  <p className={label}>Before</p>
                  <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{project.before}</p>
                </div>
              )}
              {project.after && (
                <div className="border border-blue-300/70 bg-blue-50/70 p-6 dark:border-blue-400/30 dark:bg-blue-500/[0.07]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue-700 dark:text-blue-300">After</p>
                  <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-200">{project.after}</p>
                </div>
              )}
            </Reveal>
          )}

          <Reveal root={scrollRef}>
            <Screen art={art(1)} label="Screen 02" name={project.name} />
          </Reveal>

          {project.solution && (
            <Reveal root={scrollRef} className="max-w-xl">
              <p className={label}>The solution</p>
              <p className="mt-3 text-xl leading-snug md:text-2xl">{project.solution}</p>
            </Reveal>
          )}

          {project.features && project.features.length > 0 && (
            <Reveal root={scrollRef}>
              <p className={label}>What was built</p>
              <ol className="mt-4 grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 dark:border-white/10 dark:bg-white/10">
                {project.features.map((f, i) => (
                  <li key={f.title} className="bg-white p-5 dark:bg-[#05060a]">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-blue-700 dark:text-blue-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mt-2 text-sm font-black uppercase tracking-wide">{f.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.text}</p>
                  </li>
                ))}
              </ol>
              {project.scope && (
                <p className="mt-4 border-l-2 border-blue-600 pl-4 font-mono text-xs leading-relaxed text-slate-500 dark:border-blue-400 dark:text-slate-400">
                  {project.scope}
                </p>
              )}
            </Reveal>
          )}

          <Reveal root={scrollRef}>
            <Screen art={art(2)} label="Screen 03" name={project.name} />
          </Reveal>

          {project.purpose && (
            <Reveal root={scrollRef} className="max-w-xl">
              <p className={label}>Purpose / impact</p>
              <p className="mt-3 text-xl leading-snug md:text-2xl">{project.purpose}</p>
            </Reveal>
          )}

          {/* up next */}
          <Reveal root={scrollRef}>
            <button
              type="button"
              onClick={onNext}
              className="group flex w-full items-end justify-between gap-6 border-t border-slate-200 pt-8 text-left dark:border-white/10"
            >
              <span>
                <span className={label}>Up next</span>
                <span className="mt-2 block text-3xl font-black uppercase tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                  {upNext.name}
                </span>
                <span className="mt-2 block font-mono text-xs uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  {upNext.tag}
                </span>
              </span>
              <span
                aria-hidden
                className="font-mono text-3xl text-blue-700 transition-transform duration-500 group-hover:translate-x-2 dark:text-blue-300"
              >
                →
              </span>
            </button>
          </Reveal>
        </main>
      </div>
    </motion.div>
  );
}
