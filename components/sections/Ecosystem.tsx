"use client";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const NODES = [
  {
    code: "X", name: "Xpunkt", role: "Sieć lokalnych partnerów biznesowych",
    color: "text-cyan-neon", border: "border-cyan-neon/20", bg: "bg-cyan-neon/[0.04]",
    logo: "/logo-xpunkt.webp",
  },
  {
    code: "M", name: "mrtiq", role: "Strategia · Kapitał · Edukacja",
    color: "text-magenta-neon", border: "border-magenta-neon/50", bg: "bg-magenta-neon/[0.05]",
    logo: "/logo-mrtiq.jpg",
    current: true,
  },
  {
    code: "K", name: "Konik Systems", role: "Inżynieria · RevOS · Agenci AI",
    color: "text-electric-yellow", border: "border-electric-yellow/20", bg: "bg-electric-yellow/[0.04]",
    logo: "/logo-konik.png",
  },
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
                Jedna misja. Trzy supermoce.
              </h3>
            </div>
            <p className="max-w-md text-[14.5px] leading-relaxed text-bone-mute">
              MRTiQ przynosi strategię, kapitał z UE i ludzi gotowych do zmiany.
              Konik Systems dostarcza kod, agentów i RevOS. Osobno — narzędzia.
              Razem — transformacja, której nie zatrzymasz.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {NODES.map((n) => (
              <div
                key={n.code}
                className={`relative rounded-2xl border ${n.border} ${n.bg} backdrop-blur p-6 flex flex-col gap-4 ${n.current ? "ring-1 ring-magenta-neon/20" : ""}`}
              >
                {n.current && (
                  <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.28em] text-magenta-neon">
                    You are here
                  </span>
                )}

                {/* Logo */}
                <div className="h-12 flex items-center">
                  <Image
                    src={n.logo}
                    alt={n.name}
                    width={120}
                    height={48}
                    className="object-contain object-left max-h-10 w-auto"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>

                <div>
                  <div className="font-display text-xl font-medium">{n.name}</div>
                  <div className={`mt-1 text-sm ${n.color}`}>{n.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
