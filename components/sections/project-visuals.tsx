import type { Project } from "@/lib/data";

/* Small line-art illustrations, one per project type. Pure CSS/SVG — they animate on card hover. */

function Xai() {
  const bars = [
    { label: "yarn_count", w: 92, pos: true },
    { label: "stitch_len", w: 74, pos: false },
    { label: "loop_den", w: 58, pos: true },
    { label: "tightness", w: 41, pos: true },
    { label: "machine_g", w: 27, pos: false },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-1">
      {bars.map((b, i) => (
        <div key={b.label} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-right font-mono text-[10px] text-dim">{b.label}</span>
          <div className="relative h-2.5 flex-1 rounded-full bg-white/[0.04]">
            <div
              className="absolute inset-y-0 left-0 origin-left scale-x-[0.55] rounded-full transition-transform duration-1000 ease-out-expo group-hover/spot:scale-x-100"
              style={{
                width: `${b.w}%`,
                transitionDelay: `${i * 70}ms`,
                background: b.pos ? "linear-gradient(90deg,#ff6a3d,#ffb547)" : "rgba(124,92,255,0.75)",
              }}
            />
          </div>
        </div>
      ))}
      <div className="mt-1 flex justify-between pl-[92px] font-mono text-[9px] uppercase tracking-[0.2em] text-dim">
        <span>SHAP value</span>
        <span>22 models</span>
      </div>
    </div>
  );
}

function Rag() {
  return (
    <div className="flex h-full items-center justify-center gap-3">
      <div className="space-y-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-9 w-12 sm:w-16 rounded-md border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-700 ease-out-expo group-hover/spot:border-ember/50"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="h-1 w-3/4 rounded bg-white/15" />
            <div className="mt-1 h-1 w-1/2 rounded bg-white/10" />
            <div className="mt-1 h-1 w-2/3 rounded bg-white/10" />
          </div>
        ))}
      </div>
      <svg viewBox="0 0 60 20" className="w-8 shrink-0 text-ember sm:w-14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M0 10h52M46 4l7 6-7 6" strokeDasharray="4 4" className="group-hover/spot:[animation:dash_1.2s_linear_infinite]" />
      </svg>
      <div className="w-36 space-y-2 sm:w-40">
        <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-white/[0.07] px-3 py-1.5 text-[11px] text-cream/80">Best fertilizer for Boro rice?</div>
        <div className="w-fit rounded-2xl rounded-bl-sm bg-linear-to-r from-ember to-amber px-3 py-1.5 text-[11px] font-medium text-ink transition-transform duration-700 ease-out-expo group-hover/spot:-translate-y-0.5">
          Based on 3 sources…
        </div>
      </div>
    </div>
  );
}

function Crop() {
  return (
    <div className="relative flex h-full items-end justify-center">
      <div className="absolute inset-x-6 bottom-6 grid grid-cols-12 gap-2 opacity-40">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="size-1 rounded-full bg-cream/40" />
        ))}
      </div>
      <svg viewBox="0 0 120 100" className="relative mb-9 h-[78%] text-ember" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <path d="M60 100V40" />
        <path
          d="M60 62C44 62 32 52 30 34c17 0 29 10 30 28Z"
          className="origin-[60px_62px] transition-transform duration-1000 ease-out-expo group-hover/spot:-rotate-6"
          fill="rgba(255,106,61,0.12)"
        />
        <path
          d="M60 48c2-17 14-28 32-28-1 18-14 28-32 28Z"
          className="origin-[60px_48px] transition-transform duration-1000 ease-out-expo group-hover/spot:rotate-6"
          fill="rgba(255,181,71,0.14)"
          stroke="#ffb547"
        />
      </svg>
      <span className="absolute right-4 top-4 rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-cream/70">
        rice · 0.93
      </span>
    </div>
  );
}

