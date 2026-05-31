type InfoPageProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function InfoPage({ title, description, children }: InfoPageProps) {
  return (
    <section className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <h1 className="text-4xl font-bold tracking-normal text-ink">{title}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-700">{description}</p>
      <div className="mt-8 space-y-5 leading-8 text-slate-700">
        {children}
      </div>
    </section>
  );
}
