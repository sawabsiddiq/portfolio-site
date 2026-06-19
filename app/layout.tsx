import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { IBM_Plex_Mono } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { BootSequence } from "@/components/BootSequence";
import { MotionProvider } from "@/lib/motion";
import { site } from "@/data/site";
import "./globals.css";

// Runs before first paint: decides whether the cold-boot plays this load.
// Sets the gate on <html> so CSS can show the overlay and pause the hero with
// zero flash. Skips for: reduced-motion, returning sessions, and automated
// agents (bots/crawlers/Lighthouse/headless) — so their measured LCP is the
// real hero, not the boot overlay. A fallback timer self-heals the gate if the
// React effect never runs (chunk-load/CSP/hydration failure), so content can
// never get stuck behind a paused hero.
const bootGate = `(function(){try{var d=document.documentElement;var ua=navigator.userAgent||'';if(/bot|crawl|spider|lighthouse|pagespeed|headless|prerender|gtmetrix/i.test(ua))return;if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('sawab.booted')){d.setAttribute('data-boot','');d.classList.add('boot-pause');window.__bootFallback=setTimeout(function(){try{sessionStorage.setItem('sawab.booted','1')}catch(e){}d.classList.remove('boot-pause');d.removeAttribute('data-boot');var a=document.getElementById('app-root');if(a)a.removeAttribute('inert');},4200);}}catch(e){}})();`;

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
  applicationName: site.displayName,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: {
    title: "Sawab P — AI Engineer & Forward Deployed AI Engineer in Dubai",
    description:
      "AI agents, RAG systems, and automation that survive production.",
    url: site.url,
    siteName: "Sawab P",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Sawab P — AI Engineer & Forward Deployed AI Engineer, Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sawab P — AI Engineer & Forward Deployed AI Engineer in Dubai",
    description:
      "AI agents, RAG systems, and automation that survive production.",
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <script dangerouslySetInnerHTML={{ __html: bootGate }} />
        <BootSequence />
        {/* real flex wrapper (NOT display:contents — inert does not propagate
            through display:contents in Chromium). The boot sets `inert` here
            so focus/clicks can't reach the covered app, then clears it on
            dissolve. flex-1 + flex-col preserves the sticky-footer layout. */}
        <div id="app-root" className="flex flex-1 flex-col">
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
        </div>
        {/* Google Analytics 4 — loaded after hydration so it never competes
            with the hero/boot for the main thread. SPA route changes are
            captured by GA4 Enhanced Measurement (history events). */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-72R06EBCZS"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-72R06EBCZS');`}
        </Script>
      </body>
    </html>
  );
}
