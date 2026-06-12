import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/lib/motion";
import { experience } from "@/data/site";

/** Left vertical rail with node-dots — the career as a pipeline (§4.6). */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-label" className="py-32 max-lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeader
          id="experience"
          eyebrow="EXPERIENCE"
          title="4.5+ years from workflow automation to forward deployed AI."
        />
        <ol className="relative mt-16 ml-1 border-l border-line-strong max-md:ml-0">
          {experience.map((e) => (
            <Reveal as="li" key={e.company} className="relative pb-16 pl-10 last:pb-0">
              <span
                aria-hidden
                className={`absolute -left-[5px] top-2 size-[9px] rounded-full ${
                  e.current ? "bg-live dot-pulse" : "bg-fg3"
                }`}
              />
              <p className="mono-label text-fg3">
                {e.period} · {e.location.toUpperCase()}
                {e.current && <span className="ml-3 text-live">● LIVE</span>}
              </p>
              <h3 className="heading mt-3 text-fg">
                {e.company}
                <span className="mt-1 block text-[17px] font-normal text-fg2">
                  {e.role}
                </span>
              </h3>
              <p className="mt-4 max-w-[62ch] leading-[1.6] text-fg2">{e.summary}</p>
              <ul className="mt-5 max-w-[62ch] space-y-2">
                {e.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-fg2">
                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-fg3" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
