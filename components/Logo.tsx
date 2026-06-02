export default function Logo({
  size = 30,
  showWordmark = true,
  className = "",
}: { size?: number; showWordmark?: boolean; className?: string }) {
  // Clean transparent wordmark — white letters + true cyan/magenta dots, aspect ~ 2.6:1
  const h = size;
  const w = Math.round(h * 2.6);
  return (
    <div className={`flex items-center ${className}`} aria-label="mrtiq Marketing Intelligence">
      <img
        src="/mrtiq-mark.png"
        alt="mrtiq · Marketing Intelligence"
        width={w}
        height={h}
        draggable={false}
        className="select-none pointer-events-none"
        style={{
          height: h,
          width: w,
          objectFit: "contain",
        }}
      />
      {!showWordmark && <span className="sr-only">mrtiq</span>}
    </div>
  );
}
