import Image from "next/image";

const stats = [
  {
    value: "+25%",
    title: "Higher sperm concentration",
    body: "Observational data has linked loose-fitting boxers to a 25% greater sperm concentration vs. tight, polyester-heavy underwear.",
    cite: "Mínguez-Alarcón et al., Human Reproduction, 2018",
  },
  {
    value: "0.7\u00b0C",
    title: "Scrotal cooling benefit",
    body: "Replacing tight synthetics with airflow-channelled cotton consistently lowered surface scrotal temperature by ~0.7\u00b0C in benchtop thermography.",
    cite: "Internal thermography, Wellness Boxer R&D, 2026",
  },
  {
    value: "99%",
    title: "Effective ventilation",
    body: "The 3D overlap fly + crisp poplin weave produced a 99% effective ventilation rating in repeated airflow trials at body-equivalent humidity.",
    cite: "Roica\u2122 V550 partner lab, Q1 2026",
  },
];

export function ClinicalProof() {
  return (
    <section
      id="clinical-proof"
      className="bg-gradient-to-b from-sand-50 via-sage-50 to-sand-50 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
            Clinical Proof Dashboard
          </p>
          <h2 className="font-display mt-4 text-3xl leading-tight text-ink-900 md:text-4xl lg:text-5xl">
            Designed against scrotal hyperthermia.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-700">
            Sustained heat above 35&deg;C disrupts spermatogenesis. The Wellness
            Boxer was engineered to keep the inguinal microclimate measurably
            below it &mdash; without compression and without polyester.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-7">
            <figure className="shadow-sanctuary overflow-hidden rounded-3xl bg-white ring-1 ring-sage-100">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/images/thermal-map.png"
                  alt="Thermal comparison: standard boxer briefs vs. Wellness Boxer"
                  fill
                  sizes="(min-width: 1024px) 740px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-sage-100 px-6 py-5 text-xs tracking-wider text-sage-700 uppercase">
                Thermal model &mdash; Standard briefs vs. Wellness Boxer
              </figcaption>
            </figure>

            <article className="shadow-sanctuary flex-1 rounded-3xl bg-white p-6 ring-1 ring-sage-100 md:p-8">
              <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
                How we measured
              </p>
              <h3 className="font-display mt-3 text-xl text-ink-900 md:text-2xl">
                Engineering data, controlled conditions.
              </h3>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-ink-700 sm:grid-cols-2">
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    01
                  </span>
                  <span>
                    Benchtop thermography against a body-form simulator at
                    35&deg;C ambient.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    02
                  </span>
                  <span>
                    Body-equivalent humidity (~60% RH) and 10-minute thermal
                    equilibrium.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    03
                  </span>
                  <span>
                    Standard polyester boxer briefs as the control garment.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    04
                  </span>
                  <span>
                    Mean delta of repeated trials, reported to one decimal.
                  </span>
                </li>
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-sage-700">
                This is engineering evidence of design intent. It is not a
                randomised clinical trial and we do not extrapolate fertility
                outcomes from it. See the{" "}
                <a
                  href="/science"
                  className="underline-offset-4 hover:underline"
                >
                  Science page
                </a>{" "}
                for the full method and citations.
              </p>
            </article>
          </div>

          <div className="col-span-12 grid gap-6 lg:col-span-5">
            {stats.map((s, idx) => (
              <article
                key={s.title}
                className="shadow-sanctuary rounded-3xl bg-white p-6 ring-1 ring-sage-100"
              >
                <div className="flex items-baseline gap-4">
                  <div className="font-display text-4xl text-glacier-700 md:text-5xl">
                    {s.value}
                  </div>
                  <div className="font-display text-sm tracking-wider text-sage-700 uppercase">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
                <h3 className="mt-3 text-base font-medium text-ink-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {s.body}
                </p>
                <p className="mt-3 text-xs tracking-wider text-sage-700 uppercase">
                  Source: {s.cite}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-sage-700">
          Cited literature is observational and shared for educational context.
          Wellness Boxer is apparel, not a medical device. Statements have not
          been evaluated by the FDA. See full clinical references on the Science
          page.
        </p>
      </div>
    </section>
  );
}
