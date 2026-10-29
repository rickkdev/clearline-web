import type { MetadataRoute } from "next";
import { getArticles } from "../lib/articles";
import { LOCALES, localePath } from "../lib/i18n";
import { PREVIEW, SITE } from "../lib/site";

const AI_CRAWLERS = ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "CCBot", "Applebot-Extended", "Bytespider", "Meta-ExternalAgent", "cohere-ai"];

// Googlebot stays out of these rules so it can fetch the pages and read their noindex.
const hiddenPaths = getArticles("de")
  .filter((article) => article.noindex)
  .flatMap((article) => LOCALES.map((lang) => localePath(lang, `/blog/${article.slug}`)));

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/video-options", ...hiddenPaths];
  return {
    rules: PREVIEW
      ? { userAgent: "*", disallow: "/" }
      : [{ userAgent: "*", allow: "/", disallow }, { userAgent: AI_CRAWLERS, disallow }],
    sitemap: `${SITE.origin}/sitemap.xml`,
  };
}
