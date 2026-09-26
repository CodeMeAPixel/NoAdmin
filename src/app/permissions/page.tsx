import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  Container,
  PageHeader,
  RISK_TONE,
  RiskBadge,
} from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/metadata";
import {
  CATALOG_VERIFIED,
  CATEGORIES,
  DISCORD_DOCS_URL,
  flag,
  PERMISSIONS,
  RISK_ORDER,
} from "@/lib/permissions";

export const metadata: Metadata = pageMetadata({
  title: "Discord permission reference",
  description:
    "Every Discord permission with its bit, value, risk level and what it lets a bot do. Verified against Discord's official documentation.",
  path: "/permissions",
});

export default function PermissionsPage() {
  const counts = RISK_ORDER.map((r) => ({
    risk: r,
    count: PERMISSIONS.filter((perm) => perm.risk === r).length,
  }));

  return (
    <Container className="pb-20">
      <PageHeader
        eyebrow="Reference"
        title="Every Discord permission"
        description={
          <>
            All {PERMISSIONS.length} permissions, what they let a bot do, and
            how much damage each could cause in the wrong hands. Checked against{" "}
            <a
              href={DISCORD_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 underline underline-offset-4 hover:text-white"
            >
              Discord&apos;s documentation
            </a>{" "}
            on {CATALOG_VERIFIED}.
          </>
        }
      >
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-zinc-400">
          {counts.map(({ risk, count }) => (
            <span key={risk} className="inline-flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${RISK_TONE[risk].dot}`} />
              {count} {RISK_TONE[risk].label.toLowerCase()} risk
            </span>
          ))}
        </div>
      </PageHeader>

      <div className="space-y-8">
        {CATEGORIES.map((cat) => {
          const perms = PERMISSIONS.filter((perm) => perm.category === cat.id);
          return (
            <section key={cat.id} aria-labelledby={`c-${cat.id}`}>
              <h2
                id={`c-${cat.id}`}
                className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400"
              >
                {cat.name}
              </h2>
              <Card className="divide-y divide-white/[0.05] overflow-hidden">
                {perms.map((perm) => (
                  <Link
                    key={perm.key}
                    href={`/permissions/${perm.slug}`}
                    className="group grid gap-x-4 gap-y-1 px-4 py-3.5 transition-colors hover:bg-white/[0.02] sm:grid-cols-[minmax(0,1fr)_auto] sm:px-5"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-medium text-zinc-100 group-hover:text-white">
                          {perm.name}
                        </span>
                        <RiskBadge risk={perm.risk} />
                        {perm.requires2fa && (
                          <span className="text-[11px] text-zinc-500">2FA</span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-sm text-zinc-400">
                        {perm.detail}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs text-zinc-500 sm:justify-end">
                      <span>1 &lt;&lt; {perm.bit}</span>
                      <span className="text-zinc-400">
                        {flag(perm).toString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </Card>
            </section>
          );
        })}
      </div>
      <p className="mt-8 text-xs text-zinc-500">
        Bit 47 is unused by Discord. 2FA marks permissions that need the bot
        owner to have two-factor authentication in servers that require it for
        moderation.
      </p>
    </Container>
  );
}
