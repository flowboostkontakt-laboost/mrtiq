"use client";
import { ReactNode, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Reveal, MaskReveal } from "./Reveal";
import DragonMark from "./DragonMark";

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
  // Scroll-driven cinematic exit (same language as homepage hero)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const dragonY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const dragonRotate = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const dragonScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Mouse parallax on the dragon
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });
  const dragonX = useTransform(smx, (v) => v * 26);
  const dragonShiftY = useTransform(smy, (v) => v * 18);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  const glowRGB =
    glow === "cyan" ? "0,229,197" : glow === "yellow" ? "255,230,0" : "255,45,170";

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

      {/* Dragon signature — parallax + scroll, masked so it never fights the copy */}
      <motion.div
        aria-hidden
        style={{ x: dragonX, y: dragonShiftY }}
        className="pointer-events-none absolute right-[-14%] sm:right-[-8%] top-1/2 -translate-y-1/2 w-[70%] sm:w-[54%] max-w-[680px] will-change-transform"
      >
        <motion.div
          style={{ y: dragonY, rotate: dragonRotate, scale: dragonScale }}
          className="relative"
        >
          <div
            className="absolute inset-[12%] rounded-full blur-[110px] animate-breathe"
            style={{ background: `rgba(${glowRGB},0.20)` }}
          />
          <div
            className="opacity-[0.22] sm:opacity-[0.3]"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, #000 38%, #000 100%)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, #000 38%, #000 100%)",
            }}
          >
            <DragonMark className="h-full w-full" glow={false} />
          </div>
        </motion.div>
      </motion.div>

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
