"use client";

import { CloudSky } from "./CloudSky";
import { RouteMap } from "./RouteMap";
import { useAuth } from "@/lib/auth/context";

const EASE_SNAP = "cubic-bezier(0.16, 1, 0.3, 1)";

const destinations = [
  { name: "Tokyo", country: "Japan" },
  { name: "Paris", country: "France" },
  { name: "Bali", country: "Indonesia" },
  { name: "Cebu", country: "Philippines" },
];

// Short descriptions only — no named people, no avatars.
const trustPoints = [
  "Compare fares in seconds",
  "Pick your seat, every flight",
  "Real support, day or night",
  "New destinations added often",
];

const steps = [
  { n: "01", title: "Search", body: "Find the flight that fits you." },
  {
    n: "02",
    title: "Book",
    body: "Choose your seat and personalize your journey.",
  },
  { n: "03", title: "Fly", body: "Your ticket. Your destination. Your story." },
];

export function LandingContent() {
  const { openAuthModal } = useAuth();

  return (
    <>
      <section
        className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-6 py-24"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--glow-sky) 70%, var(--brand) 12%) 0%, var(--glow-sky) 38%, color-mix(in srgb, var(--glow-sky) 45%, var(--background)) 68%, var(--background) 100%)",
        }}
      >
        <CloudSky />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-foreground/50">
              Book Now
            </p>
            <h1 className="mt-5 text-balance font-display text-6xl font-medium leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
              Go somewhere{" "}
              <span className="inline-block pb-1 italic">worth remembering.</span>
            </h1>

            <p className="mt-6 max-w-md text-base text-foreground/60 lg:mx-0 mx-auto">
              Compare fares, pick your seat, and take off.
            </p>

            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className="group mt-10 inline-flex items-center gap-2 rounded-pill bg-brand py-2 pl-7 pr-2 text-base font-medium text-brand-foreground shadow-[0_20px_45px_rgba(47,93,138,0.28)] transition-[transform,background-color] duration-300 hover:bg-brand-strong active:scale-[0.98]"
              style={{ transitionTimingFunction: EASE_SNAP }}
            >
              Search Flights
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
                style={{ transitionTimingFunction: EASE_SNAP }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M3 9L9 3M9 3H4.5M9 3V7.5" />
                </svg>
              </span>
            </button>
          </div>

          {/* An abstract flight path in place of a photo or an illustrated
              person — it speaks to "search a flight, go somewhere" without
              claiming a specific place or scene. */}
          <div className="relative mx-auto aspect-4/5 w-80 sm:w-96 lg:mx-0 lg:w-full lg:max-w-lg">
            <RouteMap className="h-full w-full" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Loved by travelers everywhere.
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Search, book, and fly. We look after every step.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {trustPoints.map((text) => (
            <span
              key={text}
              className="rounded-full border border-border/60 bg-surface px-4 py-2 text-sm font-medium text-foreground/70"
            >
              {text}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Where do you want to wake up?
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((d, i) => (
            <div
              key={d.name}
              className="group aspect-3/4 overflow-hidden rounded-card border border-border/60"
            >
              <div
                className="flex h-full w-full flex-col items-start justify-end p-5 transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                style={{ background: destinationGradient(i) }}
              >
                <p className="font-display text-xl font-semibold text-white drop-shadow-sm">
                  {d.name}
                </p>
                <p className="mt-2 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {d.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Your journey, simplified.
          </h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft font-mono text-xs font-medium text-brand">
                  {s.n}
                </span>
                <p className="mt-4 font-display text-xl font-semibold">
                  {s.title}
                </p>
                <p className="mt-2 text-sm text-foreground/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function destinationGradient(i: number) {
  const combos = [
    "linear-gradient(160deg, var(--glow-sky), var(--brand-soft))",
    "linear-gradient(160deg, var(--glow-dawn), var(--brand-soft))",
    "linear-gradient(160deg, color-mix(in srgb, var(--glow-sky) 60%, var(--glow-dawn)), var(--brand-strong))",
    "linear-gradient(160deg, var(--brand), var(--glow-dawn))",
  ];
  return combos[i % combos.length];
}
