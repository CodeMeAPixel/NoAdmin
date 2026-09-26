import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Card, Container, PageHeader } from "@/components/ui/primitives";
import { GUIDES } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Guides",
  description:
    "Short, practical guides on Discord permissions for bot developers and server owners.",
  path: "/guides",
});

const AUDIENCE_LABEL = {
  developers: "For developers",
  "server owners": "For server owners",
  everyone: "For everyone",
};

export default function GuidesPage() {
  return (
    <Container className="pb-20">
      <PageHeader
        eyebrow="Guides"
        title="Learn Discord permissions"
        description="Short, practical reads. Each one takes a few minutes and ends with something you can do today."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
            <Card className="flex h-full flex-col p-5 transition-colors group-hover:border-white/20">
              <p className="text-xs text-zinc-500">
                {AUDIENCE_LABEL[g.audience]} · {g.minutes} min read
              </p>
              <h2 className="mt-2 text-base font-semibold text-white">
                {g.title}
              </h2>
              <p className="mt-1 flex-1 text-sm text-zinc-400">{g.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-zinc-300 group-hover:text-white">
                Read <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
