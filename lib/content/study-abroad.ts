import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Study-abroad destinations (site-build-prompt.md section 4b).
 *
 * ARTICLEs split off by taskType "study-abroad", the same pattern tips, announcements,
 * topic banks and grammar points use, so this needed no schema change.
 *
 * These pages carry no score requirements and no rankings — see the seed file for why.
 */

export const STUDY_ABROAD_TASK_TYPE = "study-abroad";

const InstitutionSchema = z.object({
  name: z.string(),
  city: z.string(),
  url: z.string(),
});

const DestinationDataSchema = z.object({
  summary: z.string(),
  whichTest: z.array(z.string()).min(1),
  usedFor: z.array(z.string()).min(1),
  beforeYouBook: z.array(z.string()).min(1),
  officialSources: z.array(z.object({ label: z.string(), href: z.string() })).min(1),
  institutions: z.array(InstitutionSchema),
});

export type Institution = z.infer<typeof InstitutionSchema>;

export type Destination = z.infer<typeof DestinationDataSchema> & {
  slug: string;
  title: string;
  country: string;
  tags: string[];
};

/** The country is stored in `topic`, so the index and the table can group on it. */
function toDestination(item: {
  slug: string;
  title: string;
  topic: string | null;
  tags: string[];
  data: unknown;
}): Destination | null {
  const parsed = DestinationDataSchema.safeParse(item.data);
  if (!parsed.success) return null;
  return {
    slug: item.slug,
    title: item.title,
    country: item.topic ?? item.title,
    tags: item.tags,
    ...parsed.data,
  };
}

export async function listDestinations(): Promise<Destination[]> {
  const items = await prisma.contentItem.findMany({
    where: {
      contentType: "ARTICLE",
      taskType: STUDY_ABROAD_TASK_TYPE,
      published: true,
    },
    select: { slug: true, title: true, topic: true, tags: true, data: true },
  });

  return items
    .flatMap((item) => {
      const destination = toDestination(item);
      return destination ? [destination] : [];
    })
    .sort((a, b) => a.country.localeCompare(b.country));
}

export async function getDestination(slug: string): Promise<Destination | null> {
  const item = await prisma.contentItem.findFirst({
    where: {
      slug,
      contentType: "ARTICLE",
      taskType: STUDY_ABROAD_TASK_TYPE,
      published: true,
    },
    select: { slug: true, title: true, topic: true, tags: true, data: true },
  });
  return item ? toDestination(item) : null;
}

export type ListedInstitution = Institution & {
  country: string;
  destinationSlug: string;
};

/**
 * Every institution across every destination, for the combined list.
 *
 * Flattened from the destinations rather than stored separately: an institution only exists
 * here as part of a country's page, and a second copy of the list would be a second thing to
 * keep true.
 */
export function collectInstitutions(destinations: Destination[]): ListedInstitution[] {
  return destinations
    .flatMap((destination) =>
      destination.institutions.map((institution) => ({
        ...institution,
        country: destination.country,
        destinationSlug: destination.slug,
      })),
    )
    .sort((a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name));
}
