"use client";
import { Reveal } from "@/components/Reveal";

const NODES = [
  { code: "X", name: "Xpunkt", role: "Lokalne biznesy", color: "text-cyan-neon", bg: "bg-cyan-neon/10" },
  { code: "M", name: "mrtiq", role: "Strategia · Kapitał · Edukacja", color: "text-magenta-neon", bg: "bg-magenta-neon/10", current: true },
  { code: "C", name: "Content-Media", role: "Wdrożenia premium", color: "text-bone", bg: "bg-white/5" },
  { code: "K", name: "Konik Systems", role: "Inżynieria · RevOS", color: "text-electric-yellow", bg: "bg-electric-yellow/10" },
];

export default function Ecosystem() {
  return (
    <section className="relative py-24 lg:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute">[ ekosystem ]</div>
              <h3 className="mt-3 font-display text-3xl lg:text-5xl font-semibold tracking-tight">
                Cztery dywizje. Jedna grupa.
              </h3>
            </div>
            <p className="max-w-md text-[14.5px] leading-relaxed text-bone-mute">
              MRTIQ to umysł, energia i kapitał. Konik Systems to zbrojownia.
              Razem tworzymy ekosystem do zadań specjalnych.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {NODES.map((n) => (
              <div
                key={n.code}
                className={`relative rounded-2xl border ${n.current ? "border-magenta-neon/50 neon-magenta" : "border-white/[0.06]"} ${n.bg} backdrop-blur p-6`}
              >
                <div className="flex items-start justify-between">
                  <div className={`grid h-10 w-10 place-items-center rounded-lg ${n.bg} ${n.color} font-display font-semibold`}>
                    {n.code}
                  </div>
                  {n.current && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-magenta-neon">You are here</span>
                  )}
                </div>
                <div className="mt-6 font-display text-xl font-medium">{n.name}</div>
                <div className={`mt-1 text-sm ${n.current ? "text-bone-mute" : "text-bone-mute"}`}>{n.role}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
