import type { Metadata } from "next";
import { InfoPage } from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Real Life Calculator Hub and its simple everyday planning calculators."
};

export default function AboutPage() {
  return (
    <InfoPage
      title="About Real Life Calculator Hub"
      description="Real Life Calculator Hub is built to make everyday planning a little clearer."
    >
      <p>
        The site focuses on simple calculators for common money questions: paychecks,
        rent, driving costs, budgets, emergency savings, debt payoff, and similar
        real-life decisions.
      </p>
      <p>
        Every calculator is meant to be easy to read on a phone, clear about its
        assumptions, and honest about being an estimate. The goal is practical help,
        not complicated financial advice.
      </p>
      <h2 className="text-2xl font-bold tracking-normal text-ink">Our approach</h2>
      <p>
        We use plain-English inputs, short explanations, and simple formulas that are
        separated from the page layout so the tools can be reviewed and improved over time.
      </p>
    </InfoPage>
  );
}
