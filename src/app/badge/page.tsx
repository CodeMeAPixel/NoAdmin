import type { Metadata } from "next";
import { BadgeBuilder } from "@/components/tools/BadgeBuilder";
import {
  Callout,
  Card,
  Container,
  PageHeader,
} from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "NoAdmin README badge",
  description:
    "Show server owners that your Discord bot does not request Administrator with a badge for your README or website.",
  path: "/badge",
});

const STATES = [
  {
    color: "bg-green-600",
    label: "no admin",
    text: "A minimal or focused set of permissions.",
  },
  {
    color: "bg-yellow-600",
    label: "no admin",
    text: "No Administrator, but a broad set of sensitive permissions.",
  },
  {
    color: "bg-orange-600",
    label: "no admin",
    text: "No Administrator, but many high-risk permissions.",
  },
  {
    color: "bg-red-600",
    label: "requests admin",
    text: "The invite requests Administrator.",
  },
];

export default function BadgePage() {
  return (
    <Container width="md" className="pb-20">
      <PageHeader
        eyebrow="Tool"
        title="Show that your bot asks for less"
        description="Add a badge to your README, website or bot listing. It is generated from your real invite permissions, so it stays honest, and it links to a full report."
      />
      <Card className="p-4 sm:p-6">
        <BadgeBuilder />
      </Card>

      <section className="mt-10">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
          What the colours mean
        </h2>
        <Card className="divide-y divide-white/[0.05] overflow-hidden">
          {STATES.map((s) => (
            <div
              key={s.color}
              className="flex items-center gap-3 px-4 py-3 sm:px-5"
            >
              <span
                className={`shrink-0 rounded px-2 py-0.5 font-mono text-[11px] text-white ${s.color}`}
              >
                {s.label}
              </span>
              <span className="text-sm text-zinc-400">{s.text}</span>
            </div>
          ))}
        </Card>
      </section>

      <div className="mt-6">
        <Callout tone="info" title="Keep it in sync">
          Point the badge at the same invite link you publish. If your bot
          starts requesting Administrator, the badge will say so.
        </Callout>
      </div>
    </Container>
  );
}
