import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideBody } from "@/components/GuideBody";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { GUIDE_BY_SLUG, GUIDES } from "@/lib/guides";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDE_BY_SLUG.get(slug);
  if (!guide) return { title: "Guide not found" };
  return pageMetadata({
    title: guide.title,
    description: guide.summary,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDE_BY_SLUG.get(slug);
  if (!guide) notFound();

  const others = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <Container width="md" className="pb-20 pt-10 sm:pt-14">
      <Link
        href="/guides"
        className="-ml-1 mb-6 inline-flex items-center gap-1 rounded-md px-1 text-sm text-zinc-400 hover:text-white"
      >
        <Icon name="arrowRight" className="h-4 w-4 rotate-180" /> All guides
      </Link>
      <article>
        <header className="mb-8">
          <p className="text-xs text-zinc-500">
            For {guide.audience} · {guide.minutes} min read
          </p>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-3 text-lg text-zinc-400">{guide.summary}</p>
        </header>
        <GuideBody blocks={guide.body} />
      </article>

      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/calculator" icon="calculator">
          Open the calculator
        </ButtonLink>
        <ButtonLink href="/analyze" variant="secondary" icon="scan">
          Analyze an invite
        </ButtonLink>
      </div>

      <section className="mt-14 border-t border-white/[0.06] pt-8">
        <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
          Keep reading
        </h2>
        <ul className="space-y-2">
          {others.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="group flex items-center justify-between gap-3 rounded-lg px-1 py-1.5 text-sm text-zinc-300 hover:text-white"
              >
                {g.title}
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 shrink-0 text-zinc-500 group-hover:text-white"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
