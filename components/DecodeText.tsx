"use client";
import { useEffect, useRef, useState, ElementType } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/\\=+";

export default function DecodeText({
  text,
  className,
  as: Tag = "span",
  duration = 850,
}: {
  text: string;
  className?: string;
  as?: ElementType;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [display, setDisplay] = useState(text); // SSR + first paint = final (no hydration mismatch)
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    started.current = true;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const reveal = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < reveal || text[i] === " ") out += text[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, duration]);

  const T = Tag as unknown as ElementType<{ ref?: unknown; className?: string; children?: unknown }>;
  return (
    <T ref={ref} className={className}>
      {display}
    </T>
  );
}
