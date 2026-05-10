import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import FinalGate from "@/components/sections/FinalGate";
import Link from "next/link";

const BLUEPRINT = [
  { n: "01", t: "45 narzędzi technologicznych", b: "Architektura przepływu danych. Orkiestracja n8n, Clay, GA4, Make, Zapier i więcej." },
  { n: "02", t: "60 światowych ekspertów", b: "Frameworki Ariely'ego, Cialdiniego, Kahnemana zakodowane bezpośrednio w prompty." },
  { n: "03", t: "Kontrola nad Konik RevOS", b: "Licencja na wiedzę. Rdzeń systemu i 180 zautomatyzowanych procesów." },
  { n: "04", t: "Dowódca 66 Agentów AI", b: "Zaawansowana inżynieria promptów. Delegacja zadań cyfrowej armii." },
  { n: "05", t: "Data Storytelling", b: "Wizualizujesz dane jak Avinash Kaushik. Udowadniasz ROI przed zarządem." },
  { n: "06", t: "Prowadzenie szkoleń", b: "Growth Mindset (Carol Dweck). Warsztaty, które zmieniają organizacje." },
  { n: "07", t: "Personal Brand", b: "Lojalne plemię wokół Twojej marki. Wysokomarżowe usługi konsultingowe." },
  { n: "08", t: "AI w Sales & Marketing", b: "SPIN Selling × UX research × copywriting konwersyjny (Joanna Wiebe)." },
  { n: "09", t: "Pełna transformacja firmy", b: "Audyt wąskich gardeł. Wdrożenie AI od A do Z." },
  { n: "10", t: "Nowe stanowiska", b: "Chief AI Officer · Head of Automations · RevOps Director." },
  { n: "11", t: "Odnawialny certyfikat", b: "Egzamin · prestiżowy Certyfikat MRTIQ · odnawiany corocznie." },
  { n: "12", t: "Mastermind Grupy KONIK", b: "Obsługujesz klientów Xpunkt, mrtiq, Content-Media i Konik Systems." },
];

const LOOTBOX = [
  { i: "💻", t: "MacBook Air & iPhone 17 Pro", d: "Nowy mobilny ekosystem. Skonfigurowany pod RevOS." },
  { i: "🕶", t: "RayNeo X3 Pro AR Vision", d: "Podpowiedzi od agentów AI. Notatki w czasie rzeczywistym." },
  { i: "💡", t: "Oficjalny Neon MRTIQ", d: "Cyberpunkowe studio. Spotkania, lajwy, autorytet w kadrze." },
  { i: "🧥", t: "Stealth Tracksuit + tee", d: "Bluza, spodnie i koszulka. Mundur taktyczny Trenera." },
  { i: "🪪", t: "Operator ID + Blueprint", d: "Metalowa, numerowana karta i wielkoformatowy poster 66 Agentów." },
  { i: "🛡", t: "Supply Kit", d: "Czarny kubek operacyjny, brelok taktyczny, zestaw wlepek." },
];

const PATHS = [
  { code: "PATH 1", t: "Niezależny Wdrożeniowiec", d: "Wdrażaj Konik RevOS u klientów i czerp dożywotnie korzyści z abonamentów." },
  { code: "PATH 2", t: "Ekspert Wewnętrzny", d: "Główny Trener i Operator systemu w Twojej własnej firmie/korporacji." },
  { code: "PATH 3", t: "Trener Grupy KONIK", d: "Szkolenia dla Xpunkt, mrtiq, Content-Media — kontrakty z najwyższej półki." },
];

