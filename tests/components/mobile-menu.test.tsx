import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";

const navMocks = vi.hoisted(() => ({
  pathname: "/",
  searchParams: new URLSearchParams(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navMocks.pathname,
  useSearchParams: () => navMocks.searchParams,
}));

import MobileMenu from "components/layout/navbar/mobile-menu";

const NAV = [
  { title: "Science", path: "/science" },
  { title: "Materials", path: "/materials" },
];

describe("<MobileMenu />", () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    navMocks.pathname = "/";
    navMocks.searchParams = new URLSearchParams();
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: originalInnerWidth,
    });
    document.documentElement.style.overflow = "";
  });

  it("starts closed and exposes an Open menu button", () => {
    render(<MobileMenu menu={NAV} />);
    expect(
      screen.getByRole("button", { name: /open menu/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the dialog and locks page scroll when clicked", () => {
    render(<MobileMenu menu={NAV} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(document.documentElement.style.overflow).toBe("hidden");
    for (const item of NAV) {
      expect(
        screen.getByRole("link", { name: item.title }),
      ).toBeInTheDocument();
    }
  });

  it("closes via the explicit Close menu icon", () => {
    render(<MobileMenu menu={NAV} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const closes = screen.getAllByRole("button", { name: /close menu/i });
    fireEvent.click(closes[closes.length - 1]!);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("closes when the backdrop is clicked", () => {
    render(<MobileMenu menu={NAV} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const closes = screen.getAllByRole("button", { name: /close menu/i });
    // The first Close menu button is the absolute backdrop overlay.
    fireEvent.click(closes[0]!);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when a menu link is clicked", () => {
    render(<MobileMenu menu={NAV} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(screen.getByRole("link", { name: "Science" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the Reserve a bundle CTA is clicked", () => {
    render(<MobileMenu menu={NAV} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.click(screen.getByRole("link", { name: /reserve a bundle/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes when the viewport widens past the md breakpoint", () => {
    render(<MobileMenu menu={NAV} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        writable: true,
        value: 1200,
      });
      window.dispatchEvent(new Event("resize"));
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("ignores resize events that stay below the md breakpoint", () => {
    render(<MobileMenu menu={NAV} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        configurable: true,
        writable: true,
        value: 360,
      });
      window.dispatchEvent(new Event("resize"));
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("re-closes when pathname changes", () => {
    const { rerender } = render(<MobileMenu menu={NAV} />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    act(() => {
      navMocks.pathname = "/about";
    });
    rerender(<MobileMenu menu={NAV} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
