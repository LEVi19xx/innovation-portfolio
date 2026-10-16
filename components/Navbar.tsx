"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { SITE } from "./site-config";

const navLinks = ["Home", "About", "Process", "Projects", "Team", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // the portal target only exists on the client
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? selectedIndex;

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.toLowerCase()))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = navLinks.findIndex(
              (link) => link.toLowerCase() === entry.target.id,
            );
            if (idx !== -1) setSelectedIndex(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // lock the page behind the drawer and let Esc close it
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const drawer = (
    <AnimatePresence>
      {open && (
        <motion.nav
          key="menu"
          aria-label="Menu"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[85] flex flex-col overflow-hidden bg-gradient-to-br from-white via-blue-50 to-blue-100 lg:hidden dark:from-[#05060a] dark:via-[#07102a] dark:to-[#0b1f5c]"
        >
          {/* backdrop texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(37,99,235,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.8)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom_left,#000,transparent_75%)] dark:[background-image:linear-gradient(rgba(147,197,253,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.9)_1px,transparent_1px)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/25 blur-3xl"
          />

          {/* top bar */}
          <div className="relative flex items-center justify-between px-6 py-5">
            <span className="flex items-center gap-2.5">
              <Image src="/logo-white.png" alt="" width={1123} height={749} className="hidden h-7 w-auto dark:block" />
              <Image src="/logo.png" alt="" width={1123} height={749} className="h-7 w-auto mix-blend-multiply invert dark:hidden" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Menu</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-800 transition-all hover:rotate-90 hover:border-blue-600 hover:text-blue-700 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          {/* links */}
          <div className="relative flex flex-1 flex-col justify-center overflow-y-auto px-6">
            {navLinks.map((link, i) => {
              const on = i === selectedIndex;
              return (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => {
                    setSelectedIndex(i);
                    setOpen(false);
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.06 }}
                  className="group flex items-baseline gap-4 py-2.5"
                >
                  <span
                    className={`w-6 font-mono text-[11px] tabular-nums ${
                      on ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-600"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[clamp(1.6rem,7.5vw,2.4rem)] font-black uppercase leading-[1.1] tracking-tight transition-all duration-300 group-hover:translate-x-2 ${
                      on
                        ? "bg-gradient-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent dark:from-blue-300 dark:to-cyan-300"
                        : "text-transparent [-webkit-text-stroke:1.5px_rgba(51,65,85,0.7)] group-hover:text-slate-900 group-hover:[-webkit-text-stroke:1.5px_transparent] dark:[-webkit-text-stroke:1.5px_rgba(203,213,225,0.55)] dark:group-hover:text-white"
                    }`}
                  >
                    {link}
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* contact + actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative space-y-5 px-6 pb-8 pt-4"
          >
            <div className="space-y-1 font-mono text-xs text-slate-500 dark:text-slate-400">
              <a href={`mailto:${SITE.email}`} className="block transition-colors hover:text-blue-700 dark:hover:text-blue-300">
                {SITE.email}
              </a>
              <p>{SITE.location}</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white"
                style={{
                  clipPath: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)",
                  background: "linear-gradient(135deg, #0a1747 0%, #1d4ed8 100%)",
                }}
              >
                Start a project <span aria-hidden>→</span>
              </a>
              <ThemeToggle />
            </div>
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );

  return (
    <>
    <header className="sticky top-0 z-50 overflow-hidden border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#05060a]/90">
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <div className="flex items-center justify-between gap-4 pr-6 md:pr-10">
          <a
            href="#"
            className="relative z-10 flex shrink-0 items-center gap-2 py-3 pl-6 pr-6 md:pl-10 md:pr-9"
            aria-label="Digital Innovation home"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 right-0 -z-10 w-screen"
              style={{
                background: "linear-gradient(115deg, #060a17 0%, #1d4ed8 100%)",
                clipPath: "polygon(0 0, 100% 0, calc(100% - 32px) 100%, 0 100%)",
              }}
            />
            <span
              aria-hidden
              className="absolute inset-y-0 -z-10 w-10"
              style={{
                right: "-18px",
                background: "#10214f",
                clipPath: "polygon(80% 0, 100% 0, 20% 100%, 0% 100%)",
              }}
            />
            <Image
              src="/logo-white.png"
              alt=""
              width={1123}
              height={749}
              className="h-8 w-auto object-contain md:h-9"
              priority
            />
            <span className="font-display text-sm font-black uppercase tracking-wide text-white">
              Digital Innovation
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 font-mono text-sm lg:flex"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navLinks.map((link, i) => {
              const isActive = activeIndex === i;
              return (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onClick={() => setSelectedIndex(i)}
                  className={`relative px-5 py-2 uppercase tracking-wide transition-colors ${
                    isActive
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2 border-blue-500 transition-all duration-200 dark:border-blue-400 ${
                      isActive
                        ? "translate-x-0 translate-y-0 opacity-100"
                        : "-translate-x-1 -translate-y-1 opacity-0"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r-2 border-t-2 border-blue-500 transition-all duration-200 dark:border-blue-400 ${
                      isActive
                        ? "translate-x-0 translate-y-0 opacity-100"
                        : "translate-x-1 -translate-y-1 opacity-0"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-blue-500 transition-all duration-200 dark:border-blue-400 ${
                      isActive
                        ? "translate-x-0 translate-y-0 opacity-100"
                        : "-translate-x-1 translate-y-1 opacity-0"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2 border-blue-500 transition-all duration-200 dark:border-blue-400 ${
                      isActive
                        ? "translate-x-0 translate-y-0 opacity-100"
                        : "translate-x-1 translate-y-1 opacity-0"
                    }`}
                  />
                  {link}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group relative hidden items-center gap-2 overflow-hidden py-2.5 pl-5 pr-4 text-sm font-semibold text-white shadow-md shadow-blue-950/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/40 lg:flex"
              style={{
                clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%)",
                background: "linear-gradient(135deg, #0a1747 0%, #1d4ed8 100%)",
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" }}
              />
              Start a project
            </a>

            <ThemeToggle />

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 lg:hidden dark:border-white/15"
            >
              <motion.span
                className="h-px w-4 bg-slate-900 dark:bg-white"
                animate={open ? { rotate: 45, y: 2.5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="h-px w-4 bg-slate-900 dark:bg-white"
                animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </div>

      </div>
    </header>
    {mounted && createPortal(drawer, document.body)}
    </>
  );
}
