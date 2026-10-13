"use client";

import { site } from "@/lib/data";
import { useLocalTime } from "@/lib/hooks";

/** Live Dhaka time. Isolated so the once-a-minute tick only re-renders this span. */
export function LocalTime({ className, fallback = "--:--" }: { className?: string; fallback?: string }) {
  const time = useLocalTime(site.timezone);
  return <span className={className}>{time || fallback}</span>;
}
