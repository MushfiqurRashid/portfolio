import { Sparkle, Trophy } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { recognition } from "@/lib/data";

const STARS = [
  [8, 14], [22, 64], [35, 28], [48, 82], [61, 12], [74, 52], [86, 30], [92, 74], [15, 88], [55, 44], [68, 90], [28, 46],
];

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">{children}</p>;
}

export function Recognition() {
  const { nasa, research, publication, education, extras } = recognition;
  return (
    <section id="recognition" className="relative py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeader
          index="05"
          label="Leadership & research"
          title="Recognition & *research*"
          intro="Leading teams under pressure, from a 48 hour NASA build to a two year study on how AI models represent Bangladeshi culture."
        />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-20 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* NASA */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <SpotlightCard className="flex h-full min-h-[440px] flex-col p-6 sm:min-h-[480px] sm:p-10" glow="255,181,71">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                {STARS.map(([x, y], i) => (
                  <span
                    key={i}
                    className="absolute size-[3px] rounded-full bg-cream/60 animate-pulse"
                    style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.37}s` }}
                  />
                ))}
                <div className="absolute -right-[30%] -top-[30%] aspect-square w-[95%]">
                  {[100, 74, 48].map((s, i) => (
                    <div
                      key={s}
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08] ${i % 2 ? "animate-spin-slower" : "animate-spin-slow"}`}
                      style={{ width: `${s}%`, height: `${s}%` }}
                    >
                      <span
                        className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{ background: ["#ffb547", "#7c5cff", "#ff6a3d"][i], boxShadow: `0 0 18px ${["#ffb547", "#7c5cff", "#ff6a3d"][i]}` }}
                      />
                    </div>
                  ))}
                  <div className="absolute left-1/2 top-1/2 size-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-ember to-amber opacity-90 shadow-[0_0_80px_rgba(255,106,61,0.55)]" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-amber/15 text-amber">
                  <Trophy className="size-5" />
                </span>
                <Label>{nasa.date}</Label>
              </div>

              <div className="mt-auto pt-12 sm:pt-16">
                <Label>Space Apps · Global</Label>
                <p className="mt-2 flex items-start text-[clamp(6rem,14vw,10.5rem)] font-semibold leading-[0.8] tracking-[-0.07em]">
                  2<span className="mt-[0.1em] text-[0.32em] tracking-[-0.03em] text-gradient">nd</span>
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{nasa.award}</p>
                <p className="mt-1 text-base text-cream/80">{nasa.title}</p>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">{nasa.body}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {nasa.meta.split(" · ").map((m) => (
                    <li
                      key={m}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cream/75"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* LLM research */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <SpotlightCard className="grid grid-cols-1 h-full gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8" glow="124,92,255">
              <div>
                <Label>
                  {research.date} · {research.meta}
                </Label>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{research.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{research.body}</p>
              </div>
              <pre
                aria-hidden="true"
                className="hidden self-center rounded-2xl border border-line bg-ink/70 p-4 font-mono text-[11px] leading-relaxed text-cream/60 transition-transform duration-700 ease-out-expo group-hover/spot:-translate-y-1 sm:block"
              >
                <span className="text-violet">prompt</span>_142 = {"{"}
                {"\n"}  <span className="text-amber">&quot;culture&quot;</span>: &quot;Pohela Boishakh&quot;,
                {"\n"}  <span className="text-amber">&quot;task&quot;</span>: &quot;txt2img&quot;,
                {"\n"}  <span className="text-amber">&quot;eval&quot;</span>: &quot;representation&quot;
                {"\n"}{"}"}  <span className="text-dim"># 1 of 200+</span>
              </pre>
            </SpotlightCard>
          </Reveal>

          {/* Publication */}
          <Reveal className="md:col-span-2" delay={0.12}>
            <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Label>Publication</Label>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-amber">
                  <span className="size-1.5 animate-pulse rounded-full bg-amber" />
                  {publication.status}
                </span>
              </div>
              <p className="mt-6 font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] italic leading-snug text-cream/90">
                &ldquo;{publication.title}&rdquo;
              </p>
            </SpotlightCard>
          </Reveal>

          {/* Education */}
          <Reveal className="md:col-span-2" delay={0.08}>
            <SpotlightCard className="flex h-full items-center gap-5 p-6 sm:gap-6 sm:p-8">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.03] text-ember">
                <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" />
                  <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5M22 9.5V15" />
                </svg>
              </span>
              <div>
                <Label>Education · {education.year}</Label>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] sm:text-xl">{education.degree}</h3>
                <p className="mt-1 text-sm text-muted">{education.school}</p>
              </div>
            </SpotlightCard>
          </Reveal>

          {extras.map((e, i) => (
            <Reveal key={e.title} delay={0.12 + i * 0.06}>
              <SpotlightCard className="flex h-full flex-col justify-between gap-6 p-6 sm:gap-8 sm:p-7">
                <Sparkle className="size-5 text-ember transition-transform duration-700 ease-out-expo group-hover/spot:rotate-90" />
                <div>
                  <Label>
                    {e.detail}
                    {e.year && ` · ${e.year}`}
                  </Label>
                  <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.02em]">{e.title}</h3>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
