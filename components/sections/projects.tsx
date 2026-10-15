import { ArrowUpRight, GitHub } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { swipeItem } from "@/components/ui/swipe-item";
import { SwipeRow } from "@/components/ui/swipe-row";
import { ProjectVisual } from "@/components/sections/project-visuals";
import { projects, site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeader
          index="04"
          label="Projects & research"
          title="AI & engineering *lab*"
          intro="Machine learning research, LLM systems and full stack builds: the experiments that sharpen the products."
        />

        <SwipeRow label="Projects" className="mt-10 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.08} className={cn(swipeItem.md, p.featured && "md:col-span-2")}>
              <a href={p.url} target="_blank" rel="noreferrer" data-cursor="Code" className="group/press block h-full">
                <SpotlightCard className="flex h-full flex-col p-5 sm:p-6">
                  <div
                    className={cn(
                      "relative h-44 overflow-hidden rounded-2xl border border-line bg-ink/70 p-4",
                      p.featured && "md:h-56",
                    )}
                  >
                    <div aria-hidden="true" className="absolute inset-0 grid-lines opacity-40 [background-size:24px_24px]" />
                    <div className="relative h-full">
                      <ProjectVisual type={p.visual} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em]">
                    <span className="text-ember">{p.category}</span>
                    {p.year && (
                      <>
                        <span className="size-1 rounded-full bg-line-strong" />
                        <span className="text-dim">{p.year}</span>
                      </>
                    )}
                  </div>
                  <h3
                    className={cn(
                      "mt-3 text-xl font-semibold leading-tight tracking-[-0.03em] sm:text-2xl",
                      p.featured && "md:text-3xl",
                    )}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{p.description}</p>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full border border-line bg-white/[0.02] px-2.5 py-0.5 text-[11.5px] text-cream/70">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover/spot:rotate-45 group-hover/spot:border-ember group-hover/spot:bg-ember group-hover/spot:text-ink">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </SpotlightCard>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.16} className={cn(swipeItem.md, "md:col-span-2 lg:col-span-1")}>
            <a href={site.socials.github} target="_blank" rel="noreferrer" data-cursor="GitHub" className="group/press block h-full">
              <SpotlightCard className="flex h-full min-h-64 flex-col justify-between bg-linear-to-br from-ember/[0.12] to-transparent p-6 sm:p-8">
                <GitHub className="size-12 text-cream/90 transition-transform duration-700 ease-out-expo group-hover/spot:-rotate-12 group-hover/spot:scale-110" />
                <div>
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Open source</p>
                  <p className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
                    More experiments
                    <br />
                    on <span className="font-serif font-normal italic text-gradient">GitHub</span>
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm text-cream/80">
                    @MushfiqurRashid
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/spot:rotate-45" />
                  </span>
                </div>
              </SpotlightCard>
            </a>
          </Reveal>
        </SwipeRow>
      </div>
    </section>
  );
}
