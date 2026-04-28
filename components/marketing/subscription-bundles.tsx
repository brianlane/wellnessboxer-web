import Link from "next/link";

type Tier = {
  handle: string;
  name: string;
  badge?: string;
  price: string;
  unit: string;
  perks: string[];
  highlighted?: boolean;
};

const tiers: Tier[] = [
  {
    handle: "wellness-boxer-single",
    name: "The Single",
    price: "$48",
    unit: "one pair",
    perks: [
      "Desert Cool white",
      "Roica\u2122 V550 + 95% organic cotton",
      "Free returns within 30 days",
    ],
  },
  {
    handle: "wellness-boxer-3-pack",
    name: "The 3-Pack",
    badge: "Recommended",
    price: "$128",
    unit: "three pairs",
    perks: [
      "Save 11% vs. single pricing",
      "Priority September fulfilment",
      "Includes washable mesh laundry bag",
    ],
    highlighted: true,
  },
  {
    handle: "wellness-boxer-subscribe",
    name: "Subscribe & Replace",
    price: "$108",
    unit: "every 90 days",
    perks: [
      "Save 15% on every shipment",
      "Skip, pause, or cancel anytime",
      "First shipment ships at launch",
    ],
  },
];

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
            Reservations are charged at fulfilment in September 2026. Cancel
            anytime before shipping. Subscriptions ship from launch and renew
            quarterly.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((t) => (
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
                <span className="font-display text-5xl">{t.price}</span>
                <span
                  className={`text-sm ${t.highlighted ? "text-sand-100/80" : "text-ink-700"}`}
                >
                  / {t.unit}
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

              <Link
                href={`/product/${t.handle}`}
                prefetch={true}
                className={[
                  "mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition",
                  t.highlighted
                    ? "bg-sand-50 text-sage-900 hover:bg-sand-100"
                    : "bg-sage-800 text-sand-50 hover:bg-sage-900",
                ].join(" ")}
              >
                Reserve {t.name}
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-sage-700">
          Pricing reflects launch reservation. Final retail will be confirmed
          ahead of fulfilment. Subscription requires Shopify Subscriptions to
          be enabled in the connected store; in the meantime,
          &ldquo;Subscribe&rdquo; reservations are recorded as a single
          launch shipment with a follow-up email to opt-in.
        </p>
      </div>
    </section>
  );
}
