# Kweza Cash Climb

Lovable brief — Kweza's conversion surfaces (design exploration)

You're designing three mobile screens for Kweza, a Nigerian competition app. People play quick puzzle games (CheckMate, WisdomDrop, OddOneOut) all week; every game they play earns points on ONE weekly leaderboard; the top positions win real cash, paid to their bank, winners crowned every Sunday 8 PM. It should feel like a game with money on the line — not a SaaS product.

The business problem these screens exist to solve: people sign up happily and then don't convert to paying. Our working theory is the offer never sold them — it listed features instead of making them feel what they'd be playing for. Your job is screens that make the leap feel obvious.

Build at 390px mobile width. Give us 2–3 genuinely different directions for each screen — different structures, not recolors of one idea. Surprise us.

Screen 1 — THE OFFER (a bottom sheet over the app) — this is the priority

A free player tapped "Join this week's board". This sheet is the sales moment.

What's fixed (little):

The offer is the star. Selling the value is the whole job. Think: the cash, the Sunday moment, competing against real people, what winners actually receive. Make it vivid. Numbers, energy, proof-shaped elements — your call how.

No price appears on this sheet. Price lives one tap deeper, per channel.

Two payment routes at the bottom, and they are the FOOTER, not the hero: "Pay with airtime" (primary weight) and "Pay with Paystack" (secondary). That hierarchy is fixed; their styling is yours.

One quiet reassurance line is welcome: the price is shown before anyone pays.

What's free: everything else. Structure, imagery, illustration, motion-implying layouts, how the value is dramatized, tone of copy (confident, Nigerian-market aware, never scammy — this is a real competition with real payouts, and trust matters as much as excitement).

Screen 2 — PAYSTACK PLANS (full page, after tapping "Pay with Paystack")

Model it on the NYT Games subscription sheet — the good bones there: a "What's included" comparison (Free column vs. subscriber column, where the free player sees exactly where what they have stops), and prices living inside the plan buttons themselves, with support for a promotional strikethrough price and an "after the offer" note. Two plans: Weekly and Monthly (amounts are placeholders — ₦200/week, ₦700/month — both operator-configured, so design for changeable numbers and an optional promo state). Improve on NYT, don't clone it: make it feel like Kweza's game world, not a newspaper.

Screen 3 — BLITZ CLOSE (full page)

A free player just finished a fast evening event ("Friday Blitz") and placed well — say #12 of 214. This screen celebrates the finish and converts the high into joining the weekly board.

What's fixed: full purple/indigo page, the CTA is a lime-green button with black text — that pairing is ruled and stays. The rank is the emotional center. There's a quiet "Maybe later" escape.

What's free: the structure (this is what we most want ideas on), how the rank is staged, whether their result is dramatized as an artifact (ticket, card, badge — the app elsewhere uses a torn-ticket motif for prizes, use it or don't), what the bridge line to the weekly board says, any energy/motion the layout implies.

The app's existing feel (context, not constraint)

Warm cream world (#fff7ee ground, white cards, burnt-orange #e8590c brand), dark mode exists; prizes and tickets render on a near-black warm brown with cream and gold; the Blitz event's identity is indigo + lime. Rounded, friendly, Plus Jakarta Sans. Buttons are 12px-radius. A torn-ticket motif (stub · perforation · notches) is the product's signature for anything prize-shaped. Borrow what helps; break what doesn't — these three screens are allowed to be louder than the rest of the app.

Deliver each direction as its own screen. No lorem ipsum — write real copy; we'll keep what's good.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://prize-play-conversion.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0052df18-d88d-4f34-a883-44408f372342).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
