# 001 — Give the hero illustration a one-time entrance, not idle looping motion

- **Status**: DONE
- **Commit**: 379333f
- **Severity**: MEDIUM
- **Category**: Missed opportunity / Cohesion
- **Estimated scope**: 1 file (`frontend/src/components/marketing/LandingContent.tsx`), plus reading `HeroIllustration.tsx` for context (no edits there)

## Problem

The hero's right side (`frontend/src/components/marketing/LandingContent.tsx:158-161`) renders the traveler illustration fully-formed on mount with no entrance:

```tsx
{/* A traveler settled in for the flight, in place of any single
    destination shot, so the hero speaks to the experience rather
    than one place on the map. */}
<div className="relative mx-auto aspect-4/5 w-72 sm:w-80 lg:mx-0 lg:w-full lg:max-w-md">
  <HeroIllustration className="h-full w-full" />
</div>
```

Meanwhile `CloudSky.tsx` (rendered as a sibling, `LandingContent.tsx:46`) is already running three continuous ambient loops in the same viewport: `cloud-sky-drift` (translateX, linear, 85-150s staggered), `cloud-sky-breathe` (scale+opacity, ease-in-out, 12s), and `cloud-sky-plane` (translate+rotate+opacity, linear, 46s). Against that constantly-moving backdrop, the illustration popping in inert on load is the actual gap, not a lack of idle motion on the illustration itself.

`HeroIllustration.tsx:120-135` already has one small tasteful idle detail — two steam-wisp paths (`.hero-steam`, `hero-steam-rise` keyframe, 3.6s ease-in-out, opacity+translateY, reduced-motion gated). That stays as-is; it's correct and shouldn't be touched or duplicated.

## Decision

**Do not add continuous/idle motion to the illustration as a whole** (no perpetual bob, float, or hover-tracked tilt on the traveler group). CloudSky already owns "continuous ambient motion" for this hero — a second independent loop on the illustration competes with it and reads as "everything on the page is jiggling" rather than one considered atmosphere. This also matches a decision already made and reverted once in this codebase's history: an earlier iteration had a floating route-card element with a perpetual `translateY` bob directly beside CloudSky, and it was removed during a later redesign pass in favor of a calmer composition.

**Do give the illustration wrapper a single one-time entrance on mount**, timed to land just after the frosted-glass headline band, so the hero reads as one coordinated arrival instead of a static frame. This is a rare, first-time-per-session moment (marketing hero, not a UI control hit 100+ times/day), which is exactly the bucket the audit playbook allows a deliberate, slightly longer animation for.

## Target

```tsx
/* frontend/src/components/marketing/LandingContent.tsx — target */
<div
  data-mounted={mounted ? "" : undefined}
  className="hero-illustration-in relative mx-auto aspect-4/5 w-72 opacity-0 sm:w-80 lg:mx-0 lg:w-full lg:max-w-md"
>
  <HeroIllustration className="h-full w-full" />
</div>
```

```css
/* new <style> block in the same hero <section>, alongside the existing
   .frosted-band reduced-transparency block */
@keyframes hero-illustration-in {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.hero-illustration-in[data-mounted] {
  animation: hero-illustration-in 720ms cubic-bezier(0.23, 1, 0.32, 1) 180ms both;
}
@media (prefers-reduced-motion: reduce) {
  .hero-illustration-in[data-mounted] { animation: none !important; opacity: 1 !important; }
}
```

Exact values, and why:

- **Duration 720ms**: marketing/explanatory motion is explicitly allowed to run longer than the 300ms UI budget (AUDIT.md, "Easing & duration" table, "Marketing / explanatory" row: "Can be longer"). 720ms is long enough to read as a considered arrival without dragging.
- **Delay 180ms**: lands the illustration just after the eye has registered the frosted band's text, so the hero reads as headline-then-visual rather than both flashing in at once.
- **Curve `cubic-bezier(0.23, 1, 0.32, 1)`**: this is the repo's own `EASE_OUT` token, already defined and used for entrances in `frontend/src/components/layout/SiteShell.tsx:14` (`const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";`, applied to the mobile menu's link stagger). Reuse it verbatim; do not invent a new curve.
- **`translateY(16px) scale(0.97)` → identity, never `scale(0)`**: AUDIT.md "Physicality & origin" — nothing in the real world appears from nothing; target range is `scale(0.9-0.97)` + `opacity: 0`. 0.97 is the gentle end of that range, appropriate for a large hero element (a stronger scale-in would feel like a popup, not an arrival).
- **`data-mounted` + `useEffect`, not a raw CSS `animation` on load**: this is the repo's own documented fallback pattern for entry-without-`@starting-style` (AUDIT.md "Interruptibility": "Entry without JS: `@starting-style` (legacy fallback: a `data-mounted` attribute set in `useEffect`)"). `@starting-style` is real and shippable in current evergreen browsers, but this repo has no existing usage of it to imitate, whereas the `data-mounted`-in-`useEffect` shape is trivial and matches the component's existing `"use client"` + `useState` conventions used elsewhere in the same file (e.g. `useAuth()` hook usage at the top of `LandingContent`).

