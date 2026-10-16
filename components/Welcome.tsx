"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroGraphic from "./HeroGraphic";
import Logo from "./Logo";

const WELCOME_TEXT = "Digital Innovation";
const LOGO_HOLD_MS = 900;
const TYPE_SPEED = 45;
const HOLD_MS = 0;
const FADE_MS = 1200;

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

// Moment the final dissolve begins - Hero's own entrance is timed to this so
// it visibly "arrives" while the loading screen quietly fades, instead of
// already sitting static underneath by the time it's revealed.
export const WELCOME_REVEAL_MS = LOGO_HOLD_MS + WELCOME_TEXT.length * TYPE_SPEED + HOLD_MS;

export default function Welcome() {
  const [show, setShow] = useState(true);
  const [startTyping, setStartTyping] = useState(false);
  const [display, setDisplay] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStartTyping(true), LOGO_HOLD_MS);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let i = 0;
    const typeTimer = setInterval(() => {
      i += 1;
      setDisplay(WELCOME_TEXT.slice(0, i));

      if (i >= WELCOME_TEXT.length) {
        clearInterval(typeTimer);
        setTypingDone(true);
      }
    }, TYPE_SPEED);

    return () => clearInterval(typeTimer);
  }, [startTyping]);

  useEffect(() => {
    if (!typingDone) return;

    const unmountTimer = setTimeout(() => setShow(false), HOLD_MS);
    return () => clearTimeout(unmountTimer);
  }, [typingDone]);

  useEffect(() => {
    if (!show) {
      document.documentElement.classList.remove("overflow-hidden");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="welcome"
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_MS / 1000, ease: EASE_SMOOTH }}
          className="fixed inset-0 z-[100] flex items-center justify-center gap-[2vw] px-5 lg:gap-4 lg:px-6"
          style={{ background: "var(--background)" }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: typingDone ? 1 : 0 }}
            transition={{ duration: 1.1, ease: EASE_SMOOTH }}
            style={{ background: "var(--hero-bg)" }}
          >
            <HeroGraphic />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "var(--hero-overlay)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: FADE_MS / 1000, ease: EASE_SMOOTH },
              x: { type: "spring", stiffness: 110, damping: 16, mass: 0.7 },
            }}
          >
            <Logo className="h-[min(24vw,13rem)] w-[min(24vw,13rem)] shrink-0" />
          </motion.div>
          <motion.p
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_MS / 1000, ease: EASE_SMOOTH }}
            className="min-h-[1.2em] text-center font-display text-[clamp(1.25rem,6.6vw,4.5rem)] font-black uppercase tracking-tight text-slate-900 dark:text-white lg:text-7xl"
          >
            {display}
            {startTyping && !typingDone && <span aria-hidden className="typing-caret" />}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
