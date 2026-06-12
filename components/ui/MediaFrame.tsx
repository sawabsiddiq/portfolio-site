import type { ReactNode } from "react";

/**
 * Device-neutral frame: raised panel, slim header with three monochrome dots
 * and a mono filename (§2.4).
 */
export function MediaFrame({
  filename,
  children,
  className = "",
}: {
  filename: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[var(--radius-md)] border border-line bg-raised ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-fg3/60" />
          <span className="size-2 rounded-full bg-fg3/60" />
          <span className="size-2 rounded-full bg-fg3/60" />
        </span>
        <figcaption className="mono-body truncate text-fg3">{filename}</figcaption>
      </div>
      <div className="bg-codebg">{children}</div>
    </figure>
  );
}
