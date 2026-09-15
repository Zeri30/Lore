import type { MouseEvent, ReactNode } from "react";

export const meta = { name: "Airline Bar", hasMotion: false };

const navLinks = ["Flights", "Destinations", "My Trips"];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
          <a
            href="#"
            onClick={preventDefault}
            className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
          >
            <span aria-hidden>✈</span> LORE
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/70 md:flex">
            {navLinks.map((label) => (
              <a
                key={label}
                href="#"
                onClick={preventDefault}
                className="transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-sm font-medium">
            <a
              href="#"
              onClick={preventDefault}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              Log in
            </a>
            <a
              href="#"
              onClick={preventDefault}
              className="rounded-pill bg-brand px-4 py-2 text-brand-foreground transition-colors hover:bg-brand-strong"
            >
              Sign up
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-display text-lg font-semibold">
                <span aria-hidden>✈</span> LORE
              </div>
              <p className="mt-3 max-w-[22ch] text-sm text-foreground/60">
                Go somewhere worth remembering.
              </p>
            </div>
            <FooterColumn
              title="Company"
              links={["About", "Careers", "Newsroom"]}
            />
            <FooterColumn
              title="Support"
              links={["Help Center", "Contact Us", "Baggage Policy"]}
            />
            <FooterColumn
              title="Legal"
              links={["Terms of Service", "Privacy Policy", "Refund Policy"]}
            />
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-foreground/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 LORE Travel, Inc. All rights reserved.</span>
            <div className="flex gap-4">
              {["Instagram", "X", "Facebook"].map((label) => (
                <a
                  key={label}
                  href="#"
                  onClick={preventDefault}
                  className="transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {links.map((label) => (
          <li key={label}>
            <a
              href="#"
              onClick={preventDefault}
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function preventDefault(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}
