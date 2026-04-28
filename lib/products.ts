// Static catalog. Source of truth for the marketing site.
// Stripe is the single source of truth for *price* (the Price ID below
// resolves the actual amount, currency, and recurring schedule at
// checkout). Display prices here are for the marketing UI only and are
// kept in sync manually with the Stripe dashboard.

export type ProductKind = "one_time" | "subscription";

export type Product = {
  handle: string;
  name: string;
  tagline: string;
  description: string;
  badge?: string;
  highlighted?: boolean;
  kind: ProductKind;
  // Display price for the marketing UI. Stripe's price object is
  // authoritative at checkout time.
  displayPrice: string;
  displayUnit: string;
  perks: string[];
  image: string;
  // Env var name that holds the corresponding Stripe Price ID.
  // Resolved server-side by app/api/checkout.
  priceEnvKey:
    | "STRIPE_PRICE_SINGLE"
    | "STRIPE_PRICE_3PACK"
    | "STRIPE_PRICE_SUBSCRIBE";
};

export const products: Product[] = [
  {
    handle: "wellness-boxer-single",
    name: "The Single",
    tagline: "One pair. The launch standard.",
    kind: "one_time",
    displayPrice: "$48",
    displayUnit: "one pair",
    description:
      "A single Wellness Boxer in the Desert Cool white colourway. Roica\u2122 V550 + 95% organic cotton poplin, fabric-encased tunnel waistband, no buttons, no synthetic surface against skin.",
    perks: [
      "Desert Cool white",
      "Roica\u2122 V550 + 95% organic cotton",
      "Free returns within 30 days of unworn product",
    ],
    image: "/images/airflow-channels.png",
    priceEnvKey: "STRIPE_PRICE_SINGLE",
  },
  {
    handle: "wellness-boxer-3-pack",
    name: "The 3-Pack",
    tagline: "Save 11%. Priority September fulfilment.",
    badge: "Recommended",
    highlighted: true,
    kind: "one_time",
    displayPrice: "$128",
    displayUnit: "three pairs",
    description:
      "Three pairs of the Wellness Boxer, packaged with a washable mesh laundry bag. Reservations are charged at fulfilment in September 2026 and ship before single-pair orders.",
    perks: [
      "Three pairs (Desert Cool white)",
      "Save 11% vs. single pricing",
      "Priority September fulfilment",
      "Includes washable mesh laundry bag",
    ],
    image: "/images/poplin-weave.png",
    priceEnvKey: "STRIPE_PRICE_3PACK",
  },
  {
    handle: "wellness-boxer-subscribe",
    name: "Subscribe & Replace",
    tagline: "Save 15%. Skip, pause, or cancel anytime.",
    kind: "subscription",
    displayPrice: "$108",
    displayUnit: "every 90 days",
    description:
      "An auto-renewing 3-pack on a 90-day cadence. Engineered for men who want a clean rotation without thinking about it. Skip, pause, or cancel from your account at any time.",
    perks: [
      "Three pairs every 90 days",
      "Save 15% on every shipment",
      "Skip, pause, or cancel anytime from your account",
      "First shipment ships at launch in September 2026",
    ],
    image: "/images/recovery-locker.png",
    priceEnvKey: "STRIPE_PRICE_SUBSCRIBE",
  },
];

export function getProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}
