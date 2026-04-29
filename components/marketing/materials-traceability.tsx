import Image from "next/image";

export function MaterialsTraceability() {
  return (
    <section id="materials" className="bg-sand-50 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
            Material Traceability
          </p>
          <h2 className="font-display mt-4 text-3xl leading-tight text-ink-900 md:text-4xl lg:text-5xl">
            Two materials. Verified to the fibre.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="shadow-sanctuary overflow-hidden rounded-3xl bg-white ring-1 ring-sage-100">
            <div className="relative aspect-[16/11] w-full">
              <Image
                src="/images/tunnel-waistband.png"
                alt="Skin-Safe Tunnel Waistband: 0% synthetic contact against skin"
                fill
                sizes="(min-width: 768px) 540px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
                Tunnel Waistband
              </p>
              <h3 className="font-display mt-3 text-2xl text-ink-900">
                Skin-safe by construction.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-700">
                The Roica&trade; V550 elastic core runs inside a fabric-encased
                tunnel of organic cotton. There is no rubber, no logo print, and
                no synthetic surface against your skin &mdash; even where the
                band sits all day.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-700">
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    &mdash;
                  </span>{" "}
                  0% synthetic contact at the iliac crest
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    &mdash;
                  </span>{" "}
                  Roica&trade; V550 core, biodegradable elastane
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    &mdash;
                  </span>{" "}
                  95/5 organic cotton blend woven sleeve
                </li>
              </ul>
            </div>
          </article>

          <article className="shadow-sanctuary overflow-hidden rounded-3xl bg-white ring-1 ring-sage-100">
            <div className="relative aspect-[16/11] w-full">
              <Image
                src="/images/poplin-weave.png"
                alt="Crisp woven poplin: 95% organic cotton with Roica V550 elastic"
                fill
                sizes="(min-width: 768px) 540px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
                The Poplin Weave
              </p>
              <h3 className="font-display mt-3 text-2xl text-ink-900">
                Crisp, dry, and structured.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink-700">
                A 95% organic cotton crisp poplin paired with 5% Roica&trade;
                V550 elastane. The structured weave creates the airflow channels
                you saw above, without the cling of jersey.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-700">
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    &mdash;
                  </span>{" "}
                  OEKO-TEX&reg; Standard 100 verified
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    &mdash;
                  </span>{" "}
                  GOTS-eligible organic cotton supply
                </li>
                <li className="flex gap-3">
                  <span aria-hidden className="text-sage-700">
                    &mdash;
                  </span>{" "}
                  Marine + sludge biodegradation verified for the V550 core
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
