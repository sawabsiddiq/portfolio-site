// Build date is baked in at static-export time — the LAST DEPLOY stamp (§4.9)
const buildDate = new Date().toISOString().slice(0, 10);

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 lg:px-12">
        <p className="mono-label text-fg3">© 2026 SAWAB P</p>
        <p className="mono-label text-fg3">LAST DEPLOY: {buildDate}</p>
      </div>
    </footer>
  );
}
