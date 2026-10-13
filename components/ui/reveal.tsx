"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";

/** Splits text on whitespace; words between *asterisks* are flagged as accents. */
export function parseAccents(text: string) {
  let open = false;
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((raw) => {
      let word = raw;
      let accent = open;
      if (word.startsWith("*")) {
        accent = true;
        open = true;
        word = word.slice(1);
      }
      if (word.includes("*")) {
        word = word.replace("*", "");
        open = false;
      }
      return { word, accent };
    });
}

const accentClass = "font-serif font-normal italic tracking-normal text-gradient pr-[0.06em]";

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Heading whose words rise out of a mask when scrolled into view. */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const words = parseAccents(text);
  return (
    <Tag className={className}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ staggerChildren: 0.05, delayChildren: delay }}
      >
        {words.map(({ word, accent }, i) => (
          <span key={i} className="inline-flex overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className={cn("inline-block", accent && accentClass)}
              variants={{ hidden: { transform: "translateY(110%)" }, show: { transform: "translateY(0%)" } }}
              transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

function ScrollWord({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <motion.span style={{ opacity }} className={cn("inline-block", accent && accentClass)}>
      {children}
    </motion.span>
  );
}

/** Paragraph that "reads itself" — each word brightens as you scroll through it. */
export function ScrollRevealParagraph({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = parseAccents(text);

  return (
    <p ref={ref} className={className}>
      {words.map(({ word, accent }, i) => (
        <span key={i}>
          {reduce ? (
            <span className={cn(accent && accentClass)}>{word}</span>
          ) : (
            <ScrollWord
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 1.5) / words.length)]}
              accent={accent}
            >
              {word}
            </ScrollWord>
          )}{" "}
        </span>
      ))}
    </p>
  );
}
