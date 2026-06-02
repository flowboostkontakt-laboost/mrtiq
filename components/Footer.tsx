"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

// Lejki kampanijne mają własną, zgodną stopkę (klauzula WEKTOR) — globalna stopka się nie pokazuje
const HIDE_ON = ["/pomorskie", "/polityka-prywatnosci"];

export default function Footer() {
  const path = usePathname();
  if (HIDE_ON.some((h) => path === h || path.startsWith(h + "/"))) return null;
  return (
    <footer className="relative z-[2] border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo size={104} />
            <p className="mt-8 max-w-md text-pretty text-[15px] leading-relaxed text-bone-mute">
              MRTIQ — Marketing Intelligence. Szkolimy zespoły sprzedaży i marketingu
              w świadomym, zgodnym z prawem używaniu AI. Szkolenia współfinansowane ze
              środków UE w ramach projektu WEKTOR. Część Grupy KONIK.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
              <a href="mailto:intel@mrtiq.pl" className="group rounded-2xl hairline-strong bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-neon">E-mail</div>
                <div className="mt-1 text-sm font-medium">intel@mrtiq.pl</div>
              </a>
              <a href="tel:+48502417719" className="group rounded-2xl hairline-strong bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-magenta-neon">Telefon</div>
                <div className="mt-1 text-sm font-medium">+48 502 417 719</div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute mb-5">Oferta</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/szkolenia" className="hover:text-cyan-neon transition-colors">Szkolenia</Link></li>
                <li><Link href="/train-the-trainer" className="hover:text-cyan-neon transition-colors">Train-The-Trainer</Link></li>
                <li><Link href="/dofinansowania" className="hover:text-cyan-neon transition-colors">Dofinansowania UE</Link></li>
                <li><Link href="/merch" className="hover:text-cyan-neon transition-colors">Merch</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute mb-5">Firma</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/o-nas" className="hover:text-magenta-neon transition-colors">O nas</Link></li>
                <li><Link href="/kariera" className="hover:text-magenta-neon transition-colors">Kariera</Link></li>
                <li><Link href="/faq" className="hover:text-magenta-neon transition-colors">FAQ</Link></li>
                <li><Link href="/#dowod" className="hover:text-magenta-neon transition-colors">Opinie</Link></li>
                <li><Link href="/#protokol" className="hover:text-magenta-neon transition-colors">Zgłoszenie</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute mb-5">Grupa KONIK</h4>
              <ul className="space-y-3 text-sm text-bone/80">
                <li>Xpunkt</li>
                <li>mrtiq</li>
                <li>Konik Systems</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute">
            © {new Date().getFullYear()} MRTIQ · Marketing Intelligence
          </p>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon animate-pulse" />
            Fundusze Europejskie dla Pomorza
          </div>
        </div>
      </div>
    </footer>
  );
}
