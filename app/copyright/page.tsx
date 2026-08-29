import type { Metadata } from "next";
import Link from "next/link";
import { LegalNotice } from "@/components/layout/legal-notice";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Copyright & DMCA — ScoreWell",
  description:
    "How ScoreWell's content may and may not be used, and how to report material that infringes your copyright.",
};

/**
 * Copyright and infringement-reporting notice (site-build-prompt.md section 3a, and
 * section 7a, which asks for this "from day one given how commonly this content gets
 * scraped in this niche").
 *
 * The procedure below is written against the usual DMCA notice-and-takedown shape, but
 * two things are deliberately left unfilled rather than invented: the designated agent
 * and a real contact address. Naming an agent we have not actually registered would be a
 * false claim about a legal process, which is exactly what the shared LegalNotice banner
 * warns this whole page still needs a lawyer for.
 */
export default function CopyrightPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Copyright & DMCA"
          description="Last updated: August 29, 2026"
        />
        <LegalNotice />

        <div className="flex flex-col gap-6 text-ink-body">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-ink">Our content</h2>
            <p>
              The practice tests, question sets, sample answers, explanations, articles, and
              the wording and design of this site are owned by ScoreWell or licensed to us.
              They are provided for your own study.
            </p>
            <p className="mt-3">
              You may not copy, republish, redistribute, sell, or use our content to train or
              populate another service, whether by hand or by automated collection, without
              our written permission. Quoting a short extract with a link back is fine.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-ink">Content you submit</h2>
            <p>
              You keep ownership of the answers and other work you submit. Publishing a
              submission to the community feed grants us a licence to display it on the site;
              you can ask us to remove it at any time. See our{" "}
              <Link href="/terms" className="font-medium text-link hover:underline">
                Terms &amp; Conditions
              </Link>{" "}
              for the full position.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-ink">
              Reporting material that infringes your copyright
            </h2>
            <p>
              If you believe something on ScoreWell copies work you own, tell us and we will
              review it. To let us act quickly, please include all of the following:
            </p>
            <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5">
              <li>Identification of the work you say has been copied</li>
              <li>
                The URL of the page on ScoreWell where the material appears, specific enough
                for us to find it
              </li>
              <li>Your name, postal address, telephone number, and email address</li>
              <li>
                A statement that you believe in good faith the use is not authorised by the
                copyright owner, its agent, or the law
              </li>
              <li>
                A statement that the information in your notice is accurate, and that you are
                the copyright owner or authorised to act on their behalf
              </li>
              <li>Your physical or electronic signature</li>
            </ul>
            <p className="mt-3">
              Send it through our{" "}
              <Link href="/contact" className="font-medium text-link hover:underline">
                contact page
              </Link>
              . We aim to acknowledge reports quickly and will remove or disable access to
              material that we determine is infringing.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-ink">
              If your material was removed in error
            </h2>
            <p>
              If we removed something you posted and you believe that was a mistake or a
              misidentification, contact us with the material concerned, where it appeared,
              and why you believe it was removed in error. We will pass your response to the
              person who reported it and may restore the material.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-ink">Repeat infringers</h2>
            <p>
              We suspend or close the accounts of people who repeatedly post material that
              infringes others&apos; copyright.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
