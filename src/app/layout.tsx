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
  metadataBase: new URL('https://noadmin.info'),
  title: {
    default: "NoAdmin - Discord Bot Permission Best Practices",
    template: "%s | NoAdmin",
  },
  description: "Learn why Discord bot developers should avoid Administrator permissions and how to request only the permissions your bot needs. A comprehensive guide to secure, trustworthy bot development using the principle of least privilege.",
  keywords: [
    "Discord bot",
    "Discord permissions",
    "bot development",
    "Administrator permission",
    "least privilege",
    "Discord security",
    "bot permissions calculator",
    "OAuth2",
    "Discord API",
    "bot best practices",
  ],
  authors: [{ name: "NoAdmin", url: "https://noadmin.info" }],
  creator: "NoAdmin",
  publisher: "NoAdmin",
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "NoAdmin - Discord Bot Permission Best Practices",
    description: "Stop requesting Administrator permission. Learn to build secure Discord bots using the principle of least privilege.",
    type: "website",
    url: "https://noadmin.info",
    siteName: "NoAdmin",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoAdmin - Discord Bot Permission Best Practices",
    description: "Stop requesting Administrator permission. Learn to build secure Discord bots using the principle of least privilege.",
    creator: "@noadmin",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://noadmin.info",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
