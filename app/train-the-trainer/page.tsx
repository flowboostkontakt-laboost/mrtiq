"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, animate as fmAnimate } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { Reveal, MaskReveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import Magnetic from "@/components/Magnetic";

/* ─────────────────────────────────────────────────────────
   TTT 2026 — landing pod plan MRTIQ_TTT_landing_plan.md
   Pozycjonowanie: trener-wdrożeniowiec systemu Konik RevOS
   Komunikacja uczciwa: bez gwarancji zarobku, bez „100%",
   rozdzielenie MRTIQ (szkolenia/dotacje) od Konik RevOS (produkt).
   CTA spójne: „Umów konsultację" × 3 (hero, cena, finalne).
   ───────────────────────────────────────────────────────── */

const ORBS = [
  { n: 1, t: "Diagnoza", d: "Audyt wąskich gardeł — gdzie firma traci tlen.", color: "cyan" as const },
  { n: 2, t: "Strategia", d: "Mapa wdrożenia. Sekwencja kroków, nie listy życzeń.", color: "magenta" as const },
  { n: 3, t: "Dane", d: "Pipeline pomiarowy. Bez danych nie ma decyzji.", color: "cyan" as const },
  { n: 4, t: "Treść & Produkcja", d: "Fabryka contentu. Skala bez utraty głosu marki.", color: "yellow" as const },
  { n: 5, t: "Dystrybucja", d: "Lejki, ads, automatyzacja kontaktu.", color: "magenta" as const },
  { n: 6, t: "Sprzedaż", d: "Konsultacyjnie. SPIN, MEDDIC, narzędzia obiekcji.", color: "cyan" as const },
  { n: 7, t: "Wdrożenie", d: "Operatorzy w firmie klienta. System wchodzi w krwiobieg.", color: "yellow" as const },
];

const DAYS = [
  { n: "01", t: "Fundamenty / Compliance", d: "RODO, prawa autorskie, AI Act — operacyjnie, nie teoretycznie." },
  { n: "02", t: "Wywiad / Strategia", d: "Konsultacja jako proces — odkrywanie ukrytych potrzeb." },
  { n: "03", t: "Fabryka Treści", d: "Skalowanie produkcji content marketingowej z LLM." },
  { n: "04", t: "Wizja, Wideo & Audio", d: "Higgsfield, Veo, ElevenLabs — produkcja multimedialna." },
  { n: "05", t: "Web, Lejki & Ads", d: "Konstrukcja stron, optymalizacja ścieżek konwersji." },
  { n: "06", t: "Sprzedaż & Growth", d: "Procesy sprzedaży B2B + automatyzacja outreachu." },
  { n: "07", t: "PR, Analityka & Ekosystem", d: "Data storytelling. Mierzenie tego, co się liczy." },
  { n: "08", t: "Rola Trenera & Egzamin", d: "7 h. Praktyczna walidacja przed komisją MRTIQ." },
];

const PATHS = [
  {
    id: "a",
    code: "Ścieżka A",
    title: "Niezależny trener",
    price: "9 600 zł / 9 miesięcy",
    pitch: "Praca solo. Własna baza klientów, własne stawki, własna marka.",
    bullets: [
      "Mentoring 1×/tydzień × 60 min przez 9 miesięcy",
      "Pełen dostęp do materiałów programu",
      "Bez zobowiązań kontraktowych po programie",
    ],
    accent: "cyan" as const,
    badge: null,
  },
  {
    id: "b",
    code: "Ścieżka B",
    title: "Partner B2B",
    price: "6 720 zł (−30% rabatu)",
    pitch: "Wdrożenia pod parasolem Grupy KONIK. Stabilny dopływ projektów.",
    bullets: [
      "Stawki współpracy: 69–96 zł/h operacyjne, 240 zł/h trenerskie",
      "70% z jednorazowej opłaty wdrożeniowej",
      "NDA + non-compete 6 miesięcy",
      "Dostęp do pipeline'u leadów Grupy KONIK",
    ],
    accent: "yellow" as const,
    badge: "Najpopularniejsza",
  },
  {
    id: "c",
    code: "Ścieżka C",
    title: "Niezależny licencjobiorca",
    price: "Zniżki: 12 / 15 / 21 / 24%",
    pitch: "Licencja na używanie Konik RevOS we własnej firmie.",
    bullets: [
      "Zniżki na abonament: 12 / 15 / 21 / 24% w zależności od skali",
      "Bez obowiązku trenerskiego",
      "Dla firm, które chcą używać systemu wewnętrznie",
    ],
    accent: "magenta" as const,
    badge: null,
  },
];

const NUMBERS = [
  { k: "66", v: "Agentów AI", color: "yellow" as const },
  { k: "180", v: "Procesów", color: "cyan" as const },
  { k: "45", v: "Narzędzi", color: "magenta" as const },
  { k: "60+", v: "Ekspertów w treści", color: "yellow" as const },
];

const PREREQ = [
  { n: "01", t: "Anthropic Academy", d: "AI Fluency" },
  { n: "02", t: "Google", d: "AI Essentials" },
  { n: "03", t: "Microsoft", d: "AI-900 Fundamentals" },
  { n: "04", t: "Meta", d: "Blueprint" },
  { n: "05", t: "LinkedIn", d: "AI lub Marketing" },
  { n: "06", t: "EU AI Act", d: "Świadomość regulacji" },
];

