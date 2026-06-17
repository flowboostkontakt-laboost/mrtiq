"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { MaskReveal } from "@/components/Reveal";

const STEPS = [
  {
    code: "01", tag: "MANA",
    color: "text-magenta-neon",
    glow: "rgba(255,45,170,.55)",
    accentBg: "bg-magenta-neon",
    title: "Pozyskujemy amunicję.",
    body: "Transformacja kosztuje. Ale nie musi kosztować Ciebie — musi kosztować Unię Europejską. Piszemy wnioski z 94% skutecznością. Twój budżet transformacyjny gotowy, zanim zaczniesz pierwsze szkolenie.",
    chips: ["PARP", "KFS", "BUR", "DIH", "Polska Wschodnia"],
    metric: "100%",
    metricLabel: "Dofinansowania UE",
    experts: ["Philip Kotler", "Seth Godin", "Byron Sharp", "Peter Drucker"],
  },
  {
    code: "02", tag: "SKILL",
    color: "text-cyan-neon",
    glow: "rgba(0,229,197,.55)",
    accentBg: "bg-cyan-neon",
    title: "Tworzymy Operatorów, nie wyrobników.",
    body: "AI nie zabierze pracy Twoim ludziom. Zabierze ją firma, której pracownicy już to potrafią. 9 modułów. Certyfikacja. Narzędzia od pierwszego dnia.",
    chips: ["Prompt Eng.", "n8n", "Clay", "GA4", "Data Storytelling"],
    metric: "9",
    metricLabel: "Wymiarów rozwoju",
    experts: ["Avinash Kaushik", "Bernard Marr", "Cole N. Knaflic", "Carol Dweck"],
  },
  {
    code: "03", tag: "GOLEM",
    color: "text-electric-yellow",
    glow: "rgba(255,230,0,.55)",
    accentBg: "bg-electric-yellow",
    title: "Wdrażamy Konik RevOS.",
    body: "Kiedy zespół rozumie AI, dajemy mu armię. 66 Agentów pracuje na Twoją sprzedaż zanim handlowiec wstanie rano. Generowanie leadów, kwalifikacja, cold outreach — 24/7.",
    chips: ["66 Agentów AI", "180 Procesów", "RevOps", "Auto-Sales"],
    metric: "24/7",
    metricLabel: "Cyfrowa armia",
    experts: ["Neil Rackham", "Robert Cialdini", "Chris Voss", "Dan Ariely"],
  },
] as const;

type Step = (typeof STEPS)[number];

