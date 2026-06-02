"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, animate } from "framer-motion";
import { Reveal, MaskReveal } from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import Magnetic from "@/components/Magnetic";
import DecodeText from "@/components/DecodeText";
import Logo from "@/components/Logo";

const DEADLINE = new Date("2026-05-29T09:00:00+02:00"); // start naboru: piątek 9:00
const ARP_URL = "https://wektor.arp.gda.pl/";              // System WEKTOR — złożenie i PODPIS wniosku (tylko w oknie naboru)
const BUR_URL = "https://uslugirozwojowe.parp.gov.pl/";     // BUR — konto uczestnika + wybór naszej usługi
const GOV_URL = "https://pz.gov.pl";                        // profil zaufany — załóż/sprawdź; podpis wniosku
const PROFIL_DOC = "/dokumenty/Profil-zaufany-instrukcja.docx"; // instrukcja: jak założyć profil zaufany
const KARTA_USLUGI_URL = ""; // TODO: wstawić link do Karty Usługi w BUR po publikacji

const FAQ = [
  { q: "Ile naprawdę zapłacę?", a: "Wkład własny to minimum 5% wartości usługi — przy 7 680 zł jest to 384 zł. Dofinansowanie pokrywa do 95%, jeśli się zakwalifikujesz. To nie jest szkolenie „za darmo” — to uczciwa cena z dużym wsparciem ze środków UE." },
  { q: "Czy na pewno dostanę środki?", a: "Nie możemy tego zagwarantować i nikt uczciwy nie powinien. O wsparciu decydują punkty (m.in. wiek, kwalifikacje, sytuacja zawodowa). Gdy suma wniosków przekroczy pulę, Operator wybiera od najwyżej punktowanych, a data złożenia rozstrzyga dopiero przy remisach. Dlatego pomagamy Ci zmaksymalizować punkty i złożyć wniosek dobrze oraz wcześnie." },
  { q: "Jak wygląda szkolenie?", a: "4 dni × 8 h (32 h), minimum 60% to ćwiczenia na realnych zadaniach. Uczysz się tworzyć treści, budować i mierzyć stronę, poprawiać widoczność w Google i wyszukiwarkach AI oraz wspierać sprzedaż danymi — zgodnie z prawem (RODO, prawa autorskie) i bez uzależnienia od jednego narzędzia. Na koniec walidacja efektów i zaświadczenie o ukończeniu." },
  { q: "Stacjonarnie czy online?", a: "Dostępne stacjonarnie, zdalnie na żywo lub mieszane. Format ustalamy przed startem usługi." },
  { q: "Muszę prowadzić firmę?", a: "Nie. Wystarczy ukończone 18 lat i związek z subregionem metropolitalnym (mieszkasz, pracujesz lub uczysz się tutaj). Szkolenie jest też dla osób bezrobotnych." },
  { q: "Kiedy odbędzie się szkolenie?", a: "Po zakwalifikowaniu — w oknie realizacji ok. lipiec–listopad 2026 (usługa musi ruszyć w terminie określonym przez Operatora). Konkretny termin ustalamy wspólnie." },
  { q: "Czy potrzebuję profilu zaufanego?", a: "Tak. Wniosek podpisujesz elektronicznie — profilem zaufanym albo kwalifikowanym podpisem elektronicznym. Najszybciej założysz profil przez bankowość internetową (kilka minut, online). Jeśli nie masz konta w banku z tą usługą, wybierz e-dowód, rozmowę wideo lub punkt potwierdzający — te metody zajmują więcej czasu, więc zacznij wcześniej. Krok po kroku opisaliśmy to w instrukcji do pobrania." },
];

// img = logo pobrane lokalnie do /public/tools/{img}.png
const AI_TOOLS: { img: string; label: string }[] = [
  { img: "claude", label: "Anthropic Claude" },
  { img: "aragon", label: "Aragon" },
  { img: "ayrshare", label: "Ayrshare" },
  { img: "blender", label: "Blender" },
  { img: "canva", label: "Canva" },
  { img: "captions", label: "Captions.ai" },
  { img: "cohere", label: "Cohere" },
  { img: "creatomate", label: "Creatomate" },
  { img: "deepgram", label: "Deepgram" },
  { img: "deepl", label: "DeepL" },
  { img: "dynamicmockups", label: "Dynamic Mockups" },
  { img: "elevenlabs", label: "ElevenLabs" },
  { img: "fal", label: "fal.ai" },
  { img: "frameio", label: "Frame.io" },
  { img: "frase", label: "Frase" },
  { img: "gemini", label: "Google Gemini API" },
  { img: "headshotpro", label: "HeadshotPro" },
  { img: "heygen", label: "HeyGen" },
  { img: "ideogram", label: "Ideogram" },
  { img: "instantly", label: "Instantly.ai" },
  { img: "luma", label: "Luma" },
  { img: "maginary", label: "Maginary.ai" },
  { img: "meshy", label: "Meshy" },
  { img: "openai", label: "OpenAI" },
  { img: "photoroom", label: "Photoroom" },
  { img: "pipecat", label: "Pipecat" },
  { img: "placeit", label: "Placeit / Pacdora" },
  { img: "recraft", label: "Recraft V4" },
  { img: "resend", label: "Resend" },
  { img: "runway", label: "Runway Gen-4" },
  { img: "seedance", label: "Seedance2" },
  { img: "spline", label: "Spline / Vectary" },
  { img: "submagic", label: "Submagic" },
  { img: "surferseo", label: "SurferSEO" },
  { img: "twilio", label: "Twilio" },
  { img: "vectorizer", label: "Vectorizer.ai" },
  { img: "whisper", label: "Whisper" },
];

const INSTITUTIONS: { src?: string; eu?: boolean; title: string; sub: string }[] = [
  { eu: true, title: "Unia Europejska", sub: "Fundusze Europejskie" },
  { src: "/parp-removebg-preview.png", title: "PARP", sub: "Polska Agencja Rozwoju Przedsiębiorczości" },
  { src: "/arp_podstawowy.png", title: "ARP", sub: "Agencja Rozwoju Pomorza · Operator" },
  { src: "/ftZVvoGe5H-removebg-preview.png", title: "BUR", sub: "Baza Usług Rozwojowych" },
  { src: "/mc.png", title: "Min. Cyfryzacji", sub: "Ministerstwo Cyfryzacji" },
  { src: "/62b40f4e83ddb4314fbf5591_893px-ISO_9001-2015.svg-removebg-preview.png", title: "ISO 9001", sub: "Certyfikat jakości" },
];

const HERO_TICKER = [
  "DO 95% DOFINANSOWANIA", "4 DNI · 32 H", "GRUPY DO 24 OSÓB", "CERTYFIKAT",
  "WKŁAD OD 384 ZŁ", "NABÓR 29.05.2026 · 9:00–18:00", "PROJEKT WEKTOR", "FUNDUSZE EUROPEJSKIE",
];

export default function SzkolenieAIPage() {
  const [path, setPath] = useState<"A" | "B">("A");

  // wybór ścieżki przewija do formularza i ustawia wariant
  const choosePath = (p: "A" | "B") => {
    setPath(p);
    document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="relative z-[3] flex justify-center bg-ink pt-8 lg:pt-12 pb-2">
        <div aria-label="mrtiq — Marketing Intelligence" className="flex items-center">
          <Logo size={68} className="lg:hidden" />
          <Logo size={92} className="hidden lg:flex" />
        </div>
      </header>
      <EuStrip />
      <Hero />
      <TrustBar />
      <Steps onChoose={() => document.getElementById("sciezki")?.scrollIntoView({ behavior: "smooth" })} />
      <Paths onChoose={choosePath} />
      <About />
      <NaborDay />
      <AiStack />
      <Audience />
      <Speaker />
      <Locations />
      <Terminy />
      <Institutions />
      <Faq />
      <LeadForm path={path} setPath={setPath} />
      <WektorClause />
      <FunnelStickyBar />
      <SoundLayer />
    </>
  );
}

/* ═══════════════════ Helpers ═══════════════════ */
function useCountdown() {
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, DEADLINE.getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function Countdown() {
  const t = useCountdown();
  const pad = (n: number) => String(n).padStart(2, "0");
  const closed = t && t.d === 0 && t.h === 0 && t.m === 0 && t.s === 0;
  const cells: [string, string][] = t
    ? [[pad(t.d), "DNI"], [pad(t.h), "GODZ"], [pad(t.m), "MIN"], [pad(t.s), "SEK"]]
    : [["--", "DNI"], ["--", "GODZ"], ["--", "MIN"], ["--", "SEK"]];
  if (closed) {
    return (
      <div className="font-mono text-[12px] uppercase tracking-[0.28em] text-magenta-neon">
        Nabór wystartował — działaj w oknie 9:00–18:00
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md">
      {cells.map(([v, l]) => (
        <div key={l} className="rounded-2xl hairline-strong bg-ink/60 backdrop-blur px-1 py-3 sm:px-6 sm:py-4 text-center">
          <div className="font-mono text-[1.9rem] sm:text-6xl font-medium tabular-nums text-electric-yellow leading-none text-glow-yellow">{v}</div>
          <div className="font-mono text-[8px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.28em] text-bone-mute mt-2">{l}</div>
        </div>
      ))}
    </div>
  );
}

function CountUp({ to, prefix = "", suffix = "", className }: { to: number; prefix?: string; suffix?: string; className?: string }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString("pl-PL"));
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) animate(mv, to, { duration: 1.5, ease: [0.16, 1, 0.3, 1] }); }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [mv, to]);
  return <span ref={ref} className={className}>{prefix}<motion.span>{rounded}</motion.span>{suffix}</span>;
}

