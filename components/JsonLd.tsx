import type { JsonLdSchema } from "@/lib/schema";

/**
 * Renders one or more JSON-LD structured-data blocks. Server component —
 * the script is emitted into the static HTML at build time.
 */
export function JsonLd({ schema }: { schema: JsonLdSchema | JsonLdSchema[] }) {
  const items = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
