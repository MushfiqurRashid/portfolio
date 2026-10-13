"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { EASE_IN_OUT, EASE_OUT_EXPO } from "@/lib/utils";

const WORDS = ["Mushfiqur", "Rashid"];
const SESSION_KEY = "intro-seen";
/** Keep below the 4.5s CSS safety net in globals.css: past this, the page is already on screen. */
const LATE_HYDRATION_MS = 4000;
/** Fallback if the browser can't report the CSS counter animation (matches its delay + duration). */
const COUNT_MS = 1000;

/**
 * The counter and progress bar are CSS animations, so they start on first paint instead of
 * waiting for JavaScript. Once they finish (and the app has hydrated), the curtain lifts.
 * Shown once per browser session.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"loading" | "exit" | "gone">("loading");
  const countRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || root.hasAttribute("data-skip-intro") || performance.now() > LATE_HYDRATION_MS) {
      root.setAttribute("data-skip-intro", "");
      onDone();
      return;
    }

    let cancelled = false;
    let timer: number | undefined;
    const animation = countRef.current?.getAnimations?.()[0];
    const counted = animation
      ? animation.finished.then(
          () => undefined,
          () => undefined,
        )
      : new Promise<void>((resolve) => window.setTimeout(resolve, Math.max(0, COUNT_MS - performance.now())));

    counted.then(() => {
      if (cancelled) return;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      setPhase("exit");
      timer = window.setTimeout(onDone, 150);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [onDone]);

  if (phase === "gone") return null;
  const exiting = phase === "exit";

  return (
    <motion.div
      aria-hidden="true"
      className="preloader fixed inset-0 z-[100] bg-ink will-change-transform"
      initial={{ transform: "translateY(0%)" }}
      animate={{ transform: exiting ? "translateY(-100%)" : "translateY(0%)" }}
      transition={{ duration: 0.8, ease: EASE_IN_OUT, delay: exiting ? 0.05 : 0 }}
      onAnimationComplete={() => exiting && setPhase("gone")}
    >
      {/* Curved trailing edge that flattens as the curtain lifts */}
      <motion.div
        className="absolute left-[-10%] top-full h-[14vh] w-[120%] origin-top rounded-b-[50%] bg-ink"
        initial={{ transform: "scaleY(1)" }}
        animate={{ transform: exiting ? "scaleY(0)" : "scaleY(1)" }}
        transition={{ duration: 0.8, ease: EASE_IN_OUT, delay: exiting ? 0.15 : 0 }}
      />

      <div className="pointer-events-none absolute inset-0 grid-lines mask-fade-edges opacity-60" />

      <motion.div
        className="relative flex h-full flex-col items-center justify-center px-6"
        animate={exiting ? { transform: "translateY(-40px)", opacity: 0 } : { transform: "translateY(0px)", opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
      >
        <div className="flex flex-wrap justify-center gap-x-[0.25em] text-[clamp(2.5rem,8vw,6.5rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em]">
          {WORDS.map((word, wi) => (
            <span key={word} className="inline-flex overflow-hidden pb-[0.06em]">
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="preloader-char inline-block"
                  style={{ animationDelay: `${0.05 + wi * 0.1 + ci * 0.03}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </div>
        <p className="preloader-fade mt-6 font-mono text-[11px] uppercase tracking-[0.35em] text-muted">
          Product <span className="text-ember">✦</span> Engineering <span className="text-ember">✦</span> AI
        </p>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 px-6 pb-6 sm:px-10 sm:pb-8"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-end justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Dhaka, Bangladesh</p>
          <span
            ref={countRef}
            className="preloader-count font-sans text-6xl font-light tabular-nums tracking-tight text-cream sm:text-8xl"
          />
        </div>
        <div className="mt-4 h-px w-full bg-line">
          <div className="preloader-bar h-full bg-linear-to-r from-ember to-amber" />
        </div>
      </motion.div>
    </motion.div>
  );
}
