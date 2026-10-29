import type { Metadata } from "next";

export const SITE = {
  origin: "https://www.riccardolamanna.de",
  name: "Rick Lamanna",
  fullName: "Riccardo Lamanna",
  title: "Rick Lamanna | Fractional Head of AI & Applied AI Engineer",
  description: "Rick Lamanna unterstützt Unternehmen in Deutschland als freiberuflicher Applied AI Engineer und Fractional Head of AI. KI direkt im Team umsetzen.",
  role: "Freiberuflicher Applied AI Engineer und Fractional Head of AI",
  biography: "Riccardo (Rick) Lamanna ist freiberuflicher Applied AI Engineer und Fractional Head of AI. Er arbeitet direkt mit Unternehmen in Deutschland zusammen, um KI in bestehende Prozesse zu integrieren. Wie ein Forward Deployed Engineer begleitet er die Arbeit von der Auswahl geeigneter Werkzeuge über die Integration bis zur Überprüfung im Arbeitsalltag.",
  profiles: ["https://www.rick.build/", "https://github.com/rickkdev"],
};

export const PREVIEW = process.env.VERCEL_ENV === "preview";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = new URL(path, SITE.origin).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, locale: "de_DE", type: "website", images: [{ url: `${SITE.origin}/opengraph-image`, width: 1200, height: 630, alt: SITE.title }] },
    twitter: { card: "summary_large_image", title, description, images: [`${SITE.origin}/opengraph-image`] },
  };
}

export const identityGraph = {
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
      description: SITE.biography,
      jobTitle: ["Freiberuflicher Applied AI Engineer", "Fractional Head of AI"],
      sameAs: SITE.profiles,
      knowsAbout: ["Applied AI Engineering", "KI-Einführung in Unternehmen", "KI-Agents", "Coding Agents", "Selbst gehostete KI"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.origin}/#website`,
      url: `${SITE.origin}/`,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "de-DE",
      publisher: { "@id": `${SITE.origin}/#person` },
    },
  ],
};
