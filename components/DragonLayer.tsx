"use client";
import { useRef, useEffect } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 133;
function pad3(n: number) { return String(n).padStart(3, "0"); }

export default function DragonLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
const imgsRef = useRef<HTMLImageElement[]>([]);
  const curRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll();
  const frameProgress = scrollYProgress;

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `/smok_hero_seq/f_${pad3(i)}.webp`;
      imgs.push(img);
    }
    imgsRef.current = imgs;
    return () => { imgsRef.current = []; };
  }, []);

  useMotionValueEvent(frameProgress, "change", (v) => {
    targetRef.current = v;
  });


  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;
      const imgs = imgsRef.current;
      if (canvas && imgs.length) {
        curRef.current += (targetRef.current - curRef.current) * 0.12;
        const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(curRef.current * (TOTAL_FRAMES - 1))));

        let img = imgs[idx];
        if (!img?.complete || !img.naturalWidth) {
          for (let d = 1; d < TOTAL_FRAMES; d++) {
            const a = imgs[idx - d], b = imgs[idx + d];
            if (a?.complete && a.naturalWidth) { img = a; break; }
            if (b?.complete && b.naturalWidth) { img = b; break; }
          }
        }

        if (img?.complete && img.naturalWidth) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const rect = canvas.getBoundingClientRect();
          const cw = Math.round(rect.width * dpr);
          const ch = Math.round(rect.height * dpr);
          if (canvas.width !== cw || canvas.height !== ch) {
            canvas.width = cw;
            canvas.height = ch;
          }
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, cw, ch);
            const ir = img.naturalWidth / img.naturalHeight;
            const dh = ch;
            const dw = dh * ir;
            ctx.drawImage(img, cw - dw, 0, dw, dh);
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[5]"
      // right offset handled in style below
      style={{
        top: "calc(6vh + 50px)",
        right: "-240px",
        width: "55vw",
        height: "88vh",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 18%, #000 85%, transparent 100%)",
        maskImage: "linear-gradient(90deg, transparent 0%, #000 18%, #000 85%, transparent 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ display: "block", transform: "scaleX(-1)" }}
      />
    </div>
  );
}
