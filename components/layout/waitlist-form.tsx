"use client";

import { useState, useTransition } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="mt-5 flex w-full max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(async () => {
          try {
            const res = await fetch("/api/waitlist", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });
            if (!res.ok) throw new Error("non-ok");
            setStatus("ok");
            setEmail("");
          } catch {
            setStatus("error");
          }
        });
      }}
    >
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@domain.com"
        className="flex-1 rounded-full border border-sage-200 bg-white px-5 py-3 text-sm text-ink-900 placeholder-sage-500 outline-none transition focus:border-sage-500"
      />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-full bg-sage-800 px-5 py-3 text-sm font-medium text-sand-50 transition hover:bg-sage-900 disabled:opacity-60"
      >
        {pending ? "Joining..." : "Join the list"}
      </button>
      {status === "ok" ? (
        <p className="basis-full text-xs text-sage-700">
          You&apos;re on the list. Watch your inbox for the September drop.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="basis-full text-xs text-clay-700">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
