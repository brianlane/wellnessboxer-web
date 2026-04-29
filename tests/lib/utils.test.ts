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
    const value = snap[key];
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

async function loadUtils() {
  vi.resetModules();
  return import("lib/utils");
}

describe("lib/utils", () => {
  let original: Snapshot;

  beforeEach(() => {
    original = snapshotEnv();
  });

  afterEach(() => {
    restoreEnv(original);
  });

  describe("baseUrl", () => {
    it("prefers VERCEL_PROJECT_PRODUCTION_URL with https://", async () => {
      process.env.VERCEL_PROJECT_PRODUCTION_URL = "wellnessboxer.com";
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const mod = await loadUtils();
      expect(mod.baseUrl).toBe("https://wellnessboxer.com");
    });

    it("falls back to NEXT_PUBLIC_SITE_URL when no Vercel URL", async () => {
      delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
      process.env.NEXT_PUBLIC_SITE_URL = "https://staging.example.com";
      const mod = await loadUtils();
      expect(mod.baseUrl).toBe("https://staging.example.com");
    });

    it("defaults to localhost when neither is set", async () => {
      delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const mod = await loadUtils();
      expect(mod.baseUrl).toBe("http://localhost:3000");
    });
  });

  describe("createUrl", () => {
    it("returns just the pathname when params are empty", async () => {
      const { createUrl } = await loadUtils();
      expect(createUrl("/products", new URLSearchParams())).toBe("/products");
    });

    it("appends a query string when params are present", async () => {
      const { createUrl } = await loadUtils();
      const params = new URLSearchParams({ q: "boxer", page: "2" });
      expect(createUrl("/search", params)).toBe("/search?q=boxer&page=2");
    });
  });

  describe("ensureStartsWith", () => {
    it("returns the original string when it already starts with the prefix", async () => {
      const { ensureStartsWith } = await loadUtils();
      expect(ensureStartsWith("@user", "@")).toBe("@user");
    });

    it("prepends the prefix when missing", async () => {
      const { ensureStartsWith } = await loadUtils();
      expect(ensureStartsWith("user", "@")).toBe("@user");
    });
  });
});
