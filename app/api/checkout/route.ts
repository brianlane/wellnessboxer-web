import { getProduct } from "lib/products";
import { getStripe, isStripeConfigured } from "lib/stripe";
import { baseUrl } from "lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "stripe_not_configured",
        message:
          "Stripe is not yet configured for this site. See docs/STRIPE_SETUP.md.",
      },
      { status: 503 },
    );
  }

  let handle: string | undefined;
  let quantity = 1;
  try {
    const body = (await request.json()) as {
      handle?: string;
      quantity?: number;
    };
    handle = body.handle;
    quantity = Math.max(1, Math.min(10, Number(body.quantity ?? 1)));
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_body" },
      { status: 400 },
    );
  }

  const product = handle ? getProduct(handle) : undefined;
  if (!product) {
    return NextResponse.json(
      { ok: false, error: "unknown_product", handle },
      { status: 404 },
    );
  }

  const priceId = process.env[product.priceEnvKey];
  if (!priceId) {
    return NextResponse.json(
      {
        ok: false,
        error: "missing_price",
        message: `${product.priceEnvKey} is not set. See docs/STRIPE_SETUP.md.`,
      },
      { status: 500 },
    );
  }

  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: product.kind === "subscription" ? "subscription" : "payment",
      line_items: [
        {
          price: priceId,
          quantity: product.kind === "subscription" ? 1 : quantity,
        },
      ],
      allow_promotion_codes: true,
      automatic_tax: { enabled: true },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "IE",
          "DE",
          "FR",
          "NL",
          "BE",
          "ES",
          "IT",
          "PT",
          "SE",
          "DK",
          "NO",
          "FI",
          "AU",
          "NZ",
          "JP",
          "SG",
        ],
      },
      phone_number_collection: { enabled: false },
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel?handle=${product.handle}`,
      metadata: {
        product_handle: product.handle,
        product_kind: product.kind,
      },
      ...(product.kind === "subscription"
        ? {
            subscription_data: {
              metadata: { product_handle: product.handle },
            },
          }
        : {}),
    });

    return NextResponse.json({ ok: true, url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[checkout] failed to create session", message);
    return NextResponse.json(
      { ok: false, error: "stripe_error", message },
      { status: 500 },
    );
  }
}