export default function ValueLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const op1 = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const y1  = useTransform(scrollYProgress, [0, 0.12], [40, 0]);
  const op2 = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
  const y2  = useTransform(scrollYProgress, [0.3, 0.42], [40, 0]);
  const op3 = useTransform(scrollYProgress, [0.6, 0.72], [0, 1]);
  const y3  = useTransform(scrollYProgress, [0.6, 0.72], [40, 0]);
  const rail1Op = useTransform(scrollYProgress, [0.28, 0.4], [0, 1]);
  const rail2Op = useTransform(scrollYProgress, [0.58, 0.7], [0, 1]);

  return (
    <section id="alchemia" ref={ref} className="relative" style={{ height: "350vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cmyk opacity-70" aria-hidden />
        <div className="absolute inset-0 bg-grid-fine opacity-50" aria-hidden />
        <div className="scanlines" aria-hidden />

        <BackdropAura progress={scrollYProgress} />

        {/* Header */}
        <div className="absolute inset-x-0 top-0 z-20 mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 lg:pt-20 pointer-events-none">
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
            [02] · Drabina Wartości
          </div>
          <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.5rem,3vw,2.6rem)] leading-[0.98]">
            <MaskReveal>Alchemia Biznesu.</MaskReveal>{" "}
            <span className="text-bone-mute">
              <MaskReveal delay={0.06}>3 szczeble. Jeden wynik.</MaskReveal>
            </span>
          </h2>
        </div>

        {/* Staircase */}
        <div className="absolute inset-x-0 bottom-0 pb-14 z-10">
          <div
            className="relative mx-auto max-w-[1400px] px-6 lg:px-10"
            style={{ height: "68vh" }}
          >
            {/* Ladder rail 1 — between step 01 → 02 */}
            <motion.div
              style={{
                opacity: rail1Op,
                position: "absolute",
                left: "calc(16% + 24px)",
                bottom: 0,
                width: "1px",
                height: "34%",
                background: "linear-gradient(to top, rgba(255,45,170,0.35), rgba(0,229,197,0.35))",
                pointerEvents: "none",
              }}
            />
            {/* Ladder rail 2 — between step 02 → 03 */}
            <motion.div
              style={{
                opacity: rail2Op,
                position: "absolute",
                left: "calc(32% + 24px)",
                bottom: "34%",
                width: "1px",
                height: "34%",
                background: "linear-gradient(to top, rgba(0,229,197,0.35), rgba(255,230,0,0.35))",
                pointerEvents: "none",
              }}
            />

            {/* Step 01 — bottom, full width */}
            <div className="absolute bottom-0 left-0 right-0">
              <motion.div style={{ opacity: op1, y: y1 }}>
                <StepCard step={STEPS[0]} />
              </motion.div>
            </div>

            {/* Step 02 — middle, indented 16% */}
            <div className="absolute right-0" style={{ bottom: "34%", left: "16%" }}>
              <motion.div style={{ opacity: op2, y: y2 }}>
                <StepCard step={STEPS[1]} />
              </motion.div>
            </div>

            {/* Step 03 — top, indented 32% */}
            <div className="absolute right-0" style={{ bottom: "68%", left: "32%" }}>
              <motion.div style={{ opacity: op3, y: y3 }}>
                <StepCard step={STEPS[2]} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* HUD bottom */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/5 bg-ink/40 backdrop-blur">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
            <span>System: Active</span>
            <span>Scroll ↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className="relative flex items-stretch border border-white/[0.07] bg-ink/80 backdrop-blur-md rounded-xl overflow-hidden">
      {/* Left accent stripe */}
      <div
        className={`w-[3px] shrink-0 ${step.accentBg}`}
        style={{ boxShadow: `0 0 16px ${step.glow}` }}
      />

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 px-5 py-5 w-full">
        {/* Metric */}
        <div className="shrink-0 lg:w-40">
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-bone-mute">
            [{step.code}] · {step.tag}
          </div>
          <div
            className={`mt-0.5 font-display font-semibold text-[clamp(2rem,3.4vw,2.8rem)] leading-[0.88] ${step.color}`}
            style={{ textShadow: `0 0 28px ${step.glow}` }}
          >
            {step.metric}
          </div>
          <div className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.22em] text-bone-mute">
            {step.metricLabel}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-14 w-px bg-white/8 mx-6 shrink-0" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-[clamp(1rem,1.8vw,1.45rem)] font-semibold tracking-tightest-2 leading-[1.1]">
            {step.title}
          </h3>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-bone-mute line-clamp-2">
            {step.body}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {step.chips.map((c) => (
              <span
                key={c}
                className={`font-mono text-[8.5px] uppercase tracking-[0.14em] px-2.5 py-1 rounded hairline-strong bg-ink/50 ${step.color}`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Experts */}
        <div className="hidden xl:flex flex-col gap-0.5 shrink-0 ml-6 pl-6 border-l border-white/[0.07]">
          <div className="font-mono text-[8px] uppercase tracking-[0.26em] text-bone-mute mb-1.5">
            Inspired by
          </div>
          {step.experts.map((e) => (
            <div key={e} className="font-mono text-[9px] text-bone/40 tracking-[0.1em]">
              ↳ {e}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BackdropAura({ progress }: { progress: MotionValue<number> }) {
  const left = useTransform(progress, [0, 0.5, 1], ["10%", "50%", "90%"]);
  const oM = useTransform(progress, [0, 0.33, 0.5], [0.45, 0.15, 0]);
  const oC = useTransform(progress, [0.16, 0.5, 0.83], [0, 0.45, 0]);
  const oY = useTransform(progress, [0.5, 0.66, 1], [0, 0.15, 0.45]);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <motion.div className="absolute top-1/2 -translate-y-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-magenta-neon/25 blur-[120px]" style={{ left, opacity: oM }} />
      <motion.div className="absolute top-1/2 -translate-y-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-neon/25 blur-[120px]" style={{ left, opacity: oC }} />
      <motion.div className="absolute top-1/2 -translate-y-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-electric-yellow/20 blur-[120px]" style={{ left, opacity: oY }} />
    </div>
  );
}
