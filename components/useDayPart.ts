"use client";

import { useEffect, useState } from "react";

export type DayPart = "morning" | "afternoon" | "evening" | "night";

export const partOf = (hour: number): DayPart => {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
};

export const GREETING: Record<DayPart, string> = {
  morning: "Good morning from Telex",
  afternoon: "Good afternoon from Telex",
  evening: "Good evening from Telex",
  night: "Still up? Greetings from Telex",
};

/** The visitor's local part of day. `null` until mounted, so the server render stays neutral. */
export function useDayPart(): DayPart | null {
  const [part, setPart] = useState<DayPart | null>(null);

  useEffect(() => {
    const update = () => setPart(partOf(new Date().getHours()));
    update();
    const id = window.setInterval(update, 10 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  return part;
}
