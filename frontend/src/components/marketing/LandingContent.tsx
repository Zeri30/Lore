import { CloudSky } from "./CloudSky";

const destinations = [
  { name: "Tokyo", country: "Japan" },
  { name: "Paris", country: "France" },
  { name: "Bali", country: "Indonesia" },
  { name: "Cebu", country: "Philippines" },
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
  return (
    <>
      <section
        className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--glow-sky) 70%, var(--brand) 12%) 0%, var(--glow-sky) 38%, color-mix(in srgb, var(--glow-sky) 45%, var(--background)) 68%, var(--background) 100%)",
        }}
      >
        <CloudSky />

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-foreground/50">
            Flight search
          </p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            Go somewhere worth remembering.
          </h1>
          <p className="mt-4 max-w-md text-base text-foreground/60">
            Discover your next destination and let LORE take care of the
            journey.
          </p>

          <div className="mt-10 w-full max-w-xl rounded-card border border-border/60 bg-surface/90 p-5 text-left shadow-[0_20px_60px_rgba(18,24,31,0.12)] backdrop-blur-md sm:p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Field label="From" value="Manila (MNL)" />
              <Field label="To" value="Tokyo (NRT)" />
              <Field label="Departure" value="Dec 12, 2026" />
              <Field label="Passengers" value="2 Adults" />
            </div>
            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-strong">
              Search Flights →
            </button>
          </div>
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
              className="group aspect-[3/4] overflow-hidden rounded-card border border-border/60"
            >
              <div
                className="flex h-full w-full flex-col justify-end p-5 transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                style={{ background: destinationGradient(i) }}
              >
                <p className="font-display text-xl font-semibold text-white drop-shadow-sm">
                  {d.name}
                </p>
                <p className="text-sm text-white/80">{d.country}</p>
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
                <p className="font-display text-sm font-semibold text-brand">
                  {s.n}
                </p>
                <p className="mt-2 font-display text-xl font-semibold">
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-foreground/45">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
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
