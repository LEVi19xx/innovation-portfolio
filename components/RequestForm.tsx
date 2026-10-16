"use client";

import { useState } from "react";
import { SITE } from "./site-config";

/**
 * Project request styled as a terminal session. There is no server behind the site, so
 * running `send` opens the visitor's email app with the request already written out,
 * addressed to the team.
 */

const TYPES = ["new system or app", "automate a manual process", "dashboard or report", "improve an existing tool", "not sure yet"];
const URGENCY = ["low", "normal", "urgent"];

type Values = { name: string; department: string; type: string; details: string; urgency: string; email: string };

const prompt = "select-none text-cyan-400";
const dim = "text-slate-500";
const inputCls =
  "min-w-0 flex-1 basis-full border-0 bg-transparent p-0 font-mono text-sm text-cyan-100 caret-cyan-300 outline-none placeholder:text-slate-600 sm:basis-0 md:text-base";

function Line({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span className={prompt}>?</span>
        <span className="text-slate-200">{label}</span>
        {hint && <span className={dim}>{hint}</span>}
        <span className={dim}>›</span>
        {children}
      </span>
    </label>
  );
}

export default function RequestForm({ onClose }: { onClose: () => void }) {
  const [v, setV] = useState<Values>({ name: "", department: "", type: TYPES[0], details: "", urgency: "normal", email: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const set = (k: keyof Values) => (val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors([]);
  };

  const send = () => {
    const errs: string[] = [];
    if (!v.name.trim()) errs.push("name is required");
    if (!v.department.trim()) errs.push("department is required");
    if (v.details.trim().length < 10) errs.push("describe the problem (at least a sentence)");
    setErrors(errs);
    if (errs.length) return;

    const subject = `Project request: ${v.type} (${v.department.trim()})`;
    const lines: (string | false)[] = [
      `Name: ${v.name.trim()}`,
      `Department: ${v.department.trim()}`,
      !!v.email.trim() && `Email: ${v.email.trim()}`,
      `Need: ${v.type}`,
      `Urgency: ${v.urgency}`,
      "",
      "What are we trying to solve?",
      v.details.trim(),
    ];
    const body = lines.filter((l): l is string => l !== false).join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="overflow-hidden border border-slate-300 bg-[#050816] shadow-[0_30px_80px_-30px_rgba(37,99,235,0.55)] dark:border-white/15">
      {/* window chrome */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
        <span className="ml-3 truncate font-mono text-[11px] tracking-wide text-slate-400">
          innovation@telex — request
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ml-auto font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-cyan-300"
        >
          esc ✕
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        noValidate
        className="space-y-3 px-5 py-6 font-mono text-sm leading-relaxed md:px-8 md:text-base"
      >
        <p>
          <span className="text-emerald-400">innovation@telex</span>
          <span className={dim}>:</span>
          <span className="text-blue-400">~</span>
          <span className={dim}>$ </span>
          <span className="text-slate-200">request --new</span>
        </p>
        <p className={dim}>Tell us what you need. We&apos;ll take it from here.</p>

        <Line label="Your name">
          <input value={v.name} onChange={(e) => set("name")(e.target.value)} autoComplete="name" placeholder="Juan Dela Cruz" className={inputCls} />
        </Line>
        <Line label="Department">
          <input value={v.department} onChange={(e) => set("department")(e.target.value)} placeholder="HR, Operations, Finance…" className={inputCls} />
        </Line>

        <div>
          <p>
            <span className={prompt}>?</span> <span className="text-slate-200">What do you need?</span>{" "}
            <span className={dim}>(pick one)</span>
          </p>
          <ul className="mt-1 space-y-0.5 pl-4" role="radiogroup" aria-label="What do you need">
            {TYPES.map((t) => {
              const on = v.type === t;
              return (
                <li key={t}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => set("type")(t)}
                    className={`group flex items-baseline gap-2 text-left transition-colors ${
                      on ? "text-cyan-300" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <span>{on ? "❯" : " "}</span>
                    <span className="whitespace-pre">[{on ? "x" : " "}]</span>
                    <span>{t}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <label htmlFor="req-details">
            <span className={prompt}>?</span> <span className="text-slate-200">What are you trying to solve?</span>{" "}
            <span className={dim}>›</span>
          </label>
          <textarea
            id="req-details"
            value={v.details}
            onChange={(e) => set("details")(e.target.value)}
            rows={3}
            placeholder="What is slow, manual, or hard to track today?"
            className={`${inputCls} mt-1 block w-full resize-none border-l-2 border-cyan-400/40 pl-4 focus:border-cyan-300`}
          />
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2" role="radiogroup" aria-label="Urgency">
          <span className={prompt}>?</span>
          <span className="text-slate-200">Urgency</span>
          <span className={dim}>›</span>
          {URGENCY.map((u, i) => (
            <span key={u} className="flex items-baseline gap-2">
              <button
                type="button"
                role="radio"
                aria-checked={v.urgency === u}
                onClick={() => set("urgency")(u)}
                className={`transition-colors ${v.urgency === u ? "text-cyan-300 underline underline-offset-4" : "text-slate-500 hover:text-slate-300"}`}
              >
                {u}
              </button>
              {i < URGENCY.length - 1 && <span className={dim}>|</span>}
            </span>
          ))}
        </div>

        <Line label="Email" hint="(optional)">
          <input value={v.email} onChange={(e) => set("email")(e.target.value)} type="email" autoComplete="email" placeholder="name@telexph.com" className={inputCls} />
        </Line>

        {errors.length > 0 && (
          <div role="alert" className="pt-1 text-red-400">
            {errors.map((e) => (
              <p key={e}>
                ✖ error: {e}
              </p>
            ))}
          </div>
        )}

        {sent ? (
          <div className="space-y-1 pt-2">
            <p className="text-emerald-400">✔ draft opened in your email app</p>
            <p className="text-slate-300">
              Press send there and we&apos;ll get back to you. Nothing opened? Email{" "}
              <a href={`mailto:${SITE.email}`} className="text-cyan-300 underline underline-offset-4">
                {SITE.email}
              </a>
              .
            </p>
            <p className="pt-1">
              <button type="button" onClick={() => setSent(false)} className="text-slate-500 transition-colors hover:text-cyan-300">
                ← edit request
              </button>
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3">
            <button
              type="submit"
              className="group flex items-center gap-2 text-emerald-400 transition-colors hover:text-emerald-300"
            >
              <span className={dim}>$</span>
              <span className="underline-offset-4 group-hover:underline">./send_request</span>
              <span aria-hidden className="inline-block h-4 w-2 animate-pulse bg-emerald-400" />
            </button>
            <button type="button" onClick={onClose} className="text-slate-600 transition-colors hover:text-slate-300">
              cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
