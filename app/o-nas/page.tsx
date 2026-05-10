import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import FinalGate from "@/components/sections/FinalGate";

const CORE = [
  { name: "Paweł Michta", role: "Founder & CEO · Trener", arch: "The Alchemist", domain: "Wizja ekosystemu, strategia high-level, integracja AI z ludzkim potencjałem.", color: "magenta" },
  { name: "Marcin Brzostowski", role: "Trener Operacyjny", arch: "The Ruler", domain: "Precyzja procesów, optymalizacja 180 ścieżek RevOS, efektywność skali.", color: "cyan" },
  { name: "Kamil Wiśniewski", role: "Trener Marketingu", arch: "The Explorer", domain: "Marketing Intelligence, psychologia tłumu, lejki Brunsona, kreatywność Drogi.", color: "magenta" },
  { name: "Mateusz Szałański", role: "Trener Sprzedaży", arch: "The Warrior", domain: "Revenue Optimization, domykanie B2B, negocjacje Vossa, SPIN Selling.", color: "yellow" },
];

const OPS = [
  { name: "Michał Czapliński", role: "Trener Interfejsów", power: "UX/UI Precision · Nielsen / Norman" },
  { name: "Julia Pałubicka", role: "Trener PR & Komunikacji", power: "Content Machine · social-first" },
  { name: "Wiktor Jeleń", role: "Trener Technologii AI", power: "Code & Automations · 66 Agentów" },
  { name: "Michał Wichowski", role: "Trener Analityki Danych", power: "Data Storytelling · Kaushik level" },
  { name: "Hanna Kąkol", role: "Trener Strategii & Growth", power: "Growth Mindset · Carol Dweck" },
  { name: "Tomek Możdżewski", role: "Trener Biznesu & Skalowania", power: "Business Architecture" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="[04]"
        eyebrow="Architekci Transformacji · Human Core / AI Powered"
        title="Alchemia Biznesu to ludzie."
        titleAccent="Maszyny to tylko narzędzia."
        subtitle="Poznaj zespół Trenerów MRTIQ. Jesteśmy praktykami, którzy nie boją się pobrudzić rąk kodem i strategią. Każdy z nas przeszedł inicjację, by dziś uczyć Twoją firmę, jak przetrwać i dominować w erze sztucznej inteligencji."
        meta={[
          { k: "Core team", v: "4" },
          { k: "Operatorów", v: "12+" },
          { k: "Special Ops", v: "1" },
          { k: "Dywizji KONIK", v: "4" },
        ]}
      />

      {/* Core */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">[ The Core · Zarząd i Główni Strategowie ]</div>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2">
              Strategiczne dowództwo.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
            {CORE.map((p, i) => {
              const accent =
                p.color === "magenta" ? { text: "text-magenta-neon", glow: "255,45,170", border: "hover:border-magenta-neon/40" } :
                p.color === "cyan" ? { text: "text-cyan-neon", glow: "0,229,197", border: "hover:border-cyan-neon/40" } :
                { text: "text-electric-yellow", glow: "255,230,0", border: "hover:border-electric-yellow/50" };
              return (
                <Reveal key={p.name} delay={i * 0.06}>
                  <Spotlight glowColor={accent.glow} className={`group h-full rounded-3xl border border-white/[0.06] ${accent.border} transition-colors`}>
                    <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-xl p-7 lg:p-9 clip-card">
                      <div className="flex items-start gap-6">
                        <Avatar name={p.name} color={p.color as "magenta" | "cyan" | "yellow"} />
                        <div className="flex-1">
                          <div className={`font-mono text-[10px] uppercase tracking-[0.32em] ${accent.text}`}>{p.arch}</div>
                          <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.name}</h3>
                          <div className="mt-1 text-sm text-bone-mute">{p.role}</div>
                        </div>
                      </div>
                      <p className="mt-7 text-[14.5px] leading-relaxed text-bone-mute">{p.domain}</p>
                      <div className="mt-7 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                        <span>Status: Active</span>
                        <span className={accent.text}>● online</span>
                      </div>
                    </div>
                  </Spotlight>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">[ The Operators · Eksperci specjalistyczni ]</div>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2">
              Twardzi praktycy. Każdy ze swoją mocą.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OPS.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.04}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full">
                  <div className="flex items-center gap-4">
                    <Avatar name={o.name} small color={i % 2 ? "cyan" : "magenta"} />
                    <div>
                      <div className="font-display text-[17px] font-medium tracking-tight">{o.name}</div>
                      <div className="text-xs text-bone-mute">{o.role}</div>
                    </div>
                  </div>
                  <div className="mt-5 h-px bg-gradient-to-r from-white/15 to-transparent" />
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-neon">{o.power}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Special Ops */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">[ Department of Security · Special Ops ]</div>
            <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2">
                  Łukasz Kaczmarek
                </h2>
                <div className="mt-2 text-bone-mute">Trener Bezpieczeństwa Osobistego · Archetyp: The Guardian</div>
                <p className="mt-6 text-[15.5px] leading-relaxed text-bone-mute max-w-xl">
                  Personal Security, zarządzanie ryzykiem fizycznym, ochrona VIP i
                  reputacji. W świecie pełnym cyfrowych zagrożeń bezpieczeństwo
                  fizyczne liderów jest fundamentem stabilności biznesu. MRTIQ dba
                  o umysł i kapitał, Łukasz domyka klamrę bezpieczeństwa osobistego.
                </p>
              </div>
              <div className="rounded-3xl border border-electric-yellow/30 bg-electric-yellow/[0.04] p-7 lg:p-9">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { k: "Domena", v: "Personal Security" },
                    { k: "Specjalizacja", v: "Risk · VIP · Reputation" },
                    { k: "Zasięg", v: "EU + Poland" },
                    { k: "Status", v: "Operational" },
                  ].map((m) => (
                    <div key={m.k}>
                      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">{m.k}</div>
                      <div className="mt-1 font-medium">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalGate />
    </>
  );
}

function Avatar({ name, color, small }: { name: string; color: "magenta" | "cyan" | "yellow"; small?: boolean }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  const c = color === "magenta" ? "from-magenta-neon/40 to-magenta-neon/10" :
            color === "cyan" ? "from-cyan-neon/40 to-cyan-neon/10" :
            "from-electric-yellow/40 to-electric-yellow/10";
  return (
    <div className={`relative ${small ? "h-12 w-12" : "h-20 w-20"} shrink-0 rounded-2xl bg-gradient-to-br ${c} hairline-strong grid place-items-center font-display ${small ? "text-base" : "text-2xl"} font-semibold tracking-tight`}>
      <span className="absolute inset-0 rounded-2xl bg-grid-fine opacity-50" />
      <span className="relative">{initials}</span>
    </div>
  );
}
