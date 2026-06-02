"use client";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FinalGate from "@/components/sections/FinalGate";
import Link from "next/link";

const CATEGORIES = [
  {
    id: "ekosystem",
    label: "Ekosystem · Grupa KONIK",
    color: "magenta",
    items: [
      {
        q: "Dlaczego działacie pod tyloma markami (Xpunkt, mrtiq, Konik Systems)?",
        a: "Ponieważ nie wierzymy w generyczne rozwiązania „dla każdego”. Jesteśmy precyzyjnie zaprojektowanym ekosystemem, w którym każda marka to wyspecjalizowana dywizja: Xpunkt — zautomatyzowana obsługa małych biznesów lokalnych. MRTIQ — edukacja, szkolenia i pozyskiwanie kapitału (dotacje). Konik Systems — rdzeń inżynieryjny kodujący RevOS i Agentów AI.",
      },
      {
        q: "Czym dokładnie MRTIQ różni się od Konik Systems?",
        a: "MRTIQ to umysł, energia i kapitał. Diagnozujemy problem, pozyskujemy unijne dotacje i twardo szkolimy Twoich ludzi. Konik Systems to zbrojownia i stal — instaluje serwery, aplikacje i 66 Agentów AI. My szkolimy kierowców i dajemy paliwo. Konik buduje bolid.",
      },
    ],
  },
  {
    id: "dotacje",
    label: "Dofinansowania UE · Trojan Horse",
    color: "cyan",
    items: [
      {
        q: "Dotacje unijne to biurokratyczny koszmar. Kto to wypełnia i rozlicza?",
        a: "Masz rację, to koszmar. Dlatego przejmujemy go w 100%. Posiadamy wyspecjalizowany zespół Grant Writers. Twoim zadaniem jest podanie NIP-u i podpis na gotowym wniosku. Walkę z urzędami, audyty, terminy i rozliczenia bierzemy na siebie.",
      },
      {
        q: "Co jeśli nie zakwalifikujemy się na dotację?",
        a: "Audyt potencjału robimy za darmo w 48 godzin. Jeśli z jakiegoś powodu Twoja firma nie może otrzymać środków (np. wyczerpane pule w regionie), dostaniesz od nas jasną informację. Wtedy możemy zrealizować projekt z Twojego budżetu komercyjnego, z gwarancją twardego ROI.",
      },
    ],
  },
  {
    id: "ai",
    label: "Szkolenia · AI w firmie",
    color: "yellow",
    items: [
      {
        q: "Czy szkolenie z AI nie sprawi, że pracownicy poczują się zagrożeni?",
        a: "Ignorancja budzi większy strach niż wiedza. Prowadzimy warsztaty oparte na psychologii Growth Mindset (Carol Dweck). Tłumaczymy, że AI nie jest następcą — jest cyfrowym egzoszkieletem. Pracę straci ten, kto AI nie używa. Zmieniamy ludzi w menedżerów maszyn operacyjnych, drastycznie podnosząc ich rynkową wartość.",
      },
      {
        q: "Jak szybko zobaczę zwrot z inwestycji (ROI)?",
        a: "Nie uczymy teorii. 90% naszych szkoleń to praca na żywym organizmie — danych Twojej firmy. Uczestnicy wychodzą z gotowymi promptami, automatyzacjami n8n i lejkami. Efekty (odzyskany czas, nowe leady B2B) widzisz w pierwszym tygodniu po wdrożeniu.",
      },
    ],
  },
  {
    id: "ttt",
    label: "Train-The-Trainer (TTT)",
    color: "magenta",
    items: [
      {
        q: "Kto może dołączyć do programu Train-The-Trainer?",
        a: "Program jest selektywny i limitowany. Szukamy liderów, managerów innowacji w korporacjach, wybitnych konsultantów oraz osób, które chcą zbudować własną agencję wdrożeniową pod egidą Grupy KONIK. Nie szukamy „kolekcjonerów dyplomów”.",
      },
      {
        q: "Po co mi sprzęt z Loot Boxa (MacBook, iPhone 17 Pro, Okulary AR)?",
        a: "To nie gadżety reklamowe. To Twój terminal operacyjny. Uczymy obsługi 45 narzędzi i 66 Agentów AI — potrzebujesz niezawodnego sprzętu, który bezbłędnie synchronizuje się z naszą infrastrukturą chmurową. Okulary AR i dedykowany sprzęt to Twoja zbroja do prowadzenia nowoczesnych szkoleń na najwyższym światowym poziomie.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>("ekosystem-0");

  return (
    <>
      <PageHeader
        index="[06]"
        eyebrow="Knowledge Base · Objection Override"
        title="Radykalna transparentność."
        titleAccent="Zero niedomówień."
        subtitle="Transformacja cyfrowa budzi pytania, biurokracja unijna budzi strach. Rozumiemy to. Poniżej rozbrajamy najczęstsze obiekcje CEO, CFO i Dyrektorów HR. Masz inne pytanie? Omiń system i połącz się bezpośrednio z naszymi Architektami."
      />

      <section className="relative py-12 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10 space-y-16">
          {CATEGORIES.map((cat) => (
            <Reveal key={cat.id}>
              <div>
                <div className={`font-mono text-[10px] uppercase tracking-[0.32em] ${
                  cat.color === "cyan" ? "text-cyan-neon" : cat.color === "yellow" ? "text-electric-yellow" : "text-magenta-neon"
                }`}>
                  [ {cat.label} ]
                </div>
                <ul className="mt-6 space-y-3">
                  {cat.items.map((it, i) => {
                    const id = `${cat.id}-${i}`;
                    const isOpen = openId === id;
                    return (
                      <li
                        key={id}
                        className={`rounded-2xl border ${isOpen ? "border-cyan-neon/40 bg-cyan-neon/[0.03]" : "border-white/[0.06] bg-white/[0.02]"} transition-colors`}
                      >
                        <button
                          onClick={() => setOpenId(isOpen ? null : id)}
                          className="w-full flex items-center gap-5 px-6 py-5 text-left"
                        >
                          <span className="font-mono text-[10px] tracking-[0.28em] text-bone-mute">[+]</span>
                          <span className="flex-1 font-display text-[17px] tracking-tight">{it.q}</span>
                          <span className={`font-mono text-lg leading-none transition-transform duration-300 ${isOpen ? "rotate-45 text-cyan-neon" : "text-bone-mute"}`}>+</span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 220, damping: 28 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pl-[3.75rem] text-[14.5px] leading-relaxed text-bone-mute">
                                {it.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Direct Line */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="rounded-3xl border border-magenta-neon/30 bg-gradient-to-br from-magenta-neon/[0.05] to-transparent p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">[ The Direct Line ]</div>
                  <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2 leading-[1]">
                    Omiń system. <span className="text-bone-mute">Porozmawiaj z człowiekiem.</span>
                  </h2>
                  <p className="mt-6 text-[15px] text-bone-mute max-w-xl leading-relaxed">
                    Czas to waluta. Jeśli Twój problem jest niestandardowy, nie szukaj odpowiedzi w tekstach. Połącz się bezpośrednio z Głównym Dowództwem MRTIQ.
                  </p>
                </div>
                <div className="lg:col-span-5 grid grid-cols-1 gap-3">
                  <Link href="tel:+48000000000" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink/60 backdrop-blur p-5 hover:border-magenta-neon/40 transition-colors">
                    <span className="text-magenta-neon">📞</span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">Direct Line</div>
                      <div className="font-medium">+48 ___ ___ ___</div>
                      <div className="text-xs text-bone-mute">Architekt Transformacji</div>
                    </div>
                  </Link>
                  <Link href="mailto:intel@mrtiq.pl" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-ink/60 backdrop-blur p-5 hover:border-cyan-neon/40 transition-colors">
                    <span className="text-cyan-neon">✉</span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">Secure E-mail</div>
                      <div className="font-medium">intel@mrtiq.pl</div>
                      <div className="text-xs text-bone-mute">Odpowiedź w ≤ 4h</div>
                    </div>
                  </Link>
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
