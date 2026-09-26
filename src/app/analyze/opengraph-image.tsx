import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Discord bot invite link analyzer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Tool",
    title: "Is this bot asking for too much?",
    subtitle:
      "Paste any bot invite link to see what it grants and what a leaked token could do.",
    accent: "critical",
    path: "/analyze",
    chips: [{ label: "Runs in your browser" }],
  });
}
