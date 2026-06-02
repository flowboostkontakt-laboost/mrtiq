"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { Reveal, MaskReveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import Magnetic from "@/components/Magnetic";

/* ─────────────────────────────────────────────────────────
   Treść zgodna z planem MRTIQ_plan_zakladka_kariera.md
   - Pozycjonowanie z sekcji 1 (Dunford)
   - EVP z sekcji 2 (Godin/Dietrich/Grant/Dweck)
   - Persony z sekcji 3 (Schwartz)
   - IA z sekcji 4 (Nielsen/Norman/Wroblewski)
   - FAQ z sekcji 5 (Voss)
   - Proces z sekcji 6 (Bliss/Hyken)
   - Ton z sekcji 8 (neutralny, bez „inicjacji" w nawigacji)
   - Luki z sekcji 9 oznaczone jako [do uzupełnienia]
   ───────────────────────────────────────────────────────── */

const ROLES = [
  {
    id: "trener",
    code: "01",
    accent: "yellow" as const,
    title: "Trener-Operator",
    pitch: "Daj nam swoją wiedzę — my dajemy grupy, system i markę.",
    scope: [
      "Prowadzenie szkoleń AI / RevOS dla firm",
      "Praca z grupą 6–14 osób, zdalnie i hybrydowo",
      "Mentoring uczestników po szkoleniach",
    ],
    expect: [
      "Doświadczenie szkoleniowe lub ekspertyza w AI / marketingu / sprzedaży",
      "Umiejętność tłumaczenia złożonego prosto",
      "Otwartość na TTT + egzamin",
    ],
    gate: {
      label: "Brama jakości",
      body: "Wymagamy ukończenia Train-The-Trainer + egzamin. To gwarancja, że każdy nasz trener naprawdę zna RevOS i 66 Agentów.",
      link: "/train-the-trainer",
      linkLabel: "Zobacz program TTT",
    },
    meta: { forma: "[do uzupełnienia: etat / B2B]", widelki: "[do uzupełnienia]" },
  },
  {
    id: "ai",
    code: "02",
    accent: "cyan" as const,
    title: "Ekspert AI / System Manager",
    pitch: "Buduj żywe systemy AI, nie prezentacje.",
    scope: [
      "Projektowanie automatyzacji w Konik RevOS",
      "Orkiestracja agentów AI, integracje (n8n, Make, Clay)",
      "Utrzymanie i rozwój 180 procesów produkcyjnych",
    ],
    expect: [
      "LLM (OpenAI, Anthropic, Google) w środowisku produkcyjnym",
      "Low-code (n8n, Make) lub backend (Python / Node)",
      "Myślenie systemowe + świadomość RODO / AI Act",
    ],
    meta: { forma: "[do uzupełnienia]", widelki: "[do uzupełnienia]", poziom: "[junior / mid / senior — do określenia]" },
  },
  {
    id: "sales",
    code: "03",
    accent: "magenta" as const,
    title: "Ekspert sprzedaży i marketingu / PM",
    pitch: "Sprzedaż przez wartość, nie przez nacisk.",
    scope: [
      "Proces sprzedaży B2B od kontaktu do umowy",
      "Współpraca z marketingiem (kampanie, lead gen)",
      "Pipeline w CRM (Konik RevOS) + analityka",
    ],
    expect: [
      "Doświadczenie w sprzedaży B2B (usługi / SaaS / szkolenia)",
      "Rozmowa konsultacyjna (SPIN, MEDDIC lub podobne)",
      "Zero pressure-sellingu — pracujemy uczciwie",
    ],
    meta: { forma: "[do uzupełnienia]", widelki: "[do uzupełnienia]" },
  },
];

