import { ClinicalProof } from "components/marketing/clinical-proof";
import { CraftedInBarcelos } from "components/marketing/crafted-in-barcelos";
import { HeroMicroclimate } from "components/marketing/hero-microclimate";
import { LifestyleClose } from "components/marketing/lifestyle-close";
import { MaterialsTraceability } from "components/marketing/materials-traceability";
import { RecoveryRitual } from "components/marketing/recovery-ritual";
import { RoadmapToWellness } from "components/marketing/roadmap";
import { SubscriptionBundles } from "components/marketing/subscription-bundles";
import { TripleZeroStandard } from "components/marketing/triple-zero-standard";
import Footer from "components/layout/footer";

export const metadata = {
  title: "The boxer engineered for pelvic wellness",
  description:
    "Wellness Boxer: the Triple Zero Standard. 0% polyester, 0% buttons, 0% microplastics. Roica V550 biodegradable stretch in 95% organic cotton poplin, crafted in Portugal.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Wellness Boxer",
    description:
      "The Triple Zero Standard boxer with a 3D-engineered overlap fly, skin-safe tunnel waistband, and Roica V550 biodegradable stretch in 95% organic cotton poplin.",
    brand: { "@type": "Brand", name: "Wellness Boxer" },
    image: "/images/airflow-channels.png",
    countryOfOrigin: "PT",
    material: "95% Organic Cotton, 5% Roica\u2122 V550 elastane",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <HeroMicroclimate />
      <TripleZeroStandard />
      <ClinicalProof />
      <MaterialsTraceability />
      <CraftedInBarcelos />
      <RecoveryRitual />
      <RoadmapToWellness />
      <LifestyleClose />
      <SubscriptionBundles />
      <Footer />
    </>
  );
}
