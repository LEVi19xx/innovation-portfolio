"use client";

import { motion } from "framer-motion";

const timeframes = ["1W", "1M", "3M", "6M", "1Y"];

export default function StatCard() {
  return (
    <motion.div
      className="flex w-[260px] min-h-[440px] flex-col rounded-3xl bg-slate-900 p-5 text-white shadow-xl md:w-[280px]"
      initial={{ opacity: 0, y: 30, rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between text-slate-400">
        <span aria-hidden className="text-lg">‹</span>
        <div className="flex items-center gap-3">
          <span aria-hidden>🔔</span>
          <span aria-hidden>☆</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Active Sprint</p>
          <p className="text-xs text-slate-400">Innovation Team</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          IT
        </div>
      </div>

      <div className="mt-5 flex gap-4 text-xs text-slate-400">
        <span className="border-b-2 border-blue-500 pb-1 text-white">Summary</span>
        <span>Roadmap</span>
        <span>Notes</span>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">94%</span>
          <span className="text-sm font-medium text-blue-400">▲ 6%</span>
        </div>
        <p className="text-xs text-slate-400">On-time delivery · This quarter</p>
      </div>

      <svg viewBox="0 0 220 70" className="mt-4 w-full">
        <polyline
          points="0,50 25,45 50,55 75,30 100,38 125,20 150,28 175,10 200,18 220,8"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
        {timeframes.map((tf, i) => (
          <span
            key={tf}
            className={
              i === 1
                ? "rounded-full bg-slate-700 px-2 py-1 text-white"
                : "px-2 py-1"
            }
          >
            {tf}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-6 text-xs text-slate-400">
        <div className="border-t border-slate-800 pt-4">
          Team rating <span className="text-white">4.9</span> · 12 reviews
        </div>
      </div>
    </motion.div>
  );
}
