import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "app/api/waitlist/route";

describe("POST /api/waitlist", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns invalid_body when JSON parsing fails", async () => {
    const req = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: "not-json",
      headers: { "Content-Type": "application/json" },
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_body" });
  });

  it("rejects empty / missing emails", async () => {
    const req = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: JSON.stringify({}),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_email" });
  });

  it("rejects malformed emails", async () => {
    const req = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email: "no-at-sign" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, error: "invalid_email" });
  });

  it("accepts a valid email and logs it", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const req = new Request("http://localhost/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email: "  test@example.com  " }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(log).toHaveBeenCalledWith(
      "[waitlist]",
      expect.any(String),
      "test@example.com",
    );
  });
});