const DREAM_TEAM = [
  { n: "Kahneman", d: "decyzje", size: "lg" as const, color: "cyan" as const },
  { n: "Cialdini", d: "wpływ", size: "lg" as const, color: "magenta" as const },
  { n: "Ogilvy", d: "reklama", size: "md" as const, color: "yellow" as const },
  { n: "Dunford", d: "pozycjonowanie", size: "lg" as const, color: "cyan" as const },
  { n: "Voss", d: "negocjacje", size: "md" as const, color: "magenta" as const },
  { n: "Rackham", d: "SPIN", size: "sm" as const, color: "yellow" as const },
  { n: "Brunson", d: "lejki", size: "md" as const, color: "cyan" as const },
  { n: "Sinek", d: "Why", size: "sm" as const, color: "magenta" as const },
  { n: "Godin", d: "permission", size: "md" as const, color: "yellow" as const },
  { n: "Ariely", d: "irracjonalność", size: "sm" as const, color: "cyan" as const },
  { n: "Christensen", d: "JTBD", size: "md" as const, color: "magenta" as const },
  { n: "Kaushik", d: "analityka", size: "sm" as const, color: "yellow" as const },
  { n: "Dweck", d: "growth mindset", size: "sm" as const, color: "cyan" as const },
  { n: "Cagan", d: "produkt", size: "md" as const, color: "magenta" as const },
  { n: "Deming", d: "proces", size: "sm" as const, color: "yellow" as const },
  { n: "Wiebe", d: "copywriting", size: "sm" as const, color: "cyan" as const },
];

const FAQ = [
  {
    q: "Czy gwarantujecie zarobek po programie?",
    a: "Nie. Świadomie nie gwarantujemy żadnych przychodów. To, co zarobisz, zależy od Twojego rynku, ścieżki współpracy, profilu klientów i Twojej własnej pracy. Pokazujemy stawki rynkowe (Ścieżka B: 69–96 zł/h operacyjne, 240 zł/h trenerskie) — ale to nie jest obietnica.",
  },
  {
    q: "Czy muszę umieć programować?",
    a: "Nie. Program uczy wdrażania i konfiguracji gotowego systemu Konik RevOS — agentów, procesów, narzędzi. Nie uczymy budowy agentów od zera ani programowania. To rola inżynierska, prowadzona oddzielnie w Konik Systems.",
  },
  {
    q: "Ile to naprawdę kosztuje?",
    a: "Cena katalogowa: 9 990 zł netto za pełen program (63 h, 8 dni). Po BUR do 95% wkład własny ≈ 499,50 zł netto — zależnie od kwalifikowalności Twojej firmy i dostępności środków. Egzamin: 600 zł netto. Mentoring po programie: zależnie od ścieżki (A: 9 600 zł / 9 mies, B: 6 720 zł, C: brak).",
  },
  {
    q: "Jaka jest różnica między MRTIQ a Konik RevOS?",
    a: "MRTIQ — marka szkoleniowa i konsultingowa. Prowadzimy programy, akredytacje, dotacje. Konik RevOS — produkt (system 66 agentów, 180 procesów, 45 narzędzi). MRTIQ uczy używania RevOS i wdraża go u klientów. To dwie różne osoby prawne i dwa różne komunikaty.",
  },
  {
    q: "Jak wygląda egzamin?",
    a: "Praktyczna walidacja przed komisją MRTIQ — pokazujesz wdrożenie wybranego scenariusza biznesowego z Konik RevOS. Trwa do 7 godzin (dzień 8 programu). Komisja ocenia: jakość konfiguracji, prowadzenia rozmowy z klientem-aktorem, mierzalność efektu, zgodność z RODO/AI Act.",
  },
  {
    q: "Co jeśli nie zdam egzaminu?",
    a: "Powtórka: 300 zł netto, do umówienia w ciągu 6 miesięcy od pierwszego podejścia. Otrzymujesz konkretne wskazówki, co dopracować — nie generyczny feedback. Dwukrotne niezdanie blokuje certyfikat na 12 miesięcy.",
  },
];

const MICRO_HERO = [
  { k: "63 h", v: "Programu" },
  { k: "do 95%", v: "Dofinansowania BUR" },
  { k: "3", v: "Ścieżki współpracy" },
];

