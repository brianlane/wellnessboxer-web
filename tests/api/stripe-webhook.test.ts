import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const webhookMocks = vi.hoisted(() => ({
  isStripeConfigured: vi.fn(),
  constructEvent: vi.fn(),
}));

vi.mock("lib/stripe", () => ({
  isStripeConfigured: webhookMocks.isStripeConfigured,
  getStripe: () => ({
    webhooks: { constructEvent: webhookMocks.constructEvent },
  }),
}));

const ORIGINAL_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

async function loadRoute() {
  vi.resetModules();
  return import("app/api/stripe/webhook/route");
}

function makeReq(body: string, signature: string | null) {
  const headers: Record<string, string> = {};
  if (signature !== null) headers["stripe-signature"] = signature;
  return new Request("http://localhost/api/stripe/webhook", {
    method: "POST",
    body,
    headers,
  });
}

describe("POST /api/stripe/webhook", () => {
  beforeEach(() => {
    webhookMocks.isStripeConfigured.mockReset();
    webhookMocks.constructEvent.mockReset();
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    if (ORIGINAL_SECRET === undefined) {
      delete process.env.STRIPE_WEBHOOK_SECRET;
    } else {
      process.env.STRIPE_WEBHOOK_SECRET = ORIGINAL_SECRET;
    }
    vi.restoreAllMocks();
  });

  it("returns 503 when Stripe is not configured", async () => {
    webhookMocks.isStripeConfigured.mockReturnValue(false);
    const { POST } = await loadRoute();
    const res = await POST(makeReq("{}", "sig_test"));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({
      ok: false,
      error: "stripe_not_configured",
    });
  });

  it("returns 500 when STRIPE_WEBHOOK_SECRET is missing", async () => {
    webhookMocks.isStripeConfigured.mockReturnValue(true);
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const { POST } = await loadRoute();
    const res = await POST(makeReq("{}", "sig_test"));
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({
      ok: false,
      error: "webhook_secret_missing",
    });
    expect(err).toHaveBeenCalled();
  });

  it("returns 400 when stripe-signature header is missing", async () => {
    webhookMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    const { POST } = await loadRoute();
    const res = await POST(makeReq("{}", null));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "no_signature" });
  });

  it("returns 400 bad_signature when constructEvent throws (Error)", async () => {
    webhookMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    webhookMocks.constructEvent.mockImplementation(() => {
      throw new Error("invalid sig");
    });
    const { POST } = await loadRoute();
    const res = await POST(makeReq("{}", "sig_bad"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "bad_signature" });
  });

  it("returns 400 bad_signature with 'unknown' when non-Error is thrown", async () => {
    webhookMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    webhookMocks.constructEvent.mockImplementation(() => {
      throw "boom";
    });
    const { POST } = await loadRoute();
    const res = await POST(makeReq("{}", "sig_bad"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "bad_signature" });
  });

  it("logs and acks a checkout.session.completed event", async () => {
    webhookMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    webhookMocks.constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_test_x",
          metadata: { product_handle: "wellness-boxer-3-pack" },
          customer_details: { email: "buyer@example.com" },
        },
      },
    });
    const { POST } = await loadRoute();
    const res = await POST(makeReq('{"id":"x"}', "sig"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(
      log.mock.calls.some((c) =>
        String(c[0]).includes("checkout.session.completed"),
      ),
    ).toBe(true);
  });

  it("falls back to 'unknown' / '(no email)' when checkout metadata is absent", async () => {
    webhookMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    webhookMocks.constructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: { id: "cs_no_meta" },
      },
    });
    const { POST } = await loadRoute();
    const res = await POST(makeReq("{}", "sig"));
    expect(res.status).toBe(200);
    const message = String(log.mock.calls.at(-1)?.[0] ?? "");
    expect(message).toContain("handle=unknown");
    expect(message).toContain("email=(no email)");
  });

  it.each([
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
  ])("logs and acks the subscription event %s", async (type) => {
    webhookMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    webhookMocks.constructEvent.mockReturnValue({
      type,
      data: {
        object: {
          id: `sub_${type}`,
          status: "active",
          customer: "cus_test",
        },
      },
    });
    const { POST } = await loadRoute();
    const res = await POST(makeReq("{}", "sig"));
    expect(res.status).toBe(200);
    expect(log.mock.calls.some((c) => String(c[0]).includes(type))).toBe(true);
  });

  it("acks unhandled event types via the default branch", async () => {
    webhookMocks.isStripeConfigured.mockReturnValue(true);
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    webhookMocks.constructEvent.mockReturnValue({
      type: "ping",
      data: { object: {} },
    });
    const { POST } = await loadRoute();
    const res = await POST(makeReq("{}", "sig"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
