import type { MetadataRoute } from "next";
import { getAllWork } from "@/lib/work";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getAllWork().map((w) => ({
      url: `${site.url}/work/${w.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
