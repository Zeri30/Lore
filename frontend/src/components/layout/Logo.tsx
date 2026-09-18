// A bearing mark, not a plane emoji: a compass ring with a single heading
// line to a fixed point, standing in for "a direction worth going." Reads
// at nav size, scales cleanly, no dependency on the OS emoji font.
export function Logo({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "default" | "small";
}) {
  const markSize = size === "small" ? "h-4 w-4" : "h-5 w-5";
  const wordmarkSize = size === "small" ? "text-base" : "text-lg";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={markSize}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
        <line
          x1="12"
          y1="12"
          x2="17.8"
          y2="6.4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="17.8" cy="6.4" r="1.5" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
      <span className={`font-display font-semibold tracking-[0.02em] ${wordmarkSize}`}>
        LORE
      </span>
    </span>
  );
}
