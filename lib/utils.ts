import { ReadonlyURLSearchParams } from "next/navigation";

export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

// Returns true when the Shopify Storefront API is fully configured.
// Pre-store-launch we accept missing env vars as "not yet configured"
// and only hard-fail on misconfiguration (e.g. bracket placeholders).
export const isShopifyConfigured = () => {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) return false;
  if (domain.includes("[") || domain.includes("]")) return false;
  return true;
};

export const validateEnvironmentVariables = () => {
  if (
    process.env.SHOPIFY_STORE_DOMAIN?.includes("[") ||
    process.env.SHOPIFY_STORE_DOMAIN?.includes("]")
  ) {
    throw new Error(
      "Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets (ie. `[` and / or `]`). Your site will not work with them there. Please remove them.",
    );
  }

  if (!isShopifyConfigured()) {
    // Soft-warn so `next build` succeeds pre-Shopify-store. Once real
    // credentials are set this branch is skipped automatically.
    console.warn(
      "[wellness-boxer] Shopify env not yet configured. Storefront features (products, cart, checkout) will be inert until SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN are set. See docs/SHOPIFY_SETUP.md.",
    );
  }
};
