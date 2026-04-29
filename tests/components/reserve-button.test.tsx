import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { ReserveButton } from "components/marketing/reserve-button";

describe("<ReserveButton />", () => {
  let assignSpy: ReturnType<typeof vi.fn>;
  let originalLocation: Location;

  beforeEach(() => {
    originalLocation = window.location;
    assignSpy = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: {
        ...originalLocation,
        assign: assignSpy,
      } as Location,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
    vi.restoreAllMocks();
  });

  it("renders idle label and primary styling by default", () => {
    render(
      <ReserveButton handle="wellness-boxer-single" label="Reserve Now" />,
    );
    const btn = screen.getByRole("button", { name: "Reserve Now" });
    expect(btn).toBeInTheDocument();
    expect(btn).not.toBeDisabled();
    expect(btn.className).toContain("bg-sage-800");
  });

  it("supports inverse and outline variants and the block layout flag", () => {
    const { container } = render(
      <>
        <ReserveButton handle="a" label="A" variant="inverse" block />
        <ReserveButton handle="b" label="B" variant="outline" />
      </>,
    );
    const buttons = container.querySelectorAll("button");
    const a = buttons[0]!;
    const b = buttons[1]!;
    expect(a.className).toContain("bg-sand-50");
    expect(a.className).toContain("w-full");
    expect(b.className).toContain("border-sage-300");
    expect(b.className).not.toContain("w-full");
  });

  it("calls /api/checkout and redirects to the Stripe URL on success", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(
        new Response(
          JSON.stringify({ ok: true, url: "https://stripe.test/cs_1" }),
          { status: 200 },
        ),
      );

    render(<ReserveButton handle="wellness-boxer-3-pack" label="Reserve" />);
    fireEvent.click(screen.getByRole("button", { name: "Reserve" }));

    await waitFor(() =>
      expect(assignSpy).toHaveBeenCalledWith("https://stripe.test/cs_1"),
    );

    expect(fetchSpy).toHaveBeenCalledWith(
      "/api/checkout",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: "wellness-boxer-3-pack" }),
      }),
    );
  });

  it("shows the server-provided error message when the response is not ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: false,
          error: "missing_price",
          message: "no price",
        }),
        { status: 500 },
      ),
    );

    render(<ReserveButton handle="x" label="Reserve" />);
    fireEvent.click(screen.getByRole("button", { name: "Reserve" }));

    expect(await screen.findByText("no price")).toBeInTheDocument();
    expect(assignSpy).not.toHaveBeenCalled();
  });

  it("falls back to the error code when no message is provided", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ ok: false, error: "stripe_not_configured" }),
        {
          status: 503,
        },
      ),
    );

    render(<ReserveButton handle="x" label="Reserve" />);
    fireEvent.click(screen.getByRole("button", { name: "Reserve" }));

    expect(
      await screen.findByText("stripe_not_configured"),
    ).toBeInTheDocument();
  });

  it("falls back to the generic 'not ready yet' message when the body has no error or url", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );

    render(<ReserveButton handle="x" label="Reserve" />);
    fireEvent.click(screen.getByRole("button", { name: "Reserve" }));

    expect(
      await screen.findByText(/Checkout is not ready yet/i),
    ).toBeInTheDocument();
  });

  it("surfaces network errors as a generic message", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));

    render(<ReserveButton handle="x" label="Reserve" />);
    fireEvent.click(screen.getByRole("button", { name: "Reserve" }));

    expect(await screen.findByText("offline")).toBeInTheDocument();
  });

  it("uses 'Something went wrong.' when a non-Error rejection bubbles up", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue("plain reject");

    render(<ReserveButton handle="x" label="Reserve" />);
    fireEvent.click(screen.getByRole("button", { name: "Reserve" }));

    expect(
      await screen.findByText("Something went wrong."),
    ).toBeInTheDocument();
  });
});
