"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50+", label: "Products shipped" },
  { value: "12", label: "People on the team" },
  { value: "4.9/5", label: "Average client rating" },
  { value: "6", label: "Years building software" },
];

export default function Stats() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none ${
              i === 0 ? "md:translate-y-4" : i === 2 ? "md:-translate-y-4" : ""
            }`}
          >
            <p className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl dark:text-white">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
