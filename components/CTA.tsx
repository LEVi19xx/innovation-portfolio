"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Eyebrow from "./Eyebrow";
import FocusTitle from "./FocusTitle";
import RequestForm from "./RequestForm";
import { SITE } from "./site-config";


export default function CTA() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="contact"
      className="relative isolate w-full overflow-hidden border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#060a16]"
    >
      {/* backdrop: signal rings radiating from the bottom-right, over a dot matrix */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:repeating-radial-gradient(circle_at_100%_100%,transparent_0,transparent_78px,rgba(37,99,235,0.16)_78px,rgba(37,99,235,0.16)_79px)] [mask-image:radial-gradient(90%_110%_at_100%_100%,#000,transparent_75%)] dark:[background:repeating-radial-gradient(circle_at_100%_100%,transparent_0,transparent_78px,rgba(96,165,250,0.2)_78px,rgba(96,165,250,0.2)_79px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(rgba(37,99,235,0.28)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom_right,#000,transparent_65%)] dark:opacity-50 dark:[background-image:radial-gradient(rgba(147,197,253,0.35)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-24 -z-10 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/25"
      />
      <div className="mx-auto w-full max-w-7xl px-6 pt-28 md:px-10 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative isolate overflow-hidden border border-b-0 border-blue-200 bg-gradient-to-br from-white via-blue-50 to-slate-100 px-6 py-14 md:px-14 md:py-20 dark:border-blue-400/20 dark:from-[#0f1d4d] dark:via-[#090f26] dark:to-[#05060a]"
        >
          {/* backdrop */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(50%_70%_at_15%_10%,rgba(59,130,246,0.18),transparent_70%),radial-gradient(40%_60%_at_95%_100%,rgba(34,211,238,0.12),transparent_70%)] dark:[background:radial-gradient(50%_70%_at_15%_10%,rgba(59,130,246,0.28),transparent_70%),radial-gradient(40%_60%_at_95%_100%,rgba(34,211,238,0.14),transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(37,99,235,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.8)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom_left,#000,transparent_70%)] dark:[background-image:linear-gradient(rgba(147,197,253,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.9)_1px,transparent_1px)]"
          />
          {/* watermark */}
          <div aria-hidden className="pointer-events-none absolute -bottom-10 -right-16 -z-10 hidden w-[26rem] lg:block">
            <Image
              src="/logo-white.png"
              alt=""
              width={1123}
              height={749}
              className="hidden h-auto w-full opacity-[0.08] dark:block"
            />
            <Image
              src="/logo.png"
              alt=""
              width={1123}
              height={749}
              className="h-auto w-full opacity-[0.1] mix-blend-multiply invert dark:hidden"
            />
          </div>

          <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div className="min-w-0">
              <div className="mb-6">
                <Eyebrow>Let&apos;s talk</Eyebrow>
              </div>
              <FocusTitle lines={["Got a project", "in mind?"]} />
              <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
                Got a process that&apos;s slow, manual, or scattered across spreadsheets? Tell the Innovation team about it —{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  we&apos;ll help turn it into a working system.
                </span>
              </p>
            </div>

            <div className="flex flex-col items-start gap-8">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  className="group relative flex items-center gap-3 overflow-hidden py-3.5 pl-7 pr-6 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-blue-950/30 transition-all hover:-translate-y-0.5 hover:shadow-blue-600/40"
                  style={{
                    clipPath: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)",
                    background: "linear-gradient(135deg, #0a1747 0%, #1d4ed8 100%)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" }}
                  />
                  Start a project
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </button>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-slate-900 dark:text-white"
                >
                  View our work
                  <span className="h-px w-6 bg-blue-600 transition-all duration-300 group-hover:w-10 dark:bg-blue-300" />
                </a>
              </div>

              <dl className="w-full space-y-4 border-t border-slate-200 pt-6 dark:border-white/10">
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                    Team
                  </dt>
                  <dd className="text-right text-sm text-slate-700 dark:text-slate-300">
                    {SITE.name} · {SITE.org}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                    Email
                  </dt>
                  <dd className="text-right text-sm text-slate-700 dark:text-slate-300">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="transition-colors hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>
                {SITE.phone && (
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                      Phone
                    </dt>
                    <dd className="text-right text-sm text-slate-700 dark:text-slate-300">
                      <a
                        href={`tel:${SITE.phone.replace(/s+/g, "")}`}
                        className="transition-colors hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        {SITE.phone}
                      </a>
                    </dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                    Where
                  </dt>
                  <dd className="text-right text-sm text-slate-700 dark:text-slate-300">
                    {SITE.location}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                ref={formRef}
                key="request-form"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  if (open) formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="overflow-hidden"
              >
                <div className="mt-12 border-t border-slate-200 pt-10 dark:border-white/10">
                  <div className="mb-8">
                    <Eyebrow>Request a project</Eyebrow>
                  </div>
                  <RequestForm onClose={() => setOpen(false)} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
