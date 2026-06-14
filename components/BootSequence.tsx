"use client";

import { useEffect, useRef } from "react";

/**
 * Sci-fi cold-boot overlay (design language: terminal/BIOS in IBM Plex Mono).
 *
 * Non-blocking by construction:
 *  - runs ONCE per session (sessionStorage) and only when motion is allowed;
 *    the gate is set pre-paint by an inline script in layout so there is no
 *    flash of the hero before the boot covers it.
 *  - the real page is server-rendered underneath the whole time (LCP, SEO,
 *    crawlers all see content); the overlay is just a fixed layer that fades.
 *  - any input (tap, key, scroll, wheel) skips it instantly; it also
 *    auto-dismisses well under ~1.8s.
 *  - on dismiss the hero choreography (paused by `boot-pause`) is released,
 *    so the site appears to "draw in" as the boot dissolves.
 *  - reduced-motion users never see it (gated in the inline script + CSS).
 */

const COLS = 40;

// ASCII frame chars only — box-drawing glyphs (─ ┌ ┐) aren't in the Plex Mono
// latin subset and fall back to a font with wider metrics, breaking alignment.
function frameTop() {
  const label = "+-- SAWAB.OS ";
  return label + "-".repeat(Math.max(COLS - 1 - label.length, 0)) + "+";
}
function frameBottom() {
  const hint = " press anything to skip ";
  const dashes = Math.max(COLS - 2 - hint.length, 0);
  return "+" + "-".repeat(dashes) + hint + "+";
}
function leaders(pre: string, value: string) {
  const dots = Math.max(COLS - pre.length - value.length - 2, 1);
  return " " + ".".repeat(dots) + " ";
}

type Line = { pre: string; value: string; live?: boolean };
const LINES: Line[] = [
  { pre: "> initializing pipeline", value: "ok" },
  { pre: "> nodes online", value: "7/7" },
  { pre: "> RAG index", value: "ready" },
  { pre: "> escalation path", value: "armed" },
  { pre: "> status", value: "OPEN TO WORK", live: true },
];

export function BootSequence() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    // The inline gate script decides whether this is a boot load.
    if (!html.hasAttribute("data-boot")) return;
    const el = ref.current;
    if (!el) return;

    // We're now in control: cancel the inline no-JS/hydration-failure fallback.
    const w = window as Window & { __bootFallback?: number };
    if (w.__bootFallback) window.clearTimeout(w.__bootFallback);

    // The app underneath is covered + opaque: make it inert so keyboard focus
    // can't land on an occluded control during the boot (WCAG 2.4.7/2.4.3).
    const appRoot = document.getElementById("app-root");
    appRoot?.setAttribute("inert", "");

    let dismissed = false;
    let hideTimer = 0;
    const opts: AddEventListenerOptions = { passive: true };

    const dissolve = () => {
      if (dismissed) return;
      dismissed = true;
      try {
        sessionStorage.setItem("sawab.booted", "1");
      } catch {
        /* private mode — fine, it just boots again next load */
      }
      appRoot?.removeAttribute("inert"); // app is interactive again
      html.classList.remove("boot-pause"); // release the hero choreography
      el.classList.add("boot-done"); // fade the overlay out
      detach();
      hideTimer = window.setTimeout(() => html.removeAttribute("data-boot"), 480);
    };

    // Any key skips (BIOS "press anything"); focus can't strand because the
    // app is inert until dissolve removes it.
    const onKey = () => dissolve();

    function attach() {
      window.addEventListener("pointerdown", dissolve, opts);
      window.addEventListener("wheel", dissolve, opts);
      window.addEventListener("touchmove", dissolve, opts);
      window.addEventListener("keydown", onKey);
    }
    function detach() {
      window.removeEventListener("pointerdown", dissolve, opts);
      window.removeEventListener("wheel", dissolve, opts);
      window.removeEventListener("touchmove", dissolve, opts);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(autoTimer);
    }

    attach();
    // ~4.5s boot: typing finishes ~2.3s, holds with the cursor, then dissolves
    const autoTimer = window.setTimeout(dissolve, 4050);
    return () => {
      detach();
      window.clearTimeout(hideTimer);
    };
  }, []);

  // Always server-rendered; CSS (driven by the pre-paint gate) controls
  // whether it is visible, so non-boot loads never flash it.
  return (
    <div ref={ref} className="boot-overlay" aria-hidden="true">
      {/* anchored to the hero's container AND vertical offset (pt-32/lg:pt-40),
          so the boot text sits where the headline will, and the dissolve
          hands off position-for-position */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-32 lg:px-12 lg:pt-40">
        <div className="boot-frame">
        <span className="boot-border">{frameTop()}</span>
        {LINES.map((l, i) => (
          <div
            key={l.pre}
            className="boot-line"
            style={
              {
                "--cols": COLS,
                "--delay": `${200 + i * 450}ms`,
                "--dur": `${Math.min((l.pre.length + l.value.length + 4) * 14, 340)}ms`,
                animationTimingFunction: `steps(${COLS})`,
              } as React.CSSProperties
            }
          >
            <span className="boot-pre">{l.pre}</span>
            <span className="boot-dots">{leaders(l.pre, l.value)}</span>
            <span className={l.live ? "boot-live" : "boot-val"}>{l.value}</span>
          </div>
        ))}
          <span className="boot-cursor" aria-hidden>
            █
          </span>
          <span className="boot-border">{frameBottom()}</span>
        </div>
      </div>
    </div>
  );
}
