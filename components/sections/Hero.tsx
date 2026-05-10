"use client";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import DragonMark from "@/components/DragonMark";
import Magnetic from "@/components/Magnetic";
import { MaskReveal } from "@/components/Reveal";

const TICKER = [
  "DOTACJE UE / 100%",
  "AI OPERATORS / TRAINED",
  "KONIK REVOS / DEPLOYED",
  "66 AGENTS / ONLINE",
  "180 PROCESSES / OPTIMIZED",
  "GRANT WRITERS / READY",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  // Parallax layers
  const dragonY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const dragonRot = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const blurFar = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const blurNear = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 2);
      my.set((e.clientY / h - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const dragonShiftX = useTransform(smx, (v) => v * 24);
  const dragonShiftY = useTransform(smy, (v) => v * 18);
  const headlineShiftX = useTransform(smx, (v) => v * -10);

  return (
    <section ref={ref} className="relative pt-36 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">
      <div className="absolute inset-0 bg-cmyk" aria-hidden />
      <motion.div className="absolute inset-0 bg-grid opacity-60" style={{ y: blurFar }} aria-hidden />
      <div className="scanlines" aria-hidden />
      <div className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent via-cyan-neon/15 to-transparent animate-scan pointer-events-none" />

      {/* parallax orbs */}
      <motion.div
        aria-hidden
        style={{ y: blurNear }}
        className="pointer-events-none absolute left-[-8%] top-[20%] h-72 w-72 rounded-full bg-magenta-neon/20 blur-[120px]"
      />
      <motion.div
        aria-hidden
        style={{ y: blurFar }}
        className="pointer-events-none absolute right-[-6%] top-[50%] h-80 w-80 rounded-full bg-cyan-neon/20 blur-[120px]"
      />

      <motion.div
        style={{ rotateX, scale, y, opacity, transformPerspective: 1400 }}
        className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          <motion.div style={{ x: headlineShiftX }} className="lg:col-span-7 will-change-transform">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
              className="inline-flex items-center gap-3 rounded-full hairline-strong bg-white/[0.03] backdrop-blur-md px-4 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon shadow-[0_0_12px_#00E5C5] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
                Digital Transformation Leaders
              </span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-bone-mute">| v.4.1</span>
            </motion.div>

            <h1 className="mt-7 font-display font-semibold tracking-tightest-2 text-balance text-[clamp(3rem,8vw,7.5rem)] leading-[0.9]">
              <span className="block"><MaskReveal>Zautomatyzujemy</MaskReveal></span>
              <span className="block text-bone-mute"><MaskReveal delay={0.06}>Twój chaos.</MaskReveal></span>
              <span className="block">
                <MaskReveal delay={0.12}>
                  <span className="relative inline-block">
                    <span className="text-glow-yellow text-electric-yellow">Unia</span>
                    <span className="absolute -inset-x-2 -bottom-1 h-px bg-electric-yellow/60" />
                  </span>{" "}
                  za to <span className="italic font-light tracking-tight">zapłaci.</span>
                </MaskReveal>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, type: "spring", stiffness: 80, damping: 18 }}
              className="mt-8 max-w-xl text-pretty text-[17px] leading-relaxed text-bone-mute"
            >
              Przestań palić własny budżet na testowanie technologii. Pozyskujemy
              dotacje, szkolimy Twój zespół na operatorów AI i wdrażamy
              nieludzką precyzję systemu <span className="text-bone">Konik RevOS</span>.
              Ty grasz jazz, my zajmujemy się resztą.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, type: "spring", stiffness: 80, damping: 18 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.4}>
                <Link
                  href="#protokol"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-electric-yellow px-7 py-4 text-[15px] font-semibold text-ink neon-yellow"
                >
                  <span className="h-2 w-2 rounded-full bg-ink animate-pulse" />
                  <Magnetic strength={0.3}>Sprawdź swój budżet z UE</Magnetic>
                  <Magnetic strength={0.5} className="font-mono text-xs opacity-70">↗</Magnetic>
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link
                  href="#alchemia"
                  className="group inline-flex items-center gap-3 rounded-full border border-magenta-neon/60 bg-magenta-neon/5 px-6 py-4 text-[14px] font-medium text-magenta-neon hover:bg-magenta-neon/10 transition-colors"
                >
                  Zobacz jak hakujemy wzrost
                  <span className="opacity-70 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 80, damping: 18 }}
              className="mt-14 grid grid-cols-3 gap-6 max-w-md"
            >
              <Stat k="100%" v="Dotacji UE" />
              <Stat k="180" v="Procesów RevOS" tone="cyan" />
              <Stat k="66" v="Agentów AI" tone="magenta" />
            </motion.div>
          </motion.div>

          {/* Dragon visual */}
          <motion.div
            style={{ x: dragonShiftX, y: dragonShiftY }}
            className="lg:col-span-5 relative h-[480px] lg:h-[640px] will-change-transform"
          >
            <motion.div style={{ y: dragonY, rotate: dragonRot }} className="absolute inset-0 grid place-items-center">
              <div className="relative h-full w-full">
                <div className="absolute inset-10 rounded-full bg-magenta-neon/20 blur-[80px] animate-breathe" />
                <div className="absolute inset-16 rounded-full bg-cyan-neon/15 blur-[100px] animate-breathe [animation-delay:1.5s]" />
                <DragonMark className="relative h-full w-full" />
                <div className="absolute inset-0 animate-spin12 pointer-events-none" aria-hidden>
                  <svg viewBox="0 0 600 800" className="h-full w-full">
                    <circle cx="300" cy="400" r="280" fill="none" stroke="rgba(0,229,197,0.25)" strokeWidth="1" strokeDasharray="2 14" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* HUD label */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 90, damping: 18 }}
              className="absolute right-4 bottom-4 hairline-strong rounded-2xl bg-ink/70 backdrop-blur-md px-4 py-3"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-cyan-neon">Subject</div>
              <div className="text-sm font-medium">Cyber Dragon · MRTIQ-01</div>
              <div className="font-mono text-[9px] tracking-[0.24em] text-bone-mute mt-1">PWR: 99.7%</div>
            </motion.div>

            {/* HUD top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 90, damping: 18 }}
              className="absolute left-4 top-4 hairline-strong rounded-2xl bg-ink/70 backdrop-blur-md px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-magenta-neon animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-magenta-neon">Tracking</span>
              </div>
              <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-bone tabular-nums">
                LAT: 52.2297 / LON: 21.0122
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ticker */}
      <div className="relative z-10 mt-20 border-y border-white/5 bg-ink/40 backdrop-blur-sm overflow-hidden">
        <div className="marquee-track py-4">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 px-12 font-mono text-[11px] uppercase tracking-[0.32em] text-bone-mute">
              {TICKER.map((t, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-magenta-neon" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-6 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute"
      >
        <span>Scroll</span>
        <span className="relative h-8 w-[1px] bg-white/15 overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-cyan-neon"
            animate={{ y: [-12, 28] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function Stat({ k, v, tone }: { k: string; v: string; tone?: "cyan" | "magenta" }) {
  const color = tone === "cyan" ? "text-cyan-neon" : tone === "magenta" ? "text-magenta-neon" : "text-bone";
  return (
    <div>
      <div className={`font-display text-3xl font-semibold tracking-tight ${color}`}>{k}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">{v}</div>
    </div>
  );
}
