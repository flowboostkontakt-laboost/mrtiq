# mrtiq · Cyfrowe Czarnoksięstwo

Strona produkcyjna marki **MRTIQ — Marketing Intelligence**. Cyberpunk / CMYK system, Next.js 14 App Router + Tailwind + Framer Motion.

## Uruchomienie

```bash
npm install
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000).

## Struktura

- `app/` — strony (App Router): `/`, `/szkolenia`, `/train-the-trainer`, `/dofinansowania`, `/o-nas`, `/merch`, `/faq`
- `components/` — wspólne moduły (Navigation, Footer, Logo, CustomCursor, DragonMark, Reveal, Spotlight, PageHeader)
- `components/sections/` — sekcje strony głównej (Hero, ValueLadder, Tribe, DataProof, Ecosystem, FAQTeaser, FinalGate)

## Design system

- Tło: deep OLED black `#050505`
- Aktorzy: Cyan `#00E5C5` · Magenta `#FF2DAA`
- Wyzwalacz konwersji: Electric Yellow `#FFE600` (tylko dla głównych CTA)
- Typografia: Space Grotesk (display) · Inter (body) · JetBrains Mono (mono)
- Motion: spring `stiffness: 100, damping: 20, mass: 0.5` (zero linearów)
- Mikrointerakcje: custom cursor, magnetic tilt + spotlight hover, staggered text reveals, scroll-driven hero

## Build

```bash
npm run build
npm start
```
