import { describe, expect, it } from "vitest";

import { getProduct, products } from "lib/products";

describe("lib/products", () => {
  it("ships exactly the three reservation SKUs", () => {
    expect(products).toHaveLength(3);
    expect(products.map((p) => p.handle)).toEqual([
      "wellness-boxer-single",
      "wellness-boxer-3-pack",
      "wellness-boxer-subscribe",
    ]);
  });

  it("each product references a known Stripe price env key", () => {
    const allowed = new Set([
      "STRIPE_PRICE_SINGLE",
      "STRIPE_PRICE_3PACK",
      "STRIPE_PRICE_SUBSCRIBE",
    ]);
    for (const p of products) {
      expect(allowed.has(p.priceEnvKey)).toBe(true);
      expect(p.image.startsWith("/images/")).toBe(true);
      expect(p.perks.length).toBeGreaterThan(0);
      expect(p.displayPrice.startsWith("$")).toBe(true);
    }
  });

  it("flags exactly one highlighted product (the 3-pack)", () => {
    const highlighted = products.filter((p) => p.highlighted);
    expect(highlighted).toHaveLength(1);
    expect(highlighted[0]?.handle).toBe("wellness-boxer-3-pack");
  });

  it("has exactly one subscription product", () => {
    const subs = products.filter((p) => p.kind === "subscription");
    expect(subs).toHaveLength(1);
    expect(subs[0]?.handle).toBe("wellness-boxer-subscribe");
  });

  describe("getProduct", () => {
    it("returns the matching product for a known handle", () => {
      const p = getProduct("wellness-boxer-3-pack");
      expect(p).toBeDefined();
      expect(p?.name).toBe("The 3-Pack");
    });

    it("returns undefined for an unknown handle", () => {
      expect(getProduct("does-not-exist")).toBeUndefined();
    });
  });
});
