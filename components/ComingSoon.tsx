"use client";
import { usePathname } from "next/navigation";

// Strony dostępne publicznie (reszta serwisu = nakładka „Niedługo otwieramy").
// /pomorskie = aktywny lejek kampanii · /polityka-prywatnosci = wymagana przy RODO.
const ALLOW = ["/pomorskie", "/polityka-prywatnosci"];

export default function ComingSoon() {
  const path = usePathname();
  const allowed = ALLOW.some((p) => path === p || path.startsWith(p + "/"));
  if (allowed) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center overflow-hidden bg-ink text-bone">
      <div className="absolute inset-0 bg-cmyk opacity-70" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="scanlines" aria-hidden />
      <div className="relative flex flex-col items-center gap-8 px-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mrtiq-mark.png"
          alt="MRTIQ — Marketing Intelligence"
          className="h-auto w-[280px] max-w-[78vw]"
          draggable={false}
        />
        <div className="h-px w-28 bg-gradient-to-r from-cyan-neon via-magenta-neon to-electric-yellow" />
        <h1 className="font-display text-[clamp(1.9rem,6vw,3.6rem)] font-semibold tracking-tightest-2">
          Niedługo otwieramy
        </h1>
      </div>
    </div>
  );
}
