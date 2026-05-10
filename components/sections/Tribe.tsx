"use client";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";

const BENEFITS = [
  { k: "Twardy know-how", v: "Prompt engineering, automatyzacja, strategia" },
  { k: "Autoryzacja KONIK", v: "Wdrażaj rozwiązania Grupy KONIK na rynku" },
  { k: "Zamknięta sieć", v: "Mastermind ekspertów AI i operatorów" },
  { k: "The Loot Box", v: "Bluza, czapka, neon, wlepki, ID Card" },
];

export default function Tribe() {
  return (
    <section id="plemie" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">
              [03] The Tribe · Train-The-Trainer
            </div>
            <h2 className="mt-5 font-display font-semibold tracking-tightest-2 text-[clamp(2.5rem,5.6vw,5rem)] leading-[0.94]">
              Zostań <span className="text-glow-magenta text-magenta-neon">Architektem</span>
              <br /> Zmiany.
            </h2>
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-bone-mute">
              Program Train-The-Trainer to nie kurs. To inicjacja. Szkolimy
              przyszłych trenerów i operatorów Konik RevOS. Uczymy tego,
              jak uczyć innych — i jak wdrażać AI w korporacjach.
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
          </Reveal>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.k} delay={i * 0.06}>
                <Spotlight glowColor="255,45,170" className="group h-full">
                  <div className="rounded-3xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-xl p-7 h-full transition-colors group-hover:border-magenta-neon/40">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                      <span>0{i + 1}</span>
                      <span className="text-magenta-neon">LEGENDARY</span>
                    </div>
                    <div className="mt-5 font-display text-2xl tracking-tight font-medium">{b.k}</div>
                    <p className="mt-3 text-[14px] leading-relaxed text-bone-mute">{b.v}</p>
                    <div className="mt-6 h-px bg-gradient-to-r from-magenta-neon/40 via-cyan-neon/30 to-transparent" />
                    <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute flex items-center justify-between">
                      <span>Tier: Operator</span>
                      <span className="text-electric-yellow">+EXP</span>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            ))}

            <Reveal delay={0.3} className="sm:col-span-2">
              <div className="relative rounded-3xl border border-electric-yellow/30 bg-gradient-to-br from-electric-yellow/[0.06] to-transparent p-8 overflow-hidden">
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
        </div>
      </div>
    </section>
  );
}
