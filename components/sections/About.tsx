import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/lib/motion";
import { about, site } from "@/data/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-label" className="py-32 max-lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeader id="about" eyebrow="ABOUT" title="Between operations and engineering." />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <dl className="mono-body space-y-5 border-l border-line pl-6 text-fg3">
              <div>
                <dt className="mono-label text-fg3">LOCATION</dt>
                <dd className="mt-1 text-fg2">{site.location}</dd>
              </div>
              <div>
                <dt className="mono-label text-fg3">LANGUAGES</dt>
                <dd className="mt-1 space-y-0.5 text-fg2">
                  {about.languages.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-fg3">STATUS</dt>
                <dd className="mt-1 inline-flex items-center gap-2 text-fg2">
                  <span aria-hidden className="size-2 rounded-full bg-live dot-pulse" />
                  Open to work
                </dd>
              </div>
            </dl>
          </Reveal>
          <div className="space-y-8 lg:col-span-7">
            <Reveal>
              <p className="max-w-[62ch] text-lg leading-[1.65] text-fg2">{about.intro}</p>
            </Reveal>
            <Reveal delay={1}>
              <h3 className="mono-label text-fg3">HOW I WORK</h3>
              <p className="mt-3 max-w-[62ch] text-lg leading-[1.65] text-fg2">
                {about.howIWork}
              </p>
            </Reveal>
            {/* the one blockquote on the site (§4.8) */}
            <Reveal delay={2}>
              <blockquote className="border-l-2 border-signal pl-6">
                <p className="max-w-[48ch] text-2xl font-semibold leading-snug text-fg">
                  {about.philosophy}
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
