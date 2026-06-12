import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusDot } from "@/components/ui/StatusDot";
import { Chip } from "@/components/ui/Chip";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Tracked } from "@/components/ui/Tracked";
import { FlowDiagram } from "@/components/pipeline/FlowDiagram";
import { Reveal } from "@/lib/motion";
import { featured } from "@/data/site";

const statusLabel = { production: "PRODUCTION", poc: "POC", internal: "INTERNAL", experiment: "EXPERIMENT" };

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-label" className="py-32 max-lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeader
          id="work"
          eyebrow="FEATURED WORK"
          title="Systems that run real operations."
        />
        <div className="mt-16 border-t border-line">
          {featured.map((p, i) => (
            <Reveal key={p.slug} as="div" className="border-b border-line">
              <Tracked>
              <Link
                href={`/work/${p.slug}`}
                className="group/row block px-2 py-12 transition-colors duration-[var(--dur-fast)] hover:bg-overlay active:bg-overlay lg:py-16"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="mono-label text-fg3">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <StatusDot
                    status={p.status}
                    label={statusLabel[p.status]}
                    pulse
                  />
                </div>
                {/* min-w-0: the diagram SVG's intrinsic width must not set the grid's min-content */}
                <div className="mt-4 grid gap-10 lg:grid-cols-12">
                  <div className="min-w-0 lg:col-span-6">
                    <h3 className="heading text-fg">{p.title}</h3>
                    <p className="mt-4 max-w-[52ch] text-lg leading-[1.65] text-fg2">
                      {p.outcome}
                    </p>
                    <p className="mono-body mt-4 text-fg3">
                      {p.role} · {p.domain}
                    </p>
                    <p className="mono-body mt-2 text-signal">{p.impact}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.slice(0, 6).map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                      {p.stack.length > 6 && <Chip>+{p.stack.length - 6}</Chip>}
                    </div>
                    <p className="mono-label mt-6 text-fg2">
                      READ CASE STUDY{" "}
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-[var(--dur-fast)] group-hover/row:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                  </div>
                  <div className="min-w-0 max-lg:order-first lg:col-span-6">
                    <MediaFrame filename={`workflow: ${p.slug}`}>
                      <div className="px-5 py-6">
                        <FlowDiagram spec={p.diagram} packetOnHover />
                      </div>
                    </MediaFrame>
                  </div>
                </div>
              </Link>
              </Tracked>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
