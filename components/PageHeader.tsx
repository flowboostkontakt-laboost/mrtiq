"use client";
import { ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Reveal, MaskReveal } from "./Reveal";

export default function PageHeader({
  index,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  meta,
  right,
  glow = "magenta",
}: {
  index: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  meta?: { k: string; v: string }[];
  right?: ReactNode;
  glow?: "magenta" | "cyan" | "yellow";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  return (
    <header
      ref={ref}
      className="relative pt-36 pb-16 lg:pt-48 lg:pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-cmyk opacity-80" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div className="scanlines" aria-hidden />
      {/* travelling scan */}
      <div className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent via-cyan-neon/12 to-transparent animate-scan pointer-events-none" />

      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10"
      >
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute">
            <span>{index}</span>
            <span className="h-px w-10 bg-white/20" />
            <span className="text-cyan-neon">{eyebrow}</span>
          </div>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h1 className="font-display font-semibold tracking-tightest-2 text-balance text-[clamp(2.6rem,7vw,7rem)] leading-[0.94]">
              <MaskReveal>{title}</MaskReveal>
              {titleAccent && (
                <>
                  <br />
                  <span className="text-bone-mute">
                    <MaskReveal delay={0.07}>{titleAccent}</MaskReveal>
                  </span>
                </>
              )}
            </h1>
            {subtitle && (
              <Reveal delay={0.2}>
                <p className="mt-7 max-w-2xl text-pretty text-[16px] leading-relaxed text-bone-mute">
                  {subtitle}
                </p>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.15} className="lg:col-span-4">
            {right ??
              (meta && (
                <div className="grid grid-cols-2 gap-4">
                  {meta.map((m, i) => (
                    <motion.div
                      key={m.k}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        delay: 0.2 + i * 0.06,
                      }}
                      className="rounded-2xl hairline bg-white/[0.02] backdrop-blur-md p-4"
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                        {m.k}
                      </div>
                      <div className="mt-1 text-bone font-display text-xl">{m.v}</div>
                    </motion.div>
                  ))}
                </div>
              ))}
          </Reveal>
        </div>
      </motion.div>
    </header>
  );
}
