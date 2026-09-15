"use client";

import { useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

export const meta = { name: "Scroll-Aware Editorial", hasMotion: true };

const navLinks = ["Flights", "Destinations", "My Trips"];
const footerLinks = ["Destinations", "Help Center", "Terms", "Privacy"];

// Emil Kowalski's decision tree: entering/exiting -> strong ease-out,
// on-screen movement/morphing -> strong ease-in-out, hover/color -> plain
// ease. Applied via inline style since Tailwind can't statically see a class
// built from a JS constant.
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)";

export function Shell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 64);
        ticking = false;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header
        className={
          "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-200 " +
          (scrolled
            ? "border-b border-border bg-surface/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent")
        }
        style={{ transitionTimingFunction: "ease" }}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6 sm:px-8">
          <a
            href="#"
            onClick={preventDefault}
            className={
              "flex items-center gap-2 font-display text-lg font-semibold tracking-tight transition-colors duration-200 " +
              (scrolled ? "text-foreground" : "text-foreground/85")
            }
            style={{ transitionTimingFunction: "ease" }}
          >
            <span aria-hidden>✈</span> LORE
          </a>

          <nav
            className={
              "hidden items-center gap-8 text-sm font-medium transition-colors duration-200 md:flex " +
              (scrolled ? "text-foreground/70" : "text-foreground/65")
            }
            style={{ transitionTimingFunction: "ease" }}
          >
            {navLinks.map((label) => (
              <a
                key={label}
                href="#"
                onClick={preventDefault}
                className="transition-colors duration-200 hover:text-foreground"
                style={{ transitionTimingFunction: "ease" }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href="#"
              onClick={preventDefault}
              className={
                "text-sm font-medium transition-colors duration-200 hover:text-foreground " +
                (scrolled ? "text-foreground/70" : "text-foreground/65")
              }
              style={{ transitionTimingFunction: "ease" }}
            >
              Log in
            </a>
            <a
              href="#"
              onClick={preventDefault}
              className="rounded-pill bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform duration-150 hover:bg-brand-strong active:scale-[0.97]"
              style={{ transitionTimingFunction: EASE_OUT }}
            >
              Sign up
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={
              "relative flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-150 active:scale-[0.97] md:hidden " +
              (scrolled ? "text-foreground" : "text-foreground/80")
            }
            style={{ transitionTimingFunction: EASE_OUT }}
          >
            <span
              className={
                "absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 " +
                (menuOpen ? "translate-y-0 rotate-45" : "-translate-y-0.75 rotate-0")
              }
              style={{ transitionTimingFunction: EASE_IN_OUT }}
            />
            <span
              className={
                "absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 " +
                (menuOpen ? "translate-y-0 -rotate-45" : "translate-y-0.75 rotate-0")
              }
              style={{ transitionTimingFunction: EASE_IN_OUT }}
            />
          </button>
        </div>
      </header>

      {/* mobile full-screen menu */}
      <div
        className={
          "fixed inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-background transition-opacity duration-[250ms] md:hidden " +
          (menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")
        }
        style={{ transitionTimingFunction: EASE_OUT }}
      >
        {navLinks.map((label, i) => (
          <a
            key={label}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
            }}
            className="font-display text-4xl font-semibold tracking-tight text-foreground/85 transition-all duration-[250ms] hover:text-brand sm:text-6xl"
            style={{
              transitionTimingFunction: EASE_OUT,
              transitionDelay: menuOpen ? `${60 + i * 40}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(10px)",
            }}
          >
            {label}
          </a>
        ))}
        <div
          className="mt-8 flex items-center gap-4 transition-all duration-[250ms]"
          style={{
            transitionTimingFunction: EASE_OUT,
            transitionDelay: menuOpen ? `${60 + navLinks.length * 40}ms` : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <a
            href="#"
            onClick={preventDefault}
            className="text-lg text-foreground/60 transition-colors hover:text-foreground"
          >
            Log in
          </a>
          <a
            href="#"
            onClick={preventDefault}
            className="rounded-pill bg-brand px-5 py-2.5 text-base font-medium text-brand-foreground transition-transform duration-150 hover:bg-brand-strong active:scale-[0.97]"
            style={{ transitionTimingFunction: EASE_OUT }}
          >
            Sign up
          </a>
        </div>
      </div>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
            <span aria-hidden>✈</span> LORE
          </span>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-foreground/60">
            {footerLinks.map((label) => (
              <a
                key={label}
                href="#"
                onClick={preventDefault}
                className="transition-colors duration-200 hover:text-foreground"
                style={{ transitionTimingFunction: "ease" }}
              >
                {label}
              </a>
            ))}
          </nav>
          <span className="text-xs text-foreground/50">
            © 2026 LORE Travel, Inc.
          </span>
        </div>
      </footer>
    </div>
  );
}

function preventDefault(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
}
