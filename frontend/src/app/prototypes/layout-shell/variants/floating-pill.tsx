"use client";

import { useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

export const meta = { name: "Floating Pill", hasMotion: true };

const navLinks = ["Flights", "Destinations", "My Trips"];
const footerLinks = ["Destinations", "Help Center", "Terms", "Privacy"];

// Two named curves instead of Tailwind's ease-in-out/linear: a snappy one for
// small hover/press feedback, a softer-landing one for larger spatial moves
// (pill entrance, menu expand). Applied via inline style — Tailwind can't
// statically see a class name built from a JS constant, so ease-[...] utility
// classes built this way would silently never generate any CSS.
const EASE_SNAP = "cubic-bezier(0.16,1,0.3,1)";
const EASE_FLUID = "cubic-bezier(0.32,0.72,0,1)";

export function Shell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <style>{`
        @keyframes pill-shell-in {
          from { opacity: 0; transform: translateY(-12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pill-link-in {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pill-shell-in, .pill-link-in { animation: none !important; }
        }
      `}</style>

      <header
        className="pill-shell-in fixed inset-x-4 top-4 z-40 sm:inset-x-8 sm:top-6"
        style={{ animation: `pill-shell-in 420ms ${EASE_FLUID} both` }}
      >
        {/* outer bezel */}
        <div className="mx-auto max-w-3xl rounded-full bg-foreground/[0.04] p-1.5 shadow-[0_20px_50px_rgba(18,24,31,0.12)] ring-1 ring-border/60 backdrop-blur-2xl">
          {/* inner core */}
          <div className="flex h-14 items-center justify-between gap-4 rounded-full bg-surface/95 px-2 pl-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
            <a
              href="#"
              onClick={preventDefault}
              className="flex items-center gap-2 font-display text-base font-semibold tracking-tight"
            >
              <span aria-hidden>✈</span> LORE
            </a>

            <nav className="hidden items-center gap-6 text-sm font-medium text-foreground/70 md:flex">
              {navLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  onClick={preventDefault}
                  className="transition-colors duration-300 hover:text-foreground"
                  style={{ transitionTimingFunction: EASE_SNAP }}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <SignUpButton className="hidden md:inline-flex" />
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors duration-300 hover:bg-surface-muted md:hidden"
              >
                <span
                  className={
                    "absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-500 " +
                    (menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[3px] rotate-0")
                  }
                  style={{ transitionTimingFunction: EASE_FLUID }}
                />
                <span
                  className={
                    "absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-500 " +
                    (menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[3px] rotate-0")
                  }
                  style={{ transitionTimingFunction: EASE_FLUID }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* full-screen glass menu (mobile only — desktop keeps the inline nav) */}
      <div
        className={
          "fixed inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-background/85 backdrop-blur-2xl transition-opacity duration-500 md:hidden " +
          (menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")
        }
        style={{ transitionTimingFunction: EASE_FLUID }}
      >
        {navLinks.map((label, i) => (
          <a
            key={label}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
            }}
            className="pill-link-in font-display text-3xl font-semibold tracking-tight text-foreground/85"
            style={
              menuOpen
                ? {
                    animation: `pill-link-in 480ms ${EASE_FLUID} both`,
                    animationDelay: `${80 + i * 70}ms`,
                  }
                : { opacity: 0 }
            }
          >
            {label}
          </a>
        ))}
        <div
          className="pill-link-in mt-4"
          style={
            menuOpen
              ? {
                  animation: `pill-link-in 480ms ${EASE_FLUID} both`,
                  animationDelay: `${80 + navLinks.length * 70}ms`,
                }
              : { opacity: 0 }
          }
        >
          <SignUpButton />
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <footer className="px-4 pb-10 pt-16 sm:px-8">
        <div className="mx-auto max-w-xl rounded-[2rem] bg-foreground/[0.04] p-1.5 ring-1 ring-border/60 backdrop-blur-2xl">
          <div className="flex flex-col items-center gap-4 rounded-[calc(2rem-0.375rem)] bg-surface/90 px-8 py-8 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
            <div className="flex items-center gap-2 font-display text-base font-semibold">
              <span aria-hidden>✈</span> LORE
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/70">
              {footerLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  onClick={preventDefault}
                  className="transition-colors duration-300 hover:text-foreground"
                  style={{ transitionTimingFunction: EASE_SNAP }}
                >
                  {label}
                </a>
              ))}
            </nav>
            <p className="text-xs text-foreground/50">© 2026 LORE Travel, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SignUpButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#"
      onClick={preventDefault}
      className={
        "group relative flex items-center gap-2 rounded-full bg-brand py-1.5 pl-4 pr-1.5 text-sm font-medium text-brand-foreground transition-transform duration-300 hover:bg-brand-strong active:scale-[0.97] " +
        className
      }
      style={{ transitionTimingFunction: EASE_SNAP }}
    >
      Sign up
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
        style={{ transitionTimingFunction: EASE_SNAP }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 9L9 3M9 3H4.5M9 3V7.5" />
        </svg>
      </span>
    </a>
  );
}

function preventDefault(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}