function Vision() {
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="relative">
        <svg viewBox="0 0 64 80" className="h-24 text-amber/70" fill="currentColor" aria-hidden="true">
          <path d="M32 0c4 14 20 22 20 44a20 20 0 0 1-40 0c0-10 5-16 9-21 1 7 4 11 8 12-2-12 1-24 3-35Z" opacity="0.35" />
          <path d="M33 34c2 8 10 11 10 21a11 11 0 0 1-22 0c0-6 4-9 6-12 0 4 2 6 4 6-1-6 0-11 2-15Z" className="text-ember" fill="currentColor" />
        </svg>
        <div className="absolute -inset-4 rounded-sm border-[1.5px] border-dashed border-ember transition-all duration-700 ease-out-expo group-hover/spot:-inset-3 group-hover/spot:border-solid">
          <span className="absolute -top-[22px] left-[-1.5px] bg-ember px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-ink">fire 0.94</span>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 h-12 w-20 rounded-sm border border-dashed border-violet/70">
        <span className="absolute -top-[17px] left-[-1px] whitespace-nowrap bg-violet/80 px-1.5 font-mono text-[9px] text-ink">smoke 0.81</span>
      </div>
    </div>
  );
}

function Nlp() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <p className="max-w-[16rem] text-center text-[13px] leading-relaxed text-cream/60">
        &ldquo;সংবাদ শিরোনাম… <span className="text-dim">[CLS] token → classifier</span>&rdquo;
      </p>
      <div className="flex gap-2">
        <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3.5 py-1.5 text-sm text-emerald-300 transition-transform duration-700 ease-out-expo group-hover/spot:-translate-y-1">
          সত্য ✓
        </span>
        <span className="rounded-full border border-ember/40 bg-ember/10 px-3.5 py-1.5 text-sm text-ember transition-transform delay-75 duration-700 ease-out-expo group-hover/spot:translate-y-1">
          মিথ্যা ✕
        </span>
      </div>
    </div>
  );
}

function Tickets() {
  const tickets = [
    { t: "Payment failed", c: "Billing", col: "bg-amber/80" },
    { t: "Can't sign in", c: "Access", col: "bg-violet/80" },
    { t: "Page crashes", c: "Bug", col: "bg-ember/90" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-2">
      {tickets.map((k, i) => (
        <div
          key={k.t}
          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 transition-transform duration-700 ease-out-expo group-hover/spot:translate-x-2"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <span className="text-xs text-cream/75">{k.t}</span>
          <span className={`rounded-full px-2 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-wider text-ink ${k.col}`}>
            {k.c}
          </span>
        </div>
      ))}
    </div>
  );
}

function Orbit() {
  return (
    <div className="relative flex h-full items-center justify-center">
      {[{ s: 150, d: "animate-spin-slow" }, { s: 104, d: "animate-spin-slower" }, { s: 60, d: "animate-spin-slow" }].map((o, i) => (
        <div
          key={i}
          className={`absolute rounded-full border border-white/10 ${o.d}`}
          style={{ width: o.s, height: o.s, animationDirection: i === 1 ? "reverse" : undefined }}
        >
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 10 - i * 2,
              height: 10 - i * 2,
              background: i === 0 ? "#ffb547" : i === 1 ? "#7c5cff" : "#efebe4",
              boxShadow: i === 0 ? "0 0 12px #ffb547" : undefined,
            }}
          />
        </div>
      ))}
      <div className="size-7 rounded-full bg-linear-to-br from-ember to-amber shadow-[0_0_40px_rgba(255,106,61,0.6)]" />
    </div>
  );
}

export function ProjectVisual({ type }: { type: Project["visual"] }) {
  switch (type) {
    case "xai":
      return <Xai />;
    case "rag":
      return <Rag />;
    case "crop":
      return <Crop />;
    case "vision":
      return <Vision />;
    case "nlp":
      return <Nlp />;
    case "tickets":
      return <Tickets />;
    case "orbit":
      return <Orbit />;
  }
}
