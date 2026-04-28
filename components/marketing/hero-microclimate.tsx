import Image from "next/image";
import Link from "next/link";

export function HeroMicroclimate() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-sand-50 via-sand-50 to-sage-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-12 pb-20 md:grid-cols-12 md:gap-8 md:pt-20 lg:gap-12 lg:px-10 lg:pt-28 lg:pb-32">
        <div className="md:col-span-5 lg:col-span-5 lg:pt-8">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
            Pelvic wellness, engineered.
          </p>
          <h1 className="font-display mt-6 text-4xl leading-[1.05] text-ink-900 sm:text-5xl lg:text-6xl">
            The boxer designed
            <span className="block text-sage-700">around your microclimate.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-700 lg:text-lg">
            A 3D-engineered overlap fly. A skin-safe tunnel waistband. Roica
            <span className="align-super text-[0.6em]">&trade;</span>{" "}
            V550 biodegradable stretch in 95% organic cotton poplin. Built to
            keep you cooler{" "}
            <span className="font-medium text-ink-900">by 0.7&deg;C</span>{" "}
            where it matters.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#bundles"
              prefetch={true}
              className="inline-flex items-center justify-center rounded-full bg-sage-800 px-7 py-3.5 text-sm font-medium text-sand-50 transition hover:bg-sage-900"
            >
              Reserve the 3-Pack
            </Link>
            <Link
              href="#clinical-proof"
              prefetch={true}
              className="inline-flex items-center justify-center rounded-full border border-sage-300 px-7 py-3.5 text-sm font-medium text-sage-900 transition hover:bg-sage-100"
            >
              See the science
            </Link>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-sage-200 pt-8 text-sm">
            <div>
              <dt className="text-xs tracking-wider text-sage-700 uppercase">
                Cooling
              </dt>
              <dd className="font-display mt-1 text-2xl text-ink-900">
                0.7&deg;C
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wider text-sage-700 uppercase">
                Polyester
              </dt>
              <dd className="font-display mt-1 text-2xl text-ink-900">0%</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wider text-sage-700 uppercase">
                Made in
              </dt>
              <dd className="font-display mt-1 text-2xl text-ink-900">
                Portugal
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-7 lg:col-span-7">
          <div className="shadow-sanctuary-lg relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-white ring-1 ring-sage-100">
            <Image
              src="/images/airflow-channels.png"
              alt="Wellness Boxer airflow channels and 3D-engineered overlap fly"
              fill
              priority
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-xs tracking-wider text-sage-700 uppercase">
            Visualization &mdash; airflow channels through the engineered fly.
          </p>
        </div>
      </div>
    </section>
  );
}