export default function TTTPage() {
  return (
    <>
      <PageHeader
        index="[02]"
        eyebrow="The Initiation · Level: Elite · Access: Restricted"
        title="Przestań używać narzędzi."
        titleAccent="Zacznij je projektować."
        subtitle="Train-The-Trainer to proces transformacji z użytkownika w Certyfikowanego Trenera i stratega AI. Szukamy liderów, którzy chcą opanować Konik RevOS, uczyć innych i wdrażać standardy Grupy KONIK na rynkach światowych. To nie kurs. To inicjacja."
        right={
          <div className="rounded-3xl border border-electric-yellow/30 bg-electric-yellow/[0.04] p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">Selection</div>
            <div className="mt-3 font-display text-3xl font-semibold tracking-tight">Limitowane</div>
            <p className="mt-2 text-sm text-bone-mute">
              Nie szukamy uczniów. Szukamy Następców. Liczy się profil, nie kolejność zgłoszeń.
            </p>
            <Link href="#aplikacja" className="mt-5 inline-flex items-center gap-2 rounded-full bg-electric-yellow px-5 py-3 text-sm font-bold text-ink neon-yellow">
              Aplikuj do programu →
            </Link>
          </div>
        }
      />

      {/* Manifest */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.8rem)] font-semibold tracking-tightest-2 max-w-4xl">
              Nie szukamy uczniów. <span className="text-bone-mute">Szukamy Następców.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
              Rynek jest pełen ekspertów od AI, którzy przeczytali jeden poradnik.
              My budujemy elitarną jednostkę Trenerów. Ludzi, którzy rozumieją
              Alchemię Biznesu — połączenie psychologii, strategii i nieludzkiej
              precyzji maszyn.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: "Dualność kompetencji", d: "Charyzma szkoleniowca + logika inżyniera systemów." },
              { t: "Władza nad procesem", d: "Nie tylko tłumaczysz — optymalizujesz i wdrażasz." },
              { t: "Status eksperta", d: "Twój certyfikat = gwarancja jakości Grupy KONIK." },
            ].map((m, i) => (
              <Reveal key={m.t} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7">
                  <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">✓ Manifest</div>
                  <div className="mt-3 font-display text-xl font-medium tracking-tight">{m.t}</div>
                  <p className="mt-2 text-sm text-bone-mute leading-relaxed">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Master blueprint */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">[ master blueprint ]</div>
                <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2">
                  Twój nowy cyfrowy arsenał.
                </h2>
              </div>
              <p className="max-w-md text-[14.5px] text-bone-mute">
                Nie kończysz tego programu z dyplomem. Kończysz go z twardą,
                rynkową przewagą. 12 kompetencji wbudowanych w Twoją zbroję.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLUEPRINT.map((b, i) => (
              <Reveal key={b.n} delay={i * 0.04}>
                <Spotlight glowColor={i % 2 ? "0,229,197" : "255,45,170"} className="group h-full">
                  <div className="h-full rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-6 transition-colors group-hover:border-white/20">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                      <span>file://{b.n}</span>
                      <span className="text-cyan-neon">CLASSIFIED</span>
                    </div>
                    <div className="mt-5 font-display text-[18px] font-medium tracking-tight text-balance">{b.t}</div>
                    <p className="mt-2 text-sm text-bone-mute leading-relaxed">{b.b}</p>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Loot Box */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="h-[500px] w-[500px] rounded-full bg-electric-yellow/15 blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">[ The Legendary Loot Box ]</div>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,5rem)] font-semibold tracking-tightest-2 leading-[0.96]">
                Twój <span className="text-glow-yellow text-electric-yellow">Cyfrowy Arsenał.</span>
              </h2>
              <p className="mt-6 text-bone-mute">
                Po pomyślnej weryfikacji wysyłamy Ci pełny terminal operacyjny i
                zbroję, abyś mógł natychmiast rozpocząć pracę z najwyższą rynkową
                przewagą. To nie gift bag. To wyposażenie cyfrowego komandosa.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LOOTBOX.map((l, i) => (
              <Reveal key={l.t} delay={i * 0.05}>
                <div className="relative h-full rounded-3xl border border-electric-yellow/20 bg-gradient-to-b from-electric-yellow/[0.04] to-transparent p-7">
                  <div className="text-3xl">{l.i}</div>
                  <div className="mt-4 font-display text-xl font-medium tracking-tight">{l.t}</div>
                  <p className="mt-2 text-sm text-bone-mute leading-relaxed">{l.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-10 rounded-3xl border border-white/10 bg-ink/60 backdrop-blur-xl p-7 lg:p-9 flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">Wartość rynkowa zestawu</div>
                <div className="mt-2 font-display text-4xl font-semibold tracking-tight">
                  ~ <span className="text-electric-yellow">25 000 PLN</span>
                </div>
              </div>
              <div className="font-mono text-[12px] text-bone-mute max-w-md">
                Część kwalifikuje się jako pomoc rozwojowa pokrywana z dotacji UE.
                Audyt potencjału robimy w 48h.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Career */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2">
              Co po inicjacji?
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {PATHS.map((p, i) => (
              <Reveal key={p.code} delay={i * 0.06}>
                <div className="h-full rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">{p.code}</div>
                  <div className="mt-4 font-display text-2xl font-medium tracking-tight">{p.t}</div>
                  <p className="mt-3 text-sm leading-relaxed text-bone-mute">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div id="aplikacja" />
      <FinalGate />
    </>
  );
}
