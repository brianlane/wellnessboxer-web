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
            Sustained heat above 35&deg;C disrupts spermatogenesis. The
            Wellness Boxer was engineered to keep the inguinal microclimate
            measurably below it &mdash; without compression and without
            polyester.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <figure className="shadow-sanctuary relative col-span-12 overflow-hidden rounded-3xl bg-white ring-1 ring-sage-100 lg:col-span-7">
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
          been evaluated by the FDA. See full clinical references on the
          Science page.
        </p>
      </div>
    </section>
  );
}
