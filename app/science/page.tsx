import Footer from "components/layout/footer";
import { PageShell } from "components/marketing/page-shell";

export const metadata = {
  title: "The Science",
  description:
    "Clinical context for the Wellness Boxer: scrotal temperature, polyester electrostatics, and the airflow case for loose woven boxers.",
};

export default function SciencePage() {
  return (
    <>
      <PageShell
        eyebrow="The Science"
        title="Pelvic wellness is a microclimate problem."
        intro="Sustained scrotal heat is one of the most-replicated modulators of male reproductive physiology. The Wellness Boxer was engineered around a single goal: keep that microclimate measurably cooler, without compression and without polyester."
      >
        <h2>Loose boxers and sperm concentration</h2>
        <p>
          A 2018 Harvard School of Public Health analysis of 656 men recruited
          from a fertility clinic reported that men who wore loose boxers had
          ~25% higher sperm concentration than men who primarily wore tight,
          polyester-heavy underwear. The relationship persisted after adjustment
          for confounders.
        </p>
        <p>
          <em>
            Reference: M&iacute;nguez-Alarc&oacute;n L. et al. &ldquo;Type of
            underwear worn and markers of testicular function among men
            attending a fertility center.&rdquo;{" "}
            <strong>Human Reproduction</strong>, 2018.
          </em>
        </p>

        <h2>Polyester and the electrostatic case</h2>
        <p>
          Animal models have linked polyester underwear to localized
          electrostatic potentials at the scrotal surface and to functional
          changes vs. cotton-clad and naked controls. The mechanism is contested
          in humans, but the prudent design choice for a wellness product is to
          remove the variable: 0% polyester at any skin-contact surface.
        </p>
        <p>
          <em>
            Reference: Shafik A. &ldquo;Effect of different types of textile
            fabric on spermatogenesis.&rdquo; <strong>European Urology</strong>,
            1993.
          </em>
        </p>

        <h2>The 0.7&deg;C cooling benefit</h2>
        <p>
          Internal Wellness Boxer thermography work compared a standard
          polyester boxer brief to our airflow-channelled cotton poplin under
          matched body-equivalent humidity and load conditions. We observed a
          repeatable surface-temperature delta of approximately 0.7&deg;C in
          favour of the Wellness Boxer.
        </p>
        <p>
          This is benchtop data, not a randomised clinical trial, and it is
          shared as engineering evidence of design intent &mdash; not as a
          medical claim about fertility outcomes.
        </p>

        <h2>What this product is, and is not</h2>
        <ul>
          <li>
            <strong>Is:</strong> apparel engineered to lower scrotal surface
            temperature and remove synthetic-fibre contact.
          </li>
          <li>
            <strong>Is not:</strong> a medical device, a fertility treatment, or
            a substitute for clinician-led care.
          </li>
        </ul>

        <p>
          See the <a href="/legal/disclaimer">full medical disclaimer</a> for
          regulatory language.
        </p>
      </PageShell>
      <Footer />
    </>
  );
}
