import Footer from "components/layout/footer";
import Link from "next/link";

export const metadata = {
  title: "Reservation confirmed",
  description:
    "Your Wellness Boxer reservation has been received and processed by Stripe. Look out for fulfilment updates as the September 2026 launch approaches.",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <>
      <main className="bg-sand-50">
        <section className="mx-auto flex max-w-3xl flex-col items-start px-6 py-24 md:py-32 lg:px-10">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
            Reservation confirmed
          </p>
          <h1 className="font-display mt-4 text-4xl leading-tight text-ink-900 md:text-5xl">
            You&rsquo;re on the September 2026 launch list.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-700">
            Stripe has received your reservation and emailed you a receipt.
            We will email you with production updates and your fulfilment
            window in the weeks leading up to launch. If you reserved a
            subscription, you can manage it any time from the billing portal
            link in your receipt email.
          </p>

          {session_id ? (
            <p className="mt-6 text-xs tracking-wider text-sage-700 uppercase">
              Reference: <span className="text-ink-700 normal-case">{session_id}</span>
            </p>
          ) : null}

          <div className="mt-10 flex gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-sage-800 px-7 py-3.5 text-sm font-medium text-sand-50 transition hover:bg-sage-900"
            >
              Back to the site
            </Link>
            <Link
              href="/science"
              className="inline-flex items-center justify-center rounded-full border border-sage-300 px-7 py-3.5 text-sm font-medium text-sage-900 transition hover:bg-sage-100"
            >
              Read the science
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
