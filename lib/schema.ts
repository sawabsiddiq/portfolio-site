import { site } from "@/data/site";
import type { WorkEntry } from "@/lib/work";

/** A single JSON-LD node. Kept dependency-free — schema.org shapes are loose. */
export type JsonLdSchema = Record<string, unknown>;

// Stable @ids so nodes can reference each other (Person ← WebSite ← projects).
const PERSON_ID = `${site.url}/#person`;
const WEBSITE_ID = `${site.url}/#website`;

/** schema.org Person — the site's primary entity (rendered on the homepage). */
export function personSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    alternateName: site.displayName,
    jobTitle: site.role,
    description: site.positioning,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    url: site.url,
    image: `${site.url}${site.ogImage}`,
    sameAs: [site.linkedin, site.github],
    knowsAbout: site.knowsAbout,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: site.country,
    },
  };
}

/** schema.org WebSite — authored/published by the Person above. */
export function websiteSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: `${site.displayName} — ${site.role}`,
    description: site.positioning,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
  };
}

/** schema.org SoftwareApplication for a case-study project. */
export function softwareApplicationSchema(work: WorkEntry): JsonLdSchema {
  const { slug, frontmatter: fm } = work;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: fm.title,
    description: fm.outcome,
    url: `${site.url}/work/${slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    keywords: fm.stack.join(", "),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
