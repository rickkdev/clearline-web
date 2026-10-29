import type { MetadataRoute } from "next";
import { getArticles } from "../lib/articles";
import { LOCALES } from "../lib/i18n";
import { absoluteUrl, languageAlternates } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ...["/", "/speaking", "/blog"].map((path) => ({ path, lastModified: undefined })),
    ...getArticles("de").map((article) => ({ path: `/blog/${article.slug}`, lastModified: article.updatedAt })),
  ];
  return LOCALES.flatMap((locale) => pages.map(({ path, lastModified }) => ({
    url: absoluteUrl(locale, path),
    lastModified,
    alternates: { languages: languageAlternates(path) },
  })));
}
