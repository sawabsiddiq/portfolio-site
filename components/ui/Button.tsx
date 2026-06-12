import Link from "next/link";
import type { ReactNode } from "react";

const base =
  "mono-label inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] px-5 py-3 transition-colors duration-[var(--dur-fast)] active:scale-[0.98] group/btn";

const variants = {
  primary:
    "bg-raised border border-signal/50 text-fg hover:border-signal",
  ghost:
    "border border-line-strong text-fg2 hover:text-fg hover:border-fg3",
};

export function Button({
  href,
  variant = "ghost",
  children,
  arrow = false,
  download = false,
  external = false,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
  arrow?: boolean;
  download?: boolean;
  external?: boolean;
}) {
  const cls = `${base} ${variants[variant]}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden
          className="transition-transform duration-[var(--dur-fast)] group-hover/btn:translate-x-0.5"
        >
          →
        </span>
      )}
      {download && <span aria-hidden>↓</span>}
    </>
  );
  if (download || external) {
    return (
      <a
        href={href}
        className={cls}
        {...(download ? { download: true } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
