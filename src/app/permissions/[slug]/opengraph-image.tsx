import { OG_SIZE, ogImage } from "@/lib/og";
import { BY_SLUG, flag, PERMISSIONS } from "@/lib/permissions";

export const alt = "Discord permission details";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return PERMISSIONS.map((perm) => ({ slug: perm.slug }));
}

const RISK_LABEL = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
  critical: "Critical risk",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const perm = BY_SLUG.get(slug);
  if (!perm) return ogImage({ title: "Permission not found" });
  return ogImage({
    eyebrow: "Permission",
    title: perm.name,
    subtitle: perm.detail,
    accent: perm.risk,
    path: `/permissions/${perm.slug}`,
    chips: [
      { label: RISK_LABEL[perm.risk], accent: perm.risk },
      ...(perm.requires2fa ? [{ label: "2FA" }] : []),
      { label: flag(perm).toString(), mono: true },
    ],
  });
}
