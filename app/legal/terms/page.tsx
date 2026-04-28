import Footer from "components/layout/footer";
import { PageShell } from "components/marketing/page-shell";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of service and shipping policy for Wellness Boxer.",
};

export default function TermsPage() {
  return (
    <>
      <PageShell
        eyebrow="Legal \u2014 DRAFT"
        title="Terms of Service"
        intro="This is a placeholder draft. It must be reviewed and finalised by counsel before launch."
      >
        <h2>1. Reservations and pre-orders</h2>
        <p>
          Reservations placed before fulfilment are authorisations only.
          Your card will be charged when your order ships in September 2026
          (or sooner if you elected an earlier subscription start date).
          You may cancel a reservation at any time before shipment.
        </p>

        <h2>2. Subscriptions</h2>
        <p>
          Subscriptions renew on the cadence you select (e.g. every 90
          days). You can pause, skip, or cancel any active subscription
          from your account or by emailing us; we honour cancellations on
          the day we receive them.
        </p>

        <h2 id="shipping">3. Shipping and returns</h2>
        <p>
          Domestic US/CA shipping is express at launch. EU, UK, AU, NZ,
          JP, and SG distribution at launch via the EU hub. Returns are
          accepted within 30 days of receipt for unworn product in
          original packaging. Hygiene-restricted items follow industry
          standard: opened, worn product is final sale.
        </p>

        <h2>4. Limitation of liability</h2>
        <p>
          Wellness Boxer products are apparel. We make no medical claims
          and disclaim all warranties of fitness for a particular medical
          purpose. See the <a href="/legal/disclaimer">medical disclaimer</a>{" "}
          for the full language.
        </p>

        <h2>5. Governing law</h2>
        <p>Arizona, USA, with mandatory pre-suit informal dispute resolution.</p>

        <p>
          <em>Last updated: DRAFT &mdash; not yet effective.</em>
        </p>
      </PageShell>
      <Footer />
    </>
  );
}
