"use client";
import { motion } from "framer-motion";

export default function DragonMark({
  className = "",
  glow = true,
}: { className?: string; glow?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 600 800"
      className={className}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20, mass: 0.6 }}
      aria-hidden
    >
      <defs>
        <filter id="dragGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="dragBody" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FF2DAA" />
          <stop offset="100%" stopColor="#FF6BBF" />
        </linearGradient>
        <linearGradient id="dragFin" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#00E5C5" />
          <stop offset="100%" stopColor="#7AFFE6" />
        </linearGradient>
      </defs>
      <g
        filter={glow ? "url(#dragGlow)" : undefined}
        stroke="#0a0a0a"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Body coil */}
        <path
          d="M430 120
             c -20 -50 -110 -60 -150 -10
             c -38 48 -10 110 50 130
             c 70 22 110 50 110 110
             c 0 60 -60 100 -130 80
             c -80 -22 -110 80 -40 120
             c 60 35 130 -10 150 -60"
          fill="none"
          stroke="#fff"
          strokeWidth="6"
        />
        <path
          d="M430 120
             c -20 -50 -110 -60 -150 -10
             c -38 48 -10 110 50 130
             c 70 22 110 50 110 110
             c 0 60 -60 100 -130 80
             c -80 -22 -110 80 -40 120
             c 60 35 130 -10 150 -60"
          fill="none"
          stroke="url(#dragBody)"
          strokeWidth="22"
          opacity="0.95"
        />
        {/* Head */}
        <path
          d="M425 70 q60 -10 80 40 q22 50 -10 90 q-44 32 -90 0 q-42 -34 -10 -90 q14 -28 30 -40z"
          fill="#0a0a0a"
        />
        <path
          d="M455 90 l40 -10 l-12 28 l30 -6 l-22 36 l28 4 l-30 24"
          fill="url(#dragFin)"
        />
        {/* Eye */}
        <circle cx="470" cy="115" r="6" fill="#FF2DAA" />
        {/* Fins */}
        <path d="M260 240 l-50 -20 l30 50 l-50 0 l60 30 l-40 30" fill="url(#dragFin)" />
        <path d="M250 460 l-60 10 l40 40 l-60 30 l70 10" fill="url(#dragFin)" />
        <path d="M380 690 l-30 60 l50 -10 l-10 50" fill="url(#dragFin)" />
        {/* Spine ridges */}
        <path d="M340 80 l20 -30 l10 36 z" fill="url(#dragFin)" />
        <path d="M390 100 l30 -20 l-4 34 z" fill="url(#dragFin)" />
      </g>
    </motion.svg>
  );
}
