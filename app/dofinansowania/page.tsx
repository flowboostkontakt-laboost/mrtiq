import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import FinalGate from "@/components/sections/FinalGate";

const STEPS = [
  { code: "01. PING", t: "Skanowanie NIP-u", d: "Wpisujesz NIP. W 48 godzin weryfikujemy bezpłatnie pule budżetów PARP, KFS, BUR i regionalnych dla Twojej branży." },
  { code: "02. OVERRIDE", t: "Generowanie wniosku", d: "Nasi specjaliści piszą wniosek językiem, który kochają algorytmy urzędnicze. Ty autoryzujesz dokument." },
  { code: "03. UPLOAD", t: "Zastrzyk gotówki i akcja", d: "Środki odblokowane. Trenerzy MRTIQ i inżynierowie Konik Systems wkraczają do Twojej firmy." },
  { code: "04. CLEAR", t: "Czyste rozliczenie", d: "Zamykamy projekt papierowo. Odbieramy certyfikaty, dostarczamy raporty do urzędu. Proces zakończony." },
];

const FUNDED = [
  {
    tag: "[SKILL]",
    t: "Upgrade umysłów",
    p: "Akademia MRTIQ",
    d: "Szkolenia AI w sprzedaży, Marketing Intelligence, Prawo, Analityka. Pełna instalacja kompetencji.",
    pct: "do 100%",
    color: "magenta",
  },
  {
    tag: "[GOLEM]",
    t: "Cyfrowa zbrojownia",
    p: "Konik RevOS",
    d: "66 Agentów AI · 180 procesów · pełne wdrożenie systemu przez inżynierów Konik Systems.",
    pct: "Cyfryzacja UE",
    color: "cyan",
  },
  {
    tag: "[ELITE]",
    t: "Certyfikacja",
    p: "Train-The-Trainer",
    d: "Sfinansowanie uczestnictwa Twoich liderów w elitarnym programie TTT.",
    pct: "Edukacja kadry",
    color: "yellow",
  },
];

export default function FundingPage() {
  return (
    <>
      <PageHeader
        glow="cyan"
        index="[03]"
        eyebrow="EU Funding Protocol · System Active"
        title="Twój budżet leży na cudzym koncie."
        titleAccent="Odbierzmy go."
        subtitle="Unia Europejska ma miliardy na Twoją transformację cyfrową. Przestań palić własną gotówkę. Nasza jednostka przejmuje biurokratyczny chaos, pozyskuje do 100% dofinansowania, a następnie instaluje w Twojej firmie kompetencje przyszłości."
        meta={[
          { k: "Skuteczność", v: "94%" },
          { k: "Audyt potencjału", v: "48h" },
          { k: "Twoja praca", v: "1 podpis" },
          { k: "Ukryte koszty", v: "0 PLN" },
        ]}
      />

      {/* Objection */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5.2vw,5rem)] font-semibold tracking-tightest-2 max-w-4xl">
              Zmieniamy urzędowy koszmar w <span className="text-bone-mute">czysty zysk.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Reveal>
              <div className="rounded-3xl border border-magenta-neon/30 bg-magenta-neon/[0.04] p-8 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">Ich obawa</div>
                <p className="mt-4 text-[17px] leading-relaxed text-bone">
                  „Fundusze unijne to stosy papierów, miesiące czekania, skomplikowane
                  rozliczenia i ryzyko zwrotu środków.”
                </p>
                <div className="mt-6 font-mono text-[10px] tracking-[0.28em] uppercase text-bone-mute">
                  ─ Standardowy CFO, 2026
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-cyan-neon/30 bg-cyan-neon/[0.04] p-8 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">Nasz Hack</div>
                <p className="mt-4 text-[17px] leading-relaxed text-bone">
                  Właśnie dlatego konkurencja po nie nie sięga. Traktujemy system
                  dotacji jak kod do zhakowania. Mamy w zespole Architektów
                  Finansowania (Grant Writers). Ty dostarczasz NIP. My walczymy z
                  urzędem, piszemy, pilnujemy, rozliczamy.
                </p>
                <div className="mt-6 font-mono text-[10px] tracking-[0.28em] uppercase text-cyan-neon">
                  Czyste ręce. Pełne konto.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we fund */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2">
              Za co zapłaci UE w Twojej firmie?
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {FUNDED.map((c, i) => {
              const accent =
                c.color === "magenta" ? { glow: "255,45,170", text: "text-magenta-neon", border: "hover:border-magenta-neon/40" } :
                c.color === "cyan" ? { glow: "0,229,197", text: "text-cyan-neon", border: "hover:border-cyan-neon/40" } :
                { glow: "255,230,0", text: "text-electric-yellow", border: "hover:border-electric-yellow/50" };
              return (
                <Reveal key={c.tag} delay={i * 0.06}>
                  <Spotlight glowColor={accent.glow} className={`group h-full rounded-3xl border border-white/[0.06] ${accent.border} transition-colors`}>
                    <div className="h-full rounded-3xl bg-white/[0.025] backdrop-blur-xl p-8 clip-card">
                      <div className={`font-mono text-[10px] uppercase tracking-[0.32em] ${accent.text}`}>{c.tag}</div>
                      <div className="mt-3 font-mono text-[11px] tracking-[0.18em] uppercase text-bone-mute">{c.p}</div>
                      <div className="mt-5 font-display text-3xl font-semibold tracking-tight">{c.t}</div>
                      <p className="mt-4 text-[14.5px] leading-relaxed text-bone-mute">{c.d}</p>
                      <div className="mt-7 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">Dofinansowanie</span>
                        <span className={`font-mono text-[12px] uppercase tracking-[0.18em] ${accent.text}`}>{c.pct}</span>
                      </div>
                    </div>
                  </Spotlight>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Protocol Steps */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2 max-w-2xl">
              4 kroki do odblokowania kapitału.
            </h2>
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-4 relative">
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-cyan-neon via-magenta-neon to-electric-yellow opacity-50" />
            {STEPS.map((s, i) => (
              <Reveal key={s.code} delay={i * 0.08}>
                <li className="relative h-full rounded-2xl border border-white/[0.06] bg-ink/60 backdrop-blur p-6">
                  <div className="absolute -top-3 left-6 rounded-md bg-electric-yellow px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink">
                    {s.code}
                  </div>
                  <div className="mt-4 font-display text-xl font-medium tracking-tight">{s.t}</div>
                  <p className="mt-2 text-sm text-bone-mute leading-relaxed">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2">
              Matematyka nie kłamie.
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { k: "94%", v: "Skuteczność wniosków z poprawnie zdiagnozowanych profili", c: "text-cyan-neon" },
              { k: "42 mln+", v: "PLN przetransferowanych na innowacje naszych klientów", c: "text-magenta-neon" },
              { k: "0 PLN", v: "Ukrytych kosztów — wynagrodzenie często z pozyskanej puli", c: "text-electric-yellow" },
            ].map((s) => (
              <div key={s.k} className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 lg:p-9">
                <div className={`font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-tightest-2 leading-none ${s.c}`}>
                  {s.k}
                </div>
                <div className="mt-4 text-[13px] text-bone-mute leading-relaxed">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalGate />
    </>
  );
}
