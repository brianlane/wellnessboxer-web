import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { WaitlistForm } from "components/layout/waitlist-form";

describe("<WaitlistForm />", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders an email input and submit button in idle state", () => {
    render(<WaitlistForm />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join the list/i }),
    ).toBeInTheDocument();
  });

  it("POSTs the email and shows the success message", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));

    render(<WaitlistForm />);
    const input = screen.getByLabelText(/email address/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "ok@example.com" } });

    const form = input.closest("form")!;
    fireEvent.submit(form);

    expect(await screen.findByText(/You.*on the list/i)).toBeInTheDocument();
    expect(input.value).toBe("");
    expect(fetchSpy).toHaveBeenCalledWith(
      "/api/waitlist",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "ok@example.com" }),
      }),
    );
  });

  it("shows the error message when the API returns non-ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("{}", { status: 500 }),
    );

    render(<WaitlistForm />);
    const input = screen.getByLabelText(/email address/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "boom@example.com" } });
    fireEvent.submit(input.closest("form")!);

    expect(
      await screen.findByText(/Something went wrong/i),
    ).toBeInTheDocument();
  });

  it("shows the error message when fetch rejects", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));

    render(<WaitlistForm />);
    const input = screen.getByLabelText(/email address/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "fail@example.com" } });
    fireEvent.submit(input.closest("form")!);

    expect(
      await screen.findByText(/Something went wrong/i),
    ).toBeInTheDocument();
  });
});
