import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VeLeads - The Multi-Channel Sales Engagement Platform Built for B2B Teams",
  description: "The multi-channel sales engagement platform for B2B teams",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "VeLeads - The Multi-Channel Sales Engagement Platform Built for B2B Teams",
    description: "The multi-channel sales engagement platform for B2B teams",
  },
  twitter: {
    card: "summary_large_image",
    title: "VeLeads - The Multi-Channel Sales Engagement Platform Built for B2B Teams",
    description: "The multi-channel sales engagement platform for B2B teams",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
