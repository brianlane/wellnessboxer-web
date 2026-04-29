"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { NavItem } from "./index";

export default function MobileMenu({ menu }: { menu: NavItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  // The dialog is portaled into <body>. We only render it after mount so
  // SSR output stays empty (avoids hydration mismatch on `document`).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const dialog =
    isOpen && mounted ? (
      // The navbar applies `backdrop-filter` (`backdrop-blur-md`), which
      // creates a containing block for `position: fixed` descendants in
      // WebKit. Without portaling, `inset-0` resolves to the navbar's
      // bounding box and the drawer's content visibly overflows into the
      // page. Portaling into <body> makes `fixed` viewport-relative again.
      <div
        className="fixed inset-0 z-[60] md:hidden"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
        />
        <div className="shadow-sanctuary-lg absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col bg-sand-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/images/wellness-boxer-logo.png"
                alt=""
                width={40}
                height={40}
                className="h-9 w-9 rounded-full ring-1 ring-sage-100"
              />
              <span className="font-display text-lg tracking-[0.2em] text-ink-900 uppercase">
                Wellness <span className="text-sage-700">Boxer</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sage-200 bg-white text-ink-900"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <ul className="mt-10 flex flex-col gap-4 text-lg">
            {menu.map((item) => (
              <li key={`${item.title}-${item.path}`}>
                <Link
                  href={item.path}
                  prefetch={true}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-2xl text-ink-900 hover:text-sage-700"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <Link
              href="/#bundles"
              prefetch={true}
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-sage-800 px-5 py-3 text-sm font-medium text-sand-50 transition hover:bg-sage-900"
            >
              Reserve a bundle
            </Link>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-sage-200 bg-white text-ink-900 transition-colors md:hidden"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}
