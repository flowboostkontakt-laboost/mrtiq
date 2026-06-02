"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { MaskReveal } from "@/components/Reveal";

const DragonCanvas = dynamic(() => import("@/components/DragonCanvas"), { ssr: false });

const PILLARS = [
  {
    code: "01",
    tag: "MANA",
    accent: { text: "text-magenta-neon", glow: "rgba(255,45,170,.55)", grad: "from-magenta-neon/40 via-magenta-neon/10 to-transparent" },
    title: "Pozyskujemy amunicję.",
    body:
      "Transformacja kosztuje. Ale nie musi kosztować Ciebie. Zgarniamy z rynku dotacje szkoleniowe i cyfrowe dla Twojej firmy. To nasz Koń Trojański.",
    chips: ["PARP", "KFS", "BUR", "DIH", "Polska Wschodnia"],
    metric: "100%",
    metricLabel: "Możliwego dofinansowania",
    sub: "EU Funding Protocol",
  },
  {
    code: "02",
    tag: "SKILL",
    accent: { text: "text-cyan-neon", glow: "rgba(0,229,197,.55)", grad: "from-cyan-neon/40 via-cyan-neon/10 to-transparent" },
    title: "Tworzymy Operatorów, nie wyrobników.",
    body:
      "AI nie zabierze pracy Twoim ludziom. Zabierze ją firma, której ludzie potrafią obsługiwać AI. Twarde szkolenia z AI, PR i marketingu.",
    chips: ["Prompt Eng.", "n8n", "Clay", "GA4", "Data Storytelling"],
    metric: "9",
    metricLabel: "Wymiarów rozwoju",
    sub: "The Adaptation Protocol",
  },
  {
    code: "03",
    tag: "GOLEM",
    accent: { text: "text-electric-yellow", glow: "rgba(255,230,0,.55)", grad: "from-electric-yellow/40 via-electric-yellow/10 to-transparent" },
    title: "Wdrażamy Konik RevOS.",
    body:
      "Kiedy umysły są gotowe, instalujemy maszynę. 66 Agentów AI 24/7 — generowanie leadów, cold mailing, zamykanie sprzedaży. Inżynieria z Konik Systems.",
    chips: ["66 Agentów AI", "180 Procesów", "RevOps", "Auto-Sales"],
    metric: "24/7",
    metricLabel: "Cyfrowa armia",
    sub: "Konik RevOS",
  },
];

