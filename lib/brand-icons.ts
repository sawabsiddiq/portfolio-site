import {
  siWhatsapp,
  siPostgresql,
  siSupabase,
  siN8n,
  siDocker,
  siReact,
  siVite,
  siTypescript,
  siTailwindcss,
  siStripe,
  siPython,
  siNextdotjs,
  siZapier,
  siMake,
  siGooglesheets,
  siFastapi,
  siNodedotjs,
  siGooglemaps,
  type SimpleIcon,
} from "simple-icons";
import { muteBrand } from "@/lib/color";

export type BrandIcon = { path: string; hex: string; muted: string; title: string };

const brand = (icon: SimpleIcon, hexOverride?: string): BrandIcon => {
  // Next.js ships #000 — invisible on ink; lift it to the palette's off-white
  const hex = hexOverride ?? `#${icon.hex}`;
  return { path: icon.path, hex, muted: muteBrand(hex), title: icon.title };
};

/**
 * Tool name → brand icon. Only tools with a real brand mark get one —
 * concepts (RAG, INTENT, webhooks…) and tools without icons (OpenAI,
 * Pinecone, Gupshup…) stay text-only. That distinction is deliberate.
 */
const MATCHERS: [RegExp, BrandIcon][] = [
  [/whatsapp/i, brand(siWhatsapp)],
  [/postgres/i, brand(siPostgresql)],
  [/supabase/i, brand(siSupabase)],
  [/n8n/i, brand(siN8n)],
  [/docker/i, brand(siDocker)],
  [/react/i, brand(siReact)],
  [/vite/i, brand(siVite)],
  [/typescript/i, brand(siTypescript)],
  [/tailwind/i, brand(siTailwindcss)],
  [/stripe/i, brand(siStripe)],
  [/python/i, brand(siPython)],
  [/next\.?js/i, brand(siNextdotjs, "#E6EAF2")],
  [/zapier/i, brand(siZapier)],
  [/make\.com/i, brand(siMake)],
  [/google sheets/i, brand(siGooglesheets)],
  [/fastapi/i, brand(siFastapi)],
  [/node\.?js/i, brand(siNodedotjs)],
  [/google (places|maps|geocod)/i, brand(siGooglemaps)],
];

export function toolIcon(name: string): BrandIcon | undefined {
  return MATCHERS.find(([re]) => re.test(name))?.[1];
}

/** Diagram node labels are uppercase stage names; map the service ones. */
export function nodeIcon(label: string): BrandIcon | undefined {
  if (/WHATSAPP/.test(label)) return toolIcon("whatsapp");
  if (/POSTGRES/.test(label)) return toolIcon("postgres");
  if (/SUPABASE/.test(label)) return toolIcon("supabase");
  return undefined;
}
