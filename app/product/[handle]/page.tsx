import Footer from "components/layout/footer";
import { ReserveButton } from "components/marketing/reserve-button";
import { getProduct, products } from "lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/product/${product.handle}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return notFound();

  return (
    <>
      <article className="bg-sand-50 pb-20 md:pb-28">
        <header className="border-b border-sage-100 bg-gradient-to-b from-sand-50 to-sage-50 px-6 py-12 lg:px-10">
          <div className="mx-auto flex max-w-6xl items-center gap-3 text-xs tracking-[0.22em] text-sage-700 uppercase">
            <Link href="/" className="hover:text-sage-900">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span>{product.name}</span>
          </div>
        </header>

        <div className="mx-auto mt-12 grid max-w-6xl gap-10 px-6 md:grid-cols-12 lg:gap-12 lg:px-10">
          <div className="md:col-span-7">
            <div className="shadow-sanctuary-lg relative aspect-[16/12] w-full overflow-hidden rounded-3xl bg-white ring-1 ring-sage-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-5">
            {product.badge ? (
              <span className="inline-flex rounded-full bg-sage-900 px-3 py-1 text-[10px] font-medium tracking-wider text-sand-50 uppercase">
                {product.badge}
              </span>
            ) : null}
            <h1 className="font-display mt-4 text-4xl leading-tight text-ink-900 md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-base text-sage-700">{product.tagline}</p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-5xl text-ink-900">
                {product.displayPrice}
              </span>
              <span className="text-sm text-ink-700">/ {product.displayUnit}</span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-ink-700">
              {product.description}
            </p>

            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {product.perks.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden className="mt-1 select-none text-sage-700">
                    &mdash;
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <ReserveButton
                handle={product.handle}
                label={`Reserve ${product.name}`}
                block
              />
              <p className="mt-4 text-xs leading-relaxed text-sage-700">
                Reservations are processed securely through Stripe. You will
                be charged at checkout. Cancel any time before September 2026
                fulfilment for a full refund. Subscriptions can be paused or
                cancelled from your billing portal.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-sage-100 pt-8 text-sm">
              <div>
                <dt className="text-xs tracking-wider text-sage-700 uppercase">
                  Material
                </dt>
                <dd className="mt-1 text-ink-900">95% organic cotton, 5% Roica&trade; V550</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wider text-sage-700 uppercase">
                  Made in
                </dt>
                <dd className="mt-1 text-ink-900">Barcelos, Portugal</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wider text-sage-700 uppercase">
                  Certifications
                </dt>
                <dd className="mt-1 text-ink-900">OEKO-TEX&reg; Standard 100</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wider text-sage-700 uppercase">
                  Ships
                </dt>
                <dd className="mt-1 text-ink-900">September 2026</dd>
              </div>
            </dl>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
