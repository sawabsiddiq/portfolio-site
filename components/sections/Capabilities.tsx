import Link from "next/link";
import { capabilities } from "@/data/site";
import { Reveal } from "@/lib/motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Capabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-label" className="py-32 max-lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeader
          id="capabilities"
          eyebrow="WHAT I BUILD"
          title="AI and automation for business operations."
          intro="From discovering the problem and designing the architecture to building, integrating, and deploying the solution. Each area below connects to work I've delivered."
        />
        <div className="mt-16 border-t border-line">
          {capabilities.map((capability, i) => (
            <Reveal key={capability.title} delay={i} className="grid gap-6 border-b border-line py-8 md:grid-cols-12">
              <h3 className="heading text-fg md:col-span-4">{capability.title}</h3>
              <div className="md:col-span-8">
                <p className="max-w-[62ch] leading-relaxed text-fg2">{capability.description}</p>
                <p className="mono-body mt-4 text-fg2">{capability.proof}</p>
                <Link href={capability.href} className="link-underline mt-5 inline-block text-sm text-signal">
                  {capability.linkLabel} <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
