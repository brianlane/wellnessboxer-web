# Shopify Setup (Headless)

This document is the click-by-click guide for connecting `wellnessboxer.com` to a Shopify backend. Run it once before `scripts/deploy.sh` so the production deploy has working commerce.

> The site renders fully without these steps. Cart, checkout, and product detail pages activate the moment `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` are set.

## 1. Create the store

1. Sign up at <https://www.shopify.com/> (Basic plan is sufficient to start; Shopify Subscriptions is included).
2. Pick `wellnessboxer` as the store-name slug. Your `myshopify` URL becomes `wellnessboxer.myshopify.com`. Save this string &mdash; it is the value for `SHOPIFY_STORE_DOMAIN`.
3. Add company info, payment provider (Shopify Payments + Stripe fallback), and shipping zones (US, CA, EU, UK, AU, NZ, JP, SG to start).

## 2. Install the Headless sales channel

1. In the admin, go to `Apps and sales channels` -> `Apps` -> search for `Headless` (the official Shopify channel).
2. Install it. Click `Add storefront` and name it `wellnessboxer-web`.
3. Open the storefront. Under `Storefront API`, click `Manage`.
4. Grant these scopes (read-only is fine for production):
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_tags`
   - `unauthenticated_read_collections`
   - `unauthenticated_read_content` (for pages / menus)
   - `unauthenticated_read_metaobjects`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_customers` (for customer-bound carts)
   - `unauthenticated_read_customers`
5. Copy the generated **public access token**. This is `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

## 3. Generate a webhook revalidation secret

1. Generate a random string locally: `openssl rand -hex 32`.
2. Copy it &mdash; this is `SHOPIFY_REVALIDATION_SECRET`.
3. After your first Vercel deploy, add a Shopify webhook (Settings -> Notifications -> Webhooks):
   - Topic: `Products / Update`, format: JSON, URL: `https://www.wellnessboxer.com/api/revalidate?secret=YOUR_SECRET`
   - Repeat for `Products / Create`, `Products / Delete`, `Collections / Update`, `Collections / Create`, `Collections / Delete`.

## 4. Create launch products

Create three products with the exact handles below (used by the homepage Subscription Bundles section):

| Handle                          | Title                  | Notes |
| ------------------------------- | ---------------------- | ----- |
| `wellness-boxer-single`         | The Single             | Regular sellable product. Pre-order enabled. |
| `wellness-boxer-3-pack`         | The 3-Pack             | Bundle of 3. Inventory tracked separately. |
| `wellness-boxer-subscribe`      | Subscribe & Replace    | Use **Shopify Subscriptions** app to add a 90-day plan at 15% off. |

For each product:
- Add at least one product image (you can reuse `public/images/airflow-channels.png` until photography lands).
- Set `Inventory > Continue selling when out of stock = ON` until launch.
- Set `Available on Headless: wellnessboxer-web` to `ON`.

## 5. Create homepage collections

The Next.js Commerce template uses two hidden collections to populate optional homepage modules. They are not required for our marketing homepage but enable the default `/search` page to show useful collections.

1. `Products` -> `Collections` -> `Create collection`.
2. Create:
   - `hidden-homepage-featured-items` (Type: Manual, add the 3-Pack and Single)
   - `hidden-homepage-carousel` (Type: Manual, add all three products)

## 6. Create the menus

`Online Store` -> `Navigation` -> `Add menu`. Create both menus with these handles (auto-generated from name):

- `next-js-frontend-header-menu` &mdash; Items: Science (`/science`), Materials (`/materials`), Bundles (`/#bundles`), About (`/about`)
- `next-js-frontend-footer-menu` &mdash; Items: Privacy (`/legal/privacy`), Terms (`/legal/terms`), Disclaimer (`/legal/disclaimer`)

If these menus are missing, the navbar falls back to the static menu defined in `components/layout/navbar/index.tsx`.

## 7. Plug into Vercel

```bash
./scripts/deploy.sh
```

The script will prompt you for the four values from steps 1, 2, and 3 and write them to Vercel production environment.

## Verification

After deploy:

1. Visit `https://www.wellnessboxer.com/product/wellness-boxer-3-pack` &mdash; you should see the product page.
2. Click `Add to cart` &mdash; the slide-out cart should populate.
3. Click `Proceed to checkout` &mdash; you should land on Shopify-hosted checkout.
4. From your Shopify admin, edit the 3-Pack title; within 30 seconds the change should appear on the deployed site (webhook revalidation).
