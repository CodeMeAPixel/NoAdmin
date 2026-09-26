import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import {
  Callout,
  Card,
  Container,
  PageHeader,
  RISK_TONE,
} from "@/components/ui/primitives";
import { analyze, VERDICT_COPY } from "@/lib/analyze";
import { pageMetadata } from "@/lib/metadata";
import { decode } from "@/lib/permissions";
import { TEMPLATES, templateValue } from "@/lib/templates";

export const metadata: Metadata = pageMetadata({
  title: "Bot permission examples",
  description:
    "The exact permissions ten common kinds of Discord bot need, with the reason for each one. None of them need Administrator.",
  path: "/examples",
});

export default function ExamplesPage() {
  return (
    <Container className="pb-20">
      <PageHeader
        eyebrow="Examples"
        title="What common bots actually need"
        description="Ten bot types, the exact permissions each one uses and why. Not one of them needs Administrator."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {TEMPLATES.map((t) => {
          const value = templateValue(t);
          const { permissions } = decode(value);
          const report = analyze(value);
          return (
            <Link key={t.slug} href={`/examples/${t.slug}`} className="group">
              <Card className="flex h-full flex-col p-5 transition-colors group-hover:border-white/20">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold text-white">
                    {t.name}
                  </h2>
                  <Icon
                    name="arrowRight"
                    className="mt-1 h-4 w-4 shrink-0 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </div>
                <p className="mt-1 text-sm text-zinc-400">{t.summary}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500">
                  <span>{permissions.length} permissions</span>
                  {(["high", "medium"] as const).map((r) =>
                    report.byRisk[r].length ? (
                      <span key={r} className={RISK_TONE[r].text}>
                        {report.byRisk[r].length} {r} risk
                      </span>
                    ) : null,
                  )}
                  <span className="ml-auto font-mono text-zinc-400">
                    {value.toString()}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  Verdict: {VERDICT_COPY[report.verdict].label}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="mt-8">
        <Callout tone="ok" title="Notice something?">
          The most demanding bot here, a full moderation bot, is still limited
          by role hierarchy and channel overwrites. Administrator would remove
          both limits and add nothing it needs.
        </Callout>
      </div>
    </Container>
  );
}
