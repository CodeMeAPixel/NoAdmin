import { OG_SIZE, ogImage } from "@/lib/og";
import { PERMISSIONS } from "@/lib/permissions";

export const alt = "Discord permission calculator";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Tool",
    title: "Permission calculator",
    subtitle:
      "Pick exactly what your bot uses. Get the value, an invite link and code for your library.",
    accent: "low",
    path: "/calculator",
    chips: [
      { label: `${PERMISSIONS.length} permissions` },
      { label: "5 libraries" },
    ],
  });
}
