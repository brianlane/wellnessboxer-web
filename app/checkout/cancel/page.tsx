import Footer from "components/layout/footer";
import { ReserveButton } from "components/marketing/reserve-button";
import { getProduct } from "lib/products";
import Link from "next/link";

export const metadata = {
  title: "Reservation cancelled",
  description:
    "Your Wellness Boxer reservation was cancelled before payment. Pick up where you left off, or reach out if anything went wrong.",
  robots: { index: false, follow: false },
};

export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ handle?: string }>;
}) {
  const { handle } = await searchParams;
  const product = handle ? getProduct(handle) : undefined;

  return (
    <>
      <main className="bg-sand-50">
        <section className="mx-auto flex max-w-3xl flex-col items-start px-6 py-24 md:py-32 lg:px-10">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
            Checkout cancelled
          </p>
          <h1 className="font-display mt-4 text-4xl leading-tight text-ink-900 md:text-5xl">
            No reservation has been placed.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-700">
            We didn&rsquo;t take any payment and didn&rsquo;t save your
            details. If something went wrong with checkout, write us at{" "}
            <a
              href="mailto:hello@wellnessboxer.com"
              className="text-sage-700 underline-offset-4 hover:underline"
            >
              hello@wellnessboxer.com
            </a>{" "}
            and we&rsquo;ll sort it out.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {product ? (
              <ReserveButton
                handle={product.handle}
                label={`Try again \u2014 ${product.name}`}
              />
            ) : null}
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-sage-300 px-7 py-3.5 text-sm font-medium text-sage-900 transition hover:bg-sage-100"
            >
              Back to the site
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
