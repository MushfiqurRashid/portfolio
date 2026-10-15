"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import portrait from "@/public/images/portrait.png";
import { useApp } from "@/components/providers";
import { PillLink } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowUpRight, Download, GitHub, LinkedIn, Mail, Sparkle, Trophy } from "@/components/icons";
import { heroRoles, site } from "@/lib/data";
import { LocalTime } from "@/components/ui/local-time";
import { EASE_OUT_EXPO } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";

const fadeUp: Variants = {
  hidden: { opacity: 0, transform: "translateY(24px)" },
  show: (delay: number = 0) => ({
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay },
  }),
};

function NameLine({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={`flex overflow-hidden pb-[0.04em] ${className ?? ""}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { transform: "translateY(105%) rotate(6deg)" },
            show: {
              transform: "translateY(0%) rotate(0deg)",
              transition: { duration: 1, ease: EASE_OUT_EXPO, delay: delay + i * 0.028 },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingRole({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % heroRoles.length), 2600);
    return () => window.clearInterval(id);
  }, [active]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={heroRoles[index]}
          className="col-start-1 row-start-1 whitespace-nowrap pr-[0.08em] font-serif italic text-gradient"
          initial={{ transform: "translateY(100%)", opacity: 0 }}
          animate={{ transform: "translateY(0%)", opacity: 1 }}
          exit={{ transform: "translateY(-100%)", opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          {heroRoles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function RotatingBadge() {
  return (
    <div className="relative grid size-24 place-items-center sm:size-28">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-cream font-mono text-[9.2px] uppercase tracking-[0.32em]">
          <textPath href="#badge-circle">Product • Engineering • AI • </textPath>
        </text>
      </svg>
      <div className="grid size-11 place-items-center rounded-full bg-ember text-ink sm:size-12">
        <Sparkle className="size-5" />
      </div>
    </div>
  );
}

export function Hero() {
  const { ready, scrollTo } = useApp();
  const sectionRef = useRef<HTMLElement>(null);
  // On phones the hero is taller than the screen, so fading it on scroll would hide the portrait
  // and links before anyone reaches them. The scroll-out effect is for large screens only.
  const desktop = useMediaQuery("(min-width: 1024px)");

  // Scroll-linked depth
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Pointer parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const portraitX = useTransform(sx, (v) => v * 10);
  const portraitTilt = useTransform(sx, (v) => v * 2.5);
  const nearX = useTransform(sx, (v) => v * -28);
  const nearY = useTransform(sy, (v) => v * -20);
  const farX = useTransform(sx, (v) => v * 18);
  const farY = useTransform(sy, (v) => v * 14);

  const state = ready ? "show" : "hidden";

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set((e.clientX / window.innerWidth - 0.5) * 2);
        my.set((e.clientY / window.innerHeight - 0.5) * 2);
      }}
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines mask-fade-edges opacity-80" />
        <div
          className="absolute -right-[15%] -top-[25%] size-[80vmax] rounded-full animate-drift"
          style={{ background: "radial-gradient(circle, rgba(255,106,61,0.20), transparent 60%)" }}
        />
        <div
          className="absolute -bottom-[35%] -left-[20%] size-[70vmax] rounded-full animate-drift-reverse"
          style={{ background: "radial-gradient(circle, rgba(124,92,255,0.13), transparent 60%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-ink to-transparent" />
      </div>

      <motion.div
        initial="hidden"
        animate={state}
        style={desktop ? { y: contentY, opacity: fade } : undefined}
        className="container-x flex will-change-[transform,opacity] flex-1 flex-col pb-8 pt-24 sm:pt-28 lg:pb-10 lg:pt-28"
      >
        {/* Meta row */}
        <div className="flex items-center justify-between gap-3">
          <motion.div variants={fadeUp} custom={0.05} className="glass inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-ring" />
              <span className="relative size-2 rounded-full bg-emerald-400" />
            </span>
            <span className="whitespace-nowrap text-xs font-medium text-cream/90">Open to new opportunities</span>
          </motion.div>
          <motion.p
            variants={fadeUp}
            custom={0.1}
            className="whitespace-nowrap text-right font-mono text-[11px] uppercase tracking-[0.16em] text-muted max-[359px]:hidden sm:tracking-[0.25em]"
          >
            Dhaka<span className="hidden sm:inline">, BD</span> <span className="text-dim">/</span>{" "}
            <LocalTime className="text-cream tabular-nums" /><span className="hidden sm:inline"> GMT+6</span>
          </motion.p>
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 flex-1 items-center gap-10 py-10 lg:grid-cols-12 lg:gap-6 lg:py-6">
          <div className="lg:col-span-7">
            {/* Each role carries a leading sparkle. The row is shifted left by one sparkle inside a clipping
                wrapper, so whichever sparkle starts a line is cut off and lines never begin with a separator. */}
            <motion.p
              variants={fadeUp}
              custom={0.08}
              className="mb-5 overflow-hidden font-mono text-[11px] uppercase tracking-[0.2em] text-cream/80 max-[359px]:tracking-[0.12em] sm:mb-7 sm:tracking-[0.3em]"
            >
              <span className="-ml-6 flex flex-wrap gap-y-1.5">
                {site.roles.map((role) => (
                  <span key={role} className="flex items-center whitespace-nowrap">
                    <span aria-hidden="true" className="grid w-6 shrink-0 place-items-center">
                      <Sparkle className="size-2 text-ember" />
                    </span>
                    {role}
                  </span>
                ))}
              </span>
            </motion.p>

            <h1 className="sr-only">
              {site.shortName}, {site.headline}
            </h1>
            <div
              aria-hidden="true"
              className="text-[14.5vw] font-semibold uppercase leading-[0.86] tracking-[-0.05em] lg:text-[clamp(3.4rem,9.4vw,9.25rem)]"
            >
              <NameLine text={site.firstName} delay={0.1} />
              <span className="flex items-center gap-[0.18em]">
                <NameLine text={site.lastName} delay={0.22} />
                <motion.span
                  variants={{
                    hidden: { transform: "scale(0) rotate(-90deg)" },
                    show: { transform: "scale(1) rotate(0deg)", transition: { duration: 1, ease: EASE_OUT_EXPO, delay: 0.55 } },
                  }}
                  className="inline-block"
                >
                  <Sparkle className="size-[0.42em] text-ember animate-spin-slow" />
                </motion.span>
              </span>
            </div>

            <motion.p
              variants={fadeUp}
              custom={0.4}
              className="mt-6 text-[clamp(1.35rem,2.4vw,2.1rem)] font-medium leading-tight tracking-[-0.02em] sm:mt-9"
            >
              I design &amp; ship <RotatingRole active={ready} />
            </motion.p>

            <motion.p variants={fadeUp} custom={0.48} className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
              Based in Dhaka, Bangladesh, I turn business requirements into production ready platforms with
              product management, full stack engineering, data analysis and applied AI.
            </motion.p>

            <motion.div variants={fadeUp} custom={0.56} className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <Magnetic className="min-w-[10.5rem] flex-1 sm:flex-none">
                <PillLink
                  href="#work"
                  icon={<ArrowUpRight />}
                  className="w-full justify-between sm:w-auto sm:justify-start"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#work");
                  }}
                >
                  View my work
                </PillLink>
              </Magnetic>
              <Magnetic className="min-w-[10.5rem] flex-1 sm:flex-none">
                <PillLink
                  href={site.cv}
                  variant="ghost"
                  icon={<Download />}
                  download
                  className="w-full justify-between sm:w-auto sm:justify-start"
                >
                  Download CV
                </PillLink>
              </Magnetic>
            </motion.div>
          </div>

          {/* Portrait composition */}
          <div className="relative lg:col-span-5">
            <motion.div
              className="relative mx-auto aspect-[4/5] w-full max-w-[340px] will-change-transform sm:max-w-[400px] lg:max-w-[440px]"
              style={{ y: portraitY }}
            >
              {/* Halo */}
              <motion.div
                aria-hidden="true"
                className="absolute -inset-[12%] rounded-full will-change-transform"
                style={{
                  x: farX,
                  y: farY,
                  background: "radial-gradient(circle at 50% 55%, rgba(255,106,61,0.38), rgba(255,181,71,0.08) 45%, transparent 68%)",
                }}
                variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.15 } } }}
              />

              {/* Arch */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-[7%] bottom-0 top-[13%] overflow-hidden rounded-t-full border border-white/10"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 0%, rgba(255,106,61,0.95) 0%, rgba(255,140,70,0.55) 38%, rgba(20,20,24,0.4) 75%, rgba(9,9,11,0) 100%)",
                }}
                variants={{
                  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.15 } },
                }}
              >
                <div className="absolute inset-0 opacity-30 [background:repeating-radial-gradient(circle_at_50%_100%,transparent_0_22px,rgba(255,255,255,0.18)_22px_23px)]" />
              </motion.div>

              {/* Spinning rim */}
              <div aria-hidden="true" className="absolute inset-x-[7%] top-[13%] aspect-square">
                <div
                  className="size-full rounded-full animate-spin-slow opacity-80"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,181,71,0.9) 40deg, transparent 90deg)",
                    WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px))",
                  }}
                />
              </div>

              {/* Photo */}
              <motion.div
                className="absolute inset-0 will-change-transform"
                style={{ x: portraitX, rotate: portraitTilt }}
                variants={{
                  hidden: { opacity: 0, y: 60, scale: 1.04 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.25 } },
                }}
              >
                <Image
                  src={portrait}
                  alt={`${site.shortName}, software engineer and data analyst in Dhaka, Bangladesh`}
                  fill
                  preload
                  quality={90}
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 400px, 340px"
                  className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                />
              </motion.div>

              <div aria-hidden="true" className="absolute inset-x-[-10%] bottom-0 h-[26%] bg-linear-to-t from-ink via-ink/70 to-transparent" />

              {/* Floating chips */}
              <motion.div className="absolute -left-3 top-[30%] will-change-transform sm:-left-10" style={{ x: nearX, y: nearY }}>
                <motion.div
                  variants={{ hidden: { opacity: 0, transform: "translateY(20px) scale(0.8)" }, show: { opacity: 1, transform: "translateY(0px) scale(1)", transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.7 } } }}
                >
                  <div className="glass flex animate-float items-center gap-3 rounded-2xl p-2.5 pr-4 shadow-2xl shadow-black/40">
                    <span className="grid size-9 place-items-center rounded-xl bg-ember/15 text-ember">
                      <Trophy className="size-[18px]" />
                    </span>
                    <span className="leading-tight">
                      <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">NASA Space Apps</span>
                      <span className="block text-[13px] font-medium">Global 2nd Runner Up</span>
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="absolute -right-2 bottom-[16%] will-change-transform sm:-right-8" style={{ x: farX, y: farY }}>
                <motion.div
                  variants={{ hidden: { opacity: 0, transform: "translateY(20px) scale(0.8)" }, show: { opacity: 1, transform: "translateY(0px) scale(1)", transition: { duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.8 } } }}
                >
                  <div className="glass animate-float rounded-2xl px-4 py-3 shadow-2xl shadow-black/40 [animation-delay:-3s]">
                    <span className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-muted">
                      <span className="size-1.5 rounded-full bg-emerald-400" /> Currently
                    </span>
                    <span className="mt-1 block text-[13px] font-medium leading-snug">
                      PM, Tech <span className="text-muted">@</span> Empire Capital
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div className="absolute -top-2 right-0 will-change-transform sm:-right-4" style={{ x: nearX, y: nearY }}>
                <motion.div
                  variants={{ hidden: { opacity: 0, transform: "scale(0.5)" }, show: { opacity: 1, transform: "scale(1)", transition: { duration: 1, ease: EASE_OUT_EXPO, delay: 0.9 } } }}
                >
                  <RotatingBadge />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom row */}
        <motion.div variants={fadeUp} custom={0.65} className="flex items-end justify-center gap-6 sm:justify-between">
          <button
            type="button"
            onClick={() => scrollTo("#about")}
            className="group hidden items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted transition-colors hover:text-cream sm:flex"
          >
            <span className="relative block h-12 w-px overflow-hidden bg-line-strong">
              <span className="absolute inset-0 bg-ember animate-scroll-line" />
            </span>
            Scroll to explore
          </button>
          <div className="flex items-center gap-2">
            {[
              { href: site.socials.github, label: "GitHub", icon: <GitHub className="size-[18px]" /> },
              { href: site.socials.linkedin, label: "LinkedIn", icon: <LinkedIn className="size-4" /> },
              { href: `mailto:${site.email}`, label: "Email", icon: <Mail className="size-[18px]" /> },
            ].map((s) => (
              <Magnetic key={s.label} strength={0.4}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="glass grid size-11 place-items-center rounded-full text-cream/80 transition-colors duration-300 hover:border-ember/50 hover:text-ember"
                >
                  {s.icon}
                </a>
              </Magnetic>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
