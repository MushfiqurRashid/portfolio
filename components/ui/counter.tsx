"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_OUT_EXPO } from "@/lib/utils";

/** Server-renders the final value (good for SEO), then counts up from zero on first view. */
export function Counter({ value, pad = 1, className }: { value: number; pad?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (ref.current && !inView) ref.current.textContent = "0".padStart(pad, "0");
  }, [inView, pad]);

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v)).padStart(pad, "0");
      },
    });
    return () => controls.stop();
  }, [inView, value, pad]);

  return (
    <span ref={ref} className={className}>
      {String(value).padStart(pad, "0")}
    </span>
  );
}
