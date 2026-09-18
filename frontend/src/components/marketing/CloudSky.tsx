type Cloud = {
  top: string;
  left: string;
  scale: number;
  opacity: number;
  duration: number;
  delay: number;
};

const clouds: Cloud[] = [
  { top: "2%", left: "-20%", scale: 1.7, opacity: 0.95, duration: 42, delay: -4 },
  { top: "14%", left: "-20%", scale: 1.0, opacity: 0.8, duration: 55, delay: -30 },
  { top: "22%", left: "-20%", scale: 1.15, opacity: 0.85, duration: 50, delay: -18 },
  { top: "-4%", left: "-20%", scale: 1.4, opacity: 0.75, duration: 48, delay: -10 },
  { top: "30%", left: "-20%", scale: 0.75, opacity: 0.6, duration: 65, delay: -46 },
  { top: "40%", left: "-20%", scale: 0.9, opacity: 0.65, duration: 60, delay: -36 },
  { top: "50%", left: "-20%", scale: 0.65, opacity: 0.55, duration: 72, delay: -52 },
  { top: "58%", left: "-20%", scale: 0.55, opacity: 0.5, duration: 78, delay: -60 },
];

const CLOUD_COLOR = "#fbf8f2";
const CLOUD_SHADOW_COLOR = "#e4ded0";

// A flat-icon cumulus: a rounded base pill with three overlapping circular
// lobes on top (scalloped skyline, flat-ish base), plus a duplicate of the
// same shapes offset a few px down in a muted tone underneath — the classic
// "cloud icon with a soft drop shadow" look, modeled on a reference sheet
// of vector cloud icons rather than a photographic cumulus bank.
const CLOUD_LOBES = (
  <>
    <rect x="25" y="55" width="150" height="35" rx="17.5" />
    <circle cx="50" cy="48" r="25" />
    <circle cx="100" cy="34" r="32" />
    <circle cx="150" cy="46" r="27" />
  </>
);

function CloudShape() {
  return (
    <svg viewBox="0 0 200 100" width={200} height={100} aria-hidden>
      <g fill={CLOUD_SHADOW_COLOR} transform="translate(0, 6)">
        {CLOUD_LOBES}
      </g>
      <g fill={CLOUD_COLOR}>{CLOUD_LOBES}</g>
    </svg>
  );
}

/**
 * Soft drifting clouds + a slow-flying plane silhouette for the hero sky.
 * Hand-built (no shader/canvas dependency) per Lore-System.md's own direction:
 * "clouds slowly drifting… avoid… too much 3D". transform/opacity only.
 */
export function CloudSky() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <style>{`
        @keyframes cloud-sky-drift {
          from { transform: translateX(0); }
          to { transform: translateX(160vw); }
        }
        @keyframes cloud-sky-breathe {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.08); opacity: 0.65; }
        }
        @keyframes cloud-sky-plane {
          0% { transform: translate(-15%, 0) rotate(3deg); opacity: 0; }
          8% { opacity: 0.5; }
          92% { opacity: 0.5; }
          100% { transform: translate(115%, -6%) rotate(3deg); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cloud-sky-drift, .cloud-sky-breathe, .cloud-sky-plane {
            animation: none !important;
          }
        }
      `}</style>

      <div
        className="cloud-sky-breathe absolute -right-24 top-1/3 h-72 w-72 rounded-full blur-3xl"
        style={{
          background: "var(--glow-dawn)",
          animation: "cloud-sky-breathe 12s ease-in-out infinite",
        }}
      />

      {clouds.map((c, i) => (
        <div
          key={i}
          className="cloud-sky-drift absolute"
          style={{
            top: c.top,
            left: c.left,
            animation: `cloud-sky-drift ${c.duration}s linear infinite`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <div
            style={{
              transform: `scale(${c.scale})`,
              transformOrigin: "left center",
              opacity: c.opacity,
            }}
          >
            <CloudShape />
          </div>
        </div>
      ))}

      <div
        className="cloud-sky-plane absolute left-0 top-[16%] text-3xl text-foreground/25"
        style={{ animation: "cloud-sky-plane 46s linear infinite", animationDelay: "-18s" }}
      >
        ✈
      </div>
    </div>
  );
}
