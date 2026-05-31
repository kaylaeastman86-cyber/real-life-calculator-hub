import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Estimate disclaimer for Real Life Calculator Hub."
};

export default function DisclaimerPage() {
  return (
    <InfoPage
      title="Disclaimer"
      description="Calculator results are estimates only."
    >
      <p>
        Real Life Calculator Hub provides calculator tools and written content for
        general planning. Results may differ from actual amounts because real-life
        details, local prices, employer rules, lender rules, taxes, fees, and personal
        circumstances vary.
      </p>
      <p>
        The site does not provide financial, legal, tax, medical, or professional
        advice. For personal guidance, consider speaking with a qualified professional.
      </p>
    </InfoPage>
  );
}
