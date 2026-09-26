import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/components/ui/Icon";
import {
  ButtonLink,
  Callout,
  Card,
  Container,
  RiskBadge,
} from "@/components/ui/primitives";
import { analyze, VERDICT_COPY } from "@/lib/analyze";
import { pageMetadata } from "@/lib/metadata";
import { hex, permission } from "@/lib/permissions";
import { TEMPLATE_BY_SLUG, TEMPLATES, templateValue } from "@/lib/templates";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TEMPLATE_BY_SLUG.get(slug);
  if (!t) return { title: "Example not found" };
  return pageMetadata({
    title: `${t.name} permissions`,
    description: `The permissions a ${t.name.toLowerCase()} needs (${templateValue(t)}), why each one is needed, and what it does not need.`,
    path: `/examples/${t.slug}`,
  });
}

export default async function ExamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = TEMPLATE_BY_SLUG.get(slug);
  if (!t) notFound();

  const full = templateValue(t);
  const required = templateValue(t, false);
  const report = analyze(full);
  const hasOptional = full !== required;

  return (
    <Container width="md" className="pb-20 pt-10 sm:pt-14">
      <Link
        href="/examples"
        className="-ml-1 mb-6 inline-flex items-center gap-1 rounded-md px-1 text-sm text-zinc-400 hover:text-white"
      >
        <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> All examples
      </Link>

      <header className="mb-8">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          Example
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {t.name}
        </h1>
        <p className="mt-3 text-pretty text-lg leading-relaxed text-zinc-300">
          {t.description}
        </p>
      </header>

      <Card className="mb-8 p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <p className="text-xs text-zinc-500">
              {hasOptional ? "With optional permissions" : "Permission value"}
            </p>
            <p className="mt-1 break-all font-mono text-2xl font-semibold text-white">
              {full.toString()}
            </p>
            <p className="font-mono text-xs text-zinc-500">{hex(full)}</p>
          </div>
          {hasOptional && (
            <div className="min-w-0">
              <p className="text-xs text-zinc-500">Required only</p>
              <p className="mt-1 break-all font-mono text-2xl font-semibold text-zinc-300">
                {required.toString()}
              </p>
              <p className="font-mono text-xs text-zinc-500">{hex(required)}</p>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
          <CopyButton value={full.toString()} label="Copy value" />
          {hasOptional && (
            <CopyButton
              value={required.toString()}
              label="Copy required only"
            />
          )}
          <span className="text-xs text-zinc-500">
            Verdict: {VERDICT_COPY[report.verdict].label}
          </span>
        </div>
      </Card>

      <section className="mb-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
          Needs
        </h2>
        <Card className="divide-y divide-white/[0.05] overflow-hidden">
          {t.permissions.map((tp) => {
            const perm = permission(tp.key);
            return (
              <Link
                key={tp.key}
                href={`/permissions/${perm.slug}`}
                className="group flex items-start gap-3 px-4 py-3.5 hover:bg-white/[0.02] sm:px-5"
              >
                <Icon
                  name="check"
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-medium text-zinc-100 group-hover:text-white">
                      {perm.name}
                    </span>
                    <RiskBadge risk={perm.risk} />
                    {tp.optional && (
                      <span className="text-[11px] text-zinc-500">
                        optional
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-zinc-400">{tp.reason}</p>
                </div>
              </Link>
            );
          })}
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
          Does not need
        </h2>
        <Card className="divide-y divide-white/[0.05] overflow-hidden">
          {t.notNeeded.map((n) => {
            const perm = permission(n.key);
            return (
              <Link
                key={n.key}
                href={`/permissions/${perm.slug}`}
                className="group flex items-start gap-3 px-4 py-3.5 hover:bg-white/[0.02] sm:px-5"
              >
                <Icon
                  name="x"
                  className={`mt-0.5 h-4 w-4 shrink-0 ${perm.risk === "critical" ? "text-red-400" : "text-zinc-500"}`}
                />
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-zinc-100 group-hover:text-white">
                    {perm.name}
                  </span>
                  <p className="mt-0.5 text-sm text-zinc-400">{n.reason}</p>
                </div>
              </Link>
            );
          })}
        </Card>
      </section>

      {t.tips.length > 0 && (
        <div className="mb-8 space-y-2">
          {t.tips.map((tip) => (
            <Callout key={tip} tone="info" title="Tip">
              {tip}
            </Callout>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <ButtonLink href={`/calculator?template=${t.slug}`} icon="calculator">
          Customize in calculator
        </ButtonLink>
        <ButtonLink href={`/analyze?p=${full}`} variant="secondary" icon="scan">
          Analyze
        </ButtonLink>
      </div>
    </Container>
  );
}