export default function TTTPage() {
  return (
    <>
      <PageHeader
        glow="yellow"
        index="[02]"
        eyebrow="Train-The-Trainer · Edycja 2026 · Konik RevOS"
        title="Zautomatyzujemy nudę."
        titleAccent="Ty będziesz grał jazz."
        subtitle="Zostań certyfikowanym trenerem-wdrożeniowcem systemu Konik RevOS — 66 agentów, 180 procesów, 45 narzędzi. Program akredytowany pod dofinansowanie BUR. Nie kurs z AI. Konkretne rzemiosło z walidacją egzaminem."
        right={
          <div className="rounded-3xl border border-electric-yellow/30 bg-electric-yellow/[0.04] p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">
              Program 2026
            </div>
            <div className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Limitowane jakością
            </div>
            <p className="mt-2 text-sm text-bone-mute">
              Grupy 3–12 osób. Decyzja komisji MRTIQ po teście kwalifikacyjnym i rozmowie.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Magnetic strength={0.35}>
                <Link
                  href="#konsultacja"
                  className="inline-flex items-center gap-2 rounded-full bg-electric-yellow px-5 py-3 text-sm font-bold text-ink neon-yellow"
                >
                  Umów konsultację →
                </Link>
              </Magnetic>
              <Link
                href="#program"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-bone hover:border-white/30 hover:bg-white/[0.04] transition-colors"
              >
                Zobacz program
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 pt-5 border-t border-white/[0.08]">
              {MICRO_HERO.map((m) => (
                <div key={m.k}>
                  <div className="font-display text-base font-semibold tracking-tight text-electric-yellow">
                    {m.k}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-bone-mute">
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* ── [01] DLACZEGO — Stara droga vs Droga trenera RevOS ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              [01] · Dlaczego
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>Rynek się polaryzuje.</MaskReveal>{" "}
              <span className="text-bone-mute">
                <MaskReveal delay={0.06}>Wybierasz stronę.</MaskReveal>
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
              Do 2026 r. rynek dzieli się na tych, którzy sprzedają godziny, i tych,
              którzy wdrażają systemy. Skala przez ludzi to chaos. Skala przez wiedzę
              jest powtarzalna.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Reveal>
              <div className="relative h-full rounded-3xl border border-white/[0.07] bg-white/[0.015] p-7 lg:p-9">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                  Stara droga
                </div>
                <div className="mt-4 font-display text-2xl lg:text-[28px] tracking-tight font-semibold text-bone-mute">
                  Sprzedaż godzin.
                </div>
                <ul className="mt-7 space-y-3.5 text-[14.5px] leading-relaxed text-bone-mute">
                  {[
                    "Walka ceną z innymi konsultantami / freelancerami",
                    "Sufit zarobkowy = liczba godzin w dobie",
                    "Skala = więcej ludzi = więcej chaosu w jakości",
                    "Brak własnego produktu, brak zaplecza technologicznego",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="shrink-0 text-bone-mute/40">·</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <Spotlight glowColor="0,229,197" className="group h-full">
                <div className="relative h-full rounded-3xl border border-cyan-neon/40 bg-gradient-to-br from-cyan-neon/[0.06] to-transparent p-7 lg:p-9 transition-colors group-hover:border-cyan-neon/60">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">
                    Droga trenera RevOS
                  </div>
                  <div className="mt-4 font-display text-2xl lg:text-[28px] tracking-tight font-semibold text-cyan-neon">
                    Wdrażanie systemu.
                  </div>
                  <ul className="mt-7 space-y-3.5 text-[14.5px] leading-relaxed text-bone">
                    {[
                      "Wdrażasz gotowy produkt, nie sprzedajesz godzin",
                      "Skala przez wiedzę i licencje, nie przez etaty",
                      "Stawki rynkowe (Ścieżka B: 69–96 zł / 240 zł trenerskie)",
                      "Walidacja kompetencji egzaminem — status profesjonalisty",
                    ].map((s, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="shrink-0 text-cyan-neon">→</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Spotlight>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── [02] JEST / NIE JEST — pozycjonowanie przez granice (Dunford) ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="absolute inset-0 bg-grid-fine opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">
              [02] · Granice programu
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>To program o jasnych granicach.</MaskReveal>
            </h2>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
              Pokazujemy, czym to JEST i czym NIE jest, żebyś wiedział, na co się
              umawiasz. Lepiej odsiać teraz niż rozczarować potem.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Reveal>
              <div className="rounded-3xl border border-cyan-neon/30 bg-gradient-to-br from-cyan-neon/[0.04] to-transparent p-7 lg:p-9 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">
                  Program JEST
                </div>
                <ul className="mt-7 space-y-4 text-[14.5px] leading-relaxed text-bone">
                  {[
                    "Wdrażaniem i konfiguracją gotowych agentów / procesów Konik RevOS",
                    "Biegłością w 45 narzędziach technologicznych ekosystemu",
                    "Walidacją kompetencji — egzamin przed komisją MRTIQ",
                    "Trzema modelami współpracy po programie (A, B, C)",
                    "W pełni akredytowany pod dofinansowanie BUR (do 95%)",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <DrawCheck delay={i * 0.12} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="rounded-3xl border border-magenta-neon/30 bg-gradient-to-br from-magenta-neon/[0.04] to-transparent p-7 lg:p-9 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-magenta-neon">
                  Program NIE JEST
                </div>
                <ul className="mt-7 space-y-4 text-[14.5px] leading-relaxed text-bone">
                  {[
                    "Budową agentów AI od zera — to robi Konik Systems",
                    "Programowaniem / inżynierią — uczymy konfiguracji, nie kodu",
                    "Gwarancją zarobku — pokazujemy stawki, nie obietnice",
                    "Finansowaniem sprzętu (laptop / iPhone / okulary AR)",
                    "Kolejnym ogólnikowym kursem z AI — to konkretne rzemiosło",
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <DrawCross delay={i * 0.12} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── [03] 7 SMOCZYCH KUL — gamifikacja procesu ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">
              [03] · 7 Smoczych Kul
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>Siedem kroków podróży.</MaskReveal>{" "}
              <span className="text-bone-mute">
                <MaskReveal delay={0.06}>14 etapów skondensowanych.</MaskReveal>
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
              Konik RevOS to 14 departamentów × 14 etapów wdrożenia. W programie
              destylujemy je do siedmiu kroków, które realnie prowadzisz u klienta.
            </p>
          </Reveal>

          <OrbsConstellation />
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 relative z-10">
            {ORBS.map((orb, i) => (
              <Reveal key={orb.n} delay={i * 0.05}>
                <Orb orb={orb} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── [04] LICZBY — pasek statystyk ── */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-black/40">
        <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              [04] · System w liczbach
            </div>
            <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>Co Ty wdrażasz.</MaskReveal>
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {NUMBERS.map((stat, i) => {
              const color =
                stat.color === "cyan"
                  ? "text-cyan-neon"
                  : stat.color === "magenta"
                  ? "text-magenta-neon"
                  : "text-electric-yellow";
              const glow =
                stat.color === "cyan"
                  ? "0,229,197"
                  : stat.color === "magenta"
                  ? "255,45,170"
                  : "255,230,0";
              return (
                <Reveal key={stat.k} delay={i * 0.06}>
                  <div className="relative rounded-2xl border border-white/[0.07] bg-ink/60 backdrop-blur-xl p-6 overflow-hidden">
                    {/* ambient pulse glow w tle */}
                    <motion.div
                      className="absolute -inset-8 rounded-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle at 30% 30%, rgba(${glow},0.18), transparent 60%)` }}
                      animate={{ opacity: [0.4, 0.85, 0.4] }}
                      transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                    />
                    <div className={`relative font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold tracking-tight leading-none ${color}`}>
                      <CounterNum value={stat.k} delayMs={i * 120} />
                    </div>
                    {/* mini progress underline */}
                    <motion.div
                      className="relative mt-3 h-px overflow-hidden"
                      style={{ background: `rgba(${glow},0.18)` }}
                    >
                      <motion.div
                        className="absolute inset-y-0 left-0"
                        style={{ background: `rgba(${glow},1)`, boxShadow: `0 0 8px rgba(${glow},0.8)` }}
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ duration: 1.4, delay: i * 0.12 + 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                      />
                    </motion.div>
                    <div className="relative mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                      {stat.v}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── [05] PROGRAM 8 DNI ── */}
      <section id="program" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">
              [05] · Program · 8 dni
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>Dzień po dniu.</MaskReveal>{" "}
              <span className="text-bone-mute">
                <MaskReveal delay={0.06}>Bez lania wody.</MaskReveal>
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
              63 godziny zajęć w 8 dni. Każdy dzień ma jeden cel kompetencyjny.
              Dzień 8 to egzamin (7 h).
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DAYS.map((day, i) => (
              <Reveal key={day.n} delay={i * 0.05}>
                <motion.div
                  className="relative h-full rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6 transition-colors hover:border-magenta-neon/40 overflow-hidden"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  {/* Mini progress bar wypełnia się od 0 do (i+1)/8 — kaskada */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-white/[0.05]">
                    <motion.div
                      className="absolute inset-y-0 left-0"
                      style={{
                        background:
                          day.n === "08"
                            ? "linear-gradient(90deg, #FF2DAA, #FFE600)"
                            : "linear-gradient(90deg, #FF2DAA, #00E5C5)",
                        boxShadow: "0 0 8px currentColor",
                      }}
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${((i + 1) / DAYS.length) * 100}%` }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 1.0, delay: i * 0.08 + 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                    />
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                    <span className="text-magenta-neon">Dzień {day.n}</span>
                    {day.n === "08" && (
                      <motion.span
                        className="rounded-md border border-electric-yellow/40 bg-electric-yellow/10 px-2 py-0.5 text-[9px] tracking-[0.18em] text-electric-yellow"
                        animate={{
                          boxShadow: [
                            "0 0 0px rgba(255,230,0,0)",
                            "0 0 14px rgba(255,230,0,0.7)",
                            "0 0 0px rgba(255,230,0,0)",
                          ],
                        }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Egzamin · 7h
                      </motion.span>
                    )}
                  </div>
                  <div className="mt-5 font-display text-lg tracking-tight font-medium leading-tight">
                    {day.t}
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-bone-mute">{day.d}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── [06] 3 ŚCIEŻKI WSPÓŁPRACY ── */}
      <section id="sciezki" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              [06] · Co po egzaminie
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>Trzy ścieżki współpracy.</MaskReveal>{" "}
              <span className="text-bone-mute">
                <MaskReveal delay={0.06}>Jasne warunki.</MaskReveal>
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
              Wybierasz model po egzaminie. Każda ścieżka ma jasne warunki,
              widoczne stawki, brak ukrytych kruczków.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {PATHS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <PathCard path={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── [07] CENA I DOFINANSOWANIE ── */}
      <section id="cena" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="h-[480px] w-[480px] rounded-full bg-electric-yellow/12 blur-[140px] animate-breathe" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">
              [07] · Cena i dofinansowanie
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>9 990 zł netto.</MaskReveal>{" "}
              <span className="text-electric-yellow">
                <MaskReveal delay={0.06}>Z BUR do 95% — wkład własny od 499,50 zł.</MaskReveal>
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5">
            <Reveal className="lg:col-span-7">
              <div className="relative rounded-3xl border border-electric-yellow/30 bg-gradient-to-br from-electric-yellow/[0.06] to-transparent p-7 lg:p-10 h-full overflow-hidden">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-electric-yellow/20 blur-[80px] pointer-events-none" />

                <div className="relative">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                    Cena katalogowa
                  </div>
                  <div className="mt-3 flex items-baseline gap-4 flex-wrap">
                    <span className="relative font-display text-5xl lg:text-6xl font-semibold tracking-tight text-bone-mute">
                      9 990 zł
                      {/* Animowane przekreślenie — rysuje się od lewej do prawej */}
                      <motion.svg
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 pointer-events-none"
                        viewBox="0 0 100 2"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <motion.line
                          x1="0"
                          y1="1"
                          x2="100"
                          y2="1"
                          stroke="rgba(255,45,170,0.85)"
                          strokeWidth="1.8"
                          vectorEffect="non-scaling-stroke"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true, margin: "-15% 0px" }}
                          transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
                          style={{ filter: "drop-shadow(0 0 4px rgba(255,45,170,0.9))" }}
                        />
                      </motion.svg>
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-mute">netto</span>
                  </div>

                  <div className="mt-8 h-px bg-gradient-to-r from-electric-yellow/40 via-electric-yellow/10 to-transparent" />

                  <div className="mt-8">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric-yellow">
                      Wkład własny przy BUR do 95%
                    </div>
                    <motion.div
                      className="mt-3 flex items-baseline gap-3 flex-wrap"
                      initial={{ opacity: 0, scale: 0.7, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-15% 0px" }}
                      transition={{
                        type: "spring",
                        stiffness: 110,
                        damping: 14,
                        delay: 1.4, // po przekreśleniu
                      }}
                    >
                      <motion.span
                        className="font-display text-6xl lg:text-7xl font-semibold tracking-tightest-2 text-electric-yellow neon-text-yellow"
                        animate={{
                          textShadow: [
                            "0 0 24px rgba(255,230,0,0.6), 0 0 48px rgba(255,230,0,0.3)",
                            "0 0 40px rgba(255,230,0,0.95), 0 0 80px rgba(255,230,0,0.55)",
                            "0 0 24px rgba(255,230,0,0.6), 0 0 48px rgba(255,230,0,0.3)",
                          ],
                        }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                      >
                        499,50 zł
                      </motion.span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-mute">netto</span>
                    </motion.div>
                    <p className="mt-3 text-[13px] leading-relaxed text-bone-mute max-w-md">
                      Z zastrzeżeniem kwalifikowalności Twojej firmy do BUR i dostępności środków.
                      Realny koszt potwierdzamy w konsultacji.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-3">
                    <Magnetic strength={0.35}>
                      <Link
                        href="#konsultacja"
                        className="inline-flex items-center gap-2 rounded-full bg-electric-yellow px-6 py-3.5 text-[14px] font-bold text-ink neon-yellow"
                      >
                        Sprawdź swoje dofinansowanie →
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.08}>
              <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-7 lg:p-8 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                  Lista faktów
                </div>
                <ul className="mt-6 space-y-4">
                  {[
                    { k: "63 h", v: "Łącznie zajęć" },
                    { k: "8 dni", v: "Rozłożone w czasie" },
                    { k: "~158 zł", v: "Za osobogodzinę (cena katalogowa)" },
                    { k: "do 95%", v: "Maks. dofinansowanie BUR" },
                    { k: "600 zł", v: "Egzamin (osobno, netto)" },
                    { k: "300 zł", v: "Powtórka egzaminu (gdy potrzebna)" },
                  ].map((f) => (
                    <li
                      key={f.k}
                      className="flex items-baseline justify-between gap-4 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0"
                    >
                      <span className="font-display text-xl tracking-tight font-semibold text-bone">
                        {f.k}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute text-right">
                        {f.v}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── [08] PREREKWIZYTY ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">
              [08] · Prerekwizyty
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>To nie program dla każdego.</MaskReveal>
            </h2>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
              Wymagamy fundamentu kompetencyjnego — w trakcie programu uczymy zastosowań,
              a nie podstaw. Bez fundamentu zostajesz w tyle.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5">
            <Reveal className="lg:col-span-7">
              <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-7 lg:p-9 h-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">
                  Minimum 4 z 6 certyfikatów
                </div>
                <div className="mt-3 font-display text-2xl tracking-tight font-semibold text-bone">
                  Aktualne, ukończone, weryfikowalne.
                </div>
                <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PREREQ.map((p) => (
                    <div
                      key={p.n}
                      className="rounded-2xl border border-white/[0.08] bg-ink/40 px-5 py-4"
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-neon">
                        {p.n}
                      </div>
                      <div className="mt-2 font-display text-[15px] tracking-tight font-medium text-bone">
                        {p.t}
                      </div>
                      <div className="mt-1 text-[12.5px] text-bone-mute">{p.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-5" delay={0.08}>
              <div className="rounded-3xl border border-magenta-neon/30 bg-magenta-neon/[0.04] p-7 lg:p-8 h-full flex flex-col">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-magenta-neon">
                  Brama wejścia
                </div>
                <ul className="mt-6 space-y-4 text-[14px] leading-relaxed text-bone">
                  <li className="flex gap-3">
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.24em] text-magenta-neon mt-1">
                      01
                    </span>
                    <span>
                      <span className="text-bone font-medium">≥ 2 lata doświadczenia</span> w marketingu,
                      sprzedaży, konsultingu lub szkoleniach
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.24em] text-magenta-neon mt-1">
                      02
                    </span>
                    <span>
                      <span className="text-bone font-medium">Test kwalifikacyjny: 210 zł netto</span> —
                      odsiewa niedopasowanych przed inwestycją czasu
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.24em] text-magenta-neon mt-1">
                      03
                    </span>
                    <span>
                      <span className="text-bone font-medium">Decyzja komisji MRTIQ</span> po teście i
                      rozmowie — przyjmujemy 3–12 osób / edycję
                    </span>
                  </li>
                </ul>

                <div className="mt-auto pt-6 border-t border-magenta-neon/20">
                  <p className="text-[12.5px] leading-relaxed text-bone-mute">
                    <span className="text-magenta-neon font-medium">Nie spełniasz warunków?</span>{" "}
                    Wskażemy konkretnie, jak uzupełnić. Bez ghostingu.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── [09] DREAM TEAM — chmura ekspertów ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">
              [09] · Dream Team
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>Uczysz się systemu,</MaskReveal>{" "}
              <span className="text-bone-mute">
                <MaskReveal delay={0.06}>który koduje wiedzę mistrzów.</MaskReveal>
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
              60+ autorów światowej literatury biznesowej i marketingowej, których frameworki
              są wbudowane bezpośrednio w prompty agentów. Nie cytaty — operacyjne narzędzia.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-fine opacity-20" aria-hidden />
              <div className="relative flex flex-wrap gap-3 lg:gap-4 items-center justify-center">
                {DREAM_TEAM.map((tag, i) => (
                  <TagChip key={i} tag={tag} index={i} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── [10] FAQ ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              [10] · FAQ
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0]">
              <MaskReveal>Najczęstsze obiekcje.</MaskReveal>
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-bone-mute">
              Nazywamy je, zanim je wypowiesz. Jeśli czegoś brakuje — pytasz w konsultacji.
            </p>
          </Reveal>

          <div className="mt-12 space-y-3">
            {FAQ.map((f, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <FAQItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── [11] FINAL CTA — „Umów konsultację" ── */}
      <FinalCTA />

      {/* ── STOPKA: dane JDG + pełny disclaimer ── */}
      <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm text-bone-mute">
            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">
                Organizator programu
              </div>
              <div className="mt-3 font-display text-xl tracking-tight font-semibold text-bone">
                Paweł Michta · MRTIQ
              </div>
              <div className="mt-3 space-y-1 text-[13.5px] leading-relaxed">
                <div>Szafarnia 11/F8</div>
                <div>80-755 Gdańsk</div>
                <div className="font-mono text-[12px] tracking-[0.12em]">NIP 5833042686</div>
              </div>
              <p className="mt-4 text-[12.5px] leading-relaxed">
                Działalność gospodarcza prowadzona pod marką MRTIQ. Konik RevOS jest osobnym
                produktem oferowanym przez Konik Systems — patrz disclaimer poniżej.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-magenta-neon">
                Disclaimer · uczciwa komunikacja
              </div>
              <ul className="mt-4 space-y-2.5 text-[12.5px] leading-relaxed">
                <li className="flex gap-2.5">
                  <span className="shrink-0 text-magenta-neon">·</span>
                  <span>
                    <span className="text-bone">Brak gwarancji zarobku.</span> Stawki rynkowe pokazujemy
                    poglądowo, nie jako obietnicę przychodów.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 text-magenta-neon">·</span>
                  <span>
                    <span className="text-bone">Nie używamy sformułowania „100%".</span> Pokazujemy
                    konkretne progi (np. „do 95% dofinansowania BUR") z zastrzeżeniem
                    kwalifikowalności.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 text-magenta-neon">·</span>
                  <span>
                    <span className="text-bone">Uczymy wdrażania, nie budowy agentów AI od zera</span> —
                    to inżynieria, prowadzona oddzielnie w Konik Systems.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 text-magenta-neon">·</span>
                  <span>
                    <span className="text-bone">Dofinansowanie BUR</span> zależne od indywidualnej
                    kwalifikowalności firmy i dostępności środków w danym okresie.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 text-magenta-neon">·</span>
                  <span>
                    <span className="text-bone">Kwoty mają charakter poglądowy</span> i nie stanowią
                    oferty w rozumieniu art. 66 Kodeksu Cywilnego. Wiążąca jest umowa zawarta po konsultacji.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 text-magenta-neon">·</span>
                  <span>
                    <span className="text-bone">Rozdzielenie marek:</span> MRTIQ — szkolenia, akredytacje,
                    dotacje · Konik RevOS — produkt (system 66 agentów). Dwa różne podmioty, dwa różne komunikaty.
                  </span>
                </li>
              </ul>

              <div className="mt-6 pt-5 border-t border-white/[0.05] flex items-center gap-3">
                <Link
                  href="/polityka-prywatnosci"
                  className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-neon underline underline-offset-4"
                >
                  Polityka prywatności
                </Link>
                <span className="text-bone-mute/50">·</span>
                <Link
                  href="/dofinansowania"
                  className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-yellow underline underline-offset-4"
                >
                  Dofinansowania UE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   COUNTER NUM — animowany licznik 0 → target on view
   Wspiera: "66", "180", "45", "60+", "9 990", "499,50"
   ───────────────────────────────────────────────────────── */
function CounterNum({ value, delayMs = 0 }: { value: string; delayMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(value);
  const motionVal = useMotionValue(0);

  // Parse "60+" → number 60 + suffix "+", "9 990" → 9990 with space formatting, "499,50" → 499.5 with PL comma
  const suffixMatch = value.match(/[^\d\s,]+$/);
  const suffix = suffixMatch ? suffixMatch[0] : "";
  const numericRaw = value.replace(suffix, "").trim();
  const hasComma = numericRaw.includes(",");
  const numericClean = numericRaw.replace(/\s/g, "").replace(",", ".");
  const target = parseFloat(numericClean);
  const decimals = hasComma ? 2 : 0;
  const hasThousandsSpace = /\s/.test(numericRaw);

  useEffect(() => {
    if (!inView || isNaN(target)) return;
    const controls = fmAnimate(motionVal, target, {
      duration: 1.8,
      delay: delayMs / 1000,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => {
        let out: string;
        if (decimals > 0) {
          out = v.toFixed(decimals).replace(".", ",");
        } else {
          out = Math.floor(v).toString();
        }
        if (hasThousandsSpace) {
          // wstaw spację jako separator tysięcy
          const parts = out.split(",");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          out = parts.join(",");
        }
        setDisplay(out + suffix);
      },
    });
    return () => controls.stop();
  }, [inView, target, decimals, suffix, hasThousandsSpace, motionVal, delayMs]);

  return <span ref={ref}>{display}</span>;
}

/* ─────────────────────────────────────────────────────────
   DRAW CHECK / DRAW CROSS — rysowane SVG marks (stroke-dasharray)
   ───────────────────────────────────────────────────────── */
function DrawCheck({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="shrink-0 mt-1"
      aria-hidden
    >
      <motion.path
        d="M3 9.5 L7.5 14 L15.5 4"
        fill="none"
        stroke="#00E5C5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 4px rgba(0,229,197,0.9))" }}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

function DrawCross({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="shrink-0 mt-1"
      aria-hidden
    >
      <motion.path
        d="M4 4 L14 14"
        fill="none"
        stroke="#FF2DAA"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 4px rgba(255,45,170,0.9))" }}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
      />
      <motion.path
        d="M14 4 L4 14"
        fill="none"
        stroke="#FF2DAA"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 4px rgba(255,45,170,0.9))" }}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.4, delay: delay + 0.18, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

/* ─────────────────────────────────────────────────────────
   ORB — 7 Smoczych Kul + kaskadowy power-up + orbity
   ───────────────────────────────────────────────────────── */
function Orb({ orb, index }: { orb: (typeof ORBS)[number]; index: number }) {
  const colorMap = {
    cyan: { text: "text-cyan-neon", glow: "0,229,197" },
    magenta: { text: "text-magenta-neon", glow: "255,45,170" },
    yellow: { text: "text-electric-yellow", glow: "255,230,0" },
  } as const;
  const c = colorMap[orb.color];

  // Cascade timing — fala power-up co 7 kroków (orb 1 → 7 → wait → repeat)
  const CASCADE_DURATION = 5.6; // sekundy na pełną falę
  const cascadeDelay = (index / ORBS.length) * CASCADE_DURATION;

  return (
    <div className="relative h-full flex flex-col items-center text-center px-2">
      <div className="relative mb-5">
        {/* OUTER ORBIT — pierścień z kropką krążącą wokół kuli */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[110px] w-[110px] rounded-full border pointer-events-none"
          style={{ borderColor: `rgba(${c.glow},0.18)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full"
            style={{ background: `rgb(${c.glow})`, boxShadow: `0 0 8px rgba(${c.glow},1), 0 0 14px rgba(${c.glow},0.6)` }}
          />
        </motion.div>

        {/* CASCADE PULSE — wielka fala power-up co 5.6s na indeksowy delay */}
        <motion.div
          className="absolute -inset-6 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${c.glow},0.55) 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatDelay: CASCADE_DURATION - 1.4,
            ease: "easeOut",
            delay: cascadeDelay,
          }}
        />

        {/* Ambient breath glow */}
        <motion.div
          className="absolute -inset-4 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${c.glow},0.3) 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.75, 0.45] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.18,
          }}
        />

        {/* SAMA KULA */}
        <motion.div
          className="relative h-20 w-20 rounded-full border grid place-items-center"
          style={{
            borderColor: `rgba(${c.glow},0.4)`,
            background: `radial-gradient(circle at 35% 30%, rgba(${c.glow},0.3) 0%, rgba(0,0,0,0.6) 70%)`,
            boxShadow: `0 0 30px rgba(${c.glow},0.5), inset 0 0 20px rgba(${c.glow},0.2)`,
          }}
          animate={{ boxShadow: [
            `0 0 30px rgba(${c.glow},0.5), inset 0 0 20px rgba(${c.glow},0.2)`,
            `0 0 50px rgba(${c.glow},0.95), inset 0 0 28px rgba(${c.glow},0.5)`,
            `0 0 30px rgba(${c.glow},0.5), inset 0 0 20px rgba(${c.glow},0.2)`,
          ] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatDelay: CASCADE_DURATION - 1.4,
            ease: "easeInOut",
            delay: cascadeDelay,
          }}
        >
          <span className={`font-display text-2xl font-bold ${c.text}`}>{orb.n}</span>
        </motion.div>

        {/* Gwiazdki — drawn-in on view */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5">
          {Array.from({ length: orb.n }).map((_, i) => (
            <motion.span
              key={i}
              className={`text-[8px] ${c.text}`}
              style={{ filter: `drop-shadow(0 0 3px rgba(${c.glow},0.9))` }}
              initial={{ opacity: 0, scale: 0, y: 4 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ type: "spring", stiffness: 220, damping: 16, delay: index * 0.06 + i * 0.05 }}
            >
              ★
            </motion.span>
          ))}
        </div>
      </div>

      <div className={`font-display text-[15px] font-semibold tracking-tight ${c.text}`}>
        {orb.t}
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-bone-mute">{orb.d}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CONSTELLATION — linia łącząca 7 kul + pulsująca fala
   ───────────────────────────────────────────────────────── */
function OrbsConstellation() {
  return (
    <div
      aria-hidden
      className="hidden lg:block absolute inset-x-0 top-[150px] pointer-events-none z-0"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 relative">
        <svg
          className="w-full overflow-visible"
          height="2"
          viewBox="0 0 1000 2"
          preserveAspectRatio="none"
        >
          <motion.line
            x1="50"
            y1="1"
            x2="950"
            y2="1"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            strokeDasharray="3 6"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
        </svg>
        {/* Wave pulse traveling left → right (fala identyczna jak cascade w kulach) */}
        <motion.div
          className="absolute top-0 -translate-y-1/2 h-2 w-2 rounded-full"
          style={{
            background: "white",
            boxShadow: "0 0 12px rgba(0,229,197,0.9), 0 0 24px rgba(255,45,170,0.6)",
          }}
          animate={{ left: ["5%", "95%"] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PATH CARD — 3 ścieżki współpracy
   ───────────────────────────────────────────────────────── */
function PathCard({ path }: { path: (typeof PATHS)[number] }) {
  const colorMap = {
    cyan: { text: "text-cyan-neon", border: "border-cyan-neon/30", glow: "0,229,197" },
    yellow: {
      text: "text-electric-yellow",
      border: "border-electric-yellow/40",
      glow: "255,230,0",
    },
    magenta: { text: "text-magenta-neon", border: "border-magenta-neon/30", glow: "255,45,170" },
  } as const;
  const c = colorMap[path.accent];
  const featured = path.accent === "yellow";

  return (
    <Spotlight glowColor={c.glow} className="group h-full">
      <div
        className={`relative h-full flex flex-col rounded-3xl border ${c.border} ${
          featured ? "bg-gradient-to-br from-electric-yellow/[0.06] to-transparent" : "bg-white/[0.025]"
        } backdrop-blur-xl p-7 lg:p-8 transition-colors hover:border-white/30`}
      >
        {path.badge && (
          <div className="absolute -top-3 left-7 inline-flex items-center gap-2 rounded-full bg-electric-yellow px-3 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-ink neon-yellow">
            <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
            {path.badge}
          </div>
        )}

        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
          <span>{path.code}</span>
          <span className={c.text}>{path.id.toUpperCase()}</span>
        </div>

        <h3
          className={`mt-6 font-display text-2xl lg:text-[28px] tracking-tight font-semibold leading-[1.1] ${c.text}`}
        >
          {path.title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-bone">{path.pitch}</p>

        <div className="mt-7 pb-6 border-b border-white/[0.07]">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
            Warunki finansowe
          </div>
          <div className={`mt-2 font-display text-xl tracking-tight font-semibold ${c.text}`}>
            {path.price}
          </div>
        </div>

        <ul className="mt-6 space-y-3 text-[13.5px] leading-relaxed text-bone-mute">
          {path.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5">
              <span className={`shrink-0 ${c.text}`}>·</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <Link
          href="#konsultacja"
          className={`mt-auto pt-8 inline-flex items-center justify-center gap-2 w-full text-[13px] font-semibold ${c.text} hover:opacity-80 transition-opacity`}
        >
          <span
            className={`flex items-center justify-center gap-2 w-full rounded-full border ${c.border} px-5 py-3 hover:bg-white/[0.04] transition-colors`}
          >
            Porozmawiajmy o tej ścieżce →
          </span>
        </Link>
      </div>
    </Spotlight>
  );
}

/* ─────────────────────────────────────────────────────────
   TAG CHIP — Dream Team
   ───────────────────────────────────────────────────────── */
function TagChip({
  tag,
  index,
}: {
  tag: (typeof DREAM_TEAM)[number];
  index: number;
}) {
  const sizeMap = {
    lg: "text-2xl lg:text-3xl px-5 py-2.5",
    md: "text-lg lg:text-xl px-4 py-2",
    sm: "text-base lg:text-lg px-3.5 py-1.5",
  } as const;
  const colorMap = {
    cyan: { text: "text-cyan-neon", border: "border-cyan-neon/30" },
    magenta: { text: "text-magenta-neon", border: "border-magenta-neon/30" },
    yellow: { text: "text-electric-yellow", border: "border-electric-yellow/40" },
  } as const;
  const c = colorMap[tag.color];

  // Ambient drift — każdy chip ma własny phase + amplitudę, żeby chmura żyła
  const phaseX = (index * 1.7) % (Math.PI * 2);
  const phaseY = (index * 2.3) % (Math.PI * 2);
  const ampX = 4 + (index % 3) * 1.5;
  const ampY = 3 + (index % 4) * 1.3;
  const driftDurX = 6 + (index % 5);
  const driftDurY = 7 + (index % 4);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
        delay: index * 0.03,
      }}
      className={`inline-flex items-center gap-2 rounded-full border ${c.border} bg-ink/40 backdrop-blur ${sizeMap[tag.size]} hover:bg-white/[0.04] transition-colors cursor-default will-change-transform`}
    >
      <motion.div
        className="inline-flex items-center gap-2"
        animate={{
          x: [
            Math.sin(phaseX) * ampX,
            Math.sin(phaseX + Math.PI) * ampX,
            Math.sin(phaseX) * ampX,
          ],
          y: [
            Math.cos(phaseY) * ampY,
            Math.cos(phaseY + Math.PI) * ampY,
            Math.cos(phaseY) * ampY,
          ],
        }}
        transition={{
          x: { duration: driftDurX, repeat: Infinity, ease: "easeInOut" },
          y: { duration: driftDurY, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span className={`font-display tracking-tight font-medium ${c.text}`}>{tag.n}</span>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-mute hidden sm:inline">
          · {tag.d}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   FAQ ITEM — accordion
   ───────────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
        aria-expanded={open}
      >
        <span className="font-display text-[16px] lg:text-[17px] font-medium text-bone">{q}</span>
        <span
          className={`shrink-0 font-mono text-cyan-neon text-[20px] leading-none transition-transform ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-[14.5px] leading-relaxed text-bone-mute">{a}</div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FINAL CTA — „Umów konsultację" (3-cie wystąpienie)
   ───────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section id="konsultacja" className="relative py-32 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="h-[640px] w-[640px] rounded-full bg-electric-yellow/12 blur-[160px] animate-breathe" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px divider-y" />

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">
              [11] · Krok zerowy
            </div>
            <h2 className="mt-5 font-display font-semibold tracking-tightest-2 text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.94]">
              <MaskReveal>Włącz światło.</MaskReveal>{" "}
              <MaskReveal delay={0.05}>
                <span className="text-glow-yellow text-electric-yellow">Zostań przewodnikiem</span>
              </MaskReveal>{" "}
              <MaskReveal delay={0.1}>transformacji.</MaskReveal>
            </h2>
            <p className="mt-6 text-[15.5px] leading-relaxed text-bone-mute">
              Najpierw rozmowa. Sprawdzamy dopasowanie, kwalifikowalność do BUR, ścieżkę.
              Bez presji, bez sztucznej pilności — decyzja zostaje u Ciebie.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.4}>
              <Link
                href="/#protokol"
                className="group inline-flex items-center gap-3 rounded-full bg-electric-yellow px-8 py-4 text-[14px] font-bold uppercase tracking-[0.18em] text-ink neon-yellow"
              >
                <Magnetic strength={0.3}>Umów konsultację</Magnetic>
                <Magnetic strength={0.5}>↗</Magnetic>
              </Link>
            </Magnetic>
            <Link
              href="#program"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[13px] font-medium text-bone hover:border-white/30 hover:bg-white/[0.04] transition-colors"
            >
              Zobacz program
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
            <span>Edycja 2026</span>
            <span className="text-bone-mute/40">·</span>
            <span>Grupy 3–12</span>
            <span className="text-bone-mute/40">·</span>
            <span>Miejsca limitowane jakością, nie marketingiem</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
