type Cloud = {
  top: string;
  left: string;
  scale: number;
  opacity: number;
  duration: number;
  delay: number;
};

const clouds: Cloud[] = [
  { top: "4%", left: "-20%", scale: 1.7, opacity: 0.95, duration: 85, delay: -4 },
  { top: "22%", left: "-20%", scale: 1.15, opacity: 0.85, duration: 110, delay: -48 },
  { top: "-2%", left: "-20%", scale: 1.4, opacity: 0.75, duration: 98, delay: -20 },
  { top: "38%", left: "-20%", scale: 0.9, opacity: 0.65, duration: 130, delay: -76 },
  { top: "52%", left: "-20%", scale: 0.7, opacity: 0.55, duration: 150, delay: -104 },
];

const CLOUD_COLOR = "#fbf8f2";

// Designed at a fixed 220x110 reference size so the circle math produces a
// real cumulus silhouette (puffy top, flatter base) — percentage-based
// radial-gradient stops resolve against the box's *farthest corner*, which
// on a wide rectangle blows the circles up into a near-solid box. Absolute
// px stops sidestep that; per-instance sizing is done with `transform:
// scale()` on the wrapper instead, so the shape itself never distorts.
const CLOUD_PUFFS = `
  radial-gradient(circle at 55px 75px, ${CLOUD_COLOR} 0, ${CLOUD_COLOR} 31px, transparent 32px),
  radial-gradient(circle at 90px 45px, ${CLOUD_COLOR} 0, ${CLOUD_COLOR} 41px, transparent 42px),
  radial-gradient(circle at 135px 42px, ${CLOUD_COLOR} 0, ${CLOUD_COLOR} 43px, transparent 44px),
  radial-gradient(circle at 172px 70px, ${CLOUD_COLOR} 0, ${CLOUD_COLOR} 33px, transparent 34px),
  radial-gradient(circle at 113px 88px, ${CLOUD_COLOR} 0, ${CLOUD_COLOR} 39px, transparent 40px)
`;

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
              width: 220,
              height: 110,
              transform: `scale(${c.scale})`,
              transformOrigin: "left center",
              opacity: c.opacity,
              background: CLOUD_PUFFS,
              filter: "blur(5px)",
            }}
          />
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
