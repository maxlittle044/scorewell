import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { PrintButton } from "@/components/content/print-button";
import { PrintableAnswerKey, PrintableDocBody } from "@/components/content/printable-doc";
import { UnlockPackButton } from "@/components/content/unlock-pack-button";
import { getCreditBalance } from "@/lib/credits";
import { PACK_COST_CREDITS, describeSkills } from "@/lib/content/practice-pack-config";
import { getPack, hasBoughtPack, hasPremiumPlan } from "@/lib/content/practice-packs";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/practice-packs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const pack = await getPack(slug);
  return {
    title: `${pack?.name ?? titleFromSlug(slug)} — practice pack | ScoreWell`,
    // The sheet reprints tests that are each indexed on their own page.
    robots: { index: false, follow: false },
  };
}

/** Shown to anyone who has not unlocked the pack: what is inside, and how to get it. */
function Locked({
  slug,
  name,
  testCount,
  skills,
  signedIn,
  credits,
}: {
  slug: string;
  name: string;
  testCount: number;
  skills: string;
  signedIn: boolean;
  credits: number;
}) {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-ink">{name}</h1>
      <p className="mt-2 text-sm text-ink-muted">
        {testCount} tests · {skills}
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-surface-muted p-6">
        <h2 className="text-sm font-semibold text-ink">This pack is locked</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-body">
          It costs {PACK_COST_CREDITS} credits, and is included with Premium. Every test inside is
          also free to print on its own — the pack just assembles them into one document with the
          answer keys at the back.
        </p>

        <div className="mt-5">
          {signedIn ? (
            <UnlockPackButton slug={slug} credits={credits} />
          ) : (
            <Link href="/login" className="text-sm font-semibold text-link hover:underline">
              Log in to unlock →
            </Link>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-body">
        <Link href="/practice-packs" className="font-medium text-link hover:underline">
          All practice packs
        </Link>{" "}
        ·{" "}
        <Link href="/exam-library" className="font-medium text-link hover:underline">
          Print tests one at a time, free
        </Link>
      </p>
    </main>
  );
}

export default async function PracticePackPage({
  params,
}: PageProps<"/practice-packs/[slug]">) {
  const { slug } = await params;
  const pack = await getPack(slug);

  if (!pack) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
        <p className="mt-4 text-sm text-ink-muted">
          There&apos;s no practice pack by that name.{" "}
          <Link href="/practice-packs" className="font-medium text-link hover:underline">
            See the packs
          </Link>
          .
        </p>
      </main>
    );
  }

  const session = await auth();
  const [isPremium, bought, credits] = session?.user
    ? await Promise.all([
        hasPremiumPlan(session.user.id),
        hasBoughtPack(session.user.id, slug),
        getCreditBalance(session.user.id),
      ])
    : [false, false, 0];

  if (!isPremium && !bought) {
    return (
      <Locked
        slug={slug}
        name={pack.name}
        testCount={pack.testCount}
        skills={describeSkills(pack.skills)}
        signedIn={Boolean(session?.user)}
        credits={credits}
      />
    );
  }

  const firstKeySlug = pack.docs.find((doc) => doc.questions.length > 0)?.slug;

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
      {/* Screen-only controls; the print stylesheet drops them from the sheet. */}
      <div
        data-print-controls
        className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface-muted p-4 print:hidden"
      >
        <p className="text-sm text-ink-body">
          Print the whole pack, or save it as a PDF from your browser&apos;s print dialog.
        </p>
        <PrintButton />
      </div>

      <header className="mb-10 border-b border-line-strong pb-5">
        <h1 className="font-display text-3xl font-bold text-ink">{pack.name}</h1>
        <p className="mt-2 text-sm text-ink-body">
          {pack.testCount} practice tests · {describeSkills(pack.skills)}
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          Answer keys for every test are at the back of this document.
        </p>
      </header>

      {/* Each test starts its own sheet, so a pack can be printed and stapled as a booklet. */}
      {pack.docs.map((doc, index) => (
        <section key={doc.slug} className={index > 0 ? "break-before-page pt-8" : undefined}>
          <PrintableDocBody doc={doc} />
        </section>
      ))}

      {/* Every key together at the back rather than after each test — the point of the pack
          is to sit the whole set before checking any of it. Only the first key breaks onto a
          new sheet; Writing and Speaking tests have no key and render nothing here, so the
          break is anchored to the first test that actually has one. */}
      {pack.docs.map((doc) => (
        <PrintableAnswerKey
          key={`key-${doc.slug}`}
          doc={doc}
          startsNewSheet={doc.slug === firstKeySlug}
        />
      ))}

      <p className="mt-10 text-xs text-ink-muted print:mt-6">
        ScoreWell · scorewell.app — for personal study use.
      </p>
    </main>
  );
}
