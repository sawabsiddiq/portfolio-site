"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const ReducedMotionContext = createContext(false);

export function useReducedMotion() {
  return useContext(ReducedMotionContext);
}

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Single source of truth for prefers-reduced-motion (design plan §6.5). */
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  return (
    <ReducedMotionContext.Provider value={reduced}>
      {children}
    </ReducedMotionContext.Provider>
  );
}

/**
 * Scroll reveal: opacity + 16px rise, triggered once at 20% visibility.
 * Children get staggered delays via --reveal-delay (capped at 6, §6.3).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  ...rest
}: {
  children: ReactNode;
  as?: "div" | "section" | "li" | "span";
  className?: string;
  delay?: number;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${Math.min(delay, 5) * 50}ms` } as React.CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Count-up for metric cells: 800ms expo-out, runs once on view, tabular nums. */
export function useCountUp(target: number, start: boolean) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 800, 1);
      setValue(Math.round(target * easeOutExpo(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, reduced]);
  return value;
}
