"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";

const DragonCanvasRearing = dynamic(
  () => import("@/components/DragonCanvas").then((m) => m.DragonCanvasRearing),
  { ssr: false }
);

const BENEFITS = [
  { k: "Twardy know-how", v: "Prompt engineering, automatyzacja, strategia" },
  { k: "Autoryzacja KONIK", v: "Wdrażaj rozwiązania Grupy KONIK na rynku" },
  { k: "Premium Tooling", v: "Macbook, iPhone, RayNeo X3 Pro, neon" },
  { k: "The Loot Box", v: "Bluza, czapka, neon, wlepki, ID Card" },
];

export default function Tribe() {
  return (
    <section id="plemie" className="relative bg-ink overflow-hidden">
      {/* tła brandowe — bez sticky/pinning */}
      <div className="absolute inset-0 bg-cmyk opacity-50" aria-hidden />
      <div className="absolute inset-0 bg-grid-fine opacity-40" aria-hidden />
      <div className="scanlines" aria-hidden />

      {/* ── Tekst ── */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pt-24 lg:pt-32 pb-12">
        {/* SMOK rearing — pełna postawa, klatka otwarta, 66 agentów w środku, dym z pyska */}
        <div
          aria-hidden
          className="pointer-events-none hidden lg:block absolute right-[-4%] xl:right-[0%] top-1/2 -translate-y-1/2 z-[1]"
        >
          <div className="relative h-[640px] w-[680px]">
            <DragonCanvasRearing />
          </div>
        </div>

        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">
            [03] The Tribe · 66 Agents · Loot Box
          </div>
          <h2 className="mt-5 font-display font-semibold tracking-tightest-2 text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] max-w-3xl">
            <span className="block">Zostań</span>
            <span className="block">
              <span className="text-glow-magenta text-magenta-neon">Architektem</span>{" "}
              Zmiany.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-bone-mute">
            W środku jarzy się elektryczno-żółty rdzeń —{" "}
            <span className="text-electric-yellow">66 Agentów AI</span> krążących wokół
            Twojej firmy 24/7. Wybudzenie Algorytmów.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/train-the-trainer"
              className="inline-flex items-center gap-2 rounded-full bg-electric-yellow px-6 py-3.5 text-[14px] font-semibold text-ink neon-yellow"
            >
              Aplikuj do programu →
            </Link>
            <Link
              href="/merch"
              className="inline-flex items-center gap-2 rounded-full hairline-strong px-5 py-3 text-[13px] font-medium text-bone-mute hover:text-bone hover:border-white/20 transition-colors"
            >
              Otwórz Zbrojownię
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-3 gap-4 max-w-md">
            <Mini k="66" v="Agentów AI" tone="yellow" />
            <Mini k="24/7" v="Online" tone="cyan" />
            <Mini k="180" v="Procesów" tone="magenta" />
          </div>
        </Reveal>
      </div>

      {/* ── Benefits + Loot Box ── */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.k} delay={i * 0.06}>
              <Spotlight glowColor="255,45,170" className="group h-full">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-xl p-6 h-full transition-colors group-hover:border-magenta-neon/40">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                    <span>0{i + 1}</span>
                    <span className="text-magenta-neon">LEGENDARY</span>
                  </div>
                  <div className="mt-5 font-display text-xl tracking-tight font-medium">{b.k}</div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-bone-mute">{b.v}</p>
                  <div className="mt-6 h-px bg-gradient-to-r from-magenta-neon/40 via-cyan-neon/30 to-transparent" />
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute flex items-center justify-between">
                    <span>Tier: Operator</span>
                    <span className="text-electric-yellow">+EXP</span>
                  </div>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-6 relative rounded-3xl border border-electric-yellow/30 bg-gradient-to-br from-electric-yellow/[0.06] to-transparent p-8 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-electric-yellow/30 blur-[80px]" />
            <div className="relative flex flex-wrap items-center gap-6 justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric-yellow">
                  Loot Box · Cyfrowy Arsenał
                </div>
                <div className="mt-2 font-display text-2xl tracking-tight">
                  MacBook · iPhone 17 Pro · RayNeo X3 Pro · Stealth Tracksuit
                </div>
                <div className="mt-1 text-sm text-bone-mute">
                  Pełne wyposażenie cyfrowego komandosa. Wartość 3 500+ PLN.
                </div>
              </div>
              <Link
                href="/train-the-trainer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full hairline-strong bg-ink/60 px-5 py-3 text-[13px] font-medium hover:border-electric-yellow/40"
              >
                Zobacz zawartość →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Mini({ k, v, tone }: { k: string; v: string; tone: "cyan" | "magenta" | "yellow" }) {
  const color =
    tone === "cyan" ? "text-cyan-neon" : tone === "magenta" ? "text-magenta-neon" : "text-electric-yellow";
  return (
    <div>
      <div className={`font-display text-2xl font-semibold tracking-tight ${color}`}>{k}</div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-bone-mute">{v}</div>
    </div>
  );
}
