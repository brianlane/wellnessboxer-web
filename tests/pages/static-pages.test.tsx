import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

import HomePage, { metadata as homeMetadata } from "app/page";
import AboutPage, { metadata as aboutMetadata } from "app/about/page";
import SciencePage, { metadata as scienceMetadata } from "app/science/page";
import MaterialsPage, {
  metadata as materialsMetadata,
} from "app/materials/page";
import PrivacyPage, {
  metadata as privacyMetadata,
} from "app/legal/privacy/page";
import TermsPage, { metadata as termsMetadata } from "app/legal/terms/page";
import DisclaimerPage, {
  metadata as disclaimerMetadata,
} from "app/legal/disclaimer/page";

describe("static / marketing pages", () => {
  it("home page renders the hero, bundles section, and JSON-LD scripts", () => {
    const { container } = render(<HomePage />);
    expect(
      screen.getByText(/Pelvic wellness, engineered\./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Reserve a bundle/i)).toBeInTheDocument();
    const ld = container.querySelectorAll('script[type="application/ld+json"]');
    expect(ld.length).toBe(2);
    const payloads = Array.from(ld).map((s) => JSON.parse(s.textContent || ""));
    expect(payloads.find((p) => p["@type"] === "Organization")).toBeTruthy();
    expect(payloads.find((p) => p["@type"] === "Product")).toBeTruthy();
    expect(homeMetadata.title).toBe("The boxer engineered for pelvic wellness");
  });

  it("about page renders a heading, the FAQ anchor, and exposes its metadata", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", {
        name: /A small brand, a single product, one specification\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Reservation FAQ/i)).toBeInTheDocument();
    expect(aboutMetadata.title).toBe("About");
  });

  it("science page renders the science narrative and disclaimer link", () => {
    render(<SciencePage />);
    expect(
      screen.getByRole("heading", {
        name: /Pelvic wellness is a microclimate problem\./i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /full medical disclaimer/i }),
    ).toHaveAttribute("href", "/legal/disclaimer");
    expect(scienceMetadata.title).toBe("The Science");
  });

  it("materials page renders the two-material narrative", () => {
    render(<MaterialsPage />);
    expect(
      screen.getByRole("heading", {
        name: /Two materials\. Verified to the fibre\./i,
      }),
    ).toBeInTheDocument();
    expect(materialsMetadata.title).toBe("Materials");
  });

  it("privacy page renders DRAFT eyebrow and h1", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole("heading", { name: /Privacy Policy/i, level: 1 }),
    ).toBeInTheDocument();
    expect(privacyMetadata.title).toBe("Privacy Policy");
  });

  it("terms page renders DRAFT eyebrow and h1", () => {
    render(<TermsPage />);
    expect(
      screen.getByRole("heading", { name: /Terms of Service/i, level: 1 }),
    ).toBeInTheDocument();
    expect(termsMetadata.title).toBe("Terms of Service");
  });

  it("disclaimer page renders compliance eyebrow and h1", () => {
    render(<DisclaimerPage />);
    expect(
      screen.getByRole("heading", { name: /Medical Disclaimer/i, level: 1 }),
    ).toBeInTheDocument();
    expect(disclaimerMetadata.title).toBe("Medical Disclaimer");
  });
});
