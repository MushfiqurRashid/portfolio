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

        <div className="mt-10 border-t border-line sm:mt-20">
          {toolkit.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05} y={16}>
              <div className="group grid grid-cols-1 gap-4 border-b border-line py-6 sm:gap-5 sm:py-9 lg:grid-cols-12 lg:items-center">
                <div className="flex items-baseline gap-4 lg:col-span-4">
                  <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2 sm:text-3xl">
                    {group.title}
                  </h3>
                  <span className="hidden font-mono text-[10.5px] text-dim sm:inline">({group.items.length})</span>
                </div>
                <ul className="flex flex-wrap gap-1.5 sm:gap-2 lg:col-span-8">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 text-[13px] text-cream/75 sm:px-4 sm:py-2 sm:text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/60 hover:bg-ember/10 hover:text-cream"
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
