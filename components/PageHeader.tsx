"use client";
import { ReactNode } from "react";
import { Reveal, StaggerText } from "./Reveal";

export default function PageHeader({
  index,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  meta,
  right,
}: {
  index: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  meta?: { k: string; v: string }[];
  right?: ReactNode;
}) {
  return (
    <header className="relative pt-36 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-cmyk opacity-80" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
      <div className="scanlines" aria-hidden />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.32em] text-bone-mute">
            <span>{index}</span>
            <span className="h-px w-10 bg-white/20" />
            <span className="text-cyan-neon">{eyebrow}</span>
          </div>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <Reveal delay={0.05} className="lg:col-span-8">
            <h1 className="font-display font-semibold tracking-tightest-2 text-balance text-[clamp(2.6rem,7vw,7rem)] leading-[0.94]">
              <StaggerText text={title} />
              {titleAccent && (
                <>
                  <br />
                  <span className="text-bone-mute">
                    <StaggerText text={titleAccent} delay={0.05} />
                  </span>
                </>
              )}
            </h1>
            {subtitle && (
              <p className="mt-7 max-w-2xl text-pretty text-[16px] leading-relaxed text-bone-mute">
                {subtitle}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4">
            {right ?? (
              meta && (
                <div className="grid grid-cols-2 gap-4">
                  {meta.map((m) => (
                    <div key={m.k} className="rounded-2xl hairline bg-white/[0.02] p-4">
                      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone-mute">{m.k}</div>
                      <div className="mt-1 text-bone font-display text-xl">{m.v}</div>
                    </div>
                  ))}
                </div>
              )
            )}
          </Reveal>
        </div>
      </div>
    </header>
  );
}
