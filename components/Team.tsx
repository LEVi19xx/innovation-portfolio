"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FocusTitle from "./FocusTitle";

type Member = {
  initials: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  compact?: boolean;
  /** e.g. "/team/hannah.png" — revealed on hover; silhouette is shown until set */
  photo?: string;
};

const team: Member[] = [
  {
    initials: "HR",
    name: "Hannah Joy Reyes",
    photo: "/team/hannah.png",
    role: "Head of Innovation Department",
    email: "hannah.reyes@telexph.com",
    phone: "+63 900 000 0000",
  },
  {
    initials: "JG",
    name: "Jayro Gabriel",
    photo: "/team/jayro-2.png",
    role: "Senior Web Developer / DevOps",
    email: "jayro.gabriel@telexph.com",
    phone: "+63 900 000 0000",
  },
  {
    initials: "CC",
    name: "Charmaine Joyce Coloma",
    photo: "/team/charmaine.png",
    role: "Full Stack Web Developer",
    email: "charmaine.coloma@telexph.com",
    phone: "+63 900 000 0000",
  },
  {
    initials: "HS",
    name: "Houston Harvey Sarmiento",
    photo: "/team/houston.png",
    role: "Web Developer",
    email: "houston.sarmiento@telexph.com",
    phone: "+63 900 000 0000",
  },
  {
    initials: "SB",
    name: "Santy Balmores",
    photo: "/team/santy.png",
    role: "Web Developer",
    email: "santy.balmores@telexph.com",
    phone: "+63 900 000 0000",
  },
  {
    initials: "AD",
    name: "Aldrich Jovit De Leon",
    photo: "/team/aldrich.png",
    role: "Innovation Associate",
    email: "aldrich.deleon@telexph.com",
    phone: "+63 900 000 0000",
  },
  {
    initials: "MV",
    name: "Mar Leonard Anthony Vallada",
    photo: "/team/mar.png",
    compact: true,
    role: "Innovation Associate",
    email: "mar.vallada@telexph.com",
    phone: "+63 900 000 0000",
  },
  {
    initials: "MC",
    name: "Mark Lester Cagay",
    photo: "/team/lester.png",
    role: "Innovation Associate",
    email: "lester.cagay@telexph.com",
    phone: "+63 900 000 0000",
  },
];

const circuitVariants = [
  {
    paths: [
      "M0 60 H90 V20 H180",
      "M300 140 H210 V190 H140 V240",
      "M0 320 H70 V360 H160 V400",
      "M300 40 H250 V90",
      "M20 420 V370 H100",
      "M0 150 H40 V120 H110 V160",
      "M300 260 H260 V300 H190 V330",
      "M120 0 V40 H60",
      "M230 0 V30 H300",
      "M0 220 H30 V260",
      "M250 420 V380 H220 V340",
    ],
    dots: [
      [180, 20], [140, 240], [160, 400], [250, 90], [100, 370],
      [90, 20], [110, 160], [190, 330], [60, 40], [220, 340], [30, 260],
    ],
  },
  {
    paths: [
      "M300 70 H220 V30 H140",
      "M0 170 H90 V220 H160 V260",
      "M300 340 H230 V380 H150 V410",
      "M0 40 H60 V90",
      "M270 420 V370 H190",
      "M300 200 H260 V160 H200 V190",
      "M0 290 H50 V330 H120 V360",
      "M170 0 V50 H240",
      "M60 0 V40 H0",
      "M300 250 H270 V280",
      "M70 420 V380 H100 V350",
    ],
    dots: [
      [140, 30], [160, 260], [150, 410], [60, 90], [190, 370],
      [200, 190], [120, 360], [240, 50], [0, 40], [70, 280], [100, 350],
    ],
  },
  {
    paths: [
      "M150 0 V40 H90 V80",
      "M0 100 H60 V140",
      "M300 90 H240 V50",
      "M300 200 H230 V240 H160",
      "M0 250 H70 V290 H130 V320",
      "M220 420 V370 H280 V330",
      "M40 420 V380 H0",
      "M300 320 H260 V360",
      "M0 40 H30",
      "M180 420 V390 H120 V360",
    ],
    dots: [
      [90, 80], [60, 140], [240, 50], [160, 240], [130, 320],
      [280, 330], [0, 380], [260, 360], [30, 40], [120, 360],
    ],
  },
  {
    paths: [
      "M0 90 H60 V50 H140",
      "M300 180 H240 V220 H170 V250",
      "M0 380 H90 V340 H180",
      "M300 30 H260 V70",
      "M120 420 V380 H60",
      "M300 300 H250 V340",
      "M0 200 H40 V160",
      "M200 0 V40 H260 V80",
      "M40 0 V30 H0",
      "M280 420 V390 H220",
    ],
    dots: [
      [140, 50], [170, 250], [180, 340], [260, 70], [60, 380],
      [250, 340], [40, 160], [260, 80], [0, 30], [220, 390],
    ],
  },
] as const;

