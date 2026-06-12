import { toolIcon } from "@/lib/brand-icons";

/**
 * Stack tag — non-interactive by design (no dead-looking filters, §4.4).
 * Tools with a brand mark get a 12px icon: monochrome at rest, tinted to
 * the muted brand color when the parent row is hovered (color as feedback).
 */
export function Chip({ children }: { children: React.ReactNode }) {
  const icon = typeof children === "string" ? toolIcon(children) : undefined;
  return (
    <span className="mono-label inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-line px-2.5 py-1 text-fg3">
      {icon && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className="chip-icon size-3 shrink-0"
          style={{ "--brand": icon.muted } as React.CSSProperties}
        >
          <path d={icon.path} />
        </svg>
      )}
      {children}
    </span>
  );
}
