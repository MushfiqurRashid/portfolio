"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, GitHub, LinkedIn, Mail, MapPin, Phone } from "@/components/icons";
import { PillLink } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section";
import { site } from "@/lib/data";
import { LocalTime } from "@/components/ui/local-time";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      window.location.href = `mailto:${site.email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  const channels = [
    { label: "Phone", value: site.phoneDisplay, href: `tel:${site.phone}`, icon: <Phone className="size-5" /> },
    { label: "LinkedIn", value: "in/mushfiqur-rashid", href: site.socials.linkedin, icon: <LinkedIn className="size-[18px]" /> },
    { label: "GitHub", value: "@MushfiqurRashid", href: site.socials.github, icon: <GitHub className="size-5" /> },
    {
      label: "Location",
      value: site.location,
      detail: (
        <>
          <LocalTime fallback="GMT+6" /> local time
        </>
      ),
      icon: <MapPin className="size-5" />,
    },
  ];

  return (
    <section id="contact" className="relative isolate overflow-hidden pb-20 pt-20 sm:pt-28 lg:pb-28 lg:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines mask-fade-edges opacity-60" />
        <div
          className="absolute -bottom-[45%] left-1/2 h-[90vmax] w-[110vmax] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(255,106,61,0.26), rgba(255,181,71,0.06) 55%, transparent)" }}
        />
      </div>

      <div className="container-x">
        <Reveal className="flex justify-center">
          <SectionLabel index="07">Contact</SectionLabel>
        </Reveal>

        <RevealText
          as="p"
          text="Have an idea?"
          className="mt-8 text-center text-[clamp(1.6rem,4vw,3.4rem)] font-medium tracking-[-0.04em] text-muted"
        />
        <RevealText
          text="Let's build it *together.*"
          delay={0.15}
          className="mx-auto max-w-6xl text-center text-[clamp(3rem,10vw,9.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]"
        />

        <Reveal delay={0.25}>
          <p className="mx-auto mt-8 max-w-xl text-center text-base leading-relaxed text-muted sm:text-lg">
            Open to product, technology and AI roles, collaborations and freelance builds. The fastest way to reach me
            is email.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-col items-center gap-6 sm:mt-16">
          <div className="flex max-w-full items-center gap-3 sm:gap-5">
            <a
              href={`mailto:${site.email}`}
              data-cursor="Write"
              className="group relative min-w-0 truncate text-[clamp(1.35rem,4.6vw,4.2rem)] font-semibold tracking-[-0.04em]"
            >
              {site.email}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-linear-to-r from-ember to-amber transition-transform duration-700 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
            </a>
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="glass grid size-11 place-items-center rounded-full transition-colors hover:border-ember/60 hover:text-ember sm:size-14"
              >
                {copied ? <Check className="size-5 text-emerald-400" /> : <Copy className="size-5" />}
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    role="status"
                    initial={{ opacity: 0, y: 6, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 6, x: "-50%" }}
                    className="absolute -top-10 left-1/2 whitespace-nowrap rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink"
                  >
                    Copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Magnetic>
              <PillLink href={`mailto:${site.email}`} icon={<Mail />}>
                Send an email
              </PillLink>
            </Magnetic>
            <Magnetic>
              <PillLink href={site.cv} variant="ghost" icon={<Download />} download>
                Download CV
              </PillLink>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-3 sm:mt-28 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => {
            const body = (
              <>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-full border border-line text-cream/85 transition-colors duration-500 group-hover:border-ember/50 group-hover:text-ember">
                    {c.icon}
                  </span>
                  {c.href && (
                    <ArrowUpRight className="size-5 text-muted transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-ember" />
                  )}
                </div>
                <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.22em] text-dim">{c.label}</p>
                <p className="mt-1.5 truncate text-base font-medium text-cream/90">{c.value}</p>
                {c.detail && <p className="mt-0.5 text-xs tabular-nums text-muted">{c.detail}</p>}
              </>
            );
            const cls =
              "group block h-full rounded-3xl border border-line bg-surface/70 p-6 transition-colors duration-500 hover:border-line-strong hover:bg-surface";
            return (
              <Reveal key={c.label} delay={i * 0.06}>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
                    {body}
                  </a>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
