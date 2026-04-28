import Image from "next/image";

export function CraftedInBarcelos() {
  return (
    <section className="bg-sage-900 py-20 text-sand-50 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 lg:gap-12 lg:px-10">
        <div className="md:col-span-5 lg:col-span-5">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-200 uppercase">
            Crafted in Portugal
          </p>
          <h2 className="font-display mt-4 text-3xl leading-tight md:text-4xl lg:text-5xl">
            Barcelos textile hub. Premium quality, ethical labor.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-sand-100/90">
            Each pair is cut and sewn in our Porto-area facility on the same
            high-precision lines used by leading European wellness apparel
            brands. Roica&trade; V550 bio-stretch is integrated through a
            documented seam protocol &mdash; no logo print, no plastic tags,
            no animal-derived adhesives.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6">
            <div>
              <dt className="text-xs tracking-wider text-sage-200 uppercase">
                Production
              </dt>
              <dd className="font-display mt-2 text-2xl">Barcelos, PT</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wider text-sage-200 uppercase">
                Audit
              </dt>
              <dd className="font-display mt-2 text-2xl">SMETA 4-Pillar</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wider text-sage-200 uppercase">
                Certifications
              </dt>
              <dd className="mt-2 text-sm text-sand-100/90">
                OEKO-TEX&reg; Standard 100, Roica&trade; V550 Bio-Stretch
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wider text-sage-200 uppercase">
                QC
              </dt>
              <dd className="mt-2 text-sm text-sand-100/90">
                100% inspected, automated cutting + manual seam validation
              </dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-7 lg:col-span-7">
          <div className="shadow-sanctuary-lg relative aspect-[16/10] w-full overflow-hidden rounded-3xl ring-1 ring-sage-700">
            <Image
              src="/images/barcelos-factory.png"
              alt="High-precision seam at the Barcelos textile hub, Portugal"
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
