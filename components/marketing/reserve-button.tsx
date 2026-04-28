"use client";

import { useState, useTransition } from "react";

type Variant = "primary" | "inverse" | "outline";

const STYLES: Record<Variant, string> = {
  primary:
    "bg-sage-800 text-sand-50 hover:bg-sage-900",
  inverse:
    "bg-sand-50 text-sage-900 hover:bg-sand-100",
  outline:
    "border border-sage-300 bg-transparent text-sage-900 hover:bg-sage-100",
};

export function ReserveButton({
  handle,
  label,
  variant = "primary",
  block = false,
}: {
  handle: string;
  label: string;
  variant?: Variant;
  block?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            setError(null);
            try {
              const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ handle }),
              });
              const data = (await res.json()) as {
                ok: boolean;
                url?: string;
                message?: string;
                error?: string;
              };
              if (!res.ok || !data.url) {
                throw new Error(
                  data.message ||
                    data.error ||
                    "Checkout is not ready yet. Please try again shortly."
                );
              }
              window.location.assign(data.url);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Something went wrong.");
            }
          })
        }
        className={[
          "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium transition disabled:opacity-60",
          block ? "w-full" : "",
          STYLES[variant],
        ].join(" ")}
      >
        {pending ? "Connecting to Stripe\u2026" : label}
      </button>
      {error ? (
        <p className="mt-3 text-xs leading-relaxed text-clay-700">{error}</p>
      ) : null}
    </>
  );
}
