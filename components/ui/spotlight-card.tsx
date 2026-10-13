"use client";

import { cn } from "@/lib/utils";

/** Card with a soft glow and border highlight that follow the pointer. */
export function SpotlightCard({
  children,
  className,
  glow = "255,106,61",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - r.left}px`);
        el.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group/spot relative isolate overflow-hidden rounded-[28px] border border-line bg-surface/50",
        className,
      )}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(460px circle at var(--x, 50%) var(--y, 50%), rgba(${glow},0.13), transparent 45%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          padding: 1,
          background: `radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(${glow},0.55), transparent 60%)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}
