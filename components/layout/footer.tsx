import { WaitlistForm } from "components/layout/waitlist-form";
import Image from "next/image";
import Link from "next/link";

const certs = [
  "OEKO-TEX\u00ae Standard 100",
  "Roica\u2122 V550 Biodegradable",
  "Made in Portugal",
  "GOTS-eligible cotton",
];

const navColumns: Array<{
  heading: string;
  links: Array<{ label: string; href: string }>;
}> = [
  {
    heading: "Shop",
    links: [
      { label: "The 3-Pack", href: "/product/wellness-boxer-3-pack" },
      { label: "Single Pair", href: "/product/wellness-boxer-single" },
      {
        label: "Subscribe & Replace",
        href: "/product/wellness-boxer-subscribe",
      },
      { label: "Reservations FAQ", href: "/about#faq" },
    ],
  },
  {
    heading: "Science",
    links: [
      { label: "Clinical references", href: "/science" },
      { label: "Material traceability", href: "/materials" },
      { label: "Triple Zero Standard", href: "/#standard" },
      { label: "Active recovery", href: "/#recovery" },
    ],
  },
  {
    heading: "Brand",
    links: [
      { label: "About", href: "/about" },
      { label: "Made in Barcelos", href: "/about#barcelos" },
      { label: "Contact", href: "mailto:hello@wellnessboxer.com" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Medical disclaimer", href: "/legal/disclaimer" },
      { label: "Shipping & returns", href: "/legal/terms#shipping" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-sage-900 text-sand-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/wellness-boxer-logo.png"
                alt=""
                width={48}
                height={48}
                className="h-11 w-11 rounded-full bg-sand-50/95 p-0.5 ring-1 ring-sage-700"
              />
              <span className="font-display text-2xl tracking-[0.2em] text-sand-50 uppercase">
                Wellness <span className="text-sage-300">Boxer</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-sand-100/85">
              Reservations open for the September 2026 drop. Join the list for
              production updates, limited Desert Cool restocks, and Roica&trade;
              V550 bio-stretch certifications as they finalise.
            </p>
            <WaitlistForm />
          </div>

          <nav
            aria-label="Footer"
            className="md:col-span-7 md:grid md:grid-cols-4 md:gap-6"
          >
            {navColumns.map((col) => (
              <div key={col.heading} className="mb-8 md:mb-0">
                <h3 className="text-xs font-medium tracking-[0.22em] text-sage-200 uppercase">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-sand-100/90">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="transition-colors hover:text-sand-50"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-sage-700 pt-8">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-200 uppercase">
            Certifications
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {certs.map((c) => (
              <li
                key={c}
                className="rounded-full border border-sage-700 bg-sage-800 px-4 py-1.5 text-xs text-sand-100"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-sage-700 bg-sage-800/60 p-6 text-xs leading-relaxed text-sand-100/85">
          <p>
            <span className="font-medium text-sand-50">
              Medical disclaimer.
            </span>{" "}
            These statements have not been evaluated by the U.S. Food and Drug
            Administration. The Wellness Boxer is apparel and is not intended to
            diagnose, treat, cure, or prevent any disease, including
            infertility. Consult a qualified physician before making changes to
            your reproductive health regimen. Cited research is shared for
            educational context and does not constitute a clinical claim about
            this product.
          </p>
          <p className="mt-3">
            Roica&trade; is a trademark of Asahi Kasei Corporation.
            OEKO-TEX&reg; is a registered trademark of OEKO-TEX Service GmbH.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-sage-700 pt-6 text-xs text-sand-100/70 md:flex-row md:items-center">
          <p>&copy; {currentYear} Wellness Boxer. All rights reserved.</p>
          <p>Crafted in Barcelos, Portugal &middot; Distributed globally</p>
        </div>
      </div>
    </footer>
  );
}
