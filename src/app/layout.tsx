import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SITE_NAME } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Stop requesting Administrator. Calculate the exact Discord permissions your bot needs, analyze any invite link, and learn least-privilege bot development.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NoAdmin: Discord bot permission tools",
    template: "%s | NoAdmin",
  },
  description,
  keywords: [
    "Discord bot",
    "Discord permissions",
    "permissions calculator",
    "invite link analyzer",
    "Administrator permission",
    "least privilege",
    "Discord security",
    "OAuth2",
    "bot best practices",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: "NoAdmin: Discord bot permission tools",
    description,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoAdmin: Discord bot permission tools",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-black font-sans antialiased`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[70] focus:rounded-md focus:bg-white focus:px-3 focus:py-1.5 focus:text-sm focus:text-black"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-grow">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
