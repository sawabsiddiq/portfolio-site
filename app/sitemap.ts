import type { MetadataRoute } from "next";
import { getAllWork } from "@/lib/work";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    ...getAllWork().map((w) => ({
      url: `${site.url}/work/${w.slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}
