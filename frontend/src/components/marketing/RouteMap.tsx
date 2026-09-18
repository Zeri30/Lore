// An abstract flight path, not a specific photographed place or an
// illustrated person — a plane tracing a dotted arc from one pin to
// another. Flat, single-accent (brand blue only), consistent with
// CloudSky.tsx's own hand-rolled CSS-keyframe approach: transform +
// opacity only, linear timing for constant travel, reduced-motion gated.
export function RouteMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      className={className}
      role="img"
      aria-label="A dotted flight path arcing from one point to another, with a plane travelling along it"
    >
      {/* grounding stage, kept mostly transparent so the sky shows through */}
      <ellipse cx="200" cy="275" rx="190" ry="205" fill="var(--brand-soft)" opacity="0.15" />

      {/* route */}
      <path
        d="M60,430 Q200,80 340,190"
        fill="none"
        stroke="var(--brand)"
        strokeWidth="2"
        strokeDasharray="1 9"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* departure pin */}
      <circle cx="60" cy="430" r="10" fill="none" stroke="var(--brand)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="60" cy="430" r="4" fill="var(--brand)" />

      {/* destination pin */}
      <circle cx="340" cy="190" r="10" fill="none" stroke="var(--brand-strong)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="340" cy="190" r="4" fill="var(--brand-strong)" />

      {/* plane, travelling the arc on a loop */}
      <g className="route-plane">
        <path d="M-9,-4 L10,0 L-9,4 L-4,0 Z" fill="var(--brand-strong)" />
      </g>

      <style>{`
        @keyframes route-plane-fly {
          0%     { transform: translate(60px, 430px) rotate(-68deg); opacity: 0; }
          8%     { opacity: 0.95; }
          12.5%  { transform: translate(95px, 349.7px) rotate(-64deg); }
          25%    { transform: translate(130px, 283.75px) rotate(-59deg); }
          37.5%  { transform: translate(165px, 232.2px) rotate(-52deg); }
          50%    { transform: translate(200px, 195px) rotate(-41deg); }
          62.5%  { transform: translate(235px, 172.2px) rotate(-24deg); }
          75%    { transform: translate(270px, 163.75px) rotate(-2deg); }
          87.5%  { transform: translate(305px, 169.7px) rotate(21deg); }
          92%    { opacity: 0.95; }
          100%   { transform: translate(340px, 190px) rotate(38deg); opacity: 0; }
        }
        .route-plane {
          transform-box: fill-box;
          transform: translate(200px, 195px) rotate(-41deg);
          animation: route-plane-fly 10s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .route-plane { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}