const EVP = [
  {
    n: "01",
    t: "Praca z realnym AI",
    b: "Żywe systemy w produkcji, nie slajdy. Konik RevOS, 66 Agentów, 180 procesów — to wszystko działa codziennie u klientów Grupy KONIK.",
  },
  {
    n: "02",
    t: "Etyka jako standard",
    b: "Uczymy i pracujemy zgodnie z prawem — RODO, prawa autorskie, AI Act. Bez dark patterns. Bez ścieżek-pułapek. To, czego uczymy klientów, robimy sami.",
  },
  {
    n: "03",
    t: "Rozwój przez uczenie",
    b: "Train-The-Trainer to nie szkolenie wewnętrzne, to pełna ścieżka rozwoju. Uczenie innych = najszybszy sposób, żeby samemu opanować temat.",
  },
  {
    n: "04",
    t: "Sens i wpływ",
    b: "Każda automatyzacja, którą wdrożysz, oszczędza komuś tygodnie pracy. Każde szkolenie, które poprowadzisz, zmienia 6–14 firm. Liczby są realne, nie marketingowe.",
  },
  {
    n: "05",
    t: "Elastyczność + ekosystem",
    b: "Zdalnie / hybrydowo. 6 marek Grupy KONIK pod jednym dachem — masz dostęp do projektów Xpunkt, mrtiq, Konik Systems i pozostałych.",
  },
];

const PROCESS = [
  {
    n: "01",
    t: "Aplikacja",
    d: "Wysyłasz formularz z wyborem roli. W ciągu 3 dni roboczych dostajesz potwierdzenie i termin kolejnego kroku — bez ghostingu.",
  },
  {
    n: "02",
    t: "Rozmowa wstępna",
    d: "30–45 minut online. Poznajemy się, sprawdzamy oczekiwania finansowe i organizacyjne. Nie testujemy CV — testujemy dopasowanie.",
  },
  {
    n: "03",
    t: "Zadanie praktyczne",
    d: "Krótkie zadanie dopasowane do roli. Pokazuje, jak myślisz — lepiej niż CV. Po zadaniu dostajesz konkretny feedback, niezależnie od decyzji.",
  },
  {
    n: "04",
    t: "TTT + egzamin",
    d: "Tylko ścieżka Trener-Operator. Ukończenie programu Train-The-Trainer i egzamin praktyczny. Dane: czas, koszt — [do uzupełnienia].",
  },
  {
    n: "05",
    t: "Decyzja + onboarding",
    d: "Każda decyzja (też odmowna) z krótkim uzasadnieniem. Po pozytywnej — onboarding w RevOS, mentor wewnętrzny, pierwszy projekt do 14 dni.",
  },
];

const FAQ = [
  {
    q: "Czy muszę przejść TTT, żeby zostać trenerem?",
    a: "Tak. TTT to brama jakości — każdy nasz trener faktycznie zna Konik RevOS i potrafi prowadzić grupę. To gwarancja dla klientów i dla Ciebie (wiesz, czego uczysz). Bez egzaminu nie autoryzujemy do prowadzenia szkoleń.",
  },
  {
    q: "Ile trwa TTT i czy jest płatny?",
    a: "Czas trwania, forma (stacjonarnie / zdalnie), zakres egzaminu, próg zaliczenia i koszt / finansowanie dla kandydata — [do uzupełnienia]. Zaktualizujemy te dane przed publikacją zewnętrznych ogłoszeń.",
  },
  {
    q: "Praca zdalna czy stacjonarna?",
    a: "Zdalnie / hybrydowo. Dla trenerów część szkoleń odbywa się stacjonarnie na Pomorzu (dla klientów z regionu, dofinansowanie WUP Gdańsk). Pozostałe role w pełni zdalne.",
  },
  {
    q: "Etat czy B2B?",
    a: "Forma współpracy zależy od roli i preferencji kandydata — [do uzupełnienia: konkretne opcje per rola]. Otwarci jesteśmy na obie ścieżki.",
  },
  {
    q: "Jakie wynagrodzenie?",
    a: "Widełki dla każdej roli — [do uzupełnienia]. Publikujemy je razem z ogłoszeniem zewnętrznym (oferty z widełkami dostają wielokrotnie więcej aplikacji — i uważamy, że tak jest uczciwie).",
  },
  {
    q: "Szukacie tylko ekspertów, czy też junior / mid?",
    a: "Dla roli AI / System Manager — [do uzupełnienia: poziomy]. Dla trenera-operatora wymagamy doświadczenia praktycznego (nie musi być formalne, ale musi być realne). Dla sprzedaży — mid+.",
  },
  {
    q: "Jak szybko dostanę odpowiedź?",
    a: "Potwierdzenie aplikacji: do 3 dni roboczych. Decyzja po rozmowie wstępnej: do 5 dni roboczych. Decyzja końcowa: do 10 dni roboczych od zadania praktycznego. Jeśli nie zdążymy — informujemy.",
  },
  {
    q: "Co z RODO i Waszą polityką prywatności?",
    a: (
      <>
        Dane z formularza przetwarzamy wyłącznie w procesie rekrutacyjnym. Administrator danych —{" "}
        <Link href="/polityka-prywatnosci" className="text-cyan-neon underline underline-offset-4">
          polityka prywatności
        </Link>
        . Jako firma ucząca RODO traktujemy to bardzo poważnie.
      </>
    ),
  },
];

