"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="bg-sand-50">
      <div className="mx-auto my-16 flex max-w-xl flex-col rounded-3xl bg-white p-8 ring-1 ring-sage-100 shadow-sanctuary md:p-12">
        <p className="text-xs font-medium tracking-[0.22em] text-sage-700 uppercase">
          Something went wrong
        </p>
        <h2 className="font-display mt-4 text-3xl text-ink-900">
          We hit a snag.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-700">
          This is likely temporary. Try the action again, or refresh the
          page. If it keeps happening, write to{" "}
          <a
            href="mailto:hello@wellnessboxer.com"
            className="text-sage-700 underline-offset-4 hover:underline"
          >
            hello@wellnessboxer.com
          </a>
          .
        </p>
        <button
          type="button"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-sage-800 px-6 py-3 text-sm font-medium text-sand-50 transition hover:bg-sage-900"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
