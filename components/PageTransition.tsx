"use client";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageTransition() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  const [prev, setPrev] = useState(path);

  useEffect(() => {
    if (path === prev) return;
    setShow(true);
    setPrev(path);
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, [path, prev]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Magenta panel */}
          <motion.div
            key="m"
            className="pointer-events-none fixed inset-0 z-[80] origin-bottom"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: [0, 1, 1, 0] }}
            transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1], times: [0, 0.45, 0.55, 1] }}
            style={{ background: "linear-gradient(180deg, #FF2DAA 0%, #00E5C5 100%)" }}
          />
          <motion.div
            key="t"
            className="pointer-events-none fixed inset-0 z-[81] grid place-items-center text-ink"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.7, times: [0, 0.45, 0.55, 1] }}
          >
            <div className="font-display text-6xl font-bold tracking-tightest-2">
              mrtiq<span className="text-ink/60">.</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
