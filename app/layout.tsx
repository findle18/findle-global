import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
// 1. Imported the official Next.js Google Analytics component
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.findle.global"),
  title: "Pre-Construction Condos, Towns & Homes in Ontario | Findle Global",
  description: "Discover the future of real estate with Findle. Access exclusive preconstruction listings, expert market insights, and advanced tools designed for smarter property investment.",
  openGraph: {
    type: "website",
    siteName: "Findle Global",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "Findle Global — Discover Tomorrow's Real Estate Today" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-cover.jpg"],
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
      <body className="min-h-full flex flex-col">
        {children}
        {/* 2. Injected the tracking component safely using your environment variable */}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
