import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Tailwind/global CSS imports are stubbed at the resolver level (css: false
// in vitest.config.ts treats them as inert). The layout module is the only
// place that imports globals.css; importing the module here covers the
// metadata export, the font initialisation calls, and the JSX shape.
import RootLayout, { metadata } from "app/layout";

describe("app/layout.tsx", () => {
  it("exports a fully-formed metadata object", () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
    expect(metadata.openGraph?.images?.[0]).toMatchObject({
      url: "/images/wellness-boxer-logo.png",
    });
    expect(metadata.twitter?.card).toBe("summary_large_image");
  });

  it("returns a valid React element wrapping its children", () => {
    const tree = RootLayout({ children: "child" });
    // RootLayout is a server component; it returns plain JSX synchronously.
    expect(tree).toBeTruthy();
    expect((tree as { type: string }).type).toBe("html");
  });
});
