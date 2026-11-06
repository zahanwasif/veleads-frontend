import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { MEETINGS_PER_CYCLE } from "@/lib/guarantee";
import { SITE_URL } from "@/lib/site-url";
import { Stack_Sans_Headline } from "next/font/google";
import "./globals.css";

const stackSans = Stack_Sans_Headline({
  variable: "--font-stack-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  // Next has no metrics for this font, so it can't build a size-adjusted fallback; use plain system fonts instead.
  adjustFontFallback: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const GTM_ID = "GTM-KW5JLKLF";
// Only production builds load Tag Manager and HubSpot tracking, so local development never pollutes analytics.
const loadTracking = process.env.NODE_ENV === "production";
// HubSpot tracking code: sets the `hubspotutk` cookie that links form submissions to page views.
const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;

const title = "Veleads | Guaranteed sales meetings for B2B founders";
const description =
  `We run LinkedIn and outbound for B2B founders with $10k+ deals and book qualified sales calls: ${MEETINGS_PER_CYCLE} a month, guaranteed, or cash back.`;

// favicon.ico, icon.svg, apple-icon.png and opengraph-image.tsx in app/ are picked up automatically.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "Veleads",
  keywords: [
    "outbound for SaaS founders",
    "B2B lead generation",
    "LinkedIn outreach",
    "cold email agency",
    "founder-led sales",
    "pipeline generation",
    "guaranteed sales meetings",
    "appointment setting for founders",
  ],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Veleads", locale: "en_US", title, description },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#5B5BF6" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${stackSans.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@500,600,700&display=swap"
        />
      </head>
      {loadTracking && <GoogleTagManager gtmId={GTM_ID} />}
      <body className="min-h-full flex flex-col">
        {/* Tag Manager fallback for visitors with JavaScript turned off. */}
        {loadTracking && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
        {loadTracking && HUBSPOT_PORTAL_ID && (
          <Script
            id="hs-script-loader"
            src={`https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
