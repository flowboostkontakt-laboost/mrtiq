"use client";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import clsx from "clsx";

export default function Spotlight({
  children,
  className,
  glowColor = "0,229,197",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mx.set(x); my.set(y);
    if (tilt) {
      const dx = (x / r.width - 0.5);
      const dy = (y / r.height - 0.5);
      ry.set(dx * 6);
      rx.set(-dy * 6);
    }
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  const bg = useMotionTemplate`radial-gradient(220px 180px at ${mx}px ${my}px, rgba(${glowColor}, 0.25), transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      className={clsx("relative will-change-transform", className)}
    >
      <motion.div
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}
