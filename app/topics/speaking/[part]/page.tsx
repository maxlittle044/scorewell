import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicBankView } from "@/components/content/topic-bank-view";
import {
  SPEAKING_BANK_SLUGS,
  getTopicBank,
  isSpeakingPartSegment,
} from "@/lib/content/topic-banks";

/** Only the three Speaking parts are valid segments; anything else is a 404. */
export function generateStaticParams() {
  return Object.keys(SPEAKING_BANK_SLUGS).map((part) => ({ part }));
}

export async function generateMetadata({
  params,
}: PageProps<"/topics/speaking/[part]">): Promise<Metadata> {
  const { part } = await params;
  if (!isSpeakingPartSegment(part)) return {};

  const bank = await getTopicBank(SPEAKING_BANK_SLUGS[part]);
  if (!bank) return {};

  return {
    title: `${bank.title} — ScoreWell`,
    description: bank.intro,
  };
}

export default async function SpeakingTopicBankPage({
  params,
}: PageProps<"/topics/speaking/[part]">) {
  const { part } = await params;
  if (!isSpeakingPartSegment(part)) notFound();

  const bank = await getTopicBank(SPEAKING_BANK_SLUGS[part]);
  if (!bank) notFound();

  return <TopicBankView bank={bank} />;
}
