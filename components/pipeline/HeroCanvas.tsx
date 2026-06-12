"use client";

import { useRef, type ReactNode } from "react";

/**
 * The n8n-style workflow canvas behind the hero pipeline: a faint dot grid
 * that brightens in a radius around the cursor — inspecting the canvas
 * under a lamp. Pointer-driven only; touch devices and reduced-motion get
 * the static grid (handled in CSS).
 */
export function HeroCanvas({ children }: { children: ReactNode }) {
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
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--canvas-on", "1");
    });
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--canvas-on", "0");
  };

  return (
    <div
      ref={ref}
      className="hero-canvas relative"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="relative">{children}</div>
    </div>
  );
}
