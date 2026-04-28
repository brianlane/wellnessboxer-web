import { getStripe, isStripeConfigured } from "lib/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ ok: false, error: "stripe_not_configured" }, { status: 503 });
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ ok: false, error: "webhook_secret_missing" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ ok: false, error: "no_signature" }, { status: 400 });
  }

  const stripe = getStripe();
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[stripe-webhook] signature verification failed", message);
    return NextResponse.json({ ok: false, error: "bad_signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const handle = session.metadata?.product_handle ?? "unknown";
      const email = session.customer_details?.email ?? "(no email)";
      console.log(
        `[stripe-webhook] checkout.session.completed handle=${handle} email=${email} session=${session.id}`,
      );
      // TODO: when fulfilment kicks off (Q3 2026), forward this to the
      // fulfilment provider (Shipbob / EasyPost / etc) here. Until then,
      // logging gives us an audit trail in Vercel runtime logs.
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      console.log(
        `[stripe-webhook] ${event.type} sub=${sub.id} status=${sub.status} customer=${sub.customer}`,
      );
      break;
    }
    default:
      // Ignore other events for now; Stripe retries any unacknowledged ones.
      break;
  }

  return NextResponse.json({ ok: true });
}
