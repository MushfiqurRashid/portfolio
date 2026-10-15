"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight, Plus } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section";
import { experience } from "@/lib/data";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeader
          index="03"
          label="Experience"
          title="Where I've *built* & led"
          intro="From cofounding an agritech startup to leading product and technology for a capital markets group."
        />

        <div className="mt-10 border-t border-line sm:mt-20">
          {experience.map((job, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={job.company} delay={i * 0.08} y={20}>
                <div className="group relative border-b border-line">
                  {/* Hover wash */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute inset-0 origin-bottom bg-linear-to-b from-white/[0.035] to-white/[0.01] transition-transform duration-700 ease-out-expo",
                      isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`job-${i}`}
                    className="relative grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-1 py-6 text-left transition-[scale] duration-300 ease-out-expo active:scale-[0.99] sm:gap-x-6 sm:px-4 sm:py-9 lg:grid-cols-12"
                  >
                    <span className="col-span-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted lg:col-span-3 lg:block">
                      {job.period}
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full lg:ml-3 bg-emerald-400/10 px-2 py-0.5 text-[9.5px] text-emerald-300">
                          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                          Now
                        </span>
                      )}
                    </span>
                    <span className="col-start-1 row-start-2 text-[clamp(1.9rem,4vw,3.6rem)] font-semibold leading-none tracking-[-0.045em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2 lg:col-span-5 lg:col-start-4 lg:row-start-1">
                      {job.company}
                    </span>
                    <span className="col-start-1 row-start-3 text-sm text-cream/75 sm:text-base lg:col-span-3 lg:col-start-9 lg:row-start-1">
                      {job.role}
                    </span>
                    <span
                      className={cn(
                        "col-start-2 row-span-3 row-start-1 grid size-11 place-items-center justify-self-end rounded-full border transition-all duration-500 ease-out-expo sm:size-12 lg:col-span-1 lg:col-start-12 lg:row-span-1",
                        isOpen ? "rotate-45 border-ember bg-ember text-ink" : "border-line-strong text-cream group-hover:border-cream",
                      )}
                    >
                      <Plus className="size-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`job-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                        className="relative overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-6 px-1 pb-9 sm:gap-8 sm:px-4 sm:pb-10 lg:grid-cols-12">
                          <div className="lg:col-span-3">
                            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-dim">{job.type}</p>
                            {job.url && (
                              <a
                                href={job.url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-3 inline-flex items-center gap-1.5 text-sm text-cream/80 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
                              >
                                {new URL(job.url).hostname}
                                <ArrowUpRight className="size-3.5" />
                              </a>
                            )}
                          </div>
                          <div className="lg:col-span-8 lg:col-start-4">
                            <p className="max-w-2xl text-base leading-relaxed text-cream/90 sm:text-lg">{job.summary}</p>
                            <ul className="mt-6 grid gap-3">
                              {job.highlights.map((h, j) => (
                                <motion.li
                                  key={h}
                                  initial={{ opacity: 0, transform: "translateX(-12px)" }}
                                  animate={{ opacity: 1, transform: "translateX(0px)" }}
                                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.1 + j * 0.05 }}
                                  className="flex gap-3.5 text-[15px] leading-relaxed text-muted"
                                >
                                  <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ember" />
                                  {h}
                                </motion.li>
                              ))}
                            </ul>
                            <div className="mt-7 flex flex-wrap gap-2">
                              {job.tags.map((t) => (
                                <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-cream/70">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
