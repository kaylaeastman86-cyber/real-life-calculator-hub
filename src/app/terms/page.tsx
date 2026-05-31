import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Real Life Calculator Hub."
};

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms"
      description="By using Real Life Calculator Hub, you agree to use the site for general informational purposes."
    >
      <p>
        The calculators and written content on this site are provided for general
        planning and educational use. They are not a substitute for advice from a
        qualified professional.
      </p>
      <p>
        We try to keep content clear and useful, but we do not promise that every
        estimate will match your exact real-world cost, paycheck, bill, or outcome.
      </p>
      <h2 className="text-2xl font-bold tracking-normal text-ink">Use of the site</h2>
      <p>
        You agree not to misuse the site, attempt to disrupt it, or rely on calculator
        results as the only basis for important financial decisions.
      </p>
    </InfoPage>
  );
}
