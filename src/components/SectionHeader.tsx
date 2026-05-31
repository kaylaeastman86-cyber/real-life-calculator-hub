type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-calm">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-4xl font-bold tracking-normal text-ink sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-slate-700">{description}</p>
      ) : null}
    </div>
  );
}
