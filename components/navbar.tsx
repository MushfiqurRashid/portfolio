"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers";
import { Magnetic } from "@/components/ui/magnetic";
import { ArrowUpRight, GitHub, LinkedIn, Sparkle } from "@/components/icons";
import { navLinks, site } from "@/lib/data";
import { cn, EASE_IN_OUT, EASE_OUT_EXPO } from "@/lib/utils";

export function Navbar() {
  const { ready, scrollTo } = useApp();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 500);
    setScrolled(y > 30);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? "" : entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...navLinks.map((l) => l.href.slice(1))]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.removeProperty("overflow");
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
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
        <div className="container-x relative flex h-20 items-center justify-between gap-6">
          <a
            href="#top"
            onClick={go("#top")}
            className="group relative z-10 flex items-center gap-2.5"
            aria-label={`${site.shortName} — back to top`}
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
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="glass relative grid size-11 place-items-center rounded-full lg:hidden"
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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-0 z-40 flex flex-col bg-ink-2 px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.8, ease: EASE_IN_OUT }}
          >
            <div className="pointer-events-none absolute inset-0 grid-lines mask-fade-edges opacity-50" />
            <nav aria-label="Mobile" className="relative">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      onClick={go(link.href)}
                      className="flex items-baseline gap-4 py-1 text-[clamp(2.6rem,12vw,4rem)] font-semibold tracking-[-0.04em]"
                      initial={{ transform: "translateY(100%)" }}
                      animate={{ transform: "translateY(0%)" }}
                      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.25 + i * 0.06 }}
                    >
                      <span className="font-mono text-xs font-normal tracking-normal text-ember">0{i + 1}</span>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="relative mt-auto space-y-5"
              initial={{ opacity: 0, transform: "translateY(20px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.6 }}
            >
              <a href={`mailto:${site.email}`} className="block text-lg text-cream underline decoration-line-strong underline-offset-8">
                {site.email}
              </a>
              <div className="flex gap-3">
                <a href={site.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="glass grid size-11 place-items-center rounded-full">
                  <GitHub className="size-5" />
                </a>
                <a href={site.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="glass grid size-11 place-items-center rounded-full">
                  <LinkedIn className="size-[18px]" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
