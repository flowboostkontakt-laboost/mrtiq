"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0, y = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive = !!t.closest("a, button, [data-cursor='hover'], input, textarea, select");
      ring.current?.classList.toggle("hovering", isInteractive);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring hidden md:block" aria-hidden />
      <div ref={dot} className="cursor-dot hidden md:block" aria-hidden />
    </>
  );
}
