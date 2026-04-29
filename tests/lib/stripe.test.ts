import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ORIGINAL_KEY = process.env.STRIPE_SECRET_KEY;

const stripeCtor = vi.hoisted(() =>
  vi.fn(function StripeStub(this: { __key: string }, key: string) {
    this.__key = key;
  }),
);

vi.mock("stripe", () => ({
  __esModule: true,
  default: stripeCtor,
}));

async function freshStripeModule() {
  vi.resetModules();
  return import("lib/stripe");
}

describe("lib/stripe", () => {
  beforeEach(() => {
    stripeCtor.mockClear();
  });

  afterEach(() => {
    if (ORIGINAL_KEY === undefined) {
      delete process.env.STRIPE_SECRET_KEY;
    } else {
      process.env.STRIPE_SECRET_KEY = ORIGINAL_KEY;
    }
  });

  it("isStripeConfigured reports true when STRIPE_SECRET_KEY is set", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_123";
    const { isStripeConfigured } = await freshStripeModule();
    expect(isStripeConfigured()).toBe(true);
  });

  it("isStripeConfigured reports false when STRIPE_SECRET_KEY is missing", async () => {
    delete process.env.STRIPE_SECRET_KEY;
    const { isStripeConfigured } = await freshStripeModule();
    expect(isStripeConfigured()).toBe(false);
  });

  it("getStripe throws a helpful error when STRIPE_SECRET_KEY is missing", async () => {
    delete process.env.STRIPE_SECRET_KEY;
    const { getStripe } = await freshStripeModule();
    expect(() => getStripe()).toThrowError(/STRIPE_SECRET_KEY is not set/);
  });

  it("getStripe constructs a Stripe client and caches it across calls", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_abc";
    const { getStripe } = await freshStripeModule();
    const a = getStripe();
    const b = getStripe();
    expect(a).toBe(b);
    // Constructor only invoked once thanks to the lazy singleton cache.
    expect(stripeCtor).toHaveBeenCalledTimes(1);
    expect(stripeCtor).toHaveBeenCalledWith(
      "sk_test_abc",
      expect.objectContaining({
        appInfo: expect.objectContaining({
          name: "wellnessboxer-web",
        }),
      }),
    );
  });
});
