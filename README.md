# LORE

**Go somewhere worth remembering.**

LORE is a flight booking platform concept built around a simple idea: the discovery part of travel should feel inspiring, and the booking part should feel completely trustworthy. Most airline sites pick one or the other — LORE tries to do both by treating them as two different experiences under one product.

## The idea

- **The landing page** is dreamy and exploratory — drifting clouds, a floating search widget, destination cards that invite you to imagine a trip before you've committed to one.
- **The booking flow** drops the atmosphere and gets practical — clear flight times, pricing, baggage rules, seat selection, and a straightforward path from search to a confirmed ticket.

The guiding rule for the UI: *floating, not chaotic*. Motion is used to make the product feel calm and alive, never busy.

## What it does (v1)

- Search flights (round trip / one way / multi-city)
- Browse results and drill into flight details (duration, stops, baggage, fare rules)
- Book a flight: passenger details → add-ons (bags, seats, meals) → review → simulated payment → confirmation
- A digital boarding-pass-style confirmation screen
- A personal dashboard for upcoming, past, and cancelled trips

Admin tools (flight management, bookings, payments, destinations, promotions, reports) are planned for a later phase, once the core booking loop is solid.

## Tech stack

- **Frontend** — [Next.js](https://nextjs.org/) (TypeScript, Tailwind CSS, App Router) — `/frontend`
- **Backend** — [Laravel](https://laravel.com/) (REST API, Laravel Sanctum for auth) — `/backend`

The two are decoupled: Next.js talks to the Laravel API over HTTP. They're deployed separately — frontend on Vercel, backend on Render — from this one repository.

## Project structure

```
lore/
├── frontend/   # Next.js app (landing page + booking UI)
├── backend/    # Laravel API (auth, flights, bookings, payments)
└── README.md
```
