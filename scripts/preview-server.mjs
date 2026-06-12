// Minimal static server for the `out/` export, with clean-URL fallback.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const ROOT = new URL("../out", import.meta.url).pathname;
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".json": "application/json",
};

createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const candidates = path.endsWith("/")
    ? [join(path, "index.html")]
    : [path, `${path}.html`, join(path, "index.html")];
  for (const rel of candidates) {
    try {
      const data = await readFile(join(ROOT, rel));
      res.writeHead(200, { "content-type": TYPES[extname(rel)] ?? "application/octet-stream" });
      res.end(data);
      return;
    } catch {
      /* try next candidate */
    }
  }
  try {
    const data = await readFile(join(ROOT, "404.html"));
    res.writeHead(404, { "content-type": "text/html" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
}).listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
