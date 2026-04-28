import { ReserveButton } from "components/marketing/reserve-button";
import { products } from "lib/products";
import Link from "next/link";

export function SubscriptionBundles() {
  return (
    <section
      id="bundles"
      className="bg-sand-50 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
            Reserve a bundle
          </p>
          <h2 className="font-display mt-4 text-3xl leading-tight text-ink-900 md:text-4xl lg:text-5xl">
            Three ways to onboard your microclimate.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-700">
            Reservations are taken securely through Stripe. Cancel any time
            before September 2026 fulfilment for a full refund. Subscriptions
            ship from launch and renew on a 90-day cadence; pause or cancel
            from your billing portal anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((t) => (
            <article
              key={t.handle}
              className={[
                "rounded-3xl p-8 ring-1 transition",
                t.highlighted
                  ? "shadow-sanctuary-lg bg-sage-900 text-sand-50 ring-sage-900"
                  : "shadow-sanctuary bg-white text-ink-900 ring-sage-100",
              ].join(" ")}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3
                  className={`font-display text-2xl ${t.highlighted ? "text-sand-50" : "text-ink-900"}`}
                >
                  {t.name}
                </h3>
                {t.badge ? (
                  <span className="rounded-full bg-sand-50 px-3 py-1 text-[10px] font-medium tracking-wider text-sage-900 uppercase">
                    {t.badge}
                  </span>
                ) : null}
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-5xl">{t.displayPrice}</span>
                <span
                  className={`text-sm ${t.highlighted ? "text-sand-100/80" : "text-ink-700"}`}
                >
                  / {t.displayUnit}
                </span>
              </div>

              <ul
                className={`mt-6 space-y-3 text-sm leading-relaxed ${t.highlighted ? "text-sand-100/90" : "text-ink-700"}`}
              >
                {t.perks.map((perk) => (
                  <li key={perk} className="flex gap-3">
                    <span aria-hidden className="mt-1 select-none">
                      &mdash;
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <ReserveButton
                  handle={t.handle}
                  label={`Reserve ${t.name}`}
                  variant={t.highlighted ? "inverse" : "primary"}
                  block
                />
              </div>

              <p
                className={`mt-4 text-xs leading-relaxed ${t.highlighted ? "text-sand-100/70" : "text-sage-700"}`}
              >
                <Link
                  href={`/product/${t.handle}`}
                  className="underline-offset-4 hover:underline"
                >
                  See the full {t.name} details &rarr;
                </Link>
              </p>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-sage-700">
          Pricing is set in Stripe and may be adjusted ahead of fulfilment.
          The Subscribe &amp; Replace tier requires Stripe Billing to be
          configured; until launch you may also opt-in by reserving a 3-Pack
          and contacting us to convert.
        </p>
      </div>
    </section>
  );
}
