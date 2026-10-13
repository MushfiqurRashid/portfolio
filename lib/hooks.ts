"use client";

import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

const subscribeEverySecond = (onChange: () => void) => {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
};

const formatters = new Map<string, Intl.DateTimeFormat>();

function formatTime(timeZone: string) {
  let formatter = formatters.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone });
    formatters.set(timeZone, formatter);
  }
  return formatter.format(new Date());
}

/** Live wall-clock time in a given IANA timezone, e.g. "15:47". Empty during SSR. */
export function useLocalTime(timeZone: string) {
  return useSyncExternalStore(
    subscribeEverySecond,
    () => formatTime(timeZone),
    () => "",
  );
}

const noopSubscribe = () => () => {};

export function useCurrentYear(fallback: number) {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
}
