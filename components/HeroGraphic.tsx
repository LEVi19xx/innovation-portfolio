"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const nodes = [
  { x: 160, y: 110, ring: true },
  { x: 860, y: 70, ring: false },
  { x: 70, y: 420, ring: false },
  { x: 930, y: 230, ring: true },
  { x: 260, y: 540, ring: false },
  { x: 800, y: 500, ring: true },
];

const core = { x: 520, y: 320 };
const rings = [56, 90, 128];

function linkPath(x: number, y: number) {
  const midX = (x + core.x) / 2;
  const midY = (y + core.y) / 2;
  return `M${x} ${y} Q ${midX} ${y} ${midX} ${midY} T ${core.x} ${core.y}`;
}

// The core sits at (520, 320), a little off the viewBox centre (500, 310). On wide screens that
// reads as intentional, but on a narrow, tall hero it makes the glowing circle look off-centre
// against the centred text, so below lg the view is shifted to put the core dead centre.
const subscribeLg = (cb: () => void) => {
  const mq = window.matchMedia("(min-width: 1024px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function HeroGraphic() {
  const wide = useSyncExternalStore(
    subscribeLg,
    () => window.matchMedia("(min-width: 1024px)").matches,
    () => true,
  );
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 20, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 20, mass: 0.5 });
  const wrapRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 6);
    rotateX.set(py * -6);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX: springX, rotateY: springY }}
        className="h-full w-full"
      >
        <svg
          viewBox={wide ? "0 0 1000 620" : "20 10 1000 620"}
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
          role="img"
          aria-label="Animated glowing network diagram radiating from a central core"
        >
          <defs>
            <filter id="hero-core-glow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
            <radialGradient id="hero-core-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="55%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </radialGradient>
          </defs>

          {nodes.map((node, i) => (
            <path
              key={`line-${i}`}
              d={linkPath(node.x, node.y)}
              fill="none"
              stroke="rgba(148,163,184,0.35)"
              strokeWidth="1.25"
            />
          ))}

          {nodes.map((node, i) => (
            <motion.circle
              key={`pulse-${i}`}
              r="3.5"
              fill="#bfdbfe"
              style={{
                offsetPath: `path("${linkPath(node.x, node.y)}")`,
                offsetRotate: "0deg",
                filter: "drop-shadow(0 0 5px #60a5fa)",
              }}
              animate={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.45,
              }}
            />
          ))}

          {rings.map((r, i) => (
            <motion.circle
              key={`ring-${r}`}
              cx={core.x}
              cy={core.y}
              r={r}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="1.5"
              initial={{ opacity: 0.45, scale: 0.9 }}
              animate={{ opacity: 0, scale: 1.2 }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 0.7,
              }}
            />
          ))}

          {nodes.map((node, i) => (
            <g key={`node-${i}`}>
              {node.ring && (
                <circle cx={node.x} cy={node.y} r="13" fill="none" stroke="rgba(191,219,254,0.5)" strokeWidth="1.25" />
              )}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.ring ? 4.5 : 3.5}
                fill="#dbeafe"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
            </g>
          ))}

          <circle cx={core.x} cy={core.y} r="60" fill="url(#hero-core-fill)" filter="url(#hero-core-glow)" opacity="0.55" />
          <motion.circle
            cx={core.x}
            cy={core.y}
            r="34"
            fill="url(#hero-core-fill)"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
