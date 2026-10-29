import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import Script from "next/script";
import { getDictionary } from "../../lib/dictionaries";
import { LOCALE_TAGS, LOCALES } from "../../lib/i18n";
import { localeParam } from "../../lib/locale-param";
import { identityGraph, PREVIEW, SITE } from "../../lib/site";
import { StructuredData } from "../structured-data";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const lang = await localeParam(params);
  const { site } = getDictionary(lang);
  return {
    metadataBase: new URL(SITE.origin),
    title: { default: site.title, template: "%s | Riccardo Lamanna" },
    description: site.description,
    authors: [{ name: SITE.name, url: `${SITE.origin}/` }],
    creator: SITE.name,
    publisher: SITE.name,
    applicationName: SITE.name,
    robots: {
      index: !PREVIEW,
      follow: true,
      googleBot: { index: !PREVIEW, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: { title: site.title, description: site.description, siteName: SITE.name, locale: LOCALE_TAGS[lang].openGraph, type: "website" },
    twitter: { card: "summary_large_image" },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = await localeParam(params);
  return (
    <html lang={LOCALE_TAGS[lang].html} className={outfit.variable}>
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <link rel="describedby" href="/llms.txt" type="text/plain" />
      </head>
      <body><StructuredData data={identityGraph(lang)} />{children}<Script src="https://assets.calendly.com/assets/external/widget.js" /></body>
    </html>
  );
}
