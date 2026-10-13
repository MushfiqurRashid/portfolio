import Link from "next/link";
import { Sparkle } from "@/components/icons";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden="true" className="absolute inset-0 -z-10 grid-lines mask-fade-edges opacity-70" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 size-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,106,61,0.18), transparent 60%)" }}
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">Error 404</p>
      <h1 className="mt-6 flex items-center text-[clamp(6rem,22vw,16rem)] font-semibold leading-none tracking-[-0.07em]">
        4<Sparkle className="mx-[0.05em] size-[0.7em] animate-spin-slow text-ember" />4
      </h1>
      <p className="mt-6 max-w-sm text-muted">This page drifted out of orbit. Let&apos;s get you back to the work.</p>
      <Link
        href="/"
        className="mt-10 inline-flex h-12 items-center rounded-full bg-ember px-6 text-sm font-medium text-ink transition-colors hover:bg-cream"
      >
        Back to home
      </Link>
    </main>
  );
}
