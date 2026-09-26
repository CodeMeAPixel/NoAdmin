import { GUIDE_BY_SLUG, GUIDES } from "@/lib/guides";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "NoAdmin guide";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDE_BY_SLUG.get(slug);
  if (!guide) return ogImage({ title: "Guide not found" });
  return ogImage({
    eyebrow: "Guide",
    title: guide.title,
    subtitle: guide.summary,
    path: `/guides/${guide.slug}`,
    chips: [
      { label: `For ${guide.audience}` },
      { label: `${guide.minutes} min read` },
    ],
  });
}
