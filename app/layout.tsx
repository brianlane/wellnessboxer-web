import { Navbar } from "components/layout/navbar";
import { baseUrl } from "lib/utils";
import { Fraunces, Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME || "Wellness Boxer",
    template: `%s | ${SITE_NAME || "Wellness Boxer"}`,
  },
  description:
    "The boxer engineered for pelvic wellness. Triple Zero Standard: 0% polyester, 0% buttons, 0% microplastics. Roica V550 biodegradable stretch in 95% organic cotton poplin, crafted in Portugal.",
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    type: "website",
    title: "Wellness Boxer",
    description:
      "Pelvic wellness, engineered. The Triple Zero Standard boxer with a clinically-informed cooling pouch.",
    siteName: "Wellness Boxer",
    images: [
      {
        url: "/images/wellness-boxer-logo.png",
        width: 1024,
        height: 1024,
        alt: "Wellness Boxer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellness Boxer",
    description: "Pelvic wellness, engineered. The Triple Zero Standard boxer.",
    images: ["/images/wellness-boxer-logo.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable}`}
      data-brand="wellness-boxer"
    >
      <body className="bg-sand-50 text-ink-900 antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
