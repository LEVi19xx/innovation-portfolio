"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Back-to-top button that launches a rocket: it lifts off the footer, trailing smoke and
 *  sparks, while the page scrolls to the top in step with it. */

const DURATION = 2300; // ms from ignition to the rocket leaving the screen

const easeInCubic = (t: number) => t * t * t;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type Particle = {
  kind: "smoke" | "spark";
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  hue: number;
};

function Flight({ origin, onDone }: { origin: { x: number; y: number }; onDone: () => void }) {
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

    const startScroll = window.scrollY;
    const endY = -90;
    const particles: Particle[] = [];
    let raf = 0;
    let t0 = 0;
    let last = 0;
    let userScrolled = false;

    // let the visitor take over the scroll at any time
    const cancelScroll = () => {
      userScrolled = true;
    };
    window.addEventListener("wheel", cancelScroll, { passive: true });
    window.addEventListener("touchmove", cancelScroll, { passive: true });
    window.addEventListener("keydown", cancelScroll);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const emit = (kind: Particle["kind"], x: number, y: number, vx: number, vy: number) => {
      particles.push({
        kind,
        x,
        y,
        vx,
        vy,
        age: 0,
        life: kind === "smoke" ? rand(0.9, 1.6) : rand(0.3, 0.7),
        size: kind === "smoke" ? rand(7, 15) : rand(1, 2.4),
        hue: kind === "spark" ? rand(25, 55) : 0,
      });
    };

    const drawRocket = (x: number, y: number, t: number, flicker: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1.15, 1.15);

      // flame
      const fl = 22 + t * 26 + flicker * 12;
      const flame = ctx.createLinearGradient(0, 20, 0, 20 + fl);
      flame.addColorStop(0, "rgba(255,255,255,0.95)");
      flame.addColorStop(0.25, "rgba(253,224,71,0.95)");
      flame.addColorStop(0.7, "rgba(249,115,22,0.8)");
      flame.addColorStop(1, "rgba(239,68,68,0)");
      ctx.fillStyle = flame;
      ctx.beginPath();
      ctx.moveTo(-6, 20);
      ctx.quadraticCurveTo(0, 20 + fl * 1.15, 6, 20);
      ctx.closePath();
      ctx.fill();

      // fins
      ctx.fillStyle = "#1d4ed8";
      ctx.beginPath();
      ctx.moveTo(-11, 4);
      ctx.lineTo(-22, 22);
      ctx.lineTo(-11, 18);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(11, 4);
      ctx.lineTo(22, 22);
      ctx.lineTo(11, 18);
      ctx.closePath();
      ctx.fill();

      // body
      const body = ctx.createLinearGradient(-12, 0, 12, 0);
      body.addColorStop(0, "#cbd5e1");
      body.addColorStop(0.5, "#ffffff");
      body.addColorStop(1, "#94a3b8");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.quadraticCurveTo(15, -12, 12, 18);
      ctx.lineTo(-12, 18);
      ctx.quadraticCurveTo(-15, -12, 0, -32);
      ctx.closePath();
      ctx.fill();

      // nose cone
      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.moveTo(0, -32);
      ctx.quadraticCurveTo(7, -22, 8.5, -15);
      ctx.lineTo(-8.5, -15);
      ctx.quadraticCurveTo(-7, -22, 0, -32);
      ctx.closePath();
      ctx.fill();

      // window
      ctx.fillStyle = "#1e3a8a";
      ctx.strokeStyle = "#bfdbfe";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, -3, 5.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.beginPath();
      ctx.arc(-1.6, -4.6, 1.4, 0, Math.PI * 2);
      ctx.fill();

      // nozzle
      ctx.fillStyle = "#334155";
      ctx.fillRect(-6, 18, 12, 4);
      ctx.restore();
    };

    const frame = (now: number) => {
      if (!t0) {
        t0 = now;
        last = now;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = Math.min((now - t0) / DURATION, 1);

      // rocket accelerates; the page scrolls up with it
      const k = easeInCubic(t);
      const rumble = (1 - t) * Math.sin(now / 18) * 1.6;
      const rx = origin.x + rumble;
      const ry = origin.y + (endY - origin.y) * k;
      if (!userScrolled) window.scrollTo(0, startScroll * (1 - easeInOutCubic(t)));

      // exhaust: smoke + sparks from the nozzle, plus a ground burst at ignition
      if (t < 1) {
        const tail = ry + 26;
        const smokeN = 1 + Math.round(5 * (0.3 + t));
        for (let i = 0; i < smokeN; i++) emit("smoke", rx + rand(-5, 5), tail, rand(-30, 30), rand(30, 90));
        for (let i = 0; i < 3; i++) emit("spark", rx + rand(-4, 4), tail, rand(-70, 70), rand(120, 280));
        if (t < 0.28) {
          for (let i = 0; i < 4; i++) {
            const dir = Math.random() < 0.5 ? -1 : 1;
            emit("smoke", origin.x + rand(-6, 6), origin.y + 18, dir * rand(60, 170), rand(-20, 10));
          }
        }
      }

      ctx.clearRect(0, 0, W, H);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        if (p.age >= p.life) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const a = 1 - p.age / p.life;
        if (p.kind === "smoke") {
          p.vx *= 0.985;
          const r = p.size * (1 + p.age * 2.2);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
          g.addColorStop(0, `rgba(203,213,225,${0.5 * a})`);
          g.addColorStop(1, "rgba(148,163,184,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalCompositeOperation = "lighter";
          ctx.strokeStyle = `hsla(${p.hue},100%,62%,${a})`;
          ctx.lineWidth = p.size;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 0.04, p.y - p.vy * 0.04);
          ctx.stroke();
          ctx.globalCompositeOperation = "source-over";
        }
      }

      if (ry > endY) drawRocket(rx, ry, t, Math.random());

      if (t < 1 || particles.length > 0) {
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

export default function RocketButton() {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (origin) return; // already flying
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
        title="Launch to top"
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
      {origin &&
        createPortal(<Flight origin={origin} onDone={() => setOrigin(null)} />, document.body)}
    </>
  );
}
