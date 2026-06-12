"use client";

import { useEffect, useRef } from "react";
import { siWhatsapp, siPostgresql } from "simple-icons";
import { muteBrand } from "@/lib/color";
import { useReducedMotion } from "@/lib/motion";

/**
 * The signature hero pipeline (design plan §3.1).
 * Real stages: WHATSAPP → INTENT → RAG → TOOLS → POSTGRES, branching to
 * HUMAN ESCALATION / DASHBOARD. A signal packet traverses every ~7s;
 * every third cycle it routes to HUMAN ESCALATION and the warn dot blinks.
 * Service nodes carry muted brand marks that flash to full brand color as
 * the packet passes. Clicking HUMAN ESCALATION escalates to a human — it
 * scrolls to the contact section.
 */

type HeroIcon = { path: string; hex: string; muted: string };
const icons: Record<string, HeroIcon> = {
  WHATSAPP: { path: siWhatsapp.path, hex: `#${siWhatsapp.hex}`, muted: muteBrand(`#${siWhatsapp.hex}`) },
  POSTGRES: { path: siPostgresql.path, hex: `#${siPostgresql.hex}`, muted: muteBrand(`#${siPostgresql.hex}`) },
};

const GAP = 68;
const MAIN_CY = 130;
const ICON_W = 20;

const MAIN_SPEC = [
  { label: "WHATSAPP", w: 104 + ICON_W },
  { label: "INTENT", w: 84 },
  { label: "RAG", w: 64 },
  { label: "TOOLS", w: 80 },
  { label: "POSTGRES", w: 104 + ICON_W },
];

type Node = { label: string; x: number; w: number; cy: number };

const MAIN: Node[] = (() => {
  let x = 8;
  return MAIN_SPEC.map((s) => {
    const n = { ...s, x, cy: MAIN_CY };
    x += s.w + GAP;
    return n;
  });
})();

const LAST_RIGHT = MAIN[MAIN.length - 1].x + MAIN[MAIN.length - 1].w; // 756
const JUNCTION = LAST_RIGHT + 74; // straight run before the fork
const BRANCH_X = JUNCTION + 68;

const ESCALATION: Node = { label: "HUMAN ESCALATION", x: BRANCH_X, w: 178, cy: 64 };
const DASHBOARD: Node = { label: "DASHBOARD", x: BRANCH_X, w: 124, cy: 196 };
const NODES: Node[] = [...MAIN, ESCALATION, DASHBOARD];

const EDGES: { d: string; delay: number }[] = [
  ...MAIN.slice(0, -1).map((n, i) => ({
    d: `M${n.x + n.w} ${MAIN_CY} H${MAIN[i + 1].x}`,
    delay: 500 + i * 80,
  })),
  {
    d: `M${LAST_RIGHT} ${MAIN_CY} H${JUNCTION} Q${JUNCTION + 8} ${MAIN_CY} ${JUNCTION + 8} ${MAIN_CY - 8} V72 Q${JUNCTION + 8} 64 ${JUNCTION + 16} 64 H${BRANCH_X}`,
    delay: 820,
  },
  {
    d: `M${LAST_RIGHT} ${MAIN_CY} H${JUNCTION} Q${JUNCTION + 8} ${MAIN_CY} ${JUNCTION + 8} ${MAIN_CY + 8} V188 Q${JUNCTION + 8} 196 ${JUNCTION + 16} 196 H${BRANCH_X}`,
    delay: 820,
  },
];

const ROUTE_MAIN = `M${MAIN[0].x + MAIN[0].w / 2} ${MAIN_CY} H${JUNCTION} Q${JUNCTION + 8} ${MAIN_CY} ${JUNCTION + 8} ${MAIN_CY + 8} V188 Q${JUNCTION + 8} 196 ${JUNCTION + 16} 196 H${DASHBOARD.x + DASHBOARD.w / 2}`;
const ROUTE_ESC = `M${MAIN[0].x + MAIN[0].w / 2} ${MAIN_CY} H${JUNCTION} Q${JUNCTION + 8} ${MAIN_CY} ${JUNCTION + 8} ${MAIN_CY - 8} V72 Q${JUNCTION + 8} 64 ${JUNCTION + 16} 64 H${ESCALATION.x + ESCALATION.w / 2}`;

const TRAVEL_MS = 4500;
const CYCLE_MS = 7000;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

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
      // pulse nodes (and flash their brand icon) as the packet passes
      const head = path.getPointAtLength(d);
      NODES.forEach((n, i) => {
        const cx = n.x + n.w / 2;
        if (lastX < cx && head.x >= cx && Math.abs(head.y - n.cy) < 40) {
          if (i < MAIN.length || (i === MAIN.length) === escalating) pulse(i);
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
      {NODES.map((n, i) => {
        const icon = icons[n.label];
        const isEscalation = n.label === "HUMAN ESCALATION";
        return (
          <g
            key={n.label}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className={`pipeline-node ${isEscalation ? "cursor-pointer" : ""}`}
            {...(isEscalation
              ? {
                  role: "link",
                  tabIndex: 0,
                  "aria-label": "Escalate to a human — go to contact",
                  onClick: scrollToContact,
                  onKeyDown: (e: React.KeyboardEvent) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      scrollToContact();
                    }
                  },
                }
              : {})}
          >
            {isEscalation && <title>Escalate to a human → contact</title>}
            <rect
              x={n.x}
              y={n.cy - 18}
              width={n.w}
              height={36}
              rx={6}
              fill="var(--color-raised)"
              stroke="var(--color-line)"
            />
            {icon && (
              <path
                className="node-icon"
                d={icon.path}
                transform={`translate(${n.x + 13} ${n.cy - 7}) scale(0.583)`}
                fill={icon.muted}
                style={{ "--brand-full": icon.hex } as React.CSSProperties}
              />
            )}
            <text
              x={n.x + n.w / 2 + (icon ? ICON_W / 2 : 0)}
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
            {isEscalation && (
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
        );
      })}
    </svg>
  );
}
