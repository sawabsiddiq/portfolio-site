"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, useCountUp } from "@/lib/motion";
import { metrics } from "@/data/site";

function MetricCell({
  value,
  suffix,
  label,
  source,
  index,
}: (typeof metrics)[number] & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const n = useCountUp(value, seen);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Reveal delay={index} className="group/cell bg-raised px-5 py-8">

      <div ref={ref}>
        <p className="mono-metric text-fg">
          {n.toLocaleString("en-US")}
          {/* single-char suffixes (+, %) ride at full size; unit suffixes stack below */}
          <span
            className={`text-fg3 ${suffix.length > 1 ? "mt-1 block text-[0.4em] leading-tight" : ""}`}
          >
            {suffix.trim()}
          </span>
        </p>
        <p className="mono-label mt-3 text-fg3">{label}</p>
        {/* provenance: hover-revealed on desktop, always visible on touch (§4.3, §7) */}
        <p className="mono-body mt-2 text-fg3/80 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:transition-opacity [@media(hover:hover)]:duration-[var(--dur-fast)] [@media(hover:hover)]:group-hover/cell:opacity-100">
          {source}
        </p>
      </div>
    </Reveal>
  );
}

export function Metrics() {
  return (
    <section aria-labelledby="outcomes-label" className="py-32 max-lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <Reveal className="border-l border-line-strong pl-6">
          <p className="mono-label text-fg3" id="outcomes-label">
            OUTCOMES
          </p>
          <p className="mt-4 max-w-[62ch] text-lg leading-[1.65] text-fg2">
            I focus on measurable business outcomes: reducing manual workload,
            speeding up operations, improving visibility, and turning
            unstructured processes into reliable automated systems.
          </p>
        </Reveal>
      </div>
      <div className="mt-12 border-y border-line bg-raised">
        {/* gap-px over --color-line renders the 1px cell separators */}
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m, i) => (
            <MetricCell key={m.label} {...m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
