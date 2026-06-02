"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import Magnetic from "./Magnetic";

const NAV = [
  { href: "/szkolenia", label: "Szkolenia", code: "01" },
  { href: "/train-the-trainer", label: "Train-The-Trainer", code: "02" },
  { href: "/dofinansowania", label: "Dofinansowania UE", code: "03" },
  { href: "/o-nas", label: "O nas", code: "04" },
  { href: "/merch", label: "Merch", code: "05" },
  { href: "/faq", label: "FAQ", code: "06" },
  { href: "/kariera", label: "Kariera", code: "07" },
];

// Strony-lejki bez nawigacji (czysty landing kampanijny — bez navbara)
const HIDE_NAV_PATHS = ["/pomorskie", "/polityka-prywatnosci"];

export default function Navigation() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  // ─── Lejek WEKTOR: brak navbara (czysty landing kampanijny) ───
  const norm = (path || "/").replace(/\/+$/, "") || "/";
  if (HIDE_NAV_PATHS.includes(norm)) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-ink/65 border-b border-white/[0.05]" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10 py-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Logo size={52} className="lg:hidden" />
          <Logo size={104} className="hidden lg:flex" />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const active = path === n.href;
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-bone/85 hover:text-bone transition-colors"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-bone-mute group-hover:text-cyan-neon transition-colors">
                    {n.code}
                  </span>
                  <span>{n.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.05] hairline"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Magnetic strength={0.3}>
            <Link
              href="/#protokol"
              className="group relative inline-flex items-center gap-2 rounded-full bg-electric-yellow px-5 py-2.5 text-[13px] font-semibold text-ink neon-yellow"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
              Sprawdź, czy się kwalifikujesz
            </Link>
          </Magnetic>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative h-10 w-10 grid place-items-center rounded-full hairline-strong bg-ink/60 backdrop-blur"
        >
          <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-px w-4 bg-bone transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="lg:hidden border-t border-white/5 bg-ink/95 backdrop-blur-xl"
          >
            <ul className="px-6 py-4 space-y-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-[15px] font-medium text-bone hover:border-white/10 hover:bg-white/[0.03]"
                  >
                    <span>{n.label}</span>
                    <span className="font-mono text-[10px] tracking-[0.24em] text-bone-mute">[{n.code}]</span>
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/#protokol"
                  className="flex items-center justify-center gap-2 rounded-full bg-electric-yellow px-5 py-3 text-sm font-semibold text-ink"
                >
                  Sprawdź, czy się kwalifikujesz →
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
