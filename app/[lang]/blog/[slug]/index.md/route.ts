import { ARTICLE_SLUGS, getArticle } from "../../../../../lib/articles";
import { isLocale, LOCALES } from "../../../../../lib/i18n";
import { absoluteUrl, SITE } from "../../../../../lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => ARTICLE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function GET(_request: Request, { params }: RouteContext<"/[lang]/blog/[slug]/index.md">) {
  const { lang, slug } = await params;
  const article = isLocale(lang) ? getArticle(lang, slug) : undefined;
  if (!article || !isLocale(lang)) return new Response("Article not found", { status: 404 });
  const canonical = absoluteUrl(lang, `/blog/${article.slug}`);
  const text = `# ${article.title}\n\nAuthor: ${SITE.name}\nPublished: ${article.publishedAt}\nUpdated: ${article.updatedAt}\nCanonical: ${canonical}\n\n${article.body}`;
  return new Response(text, { headers: { "Content-Type": "text/markdown; charset=utf-8", "X-Robots-Tag": "noindex", "Link": `<${canonical}>; rel="canonical"` } });
}
