export default function Logo({
  size = 28,
  showWordmark = true,
}: { size?: number; showWordmark?: boolean }) {
  const h = size;
  return (
    <div className="flex items-center gap-3" aria-label="MRTIQ">
      <div
        className="relative grid place-items-center"
        style={{ width: h, height: h }}
      >
        <span
          className="absolute inset-0 rounded-[6px]"
          style={{ background: "linear-gradient(135deg, #00E5C5, #FF2DAA)" }}
          aria-hidden
        />
        <span className="relative text-ink font-display font-bold tracking-tightest-2 text-[13px]">
          M
        </span>
      </div>
      {showWordmark && (
        <div className="leading-none">
          <div className="font-display font-bold tracking-tightest-2 text-[18px]">
            mrtiq
            <span className="text-magenta-neon">.</span>
          </div>
          <div className="font-mono text-[8px] uppercase tracking-[0.32em] text-bone-mute mt-1">
            Marketing Intelligence
          </div>
        </div>
      )}
    </div>
  );
}
