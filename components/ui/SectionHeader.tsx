import { Reveal } from "@/lib/motion";

/**
 * Section start: 1px left border + mono eyebrow — the "log entry" device
 * used instead of centered headings (§2.3).
 */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
}) {
  return (
    <Reveal className="border-l border-line-strong pl-6">
      <p className="mono-label text-fg3" id={id ? `${id}-label` : undefined}>
        {eyebrow}
      </p>
      <h2 className="display-lg mt-4 max-w-[18ch] text-fg">{title}</h2>
      {intro && <p className="mt-6 max-w-[62ch] text-lg leading-[1.65] text-fg2">{intro}</p>}
    </Reveal>
  );
}

/**
 * Section divider: 1px edge with a single node-dot — the pipeline motif
 * (§3.2). A packet runs the line once when the divider scrolls into view.
 */
export function SectionDivider() {
  return (
    <Reveal
      aria-hidden
      className="mx-auto flex w-full max-w-6xl items-center px-6 lg:px-12"
    >
      <span className="size-1.5 shrink-0 rounded-full bg-line-strong" />
      <span className="relative h-px w-full bg-line">
        <span className="divider-packet" />
      </span>
    </Reveal>
  );
}
