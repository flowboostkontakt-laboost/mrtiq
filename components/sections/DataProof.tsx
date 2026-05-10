"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useScroll, MotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { Reveal, MaskReveal } from "@/components/Reveal";

const STEPS = [
  {
    code: "01.PING",
    title: "Skanowanie potencjału",
    body: "Wpisujesz NIP. W 48 godzin nasz zespół bezpłatnie weryfikuje pule budżetów PARP, KFS, BUR. Zero ukrytych opłat.",
    metric: 48,
    suffix: "h",
    label: "Audyt potencjału",
    color: "magenta" as const,
  },
  {
    code: "02.OVERRIDE",
    title: "Generowanie wniosku",
    body: "Specjaliści piszą wniosek językiem, który kochają algorytmy urzędnicze. Maksymalizujemy szansę akceptacji do 94%.",
    metric: 94,
    suffix: "%",
    label: "Skuteczność wniosków",
    color: "cyan" as const,
  },
  {
    code: "03.UPLOAD",
    title: "Zastrzyk gotówki",
    body: "Środki odblokowane. Trenerzy MRTIQ i inżynierowie Konik Systems wkraczają do firmy. Instalujemy kompetencje + technologię.",
    metric: 42,
    suffix: " mln",
    label: "Przetransferowanych PLN",
    color: "yellow" as const,
  },
  {
    code: "04.CLEAR",
    title: "Czyste rozliczenie",
    body: "Zamykamy projekt papierowo. Audyty, certyfikaty, raporty do urzędu — wszystko bierzemy na siebie. Czyste ręce, pełne konto.",
    metric: 0,
    suffix: " PLN",
    label: "Ukrytych kosztów",
    color: "magenta" as const,
  },
];

export default function DataProof() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="dowod" ref={ref} className="relative py-32 lg:py-44">
      <div className="absolute inset-x-0 top-0 h-px divider-y" />
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              [04] Dowód magii · Data storytelling
            </div>
            <h2 className="mt-5 font-display font-semibold tracking-tightest-2 text-[clamp(2.5rem,5.6vw,5rem)] leading-[0.94]">
              <MaskReveal>Czarnoksięstwo,</MaskReveal>
              <br />
              <span className="text-bone-mute">
                <MaskReveal delay={0.06}>które udowodnisz przed CFO.</MaskReveal>
              </span>
            </h2>
            <p className="mt-6 text-[15.5px] leading-relaxed text-bone-mute max-w-2xl">
              Jesteśmy głośni i kolorowi, ale na końcu dnia interesują nas
              tylko mierzalne zyski i zoptymalizowane procesy. Każdy krok
              udokumentowany. Każda złotówka rozliczona.
            </p>
          </div>
        </Reveal>

        {/* Top stat row */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Reveal className="lg:col-span-5">
            <Counter title="Pozyskane z UE" suffix=" mln PLN" value={42} tone="cyan" />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-3">
            <Counter title="Operatorów AI" value={1280} tone="magenta" />
          </Reveal>
          <Reveal delay={0.16} className="lg:col-span-4">
            <Counter title="Procesów RevOS" value={180} suffix="+" tone="yellow" />
          </Reveal>
        </div>

        {/* Sticky narrative */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <StickyTerminal progress={scrollYProgress} />
            </div>
          </div>
          <ol className="lg:col-span-7 space-y-24">
            {STEPS.map((s, i) => (
              <NarrativeStep key={s.code} step={s} index={i} />
            ))}
          </ol>
        </div>

        {/* Bars at end */}
        <Reveal delay={0.1}>
          <div className="mt-24">
            <Bars />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NarrativeStep({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.25, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const accent =
    step.color === "magenta" ? "text-magenta-neon" : step.color === "cyan" ? "text-cyan-neon" : "text-electric-yellow";

  return (
    <motion.li ref={ref} style={{ opacity, y }} className="will-change-transform">
      <div className={`font-mono text-[11px] uppercase tracking-[0.34em] ${accent}`}>
        [{step.code}]
      </div>
      <h3 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-semibold tracking-tightest-2 leading-[1] text-balance">
        {step.title}
      </h3>
      <p className="mt-5 text-[16px] leading-relaxed text-bone-mute max-w-xl">{step.body}</p>
      <div className="mt-7 flex items-end gap-8">
        <BigCounter value={step.metric} suffix={step.suffix} color={step.color} />
        <div className="pb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">{step.label}</div>
          <div className="mt-2 h-px w-32 bg-gradient-to-r from-white/30 to-transparent" />
        </div>
      </div>
    </motion.li>
  );
}

function BigCounter({ value, suffix, color }: { value: number; suffix: string; color: "magenta" | "cyan" | "yellow" }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("pl-PL"));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(mv, value, { duration: 1.4, ease: [0.16, 1, 0.3, 1] });
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mv, value]);

  const accent = color === "magenta" ? "text-magenta-neon" : color === "cyan" ? "text-cyan-neon" : "text-electric-yellow";
  const glow = color === "magenta" ? "text-glow-magenta" : color === "cyan" ? "text-glow-cyan" : "text-glow-yellow";

  return (
    <div ref={ref} className={`font-display text-[clamp(3.5rem,8vw,7rem)] font-semibold tracking-tightest-2 leading-none ${accent} ${glow}`}>
      <motion.span>{rounded}</motion.span>
      <span className="text-[0.5em]">{suffix}</span>
    </div>
  );
}

