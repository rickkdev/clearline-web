import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { DEFAULT_LOCALE, LOCALE_TAGS, LOCALES, localePath, type Locale } from "./i18n";

export const SITE = {
  origin: "https://www.riccardolamanna.de",
  name: "Riccardo Lamanna",
  fullName: "Riccardo Lamanna",
  profiles: ["https://www.rick.build/", "https://github.com/rickkdev"],
};

export const PREVIEW = process.env.VERCEL_ENV === "preview";

export function absoluteUrl(locale: Locale, path: string) {
  return new URL(localePath(locale, path), SITE.origin).href;
}

export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(LOCALES.map((locale) => [locale, absoluteUrl(locale, path)])),
    "x-default": absoluteUrl(DEFAULT_LOCALE, path),
  };
}

export function pageMetadata(locale: Locale, title: string, description: string, path: string): Metadata {
  const url = absoluteUrl(locale, path);
  const image = absoluteUrl(locale, "/opengraph-image");
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: { title, description, url, siteName: SITE.name, locale: LOCALE_TAGS[locale].openGraph, type: "website", images: [{ url: image, width: 1200, height: 630, alt: getDictionary(locale).site.title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function identityGraph(locale: Locale) {
  const { site } = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.origin}/#person`,
        name: SITE.name,
        alternateName: SITE.fullName,
        givenName: "Riccardo",
        familyName: "Lamanna",
        url: `${SITE.origin}/`,
        description: site.biography,
        jobTitle: site.jobTitles,
        sameAs: SITE.profiles,
        knowsAbout: site.knowsAbout,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.origin}/#website`,
        url: `${SITE.origin}/`,
        name: SITE.name,
        description: site.description,
        inLanguage: LOCALES.map((item) => LOCALE_TAGS[item].schema),
        publisher: { "@id": `${SITE.origin}/#person` },
      },
    ],
  };
}
