import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "NoAdmin API";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "API",
    title: "Check invite links from your own site",
    subtitle:
      "A free JSON API for bot lists and dashboards that flags bots requesting Administrator.",
    accent: "low",
    path: "/developers",
    chips: [{ label: "GET /api/v1/analyze", accent: "low" }],
  });
}
