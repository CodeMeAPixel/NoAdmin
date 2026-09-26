import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import {
  ButtonLink,
  Card,
  Container,
  RISK_TONE,
  SectionTitle,
} from "@/components/ui/primitives";
import { analyze } from "@/lib/analyze";
import { GUIDES } from "@/lib/guides";
import { PERMISSIONS } from "@/lib/permissions";
import { SITE_URL } from "@/lib/site";
import { TEMPLATES, templateValue } from "@/lib/templates";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "NoAdmin",
      url: SITE_URL,
      description:
        "Least-privilege tools and guides for Discord bot developers.",
    },
    {
      "@type": "WebApplication",
      name: "NoAdmin permission calculator and invite analyzer",
      url: `${SITE_URL}/calculator`,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      isAccessibleForFree: true,
      featureList: [
        "Discord permission calculator",
        "Bot invite link analyzer",
        "Permission reference",
        "README badge generator",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

const TOOLS: { href: string; icon: IconName; title: string; body: string }[] = [
  {
    href: "/calculator",
    icon: "calculator",
    title: "Permission calculator",
    body: "Pick exactly what your bot uses. Get the value, an invite link and code for your library.",
  },
  {
    href: "/analyze",
    icon: "scan",
    title: "Invite analyzer",
    body: "Paste any bot invite to see what it grants and what it could do if compromised.",
  },
  {
    href: "/permissions",
    icon: "list",
    title: "Permission reference",
    body: `All ${PERMISSIONS.length} permissions with risk levels, values and safer alternatives.`,
  },
  {
    href: "/examples",
    icon: "bot",
    title: "Bot examples",
    body: `The real permission sets for ${TEMPLATES.length} common bot types, with a reason for each.`,
  },
  {
    href: "/guides",
    icon: "book",
    title: "Guides",
    body: "Overwrites, role hierarchy, bitfields and handling missing permissions in code.",
  },
  {
    href: "/badge",
    icon: "badge",
    title: "README badge",
    body: "Show server owners your bot asks for less, generated from your real invite.",
  },
];

const COMPARE = {
  admin: [
    "Every permission, including ones Discord adds in the future",
    "Ignores every channel restriction a server owner sets",
    "A leaked token can delete channels, ban members and plant phishing webhooks",
    "Server owners cannot limit what the bot can reach",
  ],
  scoped: [
    "Only the permissions your features use",
    "Owners can keep the bot out of private channels",
    "A leaked token is limited to what those permissions allow",
    "Clear, reviewable, and trusted by bot lists",
  ],
};

export default function Home() {
  const featured = ["moderation", "music", "tickets", "reaction-roles"]
    .map((slug) => TEMPLATES.find((t) => t.slug === slug))
    .filter((t) => t !== undefined);

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from constants, with < escaped
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
        }}
      />
      <section className="border-b border-white/[0.06]">
        <Container className="pb-16 pt-14 sm:pb-20 sm:pt-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-3 py-1 text-xs text-zinc-300">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            Least-privilege tools for Discord bots
          </p>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Your bot doesn&apos;t need Administrator.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400">
            Administrator turns off every safety check in a server. Find the few
            permissions your bot actually uses, and check any bot before you add
            it.
          </p>

          <form action="/analyze" method="get" className="mt-8 max-w-2xl">
            <label
              htmlFor="hero-invite"
              className="mb-2 block text-sm text-zinc-300"
            >
              Check a bot&apos;s invite link
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <Icon
                  name="link"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                />
                <input
                  id="hero-invite"
                  name="invite"
                  required
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="https://discord.com/oauth2/authorize?client_id=..."
                  className="w-full rounded-lg border border-white/[0.12] bg-zinc-900/60 py-3 pl-9 pr-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Analyze <Icon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Building a bot instead?{" "}
              <Link
                href="/calculator"
                className="text-zinc-300 underline underline-offset-4 hover:text-white"
              >
                Open the calculator
              </Link>
              .
            </p>
          </form>
        </Container>
      </section>

      <Container className="py-16">
        <SectionTitle>The difference</SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          <Card className="border-red-500/25 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-red-400">
              <Icon name="shieldAlert" className="h-5 w-5" />
              <h2 className="text-base font-semibold">With Administrator</h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {COMPARE.admin.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-zinc-300">
                  <Icon
                    name="x"
                    className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="border-emerald-500/25 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-emerald-400">
              <Icon name="shieldCheck" className="h-5 w-5" />
              <h2 className="text-base font-semibold">
                With scoped permissions
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5">
              {COMPARE.scoped.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-zinc-300">
                  <Icon
                    name="check"
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>

      <Container className="pb-16">
        <SectionTitle>Tools</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="group">
              <Card className="h-full p-5 transition-colors group-hover:border-white/20">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                  <Icon name={tool.icon} className="h-4 w-4 text-zinc-200" />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-white">
                  {tool.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{tool.body}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="pb-16">
        <SectionTitle
          action={
            <Link
              href="/examples"
              className="text-xs text-zinc-400 hover:text-white"
            >
              All {TEMPLATES.length} examples
            </Link>
          }
        >
          What real bots need
        </SectionTitle>
        <Card className="divide-y divide-white/[0.05] overflow-hidden">
          {featured.map((t) => {
            const value = templateValue(t);
            const report = analyze(value);
            return (
              <Link
                key={t.slug}
                href={`/examples/${t.slug}`}
                className="group flex items-center gap-4 px-4 py-4 hover:bg-white/[0.02] sm:px-5"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-zinc-100 group-hover:text-white">
                    {t.name}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-zinc-400">
                    {t.summary}
                  </p>
                </div>
                <div
                  className="hidden shrink-0 items-center gap-1 sm:flex"
                  aria-hidden="true"
                >
                  {report.permissions.map((perm) => (
                    <span
                      key={perm.key}
                      className={`h-5 w-1.5 rounded-full ${RISK_TONE[perm.risk].bar}`}
                      title={perm.name}
                    />
                  ))}
                </div>
                <span className="shrink-0 font-mono text-xs text-zinc-400">
                  {value.toString()}
                </span>
              </Link>
            );
          })}
        </Card>
        <p className="mt-3 text-xs text-zinc-500">
          Each bar is one permission, coloured by risk. None of these bots
          request Administrator.
        </p>
      </Container>

      <Container className="pb-20">
        <SectionTitle
          action={
            <Link
              href="/guides"
              className="text-xs text-zinc-400 hover:text-white"
            >
              All guides
            </Link>
          }
        >
          Learn
        </SectionTitle>
        <div className="grid gap-3 md:grid-cols-3">
          {GUIDES.slice(0, 3).map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}`} className="group">
              <Card className="h-full p-5 transition-colors group-hover:border-white/20">
                <p className="text-xs text-zinc-500">{g.minutes} min read</p>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {g.title}
                </h3>
                <p className="mt-1 text-sm text-zinc-400">{g.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/calculator" icon="arrowRight">
            Build your permission set
          </ButtonLink>
          <ButtonLink href="/guides/why-not-administrator" variant="secondary">
            Why not Administrator?
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
