import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "NoAdmin README badge";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Tool",
    title: "Show that your bot asks for less",
    subtitle:
      "A README badge generated from your bot's real invite permissions.",
    accent: "low",
    path: "/badge",
    chips: [{ label: "no admin", accent: "low" }],
  });
}
