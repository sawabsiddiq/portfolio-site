import type { DiagramSpec } from "@/data/site";

/**
 * Node-graph diagram in the site's visual language (design plan §3.2):
 * a horizontal chain of stages with an optional terminal fork.
 * Pure server-rendered SVG; the packet runs on row hover via CSS offset-path.
 */

const CHAR_W = 6.8;
const NODE_H = 32;
const GAP = 44;
const PAD = 4;

function nodeWidth(label: string) {
  return Math.round(label.length * CHAR_W + 28);
}

export function FlowDiagram({
  spec,
  draw = false,
  packetOnHover = false,
  className = "",
}: {
  spec: DiagramSpec;
  draw?: boolean;
  packetOnHover?: boolean;
  className?: string;
}) {
  const { stages, branches } = spec;
  const hasFork = !!branches;
  const height = hasFork ? 150 : 72;
  const mainY = hasFork ? 75 : 36;

  // layout main chain (prefix sums keep render pure)
  const widths = stages.map(nodeWidth);
  const placed = stages.map((label, i) => ({
    label,
    x: PAD + widths.slice(0, i).reduce((a, b) => a + b + GAP, 0),
    w: widths[i],
    cy: mainY,
  }));
  const last = placed[placed.length - 1];
  const lastRight = last.x + last.w;

  const edges: string[] = placed
    .slice(0, -1)
    .map((n) => `M${n.x + n.w} ${mainY} H${n.x + n.w + GAP}`);

  const branchNodes: { label: string; x: number; w: number; cy: number }[] = [];
  let width = lastRight + PAD;
  if (branches) {
    const bx = lastRight + GAP + 14;
    const [top, bottom] = branches;
    branchNodes.push(
      { label: top, x: bx, w: nodeWidth(top), cy: 35 },
      { label: bottom, x: bx, w: nodeWidth(bottom), cy: 115 },
    );
    const fx = lastRight + GAP / 2 + 4;
    edges.push(
      `M${lastRight} ${mainY} H${fx - 8} Q${fx} ${mainY} ${fx} ${mainY - 8} V43 Q${fx} 35 ${fx + 8} 35 H${bx}`,
      `M${lastRight} ${mainY} H${fx - 8} Q${fx} ${mainY} ${fx} ${mainY + 8} V107 Q${fx} 115 ${fx + 8} 115 H${bx}`,
    );
    width = bx + Math.max(...branchNodes.map((b) => b.w)) + PAD;
  }

  const allNodes = [...placed, ...branchNodes];
  const ariaLabel = `Workflow: ${stages.join(", then ")}${
    branches ? `, branching to ${branches[0]} or ${branches[1]}` : ""
  }.`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`w-full ${draw ? "" : "pipeline-static"} ${className}`}
      role="img"
      aria-label={ariaLabel}
    >
      {edges.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          className="pipeline-edge"
          style={{ "--edge-delay": `${300 + i * 80}ms` } as React.CSSProperties}
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth="1"
        />
      ))}
      {packetOnHover && (
        <circle
          r="3"
          fill="var(--color-signal)"
          className="mini-packet"
          aria-hidden
          style={{
            offsetPath: `path("M${placed[0].x + placed[0].w / 2} ${mainY} L${lastRight} ${mainY}")`,
          }}
        />
      )}
      {allNodes.map((n) => (
        <g key={n.label} className="pipeline-node">
          <rect
            x={n.x}
            y={n.cy - NODE_H / 2}
            width={n.w}
            height={NODE_H}
            rx={6}
            fill="var(--color-raised)"
            stroke="var(--color-line)"
          />
          <text
            x={n.x + n.w / 2}
            y={n.cy + 4}
            textAnchor="middle"
            fill="var(--color-fg2)"
            style={{ font: "500 11px var(--font-mono)", letterSpacing: "0.08em" }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
