import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import Magnetic from "@/components/Magnetic";
import AcademyDragon from "@/components/sections/AcademyDragon";
import FinalGate from "@/components/sections/FinalGate";
import Link from "next/link";

const DEPARTMENTS = [
  { code: "01", name: "AI & Automatyzacja", glow: "cyan", desc: "Prompt eng., n8n, Clay, mikro-agenci, automatyzacje generujące ROI w 30 dni." },
  { code: "02", name: "Data & Business Intelligence", glow: "cyan", desc: "Analityka predykcyjna, GA4, data storytelling — decyzje na liczbach." },
  { code: "03", name: "Marketing Intelligence", glow: "magenta", desc: "Content engineering, PR, kryzys, retencja, lejki konwersji." },
  { code: "04", name: "Sales Masterclass", glow: "cyan", desc: "SPIN selling, negocjacje, hiper-personalizacja, cold mailing B2B." },
  { code: "05", name: "Biznes & Foundation", glow: "yellow", desc: "Lean startup, optymalizacja marży, modele biznesowe nowej generacji." },
  { code: "06", name: "Zarządzanie & Strategia", glow: "cyan", desc: "Procesy, efektywność, łańcuch wartości Portera." },
  { code: "07", name: "Prawo & Compliance", glow: "magenta", desc: "Prawo autorskie w AI, AI Act, RODO, regulacje umów IT." },
  { code: "08", name: "HR & Rekrutacja", glow: "magenta", desc: "Talent acquisition, employer branding, Growth Mindset w zespole." },
  { code: "09", name: "Ochrona Danych", glow: "cyan", desc: "Cyberbezpieczeństwo B2B, polityka dostępu, szyfrowanie, ryzyko." },
];

const METHOD = [
  { v: "10% / 90%", k: "Teoria / Praktyka" },
  { v: "Agnostyczne", k: "Narzędzia" },
  { v: "Twarde ROI", k: "Każdy moduł" },
  { v: "Architekci", k: "Trenerzy = praktycy" },
];

