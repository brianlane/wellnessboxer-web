import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", async () => {
  const actual =
    await vi.importActual<typeof import("next/navigation")>("next/navigation");
  return {
    ...actual,
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
    notFound: () => {
      const err = new Error("NEXT_HTTP_ERROR_FALLBACK;404");
      throw err;
    },
  };
});

import ProductPage, {
  generateMetadata,
  generateStaticParams,
} from "app/product/[handle]/page";

describe("/product/[handle] page", () => {
  it("generateStaticParams returns one params object per static product", () => {
    expect(generateStaticParams()).toEqual([
      { handle: "wellness-boxer-single" },
      { handle: "wellness-boxer-3-pack" },
      { handle: "wellness-boxer-subscribe" },
    ]);
  });

  it("generateMetadata returns title/description for a known handle", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ handle: "wellness-boxer-3-pack" }),
    });
    expect(meta.title).toBe("The 3-Pack");
    expect(meta.alternates?.canonical).toBe("/product/wellness-boxer-3-pack");
  });

  it("generateMetadata returns an empty object for an unknown handle", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ handle: "nope" }),
    });
    expect(meta).toEqual({});
  });

  it("renders the product page for a known handle, including the 'Recommended' badge for the 3-pack", async () => {
    const ui = await ProductPage({
      params: Promise.resolve({ handle: "wellness-boxer-3-pack" }),
    });
    render(ui);
    expect(
      screen.getByRole("heading", { name: "The 3-Pack", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText("Recommended")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reserve The 3-Pack/i }),
    ).toBeInTheDocument();
  });

  it("renders without a badge for products that don't carry one", async () => {
    const ui = await ProductPage({
      params: Promise.resolve({ handle: "wellness-boxer-single" }),
    });
    render(ui);
    expect(
      screen.getByRole("heading", { name: "The Single", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Recommended")).not.toBeInTheDocument();
  });

  it("calls notFound() and throws for an unknown handle", async () => {
    await expect(
      ProductPage({ params: Promise.resolve({ handle: "does-not-exist" }) }),
    ).rejects.toThrow(/NEXT_HTTP_ERROR_FALLBACK|404/);
  });
});
