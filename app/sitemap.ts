import { products } from "lib/products";
import { baseUrl } from "lib/utils";
import { MetadataRoute } from "next";

const STATIC_PATHS = [
  "",
  "/science",
  "/materials",
  "/about",
  "/legal/privacy",
  "/legal/terms",
  "/legal/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

  const staticRoutes = STATIC_PATHS.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));

  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/product/${p.handle}`,
    lastModified,
  }));

  return [...staticRoutes, ...productRoutes];
}
