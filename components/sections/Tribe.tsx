"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";

const BENEFITS = [
  { k: "Twardy know-how", v: "Taktyki i narzędzia działające od pierwszego dnia — nie teoria, nie slajdy." },
  { k: "Autoryzacja KONIK", v: "Certyfikowany dostęp do metodyki Grupy KONIK. Nie budujesz od zera." },
  { k: "Premium Tooling", v: "Laptop, telefon, AR glasses. Komplet sprzętu Operatora gotowy w dniu startu." },
  { k: "The Loot Box", v: "Identyfikacja Operatora: nie nosisz logo firmy — nosisz swoją rangę." },
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
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">
            [03] The Tribe · 66 Agents · Loot Box
          </div>
          <h2 className="mt-5 font-display font-semibold tracking-tightest-2 text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] max-w-3xl">
            <span className="block">Dołącz zanim</span>
            <span className="block">
              <span className="text-glow-magenta text-magenta-neon">zrobi to</span>{" "}
              ktoś inny.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-bone-mute">
            Dołączasz do grona liderów, którzy nie pytają{" "}
            <span className="text-electric-yellow">„czy AI?"</span>, lecz{" "}
            „ile procesów jeszcze?". Program Train the Trainer czyni Cię
            głosem tej rewolucji — w swoim środowisku, ze swoją marką.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/train-the-trainer"
              className="inline-flex items-center gap-2 rounded-full bg-electric-yellow px-6 py-3.5 text-[14px] font-semibold text-ink neon-yellow"
            >
              Dołącz do programu →
            </Link>
            <Link
              href="/merch"
              className="inline-flex items-center gap-2 rounded-full hairline-strong px-5 py-3 text-[13px] font-medium text-bone-mute hover:text-bone hover:border-white/20 transition-colors"
            >
              Zbrojownia Operatora
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
                  Sprzęt, który konkurencja kupuje za własne pieniądze. U Ciebie — część programu.
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