export default function SzkoleniaPage() {
  return (
    <>
      <PageHeader
        glow="cyan"
        index="[01]"
        eyebrow="Akademia · The Adaptation Protocol v.4.1"
        title="Wybierz swój Upgrade."
        titleAccent="Dominuj rynek."
        subtitle="Twoja firma to albo platforma innowacji, albo skansen procesów. Nie oferujemy nudnych wykładów — oferujemy twardą instalację kompetencji w 9 wymiarach biznesu. Całość możemy sfinansować z cudzych pieniędzy (UE)."
        meta={[
          { k: "Departamentów", v: "9" },
          { k: "Trenerów-praktyków", v: "12+" },
          { k: "Dofinansowanie UE", v: "100%" },
          { k: "Audyt budżetu", v: "48h" },
        ]}
      />

      {/* Flagship */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cyan-neon/30 bg-gradient-to-br from-cyan-neon/[0.08] via-ink to-magenta-neon/[0.06] p-8 lg:p-12">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-neon/20 blur-[100px]" />
              <div className="absolute -left-32 -bottom-20 h-72 w-72 rounded-full bg-magenta-neon/20 blur-[100px]" />
              <div className="relative grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">[ 01 · AI & Automatyzacja ]</div>
                  <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,4rem)] font-semibold tracking-tightest-2 leading-[1] text-balance">
                    Masterclass: AI w Sprzedaży i Marketingu
                  </h2>
                  <p className="mt-5 text-[15.5px] leading-relaxed text-bone-mute max-w-2xl">
                    Nie uczymy klikać w ChatGPT. Uczymy inżynierii promptów,
                    budowy mikro-agentów i automatyzacji, która generuje ROI w
                    30 dni. Zamieniamy handlowców w snajperów, marketerów w
                    architektów wzrostu.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {["Prospecting AI", "Treści PR", "Data Analityka", "n8n / Clay Integracje"].map((c) => (
                      <span key={c} className="font-mono text-[11px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-md bg-cyan-neon/10 text-cyan-neon">
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <Magnetic strength={0.35}>
                      <Link href="/#protokol" className="inline-flex items-center gap-2 rounded-full bg-electric-yellow px-6 py-3.5 text-sm font-semibold text-ink neon-yellow">
                        Zobacz pełny sylabus →
                      </Link>
                    </Magnetic>
                    <Link href="/dofinansowania" className="inline-flex items-center gap-2 rounded-full hairline-strong px-5 py-3 text-[13px] font-medium hover:border-white/20 transition-colors">
                      Sfinansuj z UE
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl border border-white/10 bg-ink/60 backdrop-blur p-6 font-mono text-[12px] leading-relaxed">
                    <div className="text-bone-mute">$ revos --train --module=ai-sales</div>
                    <div className="mt-2 text-cyan-neon">[init] Loading 12 prompt templates...</div>
                    <div className="text-cyan-neon">[init] Connecting Clay + n8n...</div>
                    <div className="text-magenta-neon">[ok]   Mini-agent deployed: lead-hunter</div>
                    <div className="text-magenta-neon">[ok]   Mini-agent deployed: cold-mailer</div>
                    <div className="text-bone">$ ROI projection · day 30:</div>
                    <div className="mt-1 text-electric-yellow text-glow-yellow text-2xl font-semibold">+187% pipeline</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Scroll-scrubbed dragon — The Academy Matrix (homepage-grade motion) */}
      <AcademyDragon />

      {/* Department Matrix */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">[ 03 · drzewo rozwoju ]</div>
                <h3 className="mt-4 font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2">
                  Skompletuj kompetencje.
                </h3>
              </div>
              <p className="max-w-md text-[14.5px] text-bone-mute">
                Dziewięć stalowych kart. Skompletuj kompetencje, których
                potrzebuje Twoja firma. Każda kategoria może być sfinansowana z UE.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEPARTMENTS.map((d, i) => {
              const accent =
                d.glow === "cyan" ? { glow: "0,229,197", color: "text-cyan-neon" } :
                d.glow === "magenta" ? { glow: "255,45,170", color: "text-magenta-neon" } :
                { glow: "255,230,0", color: "text-electric-yellow" };
              return (
                <Reveal key={d.code} delay={i * 0.05}>
                  <Spotlight glowColor={accent.glow} className="group h-full">
                    <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-7 transition-colors group-hover:border-white/20">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em]">
                        <span className="text-bone-mute">[{d.code}]</span>
                        <span className={accent.color}>● glow</span>
                      </div>
                      <div className="mt-6 font-display text-[22px] font-medium tracking-tight text-balance">{d.name}</div>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-bone-mute">{d.desc}</p>
                      <div className="mt-7 h-px bg-gradient-to-r from-white/15 to-transparent" />
                      <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                        <span>Możliwe 100% UE</span>
                        <span className={`${accent.color} transition-transform duration-300 group-hover:translate-x-1`}>→</span>
                      </div>
                    </div>
                  </Spotlight>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h3 className="font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2 max-w-3xl">
              Sale szkoleniowe pachną kawą. <span className="text-bone-mute">My uczymy w Terminalu.</span>
            </h3>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {METHOD.map((m, i) => (
              <Reveal key={m.v} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 h-full">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">[✓]</div>
                  <div className="mt-3 font-display text-3xl font-semibold tracking-tight">{m.v}</div>
                  <div className="mt-1 text-sm text-bone-mute">{m.k}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 relative rounded-2xl border border-magenta-neon/30 bg-magenta-neon/[0.04] p-6 lg:p-8 flex flex-wrap items-center justify-between gap-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-magenta-neon">
                [system override] Chcesz pójść krok dalej? Nie bądź uczestnikiem. Zostań ewangelistą AI.
              </div>
              <Link href="/train-the-trainer" className="inline-flex items-center gap-2 rounded-full hairline-strong bg-ink/60 px-5 py-3 text-[13px] font-medium hover:border-magenta-neon/40 transition-colors">
                Poznaj Train-The-Trainer →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalGate />
    </>
  );
}
