import { OG_SIZE, ogImage } from "@/lib/og";
import { PERMISSIONS } from "@/lib/permissions";

export const alt = "Discord permission reference";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  const count = (risk: string) =>
    PERMISSIONS.filter((perm) => perm.risk === risk).length;
  return ogImage({
    eyebrow: "Reference",
    title: "Every Discord permission",
    subtitle: `Values, risk levels, 2FA requirements and safer alternatives for all ${PERMISSIONS.length} permissions.`,
    path: "/permissions",
    chips: [
      { label: `${count("low")} low`, accent: "low" },
      { label: `${count("medium")} medium`, accent: "medium" },
      { label: `${count("high")} high`, accent: "high" },
      { label: `${count("critical")} critical`, accent: "critical" },
    ],
  });
}
