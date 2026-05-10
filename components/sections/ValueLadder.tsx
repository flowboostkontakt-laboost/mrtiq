"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Reveal, MaskReveal, LineReveal } from "@/components/Reveal";

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

  return (
    <section id="alchemia" ref={ref} className="relative" style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cmyk opacity-70" aria-hidden />
        <div className="absolute inset-0 bg-grid-fine opacity-50" aria-hidden />
        <div className="scanlines" aria-hidden />

        {/* ambient gradient that shifts with scroll */}
        <BackdropAura progress={scrollYProgress} />

        {/* Heading rail */}
        <div className="absolute inset-x-0 top-0 z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-28 lg:pt-32">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
                [02] · Drabina Wartości
              </div>
              <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4.6rem)] leading-[0.96]">
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
          className="absolute inset-x-0 top-0 flex h-screen items-center will-change-transform"
        >
          {PILLARS.map((p, i) => (
            <PillarPanel key={p.code} pillar={p} progress={scrollYProgress} index={i} />
          ))}
        </motion.div>

        {/* HUD bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/5 bg-ink/40 backdrop-blur">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
            <span>System: Active</span>
            <span className="hidden md:inline">01 → 02 zasila Skill · 02 → 03 wdraża Golem</span>
            <span className="text-magenta-neon flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-magenta-neon animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>
    </section>
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
  const localOpacity = useTransform(progress, [start - 0.05, start + 0.05, end - 0.05, end + 0.05], [0.35, 1, 1, 0.35]);
  const localScale = useTransform(progress, [start, (start + end) / 2, end], [0.94, 1, 0.94]);
  const localY = useTransform(progress, [start, (start + end) / 2, end], [40, 0, -40]);

  return (
    <div className="relative w-screen h-screen shrink-0 grid place-items-center px-6 lg:px-12">
      <motion.div
        style={{ opacity: localOpacity, scale: localScale, y: localY }}
        className="relative w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
      >
        {/* Big hero number */}
        <div className="lg:col-span-5 relative">
          <div
            className={`absolute -inset-12 rounded-full blur-[120px] opacity-60 bg-gradient-to-br ${pillar.accent.grad}`}
            aria-hidden
          />
          <div className="relative">
            <div className={`font-mono text-[11px] uppercase tracking-[0.34em] ${pillar.accent.text}`}>
              [{pillar.code}] · {pillar.tag}
            </div>
            <div
              className={`mt-6 font-display font-semibold tracking-tightest-2 leading-[0.85] text-[clamp(7rem,18vw,16rem)] ${pillar.accent.text}`}
              style={{ textShadow: `0 0 60px ${pillar.accent.glow}` }}
            >
              {pillar.metric}
            </div>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
              {pillar.metricLabel} · {pillar.sub}
            </div>
          </div>
        </div>

        {/* Body card */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl p-8 lg:p-12 overflow-hidden">
            <div className={`absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br ${pillar.accent.grad} blur-3xl opacity-70`} />
            <h3 className="relative font-display text-[clamp(2rem,4vw,3.6rem)] font-semibold tracking-tightest-2 leading-[1.02] text-balance">
              {pillar.title}
            </h3>
            <p className="relative mt-6 max-w-xl text-[15.5px] leading-relaxed text-bone-mute">
              {pillar.body}
            </p>

            <div className="relative mt-8 flex flex-wrap gap-2">
              {pillar.chips.map((c, ci) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-10% 0px" }}
                  transition={{ delay: ci * 0.05, type: "spring", stiffness: 140, damping: 18 }}
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-md hairline-strong bg-ink/40 backdrop-blur ${pillar.accent.text}`}
                >
                  {c}
                </motion.span>
              ))}
            </div>

            <div className="relative mt-10 pt-6 border-t border-white/5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
              <span>Status: Operational</span>
              <span className={pillar.accent.text}>● {pillar.tag}</span>
            </div>

            <LineReveal className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${pillar.accent.grad}`}>
              <span className="block h-px" />
            </LineReveal>
          </div>
        </div>
      </motion.div>

      {/* Edge index */}
      <div className={`absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono text-[10px] uppercase tracking-[0.4em] ${pillar.accent.text}`}>
        {String(index + 1).padStart(2, "0")} / 03 · {pillar.tag}
      </div>
    </div>
  );
}
