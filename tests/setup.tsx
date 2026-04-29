import "@testing-library/jest-dom/vitest";

import * as React from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Reset DOM between tests so React state doesn't leak across files.
afterEach(() => {
  cleanup();
});

// next/font/google attempts to fetch real font binaries from Google
// at build/test time; replace with a value-shaped stub so any module
// that imports a font (e.g. app/layout.tsx) loads cleanly under jsdom.
vi.mock("next/font/google", () => {
  const stub = () => ({
    variable: "--font-test",
    className: "font-test",
    style: { fontFamily: "test" },
  });
  return {
    Inter: stub,
    Fraunces: stub,
  };
});

// next/image's optimisation pipeline is not available under jsdom.
// Render a plain <img> so we can still assert on alt text + src.
type ImageStubProps = {
  src: string | { src?: string };
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  placeholder?: string;
  blurDataURL?: string;
  className?: string;
};

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    fill: _fill,
    priority: _priority,
    sizes: _sizes,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    ...rest
  }: ImageStubProps) => {
    const realSrc = typeof src === "string" ? src : (src && src.src) || "";
    return React.createElement("img", {
      src: realSrc,
      alt: alt ?? "",
      width,
      height,
      ...rest,
    });
  },
}));
