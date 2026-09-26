import { OG_SIZE, ogImage } from "@/lib/og";
import { PERMISSIONS } from "@/lib/permissions";
import { TEMPLATES } from "@/lib/templates";

export const alt = "NoAdmin: your Discord bot doesn't need Administrator";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Discord bot permissions",
    title: "Your bot doesn't need Administrator.",
    subtitle:
      "Calculate the permissions your bot actually uses, and check any bot before you add it.",
    accent: "critical",
    chips: [
      { label: `${PERMISSIONS.length} permissions` },
      { label: `${TEMPLATES.length} bot examples` },
    ],
  });
}
