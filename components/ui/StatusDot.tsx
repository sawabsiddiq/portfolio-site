import type { Status } from "@/data/site";

const colors: Record<Status, string> = {
  production: "bg-live",
  poc: "bg-warn",
  internal: "bg-fg3",
  experiment: "bg-fg3",
};

/** Dot is always paired with a text label — color never carries status alone (§8). */
export function StatusDot({
  status,
  label,
  pulse = false,
}: {
  status: Status;
  label: string;
  pulse?: boolean;
}) {
  return (
    <span className="mono-label inline-flex items-center gap-2 text-fg3">
      <span
        aria-hidden
        className={`size-2 rounded-full ${colors[status]} ${pulse && status === "production" ? "dot-pulse" : ""}`}
      />
      {label}
    </span>
  );
}
