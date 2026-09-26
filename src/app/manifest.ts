import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NoAdmin: Discord bot permission tools",
    short_name: "NoAdmin",
    description:
      "Calculate the exact Discord permissions your bot needs, analyze any invite link, and learn least-privilege bot development.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    categories: ["developer", "utilities", "security"],
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      {
        src: "/icon1/192",
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: "/icon1/512",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        type: "image/png",
        sizes: "180x180",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Permission calculator", url: "/calculator" },
      { name: "Analyze an invite", url: "/analyze" },
      { name: "Permission reference", url: "/permissions" },
    ],
  };
}
