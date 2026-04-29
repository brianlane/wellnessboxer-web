import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import ErrorBoundary from "app/error";

describe("<Navbar />", () => {
  it("renders the brand link, primary nav, and Reserve CTA", () => {
    render(<Navbar />);
    expect(
      screen.getByRole("link", { name: /Wellness Boxer home/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Science" })).toHaveAttribute(
      "href",
      "/science",
    );
    expect(screen.getByRole("link", { name: "Materials" })).toHaveAttribute(
      "href",
      "/materials",
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about",
    );
    const reserves = screen.getAllByRole("link", { name: /Reserve/ });
    expect(reserves.length).toBeGreaterThan(0);
  });
});

describe("<Footer />", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-28T00:00:00Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders nav columns, certifications, the medical disclaimer, and the dynamic year", () => {
    render(<Footer />);
    expect(screen.getByRole("heading", { name: "Shop" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Science" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Brand" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Legal" })).toBeInTheDocument();
    expect(screen.getByText("Certifications")).toBeInTheDocument();
    expect(screen.getByText(/Medical disclaimer\./i)).toBeInTheDocument();
    expect(
      screen.getByText(/© 2026 Wellness Boxer\. All rights reserved\./i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });
});

describe("app/error.tsx", () => {
  it("renders the apology copy and calls reset() when 'Try again' is clicked", async () => {
    const reset = vi.fn();
    render(<ErrorBoundary reset={reset} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("We hit a snag.")).toBeInTheDocument();
    screen.getByRole("button", { name: /try again/i }).click();
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