function EuFlag({ size = 16 }: { size?: number }) {
  const r = size * 0.33;
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[2px] bg-[#003399]" style={{ width: size * 1.5, height: size }} aria-label="Flaga Unii Europejskiej">
      <span className="relative block" style={{ width: size * 0.8, height: size * 0.8 }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x = (Math.cos(a) * r).toFixed(2);
          const y = (Math.sin(a) * r).toFixed(2);
          return (
            <span key={i} className="absolute leading-none text-[#FFCC00]" style={{ left: "50%", top: "50%", fontSize: size * 0.2, transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}>★</span>
          );
        })}
      </span>
    </span>
  );
}

/* ═══════════════════ 0 · Pasek UE ═══════════════════ */
const EU_ITEMS = ["Fundusze Europejskie dla Pomorza", "Dofinansowane przez Unię Europejską", "Projekt WEKTOR · FEP 2021–2027"];
function EuStrip() {
  return (
    <div className="relative z-[2] bg-ink text-bone pt-6 lg:pt-8 overflow-hidden border-b border-white/5">
      <div className="marquee-track py-3" style={{ animationDirection: "reverse" }}>
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex items-center gap-x-10 px-5">
            {Array.from({ length: 5 }).flatMap(() => EU_ITEMS).map((l, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-mute whitespace-nowrap">
                <EuFlag size={15} />{l}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ 1 · Hero ═══════════════════ */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-cmyk opacity-70" aria-hidden />
      <motion.div style={{ y: gridY }} className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="scanlines" aria-hidden />
      <div className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent via-cyan-neon/12 to-transparent animate-scan pointer-events-none" />
      <motion.div style={{ y: blobY }} className="pointer-events-none absolute right-[-8%] top-[18%] h-72 w-72 rounded-full bg-magenta-neon/20 blur-[120px]" aria-hidden />
      <motion.div style={{ y: blob2Y }} className="pointer-events-none absolute left-[-6%] bottom-[6%] h-80 w-80 rounded-full bg-cyan-neon/20 blur-[120px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 rounded-full hairline-strong bg-white/[0.03] backdrop-blur px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon animate-pulse" />
              <DecodeText text="Nabór 2/2026 · Projekt WEKTOR · Fundusze Europejskie" className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon" />
            </div>

            <h1 className="mt-7 font-display font-semibold tracking-tightest-2 text-balance text-[clamp(2.1rem,5.2vw,4.2rem)] leading-[1.0]">
              <MaskReveal>Odbierz nawet</MaskReveal>{" "}
              <MaskReveal delay={0.05}><span className="text-glow-yellow text-electric-yellow">95% dofinansowania</span></MaskReveal>{" "}
              <MaskReveal delay={0.1}>na szkolenie z</MaskReveal>{" "}
              <MaskReveal delay={0.15}><span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">AI w sprzedaży i marketingu</span></MaskReveal>
            </h1>

            <p className="mt-7 max-w-2xl text-[clamp(1rem,2.2vw,1.12rem)] leading-relaxed text-bone-mute">
              <span className="text-bone">4 dni praktyki (32 godziny)</span>, grupy do 24 osób, zaświadczenie o ukończeniu
              i własny plan użycia AI w Twojej pracy. Twój wkład własny <span className="text-electric-yellow">od 384 zł</span>, resztę
              (do 95%) pokrywa dofinansowanie. Wnioski składasz tylko w <span className="text-magenta-neon">piątek 29 maja</span>,
              9:00–18:00 — przygotuj się już dziś.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.35}>
                <Link href="#start" className="group inline-flex items-center gap-3 rounded-full bg-electric-yellow px-7 py-4 text-[15px] font-semibold text-ink neon-yellow">
                  <span className="h-2 w-2 rounded-full bg-ink animate-pulse" />
                  Przygotuj się do naboru
                  <span className="opacity-70 transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </Link>
              </Magnetic>
              <a href="#przygotowanie" className="inline-flex items-center gap-2 rounded-full border border-cyan-neon/60 bg-cyan-neon/5 px-6 py-4 text-[14px] font-medium text-cyan-neon hover:bg-cyan-neon/10 transition-colors">
                Jak się przygotować
              </a>
            </div>

            <div className="mt-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute mb-3">Do startu naboru zostało:</div>
              <Countdown />
            </div>
          </div>

          {/* zdjęcie — na tle flag PL + UE */}
          <motion.div style={{ y: photoY }} className="lg:col-span-5 relative will-change-transform">
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-magenta-neon/20 via-transparent to-cyan-neon/20 blur-3xl" aria-hidden />
            <motion.figure
              initial={{ opacity: 0, y: 30, rotateY: -8 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.02]"
              style={{ transformPerspective: 1000 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/foto-flaga.jpg" alt="Prowadzący na tle flag Polski i Unii Europejskiej" className="w-full object-cover aspect-[4/5]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div className="scanlines opacity-40" aria-hidden />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-display text-[16px] font-semibold tracking-tight">Prowadzący — Paweł Michta</div>
                <a
                  href="https://www.linkedin.com/in/michtapawel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-block font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-neon hover:text-electric-yellow underline decoration-cyan-neon/40 underline-offset-2 transition-colors"
                >
                  Trener Cyfrowych Kompetencji i absolwent Akademii NIQ ↗
                </a>
              </figcaption>
            </motion.figure>
          </motion.div>
        </div>
      </div>

      {/* ticker */}
      <div className="relative z-10 mt-2 border-y border-white/5 bg-ink/40 backdrop-blur-sm overflow-hidden">
        <div className="marquee-track py-3.5">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-10 px-10 font-mono text-[11px] uppercase tracking-[0.32em] text-bone-mute">
              {HERO_TICKER.map((t, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-3 whitespace-nowrap"><span className="h-1 w-1 rounded-full bg-cyan-neon" />{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 2 · Pasek zaufania ═══════════════════ */
const TRUST_ITEMS = ["Operator: Agencja Rozwoju Pomorza", "Fundusze Europejskie", "Projekt WEKTOR"];
function TrustBar() {
  return (
    <section className="relative z-[2] bg-ink text-bone border-t border-white/5 overflow-hidden">
      <div className="marquee-track py-5" style={{ animationDirection: "reverse" }}>
        {Array.from({ length: 2 }).map((_, k) => (
          <div key={k} className="flex items-center gap-x-10 px-5">
            {Array.from({ length: 4 }).flatMap(() => TRUST_ITEMS).map((label, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10">
                <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-bone-mute whitespace-nowrap">
                  {label}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ 3 · Co musisz zrobić dziś ═══════════════════ */
function Steps({ onChoose }: { onChoose: () => void }) {
  return (
    <section id="przygotowanie" className="relative z-[2] bg-ink-900 text-bone pt-20 lg:pt-28 pb-8 lg:pb-10 border-t border-white/5 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon"><DecodeText text="Action required · przygotuj dziś" /></div>
          <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.8rem,4.4vw,3.4rem)]">
            Trzy rzeczy do zrobienia przed piątkiem.
          </h2>
          {/* dwa systemy — nie pomyl */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[13px] text-bone-mute">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-electric-yellow">Dwa systemy — nie pomyl:</span>
            <span><span className="text-cyan-neon font-medium">BUR</span> = konto i wybór naszej usługi.</span>
            <span className="text-white/20">·</span>
            <span><span className="text-magenta-neon font-medium">System naboru (WEKTOR)</span> = tu składasz i podpisujesz wniosek 29.05.</span>
          </div>
        </Reveal>

        {/* Krok 0 — profil zaufany (najważniejszy „stoper" w piątek) */}
        <Reveal>
          <div className="mt-6 rounded-3xl border border-cyan-neon/35 bg-cyan-neon/[0.05] p-7 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-medium text-cyan-neon">00</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-neon">Najpierw to · zrób dziś</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">Przygotuj profil zaufany</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-bone-mute">
                  Wniosek podpisujesz elektronicznie — <span className="text-bone">profilem zaufanym</span> lub kwalifikowanym podpisem. Bez tego nie złożysz wniosku 29 maja. Masz już profil? Sprawdź na pz.gov.pl, czy działa (ważny 3 lata). Nie masz? Najszybciej założysz przez bankowość internetową — kilka minut, online (albo e-dowód, rozmowa wideo, punkt potwierdzający).
                </p>
                <p className="mt-3 text-[12.5px] text-electric-yellow">⚡ Zrób to dziś, nie w piątek rano — wideorozmowa lub wizyta w urzędzie potrwają dłużej.</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5">
                <a href={GOV_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-electric-yellow px-6 py-3 text-[13px] font-bold text-ink neon-yellow">
                  Załóż profil na pz.gov.pl ↗
                </a>
                <a href={PROFIL_DOC} download className="inline-flex items-center justify-center gap-2 rounded-full hairline-strong bg-ink/60 px-6 py-3 text-[13px] font-medium hover:border-cyan-neon/40 transition-colors">
                  Pobierz instrukcję ↓
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal>
            <Spotlight glowColor="0,229,197" className="group h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors group-hover:border-cyan-neon/40">
                <div className="font-mono text-3xl font-medium text-cyan-neon">01</div>
                <div className="mt-4 font-display text-xl font-semibold tracking-tight">Konto w BUR i nasza usługa</div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-bone-mute">
                  W Bazie Usług Rozwojowych zakładasz konto i zapisujesz <span className="text-bone">numer naszej Karty Usługi{KARTA_USLUGI_URL ? "" : ": [numer]"}</span>.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <a href={BUR_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full hairline-strong bg-ink/60 px-5 py-2.5 text-[13px] font-medium hover:border-cyan-neon/40 transition-colors">
                    Konto w BUR ↗
                  </a>
                  {KARTA_USLUGI_URL && (
                    <a href={KARTA_USLUGI_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cyan-neon/40 bg-cyan-neon/[0.06] px-5 py-2.5 text-[13px] font-medium text-cyan-neon transition-colors">
                      Otwórz Kartę Usługi ↗
                    </a>
                  )}
                </div>
              </div>
            </Spotlight>
          </Reveal>
          <Reveal delay={0.07}>
            <Spotlight glowColor="255,45,170" className="group h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors group-hover:border-magenta-neon/40">
                <div className="font-mono text-3xl font-medium text-magenta-neon">02</div>
                <div className="mt-4 font-display text-xl font-semibold tracking-tight">Konto w systemie WEKTOR</div>
                <p className="mt-3 text-[14.5px] leading-relaxed text-bone-mute">
                  Wniosek składa się na <span className="text-bone">wektor.arp.gda.pl</span>. Rejestracja zajmuje kilka minut — zrób to dziś, w piątek tylko się zalogujesz.
                </p>
                <a href={ARP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full hairline-strong bg-ink/60 px-5 py-2.5 text-[13px] font-medium hover:border-magenta-neon/40 transition-colors">
                  Załóż konto w WEKTOR ↗
                </a>
              </div>
            </Spotlight>
          </Reveal>
        </div>

        <Reveal delay={0.18}>
          <button onClick={onChoose} className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric-yellow px-6 py-3 text-[13px] font-bold text-ink neon-yellow">
            Wybierz ścieżkę na piątek ↓
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════ 4 · Wybór ścieżki A/B ═══════════════════ */
function Paths({ onChoose }: { onChoose: (p: "A" | "B") => void }) {
  return (
    <section id="sciezki" className="relative z-[2] bg-ink text-bone pt-10 lg:pt-14 pb-20 lg:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <h2 className="font-display font-semibold tracking-tightest-2 text-[clamp(1.8rem,4.4vw,3.4rem)]">
            Wybierz swoją ścieżkę na piątek.
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* A */}
          <Reveal>
            <div className="relative h-full rounded-3xl border border-electric-yellow/40 bg-gradient-to-br from-electric-yellow/[0.06] to-transparent p-8">
              <div className="absolute right-6 top-6 rounded-full bg-electric-yellow px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink">Rekomendowana</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric-yellow">Ścieżka A</div>
              <div className="mt-3 font-display text-2xl font-semibold tracking-tight">Złożę wniosek samodzielnie</div>
              <p className="mt-3 text-[15px] leading-relaxed text-bone-mute">
                Najszybsza i najbezpieczniejsza opcja. Pobierasz naszą instrukcję krok po kroku, a w piątek
                o 9:00 po prostu składasz wniosek. Wyślemy Ci też SMS-em przypomnienie tuż przed startem.
              </p>
              <Magnetic strength={0.3}>
                <button onClick={() => onChoose("A")} className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric-yellow px-6 py-3.5 text-[14px] font-bold text-ink neon-yellow">
                  Pobieram instrukcję i działam sam ↗
                </button>
              </Magnetic>
              {/* placeholder wideo — podmień href na realny embed/link */}
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-electric-yellow/15 text-electric-yellow text-[13px]">▶</span>
                <div className="text-[12.5px] leading-snug text-bone-mute">Wideo „Jak złożyć wniosek krok po kroku" — <span className="text-bone/45">wkrótce</span>.</div>
              </div>
            </div>
          </Reveal>
          {/* B */}
          <Reveal delay={0.08}>
            <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-300 hover:border-cyan-neon/70 hover:bg-cyan-neon/[0.07]">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">Ścieżka B</div>
              <div className="mt-3 font-display text-2xl font-semibold tracking-tight">Chcę pomocy eksperta</div>
              <p className="mt-3 text-[15px] leading-relaxed text-bone-mute">
                W piątek przeprowadzimy Cię przez proces zdalnie, przez współdzielenie ekranu (Google Meet) —
                logujesz się i klikasz sam, my podpowiadamy na bieżąco. Wymaga wcześniejszego założenia konta w ARP.
              </p>
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-cyan-neon/20 bg-cyan-neon/[0.04] p-3">
                <span className="text-cyan-neon mt-0.5">🔒</span>
                <p className="text-[12.5px] leading-relaxed text-bone-mute">
                  Dla Twojego bezpieczeństwa <span className="text-bone">nie prosimy i nie przyjmujemy haseł</span> do systemu ARP — zostają wyłącznie u Ciebie. Asysta <span className="text-bone">nie zastępuje profilu zaufanego</span> — wniosek podpisujesz samodzielnie.
                </p>
              </div>
              {/* płatna asysta 150 zł */}
              <div className="mt-4 rounded-xl border border-electric-yellow/25 bg-electric-yellow/[0.05] p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-[14px] font-semibold tracking-tight">Płatna asysta na żywo</span>
                  <span className="font-mono text-[13px] font-bold text-electric-yellow">150 zł</span>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-bone-mute">
                  Przeprowadzimy Cię przez cały proces — zdalnie lub w biurze. Logujesz się i podpisujesz sam.{" "}
                  <a href="/dokumenty/Oswiadczenie-asysta-150zl.docx" download className="text-cyan-neon underline underline-offset-2">Oświadczenie</a>.
                </p>
              </div>
              <button onClick={() => onChoose("B")} className="mt-6 inline-flex items-center gap-2 rounded-full hairline-strong bg-ink/60 px-6 py-3.5 text-[14px] font-medium hover:border-cyan-neon/40 transition-colors">
                Zapisuję się na pomoc w piątek →
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 5 · Krótko o szkoleniu ═══════════════════ */
function About() {
  const specs: { k: string; v: React.ReactNode; tone?: string }[] = [
    { k: "Forma", v: "4 dni po 8 godzin (32 h), warsztat" },
    { k: "Grupa", v: <>do <CountUp to={24} /> osób na trenera</> },
    { k: "Wartość szkolenia", v: <CountUp to={7680} suffix=" zł" /> },
    { k: "Dofinansowanie", v: <span className="text-cyan-neon">do <CountUp to={7296} suffix=" zł" /> (do 95%)</span>, tone: "cyan" },
    { k: "Twój wkład własny", v: <span className="text-electric-yellow">od <CountUp to={384} suffix=" zł" /> (5%)</span>, tone: "yellow" },
  ];
  return (
    <section className="relative z-[2] bg-ink-900 text-bone py-20 lg:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">Krótko o szkoleniu</div>
          <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.8rem,4vw,3.2rem)]">
            Cztery dni konkretnej praktyki.
          </h2>
          <p className="mt-5 text-[15.5px] leading-relaxed text-bone-mute">
            Uczysz się używać AI w marketingu i sprzedaży: tworzysz treści, budujesz i mierzysz stronę,
            optymalizujesz widoczność w Google i w wyszukiwarkach AI, wspierasz sprzedaż danymi — zgodnie
            z prawem i bez uzależnienia od jednego narzędzia. <span className="text-bone">Minimum 60% czasu to ćwiczenia.</span>
            {" "}Wychodzisz z gotowym planem wdrożenia u siebie.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/45">
            Pełny program i harmonogram — w Karcie Usługi
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
            {specs.map((s, i) => (
              <div key={s.k} className={`flex items-center justify-between gap-4 px-6 py-4 ${i < specs.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-mute">{s.k}</span>
                <span className="font-display text-lg font-semibold tracking-tight text-right">{s.v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════ 5b · Co robisz 29.05 o 9:00 ═══════════════════ */
function NaborDay() {
  const steps = [
    { t: "Wejdź na system naboru", d: <>Otwórz <span className="text-magenta-neon">wektor.arp.gda.pl</span> — to tu składasz wniosek (nie w BUR).</> },
    { t: "Zaloguj się", d: "Użyj konta założonego wcześniej w systemie naboru WEKTOR." },
    { t: "Wypełnij Formularz I", d: "Wpisz dane i numer naszej usługi z BUR. Odpowiedzi przygotuj wcześniej według wzoru z pakietu." },
    { t: "Podpisz profilem zaufanym", d: "Zatwierdź wniosek profilem zaufanym lub podpisem kwalifikowanym." },
    { t: "Wyślij wniosek", d: "Złóż wcześnie i z kompletem dokumentów punktujących." },
  ];
  return (
    <section id="dzien-naboru" className="relative z-[2] bg-ink text-bone py-20 lg:py-28 overflow-hidden border-t border-white/5 scroll-mt-24">
      <div className="absolute inset-0 bg-grid-fine opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-magenta-neon"><DecodeText text="Piątek 29.05 · okno 9:00–18:00" /></div>
          <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.8rem,4.4vw,3.4rem)] leading-[1.04] max-w-3xl">
            Co robisz <span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">29.05 o 9:00</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
            Pięć kroków w systemie naboru. Wniosek złożysz na <span className="text-bone">wektor.arp.gda.pl</span> — okno trwa tylko od 9:00 do 18:00.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-magenta-neon/40">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-magenta-neon/40 bg-magenta-neon/[0.08] font-mono text-[13px] font-semibold text-magenta-neon">{i + 1}</span>
                  {i < steps.length - 1 && <span className="hidden lg:block h-px flex-1 bg-gradient-to-r from-magenta-neon/40 to-transparent" />}
                </div>
                <div className="mt-4 font-display text-[15px] font-semibold tracking-tight leading-snug">{s.t}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-bone-mute">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-center">
          <Reveal>
            <div className="flex items-start gap-3 rounded-2xl border border-electric-yellow/30 bg-electric-yellow/[0.05] p-5">
              <span className="text-electric-yellow text-lg leading-none mt-0.5" aria-hidden>⚡</span>
              <p className="text-[14px] leading-relaxed text-bone">
                <span className="font-semibold text-electric-yellow">Najpierw punkty, potem kolejność.</span> O wyborze do wsparcia decyduje komplet dokumentów punktujących, a dopiero potem czas złożenia. Złóż wniosek <span className="font-semibold">wcześnie i kompletny</span> — okno zamyka się o 18:00.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <Magnetic strength={0.3}>
              <a href={ARP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full lg:w-auto items-center justify-center gap-2 rounded-full bg-electric-yellow px-7 py-4 text-[14px] font-bold text-ink neon-yellow">
                Otwórz system naboru ↗
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 · Narzędzia AI (2-liniowy marquee, same logo) ═══════════════════ */
function ToolLogo({ img, label }: { img: string; label: string }) {
  const [attempt, setAttempt] = useState(0);
  const [dead, setDead] = useState(false);
  if (dead) {
    return (
      <span title={label} className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl hairline-strong bg-white/[0.03] px-2 text-center font-display text-[11px] font-semibold leading-tight tracking-tight text-bone/80 transition-transform duration-300 hover:scale-105">
        {label}
      </span>
    );
  }
  // Next dev może chwilowo zwrócić 500 dla /public przy wielu równoległych requestach —
  // ponawiamy z jitterem zanim pokażemy fallback tekstowy.
  const src = `/tools/${img}.png${attempt ? `?r=${attempt}` : ""}`;
  return (
    <span title={label} className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl hairline-strong bg-white/[0.03] p-2.5 transition-all duration-300 hover:scale-105 hover:border-white/25">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        loading="lazy"
        onError={() => {
          if (attempt < 5) setTimeout(() => setAttempt((a) => a + 1), 250 + Math.random() * 700);
          else setDead(true);
        }}
        className="h-full w-full object-contain"
      />
    </span>
  );
}
function AiStack() {
  const rotate = (arr: typeof AI_TOOLS, n: number) => [...arr.slice(n), ...arr.slice(0, n)];
  const rows = [
    { items: AI_TOOLS, dur: "55s", rev: false },
    { items: rotate(AI_TOOLS, 18), dur: "70s", rev: true },
  ];
  return (
    <section className="relative z-[2] bg-ink text-bone py-16 lg:py-20 overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon"><DecodeText text="AI STACK · narzędzia, których uczymy" /></div>
            <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.6rem,3.8vw,2.8rem)]">Uczymy narzędzi, których naprawdę używasz.</h2>
          </div>
        </Reveal>
      </div>
      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-ink to-transparent" />
        <div className="space-y-4">
          {rows.map((row, r) => (
            <div key={r} className="relative overflow-hidden">
              <div className="marquee-track gap-4" style={{ animationDuration: row.dur, animationDirection: row.rev ? "reverse" : "normal" }}>
                {Array.from({ length: 2 }).map((_, k) => (
                  <div key={k} className="flex items-center gap-4 px-2">
                    {row.items.map((t, i) => <ToolLogo key={`${r}-${k}-${i}`} img={t.img} label={t.label} />)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 7 · Dla kogo ═══════════════════ */
function Audience() {
  const fits = ["Pracujesz w marketingu, sprzedaży lub komunikacji", "Prowadzisz jednoosobową działalność albo zarządzasz zespołem", "Chcesz używać AI świadomie, a nie po omacku"];
  return (
    <section className="relative z-[2] bg-ink-900 text-bone py-20 lg:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 grid lg:grid-cols-2 gap-6">
        <Reveal>
          <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8">
            <h3 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-tight leading-[1.1] text-cyan-neon">To szkolenie jest dla Ciebie, jeśli…</h3>
            <ul className="mt-6 space-y-3">
              {fits.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-bone"><span className="mt-0.5 text-cyan-neon">✓</span>{f}</li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-bone-mute">Nie potrzebujesz wiedzy technicznej ani umiejętności programowania.</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-3xl border border-magenta-neon/30 bg-white/[0.02] p-8">
            <h3 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold tracking-tight leading-[1.1] text-magenta-neon">Warunki kwalifikacji</h3>
            <p className="mt-5 text-[15px] leading-relaxed text-bone">
              Z dofinansowania skorzystasz, jeśli masz ukończone <span className="text-magenta-neon">18 lat</span> oraz mieszkasz,
              pracujesz lub uczysz się w subregionie metropolitalnym: <span className="text-bone">Gdańsk, Gdynia, Sopot</span> oraz
              powiaty gdański, kartuski, nowodworski, pucki i wejherowski.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-bone">
              Szkolenie jest też <span className="text-magenta-neon">dla osób bezrobotnych</span> — nie musisz być zatrudniony ani prowadzić firmy.
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-bone-mute">
              Nie masz pewności? <a href="#start" className="text-cyan-neon underline">Napisz</a> — sprawdzimy to razem w dwie minuty.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════ 8 · Prowadzący + opinie (social proof) ═══════════════════ */
function Speaker() {
  return (
    <section className="relative z-[2] bg-ink text-bone pt-10 lg:pt-12 pb-20 lg:pb-28 border-t border-white/5">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">Prowadzący</div>
          <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.8rem,4.2vw,3.4rem)]">Praktycy i prelegenci — nie teoretycy.</h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
            Prowadzimy szkolenia i występujemy na wydarzeniach z udziałem instytucji Unii Europejskiej.
            Uczymy AI w sprzedaży i marketingu na realnych procesach — a oto, co mówią uczestnicy.{" "}
            <a href="https://www.linkedin.com/in/michtapawel/" target="_blank" rel="noopener noreferrer" className="text-cyan-neon hover:text-electric-yellow underline decoration-cyan-neon/40 underline-offset-2 transition-colors whitespace-nowrap">Poznaj prowadzącego ↗</a>
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* zdjęcie */}
          <Reveal className="lg:col-span-5">
            <Spotlight glowColor="255,45,170" className="group">
              <figure className="relative overflow-hidden rounded-3xl border border-white/10 transition-colors group-hover:border-white/25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/foto-scena.jpg" alt="Prowadzący na scenie — wydarzenie z udziałem instytucji Unii Europejskiej" className="h-full w-full object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone">Wydarzenie z udziałem instytucji Unii Europejskiej</div>
                </figcaption>
              </figure>
            </Spotlight>
          </Reveal>

          {/* opinie — na prawo od zdjęcia (auto-scroll w pionie) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">
                <LinkedInIcon className="h-3.5 w-3.5" /> Polecają na LinkedIn
              </div>
              <span className="flex items-center gap-1 font-display text-electric-yellow">
                <span className="text-2xl font-semibold leading-none"><CountUp to={21} /></span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-mute">rekomendacji</span>
              </span>
            </div>

            <div
              className="relative overflow-hidden h-[460px] sm:h-[560px] lg:h-[640px]"
              style={{
                maskImage: "linear-gradient(180deg, transparent, #000 8%, #000 92%, transparent)",
                WebkitMaskImage: "linear-gradient(180deg, transparent, #000 8%, #000 92%, transparent)",
              }}
            >
              <div className="marquee-col">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                  <a
                    key={`${t.name}-${i}`}
                    href={LINKEDIN_RECS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-5 mb-4 transition-colors hover:border-cyan-neon/40 hover:bg-cyan-neon/[0.04]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex gap-0.5 text-electric-yellow text-[13px] leading-none tracking-tight" aria-label="5/5">★★★★★</div>
                      <LinkedInIcon className="h-4 w-4 text-[#0A66C2]" />
                    </div>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-bone/90">„{t.quote}”</p>
                    <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-4">
                      <Avatar src={t.src} name={t.name} />
                      <div className="min-w-0">
                        <div className="font-display text-[14px] font-semibold tracking-tight truncate">{t.name}</div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-bone-mute truncate">{t.role}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <Magnetic strength={0.25}>
              <a href={LINKEDIN_RECS} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric-yellow px-6 py-3 text-[13px] font-bold text-ink neon-yellow">
                Zobacz wszystkie opinie na LinkedIn ↗
              </a>
            </Magnetic>
          </div>
        </div>

        {/* referencje — listy polecające (PDF) pod prelegentem */}
        <Reveal>
          <div className="mt-14 border-t border-white/5 pt-9">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">Referencje · listy polecające</div>
                <p className="mt-2 max-w-2xl text-[14px] text-bone-mute">Pełne listy referencyjne od firm i instytucji — do pobrania w PDF.</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-mute">{REFERENCES.length} dokumenty</span>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {REFERENCES.map((r, i) => (
                <Reveal key={r.href} delay={i * 0.05}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-cyan-neon/40 hover:bg-cyan-neon/[0.04]"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 text-magenta-neon transition-colors group-hover:border-magenta-neon/40">
                      <PdfIcon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[14px] font-semibold tracking-tight truncate">{r.org}</span>
                      <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-bone-mute truncate">{r.person}</span>
                    </span>
                    <span className="ml-auto shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-bone-mute transition-colors group-hover:text-cyan-neon">{r.lang} ↓</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════ Opinie z LinkedIn (realne rekomendacje) ═══════════════════ */
const LINKEDIN_RECS = "https://www.linkedin.com/in/michtapawel/details/recommendations/";
const REFERENCES: { org: string; person: string; lang: string; href: string }[] = [
  { org: "Tataj Innovation", person: "Daria Gołębiowska-Tataj · CEO", lang: "EN", href: "/referencja-tataj-innovation.pdf" },
  { org: "IQ Consulting", person: "Tomasz Bieńkowski · Prezes Zarządu", lang: "PL", href: "/referencja-iq-consulting.pdf" },
  { org: "Frumax / Flooro", person: "Referencja po szkoleniu", lang: "PL", href: "/referencja-frumax-flooro.pdf" },
  { org: "Gabra JMK", person: "Marcin Grabarczyk · CEO", lang: "EN", href: "/referencja-gabra-jmk.pdf" },
];
const TESTIMONIALS = [
  { name: "Kamil Wiśniewski", role: "Marketing & Szkolenia", src: "/kamilwisniewski.jpg",
    quote: "Paweł posiada umysł stratega oraz jest najlepszym sprzedawcą, jakiego poznałem. Jego pracowitość i pomysłowość tworzą wybuchową mieszankę, która kieruje biznes wysoko w przestrzeń kosmiczną 🚀 Polecam porozmawiać z Pawłem osobiście — na pewno będzie miał wizję działań dla Ciebie i Twojego biznesu." },
  { name: "Marek Okoński", role: "CEO · producent mebli", src: "/marek.jpg",
    quote: "Jestem producentem mebli. Paweł zajął się przygotowaniem strategii sprzedażowo-marketingowej i wprowadzeniem jej w życie. Doceniam świetny kontakt i odpowiedzialność po jego stronie. Jego rozwiązania pozwalają mi uniknąć dodatkowych kosztów i pomagają realizować cele sprzedażowe. Polecam Pawła — ale niechętnie, bo wolałbym mieć jak najwięcej jego czasu dla siebie :)" },
  { name: "Kamil Troka", role: "CEO Veritas Finanse", src: "/kamiltroka.jpg",
    quote: "Szkolenie z LinkedIna przygotowane i przeprowadzone było na wysokim poziomie. Paweł to niesamowicie kreatywny ekspert, którego charakteryzuje przede wszystkim strategiczne i przemyślane planowanie. Każdy projekt, którego się podejmuje, jest skazany na powodzenie." },
  { name: "Justyna Horbacz", role: "Brand Voice Manager", src: "/justyna.jpg",
    quote: "Praca z Pawłem to żywioł! Jego energia, pasja i zaangażowanie sprawiają, że lista zadań kurczy się w zaplanowanym tempie. Człowiek akcji — mniej gadania, więcej domykania. Z LinkedIna potrafi pozyskać więcej leadów dla klientów, niż można by się spodziewać." },
  { name: "Kamil Czerwiński", role: "Holzberg · więźby dachowe", src: "/kamil.jpg",
    quote: "Paweł pomógł nam dotrzeć do nowych zleceniodawców w zakresie fotowoltaiki i pomp ciepła. Po dobrych wynikach rozszerzyliśmy współpracę o hurtownię elektryczną i sklep online — rezultaty są odczuwalne cały czas. Współpracując z Pawłem możesz liczyć na wysoki poziom obsługi." },
  { name: "Aleksandra Zackiewicz", role: "Strateg marketingu", src: "/aleksandra.jpg",
    quote: "Paweł rozwijał nasz zespół z niesamowitą prędkością. Jest osobą kreatywną, a jego pomysły zaskakują, inspirują i nadają kierunek, by osiągnąć sukces! Z czystym sercem polecam Pawła w przestrzeni pracy." },
  { name: "Julia Pałubicka", role: "Grafik", src: "/julia.jpg",
    quote: "Praca z Pawłem nauczyła mnie, że w marketingu najważniejszy jest drugi człowiek. Doskonały sprzedawca i lider — swoją charyzmą potrafi oczarować każdego. Kompetentny, rzetelny i terminowy. Współpraca z nim to rozwijające doświadczenie." },
  { name: "Adrian Michalczuk", role: "Psycholog & Coach", src: "/adrian.jpg",
    quote: "Paweł to kompetentny marketer i sprzedawca. Jest doświadczony, potrafi jasno przekazać informacje oraz zmotywować klienta. Polecam współpracę z Pawłem." },
  { name: "Sylwester Ciszek", role: "Fotograf biznesowy", src: "/swester.jpg",
    quote: "Polecam współpracę z Pawłem. To, co go wyróżnia, to przede wszystkim szybkość w działaniu i szukanie rozwiązań tu i teraz, a nie później. Osoba bardzo kontaktowa i przy okazji z dużą kreatywnością. Polecam!!!" },
  { name: "Mateusz Malejka", role: "Malejka.eu", src: "/mateuszmalejka.jpg",
    quote: "Ogromna wiedza teoretyczna i praktyczna, a do tego niebywałe zaangażowanie i mega pozytywna energia. Mimo że nasze drogi zawodowe się rozeszły, co jakiś czas korzystam z jego niesamowitej wiedzy, głównie w sprawach marketingowych. Polecam z czystym sumieniem!" },
  { name: "Michał Czapliński", role: "Web Developer", src: "/michal.jpg",
    quote: "Bardzo pozytywnie współpracuje się z Pawłem. Byłem Web Developerem podczas naszej współpracy i wszystkie projekty przebiegły pomyślnie. Polecam." },
  { name: "Zouhair Sahtout", role: "Klient · Maroko", src: "/zouhair.jpg",
    quote: "Gdy pierwszy raz spotkałem Pawła, od razu nawiązaliśmy silną zawodową relację. Jego błyskotliwe pomysły i zdecydowanie we wdrażaniu pomogły mi rozwinąć kompetencje i osiągnąć cele. Gorąco polecam tę wyjątkową osobę. Dziękuję, Paweł — jesteś maestro swojej orkiestry!" },
  { name: "Daniel Zakrzewski", role: "Filmmaker · Eventmovie.pl", src: "/daniel.jpg",
    quote: "Miałem przyjemność pracować z Pawłem i muszę przyznać, że to profesjonalista nastawiony na cel. Zaimponował mi elastycznością i głową pełną nieszablonowych pomysłów. Życzę sobie więcej ludzi z takim podejściem!" },
  { name: "Mateusz Bąk", role: "Przedsiębiorca", src: "/mateusz.jpg",
    quote: "Poznałem Pawła jako ponadprzeciętnie utalentowaną, pracowitą i bardzo pozytywną osobę. Jego rozwój przez lata może być inspiracją, a wartość, którą oferuje klientom, to efekt praktycznej wiedzy w sprzedaży i marketingu." },
  { name: "Michał J. Kołakowski", role: "Enterprise Account Executive", src: "",
    quote: "Z Pawłem współpracowałem przy kilku projektach — wykazał się kreatywnością i terminową organizacją. Człowiek, któremu można zaufać i na nim polegać. Jego działania zwiększyły sprzedaż, a pozytywna energia świetnie wpłynęła na zespoły." },
  { name: "Zuzanna Pluta", role: "Creative marketing", src: "",
    quote: "We współpracy z Pawłem miałam okazję obcować z profesjonalizmem, energią i pasją. Na kolejnych etapach także z rezultatami, które przerosły oczekiwania. Pytana o rekomendacje ekspertów od strategii i negocjacji, polecam każdorazowo Pawła." },
];

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function PdfIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8.5 13h1.5a1.5 1.5 0 0 1 0 3H8.5zM8.5 16v-3" />
      <path d="M14 13v3M14 13h1.8M14 14.5h1.4" />
    </svg>
  );
}

function Avatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("");
  if (failed || !src) {
    return (
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-neon/30 to-magenta-neon/30 font-display text-sm font-bold text-bone">
        {initials}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} onError={() => setFailed(true)} className="h-12 w-12 shrink-0 rounded-full object-cover" />
  );
}

/* ═══════════════════ 9 · Format i lokalizacje ═══════════════════ */
function Locations() {
  const cities = ["Gdańsk", "Gdynia", "Sopot", "Kartuzy", "Pruszcz Gdański", "Wejherowo", "woj. pomorskie"];
  return (
    <section className="relative z-[2] bg-ink-900 text-bone py-20 lg:py-28 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-grid-fine opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon"><DecodeText text="Format i lokalizacje" /></div>
          <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.02] max-w-3xl">
            Szkolimy cyklicznie w całym <span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">woj. pomorskim</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
            Szkolenia odbywają się cyklicznie w różnych miastach województwa pomorskiego. Wybierz format, który pasuje do Ciebie.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal>
            <Spotlight glowColor="0,229,197" className="group h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors group-hover:border-cyan-neon/40">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 text-cyan-neon text-xl">⌂</div>
                <div className="mt-5 font-display text-2xl font-semibold tracking-tight">U Ciebie w firmie</div>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-mute">Przeprowadzimy szkolenie u Ciebie — dla całego zespołu, na Twoich realnych procesach i danych.</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-neon/30 bg-cyan-neon/[0.06] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan-neon">
                  Już od 6 osób — nawet do 48
                </div>
              </div>
            </Spotlight>
          </Reveal>
          <Reveal delay={0.08}>
            <Spotlight glowColor="255,45,170" className="group h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors group-hover:border-magenta-neon/40">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 text-magenta-neon text-xl">★</div>
                <div className="mt-5 font-display text-2xl font-semibold tracking-tight">Szkolenia grupowe w hotelach</div>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-mute">Otwarte szkolenia w hotelach na terenie woj. pomorskiego — m.in. w <span className="text-bone">Gdańsku, Sopocie, Gdyni, Kartuzach, Pruszczu Gdańskim i Wejherowie</span>.</p>
              </div>
            </Spotlight>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-mute mr-1">Lokalizacje:</span>
            {cities.map((c) => (
              <span key={c} className="rounded-full hairline-strong bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-bone-mute">{c}</span>
            ))}
            <span className="rounded-full border border-electric-yellow/30 bg-electric-yellow/[0.06] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-electric-yellow">+ kolejne miasta</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════ 9b · Elastyczne terminy szkoleń ═══════════════════ */
function Terminy() {
  return (
    <section className="relative z-[2] bg-ink text-bone py-20 lg:py-28 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-grid-fine opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon"><DecodeText text="Terminy · elastyczny harmonogram" /></div>
          <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.8rem,4.4vw,3.4rem)] leading-[1.04] max-w-3xl">
            Elastyczne terminy szkoleń — <span className="bg-gradient-to-r from-cyan-neon to-magenta-neon bg-clip-text text-transparent">wybierz, co Ci pasuje.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-bone-mute">
            Wiemy, że Twój czas jest cenny. Szkolenia zaprojektowaliśmy tak, aby maksymalnie dopasować się do Twojego harmonogramu — wybierz opcję najwygodniejszą dla siebie.
          </p>
        </Reveal>

        {/* dwa główne tryby */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal>
            <Spotlight glowColor="0,229,197" className="group h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors group-hover:border-cyan-neon/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-neon/30 bg-cyan-neon/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-neon">Weekendy</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-mute">8:00–16:00</span>
                </div>
                <div className="mt-5 font-display text-2xl font-semibold tracking-tight">Grupy weekendowe</div>
                <div className="mt-4 space-y-2.5 text-[14.5px] text-bone">
                  <div className="flex items-center gap-3"><span className="text-cyan-neon">◷</span> Czwartek · piątek · sobota · niedziela</div>
                  <div className="flex items-center gap-3"><span className="text-cyan-neon">↻</span> Co drugi tydzień</div>
                </div>
              </div>
            </Spotlight>
          </Reveal>
          <Reveal delay={0.08}>
            <Spotlight glowColor="255,45,170" className="group h-full">
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors group-hover:border-magenta-neon/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-magenta-neon/30 bg-magenta-neon/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-magenta-neon">Dni robocze</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-mute">8:00–16:00</span>
                </div>
                <div className="mt-5 font-display text-2xl font-semibold tracking-tight">Grupy w tygodniu</div>
                <div className="mt-4 space-y-2.5 text-[14.5px] text-bone">
                  <div className="flex items-center gap-3"><span className="text-magenta-neon">◷</span> Poniedziałek · wtorek · środa · czwartek</div>
                  <div className="flex items-center gap-3"><span className="text-magenta-neon">↻</span> Pierwszy i trzeci tydzień miesiąca</div>
                </div>
              </div>
            </Spotlight>
          </Reveal>
        </div>

        {/* oferty indywidualne + inna data */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-bone text-lg">⌂</div>
              <div className="mt-4 font-display text-lg font-semibold tracking-tight">Oferta dla firm</div>
              <p className="mt-2 text-[14px] leading-relaxed text-bone-mute">Ustalana indywidualnie — skontaktuj się z nami i dopasujemy termin do zespołu.</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-bone text-lg">🏛</div>
              <div className="mt-4 font-display text-lg font-semibold tracking-tight">Gminy i jednostki samorządowe</div>
              <p className="mt-2 text-[14px] leading-relaxed text-bone-mute">Ustalana indywidualnie — przygotujemy program pod potrzeby instytucji.</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-full rounded-3xl border border-electric-yellow/25 bg-electric-yellow/[0.04] p-6 transition-colors hover:border-electric-yellow/50">
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-electric-yellow/30 text-electric-yellow text-lg">✦</div>
              <div className="mt-4 font-display text-lg font-semibold tracking-tight">Szukasz innej daty?</div>
              <p className="mt-2 text-[14px] leading-relaxed text-bone-mute">Daj nam znać — jesteśmy elastyczni i chętnie znajdziemy rozwiązanie. <a href="#start" className="text-electric-yellow underline underline-offset-2">Napisz do nas</a>.</p>
            </div>
          </Reveal>
        </div>

        {/* gwarancja elastyczności + ramy czasowe WEKTOR */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal>
            <Spotlight glowColor="0,229,197" className="group h-full">
              <div className="h-full rounded-3xl border border-cyan-neon/30 bg-cyan-neon/[0.04] p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-neon">Gwarancja elastyczności</div>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">Zarezerwuj miejsce bez stresu</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-bone-mute">Nie masz pewności, który termin będzie ostatecznie najlepszy? Nie ma problemu.</p>
                <ul className="mt-5 space-y-3 text-[15px]">
                  <li className="flex items-start gap-3"><span className="mt-0.5 text-cyan-neon">✓</span><span>Zapisz się nawet na <span className="font-semibold text-cyan-neon">3 różne grupy</span> i podejmij ostateczną decyzję później.</span></li>
                  <li className="flex items-start gap-3"><span className="mt-0.5 text-cyan-neon">✓</span><span>Coś Ci wypadnie? Bez problemu <span className="font-semibold">przeniesiemy Cię na kolejny wolny termin</span>.</span></li>
                </ul>
              </div>
            </Spotlight>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-electric-yellow/30 bg-electric-yellow/[0.05] p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-electric-yellow">
                <span aria-hidden>⚠</span> Ważne ramy czasowe · projekt WEKTOR
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">Okno startu szkolenia (nabór 29.05.2026)</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-bone-mute">
                Aby bezpiecznie skorzystać z dofinansowania, Twoje szkolenie musi rozpocząć się w wyznaczonym oknie:
              </p>

              {/* oś czasu */}
              <div className="relative mt-7 pb-1">
                <div className="absolute left-2 right-2 top-[7px] h-[2px] rounded-full bg-gradient-to-r from-cyan-neon via-electric-yellow to-magenta-neon opacity-60" />
                <div className="relative grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="mx-auto block h-4 w-4 rounded-full bg-cyan-neon ring-4 ring-cyan-neon/15" />
                    <div className="mt-3 font-display text-[15px] font-semibold leading-none">29 lip 2026</div>
                    <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-mute">Najwcześniejszy start</div>
                  </div>
                  <div>
                    <span className="mx-auto block h-4 w-4 rounded-full bg-electric-yellow ring-4 ring-electric-yellow/20" />
                    <div className="mt-3 font-display text-[15px] font-semibold leading-none text-electric-yellow">IX / X 2026</div>
                    <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-electric-yellow/80">Rekomendowane</div>
                  </div>
                  <div>
                    <span className="mx-auto block h-4 w-4 rounded-full bg-magenta-neon ring-4 ring-magenta-neon/15" />
                    <div className="mt-3 font-display text-[15px] font-semibold leading-none">29 lis 2026</div>
                    <div className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-mute">Ostateczny start</div>
                  </div>
                </div>
              </div>

              <p className="mt-6 rounded-2xl border border-white/10 bg-ink/40 p-4 text-[13.5px] leading-relaxed text-bone-mute">
                <span className="font-semibold text-bone">Wskazówka:</span> wybierz termin na przełomie września i października 2026 — zdążysz spokojnie dopełnić formalności (m.in. podpisanie umowy na 5 dni przed startem usługi) bez ryzyka utraty dofinansowania.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ 10 · Instytucje (marquee) ═══════════════════ */
function LogoPlate({ src, eu, title, sub }: { src?: string; eu?: boolean; title: string; sub: string }) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;
  return (
    <div className="group shrink-0 w-[200px]">
      <div className="grid h-24 place-items-center rounded-2xl border border-white/10 bg-white px-6 transition-transform duration-300 group-hover:scale-[1.03]">
        {eu ? <EuFlag size={44} /> : showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={title} onError={() => setFailed(true)} className="max-h-14 max-w-[150px] object-contain" />
        ) : <span className="font-display text-2xl font-bold tracking-tight text-ink">{title}</span>}
      </div>
      <div className="mt-3 text-center">
        <div className="font-display text-[13px] font-semibold tracking-tight leading-none">{title}</div>
        <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-bone-mute leading-tight">{sub}</div>
      </div>
    </div>
  );
}
function Institutions() {
  return (
    <section className="relative z-[2] bg-ink text-bone py-20 lg:py-24 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-neon"><DecodeText text="Realizacja i finansowanie" /></div>
            <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.6rem,3.8vw,2.8rem)]">Realizacja i finansowanie.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-bone-mute">
              Szkolenie współfinansowane ze środków Unii Europejskiej w ramach projektu <span className="text-bone">WEKTOR</span> (Fundusze Europejskie dla Pomorza 2021–2027, Działanie 5.9). Operator: <span className="text-bone">Agencja Rozwoju Pomorza S.A.</span> · Partner: WUP w Gdańsku. Usługa zarejestrowana w Bazie Usług Rozwojowych (BUR).
            </p>
          </div>
        </Reveal>
      </div>
      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-ink to-transparent" />
        <div className="marquee-track gap-8 py-2" style={{ animationDirection: "reverse" }}>
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-start gap-8 px-4">
              {INSTITUTIONS.map((it, i) => <LogoPlate key={`${k}-${i}`} {...it} />)}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
          Realizacja: MRTIQ · Operator: Agencja Rozwoju Pomorza · Partner: WUP w Gdańsku · Działanie 5.9 · FEP 2021–2027
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════ 11 · FAQ ═══════════════════ */
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative z-[2] bg-ink-900 text-bone py-20 lg:py-28 border-t border-white/5">
      <div className="mx-auto max-w-[900px] px-6 lg:px-10">
        <Reveal>
          <h2 className="font-display font-semibold tracking-tightest-2 text-[clamp(1.8rem,4.2vw,3.4rem)] text-center">Najczęstsze pytania.</h2>
        </Reveal>
        <ul className="mt-12 space-y-3">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className={`rounded-2xl border bg-white/[0.03] transition-colors ${isOpen ? "border-cyan-neon/50" : "border-white/10"}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center gap-4 px-6 py-5 text-left">
                  <span className="flex-1 font-display text-[16px] font-medium tracking-tight">{item.q}</span>
                  <span className={`font-mono text-lg leading-none transition-transform duration-300 ${isOpen ? "rotate-45 text-cyan-neon" : "text-bone/40"}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 220, damping: 28 }} className="overflow-hidden">
                      <div className="px-6 pb-6 text-[14.5px] leading-relaxed text-bone-mute">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ═══════════════════ 12 · Formularz A/B ═══════════════════ */
const LEAD_DOCS = [
  { label: "Instrukcja krok po kroku", href: "/dokumenty/Instrukcja-uczestnika-WEKTOR.docx" },
  { label: "Jak założyć profil zaufany", href: "/dokumenty/Profil-zaufany-instrukcja.docx" },
  { label: "Checklista przed naborem", href: "/dokumenty/Checklista-przed-naborem.docx" },
  { label: "Wzór wypełnionego wniosku", href: "/dokumenty/Wzor-wypelnionego-wniosku.docx" },
];

// Sloty pomocy w oknie naboru 9:00–18:00 (co 15 min)
const SLOTS = Array.from({ length: 9 }, (_, h) => h + 9).flatMap((h) =>
  [0, 15, 30, 45].map((m) => `${h}:${String(m).padStart(2, "0")}`)
).filter((t) => t !== "18:00" && !t.startsWith("18:"));

const ICS_EVENT = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//MRTIQ//WEKTOR//PL",
  "CALSCALE:GREGORIAN",
  "BEGIN:VEVENT",
  "UID:nabor-wektor-29052026@mrtiq.pl",
  "DTSTAMP:20260527T120000Z",
  "DTSTART:20260529T070000Z",
  "DTEND:20260529T160000Z",
  "SUMMARY:Nabór WEKTOR — złóż wniosek (wektor.arp.gda.pl)",
  "DESCRIPTION:Okno 9:00–18:00. Zaloguj się na wektor.arp.gda.pl, wypełnij Formularz I, podpisz profilem zaufanym i wyślij. Złóż wcześnie i z kompletem dokumentów.",
  "LOCATION:https://wektor.arp.gda.pl/",
  "BEGIN:VALARM",
  "TRIGGER:-PT30M",
  "ACTION:DISPLAY",
  "DESCRIPTION:Nabór WEKTOR startuje o 9:00",
  "END:VALARM",
  "END:VEVENT",
  "END:VCALENDAR",
].join("\r\n");

function DownloadChip({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} download className="group flex items-center justify-between gap-3 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-left transition-colors hover:border-cyan-neon/50 hover:bg-cyan-neon/[0.05]">
      <span className="flex items-center gap-2.5">
        <PdfIcon className="h-4 w-4 text-cyan-neon" />
        <span className="text-[13.5px] font-medium text-bone">{label}</span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone-mute group-hover:text-cyan-neon">Pobierz ↓</span>
    </a>
  );
}

function LeadForm({ path, setPath }: { path: "A" | "B"; setPath: (p: "A" | "B") => void }) {
  const [rodo, setRodo] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => { setSubmitted(false); }, [path]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rodo) return;
    const fd = new FormData(e.currentTarget);
    const payload = {
      path,
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      city: String(fd.get("city") || "") || undefined,
      company: String(fd.get("company") || "") || undefined,
      nip: String(fd.get("nip") || "") || undefined,
      slot: String(fd.get("slot") || "") || undefined,
    };
    setSending(true);
    try {
      await fetch("/api/lead/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // zgłoszenie i tak pokazujemy — pliki do pobrania są dostępne lokalnie
    } finally {
      setSending(false);
      setSubmitted(true);
    }
  };

  const addToCalendar = () => {
    const blob = new Blob([ICS_EVENT], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nabor-wektor-29-05-2026.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="start" className="relative z-[2] bg-ink text-bone py-20 lg:py-28 border-t border-white/5 scroll-mt-24 overflow-hidden">
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="h-[500px] w-[500px] rounded-full bg-electric-yellow/10 blur-[140px]" />
      </div>
      <div className="relative mx-auto max-w-[760px] px-6 lg:px-10">
        <Reveal>
          <div className="flex justify-center mb-8"><Logo size={120} className="lg:hidden" /><Logo size={150} className="hidden lg:flex" /></div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">Zgłoszenie · nabór 29.05</div>
            <h2 className="mt-3 font-display font-semibold tracking-tightest-2 text-[clamp(1.9rem,4.4vw,3.4rem)]">Przygotuj się do piątku.</h2>
          </div>
        </Reveal>

        {/* przełącznik ścieżki */}
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-2">
            {(["A", "B"] as const).map((p) => (
              <button key={p} onClick={() => setPath(p)} className={`rounded-xl px-4 py-3 text-[13px] font-medium transition-all ${path === p ? "bg-electric-yellow text-ink" : "text-bone-mute hover:text-bone"}`}>
                {p === "A" ? "A · Samodzielnie" : "B · Z pomocą eksperta"}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {!submitted ? (
            <form onSubmit={onSubmit} className="mt-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 lg:p-10 space-y-5">
              {path === "A" ? (
                <>
                  <p className="text-[14px] text-bone-mute">Pobierz instrukcję krok po kroku i ustaw przypomnienie na piątek 9:00.</p>
                  <Field label="Imię" name="name" placeholder="Jak się do Ciebie zwracać?" required />
                  <Field label="E-mail" name="email" type="email" placeholder="twoj@email.pl" required />
                  <Field label="Telefon (do przypomnienia SMS)" name="phone" type="tel" placeholder="+48 ___ ___ ___" required />
                </>
              ) : (
                <>
                  <p className="text-[14px] text-bone-mute">Zapiszemy Cię na pomoc na żywo w piątek. Pamiętaj wcześniej założyć konto w ARP.</p>
                  <Field label="Imię i nazwisko" name="name" placeholder="Jan Kowalski" required />
                  <Field label="E-mail" name="email" type="email" placeholder="twoj@email.pl" required />
                  <Field label="Telefon" name="phone" type="tel" placeholder="+48 ___ ___ ___" required />
                  <Field label="Miasto / powiat" name="city" placeholder="np. Gdańsk" required />
                  <label className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-mute">Preferowany slot pomocy · piątek 29.05</span>
                    <select name="slot" required className="mt-2 w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[15px] text-bone outline-none focus:border-cyan-neon transition-colors">
                      <option value="">Wybierz godzinę (co 15 min)</option>
                      {SLOTS.map((s) => <option key={s} value={s} className="bg-ink">{s}</option>)}
                    </select>
                  </label>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Firma (opcjonalnie)" name="company" placeholder="Nazwa firmy" />
                    <Field label="NIP (jeśli zgłaszasz pracowników)" name="nip" placeholder="0000000000" />
                  </div>
                </>
              )}

              <label className="flex items-start gap-3 text-[13px] leading-relaxed text-bone-mute">
                <input type="checkbox" checked={rodo} onChange={(e) => setRodo(e.target.checked)} className="mt-1 h-4 w-4 accent-cyan-neon" required />
                <span>Wyrażam zgodę na kontakt MRTIQ (e-mail, telefon, SMS) w sprawie szkolenia i naboru WEKTOR. Administrator: Paweł Michta (JDG), NIP 5833042686. Dane (imię, e-mail, telefon) przetwarzamy na podstawie zgody (art. 6 ust. 1 lit. a RODO); możesz ją wycofać w każdej chwili. Szczegóły: <a href="/polityka-prywatnosci" target="_blank" rel="noopener noreferrer" className="underline text-cyan-neon">Polityka prywatności</a>.</span>
              </label>

              <button type="submit" disabled={!rodo || sending} className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-electric-yellow px-8 py-4 text-[15px] font-bold text-ink neon-yellow disabled:opacity-40 transition-opacity">
                {sending ? "Wysyłam…" : path === "A" ? "Wyślij i odbierz instrukcję ↗" : "Zapisuję się na pomoc ↗"}
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 100, damping: 18 }} className="mt-6 rounded-3xl border border-cyan-neon/40 bg-cyan-neon/[0.06] p-10 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-neon">[ Zgłoszenie przyjęte ]</div>
              {path === "A" ? (
                <>
                  <h3 className="mt-3 font-display text-2xl lg:text-3xl font-semibold tracking-tight">Gotowe! Pobierz pakiet.</h3>
                  <p className="mt-3 text-bone-mute max-w-md mx-auto">Wysłaliśmy też instrukcję na e-mail. Pobierz materiały i dodaj nabór do kalendarza — w piątek rano przypomnimy SMS-em.</p>
                </>
              ) : (
                <>
                  <h3 className="mt-3 font-display text-2xl lg:text-3xl font-semibold tracking-tight">Dziękujemy! Zapisaliśmy Cię.</h3>
                  <p className="mt-3 text-bone-mute max-w-md mx-auto">Odezwiemy się z dokładną godziną i linkiem do spotkania. Pobierz materiały i pamiętaj wcześniej <span className="text-bone">założyć konto w BUR</span>.</p>
                </>
              )}

              {/* pakiet do pobrania + kalendarz */}
              <div className="mt-7 grid gap-2.5 text-left">
                {LEAD_DOCS.map((d) => <DownloadChip key={d.href} {...d} />)}
              </div>
              <button onClick={addToCalendar} className="mt-4 inline-flex items-center gap-2 rounded-full bg-electric-yellow px-6 py-3 text-[14px] font-bold text-ink neon-yellow">
                Dodaj do kalendarza · 29.05, 9:00
              </button>
            </motion.div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone-mute">{label}</span>
      <input name={name} type={type} placeholder={placeholder} required={required} className="mt-2 w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 text-[15px] text-bone placeholder:text-bone/35 outline-none focus:border-cyan-neon transition-colors" />
    </label>
  );
}

/* ═══════════════════ 13 · Stopka WEKTOR ═══════════════════ */
function WektorClause() {
  return (
    <footer className="relative z-[2] bg-ink text-bone border-t border-white/10 py-14">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* górny pas: logo + kontakt */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Logo size={64} />
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-bone-mute">
              Realizacja szkolenia w ramach projektu WEKTOR. Pomagamy przygotować się do naboru — wniosek składasz i podpisujesz samodzielnie.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+48502417719" className="group rounded-2xl hairline-strong bg-white/[0.02] px-5 py-4 hover:bg-white/[0.04] transition-colors">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-magenta-neon">Telefon</div>
              <div className="mt-1 text-sm font-medium">+48 502 417 719</div>
            </a>
            <a href="mailto:intel@mrtiq.pl" className="group rounded-2xl hairline-strong bg-white/[0.02] px-5 py-4 hover:bg-white/[0.04] transition-colors">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-neon">E-mail</div>
              <div className="mt-1 text-sm font-medium">intel@mrtiq.pl</div>
            </a>
          </div>
        </div>

        {/* logotypy UE */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {["Fundusze Europejskie dla Pomorza", "Dofinansowane przez UE", "Woj. Pomorskie", "WUP w Gdańsku"].map((l) => (
            <span key={l} className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-mute"><EuFlag size={15} />{l}</span>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-[12.5px] leading-relaxed text-bone/55">
          Realizacja: <strong className="text-bone">MRTIQ</strong>. Szkolenie współfinansowane ze środków Unii Europejskiej
          w ramach projektu „WEKTOR. Metropolitalny System Finansowania Kształcenia" (Operator: Agencja Rozwoju Pomorza S.A.,
          Partner: Wojewódzki Urząd Pracy w Gdańsku), Działanie 5.9, program Fundusze Europejskie dla Pomorza 2021–2027.
          Dofinansowanie do 95% zależnie od kwalifikacji i dostępnej puli środków.
        </p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/50">
          <a href="https://funduszeue.pomorskie.eu/" target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">Program ↗</a>
          <a href={ARP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">Regulamin naboru ↗</a>
          <Link href="/polityka-prywatnosci" className="hover:text-bone transition-colors">Polityka prywatności</Link>
          <a href="mailto:intel@mrtiq.pl" className="hover:text-bone transition-colors">Kontakt</a>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════ Sticky CTA (mobile) ═══════════════════ */
function FunnelStickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > window.innerHeight * 0.5);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} transition={{ type: "spring", stiffness: 200, damping: 26 }} className="lg:hidden fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pt-2 bg-gradient-to-t from-ink via-ink/85 to-transparent">
          <Link href="#start" className="flex items-center justify-between rounded-2xl bg-electric-yellow px-5 py-4 text-sm font-bold text-ink neon-yellow">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ink animate-pulse" />Przygotuj się do naboru</span>
            <span className="font-mono text-xs">→</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════ Dźwięk (opt-in) ═══════════════════ */
function SoundLayer() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const onRef = useRef(false);
  useEffect(() => { onRef.current = on; }, [on]);

  const blip = (freq: number) => {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
    if (!Ctx) return;
    if (!ctxRef.current) ctxRef.current = new Ctx();
    const ctx = ctxRef.current;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.5);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.62);
  };

  useEffect(() => {
    const secs = Array.from(document.querySelectorAll("section"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting && onRef.current) blip(180 + Math.random() * 120); });
    }, { threshold: 0.55 });
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <button onClick={() => { setOn((v) => !v); if (!on) blip(320); }} aria-label={on ? "Wyłącz dźwięk" : "Włącz dźwięk"} className="fixed bottom-24 lg:bottom-6 right-4 z-[60] grid h-11 w-11 place-items-center rounded-full hairline-strong bg-ink/70 backdrop-blur-md text-bone-mute hover:text-bone transition-colors">
      {on ? (
        <span className="flex items-end gap-0.5 h-4">
          <span className="w-0.5 bg-cyan-neon animate-[flicker_0.8s_ease-in-out_infinite] h-2" />
          <span className="w-0.5 bg-cyan-neon animate-[flicker_0.6s_ease-in-out_infinite] h-4" />
          <span className="w-0.5 bg-cyan-neon animate-[flicker_1s_ease-in-out_infinite] h-3" />
        </span>
      ) : <span className="font-mono text-[9px] uppercase tracking-[0.16em]">SND</span>}
    </button>
  );
}
