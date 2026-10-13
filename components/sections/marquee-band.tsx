"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";
import { Sparkle } from "@/components/icons";
import { marqueeItems } from "@/lib/data";
import { cn, wrap } from "@/lib/utils";

const COPIES = 4;

/** Infinite ribbon whose speed and direction respond to scroll velocity. */
function VelocityRibbon({ items, baseVelocity, className }: { items: string[]; baseVelocity: number; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  // No per-frame work while the ribbon is off-screen.
  const inView = useInView(ref, { margin: "100px 0px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-100 / COPIES, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={ref} className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex shrink-0 will-change-transform" style={{ x }}>
        {Array.from({ length: COPIES }).map((_, copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy > 0 || undefined}>
            {items.map((item) => (
              <span key={item} className="flex items-center">
                <span className="px-6 sm:px-8">{item}</span>
                <Sparkle className="size-[0.55em] shrink-0 opacity-80" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function MarqueeBand() {
  const reversed = [...marqueeItems].reverse();
  return (
    <section aria-label="Focus areas" className="relative z-10 -my-6 overflow-hidden py-16 sm:py-20">
      <div className="relative">
        <div className="-rotate-2 scale-[1.04] border-y border-white/5 bg-surface-2 py-4 text-cream/50 sm:py-5">
          <VelocityRibbon
            items={reversed}
            baseVelocity={2}
            className="text-[clamp(1.1rem,2.2vw,1.8rem)] font-medium tracking-[-0.02em]"
          />
        </div>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[1.6deg] scale-[1.04] bg-linear-to-r from-ember to-amber py-4 text-ink shadow-[0_20px_60px_-10px_rgba(255,106,61,0.45)] sm:py-5">
          <VelocityRibbon
            items={marqueeItems}
            baseVelocity={-2.4}
            className="text-[clamp(1.1rem,2.2vw,1.8rem)] font-semibold uppercase tracking-[-0.02em]"
          />
        </div>
      </div>
    </section>
  );
}
