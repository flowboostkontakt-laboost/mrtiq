import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Szkolenie AI w sprzedaży i marketingu — do 95% dofinansowania | WEKTOR",
  description:
    "4 dni / 32 h praktyki, grupy do 24 osób, certyfikat. Wartość 7 680 zł, dofinansowanie do 7 296 zł (do 95%), wkład własny od 384 zł. Nabór 29.05.2026 (piątek) — przygotuj się już dziś.",
  openGraph: {
    title: "Odbierz nawet 95% dofinansowania na szkolenie z AI",
    description:
      "Projekt WEKTOR · Fundusze Europejskie dla Pomorza · nabór 29.05.2026.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
