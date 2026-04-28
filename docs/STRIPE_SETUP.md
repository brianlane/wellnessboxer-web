# Stripe Setup

The Wellness Boxer storefront uses **Stripe Checkout** as its full backend &mdash; no Shopify, no Medusa, no self-hosted database. Cost structure: **$0 fixed monthly fee**, only per-transaction processing (~2.9% + 30&cent; in the US, similar in other regions; Stripe Tax + Stripe Billing add small per-transaction surcharges only when used).

This document is the click-by-click setup. Run it once before `scripts/deploy.sh` so the production deploy has working checkout.

> The marketing site renders fully without Stripe configured. The `Reserve` buttons return a friendly 503 from `/api/checkout` until the env vars below are set.

## 1. Create your Stripe account

1. Sign up at <https://dashboard.stripe.com/register>. Account upgrade is free; you only pay per processed transaction.
2. Activate your account (business details, bank account for payouts, tax info). You can build in **test mode** before activation finishes &mdash; just use the test keys.

## 2. Grab the API keys

1. <https://dashboard.stripe.com/apikeys> (toggle test / live as needed).
2. Copy the **Secret key** &rarr; this becomes `STRIPE_SECRET_KEY`.
3. Keep the dashboard tab open &mdash; you'll come back for the webhook secret in step 5.

## 3. Create three Products

For each product below, create it under <https://dashboard.stripe.com/products>:

| Product name           | Pricing model                | Price (USD) | Statement descriptor |
| ---------------------- | ---------------------------- | ----------- | -------------------- |
| Wellness Boxer Single  | One time                     | $48.00      | WELLNESS BOXER       |
| Wellness Boxer 3-Pack  | One time                     | $128.00     | WELLNESS BOXER       |
| Wellness Boxer Subscribe & Replace | Recurring &mdash; every 90 days | $108.00 | WELLNESS BOXER SUB |

For the subscription product, set:
- Billing period: `Custom` &rarr; every `3` months (90 days)
- Usage type: `Licensed`

After saving each product, copy the generated **Price ID** (looks like `price_1Pabc...`). You'll set them as env vars:

| Stripe Price ID belongs to | Env var |
| --- | --- |
| Wellness Boxer Single | `STRIPE_PRICE_SINGLE` |
| Wellness Boxer 3-Pack | `STRIPE_PRICE_3PACK` |
| Wellness Boxer Subscribe &amp; Replace | `STRIPE_PRICE_SUBSCRIBE` |

## 4. Enable Stripe Tax (recommended, optional)

1. <https://dashboard.stripe.com/tax> &rarr; Activate Stripe Tax.
2. Add your origin address (Phoenix, AZ).
3. Register tax obligations as needed (US economic-nexus thresholds are interactive in the dashboard).

The Checkout Session route already passes `automatic_tax: { enabled: true }`. Disable that in `app/api/checkout/route.ts` if you don't activate Stripe Tax.

## 5. Configure the webhook

1. <https://dashboard.stripe.com/webhooks> &rarr; `Add an endpoint`.
2. Endpoint URL: `https://www.wellnessboxer.com/api/stripe/webhook` (use your Vercel preview URL while testing).
3. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the **Signing secret** (starts with `whsec_...`) &rarr; this becomes `STRIPE_WEBHOOK_SECRET`.

For local development, use the [Stripe CLI](https://docs.stripe.com/stripe-cli):

```bash
stripe login
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

The CLI prints a `whsec_...` secret you can paste into `.env.local`.

## 6. Configure Stripe Billing portal (for subscriptions)

1. <https://dashboard.stripe.com/test/settings/billing/portal>
2. Enable customers to: cancel subscriptions, pause subscriptions, update payment methods, view invoices.
3. Save. The link to the billing portal is included automatically in the receipt emails sent by Stripe.

## 7. Plug into Vercel

```bash
./scripts/deploy.sh
```

The script will prompt for every value you collected above. They are written to your Vercel project's `production` environment.

## Verification

After deploy:

1. Visit `https://www.wellnessboxer.com/product/wellness-boxer-3-pack` &mdash; you should see the product page.
2. Click `Reserve The 3-Pack` &mdash; you should be redirected to Stripe Checkout.
3. In test mode, complete checkout with card `4242 4242 4242 4242`, any future expiry, any CVC.
4. You should land on `/checkout/success?session_id=cs_test_...`.
5. In Vercel logs, you should see a `[stripe-webhook] checkout.session.completed` entry within seconds.

## Going live

When you flip Stripe to live mode:

1. Re-create the three products at <https://dashboard.stripe.com/products> in live mode (price IDs will be different).
2. Re-create the webhook in live mode.
3. Update Vercel env vars with the live `sk_live_...`, `whsec_...`, and `price_...` IDs.
4. Redeploy: `vercel --prod`.

## Cost summary

| Item | Cost |
| ---- | ---- |
| Stripe account | $0/month |
| Stripe Checkout | $0/month, ~2.9% + 30&cent; per successful charge |
| Stripe Billing (subscriptions) | $0/month, additional 0.5% per recurring charge above standard fees |
| Stripe Tax | 0.5% per Stripe Tax-calculated transaction |
| Vercel Hobby | $0/month within Hobby limits |
| Domain | Whatever you pay your registrar |

**Total fixed monthly cost: $0.** All transaction fees are taken out of the customer payment, not billed to you separately.
