import Image from "next/image";

const phases = [
  {
    month: "June 2026",
    title: "Tech pack & sampling",
    body: "3D-molded pouch refinement, seam-integrity validation, GOTS supply lock-in.",
  },
  {
    month: "July 2026",
    title: "Safety certifications",
    body: "OEKO-TEX\u00ae Standard 100 testing complete, Roica\u2122 V550 bio-stretch verified.",
  },
  {
    month: "August 2026",
    title: "Manufacturing",
    body: "Precision production run at the Porto factory: automated cutting, multi-stage QC.",
  },
  {
    month: "September 2026",
    title: "Global fulfillment",
    body: "Express US/CA shipping, EU hub distribution, APAC orders processed.",
  },
];

export function RoadmapToWellness() {
  return (
    <section className="bg-gradient-to-b from-sand-50 to-sage-50 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-5">
            <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
              Roadmap to launch
            </p>
            <h2 className="font-display mt-4 text-3xl leading-tight text-ink-900 md:text-4xl lg:text-5xl">
              Reserve now. Shipping September 2026.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-700">
              We do not pre-mass-produce. Every reservation is committed
              against an audited Portuguese production window. The 3-Pack
              ships in the Desert Cool white colorway first.
            </p>
          </div>
          <div className="md:col-span-7 lg:col-span-7">
            <div className="shadow-sanctuary relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white ring-1 ring-sage-100">
              <Image
                src="/images/roadmap-2026.png"
                alt="Wellness Boxer 2026 launch roadmap"
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, idx) => (
            <li
              key={p.month}
              className="shadow-sanctuary rounded-2xl bg-white p-6 ring-1 ring-sage-100"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl text-sage-700">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-xs tracking-wider text-sage-700 uppercase">
                  {p.month}
                </span>
              </div>
              <h3 className="font-display mt-3 text-xl text-ink-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
