import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusDot } from "@/components/ui/StatusDot";
import { Reveal } from "@/lib/motion";
import { archive } from "@/data/site";

/** Compact table, not cards — none of these rows link anywhere yet, so none pretend to (§4.5). */
export function Archive() {
  return (
    <section aria-labelledby="archive-label" className="py-32 max-lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeader
          id="archive"
          eyebrow="MORE SYSTEMS"
          title="The longer tail."
        />
        <ul className="mt-16 border-t border-line">
          {archive.map((p, i) => (
            <Reveal
              as="li"
              key={p.name}
              delay={i}
              className="grid items-baseline gap-x-8 gap-y-1 border-b border-line py-5 md:grid-cols-12"
            >
              <h3 className="text-[18px] font-semibold text-fg md:col-span-3">
                {p.name}
              </h3>
              <p className="text-[15px] leading-relaxed text-fg2 md:col-span-5">
                {p.description}
              </p>
              <p className="mono-body text-fg3 md:col-span-2">
                {p.stack.join(" · ")}
              </p>
              <div className="md:col-span-2 md:justify-self-end">
                <StatusDot status={p.status} label={p.statusLabel} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
