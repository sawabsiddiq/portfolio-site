/** Stack tag — non-interactive by design (no dead-looking filters, §4.4). */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="mono-label rounded-[var(--radius-sm)] border border-line px-2.5 py-1 text-fg3">
      {children}
    </span>
  );
}
