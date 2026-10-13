"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useId, useRef } from "react";
import { ArrowUpRight, Sparkle } from "@/components/icons";
import { PillLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section";
import { work, type Work as WorkItem } from "@/lib/data";
import { useMediaQuery } from "@/lib/hooks";

function BrowserFrame({ item, imageScale }: { item: WorkItem; imageScale: MotionValue<number> }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      data-cursor="Visit"
      aria-label={`Visit ${item.title} live site`}
      className="group/frame block overflow-hidden rounded-xl border border-white/10 bg-ink shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] sm:rounded-2xl"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="mx-auto flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 font-mono text-[10.5px] text-muted sm:px-4">
          <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          {item.domain}
        </span>
        <span className="w-[42px]" />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: imageScale }}>
          {item.image && (
            <Image
              src={item.image}
              alt={`${item.title} homepage`}
              fill
              sizes="(min-width: 1024px) 760px, 92vw"
              className="object-cover object-top transition-transform duration-[1.2s] ease-out-expo group-hover/frame:scale-[1.04]"
            />
          )}
        </motion.div>
      </div>
    </a>
  );
}

// Stamp paper on a 16×20 grid so the perforations always land exactly on the edges.
const STAMP_W = 288;
const STAMP_H = 360;
const PITCH = 18;
const perfX = Array.from({ length: STAMP_W / PITCH + 1 }, (_, i) => i * PITCH);
const perfY = Array.from({ length: STAMP_H / PITCH + 1 }, (_, i) => i * PITCH);

/** A postage stamp for the not-yet-launched philately store. */
function Stamp({ accent }: { accent: string }) {
  const maskId = `stamp-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <div className="relative mx-auto w-[66%] max-w-[330px] py-6">
      <div className="relative aspect-[4/5] -rotate-[4deg] drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)] transition-transform duration-1000 ease-out-expo hover:rotate-0 hover:scale-[1.03]">
        <svg viewBox={`0 0 ${STAMP_W} ${STAMP_H}`} className="absolute inset-0 size-full" aria-hidden="true">
          <mask id={maskId}>
            <rect width={STAMP_W} height={STAMP_H} fill="white" />
            {perfX.map((x) => (
              <g key={`x${x}`}>
                <circle cx={x} cy={0} r={5.5} fill="black" />
                <circle cx={x} cy={STAMP_H} r={5.5} fill="black" />
              </g>
            ))}
            {perfY.map((y) => (
              <g key={`y${y}`}>
                <circle cx={0} cy={y} r={5.5} fill="black" />
                <circle cx={STAMP_W} cy={y} r={5.5} fill="black" />
              </g>
            ))}
          </mask>
          <rect width={STAMP_W} height={STAMP_H} fill="#f3ede1" mask={`url(#${maskId})`} />
        </svg>
        <div className="absolute inset-[6%] flex flex-col overflow-hidden border border-[#1d1026]/25 p-4 text-[#1d1026]">
          <div className="flex items-start justify-between font-mono text-[9px] uppercase tracking-[0.2em]">
            <span>Empire Philately</span>
            <span>No. 01</span>
          </div>
          <div className="relative my-3 flex flex-1 items-center justify-center">
            <div
              className="absolute aspect-square w-[88%] rounded-full opacity-60"
              style={{ background: `repeating-radial-gradient(circle, ${accent}55 0 1px, transparent 1px 7px)` }}
            />
            <div
              className="absolute aspect-square w-[64%] rounded-full animate-spin-slower"
              style={{ background: `repeating-conic-gradient(from 0deg, ${accent}66 0deg 2deg, transparent 2deg 10deg)` }}
            />
            <div className="relative grid size-[44%] place-items-center rounded-full bg-[#1d1026] text-[#f3ede1]">
              <span className="font-serif text-[clamp(2rem,4vw,3.4rem)] italic leading-none">E</span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]">Bangladesh</span>
            <span className="font-serif text-3xl italic leading-none">৳26</span>
          </div>
        </div>
      </div>
      {/* Postmark */}
      <div className="absolute -right-6 top-2 size-32 rotate-12 sm:-right-12 sm:size-36" aria-hidden="true">
        <svg viewBox="0 0 120 120" className="size-full animate-spin-slower" style={{ color: accent }}>
          <defs>
            <path id="postmark" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1" />
          <text fill="currentColor" className="font-mono text-[10px] uppercase tracking-[0.25em]">
            <textPath href="#postmark">In development • Coming soon •</textPath>
          </text>
        </svg>
        <Sparkle className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2" style={{ color: accent }} />
      </div>
    </div>
  );
}

