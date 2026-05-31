import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorTool } from "@/components/CalculatorTool";
import { calculators, getCalculatorBySlug } from "@/lib/calculators";

type CalculatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return calculators.map((calculator) => ({
    slug: calculator.slug
  }));
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return {
      title: "Calculator Not Found"
    };
  }

  return {
    title: calculator.metaTitle,
    description: calculator.metaDescription
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  const relatedCalculators = calculator.relatedSlugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <p className="text-sm font-bold uppercase tracking-wide text-calm">
        {calculator.category}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-normal text-ink sm:text-5xl">
        {calculator.title}
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">{calculator.intro}</p>

      <div className="mt-8 space-y-4 leading-8 text-slate-700">
        {calculator.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-10" aria-labelledby="calculator-tool-heading">
        <h2 className="mb-4 text-3xl font-bold tracking-normal text-ink" id="calculator-tool-heading">
          Calculator
        </h2>
        <CalculatorTool slug={calculator.slug} />
      </section>

      <section className="mt-10" aria-labelledby="related-heading">
        <h2 className="text-3xl font-bold tracking-normal text-ink" id="related-heading">
          Related calculators
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {relatedCalculators.map((related) =>
            related ? (
              <Link
                className="rounded-lg border border-slate-200 bg-white p-4 font-bold text-ink shadow-sm hover:border-calm hover:text-calm"
                href={`/calculators/${related.slug}`}
                key={related.slug}
              >
                {related.title}
              </Link>
            ) : null
          )}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="faq-heading">
        <h2 className="text-3xl font-bold tracking-normal text-ink" id="faq-heading">
          FAQ
        </h2>
        <div className="mt-5 space-y-5">
          {calculator.faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-xl font-bold tracking-normal text-ink">
                {faq.question}
              </h3>
              <p className="mt-2 leading-7 text-slate-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-slate-200 pt-6">
        <h2 className="text-2xl font-bold tracking-normal text-ink">Estimate disclaimer</h2>
        <p className="mt-3 leading-7 text-slate-700">
          Results are estimates only. This page is for general planning and does not
          provide financial, legal, tax, medical, or professional advice.
        </p>
      </section>
    </article>
  );
}
