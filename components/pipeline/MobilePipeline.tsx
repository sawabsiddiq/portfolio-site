"use client";

import { useEffect, useRef } from "react";
import { siWhatsapp, siPostgresql } from "simple-icons";
import { muteBrand } from "@/lib/color";
import { useReducedMotion } from "@/lib/motion";

/**
 * The signature pipeline, turned vertical for phones (design plan §7).
 * Same system as the desktop hero: edges draw on load, a packet travels
 * top-to-bottom every ~7s, every third cycle routes to HUMAN ESCALATION,
 * and tapping that node escalates to a human — the contact section.
 */

type HeroIcon = { path: string; hex: string; muted: string };
const icons: Record<string, HeroIcon> = {
  WHATSAPP: { path: siWhatsapp.path, hex: `#${siWhatsapp.hex}`, muted: muteBrand(`#${siWhatsapp.hex}`) },
  POSTGRES: { path: siPostgresql.path, hex: `#${siPostgresql.hex}`, muted: muteBrand(`#${siPostgresql.hex}`) },
};

const CX = 160;
const NODES = [
  { label: "WHATSAPP", x: CX - 62, w: 124, cy: 24 },
  { label: "AGENT", x: CX - 42, w: 84, cy: 104 },
  { label: "POSTGRES", x: CX - 62, w: 124, cy: 184 },
  { label: "HUMAN ESCALATION", x: 4, w: 150, cy: 284 },
  { label: "DASHBOARD", x: 206, w: 110, cy: 284 },
];
const HE_CX = 4 + 150 / 2; // 79
const DB_CX = 206 + 110 / 2; // 261

const EDGES = [
  { d: `M${CX} 42 V86`, delay: 500 },
  { d: `M${CX} 122 V166`, delay: 580 },
  {
    d: `M${CX} 202 V216 Q${CX} 224 ${CX - 8} 224 H${HE_CX + 8} Q${HE_CX} 224 ${HE_CX} 232 V266`,
    delay: 660,
  },
  {
    d: `M${CX} 202 V216 Q${CX} 224 ${CX + 8} 224 H${DB_CX - 8} Q${DB_CX} 224 ${DB_CX} 232 V266`,
    delay: 660,
  },
];

const ROUTE_MAIN = `M${CX} 24 V216 Q${CX} 224 ${CX + 8} 224 H${DB_CX - 8} Q${DB_CX} 224 ${DB_CX} 232 V284`;
const ROUTE_ESC = `M${CX} 24 V216 Q${CX} 224 ${CX - 8} 224 H${HE_CX + 8} Q${HE_CX} 224 ${HE_CX} 232 V284`;

const TRAVEL_MS = 3800;
const CYCLE_MS = 7000;
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export function MobilePipeline() {
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
    let cycleStart = performance.now() + 1100;
    let visible = true;
    let lastY = 0;

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
        if (now - cycleStart > CYCLE_MS) cycleStart = now;
        return;
      }
      const escalating = cycle % 3 === 2;
      const path = escalating ? escRef.current : mainRef.current;
      if (!path) return;

      const elapsed = now - cycleStart;
      if (elapsed >= CYCLE_MS) {
        if (escalating) warnDotRef.current?.classList.remove("dot-blink");
        cycle += 1;
        cycleStart = now;
        lastY = 0;
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
      dots.forEach((c, i) => {
        const p = path.getPointAtLength(Math.max(d - i * 10, 0));
        c.setAttribute("cx", String(p.x));
        c.setAttribute("cy", String(p.y));
      });
      // packet moves top→bottom: pulse nodes as it crosses their center line
      const head = path.getPointAtLength(d);
      NODES.forEach((n, i) => {
        const cx = n.x + n.w / 2;
        if (lastY < n.cy && head.y >= n.cy && Math.abs(head.x - cx) < 70) {
          if (i < 3 || (i === 3) === escalating) pulse(i);
        }
      });
      lastY = head.y;
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
      viewBox="0 0 320 312"
      className={`mx-auto w-full max-w-xs ${reduced ? "pipeline-static" : ""}`}
      role="img"
      aria-label="Architecture: WhatsApp messages route through an AI agent to PostgreSQL, branching to human escalation or a dashboard."
    >
      <path ref={mainRef} d={ROUTE_MAIN} fill="none" stroke="none" />
      <path ref={escRef} d={ROUTE_ESC} fill="none" stroke="none" />

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

      <g ref={packetRef} className="pipeline-packet" style={{ opacity: 0 }} aria-hidden>
        <circle r="3" fill="var(--color-signal)" />
        <circle r="2.2" fill="var(--color-signal)" opacity="0.4" />
        <circle r="1.6" fill="var(--color-signal)" opacity="0.22" />
        <circle r="1.2" fill="var(--color-signal)" opacity="0.1" />
      </g>

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
              x={n.x + n.w / 2 + (icon ? 10 : 0)}
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
                cx={n.x + n.w - 12}
                cy={n.cy}
                r="3"
                fill="var(--color-fg3)"
              />
            )}
            {n.label === "DASHBOARD" && (
              <circle
                cx={n.x + n.w - 12}
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
