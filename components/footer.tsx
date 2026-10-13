"use client";

import { useApp } from "@/components/providers";
import { ArrowUp, Sparkle } from "@/components/icons";
import { Magnetic } from "@/components/ui/magnetic";
import { navLinks, site } from "@/lib/data";
import { useCurrentYear } from "@/lib/hooks";

export function Footer() {
  const { scrollTo } = useApp();
  const year = useCurrentYear(2026);

  const linkCls =
    "group inline-flex items-center text-[15px] text-cream/75 transition-colors duration-300 hover:text-cream";

  return (
    <footer className="relative overflow-hidden border-t border-line pt-16 sm:pt-20">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Sparkle className="size-6 text-ember" />
            <p className="mt-6 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">
              Building products people <span className="font-serif font-normal italic text-gradient">actually use.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Designed &amp; built by {site.shortName} with Next.js, Motion and Tailwind CSS. Deployed on Vercel.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-dim">Navigate</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(l.href);
                    }}
                    className={linkCls}
                  >
                    <span className="h-px w-0 bg-ember transition-all duration-500 ease-out-expo group-hover:mr-2 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-dim">Connect</p>
            <ul className="mt-5 space-y-3">
              {[
                { label: "GitHub", href: site.socials.github },
                { label: "LinkedIn", href: site.socials.linkedin },
                { label: "Email", href: `mailto:${site.email}` },
                { label: "Download CV", href: site.cv },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    download={l.href === site.cv || undefined}
                    className={linkCls}
                  >
                    <span className="h-px w-0 bg-ember transition-all duration-500 ease-out-expo group-hover:mr-2 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none mt-16 select-none sm:mt-20">
        <p className="bg-linear-to-b from-cream/[0.16] via-cream/[0.06] to-transparent bg-clip-text text-center text-[16.2vw] font-semibold uppercase leading-[0.8] tracking-[-0.06em] text-transparent">
          {site.firstName}
        </p>
      </div>

      <div className="container-x relative flex flex-col-reverse items-start justify-between gap-6 border-t border-line py-7 sm:flex-row sm:items-center">
        <p className="text-xs text-muted">
          © {year} {site.name}. All rights reserved.
        </p>
        <Magnetic strength={0.35}>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted transition-colors hover:text-cream"
          >
            Back to top
            <span className="glass grid size-10 place-items-center rounded-full transition-colors duration-300 group-hover:border-ember/60 group-hover:text-ember">
              <ArrowUp className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
            </span>
          </button>
        </Magnetic>
      </div>
    </footer>
  );
}
