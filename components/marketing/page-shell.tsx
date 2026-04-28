import { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-sand-50 pb-20 md:pb-28">
      <header className="border-b border-sage-100 bg-gradient-to-b from-sand-50 to-sage-50 px-6 py-16 md:py-24 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
            {eyebrow}
          </p>
          <h1 className="font-display mt-4 text-4xl leading-tight text-ink-900 md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-700 md:text-lg">
              {intro}
            </p>
          ) : null}
        </div>
      </header>

      <div className="mx-auto mt-16 max-w-4xl px-6 lg:px-10">
        <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-ink-900 prose-p:text-ink-700 prose-a:text-sage-700 hover:prose-a:text-sage-900 prose-strong:text-ink-900 prose-li:text-ink-700">
          {children}
        </div>
      </div>
    </article>
  );
}
