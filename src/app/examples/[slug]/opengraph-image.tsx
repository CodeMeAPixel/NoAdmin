import { analyze, VERDICT_COPY } from "@/lib/analyze";
import { type Accent, OG_SIZE, ogImage } from "@/lib/og";
import { TEMPLATE_BY_SLUG, TEMPLATES, templateValue } from "@/lib/templates";

export const alt = "Discord bot permission example";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

const VERDICT_ACCENT: Record<string, Accent> = {
  ok: "low",
  warn: "medium",
  high: "high",
  crit: "critical",
  muted: "neutral",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = TEMPLATE_BY_SLUG.get(slug);
  if (!t) return ogImage({ title: "Example not found" });
  const value = templateValue(t);
  const report = analyze(value);
  const verdict = VERDICT_COPY[report.verdict];
  return ogImage({
    eyebrow: "Bot example",
    title: t.name,
    subtitle: `${t.summary} No Administrator needed.`,
    accent: "low",
    path: `/examples/${t.slug}`,
    chips: [
      { label: verdict.label, accent: VERDICT_ACCENT[verdict.tone] },
      { label: `${report.permissions.length} permissions` },
      { label: value.toString(), mono: true },
    ],
  });
}
