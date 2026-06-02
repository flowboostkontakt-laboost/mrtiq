"use client";
import PageHeader from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import { useState } from "react";

// Photos live in /public/Produkty MERCH/*.PNG — URL-encoded at runtime
const MERCH_DIR = "/Produkty%20MERCH";

const PRODUCTS = [
  {
    code: "P01",
    name: "Stealth Tracksuit",
    spec: "Bluza + Spodnie · Vantablack · haftowany neonowy Smok",
    image: `${MERCH_DIR}/Komplet%20Dres%20czarny.PNG`,
    pub: 1200, kurs: 300, ttt: 0, tier: "GEAR",
  },
  {
    code: "P02",
    name: "Stealth Tracksuit · Urban Grey",
    spec: "Wariant szary · ten sam techniczny krój · neonowy Smok na plecach",
    image: `${MERCH_DIR}/Komplet%20Dres%20szary.PNG`,
    pub: 1200, kurs: 300, ttt: 0, tier: "GEAR",
  },
  {
    code: "P03",
    name: "Core T-Shirt · Classic",
    spec: "100% bawełna premium · krój dopasowany · dyskretne logo",
    image: `${MERCH_DIR}/Koszulka%20classic.PNG`,
    pub: 159, kurs: 69.39, ttt: 0, tier: "GEAR",
  },
  {
    code: "P04",
    name: "Core T-Shirt · Dance",
    spec: "Wersja Dance · oversized · grafika z neonowym Smokiem",
    image: `${MERCH_DIR}/Koszulka%20Dance.PNG`,
    pub: 179, kurs: 79, ttt: 0, tier: "GEAR",
  },
  {
    code: "P05",
    name: "Operator Socks",
    spec: "Wysoka wytrzymałość · neonowe detale Cyan / Magenta",
    image: `${MERCH_DIR}/Skarpetki.PNG`,
    pub: 69, kurs: 27, ttt: 0, tier: "GEAR",
  },
  {
    code: "P06",
    name: "Certyfikat Trenera",
    spec: "Papier premium / hologram · dyplom ukończenia",
    image: `${MERCH_DIR}/Certyfikat%20Trenera.PNG`,
    pub: 249, kurs: 0, ttt: 0, tier: "SUPPLY",
  },
  {
    code: "P07",
    name: "Identyfikator Trenera",
    spec: "Metalowa, numerowana karta z kodem certyfikacji",
    image: `${MERCH_DIR}/Identyfikator%20Trenera.PNG`,
    pub: 149, kurs: 49, ttt: 0, tier: "SUPPLY",
  },
  {
    code: "P08",
    name: "Tactical Decals · Set 01",
    spec: "Zestaw wlepek na laptopa, telefon, sprzęt audio",
    image: `${MERCH_DIR}/Wlepy.PNG`,
    pub: 39, kurs: 0, ttt: 0, tier: "SUPPLY",
  },
  {
    code: "P09",
    name: "Tactical Decals · Set 02",
    spec: "Druga seria · neonowy Smok i logotypy mrtiq",
    image: `${MERCH_DIR}/Wlepy2.PNG`,
    pub: 39, kurs: 0, ttt: 0, tier: "SUPPLY",
  },
  {
    code: "P10",
    name: "Black Mug",
    spec: "Czarny matowy kubek operacyjny · 350 ml",
    image: `${MERCH_DIR}/Kubek.PNG`,
    pub: 39, kurs: 0, ttt: 0, tier: "SUPPLY",
  },
  {
    code: "P11",
    name: "Cyber Keychain",
    spec: "Brelok terminala · metal · grawer numerowy",
    image: `${MERCH_DIR}/Brelok.PNG`,
    pub: 39, kurs: 0, ttt: 0, tier: "SUPPLY",
  },
  {
    code: "P12",
    name: "Neon Trenera",
    spec: "Dedykowany neon MRTIQ — gabinet, studio, lajwy",
    image: `${MERCH_DIR}/Neon%20Trenera.PNG`,
    pub: 1490, kurs: 590, ttt: 0, tier: "GEAR",
  },
];

const FORGE_IMG = `${MERCH_DIR}/Koszulka%20Lidera.PNG`;

