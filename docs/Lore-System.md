Initial Structure

1\. Introduction  
Website Name: Lore

Tagline: LORE — **GO SOMEWHERE  
WORTH REMEMBERING.**

The visual identity could combine:

- Soft clouds
- Airplane/flying references
- Sky gradients
- Airplane-window-inspired cards
- Destinations
- Realistic ticket/boarding-pass UI
- Smooth animations
- Glassmorphism, but used lightly
- The trick is to make the **landing page emotional**, but make the **booking flow practical**.

2\. **2\. The overall experience**

I would divide LORE into two personalities:

**LORE Landing Page**

**Dream / Explore / Inspire**

This is where you can be creative.

For example:

**Where will you go next?**

A large sky background with slowly moving clouds.

Then a floating search box:

**From**  
Manila (MNL)

**To**  
Tokyo (NRT)

**Departure**  
Dec 12, 2026

**Return**  
Dec 18, 2026

**Passengers**  
2 Adults

**Search Flights →**

The animation should make the user feel like they're **floating**, rather than watching a normal website.  
<br/>**LORE Booking System**

**Reality / Information / Trust**

Once the user clicks Search, the dreamy animations should become much more subtle.

Now the interface should prioritize:

- Flight times
- Airline
- Duration
- Stops
- Baggage
- Price
- Seat availability
- Refund/change conditions
- Passenger information
- Payment
- Booking confirmation

This is important because **beautiful UI cannot compensate for confusing travel information**.

Flight-booking UX has a lot of information to communicate, and dedicated UX research on airline booking sites evaluates hundreds of parameters around this flow.

**3\. User-side system requirements**

I'd initially divide the customer side into these modules.

**A. Account**

Users should be able to:

- Register
- Login
- Logout
- Forgot password
- Reset password
- Edit profile
- Change password
- Manage saved passenger information
- Manage saved payment methods _(if you decide to support this)_

**Profile information**

Full Name

Email

Phone

Date of Birth

Nationality

Passport Information

Don't necessarily ask for everything during registration.

Only request sensitive travel information when it's actually needed for a booking.

**4\. Flight / Travel Search**

This is the heart of LORE.

Users can search:

**Flight type**

- Round trip
- One way
- Multi-city

**Search fields**

From

To

Departure

Return

Passengers

Class

Passengers:

Adults

Children

Infants

Class:

Economy

Premium Economy

Business

First

**5\. Search Results**

After searching:

Manila → Tokyo

Dec 12

2 Adults

Economy

Then cards:

✈ Airline

08:30 MNL

─────────

4h 20m

─────────

13:50 NRT

Non-stop

₱18,450

Select

But clicking a flight should reveal more information:

**Flight details**

- Aircraft
- Departure terminal
- Arrival terminal
- Flight duration
- Layover information
- Baggage allowance
- Meal availability
- Seat options
- Cancellation policy
- Change policy
- Fare rules

This is where LORE should feel like a **real booking system**, not just a UI concept.

**6\. Booking flow**

the flow:

SEARCH

↓

SELECT FLIGHT

↓

PASSENGER DETAILS

↓

ADD-ONS

↓

REVIEW

↓

PAYMENT

↓

CONFIRMATION

**Passenger Details**

For example:

Passenger 1

First Name

Middle Name

Last Name

Date of Birth

Gender

Nationality

Passport Number

**7\. Add-ons**

This could be a nice place for LORE's UI.

Users can add:

- Extra baggage
- Preferred seat
- Meals
- Travel insurance
- Priority boarding

For example:

**Make your flight yours.**

Then interactive seat selection.

**Seat map**

FRONT

A B C D E F

○ ○ ● ○ ○ ○

○ ○ ○ ○ ○ ○

○ ○ ○ ● ○ ○

BACK

Selected seats could have a subtle animation.

**8\. Payment**

Payment should feel extremely straightforward.

Booking Summary

Manila → Tokyo

Dec 12 – Dec 18

Flight ₱18,450

Baggage ₱800

Seat ₱600

──────────────────────────

Total ₱19,850

Then:

**Payment methods**

Depending on what you want to implement:

- Credit/debit card
- GCash
- Maya
- Bank transfer
- Other payment gateway

For an academic/project version, you can initially make the payment module **simulated** rather than connecting to actual financial transactions.

**9\. Booking Confirmation**

This could be one of the coolest LORE screens.

Instead of just:

Booking Successful!

Create something resembling a digital boarding pass.

LORE ✈

MANILA TOKYO

MNL NRT

08:30 13:50

DEC 12, 2026

PASSENGER

CZERINA PIEDAD

