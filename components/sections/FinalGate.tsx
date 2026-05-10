"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, MaskReveal } from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

const GOALS = [
  { id: "grant", label: "Chcę dotację na szkolenia" },
  { id: "ai", label: "Chcę wdrożyć AI w firmie" },
  { id: "ttt", label: "Chcę zostać Trenerem" },
];

export default function FinalGate() {
  const [goal, setGoal] = useState("grant");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="protokol" className="relative py-32 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="h-[600px] w-[600px] rounded-full bg-electric-yellow/10 blur-[140px] animate-breathe" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px divider-y" />

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">
              [06] Protokół Transformacji · Inicjacja
            </div>
            <h2 className="mt-5 font-display font-semibold tracking-tightest-2 text-[clamp(2.7rem,6vw,5.5rem)] leading-[0.94]">
              <MaskReveal>Wezwij</MaskReveal>{" "}
              <MaskReveal delay={0.05}>
                <span className="text-glow-yellow text-electric-yellow">Architektów</span>
              </MaskReveal>{" "}
              <MaskReveal delay={0.1}>Zmiany.</MaskReveal>
            </h2>
            <p className="mt-6 text-[15.5px] leading-relaxed text-bone-mute">
              Zostaw NIP swojej firmy. W 48 godzin sprawdzimy ile tysięcy
              złotych z dotacji UE leży na stole, gotowe sfinansować Twoją
              transformację cyfrową.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="mt-12 rounded-3xl border border-electric-yellow/25 bg-ink/70 backdrop-blur-xl p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-fine pointer-events-none" />
            {!submitted ? (
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="NIP firmy" placeholder="0000000000" name="nip" required />
                <Field label="E-mail kontaktowy" placeholder="ceo@twojafirma.pl" name="email" type="email" required />
                <Field label="Imię i Nazwisko" placeholder="Jan Kowalski" name="name" />
                <Field label="LinkedIn / Telefon" placeholder="linkedin.com/in/..." name="linkedin" />

                <div className="md:col-span-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute mb-3">Wybierz cel</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {GOALS.map((g) => (
                      <button
                        type="button"
                        key={g.id}
                        onClick={() => setGoal(g.id)}
                        className={`text-left rounded-xl border px-4 py-3 text-[13px] transition-colors ${
                          goal === g.id
                            ? "border-electric-yellow/60 bg-electric-yellow/10 text-electric-yellow"
                            : "border-white/10 bg-white/[0.02] text-bone-mute hover:border-white/20"
                        }`}
                      >
                        <span className="font-mono text-[10px] tracking-[0.24em] block opacity-70">
                          {goal === g.id ? "[●]" : "[ ]"}
                        </span>
                        <span className="mt-1 block font-medium text-bone">{g.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-4 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute max-w-md">
                    Dane przetwarzamy zgodnie z RODO. Audyt 100% bezpłatny i niezobowiązujący.
                  </p>
                  <Magnetic strength={0.4}>
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-3 rounded-full bg-electric-yellow px-8 py-4 text-[14px] font-bold uppercase tracking-[0.18em] text-ink neon-yellow"
                    >
                      <Magnetic strength={0.3}>Wezwij Architektów</Magnetic>
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
                  Protokół zainicjowany.
                </h3>
                <p className="mt-4 text-bone-mute max-w-md mx-auto">
                  Architekt Transformacji odezwie się w ciągu 48 godzin z mapą
                  Twojego potencjału dotacyjnego.
                </p>
              </motion.div>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {[
              { k: "48h", v: "Audyt potencjału" },
              { k: "0 PLN", v: "Koszt analizy" },
              { k: "94%", v: "Skuteczność wniosków" },
              { k: "100%", v: "Możliwego dofinansowania" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl hairline bg-white/[0.02] py-5">
                <div className="font-display text-2xl font-semibold tracking-tight text-electric-yellow">{s.k}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">{s.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label, placeholder, name, type = "text", required,
}: { label: string; placeholder: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 text-[14px] text-bone placeholder:text-bone-mute focus:border-electric-yellow/50 focus:bg-white/[0.04] outline-none transition-colors"
      />
    </label>
  );
}
