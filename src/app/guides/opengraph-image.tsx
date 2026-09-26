import { GUIDES } from "@/lib/guides";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Discord permission guides";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Guides",
    title: "Learn Discord permissions",
    subtitle:
      "Overwrites, role hierarchy, bitfields and handling missing permissions in code.",
    path: "/guides",
    chips: [{ label: `${GUIDES.length} short guides` }],
  });
}
