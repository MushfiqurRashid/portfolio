import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

/** Bump when the content in lib/data.ts changes, so crawlers know to revisit. */
const LAST_UPDATED = new Date("2026-10-15");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl(),
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${siteUrl()}/images/portrait.png`],
    },
  ];
}
