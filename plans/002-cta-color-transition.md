# 002 — Fix the hero CTA's hover color snap

- **Status**: DONE
- **Commit**: 379333f
- **Severity**: MEDIUM
- **Category**: Cohesion / Performance
- **Estimated scope**: 1 file, 1 line (`frontend/src/components/marketing/LandingContent.tsx`)

## Problem

`frontend/src/components/marketing/LandingContent.tsx:90` — current code:

```tsx
<button
  type="button"
  onClick={() => openAuthModal("login")}
  className="group mt-10 inline-flex items-center gap-2 rounded-pill bg-brand py-2 pl-7 pr-2 text-base font-medium text-brand-foreground shadow-[0_20px_45px_rgba(47,93,138,0.28)] transition-transform duration-300 hover:bg-brand-strong active:scale-[0.98]"
  style={{ transitionTimingFunction: EASE_SNAP }}
>
```

The className only sets `transition-transform` (Tailwind's `transition-property: transform`). `hover:bg-brand-strong` is a background-color change, which is not in the transitioned property list, so it snaps instantly on hover while `active:scale-[0.98]` eases smoothly. The button's own inner arrow circle (two lines below, `LandingContent.tsx:95`) gets this right — it transitions `transform` only and has no color change, so there's nothing to compare against on that element, but the outer button's mismatch is audible-by-eye on every hover.

## Target

```tsx
/* target */
className="group mt-10 inline-flex items-center gap-2 rounded-pill bg-brand py-2 pl-7 pr-2 text-base font-medium text-brand-foreground shadow-[0_20px_45px_rgba(47,93,138,0.28)] transition-[transform,background-color] duration-300 hover:bg-brand-strong active:scale-[0.98]"
```

Only the property list changes: `transition-transform` becomes `transition-[transform,background-color]`. Everything else on the line (duration, curve via the existing inline `style={{ transitionTimingFunction: EASE_SNAP }}` where `EASE_SNAP = "cubic-bezier(0.16, 1, 0.3, 1)"`, all other classes) stays exactly as-is — the button already has the right duration and curve, it's only missing `background-color` from the property list.

Do not use `transition-all` — AUDIT.md "Performance" is explicit that `transition: all` animates unintended properties off-GPU and is always a finding; naming the two properties explicitly is the correct fix.

## Repo conventions to follow

- This file already uses Tailwind's arbitrary-value transition-property syntax nowhere else, but the pattern of "name exactly the properties that change" is the audit's stated rule, not a new convention to establish — apply it minimally, on this one class list, without touching the shared `EASE_SNAP` constant or its usage elsewhere (e.g. the inner arrow-circle span on the same button, and the destination-card hover scale at `LandingContent.tsx:166`, both of which are already correct and out of scope).

## Steps

1. In `frontend/src/components/marketing/LandingContent.tsx`, on the `<button>` element containing the text "Search Flights" (currently line 90), change the class `transition-transform` to `transition-[transform,background-color]`. No other class or attribute on this element changes.

## Boundaries

- Do NOT touch the inner arrow-circle `<span>` inside this button (`LandingContent.tsx:94-97`) — it only transitions `transform` and has no color change, so it's already correct.
- Do NOT touch any other button or link in the file (e.g. destination cards, steps section) — this plan is scoped to the single hero CTA.
- Do NOT change `duration-300` or the `EASE_SNAP` curve — only the transitioned-property list.
- If the button's className has drifted from the exact string quoted in **Problem** above, STOP and report the mismatch rather than guessing which class to edit.

## Verification

- **Mechanical**: `cd frontend && npx tsc --noEmit` and `npm run lint` both pass (this is a className-only change with no logic impact, so this should be a no-op check).
- **Feel check**: run `npm run dev`, load `/`, and hover the "Search Flights" button in the hero:
  - The background color should visibly ease from `var(--brand)` to `var(--brand-strong)` over the same ~300ms as before, instead of snapping instantly.
  - Click-and-hold (or use DevTools to force `:active`) and confirm the press scale (`scale(0.98)`) still animates correctly alongside the color — both should now be running on the same transition, not one instant and one eased.
  - In DevTools' Animations/Elements panel, confirm no other property (e.g. `box-shadow`, `padding`) is being unintentionally transitioned — only `transform` and `background-color`.
- **Done when**: hovering and pressing the button both read as one smooth, coordinated motion instead of a mix of instant and eased changes.
