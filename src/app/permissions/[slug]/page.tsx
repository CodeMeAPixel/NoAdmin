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
  RISK_TONE,
  RiskBadge,
} from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/metadata";
import {
  BY_SLUG,
  CATEGORIES,
  DISCORD_DOCS_URL,
  flag,
  hex,
  PERMISSIONS,
} from "@/lib/permissions";
import { TEMPLATES } from "@/lib/templates";

export function generateStaticParams() {
  return PERMISSIONS.map((perm) => ({ slug: perm.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const perm = BY_SLUG.get(slug);
  if (!perm) return { title: "Permission not found" };
  return pageMetadata({
    title: `${perm.name} permission`,
    description: `${perm.name} (${perm.key}, value ${flag(perm)}): ${perm.detail}`,
    path: `/permissions/${perm.slug}`,
  });
}

const CHANNEL_LABEL = { text: "Text", voice: "Voice", stage: "Stage" };

export default async function PermissionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const perm = BY_SLUG.get(slug);
  if (!perm) notFound();

  const value = flag(perm);
  const usedBy = TEMPLATES.filter((t) =>
    t.permissions.some((tp) => tp.key === perm.key),
  );
  const notNeededBy = TEMPLATES.filter((t) =>
    t.notNeeded.some((n) => n.key === perm.key),
  );
  const index = PERMISSIONS.indexOf(perm);
  const prev = PERMISSIONS[index - 1];
  const next = PERMISSIONS[index + 1];
  const category = CATEGORIES.find((c) => c.id === perm.category)?.name;

  return (
    <Container width="md" className="pb-20 pt-10 sm:pt-14">
      <Link
        href="/permissions"
        className="-ml-1 mb-6 inline-flex items-center gap-1 rounded-md px-1 text-sm text-zinc-400 hover:text-white"
      >
        <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> All
        permissions
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <RiskBadge risk={perm.risk} />
          <span className="text-xs text-zinc-500">{category}</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {perm.name}
        </h1>
        <p className="mt-1 font-mono text-sm text-zinc-500">{perm.key}</p>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-zinc-300">
          {perm.detail}
        </p>
      </header>

      <Card className="mb-8 p-4 sm:p-5">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <dt className="text-xs text-zinc-500">Value</dt>
            <dd className="mt-1 flex items-center gap-2 font-mono text-sm text-zinc-100">
              <span className="break-all">{value.toString()}</span>
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Bit</dt>
            <dd className="mt-1 font-mono text-sm text-zinc-100">
              1 &lt;&lt; {perm.bit}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Hex</dt>
            <dd className="mt-1 font-mono text-sm text-zinc-100">
              {hex(value)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Channel types</dt>
            <dd className="mt-1 text-sm text-zinc-100">
              {perm.channels.length
                ? perm.channels.map((c) => CHANNEL_LABEL[c]).join(", ")
                : "Server only"}
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
          <CopyButton value={value.toString()} label="Copy value" />
          <p className="text-xs text-zinc-500">
            Discord&apos;s description: &ldquo;{perm.summary}&rdquo;
          </p>
        </div>
      </Card>

      <div className="space-y-3">
        {perm.abuse && (
          <Callout
            tone={
              perm.risk === "critical"
                ? "danger"
                : perm.risk === "high"
                  ? "high"
                  : perm.risk === "medium"
                    ? "warn"
                    : "muted"
            }
            title="If the bot's token leaks"
          >
            {perm.abuse}
          </Callout>
        )}
        {perm.alternative && (
          <Callout tone="ok" title="Safer alternative">
            {perm.alternative}
          </Callout>
        )}
        {perm.requires2fa && (
          <Callout tone="info" title="Affected by server 2FA">
            In servers that require two-factor authentication for moderation,
            this permission only works if the bot owner&apos;s account (or the
            team owner) has 2FA enabled.
          </Callout>
        )}
      </div>

      {(usedBy.length > 0 || notNeededBy.length > 0) && (
        <section className="mt-10">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
            In the bot examples
          </h2>
          <Card className="divide-y divide-white/[0.05] overflow-hidden">
            {usedBy.map((t) => {
              const tp = t.permissions.find((x) => x.key === perm.key);
              return (
                <Link
                  key={t.slug}
                  href={`/examples/${t.slug}`}
                  className="block px-4 py-3 hover:bg-white/[0.02] sm:px-5"
                >
                  <span className="text-sm font-medium text-zinc-100">
                    {t.name}
                  </span>
                  <span className={`ml-2 text-xs ${RISK_TONE.low.text}`}>
                    uses it{tp?.optional ? " (optional)" : ""}
                  </span>
                  <p className="mt-0.5 text-sm text-zinc-400">{tp?.reason}</p>
                </Link>
              );
            })}
            {notNeededBy.map((t) => (
              <Link
                key={t.slug}
                href={`/examples/${t.slug}`}
                className="block px-4 py-3 hover:bg-white/[0.02] sm:px-5"
              >
                <span className="text-sm font-medium text-zinc-100">
                  {t.name}
                </span>
                <span className="ml-2 text-xs text-zinc-500">
                  does not need it
                </span>
                <p className="mt-0.5 text-sm text-zinc-400">
                  {t.notNeeded.find((n) => n.key === perm.key)?.reason}
                </p>
              </Link>
            ))}
          </Card>
        </section>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={`/calculator?p=${value}`} icon="calculator">
          Start a calculation with it
        </ButtonLink>
        <ButtonLink
          href={DISCORD_DOCS_URL}
          variant="secondary"
          icon="external"
          external
        >
          Discord docs
        </ButtonLink>
      </div>

      <nav
        className="mt-12 grid grid-cols-2 gap-3 border-t border-white/[0.06] pt-6 text-sm"
        aria-label="Adjacent permissions"
      >
        {prev ? (
          <Link
            href={`/permissions/${prev.slug}`}
            className="text-zinc-400 hover:text-white"
          >
            <span className="block text-xs text-zinc-500">Previous</span>
            {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/permissions/${next.slug}`}
            className="text-right text-zinc-400 hover:text-white"
          >
            <span className="block text-xs text-zinc-500">Next</span>
            {next.name}
          </Link>
        )}
      </nav>
    </Container>
  );
}
