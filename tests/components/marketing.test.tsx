import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { ClinicalProof } from "components/marketing/clinical-proof";
import { CraftedInBarcelos } from "components/marketing/crafted-in-barcelos";
import { HeroMicroclimate } from "components/marketing/hero-microclimate";
import { LifestyleClose } from "components/marketing/lifestyle-close";
import { MaterialsTraceability } from "components/marketing/materials-traceability";
import { PageShell } from "components/marketing/page-shell";
import { RecoveryRitual } from "components/marketing/recovery-ritual";
import { ReserveButton } from "components/marketing/reserve-button";
import { RoadmapToWellness } from "components/marketing/roadmap";
import { SubscriptionBundles } from "components/marketing/subscription-bundles";
import { TripleZeroStandard } from "components/marketing/triple-zero-standard";

describe("marketing components — render smoke tests", () => {
  it("HeroMicroclimate renders the engineered-microclimate copy and CTAs", () => {
    render(<HeroMicroclimate />);
    expect(
      screen.getByText(/Pelvic wellness, engineered\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /reserve the 3-pack/i }),
    ).toHaveAttribute("href", "#bundles");
    expect(
      screen.getByRole("link", { name: /see the science/i }),
    ).toHaveAttribute("href", "#clinical-proof");
  });

  it("TripleZeroStandard renders all three pillars", () => {
    render(<TripleZeroStandard />);
    expect(screen.getByText("0% Polyester")).toBeInTheDocument();
    expect(screen.getByText("0% Buttons")).toBeInTheDocument();
    expect(screen.getByText("0% Microplastics")).toBeInTheDocument();
  });

  it("ClinicalProof renders three stat cards and the methodology block", () => {
    render(<ClinicalProof />);
    expect(screen.getByText("+25%")).toBeInTheDocument();
    expect(screen.getByText("99%")).toBeInTheDocument();
    expect(screen.getByText("How we measured")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /science page/i })).toHaveAttribute(
      "href",
      "/science",
    );
  });

  it("MaterialsTraceability renders both material cards", () => {
    render(<MaterialsTraceability />);
    expect(screen.getByText("Tunnel Waistband")).toBeInTheDocument();
    expect(screen.getByText("The Poplin Weave")).toBeInTheDocument();
  });

  it("CraftedInBarcelos renders the production block", () => {
    render(<CraftedInBarcelos />);
    expect(screen.getByText("Crafted in Portugal")).toBeInTheDocument();
    expect(screen.getByText("Barcelos, PT")).toBeInTheDocument();
  });

  it("RecoveryRitual renders both moments", () => {
    render(<RecoveryRitual />);
    expect(screen.getByText("Wellness wear")).toBeInTheDocument();
    expect(screen.getByText("Compression")).toBeInTheDocument();
  });

  it("RoadmapToWellness renders all four phases", () => {
    render(<RoadmapToWellness />);
    expect(screen.getByText("June 2026")).toBeInTheDocument();
    expect(screen.getByText("July 2026")).toBeInTheDocument();
    expect(screen.getByText("August 2026")).toBeInTheDocument();
    expect(screen.getByText("September 2026")).toBeInTheDocument();
  });

  it("LifestyleClose renders the desert-cool hero", () => {
    render(<LifestyleClose />);
    expect(screen.getByText(/Designed for desert cool/i)).toBeInTheDocument();
  });

  it("SubscriptionBundles renders one card per product, including the highlighted 3-pack", () => {
    render(<SubscriptionBundles />);
    expect(screen.getByText("The Single")).toBeInTheDocument();
    expect(screen.getByText("The 3-Pack")).toBeInTheDocument();
    expect(screen.getByText("Subscribe & Replace")).toBeInTheDocument();
    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^Reserve / })).toHaveLength(
      3,
    );
  });

  it("ReserveButton renders standalone (covered in detail elsewhere)", () => {
    render(<ReserveButton handle="x" label="Smoke" />);
    expect(screen.getByRole("button", { name: "Smoke" })).toBeInTheDocument();
  });

  it("PageShell renders with intro", () => {
    render(
      <PageShell eyebrow="Eye" title="Title" intro="Intro copy">
        <p>body</p>
      </PageShell>,
    );
    expect(screen.getByText("Eye")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(screen.getByText("Intro copy")).toBeInTheDocument();
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("PageShell renders without intro (no intro element)", () => {
    const { container } = render(
      <PageShell eyebrow="Eye" title="Title">
        <p>only body</p>
      </PageShell>,
    );
    expect(screen.getByText("only body")).toBeInTheDocument();
    expect(container.querySelectorAll("header p").length).toBe(1);
  });
});
