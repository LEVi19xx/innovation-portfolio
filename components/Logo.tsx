"use client";

import Image from "next/image";
import { useTheme } from "./theme-store";

export default function Logo({ className }: { className?: string }) {
  const theme = useTheme();
  const isDark = theme === "dark";

  return (
    <span className={`relative inline-block shrink-0 ${className ?? ""}`}>
      <Image
        src={isDark ? "/logo-white.png" : "/logo.png"}
        alt=""
        fill
        className={`object-contain ${isDark ? "p-[15%]" : ""}`}
        priority
      />
    </span>
  );
}
