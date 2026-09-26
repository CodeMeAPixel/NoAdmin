import { OG_SIZE, ogImage } from "@/lib/og";
import { TEMPLATES } from "@/lib/templates";

export const alt = "Discord bot permission examples";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Examples",
    title: "What common bots actually need",
    subtitle: `The exact permissions ${TEMPLATES.length} common bot types use, and why none of them need Administrator.`,
    accent: "low",
    path: "/examples",
    chips: [
      { label: `${TEMPLATES.length} bot types` },
      { label: "0 need Administrator", accent: "low" },
    ],
  });
}