## Repo conventions to follow

- Easing tokens are hand-typed `const` strings per component, not a shared CSS custom-property file yet (e.g. `frontend/src/components/marketing/LandingContent.tsx:7`: `const EASE_SNAP = "cubic-bezier(0.16, 1, 0.3, 1)";`, `frontend/src/components/layout/SiteShell.tsx:14-15`: `EASE_OUT` / `EASE_IN_OUT`). Add `EASE_OUT` as a new local const in `LandingContent.tsx` with the exact same value as `SiteShell.tsx`'s — do not rename or alter it.
- Scoped `<style>{`...`}`</style>` blocks embedded directly in the component are the established pattern for one-off keyframes (see the existing `.frosted-band` reduced-transparency block already in this same hero section, and `CloudSky.tsx:42-62`). Add the new keyframes to a `<style>` block the same way — either extend the existing one or add a second block immediately after it.
- Every keyframe animation in this codebase is gated with `@media (prefers-reduced-motion: reduce) { ... animation: none !important; }` — see `CloudSky.tsx:57-61` and the `.frosted-band` block already in `LandingContent.tsx`. Follow the exact same shape.

## Steps

1. In `frontend/src/components/marketing/LandingContent.tsx`, add `useEffect` to the existing `useState`/`"use client"` imports at the top of the file (currently the file imports from `"react"` only implicitly via JSX; check the current import line and add `useEffect, useState` from `"react"` if not already present alongside the `useAuth` import).
2. Inside `export function LandingContent()`, add:
   ```tsx
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);
   ```
3. Add `const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";` near the existing `const EASE_SNAP = ...` declaration at the top of the file (module scope, not inside the component, matching how `EASE_SNAP` is already declared).
4. Replace the illustration wrapper div (current code, `LandingContent.tsx:158-161`):
   ```tsx
   <div className="relative mx-auto aspect-4/5 w-72 sm:w-80 lg:mx-0 lg:w-full lg:max-w-md">
     <HeroIllustration className="h-full w-full" />
   </div>
   ```
   with:
   ```tsx
   <div
     data-mounted={mounted ? "" : undefined}
     className="hero-illustration-in relative mx-auto aspect-4/5 w-72 opacity-0 sm:w-80 lg:mx-0 lg:w-full lg:max-w-md"
   >
     <HeroIllustration className="h-full w-full" />
   </div>
   ```
5. Add the keyframes and reduced-motion guard from the **Target** section above into the hero section's existing `<style>{`...`}`</style>` block (the one that currently contains the `.frosted-band` `@media (prefers-reduced-motion: reduce)` rule), so there is one style block per section rather than two.

## Boundaries

- Do NOT modify `HeroIllustration.tsx` — the steam-wisp idle animation inside it is already correct and out of scope.
- Do NOT modify `CloudSky.tsx` or its animations.
- Do NOT add any animation library dependency (Motion, GSAP, etc.) — this repo is hand-rolled CSS by deliberate choice.
- Do NOT add continuous/looping motion to the illustration wrapper (no `infinite` on this new keyframe) — this is a one-time entrance only, per the Decision section above.
- Do NOT change the illustration's internal SVG markup or its aspect ratio / sizing classes beyond adding `opacity-0` and the new className.
- If the hero section's current `<style>` block or the `Field`/component structure around line 158 has drifted from what's quoted above (e.g. different line numbers, different className), STOP and report the mismatch instead of guessing where to apply the change.

## Verification

- **Mechanical**: `cd frontend && npx tsc --noEmit` should report no new errors. `npm run lint` should pass.
- **Feel check**: run `npm run dev`, load `/` in a browser, and confirm:
  - On a hard refresh, the frosted headline band is visible essentially immediately, and the traveler illustration fades and rises into place roughly 150-200ms after, finishing within about a second of load — it should read as "the illustration arrives," not as a flash or a slow drift.
  - The illustration does **not** continue moving once the entrance finishes (no idle bob/float) — only the existing steam wisps inside it should keep moving.
  - In Chrome DevTools' Animations panel, set playback to 10% and scrub the `hero-illustration-in` animation: it should ease out (fast start, slow settle), not ease in.
  - Open DevTools' Rendering panel, enable "Emulate CSS media feature prefers-reduced-motion: reduce", and hard-refresh again: the illustration should simply appear at full opacity with no movement, while the steam wisps inside `HeroIllustration.tsx` also stop (already handled by existing code).
- **Done when**: the illustration animates in once per page load, never loops, respects reduced motion, and every value above (720ms, 180ms delay, `cubic-bezier(0.23, 1, 0.32, 1)`, `translateY(16px) scale(0.97)`) matches exactly.
