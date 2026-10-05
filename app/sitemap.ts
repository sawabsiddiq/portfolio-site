import type { MetadataRoute } from "next";
import { getAllWork } from "@/lib/work";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Omit lastModified until real content-change dates are tracked.
  // A build timestamp would incorrectly mark every page as recently edited.
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getAllWork().map((w) => ({
      url: `${site.url}/work/${w.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
