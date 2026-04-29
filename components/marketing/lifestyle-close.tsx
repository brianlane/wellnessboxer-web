import Image from "next/image";

export function LifestyleClose() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 text-sand-50 md:py-28">
      <div className="absolute inset-0">
        <Image
          src="/images/desert-cool-lifestyle.png"
          alt="Wellness Boxer in Phoenix, AZ at 110\u00b0F"
          fill
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 via-ink-900/40 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="text-xs font-medium tracking-[0.22em] text-sand-200 uppercase">
            Designed for desert cool
          </p>
          <h2 className="font-display mt-4 text-3xl leading-tight md:text-4xl lg:text-5xl">
            Engineered for 110&deg;F in Phoenix.
            <span className="block text-sand-200">Earned for any climate.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-sand-100/90">
            We tested in the conditions that make conventional underwear fail:
            high heat, low humidity, long sit-time. The Wellness Boxer kept its
            airflow and kept its shape.
          </p>
        </div>
      </div>
    </section>
  );
}
