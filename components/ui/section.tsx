import { cn } from "@/lib/utils";
import { RevealText, Reveal } from "@/components/ui/reveal";

export function SectionLabel({ index, children, className }: { index: string; children: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted", className)}>
      <span className="text-ember">({index})</span>
      <span className="size-1 rounded-full bg-muted/60" />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  intro,
  className,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-8">
        <Reveal>
          <SectionLabel index={index}>{label}</SectionLabel>
        </Reveal>
        <RevealText
          text={title}
          className="mt-6 text-[clamp(2.6rem,6.4vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
        />
      </div>
      {intro && (
        <Reveal className="lg:col-span-4 lg:pb-3" delay={0.15}>
          <p className="max-w-md text-base leading-relaxed text-muted lg:ml-auto">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