function WorkCard({
  item,
  index,
  total,
  progress,
  range,
  targetScale,
  stack,
}: {
  item: WorkItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  stack: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const live = item.status === "Live";

  return (
    <div ref={ref} className="mb-6 lg:sticky lg:top-0 lg:mb-0 lg:flex lg:h-svh lg:items-center">
      <motion.article
        className="relative w-full origin-top overflow-hidden rounded-[28px] border border-white/10 lg:rounded-[36px] lg:will-change-transform"
        style={{
          scale: stack ? scale : 1,
          top: stack ? `calc(-3vh + ${index * 26}px)` : undefined,
          background: `linear-gradient(140deg, ${item.tint} 0%, #0e0e11 62%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[15%] -top-[45%] aspect-square w-[75%] rounded-full"
          style={{ background: `radial-gradient(closest-side, ${item.accent}38, transparent)` }}
        />
        <div className="relative grid grid-cols-1 gap-8 p-6 sm:p-10 lg:min-h-[min(78vh,720px)] lg:grid-cols-12 lg:gap-10 lg:p-12">
          <div className="flex flex-col lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span className="text-cream">
                {String(index + 1).padStart(2, "0")}
                <span className="text-dim"> / {String(total).padStart(2, "0")}</span>
              </span>
              <span className="h-px w-6 bg-line-strong" />
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px]">
                <span className={`size-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-amber"}`} />
                {item.status}
              </span>
              <span>{item.year}</span>
            </div>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] lg:mt-auto" style={{ color: item.accent }}>
              {item.category}
            </p>
            <h3 className="mt-3 text-[clamp(2.4rem,5vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.05em]">
              {item.title}
            </h3>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-cream/70 sm:text-base">{item.description}</p>

            <ul className="mt-6 space-y-2.5">
              {item.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-snug text-cream/80">
                  <span className="mt-[0.55em] h-px w-3 shrink-0" style={{ background: item.accent }} />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-1.5">
              {item.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-cream/75">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 lg:mt-10">
              {item.url ? (
                <PillLink href={item.url} target="_blank" rel="noreferrer" variant="ghost" icon={<ArrowUpRight />}>
                  Visit live site
                </PillLink>
              ) : (
                <span className="inline-flex h-12 items-center rounded-full border border-dashed border-white/15 px-6 text-sm text-muted">
                  Launching soon
                </span>
              )}
              <span className="text-xs text-muted">
                Role — <span className="text-cream/85">{item.role}</span>
              </span>
            </div>
          </div>

          <div className="order-first flex items-center lg:order-none lg:col-span-7">
            <div className="w-full">
              {item.image ? <BrowserFrame item={item} imageScale={imageScale} /> : <Stamp accent={item.accent} />}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const stack = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="work" className="relative pt-20 sm:pt-28 lg:pt-32">
      <div className="container-x">
        <SectionHeader
          index="02"
          label="Selected work"
          title="Products I've *shipped*"
          intro="Real platforms running in production — taken from requirements and specs through build, deployment, DNS and day-two operations."
        />
      </div>
      <div ref={containerRef} className="container-x mt-14 sm:mt-20 lg:mt-10">
        {work.map((item, i) => (
          <WorkCard
            key={item.slug}
            item={item}
            index={i}
            total={work.length}
            progress={scrollYProgress}
            range={[i / work.length, 1]}
            targetScale={1 - (work.length - i) * 0.035}
            stack={stack}
          />
        ))}
      </div>
    </section>
  );
}
