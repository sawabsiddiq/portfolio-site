"use client";

import { useRef, type ReactNode } from "react";

/**
 * Cursor sheen: a soft monochrome light (~4–5% white, 420px radius) follows
 * the pointer across the surface — the flashlight over the instrument panel.
 * Mouse only; the overlay fades out on leave. No layout, no color, no motion
 * of elements.
 */
export function Tracked({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty("--gx", `${x}px`);
      el.style.setProperty("--gy", `${y}px`);
      el.style.setProperty("--glow-o", "1");
    });
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--glow-o", "0");
  };

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      <div aria-hidden className="glow-overlay" />
    </div>
  );
}
