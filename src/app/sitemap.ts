import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";
import { PERMISSIONS } from "@/lib/permissions";
import { SITE_URL } from "@/lib/site";
import { TEMPLATES } from "@/lib/templates";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/calculator",
    "/analyze",
    "/permissions",
    "/examples",
    "/guides",
    "/badge",
    "/developers",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...PERMISSIONS.map((perm) => ({
      url: `${SITE_URL}/permissions/${perm.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...TEMPLATES.map((t) => ({
      url: `${SITE_URL}/examples/${t.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
