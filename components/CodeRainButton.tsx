"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Back-to-top button with a "code rain" launch: streaks of 0s, 1s and code symbols race
 *  UP the screen, spreading outward from the button, while the page scrolls to the top. */

const DURATION = 3000; // ms for the page scroll
const CELL = 24; // px, glyph cell
const GLYPHS = "01010101010101{}<>/;=()[]+*#$".split("");

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const glyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

type Streak = {
  col: number;
  start: number; // ms after ignition
  speed: number; // px/s
  len: number; // glyphs in the trail
};

function Rain({ origin, onDone }: { origin: { x: number; y: number }; onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      onDone();
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    ctx.font = `800 ${CELL - 4}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const dark = document.documentElement.getAttribute("data-theme") !== "light";
    const headColor = dark ? "#e2e8f0" : "#334155";
    const trail = dark ? "148,163,184" : "71,85,105"; // muted slate, not saturated blue

    const cols = Math.ceil(W / CELL);
    const rows = Math.ceil(H / CELL) + 2;
    // each cell keeps its glyph and occasionally flickers to another
    const grid: string[][] = Array.from({ length: cols }, () => Array.from({ length: rows }, glyph));

    // streaks start at the button's column and fan outward; two per column
    const originCol = origin.x / CELL;
    const streaks: Streak[] = [];
    for (let c = 0; c < cols; c++) {
      const d = Math.abs(c - originCol) / cols; // 0 at the button, ~1 at the far edge
      const base = d * 1000;
      streaks.push({ col: c, start: base + rand(0, 160), speed: rand(800, 1300), len: (rand(12, 26)) | 0 });
      if (Math.random() < 0.8) {
        streaks.push({ col: c, start: base + rand(900, 1400), speed: rand(800, 1300), len: (rand(10, 20)) | 0 });
      }
    }

    const startScroll = window.scrollY;
    let userScrolled = false;
    const cancelScroll = () => {
      userScrolled = true;
    };
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchmove", cancelScroll, { passive: true });
    window.addEventListener("keydown", cancelScroll);

    let raf = 0;
    let t0 = 0;

    const frame = (now: number) => {
      if (!t0) t0 = now;
      const el = now - t0;
      const t = Math.min(el / DURATION, 1);
      if (!userScrolled) window.scrollTo(0, startScroll * (1 - easeInOutCubic(t)));

      ctx.clearRect(0, 0, W, H);

      // shockwave ring from the button
      if (el < 800) {
        const k = el / 800;
        ctx.strokeStyle = `rgba(${trail},${0.7 * (1 - k)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(origin.x, origin.y, 10 + k * 90, 0, Math.PI * 2);
        ctx.stroke();
      }

      let alive = false;
      for (const s of streaks) {
        const age = (el - s.start) / 1000;
        if (age < 0) {
          alive = true;
          continue;
        }
        const headY = H + CELL - age * s.speed;
        if (headY + s.len * CELL < 0) continue; // fully off the top
        alive = true;
        const x = s.col * CELL + CELL / 2;
        for (let k = 0; k < s.len; k++) {
          const y = headY + k * CELL;
          if (y < -CELL || y > H + CELL) continue;
          const row = Math.max(0, Math.min(rows - 1, Math.round(y / CELL)));
          if (Math.random() < 0.06) grid[s.col][row] = glyph();
          const a = 1 - k / s.len;
          if (k === 0) {
            ctx.fillStyle = headColor;
            ctx.shadowBlur = 0;
          } else {
            // fade slowly and never below 0.18, so the whole trail stays readable
            ctx.fillStyle = `rgba(${trail},${0.15 + 0.6 * Math.pow(a, 0.7)})`;
            ctx.shadowBlur = 0;
          }
          ctx.fillText(grid[s.col][row], x, y);
        }
        ctx.shadowBlur = 0;
      }

      if (alive || t < 1) {
        raf = requestAnimationFrame(frame);
      } else {
        window.scrollTo(0, 0);
        onDone();
      }
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchmove", cancelScroll);
      window.removeEventListener("keydown", cancelScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-[120] h-full w-full" />;
}

export default function CodeRainButton() {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (origin) return; // already running
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label="Back to top"
        title="Back to top"
        className="group absolute right-6 top-4 z-20 flex h-11 w-11 items-center justify-center overflow-hidden text-white shadow-lg shadow-blue-950/40 transition-all hover:-translate-y-1 hover:shadow-blue-600/50 md:right-10"
        style={{
          // inline: globals.css forces position:relative on non-header buttons, which beats the
          // absolute utility and drops this button into the grid
          position: "absolute",
          clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)",
          background: "linear-gradient(135deg, #0a1747 0%, #1d4ed8 100%)",
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)" }}
        />
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
      {origin && createPortal(<Rain origin={origin} onDone={() => setOrigin(null)} />, document.body)}
    </>
  );
}
