"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const Q = [
  {
    q: "Czym mrtiq różni się od Konik Systems?",
    a: "Mrtiq to umysł, energia i kapitał. Diagnozujemy problem, pozyskujemy unijne dotacje i twardo szkolimy Twoich ludzi. Konik Systems to zbrojownia — inżynierowie kodują system RevOS i Agentów AI. My szkolimy kierowców, oni budują bolid.",
  },
  {
    q: "Dotacje unijne to biurokratyczny koszmar. Kto to wypełnia?",
    a: "My. Mamy wyspecjalizowanych Grant Writerów. Twoim jedynym zadaniem jest podanie NIP-u i podpis. Walkę z urzędami, audyty, terminy i rozliczenia bierzemy na siebie.",
  },
  {
    q: "Jak szybko zobaczę zwrot z inwestycji (ROI)?",
    a: "90% naszych szkoleń to praca na żywym organizmie — danych Twojej firmy. Uczestnicy wychodzą z gotowymi promptami i lejkami. Efekty w postaci nowych leadów B2B widzisz w pierwszym tygodniu po wdrożeniu.",
  },
  {
    q: "Czy szkolenie z AI nie sprawi, że pracownicy poczują się zagrożeni?",
    a: "Wręcz przeciwnie. Pokazujemy ludziom, że AI nie jest ich następcą — jest ich cyfrowym egzoszkieletem. Pracę straci ten, kto AI nie używa.",
  },
];

export default function FAQTeaser() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal className="lg:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">
              [05] Knowledge base · Objection override
            </div>
            <h2 className="mt-5 font-display font-semibold tracking-tightest-2 text-[clamp(2.5rem,5.6vw,5rem)] leading-[0.94]">
              Radykalna <br />
              <span className="text-bone-mute">transparentność.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-bone-mute">
              Transformacja cyfrowa budzi pytania, biurokracja UE budzi strach.
              Rozbrajamy najczęstsze obiekcje CEO, CFO i HR.
            </p>
            <Link
              href="/faq"
              className="mt-7 inline-flex items-center gap-2 rounded-full hairline-strong px-5 py-3 text-[13px] font-medium text-bone-mute hover:text-bone hover:border-white/20 transition-colors"
            >
              Pełna baza wiedzy →
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ul className="space-y-3">
              {Q.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li
                    key={i}
                    className={`rounded-2xl border ${isOpen ? "border-cyan-neon/40 bg-cyan-neon/[0.03]" : "border-white/[0.06] bg-white/[0.02]"} transition-colors`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-center gap-5 px-6 py-5 text-left"
                    >
                      <span className="font-mono text-[10px] tracking-[0.28em] text-bone-mute">0{i + 1}</span>
                      <span className="flex-1 font-display text-[17px] tracking-tight">{item.q}</span>
                      <span className={`font-mono text-lg leading-none transition-transform duration-300 ${isOpen ? "rotate-45 text-cyan-neon" : "text-bone-mute"}`}>
                        +
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="c"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 220, damping: 28 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pl-[3.75rem] text-[14.5px] leading-relaxed text-bone-mute">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
