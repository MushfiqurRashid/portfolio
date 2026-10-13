"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type CursorState = { hover: boolean; label: string | null };

/**
 * Decorative ring that trails the (always visible) system pointer. The native pointer is kept
 * so pointing never feels laggy, even when the page is busy. Elements opt into a labelled
 * bubble with `data-cursor="View"`; links and buttons get the hover state automatically.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 520, damping: 40, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 520, damping: 40, mass: 0.5 });
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>({ hover: false, label: null });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, [role='button'], summary, label");
      const hover = Boolean(labelled || interactive);
      const label = labelled?.dataset.cursor || null;
      setState((prev) => (prev.hover === hover && prev.label === label ? prev : { hover, label }));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  const size = state.label ? 92 : state.hover ? 56 : 34;

  return (
    <div aria-hidden="true" className="cursor-layer pointer-events-none fixed inset-0 z-[110]">
      <motion.div
        className="absolute left-0 top-0 will-change-transform"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
          animate={{
            width: size,
            height: size,
            backgroundColor: state.label
              ? "rgba(255,106,61,1)"
              : state.hover
                ? "rgba(239,235,228,0.08)"
                : "rgba(239,235,228,0)",
            borderColor: state.label ? "rgba(255,106,61,1)" : "rgba(239,235,228,0.35)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <AnimatePresence>
            {state.label && (
              <motion.span
                key={state.label}
                className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {state.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
