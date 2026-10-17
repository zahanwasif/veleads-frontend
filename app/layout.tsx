import type { Metadata, Viewport } from "next";
import { Stack_Sans_Headline } from "next/font/google";
import "./globals.css";

const stackSans = Stack_Sans_Headline({
  variable: "--font-stack-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://veleads.io";
const title = "Veleads: The 90-Day Pipeline Sprint for AI & SaaS founders";
const description =
  "Stop prospecting. Start taking sales calls. A done-for-you 90-day sprint on LinkedIn and email for AI & SaaS founders, pre-seed to Series A. Outreach live by day 31, or your next month is free.";

// favicon.ico, icon.svg, apple-icon.png and opengraph-image.tsx in app/ are picked up automatically.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
