import { z } from "zod";
import { prisma } from "@/lib/prisma";

const CourseDataSchema = z.object({
  description: z.string(),
  level: z.string(),
  gradient: z.string(),
  lessons: z.array(
    z.object({
      title: z.string(),
      summary: z.string(),
      href: z.string().optional(),
    }),
  ),
});

export type Course = {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  level: string;
  gradient: string;
  lessons: { title: string; summary: string; href?: string }[];
};

export async function getCourse(slug: string): Promise<Course | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "COURSE", published: true },
  });
  if (!item) return null;

  const parsed = CourseDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return { id: item.id, slug: item.slug, title: item.title, tags: item.tags, ...parsed.data };
}

export async function listCourses() {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "COURSE", published: true },
    orderBy: { slug: "asc" },
    select: { slug: true, title: true, data: true },
  });

  return items.map((item) => {
    const parsed = CourseDataSchema.safeParse(item.data);
    return {
      slug: item.slug,
      title: item.title,
      description: parsed.success ? parsed.data.description : "",
      gradient: parsed.success ? parsed.data.gradient : "from-zinc-500 to-zinc-700",
      lessonCount: parsed.success ? parsed.data.lessons.length : 0,
    };
  });
}
