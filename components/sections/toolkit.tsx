import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section";
import { toolkit } from "@/lib/data";

export function Toolkit() {
  return (
    <section id="toolkit" className="relative py-20 sm:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeader
          index="06"
          label="Toolkit"
          title="The *toolkit*"
          intro="What I reach for to take an idea from a requirements doc to a monitored production deployment."
        />

        <div className="mt-14 border-t border-line sm:mt-20">
          {toolkit.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05} y={16}>
              <div className="group grid grid-cols-1 gap-5 border-b border-line py-7 sm:py-9 lg:grid-cols-12 lg:items-center">
                <div className="flex items-baseline gap-4 lg:col-span-4">
                  <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2 sm:text-3xl">
                    {group.title}
                  </h3>
                  <span className="font-mono text-[10.5px] text-dim">({group.items.length})</span>
                </div>
                <ul className="flex flex-wrap gap-2 lg:col-span-8">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-cream/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/60 hover:bg-ember/10 hover:text-cream"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
