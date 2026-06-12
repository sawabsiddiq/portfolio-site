import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/lib/motion";
import { site } from "@/data/site";
import "./globals.css";

const mona = localFont({
  src: "../public/fonts/MonaSans.var.woff2",
  variable: "--font-mona",
  weight: "400 600",
  display: "swap",
  adjustFontFallback: "Arial",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sawab P — AI Engineer & Forward Deployed AI Engineer in Dubai",
    template: "%s — Sawab P",
  },
  description:
    "Portfolio of Sawab P, an AI Engineer and Forward Deployed AI Engineer in Dubai building AI agents, RAG systems, n8n automations, Supabase/PostgreSQL platforms, and enterprise workflow integrations.",
  keywords: [
    "AI Engineer Dubai",
    "Forward Deployed AI Engineer",
    "AI Workflow Automation",
    "n8n Automation",
    "RAG Systems",
    "AI Agents",
    "OpenAI API",
    "Supabase PostgreSQL",
    "WhatsApp Business API automation",
    "Insurance AI automation",
  ],
  openGraph: {
    title: "Sawab P — AI Engineer & Forward Deployed AI Engineer in Dubai",
    description:
      "AI agents, RAG systems, and automation that survive production.",
    url: site.url,
    siteName: "Sawab P",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/home.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sawab P",
  jobTitle: "AI Engineer / Forward Deployed AI Engineer",
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.linkedin, site.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mona.variable} ${plex.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a
          href="#main"
          className="mono-label sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-4 focus:z-50 focus:bg-raised focus:border focus:border-line-strong focus:rounded-[var(--radius-sm)] focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <MotionProvider>
          <NavBar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
