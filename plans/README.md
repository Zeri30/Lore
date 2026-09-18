# Animation plans

Scoped audit: what should live on the right side of the Lore hero (`frontend/src/components/marketing/LandingContent.tsx`), given the left side now houses a frosted-glass "type band" around the headline and the right side holds a static hand-illustrated SVG (`HeroIllustration.tsx`) next to the already-animating `CloudSky.tsx` background.

## Findings

| # | Severity | Category | Location | Finding | Fix summary |
| --- | --- | --- | --- | --- | --- |
| 1 | MEDIUM | Missed opportunity / Cohesion | `LandingContent.tsx:158-161` | Hero illustration renders inert on load while `CloudSky` runs three continuous loops in the same viewport | One-time fade+rise entrance on mount, not idle looping motion |
| 2 | MEDIUM | Cohesion / Performance | `LandingContent.tsx:90` | CTA button's `hover:bg-brand-strong` isn't in the `transition-transform`-only property list, so it snaps instead of easing | Widen to `transition-[transform,background-color]` |

## The actual decision (plan 001)

**Static illustration + one-time entrance, no idle/perpetual motion on the illustration itself.** `CloudSky.tsx` already owns continuous ambient motion for this hero (drifting clouds, a breathing glow, a flying plane, all `infinite`); adding a second independent loop on the illustration (bob, float, hover-tilt) would compete with it rather than add to it — this codebase already tried and reverted a similar perpetual-bob decorative element once during an earlier hero redesign. The actual gap is that the illustration has no arrival: it pops in fully-formed. Plan 001 gives it a single 720ms fade-and-rise on mount, delayed 180ms behind the headline, using the repo's own existing `EASE_OUT` curve (`cubic-bezier(0.23, 1, 0.32, 1)`, already defined in `SiteShell.tsx`). The existing steam-wisp idle detail inside `HeroIllustration.tsx` is correct as-is and untouched.

## Execution order

1. **001 — Hero illustration entrance.** Primary answer to the scoping question. No dependency on 002.
2. **002 — CTA color transition.** Independent, unrelated file region (same file, different element). Can run before, after, or in parallel with 001.

## Status

| # | Title | Severity | Status |
| --- | --- | --- | --- |
| 001 | Hero illustration entrance | MEDIUM | DONE |
| 002 | CTA button hover color transition | MEDIUM | DONE |
