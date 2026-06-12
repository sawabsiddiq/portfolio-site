// Generates OG cards (1200×630) in the site's visual language by
// screenshotting an HTML template with headless Chrome. Run locally:
//   node scripts/generate-og.mjs
// Outputs public/og/*.png (committed — the deploy doesn't need Chrome).
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import matter from "gray-matter";

const ROOT = new URL("..", import.meta.url).pathname;
const CHROME =
  process.env.CHROME_BIN ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const fontB64 = readFileSync(join(ROOT, "public/fonts/MonaSans.var.woff2")).toString("base64");

const card = ({ eyebrow, title, meta, nodes, status }) => `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: Mona;
    src: url(data:font/woff2;base64,${fontB64}) format("woff2");
    font-weight: 400 600;
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; background: #0B0E14; color: #E6EAF2;
    font-family: Mona, sans-serif; padding: 72px;
    display: flex; flex-direction: column; justify-content: space-between;
    background-image: radial-gradient(#1E2530 1px, transparent 1.5px);
    background-size: 32px 32px;
  }
  .mono { font-family: ui-monospace, Menlo, monospace; }
  .eyebrow { font-size: 20px; letter-spacing: 2.5px; color: #5C6677; }
  .title {
    font-size: 62px; font-weight: 600; line-height: 1.06;
    letter-spacing: -1.5px; font-variation-settings: "wdth" 105;
    max-width: 1000px; margin-top: 28px;
  }
  .pipe { display: flex; align-items: center; margin-top: 12px; }
  .node {
    border: 1.5px solid #1E2530; background: #11151D; border-radius: 8px;
    padding: 14px 22px; font-size: 19px; letter-spacing: 1.5px; color: #9AA4B5;
  }
  .edge { width: 54px; height: 1.5px; background: #2C3542; position: relative; }
  .edge.lit::after {
    content: ""; position: absolute; top: -3.25px; left: 22px;
    width: 8px; height: 8px; border-radius: 99px; background: #5FB4D9;
  }
  .foot { display: flex; justify-content: space-between; align-items: baseline; }
  .meta { font-size: 19px; color: #5C6677; letter-spacing: 1px; }
  .meta .dot {
    display: inline-block; width: 9px; height: 9px; border-radius: 99px;
    background: #4ADE80; margin-right: 10px;
  }
  .meta .dot.amber { background: #E8B45A; }
</style>
<body>
  <div>
    <div class="mono eyebrow">${eyebrow}</div>
    <div class="title">${title}</div>
  </div>
  <div class="pipe">
    ${nodes
      .flatMap((n, i) => [
        ...(i > 0 ? [`<div class="edge${i === 2 ? " lit" : ""}"></div>`] : []),
        `<div class="mono node">${n}</div>`,
      ])
      .join("")}
  </div>
  <div class="foot">
    <div class="mono meta">${status ? `<span class="dot${status === "POC" ? " amber" : ""}"></span>` : ""}${meta}</div>
    <div class="mono meta">SAWAB P · DUBAI</div>
  </div>
</body>`;

const cards = [
  {
    slug: "home",
    eyebrow: "FORWARD DEPLOYED AI ENGINEER · DUBAI",
    title: "AI agents, RAG systems, and automation that survive production.",
    meta: "4.5+ YRS · 300+ AUTOMATIONS · 60% WORKLOAD CUT",
    nodes: ["WHATSAPP", "INTENT", "RAG", "ESCALATE"],
    status: null,
  },
  ...readdirSync(join(ROOT, "content/work"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const fm = matter(readFileSync(join(ROOT, "content/work", f), "utf8")).data;
      return {
        slug: f.replace(/\.mdx$/, ""),
        eyebrow: "CASE STUDY",
        title: fm.title,
        meta: `${fm.statusLabel} · ${fm.stack.slice(0, 4).join(" · ").toUpperCase()}`,
        nodes: [...fm.diagram.stages.slice(0, 3), fm.diagram.branches?.[0]].filter(Boolean),
        status: fm.status === "production" ? "PRODUCTION" : "POC",
      };
    }),
];

mkdirSync(join(ROOT, "public/og"), { recursive: true });
for (const c of cards) {
  const html = join("/tmp", `og-${c.slug}.html`);
  writeFileSync(html, card(c));
  execFileSync(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--screenshot=${join(ROOT, "public/og", `${c.slug}.png`)}`,
    "--window-size=1200,630",
    "--virtual-time-budget=4000",
    `file://${html}`,
  ]);
  console.log(`og: ${c.slug}.png`);
}
