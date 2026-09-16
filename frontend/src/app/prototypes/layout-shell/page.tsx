"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LandingContent } from "@/components/marketing/LandingContent";
import {
  Shell as AirlineBarShell,
  meta as airlineBarMeta,
} from "./variants/airline-bar";
import {
  Shell as FloatingPillShell,
  meta as floatingPillMeta,
} from "./variants/floating-pill";
import {
  Shell as ScrollAwareShell,
  meta as scrollAwareMeta,
} from "./variants/scroll-aware";

const variants = [
  { ...airlineBarMeta, Component: AirlineBarShell },
  { ...floatingPillMeta, Component: FloatingPillShell },
  { ...scrollAwareMeta, Component: ScrollAwareShell },
];

const hasAnyMotion = variants.some((v) => v.hasMotion);

function initialVariantIndex() {
  if (typeof window === "undefined") return 0;
  const params = new URLSearchParams(window.location.search);
  const fromUrl = parseInt(params.get("v") ?? "", 10);
  if (fromUrl >= 1 && fromUrl <= variants.length) return fromUrl - 1;
  return 0;
}

export default function LayoutShellPrototypePage() {
  const [current, setCurrent] = useState(initialVariantIndex);
  const [remountKey, setRemountKey] = useState(0);
  const [ready, setReady] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const highlightRef = useRef<HTMLSpanElement | null>(null);

  const moveHighlight = () => {
    const el = itemRefs.current[current];
    const highlight = highlightRef.current;
    if (!el || !highlight) return;
    highlight.style.width = `${el.offsetWidth}px`;
    highlight.style.transform = `translateX(${el.offsetLeft}px)`;
  };

  useLayoutEffect(() => {
    moveHighlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    const onResize = () => moveHighlight();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
  }, []);

  const setActive = (i: number) => {
    if (i < 0 || i >= variants.length) return;
    setCurrent(i);
    setRemountKey((k) => k + 1);
    window.scrollTo(0, 0);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(i + 1));
    window.history.replaceState(null, "", url);
  };

  const replay = () => {
    setRemountKey((k) => k + 1);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (target?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= variants.length) setActive(num - 1);
      else if (e.key === "ArrowRight") setActive((current + 1) % variants.length);
      else if (e.key === "ArrowLeft")
        setActive((current - 1 + variants.length) % variants.length);
      else if (e.key === "r" || e.key === "R") replay();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [current]);

  const Active = variants[current].Component;

  return (
    <>
      <style>{`
        @keyframes shell-drawer-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .proto-picker { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 2147483647; display: flex; align-items: center; gap: 2px; padding: 4px; border-radius: 999px; background: rgba(10, 10, 10, 0.82); -webkit-backdrop-filter: blur(12px) saturate(1.4); backdrop-filter: blur(12px) saturate(1.4); box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset, 0 8px 24px rgba(0, 0, 0, 0.24), 0 2px 6px rgba(0, 0, 0, 0.12); font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-size: 13px; line-height: 1; -webkit-font-smoothing: antialiased; user-select: none; -webkit-user-select: none; }
        .proto-picker-highlight { position: absolute; top: 4px; left: 0; height: 28px; border-radius: 999px; background: rgba(255, 255, 255, 0.12); will-change: transform; }
        .proto-picker[data-ready] .proto-picker-highlight { transition: transform 250ms cubic-bezier(0.23, 1, 0.32, 1), width 250ms cubic-bezier(0.23, 1, 0.32, 1); }
        @media (prefers-reduced-motion: reduce) { .proto-picker[data-ready] .proto-picker-highlight { transition: none; } }
        .proto-picker-item { position: relative; display: flex; align-items: center; height: 28px; padding: 0 12px; border: 0; border-radius: 999px; background: transparent; color: rgba(255, 255, 255, 0.55); font: inherit; cursor: pointer; transition: color 150ms ease-out; }
        .proto-picker-item:hover { color: rgba(255, 255, 255, 0.85); }
        .proto-picker-item:active { transform: scale(0.97); }
        .proto-picker-item:focus-visible { outline: 2px solid rgba(255, 255, 255, 0.4); outline-offset: 2px; }
        .proto-picker-item[data-active] { color: #fff; }
        .proto-picker-divider { width: 1px; height: 16px; margin: 0 4px; background: rgba(255, 255, 255, 0.12); }
        .proto-picker-replay { padding: 0 10px; font-size: 14px; }
      `}</style>

      <div id="stage">
        <Active key={remountKey}>
          <LandingContent />
        </Active>
      </div>

      <nav
        className="proto-picker"
        aria-label="Prototype variants"
        data-ready={ready ? "" : undefined}
      >
        <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
        {variants.map((v, i) => (
          <button
            key={v.name}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            type="button"
            className="proto-picker-item"
            data-active={i === current ? "true" : undefined}
            aria-current={i === current ? "true" : undefined}
            onClick={() => setActive(i)}
          >
            {v.name}
          </button>
        ))}
        {hasAnyMotion && (
          <>
            <span className="proto-picker-divider" aria-hidden="true" />
            <button
              type="button"
              className="proto-picker-item proto-picker-replay"
              aria-label="Replay animation (R)"
              onClick={replay}
            >
              ↻
            </button>
          </>
        )}
      </nav>
    </>
  );
}
