"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshot() {
  return false;
}

function usePointerFine() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const BLOB_COUNT = 5;

export default function CustomCursor() {
  const pointerFine = usePointerFine();
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const anchorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const blobPos = useRef(
    Array.from({ length: BLOB_COUNT }, () => ({ x: 0, y: 0 })),
  );
  const anchorTarget = useRef<{ x: number; y: number } | null>(null);
  const anchor = useRef({ x: 0, y: 0, scale: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!pointerFine) return;

    document.body.classList.add("custom-cursor-active");

    function onMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    function onOver(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest?.("a, button") as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        anchorTarget.current = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      }
    }

    function onOut(e: MouseEvent) {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest?.("a, button")) {
        anchorTarget.current = null;
      }
    }

    function loop() {
      let prevX = mouse.current.x;
      let prevY = mouse.current.y;
      for (let i = 0; i < BLOB_COUNT; i++) {
        const ease = 0.24 - i * 0.032;
        const p = blobPos.current[i];
        p.x += (prevX - p.x) * ease;
        p.y += (prevY - p.y) * ease;
        const el = blobRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        }
        prevX = p.x;
        prevY = p.y;
      }

      const targetScale = anchorTarget.current ? 1 : 0;
      anchor.current.scale += (targetScale - anchor.current.scale) * 0.18;
      const tx = anchorTarget.current?.x ?? mouse.current.x;
      const ty = anchorTarget.current?.y ?? mouse.current.y;
      anchor.current.x += (tx - anchor.current.x) * 0.3;
      anchor.current.y += (ty - anchor.current.y) * 0.3;
      if (anchorRef.current) {
        anchorRef.current.style.transform = `translate3d(${anchor.current.x}px, ${anchor.current.y}px, 0) translate(-50%, -50%) scale(${anchor.current.scale})`;
      }

      raf.current = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [pointerFine]);

  if (!pointerFine) return null;

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="cursor-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"
              result="goo"
            />
          </filter>
        </defs>
      </svg>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{ filter: "url(#cursor-goo)", mixBlendMode: "difference" }}
      >
        {Array.from({ length: BLOB_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              blobRefs.current[i] = el;
            }}
            className="fixed left-0 top-0 rounded-full bg-white"
            style={{
              width: `${30 - i * 5}px`,
              height: `${30 - i * 5}px`,
              willChange: "transform",
            }}
          />
        ))}
        <div
          ref={anchorRef}
          className="fixed left-0 top-0 h-11 w-11 rounded-full bg-white"
          style={{ willChange: "transform" }}
        />
      </div>
    </>
  );
}