function CircuitPattern({ variant }: { variant: number }) {
  const v = circuitVariants[variant % circuitVariants.length];
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-blue-600 opacity-[0.18] dark:text-white dark:opacity-[0.14]"
      viewBox="0 0 300 420"
      fill="none"
    >
      {v.paths.map((d, idx) => (
        <path key={idx} d={d} stroke="currentColor" strokeWidth="1.2" />
      ))}
      {v.dots.map(([cx, cy], idx) => (
        <circle key={idx} cx={cx} cy={cy} r={idx % 3 === 0 ? 3 : 2.5} fill="currentColor" />
      ))}
    </svg>
  );
}

function BustSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <circle cx="50" cy="38" r="28" fill="currentColor" />
      <path
        d="M-10 140 C -10 92 16 60 50 60 C 84 60 110 92 110 140 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Team() {
  // touch only: tap a card to reveal the photo, tap again to flip to contact, again to reset
  const [tap, setTap] = useState<{ i: number; stage: number }>({ i: -1, stage: 0 });
  const onTap = (i: number) => {
    if (!window.matchMedia("(hover: none)").matches) return;
    setTap((t) => (t.i === i ? { i, stage: (t.stage + 1) % 3 } : { i, stage: 1 }));
  };

  // "View all": 0 idle -> 1 all photos revealed -> 2 all flipped -> 3 flipped back, photos stay revealed
  const [all, setAll] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const viewAll = () => {
    timers.current.forEach(clearTimeout);
    if (all === 3) {
      setAll(0);
      return;
    }
    if (all !== 0) return;
    setTap({ i: -1, stage: 0 });
    setAll(1);
    timers.current = [
      setTimeout(() => setAll(2), 1200),
      setTimeout(() => setAll(3), 3200),
    ];
  };
  const stageOf = (i: number) =>
    all === 2 ? 2 : all > 0 ? 1 : tap.i === i ? tap.stage : 0;

  return (
    <section
      id="team"
      className="w-full border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#05060a]"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="min-w-0">
            <div className="mb-6 flex items-center gap-4 font-mono text-sm uppercase tracking-[0.3em] md:text-base">
              <span className="flex items-center gap-1" aria-hidden>
                <span className="h-4 w-[3px] -skew-x-[20deg] bg-blue-600 dark:bg-blue-400" />
                <span className="h-4 w-[3px] -skew-x-[20deg] bg-blue-600/60 dark:bg-blue-400/60" />
                <span className="h-4 w-[3px] -skew-x-[20deg] bg-blue-600/25 dark:bg-blue-400/25" />
              </span>
              <span className="bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text font-bold text-transparent dark:from-blue-300 dark:to-cyan-300">
                Our team
              </span>
            </div>
            <FocusTitle
              lines={["Meet the experts", "behind the innovation"]}
            />
          </div>
          <div className="flex max-w-sm gap-4">
            <span
              aria-hidden
              className="w-[2px] shrink-0 rounded-full bg-gradient-to-b from-blue-600 via-blue-500/50 to-transparent dark:from-blue-400 dark:via-blue-400/40"
            />
            <div>
              <p className="font-display text-3xl font-black leading-none text-slate-900 dark:text-white">
                {String(team.length).padStart(2, "0")}
                <span className="ml-2 align-middle font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-blue-700 dark:text-blue-400">
                  Builders
                </span>
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
                Tech enthusiasts, designers, and{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  data-driven minds
                </span>{" "}
                shipping work that matters.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              data-stage={stageOf(i)}
              onClick={() => onTap(i)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative aspect-[3/4.3] [perspective:1200px]"
            >
              <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-hover:[transition-delay:700ms] group-data-[stage=2]:[transform:rotateY(180deg)]">
                {/* FRONT */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_12px_32px_-16px_rgba(37,99,235,0.35)] ring-1 ring-blue-200/80 transition-shadow dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] dark:ring-0 duration-500 group-hover:shadow-[0_24px_60px_-20px_rgba(37,99,235,0.55)] group-data-[stage=1]:shadow-[0_24px_60px_-20px_rgba(37,99,235,0.55)] [backface-visibility:hidden]">
                  {/* single continuous background */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "var(--team-card-bg)" }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-[22%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/50 blur-3xl"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(37,99,235,0.22)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,#000_0%,transparent_70%)] dark:hidden"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-data-[stage=1]:left-[130%] group-hover:opacity-100 group-data-[stage=1]:opacity-100 group-data-[stage=2]:opacity-100 dark:hidden"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/70 blur-2xl dark:hidden"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 hidden dark:block"
                    style={{ background: "linear-gradient(90deg, transparent 62%, rgba(0,0,0,0.4) 100%)" }}
                  />
                  {member.photo && (
                    <>
                      <span
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-[30%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 group-data-[stage=1]:opacity-100 group-data-[stage=2]:opacity-100 dark:bg-blue-400/40"
                      />
                      <div className="absolute inset-x-0 top-[4%] h-[72%] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_70%,transparent_100%)]">
                        <div className="absolute inset-0 origin-[50%_15%] scale-[1.3]">
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="object-cover object-top opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-data-[stage=1]:opacity-100 group-data-[stage=2]:opacity-100"
                          />
                          {/* dark shadow shaped by the photo's own alpha; fades out on hover */}
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-slate-900 opacity-60 transition-opacity duration-500 group-hover:opacity-0 group-data-[stage=1]:opacity-0 group-data-[stage=2]:opacity-0"
                            style={{
                              WebkitMaskImage: `url(/_next/image?url=${encodeURIComponent(member.photo)}&w=1080&q=75)`,
                              maskImage: `url(/_next/image?url=${encodeURIComponent(member.photo)}&w=1080&q=75)`,
                              WebkitMaskSize: "cover",
                              maskSize: "cover",
                              WebkitMaskPosition: "50% 0%",
                              maskPosition: "50% 0%",
                              WebkitMaskRepeat: "no-repeat",
                              maskRepeat: "no-repeat",
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <BustSilhouette className={`${member.photo ? "hidden " : ""}absolute left-1/2 top-[8%] h-[64%] w-[70%] -translate-x-1/2 text-blue-400/45 [mask-image:linear-gradient(to_bottom,#000_50%,transparent_96%)] dark:text-black/90 dark:[mask-image:none]`} />

                  <span
                    aria-hidden
                    className="absolute left-2 top-3 whitespace-nowrap font-sans text-3xl sm:text-5xl uppercase tracking-tight text-blue-700/35 dark:text-white/50"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontWeight: 100 }}
                  >
                    Innov
                  </span>

                  <Image
                    src="/logo-white.png"
                    alt=""
                    width={1123}
                    height={749}
                    className="absolute right-3 top-3 hidden h-11 w-auto object-contain opacity-95 dark:block"
                  />
                  <Image
                    src="/logo.png"
                    alt=""
                    width={1123}
                    height={749}
                    className="absolute right-3 top-3 h-11 w-auto object-contain opacity-80 mix-blend-multiply invert dark:hidden"
                  />

                  {/* name/role sit directly on the same gradient, no separate bg */}
                  <div className="absolute inset-x-0 bottom-0 px-3.5 pb-4 pt-4 sm:px-5 sm:pb-5">
                    <span className="mb-2 block h-[2px] w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 dark:bg-blue-400/70 dark:bg-none" />
                    <p
                      className={`font-display font-bold leading-snug tracking-tight text-slate-900 dark:text-white ${
                        "compact" in member
                          ? "text-sm sm:whitespace-nowrap lg:text-[15px]"
                          : "text-sm sm:text-base"
                      }`}
                    >
                      {member.name}
                    </p>
                    <p className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-blue-700 sm:text-[10.5px] sm:tracking-[0.14em] dark:text-blue-300">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl p-4 ring-1 sm:p-5 ring-blue-200/80 [backface-visibility:hidden] dark:ring-0"
                  style={{
                    background: "var(--team-card-back-bg)",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <CircuitPattern variant={i} />

                  <Image
                    src="/logo-white.png"
                    alt=""
                    width={1123}
                    height={749}
                    className="pointer-events-none absolute left-1/2 top-1/2 hidden h-48 w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-10 dark:block"
                  />
                  <Image
                    src="/logo.png"
                    alt=""
                    width={1123}
                    height={749}
                    className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-auto -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.10] mix-blend-multiply invert dark:hidden"
                  />

                  <div className="relative">
                    <span className="mb-2 block h-[2px] w-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 dark:hidden" />
                    <p
                      className={`font-display font-bold leading-tight text-slate-900 dark:text-white ${
                        "compact" in member
                          ? "text-sm sm:whitespace-nowrap"
                          : "text-base sm:text-lg"
                      }`}
                    >
                      {member.name}
                    </p>
                    <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.12em] text-blue-700 sm:text-[11px] sm:tracking-[0.15em] dark:text-blue-300">
                      {member.role}
                    </p>
                  </div>

                  <div className="relative flex flex-col gap-3">
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-1.5 text-[11px] text-slate-700 sm:gap-2 sm:text-[13px] transition-colors hover:text-blue-700 dark:text-white/85 dark:hover:text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-70">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m2 7 10 6 10-6" />
                      </svg>
                      <span className="min-w-0 sm:break-all">
                        {member.email.split("@")[0]}@<wbr />{member.email.split("@")[1]}
                      </span>
                    </a>
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={`tel:${member.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-1.5 text-[11px] text-slate-700 sm:gap-2 sm:text-[13px] transition-colors hover:text-blue-700 dark:text-white/85 dark:hover:text-white"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-70">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                      </svg>
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={viewAll}
            disabled={all === 1 || all === 2}
            className="group/btn inline-flex items-center gap-3 rounded-full border border-blue-600/30 bg-white px-7 py-3 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 shadow-[0_12px_32px_-16px_rgba(37,99,235,0.5)] transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-default disabled:opacity-60 disabled:hover:bg-white disabled:hover:text-blue-700 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white dark:hover:text-slate-900 dark:disabled:hover:bg-white/5 dark:disabled:hover:text-white"
          >
            {all === 3 ? "Reset" : "View all"}
            <span aria-hidden className="transition-transform group-hover/btn:translate-x-1">
              {all === 3 ? "↺" : "→"}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
