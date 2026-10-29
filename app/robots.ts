import type { MetadataRoute } from "next";
import { PREVIEW, SITE } from "../lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: PREVIEW ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: "/video-options" },
    sitemap: `${SITE.origin}/sitemap.xml`,
  };
}
