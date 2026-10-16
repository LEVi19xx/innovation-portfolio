"use client";

import { useEffect } from "react";
import { useDayPart, type DayPart } from "./useDayPart";

// A very light wash of colour over the whole site that follows the visitor's local time.
// It sits under the navbar and modals and never intercepts the pointer.
const WASH: Record<DayPart, string> = {
  morning:
    "radial-gradient(70% 55% at 85% 0%, rgba(251,191,36,0.16), transparent 70%), radial-gradient(60% 50% at 0% 100%, rgba(125,211,252,0.10), transparent 70%)",
  afternoon:
    "radial-gradient(80% 60% at 50% 0%, rgba(56,189,248,0.10), transparent 70%)",
  evening:
    "linear-gradient(to bottom, rgba(251,146,60,0.13), rgba(168,85,247,0.10) 60%, rgba(30,64,175,0.08))",
  night:
    "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(15,23,80,0.34) 100%)",
};

export default function TimeAmbience() {
  const part = useDayPart();

  // expose it to CSS too, e.g. [data-daypart="night"] { ... }
  useEffect(() => {
    if (!part) return;
    document.documentElement.dataset.daypart = part;
  }, [part]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40] transition-opacity duration-[2500ms]"
      style={{ background: part ? WASH[part] : undefined, opacity: part ? 1 : 0 }}
    />
  );
}