export default function ValueLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 3 panels → translate the track from 0% to -66.66%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.667%"]);
  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Aktualna faza (0/1/2) — do dynamicznego HUD na dole
  const [stage, setStage] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
    setStage((cur) => (cur === next ? cur : next));
  });
  const STAGES = [
    { label: "ETAP 01 — Pozyskujemy MANĘ", color: "text-magenta-neon" },
    { label: "ETAP 02 — Trenujemy Operatorów", color: "text-cyan-neon" },
    { label: "ETAP 03 — Wdrażamy Golema", color: "text-electric-yellow" },
  ] as const;

  return (
    <section id="alchemia" ref={ref} className="relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cmyk opacity-70" aria-hidden />
        <div className="absolute inset-0 bg-grid-fine opacity-50" aria-hidden />
        <div className="scanlines" aria-hidden />

        {/* ambient gradient that shifts with scroll */}
        <BackdropAura progress={scrollYProgress} />

        {/* 3D smok (R3F) + nakładki MANA / SKILL / GOLEM */}
        <DragonStage progress={scrollYProgress} />

        {/* Heading rail */}
        <div className="absolute inset-x-0 top-0 z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 lg:pt-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
                [02] · Drabina Wartości
              </div>
              <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.5rem,3.2vw,2.8rem)] leading-[0.98]">
                <MaskReveal>Alchemia Biznesu.</MaskReveal>{" "}
                <span className="text-bone-mute">
                  <MaskReveal delay={0.06}>3 kroki do dominacji.</MaskReveal>
                </span>
              </h2>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">scroll</span>
              <div className="h-px w-24 bg-white/10 relative overflow-hidden">
                <motion.div
                  style={{ width: progressBar }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-magenta-neon via-cyan-neon to-electric-yellow"
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute tabular-nums">01 · 02 · 03</span>
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="absolute inset-x-0 top-0 z-10 flex h-screen items-center will-change-transform"
        >
          {PILLARS.map((p, i) => (
            <PillarPanel key={p.code} pillar={p} progress={scrollYProgress} index={i} />
          ))}
        </motion.div>

        {/* HUD bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/5 bg-ink/40 backdrop-blur">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
            <span>System: Active</span>
            <span className={`hidden md:inline transition-colors duration-500 ${STAGES[stage].color}`}>
              {STAGES[stage].label}
            </span>
            <span className={`flex items-center gap-2 transition-colors duration-500 ${STAGES[stage].color}`}>
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                stage === 0 ? "bg-magenta-neon" : stage === 1 ? "bg-cyan-neon" : "bg-electric-yellow"
              }`} />
              Live · {(stage + 1).toString().padStart(2, "0")}/03
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────── */
/*  DRAGON STAGE — scroll-scrubbed webm + overlays   */
/* ─────────────────────────────────────────────── */

function DragonStage({ progress }: { progress: MotionValue<number> }) {
  // Panel-active opacities — bramki dopasowane do granic paneli (0–0.33 / 0.33–0.66 / 0.66–1)
  const manaActive = useTransform(progress, [0, 0.05, 0.30, 0.40], [0, 1, 1, 0]);
  const skillActive = useTransform(progress, [0.30, 0.40, 0.63, 0.73], [0, 1, 1, 0]);
  const golemActive = useTransform(progress, [0.63, 0.73, 0.97, 1], [0, 1, 1, 0]);

  // Subtle parallax — dragon drifts right as scroll progresses
  const dragonX = useTransform(progress, [0, 1], ["0%", "-6%"]);
  const dragonScale = useTransform(progress, [0, 0.5, 1], [1, 1.06, 1.12]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <motion.div
        className="absolute inset-y-0 right-0 left-[40%] lg:left-[52%]"
        style={{
          x: dragonX,
          scale: dragonScale,
          // miękka „latarnia" wokół smoka — fade do czerni przy każdej krawędzi
          WebkitMaskImage: "radial-gradient(ellipse 78% 72% at 58% 50%, #000 32%, transparent 88%)",
          maskImage: "radial-gradient(ellipse 78% 72% at 58% 50%, #000 32%, transparent 88%)",
        }}
      >
        <DragonCanvas progress={progress} />
      </motion.div>

      {/* MANA overlay — cyan armor glow + Euro particles */}
      <motion.div style={{ opacity: manaActive }} className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-[50%] bg-[radial-gradient(60%_60%_at_60%_50%,rgba(0,229,197,0.32),transparent_70%)]" />
        <EuroDust />
      </motion.div>

      {/* SKILL overlay — binary stream ambient (skrzydło teraz w smoku SVG) */}
      <motion.div style={{ opacity: skillActive }} className="absolute inset-0 overflow-hidden">
        <BinaryStream />
        <div className="absolute inset-y-0 right-0 w-[50%] bg-[radial-gradient(60%_60%_at_55%_45%,rgba(255,45,170,0.28),transparent_70%)] mix-blend-screen" />
      </motion.div>

      {/* GOLEM overlay — yellow aura (zębatki teraz w klatce piersiowej smoka) */}
      <motion.div style={{ opacity: golemActive }} className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-[50%] bg-[radial-gradient(60%_60%_at_60%_50%,rgba(255,230,0,0.30),transparent_70%)]" />
      </motion.div>
    </div>
  );
}

function EuroDust() {
  // 14 tiny € floating upward with random delays
  const items = Array.from({ length: 14 });
  return (
    <div className="absolute inset-y-0 right-[2%] lg:right-[5%] w-[28%] lg:w-[22%]">
      {items.map((_, i) => {
        const left = 15 + ((i * 53) % 80);
        const delay = (i * 0.4) % 4;
        const dur = 3.4 + ((i * 0.7) % 2.6);
        return (
          <motion.span
            key={i}
            className="absolute font-mono text-[14px] text-cyan-neon"
            style={{ left: `${left}%`, bottom: "-10%", textShadow: "0 0 10px rgba(0,229,197,.8)" }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-20, -160, -260, -340] }}
            transition={{ duration: dur, repeat: Infinity, delay, ease: "easeOut" }}
          >
            €
          </motion.span>
        );
      })}
    </div>
  );
}