function StickyTerminal({ progress }: { progress: MotionValue<number> }) {
  const lineProgress = useSpring(useTransform(progress, [0.1, 0.9], [0, STEPS.length]), { stiffness: 80, damping: 22 });

  return (
    <div className="relative rounded-3xl border border-white/[0.06] bg-ink/80 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-magenta-neon" />
          <span className="h-2 w-2 rounded-full bg-electric-yellow" />
          <span className="h-2 w-2 rounded-full bg-cyan-neon" />
          <span className="ml-3">~ revos · live</span>
        </div>
        <span className="text-cyan-neon">REC</span>
      </div>
      <div className="p-6 font-mono text-[12.5px] leading-relaxed">
        <div className="text-bone-mute">$ revos --transformation --client</div>
        {STEPS.map((s, i) => (
          <TerminalLine key={s.code} step={s} index={i} progress={lineProgress} />
        ))}
        <div className="mt-3 flex items-center gap-2 text-electric-yellow">
          <span>$</span>
          <span className="h-3 w-2 bg-electric-yellow animate-flicker" />
        </div>
      </div>
      {/* progress strip */}
      <div className="h-1 bg-white/5 relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-magenta-neon via-cyan-neon to-electric-yellow"
          style={{ width: useTransform(progress, [0, 1], ["0%", "100%"]) }}
        />
      </div>
    </div>
  );
}

function TerminalLine({ step, index, progress }: { step: typeof STEPS[number]; index: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [index, index + 0.3], [0.3, 1]);
  const accent =
    step.color === "magenta" ? "text-magenta-neon" : step.color === "cyan" ? "text-cyan-neon" : "text-electric-yellow";
  return (
    <motion.div style={{ opacity }} className="mt-2 flex gap-3">
      <span className="text-bone-mute">{String(index + 1).padStart(2, "0")}:</span>
      <span className={accent}>[{step.code}]</span>
      <span className="text-bone">{step.title}</span>
    </motion.div>
  );
}

function Counter({
  title, value, suffix = "", tone,
}: { title: string; value: number; suffix?: string; tone: "cyan" | "magenta" | "yellow" }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("pl-PL"));
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) animate(mv, value, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [mv, value]);

  const color = tone === "cyan" ? "text-cyan-neon" : tone === "magenta" ? "text-magenta-neon" : "text-electric-yellow";
  const glow = tone === "cyan" ? "text-glow-cyan" : tone === "magenta" ? "text-glow-magenta" : "text-glow-yellow";

  return (
    <div ref={ref} className="relative h-full rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 lg:p-9 overflow-hidden">
      <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute">{title}</div>
      <div className={`mt-3 font-display text-[clamp(3rem,7vw,6rem)] font-semibold tracking-tightest-2 leading-none ${color} ${glow}`}>
        <motion.span>{rounded}</motion.span>
        <span className="text-[0.5em] tracking-tight">{suffix}</span>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={`h-2 col-span-1 rounded-sm ${color}`}
            style={{ background: "currentColor", opacity: 0.18 + (i / 24) * 0.7 }}
          />
        ))}
      </div>
    </div>
  );
}

function Bars() {
  const data = [
    { l: "Q1", v: 32, c: "bg-cyan-neon" },
    { l: "Q2", v: 48, c: "bg-cyan-neon" },
    { l: "Q3", v: 71, c: "bg-magenta-neon" },
    { l: "Q4", v: 88, c: "bg-magenta-neon" },
    { l: "Q5", v: 96, c: "bg-electric-yellow" },
  ];
  return (
    <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 lg:p-9">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute">
            Skuteczność dotacji · % accept rate
          </div>
          <div className="mt-2 font-display text-3xl font-semibold tracking-tight">94%</div>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
          Audyt: 48h · Koszt: 0,00 PLN
        </div>
      </div>
      <div className="mt-8 grid grid-cols-5 gap-3 items-end h-44">
        {data.map((d, i) => (
          <div key={d.l} className="flex flex-col items-center gap-2">
            <motion.div
              className={`w-full rounded-md ${d.c}`}
              initial={{ height: 0 }}
              whileInView={{ height: `${d.v}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 100, damping: 18 }}
              style={{ minHeight: 4 }}
            />
            <div className="font-mono text-[10px] tracking-[0.18em] text-bone-mute">{d.l}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 h-px bg-gradient-to-r from-cyan-neon via-magenta-neon to-electric-yellow opacity-50" />
    </div>
  );
}
