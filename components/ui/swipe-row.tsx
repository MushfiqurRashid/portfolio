"use client";

import { Children, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Breakpoint = "md" | "lg";

// Below the breakpoint the track bleeds to the screen edges and snaps card by card; from the
// breakpoint up it is an ordinary grid (pass the grid columns through `className`).
const track: Record<Breakpoint, string> = {
  md: "-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-1 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:gap-4 md:overflow-visible md:px-0 md:pb-0",
  lg: "-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-5 px-5 pb-1 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0",
};

const pager: Record<Breakpoint, string> = { md: "md:hidden", lg: "lg:hidden" };

const pad = (n: number) => String(n).padStart(2, "0");

export function SwipeRow({
  children,
  label,
  until = "md",
  className,
}: {
  children: React.ReactNode;
  /** What the cards are, for screen readers, e.g. "Projects". */
  label: string;
  until?: Breakpoint;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = Array.from(el.children) as HTMLElement[];
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
        setIndex(items.length - 1);
        return;
      }
      const start = el.scrollLeft + parseFloat(getComputedStyle(el).scrollPaddingLeft || "0");
      let best = 0;
      let bestDistance = Infinity;
      items.forEach((item, i) => {
        const distance = Math.abs(item.offsetLeft - start);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setIndex(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (i: number) => {
    const el = ref.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !item) return;
    const paddingLeft = parseFloat(getComputedStyle(el).scrollPaddingLeft || "0");
    el.scrollTo({ left: item.offsetLeft - paddingLeft, behavior: "smooth" });
  };

  return (
    <div>
      <div ref={ref} role="region" aria-label={label} className={cn("no-scrollbar relative", track[until], className)}>
        {children}
      </div>
      <div className={cn("mt-6 flex items-center justify-between gap-4", pager[until])}>
        <div className="-ml-1 flex items-center">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${label.toLowerCase()} ${i + 1} of ${count}`}
              aria-current={i === index || undefined}
              className="grid h-8 place-items-center px-1"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-500 ease-out-expo",
                  i === index ? "w-6 bg-ember" : "w-1.5 bg-white/20",
                )}
              />
            </button>
          ))}
        </div>
        <p className="font-mono text-[11px] uppercase tabular-nums tracking-[0.2em] text-dim" aria-hidden="true">
          <span className="text-cream">{pad(index + 1)}</span> / {pad(count)}
        </p>
      </div>
    </div>
  );
}
