import type { Metadata } from "next";
import { CalculatorCard } from "@/components/CalculatorCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getCalculatorSummaries } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Calculators",
  description:
    "Browse simple everyday calculators for income, rent, transportation, budgets, savings, and debt planning."
};

export default function CalculatorsIndexPage() {
  const calculatorSummaries = getCalculatorSummaries();

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <SectionHeader
        eyebrow="Calculator library"
        title="Everyday calculators"
        description="Choose a calculator below to estimate a real-life cost, budget target, or income number."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {calculatorSummaries.map((calculator) => (
          <CalculatorCard calculator={calculator} key={calculator.slug} />
        ))}
      </div>
    </section>
  );
}