SEAT 18A

BOOKING CODE

LR8X92K

Then:

**Download Ticket**

**View Booking**

**Add to Calendar**

**Email Ticket**

**10\. My Trips**

The user dashboard should have:

**Upcoming**

✈ Manila → Tokyo

Dec 12, 2026

Booking: LR8X92K

\[View Trip\]

**Past Trips**

Tokyo

Dec 2025

Singapore

Aug 2025

**Cancelled**

Separate cancelled bookings.

**11\. User dashboard**

I'd keep it very clean.

LORE

Dashboard

Search Flights

My Trips

Saved Travelers

Notifications

Profile

Dashboard:

**Good evening, Czerina.**

Ready for your next journey?

Then the upcoming trip appears as a large boarding-pass-style card.

**12\. Admin side**

This is where LORE becomes a proper system instead of just a frontend project.

divide the admin panel into:

**Dashboard**

Show:

Total Bookings

Today's Bookings

Upcoming Flights

Total Revenue

Registered Users

Cancelled Bookings

Maybe:

Bookings this month

📈

**13\. Admin — Flight Management**

Admin can:

- Add flight
- Edit flight
- Delete/deactivate flight
- Set departure/arrival
- Set airline
- Set aircraft
- Set capacity
- Set fare
- Set baggage allowance
- Set flight status

Example:

Flight: LORE-204

From: MNL

To: NRT

Departure:

Dec 12, 2026 — 08:30

Arrival:

Dec 12, 2026 — 13:50

Aircraft:

Airbus A321

Economy:

₱18,450

Business:

₱42,500

Status:

Scheduled

**14\. Admin — Booking Management**

Admin should be able to see:

Booking ID

Passenger

Flight

Date

Amount

Payment Status

Booking Status

Statuses:

**Payment**

- Pending
- Paid
- Failed
- Refunded

**Booking**

- Confirmed
- Pending
- Cancelled
- Completed

**15\. Admin — User Management**

Admin:

- View users
- Search users
- View user profile
- Disable account
- Activate account
- Reset password
- View booking history

Avoid giving admins unnecessary access to sensitive information.

**16\. Admin — Payments**

This deserves its own section.

Payment ID

Booking ID

User

Amount

Payment Method

Date

Status

Admin can:

- View payments
- Verify payments
- Process/refund cancellations
- View payment history

**17\. Admin — Destinations**

This is something I'd add because it fits LORE's brand.

Admin can manage:

Tokyo

Seoul

Singapore

Paris

Bali

Cebu

Palawan

Each destination can have:

- Name
- Country
- Description
- Hero image
- Gallery
- Popularity
- Featured status

Then your landing page can automatically display:

**Places calling your name**

with destination cards.

**18\. Admin — Promotions**

Optional but useful:

Promo Code

LORE2026

Discount

10%

Minimum booking

₱5,000

Expiration

Dec 31, 2026

**19\. Admin — Reports**

Eventually:

**Sales**

- Daily
- Weekly
- Monthly
- Yearly

**Booking analytics**

- Most booked destinations
- Most popular flights
- Cancellation rate
- Revenue
- Number of passengers

This would make the admin side feel much more complete.

**20\. The LORE landing page concept**

This is where I'd have the most fun.

I imagine something like:

**HERO**

Full-screen sky.

Very subtle moving clouds.

Small airplane silhouette moving slowly across the page.

Then:

**GO SOMEWHERE  
WORTH REMEMBERING.**

Underneath:

Discover your next destination and let LORE take care of the journey.

Then the booking widget.

**Scroll**

As the user scrolls down, the clouds slowly disappear.

Then:

**Where do you want to wake up?**

Destination cards start appearing.

TOKYO

Japan

PARIS

France

BALI

Indonesia

CEBU

Philippines

Cards could slightly float when hovered.

**Then:**

**Your journey, simplified.**

Three steps:

01

SEARCH

Find the flight that fits you.

02

BOOK

Choose your seat and personalize

your journey.

03

FLY

Your ticket. Your destination.

Your story.

**21\. Animation direction**

I'd **avoid making everything move**.

The feeling should be:

**floating, not chaotic.**

Good animations:

- Clouds slowly drifting
- Plane slowly flying
- Text fading upward
- Cards floating slightly
- Gentle parallax
- Destination images zooming slightly
- Search box expanding
- Smooth page transitions
- Ticket unfolding
- Seat selection animations
- Progress indicators

Avoid:

- Excessive bouncing
- Huge spinning objects
- Constant particle effects
- Fast text animations
- Too much 3D

Because you're building a **travel booking system**, not an animation showcase.