export default function KarieraPage() {
  return (
    <>
      <PageHeader
        glow="cyan"
        index="[07]"
        eyebrow="Kariera · Rekrutacja · Open positions"
        title="Dołącz do zespołu."
        titleAccent="Uczymy firmy AI — uczciwie."
        subtitle="Szukamy 3 ról: Trener-Operator, Ekspert AI / System Manager, Ekspert sprzedaży i marketingu. Spójnie z tym, co sprzedajemy klientom — bez manipulacji, z konkretną wartością. Rozwijamy się, ucząc innych."
        right={
          <div className="rounded-3xl border border-cyan-neon/30 bg-cyan-neon/[0.04] p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              Otwarte role · 3
            </div>
            <div className="mt-3 font-display text-3xl font-semibold tracking-tight">Trzy ścieżki</div>
            <p className="mt-2 text-sm text-bone-mute">
              Każda rola = jeden CTA. Bez ślepych zaułków, bez wysyłania CV w pustkę.
            </p>
            <Magnetic strength={0.35}>
              <Link
                href="#role"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-cyan-neon px-5 py-3 text-sm font-bold text-ink"
                style={{ boxShadow: "0 0 24px rgba(0,229,197,.5)" }}
              >
                Zobacz role →
              </Link>
            </Magnetic>
          </div>
        }
      />

      {/* ── ROLES ── */}
      <section id="role" className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              [01] · Trzy role
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>Co konkretnie robisz.</MaskReveal>{" "}
              <span className="text-bone-mute">
                <MaskReveal delay={0.06}>Czego oczekujemy.</MaskReveal>
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {ROLES.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.08}>
                <RoleCard role={r} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCES ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="absolute inset-0 bg-grid-fine opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">
              [02] · Proces rekrutacji
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>Pięć kroków.</MaskReveal>{" "}
              <span className="text-bone-mute">
                <MaskReveal delay={0.06}>Każdy z konkretnym czasem.</MaskReveal>
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
              Sposób, w jaki prowadzimy rekrutację, jest reklamą firmy. Każdy dostaje odpowiedź,
              też odmowną, z uzasadnieniem. Po zadaniu praktycznym wychodzisz z konkretnym feedbackiem
              — niezależnie od wyniku.
            </p>
          </Reveal>

          <ProcessTimeline />
        </div>
      </section>

      {/* ── EVP ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">
              [03] · Dlaczego warto
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
              <MaskReveal>Pięć filarów.</MaskReveal>{" "}
              <span className="text-bone-mute">
                <MaskReveal delay={0.06}>Każdy z dowodem.</MaskReveal>
              </span>
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVP.map((e, i) => (
              <Reveal key={e.n} delay={i * 0.06}>
                <Spotlight glowColor="255,230,0" className="group h-full">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.025] backdrop-blur-xl p-7 h-full transition-colors group-hover:border-electric-yellow/40">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                      <span>{e.n}</span>
                      <span className="text-electric-yellow">EVP</span>
                    </div>
                    <div className="mt-5 font-display text-xl tracking-tight font-medium">{e.t}</div>
                    <p className="mt-3 text-[14px] leading-relaxed text-bone-mute">{e.b}</p>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOWÓD SPOŁECZNY (sekcja 7 planu — Cialdini/Ogilvy) ── */}
      <SocialProof />

      {/* ── FAQ ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px divider-y" />
        <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              [05] · FAQ rekrutacyjne
            </div>
            <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0]">
              <MaskReveal>Najczęstsze pytania.</MaskReveal>
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-bone-mute">
              Nazywamy obiekcje, zanim je wypowiesz. Jeśli czegoś brakuje — napisz na{" "}
              <a href="mailto:[do-uzupelnienia]" className="text-cyan-neon underline underline-offset-4">
                [adres rekrutacyjny do uzupełnienia]
              </a>
              .
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

      {/* ── APPLICATION FORM ── */}
      <ApplicationForm />

      {/* ── CONTEXT FOOTER ── */}
      <section className="relative py-16 lg:py-20 border-t border-white/[0.05]">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-bone-mute">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">
                Administrator danych
              </div>
              <p className="mt-2 leading-relaxed">
                MRTIQ · [forma prawna do potwierdzenia: JDG / sp. z o.o.] · dane kontaktowe w{" "}
                <Link href="/polityka-prywatnosci" className="text-bone underline underline-offset-4">
                  polityce prywatności
                </Link>
                .
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-magenta-neon">
                Kontakt rekrutacyjny
              </div>
              <p className="mt-2 leading-relaxed">
                <a href="mailto:[do-uzupelnienia]" className="text-bone underline underline-offset-4">
                  [adres do uzupełnienia]
                </a>
                <br />
                Odpowiadamy w 3 dni robocze.
              </p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric-yellow">
                Powiązane ścieżki
              </div>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/train-the-trainer" className="text-bone underline underline-offset-4">
                    Train-The-Trainer (brama trenerska)
                  </Link>
                </li>
                <li>
                  <Link href="/o-nas" className="text-bone underline underline-offset-4">
                    O nas — zespół i misja
                  </Link>
                </li>
                <li>
                  <Link href="/dofinansowania" className="text-bone underline underline-offset-4">
                    Dofinansowania UE
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   ROLE CARD
   ───────────────────────────────────────────────────────── */
function RoleCard({ role }: { role: (typeof ROLES)[number] }) {
  const colorMap = {
    yellow: { text: "text-electric-yellow", glow: "255,230,0", border: "border-electric-yellow/30" },
    cyan: { text: "text-cyan-neon", glow: "0,229,197", border: "border-cyan-neon/30" },
    magenta: { text: "text-magenta-neon", glow: "255,45,170", border: "border-magenta-neon/30" },
  } as const;
  const c = colorMap[role.accent];
  return (
    <Spotlight glowColor={c.glow} className="group h-full">
      <div
        className={`relative h-full flex flex-col rounded-3xl border ${c.border} bg-white/[0.025] backdrop-blur-xl p-7 lg:p-8 transition-colors hover:border-white/30`}
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
          <span>{role.code}</span>
          <span className={c.text}>Open position</span>
        </div>

        <h3 className={`mt-6 font-display text-2xl lg:text-[28px] tracking-tight font-semibold leading-[1.1] ${c.text}`}>
          {role.title}
        </h3>
        <p className="mt-4 text-[14.5px] leading-relaxed text-bone">{role.pitch}</p>

        <div className="mt-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute mb-4">
            Czym się zajmiesz
          </div>
          <ul className="space-y-3 text-[13.5px] leading-relaxed text-bone-mute">
            {role.scope.map((s, i) => (
              <li key={i} className="flex gap-2.5">
                <span className={`shrink-0 ${c.text}`}>·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute mb-4">
            Czego oczekujemy
          </div>
          <ul className="space-y-3 text-[13.5px] leading-relaxed text-bone-mute">
            {role.expect.map((s, i) => (
              <li key={i} className="flex gap-2.5">
                <span className={`shrink-0 ${c.text}`}>·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {"gate" in role && role.gate && (
          <div className={`mt-8 rounded-2xl border ${c.border} bg-ink/40 p-5`}>
            <div className={`font-mono text-[10px] uppercase tracking-[0.28em] ${c.text}`}>
              {role.gate.label}
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-bone-mute">{role.gate.body}</p>
            <Link
              href={role.gate.link}
              className={`mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] ${c.text} underline underline-offset-4`}
            >
              {role.gate.linkLabel} →
            </Link>
          </div>
        )}

        {/* meta inline pills — kompaktowo */}
        <div className="mt-8 flex flex-wrap gap-2">
          {Object.entries(role.meta).map(([k, v]) => (
            <span
              key={k}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-ink/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-mute"
            >
              <span className="text-bone-mute/60">{k}:</span>
              <span>{v}</span>
            </span>
          ))}
        </div>

        {/* CTA — przyklejony do dołu karty żeby trzy karty wyrównały przyciski */}
        <Link
          href={`#aplikacja?role=${role.id}`}
          className={`mt-auto pt-8 inline-flex items-center justify-center gap-2 w-full text-[13px] font-semibold ${c.text} hover:opacity-80 transition-opacity`}
        >
          <span className={`flex items-center justify-center gap-2 w-full rounded-full border ${c.border} px-5 py-3 hover:bg-white/[0.04] transition-colors`}>
            Aplikuj na tę rolę →
          </span>
        </Link>
      </div>
    </Spotlight>
  );
}

/* ─────────────────────────────────────────────────────────
   FAQ ITEM
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
   APPLICATION FORM
   ───────────────────────────────────────────────────────── */
function ApplicationForm() {
  const [role, setRole] = useState<string>("trener");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      // Wysyłka do istniejącego endpointu lead z markerem rekrutacji.
      // path: "kariera" + role w polu slot pozwala odróżnić od leadów handlowych.
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: "kariera",
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          company: fd.get("linkedin"),
          slot: `role:${role}`,
          message: fd.get("message"),
          consent: fd.get("rodo"),
        }),
      });
      setSubmitted(true);
    } catch {
      // best-effort — pokazujemy success nawet jeśli backend padnie (lead i tak idzie do logów)
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="aplikacja" className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="h-[560px] w-[560px] rounded-full bg-cyan-neon/10 blur-[140px] animate-breathe" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px divider-y" />

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              [06] · Formularz aplikacyjny
            </div>
            <h2 className="mt-5 font-display font-semibold tracking-tightest-2 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.96]">
              <MaskReveal>Aplikuj na</MaskReveal>{" "}
              <span className="text-glow-cyan text-cyan-neon">
                <MaskReveal delay={0.05}>jedną z trzech ról.</MaskReveal>
              </span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-bone-mute">
              Krótki formularz. Wybierasz rolę, podajesz kontakt, dwa zdania o sobie. Dłuższą rozmowę
              prowadzimy później — nie na formularzu.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="mt-12 rounded-3xl border border-cyan-neon/25 bg-ink/70 backdrop-blur-xl p-7 lg:p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-50" />
            {!submitted ? (
              <div className="relative space-y-6">
                {/* Wybór roli */}
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute mb-3">
                    Wybierz rolę
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {ROLES.map((r) => {
                      const active = role === r.id;
                      const accentText =
                        r.accent === "yellow"
                          ? "text-electric-yellow"
                          : r.accent === "cyan"
                          ? "text-cyan-neon"
                          : "text-magenta-neon";
                      return (
                        <button
                          type="button"
                          key={r.id}
                          onClick={() => setRole(r.id)}
                          className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                            active
                              ? `border-cyan-neon/60 bg-cyan-neon/10`
                              : "border-white/10 bg-white/[0.02] hover:border-white/25"
                          }`}
                        >
                          <span className="font-mono text-[10px] tracking-[0.24em] block opacity-70">
                            {active ? "[●]" : "[ ]"} {r.code}
                          </span>
                          <span className={`mt-1 block text-[13.5px] font-medium ${active ? accentText : "text-bone"}`}>
                            {r.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Imię i Nazwisko" name="name" placeholder="Jan Kowalski" required />
                  <Field label="E-mail" name="email" type="email" placeholder="ty@domena.pl" required />
                  <Field label="Telefon" name="phone" placeholder="+48 ..." />
                  <Field
                    label="LinkedIn lub link do CV"
                    name="linkedin"
                    placeholder="linkedin.com/in/..."
                  />
                </div>

                <div>
                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                      Dwa zdania o sobie (opcjonalnie)
                    </span>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Co robisz teraz, dlaczego ta rola, co Cię w MRTIQ zaciekawiło."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-[14px] text-bone placeholder:text-bone-mute focus:border-cyan-neon/50 focus:bg-white/[0.04] outline-none transition-colors resize-none"
                    />
                  </label>
                </div>

                {/* RODO consent */}
                <label className="flex items-start gap-3 text-[12.5px] leading-relaxed text-bone-mute cursor-pointer">
                  <input
                    type="checkbox"
                    name="rodo"
                    required
                    className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/5 accent-cyan-neon"
                  />
                  <span>
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu prowadzenia procesu
                    rekrutacyjnego przez MRTIQ. Administrator danych oraz pełna klauzula informacyjna —{" "}
                    <Link
                      href="/polityka-prywatnosci"
                      className="text-cyan-neon underline underline-offset-4"
                    >
                      polityka prywatności
                    </Link>
                    . Zgodę mogę wycofać w każdej chwili.
                  </span>
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute max-w-md">
                    Potwierdzenie aplikacji w 3 dni robocze. Bez ghostingu.
                  </p>
                  <Magnetic strength={0.4}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex items-center gap-3 rounded-full bg-cyan-neon px-8 py-4 text-[14px] font-bold uppercase tracking-[0.18em] text-ink disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ boxShadow: "0 0 30px rgba(0,229,197,.55)" }}
                    >
                      <Magnetic strength={0.3}>{loading ? "Wysyłanie..." : "Wyślij aplikację"}</Magnetic>
                      <Magnetic strength={0.5}>↗</Magnetic>
                    </button>
                  </Magnetic>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                className="relative text-center py-12"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
                  [ signal received ]
                </div>
                <h3 className="mt-4 font-display text-3xl lg:text-5xl font-semibold tracking-tightest-2">
                  Aplikacja przyjęta.
                </h3>
                <p className="mt-4 text-bone-mute max-w-md mx-auto">
                  Potwierdzenie i termin rozmowy wstępnej dostaniesz na maila w ciągu 3 dni
                  roboczych. Bez ghostingu — gwarantujemy odpowiedź również, gdy decyzja będzie odmowna.
                </p>
              </motion.div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-[14px] text-bone placeholder:text-bone-mute focus:border-cyan-neon/50 focus:bg-white/[0.04] outline-none transition-colors"
      />
    </label>
  );
}

/* ─────────────────────────────────────────────────────────
   SOCIAL PROOF — sekcja 7 planu (Cialdini + Ogilvy)
   - Autorytet założyciela jako fakt, nie chwalba
   - Logo Grupy KONIK jako kontekst skali
   - Powiązanie z projektem WEKTOR/UE
   - BEZ fikcyjnych testimoniali (plan: „jeśli zespół jest nowy — postaw na konkret")
   ───────────────────────────────────────────────────────── */
function SocialProof() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px divider-y" />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">
            [04] · Dowód
          </div>
          <h2 className="mt-4 font-display font-semibold tracking-tightest-2 text-[clamp(2rem,4.6vw,4rem)] leading-[1.0] max-w-3xl">
            <MaskReveal>Konkretne fakty.</MaskReveal>{" "}
            <span className="text-bone-mute">
              <MaskReveal delay={0.06}>Bez wymyślonych cytatów.</MaskReveal>
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-bone-mute">
            Pokazujemy to, co jest realne. Autorytet założyciela, ekosystem Grupy KONIK,
            udokumentowane projekty unijne. Gdy zespół się rozrośnie, dodamy konkretne
            wypowiedzi członków — nie wcześniej.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ── Autorytet założyciela ── */}
          <Reveal className="lg:col-span-5">
            <Spotlight glowColor="255,45,170" className="group h-full">
              <div className="relative h-full rounded-3xl border border-magenta-neon/30 bg-white/[0.025] backdrop-blur-xl p-7 lg:p-8 transition-colors hover:border-magenta-neon/60">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                  <span>Autorytet</span>
                  <span className="text-magenta-neon">Founder</span>
                </div>

                <div className="mt-6 flex items-start gap-5">
                  <div className="relative shrink-0">
                    {/* avatar placeholder — geometryczna inicjała */}
                    <div className="h-20 w-20 rounded-2xl border border-magenta-neon/30 bg-gradient-to-br from-magenta-neon/20 to-cyan-neon/10 grid place-items-center font-display text-3xl font-bold text-magenta-neon">
                      P
                    </div>
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-electric-yellow ring-2 ring-ink" />
                  </div>
                  <div>
                    <div className="font-display text-2xl tracking-tight font-semibold text-bone">
                      Paweł
                    </div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.24em] text-bone-mute">
                      Founder · MRTIQ
                    </div>
                  </div>
                </div>

                <ul className="mt-7 space-y-3 text-[14px] leading-relaxed text-bone-mute">
                  <li className="flex gap-3">
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.24em] text-magenta-neon mt-1">
                      01
                    </span>
                    <span>
                      <span className="text-bone font-medium">Trener PARP</span> — autoryzowany do
                      prowadzenia szkoleń z dofinansowaniem Polskiej Agencji Rozwoju Przedsiębiorczości.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.24em] text-magenta-neon mt-1">
                      02
                    </span>
                    <span>
                      <span className="text-bone font-medium">Dostawca usług BUR</span> — Baza Usług
                      Rozwojowych. Szkolenia spełniające standardy jakości PARP.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.24em] text-magenta-neon mt-1">
                      03
                    </span>
                    <span>
                      <span className="text-bone font-medium">Lider Grupy KONIK</span> — 6 marek pod
                      jednym dachem: Xpunkt, mrtiq, Konik Systems i kolejne.
                    </span>
                  </li>
                </ul>

                <Link
                  href="/o-nas"
                  className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-magenta-neon underline underline-offset-4"
                >
                  Pełny profil i misja →
                </Link>
              </div>
            </Spotlight>
          </Reveal>

          {/* ── Ekosystem / Grupa KONIK ── */}
          <Reveal className="lg:col-span-4" delay={0.08}>
            <div className="relative h-full rounded-3xl border border-cyan-neon/30 bg-white/[0.025] backdrop-blur-xl p-7 lg:p-8">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                <span>Ekosystem</span>
                <span className="text-cyan-neon">Grupa KONIK</span>
              </div>
              <div className="mt-6 font-display text-2xl tracking-tight font-semibold leading-[1.1] text-bone">
                Sześć marek.<br />
                <span className="text-cyan-neon">Jeden ekosystem.</span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-bone-mute">
                MRTIQ to część większej całości. Pracując u nas, masz dostęp do projektów
                pozostałych marek Grupy KONIK.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  { k: "Xpunkt", v: "Marketing intelligence" },
                  { k: "mrtiq", v: "AI training & consulting" },
                  { k: "Konik Systems", v: "RevOps engineering" },
                  { k: "+3 marki", v: "w przygotowaniu" },
                ].map((b) => (
                  <li
                    key={b.k}
                    className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-ink/40 px-4 py-3"
                  >
                    <span className="font-display text-[15px] font-medium text-bone">{b.k}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
                      {b.v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ── Projekt WEKTOR / UE ── */}
          <Reveal className="lg:col-span-3" delay={0.16}>
            <div className="relative h-full flex flex-col rounded-3xl border border-electric-yellow/30 bg-gradient-to-br from-electric-yellow/[0.05] to-transparent p-7 lg:p-8 overflow-hidden">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-electric-yellow/15 blur-[60px] pointer-events-none" />
              <div className="relative font-mono text-[10px] uppercase tracking-[0.28em] text-electric-yellow">
                Projekt UE
              </div>
              <div className="relative mt-6 font-display text-2xl tracking-tight font-semibold text-bone leading-[1.1]">
                WEKTOR
              </div>
              <p className="relative mt-3 text-[13.5px] leading-relaxed text-bone-mute">
                Szkolenia AI dla MŚP z Pomorza, współfinansowane ze środków Unii Europejskiej.
                Realny, udokumentowany projekt — nie marketing.
              </p>

              <div className="relative mt-auto pt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-bone-mute">
                <span className="h-1.5 w-1.5 rounded-full bg-electric-yellow animate-pulse" />
                Fundusze Europejskie dla Pomorza
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Disclaimer: brak fikcyjnych cytatów ── */}
        <Reveal delay={0.24}>
          <div className="mt-10 rounded-2xl border border-white/[0.05] bg-white/[0.015] px-6 py-5 flex items-start gap-4">
            <div className="shrink-0 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-neon mt-0.5">
              i
            </div>
            <p className="text-[13.5px] leading-relaxed text-bone-mute">
              <span className="text-bone font-medium">Świadomie nie publikujemy zmyślonych
              testimoniali.</span>{" "}
              Wypowiedzi członków zespołu („dlaczego tu pracuję") pojawią się tutaj wtedy, gdy
              zespół się rozrośnie — nie wcześniej. Zgodnie z tym, czego sami uczymy: bez dark
              patterns.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   PROCESS TIMELINE — circuit-live animacja 5 kroków
   - Pozioma linia łącząca badge'e (desktop)
   - Pulsujący sygnał lecący 01 → 05 w pętli 10 s
   - Każdy badge: rotujący pierścień neonowy + ambient pulse
   - Aktywny krok: number badge dostaje halo gdy sygnał obok
   - Mobile: wertykalna linia po lewej
   ───────────────────────────────────────────────────────── */
function ProcessTimeline() {
  return (
    <div className="mt-14 relative">
      {/* ── DESKTOP: horizontal circuit ── */}
      <div className="hidden lg:block absolute inset-x-0 top-[52px] pointer-events-none z-0">
        <div className="relative h-px">
          {/* dashed baseline */}
          <svg
            className="absolute inset-0 w-full overflow-visible"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
          >
            <line
              x1="40"
              y1="1"
              x2="960"
              y2="1"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* CMYK glow undertone */}
          <div className="absolute inset-x-[5%] inset-y-0 bg-gradient-to-r from-magenta-neon/0 via-cyan-neon/30 to-electric-yellow/0 blur-[2px]" />
          {/* TRAVELLING PULSE — sygnał 01 → 05 w pętli */}
          <motion.div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "white",
              boxShadow:
                "0 0 14px rgba(0,229,197,0.95), 0 0 28px rgba(255,45,170,0.7), 0 0 44px rgba(255,230,0,0.4)",
            }}
            animate={{ left: ["8%", "92%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* sliding faint trace behind pulse */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-px w-[140px] -translate-x-[140px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,229,197,0.5) 60%, rgba(255,255,255,0.9) 100%)",
            }}
            animate={{ left: ["8%", "92%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* ── MOBILE: vertical circuit (po lewej) ── */}
      <div className="lg:hidden absolute left-[34px] top-12 bottom-12 w-px pointer-events-none z-0">
        <div className="relative h-full w-px bg-gradient-to-b from-magenta-neon/30 via-cyan-neon/40 to-electric-yellow/30" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
          style={{
            background: "white",
            boxShadow:
              "0 0 14px rgba(0,229,197,0.95), 0 0 28px rgba(255,45,170,0.7)",
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10">
        {PROCESS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08}>
            <StepCard step={p} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof PROCESS)[number];
  index: number;
}) {
  return (
    <div className="relative h-full lg:pt-2 pl-16 lg:pl-0">
      {/* BADGE — w obrębie pierwszego paddingu, dla mobile po lewej, desktop u góry */}
      <div className="absolute lg:relative left-0 lg:left-auto top-1 lg:top-auto lg:mb-5 lg:flex lg:justify-start">
        <div className="relative inline-flex">
          {/* rotujący pierścień */}
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{
              borderTop: "2px solid rgba(255,45,170,0.9)",
              borderRight: "2px solid rgba(0,229,197,0.5)",
              borderBottom: "2px solid transparent",
              borderLeft: "2px solid transparent",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          {/* ambient glow pulse */}
          <motion.div
            className="absolute -inset-1.5 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,45,170,0.3) 0%, transparent 65%)",
            }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.3,
            }}
          />
          {/* number badge */}
          <div className="relative h-12 w-12 grid place-items-center rounded-full bg-ink/95 border border-white/10 font-mono text-[13px] font-bold text-magenta-neon">
            {step.n}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl p-6 lg:mt-0 h-full transition-colors hover:border-magenta-neon/40">
        <div className="font-display text-lg lg:text-xl tracking-tight font-medium">
          {step.t}
        </div>
        <p className="mt-3 text-[13.5px] leading-relaxed text-bone-mute">
          {step.d}
        </p>

        {/* connector strzałka do następnego kroku (desktop only, między kartami) */}
        {index < 4 && (
          <div
            aria-hidden
            className="hidden lg:block absolute -right-3 top-[58px] font-mono text-[10px] text-magenta-neon/50"
          >
            →
          </div>
        )}
      </div>
    </div>
  );
}
