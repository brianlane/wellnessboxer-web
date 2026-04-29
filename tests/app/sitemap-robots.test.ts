import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ENV_KEYS = [
  "VERCEL_PROJECT_PRODUCTION_URL",
  "NEXT_PUBLIC_SITE_URL",
] as const;

type Snapshot = Record<(typeof ENV_KEYS)[number], string | undefined>;

function snapshotEnv(): Snapshot {
  return {
    VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  };
}

function restoreEnv(snap: Snapshot) {
  for (const key of ENV_KEYS) {
    const v = snap[key];
    if (v === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = v;
    }
  }
}

describe("app/sitemap.ts", () => {
  let original: Snapshot;
  beforeEach(() => {
    original = snapshotEnv();
    process.env.NEXT_PUBLIC_SITE_URL = "https://test.wellnessboxer.com";
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
  });
  afterEach(() => restoreEnv(original));

  it("emits one entry per static path plus one per product", async () => {
    vi.resetModules();
    const sitemap = (await import("app/sitemap")).default;
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    // 7 static paths + 3 products = 10 entries.
    expect(entries).toHaveLength(10);
    expect(urls).toContain("https://test.wellnessboxer.com");
    expect(urls).toContain("https://test.wellnessboxer.com/science");
    expect(urls).toContain("https://test.wellnessboxer.com/legal/disclaimer");
    expect(urls).toContain(
      "https://test.wellnessboxer.com/product/wellness-boxer-3-pack",
    );
    for (const e of entries) {
      expect(typeof e.lastModified).toBe("string");
    }
  });
});

describe("app/robots.ts", () => {
  let original: Snapshot;
  beforeEach(() => {
    original = snapshotEnv();
    process.env.NEXT_PUBLIC_SITE_URL = "https://test.wellnessboxer.com";
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
  });
  afterEach(() => restoreEnv(original));

  it("returns the open robots config with the absolute sitemap URL", async () => {
    vi.resetModules();
    const robots = (await import("app/robots")).default;
    expect(robots()).toEqual({
      rules: [{ userAgent: "*" }],
      sitemap: "https://test.wellnessboxer.com/sitemap.xml",
      host: "https://test.wellnessboxer.com",
    });
  });
});
