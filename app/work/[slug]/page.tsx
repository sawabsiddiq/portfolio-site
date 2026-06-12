import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllWork, getWork } from "@/lib/work";
import { FlowDiagram } from "@/components/pipeline/FlowDiagram";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StatusDot } from "@/components/ui/StatusDot";
import { ReadingProgress } from "@/components/ReadingProgress";

export function generateStaticParams() {
  return getAllWork().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: work.frontmatter.title,
    description: work.frontmatter.outcome,
  };
}

/* MDX voices: section markers as mono labels on the left-rail rhythm (§4.10) */
const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="mono-label mt-16 border-l border-line-strong pl-4 text-fg3"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-5 max-w-[62ch] text-lg leading-[1.65] text-fg2" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-5 max-w-[62ch] space-y-2" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li
      className="flex gap-3 text-[17px] leading-[1.6] text-fg2 before:mt-2.5 before:size-1 before:shrink-0 before:rounded-full before:bg-fg3 before:content-['']"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-fg" {...props} />
  ),
  Privacy: ({ children }: { children: React.ReactNode }) => (
    <aside className="mt-16 max-w-[62ch] rounded-[var(--radius-md)] border border-line bg-raised p-6">
      <p className="mono-label text-fg3">PRIVACY</p>
      <div className="mt-3 text-[15px] leading-relaxed text-fg2">{children}</div>
    </aside>
  ),
};

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();
  const fm = work.frontmatter;

  const all = getAllWork();
  const idx = all.findIndex((w) => w.slug === slug);
  const prev = all[idx - 1];
  const next = all[idx + 1];

  return (
    <article className="pt-32 pb-24">
      <ReadingProgress />
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <Link href="/#work" className="mono-label link-underline text-fg3 hover:text-fg2">
          ← WORK
        </Link>

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-6">
            <StatusDot status={fm.status} label={fm.statusLabel} pulse />
          </div>
          <h1 className="display-lg mt-4 max-w-[24ch] text-fg">{fm.title}</h1>
          <p className="mt-6 max-w-[62ch] text-lg leading-[1.65] text-fg2">
            {fm.outcome}
          </p>
        </header>

        {/* spec table — everything a skimmer needs (§4.10) */}
        <dl className="mono-body mt-12 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-2">
          {[
            ["ROLE", fm.role],
            ["DOMAIN", fm.domain],
            ["STATUS", fm.statusLabel],
            ["TIMELINE", fm.timeline],
          ].map(([k, v]) => (
            <div key={k} className="bg-raised px-5 py-4">
              <dt className="mono-label text-fg3">{k}</dt>
              <dd className="mt-1 text-fg2">{v}</dd>
            </div>
          ))}
          <div className="bg-raised px-5 py-4 sm:col-span-2">
            <dt className="mono-label text-fg3">STACK</dt>
            <dd className="mt-1 text-fg2">{fm.stack.join(" · ")}</dd>
          </div>
        </dl>

        {/* architecture diagram in the site's own language */}
        <div className="mt-16">
          <MediaFrame filename={`architecture: ${slug}`}>
            <div className="px-6 py-8">
              <FlowDiagram spec={fm.diagram} draw />
            </div>
          </MediaFrame>
        </div>

        <div className="mt-4">
          <MDXRemote source={work.content} components={mdxComponents} />
        </div>

        {/* impact strip — same visual system as the home metrics */}
        <section aria-label="Impact" className="mt-16 max-w-3xl">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-3">
            {fm.impact.map((m) => (
              <div key={m.label} className="bg-raised px-5 py-6">
                <p className="font-mono text-[28px] font-medium tabular-nums text-fg">
                  {m.value}
                </p>
                <p className="mono-label mt-2 text-fg3">{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        <nav
          aria-label="Case studies"
          className="mt-24 flex items-center justify-between gap-4 border-t border-line pt-8"
        >
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="mono-label link-underline text-fg3 hover:text-fg2">
              ← PREVIOUS
            </Link>
          ) : (
            <span />
          )}
          <Link href="/#work" className="mono-label link-underline text-fg3 hover:text-fg2">
            ALL WORK
          </Link>
          {next ? (
            <Link href={`/work/${next.slug}`} className="mono-label link-underline text-fg3 hover:text-fg2">
              NEXT →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  );
}
