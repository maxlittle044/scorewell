import Link from "next/link";

export function ContentCard({
  tag,
  title,
  meta,
  href,
}: {
  tag: string;
  title: string;
  meta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="inline-block w-fit rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600">
        {tag}
      </span>
      <h3 className="mt-2.5 font-semibold text-zinc-900 group-hover:text-brand-600">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-zinc-500">{meta}</p>
    </Link>
  );
}
