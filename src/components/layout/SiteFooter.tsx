import Image from "next/image";
import Link from "next/link";
import { GitHubIcon } from "@/components/ui/Icon";
import { CATALOG_VERIFIED, DISCORD_DOCS_URL } from "@/lib/permissions";
import { GITHUB_URL } from "@/lib/site";

const COLUMNS = [
  {
    title: "Tools",
    links: [
      { name: "Permission calculator", href: "/calculator" },
      { name: "Invite analyzer", href: "/analyze" },
      { name: "README badge", href: "/badge" },
      { name: "API for bot lists", href: "/developers" },
    ],
  },
  {
    title: "Learn",
    links: [
      { name: "Permission reference", href: "/permissions" },
      { name: "Bot examples", href: "/examples" },
      { name: "Guides", href: "/guides" },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        name: "Discord permission docs",
        href: DISCORD_DOCS_URL,
        external: true,
      },
      {
        name: "Discord Developer Portal",
        href: "https://discord.com/developers/applications",
        external: true,
      },
      { name: "Source on GitHub", href: GITHUB_URL, external: true },
    ],
  },
];

export function SiteFooter() {
  const verified = new Date(`${CATALOG_VERIFIED}T00:00:00Z`).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    },
  );

  return (
    <footer className="mt-auto border-t border-white/[0.08]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image src="/logo.svg" alt="" width={22} height={22} />
              <span className="text-sm font-semibold text-white">noadmin</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-zinc-400">
              Least-privilege tools and guides for Discord bot developers and
              the servers that add their bots.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-500">
                {col.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CodeMeAPixel · Not affiliated with
            Discord Inc.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-500 transition-colors hover:text-white"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
