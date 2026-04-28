import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";

export type NavItem = { title: string; path: string };

const NAV: NavItem[] = [
  { title: "Science", path: "/science" },
  { title: "Materials", path: "/materials" },
  { title: "Bundles", path: "/#bundles" },
  { title: "About", path: "/about" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-sage-100 bg-sand-50/80 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-10">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={NAV} />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full items-center md:w-1/2">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center gap-3 md:w-auto lg:mr-8"
              aria-label="Wellness Boxer home"
            >
              <Image
                src="/images/wellness-boxer-logo.png"
                alt=""
                width={40}
                height={40}
                priority
                className="h-9 w-9 rounded-full ring-1 ring-sage-100"
              />
              <span className="font-display text-lg tracking-[0.2em] text-ink-900 uppercase md:text-xl">
                Wellness <span className="text-sage-700">Boxer</span>
              </span>
            </Link>
            <ul className="hidden gap-7 text-sm md:flex md:items-center">
              {NAV.map((item) => (
                <li key={`${item.title}-${item.path}`}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="font-medium tracking-wide text-ink-700 underline-offset-4 transition-colors hover:text-sage-800 hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-end gap-3 md:w-1/2">
            <Link
              href="/#bundles"
              prefetch={true}
              className="hidden rounded-full bg-sage-800 px-5 py-2 text-xs font-medium tracking-wide text-sand-50 uppercase transition hover:bg-sage-900 md:inline-flex"
            >
              Reserve
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
