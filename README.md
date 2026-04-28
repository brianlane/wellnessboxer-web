# Wellness Boxer

The marketing + commerce frontend for [wellnessboxer.com](https://www.wellnessboxer.com).

Built on the [vercel/commerce](https://github.com/vercel/commerce) Next.js 15 + Tailwind v4 + headless Shopify template, customised into a "Digital Sanctuary" brand experience for the September 2026 launch.

## Stack

- **Framework:** Next.js 15 (App Router, Turbopack, PPR)
- **Styling:** Tailwind v4 with a custom sage / sand / glacier palette
- **Type:** TypeScript 5.8
- **Backend:** Headless Shopify Storefront API (lights up once env vars are set)
- **Hosting:** Vercel (deploy via `scripts/deploy.sh`)
- **Package manager:** `pnpm`

## Quick start

```bash
pnpm install
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000). The site renders fully without a connected Shopify store; commerce features (cart, checkout, product detail) activate automatically once you set the env vars below.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
COMPANY_NAME="Wellness Boxer"
SITE_NAME="Wellness Boxer"
SHOPIFY_STORE_DOMAIN="wellnessboxer.myshopify.com"
SHOPIFY_STOREFRONT_ACCESS_TOKEN="..."
SHOPIFY_REVALIDATION_SECRET="..."
```

See [docs/SHOPIFY_SETUP.md](docs/SHOPIFY_SETUP.md) for the full click-path to obtain the Storefront token.

## Deploy

When you are ready to attach `wellnessboxer.com`:

```bash
./scripts/deploy.sh
```

The script installs the Vercel CLI, opens browser auth, links the project, prompts for env vars, attaches the domain, and ships a production build.

## Project layout

```
app/
  page.tsx                    # marketing homepage (bento layout)
  layout.tsx                  # root layout, fonts, cart provider
  globals.css                 # Tailwind v4 theme tokens
  api/waitlist/route.ts       # email capture (stub)
  science/                    # research page
  materials/                  # material traceability page
  about/                      # brand + Barcelos manufacturing
  legal/                      # privacy, terms, disclaimer (DRAFT)
  product/[handle]/           # Shopify-driven product detail
  search/                     # Shopify-driven search + collection pages
components/
  marketing/                  # Wellness Boxer marketing modules
  layout/                     # navbar, footer, waitlist form
  cart/                       # Shopify cart UI
  ...
lib/
  shopify/                    # Storefront API client (resilient to missing env)
  utils.ts                    # baseUrl, isShopifyConfigured, validators
public/images/                # 9 product / lifestyle / diagram assets
docs/SHOPIFY_SETUP.md         # store creation + token guide
scripts/deploy.sh             # one-command Vercel deploy
```

## Compliance

Wellness Boxer is **apparel**, not a medical device. Every claim on the site is paired with an FDA disclaimer in the footer and on the dedicated [/legal/disclaimer](app/legal/disclaimer/page.tsx) page. Copy in `app/legal/*` is marked `DRAFT` and must be reviewed by counsel before launch.
