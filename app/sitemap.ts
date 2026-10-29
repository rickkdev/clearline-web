import type { MetadataRoute } from "next";
import { ARTICLES } from "../lib/articles";
import { SITE } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/speaking", "/blog"].map((path) => ({ url: new URL(path, SITE.origin).href })),
    ...ARTICLES.map((article) => ({ url: `${SITE.origin}/blog/${article.slug}`, lastModified: article.updatedAt })),
  ];
}
