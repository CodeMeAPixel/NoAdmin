import type { Metadata } from "next";
import { Analyzer } from "@/components/tools/Analyzer";
import { Container, PageHeader } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Invite link analyzer",
  description:
    "Paste a Discord bot invite link or permission number to see exactly what it grants, how risky it is, and what it could do if the bot's token leaked.",
  path: "/analyze",
});

export default async function AnalyzePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const pick = (key: string) => {
    const v = params[key];
    return typeof v === "string" ? v : "";
  };
  const initial = pick("invite") || pick("p");

  return (
    <Container width="md" className="pb-20">
      <PageHeader
        eyebrow="Tool"
        title="Is this bot asking for too much?"
        description="Paste a bot's invite link or permission number. You'll see every permission it requests, how risky each one is, and what it could do if the bot were compromised."
      />
      <Analyzer initial={initial} />
    </Container>
  );
}
