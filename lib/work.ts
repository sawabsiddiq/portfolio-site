import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { DiagramSpec, Status } from "@/data/site";

export type WorkFrontmatter = {
  title: string;
  outcome: string;
  role: string;
  domain: string;
  status: Status;
  statusLabel: string;
  timeline: string;
  stack: string[];
  impact: { value: string; label: string }[];
  diagram: DiagramSpec;
  order: number;
};

export type WorkEntry = {
  slug: string;
  frontmatter: WorkFrontmatter;
  content: string;
};

const WORK_DIR = path.join(process.cwd(), "content", "work");

export function getAllWork(): WorkEntry[] {
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(WORK_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as WorkFrontmatter, content };
    })
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getWork(slug: string): WorkEntry | undefined {
  return getAllWork().find((w) => w.slug === slug);
}
