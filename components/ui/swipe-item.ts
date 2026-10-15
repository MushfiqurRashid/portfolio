// Kept apart from swipe-row.tsx: that file is a client module, and plain values exported from one
// reach Server Components as references rather than strings.

/** Width of each card while it sits in a <SwipeRow> (below the row's breakpoint). */
export const swipeItem = {
  md: "w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto",
  lg: "w-[84%] shrink-0 snap-start sm:w-[60%] md:w-[46%] lg:w-auto",
} as const;
