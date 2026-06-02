"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Consent Mode v2 — szkielet. Domyślnie wszystko poza niezbędnym = denied.
// Gdy dodasz GTM/GA4 ID, umieść ten sam default-consent PRZED skryptem GTM,
// a poniższe update zadziała automatycznie (GA respektuje Consent Mode).
type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "mrtiq-consent-v1";

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

function applyConsent(state: Consent) {
  gtag("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
}

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // default = denied (uruchamiane raz, zanim załaduje się jakikolwiek tag analityczny)
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "granted",
      security_storage: "granted",
      wait_for_update: 500,
    });
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (stored) applyConsent(stored);
    else setOpen(true);
  }, []);

  const choose = (state: Consent) => {
    localStorage.setItem(STORAGE_KEY, state);
    applyConsent(state);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4">
      <div className="mx-auto flex max-w-[920px] flex-col gap-4 rounded-2xl border border-white/12 bg-ink/95 p-5 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,.5)] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] leading-relaxed text-bone-mute">
          Używamy plików cookies do analityki, aby ulepszać stronę. Statystyki włączymy dopiero po Twojej zgodzie.{" "}
          <Link href="/polityka-prywatnosci" className="text-cyan-neon underline underline-offset-2">Polityka prywatności</Link>.
        </p>
        <div className="flex shrink-0 gap-2.5">
          <button
            onClick={() => choose("denied")}
            className="rounded-full hairline-strong bg-white/[0.03] px-5 py-2.5 text-[13px] font-medium text-bone transition-colors hover:border-white/30"
          >
            Tylko niezbędne
          </button>
          <button
            onClick={() => choose("granted")}
            className="rounded-full bg-electric-yellow px-5 py-2.5 text-[13px] font-semibold text-ink neon-yellow"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
