import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/lib/motion";
import { contact, site } from "@/data/site";

/** The email is the design element — no form (§4.9). */
export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-label" className="py-32 max-lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <SectionHeader id="contact" eyebrow="CONTACT" title="Building something operational?" intro={contact.copy} />
        <Reveal className="mt-12">
          <a
            href={`mailto:${site.email}`}
            className="display-lg link-underline break-all text-fg"
          >
            {site.email}
          </a>
        </Reveal>
        <Reveal delay={1} className="mono-body mt-10 flex flex-wrap gap-x-8 gap-y-2 text-fg3">
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg2">
            LINKEDIN ↗
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg2">
            GITHUB ↗
          </a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link-underline hover:text-fg2">
            {site.phone}
          </a>
          <span>DUBAI, UAE</span>
        </Reveal>
      </div>
    </section>
  );
}
