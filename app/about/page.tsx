import Footer from "components/layout/footer";
import { PageShell } from "components/marketing/page-shell";

export const metadata = {
  title: "About",
  description:
    "Wellness Boxer is a small reproductive-wellness apparel brand based in Phoenix, Arizona, manufacturing in the Barcelos textile hub of northern Portugal.",
};

export default function AboutPage() {
  return (
    <>
      <PageShell
        eyebrow="About"
        title="A small brand, a single product, one specification."
        intro="Wellness Boxer was started by men who wanted underwear specified the way we specify the rest of our wellness lives \u2014 with material data, certifications, and a clear story about what is, and is not, in contact with our bodies."
      >
        <h2>The brief</h2>
        <p>
          We could not find a boxer that did all three of these things at the
          same time:
        </p>
        <ol>
          <li>0% polyester at every skin-contact surface</li>
          <li>No hardware (no buttons, snaps, or rubber bands)</li>
          <li>A documented biodegradable elastic alternative</li>
        </ol>
        <p>
          So we built one. The Triple Zero Standard is the engineering
          specification we wrote for ourselves, and the only one this company is
          allowed to sell against.
        </p>

        <h2 id="barcelos">Made in Barcelos</h2>
        <p>
          Northern Portugal &mdash; specifically the Barcelos / Vila Nova de
          Famalic&atilde;o textile corridor &mdash; is one of the densest
          high-precision apparel ecosystems in Europe. Our cut-and-sew partner
          runs SMETA 4-Pillar audits, pays above the regional textile-industry
          collective bargaining floor, and shares unit-level QC photography for
          every production run.
        </p>

        <h2>What you can expect from us</h2>
        <ul>
          <li>One product. Iterated, not multiplied.</li>
          <li>Public certifications. We will publish the audit numbers.</li>
          <li>A tiny team. You will hear back when you write to us.</li>
          <li>No fertility claims. We are apparel, not a clinic.</li>
        </ul>

        <h2 id="faq">Reservation FAQ</h2>
        <p>
          <strong>When do reservations charge?</strong> Reservations are
          authorised at sign-up but only captured at fulfilment in September
          2026. You can cancel any time before shipping.
        </p>
        <p>
          <strong>Can I change my bundle?</strong> Yes. Email us at{" "}
          <a href="mailto:hello@wellnessboxer.com">hello@wellnessboxer.com</a>{" "}
          before September 2026 and we will swap your reservation.
        </p>
        <p>
          <strong>Do you ship internationally?</strong> US, Canada, EU
          countries, UK, Australia, New Zealand, Japan, and Singapore at launch.
          More markets after Q4 2026.
        </p>
      </PageShell>
      <Footer />
    </>
  );
}