const TIERS = [
  { id: "public", label: "Publiczny", desc: "Cena rynkowa", color: "border-white/10 text-bone-mute" },
  { id: "kurs", label: "Kursant", desc: "Po ukończeniu szkolenia", color: "border-cyan-neon/40 text-cyan-neon" },
  { id: "ttt", label: "Trener TTT", desc: "Pełna autoryzacja", color: "border-electric-yellow/40 text-electric-yellow" },
];

export default function MerchPage() {
  const [tier, setTier] = useState<"public" | "kurs" | "ttt">("public");
  const [code, setCode] = useState("");

  const fmt = (v: number) => v === 0 ? "0,00 PLN" : v.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " PLN";

  const priceFor = (p: typeof PRODUCTS[number]) => tier === "public" ? p.pub : tier === "kurs" ? p.kurs : p.ttt;

  return (
    <>
      <PageHeader
        glow="yellow"
        index="[05]"
        eyebrow="MRTIQ Supply Vault · Status: Authorized Access Only"
        title="To nie są ubrania."
        titleAccent="To Twój pancerz operacyjny."
        subtitle="Zbrojownia MRTIQ to miejsce, gdzie kompetencje stają się namacalne. Każdy element ekwipunku to symbol statusu. Możesz go kupić w cenie rynkowej lub zasłużyć na niego, kończąc inicjację i odblokowując specjalne protokoły cenowe (nawet do 0,00 PLN)."
        meta={[
          { k: "Kolekcji", v: "2" },
          { k: "Produktów", v: `${PRODUCTS.length}` },
          { k: "Tier elite", v: "Yellow Jersey" },
          { k: "Pakiet TTT", v: "0,00 PLN" },
        ]}
      />

      {/* Authorization */}
      <section className="relative pb-12">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="rounded-3xl border border-cyan-neon/30 bg-gradient-to-br from-cyan-neon/[0.05] to-transparent p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon">[ Airdrop Protocol ]</div>
                  <div className="mt-3 font-display text-2xl font-semibold tracking-tight">Protokół Zrzutu</div>
                  <p className="mt-2 text-sm text-bone-mute">
                    Masz kod ze zdanego egzaminu? Wprowadź go, aby system rozpoznał Twój poziom uprawnień.
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <div className="flex gap-2 rounded-xl border border-white/10 bg-ink/60 backdrop-blur p-2">
                    <span className="font-mono text-[12px] text-cyan-neon px-2 self-center">{">_"}</span>
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="WPROWADŹ KOD AUTORYZACJI"
                      className="flex-1 bg-transparent font-mono text-[12px] uppercase tracking-[0.18em] placeholder:text-bone-mute outline-none"
                    />
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-3 gap-2">
                    {TIERS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTier(t.id as any)}
                        className={`rounded-lg border px-3 py-2.5 text-[11px] font-mono uppercase tracking-[0.18em] transition-all ${
                          tier === t.id ? `${t.color} bg-white/[0.04]` : "border-white/10 text-bone-mute hover:border-white/20"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section className="relative py-12 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.code} delay={i * 0.04}>
                <Spotlight glowColor={i % 2 ? "0,229,197" : "255,45,170"} className="group h-full">
                  <div className="h-full rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-colors group-hover:border-white/20">
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-white/5">
                      <ProductImage src={p.image} alt={p.name} accent={i % 2 ? "cyan" : "magenta"} />
                      <div className="absolute left-4 top-4 rounded-full bg-ink/70 backdrop-blur px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-bone z-10">
                        {p.code} · {p.tier}
                      </div>
                      {tier !== "public" && (
                        <div className="absolute right-4 top-4 rounded-full bg-electric-yellow/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink z-10">
                          {tier === "ttt" ? "−100%" : "−" + Math.round((1 - p.kurs / p.pub) * 100) + "%"}
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="font-display text-xl font-medium tracking-tight">{p.name}</div>
                      <p className="mt-2 text-sm text-bone-mute leading-relaxed">{p.spec}</p>
                      <div className="mt-5 flex items-end justify-between">
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">
                            {tier === "public" ? "Public" : tier === "kurs" ? "Kursant" : "Trener TTT"}
                          </div>
                          <div className="mt-1 font-display text-2xl font-semibold tracking-tight">{fmt(priceFor(p))}</div>
                          {tier !== "public" && (
                            <div className="text-[11px] text-bone-mute line-through">{fmt(p.pub)}</div>
                          )}
                        </div>
                        <button className="rounded-full bg-white/[0.05] hairline-strong px-4 py-2 text-[12px] font-medium hover:bg-white/[0.08] transition-colors">
                          Add →
                        </button>
                      </div>
                    </div>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Forge */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className={`relative overflow-hidden rounded-3xl border ${tier === "ttt" ? "border-electric-yellow/40" : "border-white/10"} bg-gradient-to-br from-electric-yellow/[0.05] to-transparent`}>
              <div className={`p-8 lg:p-12 ${tier !== "ttt" ? "blur-[1.5px] opacity-90" : ""}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">
                      [ The Forge · Strefa zamknięta ]
                    </div>
                    <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2 leading-[1] text-balance">
                      Żółta Koszulka Lidera
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-bone-mute max-w-xl">
                      Symbol osoby, która zarządza procesami i przewodzi grupie.
                      Najwyższe odznaczenie w ekosystemie MRTIQ. Niedostępna w
                      sprzedaży publicznej.
                    </p>
                    <div className="mt-7 flex items-center gap-4">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">Cena</div>
                        <div className="mt-1 font-display text-3xl font-semibold tracking-tight text-electric-yellow">
                          {tier === "ttt" ? "0,00 PLN" : "TYLKO TTT"}
                        </div>
                      </div>
                      <div className="h-12 w-px bg-white/10" />
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">Tier</div>
                        <div className="mt-1 font-display text-xl font-medium">Legendary</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-electric-yellow/40 via-electric-yellow/10 to-transparent hairline-strong overflow-hidden">
                      <div className="absolute inset-0 bg-grid-fine opacity-40" />
                      <img
                        src={FORGE_IMG}
                        alt="Koszulka Lidera"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
              {tier !== "ttt" && (
                <div className="absolute inset-0 grid place-items-center bg-gradient-to-t from-ink/95 via-ink/40 to-transparent">
                  <div className="text-center">
                    <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-electric-yellow">[ Access Locked ]</div>
                    <div className="mt-2 font-display text-2xl font-semibold tracking-tight">Dostęp tylko dla Trenerów TTT</div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Unboxing */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-magenta-neon">[ The Unboxing Experience ]</div>
                <h2 className="mt-4 font-display text-[clamp(2rem,4.6vw,4rem)] font-semibold tracking-tightest-2 leading-[1]">
                  Legendarne <span className="text-electric-yellow text-glow-yellow">Żółte Pudło.</span>
                </h2>
                <p className="mt-6 text-[15.5px] leading-relaxed text-bone-mute max-w-md">
                  Nie wysyłamy ubrań w workach foliowych. Każde zamówienie
                  autoryzowane kodem pakujemy do dużego, żółtego kartonu —
                  zabezpieczonego naszą firmową, zbrojoną taśmą MRTIQ.
                </p>
              </div>
              <div className="relative aspect-square rounded-3xl border border-electric-yellow/30 bg-gradient-to-br from-electric-yellow/20 to-electric-yellow/5 grid place-items-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-fine opacity-40" />
                <div className="absolute inset-x-0 top-1/2 h-12 -translate-y-1/2 bg-gradient-to-r from-magenta-neon via-electric-yellow to-cyan-neon opacity-90" />
                <div className="relative font-mono text-[10px] uppercase tracking-[0.32em] text-ink bg-electric-yellow px-4 py-2 rounded">
                  SYSTEM ACCESS ONLY
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ProductImage({
  src, alt, accent,
}: { src: string; alt: string; accent: "cyan" | "magenta" }) {
  const tones =
    accent === "cyan"
      ? ["from-cyan-neon/30", "to-magenta-neon/10"]
      : ["from-magenta-neon/30", "to-cyan-neon/10"];
  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${tones[0]} ${tones[1]}`}>
      <div className="absolute inset-0 bg-grid-fine opacity-50" />
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
        loading="lazy"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
