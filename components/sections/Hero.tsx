"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

// Old OS silhouette decorations
const OS_LINES = [
  "C:\\> SYS\\AUTOEXEC.BAT — loading legacy stack...",
  "MS-DOS 6.22 — 640K conventional memory",
  "WINDOWS 3.11 / FOR WORKGROUPS  [INACTIVE]",
  "NETWARE 3.12 — IPX/SPX bound on NIC#0",
  "OS/2 WARP — boot sector flagged",
  "AIX 4.3.3 — diagnostics paused",
  "$ sudo apt-get install ./mrtiq.deb",
  "[ KERNEL ] revos-cyber.bin — awaiting init",
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 min-h-[100svh] overflow-hidden"
    >
      <div className="absolute inset-0 bg-cmyk" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div className="scanlines" aria-hidden />

      {/* Old OS silhouettes — vintage legacy stack ghosts */}
      <OldOSBackdrop />

      {/* moving scan line */}
      <div className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent via-cyan-neon/15 to-transparent animate-scan pointer-events-none" />

      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          transformPerspective: 1400,
        }}
        className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pointer-events-none"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* TEXT */}
          <motion.div
            className="lg:col-span-7 will-change-transform pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                delay: 0.1,
              }}
              className="inline-flex items-center gap-3 rounded-full hairline-strong bg-white/[0.03] backdrop-blur-md px-4 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon shadow-[0_0_12px_#00E5C5] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
                Diagnostyka · System Initialization
              </span>
              <span className="font-mono text-[10px] tracking-[0.24em] text-bone-mute">
                | v.4.1
              </span>
            </motion.div>

            <h1 className="mt-7 font-display font-semibold tracking-tightest-2 text-balance text-[clamp(2.5rem,6.2vw,5.8rem)] leading-[0.92]">
              <span className="block">
                <MaskReveal>Twój chaos,</MaskReveal>
              </span>
              <span className="block text-bone-mute">
                <MaskReveal delay={0.06}>nasz system.</MaskReveal>
              </span>
              <span className="block">
                <MaskReveal delay={0.12}>
                  <span className="relative inline-block">
                    <span className="text-glow-yellow text-electric-yellow">
                      Unia
                    </span>
                    <span className="absolute -inset-x-2 -bottom-1 h-px bg-electric-yellow/60" />
                  </span>{" "}
                  za to{" "}
                  <span className="italic font-light tracking-tight">
                    zapłaci.
                  </span>
                </MaskReveal>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              className="mt-8 max-w-xl text-pretty text-[17px] leading-relaxed text-bone-mute"
            >
              Twoi konkurenci już składają wnioski. Pule PARP i KFS maleją z
              każdym naborem. W 48 godzin sprawdzamy ile konkretnych złotych
              leży na stole — i zamieniamy je w AI, procesy i wzrost sprzedaży.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.55,
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={0.4}>
                <Link
                  href="#protokol"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-electric-yellow px-7 py-4 text-[15px] font-semibold text-ink neon-yellow"
                >
                  <span className="h-2 w-2 rounded-full bg-ink animate-pulse" />
                  <Magnetic strength={0.3}>Sprawdź swój budżet z UE</Magnetic>
                  <Magnetic
                    strength={0.5}
                    className="font-mono text-xs opacity-70"
                  >
                    ↗
                  </Magnetic>
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link
                  href="#alchemia"
                  className="group inline-flex items-center gap-3 rounded-full border border-magenta-neon/60 bg-magenta-neon/5 px-6 py-4 text-[14px] font-medium text-magenta-neon hover:bg-magenta-neon/10 transition-colors"
                >
                  Zobacz jak hakujemy wzrost
                  <span className="opacity-70 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              className="mt-14 grid grid-cols-3 gap-6 max-w-md"
            >
              <Stat k="100%" v="Dotacji UE" />
              <Stat k="180" v="Procesów RevOS" tone="cyan" />
              <Stat k="66" v="Agentów AI" tone="magenta" />
            </motion.div>
          </motion.div>

          {/* Right column — leave space for dragon visible behind */}
          <div className="hidden lg:block lg:col-span-5" aria-hidden />
        </div>
      </motion.div>

      {/* ticker */}
      <div className="relative z-10 mt-16 lg:mt-20 border-y border-white/5 bg-ink/40 backdrop-blur-sm overflow-hidden">
        <div className="marquee-track py-4">
          {Array.from({ length: 2 }).map((_, k) => (
            <div
              key={k}
              className="flex items-center gap-12 px-12 font-mono text-[11px] uppercase tracking-[0.32em] text-bone-mute"
            >
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

function OldOSBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]"
    >
      <div className="absolute left-6 top-32 max-w-md space-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone">
        {OS_LINES.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      {/* mock Win 3.11 panels */}
      <div className="absolute right-10 top-40 w-64 hairline-strong rounded-sm bg-white/[0.04] p-2">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em]">
          <span>Diagnostics</span>
          <span>_ ◻ ✕</span>
        </div>
        <div className="mt-2 h-20 bg-grid-fine" />
      </div>
      <div className="absolute left-[12%] bottom-24 w-48 hairline-strong rounded-sm bg-white/[0.04] p-2">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em]">
          <span>RevOS · init</span>
          <span>_ ◻ ✕</span>
        </div>
        <div className="mt-2 h-16 bg-grid-fine" />
      </div>
    </div>
  );
}

function Stat({
  k,
  v,
  tone,
}: {
  k: string;
  v: string;
  tone?: "cyan" | "magenta";
}) {
  const color =
    tone === "cyan"
      ? "text-cyan-neon"
      : tone === "magenta"
        ? "text-magenta-neon"
        : "text-bone";
  return (
    <div>
      <div className={`font-display text-3xl font-semibold tracking-tight ${color}`}>
        {k}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
        {v}
      </div>
    </div>
  );
}
