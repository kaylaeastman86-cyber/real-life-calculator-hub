import Link from "next/link";
import type { CalculatorSummary } from "@/lib/calculators";

type CalculatorCardProps = {
  calculator: CalculatorSummary;
};

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-calm">{calculator.category}</p>
      <h2 className="mt-2 text-xl font-bold tracking-normal text-ink">
        <Link className="hover:text-calm" href={`/calculators/${calculator.slug}`}>
          {calculator.title}
        </Link>
      </h2>
      <p className="mt-3 leading-7 text-slate-700">{calculator.intro}</p>
      <Link
        className="mt-5 inline-flex min-h-11 items-center rounded-md bg-calm px-4 py-2 font-bold text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-calm focus:ring-offset-2"
        href={`/calculators/${calculator.slug}`}
      >
        Open calculator
      </Link>
    </article>
  );
}
