"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

const SPRING = { type: "spring" as const, stiffness: 100, damping: 20, mass: 0.5 };

export function MaskReveal({
  children,
  className,
  delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <span className={`relative inline-block overflow-hidden align-bottom ${className ?? ""}`}>
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "115%", rotate: 6 }}
        whileInView={{ y: "0%", rotate: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ ...SPRING, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function LineReveal({
  children,
  className,
  delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: [0.83, 0, 0.17, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ ...SPRING, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerText({
  text,
  className,
  delay = 0,
}: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre will-change-transform"
          initial={{ opacity: 0, y: 14, rotateX: -45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ ...SPRING, delay: delay + i * 0.04 }}
        >
          {w + (i < words.length - 1 ? " " : "")}
        </motion.span>
      ))}
    </span>
  );
}
