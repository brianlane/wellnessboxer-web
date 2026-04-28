import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: string };
    email = (body.email ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!looksValid) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // TODO: wire to Resend / Klaviyo / Shopify Customer API at
  // launch readiness. For now we acknowledge the signup so the
  // marketing site is functional pre-Shopify-store.
  console.log("[waitlist]", new Date().toISOString(), email);

  return NextResponse.json({ ok: true });
}