function BinaryStream() {
  // Vertical columns of binary scrolling, framing the wing
  const cols = Array.from({ length: 6 });
  return (
    <div className="absolute inset-y-0 right-[3%] lg:right-[7%] flex gap-4 items-stretch w-[20%] lg:w-[16%] overflow-hidden">
      {cols.map((_, i) => (
        <motion.div
          key={i}
          className="font-mono text-[11px] leading-tight tabular-nums whitespace-pre overflow-hidden h-full"
          style={{
            color: i % 2 ? "#00E5C5" : "#FF2DAA",
            opacity: 0.55,
            textShadow: i % 2 ? "0 0 6px rgba(0,229,197,.7)" : "0 0 6px rgba(255,45,170,.7)",
          }}
          animate={{ y: ["-30%", "0%"] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "linear", delay: i * 0.3 }}
        >
          {generateBinary((i % 3) + 1)}
        </motion.div>
      ))}
    </div>
  );
}

function generateBinary(seed: number) {
  let s = "";
  const chars = "01";
  for (let i = 0; i < 120; i++) {
    s += chars[(i * (seed + 3)) % 2] + "\n";
  }
  return s;
}

function Gears() {
  return (
    <div className="absolute right-[3%] lg:right-[6%] top-1/2 -translate-y-1/2">
      <div className="relative h-[180px] w-[180px]">
        <motion.div
          className="absolute left-0 top-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <GearSVG size={84} stroke="#FFE600" />
        </motion.div>
        <motion.div
          className="absolute right-0 top-[58px]"
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <GearSVG size={60} stroke="#FF2DAA" />
        </motion.div>
        <motion.div
          className="absolute left-[20px] bottom-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        >
          <GearSVG size={70} stroke="#00E5C5" />
        </motion.div>
      </div>
    </div>
  );
}

