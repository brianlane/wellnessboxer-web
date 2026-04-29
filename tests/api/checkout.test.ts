import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const stripeMocks = vi.hoisted(() => ({
  isStripeConfigured: vi.fn(),
  sessionsCreate: vi.fn(),
}));

vi.mock("lib/stripe", () => ({
  isStripeConfigured: stripeMocks.isStripeConfigured,
  getStripe: () => ({
    checkout: { sessions: { create: stripeMocks.sessionsCreate } },
  }),
}));

const ORIGINAL_ENV = {
  STRIPE_PRICE_SINGLE: process.env.STRIPE_PRICE_SINGLE,
  STRIPE_PRICE_3PACK: process.env.STRIPE_PRICE_3PACK,
  STRIPE_PRICE_SUBSCRIBE: process.env.STRIPE_PRICE_SUBSCRIBE,
};

function restoreEnv() {
  for (const [k, v] of Object.entries(ORIGINAL_ENV)) {
    if (v === undefined) {
      delete process.env[k];
    } else {
      process.env[k] = v;
    }
  }
}

async function loadRoute() {
  vi.resetModules();
  return import("app/api/checkout/route");
}

function postBody(body: unknown) {
  return new Request("http://localhost/api/checkout", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/checkout", () => {
  beforeEach(() => {
    stripeMocks.isStripeConfigured.mockReset();
    stripeMocks.sessionsCreate.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    restoreEnv();
    vi.restoreAllMocks();
  });

  it("returns 503 when Stripe is not configured", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(false);
    const { POST } = await loadRoute();
    const res = await POST(postBody({ handle: "wellness-boxer-single" }));
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.error).toBe("stripe_not_configured");
  });

  it("returns 400 when the body is not JSON", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    const { POST } = await loadRoute();
    const res = await POST(postBody("not-json{"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_body" });
  });

  it("returns 404 for an unknown product handle", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    const { POST } = await loadRoute();
    const res = await POST(postBody({ handle: "nope" }));
    expect(res.status).toBe(404);
    const data = await res.json();
    expect(data.error).toBe("unknown_product");
    expect(data.handle).toBe("nope");
  });

  it("returns 404 when no handle is supplied at all", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    const { POST } = await loadRoute();
    const res = await POST(postBody({}));
    expect(res.status).toBe(404);
    expect((await res.json()).error).toBe("unknown_product");
  });

  it("returns 500 missing_price when the Stripe price env is unset", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    delete process.env.STRIPE_PRICE_SINGLE;
    const { POST } = await loadRoute();
    const res = await POST(postBody({ handle: "wellness-boxer-single" }));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("missing_price");
    expect(data.message).toMatch(/STRIPE_PRICE_SINGLE/);
  });

  it("creates a one-time payment Checkout Session for a one_time product", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_PRICE_3PACK = "price_3pack_test";
    stripeMocks.sessionsCreate.mockResolvedValue({
      id: "cs_test_001",
      url: "https://checkout.stripe.com/c/pay/cs_test_001",
    });

    const { POST } = await loadRoute();
    const res = await POST(
      postBody({ handle: "wellness-boxer-3-pack", quantity: 2 }),
    );
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      ok: true,
      url: "https://checkout.stripe.com/c/pay/cs_test_001",
    });

    expect(stripeMocks.sessionsCreate).toHaveBeenCalledTimes(1);
    const arg = stripeMocks.sessionsCreate.mock.calls[0]?.[0] as Record<
      string,
      unknown
    >;
    expect(arg.mode).toBe("payment");
    expect(arg.line_items).toEqual([
      { price: "price_3pack_test", quantity: 2 },
    ]);
    expect(arg).not.toHaveProperty("subscription_data");
    expect(arg.metadata).toMatchObject({
      product_handle: "wellness-boxer-3-pack",
      product_kind: "one_time",
    });
  });

  it("forces quantity=1 and adds subscription_data for a subscription product", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_PRICE_SUBSCRIBE = "price_sub_test";
    stripeMocks.sessionsCreate.mockResolvedValue({
      id: "cs_sub_001",
      url: "https://checkout.stripe.com/c/pay/cs_sub_001",
    });

    const { POST } = await loadRoute();
    const res = await POST(
      postBody({ handle: "wellness-boxer-subscribe", quantity: 9 }),
    );
    expect(res.status).toBe(200);

    const arg = stripeMocks.sessionsCreate.mock.calls[0]?.[0] as Record<
      string,
      unknown
    >;
    expect(arg.mode).toBe("subscription");
    expect(arg.line_items).toEqual([{ price: "price_sub_test", quantity: 1 }]);
    expect(arg.subscription_data).toMatchObject({
      metadata: { product_handle: "wellness-boxer-subscribe" },
    });
  });

  it("clamps absurd quantities into [1, 10]", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_PRICE_SINGLE = "price_single_test";
    stripeMocks.sessionsCreate.mockResolvedValue({
      id: "cs_clamp",
      url: "https://checkout.stripe.com/c/pay/cs_clamp",
    });

    const { POST } = await loadRoute();
    await POST(postBody({ handle: "wellness-boxer-single", quantity: 9999 }));
    const upper = stripeMocks.sessionsCreate.mock.calls.at(-1)?.[0] as Record<
      string,
      unknown
    >;
    expect((upper.line_items as Array<{ quantity: number }>)[0]?.quantity).toBe(
      10,
    );

    await POST(postBody({ handle: "wellness-boxer-single", quantity: -5 }));
    const lower = stripeMocks.sessionsCreate.mock.calls.at(-1)?.[0] as Record<
      string,
      unknown
    >;
    expect((lower.line_items as Array<{ quantity: number }>)[0]?.quantity).toBe(
      1,
    );
  });

  it("defaults quantity to 1 when omitted", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_PRICE_SINGLE = "price_single_test";
    stripeMocks.sessionsCreate.mockResolvedValue({
      id: "cs_d",
      url: "https://checkout.stripe.com/c/pay/cs_d",
    });

    const { POST } = await loadRoute();
    await POST(postBody({ handle: "wellness-boxer-single" }));
    const arg = stripeMocks.sessionsCreate.mock.calls[0]?.[0] as Record<
      string,
      unknown
    >;
    expect((arg.line_items as Array<{ quantity: number }>)[0]?.quantity).toBe(
      1,
    );
  });

  it("returns 500 stripe_error when Stripe rejects the session create", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_PRICE_SINGLE = "price_single_test";
    stripeMocks.sessionsCreate.mockRejectedValue(new Error("boom"));

    const { POST } = await loadRoute();
    const res = await POST(postBody({ handle: "wellness-boxer-single" }));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      ok: false,
      error: "stripe_error",
      message: "boom",
    });
  });

  it("falls back to 'unknown' message on non-Error stripe rejections", async () => {
    stripeMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_PRICE_SINGLE = "price_single_test";
    stripeMocks.sessionsCreate.mockRejectedValue("plain string");

    const { POST } = await loadRoute();
    const res = await POST(postBody({ handle: "wellness-boxer-single" }));
    expect(res.status).toBe(500);
    expect((await res.json()).message).toBe("unknown");
  });
});
