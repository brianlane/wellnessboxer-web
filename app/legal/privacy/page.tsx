import Footer from "components/layout/footer";
import { PageShell } from "components/marketing/page-shell";

export const metadata = {
  title: "Privacy Policy",
  description: "Wellness Boxer privacy policy and data handling practices.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageShell
        eyebrow="Legal \u2014 DRAFT"
        title="Privacy Policy"
        intro="This is a placeholder draft. It must be reviewed by privacy counsel and updated to reflect the actual data processors used at launch (Shopify, Vercel, Klaviyo or equivalent, Stripe) before the site goes live to consumers."
      >
        <h2>1. Information we collect</h2>
        <p>
          When you reserve a bundle, subscribe, or join the waitlist we
          collect: name, email address, shipping address (at fulfilment),
          payment authorisation token (held by Stripe / Shopify Payments,
          never by Wellness Boxer), and basic device/analytics data via
          Vercel Web Analytics.
        </p>

        <h2>2. How we use it</h2>
        <ul>
          <li>To fulfil your reservation, subscription, or order</li>
          <li>To send transactional and product-update emails you opted into</li>
          <li>To improve the website and detect fraudulent transactions</li>
        </ul>

        <h2>3. Who we share it with</h2>
        <p>
          We share data only with subprocessors required to operate the
          business: Shopify (commerce + checkout), Vercel (hosting +
          analytics), Stripe / Shopify Payments (payment processing),
          Klaviyo or equivalent (transactional + marketing email), and our
          shipping carriers.
        </p>

        <h2>4. Your rights</h2>
        <p>
          Residents of the EU, UK, California, and other GDPR/CCPA-equivalent
          jurisdictions have the right to access, correct, port, and delete
          their personal data. Email{" "}
          <a href="mailto:privacy@wellnessboxer.com">privacy@wellnessboxer.com</a>.
        </p>

        <h2>5. Contact</h2>
        <p>
          Wellness Boxer &middot; Phoenix, Arizona &middot;{" "}
          <a href="mailto:privacy@wellnessboxer.com">privacy@wellnessboxer.com</a>
        </p>

        <p>
          <em>Last updated: DRAFT &mdash; not yet effective.</em>
        </p>
      </PageShell>
      <Footer />
    </>
  );
}
