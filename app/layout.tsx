import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import StickyMobileBar from "@/components/StickyMobileBar";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "MRTIQ — Marketing Intelligence | Cyfrowe Czarnoksięstwo dla Biznesu",
  description:
    "Mrtiq pozyskuje dotacje UE, szkoli operatorów AI i wdraża system Konik RevOS. Zautomatyzujemy Twój chaos. Unia za to zapłaci.",
  metadataBase: new URL("https://mrtiq.eu"),
  openGraph: {
    title: "MRTIQ — Cyfrowe Czarnoksięstwo",
    description: "Pozyskujemy dotacje UE, szkolimy zespoły, wdrażamy AI.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className="bg-ink text-bone">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
        />
      </head>
      <body className="relative bg-ink text-bone selection:bg-magenta-neon selection:text-ink min-h-screen overflow-x-hidden">
        <SmoothScroll />
        <ScrollProgress />
        <div className="noise" aria-hidden />
        <CustomCursor />
        <Navigation />
        <PageTransition />
        <main className="relative z-[2]">{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
