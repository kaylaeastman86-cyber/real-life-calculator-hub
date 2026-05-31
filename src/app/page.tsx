import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getCalculatorSummaries } from "@/lib/calculators";

export default function HomePage() {
  const allCalculators = getCalculatorSummaries();
  const featuredCalculators = allCalculators.slice(0, 3);

  return (
    <>
      <section className="bg-skywash">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Everyday estimates"
              title="Real Life Calculator Hub"
              description="Simple calculators for paychecks, rent, transportation, budgets, and everyday money decisions."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-calm px-5 py-3 font-bold text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-calm focus:ring-offset-2"
                href="/calculators"
              >
                Browse calculators
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 font-bold text-ink hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-calm focus:ring-offset-2"
                href="/about"
              >
                About the site
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-bold tracking-normal text-ink">
              Popular calculators
            </h2>
            <ul className="mt-4 space-y-3">
              {featuredCalculators.map((calculator) => (
                <li key={calculator.slug}>
                  <Link
                    className="block rounded-md border border-slate-200 px-4 py-3 font-bold text-ink hover:border-calm hover:text-calm"
                    href={`/calculators/${calculator.slug}`}
                  >
                    {calculator.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-calm">
              MVP calculators
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal text-ink">
              Start with the tools people use most
            </h2>
          </div>
          <Link className="font-bold text-calm hover:text-teal-800" href="/calculators">
            View all calculators
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featuredCalculators.map((calculator) => (
            <CalculatorCard calculator={calculator} key={calculator.slug} />
          ))}
        </div>
      </section>

      <section className="bg-peachwash">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="text-3xl font-bold tracking-normal text-ink">
            Helpful, simple, and transparent
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
            These calculators are designed for everyday planning, not promises or
            professional advice. Each tool explains what the estimate means and where
            real-life costs may vary.
          </p>
        </div>
      </section>
    </>
  );
}
