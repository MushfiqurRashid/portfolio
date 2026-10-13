"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Preloader } from "@/components/preloader";

type ScrollTarget = string | number | HTMLElement;

type AppContextValue = {
  /** True once the preloader has lifted — entrance animations key off this. */
  ready: boolean;
  scrollTo: (target: ScrollTarget, opts?: { offset?: number; immediate?: boolean }) => void;
};

const AppContext = createContext<AppContextValue>({ ready: true, scrollTo: () => {} });

function settle() {
  document.documentElement.setAttribute("data-settled", "");
}

export const useApp = () => useContext(AppContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Tells the CSS safety net in globals.css that JavaScript is in control.
    document.documentElement.setAttribute("data-hydrated", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, autoRaf: true, anchors: true });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Hold the page still while the preloader is on screen.
  useEffect(() => {
    if (ready) {
      lenisRef.current?.start();
      document.documentElement.style.removeProperty("overflow");
    } else {
      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [ready]);

  // Once the intro is done, lay out the deferred sections in idle time (see globals.css).
  useEffect(() => {
    if (!ready) return;
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(settle, { timeout: 500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(settle, 300);
    return () => clearTimeout(id);
  }, [ready]);

  const scrollTo = useCallback<AppContextValue["scrollTo"]>((target, opts) => {
    // Section positions must be final before measuring a scroll target.
    settle();
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(target, { offset: opts?.offset ?? 0, immediate: opts?.immediate, duration: 1.4 });
      return;
    }
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
      return;
    }
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleDone = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, scrollTo }), [ready, scrollTo]);

  return (
    <MotionConfig reducedMotion="user">
      <AppContext.Provider value={value}>
        <Preloader onDone={handleDone} />
        {children}
      </AppContext.Provider>
    </MotionConfig>
  );
}
