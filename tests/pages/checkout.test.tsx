import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

import CheckoutSuccessPage, {
  metadata as successMetadata,
} from "app/checkout/success/page";
import CheckoutCancelPage, {
  metadata as cancelMetadata,
} from "app/checkout/cancel/page";

describe("/checkout/success page", () => {
  it("metadata is noindex (private confirmation surface)", () => {
    expect(successMetadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
    expect(successMetadata.title).toBe("Reservation confirmed");
  });

  it("renders the confirmation copy with the session id when provided", async () => {
    const ui = await CheckoutSuccessPage({
      searchParams: Promise.resolve({ session_id: "cs_demo_123" }),
    });
    render(ui);
    expect(
      screen.getByRole("heading", {
        name: /You.*on the September 2026 launch list/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/cs_demo_123/)).toBeInTheDocument();
  });

  it("hides the reference paragraph when session_id is missing", async () => {
    const ui = await CheckoutSuccessPage({
      searchParams: Promise.resolve({}),
    });
    render(ui);
    expect(screen.queryByText(/Reference:/i)).not.toBeInTheDocument();
  });
});

describe("/checkout/cancel page", () => {
  it("metadata is noindex", () => {
    expect(cancelMetadata.robots).toMatchObject({
      index: false,
      follow: false,
    });
    expect(cancelMetadata.title).toBe("Reservation cancelled");
  });

  it("renders a Try-again button when the handle is a known product", async () => {
    const ui = await CheckoutCancelPage({
      searchParams: Promise.resolve({ handle: "wellness-boxer-3-pack" }),
    });
    render(ui);
    expect(
      screen.getByRole("button", { name: /Try again — The 3-Pack/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to the site/i }),
    ).toBeInTheDocument();
  });

  it("omits the Try-again button when the handle is unknown", async () => {
    const ui = await CheckoutCancelPage({
      searchParams: Promise.resolve({ handle: "nope" }),
    });
    render(ui);
    expect(screen.queryByRole("button", { name: /try again/i })).toBeNull();
  });

  it("omits the Try-again button when no handle is supplied", async () => {
    const ui = await CheckoutCancelPage({
      searchParams: Promise.resolve({}),
    });
    render(ui);
    expect(screen.queryByRole("button", { name: /try again/i })).toBeNull();
  });
});
