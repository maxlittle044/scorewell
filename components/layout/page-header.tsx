export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="relative mb-12">
      <div
        aria-hidden="true"
        className="absolute -left-6 -top-6 h-16 w-16 rounded-full bg-pop-400/20 blur-2xl"
      />
      <div className="mb-3 h-1 w-12 rounded-full bg-linear-to-r from-brand-600 to-pop-500" />
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-lg text-ink-body">{description}</p>}
    </div>
  );
}
