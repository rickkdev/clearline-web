import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CalendlyWidget } from "./calendly";
import { identityGraph, PREVIEW, SITE } from "../lib/site";
import { StructuredData } from "./structured-data";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: { default: SITE.title, template: "%s | Rick Lamanna" },
  description: SITE.description,
  authors: [{ name: SITE.name, url: `${SITE.origin}/#ueber-mich` }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  robots: {
    index: !PREVIEW,
    follow: true,
    googleBot: { index: !PREVIEW, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: { title: SITE.title, description: SITE.description, siteName: SITE.name, locale: "de_DE", type: "website" },
  twitter: { card: "summary_large_image" },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={outfit.variable}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
      </head>
      <body><StructuredData data={identityGraph} />{children}<CalendlyWidget /></body>
    </html>
  );
}
