"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MaskReveal } from "@/components/Reveal";

const DEPTS = [
  { code: "01", name: "AI & Automatyzacja", tone: "cyan" },
  { code: "02", name: "Data & BI", tone: "cyan" },
  { code: "03", name: "Marketing Intelligence", tone: "magenta" },
  { code: "04", name: "Sales Masterclass", tone: "cyan" },
  { code: "05", name: "Biznes & Foundation", tone: "yellow" },
  { code: "06", name: "Zarządzanie & Strategia", tone: "cyan" },
  { code: "07", name: "Prawo & Compliance", tone: "magenta" },
  { code: "08", name: "HR & Rekrutacja", tone: "magenta" },
  { code: "09", name: "Ochrona Danych", tone: "cyan" },
];

export default function AcademyDragon() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} className="relative" style={{ height: "360vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cmyk opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-grid-fine opacity-40" aria-hidden />
        <div className="scanlines" aria-hidden />

        {/* heading rail */}
        <div className="absolute inset-x-0 top-0 z-20 mx-auto max-w-[1400px] px-6 lg:px-10 pt-28 lg:pt-32">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
                [02] · Matryca Szkoleń · 9 departamentów
              </div>
              <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4.4rem)] leading-[0.96]">
                <MaskReveal>Smok rozpościera skrzydła.</MaskReveal>
              </h2>
            </div>
            <Progress progress={scrollYProgress} />
          </div>
        </div>

        {/* Scroll-scrubbed dragon */}
        <DragonScrub progress={scrollYProgress} />

        {/* Orbiting department labels — illuminate with scroll */}
        <DeptOrbits progress={scrollYProgress} />

        {/* HUD bottom */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/5 bg-ink/40 backdrop-blur">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
            <span>The Academy Matrix</span>
            <span className="hidden md:inline">Każdy segment skrzydła = jeden departament</span>
            <span className="text-cyan-neon flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon animate-pulse" />
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function DragonScrub({ progress }: { progress: MotionValue<number> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetRef = useRef(0);
  const lastRef = useRef(-1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.load();
    const onMeta = () => {
      durationRef.current = vid.duration || 0;
      try { vid.currentTime = 0.0001; } catch {}
    };
    vid.addEventListener("loadedmetadata", onMeta);
    if (vid.readyState >= 1) onMeta();
    return () => vid.removeEventListener("loadedmetadata", onMeta);
  }, []);

  useEffect(() => {
    const LERP = 0.14;
    let cur = 0;
    const tick = () => {
      const vid = videoRef.current;
      const d = durationRef.current;
      if (vid && d > 0) {
        const t = targetRef.current;
        const delta = t - cur;
        cur = Math.abs(delta) > 0.012 ? cur + delta * LERP : t;
        if (Math.abs(cur - lastRef.current) > 0.018) {
          try { vid.currentTime = cur; lastRef.current = cur; } catch {}
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      const d = durationRef.current;
      if (d) targetRef.current = Math.max(0, Math.min(v * d, d - 0.05));
    });
    return unsub;
  }, [progress]);

  const scale = useTransform(progress, [0, 0.5, 1], [0.96, 1.06, 1.0]);
  const x = useTransform(progress, [0.4, 0.45, 0.5, 0.55, 0.6], [0, -5, 5, -3, 0]);

  return (
    <motion.div style={{ scale, x }} className="absolute inset-0 z-10 will-change-transform grid place-items-center">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="h-[70%] w-full object-contain"
      >
        <source src="/sekcja2.webm" type="video/webm" />
        <source src="/hero.webm" type="video/webm" />
      </video>
    </motion.div>
  );
}

function DeptOrbits({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-[15] pointer-events-none">
      <div className="relative mx-auto h-full max-w-[1200px]">
        {DEPTS.map((d, i) => (
          <DeptChip key={d.code} dept={d} index={i} total={DEPTS.length} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function DeptChip({
  dept, index, total, progress,
}: { dept: typeof DEPTS[number]; index: number; total: number; progress: MotionValue<number> }) {
  // Each chip lights up in its own scroll window, then dims
  const start = 0.1 + (index / total) * 0.8;
  const opacity = useTransform(
    progress,
    [start - 0.06, start, start + 0.08, start + 0.16],
    [0.12, 1, 1, 0.35]
  );
  const yShift = useTransform(progress, [start - 0.06, start], [14, 0]);

  // Position chips around the dragon (left/right alternating, vertical spread)
  const side = index % 2 === 0 ? "left" : "right";
  const row = Math.floor(index / 2);
  const top = 24 + row * 14; // %
  const accent =
    dept.tone === "cyan" ? "text-cyan-neon border-cyan-neon/40" :
    dept.tone === "magenta" ? "text-magenta-neon border-magenta-neon/40" :
    "text-electric-yellow border-electric-yellow/40";

  return (
    <motion.div
      style={{ opacity, y: yShift, top: `${top}%` }}
      className={`absolute ${side === "left" ? "left-2 sm:left-6 lg:left-0" : "right-2 sm:right-6 lg:right-0"} max-w-[44%]`}
    >
      <div className={`inline-flex items-center gap-3 rounded-full hairline-strong bg-ink/70 backdrop-blur-md px-4 py-2.5 ${accent}`}>
        <span className="font-mono text-[10px] tracking-[0.24em]">[{dept.code}]</span>
        <span className="font-display text-[13px] sm:text-[15px] font-medium tracking-tight text-bone whitespace-nowrap">
          {dept.name}
        </span>
        <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "currentColor" }} />
      </div>
    </motion.div>
  );
}

function Progress({ progress }: { progress: MotionValue<number> }) {
  const w = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="hidden lg:flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">scroll</span>
      <div className="h-px w-28 bg-white/10 relative overflow-hidden">
        <motion.div style={{ width: w }} className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-neon via-magenta-neon to-electric-yellow" />
      </div>
    </div>
  );
}
