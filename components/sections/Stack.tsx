import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/lib/motion";
import { stack } from "@/data/site";

/**
 * Two-column definition list. Two-tone hierarchy: interview-ready tools in
 * --fg2, working knowledge in --fg3 (§4.7). No chips, no logo walls.
 */
export function Stack() {
  return (
    <section aria-labelledby="stack-label" className="py-32 max-lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeader id="stack" eyebrow="STACK" title="Tools, grouped by what they're for." />
        <dl className="mt-16 border-t border-line">
          {stack.map((g, i) => (
            <Reveal
              key={g.group}
              delay={i}
              className="grid gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-12"
            >
              <dt className="text-[18px] font-semibold text-fg md:col-span-4">
                {g.group}
              </dt>
              <dd className="mono-body md:col-span-8">
                <span className="text-fg2">{g.core.join(", ")}</span>
                <span className="text-fg3">, {g.rest.join(", ")}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
