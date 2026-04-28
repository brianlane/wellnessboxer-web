#!/usr/bin/env bash
# Wellness Boxer - one-command Vercel deploy
#
# Usage:
#   ./scripts/deploy.sh
#
# What it does:
#   1. Installs / upgrades the Vercel CLI globally
#   2. Opens your browser to authenticate
#   3. Links this repo to a Vercel project (creates one if needed)
#   4. Prompts you to set the four required env vars in production
#   5. Attaches the wellnessboxer.com domain
#   6. Ships a production build
#
# Pre-requisites:
#   - You have completed docs/SHOPIFY_SETUP.md and have:
#       * SHOPIFY_STORE_DOMAIN  (e.g. wellnessboxer.myshopify.com)
#       * SHOPIFY_STOREFRONT_ACCESS_TOKEN
#   - Your domain registrar can update DNS for wellnessboxer.com.

set -euo pipefail

DOMAIN="wellnessboxer.com"
WWW_DOMAIN="www.wellnessboxer.com"

bold() { printf "\033[1m%s\033[0m\n" "$1"; }
ok()   { printf "\033[32m\u2713\033[0m %s\n" "$1"; }
warn() { printf "\033[33m!\033[0m %s\n" "$1"; }

bold "1/6  Installing Vercel CLI..."
if ! command -v vercel >/dev/null 2>&1; then
  npm i -g vercel@latest
fi
ok "Vercel CLI ready: $(vercel --version)"

bold "2/6  Authenticating with Vercel (opens your browser)..."
vercel whoami >/dev/null 2>&1 || vercel login

bold "3/6  Linking this repo to a Vercel project..."
vercel link --yes

bold "4/6  Configuring production environment variables..."
warn  "You will be prompted for each value. Paste from your password manager."

set_env() {
  local name="$1"
  local default="${2:-}"
  if vercel env ls production 2>/dev/null | grep -q " ${name} "; then
    ok "${name} already set in production (skipping)"
    return
  fi
  if [ -n "$default" ]; then
    printf "%s" "$default" | vercel env add "$name" production
  else
    vercel env add "$name" production
  fi
  ok "${name} set in production"
}

set_env COMPANY_NAME                    "Wellness Boxer"
set_env SITE_NAME                       "Wellness Boxer"
set_env SHOPIFY_STORE_DOMAIN            ""
set_env SHOPIFY_STOREFRONT_ACCESS_TOKEN ""
set_env SHOPIFY_REVALIDATION_SECRET     ""

bold "5/6  Attaching wellnessboxer.com..."
vercel domains add "$DOMAIN"      || warn "Domain $DOMAIN may already be attached"
vercel domains add "$WWW_DOMAIN"  || warn "Domain $WWW_DOMAIN may already be attached"
warn "Update your registrar's DNS to point at Vercel:"
warn "  $DOMAIN          A     76.76.21.21"
warn "  $WWW_DOMAIN      CNAME cname.vercel-dns.com."

bold "6/6  Shipping production build..."
vercel --prod

ok "Deployed. Visit https://$DOMAIN once DNS propagates (usually < 5 minutes)."
