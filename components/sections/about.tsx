import { Counter } from "@/components/ui/counter";
import { Reveal, ScrollRevealParagraph } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { swipeItem } from "@/components/ui/swipe-item";
import { SwipeRow } from "@/components/ui/swipe-row";
import { aboutText, pillars, site, stats } from "@/lib/data";

const pillarIcons = [
  // Product: target / compass
  <svg key="p" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-12">
    <circle cx="24" cy="24" r="18" opacity="0.35" />
    <circle cx="24" cy="24" r="11" opacity="0.6" />
    <circle cx="24" cy="24" r="4" fill="currentColor" />
    <path d="M24 2v8M24 38v8M2 24h8M38 24h8" />
  </svg>,
  // Engineering: brackets
  <svg key="e" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-12">
    <rect x="4" y="8" width="40" height="32" rx="6" opacity="0.35" />
    <path d="M4 16h40" opacity="0.35" />
    <path d="m18 23-5 5 5 5M30 23l5 5-5 5M26 21l-4 14" />
  </svg>,
  // AI: neural graph
  <svg key="a" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-12">
    <path d="M10 12 24 24 38 12M10 36l14-12 14 12M10 12v24M38 12v24" opacity="0.35" />
    <circle cx="10" cy="12" r="3.5" fill="var(--color-ink)" />
    <circle cx="38" cy="12" r="3.5" fill="var(--color-ink)" />
    <circle cx="10" cy="36" r="3.5" fill="var(--color-ink)" />
    <circle cx="38" cy="36" r="3.5" fill="var(--color-ink)" />
    <circle cx="24" cy="24" r="5" fill="currentColor" />
  </svg>,
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          <Reveal className="lg:col-span-3">
            <SectionLabel index="01">About</SectionLabel>
          </Reveal>
          <div className="lg:col-span-9 lg:row-span-2">
            <ScrollRevealParagraph
              text={aboutText}
              className="text-[clamp(1.6rem,3.6vw,3.4rem)] font-medium leading-[1.14] tracking-[-0.035em]"
            />
          </div>
          {/* Phones: a compact fact list after the paragraph. Desktop: stacked under the label. */}
          <Reveal delay={0.1} className="lg:col-span-3 lg:row-start-2 lg:space-y-5">
            {[
              ["Based in", site.location],
              ["Education", "B.Sc. CSE, North South University"],
              ["Languages", "Bangla, English"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 border-t border-line py-3.5 last:border-b lg:block lg:py-0 lg:pt-4 lg:last:border-b-0"
              >
                <p className="shrink-0 font-mono text-[10.5px] uppercase tracking-[0.25em] text-dim">{k}</p>
                <p className="text-right text-sm text-cream/85 lg:mt-1.5 lg:text-left">{v}</p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 border-t border-line sm:mt-28 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`border-line py-8 pr-4 sm:py-10 ${i % 2 === 1 ? "border-l pl-5 sm:pl-8" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <p className="flex items-start text-[clamp(3.2rem,7vw,6.2rem)] font-semibold leading-none tracking-[-0.06em] tabular-nums">
                <Counter value={s.value} pad={s.pad} />
                <span className="ml-1 mt-[0.12em] text-[0.42em] font-medium tracking-[-0.03em] text-ember">{s.suffix}</span>
              </p>
              <p className="mt-4 max-w-[16rem] text-sm leading-snug text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {/* Pillars */}
        <SwipeRow label="Focus areas" until="lg" className="mt-14 sm:mt-20 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className={swipeItem.lg}>
              <SpotlightCard className="h-full p-6 sm:p-9">
                <div className="flex items-start justify-between">
                  <span className="text-ember transition-transform duration-700 ease-out-expo group-hover/spot:rotate-12 group-hover/spot:scale-110">
                    {pillarIcons[i]}
                  </span>
                  <span className="font-mono text-xs text-dim">0{i + 1}</span>
                </div>
                <h3 className="mt-10 text-2xl sm:mt-12 font-semibold tracking-[-0.03em] sm:text-[1.7rem]">{p.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.body}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.15em] text-cream/70">
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </SwipeRow>
      </div>
    </section>
  );
}
