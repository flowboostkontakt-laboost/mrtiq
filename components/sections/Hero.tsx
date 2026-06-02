"use client";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

  // mouse parallax for text column
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

  const headlineShiftX = useTransform(smx, (v) => v * -10);

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

      {/* DRAGON SCENE — full-bleed behind text, anchored hard to the right */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute inset-y-0 right-0 left-[5%] lg:left-[30%] pointer-events-auto"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 30%, #000 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 30%, #000 100%)",
          }}
        >
          <DragonScene mouseX={smx} mouseY={smy} alignRight />
        </div>
      </div>

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
            style={{ x: headlineShiftX }}
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
                <MaskReveal>Zautomatyzujemy</MaskReveal>
              </span>
              <span className="block text-bone-mute">
                <MaskReveal delay={0.06}>Twój chaos.</MaskReveal>
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
              Koń Trojański Grupy KONIK przemyca kapitał z UE. Smok MRTiQ
              instaluje kompetencje i AI. Przesuń kursor nad Smoka — system
              właśnie się uruchamia.
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

/* ─────────────────────────────────────────────── */
/*  Dragon Scene with webm + interactive eye        */
/* ─────────────────────────────────────────────── */

function DragonScene({
  mouseX,
  mouseY,
  alignRight = false,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  alignRight?: boolean;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [awake, setAwake] = useState(false);
  const [pulses, setPulses] = useState<number[]>([]);

  // Cursor position relative to the scene (0–1)
  const localX = useMotionValue(0.65); // start near where dragon eye usually is
  const localY = useMotionValue(0.35);
  const sLocalX = useSpring(localX, {
    stiffness: 220,
    damping: 24,
    mass: 0.5,
  });
  const sLocalY = useSpring(localY, {
    stiffness: 220,
    damping: 24,
    mass: 0.5,
  });

  // Eye opening — animated by hover state
  const eyeOpen = useMotionValue(0.05);
  const sEyeOpen = useSpring(eyeOpen, {
    stiffness: 90,
    damping: 14,
    mass: 0.7,
  });

  useEffect(() => {
    eyeOpen.set(awake ? 1 : 0.06);
    const vid = videoRef.current;
    if (!vid) return;
    if (awake) {
      void vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [awake, eyeOpen]);

  // Compute eye position on the scene (right-center, where dragon head sits in webm)
  const sceneSize = useRef({ w: 0, h: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = sceneRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    sceneSize.current = { w: r.width, h: r.height };
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    localX.set(Math.max(0, Math.min(1, x)));
    localY.set(Math.max(0, Math.min(1, y)));
  };

  const onEnter = () => {
    setAwake(true);
    // emit a pulse ring
    setPulses((p) => [...p, Date.now()]);
  };

  const onLeave = () => {
    setAwake(false);
  };

  // Clean up old pulses
  useEffect(() => {
    if (!pulses.length) return;
    const t = setTimeout(() => {
      setPulses((p) => p.slice(1));
    }, 1100);
    return () => clearTimeout(t);
  }, [pulses]);

  // Transform local cursor -> pixel coords for the eye glow
  const glowX = useTransform(sLocalX, (v) => `${v * 100}%`);
  const glowY = useTransform(sLocalY, (v) => `${v * 100}%`);

  // Eye geometry — scale Y to simulate eyelid opening (from a thin slit to fully open)
  const eyeScaleY = useTransform(sEyeOpen, [0, 1], [0.06, 1]);
  const eyeOpacity = useTransform(sEyeOpen, [0, 0.2, 1], [0.4, 0.7, 1]);
  const irisScale = useTransform(sEyeOpen, [0, 1], [0.6, 1]);

  return (
    <div className="relative h-full min-h-[520px] sm:min-h-[680px] lg:min-h-[820px]">
      <div
        ref={sceneRef}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="group absolute inset-0"
        data-cursor="hover"
      >

        {/* Hover-triggered animation — plays only when cursor enters the stage */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          loop
          className="absolute inset-0 h-full w-full object-contain pointer-events-none"
          style={{ objectPosition: alignRight ? "right center" : "center" }}
        >
          <source src="/animacjahero.webm" type="video/webm" />
        </video>

        {/* Cursor-follow magenta spotlight */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY] as any,
              ([gx, gy]: any) =>
                `radial-gradient(180px 160px at ${gx} ${gy}, rgba(255,45,170,0.45), transparent 70%)`
            ),
            opacity: awake ? 0.95 : 0.0,
            transition: "opacity .35s cubic-bezier(.16,1,.3,1)",
          }}
        />

        {/* Pulsing rings emitted on enter */}
        <AnimatePresence>
          {pulses.map((id) => (
            <motion.span
              key={id}
              initial={{ opacity: 0.6, scale: 0.2 }}
              animate={{ opacity: 0, scale: 2.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-magenta-neon/70"
              style={{
                left: `${localX.get() * 100}%`,
                top: `${localY.get() * 100}%`,
                boxShadow: "0 0 60px 10px rgba(255,45,170,.45)",
              }}
            />
          ))}
        </AnimatePresence>

        {/* The dragon's eye — sits where cursor goes */}
        <motion.div
          className="pointer-events-none absolute"
          style={{
            left: glowX,
            top: glowY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: eyeOpacity,
          }}
        >
          <div className="relative h-24 w-48">
            {/* Eye outline (eyelid) */}
            <motion.div
              className="absolute inset-0 origin-center"
              style={{ scaleY: eyeScaleY }}
            >
              <svg
                viewBox="0 0 200 100"
                className="h-full w-full"
                style={{
                  filter: "drop-shadow(0 0 18px rgba(255,45,170,.85))",
                }}
              >
                {/* Eye almond shape */}
                <path
                  d="M5 50 Q 100 -10 195 50 Q 100 110 5 50 Z"
                  fill="rgba(10,10,10,.85)"
                  stroke="rgba(255,45,170,.95)"
                  strokeWidth="2"
                />
              </svg>
            </motion.div>

            {/* Iris + pupil */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2"
              style={{ scale: irisScale }}
            >
              <div className="relative h-full w-full">
                <div className="absolute inset-0 rounded-full bg-magenta-neon animate-pulse" style={{ boxShadow: "0 0 30px rgba(255,45,170,.9), inset 0 0 12px rgba(0,229,197,.4)" }} />
                <div className="absolute left-1/2 top-1/2 h-5 w-10 -translate-x-1/2 -translate-y-1/2 rounded-[8px] bg-ink" />
                <div className="absolute left-[35%] top-[28%] h-2.5 w-2.5 rounded-full bg-white/90" />
              </div>
            </motion.div>
          </div>
        </motion.div>


        {/* Status badge — flips when awake */}
        <div className="absolute right-4 top-4 rounded-full hairline-strong bg-ink/70 backdrop-blur px-3 py-2">
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${awake ? "bg-magenta-neon animate-pulse" : "bg-cyan-neon/60"}`}
            />
            <span
              className={`font-mono text-[9px] uppercase tracking-[0.28em] ${awake ? "text-magenta-neon" : "text-cyan-neon"}`}
            >
              {awake ? "Initialized" : "Dormant"}
            </span>
          </div>
          <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-bone-mute tabular-nums">
            {awake ? "PWR: 99.7%" : "PWR: 06.3%"}
          </div>
        </div>

        {/* hint */}
        <AnimatePresence>
          {!awake && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.8, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.6,
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[15%] font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute"
            >
              ↳ przesuń kursor nad Smoka
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  Decorative components                            */
/* ─────────────────────────────────────────────── */

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
