"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const LINKS = [
  { label: "WORK", id: "work" },
  { label: "EXPERIENCE", id: "experience" },
  { label: "ABOUT", id: "about" },
  { label: "CONTACT", id: "contact" },
];

export function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [underline, setUnderline] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // track active section on the home page
  useEffect(() => {
    if (!isHome) return;
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // off the home page there is no active section
  const current = isHome ? active : null;

  // the single shared underline that slides between items (§4.1)
  useEffect(() => {
    const list = listRef.current;
    if (!list || !current) {
      setUnderline(null);
      return;
    }
    const el = list.querySelector<HTMLAnchorElement>(`[data-id="${current}"]`);
    if (!el) {
      setUnderline(null);
      return;
    }
    setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
  }, [current]);

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 h-16 border-b backdrop-blur-[12px] transition-colors duration-[var(--dur-fast)] ${
        scrolled ? "border-line" : "border-transparent"
      }`}
      style={{ background: "color-mix(in srgb, var(--color-base) 80%, transparent)" }}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 lg:px-12"
      >
        <Link href="/" className="mono-label text-fg">
          SAWAB P
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul ref={listRef} className="relative flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/#${l.id}`}
                  data-id={l.id}
                  className={`mono-label transition-colors duration-[var(--dur-fast)] ${
                    current === l.id ? "text-fg" : "text-fg3 hover:text-fg2"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <span
              aria-hidden
              className="absolute -bottom-1.5 h-px bg-signal transition-all duration-[var(--dur-fast)]"
              style={
                underline
                  ? { left: underline.left, width: underline.width, opacity: 1 }
                  : { left: 0, width: 0, opacity: 0 }
              }
            />
          </ul>
          <a
            href="/Sawab-P-Resume.pdf"
            download
            className="mono-label rounded-[var(--radius-sm)] border border-line-strong px-3.5 py-2 text-fg2 transition-colors duration-[var(--dur-fast)] hover:border-fg3 hover:text-fg"
          >
            RESUME ↓
          </a>
          <span className="mono-label hidden items-center gap-2 text-fg3 lg:inline-flex">
            <span aria-hidden className="size-2 rounded-full bg-live dot-pulse" />
            OPEN TO WORK
          </span>
        </div>

        <button
          type="button"
          className="mono-label -mr-3 min-h-11 p-3 text-fg2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>
    </header>

      {/* Sibling of the header: backdrop-blur up there would otherwise become
          this overlay's containing block and clip it to 64px. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-30 overflow-y-auto bg-base pt-16 md:hidden"
        >
          <ul className="flex flex-col gap-2 px-6 pt-12">
            {LINKS.map((l, i) => (
              <li
                key={l.id}
                className="hero-seq"
                style={{ "--seq": `${i * 40}ms` } as React.CSSProperties}
              >
                <Link
                  href={`/#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="display-lg block py-3 text-fg"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li
              className="hero-seq mt-8"
              style={{ "--seq": "200ms" } as React.CSSProperties}
            >
              <a href="/Sawab-P-Resume.pdf" download className="mono-label text-fg2">
                RESUME ↓
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
