import Stripe from "stripe";

function createStripe(key: string) {
  return new Stripe(key, {
    appInfo: {
      name: "wellnessboxer-web",
      url: "https://www.wellnessboxer.com",
    },
  });
}

let cached: ReturnType<typeof createStripe> | null = null;

// Lazy singleton so a missing key doesn't crash builds. Only the
// checkout / webhook routes actually require Stripe at request time.
export function getStripe() {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it in Vercel project settings or .env.local. See docs/STRIPE_SETUP.md.",
    );
  }
  cached = createStripe(key);
  return cached;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
