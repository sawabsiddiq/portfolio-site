import { Uptime } from "@/components/Uptime";
import { site } from "@/data/site";

// Baked in at static-export time — the LAST DEPLOY stamp (§4.9)
const buildTime = Date.now();
const buildDate = new Date(buildTime).toISOString().slice(0, 10);

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 lg:px-12">
        <p className="mono-label text-fg3">© 2026 SAWAB P</p>
        <p className="mono-label flex flex-wrap items-center gap-x-3 gap-y-1 text-fg3">
          <a
            href={site.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-fg2"
          >
            VIEW SOURCE ↗
          </a>
          <span aria-hidden>·</span>
          <span>LAST DEPLOY: {buildDate}</span>
          <span aria-hidden>·</span>
          <span>
            UPTIME: <Uptime since={buildTime} />
          </span>
        </p>
      </div>
    </footer>
  );
}
