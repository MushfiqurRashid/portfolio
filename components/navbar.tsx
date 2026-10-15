"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers";
import { Magnetic } from "@/components/ui/magnetic";
import { LocalTime } from "@/components/ui/local-time";
import { ArrowUpRight, Download, GitHub, LinkedIn, Plus, Sparkle } from "@/components/icons";
import { navLinks, sections, site } from "@/lib/data";
import { cn, EASE_IN_OUT, EASE_OUT_EXPO } from "@/lib/utils";

type MenuOrigin = "top" | "dock";

/** Where the menu's circular reveal grows from: the top-right button or the bottom dock. */
const MENU_ORIGIN: Record<MenuOrigin, string> = {
  top: "calc(100% - 44px) 40px",
  dock: "50% calc(100% - 44px)",
};

const navIds = new Set<string>(navLinks.map((l) => l.href.slice(1)));

export function Navbar() {
  const { ready, scrollTo } = useApp();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<MenuOrigin>("top");
  // `active` drives the desktop pill (nav links only); `section` is every section, for the dock.
  const [active, setActive] = useState("");
  const [section, setSection] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 500);
    setScrolled(y > 30);
    setPastHero(y > window.innerHeight * 0.7);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id === "top" ? "" : entry.target.id;
          setSection(id);
          if (!id || navIds.has(id)) setActive(id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...sections.map((s) => s.id)]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.removeProperty("overflow");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  const openMenu = (from: MenuOrigin) => {
    setOrigin(from);
    setOpen(true);
  };

  const sectionIndex = sections.findIndex((s) => s.id === section);
  const sectionLabel = sectionIndex >= 0 ? sections[sectionIndex].label : "Intro";
  const dockVisible = ready && pastHero && section !== "contact" && !open;
  const at = MENU_ORIGIN[origin];

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: ready && (!hidden || open) ? 0 : -100, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: ready && !scrolled ? 0.35 : 0 }}
      >
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 border-b border-white/[0.06] bg-ink/90 transition-opacity duration-500",
            scrolled && !open ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="container-x relative flex h-[4.5rem] items-center justify-between gap-6 sm:h-20">
          <a
            href="#top"
            onClick={go("#top")}
            className="group relative z-10 flex items-center gap-2.5"
            aria-label={`${site.shortName}, back to top`}
          >
            <Sparkle className="size-4 text-ember transition-transform duration-700 ease-out-expo group-hover:rotate-180" />
            <span className="text-[15px] font-semibold tracking-tight">
              {site.firstName}
              <span className="text-muted"> {site.lastName}</span>
            </span>
          </a>

          <nav aria-label="Primary" className="glass absolute left-1/2 hidden -translate-x-1/2 rounded-full p-1 lg:block">
            <ul className="flex items-center">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={go(link.href)}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300",
                        isActive ? "text-cream" : "text-muted hover:text-cream",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/[0.09]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Magnetic className="hidden lg:inline-block">
              <a
                href="#contact"
                onClick={go("#contact")}
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-cream pl-5 pr-4 text-[13px] font-medium text-ink transition-colors duration-300 hover:bg-ember"
              >
                Let&apos;s talk
                <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => (open ? setOpen(false) : openMenu("top"))}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass relative grid size-11 place-items-center rounded-full transition-[scale] duration-200 active:scale-90 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-full bg-cream transition-transform duration-500 ease-out-expo",
                    open && "top-1/2 -translate-y-1/2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-full bg-cream transition-transform duration-500 ease-out-expo",
                    open && "bottom-1/2 translate-y-1/2 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Phones and tablets: a floating dock in the thumb zone with where you are, menu and contact. */}
      <AnimatePresence>
        {dockVisible && (
          <motion.div
            className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.875rem)] lg:hidden"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          >
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-surface-2/85 p-1.5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => openMenu("dock")}
                aria-label={`Open menu. Current section: ${sectionLabel}`}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="flex h-11 items-center gap-2.5 rounded-full pl-1 pr-3.5 transition-[scale,background-color] duration-200 active:scale-[0.96] active:bg-white/[0.06]"
              >
                <span className="relative grid size-9 place-items-center">
                  <svg viewBox="0 0 36 36" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="2" />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="var(--color-ember)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      style={{ pathLength: progress }}
                    />
                  </svg>
                  {sectionIndex >= 0 ? (
                    <span className="font-mono text-[10px] tabular-nums text-cream">
                      {String(sectionIndex + 1).padStart(2, "0")}
                    </span>
                  ) : (
                    <Sparkle className="size-3 text-ember" />
                  )}
                </span>
                <span className="relative grid w-[5.75rem] overflow-hidden text-left text-[13px] font-medium">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={sectionLabel}
                      className="col-start-1 row-start-1 whitespace-nowrap"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                    >
                      {sectionLabel}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span aria-hidden="true" className="flex flex-col gap-[3px]">
                  <span className="block h-[1.5px] w-3.5 rounded-full bg-cream/70" />
                  <span className="block h-[1.5px] w-2.5 rounded-full bg-cream/70" />
                </span>
              </button>
              <a
                href="#contact"
                onClick={go("#contact")}
                className="flex h-11 items-center gap-1.5 rounded-full bg-ember pl-4 pr-3 text-[13px] font-medium text-ink transition-[scale] duration-200 active:scale-[0.96]"
              >
                Let&apos;s talk
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-ink-2 px-5 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-[calc(env(safe-area-inset-top)+5.5rem)] sm:px-8 lg:hidden"
            initial={{ clipPath: `circle(0% at ${at})` }}
            animate={{ clipPath: `circle(150% at ${at})` }}
            exit={{ clipPath: `circle(0% at ${at})` }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-lines mask-fade-edges opacity-40" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-1/3 left-1/2 aspect-square w-[140%] -translate-x-1/2 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(255,106,61,0.16), transparent)" }}
            />

            <nav aria-label="Mobile" className="relative">
              <motion.p
                className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-dim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                Menu
              </motion.p>
              <ul className="mt-3">
                {navLinks.map((link, i) => {
                  const isActive = section === link.href.slice(1);
                  return (
                    <li key={link.href} className="overflow-hidden border-b border-line">
                      <motion.a
                        href={link.href}
                        onClick={go(link.href)}
                        aria-current={isActive ? "location" : undefined}
                        className="flex items-center justify-between gap-4 py-3 transition-[opacity] active:opacity-60"
                        initial={{ transform: "translateY(100%)" }}
                        animate={{ transform: "translateY(0%)" }}
                        transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.25 + i * 0.06 }}
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="w-5 font-mono text-xs text-ember">0{i + 1}</span>
                          <span className="text-[clamp(2.25rem,11vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
                            {link.label}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "grid size-10 shrink-0 place-items-center rounded-full border transition-colors",
                            isActive ? "border-ember bg-ember text-ink" : "border-line-strong text-cream/70",
                          )}
                        >
                          <ArrowUpRight className="size-4" />
                        </span>
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              className="relative mt-auto pt-10"
              initial={{ opacity: 0, transform: "translateY(20px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.55 }}
            >
              <div className="rounded-3xl border border-line bg-white/[0.03] p-5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-dim">Get in touch</p>
                <a href={`mailto:${site.email}`} className="mt-2 block truncate text-lg font-medium text-cream">
                  {site.email}
                </a>
                <div className="mt-5 flex items-center gap-2">
                  <a
                    href={site.cv}
                    download
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-cream pl-4 pr-3.5 text-[13px] font-medium text-ink transition-[scale] duration-200 active:scale-[0.96]"
                  >
                    Download CV
                    <Download className="size-4" />
                  </a>
                  <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass grid size-11 place-items-center rounded-full">
                    <GitHub className="size-5" />
                  </a>
                  <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid size-11 place-items-center rounded-full">
                    <LinkedIn className="size-[18px]" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="ml-auto grid size-11 place-items-center rounded-full border border-line-strong text-cream transition-[scale] duration-200 active:scale-90"
                  >
                    <Plus className="size-5 rotate-45" />
                  </button>
                </div>
              </div>
              <p className="mt-4 flex items-center justify-between px-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">
                <span>{site.location}</span>
                <span>
                  <LocalTime className="tabular-nums text-cream/80" /> GMT+6
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
