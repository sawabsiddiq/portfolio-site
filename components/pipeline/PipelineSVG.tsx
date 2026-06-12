"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * The signature hero pipeline (design plan §3.1).
 * Real stages: WHATSAPP → INTENT → RAG → TOOLS → POSTGRES, branching to
 * HUMAN ESCALATION / DASHBOARD. A signal packet traverses every ~7s;
 * every third cycle it routes to HUMAN ESCALATION and the warn dot blinks.
 * Plain rAF + getPointAtLength — no canvas, no motion library.
 */

const NODES = [
  { label: "WHATSAPP", x: 8, w: 104, cy: 130 },
  { label: "INTENT", x: 180, w: 84, cy: 130 },
  { label: "RAG", x: 332, w: 64, cy: 130 },
  { label: "TOOLS", x: 464, w: 80, cy: 130 },
  { label: "POSTGRES", x: 612, w: 104, cy: 130 },
  { label: "HUMAN ESCALATION", x: 858, w: 178, cy: 64 },
  { label: "DASHBOARD", x: 858, w: 124, cy: 196 },
];

const EDGES = [
  { d: "M112 130 H180", delay: 500 },
  { d: "M264 130 H332", delay: 580 },
  { d: "M396 130 H464", delay: 660 },
  { d: "M544 130 H612", delay: 740 },
  { d: "M716 130 H790 Q798 130 798 122 V72 Q798 64 806 64 H858", delay: 820 },
  { d: "M716 130 H790 Q798 130 798 138 V188 Q798 196 806 196 H858", delay: 820 },
];

const ROUTE_MAIN =
  "M60 130 H790 Q798 130 798 138 V188 Q798 196 806 196 H920";
const ROUTE_ESC =
  "M60 130 H790 Q798 130 798 122 V72 Q798 64 806 64 H947";

const TRAVEL_MS = 4500;
const CYCLE_MS = 7000;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function PipelineSVG() {
  const reduced = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const mainRef = useRef<SVGPathElement>(null);
  const escRef = useRef<SVGPathElement>(null);
  const packetRef = useRef<SVGGElement>(null);
  const warnDotRef = useRef<SVGCircleElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const svg = svgRef.current;
    const packet = packetRef.current;
    if (!svg || !packet) return;

    const dots = Array.from(
      packet.querySelectorAll<SVGCircleElement>("circle"),
    );
    let raf = 0;
    let cycle = 0;
    let cycleStart = performance.now() + 1100; // after edge draw-in
    let visible = true;
    let lastX = 0;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(svg);

    const pulse = (i: number) => {
      const g = nodeRefs.current[i];
      if (!g) return;
      g.classList.add("is-pulsing");
      setTimeout(() => g.classList.remove("is-pulsing"), 350);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.visibilityState === "hidden") {
        // hold the schedule so the packet doesn't jump on resume
        if (now - cycleStart > CYCLE_MS) cycleStart = now;
        return;
      }
      const escalating = cycle % 3 === 2;
      const path = escalating ? escRef.current : mainRef.current;
      if (!path) return;

      const elapsed = now - cycleStart;
      if (elapsed >= CYCLE_MS) {
        if (escalating) {
          warnDotRef.current?.classList.remove("dot-blink");
        }
        cycle += 1;
        cycleStart = now;
        lastX = 0;
        return;
      }
      const t = Math.min(elapsed / TRAVEL_MS, 1);
      if (t >= 1) {
        packet.style.opacity = "0";
        if (escalating && warnDotRef.current) {
          warnDotRef.current.classList.add("dot-blink");
        }
        return;
      }
      packet.style.opacity = "1";
      const len = path.getTotalLength();
      const d = easeInOut(t) * len;
      // packet + short fading trail
      dots.forEach((c, i) => {
        const p = path.getPointAtLength(Math.max(d - i * 12, 0));
        c.setAttribute("cx", String(p.x));
        c.setAttribute("cy", String(p.y));
      });
      // pulse nodes as the packet passes their center
      const head = path.getPointAtLength(d);
      NODES.forEach((n, i) => {
        const cx = n.x + n.w / 2;
        if (lastX < cx && head.x >= cx && Math.abs(head.y - n.cy) < 40) {
          if (i < 5 || (i === 5) === escalating) pulse(i);
        }
      });
      lastX = head.x;
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduced]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1100 260"
      className={`w-full ${reduced ? "pipeline-static" : ""}`}
      role="img"
      aria-label="Architecture: WhatsApp messages route through intent classification to RAG retrieval, tools, and PostgreSQL, branching to human escalation or a dashboard."
    >
      {/* invisible measurement routes */}
      <path ref={mainRef} d={ROUTE_MAIN} fill="none" stroke="none" />
      <path ref={escRef} d={ROUTE_ESC} fill="none" stroke="none" />

      {/* edges */}
      {EDGES.map((e, i) => (
        <path
          key={i}
          d={e.d}
          pathLength={1}
          className="pipeline-edge"
          style={{ "--edge-delay": `${e.delay}ms` } as React.CSSProperties}
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth="1"
        />
      ))}

      {/* packet + trail (under the node chips) */}
      <g ref={packetRef} className="pipeline-packet" style={{ opacity: 0 }} aria-hidden>
        <circle r="3" fill="var(--color-signal)" />
        <circle r="2.2" fill="var(--color-signal)" opacity="0.4" />
        <circle r="1.6" fill="var(--color-signal)" opacity="0.22" />
        <circle r="1.2" fill="var(--color-signal)" opacity="0.1" />
      </g>

      {/* nodes */}
      {NODES.map((n, i) => (
        <g
          key={n.label}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          className="pipeline-node"
        >
          <rect
            x={n.x}
            y={n.cy - 18}
            width={n.w}
            height={36}
            rx={6}
            fill="var(--color-raised)"
            stroke="var(--color-line)"
          />
          <text
            x={n.x + n.w / 2 + (n.label === "HUMAN ESCALATION" ? -6 : 0)}
            y={n.cy + 4}
            textAnchor="middle"
            fill="var(--color-fg2)"
            style={{
              font: "500 11px var(--font-mono)",
              letterSpacing: "0.08em",
            }}
          >
            {n.label}
          </text>
          {n.label === "HUMAN ESCALATION" && (
            <circle
              ref={warnDotRef}
              cx={n.x + n.w - 14}
              cy={n.cy}
              r="3"
              fill="var(--color-fg3)"
            />
          )}
          {n.label === "DASHBOARD" && (
            <circle
              cx={n.x + n.w - 14}
              cy={n.cy}
              r="3"
              fill="var(--color-live)"
              className="dot-pulse"
            />
          )}
        </g>
      ))}
    </svg>
  );
}
