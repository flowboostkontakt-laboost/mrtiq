"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const SENTENCE =
  "Szary to kolor korporacji, które boją się jutra. My wdrażamy transformację na pełnym kontraście — kapitał z UE, kompetencje od praktyków, kod od inżynierów Konik Systems.";

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });

  const words = SENTENCE.split(" ");
  const total = words.length;

  return (
    <section ref={ref} className="relative py-32 lg:py-48">
      <div className="absolute inset-x-0 top-0 h-px divider-y" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta-neon/15 blur-[120px]"
          style={{ scale: useTransform(scrollYProgress, [0, 1], [0.6, 1.4]) }}
        />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">
          [03.5] · Manifest
        </div>
        <h2 className="mt-8 font-display font-semibold tracking-tightest-2 leading-[1.05] text-[clamp(2rem,5.4vw,5rem)] text-pretty max-w-[32ch]">
          {words.map((w, i) => (
            <Word key={i} word={w} index={i} total={total} progress={scrollYProgress} />
          ))}
        </h2>
        <div className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute">
          <span className="h-px w-10 bg-bone-mute" />
          <span>— Werdykt Architekta Komunikacji</span>
        </div>
      </div>
    </section>
  );
}

function Word({
  word, index, total, progress,
}: { word: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const isAccent = /Konik|UE|kontraście/i.test(word);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block mr-[0.3em] will-change-transform ${
        isAccent ? "text-electric-yellow text-glow-yellow" : "text-bone"
      }`}
    >
      {word}
    </motion.span>
  );
}
