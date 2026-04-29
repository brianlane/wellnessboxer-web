import Footer from "components/layout/footer";
import { PageShell } from "components/marketing/page-shell";

export const metadata = {
  title: "Medical Disclaimer",
  description:
    "Wellness Boxer is apparel, not a medical device. Statements about reproductive health are not evaluated by the FDA.",
};

export default function DisclaimerPage() {
  return (
    <>
      <PageShell
        eyebrow="Compliance \u2014 DRAFT"
        title="Medical Disclaimer"
        intro="This page consolidates the regulatory language for the Wellness Boxer marketing site. It must be reviewed and approved by counsel before launch."
      >
        <h2>FDA statement</h2>
        <p>
          These statements have not been evaluated by the U.S. Food and Drug
          Administration. The Wellness Boxer is apparel and is not intended to
          diagnose, treat, cure, or prevent any disease, including infertility
          or any urological, endocrine, or reproductive condition.
        </p>

        <h2>Educational use of cited research</h2>
        <p>
          Research cited on this site &mdash; including the
          M&iacute;nguez-Alarc&oacute;n et al. (2018) loose-boxer paper, Shafik
          (1993) on textile and spermatogenesis, and our internal thermography
          &mdash; is shared for educational context. None of this research was
          conducted on the Wellness Boxer specifically, and none of it
          constitutes a clinical claim about outcomes that consumers will
          personally experience.
        </p>

        <h2>Consult your physician</h2>
        <p>
          If you are experiencing fertility or reproductive-health concerns,
          please consult a qualified physician. Apparel is not a substitute for
          medical care.
        </p>

        <h2>Trademarks and certifications</h2>
        <p>
          Roica&trade; and Roica&trade; V550 are trademarks of Asahi Kasei
          Corporation. OEKO-TEX&reg; is a registered trademark of OEKO-TEX
          Service GmbH. All other trademarks are the property of their
          respective owners.
        </p>

        <p>
          <em>Last updated: DRAFT &mdash; not yet effective.</em>
        </p>
      </PageShell>
      <Footer />
    </>
  );
}
