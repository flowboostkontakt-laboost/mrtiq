"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed top-0 inset-x-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-magenta-neon via-cyan-neon to-electric-yellow pointer-events-none"
      aria-hidden
    />
  );
}