function GearSVG({ size = 100, stroke = "#FFE600" }: { size?: number; stroke?: string }) {
  const teeth = 14;
  const r = 38;
  const tooth = 6;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 10px ${stroke})` }}>
      <g fill="none" stroke={stroke} strokeWidth="2">
        <circle cx="50" cy="50" r={r} />
        <circle cx="50" cy="50" r={r - 14} />
        <circle cx="50" cy="50" r="6" />
        {Array.from({ length: teeth }).map((_, i) => {
          const a = (i / teeth) * Math.PI * 2;
          const x1 = 50 + Math.cos(a) * r;
          const y1 = 50 + Math.sin(a) * r;
          const x2 = 50 + Math.cos(a) * (r + tooth);
          const y2 = 50 + Math.sin(a) * (r + tooth);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  );
}

function WingFan({ progress }: { progress: MotionValue<number> }) {
  // Geometryczne skrzydło — 9 piór wyrastających od punktu kotwicy przy łopatce smoka,
  // wachlarz UP/LEFT (smok stoi po prawej, skrzydło rozkłada się w lewo-góra).
  // Bez mix-blend — pełne saturacje cyan/magenta.
  const spread = useTransform(progress, [0.30, 0.44, 0.63, 0.73], [0, 1, 1, 0]);
  const feathers = Array.from({ length: 9 });
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        opacity: spread,
        // anchor: środek-prawa strona ekranu (~65% width, 45% height) — przy łopatce smoka,
        // który siedzi po prawej w canvas
        right: "32%",
        top: "32%",
      }}
      aria-hidden
    >
      <div className="relative" style={{ width: 0, height: 0 }}>
        {feathers.map((_, i) => {
          // Wachlarz w lewo i w górę — od 130° (lewa-góra) do 220° (lewa-dół)
          const angleDeg = 130 + (i * 90) / (feathers.length - 1);
          const len = 220 + (i === 4 ? 60 : i % 2 === 0 ? 30 : 0);
          const color = i % 2 ? "#00E5C5" : "#FF2DAA";
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: 0,
                top: 0,
                transformOrigin: "0% 50%",
                rotate: `${angleDeg}deg`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0.5, 1, 0.9, 1] }}
              transition={{ duration: 2.0, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
            >
              <svg
                width={len}
                height={32}
                viewBox={`0 0 ${len} 32`}
                style={{ filter: `drop-shadow(0 0 14px ${color}) drop-shadow(0 0 6px ${color})`, display: "block" }}
              >
                {/* pióro: lance shape z wewnętrznymi liniami danych */}
                <polygon
                  points={`0,16 ${len * 0.85},5 ${len},16 ${len * 0.85},27`}
                  fill={color}
                  fillOpacity="0.18"
                  stroke={color}
                  strokeWidth="1.6"
                />
                <line x1="6" y1="16" x2={len - 12} y2="10" stroke={color} strokeWidth="0.8" opacity="0.7" />
                <line x1="6" y1="16" x2={len - 12} y2="22" stroke={color} strokeWidth="0.8" opacity="0.7" />
                {/* binarne znaczniki wzdłuż pióra */}
                {Array.from({ length: 4 }).map((_, k) => {
                  const x = 30 + k * (len / 5);
                  return (
                    <text
                      key={k}
                      x={x}
                      y="20"
                      fontFamily="monospace"
                      fontSize="9"
                      fill={color}
                      opacity="0.85"
                    >
                      {k % 2 === 0 ? "01" : "10"}
                    </text>
                  );
                })}
              </svg>
            </motion.div>
          );
        })}
        {/* kotwica — świetlisty rdzeń przy łopatce */}
        <motion.div
          className="absolute h-4 w-4 rounded-full"
          style={{
            left: -8,
            top: -8,
            background: "radial-gradient(circle, #fff 0%, #FF2DAA 50%, rgba(255,45,170,0.6) 75%, transparent 100%)",
            boxShadow: "0 0 30px rgba(255,45,170,1), 0 0 60px rgba(255,45,170,0.6)",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

function BackdropAura({ progress }: { progress: MotionValue<number> }) {
  const left = useTransform(progress, [0, 0.5, 1], ["10%", "50%", "90%"]);
  const opacityM = useTransform(progress, [0, 0.33, 0.5], [0.5, 0.2, 0]);
  const opacityC = useTransform(progress, [0.16, 0.5, 0.83], [0, 0.5, 0]);
  const opacityY = useTransform(progress, [0.5, 0.66, 1], [0, 0.2, 0.5]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-magenta-neon/30 blur-[140px]"
        style={{ left, opacity: opacityM }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-cyan-neon/30 blur-[140px]"
        style={{ left, opacity: opacityC }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-electric-yellow/25 blur-[140px]"
        style={{ left, opacity: opacityY }}
      />
    </div>
  );
}

function PillarPanel({
  pillar, progress, index,
}: { pillar: typeof PILLARS[number]; progress: MotionValue<number>; index: number }) {
  // Each panel: in-range from (i/3 - 0.1) to ((i+1)/3 + 0.1)
  const start = index / PILLARS.length;
  const end = (index + 1) / PILLARS.length;
  const localOpacity = useTransform(progress, [start - 0.05, start + 0.05, end - 0.05, end + 0.05], [0.78, 1, 1, 0.78]);
  const localScale = useTransform(progress, [start, (start + end) / 2, end], [0.97, 1, 0.97]);
  const localY = useTransform(progress, [start, (start + end) / 2, end], [20, 0, -20]);

  return (
    <div className="relative w-screen h-screen shrink-0 grid items-center px-6 lg:px-12">
      <motion.div
        style={{ opacity: localOpacity, scale: localScale, y: localY }}
        className="relative z-10 w-full max-w-[520px] lg:ml-[6%]"
      >
        {/* Tag + metric */}
        <div className="relative">
          <div className={`font-mono text-[11px] uppercase tracking-[0.34em] ${pillar.accent.text}`}>
            [{pillar.code}] · {pillar.tag}
          </div>
          <div
            className={`mt-3 font-display font-semibold tracking-tightest-2 leading-[0.9] text-[clamp(3rem,7vw,6rem)] ${pillar.accent.text}`}
            style={{ textShadow: `0 0 40px ${pillar.accent.glow}` }}
          >
            {pillar.metric}
          </div>
          <div className="mt-5 lg:mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
            {pillar.metricLabel} · {pillar.sub}
          </div>
        </div>

        {/* Body — no blur, no card frame; just text on top of the stage */}
        <div className="relative mt-10 lg:mt-12">
          <h3 className="font-display text-[clamp(1.7rem,3.2vw,2.8rem)] font-semibold tracking-tightest-2 leading-[1.04] text-balance">
            {pillar.title}
          </h3>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-bone-mute">
            {pillar.body}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {pillar.chips.map((c, ci) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10% 0px" }}
                transition={{ delay: ci * 0.05, type: "spring", stiffness: 140, damping: 18 }}
                className={`font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-md hairline-strong bg-ink/60 backdrop-blur ${pillar.accent.text}`}
              >
                {c}
              </motion.span>
            ))}
          </div>

        </div>
      </motion.div>

      {/* Edge index */}
      <div className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-[9px] uppercase tracking-[0.4em] text-bone/30">
        {String(index + 1).padStart(2, "0")} / 03 · {pillar.tag}
      </div>
    </div>
  );
}
