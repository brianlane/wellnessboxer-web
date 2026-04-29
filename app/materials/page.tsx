import Footer from "components/layout/footer";
import { PageShell } from "components/marketing/page-shell";

export const metadata = {
  title: "Materials",
  description:
    "Roica V550 biodegradable elastane in 95% organic cotton poplin, with a fabric-encased tunnel waistband. Material traceability for the Wellness Boxer.",
};

export default function MaterialsPage() {
  return (
    <>
      <PageShell
        eyebrow="Material Traceability"
        title="Two materials. Verified to the fibre."
        intro="The Wellness Boxer is a deliberate two-material system. We removed everything else \u2014 dye prints, hardware, plastic tags, polyester linings \u2014 because every additional input is one more thing to certify."
      >
        <h2>95% organic cotton poplin</h2>
        <p>
          Our base cloth is a crisp poplin: a structured plain weave that holds
          its airflow channels even after dozens of wash cycles. Cotton supply
          is sourced from GOTS-eligible cooperatives in Turkey and Greece,
          traceable to the bale.
        </p>
        <ul>
          <li>OEKO-TEX&reg; Standard 100 verified for skin-contact safety</li>
          <li>Mercerised, low-pill yarn for long-term hand-feel</li>
          <li>Undyed in the Desert Cool launch colourway</li>
        </ul>

        <h2>5% Roica&trade; V550 biodegradable elastane</h2>
        <p>
          Roica&trade; V550 is the first elastane verified by the Hohenstein
          Institute to biodegrade in marine and activated-sludge conditions
          without releasing harmful substances. We use it sparingly &mdash; only
          where stretch is mechanically required &mdash; and we route it through
          a fabric-encased tunnel rather than letting it touch skin.
        </p>
        <ul>
          <li>Marine biodegradation verified (Hohenstein, public protocol)</li>
          <li>Activated-sludge biodegradation verified</li>
          <li>SCS Recycled Claim Standard chain-of-custody</li>
        </ul>

        <h2>The tunnel waistband</h2>
        <p>
          A standard waistband is a slab of polyester or rubber printed with a
          logo. Our waistband is a tunnel: an internal Roica&trade; V550 core
          encased in a sleeve of the same organic cotton that makes up the body.
          There is no synthetic surface against your skin, even where the band
          sits all day.
        </p>

        <h2>Things we do not use</h2>
        <ul>
          <li>No polyester at any layer</li>
          <li>No buttons, snaps, or hardware</li>
          <li>No plastic care tags &mdash; care information is heat-printed</li>
          <li>No animal-derived adhesives</li>
        </ul>
      </PageShell>
      <Footer />
    </>
  );
}
