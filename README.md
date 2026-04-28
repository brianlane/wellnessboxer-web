# Wellness Boxer

The marketing + commerce frontend for [wellnessboxer.com](https://www.wellnessboxer.com).

Built on Next.js 15 (App Router, Tailwind v4) with **Stripe Checkout** as the entire commerce backend. Designed to run with **$0 fixed monthly cost** &mdash; you pay Stripe processing fees only when a customer actually checks out.

## Stack

- **Framework:** Next.js 15 (App Router, Turbopack, PPR)
- **Styling:** Tailwind v4 with a custom sage / sand / glacier "Digital Sanctuary" palette
- **Type:** TypeScript 5.8
- **Commerce:** Stripe Checkout (one-time + subscriptions) via the [stripe-node](https://github.com/stripe/stripe-node) SDK; static product catalog in [`lib/products.ts`](lib/products.ts).
- **Hosting:** Vercel Hobby (free tier, deploy via [`scripts/deploy.sh`](scripts/deploy.sh))
- **Package manager:** `pnpm`

There is **no Shopify, no Medusa, no separate API server, and no managed database**. The Next.js app is the entire stack.

## Cost model

| Item | Cost |
| ---- | ---- |
| Stripe account | $0/month |
| Stripe Checkout (one-time) | ~2.9% + 30&cent; per successful charge in the US |
| Stripe Billing (subscriptions) | additional 0.5% per recurring charge |
| Stripe Tax (optional) | 0.5% per calculated transaction |
| Vercel Hobby | $0/month within Hobby limits |
| Domain | what your registrar charges (annual) |

**Total fixed monthly cost: $0.**

## Quick start

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000). The marketing site renders fully without Stripe configured; `Reserve` buttons return a friendly 503 from `/api/checkout` until you set the env vars below.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
COMPANY_NAME="Wellness Boxer"
SITE_NAME="Wellness Boxer"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

STRIPE_PRICE_SINGLE="price_..."
STRIPE_PRICE_3PACK="price_..."
STRIPE_PRICE_SUBSCRIBE="price_..."
```

See [docs/STRIPE_SETUP.md](docs/STRIPE_SETUP.md) for the click-by-click flow to obtain every value.

## Deploy

When you are ready to attach `wellnessboxer.com`:

```bash
./scripts/deploy.sh
```

The script installs the Vercel CLI, opens browser auth, links the project, prompts for the seven env vars, attaches the domain, and ships a production build.

## Project layout

```
app/
  page.tsx                       # marketing homepage (bento layout)
  layout.tsx                     # root layout, fonts, navbar
  globals.css                    # Tailwind v4 theme tokens
  api/
    checkout/route.ts            # creates a Stripe Checkout Session
    stripe/webhook/route.ts      # signature-verified webhook handler
    waitlist/route.ts            # email capture stub
  product/[handle]/page.tsx      # static product detail (Stripe-aware)
  checkout/success/page.tsx      # post-payment landing
  checkout/cancel/page.tsx       # cancelled-payment landing
  science/                       # research page
  materials/                     # material traceability page
  about/                         # brand + Barcelos manufacturing
  legal/                         # privacy, terms, disclaimer (DRAFT)
components/
  marketing/                     # Wellness Boxer marketing modules
  layout/                        # navbar, mobile menu, footer, waitlist form
lib/
  products.ts                    # static product catalog (3 SKUs)
  stripe.ts                      # lazy Stripe client singleton
  utils.ts                       # baseUrl, URL helpers
public/images/                   # 9 product / lifestyle / diagram assets
docs/STRIPE_SETUP.md             # Stripe account + product creation guide
scripts/deploy.sh                # one-command Vercel deploy
```

## Compliance

Wellness Boxer is **apparel**, not a medical device. Every claim on the site is paired with an FDA disclaimer in the footer and on the dedicated [/legal/disclaimer](app/legal/disclaimer/page.tsx) page. Copy in `app/legal/*` is marked `DRAFT` and must be reviewed by counsel before launch.
