import { getCollections, getPages, getProducts } from "lib/shopify";
import {
  baseUrl,
  isShopifyConfigured,
  validateEnvironmentVariables,
} from "lib/utils";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = "force-dynamic";

const STATIC_PATHS = ["", "/science", "/materials", "/about", "/legal/privacy", "/legal/terms", "/legal/disclaimer"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  const routesMap: Route[] = STATIC_PATHS.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  if (!isShopifyConfigured()) {
    return routesMap;
  }

  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt,
    })),
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt,
    })),
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt,
    })),
  );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise])
    ).flat();
  } catch (error) {
    console.warn("[wellness-boxer] Failed to fetch Shopify sitemap routes; falling back to static.", error);
  }

  return [...routesMap, ...fetchedRoutes];
}
