import Image from "next/image";

const moments = [
  {
    title: "Wellness wear",
    when: "Daily, sleep, post-workout cooldown",
    body: "Loose airflow, biodegradable stretch. Optimised for thermoregulation and minimum mechanical contact.",
    pick: "Wellness Boxer (this product)",
  },
  {
    title: "Compression",
    when: "Heavy lifting, contact sport, torsion-risk activity",
    body: "Use a dedicated compression short for athletic torsion protection. Compression is for the gym, not the office.",
    pick: "Not what we make. Use a sport-specific brief.",
  },
];

export function RecoveryRitual() {
  return (
    <section className="bg-sand-50 py-20 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="md:col-span-7 lg:col-span-7">
          <div className="shadow-sanctuary-lg relative aspect-[16/10] w-full overflow-hidden rounded-3xl ring-1 ring-sage-100">
            <Image
              src="/images/recovery-locker.png"
              alt="Active recovery: optimize testicular cooling post-performance"
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-5 lg:col-span-5">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
            Active recovery guide
          </p>
          <h2 className="font-display mt-4 text-3xl leading-tight text-ink-900 md:text-4xl">
            When to wear loose. When to wear tight.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-700">
            Compression is a tool. So is airflow. Both have a place &mdash; but
            they are not interchangeable, and most men spend 90%+ of their day
            in the wrong one.
          </p>

          <div className="mt-8 space-y-4">
            {moments.map((m) => (
              <div
                key={m.title}
                className="shadow-sanctuary rounded-2xl bg-white p-6 ring-1 ring-sage-100"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl text-ink-900">
                    {m.title}
                  </h3>
                  <p className="text-xs tracking-wider text-sage-700 uppercase">
                    {m.when}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">
                  {m.body}
                </p>
                <p className="mt-3 text-xs tracking-wider text-sage-700 uppercase">
                  {m.pick}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
