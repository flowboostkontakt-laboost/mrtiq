"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Lejki z własnym sticky CTA — nie pokazuj globalnego paska
const HIDE_ON = ["/pomorskie"];

export default function StickyMobileBar() {
  const path = usePathname();
  if (HIDE_ON.includes(path)) return null;
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pt-2 bg-gradient-to-t from-ink via-ink/85 to-transparent">
      <Link
        href="/#protokol"
        className="relative flex items-center justify-between rounded-2xl bg-electric-yellow px-5 py-4 text-sm font-bold text-ink neon-yellow"
      >
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-ink animate-pulse" />
          Sprawdź swój budżet UE
        </span>
        <span className="font-mono text-xs">→</span>
      </Link>
    </div>
  );
}
