"use client";

import CodeRainButton from "./CodeRainButton";
import { SITE } from "./site-config";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.19C22 6.58 17.52 2 12 2Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <path d="M6.94 6.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88ZM5.1 8.75h3.68V21H5.1V8.75Zm6.4 0h3.53v1.68h.05c.49-.93 1.7-1.92 3.5-1.92 3.74 0 4.43 2.46 4.43 5.66V21h-3.68v-6.06c0-1.45-.03-3.3-2.02-3.3-2.02 0-2.33 1.58-2.33 3.2V21h-3.68V8.75Z" />
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <path d="M18.9 3H21l-6.6 7.54L22.2 21h-6.1l-4.77-6.23L5.87 21H3.75l7.06-8.07L2.9 3h6.25l4.31 5.7L18.9 3Zm-1.07 16.17h1.17L7.28 4.75H6.02l11.81 14.42Z" />
    ),
  },
  {
    label: "Dribbble",
    href: "#",
    icon: (
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.6 4.62a8.34 8.34 0 0 1 1.9 5.15c-.28-.06-3.05-.62-5.85-.27-.06-.15-.12-.3-.19-.46a20 20 0 0 0-.58-1.28c3.1-1.27 4.5-3.08 4.72-3.14Zm-1.1-1.13c-.2.28-1.47 1.96-4.46 3.1a45 45 0 0 0-3.52-5.24 8.4 8.4 0 0 1 7.98 2.14ZM8.87 3.8a41.4 41.4 0 0 1 3.5 5.2c-4.4 1.17-8.29 1.15-8.71 1.15a8.4 8.4 0 0 1 5.21-6.35ZM3.4 12.02v-.22c.4.01 4.95.07 9.63-1.33.27.53.52 1.06.75 1.6-.13.04-.26.07-.38.11-4.83 1.56-7.4 5.85-7.62 6.22A8.35 8.35 0 0 1 3.4 12.02Zm3.88 6.6c.18-.31 2.2-4.15 6.53-5.61.02 0 .03-.01.05-.02a35 35 0 0 1 1.75 6.4 8.35 8.35 0 0 1-8.33-.77Zm9.98-.02a37 37 0 0 0-1.6-5.98c1.9-.3 3.56.19 3.75.25a8.4 8.4 0 0 1-2.15 5.73Z" />
    ),
  },
];

function FooterLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 620"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16] dark:opacity-[0.14]"
    >
      <path
        d="M-40 460 C 260 400, 420 520, 740 440 S 1180 360, 1500 420"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <path
        d="M-40 140 C 220 210, 520 70, 820 160 S 1260 250, 1500 170"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
      />
      <path d="M180 -20 L 180 640" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
      <path d="M1260 -20 L 1260 640" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
      <circle cx="180" cy="140" r="3" fill="#60a5fa" />
      <circle cx="740" cy="440" r="3" fill="#60a5fa" />
      <circle cx="1000" cy="200" r="3" fill="#60a5fa" />
      <circle cx="420" cy="470" r="2.5" fill="#60a5fa" />
      <circle cx="1260" cy="380" r="3" fill="#60a5fa" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-50 text-slate-600 shadow-[0_-24px_60px_-24px_rgba(15,23,42,0.18)] ring-1 ring-slate-200 dark:bg-[#0a0e18] dark:text-slate-300 dark:shadow-[0_-24px_60px_-24px_rgba(0,0,0,0.65)] dark:ring-white/10">
      <FooterLines />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pt-16 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8 md:px-10 md:pt-20">
        <CodeRainButton />
        <div className="flex flex-col gap-4 md:pr-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Menu
            </p>
            <span className="h-0.5 w-6 rounded-full bg-blue-500 dark:bg-blue-400" />
          </div>
          <ul className="flex flex-col gap-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 font-medium text-slate-700 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  {link.label}
                  <span className="-translate-x-1 text-blue-500 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-blue-400">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4 border-slate-200 dark:border-white/10 md:items-center md:border-l md:px-8">
          <div className="flex flex-col items-start gap-2 md:items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Follow us
            </p>
            <span className="h-0.5 w-6 rounded-full bg-blue-500 dark:bg-blue-400" />
          </div>
          <div className="flex flex-col gap-2 text-sm font-medium">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 text-slate-700 transition-colors hover:text-slate-900 md:justify-center dark:text-slate-300 dark:hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 6 10-6" />
              </svg>
              {SITE.email}
            </a>
            {SITE.phone && (
            <a
              href={`tel:${SITE.phone.replace(/s+/g, "")}`}
              className="flex items-center gap-2 text-slate-700 transition-colors hover:text-slate-900 md:justify-center dark:text-slate-300 dark:hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              {SITE.phone}
            </a>
            )}
          </div>
          <div className="mt-1 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 border-slate-200 dark:border-white/10 md:items-end md:border-l md:pl-8">
          <div className="flex flex-col items-start gap-2 md:items-end">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              Address
            </p>
            <span className="h-0.5 w-6 rounded-full bg-blue-500 dark:bg-blue-400" />
          </div>
          <div className="flex items-start gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0 opacity-60"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="max-w-[220px] text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300 md:text-right">
              {SITE.addressLines[0]}
              <br />
              {SITE.addressLines[1]}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 flex w-full max-w-7xl flex-col gap-3 border-t border-slate-200 px-6 py-6 text-xs text-slate-400 dark:border-white/10 dark:text-slate-500 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} Digital Innovation. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
            Terms &amp; Conditions
          </a>
          <a href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
            Privacy Policy
          </a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 flex w-full items-center overflow-hidden px-4 pb-2 sm:px-6"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute left-[6%] top-1/2 -z-10 h-[70%] w-[26%] -translate-y-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)",
          }}
        />
        <span
          aria-hidden
          className="shrink-0"
          style={{
            width: "clamp(1.2rem, 4vw, 3.2rem)",
            height: "clamp(1.5rem, 5.6vw, 4.6rem)",
            borderTopRightRadius: "100%",
            background:
              "linear-gradient(160deg, var(--footer-wordmark-start) 0%, var(--footer-wordmark-end) 100%)",
          }}
        />
        <svg
          viewBox="0 0 1000 110"
          preserveAspectRatio="none"
          className="h-[clamp(2.6rem,9.3vw,7.4rem)] w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="footer-wordmark-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--footer-wordmark-start)" }} />
              <stop offset="75%" style={{ stopColor: "var(--footer-wordmark-start)" }} />
              <stop offset="100%" style={{ stopColor: "var(--footer-wordmark-end)" }} />
            </linearGradient>
          </defs>
          <text
            x="0"
            y="92"
            textLength="1000"
            lengthAdjust="spacingAndGlyphs"
            className="font-display"
            style={{
              fontSize: "100px",
              fontWeight: 900,
              fill: "url(#footer-wordmark-fill)",
              textTransform: "uppercase",
            }}
          >
            Digital Innovation
          </text>
        </svg>
      </motion.div>
    </footer>
  );
}
